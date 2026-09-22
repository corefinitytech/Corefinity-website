import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { faqs } from "./faqs";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  organizationSchema,
  serviceSchema,
  websiteSchema,
} from "./schema";
import { services, siteUrl } from "./site";

describe("graph", () => {
  it("wraps nodes in a single context", () => {
    const g = graph(organizationSchema(), websiteSchema());
    expect(g["@context"]).toBe("https://schema.org");
    expect(g["@graph"]).toHaveLength(2);
  });

  it("serialises without throwing, which is what the script tag needs", () => {
    expect(() =>
      JSON.stringify(graph(organizationSchema(), serviceSchema(), faqSchema())),
    ).not.toThrow();
  });
});

describe("faqSchema", () => {
  it("publishes exactly the questions the page renders", () => {
    const schema = faqSchema();
    expect(schema.mainEntity).toHaveLength(faqs.length);
    expect(schema.mainEntity.map((q) => q.name)).toEqual(faqs.map((f) => f.q));
  });

  it("carries an answer for every question", () => {
    for (const entry of faqSchema().mainEntity) {
      expect(entry.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });
});

describe("serviceSchema", () => {
  it("offers every service the site claims to provide", () => {
    const offers = serviceSchema().hasOfferCatalog.itemListElement;
    expect(offers).toHaveLength(services.length);
    expect(offers.map((o) => o.itemOffered.name)).toEqual(
      services.map((s) => s.name),
    );
  });
});

describe("honesty guarantees", () => {
  // Structured data that disagrees with the page is penalised, and inventing
  // social proof is worse than omitting it. These assertions exist so nobody
  // adds a fake rating or a profile that does not exist without noticing.
  const serialised = JSON.stringify(
    graph(organizationSchema(), websiteSchema(), serviceSchema(), faqSchema()),
  );

  // Matched as JSON keys, not as words: "ready for review on staging" is
  // perfectly good FAQ copy and must not trip this.
  it.each([
    "aggregateRating",
    "review",
    "reviewCount",
    "ratingValue",
    "numberOfEmployees",
    "foundingDate",
    "priceRange",
    "award",
  ])("does not claim %s", (field) => {
    expect(serialised).not.toContain(`"${field}":`);
  });

  it("lists only clean, real profile URLs", () => {
    // Share links and tracking parameters are not stable profile URLs, and a
    // duplicate would suggest two different entities.
    const profiles = organizationSchema().sameAs ?? [];
    expect(profiles.length).toBeGreaterThan(0);
    expect(new Set(profiles).size).toBe(profiles.length);
    for (const url of profiles) {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toMatch(/[?#]|\/share\//);
    }
  });

  it("points at a logo that is actually deployed", () => {
    // Caught a real break: the schema still referenced logo-3.png after the
    // unused assets were cleared out of public/.
    const url = organizationSchema().logo.url;
    const file = url.replace(siteUrl, "");
    expect(existsSync(path.join(process.cwd(), "public", file))).toBe(true);
  });
});

describe("breadcrumbSchema", () => {
  it("numbers positions from one and builds absolute URLs", () => {
    const crumbs = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Get a Quote", path: "/contact" },
    ]);
    expect(crumbs.itemListElement[0].position).toBe(1);
    expect(crumbs.itemListElement[1].item).toBe(`${siteUrl}/contact`);
  });
});
