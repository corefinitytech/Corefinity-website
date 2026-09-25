import { ArrowRight } from "./icons";

const clients = [
  { name: "Nordic Relocators", region: "Norway", url: "http://nordicrelocators.no/" },
  { name: "Nordic Relocators", region: "Denmark", url: "http://nordicrelocators.dk/" },
  { name: "Sweden Relocators", region: "Sweden", url: "http://website.swedenrelocators.se/" },
  { name: "Relofy", region: "relofy.tech", url: "https://relofy.tech/" },
  { name: "Future Concerns", region: "futureconcerns.eu", url: "http://futureconcerns.eu/" },
  { name: "IELTS Counsel", region: "ieltscounsel.com", url: "https://ieltscounsel.com/" },
];

export default function Clients() {
  return (
    <section id="clients" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( Who we have worked with )
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              Trusted by teams{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                across Scandinavia and beyond
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/60 lg:justify-self-end lg:pb-2 lg:text-right">
            A few of the companies that rely on websites and software we
            designed and built.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => (
            <li key={c.url}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between gap-4 rounded-[20px] bg-mist px-6 py-7 transition duration-300 hover:-translate-y-0.5"
              >
                <span>
                  <span className="block text-lg font-medium tracking-[-0.02em] text-ink">
                    {c.name}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-ink/60">
                    {c.region}
                  </span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-black/10 text-ink/60 transition duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowRight className="size-3.5 -rotate-45" />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
