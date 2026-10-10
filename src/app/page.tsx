import type { Metadata } from "next";

import HeroDevices from "@/components/home/HeroDevices";
import StackStrip from "@/components/home/StackStrip";
import TheGap from "@/components/home/TheGap";
import SystemMap from "@/components/home/SystemMap";
import HardwareStage from "@/components/home/HardwareStage";
import BuildSteps from "@/components/home/BuildSteps";
import FuelGuard from "@/components/home/FuelGuard";
import HardParts from "@/components/home/HardParts";
import TeamFit from "@/components/home/TeamFit";
import HowToStart from "@/components/home/HowToStart";
import Partnership from "@/components/home/Partnership";
import OtherWork from "@/components/home/OtherWork";
import ClosingCta from "@/components/home/ClosingCta";
import BlogTeaser from "@/components/BlogTeaser";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { faqSchema, graph } from "@/lib/schema";
import { openGraphDefaults, site } from "@/lib/site";

export const metadata: Metadata = {
  // Absolute so the brand is not appended twice on the page that carries it.
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    ...openGraphDefaults,
    title: site.title,
    description: site.description,
    url: "/",
  },
};

export default function Home() {
  return (
    <main id="main">
      {/* Order follows Redesign.md, sections 1 to 13 */}
      <HeroDevices />
      <StackStrip />
      <TheGap />
      <SystemMap />
      <HardwareStage />
      <BuildSteps />
      <FuelGuard />
      <HardParts />
      <TeamFit />
      <HowToStart />
      <Partnership />
      <OtherWork />
      <BlogTeaser />
      <Faq />
      <ClosingCta />
      <JsonLd schema={graph(faqSchema())} />
    </main>
  );
}
