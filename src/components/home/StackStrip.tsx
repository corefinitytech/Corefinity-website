import TechIcon from "../TechIcon";
import { alsoWorksWith, stack } from "@/lib/devices";

function Row({
  label,
  items,
  strong,
  reverse,
}: {
  label: string;
  items: string[];
  strong?: boolean;
  reverse?: boolean;
}) {
  const pill = `inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${
    strong
      ? "border-black/10 bg-white text-ink/80"
      : "border-black/[0.06] bg-mist text-ink/65"
  }`;

  // On a phone eighteen wrapping pills made a ragged block taller than the
  // hero figure above it, so each group is one line that drifts sideways
  // without end, the two groups in opposite directions, fading out at both
  // screen edges. The line holds the pills twice so the loop has no seam; the
  // second set is hidden from screen readers. A finger held on a line pauses
  // it. Under reduced motion nothing drifts and the line swipes by hand
  // instead. From sm up both wrappers dissolve into the row and the pills
  // wrap beside the label as before.
  return (
    <div className="min-w-0 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
      <p className="mb-2.5 text-[11px] uppercase tracking-[0.2em] text-ink/60 sm:mb-0 sm:mr-2">
        ( {label} )
      </p>
      <div className="-mx-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)] [scrollbar-width:none] motion-reduce:overflow-x-auto motion-reduce:px-4 sm:contents [&::-webkit-scrollbar]:hidden">
        <ul
          role="list"
          aria-label={label}
          className={`flex w-max gap-2 pr-2 active:[animation-play-state:paused] motion-reduce:animate-none sm:contents ${
            reverse
              ? "animate-marquee-reverse [animation-duration:44s]"
              : "animate-marquee [animation-duration:34s]"
          }`}
        >
          {items.map((t) => (
            <li key={t} className={pill}>
              <TechIcon name={t} className="size-3.5 shrink-0 text-ink/60" />
              {t}
            </li>
          ))}
          {items.map((t) => (
            <li
              key={`again-${t}`}
              aria-hidden
              className={`${pill} motion-reduce:hidden sm:hidden`}
            >
              <TechIcon name={t} className="size-3.5 shrink-0 text-ink/60" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * What an engineer pattern matches on. The first row is only what we have
 * shipped in client work; the second is what the team also works with, kept
 * separate so the proof never overstates.
 */
export default function StackStrip() {
  return (
    <section
      aria-label="Tools we have shipped with and also work with"
      className="px-4 pb-20 pt-6 sm:px-6 sm:pb-24"
    >
      <div className="mx-auto grid max-w-7xl gap-5 border-b border-black/[0.07] pb-8 sm:gap-3">
        <Row label="Shipped with" items={stack} strong />
        <Row label="Also works with" items={alsoWorksWith} reverse />
      </div>
    </section>
  );
}
