import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CardNotch from "@/components/CardNotch";
import Check from "@/components/Check";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, H1Eyebrow } from "@/components/PageHeading";
import { ArrowRight } from "@/components/icons";
import { caseStudiesFor } from "@/lib/caseStudies";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { getService, relatedTo, services } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";

/** Every service page is known at build time, so all of them prerender. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
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
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.description,
      url: `/services/${service.slug}`,
    },
  };
}

/** Surfaces cycle so a column of cards does not read as one flat block. */
const surfaces = [
  "bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)]",
  "bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]",
  "bg-[linear-gradient(140deg,#101317_0%,#1b2026_100%)]",
  "bg-[linear-gradient(140deg,#0d1a33_0%,#123a6b_100%)]",
  "bg-[linear-gradient(140deg,#14161a_0%,#1a1d23_60%,#123a6b_100%)]",
  "bg-[linear-gradient(105deg,#05070f_0%,#0d2a52_45%,#1868c8_82%,#18a8e8_100%)]",
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = relatedTo(service);
  const studies = caseStudiesFor(service.slug);

  return (
    <main id="main">
      {/* Header */}
      <section className="px-4 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            trail={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.name, href: `/services/${service.slug}` },
            ]}
          />

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
              <H1Eyebrow>{service.name}</H1Eyebrow>
              {service.headline.lead}{" "}
              <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
                {service.headline.accent}
              </span>
            </h1>

            <div className="max-w-sm shrink-0 lg:pb-3">
              <p className="text-sm leading-relaxed text-ink/65">
                {service.summary}
              </p>
              <Link
                href="/contact"
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-white transition hover:bg-ink/85"
              >
                Get a quote
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
            {service.intro.map((p) => (
              <p key={p} className="text-[15px] leading-relaxed text-ink/65">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What it covers */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
            ( What this covers )
          </p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            {service.name}, in practice
          </h2>

          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {service.covers.map((c, i) => (
              <article
                key={c.title}
                className={`group relative isolate flex flex-col overflow-hidden rounded-[20px] p-6 pb-16 text-white transition duration-300 hover:-translate-y-0.5 ${
                  surfaces[i % surfaces.length]
                }`}
              >
                <h3 className="text-xl font-medium leading-snug tracking-[-0.02em]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/75">
                  {c.body}
                </p>
                <CardNotch />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who it suits */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                ( Worth talking to us if )
              </p>
              <h2 className="mt-5 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
                Any of this sounds{" "}
                <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                  familiar.
                </span>
              </h2>
            </div>

            <ul className="grid content-start gap-3">
              {service.suitedTo.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 text-[13px] leading-relaxed text-ink/70"
                >
                  <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-accent-ink text-white">
                    <Check className="size-3" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
            ( How we work )
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            The shape of a{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              typical build
            </span>
          </h2>

          <ol className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li
                key={step.title}
                className="group relative flex flex-col overflow-hidden rounded-[20px] bg-mist p-6 pb-10 transition duration-300 hover:-translate-y-0.5"
              >
                <span className="text-[11px] font-medium tracking-[0.18em] text-accent-ink">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-lg font-medium leading-snug tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/65">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Handover and stack */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-white sm:px-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                ( What you end up owning )
              </p>
              <h2 className="mt-5 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                Everything, and{" "}
                <span className="bg-gradient-to-r from-accent to-sky bg-clip-text text-transparent">
                  no strings.
                </span>
              </h2>
              <ul className="mt-8 grid gap-3">
                {service.handover.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-[13px] leading-relaxed text-white/75"
                  >
                    <span className="mt-0.5 shrink-0 text-sky">
                      <Check className="size-4" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pt-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                ( Built with )
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-white/75"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-white/60">
                Mainstream tools with deep talent pools, chosen so you are never
                dependent on us to maintain what we built.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            Questions about{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              {service.name}
            </span>
          </h2>

          <dl className="mt-10 divide-y divide-black/[0.07] border-y border-black/[0.07]">
            {service.faqs.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="text-base font-medium tracking-[-0.01em] text-ink">
                  {f.q}
                </dt>
                <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/65">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Proof: case studies that used this service */}
      {studies.length > 0 && (
        <section className="px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                  ( In practice )
                </p>
                <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
                  {service.navLabel}{" "}
                  <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                    case studies
                  </span>
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-[13px] font-medium text-ink/80 transition hover:border-ink hover:text-ink"
              >
                All case studies
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div
              className={`mt-10 grid gap-3 ${studies.length > 1 ? "md:grid-cols-2" : ""}`}
            >
              {studies.map((c, i) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className={`group relative isolate flex min-h-[220px] flex-col overflow-hidden rounded-[20px] p-6 pb-16 text-white transition duration-300 hover:-translate-y-0.5 ${
                    surfaces[(i + 1) % surfaces.length]
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                    {c.industry} / {c.client}
                  </p>
                  <h3 className="mt-4 max-w-md text-xl font-medium leading-snug tracking-[-0.02em]">
                    {c.headline.lead} {c.headline.accent}
                  </h3>
                  <p className="mt-auto pt-6 text-[13px] text-white/75">
                    <span className="text-2xl font-medium text-white">
                      {c.metrics[0].prefix}
                      {c.metrics[0].value}
                      {c.metrics[0].suffix}
                    </span>{" "}
                    {c.metrics[0].label.toLowerCase()}
                  </p>
                  <CardNotch />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related and CTA */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 className="max-w-md text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
                Tell us what you{" "}
                <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                  need building.
                </span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
                Send a brief and you get a written scope, a timeline and a fixed
                price back within 48 hours. It costs nothing and commits you to
                nothing.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink/85"
              >
                Get a quote
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                ( Often paired with )
              </p>
              <ul className="mt-6 grid gap-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-5 transition hover:border-ink/20"
                    >
                      <span className="min-w-0">
                        <span className="block text-[15px] font-medium tracking-[-0.01em] text-ink">
                          {r.name}
                        </span>
                        <span className="mt-1 block text-[12px] leading-relaxed text-ink/60">
                          {r.summary}
                        </span>
                      </span>
                      <ArrowRight className="ml-auto size-4 shrink-0 text-ink/60 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        schema={graph(
          {
            "@type": "Service",
            "@id": `${siteUrl}/services/${service.slug}#service`,
            name: service.name,
            description: service.description,
            serviceType: service.name,
            provider: { "@id": `${siteUrl}/#organization` },
            areaServed: { "@type": "Place", name: "Worldwide" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${service.name} deliverables`,
              itemListElement: service.covers.map((c) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: c.title,
                  description: c.body,
                },
              })),
            },
          },
          {
            "@type": "FAQPage",
            "@id": `${siteUrl}/services/${service.slug}#faq`,
            mainEntity: service.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        )}
      />
    </main>
  );
}
