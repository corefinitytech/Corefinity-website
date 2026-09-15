const columns = [
  {
    headline: "Rapid MVP Prototyping",
    detail:
      "Move from concept to a functional, clickable prototype hosted on live staging in days, not quarters.",
  },
  {
    headline: "100% Source Code Ownership",
    detail:
      "No proprietary site builders or locked vendor ecosystems. You retain complete, uncompromised intellectual property and deployment rights.",
  },
  {
    headline: "Integrated Operational Logic",
    detail:
      "We do not stop at front-end visuals; we build live databases, payment settlement pipelines, and automated multi-channel synchronization.",
  },
];

import CardNotch from "./CardNotch";

export default function Advantage() {
  return (
    <section id="expertise" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
          ( Why CoreFinity )
        </p>
        <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
          The{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            CoreFinity Advantage
          </span>
        </h2>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {columns.map((c, i) => (
            <div
              key={c.headline}
              className="group relative flex flex-col overflow-hidden rounded-[20px] bg-mist p-6 pb-16 transition duration-300 hover:-translate-y-0.5"
            >
              <span className="text-[11px] font-medium tracking-[0.18em] text-accent">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-xl font-medium leading-snug tracking-[-0.02em] text-ink">
                {c.headline}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ink/55">
                {c.detail}
              </p>
              <CardNotch />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
