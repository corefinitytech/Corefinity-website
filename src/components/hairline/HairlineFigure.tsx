"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * A Hairline figure, drawn live: the homepage hero's pipeline, and the figure
 * at the top of each blog article.
 *
 * The engine (kernel.js) and each figure (<name>.js) are served from
 * /public/hairline exactly as the hairline-create skill wrote them. The kernel
 * is a classic script that defines a global HL, and a figure is a module that
 * reads HL and ends by calling a global hairline(). Neither is written to be
 * imported, so they are loaded as scripts after hydration instead of going
 * through the bundler. That also keeps them out of the page's first load: the
 * heading never waits for them, and the box below is reserved at 5:4 so
 * nothing shifts when the drawing arrives.
 *
 * This component does what the skill's bench page does around a figure, minus
 * its test controls: it makes the stage and the svg and hands them to the
 * figure. The read-out is taken but not shown: floating in a corner it read as
 * a stray label, and the text beside the figure already says what it shows.
 */

type Stop = [number, number] | null;
type Handle = { set(value: number): void; destroy(): void };
type Host = {
  stage: HTMLElement;
  svg: SVGElement;
  read: { textContent: string | null };
};
type Figure = {
  name: string;
  range: [number, number, number];
  tour: Stop[] | null;
  mount(host: Host, value: number): Handle;
};
type Kernel = {
  inject(root: Document): void;
  mk(tag: string, attrs: Record<string, string>, parent: Element): SVGElement;
  tour(stage: HTMLElement, stops: Stop[]): { stop(): void };
};

declare global {
  interface Window {
    HL?: Kernel;
    hairline?: (figure: Figure) => void;
  }
}

/** Bump when any file in /public/hairline changes, so browsers refetch. */
const VERSION = "5";

/**
 * The theme for the site's white sections: the brand's deep blue for the one highlight, and the
 * greys a step darker and the stroke a little heavier than the kernel's own,
 * so the drawing holds its weight beside a heading.
 */
const theme = {
  "--hairline-plate": "#ffffff",
  "--hairline-hi": "#113D7D",
  "--hairline-edge": "#8e8e97",
  "--hairline-mid": "#b4b4bc",
  "--hairline-lo": "#d6d6dc",
  "--hairline-stroke": "1.1",
} as CSSProperties;

function script(src: string, type?: string) {
  return new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    if (type) el.type = type;
    el.src = `${src}?v=${VERSION}`;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(el);
  });
}

/**
 * Each figure's definition, fetched once per page however often it mounts.
 * A figure hands itself over through one global, so the loads run one after
 * another: two figures on a page can never answer each other's call.
 */
const loaded = new Map<string, Promise<Figure>>();
let queue: Promise<unknown> = Promise.resolve();
function load(name: string) {
  let figure = loaded.get(name);
  if (!figure) {
    figure = queue
      .then(() => (window.HL ? undefined : script("/hairline/kernel.js")))
      .then(
        () =>
          new Promise<Figure>((resolve, reject) => {
            // The figure's last statement hands its definition to this global.
            window.hairline = resolve;
            script(`/hairline/${name}.js`, "module").catch(reject);
          }),
      );
    loaded.set(name, figure);
    queue = figure.catch(() => {});
  }
  return figure;
}

export default function HairlineFigure({
  name,
  label,
  play = "loop",
  className,
}: {
  /** The figure's file in /public/hairline, without the extension. */
  name: string;
  /** What the figure shows, for screen readers. */
  label: string;
  /**
   * "loop" plays the figure's tour by itself and answers the pointer over it.
   * "hover" is for a figure inside a card that is one link: it rests until
   * the card is hovered or focused, then steps through its tour for as long
   * as the pointer stays anywhere on the card.
   */
  play?: "loop" | "hover";
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let gone = false;
    let undo = () => {};

    load(name)
      .then((figure) => {
        const HL = window.HL;
        if (gone || !HL) return;

        HL.inject(document);
        const svg = HL.mk(
          "svg",
          { viewBox: "0 0 400 320", "aria-hidden": "true" },
          stage,
        );
        const read: Host["read"] = { textContent: "rest" };
        // The middle of the figure's range is its default, as on the bench.
        const handle = figure.mount({ stage, svg, read }, figure.range[1]);

        const stops = figure.tour ?? [];
        let stop = () => {};

        if (play === "loop") {
          // The figure plays its own tour on a loop, on every device, so it
          // draws the eye without waiting to be touched. A pointer or a
          // finger takes over while it is there and the loop resumes when it
          // leaves. The loop sleeps offscreen, and the kernel does not run it
          // under prefers-reduced-motion.
          stop = HL.tour(stage, stops).stop;
        } else {
          // The card is the hit area, not the figure, so the figure is told
          // where the pointer "is" the way the skill's bench does for a
          // still picture: a pointer event at a point of its own tour. It
          // gets the first stop at once, then the next every beat while the
          // card stays hovered. Under reduced motion it answers once and
          // holds, without cycling.
          const card = stage.closest<HTMLElement>("a") ?? stage;
          const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
          const tell = (type: string, at?: [number, number]) => {
            const r = stage.getBoundingClientRect();
            stage.dispatchEvent(
              new PointerEvent(type, {
                pointerType: "mouse",
                pointerId: 1,
                clientX: at ? r.left + (at[0] / 400) * r.width : 0,
                clientY: at ? r.top + (at[1] / 320) * r.height : 0,
              }),
            );
          };
          let beat = 0;
          let next = 0;
          const step = () => {
            const at = stops[next++ % stops.length];
            if (at) tell("pointermove", at);
            else tell("pointerleave");
          };
          const enter = () => {
            window.clearInterval(beat);
            next = 0;
            if (!stops.length) return;
            step();
            if (!calm.matches) beat = window.setInterval(step, 1300);
          };
          const leave = () => {
            window.clearInterval(beat);
            tell("pointerleave");
          };
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          card.addEventListener("focus", enter);
          card.addEventListener("blur", leave);
          stop = () => {
            window.clearInterval(beat);
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
            card.removeEventListener("focus", enter);
            card.removeEventListener("blur", leave);
          };
        }

        undo = () => {
          stop();
          handle.destroy();
          svg.remove();
        };
      })
      // Without the scripts the box stays empty. The text beside this
      // component still says what the figure shows.
      .catch(() => {});

    return () => {
      gone = true;
      undo();
    };
  }, [name, play]);

  return (
    <div
      ref={stageRef}
      data-hairline={name}
      data-hairline-theme="light"
      role="img"
      aria-label={label}
      style={theme}
      className={`aspect-[5/4] w-full ${className ?? ""}`}
    />
  );
}
