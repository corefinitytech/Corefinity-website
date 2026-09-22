import type { Metadata } from "next";
import Link from "next/link";

import {
  CaseStudyScreen,
  GridOverlay,
  caseSurface,
} from "@/components/CaseStudyVisual";
import JsonLd from "@/components/JsonLd";
import { H1Eyebrow } from "@/components/PageHeading";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { caseStudies } from "@/lib/caseStudies";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { getService } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";

const title = "Case Studies: AI, Web and Automation Projects";
const description =
  "Corefinity case studies: an AI WhatsApp support assistant, a logistics operations dashboard with Python automation, and a commission free hotel booking engine.";

export const metadata: Metadata = {
  title,
  description,
  keywords: caseStudies.flatMap((c) => c.keywords.slice(0, 2)),
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: "/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
  },
};

export default function CaseStudiesIndex() {
  return (
    <main id="main">
      {/* Header */}
      <section className="px-4 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[12px] font-medium text-ink/60 transition hover:text-ink"
          >
            <ArrowLeft className="size-3 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Link>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
              <H1Eyebrow>Software development case studies</H1Eyebrow>
              Software that earns{" "}
              <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
                its keep.
              </span>
            </h1>

            <p className="max-w-sm shrink-0 text-sm leading-relaxed text-ink/65 lg:pb-3">
              What we built, why it was built that way, and what changed for the
              business afterwards. Each one started as a two minute brief.
            </p>
          </div>
        </div>
      </section>

      {/* Studies */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-4">
          {caseStudies.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group grid overflow-hidden rounded-[32px] bg-mist transition duration-300 hover:-translate-y-0.5 lg:grid-cols-2"
              >
                {/* Text */}
                <div
                  className={`flex flex-col p-7 sm:p-10 lg:p-12 ${flip ? "lg:order-2" : ""}`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent-ink">
                      {c.industry}
                    </span>
                    <span className="text-ink/25">/</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                      {c.client}
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-lg text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
                    {c.headline.lead}{" "}
                    <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                      {c.headline.accent}
                    </span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
                    {c.summary}
                  </p>

                  <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-black/[0.07] pt-6">
                    {c.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                          {m.prefix}
                          {m.value}
                          <span className="text-accent-ink">{m.suffix}</span>
                        </dd>
                        <dd
                          aria-hidden
                          className="mt-1 text-[11px] leading-snug text-ink/60"
                        >
                          {m.label}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                    <ul className="flex flex-wrap gap-1.5">
                      {c.services.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-ink/70"
                        >
                          {getService(s)?.navLabel}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink">
                      Read case study
                      <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:scale-110">
                        <ArrowRight className="size-3.5" />
                      </span>
                    </span>
                  </div>
                </div>

                {/* Visual */}
                <div
                  className={`relative isolate grid min-h-[360px] place-items-center overflow-hidden p-6 sm:p-10 ${caseSurface[c.theme]} ${
                    flip ? "lg:order-1" : ""
                  }`}
                >
                  <GridOverlay />
                  <div className="relative w-full max-w-sm transition duration-500 group-hover:scale-[1.03]">
                    <CaseStudyScreen theme={c.theme} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-white sm:px-12 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                ( Your project next )
              </p>
              <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                Have a problem like{" "}
                <span className="bg-gradient-to-r from-accent to-sky bg-clip-text text-transparent">
                  one of these?
                </span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
                Send a brief and you get a written scope, a timeline and a fixed
                price back within 48 hours.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-medium text-ink transition hover:bg-white/90 sm:w-auto sm:justify-self-start lg:justify-self-end"
            >
              Get a quote
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        schema={graph(
          {
            "@type": "CollectionPage",
            "@id": `${siteUrl}/case-studies#page`,
            name: `${title} | ${site.name}`,
            description,
            url: `${siteUrl}/case-studies`,
            isPartOf: { "@id": `${siteUrl}/#website` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: caseStudies.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.title,
                url: `${siteUrl}/case-studies/${c.slug}`,
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies" },
          ]),
        )}
      />
    </main>
  );
}
