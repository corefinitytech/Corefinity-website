import type { Metadata } from "next";
import Link from "next/link";

import Check from "@/components/Check";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, H1Eyebrow } from "@/components/PageHeading";
import { SocialIcon } from "@/components/SocialIcons";
import { ArrowRight } from "@/components/icons";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { services } from "@/lib/services";
import {
  address,
  founders,
  foundersPublic,
  openGraphDefaults,
  site,
  siteUrl,
  socialLinks,
} from "@/lib/site";

const title = "About Us: Who We Are and How We Work";
const description =
  "CoreFinity Tech is a software company in Islamabad building the app, cloud and admin software for connected devices, working with hardware teams worldwide.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "about CoreFinity Tech",
    "CoreFinity Tech",
    "software development company Islamabad",
    "custom software team Pakistan",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    ...openGraphDefaults,
    title: `${title} | ${site.name}`,
    description,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${site.name}`,
    description,
  },
};

/** The four promises every page on the site makes, in one strip. */
const facts: [string, string][] = [
  ["Fixed price", "agreed before any work starts"],
  ["48 hours", "from brief to a written roadmap"],
  ["100%", "of the code and the IP is yours"],
  ["Worldwide", "remote delivery, from Islamabad"],
];

const steps: [string, string][] = [
  [
    "You send a brief",
    "A few paragraphs is enough. What you are building, who it is for, and when you need it live.",
  ],
  [
    "We come back with a scope",
    "A written plan, a timeline and a fixed price inside 48 hours. No hourly meter, no discovery invoice.",
  ],
  [
    "We build in the open",
    "Work lands on a staging link you can watch. You see progress weekly rather than at the end.",
  ],
  [
    "You get the keys",
    "Repositories, design files, environment keys and the database, handed over in your name.",
  ],
];

const principles = [
  "No page builders or plugin stacks dressed up as a custom build.",
  "No retainer you have to keep paying just to keep your own software running.",
  "No accounts in our name. Hosting, domains and services are set up as yours.",
  "No technology nobody else can maintain, so you are never stuck with us.",
  "No guesses presented as facts. If something is uncertain, we say so.",
];

/** Monogram tiles, so the team reads as a set without stock photography. */
const monograms = [
  "bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)]",
  "bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]",
  "bg-[linear-gradient(140deg,#14161a_0%,#1a1d23_60%,#123a6b_100%)]",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 1)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function AboutPage() {
  return (
    <main id="main">
      {/* Header */}
      <section className="px-4 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            trail={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
          />

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl text-[clamp(2.25rem,5.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink">
              <H1Eyebrow>About CoreFinity Tech</H1Eyebrow>A small team building{" "}
              <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
                software worth owning.
              </span>
            </h1>

            <div className="w-full max-w-sm shrink-0 lg:pb-3">
              <p className="text-sm leading-relaxed text-ink/65">
                CoreFinity Tech builds the app, cloud and admin software for
                connected devices, and the web platforms and dashboards around
                them. We are based in Islamabad and work remotely with hardware
                teams across the world.
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

      {/* What we promise, every time */}
      <section className="px-4 pt-14 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-[#e8e9ed] bg-[#e8e9ed] lg:grid-cols-4">
            {facts.map(([value, label]) => (
              <div
                key={label}
                className="flex flex-col-reverse bg-white p-6 sm:p-7"
              >
                <dt className="mt-2 text-[12px] leading-snug text-ink/60">
                  {label}
                </dt>
                <dd className="text-[clamp(1.5rem,2.6vw,2rem)] font-medium tracking-tight text-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why we exist */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( Why we exist )
            </p>
            <h2 className="mt-4 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              Most software problems start as{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                business problems.
              </span>
            </h2>
          </div>

          <div className="grid gap-5">
            <p className="text-[15px] leading-relaxed text-ink/70">
              Almost every project we are asked about starts the same way.
              Something that worked fine at the beginning has stopped fitting. A
              spreadsheet runs a process nobody fully understands any more. Four
              subscriptions hold four pieces of the same job, and somebody
              retypes data between them every morning.
            </p>
            <p className="text-[15px] leading-relaxed text-ink/70">
              Off the shelf tools are good at the common case and poor at the
              one thing that makes a business different. That last part is
              usually where the money is, and it is usually the part no product
              will bend to fit. Custom software is worth it exactly there, and
              rarely anywhere else. We will tell you when a cheaper tool would
              do the job.
            </p>
            <p className="text-[15px] leading-relaxed text-ink/70">
              So we keep the work narrow and the price fixed. You should be able
              to see what you are buying before you commit to it, and own every
              part of it afterwards.
            </p>
          </div>
        </div>
      </section>

      {/* The founders. Hidden while the company is in stealth; see
          foundersPublic in lib/site.ts. */}
      {foundersPublic && (
        <section className="px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( The team )
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
                Founded and run by{" "}
                <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                  three people
                </span>
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-ink/65">
                You deal with the people who build the work. There is no account
                manager relaying messages between you and a developer.
              </p>
            </div>

            <ul className="mt-10 grid gap-3 md:grid-cols-3">
              {founders.map((person, i) => (
                <li
                  key={person.name}
                  className="group overflow-hidden rounded-[24px] border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06]"
                >
                  <div
                    className={`relative grid h-48 place-items-center overflow-hidden ${
                      monograms[i % monograms.length]
                    }`}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-14 -top-16 size-52 rounded-full bg-sky/25 blur-3xl transition duration-500 group-hover:bg-sky/40"
                    />
                    <span
                      aria-hidden
                      className="relative text-[clamp(2.5rem,5vw,3.25rem)] font-medium tracking-tight text-white"
                    >
                      {initials(person.name)}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-medium tracking-[-0.02em] text-ink">
                      {person.name}
                    </p>
                    <p className="mt-1 text-[13px] text-ink/60">Co founder</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* How we work */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
            ( How we work )
          </p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            Four steps, and you can stop{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              after any of them.
            </span>
          </h2>

          <ol className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([heading, detail], i) => (
              <li
                key={heading}
                className="flex flex-col rounded-[20px] bg-white p-6 transition duration-300 hover:-translate-y-0.5"
              >
                <span className="text-[11px] font-medium tracking-[0.18em] text-accent-ink">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-lg font-medium leading-snug tracking-[-0.02em] text-ink">
                  {heading}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/65">
                  {detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we will not do */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( Where we draw the line )
            </p>
            <h2 className="mt-4 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              The things we{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                will not do.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
              Most of what goes wrong in this industry comes down to a handful
              of habits. These are the ones we refuse.
            </p>
          </div>

          <ul className="grid content-start gap-3">
            {principles.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-black/[0.08] bg-white p-5 text-[14px] leading-relaxed text-ink/75"
              >
                <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-accent-ink text-white">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where we are */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-white sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                ( Where we are )
              </p>
              <h2 className="mt-5 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                Islamabad, working{" "}
                <span className="bg-gradient-to-r from-accent to-sky bg-clip-text text-transparent">
                  with the world.
                </span>
              </h2>
              <address className="mt-6 text-sm not-italic leading-relaxed text-white/65">
                {address.streetAddress},
                <br />
                {address.addressLocality} {address.postalCode},{" "}
                {address.countryName}
              </address>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block break-words text-sm font-medium text-white transition hover:text-sky"
              >
                {site.email}
              </a>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {socialLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition hover:text-white"
                    >
                      <SocialIcon network={l.label} className="size-3.5" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                ( What we build )
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[13px] transition hover:border-white/30"
                    >
                      {s.navLabel}
                      <ArrowRight className="ml-auto size-3.5 shrink-0 text-white/50 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <h2 className="max-w-xl text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
                Tell us what you are{" "}
                <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                  trying to build.
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
            "@type": "AboutPage",
            "@id": `${siteUrl}/about#page`,
            name: `${title} | ${site.name}`,
            description,
            url: `${siteUrl}/about`,
            inLanguage: "en",
            isPartOf: { "@id": `${siteUrl}/#website` },
            about: { "@id": `${siteUrl}/#organization` },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />
    </main>
  );
}
