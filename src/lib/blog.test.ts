import { describe, expect, it } from "vitest";

import { diagrams } from "@/components/blog/Diagrams";

import { getPost, posts, postsByDate, readingMinutes } from "./blog";
import { getService } from "./services";

/** Every string a reader actually sees, for the copy rules. */
function prose(): string[] {
  return posts.flatMap((p) => [
    p.title,
    p.description,
    p.excerpt,
    p.topic,
    p.headline.lead,
    p.headline.accent,
    ...p.blocks.flatMap((b) => {
      if (b.type === "list") return b.items;
      if (b.type === "callout") return [b.title, ...b.items];
      if (b.type === "figure") return [b.caption];
      return [b.text];
    }),
    ...p.faqs.flatMap((f) => [f.q, f.a]),
  ]);
}

describe("blog data", () => {
  it("has a unique, url safe slug for every post", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("only points at diagrams and services that exist", () => {
    for (const p of posts) {
      for (const b of p.blocks) {
        if (b.type === "figure") expect(diagrams[b.diagram], b.diagram).toBeDefined();
      }
      for (const slug of p.services) {
        expect(getService(slug), `${p.slug} -> ${slug}`).toBeDefined();
      }
    }
  });

  it("uses valid ISO publish dates for the article structured data", () => {
    for (const p of posts) {
      expect(p.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(p.datePublished))).toBe(false);
    }
  });

  it("is long enough to be worth publishing and carries diagrams", () => {
    for (const p of posts) {
      expect(readingMinutes(p)).toBeGreaterThanOrEqual(4);
      const figures = p.blocks.filter((b) => b.type === "figure");
      expect(figures.length, p.slug).toBeGreaterThanOrEqual(2);
      // Headings break the article up rather than leaving a wall of text.
      expect(p.blocks.filter((b) => b.type === "h2").length).toBeGreaterThanOrEqual(4);
    }
  });

  it("starts with a paragraph, so the page never opens on a heading", () => {
    for (const p of posts) expect(p.blocks[0].type).toBe("p");
  });
});

describe("search metadata", () => {
  it("keeps titles short enough not to be truncated", () => {
    // 60 characters in total once " | Corefinity" (13) is appended.
    for (const p of posts) expect(p.title.length).toBeLessThanOrEqual(47);
  });

  it("keeps meta descriptions inside the length search engines display", () => {
    for (const p of posts) {
      expect(p.description.length).toBeGreaterThan(70);
      expect(p.description.length).toBeLessThanOrEqual(160);
    }
  });

  it("gives each post a distinct title and description", () => {
    expect(new Set(posts.map((p) => p.title)).size).toBe(posts.length);
    expect(new Set(posts.map((p) => p.description)).size).toBe(posts.length);
  });
});

describe("answer engine FAQs", () => {
  it("phrases every question as a question and answers it standing alone", () => {
    for (const p of posts) {
      expect(p.faqs.length).toBeGreaterThanOrEqual(3);
      for (const f of p.faqs) {
        expect(f.q.endsWith("?"), f.q).toBe(true);
        const sentences = f.a.split(/(?<=[.!?])\s+/).filter(Boolean);
        expect(sentences.length, f.q).toBeLessThanOrEqual(3);
        expect(/^(It|That|This|They|These|You do)\b/.test(f.a), f.q).toBe(false);
      }
    }
  });
});

describe("copy rules", () => {
  it("contains no em or en dashes", () => {
    expect(prose().filter((t) => /[–—]/.test(t))).toEqual([]);
  });

  it("contains no hyphenated compounds", () => {
    expect(prose().filter((t) => /[A-Za-z]{2,}-[A-Za-z]{2,}/.test(t))).toEqual([]);
  });
});

describe("lookups", () => {
  it("finds a post by slug and 404s an unknown one", () => {
    expect(getPost(posts[0].slug)?.title).toBe(posts[0].title);
    expect(getPost("not-a-post")).toBeUndefined();
  });

  it("lists posts newest first", () => {
    const dates = postsByDate().map((p) => p.datePublished);
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
  });
});
