"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Tracks whether an element is on screen (with a preload margin), so a
 * background effect can create its WebGL context only while visible and
 * destroy it the moment it scrolls away. This is what keeps the section
 * under the browser's ~8-16 live WebGL context ceiling: nothing off-screen
 * holds a context at all.
 */
export function useInViewport<T extends Element>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

/**
 * Fires once, the first time the element enters view, and stays true after.
 * `seen` is fully derived from `inView`, so it is set during render (React's
 * sanctioned pattern for state derived from a prop) rather than in an effect,
 * which is the pattern eslint-plugin-react-hooks flags as cascading renders.
 */
export function useInViewOnce<T extends Element>(rootMargin = "0px") {
  const { ref, inView } = useInViewport<T>(rootMargin);
  const [seen, setSeen] = useState(false);
  if (inView && !seen) {
    setSeen(true);
  }
  return { ref, seen };
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Same useSyncExternalStore shape as consent.ts: the value lives outside
 * React (the OS-level media query), so components subscribe to it rather
 * than copying it into state inside an effect.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export type QualityTier = "high" | "medium" | "low";

function computeQualityTier(): QualityTier {
  const cores = navigator.hardwareConcurrency ?? 8;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const saveData = nav.connection?.saveData === true;
  const slowConnection = nav.connection?.effectiveType
    ? ["slow-2g", "2g", "3g"].includes(nav.connection.effectiveType)
    : false;
  const small = window.innerWidth < 640;

  if (saveData || slowConnection || (small && cores <= 4)) return "low";
  if (small || cores <= 4) return "medium";
  return "high";
}

/**
 * A coarse device budget. Every background effect that reads this is mounted
 * client-only via `dynamic(..., { ssr: false })`, so a lazy initializer can
 * read navigator/window directly on first render instead of computing it in
 * an effect: there is no server render of this component to crash, and the
 * value never needs to change mid-session.
 */
export function useQualityTier(): QualityTier {
  const [tier] = useState<QualityTier>(computeQualityTier);
  return tier;
}

export const DPR_CAP: Record<QualityTier, number> = {
  high: 2,
  medium: 1.5,
  low: 1,
};

/** Shader noise octaves / canvas ring counts read this to scale detail down. */
export const DETAIL_SCALE: Record<QualityTier, number> = {
  high: 1,
  medium: 0.75,
  low: 0.5,
};
