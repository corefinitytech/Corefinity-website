import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";

// Next injects the Font Awesome stylesheet above; stop the runtime doing it again.
config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corefinity | Architecting High-Performance Digital Platforms",
  description:
    "Corefinity engineers custom web platforms, scalable SaaS dashboards, and automated business workflows that turn operational friction into scalable digital revenue.",
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
