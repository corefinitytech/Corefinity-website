import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ACCEPT_ALL,
  DEFAULT_CONSENT,
  STORAGE_KEY,
  STORAGE_VERSION,
  clearConsent,
  getConsentSnapshot,
  hasConsent,
  readConsent,
  subscribeConsent,
  writeConsent,
} from "./consent";

beforeEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("readConsent", () => {
  it("returns null when nothing has been decided", () => {
    expect(readConsent()).toBeNull();
  });

  it("round trips a saved decision", () => {
    writeConsent(ACCEPT_ALL);
    expect(readConsent()?.consent).toEqual(ACCEPT_ALL);
  });

  it("discards a decision saved under an older version", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION - 1,
        decidedAt: new Date().toISOString(),
        consent: ACCEPT_ALL,
      }),
    );
    // A new category must re-ask rather than inherit an old yes.
    expect(readConsent()).toBeNull();
  });

  it("discards malformed JSON instead of throwing", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not json");
    expect(readConsent()).toBeNull();
  });

  it("discards a decision missing the necessary flag", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, consent: {} }),
    );
    expect(readConsent()).toBeNull();
  });

  it("survives storage being unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readConsent()).toBeNull();
  });
});

describe("writeConsent", () => {
  it("always forces necessary on, whatever it is handed", () => {
    const stored = writeConsent({
      necessary: false,
      analytics: false,
      marketing: false,
    });
    expect(stored.consent.necessary).toBe(true);
  });

  it("records when the decision was made", () => {
    const before = Date.now();
    const stored = writeConsent(DEFAULT_CONSENT);
    expect(new Date(stored.decidedAt).getTime()).toBeGreaterThanOrEqual(before);
  });

  it("still returns a decision when storage throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(writeConsent(ACCEPT_ALL).consent).toEqual(ACCEPT_ALL);
  });
});

describe("hasConsent", () => {
  it("is false before any decision, which is the point", () => {
    expect(hasConsent("analytics")).toBe(false);
    expect(hasConsent("marketing")).toBe(false);
  });

  it("is false when the visitor rejected optional categories", () => {
    writeConsent(DEFAULT_CONSENT);
    expect(hasConsent("analytics")).toBe(false);
  });

  it("is true only once the category was accepted", () => {
    writeConsent(ACCEPT_ALL);
    expect(hasConsent("analytics")).toBe(true);
  });
});

describe("subscription", () => {
  it("notifies subscribers when a decision is written", () => {
    const seen = vi.fn();
    const unsubscribe = subscribeConsent(seen);
    writeConsent(ACCEPT_ALL);
    expect(seen).toHaveBeenCalled();
    unsubscribe();
  });

  it("notifies subscribers when the decision is cleared", () => {
    writeConsent(ACCEPT_ALL);
    const seen = vi.fn();
    const unsubscribe = subscribeConsent(seen);
    clearConsent();
    expect(seen).toHaveBeenCalled();
    expect(getConsentSnapshot()).toBeNull();
    unsubscribe();
  });

  it("stops notifying after unsubscribe", () => {
    const seen = vi.fn();
    subscribeConsent(seen)();
    writeConsent(ACCEPT_ALL);
    expect(seen).not.toHaveBeenCalled();
  });

  it("returns a stable snapshot so React does not loop", () => {
    writeConsent(ACCEPT_ALL);
    expect(getConsentSnapshot()).toBe(getConsentSnapshot());
  });
});
