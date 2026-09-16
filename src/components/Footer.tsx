import Link from "next/link";

import Brand from "./Brand";
import ConsentReset from "./ConsentReset";
import { site } from "@/lib/site";

/**
 * Every link here resolves to something that exists. Placeholder hrefs were
 * removed rather than pointed at "#", which reads as an unfinished site and
 * gives crawlers nothing to follow.
 */
const sections = [
  { label: "What we build", href: "/#solutions" },
  { label: "How we work", href: "/#process" },
  { label: "Case study", href: "/#case-studies" },
  { label: "Engagements", href: "/#pricing" },
  { label: "Questions", href: "/#faq" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookie policy", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-black/5 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Brand className="h-6 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              {site.shortDescription}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block break-words text-sm font-medium text-ink transition hover:text-accent-ink"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-12 gap-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink/60">
                Explore
              </p>
              <ul className="mt-4 grid gap-2.5">
                {sections.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink/60 transition hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink/60">
                Start
              </p>
              <ul className="mt-4 grid gap-2.5">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-ink/60 transition hover:text-ink"
                  >
                    Get a quote
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-ink/60 transition hover:text-ink"
                  >
                    Email us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink/60">
                Legal
              </p>
              <ul className="mt-4 grid gap-2.5">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink/60 transition hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <ConsentReset
                    label="Cookie settings"
                    className="text-sm [&>button]:font-normal [&>button]:text-ink/60 [&>button]:no-underline [&>button:hover]:text-ink [&>span]:hidden"
                  />
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-black/5 pt-6">
          <p className="text-xs text-ink/60">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink/60">
            You own every line of code we write for you.
          </p>
        </div>
      </div>
    </footer>
  );
}
