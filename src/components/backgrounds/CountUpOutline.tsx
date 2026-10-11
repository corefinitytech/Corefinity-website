"use client";

import { useEffect, useRef, useState } from "react";

import { useInViewOnce, usePrefersReducedMotion } from "./hooks";

/**
 * An outline only (stroke, transparent fill) number that counts up once the
 * first time it scrolls into view. `-webkit-text-stroke` is supported by
 * every current browser engine (Chromium, Firefox, Safari), so this needs no
 * SVG or canvas text layer.
 *
 * The real number is what the server renders, so search engines, slow phones
 * and visitors without JavaScript always see the final value, never a zero.
 * The count up only happens for a number that is still below the fold when
 * the page loads: it is reset to zero out of sight and runs once in view.
 */
export default function CountUpOutline({
  to,
  duration = 1400,
  strokeColor = "var(--color-accent-ink)",
  strokeWidth = "1.5px",
  className = "",
}: {
  to: number;
  duration?: number;
  strokeColor?: string;
  strokeWidth?: string;
  className?: string;
}) {
  const { ref, seen } = useInViewOnce<HTMLSpanElement>("-10% 0px");
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(to);
  const armedRef = useRef(false);
  const startedRef = useRef(false);

  // Arm the animation only for numbers that start out of view. Anything
  // already on screen keeps its final value, so nothing ever flashes to zero.
  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;
    armedRef.current = true;
    const raf = requestAnimationFrame(() => setValue(0));
    return () => cancelAnimationFrame(raf);
  }, [ref, reducedMotion]);

  useEffect(() => {
    if (!seen || !armedRef.current || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
        color: "transparent",
      }}
    >
      {value}
    </span>
  );
}
