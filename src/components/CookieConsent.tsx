"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

import Check from "./Check";
import {
  ACCEPT_ALL,
  CATEGORIES,
  DEFAULT_CONSENT,
  type Consent,
  type ConsentCategory,
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const LEAVE_MS = 260;

/** Track and knob, drawn rather than using a checkbox the browser skins itself. */
function Toggle({
  checked,
  locked,
  onChange,
  label,
}: {
  checked: boolean;
  locked?: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  if (locked) {
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white">
        <Check className="size-3" />
        <span className="sr-only">{label} is always on</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 ${
        checked ? "bg-ink" : "bg-black/15 hover:bg-black/25"
      }`}
    >
      <span
        className="absolute top-0.5 size-4 rounded-full bg-white shadow-sm"
        style={{
          transform: `translateX(${checked ? 18 : 2}px)`,
          transition: `transform 320ms ${EASE}`,
        }}
      />
    </button>
  );
}

export default function CookieConsent() {
  // The decision lives in localStorage, which the server cannot see. Subscribing
  // to it keeps this correct across tabs and lets the footer reopen the banner,
  // without copying external state into React state inside an effect.
  const stored = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  const [leaving, setLeaving] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [draft, setDraft] = useState<Consent>(DEFAULT_CONSENT);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!customising) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCustomising(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [customising]);

  useEffect(() => {
    if (customising) panelRef.current?.focus();
  }, [customising]);

  if (stored !== null) return null;

  // Play the exit, then commit. Writing immediately would unmount mid animation.
  const dismiss = (consent: Consent) => {
    setLeaving(true);
    window.setTimeout(() => writeConsent(consent), LEAVE_MS);
  };

  const set = (id: ConsentCategory, value: boolean) =>
    setDraft((d) => ({ ...d, [id]: value }));

  return (
    <div
      role="region"
      aria-label="Cookie choices"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div
        className="pointer-events-auto mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-2xl shadow-black/10"
        style={{
          animation: `${leaving ? "consent-out" : "consent-in"} ${
            leaving ? LEAVE_MS : 450
          }ms ${EASE} both`,
        }}
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-2.5">
            {/* Static on purpose. An infinite ping here kept the first
                screen changing forever, so Lighthouse's Speed Index never
                settled and every page failed the performance budget. */}
            <span className="relative grid size-2 place-items-center">
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( Cookies )
            </p>
          </div>

          <p className="mt-4 text-[15px] font-medium leading-snug tracking-[-0.02em] text-ink">
            We would rather ask than assume.
          </p>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-ink/60">
            This site sets nothing optional unless you say so. Analytics would
            tell us which pages are worth improving. Say no and the site works
            exactly the same. The{" "}
            <Link
              href="/cookies"
              className="font-medium text-ink underline underline-offset-4 transition hover:text-accent-ink"
            >
              cookie policy
            </Link>{" "}
            has the detail.
          </p>

          {/* Category controls */}
          <div
            className="grid"
            style={{
              gridTemplateRows: customising ? "1fr" : "0fr",
              opacity: customising ? 1 : 0,
              transition: `grid-template-rows 420ms ${EASE}, opacity 260ms ease`,
            }}
          >
            <div className="overflow-hidden">
              <div
                ref={panelRef}
                tabIndex={-1}
                className="mt-5 grid gap-2 outline-none"
              >
                {CATEGORIES.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-start gap-4 rounded-2xl bg-mist p-4"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium tracking-[-0.01em] text-ink">
                        {c.label}
                        {c.locked && (
                          <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-ink/60">
                            Always on
                          </span>
                        )}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-ink/65">
                        {c.description}
                      </p>
                    </div>
                    <div className="ml-auto pt-0.5">
                      <Toggle
                        label={c.label}
                        locked={c.locked}
                        checked={c.locked ? true : draft[c.id]}
                        onChange={(v) => set(c.id, v)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              onClick={() => dismiss(customising ? draft : ACCEPT_ALL)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink/85"
            >
              {customising ? "Save my choices" : "Accept all"}
            </button>
            <button
              onClick={() => dismiss(DEFAULT_CONSENT)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-[13px] font-medium text-ink/75 transition hover:border-ink hover:text-ink"
            >
              Reject optional
            </button>
            <button
              onClick={() => setCustomising((v) => !v)}
              aria-expanded={customising}
              className="inline-flex h-11 items-center justify-center rounded-full px-4 text-[13px] font-medium text-ink/65 transition hover:text-ink sm:ml-auto"
            >
              {customising ? "Hide options" : "Customise"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
