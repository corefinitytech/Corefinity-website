import Link from "next/link";
import { Bluetooth, Timer, TrendUp } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import CardNotch, { CardAction } from "../CardNotch";
import { getPost, readingMinutes } from "@/lib/blog";
import { hardParts } from "@/lib/devices";

const icons: Record<string, Icon> = {
  bluetooth: Bluetooth,
  timer: Timer,
  trend: TrendUp,
};

/**
 * Engineers trust detail. Three short technical notes, each a card that opens
 * the full article, built the same way as the blog cards.
 */
export default function HardParts() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
          ( The hard parts )
        </p>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
          The hard parts,{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            and how we handle them
          </span>
        </h2>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {hardParts.notes.map((n) => {
            const I = icons[n.icon];
            const post = getPost(n.link.href.replace("/blog/", ""));
            return (
              <Link
                key={n.title}
                href={n.link.href}
                className="group relative flex flex-col overflow-hidden rounded-[20px] border border-black/[0.08] bg-white px-6 pt-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent-ink">
                    <I weight="duotone" className="size-6" aria-hidden />
                  </span>
                  {post && (
                    <span className="text-[11px] text-ink/60">
                      {readingMinutes(post)} min read
                    </span>
                  )}
                </div>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-accent-ink">
                  {n.topic}
                </p>
                <h3 className="mt-2 text-lg font-medium leading-snug tracking-[-0.02em] text-ink">
                  {n.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/65">
                  {n.body}
                </p>
                <CardAction label={n.link.label} />
                <CardNotch />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
