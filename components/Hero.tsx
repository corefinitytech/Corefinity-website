"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Globe, Cpu, Smartphone, Cloud, ChevronDown } from "lucide-react";
import Button from "./Button";

const floatingCards = [
  {
    icon: Globe,
    title: "Web Platforms",
    position: "top-12 left-8",
  },
  {
    icon: Cpu,
    title: "AI Solutions",
    position: "top-12 right-8",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    position: "bottom-20 left-8",
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    position: "bottom-20 right-8",
  },
];

const companyLogos = [
  { name: "Figma", image: "/images/figma.svg" },
  { name: "React", image: "/images/react.svg" },
  { name: "Next.js", image: "/images/nextjs.svg" },
  { name: "Tailwind", image: "/images/tailwindcss.svg" },
  { name: "Google Cloud", image: "/images/GoogleCloud.svg" },
  { name: "AWS", image: "/images/aws.svg" },
  { name: "Docker", image: "/images/docker-icon.svg" },
  { name: "Kubernetes", image: "/images/kubernetes.svg" },
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
                className={`absolute ${card.position} bg-[#0a1628]/80 backdrop-blur-md border border-cyan-400/40 rounded-2xl p-4 shadow-2xl animate-float-${index + 1}`}
                style={{
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/40 to-blue-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <card.icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <span className="text-white text-sm font-semibold">
                    {card.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Companies Section */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-xs tracking-[0.28em] uppercase mb-12">
            Trusted by teams at the world's leading companies
          </p>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6 justify-center">
              {companyLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 rounded-full border border-blue-500/40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 group cursor-pointer">
                    {logo.image && (
                      <Image
                        src={logo.image}
                        alt={logo.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300"
                        priority={false}
                      />
                    )}
                  </div>
                  <span className="text-gray-300 text-xs font-medium text-center">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
