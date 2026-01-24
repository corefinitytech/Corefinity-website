import React from "react";
import Image from "next/image";
import Tag from "./Tag";

interface TechIcon {
  name: string;
  image: string;
}

const techStack: TechIcon[] = [
  { name: "Figma", image: "/images/figma.svg" },
  { name: "React", image: "/images/react.svg" },
  { name: "Next", image: "/images/nextjs.svg" },
  { name: "TailwindCSS", image: "/images/tailwindcss.svg" },
  { name: "Framer Motion", image: "/images/framerMotion.svg" },
  { name: "Three.js", image: "/images/ThreeJs.svg" },
  { name: "React Native", image: "/images/reactnative.svg" },
  { name: "Flutter", image: "/images/flutter.svg" },
  { name: "Python", image: "/images/python.svg" },
  { name: "Fast API", image: "/images/fastapi-icon.svg" },
  { name: "TensorFlow", image: "/images/tensorflow.svg" },
  { name: "HuggingFace", image: "/images/hugging-face-icon.svg" },
  { name: "OpenCV", image: "/images/opencv.svg" },
  { name: "AWS", image: "/images/aws.svg" },
  { name: "Google Cloud", image: "/images/GoogleCloud.svg" },
  { name: "Docker", image: "/images/docker-icon.svg" },
  { name: "Kubernetes", image: "/images/kubernetes.svg" },
  { name: "Vercel", image: "/images/vercel.svg" },
  { name: "Firebase", image: "/images/firebase-icon.svg" },
  { name: "MongoDB", image: "/images/mongo.svg" },
  { name: "Redis", image: "/images/redis.svg" },
  { name: "Pinecone", image: "/images/pinecone-icon.svg" },
  { name: "PyTorch", image: "/images/pytorch-icon.svg" },
  { name: "Supabase", image: "/images/supabase.svg" },
  { name: "GitHub", image: "/images/github-fill.svg" },
  { name: "WordPress", image: "/images/wordpress.svg" },
  { name: "Shopify", image: "/images/shopify.svg" },
  { name: "Socket.io", image: "/images/socket-io.svg" },
];

export default function TechStack() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a1628]/30 to-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <Tag>TECH STACK</Tag>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built with Modern, Battle
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Tested Technologies
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We work with a carefully selected stack of modern frameworks, cloud platforms, and AI
            tools to build secure, scalable, and high-performance digital products. Our technology
            choices are driven by real-world reliability, not trends
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-6 justify-items-center">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center gap-3 cursor-pointer"
            >
              {/* Bubble Circle with Inner Shadow */}
              <div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a2844] to-[#0f1829] border border-[#1e3a5f] flex items-center justify-center transition-all duration-300 hover:border-blue-400/60 hover:shadow-lg"
                style={{
                  boxShadow: `
                    inset 0 2px 8px rgba(0, 0, 0, 0.6),
                    inset 0 -2px 8px rgba(0, 0, 0, 0.4),
                    0 0 15px rgba(37, 99, 235, 0.1)
                  `,
                }}
              >
                <Image
                  src={tech.image}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>

              {/* Tech Name */}
              <span className="text-xs font-medium text-gray-300 text-center group-hover:text-blue-300 transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
