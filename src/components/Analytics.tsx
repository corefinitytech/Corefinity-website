"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Analytics, loaded only after a visitor opts in.
 *
 * The cookie policy states that nothing optional runs unless it is switched
 * on, so this subscribes to the consent store and renders no script tag at all
 * until the analytics category is true. Nothing is queued and replayed either:
 * page views before consent are simply not counted, which is the honest
 * reading of a "no" answer.
 *
 * Plausible is the default because it sets no cookie and stores no personal
 * data, which keeps the claims on the cookie policy true. Swapping it for
 * anything that does set a cookie means updating that page too.
 */
export default function Analytics() {
  const stored = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  let allowed = false;
  try {
    allowed = stored ? Boolean(JSON.parse(stored)?.consent?.analytics) : false;
  } catch {
    allowed = false;
  }

  if (!allowed) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
