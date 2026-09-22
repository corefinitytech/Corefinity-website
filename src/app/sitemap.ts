import type { MetadataRoute } from "next";

import { caseStudies } from "@/lib/caseStudies";
import { services } from "@/lib/services";
import { legal, site, siteUrl } from "@/lib/site";

/** Add a route here the moment it ships; nothing crawls itself into this list. */
//
// lastModified is a real date per page, not "now". A sitemap that claims every
// URL changed on every deploy teaches search engines to ignore the field.
const content = site.contentUpdated;
const legalDate = legal.effectiveDateIso;

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified: string;
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", lastModified: content },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: content },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: content },
  // Service pages carry the search intent, so they rank above the legal pages.
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: content,
  })),
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly", lastModified: content },
  ...caseStudies.map((c) => ({
    path: `/case-studies/${c.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
    lastModified: c.datePublished,
  })),
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: legalDate },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: legalDate },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly", lastModified: legalDate },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
