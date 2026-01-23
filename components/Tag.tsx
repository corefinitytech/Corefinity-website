import { HTMLAttributes } from "react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export default function Tag({ className = "", ...props }: TagProps) {
  const baseStyles =
    "px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-full text-gray-300 text-sm font-medium inline-block shadow-inner ring-1 ring-inset ring-gray-700/60 shadow-[inset_0_1px_6px_rgba(255,255,255,0.06)]";

  return <span className={`${baseStyles} ${className}`.trim()} {...props} />;
}
