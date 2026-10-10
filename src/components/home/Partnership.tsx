import Link from "next/link";
import {
  ArrowsClockwise,
  Coins,
  FileText,
  Pulse,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { ArrowRight } from "../icons";
import { partnership } from "@/lib/devices";

const icons: Record<string, Icon> = {
  pulse: Pulse,
  shield: ShieldCheck,
  coins: Coins,
  update: ArrowsClockwise,
  report: FileText,
};

/**
 * The monthly partnership, shown as the way we prefer to work, with one off
 * builds welcomed in the same breath so neither reads as second best.
 */
export default function Partnership() {
  return (
    <section id="partnership" className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)] px-6 py-14 text-white sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-sky/20 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
              ( {partnership.eyebrow} )
            </p>
            <h2 className="mt-4 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              {partnership.lead}{" "}
              <span className="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
                {partnership.accent}
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
              {partnership.intro}
            </p>

            <Link
              href={partnership.cta.href}
              className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-medium text-ink transition hover:bg-white/90 sm:w-auto sm:self-start"
            >
              {partnership.cta.label}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <p className="mt-auto max-w-sm border-t border-white/10 pt-6 text-[13px] leading-relaxed text-white/70 lg:mt-10">
              {partnership.oneOff}
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {partnership.items.map((item, i) => {
              const I = icons[item.icon];
              return (
                <li
                  key={item.title}
                  className={`rounded-[20px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm ${
                    i === partnership.items.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-sky/15 text-sky">
                    <I weight="duotone" className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-medium tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">
                    {item.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
