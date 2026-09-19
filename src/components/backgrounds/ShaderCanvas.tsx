"use client";

import { useEffect, useRef, useState } from "react";

import {
  DETAIL_SCALE,
  DPR_CAP,
  useInViewport,
  usePrefersReducedMotion,
  useQualityTier,
} from "./hooks";
import { paletteRgb } from "./palette";
import { subscribeFrame } from "./rafScheduler";

/** Fullscreen triangle: covers the viewport with one draw call, no seam. */
const VERTEX_SHADER = /* glsl */ `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[ShaderCanvas] shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function setPaletteUniforms(gl: WebGLRenderingContext, program: WebGLProgram) {
  const set = (name: string, [r, g, b]: readonly [number, number, number]) => {
    const loc = gl.getUniformLocation(program, name);
    if (loc) gl.uniform3f(loc, r, g, b);
  };
  set("uBaseNearBlack", paletteRgb.baseNearBlack);
  set("uDeepNavy", paletteRgb.deepNavy);
  set("uElectricBlue", paletteRgb.electricBlue);
  set("uCyan", paletteRgb.cyan);
  set("uOffWhite", paletteRgb.offWhite);
  set("uWarmOrange", paletteRgb.warmOrange);
  set("uAmber", paletteRgb.amber);
}

export default function ShaderCanvas({
  fragmentShader,
  className = "",
}: {
  fragmentShader: string;
  className?: string;
}) {
  const { ref: hostRef, inView } = useInViewport<HTMLDivElement>("240px");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const tier = useQualityTier();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  /*
   * A <canvas> element can only ever hand out one WebGL context for its
   * lifetime: once WEBGL_lose_context.loseContext() has been called on it
   * (below, on every scroll-away teardown), a later canvas.getContext("webgl")
   * on that SAME element returns the same, permanently dead context, and
   * every compileShader call after that fails silently. React's dev-mode
   * double-invoke of effects hits this on the very first mount too. The fix
   * is to never reuse the DOM node: bump `mountKey` on every false->true
   * transition so React mounts a brand new <canvas>, which can always get a
   * genuinely fresh context. Render-time ref mutation, guarded by comparing
   * against the previous value, is the sanctioned pattern for this (same
   * shape as useInViewOnce in ./hooks) rather than setState in an effect.
   */
  const mountKeyRef = useRef(0);
  const wasInViewRef = useRef(false);
  if (inView && !wasInViewRef.current) {
    mountKeyRef.current += 1;
  }
  wasInViewRef.current = inView;

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || !inView) return;

    const gl = (canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    }) ?? canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      setFailed(true);
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const shader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertexShader || !shader) {
      setFailed(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setFailed(true);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, shader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[ShaderCanvas] program link error:", gl.getProgramInfoLog(program));
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    setPaletteUniforms(gl, program);
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uHover = gl.getUniformLocation(program, "uHover");
    const uQuality = gl.getUniformLocation(program, "uQuality");
    const qualityValue = DETAIL_SCALE[tier];
    const dprCap = DPR_CAP[tier];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const width = Math.max(1, Math.round(host!.clientWidth * dpr));
      const height = Math.max(1, Math.round(host!.clientHeight * dpr));
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        gl!.viewport(0, 0, width, height);
      }
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    let hoverTarget = 0;
    const onPointerEnter = () => {
      hoverTarget = 1;
    };
    const onPointerLeave = () => {
      hoverTarget = 0;
    };
    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("pointerleave", onPointerLeave);

    const startTime = performance.now();
    let hoverAmount = 0;

    function render(nowMs: number) {
      const elapsed = (nowMs - startTime) / 1000;
      hoverAmount += (hoverTarget - hoverAmount) * 0.06;
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, elapsed);
      gl!.uniform1f(uHover, hoverAmount);
      gl!.uniform1f(uQuality, qualityValue);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      setReady(true);
    }

    render(performance.now());
    const unsubscribe = reducedMotion ? () => {} : subscribeFrame(render);

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointerleave", onPointerLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [fragmentShader, inView, reducedMotion, tier, hostRef]);

  return (
    <div ref={hostRef} className={`absolute inset-0 ${className}`} aria-hidden>
      {!failed && (
        <canvas
          key={mountKeyRef.current}
          ref={canvasRef}
          className="h-full w-full transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        />
      )}
    </div>
  );
}
