import Link from "next/link";

import { CaseStudyScreen, GridOverlay, caseSurface } from "./CaseStudyVisual";
import { ArrowRight } from "./icons";
import { caseStudies } from "@/lib/caseStudies";

/**
 * Home page feature for the first case study. Everything here is read from
 * caseStudies.ts, so the section can only ever show a real engagement; the
 * home page renders it only when hasCaseStudies is true.
 */
export default function CaseStudy() {
  const study = caseStudies[0];
  if (!study) return null;

  return (
    <section id="case-studies" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent-ink">
              Featured {study.industry} Case Study
            </p>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.1em] text-ink/60">
              {study.client}
            </p>
            <h2 className="mt-3 max-w-lg text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
              {study.headline.lead} {study.headline.accent}
            </h2>

            <ul className="mt-8 grid gap-4 border-t border-black/[0.07] pt-8">
              {study.results.slice(0, 3).map((r) => (
                <li
                  key={r}
                  className="flex gap-3 text-[13px] leading-relaxed text-ink/60"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/case-studies/${study.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:bg-ink/85"
              >
                Read the full case study
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-[13px] font-medium text-ink/80 transition hover:border-ink hover:text-ink"
              >
                All case studies
              </Link>
            </div>
          </div>

          <div
            className={`relative isolate grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl p-6 sm:p-8 ${caseSurface[study.theme]}`}
          >
            <GridOverlay />
            <div className="relative w-full max-w-sm">
              <CaseStudyScreen theme={study.theme} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
