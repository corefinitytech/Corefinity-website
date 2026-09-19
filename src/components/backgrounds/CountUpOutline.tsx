"use client";

import { useEffect, useRef, useState } from "react";

import { useInViewOnce, usePrefersReducedMotion } from "./hooks";

/**
 * An outline-only (stroke, transparent fill) number that counts up once the
 * first time it scrolls into view. `-webkit-text-stroke` is supported by
 * every current browser engine (Chromium, Firefox, Safari), so this needs no
 * SVG or canvas text layer.
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
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!seen || startedRef.current) return;
    startedRef.current = true;

    // Reduced motion collapses the ramp to a single instant rather than
    // branching to a separate synchronous setValue(to): the setter should
    // only ever run inside the rAF callback below, never synchronously in
    // the effect body.
    const effectiveDuration = reducedMotion ? 0 : duration;
    const start = performance.now();
    let raf = 0;
    function tick(now: number) {
      const progress =
        effectiveDuration === 0 ? 1 : Math.min(1, (now - start) / effectiveDuration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, reducedMotion, to, duration]);

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
