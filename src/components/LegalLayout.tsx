import type { ReactNode } from "react";
import Link from "next/link";

import { breadcrumbSchema, graph } from "@/lib/schema";
import { legal, site } from "@/lib/site";
import JsonLd from "./JsonLd";
import { ArrowLeft } from "./icons";
import { H1Eyebrow } from "./PageHeading";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

/**
 * Shared shell for the policy pages. Borrows the page header from /contact and
 * the mist panel from the home sections so the legal pages read as part of the
 * site rather than a bolted on document.
 */
export default function LegalLayout({
  path,
  eyebrow,
  title,
  accent,
  summary,
  sections,
}: {
  /** Route of the page, for its breadcrumb structured data. */
  path: string;
  eyebrow: string;
  title: string;
  /** Tail of the heading, rendered in the brand gradient. */
  accent: string;
  summary: string;
  sections: LegalSection[];
}) {
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

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
              <H1Eyebrow>{eyebrow}</H1Eyebrow>
              {title}{" "}
              <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
                {accent}
              </span>
            </h1>

            <p className="max-w-sm shrink-0 text-sm leading-relaxed text-ink/60 lg:pb-3">
              {summary}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-12 sm:px-12 sm:py-14">
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* Contents */}
            <nav
              aria-label="On this page"
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink/60">
                On this page
              </p>
              <ol className="mt-4 grid gap-2.5">
                {sections.map((s, i) => (
                  <li key={s.id} className="flex gap-3">
                    <span className="mt-px text-[11px] font-medium tabular-nums text-accent-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${s.id}`}
                      className="text-[13px] leading-snug text-ink/60 transition hover:text-ink"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-black/[0.07] pt-6">
                <p className="text-[11px] uppercase tracking-[0.14em] text-ink/60">
                  In effect from
                </p>
                <p className="mt-1.5 text-[13px] font-medium text-ink">
                  {legal.effectiveDate}
                </p>
              </div>
            </nav>

            {/* Body */}
            <div className="min-w-0">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-28 border-t border-black/[0.07] py-8 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-medium tabular-nums text-accent-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-medium leading-snug tracking-[-0.02em] text-ink">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="mt-4 grid gap-4 text-sm leading-relaxed text-ink/65 [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-accent-ink [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2 [&_ul]:pl-5">
                    {s.body}
                  </div>
                </section>
              ))}

              <div className="mt-4 rounded-2xl border border-black/[0.08] bg-white p-6">
                <p className="text-[13px] leading-relaxed text-ink/65">
                  Questions about this page? Write to{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-ink underline underline-offset-4 transition hover:text-accent-ink"
                  >
                    {site.email}
                  </a>{" "}
                  and a person will answer you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <JsonLd
        schema={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: eyebrow, path },
          ]),
        )}
      />
    </main>
  );
}
