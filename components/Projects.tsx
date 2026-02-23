import { ExternalLink, Layers, Brain, Smartphone, Cloud, Zap, Shield, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Tag from "./Tag";

const projects = [
  {
    title: "FlexForce",
    description: "Flexible workforce management platform for dynamic team scheduling and optimization.",
    image: "/images/FlexForce.PNG",
    category: "HR Solution",
    icon: Zap,
  },
  {
    title: "Mirhapret",
    description: "Advanced analytics and insights platform for data-driven business decisions.",
    image: "/images/Mirhapret.PNG",
    category: "Analytics",
    icon: Shield,
  },
  {
    title: "Code Smell Detection",
    description: "Automated code quality analysis and improvement recommendations system.",
    image: "/images/code-smell-detection.png",
    category: "DevTools",
    icon: Code,
  },
  {
    title: "Crystal Beryl Media",
    description: "Comprehensive media management and content delivery platform.",
    image: "/images/Crystalberylmedia.PNG",
    category: "Media Platform",
    icon: Layers,
  },
];

// Alternating column widths per row: row 1 (left narrow/right wide), row 2 (left wide/right narrow)
const widthPatterns = [
  "lg:grid-cols-[0.9fr_1.1fr]",
  "lg:grid-cols-[1.1fr_0.9fr]",
];

export default function Projects() {
  return (
    <section id="work" className="py-24 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Label */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <Tag>OUR WORK</Tag>
          </div>
        </div>

        {/* Projects Grid with alternating widths per row */}
        {(() => {
          const rows: typeof projects[] = [];
          for (let i = 0; i < projects.length; i += 2) {
            rows.push(projects.slice(i, i + 2));
          }

          return rows.map((row, rowIdx) => {
            const colPattern = widthPatterns[rowIdx % widthPatterns.length];
            return (
              <div
                key={rowIdx}
                className={`grid grid-cols-1 md:grid-cols-2 ${colPattern} gap-6 mb-6 last:mb-0`}
              >
                {row.map((project, index) => (
                  <div
                    key={`${rowIdx}-${index}`}
                    className="group relative bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 card-hover min-h-[420px]"
                  >
                    {/* Project Image */}
                    <div className="relative h-[240px] overflow-hidden bg-[#0a1628]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 600px, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                          <project.icon className="w-4 h-4 text-blue-300" />
                        </div>
                        <div className="text-blue-400 text-xs font-medium">{project.category}</div>
                        <div className="ml-auto">
                          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          });
        })()}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/work">
            <Button>View All Projects</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
