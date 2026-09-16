/**
 * Cookie consent state.
 *
 * Kept in localStorage rather than a cookie: the only thing being stored is the
 * visitor's own choice, it never needs to reach the server, and storing it this
 * way means the site sets no cookie at all until someone opts in to one.
 *
 * Bump STORAGE_VERSION when the categories change, which retires old choices
 * and asks again rather than silently assuming the previous answer still covers
 * whatever is new.
 */

export const STORAGE_KEY = "corefinity.consent";
export const STORAGE_VERSION = 1;

export const CONSENT_EVENT = "corefinity:consent";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type Consent = Record<ConsentCategory, boolean>;

export type StoredConsent = {
  version: number;
  decidedAt: string;
  consent: Consent;
};

/** Necessary is always on: it is what makes the site work, and it sets no cookie. */
export const DEFAULT_CONSENT: Consent = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export const ACCEPT_ALL: Consent = {
  necessary: true,
  analytics: true,
  marketing: true,
};

export const CATEGORIES: {
  id: ConsentCategory;
  label: string;
  locked?: boolean;
  description: string;
}[] = [
  {
    id: "necessary",
    label: "Strictly necessary",
    locked: true,
    description:
      "Remembers this choice and keeps the site secure and working. Nothing here identifies you, and it cannot be switched off.",
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Counts page views so we can see which pages are worth improving. Off unless you turn it on, and we do not use it to follow you around the web.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Would let us measure whether an advert brought you here. We run none today, so leaving this off changes nothing you can see.",
  },
];

/** Reads the saved choice, or null when there is no usable one. */
export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.version !== STORAGE_VERSION) return null;
    if (!parsed.consent || typeof parsed.consent.necessary !== "boolean") {
      return null;
    }
    return parsed;
  } catch {
    // Private mode, blocked storage, or hand edited JSON. Ask again.
    return null;
  }
}

/** Saves a choice and tells the rest of the page about it. */
export function writeConsent(consent: Consent): StoredConsent {
  const record: StoredConsent = {
    version: STORAGE_VERSION,
    decidedAt: new Date().toISOString(),
    consent: { ...consent, necessary: true },
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable. The choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
  return record;
}

/** Clears the choice so the banner asks again. */
export function clearConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

/**
 * Gate for anything optional. Call before loading an analytics or marketing
 * script so nothing runs ahead of the visitor's decision.
 */
export function hasConsent(category: ConsentCategory): boolean {
  return readConsent()?.consent[category] ?? false;
}

/* useSyncExternalStore plumbing.
 *
 * Consent lives outside React, in storage the server cannot see, so components
 * subscribe to it rather than copying it into state inside an effect. The
 * snapshot is the raw string on purpose: returning a fresh parsed object each
 * call would never compare equal and would re-render forever. */

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  // Fires when another tab changes the choice.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getConsentSnapshot(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** On the server nobody has decided yet, so the banner renders as unanswered. */
export function getConsentServerSnapshot(): string | null {
  return null;
}
