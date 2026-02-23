import { ReactNode } from "react";

interface CaseStudySectionProps {
  title: string;
  content: string | ReactNode;
  icon?: ReactNode;
}

export default function CaseStudySection({
  title,
  content,
  icon,
}: CaseStudySectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="text-gray-400 text-lg leading-relaxed">
        {content}
      </div>
    </div>
  );
}
