import type { SVGProps } from "react";
import {
  siCloudinary,
  siDocker,
  siFastapi,
  siFigma,
  siFirebase,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siShopify,
  siSpacy,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWhatsapp,
} from "simple-icons";

/**
 * Marks for the "Built with" chips on case studies.
 *
 * Brand glyphs come from Simple Icons (CC0), imported one by one so only these
 * paths ship. They are filled with currentColor to sit in the chip's grey, the
 * same treatment as the social icons. Simple Icons carries no OpenAI or
 * Easypaisa mark, so those two get neutral stroked glyphs from the site's own
 * icon style rather than a borrowed logo.
 */
const brand: Record<string, string> = {
  React: siReact.path,
  "Tailwind CSS": siTailwindcss.path,
  "Next.js": siNextdotjs.path,
  TypeScript: siTypescript.path,
  FastAPI: siFastapi.path,
  Python: siPython.path,
  spaCy: siSpacy.path,
  Firebase: siFirebase.path,
  Firestore: siFirebase.path,
  Redis: siRedis.path,
  Cloudinary: siCloudinary.path,
  Docker: siDocker.path,
  Vercel: siVercel.path,
  PostgreSQL: siPostgresql.path,
  Stripe: siStripe.path,
  "Node.js": siNodedotjs.path,
  Figma: siFigma.path,
  Shopify: siShopify.path,
  "Shopify Admin API": siShopify.path,
  "WhatsApp Business API": siWhatsapp.path,
};

/** Stroked fallbacks, drawn on the same 24 unit grid as icons.tsx. */
const generic: Record<string, React.ReactNode> = {
  // A spark, for model APIs.
  "OpenAI API": (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" />
  ),
  // A wallet, for mobile payments.
  Easypaisa: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14.5h2" />
    </>
  ),
};

type Props = { name: string; className?: string } & Omit<
  SVGProps<SVGSVGElement>,
  "className"
>;

export default function TechIcon({
  name,
  className = "size-4",
  ...rest
}: Props) {
  const path = brand[name];
  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        aria-hidden
        {...rest}
      >
        <path d={path} />
      </svg>
    );
  }
  const glyph = generic[name];
  if (!glyph) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {glyph}
    </svg>
  );
}
