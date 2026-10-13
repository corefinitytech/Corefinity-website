import HairlineFigure from "@/components/hairline/HairlineFigure";
import { COVER_PAPER } from "@/lib/blog";

/**
 * A blog cover on a card: the post's Hairline figure, drawn live on its white
 * plate. It rests until the card it sits in is hovered or focused, then plays
 * for as long as the pointer stays on the card. The figure is shown whole at
 * its own 5:4, centred in whatever shape the panel takes, and takes no
 * pointer events of its own: the card is one link, and stays one.
 */
export default function CoverPlate({
  figure,
  alt,
  className = "",
  children,
}: {
  /** The figure's file in public/hairline, without the extension. */
  figure: string;
  alt: string;
  /** Sizing for the panel itself. */
  className?: string;
  /** Anything laid over the panel, such as the card's topic chips. */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: COVER_PAPER }}
    >
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="aspect-[5/4] h-full max-w-full">
          <HairlineFigure name={figure} label={alt} play="hover" />
        </div>
      </div>
      {children}
    </div>
  );
}
