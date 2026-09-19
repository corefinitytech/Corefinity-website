"use client";

/**
 * Every WebGL/canvas effect is code-split out of the main bundle and never
 * server-rendered: there's nothing meaningful to render on the server for a
 * canvas that only draws once a GL context exists, and skipping that empty
 * SSR pass keeps this shader code out of the initial HTML entirely. Import
 * from here, not from the effect files directly, so that stays true.
 */
import dynamic from "next/dynamic";

export const LiquidSilkBackground = dynamic(() => import("./LiquidSilk"), {
  ssr: false,
});

export const GlowingRingBackground = dynamic(() => import("./GlowingRing"), {
  ssr: false,
});

export const ContourDomeBackground = dynamic(() => import("./ContourDome"), {
  ssr: false,
});

export const GhostFibersBackground = dynamic(() => import("./GhostFibers"), {
  ssr: false,
});

export const MoltenMetalBackground = dynamic(() => import("./MoltenMetal"), {
  ssr: false,
});

export const GradientWavesBackground = dynamic(() => import("./GradientWaves"), {
  ssr: false,
});

export const OrbParticlesBackground = dynamic(() => import("./OrbParticles"), {
  ssr: false,
});

export const GradientBlindsBackground = dynamic(() => import("./GradientBlinds"), {
  ssr: false,
});

export { default as CountUpOutline } from "./CountUpOutline";
