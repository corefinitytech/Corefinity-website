import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  graph,
  organizationSchema,
  serviceSchema,
  websiteSchema,
} from "@/lib/schema";
import { site, siteUrl } from "@/lib/site";

import "./globals.css";

// Next injects the Font Awesome stylesheet above; stop the runtime doing it again.
config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Every relative URL below resolves against this, canonicals included.
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    // Page titles read "Get a Quote | Corefinity" without repeating the brand.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "custom web development",
    "SaaS dashboard development",
    "direct booking system",
    "Next.js development agency",
    "B2B web platform",
    "custom software development",
    "web application development",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: siteUrl,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#14161a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Browser extensions (ColorZilla, Grammarly, password managers) inject
          attributes onto <body> before React hydrates. suppressHydrationWarning
          applies to this element only, so real mismatches inside the tree still
          surface. */}
      <body
        className="bg-white font-sans text-ink antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[13px] focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <JsonLd
          schema={graph(organizationSchema(), websiteSchema(), serviceSchema())}
        />
      </body>
    </html>
  );
}
