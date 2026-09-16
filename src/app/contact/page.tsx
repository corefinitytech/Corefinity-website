import type { Metadata } from "next";
import Link from "next/link";

import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import {
  ArrowLeft,
  Bolt,
  Comments,
  Envelope,
  FileLines,
  MapPin,
} from "@/components/icons";

const title = "Get a Quote";
const description =
  "Send Corefinity your project brief and get a written technical roadmap, a timeline and a fixed price back within 48 hours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} | Corefinity`,
    description,
    url: "/contact",
  },
};

/** Surfaces borrow the deep-space gradients the Capabilities cards use, so
 *  the row reads light to dark without the flat primary blue. */
const steps = [
  {
    icon: FileLines,
    title: "Submit your brief",
    detail: "Share the shape of the project and the outcome you need.",
    surface: "bg-mist",
    light: true,
  },
  {
    icon: Comments,
    title: "Short discovery call",
    detail: "We pressure test the requirements and agree what ships first.",
    surface:
      "bg-[radial-gradient(130%_130%_at_18%_12%,#18a8e8_0%,#1880d8_34%,#0f4c93_68%,#0d2c56_100%)]",
    light: false,
  },
  {
    icon: MapPin,
    title: "Roadmap in 48 hours",
    detail:
      "A written architecture plan, a milestone timeline and a fixed price.",
    surface: "bg-[linear-gradient(140deg,#14161a_0%,#1b2026_55%,#123a6b_100%)]",
    light: false,
  },
];

export default function ContactPage() {
  return (
    <main id="main">
      {/* Page header */}
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
            ( Get a Quote )
          </p>

          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
              Tell us what you&apos;re{" "}
              <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
                building.
              </span>
            </h1>

            <p className="max-w-sm shrink-0 text-sm leading-relaxed text-ink/60 lg:pb-3">
              Every brief is read by the engineer who would build it, not by a
              sales desk. You get a straight answer on scope and timeline.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <ol className="grid gap-3 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`relative overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-0.5 ${
                  s.light ? "text-ink" : "text-white"
                } ${s.surface}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full ${
                      s.light
                        ? "bg-ink text-white"
                        : "bg-white/15 text-white backdrop-blur-sm"
                    }`}
                  >
                    <s.icon className="size-3.5" />
                  </span>
                  <h2 className="text-[15px] font-medium leading-snug tracking-[-0.02em]">
                    {s.title}
                  </h2>
                  <span
                    className={`ml-auto text-[10px] font-medium tracking-[0.18em] ${
                      s.light ? "text-accent-ink" : "text-white/50"
                    }`}
                  >
                    0{i + 1}
                  </span>
                </div>

                <p
                  className={`mt-3 text-[12px] leading-relaxed ${
                    s.light ? "text-ink/65" : "text-white/65"
                  }`}
                >
                  {s.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Brief form */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-14 sm:px-12 sm:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
                Send your{" "}
                <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                  project brief
                </span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
                The more context you give us, the sharper the roadmap that comes
                back.
              </p>

              <div className="mt-8 grid gap-3">
                <a
                  href="mailto:corefinity.tech@gmail.com"
                  className="group flex items-center gap-4 rounded-2xl bg-ink px-5 py-4 text-white transition hover:bg-ink/90"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Envelope className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">
                      Prefer email
                    </span>
                    <span className="block break-words text-[13px] font-medium">
                      corefinity.tech@gmail.com
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white px-5 py-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent-ink">
                    <Bolt className="size-3.5" />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-ink/60">
                      Typical response
                    </span>
                    <span className="block text-[13px] font-medium text-ink">
                      Within one business day
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <QuoteForm />
          </div>
        </div>
      </section>

      <JsonLd
        schema={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path: "/contact" },
          ]),
        )}
      />
    </main>
  );
}
