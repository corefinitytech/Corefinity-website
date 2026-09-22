import { faqs } from "./faqs";
import {
  address,
  disambiguation,
  sameAs,
  services,
  site,
  siteUrl,
} from "./site";

/**
 * Schema.org graph for the site.
 *
 * Everything below is a fact the site can stand behind. No invented review
 * scores, no social profiles that do not exist yet, no employee counts. Search
 * engines and language models both penalise structured data that disagrees
 * with the page, so this file only ever restates what a visitor can read.
 */

const organizationId = `${siteUrl}/#organization`;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  };
}
const websiteId = `${siteUrl}/#website`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    alternateName: site.alternateNames,
    legalName: site.legalName,
    url: siteUrl,
    email: site.email,
    description: site.description,
    disambiguatingDescription: disambiguation,
    slogan: site.tagline,
    address: postalAddress(),
    // Square mark: Google shows the logo in a square frame, where the wide
    // wordmark on its navy ground would be cropped to nothing legible.
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo/mark-512.png`,
      width: 512,
      height: 512,
      caption: site.name,
    },
    ...(sameAs.length ? { sameAs } : {}),
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
      "Mobile app development",
      "SaaS dashboard development",
      "AI and chatbot development",
      "Python automation",
      "Search engine optimisation",
      "Direct booking systems",
      "API integration",
      "Next.js",
      "TypeScript",
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
    address: postalAddress(),
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
