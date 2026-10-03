import Link from "next/link";

import CardNotch from "./CardNotch";
import CoverPlate from "./blog/CoverPlate";
import { ArrowRight } from "./icons";
import { postsByDate, readingMinutes } from "@/lib/blog";
import { getService } from "@/lib/services";

/**
 * The three most recent articles, on the home page.
 *
 * One card per article, all the same shape. With a single article published
 * the row simply holds one card rather than padding the space out.
 */

export default function BlogTeaser() {
  const latest = postsByDate().slice(0, 3);
  if (!latest.length) return null;

  return (
    <section id="blog" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
          ( Blogs )
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            What we have learned,{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              written plainly
            </span>
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-[13px] font-medium text-ink/80 transition hover:border-ink hover:text-ink"
          >
            View more articles
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-[24px] border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06]"
            >
              {/* Cover: the post's engraved plate on matching paper */}
              <CoverPlate
                src={post.cover.src}
                alt={post.cover.alt}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="flex h-48 items-end p-5"
                plateClassName="pb-12 pt-3"
              >
                <div className="relative flex w-full items-end justify-between gap-4">
                  <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/75 backdrop-blur-sm">
                    {post.topic}
                  </span>
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] text-ink/65 backdrop-blur-sm">
                    {readingMinutes(post)} min read
                  </span>
                </div>
              </CoverPlate>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6 pb-16">
                <h3 className="text-xl font-medium leading-snug tracking-[-0.02em] text-ink">
                  {post.headline.lead}{" "}
                  <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                    {post.headline.accent}
                  </span>
                </h3>
                <p className="mt-3 max-w-[46ch] text-[13px] leading-relaxed text-ink/60">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-6">
                  <ul className="flex flex-wrap gap-1.5">
                    {post.services.slice(0, 3).map((slug) => (
                      <li
                        key={slug}
                        className="rounded-full border border-black/10 px-3 py-1 text-[11px] text-ink/60"
                      >
                        {getService(slug)?.navLabel}
                      </li>
                    ))}
                  </ul>
                  <span className="text-[13px] font-medium text-ink/70 transition group-hover:text-ink">
                    Read article
                  </span>
                </div>
              </div>

              <CardNotch />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
