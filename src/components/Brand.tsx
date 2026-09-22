import Image from "next/image";

import logoDark from "../../public/logo/wordmark-ink.png";
import logoLight from "../../public/logo/wordmark-light.png";

/**
 * Full CoreFinity lockup.
 * "dark" = ink wordmark and graphite mark on transparent, for light backgrounds.
 * "light" = white wordmark on transparent, for dark backgrounds.
 *
 * Not wordmark-dark.png: despite the name, that file is the light art on a
 * solid navy rectangle, which shows as a black box on the white navbar.
 *
 * The files are 600px wide, which covers the largest use on the site (the hero
 * banner lockup, about 195px) at 3x pixel density. `sizes` is pinned to the
 * real rendered width so the browser stops pulling a variant several times
 * larger than it can display. Masters live in /brand, outside the deployed app.
 */
export default function Brand({
  variant = "dark",
  className = "h-7 w-auto",
  priority = false,
}: {
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "dark" ? logoDark : logoLight;
  return (
    <Image
      src={src}
      alt="CoreFinity"
      className={className}
      priority={priority}
      sizes="200px"
    />
  );
}
