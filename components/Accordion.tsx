"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
        }
        .accordion-content.expanded {
          max-height: 500px;
        }
      `}</style>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-700/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-600"
          >
            <button
              onClick={() => toggleExpand(index)}
              className="w-full px-6 py-4 flex items-center justify-between bg-[#0a1628]/40 hover:bg-[#0a1628]/60 transition-colors"
            >
              <span className="text-white font-medium text-left text-lg">
                {item.question}
              </span>
              <div className="flex-shrink-0 ml-4 transition-transform duration-300">
                {expandedIndex === index ? (
                  <Minus className="w-5 h-5 text-gray-400" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            <div
              className={`accordion-content ${
                expandedIndex === index ? "expanded" : ""
              }`}
            >
              <div className="px-6 py-4 bg-[#030712] border-t border-gray-700/50">
                <p className="text-gray-400 text-base leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
