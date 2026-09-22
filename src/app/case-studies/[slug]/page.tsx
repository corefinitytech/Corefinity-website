import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CardNotch from "@/components/CardNotch";
import {
  CaseStudyBackdrop,
  CaseStudyScreen,
  GridOverlay,
  caseSurface,
} from "@/components/CaseStudyVisual";
import Check from "@/components/Check";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, H1Eyebrow } from "@/components/PageHeading";
import { CountUpOutline } from "@/components/backgrounds/LazyBackgrounds";
import { ArrowRight } from "@/components/icons";
import { getCaseStudy, caseStudies, nextCaseStudy } from "@/lib/caseStudies";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { getService } from "@/lib/services";
import type { ServicePage } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";

/** Every case study is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Anything outside that list is a hard 404. Without this, the root loading
// boundary starts streaming a 200 before notFound() runs, which search engines
// treat as a soft 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const url = `/case-studies/${study.slug}`;
  return {
    title: study.title,
    description: study.description,
    keywords: study.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${study.title} | ${site.name}`,
      description: study.description,
      url,
      publishedTime: study.datePublished,
      authors: [site.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} | ${site.name}`,
      description: study.description,
    },
  };
}

/** Same surface cycle as the service pages, so the two read as one system. */
const surfaces = [
  "bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)]",
  "bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]",
  "bg-[linear-gradient(140deg,#101317_0%,#1b2026_100%)]",
  "bg-[linear-gradient(140deg,#0d1a33_0%,#123a6b_100%)]",
  "bg-[linear-gradient(140deg,#14161a_0%,#1a1d23_60%,#123a6b_100%)]",
  "bg-[linear-gradient(105deg,#05070f_0%,#0d2a52_45%,#1868c8_82%,#18a8e8_100%)]",
];

const eyebrow = "text-[11px] uppercase tracking-[0.2em]";
const h2 =
  "text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const services = study.services
    .map(getService)
    .filter((s): s is ServicePage => Boolean(s));
  const next = nextCaseStudy(study);
  const url = `${siteUrl}/case-studies/${study.slug}`;

  const facts: [string, string][] = [
    ["Client", study.client],
    ["Industry", study.industry],
    ["Timeline", study.timeline],
    ["Year", study.year],
  ];

  return (
    <main id="main">
      {/* Header */}
      <section className="px-4 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            trail={[
              { name: "Home", href: "/" },
              { name: "Case studies", href: "/case-studies" },
              { name: study.client, href: `/case-studies/${study.slug}` },
            ]}
          />

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
              <H1Eyebrow>{`${study.industry} case study`}</H1Eyebrow>
              {study.headline.lead}{" "}
              <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
                {study.headline.accent}
              </span>
            </h1>

            <div className="w-full max-w-sm shrink-0 lg:pb-3">
              <p className="text-sm leading-relaxed text-ink/65">
                {study.summary}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.08]">
                {facts.map(([k, v]) => (
                  <div key={k} className="bg-white px-4 py-3">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-ink/55">
                      {k}
                    </dt>
                    <dd className="mt-1 text-[13px] font-medium text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase, with the headline numbers floating over its lower edge */}
      <section className="px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div
            className={`relative isolate grid min-h-[460px] place-items-center overflow-hidden rounded-[32px] px-6 pb-28 pt-12 sm:min-h-[520px] sm:pb-32 lg:min-h-[560px] ${caseSurface[study.theme]}`}
          >
            <div className="absolute inset-0 -z-10">
              <CaseStudyBackdrop theme={study.theme} />
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
            <GridOverlay size={48} />
            <div className="relative w-full max-w-sm">
              <CaseStudyScreen theme={study.theme} />
            </div>
          </div>

          <dl className="relative z-10 mx-3 -mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#e8e9ed] bg-[#e8e9ed] shadow-xl shadow-black/[0.06] sm:mx-8 lg:grid-cols-4">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col-reverse bg-white p-5 sm:p-6"
              >
                <dt className="mt-2 text-[12px] leading-snug text-ink/60">
                  {m.label}
                </dt>
                <dd className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  {m.prefix}
                  {m.value}
                  <span className="text-accent-ink">{m.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Challenge and approach */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={`${eyebrow} text-ink/60`}>( The challenge )</p>
            <h2 className={`mt-4 max-w-md ${h2} text-ink`}>
              What was getting in the way
            </h2>
            <div className="mt-6 grid gap-4">
              {study.challenge.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-ink/65">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-mist p-7 sm:p-10">
            <p className={`${eyebrow} text-accent-ink`}>( Our approach )</p>
            <h2 className={`mt-4 max-w-md ${h2} text-ink`}>
              How we{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                solved it
              </span>
            </h2>
            <div className="mt-6 grid gap-4">
              {study.approach.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-ink/65">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we built */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <p className={`${eyebrow} text-ink/60`}>( What we built )</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className={`max-w-2xl ${h2} text-ink`}>
              The pieces that make it work
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink/65">
              Delivered in {study.timeline}, with the source code, accounts and
              documentation handed over in full.
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {study.built.map((b, i) => (
              <article
                key={b.title}
                className={`group relative isolate flex flex-col overflow-hidden rounded-[20px] p-6 pb-16 text-white transition duration-300 hover:-translate-y-0.5 ${
                  surfaces[i % surfaces.length]
                }`}
              >
                <span className="text-[11px] font-medium tracking-[0.18em] text-white/50">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-xl font-medium leading-snug tracking-[-0.02em]">
                  {b.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/75">
                  {b.body}
                </p>
                <CardNotch />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-white sm:px-12 sm:py-20">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center text-[clamp(4rem,13vw,11rem)] font-semibold leading-[0.8] tracking-tighter text-white/[0.04]"
          >
            Results
          </span>

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className={`${eyebrow} text-white/50`}>( The outcome )</p>
              <h2 className={`mt-5 max-w-md ${h2}`}>
                What changed for{" "}
                <span className="bg-gradient-to-r from-accent to-sky bg-clip-text text-transparent">
                  {study.client}.
                </span>
              </h2>
              <ul className="mt-8 grid gap-3">
                {study.results.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 text-[14px] leading-relaxed text-white/75"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-ink text-white">
                      <Check className="size-3" />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-2 gap-3 self-center">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col-reverse rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
                >
                  <dt className="mt-3 text-[12px] leading-snug text-white/60">
                    {m.label}
                  </dt>
                  <dd className="flex items-baseline text-[clamp(2.5rem,5vw,3.75rem)] font-medium leading-none tracking-tight">
                    {m.prefix && (
                      <span
                        className="text-transparent"
                        style={{ WebkitTextStroke: "1.5px var(--color-sky)" }}
                      >
                        {m.prefix}
                      </span>
                    )}
                    <CountUpOutline
                      to={m.value}
                      strokeColor="var(--color-sky)"
                    />
                    {m.suffix && (
                      <span
                        className="text-[0.55em] text-transparent"
                        style={{ WebkitTextStroke: "1px var(--color-sky)" }}
                      >
                        {m.suffix}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className={`${eyebrow} text-ink/60`}>( How it was delivered )</p>
          <h2 className={`mt-4 ${h2} text-ink`}>
            {study.timeline},{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              start to launch
            </span>
          </h2>

          <ol
            className={`mt-10 grid gap-3 md:grid-cols-2 ${
              study.phases.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {study.phases.map((p, i) => (
              <li
                key={p.title}
                className="relative flex flex-col overflow-hidden rounded-[20px] bg-mist p-6 transition duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-ink text-[11px] font-medium text-white">
                    {i + 1}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent-ink">
                    {p.when}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium leading-snug tracking-[-0.02em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/65">
                  {p.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services and stack */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-black/[0.07] pt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={`${eyebrow} text-ink/60`}>( Services used )</p>
            <ul className="mt-6 grid gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-5 transition hover:border-ink/20"
                  >
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium tracking-[-0.01em] text-ink">
                        {s.name}
                      </span>
                      <span className="mt-1 block text-[12px] leading-relaxed text-ink/60">
                        {s.summary}
                      </span>
                    </span>
                    <ArrowRight className="ml-auto size-4 shrink-0 text-ink/60 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={`${eyebrow} text-ink/60`}>( Built with )</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-black/10 bg-mist px-4 py-2 text-[13px] text-ink/75"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-ink/60">
              Mainstream tools with deep talent pools, so the client is never
              dependent on us to maintain what we built.
            </p>
          </div>
        </div>
      </section>

      {/* Read next and CTA */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-[1.1fr_1fr]">
          <Link
            href={`/case-studies/${next.slug}`}
            className={`group relative isolate flex min-h-[320px] flex-col overflow-hidden rounded-[32px] p-8 text-white transition duration-300 hover:-translate-y-0.5 sm:p-10 ${caseSurface[next.theme]}`}
          >
            <GridOverlay />
            <p className={`relative ${eyebrow} text-white/60`}>
              ( Read next / {next.industry} )
            </p>
            <h2 className="relative mt-5 max-w-md text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              {next.headline.lead} {next.headline.accent}
            </h2>
            <p className="relative mt-4 max-w-sm text-[13px] leading-relaxed text-white/70">
              {next.summary}
            </p>
            <CardNotch />
          </Link>

          <div className="flex flex-col justify-between rounded-[32px] bg-mist p-8 sm:p-10">
            <div>
              <h2 className="max-w-md text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
                Want results{" "}
                <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                  like these?
                </span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
                Send a brief and you get a written scope, a timeline and a fixed
                price back within 48 hours. It costs nothing and commits you to
                nothing.
              </p>
            </div>
            <Link
              href="/contact"
              className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink/85 sm:w-auto sm:self-start"
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
            "@type": "Article",
            "@id": `${url}#article`,
            headline: study.title,
            description: study.description,
            keywords: study.keywords.join(", "),
            articleSection: "Case studies",
            datePublished: study.datePublished,
            dateModified: study.datePublished,
            url,
            mainEntityOfPage: url,
            image: `${url}/opengraph-image`,
            inLanguage: "en",
            author: { "@id": `${siteUrl}/#organization` },
            publisher: { "@id": `${siteUrl}/#organization` },
            isPartOf: { "@id": `${siteUrl}/#website` },
            about: services.map((s) => ({
              "@id": `${siteUrl}/services/${s.slug}#service`,
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies" },
            { name: study.client, path: `/case-studies/${study.slug}` },
          ]),
        )}
      />
    </main>
  );
}
