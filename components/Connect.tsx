import React from "react";
import Image from "next/image";

type Bubble = {
  src: string;
  label: string;
  size: number;
  top: string;
  left?: string;
  right?: string;
  delay: number;
};

const leftBubbles: Bubble[] = [
  { src: "/images/Facebook.svg", label: "Facebook", size: 74, top: "8%", left: "5%", delay: 0 },
  { src: "/images/Twitter.svg", label: "X", size: 56, top: "24%", left: "18%", delay: 1.6 },
  { src: "/images/Linkedin.svg", label: "LinkedIn", size: 66, top: "46%", left: "10%", delay: 0.9 },
  { src: "/images/Discord.svg", label: "Discord", size: 62, top: "66%", left: "5%", delay: 2.2 },
  { src: "/images/Youtube.svg", label: "YouTube", size: 54, top: "80%", left: "18%", delay: 1.2 },
];

const rightBubbles: Bubble[] = [
  { src: "/images/Gmail.svg", label: "Gmail", size: 62, top: "16%", right: "18%", delay: 1.1 },
  { src: "/images/Instagram.svg", label: "Instagram", size: 76, top: "4%", right: "5%", delay: 0.4 },
  { src: "/images/Behance.svg", label: "Behance", size: 62, top: "38%", right: "13%", delay: 2 },
  { src: "/images/google.svg", label: "Google", size: 52, top: "74%", right: "18%", delay: 1.5 },
  { src: "/images/whatsapp.svg", label: "WhatsApp", size: 66, top: "58%", right: "7%", delay: 0.7 },
];

export default function Connect() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#050815]" />

      <style>{`
        @keyframes float-bubble {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Social Tag */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1 rounded-full border border-blue-500/40 bg-white/5 text-xs text-blue-100 backdrop-blur">
            SOCIAL
          </span>
        </div>

        {/* Floating bubbles desktop */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {[...leftBubbles, ...rightBubbles].map((bubble, idx) => (
            <div
              key={idx}
              className="bubble absolute rounded-full border border-blue-400/50 bg-gradient-to-b from-[#1a2b4a] to-[#0b1324] shadow-[inset_0_1px_4px_rgba(255,255,255,0.08),0_12px_30px_rgba(15,23,42,0.45),0_0_36px_rgba(59,130,246,0.35)] flex items-center justify-center"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                top: bubble.top,
                left: bubble.left,
                right: bubble.right,
                animation: `float-bubble 6s ease-in-out infinite`,
                animationDelay: `${bubble.delay}s`,
              }}
            >
              <Image
                src={bubble.src}
                alt={bubble.label}
                width={bubble.size * 0.55}
                height={bubble.size * 0.55}
                className="object-contain"
                style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }}
              />
            </div>
          ))}
        </div>

        {/* Center content */}
        <div className="relative text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Connect with Corefinity
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Follow us for insights on technology, product development, AI solutions, and our latest projects.
          </p>

          {/* Mobile/Tablet grid for icons */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 justify-items-center pt-6 lg:hidden">
            {[...leftBubbles, ...rightBubbles].map((bubble, idx) => (
              <div
                key={idx}
                className="w-14 h-14 rounded-full border border-blue-400/40 bg-gradient-to-b from-[#1a2b4a] to-[#0b1324] shadow-[inset_0_1px_4px_rgba(255,255,255,0.08),0_10px_24px_rgba(15,23,42,0.45),0_0_28px_rgba(59,130,246,0.28)] flex items-center justify-center animate-[float-bubble_6s_ease-in-out_infinite]"
                style={{ animationDelay: `${bubble.delay}s` }}
              >
                <Image
                  src={bubble.src}
                  alt={bubble.label}
                  width={26}
                  height={26}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
