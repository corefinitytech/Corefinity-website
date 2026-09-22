import type { ReactNode } from "react";
import Link from "next/link";

import CardNotch from "./CardNotch";
import { ArrowRight } from "./icons";
import {
  ContourDomeBackground,
  CountUpOutline,
  GhostFibersBackground,
  GradientBlindsBackground,
  GradientWavesBackground,
  MoltenMetalBackground,
  OrbParticlesBackground,
} from "./backgrounds/LazyBackgrounds";
import { palette } from "./backgrounds/palette";

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
        light ? "border-black/10 text-ink/65" : "border-white/20 text-white/70"
      }`}
    >
      {children}
    </span>
  );
}

function Card({
  href,
  title,
  body,
  tag,
  className = "",
  titleClassName = "max-w-[20ch]",
  surface,
  light = false,
  background,
  children,
}: {
  /** The service page this card describes. The card's own title and body
   *  are the link text, so the anchor describes where it goes. */
  href: string;
  title: string;
  body?: string;
  tag?: string;
  className?: string;
  titleClassName?: string;
  surface: string;
  light?: boolean;
  /** Animated procedural layer, rendered between the surface gradient and
   *  the content. The surface gradient stays underneath as the fallback if
   *  WebGL fails or the effect hasn't loaded yet, so the card is never blank. */
  background?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative isolate flex flex-col overflow-hidden rounded-[20px] p-6 pb-16 transition duration-300 hover:-translate-y-0.5 ${
        light ? "text-ink" : "text-white"
      } ${className}`}
    >
      <div className={`absolute inset-0 -z-10 ${surface}`} />
      {background && <div className="absolute inset-0 -z-10">{background}</div>}
      {background && (
        <div
          className={`pointer-events-none absolute inset-0 -z-10 ${
            light
              ? "bg-gradient-to-b from-mist/90 via-mist/40 to-transparent"
              : "bg-gradient-to-b from-black/60 via-black/15 to-transparent"
          }`}
        />
      )}
      <h3
        className={`text-xl font-medium leading-snug tracking-[-0.02em] ${titleClassName}`}
      >
        {title}
      </h3>
      {body && (
        <p
          className={`mt-3 max-w-[46ch] text-[13px] leading-relaxed ${
            light ? "text-ink/65" : "text-white/65"
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
    </Link>
  );
}

export default function Capabilities() {
  return (
    <section id="solutions" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
          ( Capabilities )
        </p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            Built to run fast and stay under your control
          </h2>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-[13px] font-medium text-ink/80 transition hover:border-ink hover:text-ink"
          >
            Explore All Services
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          <Card
            className="min-h-[300px] lg:row-span-2"
            href="/services/web-development"
            title="Web Platforms & Dashboards"
            body="Frontend, backend and everything between. Operations systems, customer portals, SaaS dashboards and internal tools that replace the pile of subscriptions and spreadsheets you are running now."
            tag="Multitenant architecture"
            surface="bg-[radial-gradient(120%_120%_at_20%_15%,#1880d8_0%,#0f4c93_38%,#0d1a33_74%,#080b18_100%)]"
            background={
              <MoltenMetalBackground
                color1={palette.deepNavy}
                color2={palette.electricBlue}
                color3={palette.cyan}
                colorMode="molten"
                speed={0.3}
                scale={5}
                detail={4}
                glow={2.2}
                coreSize={0.15}
                swirl={1.3}
                fold={-0.3}
                blackPoint={0.02}
                brightness={2.2}
                grain
                grainIntensity={0.04}
                mouseInteraction
                mouseStrength={0.25}
              />
            }
          />

          <Card
            className="min-h-[300px] lg:row-span-2"
            href="/services/ai-development"
            title="AI & Chatbot Development"
            body="Assistants that answer from your own documents, agents that handle the repetitive queries, and language models wired into the systems you already run rather than bolted on beside them."
            tag="Built with guardrails"
            surface="bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]"
            background={
              <GhostFibersBackground
                lineColor={palette.deepNavy}
                glowColor={palette.cyan}
                layers={6}
                scale={1.6}
                speed={0.16}
                twist={0.14}
                lineSharpness={14}
                glowIntensity={1.3}
                brightness={1.7}
                vignette={0.7}
              />
            }
          />

          <Card
            className="min-h-[200px]"
            href="/services/mobile-app-development"
            title="Mobile Applications"
            body="Cross platform apps for iOS and Android, plus the APIs and admin tooling that sit behind them."
            tag="One codebase"
            surface="bg-[linear-gradient(140deg,#101317_0%,#1b2026_100%)]"
            background={
              <GradientBlindsBackground
                gradientColors={[palette.deepNavy, palette.electricBlue, palette.cyan]}
                angle={18}
                noise={0.25}
                blindCount={14}
                blindMinWidth={40}
                mirrorGradient
                spotlightRadius={0.6}
                spotlightSoftness={1.2}
                spotlightOpacity={0.9}
                mouseDampening={0.15}
                shineDirection="left"
                mixBlendMode="lighten"
              />
            }
          />

          <Card
            className="min-h-[200px]"
            href="/services/python-automation"
            title="Python Scripting & Automation"
            body="Data pipelines, scraping, scheduled jobs and reporting that take the repetitive work off someone's desk."
            tag="Runs unattended"
            surface="bg-[linear-gradient(140deg,#0d1a33_0%,#123a6b_100%)]"
            background={
              <OrbParticlesBackground
                particleColors={[palette.cyan, palette.electricBlue, palette.offWhite]}
                particleCount={750}
                particleSpread={3.2}
                cameraDistance={20}
                speed={0.1}
                particleBaseSize={46}
                shellThickness={0.16}
                jitter={0.3}
                moveParticlesOnHover
                particleHoverFactor={0.6}
                alphaParticles
                disableRotation={false}
                pixelRatio={2}
              />
            }
          />

          <Card
            light
            className="min-h-[200px]"
            href="/services/seo"
            title="Search Engine Optimisation"
            surface="bg-mist"
            background={<ContourDomeBackground variant="light" />}
          >
            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <p className="max-w-[28ch] text-[12px] leading-relaxed text-ink/65">
                Technical SEO, structured data, page speed and the content
                structure search engines actually reward.
              </p>
              <CountUpOutline
                to={100}
                className="shrink-0 text-4xl font-medium tracking-tight"
              />
            </div>
          </Card>

          <Card
            className="min-h-[200px]"
            href="/services/systems-integration"
            title="Systems Integration"
            body="Two way connections across payment gateways, CRMs, WhatsApp, calendars and databases."
            tag="Nothing typed twice"
            surface="bg-[linear-gradient(140deg,#14161a_0%,#1a1d23_60%,#123a6b_100%)]"
          />

          <Card
            light
            className="min-h-[200px]"
            href="/services/ui-ux-design"
            title="UI & UX Design"
            body="Design systems built and agreed in Figma before any production code is written, so nobody pays to rebuild a screen twice."
            surface="bg-mist"
            background={<ContourDomeBackground variant="light" mirror />}
          />

          <Card
            className="min-h-[200px] lg:col-span-2"
            href="/case-studies/hotel-direct-booking-engine"
            title="Direct Booking & Commerce"
            body="Commission free reservation and checkout flows with Stripe settlement and two way calendar sync, built so operators stop handing 15 to 25 percent of revenue to booking portals."
            tag="Stripe & iCal"
            surface="bg-[linear-gradient(105deg,#05070f_0%,#0d2a52_45%,#1868c8_82%,#18a8e8_100%)]"
          />

          <Card
            className="min-h-[200px]"
            href="/services/cloud-deployment"
            title="Cloud & Deployment"
            body="CI and CD pipelines, edge hosting, monitoring and security on every release."
            surface="bg-[linear-gradient(140deg,#101317_0%,#1b2026_100%)]"
            background={
              <GradientWavesBackground
                horizonColor={palette.baseNearBlack}
                waveColor={palette.deepNavy}
                crestColor={palette.cyan}
                speed={0.22}
                grain
                grainIntensity={0.05}
                mouseInteraction
                parallaxStrength={0.35}
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
