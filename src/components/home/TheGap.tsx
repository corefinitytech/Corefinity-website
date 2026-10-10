import {
  Database,
  Receipt,
  SquaresFour,
  WifiSlash,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

import { gap } from "@/lib/devices";

/** Phosphor duotone icons, one per gap. */
const icons: Record<string, Icon> = {
  signal: WifiSlash,
  database: Database,
  fleet: SquaresFour,
  receipt: Receipt,
};

/** Names the problem better than the visitor can, which is where trust starts. */
export default function TheGap() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-14 sm:px-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( The gap )
            </p>
            <h2 className="mt-4 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              A working prototype is about{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                a third of a connected product.
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/65">
              The rest only shows up once real people carry the device around.
              These are the four places it usually breaks.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {gap.blocks.map((b) => (
              <li
                key={b.title}
                className="rounded-[20px] border border-black/[0.06] bg-white p-6"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-coral/10 text-coral">
                  {(() => {
                    const I = icons[b.icon];
                    return (
                      <I weight="duotone" className="size-6" aria-hidden />
                    );
                  })()}
                </span>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.02em] text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/65">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
