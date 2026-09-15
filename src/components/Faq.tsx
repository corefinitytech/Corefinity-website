"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How fast can Corefinity ship our platform?",
    a: "Showcase platforms and MVP web builds are typically ready for staging review within 10 to 14 business days. Full-stack dashboards and custom operating systems take between 3 to 4 weeks depending on database complexity.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You own 100% of the intellectual property. Upon project sign-off, all GitHub repositories, Figma source files, environment keys, and database assets are transferred directly to your team.",
  },
  {
    q: "Do you handle both the public-facing website and internal dashboards?",
    a: "Yes. We specialize in full-stack architecture—connecting high-converting public landing pages directly to secure administrative control rooms, customer portals, and database pipelines.",
  },
  {
    q: "How do we kick off a project?",
    a: "Submit a project brief through the form below. We will review your requirements, schedule a focused 15-minute discovery session, and deliver a fixed-scope technical roadmap within 48 hours.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
          Everything You{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            Need to Know
          </span>
        </h2>

        <div className="mt-10 divide-y divide-black/[0.07] border-y border-black/[0.07]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={"faq-panel-" + i}
                    className="flex w-full items-center gap-6 py-6 text-left"
                  >
                    <span className="text-base font-medium tracking-[-0.01em] text-ink">
                      {f.q}
                    </span>
                    <span
                      className={`ml-auto grid size-7 shrink-0 place-items-center rounded-full border border-black/10 text-ink/60 transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={"faq-panel-" + i}
                  role="region"
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "grid-template-rows 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pr-12 text-sm leading-relaxed text-ink/60">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
