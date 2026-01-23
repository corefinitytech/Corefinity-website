import { Layers, Shield, Handshake, Eye } from "lucide-react";
import Tag from "./Tag";

const features = [
  {
    icon: Layers,
    title: "Scalable by Design",
    description:
      "We build products that grow with your business without the need to rebuild—ready to handle increasing demand.",
  },
  {
    icon: Shield,
    title: "Clean & Secure Code",
    description:
      "Security, maintainability, and best practices are at the core of our development process for reliable software.",
  },
  {
    icon: Handshake,
    title: "Long-term Partnership",
    description:
      "We don't disappear after launch. We're here for ongoing support, iteration, and improvement as your business evolves.",
  },
  {
    icon: Eye,
    title: "Transparent Engagement",
    description:
      "Clear communication, honest timelines, and full visibility into progress—no surprises, just results.",
  },
];

export default function Features() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Label */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <Tag>WHY US</Tag>
          </div>
        </div>


        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 card-hover"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center transition-all duration-300 group-hover:border-blue-400 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_14px_rgba(59,130,246,0.45)]">
                <feature.icon className="w-7 h-7 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="mt-10 rounded-2xl border border-gray-800/60 bg-[#0a0f1e]/60 backdrop-blur-sm">
          <div className="px-6 sm:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:divide-x divide-gray-800/60 text-center">
              <div className="px-6 py-2">
                <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">04+</div>
                <div className="mt-2 text-xs sm:text-sm text-gray-400">Companies Supported<br />&amp; Counting</div>
              </div>
              <div className="px-6 py-2">
                <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">24/7</div>
                <div className="mt-2 text-xs sm:text-sm text-gray-400">Dedicated<br />Support</div>
              </div>
              <div className="px-6 py-2">
                <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">98%</div>
                <div className="mt-2 text-xs sm:text-sm text-gray-400">Client<br />Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
