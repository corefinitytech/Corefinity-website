import { otherWork } from "@/lib/devices";

/** Real client names, kept low on the page so they do not muddy the message. */
export default function OtherWork() {
  return (
    <section
      aria-label="Other software we have built"
      className="px-4 pb-20 sm:px-6 sm:pb-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-y border-black/[0.07] py-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-ink/65">
          {otherWork.line}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
    </section>
  );
}
