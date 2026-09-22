"use client";

/**
 * Every WebGL/canvas effect is code-split out of the main bundle and never
 * server-rendered: there's nothing meaningful to render on the server for a
 * canvas that only draws once a GL context exists, and skipping that empty
 * SSR pass keeps this shader code out of the initial HTML entirely. Import
 * from here, not from the effect files directly, so that stays true.
 */
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import { useInViewOnce } from "./hooks";

/**
 * Defers an effect until it first comes near the viewport.
 *
 * The ogl based effects create their WebGL context and compile their shaders
 * on mount, and only pause their animation when off screen. Mounted at page
 * load, all five compiled together while the homepage was still hydrating:
 * one main thread task of roughly two seconds on a machine without a GPU,
 * which is what every CI runner and many low end phones are. That task held
 * back the LCP paint and failed the Lighthouse performance budget.
 *
 * Mounting on first approach moves both the chunk download and the shader
 * compile off the critical path. Mount once and keep: the effects already
 * pause themselves off screen, and remounting would build a fresh WebGL
 * context on every scroll past. The card's surface gradient shows until then.
 */
function whenNearViewport<P extends object>(Effect: ComponentType<P>) {
  function Deferred(props: P) {
    const { ref, seen } = useInViewOnce<HTMLDivElement>("240px");
    return (
      <div ref={ref} className="absolute inset-0">
        {seen && <Effect {...props} />}
      </div>
    );
  }
  Deferred.displayName = `WhenNearViewport(${Effect.displayName ?? Effect.name ?? "Effect"})`;
  return Deferred;
}

// ShaderCanvas and ContourDome gate themselves on visibility already.
export const LiquidSilkBackground = dynamic(() => import("./LiquidSilk"), {
  ssr: false,
});

export const GlowingRingBackground = dynamic(() => import("./GlowingRing"), {
  ssr: false,
});

export const ContourDomeBackground = dynamic(() => import("./ContourDome"), {
  ssr: false,
});

export const GhostFibersBackground = whenNearViewport(
  dynamic(() => import("./GhostFibers"), { ssr: false }),
);

export const MoltenMetalBackground = whenNearViewport(
  dynamic(() => import("./MoltenMetal"), { ssr: false }),
);

export const GradientWavesBackground = whenNearViewport(
  dynamic(() => import("./GradientWaves"), { ssr: false }),
);

export const OrbParticlesBackground = whenNearViewport(
  dynamic(() => import("./OrbParticles"), { ssr: false }),
);

export const GradientBlindsBackground = whenNearViewport(
  dynamic(() => import("./GradientBlinds"), { ssr: false }),
);

export { default as CountUpOutline } from "./CountUpOutline";
