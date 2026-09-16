import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import CardNotch from "./CardNotch";

function Tag({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${
        light ? "border-black/10 text-ink/50" : "border-white/20 text-white/70"
      }`}
    >
      {children}
    </span>
  );
}

function Card({
  title,
  body,
  tag,
  className = "",
  titleClassName = "max-w-[20ch]",
  surface,
  light = false,
  children,
}: {
  title: string;
  body?: string;
  tag?: string;
  className?: string;
  titleClassName?: string;
  surface: string;
  light?: boolean;
  children?: ReactNode;
}) {
  return (
    <a
      href="#contact"
      className={`group relative isolate flex flex-col overflow-hidden rounded-[20px] p-6 pb-16 transition duration-300 hover:-translate-y-0.5 ${
        light ? "text-ink" : "text-white"
      } ${className}`}
    >
      <div className={`absolute inset-0 -z-10 ${surface}`} />
      <h3
        className={`text-xl font-medium leading-snug tracking-[-0.02em] ${titleClassName}`}
      >
        {title}
      </h3>
      {body && (
        <p
          className={`mt-3 max-w-[46ch] text-[13px] leading-relaxed ${
            light ? "text-ink/55" : "text-white/65"
          }`}
        >
          {body}
        </p>
      )}
      {children}
      {tag && (
        <div className="mt-auto pt-6">
          <Tag light={light}>{tag}</Tag>
        </div>
      )}
      <CardNotch />
    </a>
  );
}

export default function Capabilities() {
  return (
    <section id="solutions" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
          ( Capabilities )
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            Engineered for Speed, Scalability, and Absolute Control
          </h2>
          <a
            href="#expertise"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-[13px] font-medium text-ink/80 transition hover:border-ink hover:text-ink"
          >
            Explore All Services
            <FontAwesomeIcon icon={faArrowRightLong} className="size-3.5" />
          </a>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(0,1fr))]">
          <Card
            className="min-h-[300px] lg:row-span-2"
            title="Custom B2B Platforms & Dashboards"
            body="Bespoke operations systems, customer portals, and internal workflows engineered to replace disconnected third-party subscriptions and manual spreadsheets."
            tag="Multi-Tenant Architecture"
            surface="bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)]"
          />

          <Card
            className="min-h-[300px] lg:row-span-2"
            title="Direct Booking & Commerce Engines"
            body="Zero-commission transaction flows, automated calendar synchronization, and high-conversion checkout engines tailored to hospitality and direct sales."
            tag="Stripe & iCal Integrated"
            surface="bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:repeating-linear-gradient(115deg,rgba(24,168,232,0.35)_0px,rgba(24,168,232,0.35)_1px,transparent_1px,transparent_10px)]" />
          </Card>

          <Card
            light
            className="min-h-[200px]"
            title="UI/UX Architecture & Rapid Prototyping"
            surface="bg-mist"
          >
            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <p className="max-w-[28ch] text-[12px] leading-relaxed text-ink/50">
                Pixel-perfect design systems built and validated before
                production code is written.
              </p>
              <p className="shrink-0 text-4xl font-medium tracking-tight text-accent">
                100%
              </p>
            </div>
          </Card>

          <Card
            className="min-h-[200px]"
            title="API & Workflow Automation"
            body="Bidirectional integrations with payment gateways, CRMs, WhatsApp notifications, and relational databases."
            tag="Zero Latency"
            surface="bg-[linear-gradient(140deg,#101317_0%,#1b2026_100%)]"
          />

          <Card
            className="min-h-[200px] lg:col-span-3"
            titleClassName="whitespace-nowrap"
            title="Full-Stack Cloud Infrastructure"
            body="Production CI/CD pipelines, lightning-fast edge hosting via Vercel, and enterprise-grade data security standard on every release."
            surface="bg-[linear-gradient(90deg,#14161a_0%,#1a1d23_50%,#123a6b_78%,#1880d8_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
