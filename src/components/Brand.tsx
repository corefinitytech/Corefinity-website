import Image from "next/image";

import logoDark from "../../public/logo/logo-3.png";
import logoLight from "../../public/logo/logo-2.png";

/**
 * Full CoreFinity lockup.
 * "dark" = navy mark + wordmark, for light backgrounds.
 * "light" = white wordmark, for dark backgrounds.
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
      sizes="(max-width: 640px) 240px, 480px"
    />
  );
}
