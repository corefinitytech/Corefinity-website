import type { SVGProps } from "react";
import {
  siBluetooth,
  siCloudinary,
  siCplusplus,
  siDart,
  siDocker,
  siEspressif,
  siFastapi,
  siFigma,
  siFirebase,
  siFlutter,
  siGo,
  siGoogleanalytics,
  siMqtt,
  siNextdotjs,
  siNodedotjs,
  siNordicsemiconductor,
  siPlatformio,
  siPostgresql,
  siPython,
  siRailway,
  siReact,
  siRedis,
  siShadcnui,
  siShopify,
  siStmicroelectronics,
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
 * Easypaisa mark (nor LoRa or AWS IoT Core), so those get neutral stroked glyphs from the site's own
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
  "shadcn/ui": siShadcnui.path,
  "Google Analytics": siGoogleanalytics.path,
  BLE: siBluetooth.path,
  STM32: siStmicroelectronics.path,
  "Nordic nRF": siNordicsemiconductor.path,
  ESP32: siEspressif.path,
  "C++": siCplusplus.path,
  PlatformIO: siPlatformio.path,
  Flutter: siFlutter.path,
  Dart: siDart.path,
  Railway: siRailway.path,
  MQTT: siMqtt.path,
  Go: siGo.path,
  "React Native": siReact.path,
};

/** Stroked fallbacks, drawn on the same 24 unit grid as icons.tsx. */
const generic: Record<string, React.ReactNode> = {
  // A spark, for model APIs.
  "OpenAI API": (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" />
  ),
  // A chip, for module makers without a usable mark.
  RAKwireless: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2.5v3.5M15 2.5v3.5M9 18v3.5M15 18v3.5M2.5 9h3.5M2.5 15h3.5M18 9h3.5M18 15h3.5" />
    </>
  ),
  // Radio waves, for long range radio.
  LoRa: (
    <>
      <circle cx="12" cy="17" r="1.6" />
      <path d="M8.5 13.5a5 5 0 0 1 7 0M5.5 10.5a9.2 9.2 0 0 1 13 0M2.8 7.6a13 13 0 0 1 18.4 0" />
    </>
  ),
  // A cloud, for managed cloud services without a usable mark.
  "AWS IoT Core": (
    <path d="M7.5 18.5h9.2a3.8 3.8 0 0 0 .5-7.6 6 6 0 0 0-11.3 1.7 3.4 3.4 0 0 0 1.6 5.9Z" />
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
