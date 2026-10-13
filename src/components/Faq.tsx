import FaqAccordion from "./FaqAccordion";
import { faqs } from "@/lib/faqs";

export default function Faq() {
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

        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
