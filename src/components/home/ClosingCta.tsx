import Link from "next/link";

import { ArrowRight, Envelope } from "../icons";
import { closing } from "@/lib/devices";
import { site } from "@/lib/site";

export default function ClosingCta() {
  return (
    <section id="contact" className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[radial-gradient(120%_140%_at_15%_50%,#0f5bb5_0%,#123a78_40%,#0a1730_70%,#05070f_100%)] px-6 py-16 text-white sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="relative grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {closing.heading}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
              {closing.line}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-medium text-ink transition hover:bg-white/90"
            >
              Talk to an engineer
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-[13px] font-medium text-white transition hover:border-white"
            >
              <Envelope className="size-3.5" />
              Email {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
