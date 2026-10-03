import Image from "next/image";

import { COVER_PAPER } from "@/lib/blog";

/**
 * An engraved cover plate on a panel of the same paper colour.
 *
 * The generated paper is a touch lighter in the middle than at its edges, so
 * a plate dropped onto a flat panel shows a faint rectangle. The outer tenth
 * of the plate on every side is faded out with a mask, which only ever
 * touches empty paper (the objects sit inside a wide margin), and the panel
 * shows through, so the edge disappears.
 */
const edgeFade =
  "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)";

export default function CoverPlate({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  plateClassName = "",
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Sizing for the panel itself. */
  className?: string;
  /** Padding around the plate, to keep it clear of anything laid over it. */
  plateClassName?: string;
  /** Anything laid over the panel, such as the card's topic chips. */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: COVER_PAPER }}
    >
      <div
        className={`absolute inset-0 grid place-items-center ${plateClassName}`}
      >
        <div
          className="relative aspect-[3/2] h-full max-w-full"
          style={{
            maskImage: edgeFade,
            WebkitMaskImage: edgeFade,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain transition duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
