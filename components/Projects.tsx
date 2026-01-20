import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Heading",
    description: "Description",
    image: "Fade in Image/Mockup of Project",
    category: "Web Platform",
  },
  {
    title: "Heading",
    description: "Description",
    image: "Fade in Image/Mockup of Project",
    category: "AI Solution",
  },
  {
    title: "Heading",
    description: "Description",
    image: "Fade in Image/Mockup of Project",
    category: "Mobile App",
  },
  {
    title: "Heading",
    description: "Description",
    image: "Fade in Image/Mockup of Project",
    category: "Cloud Solution",
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-24 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 card-hover"
            >
              {/* Project Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-[#1e3a5f]/30 to-[#0a1628] flex items-center justify-center">
                <span className="text-gray-500 text-sm">{project.image}</span>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 text-xs font-medium">
                    {project.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-[#1e3a5f] text-white font-medium rounded-xl hover:bg-[#1e3a5f]/50 transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
