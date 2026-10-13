import { describe, expect, it } from "vitest";

import * as devices from "./devices";
import { homeFaqs } from "./faqs";

/** Every string in the homepage copy, except links. */
function strings(value: unknown, key = ""): string[] {
  if (typeof value === "string") {
    return /^(href|url)$/.test(key) || value.startsWith("/") || value.startsWith("#") || value.startsWith("http")
      ? []
      : [value];
  }
  if (Array.isArray(value)) return value.flatMap((v) => strings(v, key));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => strings(v, k));
  }
  return [];
}

const copy = [
  ...strings(devices),
  ...homeFaqs.flatMap((f) => [f.q, f.a ?? "", f.pending ?? ""]),
];

describe("homepage copy rules", () => {
  it("contains no em or en dashes", () => {
    expect(copy.filter((t) => /[–—]/.test(t))).toEqual([]);
  });

  it("contains no hyphenated compounds", () => {
    expect(copy.filter((t) => /[A-Za-z]{2,}-[A-Za-z]{2,}/.test(t))).toEqual([]);
  });

  it("keeps the build steps complete, each with a deliverable", () => {
    expect(devices.buildSteps).toHaveLength(6);
    for (const s of devices.buildSteps) expect(s.receive.length).toBeGreaterThan(10);
  });
});
