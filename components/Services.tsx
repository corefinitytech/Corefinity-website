"use client";

import { Globe, Cpu, Smartphone, Cloud, Check, Sparkles } from "lucide-react";
import Button from "./Button";
import Tag from "./Tag";
import Image from "next/image";

const services = [
  {
    icon: Cpu,
    title: "AI Solutions",
    description:
      "Smart systems that automate, predict, and scale your business with cutting-edge artificial intelligence.",
    features: ["Chatbots", "Model Training", "AI APIs"],
    featured: true,
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    description:
      "Reliable cloud infrastructure and deployment pipelines that ensure performance, security, and scalability in production.",
    features: ["Cloud Hosting", "CI/CD Pipelines", "Secure Deployments"],
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Cross-platform mobile apps designed for usability, performance, and long-term growth across iOS and Android.",
    features: ["Business Apps", "MVPs", "User-Focused Experiences"],
  },
  {
    icon: Globe,
    title: "Web Platforms",
    description:
      "Scalable, secure, and high-performance web solutions built to support modern businesses and accelerate growth.",
    features: ["Web Apps", "Dashboards", "SaaS Platforms"],
  },
];

export default function Services() {
  const featuredService = services.find(s => s.featured);
  const otherServices = services.filter(s => !s.featured);

  return (
    <section id="services" className="py-24 relative bg-[#030712]">
      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <Tag>WHAT WE DO</Tag>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Services We Offer
          </h2>
        </div>

        {/* Featured Service Card */}
        {featuredService && (
          <div className="group mb-8 border border-gray-700/50 rounded-2xl p-8 overflow-hidden relative" style={{ backgroundImage: 'url(/images/service-card-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent pointer-events-none z-[3]" />
            <div className="relative z-[20] grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-blue-400 group-hover:bg-blue-500/25 group-hover:shadow-[0_0_16px_rgba(59,130,246,0.45)]">
                    <featuredService.icon className="w-6 h-6 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {featuredService.title}
                  </h3>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  {featuredService.description}
                </p>
                
                <div className="space-y-3">
                  {featuredService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-sm bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-blue-400 group-hover:bg-blue-500/30 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.45)]">
                        <Check className="w-3 h-3 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
                      </div>
                      <span className="text-gray-300 text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="hidden lg:flex justify-end items-center">
                <div className="mr-8">
                  <Image
                    src="/images/AI-service-image.svg"
                    alt="AI Solutions Visualization"
                    width={380}
                    height={220}
                    className="w-full h-auto object-contain max-h-64"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid - 3 Columns */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {otherServices.map((service, index) => (
            <div
              key={index}
              className="group border border-gray-700/50 rounded-2xl p-6 overflow-hidden transition-all duration-300 relative hover:border-gray-600/80"
              style={{ backgroundImage: 'url(/images/service-card-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/75 to-gray-900/85" />
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-600/20 to-gray-700/20 border border-gray-600/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-blue-500/60 group-hover:bg-blue-500/10 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                    <service.icon className="w-5 h-5 text-gray-300 transition-colors duration-300 group-hover:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-gray-700/50 border border-gray-600/50 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-600/50 transition-colors">
                        <Check className="w-2.5 h-2.5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button>View All Services</Button>
        </div>
      </div>
    </section>
  );
}
