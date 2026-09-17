import type { Metadata } from "next";

import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Capabilities from "@/components/Capabilities";
import Marquee from "@/components/Marquee";
import Philosophy from "@/components/Philosophy";
import Advantage from "@/components/Advantage";
import Pricing from "@/components/Pricing";
import CaseStudy from "@/components/CaseStudy";
import Faq from "@/components/Faq";
import ProjectBrief from "@/components/ProjectBrief";
import JsonLd from "@/components/JsonLd";
import { faqSchema, graph } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // Absolute so the brand is not appended twice on the page that carries it.
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
  },
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Statement />
      <Capabilities />
      <Marquee />
      <Philosophy />
      <Advantage />
      <Pricing />
      <CaseStudy />
      <Faq />
      <ProjectBrief />
      <JsonLd schema={graph(faqSchema())} />
    </main>
  );
}
