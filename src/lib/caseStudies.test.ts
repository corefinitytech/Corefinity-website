import { describe, expect, it } from "vitest";

import {
  caseStudies,
  caseStudiesFor,
  getCaseStudy,
  nextCaseStudy,
} from "./caseStudies";
import { getService } from "./services";

describe("case study data", () => {
  it("has a unique, url safe slug for every study", () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) {
      expect(s).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("only credits services that exist, so every service link resolves", () => {
    for (const c of caseStudies) {
      expect(c.services.length).toBeGreaterThan(0);
      for (const slug of c.services) {
        expect(getService(slug), `${c.slug} -> ${slug}`).toBeDefined();
      }
    }
  });

  it("gives every page the content each section renders", () => {
    for (const c of caseStudies) {
      expect(c.metrics).toHaveLength(4);
      expect(c.challenge.length).toBeGreaterThan(0);
      expect(c.approach.length).toBeGreaterThan(0);
      expect(c.built.length).toBeGreaterThanOrEqual(4);
      expect(c.phases.length).toBeGreaterThanOrEqual(3);
      expect(c.results.length).toBeGreaterThanOrEqual(3);
      expect(c.stack.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps metric values as integers so the count up is exact", () => {
    for (const c of caseStudies) {
      for (const m of c.metrics) expect(Number.isInteger(m.value)).toBe(true);
    }
  });

  it("uses valid ISO publish dates for the Article structured data", () => {
    for (const c of caseStudies) {
      expect(c.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(c.datePublished))).toBe(false);
    }
  });
});

describe("search metadata", () => {
  it("keeps titles short enough not to be truncated", () => {
    for (const c of caseStudies) {
      // The brand is appended by the title template, so budget for it.
      // 60 characters in total once " | Corefinity" (13) is appended.
      expect(c.title.length).toBeLessThanOrEqual(47);
    }
  });

  it("keeps meta descriptions inside the length search engines display", () => {
    for (const c of caseStudies) {
      expect(c.description.length).toBeGreaterThan(70);
      expect(c.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("gives each page a distinct title and description", () => {
    expect(new Set(caseStudies.map((c) => c.title)).size).toBe(
      caseStudies.length,
    );
    expect(new Set(caseStudies.map((c) => c.description)).size).toBe(
      caseStudies.length,
    );
  });
});

describe("copy rules", () => {
  // Same house style as the service pages: no long dashes, no hyphenated
  // compounds. Stack entries are tool names, not prose, so they are excluded.
  const prose = caseStudies.flatMap((c) => [
    c.client,
    c.industry,
    c.summary,
    c.title,
    c.description,
    c.headline.lead,
    c.headline.accent,
    ...c.metrics.map((m) => m.label),
    ...c.challenge,
    ...c.approach,
    ...c.built.flatMap((b) => [b.title, b.body]),
    ...c.phases.flatMap((p) => [p.when, p.title, p.detail]),
    ...c.results,
  ]);

  it("contains no em or en dashes", () => {
    expect(prose.filter((p) => /[–—]/.test(p))).toEqual([]);
  });

  it("contains no hyphenated compounds", () => {
    expect(prose.filter((p) => /[A-Za-z]{2,}-[A-Za-z]{2,}/.test(p))).toEqual(
      [],
    );
  });
});

describe("lookups", () => {
  it("keeps the slug the home page section links to", () => {
    // CaseStudy.tsx links here directly; renaming the slug breaks that link.
    expect(getCaseStudy("hotel-direct-booking-engine")).toBeDefined();
  });

  it("finds a study by slug and 404s an unknown one", () => {
    expect(getCaseStudy(caseStudies[0].slug)?.client).toBe(
      caseStudies[0].client,
    );
    expect(getCaseStudy("not-a-case-study")).toBeUndefined();
  });

  it("wraps the read next link round to the first study", () => {
    const last = caseStudies[caseStudies.length - 1];
    expect(nextCaseStudy(last).slug).toBe(caseStudies[0].slug);
    for (const c of caseStudies) expect(nextCaseStudy(c).slug).not.toBe(c.slug);
  });

  it("lists the studies that used a service", () => {
    for (const c of caseStudies) {
      for (const s of c.services) {
        expect(caseStudiesFor(s).map((x) => x.slug)).toContain(c.slug);
      }
    }
    expect(caseStudiesFor("not-a-service")).toEqual([]);
  });
});
