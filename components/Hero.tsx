"use client";

import { Globe, Cpu, Smartphone, Cloud, ChevronDown } from "lucide-react";

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
  "Company 1",
  "Company 2",
  "Company 3",
  "Company 4",
  "Company 5",
  "Company 6",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
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
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/25">
                Start Your Project
              </button>
              <button className="px-6 py-3 border border-[#1e3a5f] text-white font-medium rounded-xl hover:bg-[#1e3a5f]/50 transition-all duration-300">
                View Services
              </button>
            </div>
          </div>

          {/* Right Content - 3D Globe Visualization */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Central Globe/Network Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-80">
                {/* Globe placeholder with gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent border border-blue-500/30" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-600/30 via-blue-700/20 to-transparent border border-blue-400/20" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-500/40 via-blue-600/30 to-transparent border border-blue-300/20" />

                {/* Network lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 320 320"
                >
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                      <stop
                        offset="100%"
                        stopColor="#1d4ed8"
                        stopOpacity="0.2"
                      />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="160"
                    cy="160"
                    r="100"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="70"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="130"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  {/* Network nodes */}
                  <circle cx="160" cy="60" r="4" fill="#3b82f6" />
                  <circle cx="260" cy="160" r="4" fill="#3b82f6" />
                  <circle cx="160" cy="260" r="4" fill="#3b82f6" />
                  <circle cx="60" cy="160" r="4" fill="#3b82f6" />
                  <circle cx="220" cy="90" r="3" fill="#60a5fa" />
                  <circle cx="220" cy="230" r="3" fill="#60a5fa" />
                  <circle cx="100" cy="230" r="3" fill="#60a5fa" />
                  <circle cx="100" cy="90" r="3" fill="#60a5fa" />
                </svg>

                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/50 blur-xl" />
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <div
                key={index}
                className={`absolute ${card.position} bg-[#0a1628]/90 backdrop-blur-sm border border-[#1e3a5f] rounded-xl p-3 shadow-xl`}
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
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-8">
            Trusted by the best brands around the worlds
          </p>

          {/* Company Logos Slider */}
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center gap-12 opacity-50">
              {companyLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-24 h-8 bg-gray-700/30 rounded-md"
                >
                  <span className="text-gray-500 text-xs">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
