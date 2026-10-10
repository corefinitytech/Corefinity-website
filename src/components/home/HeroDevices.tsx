import {
  CloudArrowUp,
  Cpu,
  DeviceMobile,
  PresentationChart,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { H1Eyebrow } from "../PageHeading";
import { ArrowRight } from "../icons";
import { hero } from "@/lib/devices";

/**
 * Phosphor icons (MIT), duotone weight: a filled tint behind a fine outline,
 * which reads as designed rather than drawn. The SSR build renders on the
 * server, so nothing ships to the browser.
 */
const icons: Record<string, Icon> = {
  Device: Cpu,
  "Phone or gateway": DeviceMobile,
  Cloud: CloudArrowUp,
  "Admin panel": PresentationChart,
};

/**
 * The hero visual: device, phone or gateway, cloud, admin panel, with packets
 * moving along each hop. Pure markup and one CSS animation, so it renders on
 * the server, costs no JavaScript and stops for reduced motion.
 */
function DeviceLine() {
  return (
    <div className="relative mt-10 overflow-hidden rounded-[28px] bg-[radial-gradient(120%_140%_at_15%_50%,#0f5bb5_0%,#123a78_40%,#0a1730_70%,#05070f_100%)] px-5 py-12 sm:mt-14 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-sky/25 blur-3xl"
      />

      <ol
        aria-label="How data travels: device, phone or gateway, cloud, admin panel"
        className="relative mx-auto grid max-w-5xl grid-cols-4 items-start"
      >
        {hero.flow.map((stop, i) => (
          <li
            key={stop}
            className="relative flex flex-col items-center text-center"
          >
            {/* The hop to the next stop, with a packet riding it */}
            {i < hero.flow.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[calc(50%+2rem)] right-[calc(-50%+2rem)] top-7 h-px bg-gradient-to-r from-sky/60 to-sky/20 sm:left-[calc(50%+2.75rem)] sm:right-[calc(-50%+2.75rem)] sm:top-10"
              >
                <span
                  className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky shadow-[0_0_12px_3px_rgba(24,168,232,0.7)] motion-safe:animate-packet motion-reduce:hidden"
                  style={{ animationDelay: `${i * 0.8}s` }}
                />
              </span>
            )}
            <span className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/[0.07] text-sky shadow-2xl shadow-black/30 backdrop-blur-md sm:size-20 sm:rounded-3xl">
              {(() => {
                const I = icons[stop];
                return (
                  <I
                    weight="duotone"
                    className="size-7 sm:size-10"
                    aria-hidden
                  />
                );
              })()}
            </span>
            <span className="mt-3 text-[11px] font-medium leading-tight text-white sm:mt-4 sm:text-sm">
              {stop}
            </span>
            <span className="mt-1 hidden text-[11px] text-white/55 sm:block">
              {
                [
                  "Your hardware",
                  "BLE or LoRa",
                  "AWS IoT Core",
                  "Fleet and users",
                ][i]
              }
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HeroDevices() {
  return (
    <section id="home" className="px-4 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-3xl text-[clamp(2.75rem,7.4vw,6rem)] font-medium leading-[0.96] tracking-[-0.035em] text-ink">
            <H1Eyebrow>{hero.eyebrow}</H1Eyebrow>
            {hero.lead}{" "}
            <span className="whitespace-nowrap bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
              {hero.accent}
            </span>
          </h1>

          <div className="max-w-sm shrink-0 lg:pb-3">
            <p className="text-sm leading-relaxed text-ink/65">{hero.sub}</p>
            <div className="mt-6 grid gap-3">
              <a
                href={hero.primary.href}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-white transition hover:bg-ink/85"
              >
                {hero.primary.label}
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={hero.secondary.href}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/10 px-5 text-[13px] font-medium text-ink/75 transition hover:border-ink hover:text-ink"
              >
                {hero.secondary.label}
              </a>
            </div>
          </div>
        </div>

        <DeviceLine />
      </div>
    </section>
  );
}
