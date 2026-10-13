"use client";

import { useId, useState } from "react";

import type { Faq } from "@/lib/faqs";

/**
 * The site's question list. Shared by the home page and the articles, so one
 * accordion behaves the same everywhere.
 *
 * The panel animates on grid-template-rows rather than height, which gets the
 * eased open without measuring anything, and the answer stays in the markup
 * while closed so search engines and assistants still read it.
 */
export default function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: readonly Faq[];
  /** Index to show expanded on load, or null for all closed. */
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <div className="divide-y divide-black/[0.07] border-y border-black/[0.07]">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${id}-panel-${i}`;
        return (
          <div key={f.q}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-center gap-6 py-6 text-left"
              >
                <span className="text-base font-medium tracking-[-0.01em] text-ink">
                  {f.q}
                </span>
                <span
                  className={`ml-auto grid size-7 shrink-0 place-items-center rounded-full border border-black/10 text-ink/60 transition duration-300 ease-out group-hover:border-ink/30 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
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
  );
}
