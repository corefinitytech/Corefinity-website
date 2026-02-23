import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  icon: ReactNode;
  slug?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  category,
  icon,
  slug,
}: ProjectCardProps) {
  const projectSlug = slug || title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/work/${projectSlug}`}>
      <div className="group relative bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 card-hover cursor-pointer h-full">
        {/* Project Image */}
        <div className="relative h-[240px] overflow-hidden bg-[#0a1628]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 400px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]" />
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              {icon}
            </div>
            <div className="text-blue-400 text-xs font-medium">{category}</div>
            <div className="ml-auto">
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}
