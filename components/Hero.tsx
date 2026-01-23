"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Globe, Cpu, Smartphone, Cloud, ChevronDown } from "lucide-react";
import Button from "./Button";

const floatingCards = [
  {
    icon: Globe,
    title: "Web Platforms",
    position: "top-8 left-0",
  },
  {
    icon: Cpu,
    title: "AI Solutions",
    position: "top-8 right-0",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    position: "bottom-24 left-0",
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    position: "bottom-24 right-0",
  },
];

const companyLogos = [
  { name: "Air University", image: "/images/air-university.png" },
  { name: "Bahria University", image: "/images/bahria-university.png" },
  { name: "Menspoke", image: "/images/menspoke.png" },
  { name: "Sarhad University", image: "/images/sarhad-university.svg" },
  { name: "Trillet.ai", image: "/images/trillet-ai.png" },
  { name: "Microsoft", image: "/images/Microsoft.jpg" },
  { name: "OpenAI", image: "/images/openAI.jpg" },
];

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const ITEM_WIDTH = 220; // px
  const sliderItems = useMemo(() => [...companyLogos, ...companyLogos], []);

  useEffect(() => {
    const id = setInterval(() => {
      setOffset((prev) => (prev + 1) % companyLogos.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float-1 { animation: float 4s ease-in-out infinite; }
        .animate-float-2 { animation: float 4.5s ease-in-out infinite 0.1s; }
        .animate-float-3 { animation: float 5s ease-in-out infinite 0.2s; }
        .animate-float-4 { animation: float 4.3s ease-in-out infinite 0.15s; }
      `}</style>
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-[1400px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Building Digital Products{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                That Power Modern Businesses
              </span>
            </h1>

            <p className="text-gray-400 text-lg max-w-xl">
              We help startups, businesses, and enterprises design, develop, and
              deploy secure web, mobile, and AI solutions tailored to real-world
              needs.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button>Start Your Project</Button>
              <Button>View Services</Button>
            </div>
          </div>

          {/* Right Content - 3D Globe Visualization */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Central Globe/Network Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/globe.svg"
                alt="Globe"
                width={400}
                height={400}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <div
                key={index}
                className={`absolute ${card.position} bg-[#0a1628]/90 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-3 shadow-xl animate-float-${index + 1}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-white text-sm font-medium">
                    {card.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Companies Section */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-xs tracking-[0.28em] uppercase mb-8">
            Trusted by teams at the world's leading companies
          </p>

          <div className="relative max-w-6xl mx-auto overflow-hidden">
            <div
              className="relative z-0 flex items-center gap-6 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${offset * ITEM_WIDTH}px)` }}
            >
              {sliderItems.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  style={{ minWidth: ITEM_WIDTH }}
                  className="inline-flex items-center justify-center px-4 py-2 transition-transform duration-300 ease-out"
                >
                  {logo.image ? (
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={160}
                      height={40}
                      className="h-10 w-auto object-contain"
                      priority={false}
                    />
                  ) : (
                    <span className="text-white/80 text-sm font-medium tracking-wide">
                      {logo.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
