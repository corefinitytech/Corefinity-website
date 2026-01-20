import { User } from "lucide-react";

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
    content: '"Lorem ipsum"',
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: '"Lorem ipsum"',
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: '"Lorem ipsum"',
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: '"Lorem ipsum"',
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: '"Lorem ipsum"',
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: '"Lorem ipsum"',
    avatar: null,
  },
  {
    name: "John Carter",
    role: "@johncarler",
    content: '"Lorem ipsum"',
    avatar: null,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a1628]/30 to-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Label */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
            Testimonials
          </span>
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

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
