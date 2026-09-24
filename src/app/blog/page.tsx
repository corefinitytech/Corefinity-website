import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import { H1Eyebrow } from "@/components/PageHeading";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { postsByDate, readingMinutes } from "@/lib/blog";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { getService } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";

const title = "Blog: Building Software That Handles Growth";
const description =
  "Plain English writing from the Corefinity team on scalability, custom software, automation and the decisions that decide whether growth helps or hurts a business.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
  },
};

/** Surfaces cycle so a column of posts does not read as one flat block. */
const surfaces = [
  "bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)]",
  "bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]",
  "bg-[linear-gradient(140deg,#14161a_0%,#1a1d23_60%,#123a6b_100%)]",
];

export default function BlogIndex() {
  const all = postsByDate();

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
              <H1Eyebrow>Corefinity blog</H1Eyebrow>
              Notes on building software that{" "}
              <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
                survives growth.
              </span>
            </h1>

            <p className="max-w-sm shrink-0 text-sm leading-relaxed text-ink/65 lg:pb-3">
              Written for the person paying for the software, not the person
              maintaining it. No jargon, no scare stories, no filler.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-4">
          {all.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid overflow-hidden rounded-[32px] bg-mist transition duration-300 hover:-translate-y-0.5 lg:grid-cols-[1.15fr_1fr]"
            >
              <div className="flex flex-col p-7 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent-ink">
                    {post.topic}
                  </span>
                  <span aria-hidden className="text-ink/25">
                    /
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
                    {readingMinutes(post)} minute read
                  </span>
                </div>

                <h2 className="mt-5 max-w-lg text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
                  {post.headline.lead}{" "}
                  <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                    {post.headline.accent}
                  </span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
                  <ul className="flex flex-wrap gap-1.5">
                    {post.services.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-ink/70"
                      >
                        {getService(s)?.navLabel}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink">
                    Read article
                    <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:scale-110">
                      <ArrowRight className="size-3.5" />
                    </span>
                  </span>
                </div>
              </div>

              {/* Cover */}
              <div
                className={`relative grid min-h-[260px] place-items-center overflow-hidden p-8 text-white ${
                  surfaces[i % surfaces.length]
                }`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]"
                />
                <p className="relative max-w-[26ch] text-center text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-snug tracking-[-0.02em]">
                  {post.description.split(".")[0]}.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <h2 className="max-w-xl text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
                Rather talk about{" "}
                <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                  your own system?
                </span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
                Send a brief and you get a written scope, a timeline and a fixed
                price back within 48 hours. It costs nothing and commits you to
                nothing.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink/85 sm:w-auto sm:justify-self-start lg:justify-self-end"
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
            "@type": "Blog",
            "@id": `${siteUrl}/blog#blog`,
            name: `${title} | ${site.name}`,
            description,
            url: `${siteUrl}/blog`,
            inLanguage: "en",
            publisher: { "@id": `${siteUrl}/#organization` },
            isPartOf: { "@id": `${siteUrl}/#website` },
            blogPost: all.map((p) => ({
              "@type": "BlogPosting",
              "@id": `${siteUrl}/blog/${p.slug}#post`,
              headline: p.title,
              description: p.description,
              datePublished: p.datePublished,
              url: `${siteUrl}/blog/${p.slug}`,
              author: { "@id": `${siteUrl}/#organization` },
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        )}
      />
    </main>
  );
}
