"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Code, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Tag from "@/components/Tag";

const allProjects = [
  {
    title: "FlexForce",
    description: "Flexible workforce management platform for dynamic team scheduling and optimization.",
    image: "/images/FlexForce.PNG",
    category: "HR Solution",
    icon: <Zap className="w-4 h-4 text-blue-300" />,
    type: "Web Platform",
    slug: "flexforce",
  },
  {
    title: "Mirhapret",
    description: "Advanced analytics and insights platform for data-driven business decisions.",
    image: "/images/Mirhapret.PNG",
    category: "Analytics",
    icon: <Shield className="w-4 h-4 text-blue-300" />,
    type: "AI Solutions",
    slug: "mirhapret",
  },
  {
    title: "Code Smell Detection",
    description: "Automated code quality analysis and improvement recommendations system.",
    image: "/images/code-smell-detection.png",
    category: "DevTools",
    icon: <Code className="w-4 h-4 text-blue-300" />,
    type: "AI Solutions",
    slug: "code-smell-detection",
  },
  {
    title: "Crystal Beryl Media",
    description: "Comprehensive media management and content delivery platform.",
    image: "/images/Crystalberylmedia.PNG",
    category: "Media Platform",
    icon: <Layers className="w-4 h-4 text-blue-300" />,
    type: "Web Platform",
    slug: "crystal-beryl-media",
  },
];

const tabs = [
  { label: "All", value: "all" },
  { label: "AI Solutions", value: "AI Solutions" },
  { label: "Cloud & Deployment", value: "Cloud & Deployment" },
  { label: "Mobile Applications", value: "Mobile Applications" },
  { label: "Web Platform", value: "Web Platform" },
];

export default function Work() {
  const [activeTab, setActiveTab] = useState(0);

  const filteredProjects =
    activeTab === 0
      ? allProjects
      : allProjects.filter((project) => project.type === tabs[activeTab].value);

  return (
    <main className="min-h-screen bg-[#030712] overflow-x-hidden w-full">
      <Navbar />
      
      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 bg-[#030712]" />

        <div className="relative max-w-[1400px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block">
              <Tag>OUR WORK</Tag>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Our Projects
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our portfolio of innovative digital solutions and successful client projects
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-16 p-1 bg-gray-900/30 border border-gray-700/30 rounded-2xl sm:rounded-full w-fit max-w-full mx-auto px-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(index)}
                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer z-10 ${
                  activeTab === index
                    ? "text-blue-200"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {/* Sliding background INSIDE the active button */}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-blue-600/20 border border-blue-500/50 rounded-full shadow-lg shadow-blue-500/20"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  category={project.category}
                  icon={project.icon}
                  slug={project.slug}
                />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg font-medium">No projects found</p>
              <p className="text-gray-500 text-sm mt-2">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
