"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useSyncExternalStore } from "react";

import { analytics } from "@/lib/site";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Google Analytics 4, loaded only after a visitor opts in.
 *
 * The cookie policy states that nothing optional runs unless it is switched
 * on, so this subscribes to the consent store and renders no script tag at all
 * until the analytics category is true. Nothing is queued and replayed either:
 * page views before consent are simply not counted, which is the honest
 * reading of a "no" answer.
 *
 * GA4 does set cookies (_ga and _ga_<id>) and does process personal data,
 * unlike a cookieless counter. That is why it is named on the cookie policy
 * and listed as a processor on the privacy policy. Swapping this for another
 * tool means updating both of those pages.
 */
export default function Analytics() {
  const stored = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  const id = analytics.gaMeasurementId;

  let allowed = false;
  try {
    allowed = stored ? Boolean(JSON.parse(stored)?.consent?.analytics) : false;
  } catch {
    allowed = false;
  }

  /**
   * Withdrawing consent has to stop collection that has already started.
   * Unmounting the tag does not unload gtag, so set Google's documented
   * opt-out flag, which it checks before every hit.
   */
  useEffect(() => {
    if (!id) return;
    const w = window as unknown as Record<string, boolean>;
    w[`ga-disable-${id}`] = !allowed;
  }, [id, allowed]);

  if (!id || !allowed) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
