import Image from "next/image";
import { ReactNode } from "react";

interface CaseStudyHeroProps {
  title: string;
  category: string;
  description: string;
  image: string;
  icon: ReactNode;
}

export default function CaseStudyHero({
  title,
  category,
  description,
  image,
  icon,
}: CaseStudyHeroProps) {
  return (
    <section className="pt-32 pb-16 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                {icon}
              </div>
              <span className="text-blue-400 text-sm font-medium">{category}</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              {title}
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-700/50">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
