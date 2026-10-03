import { useId } from "react";

/**
 * Three glossy "keycap" tiles for the case study call to action: send a brief,
 * a short call, a fixed price in 48 hours. Same visual language as the brand's
 * social cover (dark glass keys, blue rim light, glowing glyphs).
 *
 * Pure SVG with gradients and one blur filter, so it renders on the server,
 * costs no JavaScript and stays sharp at any size. Decorative: the steps are
 * also written out as text beside each key.
 */

const steps = [
  {
    label: "Send a brief",
    detail: "Tell us what you need built",
    // A document with a folded corner.
    glyph: (
      <>
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5" />
        <path d="M10 13h6M10 17h4" />
      </>
    ),
  },
  {
    label: "Short call",
    detail: "We test the requirements",
    // A speech bubble.
    glyph: (
      <>
        <path d="M4 5h16v11H10l-5 4v-4H4z" />
        <path d="M8 9.5h8M8 12.5h5" />
      </>
    ),
  },
  {
    label: "Fixed price",
    detail: "Scope and timeline in 48 hours",
    // A tick in a ring.
    glyph: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.2 2.8 2.8L16 9.5" />
      </>
    ),
  },
];

function Keycap({ glyph }: { glyph: React.ReactNode }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 120 132"
      className="h-auto w-full max-w-[120px] drop-shadow-[0_18px_22px_rgba(8,11,24,0.28)]"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}face`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#2b3442" />
          <stop offset="0.55" stopColor="#141a24" />
          <stop offset="1" stopColor="#0a0e15" />
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1a33" />
          <stop offset="1" stopColor="#05070f" />
        </linearGradient>
        <linearGradient id={`${id}rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#18a8e8" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={`${id}sheen`} cx="0.3" cy="0.15" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}pool`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#18a8e8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#18a8e8" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* Light pooling on the surface below the key */}
      <ellipse cx="60" cy="122" rx="52" ry="9" fill={`url(#${id}pool)`} />

      {/* Extrusion, then the top face */}
      <rect
        x="10"
        y="20"
        width="100"
        height="100"
        rx="26"
        fill={`url(#${id}side)`}
      />
      <rect
        x="10"
        y="8"
        width="100"
        height="100"
        rx="26"
        fill={`url(#${id}face)`}
      />
      <rect
        x="10"
        y="8"
        width="100"
        height="100"
        rx="26"
        fill={`url(#${id}sheen)`}
      />
      <rect
        x="10.75"
        y="8.75"
        width="98.5"
        height="98.5"
        rx="25.25"
        fill="none"
        stroke={`url(#${id}rim)`}
        strokeWidth="1.5"
      />

      {/* Glyph: a blurred copy for the glow, then the crisp stroke */}
      <g
        transform="translate(36 34) scale(2)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          stroke="#18a8e8"
          strokeWidth="2.4"
          filter={`url(#${id}glow)`}
          opacity="0.9"
        >
          {glyph}
        </g>
        <g stroke="#bfe9ff" strokeWidth="1.6">
          {glyph}
        </g>
      </g>
    </svg>
  );
}

export default function StepKeycaps() {
  return (
    <ol className="relative grid grid-cols-3 gap-3 sm:gap-6">
      {/* Lit connector running behind the keys */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[16%] right-[16%] top-[31%] h-[2px] rounded-full bg-gradient-to-r from-accent/0 via-sky to-accent/0 shadow-[0_0_12px_2px_rgba(24,168,232,0.45)]"
      />
      {steps.map((s) => (
        <li
          key={s.label}
          className="relative flex flex-col items-center text-center"
        >
          <Keycap glyph={s.glyph} />
          <p className="mt-4 text-[13px] font-medium text-ink">{s.label}</p>
          <p className="mt-1 max-w-[16ch] text-[11px] leading-snug text-ink/65">
            {s.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}
