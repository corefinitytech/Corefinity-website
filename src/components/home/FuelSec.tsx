import Link from "next/link";

import FilmPlayer from "./FilmPlayer";
import { LockSimple } from "@phosphor-icons/react/dist/ssr";
import TechIcon from "../TechIcon";
import { ArrowRight } from "../icons";
import { GridOverlay } from "../CaseStudyVisual";
import { fuelsec } from "@/lib/devices";

/**
 * Proof that the process has been done for real. Video first, then three
 * lines: problem, what we built, result. Until the facts and the clip arrive,
 * each missing piece is a visible "to confirm" box, never a guess.
 */
export default function FuelSec() {
  return (
    <section id="fuelsec" className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-clip rounded-[32px] bg-ink px-6 py-14 text-white sm:px-12 sm:py-16">
        <GridOverlay />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-accent/25 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* Video slot. Stays pinned while the story beside it scrolls,
              like the FAQ heading. */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <FilmPlayer
              videoId={fuelsec.film.videoId}
              poster={fuelsec.film.poster}
              posterAlt={fuelsec.film.posterAlt}
              title={fuelsec.film.title}
              duration={fuelsec.film.duration}
            />
          </div>

          {/* The three lines */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              ( Case study )
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              FuelSec:{" "}
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
                  {fuelsec.problem}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-sky">
                  What we built
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-white/80">
                  {fuelsec.built}
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {fuelsec.stack.map((t) => (
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
                  {fuelsec.result}
                </dd>
              </div>
            </dl>

            <p className="mt-6 flex items-start gap-2.5 text-[12px] leading-relaxed text-white/60">
              <LockSimple
                weight="duotone"
                className="mt-0.5 size-4 shrink-0 text-sky"
                aria-hidden
              />
              {fuelsec.confidential}
            </p>

            <Link
              href={fuelsec.caseStudy.href}
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-medium text-ink transition hover:bg-white/90"
            >
              {fuelsec.caseStudy.label}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
