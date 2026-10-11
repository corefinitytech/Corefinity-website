import TechIcon from "../TechIcon";
import { alsoWorksWith, stack } from "@/lib/devices";

function Row({
  label,
  items,
  strong,
}: {
  label: string;
  items: string[];
  strong?: boolean;
}) {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      <li className="mr-2 w-full text-[11px] uppercase tracking-[0.2em] text-ink/60 sm:w-auto">
        ( {label} )
      </li>
      {items.map((t) => (
        <li
          key={t}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${
            strong
              ? "border-black/10 bg-white text-ink/80"
              : "border-black/[0.06] bg-mist text-ink/65"
          }`}
        >
          <TechIcon name={t} className="size-3.5 shrink-0 text-ink/60" />
          {t}
        </li>
      ))}
    </ul>
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
      <div className="mx-auto grid max-w-7xl gap-3 border-b border-black/[0.07] pb-8">
        <Row label="Shipped with" items={stack} strong />
        <Row label="Also works with" items={alsoWorksWith} />
      </div>
    </section>
  );
}
