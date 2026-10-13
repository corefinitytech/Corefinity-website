import FaqAccordion from "./FaqAccordion";
import { faqs } from "@/lib/faqs";

export default function Faq() {
  return (
    <section id="faq" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
          Questions we get{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            asked most
          </span>
        </h2>

        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
