import { describe, expect, it } from "vitest";

import { faqs } from "./faqs";
import { organizationSchema } from "./schema";
import { services } from "./services";
import { legal, site } from "./site";

/**
 * Search and answer engine rules that span the whole site. The per page rules
 * for services and case studies live next to their data.
 */

describe("homepage metadata", () => {
  it("fits the title Google shows without truncation", () => {
    expect(site.title.length).toBeLessThanOrEqual(60);
    // The brand leads, so a search for the name matches the start of the title.
    expect(site.title.startsWith(site.name)).toBe(true);
  });

  it("fits the description Google shows without truncation", () => {
    expect(site.description.length).toBeGreaterThan(70);
    expect(site.description.length).toBeLessThanOrEqual(160);
  });
});

describe("brand entity", () => {
  it("lists the Google Business Profile name as an alternate name", () => {
    expect(organizationSchema().alternateName).toContain("CoreFinity Tech");
  });

  it("uses a square logo, which is what search engines crop to", () => {
    const { width, height } = organizationSchema().logo;
    expect(width).toBe(height);
    expect(width).toBeGreaterThanOrEqual(112);
  });
});

describe("answer engine FAQs", () => {
  // Every FAQ on the site, homepage and service pages. Answer engines lift
  // these one at a time, so each has to make sense with nothing around it.
  const all = [...faqs, ...services.flatMap((s) => s.faqs)];

  it("phrases every question as a complete question", () => {
    for (const f of all) expect(f.q.endsWith("?"), f.q).toBe(true);
  });

  it("answers in three sentences or fewer", () => {
    for (const f of all) {
      const sentences = f.a.split(/(?<=[.!?])\s+/).filter(Boolean);
      expect(sentences.length, f.q).toBeLessThanOrEqual(3);
    }
  });

  it("never opens an answer with a word that needs the question for context", () => {
    // "It happens regularly." or "You do." mean nothing once lifted out.
    const opener = /^(It|That|This|They|These|You do|Often\.|Usually\.)\b/;
    expect(all.filter((f) => opener.test(f.a)).map((f) => f.q)).toEqual([]);
  });

  it("keeps questions unique so each maps to one answer", () => {
    const qs = all.map((f) => f.q);
    expect(new Set(qs).size).toBe(qs.length);
  });

  it("follows the house copy rules", () => {
    const prose = all.flatMap((f) => [f.q, f.a]);
    expect(prose.filter((p) => /[–—]/.test(p))).toEqual([]);
    expect(prose.filter((p) => /[A-Za-z]{2,}-[A-Za-z]{2,}/.test(p))).toEqual([]);
  });
});

describe("legal dates", () => {
  it("keeps the readable and ISO effective dates in step", () => {
    const [y, m, d] = legal.effectiveDateIso.split("-").map(Number);
    const readable = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(
      "en-GB",
      { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
    );
    expect(readable).toBe(legal.effectiveDate);
  });
});
