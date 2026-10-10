"use client";

import { useState } from "react";

import Fill from "./Fill";
import { homeFaqs } from "@/lib/faqs";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 pb-20 sm:px-6 sm:pb-24">
      {/* Same max width and left edge as every other section: heading on the
          left, answers on the right. */}
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
            ( Questions )
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            Questions we get{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              asked most
            </span>
          </h2>
        </div>

        <div className="divide-y divide-black/[0.07] border-y border-black/[0.07]">
          {homeFaqs.map((f, i) => {
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
                    {f.pending && (
                      <span className="shrink-0 rounded-full border border-dashed border-coral/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c23a28]">
                        To confirm
                      </span>
                    )}
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
                    {f.pending ? (
                      <div className="max-w-2xl pb-6 pr-12">
                        <Fill>{f.pending}</Fill>
                      </div>
                    ) : (
                      <p className="max-w-2xl pb-6 pr-12 text-sm leading-relaxed text-ink/60">
                        {f.a}
                      </p>
                    )}
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
