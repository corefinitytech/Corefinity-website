import { Search, PenTool, TestTube, Headphones } from "lucide-react";
import Tag from "./Tag";

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

      <style>{`
        @keyframes glow-expand {
          0% {
            box-shadow: 0 0 18px rgba(37, 99, 235, 0.12);
          }
          100% {
            box-shadow: 0 0 35px rgba(59, 130, 246, 0.35), 0 0 50px rgba(37, 99, 235, 0.15);
          }
        }
        
        .process-icon {
          transition: all 0.3s ease;
        }
        
        .process-icon:hover {
          animation: glow-expand 0.6s ease forwards;
          border-color: #60a5fa;
        }
      `}</style>

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <Tag>HOW WE WORK</Tag>
          </div>
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
          {/* Curved dashed path */}
          <svg
            className="hidden lg:block absolute inset-x-0 top-0 h-24 w-full pointer-events-none"
            viewBox="0 0 1200 180"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M150 95 C 240 75, 360 80, 450 100 C 540 120, 660 120, 750 100 C 840 80, 960 75, 1050 95"
              stroke="#ffffff"
              strokeWidth="3"
              strokeDasharray="12 12"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Icon */}
                <div className="process-icon relative z-10 w-20 h-20 mx-auto mb-4 rounded-full bg-[#0a1628] border-2 border-[#1e3a5f] flex items-center justify-center">
                  <step.icon className="w-9 h-9 text-blue-300" />
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

      </div>
    </section>
  );
}
