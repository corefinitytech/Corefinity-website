import Check from "../Check";
import Fill from "../Fill";
import { systemMap } from "@/lib/devices";

/**
 * One picture of everything we build. The device column is the client's, so
 * it is drawn dashed and pale (any column marked theirs); the columns we build sit under a
 * bracket under them carries the one line that sums up the offer.
 */
export default function SystemMap() {
  const ours = systemMap.columns.filter((c) => !c.theirs).length;
  return (
    <section id="what-we-build" className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
          ( What we build )
        </p>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
          From firmware to fleet,{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            in one picture
          </span>
        </h2>

        <ol className="mt-10 grid gap-3 lg:grid-cols-4">
          {systemMap.columns.map((c, i) => (
            <li
              key={c.name}
              className={`relative flex flex-col rounded-[20px] p-6 ${
                c.theirs
                  ? "border border-dashed border-black/20 bg-white"
                  : "bg-[linear-gradient(160deg,#061426_0%,#0f3a66_52%,#050b14_100%)] text-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`text-[11px] font-medium tracking-[0.18em] ${c.theirs ? "text-ink/65" : "text-white/55"}`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${
                    c.theirs ? "bg-mist text-ink/65" : "bg-sky/20 text-sky"
                  }`}
                >
                  {c.theirs ? "Yours" : "We build"}
                </span>
              </div>
              <h3
                className={`mt-5 text-2xl font-medium tracking-[-0.02em] ${c.theirs ? "text-ink" : ""}`}
              >
                {c.name}
              </h3>
              <p
                className={`mt-1 text-[13px] ${c.theirs ? "text-ink/60" : "text-white/65"}`}
              >
                {c.owner}
              </p>

              <ul className="mt-5 grid gap-2">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2 text-[13px] leading-snug ${c.theirs ? "text-ink/70" : "text-white/85"}`}
                  >
                    <span
                      className={`mt-px grid size-4 shrink-0 place-items-center rounded-full ${
                        c.theirs
                          ? "bg-black/[0.06] text-ink/55"
                          : "bg-sky/25 text-sky"
                      }`}
                    >
                      <Check className="size-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p
                className={`mt-auto pt-6 text-[11px] uppercase tracking-[0.14em] ${c.theirs ? "text-ink/65" : "text-white/60"}`}
              >
                Runs on{" "}
                <span className={c.theirs ? "text-ink/75" : "text-white/85"}>
                  {c.runsOn}
                </span>
              </p>
              {c.fill && (
                <div className="mt-4">
                  <Fill>{c.fill}</Fill>
                </div>
              )}

              {/* Connector to the next column, desktop only */}
              {i < systemMap.columns.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white text-ink/60 lg:grid"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* The bracket under our three columns */}
        <div className="mt-4 grid lg:grid-cols-4">
          {ours < systemMap.columns.length && (
            <div className="hidden lg:block" />
          )}
          <div style={{ gridColumn: `span ${ours} / span ${ours}` }}>
            <div
              aria-hidden
              className="mx-3 hidden h-3 rounded-b-xl border-x-2 border-b-2 border-accent/50 lg:block"
            />
            <p className="mt-3 text-center text-base font-medium tracking-[-0.01em] text-ink lg:text-lg">
              {systemMap.line}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
