"use client";

import { useEffect, useRef, useState } from "react";

import {
  DETAIL_SCALE,
  DPR_CAP,
  useInViewport,
  usePrefersReducedMotion,
  useQualityTier,
} from "./hooks";
import { palette } from "./palette";
import { subscribeFrame } from "./rafScheduler";

function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * LOOK C: fine topographic rings forming a domed, fingerprint-like shape,
 * anchored off one corner so it reads as cropped by the card rather than a
 * centered logo. Rings are concentric circles perturbed by a slow angular
 * wobble instead of a true marched height field: visually equivalent for a
 * card-sized background and cheap enough to redraw every frame on Canvas 2D.
 */
export default function ContourDome({
  variant = "dark",
  /** Anchors the dome off the top-left instead of the top-right, so a pair
   *  of cards in the same row can read as mirrored across it. */
  mirror = false,
  className = "",
}: {
  variant?: "light" | "dark";
  mirror?: boolean;
  className?: string;
}) {
  const { ref: hostRef, inView } = useInViewport<HTMLDivElement>("240px");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const tier = useQualityTier();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || !inView) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dprCap = DPR_CAP[tier];
    const detail = DETAIL_SCALE[tier];
    const ringCount = Math.round(10 + 12 * detail);
    const lineColor = variant === "light" ? palette.deepNavy : palette.cyan;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas!.width = Math.max(1, Math.round(host!.clientWidth * dpr));
      canvas!.height = Math.max(1, Math.round(host!.clientHeight * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    function draw(nowMs: number) {
      const w = host!.clientWidth;
      const h = host!.clientHeight;
      ctx!.clearRect(0, 0, w, h);

      const t = nowMs / 1000;
      const centerX = mirror ? w * 0.18 : w * 0.82;
      const centerY = h * 0.16;
      const maxRadius = Math.max(w, h) * 0.9;
      const breathe = 1 + 0.025 * Math.sin(t * 0.12);
      const squish = 0.72;
      const steps = Math.round(48 + 32 * detail);

      for (let i = 0; i < ringCount; i++) {
        const frac = (i + 1) / ringCount;
        const baseRadius = frac * maxRadius * breathe;
        ctx!.beginPath();
        for (let s = 0; s <= steps; s++) {
          const angle = (s / steps) * Math.PI * 2;
          const wobble =
            Math.sin(angle * 3 + t * 0.18 + i * 0.4) * 0.018 * maxRadius +
            Math.sin(angle * 7 - t * 0.09 + i * 0.9) * 0.008 * maxRadius;
          const r = baseRadius + wobble;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r * squish;
          if (s === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.closePath();
        const opacity =
          variant === "light"
            ? 0.05 + 0.3 * (1 - frac)
            : 0.08 + 0.42 * (1 - frac);
        ctx!.strokeStyle = withAlpha(lineColor, opacity);
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
      setReady(true);
    }

    draw(performance.now());
    const unsubscribe = reducedMotion ? () => {} : subscribeFrame(draw);

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
    };
  }, [inView, reducedMotion, tier, variant, mirror, hostRef]);

  return (
    <div ref={hostRef} className={`absolute inset-0 ${className}`} aria-hidden>
      <canvas
        ref={canvasRef}
        className="h-full w-full transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </div>
  );
}
