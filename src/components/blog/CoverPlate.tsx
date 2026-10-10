import Image from "next/image";

import { COVER_PAPER } from "@/lib/blog";

/**
 * A blog cover: a full frame studio photograph that fills its panel. The
 * panel carries the photographs' darkest tone, so nothing shows while the
 * image loads.
 */
export default function CoverPlate({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
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
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      {children}
    </div>
  );
}
