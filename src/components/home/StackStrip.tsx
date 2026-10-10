import TechIcon from "../TechIcon";
import { stack } from "@/lib/devices";

/** The protocols and tools an engineer pattern matches on in one glance. */
export default function StackStrip() {
  return (
    <section
      aria-label="Protocols and tools we ship with"
      className="px-4 pb-20 pt-6 sm:px-6 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl border-b border-black/[0.07] pb-8">
        <ul className="flex flex-wrap items-center gap-2">
          <li className="mr-2 text-[11px] uppercase tracking-[0.2em] text-ink/60">
            ( Shipped with )
          </li>
          {stack.map((t) => (
            <li
              key={t}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink/75"
            >
              <TechIcon name={t} className="size-3.5 shrink-0 text-ink/60" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
