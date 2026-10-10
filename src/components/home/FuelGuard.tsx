import Link from "next/link";
import { LockSimple } from "@phosphor-icons/react/dist/ssr";
import TechIcon from "../TechIcon";
import { ArrowRight } from "../icons";
import { GridOverlay } from "../CaseStudyVisual";
import { fuelguard } from "@/lib/devices";

/**
 * Proof that the process has been done for real. Video first, then three
 * lines: problem, what we built, result. Until the facts and the clip arrive,
 * each missing piece is a visible "to confirm" box, never a guess.
 */
export default function FuelGuard() {
  return (
    <section id="fuelguard" className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-white sm:px-12 sm:py-16">
        <GridOverlay />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-accent/25 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* Video slot */}
          <div>
            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-[24px] border border-white/15 bg-[radial-gradient(120%_120%_at_30%_20%,#1880d8_0%,#0f3a66_45%,#05070f_100%)]">
              {/* Placeholder until the device demo video is added */}
              <div className="grid place-items-center gap-4 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-white/10 backdrop-blur-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-1 size-6 text-white/70"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M7 4.5v15l12.5-7.5z" />
                  </svg>
                </span>
                <span className="rounded-full border border-white/20 bg-black/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                  Device demo coming soon
                </span>
              </div>
            </div>
          </div>

          {/* The three lines */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              ( Case study )
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              FuelGuard:{" "}
              <span className="bg-gradient-to-r from-sky to-white bg-clip-text text-transparent">
                catching fuel fraud at the dispenser.
              </span>
            </h2>

            <dl className="mt-8 grid gap-6">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-sky">
                  Problem
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-white/80">
                  {fuelguard.problem}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-sky">
                  What we built
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-white/80">
                  {fuelguard.built}
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {fuelguard.stack.map((t) => (
                      <li
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[12px] text-white/80"
                      >
                        <TechIcon name={t} className="size-3 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-sky">
                  Result
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-white/80">
                  {fuelguard.result}
                </dd>
              </div>
            </dl>

            <p className="mt-6 flex items-start gap-2.5 text-[12px] leading-relaxed text-white/60">
              <LockSimple
                weight="duotone"
                className="mt-0.5 size-4 shrink-0 text-sky"
                aria-hidden
              />
              {fuelguard.confidential}
            </p>

            <Link
              href={fuelguard.caseStudy.href}
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-medium text-ink transition hover:bg-white/90"
            >
              {fuelguard.caseStudy.label}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
