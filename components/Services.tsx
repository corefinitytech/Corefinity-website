import { Globe, Cpu, Smartphone, Cloud, Check } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Platforms",
    description:
      "Scalable, secure, and high-performance web solutions built to support modern businesses and accelerate growth.",
    features: ["Web Apps", "Dashboards", "SaaS Platforms"],
  },
  {
    icon: Cpu,
    title: "AI Solutions",
    description:
      "Smart systems that automate, predict, and scale your business with cutting-edge artificial intelligence.",
    features: ["Chatbots", "Model Training", "AI APIs"],
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Cross-platform mobile apps designed for usability, performance, and long-term growth across iOS and Android.",
    features: ["Business Apps", "MVPs", "User-Focused Experiences"],
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    description:
      "Reliable cloud infrastructure and deployment pipelines that ensure performance, security, and scalability in production.",
    features: ["Cloud Hosting", "CI/CD Pipelines", "Secure Deployments"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-[#030712]">
      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <span className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-gray-300 text-sm font-medium">
              WHAT WE DO
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Services We Offer
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 rounded-3xl p-0.5 overflow-hidden hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              {/* Inner card with dark background */}
              <div className="bg-[#0a0e1a] rounded-3xl p-8 space-y-6">
                {/* Icon and Title */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-400 text-base leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-3 pt-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-sm border-2 border-gray-600 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400 transition-colors">
                        <Check className="w-3 h-3 text-gray-500 group-hover:text-blue-400" />
                      </div>
                      <span className="text-gray-300 text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-8 py-3 border border-blue-500 text-white font-medium rounded-xl hover:bg-blue-500/10 transition-all duration-300">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
}
