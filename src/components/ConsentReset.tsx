"use client";

import { useSyncExternalStore } from "react";

import {
  clearConsent,
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Reopens the consent banner. Withdrawing consent has to be as easy as giving
 * it, so this sits on the cookie policy page and in the footer rather than
 * being buried.
 */
export default function ConsentReset({
  className = "",
  label = "Change your cookie choices",
}: {
  className?: string;
  label?: string;
}) {
  const stored = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  let decidedAt: string | null = null;
  try {
    decidedAt = stored ? (JSON.parse(stored).decidedAt ?? null) : null;
  } catch {
    decidedAt = null;
  }

  return (
    <span className={className}>
      <button
        onClick={clearConsent}
        className="text-left font-medium text-ink underline underline-offset-4 transition hover:text-accent"
      >
        {label}
      </button>
      {decidedAt && (
        <span className="ml-2 text-[12px] text-ink/40">
          Last set{" "}
          {new Date(decidedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      )}
    </span>
  );
}
