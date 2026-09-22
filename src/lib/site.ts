/**
 * Single source of truth for anything that has to agree across metadata,
 * sitemap, robots, structured data and llms.txt. Change a value here and every
 * surface that quotes it follows.
 */

const fallbackUrl = "https://corefinity.tech";

/** Set NEXT_PUBLIC_SITE_URL on preview deployments so canonicals stay honest. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl
).replace(/\/$/, "");

export const site = {
  name: "Corefinity",
  legalName: "Corefinity",
  url: siteUrl,
  email: "hello@corefinity.tech",
  founded: "2024",
  /** Used as the default <title> and in structured data. */
  title: "Corefinity | Custom Software Development Company",
  /**
   * Other names the business is known by. "CoreFinity Tech" is the name on
   * the Google Business Profile, so listing it lets search engines connect
   * that profile to this site.
   */
  alternateNames: ["CoreFinity Tech", "CoreFinity"],
  tagline: "Architecting high performance digital platforms",
  description:
    "Corefinity is a custom software development company building web platforms, AI chatbots, mobile apps and automation for clients worldwide. Fixed price quotes.",
  /** Short form for cards and structured data where long copy gets clipped. */
  shortDescription:
    "Corefinity builds custom web platforms, operations dashboards and direct booking systems. Fixed scope, full code ownership.",
  locale: "en_US",
  twitter: "@corefinity",
  /** Bump when page content changes; feeds sitemap lastModified. */
  contentUpdated: "2026-09-22",
} as const;

/**
 * Official profiles, emitted as sameAs in the Organization schema. This is how
 * search engines tie the brand's profiles to one entity. Only list profiles
 * that exist and are controlled by Corefinity; an empty list emits nothing.
 */
export const sameAs: string[] = [];

/**
 * Search engine ownership tokens. Set these in the environment once each
 * property is verified; unset values are simply omitted from the head.
 *
 * Bing matters beyond its own search share: its index is what ChatGPT browsing
 * and Microsoft Copilot retrieve from, so being crawled by Bing is how this
 * site becomes quotable by assistants at all.
 */
export const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  /** Any random 32 char hex string; it is served at /<key>.txt for IndexNow. */
  indexNowKey: process.env.INDEXNOW_KEY,
} as const;

/**
 * Analytics. Google Analytics 4 sets cookies and processes personal data, so
 * it is gated behind the analytics consent category and named explicitly on
 * the cookie policy. Changing this tool means changing that page too.
 */
export const analytics = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
} as const;

export type Service = {
  name: string;
  description: string;
};

/**
 * The full service line. Feeds structured data, llms.txt and the legal pages,
 * so it is deliberately broader than the Capabilities cards on the home page,
 * which only feature a subset.
 */
export const services: Service[] = [
  {
    name: "Web development",
    description:
      "Frontend, backend and full stack builds. Marketing sites, customer portals, SaaS dashboards and internal operations tools.",
  },
  {
    name: "Mobile app development",
    description:
      "Cross platform and native applications, with the APIs and admin tooling that sit behind them.",
  },
  {
    name: "AI development",
    description:
      "Chatbots, assistants, document processing and language model integration wired into the systems a business already runs.",
  },
  {
    name: "Python scripting and automation",
    description:
      "Data pipelines, scraping, reporting and scheduled jobs that remove repetitive manual work.",
  },
  {
    name: "Search engine optimisation",
    description:
      "Technical SEO, structured data, page speed, content structure and ongoing search performance work.",
  },
  {
    name: "Systems integration",
    description:
      "Two way integrations across payment gateways, CRMs, messaging platforms, calendars and relational databases.",
  },
  {
    name: "UI and UX design",
    description:
      "Design systems built and agreed in Figma before production code is written.",
  },
  {
    name: "Cloud deployment and infrastructure",
    description:
      "Production CI and CD pipelines, edge hosting, monitoring and security practices applied on every release.",
  },
];

/**
 * Details the legal pages quote. Anything here appears verbatim in a binding
 * document, so placeholders are marked rather than guessed at.
 */
export const legal = {
  /** Replace once the business is formally registered. */
  entity: "Corefinity",
  country: "Pakistan",
  governingLaw: "the laws of the Islamic Republic of Pakistan",
  courts: "the courts of Pakistan",
  /** Update when a page is materially changed. */
  effectiveDate: "19 September 2026",
  /** Same date, machine readable, for the sitemap. Keep the two in step. */
  effectiveDateIso: "2026-09-19",
  /** Days a client has to raise an invoice dispute. */
  paymentTermDays: 14,
} as const;
