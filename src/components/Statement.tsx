const stack = [
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Vercel",
  "PostgreSQL",
  "Stripe Connect",
];

export default function Statement() {
  return (
    <section className="mt-16 px-4 sm:mt-24 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <h2 className="text-[clamp(1.9rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
            Engineering{" "}
            <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
              software that fits how you work
            </span>{" "}
            instead of the other way round.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-ink/60 lg:pb-2">
            From internal control rooms to booking systems that take payment
            directly, we build what the ready made tools cannot.
          </p>
        </div>

        <ul className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-3 border-t border-black/[0.07] pt-8">
          {stack.map((t, i) => (
            <li key={t} className="flex items-center gap-2">
              {i > 0 && <span className="text-ink/20">·</span>}
              <span className="text-sm font-medium tracking-tight text-ink/45">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
