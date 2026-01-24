import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";
import Connect from "@/components/Connect";
import Testimonials from "@/components/Testimonials";
import News from "@/components/News";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] overflow-x-hidden w-full">
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Process />
      <Projects />
      <TechStack />
      <CTA />
      <Connect />
      <Testimonials />
      <News />
      <Footer />
    </main>
  );
}
