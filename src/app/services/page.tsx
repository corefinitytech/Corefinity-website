import type { Metadata } from "next";
import Link from "next/link";

import CardNotch from "@/components/CardNotch";
import JsonLd from "@/components/JsonLd";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { services } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";

const title = "Services";
const description =
  "Web development, mobile apps, AI and chatbots, Python automation, SEO, systems integration, UI and UX design, and cloud deployment. Fixed scope, full code ownership.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: "/services",
  },
};

/** Two feature cards then a tighter grid, so the page has a shape. */
const surfaces = [
  "bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)]",
  "bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]",
  "bg-[linear-gradient(140deg,#101317_0%,#1b2026_100%)]",
  "bg-[linear-gradient(140deg,#0d1a33_0%,#123a6b_100%)]",
  "bg-[linear-gradient(140deg,#14161a_0%,#1a1d23_60%,#123a6b_100%)]",
  "bg-[linear-gradient(105deg,#05070f_0%,#0d2a52_45%,#1868c8_82%,#18a8e8_100%)]",
  "bg-[radial-gradient(130%_130%_at_80%_20%,#18a8e8_0%,#1570bc_36%,#0d2c56_100%)]",
  "bg-[linear-gradient(140deg,#050b14_0%,#0f3a66_60%,#14161a_100%)]",
];

export default function ServicesIndex() {
  return (
    <main id="main">
      <section className="px-4 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[12px] font-medium text-ink/60 transition hover:text-ink"
          >
            <ArrowLeft className="size-3 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Link>

          <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-ink/60">
            ( Services )
          </p>

          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
              Everything we{" "}
              <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
                build and run.
              </span>
            </h1>

            <p className="max-w-sm shrink-0 text-sm leading-relaxed text-ink/65 lg:pb-3">
              Eight services, one team. Most projects use several of them, which
              is the point of having them under one roof.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`group relative isolate flex min-h-[260px] flex-col overflow-hidden rounded-[20px] p-6 pb-16 text-white transition duration-300 hover:-translate-y-0.5 ${
                  surfaces[i % surfaces.length]
                } ${i < 2 ? "lg:col-span-2 lg:min-h-[300px]" : ""}`}
              >
                <h2 className="text-xl font-medium leading-snug tracking-[-0.02em]">
                  {s.name}
                </h2>
                <p className="mt-3 max-w-[46ch] text-[13px] leading-relaxed text-white/75">
                  {s.summary}
                </p>
                <CardNotch />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <h2 className="max-w-xl text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
                Not sure which of these{" "}
                <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                  you need?
                </span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
                Describe the problem rather than the solution. Working out which
                pieces it takes is our job, and we would rather tell you the
                answer is smaller than you expected than sell you more of it.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink/85 sm:w-auto sm:justify-self-start lg:justify-self-end"
            >
              Send a project brief
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        schema={graph(
          {
            "@type": "CollectionPage",
            "@id": `${siteUrl}/services#page`,
            name: `${title} | ${site.name}`,
            description,
            url: `${siteUrl}/services`,
            isPartOf: { "@id": `${siteUrl}/#website` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: `${siteUrl}/services/${s.slug}`,
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        )}
      />
    </main>
  );
}
