import { faqs } from "./faqs";
import { services, site, siteUrl } from "./site";

/**
 * Schema.org graph for the site.
 *
 * Everything below is a fact the site can stand behind. No invented review
 * scores, no social profiles that do not exist yet, no employee counts. Search
 * engines and language models both penalise structured data that disagrees
 * with the page, so this file only ever restates what a visitor can read.
 */

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    email: site.email,
    description: site.description,
    slogan: site.tagline,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo/logo-3.png`,
      caption: site.name,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        availableLanguage: ["English"],
        url: `${siteUrl}/contact`,
      },
    ],
    knowsAbout: [
      "Web application development",
      "SaaS dashboard development",
      "Direct booking systems",
      "Next.js",
      "TypeScript",
      "API integration",
      "Cloud deployment",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };
}

export function serviceSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: site.name,
    url: siteUrl,
    email: site.email,
    description: site.description,
    provider: { "@id": organizationId },
    // Stated as worldwide because delivery is remote, which is true.
    areaServed: { "@type": "Place", name: "Worldwide" },
    serviceType: services.map((s) => s.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software engineering services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
        },
      })),
    },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/** Wraps nodes into one @graph so the page ships a single script tag. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
