import {
  GhostFibersBackground,
  GradientWavesBackground,
  LiquidSilkBackground,
} from "@/components/backgrounds/LazyBackgrounds";
import { palette } from "@/components/backgrounds/palette";

/**
 * Animated cover for an article card, the same treatment the Capabilities
 * cards use.
 *
 * The surface gradient underneath stays put, so the card is never blank while
 * the effect downloads, and it is what shows if WebGL is unavailable. Each
 * effect only creates its context once the card nears the viewport, and stops
 * drawing when it scrolls away.
 */
export function CoverBackground({ index }: { index: number }) {
  switch (index % 3) {
    case 0:
      return <LiquidSilkBackground />;
    case 1:
      // Streaks rather than a ring: a circle gets cropped by a short, wide
      // cover and reads as a stray shape.
      return (
        <GhostFibersBackground
          lineColor={palette.deepNavy}
          glowColor={palette.cyan}
          layers={6}
          scale={1.6}
          speed={0.16}
          twist={0.14}
          lineSharpness={14}
          glowIntensity={1.3}
          brightness={1.7}
          vignette={0.7}
        />
      );
    default:
      return (
        <GradientWavesBackground
          horizonColor={palette.baseNearBlack}
          waveColor={palette.deepNavy}
          crestColor={palette.cyan}
          speed={0.18}
          grain
          grainIntensity={0.05}
        />
      );
  }
}

/**
 * Keeps white text readable over a moving background, which is the one thing
 * these effects cannot promise on their own.
 */
export function CoverScrim() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10"
    />
  );
}
