import Check from "../Check";
import { teamFit } from "@/lib/devices";

/** Answers the design house reader directly. */
export default function TeamFit() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[32px] bg-mist px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
            ( Working with your team )
          </p>
          <h2 className="mt-4 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            We fit beside{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              your hardware team.
            </span>
          </h2>
        </div>

        <ul className="grid content-start gap-3">
          {teamFit.points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 text-[14px] leading-relaxed text-ink/80"
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                <Check className="size-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
