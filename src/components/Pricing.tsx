import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import Check from "./Check";

const tiers = [
  {
    name: "Prototype Sprint",
    target:
      "Best for conversion-focused showcase sites and interactive MVP validations.",
    turnaround: "10 to 14 Business Days",
    deliverables: [
      "Custom Figma UI/UX Design System",
      "High-Performance Next.js & Tailwind Responsive Web Build",
      "Interactive Showcase Modules & Micro-Interactions",
      "Vercel Edge Hosting, Custom Domain & SEO Setup",
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
      "Multi-Role Authentication & Protected Admin Dashboards",
      "Stripe / Global Payment Gateway Integration",
      "Bidirectional API, Database & Calendar Synchronization",
      "30 Days Post-Deployment Technical Support & Optimization",
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
            Predictable Investment.{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              Zero Agency Bureaucracy.
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            Transparent scopes designed for rapid execution and clear ROI.
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
                <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  Recommended
                </span>
              )}

              <h3 className="text-2xl font-medium tracking-[-0.02em]">
                {t.name}
              </h3>
              <p
                className={`mt-3 max-w-[42ch] text-[13px] leading-relaxed ${
                  t.featured ? "text-white/60" : "text-ink/55"
                }`}
              >
                {t.target}
              </p>

              <div
                className={`mt-6 flex items-center gap-2 border-y py-4 text-[13px] ${
                  t.featured ? "border-white/10" : "border-black/[0.07]"
                }`}
              >
                <span className={t.featured ? "text-white/40" : "text-ink/40"}>
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
                        t.featured ? "text-sky" : "text-accent"
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
                <FontAwesomeIcon icon={faArrowRightLong} className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
