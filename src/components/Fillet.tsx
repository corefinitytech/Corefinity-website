import type { CSSProperties } from "react";

/**
 * Concave corner where a page-coloured cutout meets a card, drawn as a quarter
 * disc removed from a solid square. `origin` picks the corner the arc sweeps
 * from. Only works over a white surface, which is what every section using it
 * sits on.
 */
export const FILLET_SIZE = 16;

export default function Fillet({
  origin,
  size = FILLET_SIZE,
  style,
}: {
  origin: "0% 0%" | "100% 0%" | "0% 100%" | "100% 100%";
  size?: number;
  style: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at ${origin}, transparent ${size}px, #fff ${size}px)`,
        ...style,
      }}
    />
  );
}
