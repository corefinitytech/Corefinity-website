"use client";

import ShaderCanvas from "./ShaderCanvas";
import { glowingRingFragment } from "./shaders";

/**
 * LOOK E: a bright rotating arc with bloom, over a blurred-feeling drifting
 * dot grid. Both live in one shader pass rather than two canvases.
 */
export default function GlowingRing({ className = "" }: { className?: string }) {
  return <ShaderCanvas fragmentShader={glowingRingFragment} className={className} />;
}
