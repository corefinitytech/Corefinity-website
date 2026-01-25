import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({ className = "", type = "button", ...props }: ButtonProps) {
  const baseStyles =
    "px-6 py-2.5 border border-white/60 text-white text-sm font-normal rounded-lg hover:bg-white/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer glow-border";

  return <button type={type} className={`${baseStyles} ${className}`.trim()} {...props} />;
}
