import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, H1Eyebrow } from "@/components/PageHeading";
import { diagrams } from "@/components/blog/Diagrams";
import { ArrowRight } from "@/components/icons";
import {
  getPost,
  nextPost,
  posts,
  readingMinutes,
  type BlogBlock,
} from "@/lib/blog";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { getService, type ServicePage } from "@/lib/services";
import { site, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Anything outside that list is a hard 404 rather than a soft one.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${post.title} | ${site.name}`,
      description: post.description,
      url,
      publishedTime: post.datePublished,
      authors: [site.name],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${site.name}`,
      description: post.description,
    },
  };
}

const prose = "text-[17px] leading-[1.75] text-ink/75";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-14 text-[clamp(1.5rem,3vw,2.15rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-10 text-xl font-medium tracking-[-0.02em] text-ink">
          {block.text}
        </h3>
      );
    case "p":
      return <p className={`mt-6 ${prose}`}>{block.text}</p>;
    case "quote":
      return (
        <blockquote className="mt-10 border-l-2 border-accent pl-6 text-[clamp(1.25rem,2.4vw,1.6rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
          {block.text}
        </blockquote>
      );
    case "list": {
      const items = block.items.map((item, i) => (
        <li key={item} className="flex gap-4">
          <span
            aria-hidden
            className={`mt-0.5 shrink-0 text-[13px] font-medium ${
              block.ordered ? "w-5 text-accent-ink" : "text-accent"
            }`}
          >
            {block.ordered ? `0${i + 1}` : "•"}
          </span>
          <span className={prose}>{item}</span>
        </li>
      ));
      return block.ordered ? (
        <ol className="mt-6 grid gap-4">{items}</ol>
      ) : (
        <ul className="mt-6 grid gap-4">{items}</ul>
      );
    }
    case "callout":
      return (
        <div className="mt-10 rounded-[24px] bg-mist p-7 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
            {block.title}
          </p>
          <ul className="mt-5 grid gap-3">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink/75">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "figure": {
      const Diagram = diagrams[block.diagram];
      return (
        <figure className="mt-12 lg:-mx-16 xl:-mx-24">
          <div className="overflow-x-auto rounded-[24px] border border-black/[0.08] bg-white p-5 sm:p-8">
            <div className="min-w-[540px]">
              <Diagram />
            </div>
          </div>
          <figcaption className="mt-3 text-[13px] leading-relaxed text-ink/60">
            {block.caption}
            <span className="mt-1 block text-ink/45 sm:hidden">
              Scroll sideways to see the whole diagram.
            </span>
          </figcaption>
        </figure>
      );
    }
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const services = post.services
    .map(getService)
    .filter((s): s is ServicePage => Boolean(s));
  const next = nextPost(post);
  const url = `${siteUrl}/blog/${post.slug}`;
  const published = new Date(post.datePublished).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <main id="main">
      {/* Header */}
      <section className="px-4 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            trail={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.topic, href: `/blog/${post.slug}` },
            ]}
          />

          <h1 className="mt-8 text-[clamp(2.1rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink">
            <H1Eyebrow>{post.topic}</H1Eyebrow>
            {post.headline.lead}{" "}
            <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
              {post.headline.accent}
            </span>
          </h1>

          <p className="mt-6 text-[19px] leading-relaxed text-ink/70">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-black/[0.07] py-4 text-[12px] text-ink/60">
            <span className="font-medium text-ink">{site.name}</span>
            <span aria-hidden className="text-ink/25">
              /
            </span>
            <time dateTime={post.datePublished}>{published}</time>
            <span aria-hidden className="text-ink/25">
              /
            </span>
            <span>{readingMinutes(post)} minute read</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="px-4 sm:px-6">
        <article className="mx-auto max-w-3xl pb-4 pt-2">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>
      </section>

      {/* Questions this article gets asked */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[clamp(1.5rem,3vw,2.15rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
            Common questions about{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              {post.topic.toLowerCase()}
            </span>
          </h2>

          <dl className="mt-8 divide-y divide-black/[0.07] border-y border-black/[0.07]">
            {post.faqs.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="text-base font-medium tracking-[-0.01em] text-ink">
                  {f.q}
                </dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-ink/70">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Read next */}
      {next && (
        <section className="px-4 pb-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col gap-4 rounded-[24px] border border-black/[0.08] bg-mist p-7 transition hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-ink/60">
                  ( Read next / {next.topic} )
                </span>
                <span className="mt-3 block max-w-lg text-[clamp(1.15rem,2.2vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
                  {next.headline.lead}{" "}
                  <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                    {next.headline.accent}
                  </span>
                </span>
                <span className="mt-2 block max-w-md text-[13px] leading-relaxed text-ink/60">
                  {next.excerpt}
                </span>
              </span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:scale-110">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Where to go next */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-white sm:px-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                ( Before the busy day )
              </p>
              <h2 className="mt-5 max-w-md text-[clamp(1.75rem,3.6vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                Find out where your system{" "}
                <span className="bg-gradient-to-r from-accent to-sky bg-clip-text text-transparent">
                  gives way first.
                </span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
                Send a short brief about what you have running today. You get a
                written view of the current limits, the likely bottleneck and
                what it would take to raise the ceiling, within 48 hours.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-medium text-ink transition hover:bg-white/90"
              >
                Ask for a capacity review
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                ( Related services )
              </p>
              <ul className="mt-6 grid gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/30"
                    >
                      <span className="min-w-0">
                        <span className="block text-[15px] font-medium tracking-[-0.01em]">
                          {s.name}
                        </span>
                        <span className="mt-1 block text-[12px] leading-relaxed text-white/60">
                          {s.summary}
                        </span>
                      </span>
                      <ArrowRight className="ml-auto size-4 shrink-0 text-white/60 transition-transform duration-300 group-hover:translate-x-1" />
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
            "@type": "BlogPosting",
            "@id": `${url}#post`,
            headline: post.title,
            description: post.description,
            keywords: post.keywords.join(", "),
            datePublished: post.datePublished,
            dateModified: post.datePublished,
            url,
            mainEntityOfPage: url,
            image: `${url}/opengraph-image`,
            inLanguage: "en",
            wordCount: readingMinutes(post) * 200,
            author: { "@id": `${siteUrl}/#organization` },
            publisher: { "@id": `${siteUrl}/#organization` },
            isPartOf: { "@id": `${siteUrl}/#website` },
            about: services.map((s) => ({
              "@id": `${siteUrl}/services/${s.slug}#service`,
            })),
          },
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: post.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.topic, path: `/blog/${post.slug}` },
          ]),
        )}
      />
    </main>
  );
}
