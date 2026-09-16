import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

export default function Philosophy() {
  return (
    <section id="process" className="px-4 py-12 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-white sm:px-12 sm:py-20">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 grid select-none place-items-center text-center text-[clamp(5rem,15vw,13rem)] font-semibold leading-none tracking-tighter text-white/[0.045]"
        >
          CoreFinity
        </span>

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">
              ( About Corefinity )
            </p>
            <h2 className="mt-5 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              We do not ship templates. We build{" "}
              <span className="bg-gradient-to-r from-accent to-sky bg-clip-text text-transparent">
                the thing you actually need.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <p className="max-w-lg text-sm leading-relaxed text-white/60">
              Plenty of agencies hand over a template stuffed with plugins and
              call it finished. We would rather build something lean that earns
              its keep.
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-white/60">
              Every dashboard, portal and payment flow we ship is written from
              scratch, so it loads fast and follows your rules rather than the
              defaults someone else picked.
            </p>
            <a
              href="#solutions"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[13px] font-medium text-white transition hover:border-white hover:bg-white hover:text-ink"
            >
              See what we build
              <FontAwesomeIcon icon={faArrowRightLong} className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
