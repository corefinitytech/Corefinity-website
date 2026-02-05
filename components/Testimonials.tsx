"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Tag from "./Tag";
import { useState } from "react";

const testimonials = [
  {
    name: "John Carter",
    role: "@johncarler",
    content:
      "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: "Excellent service, team is really nice to work with. Lorem ipsum dolor sit amet consectetur.",
    avatar: null,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerSet = 8; // 2 rows × 4 cards per row
  const totalSets = Math.ceil(testimonials.length / cardsPerSet);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalSets - 1, prev + 2));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * cardsPerSet,
    currentIndex * cardsPerSet + cardsPerSet
  );
  const row1 = visibleTestimonials.slice(0, 4);
  const row2 = visibleTestimonials.slice(4, 8);

  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a1628]/30 to-[#030712]" />

      <style>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1216px);
          }
        }

        @keyframes marquee-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(1216px);
          }
        }

        .marquee-track {
          display: flex;
          gap: 1rem;
          animation: marquee-ltr 25s linear infinite;
          width: max-content;
        }

        .marquee-track.rtl {
          animation: marquee-ltr 25s linear infinite reverse;
        }

        .marquee-viewport {
          overflow: hidden;
        }

        .marquee-viewport:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Label */}
        <div className="text-center mb-8">
          <Tag>TESTIMONIAL</Tag>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Trusted by startups, businesses, &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              growing teams worldwide.
            </span>
          </h2>
        </div>

        {/* Testimonials Marquee Layout */}
        <div className="space-y-4">
          {/* Row 1: Left to Right */}
          <div className="marquee-viewport">
            <div className="marquee-track">
              {/* First set */}
              {row1.map((testimonial, idx) => (
                <div key={`row1-1-${idx}`} className="w-72 flex-shrink-0">
                  <div className="bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm flex-grow">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {row1.map((testimonial, idx) => (
                <div key={`row1-2-${idx}`} className="w-72 flex-shrink-0">
                  <div className="bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm flex-grow">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left with offset */}
          <div className="ml-[12%] relative">
            <div className="marquee-viewport">
              <div className="marquee-track rtl">
                {/* First set */}
                {row2.map((testimonial, idx) => (
                  <div key={`row2-1-${idx}`} className="w-72 flex-shrink-0">
                    <div className="bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-500 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm flex-grow">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {row2.map((testimonial, idx) => (
                  <div key={`row2-2-${idx}`} className="w-72 flex-shrink-0">
                    <div className="bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-500 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm flex-grow">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {totalSets > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-blue-500/50 bg-[#0a1628]/80 hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300 cursor-pointer hidden sm:flex"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-blue-400" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-blue-500/50 bg-[#0a1628]/80 hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300 cursor-pointer hidden sm:flex"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
