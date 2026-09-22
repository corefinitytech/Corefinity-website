import { describe, expect, it } from "vitest";

import { getService, relatedTo, services } from "./services";

describe("service data", () => {
  it("has a unique slug for every service", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses url safe slugs", () => {
    for (const s of services) {
      expect(s.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("gives every page the content each section renders", () => {
    for (const s of services) {
      expect(s.intro.length).toBeGreaterThan(0);
      expect(s.covers.length).toBeGreaterThanOrEqual(4);
      expect(s.suitedTo.length).toBeGreaterThanOrEqual(3);
      expect(s.process.length).toBeGreaterThanOrEqual(3);
      expect(s.handover.length).toBeGreaterThanOrEqual(3);
      expect(s.stack.length).toBeGreaterThanOrEqual(3);
      expect(s.faqs.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps meta descriptions inside the length search engines display", () => {
    for (const s of services) {
      expect(s.description.length).toBeGreaterThan(70);
      expect(s.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("keeps titles short enough not to be truncated", () => {
    for (const s of services) {
      // The brand is appended by the template, so budget for it.
      // 60 characters in total once " | Corefinity" (13) is appended.
      expect(s.title.length).toBeLessThanOrEqual(47);
    }
  });

  it("gives each page a distinct title and description", () => {
    expect(new Set(services.map((s) => s.title)).size).toBe(services.length);
    expect(new Set(services.map((s) => s.description)).size).toBe(
      services.length,
    );
  });
});

describe("related links", () => {
  it("only points at services that exist", () => {
    for (const s of services) {
      expect(relatedTo(s)).toHaveLength(s.related.length);
    }
  });

  it("never links a service to itself", () => {
    for (const s of services) {
      expect(s.related).not.toContain(s.slug);
    }
  });

  it("reaches every service from some other page, so none is orphaned", () => {
    const linked = new Set(services.flatMap((s) => s.related));
    for (const s of services) {
      expect(linked.has(s.slug)).toBe(true);
    }
  });
});

describe("copy rules", () => {
  // The site is written without hyphenated compounds or long dashes. These
  // pages are the largest body of copy, so they are the easiest place to slip.
  const prose = services.flatMap((s) => [
    s.title,
    s.description,
    s.summary,
    s.headline.lead,
    s.headline.accent,
    ...s.intro,
    ...s.covers.flatMap((c) => [c.title, c.body]),
    ...s.suitedTo,
    ...s.process.flatMap((p) => [p.title, p.detail]),
    ...s.handover,
    ...s.faqs.flatMap((f) => [f.q, f.a]),
  ]);

  it("contains no em or en dashes", () => {
    const offenders = prose.filter((p) => /[–—]/.test(p));
    expect(offenders).toEqual([]);
  });

  it("contains no hyphenated compounds", () => {
    // Stack entries are excluded: CI/CD tool names are not prose.
    const offenders = prose.filter((p) => /[A-Za-z]{2,}-[A-Za-z]{2,}/.test(p));
    expect(offenders).toEqual([]);
  });
});

describe("getService", () => {
  it("finds a service by slug", () => {
    expect(getService("web-development")?.name).toBe("Web Development");
  });

  it("returns undefined for an unknown slug, so the page can 404", () => {
    expect(getService("not-a-service")).toBeUndefined();
  });
});
