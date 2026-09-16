import Check from "./Check";
import { ArrowRight } from "./icons";

const tiers = [
  {
    name: "Prototype Sprint",
    target:
      "Best for showcase sites and MVPs you need in front of people quickly.",
    turnaround: "10 to 14 Business Days",
    deliverables: [
      "Custom Figma design system",
      "Responsive Next.js and Tailwind build",
      "Interactive modules and motion detail",
      "Vercel edge hosting, custom domain and SEO setup",
    ],
    cta: "Choose Prototype Sprint",
    featured: false,
  },
  {
    name: "Platform OS",
    target:
      "Best for custom operational dashboards, booking systems, and client portals.",
    turnaround: "3 to 4 Weeks",
    deliverables: [
      "Everything included in Prototype Sprint",
      "Role based access and protected admin dashboards",
      "Stripe or your preferred payment gateway",
      "Two way API, database and calendar sync",
      "30 days of technical support after launch",
    ],
    cta: "Build Your Platform OS",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            Clear scope, fixed price,{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              no retainers.
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            You know what is being built and what it costs before we start.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.featured
                  ? "border border-transparent bg-ink text-white"
                  : "border border-black/[0.08] bg-white text-ink"
              }`}
            >
              {t.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-accent-ink px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Recommended
                </span>
              )}

              <h3 className="text-2xl font-medium tracking-[-0.02em]">
                {t.name}
              </h3>
              <p
                className={`mt-3 max-w-[42ch] text-[13px] leading-relaxed ${
                  t.featured ? "text-white/60" : "text-ink/65"
                }`}
              >
                {t.target}
              </p>

              <div
                className={`mt-6 flex items-center gap-2 border-y py-4 text-[13px] ${
                  t.featured ? "border-white/10" : "border-black/[0.07]"
                }`}
              >
                <span className={t.featured ? "text-white/50" : "text-ink/60"}>
                  Turnaround
                </span>
                <span className="ml-auto font-medium">{t.turnaround}</span>
              </div>

              <ul className="mb-8 mt-6 grid content-start gap-3">
                {t.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex gap-3 text-[13px] leading-relaxed"
                  >
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${
                        t.featured ? "text-sky" : "text-accent-ink"
                      }`}
                    />
                    <span
                      className={t.featured ? "text-white/75" : "text-ink/65"}
                    >
                      {d}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 pt-0 text-[13px] font-medium transition ${
                  t.featured
                    ? "bg-white text-ink hover:bg-white/90"
                    : "bg-ink text-white hover:bg-ink/85"
                }`}
              >
                {t.cta}
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
