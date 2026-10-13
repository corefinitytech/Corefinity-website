import Link from "next/link";

import { ArrowRight } from "../icons";
import { otherWork } from "@/lib/devices";

/** Real client names, kept low on the page so they do not muddy the message. */
export default function OtherWork() {
  const { feature } = otherWork;
  return (
    <section
      aria-label="Other software we have built"
      className="px-4 pb-20 sm:px-6 sm:pb-24"
    >
      <div className="mx-auto grid max-w-7xl gap-8 border-y border-black/[0.07] py-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-center lg:gap-12">
        <div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/65">
            {otherWork.line}
          </p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            {otherWork.names.map((c) => (
              <li key={c.url}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium tracking-tight text-ink/60 transition hover:text-ink"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* The one with a case study behind it: the headline result, then the page. */}
        <Link
          href={feature.href}
          className="group flex flex-col rounded-[20px] bg-mist p-6 transition duration-300 hover:-translate-y-0.5"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent-ink">
            {feature.name} / Case study
          </span>
          <span className="mt-3 text-lg font-medium leading-snug tracking-[-0.02em] text-ink">
            {feature.result}
          </span>
          <span className="mt-2 text-[13px] leading-relaxed text-ink/65">
            {feature.note}
          </span>
          <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-ink">
            {feature.link}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  );
}
