import Link from "next/link";

import CardNotch, { CardAction } from "../CardNotch";
import { stages } from "@/lib/devices";

const surfaces = [
  "bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)]",
  "bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]",
  "bg-[linear-gradient(140deg,#14161a_0%,#1a1d23_60%,#123a6b_100%)]",
];

/** Lets each visitor find themselves before reading the process. */
export default function HardwareStage() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
          ( Where you are )
        </p>
        <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
          Where is your{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            hardware today?
          </span>
        </h2>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {stages.cards.map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              className={`group relative isolate flex min-h-[240px] flex-col overflow-hidden rounded-[20px] px-6 pt-6 text-white transition duration-300 hover:-translate-y-0.5 ${surfaces[i]}`}
            >
              <span className="text-[11px] font-medium tracking-[0.18em] text-white/50">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-xl font-medium leading-snug tracking-[-0.02em]">
                {c.title}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-white/75">
                {c.body}
              </p>
              <CardAction label={c.action} dark />
              <CardNotch />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
