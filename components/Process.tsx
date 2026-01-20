import { Search, PenTool, TestTube, Headphones } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover & Align",
    description: "Understanding your goals and requirements",
  },
  {
    icon: PenTool,
    title: "Design & Build",
    description: "Creating and developing your solution",
  },
  {
    icon: TestTube,
    title: "Test, Deploy & Optimize",
    description: "Ensuring quality and performance",
  },
  {
    icon: Headphones,
    title: "Support & Scale",
    description: "Ongoing maintenance and growth",
  },
];

export default function Process() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a1628]/50 to-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How we turn ideas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              into reliable products
            </span>
          </h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px]">
            <div className="w-full h-full border-t-2 border-dashed border-[#1e3a5f]" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Icon */}
                <div className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-2xl bg-[#0a1628] border border-[#1e3a5f] flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-blue-400" />
                </div>

                {/* Step Number */}
                <div className="absolute top-0 right-1/2 translate-x-[60px] -translate-y-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="px-6 py-3 border border-[#1e3a5f] text-white font-medium rounded-xl hover:bg-[#1e3a5f]/50 transition-all duration-300">
            Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
