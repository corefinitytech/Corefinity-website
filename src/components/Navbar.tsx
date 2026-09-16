"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Brand from "./Brand";

// Section ids live on the home page, so every link is absolute: clicking
// "Pricing" from /contact routes home and then scrolls.
//
// Order matters twice over: it is the reading order of the nav, and the
// scroll-spy pill walks this array. Keep it in the same order the sections
// appear in the document or the pill jumps backwards as the page scrolls.
const links = [
  { label: "Capabilities", id: "solutions" },
  { label: "About", id: "process" },
  { label: "Why us", id: "expertise" },
  { label: "Pricing", id: "pricing" },
  { label: "Case study", id: "case-studies" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const [ready, setReady] = useState(false);

  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Off the home page there is nothing to spy on, so only hover moves the pill.
  const target = hovered ?? (isHome ? active : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the pill rests on whichever section is currently in view.
  useEffect(() => {
    if (!isHome) return;

    const sections = links
      .map((l, i) => {
        const el = document.getElementById(l.id);
        return el ? { el, i } : null;
      })
      .filter((s): s is { el: HTMLElement; i: number } => s !== null);

    if (!sections.length) return;

    const visible = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const match = sections.find((s) => s.el === entry.target);
          if (!match) continue;
          if (entry.isIntersecting)
            visible.set(match.i, entry.intersectionRatio);
          else visible.delete(match.i);
        }
        if (!visible.size) {
          setActive(null);
          return;
        }
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(best[0]);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, [isHome]);

  const measure = useCallback(() => {
    const el = target === null ? null : itemRefs.current[target];
    const list = listRef.current;
    if (!el || !list) return;
    const listBox = list.getBoundingClientRect();
    const itemBox = el.getBoundingClientRect();
    setPill({
      left: itemBox.left - listBox.left,
      width: itemBox.width,
    });
    setReady(true);
  }, [target]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    const list = listRef.current;
    const ro = list ? new ResizeObserver(measure) : null;
    if (list && ro) ro.observe(list);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [measure]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-7xl items-center gap-4 rounded-full border border-black/5 bg-white/90 px-4 py-2.5 backdrop-blur-xl transition-shadow duration-300 sm:px-5 ${
          scrolled ? "shadow-lg shadow-black/5" : ""
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="CoreFinity home"
        >
          <Brand className="h-7 w-auto" priority />
        </Link>

        <div
          onMouseLeave={() => setHovered(null)}
          className="relative mx-auto hidden lg:block"
        >
          {/* Sliding pill */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-0 rounded-full bg-ink will-change-transform"
            style={{
              width: pill.width,
              transform: `translate3d(${pill.left}px, 0, 0)`,
              opacity: target === null || pill.width === 0 ? 0 : 1,
              // Inline so the easing survives regardless of Tailwind's
              // arbitrary-value handling; skipped on the very first paint.
              transition: ready
                ? "transform 450ms cubic-bezier(0.22, 1, 0.36, 1), width 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease"
                : "opacity 250ms ease",
            }}
          />

          <ul ref={listRef} className="relative z-10 flex items-center gap-1">
            {links.map((l, i) => (
              <li key={l.label}>
                <Link
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={`/#${l.id}`}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className={`block rounded-full px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300 ${
                    target === i ? "text-white" : "text-ink/70"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-ink/85"
          >
            Get a Quote
          </Link>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 shrink-0 place-items-center rounded-full text-ink transition hover:bg-black/5 lg:hidden"
          >
            <span className="grid gap-[4px]">
              <span className="h-[1.5px] w-4 bg-current" />
              <span className="h-[1.5px] w-4 bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-black/5 bg-white p-3 shadow-xl lg:hidden">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={`/#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-ink/80 transition hover:bg-black/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-2xl bg-ink px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-ink/85"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
