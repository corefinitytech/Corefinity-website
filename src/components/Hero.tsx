import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import HeroBanner from "./HeroBanner";

export default function Hero() {
  return (
    <section id="home" className="px-4 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-3xl text-[clamp(2.5rem,6.6vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink">
            Architecting{" "}
            <span className="bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
              High Performance Digital Platforms
            </span>
          </h1>

          <div className="max-w-sm shrink-0 lg:pb-3">
            <p className="text-sm leading-relaxed text-ink/60">
              We build custom web platforms, operations dashboards and automated
              workflows for companies that have outgrown their spreadsheets and
              subscriptions.
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href="#solutions"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-white transition hover:bg-ink/85"
              >
                Explore Capabilities
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className="size-3.5 transition-transform"
                />
              </a>
              <a
                href="#case-studies"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/10 px-5 text-[13px] font-medium text-ink/75 transition hover:border-ink hover:text-ink"
              >
                See a build we shipped
              </a>
            </div>
          </div>
        </div>

        <HeroBanner />
      </div>
    </section>
  );
}
