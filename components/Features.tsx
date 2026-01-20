import { Layers, Shield, Handshake, Eye } from "lucide-react";

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
            <span className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-gray-300 text-sm font-medium">
              WHY US
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 card-hover"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-blue-400" />
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
      </div>
    </section>
  );
}
