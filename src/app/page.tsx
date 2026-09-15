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

export default function Home() {
  return (
    <main>
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
    </main>
  );
}
