const items = [
  "CUSTOM WEB PLATFORMS",
  "PRODUCTIZED DASHBOARDS",
  "UI/UX DESIGN SYSTEMS",
  "DIRECT BOOKING ARCHITECTURE",
  "RAPID MVP PROTOTYPING",
  "FULL-STACK DEPLOYMENT",
];

function Track({ reverse }: { reverse?: boolean }) {
  return (
    <div
      className={`flex w-max shrink-0 items-center gap-8 pr-8 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {[0, 1].map((dup) =>
        items.map((t) => (
          <span
            key={`${dup}-${t}`}
            className="flex items-center gap-8 whitespace-nowrap text-[clamp(1.1rem,2.6vw,2rem)] font-medium leading-none tracking-[-0.01em]"
          >
            <span aria-hidden className="opacity-60">
              ✦
            </span>
            {t}
          </span>
        )),
      )}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-hidden
      className="relative isolate my-12 grid grid-cols-1 gap-14 overflow-hidden py-10 sm:my-20"
    >
      <div className="w-[120%] min-w-0 -translate-x-[10%] -rotate-[1.8deg] bg-accent py-5 text-white">
        <div className="flex min-w-0 overflow-hidden">
          <Track />
        </div>
      </div>
      <div className="w-[120%] min-w-0 -translate-x-[10%] rotate-[1.4deg] bg-ink py-5 text-white">
        <div className="flex min-w-0 overflow-hidden">
          <Track reverse />
        </div>
      </div>
    </section>
  );
}
