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
  email: "corefinity.tech@gmail.com",
  founded: "2024",
  /** Used as the default <title> and in structured data. */
  title: "Corefinity | Custom Web Platforms, Dashboards and Booking Systems",
  tagline: "Architecting high performance digital platforms",
  description:
    "Corefinity builds custom web platforms, operations dashboards and direct booking systems for businesses that have outgrown templates. Fixed scope, full source code ownership, live in weeks.",
  /** Short form for cards and structured data where long copy gets clipped. */
  shortDescription:
    "Corefinity builds custom web platforms, operations dashboards and direct booking systems. Fixed scope, full code ownership.",
  locale: "en_US",
  twitter: "@corefinity",
} as const;

export type Service = {
  name: string;
  description: string;
};

/** Mirrors the Capabilities section. Feeds the service list in structured data. */
export const services: Service[] = [
  {
    name: "Custom B2B platforms and dashboards",
    description:
      "Operations systems, customer portals and internal workflows built to replace disconnected subscriptions and manual spreadsheets.",
  },
  {
    name: "Direct booking and commerce engines",
    description:
      "Commission free transaction flows, automated calendar synchronisation and checkout engines built for hospitality and direct sales.",
  },
  {
    name: "UI and UX architecture",
    description:
      "Design systems built and validated in Figma before a line of production code is written.",
  },
  {
    name: "API and workflow automation",
    description:
      "Two way integrations with payment gateways, CRMs, WhatsApp notifications and relational databases.",
  },
  {
    name: "Cloud infrastructure and deployment",
    description:
      "Production CI and CD pipelines, edge hosting on Vercel and enterprise grade data security on every release.",
  },
];
