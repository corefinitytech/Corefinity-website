import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const results = [
  "Engineered an end-to-end direct booking engine and front-desk property management dashboard.",
  "Eliminated 15%–25% third-party OTA commission fees for boutique hotel operators.",
  "Built automated bidirectional iCal calendar synchronization and mobile-first guest check-in passes.",
];

const stats: [string, string][] = [
  ["0%", "OTA fees"],
  ["3 wk", "To launch"],
  ["24/7", "iCal sync"],
];

export default function CaseStudy() {
  return (
    <section id="case-studies" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
              Featured Hospitality Tech Case Study
            </p>
            <p className="mt-6 text-sm font-medium tracking-[0.1em] text-ink/45">
              LODGEX SYSTEMS
            </p>
            <h2 className="mt-3 max-w-lg text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
              From Zero to a Live Direct-Booking OS in Under 3 Weeks
            </h2>

            <ul className="mt-8 grid gap-4 border-t border-black/[0.07] pt-8">
              {results.map((r) => (
                <li
                  key={r}
                  className="flex gap-3 text-[13px] leading-relaxed text-ink/60"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:bg-ink/85"
            >
              View Case Study &amp; Live Demo
              <FontAwesomeIcon icon={faArrowRightLong} className="size-3.5" />
            </a>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink">
            <div className="absolute inset-0 bg-[radial-gradient(110%_120%_at_75%_25%,#1880d8_0%,#123a6b_42%,#0a0f22_78%,#05070f_100%)]" />
            <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="absolute inset-0 grid place-items-center p-8">
              <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                  Lodgex · Booking OS
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {stats.map(([n, l]) => (
                    <div key={l}>
                      <p className="text-xl font-medium text-white">{n}</p>
                      <p className="mt-1 text-[10px] text-white/45">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-2">
                  {[70, 45, 88].map((w) => (
                    <div key={w} className="h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-sky/70"
                        style={{ width: w + "%" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
