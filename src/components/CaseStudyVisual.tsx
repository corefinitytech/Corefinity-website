import type { CaseStudyTheme } from "@/lib/caseStudies";

import {
  GhostFibersBackground,
  GradientWavesBackground,
  MoltenMetalBackground,
} from "./backgrounds/LazyBackgrounds";
import { palette } from "./backgrounds/palette";

/**
 * Visual language for the case studies. Each theme gets a surface gradient
 * (the fallback, and what the index cards use), an animated layer for the
 * detail page hero, and a mock of the thing that was actually built. The
 * mocks are plain markup, so they cost nothing to render and stay crisp.
 */

export const caseSurface: Record<CaseStudyTheme, string> = {
  ai: "bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)]",
  ops: "bg-[linear-gradient(140deg,#050b14_0%,#0d1a33_45%,#123a6b_100%)]",
  booking:
    "bg-[radial-gradient(110%_120%_at_75%_25%,#1880d8_0%,#123a6b_42%,#0a0f22_78%,#05070f_100%)]",
};

/** Animated layer, reusing the tuned settings from the Capabilities cards. */
export function CaseStudyBackdrop({ theme }: { theme: CaseStudyTheme }) {
  if (theme === "ai") {
    return (
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
    );
  }
  if (theme === "ops") {
    return (
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
    );
  }
  return (
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
    />
  );
}

/** Faint engineering grid laid over every dark surface on the site. */
export function GridOverlay({ size = 40 }: { size?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]"
      style={{ backgroundSize: `${size}px ${size}px` }}
    />
  );
}

const glass =
  "rounded-2xl border border-white/15 bg-white/[0.07] p-4 text-white shadow-2xl shadow-black/30 backdrop-blur-md sm:p-5";

function PanelLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="truncate text-[10px] uppercase tracking-[0.2em] text-white/55">
        {children}
      </p>
      <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-white/55">
        <span className="size-1.5 rounded-full bg-sky" />
        Live
      </span>
    </div>
  );
}

function ChatScreen() {
  const thread: { from: "customer" | "assistant"; text: string }[] = [
    { from: "customer", text: "Where is my order #4821?" },
    {
      from: "assistant",
      text: "It left our warehouse this morning and arrives Thursday. Your tracking link is below.",
    },
    { from: "customer", text: "Can I swap the serum for the 50ml size?" },
    {
      from: "assistant",
      text: "Done. Your order is updated and the new invoice is in your inbox.",
    },
  ];
  return (
    <div className={`${glass} w-full max-w-sm`}>
      <PanelLabel>Solenne · Support assistant</PanelLabel>
      <ul className="mt-4 grid gap-2">
        {thread.map((m) => (
          <li
            key={m.text}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed sm:text-[12px] ${
              m.from === "customer"
                ? "justify-self-end rounded-br-md bg-white/15"
                : "justify-self-start rounded-bl-md bg-accent-ink"
            }`}
          >
            {m.text}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-white/55">
        <span>Resolved in 9s</span>
        <span className="rounded-full bg-sky/20 px-2 py-0.5 text-sky">
          No agent needed
        </span>
      </div>
    </div>
  );
}

function OpsScreen() {
  const kpis: [string, string][] = [
    ["1,284", "Active"],
    ["96%", "On time"],
    ["3", "Flagged"],
  ];
  const rows: [string, string, string][] = [
    ["KHI to DXB", "In transit", "bg-sky"],
    ["LHE to JED", "Delivered", "bg-white/60"],
    ["ISB to MCT", "At customs", "bg-coral"],
  ];
  const bars = [38, 52, 44, 68, 60, 82, 74];
  return (
    <div className={`${glass} w-full max-w-sm`}>
      <PanelLabel>Carvell · Operations</PanelLabel>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {kpis.map(([n, l]) => (
          <div key={l}>
            <p className="text-lg font-medium sm:text-xl">{n}</p>
            <p className="mt-0.5 text-[10px] text-white/55">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-14 items-end gap-1.5" aria-hidden>
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-sm ${i === bars.length - 2 ? "bg-sky" : "bg-white/20"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <ul className="mt-4 grid gap-1.5 border-t border-white/10 pt-3">
        {rows.map(([lane, status, dot]) => (
          <li
            key={lane}
            className="flex items-center justify-between text-[11px] text-white/75"
          >
            <span>{lane}</span>
            <span className="flex items-center gap-1.5 text-white/55">
              <span className={`size-1.5 rounded-full ${dot}`} />
              {status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BookingScreen() {
  // A month at a glance: booked nights in blue, today outlined.
  const booked = new Set([2, 3, 4, 8, 9, 10, 11, 15, 16, 20, 21, 22, 23, 24, 29, 30]);
  return (
    <div className={`${glass} w-full max-w-sm`}>
      <PanelLabel>Lodgex · Booking OS</PanelLabel>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {(
          [
            ["0%", "OTA fees"],
            ["3 wk", "To launch"],
            ["24/7", "iCal sync"],
          ] as const
        ).map(([n, l]) => (
          <div key={l}>
            <p className="text-lg font-medium sm:text-xl">{n}</p>
            <p className="mt-0.5 text-[10px] text-white/55">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1" aria-hidden>
        {Array.from({ length: 35 }, (_, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[4px] ${
              booked.has(i)
                ? "bg-sky/80"
                : i === 13
                  ? "border border-white/60"
                  : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-white/55">
        <span>Occupancy this month</span>
        <span className="text-white">81%</span>
      </div>
    </div>
  );
}

export function CaseStudyScreen({ theme }: { theme: CaseStudyTheme }) {
  if (theme === "ai") return <ChatScreen />;
  if (theme === "ops") return <OpsScreen />;
  return <BookingScreen />;
}
