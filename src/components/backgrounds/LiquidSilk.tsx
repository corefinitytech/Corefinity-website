"use client";

import ShaderCanvas from "./ShaderCanvas";
import { liquidSilkFragment } from "./shaders";

/**
 * LOOK A: glossy flowing ribbons, domain-warped fbm lit like oil/ferrofluid.
 * See shaders.ts for the lighting model.
 */
export default function LiquidSilk({ className = "" }: { className?: string }) {
  return <ShaderCanvas fragmentShader={liquidSilkFragment} className={className} />;
}
