"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

import Brand from "./Brand";
import Fillet from "./Fillet";

/** Silhouette constants, shared by the tabs and their concave fillets. */
const TAB_W = 44;
const TAB_H = 112;
const BAR_W = 176;
const BAR_H = 56;
const FILLET = 20;

const slides = [
  {
    label: "Platform Architecture · Edge Deployed",
    surface:
      "bg-[radial-gradient(120%_140%_at_15%_50%,#0f5bb5_0%,#123a78_40%,#0a1730_70%,#05070f_100%)]",
    glow: "bg-[radial-gradient(70%_90%_at_88%_35%,rgba(24,168,232,0.45)_0%,rgba(10,14,30,0)_62%)]",
  },
  {
    label: "Operations Dashboards · Multi-Tenant",
    surface:
      "bg-[radial-gradient(120%_140%_at_80%_30%,#1880d8_0%,#0f4c93_42%,#0a1a33_74%,#05070f_100%)]",
    glow: "bg-[radial-gradient(60%_80%_at_12%_70%,rgba(24,168,232,0.4)_0%,rgba(10,14,30,0)_60%)]",
  },
  {
    label: "Direct Booking Engines · Zero Commission",
    surface:
      "bg-[linear-gradient(115deg,#05070f_0%,#0d2a52_45%,#1868c8_78%,#18a8e8_100%)]",
    glow: "bg-[radial-gradient(65%_85%_at_50%_100%,rgba(15,91,181,0.5)_0%,rgba(10,14,30,0)_62%)]",
  },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const go = (step: number) =>
    setIndex((i) => (i + step + slides.length) % slides.length);

  return (
    <div className="relative mt-10 aspect-[16/8] w-full sm:mt-14 sm:aspect-[16/7]">
      {/* Card */}
      <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-ink">
        {slides.map((s, i) => (
          <div
            key={s.label}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 ${s.surface}`} />
            <div className={`absolute inset-0 ${s.glow}`} />
          </div>
        ))}

        <div className="absolute inset-0 opacity-[0.16] mix-blend-overlay [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="absolute inset-0 grid place-items-center px-16">
          <div className="text-center">
            <Brand variant="light" className="mx-auto h-9 w-auto sm:h-12" />
            <p
              key={slides[index].label}
              className="mt-4 animate-[fade-in_600ms_ease-out] text-[10px] uppercase tracking-[0.22em] text-white/50 sm:text-xs"
            >
              {slides[index].label}
            </p>
          </div>
        </div>
      </div>

      {/* Left tab: slide controls */}
      <div
        className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-r-[20px] bg-white pr-1"
        style={{ width: TAB_W, height: TAB_H }}
      >
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="grid size-8 place-items-center rounded-full text-ink/55 transition hover:bg-black/5 hover:text-ink"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="size-3.5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="grid size-8 place-items-center rounded-full text-ink/55 transition hover:bg-black/5 hover:text-ink"
        >
          <FontAwesomeIcon icon={faAngleRight} className="size-3.5" />
        </button>
      </div>
      <Fillet
        size={FILLET}
        origin="100% 0%"
        style={{ left: 0, top: `calc(50% - ${TAB_H / 2 + FILLET}px)` }}
      />
      <Fillet
        size={FILLET}
        origin="100% 100%"
        style={{ left: 0, top: `calc(50% + ${TAB_H / 2}px)` }}
      />

      {/* Bottom-right tab: watch slides */}
      <div
        className="absolute bottom-0 right-0 flex items-center justify-center rounded-tl-[24px] bg-white pl-4"
        style={{ width: BAR_W, height: BAR_H }}
      >
        <button className="flex items-center gap-2 text-[12px] font-medium text-ink/70 transition hover:text-ink">
          <FontAwesomeIcon icon={faPlay} className="size-2.5" />
          Watch slides
        </button>
      </div>
      <Fillet
        size={FILLET}
        origin="0% 0%"
        style={{ right: BAR_W, bottom: 0 }}
      />
      <Fillet
        size={FILLET}
        origin="0% 0%"
        style={{ right: 0, bottom: BAR_H }}
      />
    </div>
  );
}
