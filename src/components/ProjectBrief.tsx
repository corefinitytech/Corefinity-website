import Link from "next/link";

import Check from "./Check";
import { ArrowRight } from "./icons";
import { site } from "@/lib/site";

/**
 * Closing CTA band. The brief form itself lives on /contact, so this section
 * carries the decision instead: what you get, what it costs you to ask, and
 * the two ways to start.
 */
const assurances = [
  "A written roadmap back within 48 hours",
  "You own 100% of the code and the IP",
  "No retainers, no discovery fees",
];

export default function ProjectBrief() {
  return (
    <section id="contact" className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( Start Here )
            </p>
            <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
              Have a project{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                in mind?
              </span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60">
              Tell us what you are building and when you need it live. We will
              come back with a technical plan and a price.
            </p>
          </div>

          <div className="rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/65">
                Accepting new projects
              </span>
            </div>

            <ul className="mt-6 grid gap-3">
              {assurances.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-3 text-[13px] leading-relaxed"
                >
                  <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Check className="size-3" />
                  </span>
                  <span className="text-ink/65">{a}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-black/[0.07] pt-6">
              <Link
                href="/contact"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink/85"
              >
                Get a Quote
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <p className="mt-4 text-center text-[12px] text-ink/60">
                Prefer email?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-ink/70 underline underline-offset-4 transition hover:text-accent-ink"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
