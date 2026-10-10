import Check from "../Check";
import { howToStart } from "@/lib/devices";

/** A low risk first step, replacing the old website pricing blocks. */
export default function HowToStart() {
  return (
    <section id="start" className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
          ( How to start )
        </p>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
          A small first step,{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            then the full build
          </span>
        </h2>

        <ol className="relative mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {howToStart.steps.map((s, i) => (
            <li
              key={s.title}
              className={`flex flex-col rounded-[20px] p-6 ${
                i === 1
                  ? "bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)] text-white"
                  : "border border-black/[0.08] bg-white"
              }`}
            >
              <span
                className={`grid size-9 place-items-center rounded-full text-[13px] font-medium ${
                  i === 1 ? "bg-white text-ink" : "bg-ink text-white"
                }`}
              >
                {i + 1}
              </span>
              <h3
                className={`mt-5 text-xl font-medium tracking-[-0.02em] ${i === 1 ? "" : "text-ink"}`}
              >
                {s.title}
              </h3>
              <p
                className={`mt-1 text-[12px] font-medium uppercase tracking-[0.12em] ${i === 1 ? "text-sky" : "text-accent-ink"}`}
              >
                {s.meta}
              </p>
              <p
                className={`mt-3 text-[13px] leading-relaxed ${i === 1 ? "text-white/80" : "text-ink/65"}`}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <ul className="mt-6 flex flex-wrap gap-2">
          {howToStart.promises.map((p) => (
            <li
              key={p}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-medium text-ink/75"
            >
              <span className="grid size-4 place-items-center rounded-full bg-accent text-white">
                <Check className="size-2.5" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
