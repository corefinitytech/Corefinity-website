import PipelineFigure from "../hairline/PipelineFigure";
import { H1Eyebrow } from "../PageHeading";
import { ArrowRight } from "../icons";
import { hero } from "@/lib/devices";

/**
 * The hero visual: the Hairline figure of a reading travelling from a device
 * to the admin panel, with the four stops listed under it. The figure is
 * drawn in the browser, so the list is what search engines and screen readers
 * get, and it doubles as the figure's caption.
 *
 * The drawing leaves the top and bottom of its 5:4 stage empty, so the stage
 * is pulled in with negative margins (percentages of its own width) to let the
 * drawing sit larger. The stage itself keeps its size, which is what the
 * figure measures the pointer against, so the pointer still lines up. Beside
 * the headline the top is pulled in further, which puts the drawing's own
 * middle, not its stage's, level with the middle of the text block.
 */
function DeviceLine() {
  return (
    <div className="mx-auto w-full md:max-w-2xl lg:max-w-none min-[1400px]:-mr-12 min-[1400px]:w-[calc(100%+3rem)]">
      <PipelineFigure className="-mb-[8%] -mt-[10%] lg:-mt-[18%]" />
      <ol
        aria-label="How data travels: device, phone or gateway, cloud, admin panel"
        className="relative flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[11px] text-ink/55"
      >
        {hero.flow.map((stop, i) => (
          <li key={stop} className="flex items-center gap-1.5">
            {i > 0 && <ArrowRight aria-hidden className="size-2.5 text-ink/30" />}
            {stop}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HeroDevices() {
  return (
    <section id="home" className="px-4 pt-28 sm:px-6 sm:pt-36 lg:pb-4">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-4">
        <div>
          <h1 className="max-w-3xl text-[clamp(2.75rem,7.4vw,6rem)] font-medium leading-[0.96] tracking-[-0.035em] text-ink lg:text-[clamp(3.25rem,5.6vw,5.25rem)]">
            <H1Eyebrow>{hero.eyebrow}</H1Eyebrow>
            {hero.lead}{" "}
            <span className="whitespace-nowrap bg-gradient-to-r from-deep via-accent to-sky bg-clip-text text-transparent">
              {hero.accent}
            </span>
          </h1>

          <div className="mt-8 max-w-md">
            <p className="text-sm leading-relaxed text-ink/65">{hero.sub}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={hero.primary.href}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-[13px] font-medium text-white transition hover:bg-ink/85"
              >
                {hero.primary.label}
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={hero.secondary.href}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/10 px-5 text-[13px] font-medium text-ink/75 transition hover:border-ink hover:text-ink"
              >
                {hero.secondary.label}
              </a>
            </div>
          </div>
        </div>

        <DeviceLine />
      </div>
    </section>
  );
}
