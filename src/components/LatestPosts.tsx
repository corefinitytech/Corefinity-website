import Link from "next/link";

import { ArrowRight } from "./icons";
import { postsByDate, readingMinutes } from "@/lib/blog";

export default function LatestPosts() {
  const latest = postsByDate().slice(0, 2);

  return (
    <section id="blog" className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( From the blog )
            </p>
            <h2 className="mt-4 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              Notes on building software that{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                survives growth.
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
              Written for the person paying for the software, not the person
              maintaining it. No jargon, no scare stories, no filler.
            </p>
            <Link
              href="/blog"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:bg-ink/85"
            >
              Read the blog
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid content-start gap-3">
            {latest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-[20px] bg-white p-6 transition duration-300 hover:-translate-y-0.5 sm:p-8"
              >
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
                <h3 className="mt-4 text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
                  {post.headline.lead}{" "}
                  <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                    {post.headline.accent}
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-ink">
                  Read article
                  <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:scale-110">
                    <ArrowRight className="size-3.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
