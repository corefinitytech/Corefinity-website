/**
 * Single source of truth for the Capabilities card backgrounds. Change a hex
 * here and every shader and canvas effect follows, since shaders read the
 * float-tuple versions and CSS scrims read the hex strings.
 */
export const palette = {
  baseNearBlack: "#05070d",
  deepNavy: "#0a1a3a",
  electricBlue: "#1f6bff",
  cyan: "#38bdf8",
  offWhite: "#e8eef7",
  coolGrey: "#e6e9ee",
  warmOrange: "#ff5a2c",
  amber: "#ffb347",
} as const;

export type RGB = [number, number, number];

/** "#rrggbb" -> [r, g, b] floats in the 0..1 range shaders expect. */
export function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export const paletteRgb = {
  baseNearBlack: hexToRgb(palette.baseNearBlack),
  deepNavy: hexToRgb(palette.deepNavy),
  electricBlue: hexToRgb(palette.electricBlue),
  cyan: hexToRgb(palette.cyan),
  offWhite: hexToRgb(palette.offWhite),
  coolGrey: hexToRgb(palette.coolGrey),
  warmOrange: hexToRgb(palette.warmOrange),
  amber: hexToRgb(palette.amber),
} as const;
