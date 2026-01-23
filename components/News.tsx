import { Calendar, ArrowRight } from "lucide-react";
import Button from "./Button";
import Tag from "./Tag";

const articles = [
  {
    title: "Building Scalable Web Applications: What Businesses Often Overlook",
    date: "ARTICLE • AUGUST 17, 2024",
    image: "Article Image",
  },
  {
    title: "Building Scalable Web Applications: What Businesses Often Overlook",
    date: "ARTICLE • AUGUST 17, 2024",
    image: "Article Image",
  },
  {
    title: "Building Scalable Web Applications: What Businesses Often Overlook",
    date: "ARTICLE • AUGUST 17, 2024",
    image: "Article Image",
  },
];

export default function News() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Section Label */}
        <div className="text-center mb-8">
          <Tag>Resources</Tag>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            News & Articles
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thoughts, case studies, and practical insights on web development,
            mobile applications, AI solutions, and modern software practices.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group bg-[#0a1628]/60 border border-[#1e3a5f]/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 card-hover"
            >
              {/* Article Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-[#1e3a5f]/30 to-[#0a1628] flex items-center justify-center">
                <span className="text-gray-500 text-sm">{article.image}</span>
              </div>

              {/* Article Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500 text-xs">{article.date}</span>
                </div>
                <h3 className="text-white font-semibold mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="text-center mt-12">
          <Button className="inline-flex items-center gap-2">
            Browse all articles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
