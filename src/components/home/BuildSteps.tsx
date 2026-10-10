"use client";

import { useState } from "react";
import Link from "next/link";

import Check from "../Check";
import { ArrowRight } from "../icons";
import { buildSteps, type BuildStep } from "@/lib/devices";

/**
 * Small, clearly labelled examples of what each step hands over. They are
 * illustrations of the format, not a client's data, so each carries an
 * "Example" tag.
 */
function SampleFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink/60">
          {label}
        </span>
        <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] text-ink/60">
          Example
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function SpecSample() {
  const fields: [string, string][] = [
    ["device_id", "string, set at onboarding"],
    ["ts", "unix time, milliseconds"],
    ["temp_c", "number, 0.1 steps"],
    ["battery", "number, 0 to 100"],
    ["fw", "string, firmware version"],
  ];
  return (
    <SampleFrame label="Message specification · v1">
      <p className="font-mono text-[11px] text-ink/60">
        topic: devices/&#123;device_id&#125;/telemetry · every 60 s · QoS 1
      </p>
      <table className="mt-2 w-full font-mono text-[11px]">
        <tbody>
          {fields.map(([k, v]) => (
            <tr key={k} className="border-t border-black/[0.06]">
              <td className="py-1.5 pr-3 text-accent-ink">{k}</td>
              <td className="py-1.5 text-ink/70">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SampleFrame>
  );
}

function SizingSample() {
  // Plain arithmetic, shown the way the real sheet shows it.
  const rows: [string, string][] = [
    ["Devices at launch", "500"],
    ["Messages per device", "1 per minute"],
    ["Messages per second", "500 ÷ 60 ≈ 8.3"],
    ["Messages per month", "500 × 1,440 × 30 = 21.6 million"],
    ["Storage per message", "about 200 bytes"],
    ["Storage per month", "about 4.3 GB"],
  ];
  return (
    <SampleFrame label="Sizing sheet">
      <table className="w-full text-[12px]">
        <tbody>
          {rows.map(([k, v]) => (
            <tr
              key={k}
              className="border-t border-black/[0.06] first:border-t-0"
            >
              <td className="py-1.5 pr-3 text-ink/60">{k}</td>
              <td className="py-1.5 text-right font-medium tabular-nums text-ink">
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SampleFrame>
  );
}

function AdminSample() {
  const kpis: [string, string, string][] = [
    ["482", "Online", "text-ink"],
    ["12", "Offline", "text-ink"],
    ["6", "Alerts", "text-coral"],
  ];
  const units: [string, string, string][] = [
    ["unit 0142", "Online · 2 min ago", "bg-accent"],
    ["unit 0377", "Low battery · 18%", "bg-coral"],
    ["unit 0419", "Offline · 3 h", "bg-black/25"],
  ];
  return (
    <SampleFrame label="Admin panel · Fleet">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map(([n, l, c]) => (
          <div key={l} className="rounded-xl bg-mist px-3 py-2">
            <p className={`text-lg font-medium tabular-nums ${c}`}>{n}</p>
            <p className="text-[10px] text-ink/60">{l}</p>
          </div>
        ))}
      </div>
      <ul className="mt-3 grid gap-1.5">
        {units.map(([u, s, dot]) => (
          <li key={u} className="flex items-center justify-between text-[11px]">
            <span className="font-mono text-ink/75">{u}</span>
            <span className="flex items-center gap-1.5 text-ink/60">
              <span className={`size-1.5 rounded-full ${dot}`} />
              {s}
            </span>
          </li>
        ))}
      </ul>
    </SampleFrame>
  );
}

const samples: Record<
  NonNullable<BuildStep["sample"]>,
  () => React.ReactElement
> = {
  spec: SpecSample,
  sizing: SizingSample,
  admin: AdminSample,
};

/**
 * The centrepiece: the six steps, what happens in each, and what the client
 * receives at the end of it. Deliverables build more trust than adjectives.
 */
export default function BuildSteps() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="how-it-works" className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-14 sm:px-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( How it works )
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              How a build{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                goes
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/65">
            Six steps. At the end of each one you receive something you can
            open, check and keep.
          </p>
        </div>

        {/* Every panel stays in the HTML, closed ones only collapse, so search
            engines and assistants read all six steps. */}
        <ol className="mt-10 grid gap-3">
          {buildSteps.map((s, i) => {
            const Sample = s.sample ? samples[s.sample] : null;
            const isOpen = open === i;
            return (
              <li key={s.title} className="rounded-[20px] bg-white">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`build-step-${i}`}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full text-[13px] font-medium transition-colors duration-300 ${
                        isOpen ? "bg-accent text-white" : "bg-ink text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-medium tracking-[-0.02em] text-ink">
                        {s.title}
                      </span>
                      {!isOpen && (
                        <span className="mt-0.5 hidden text-[13px] text-ink/60 sm:block">
                          You receive: {s.receive}
                        </span>
                      )}
                    </span>
                    <span
                      aria-hidden
                      className={`grid size-8 shrink-0 place-items-center rounded-full border border-black/10 text-ink/60 transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={`build-step-${i}`}
                  role="region"
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "grid-template-rows 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease",
                  }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`grid gap-5 px-5 pb-6 sm:px-6 sm:pl-[4.75rem] ${
                        Sample ? "lg:grid-cols-[1fr_1.1fr]" : ""
                      }`}
                    >
                      <div>
                        <p className="text-[14px] leading-relaxed text-ink/70">
                          {s.happens}
                        </p>
                        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/60">
                          You receive
                        </p>
                        <p className="mt-2 flex items-start gap-2.5 text-[14px] font-medium leading-snug text-ink">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                            <Check className="size-3" />
                          </span>
                          {s.receive}
                        </p>
                        {s.link && (
                          <Link
                            href={s.link.href}
                            className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-ink"
                          >
                            {s.link.label}
                            <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </Link>
                        )}
                      </div>
                      {Sample && (
                        <div>
                          <Sample />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
