"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";

/**
 * Listbox styled to match the form fields. Native <select> drop-downs render
 * with OS chrome that can't be themed, so the value is mirrored into a hidden
 * input and the existing FormData submit path is unchanged.
 */
export default function Select({
  name,
  label,
  placeholder,
  options,
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  const commit = (v: string) => {
    setValue(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((i) => {
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        return (next + options.length) % options.length;
      });
      return;
    }
    if (open && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      commit(options[activeIndex]);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <label
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45"
        id={`${id}-label`}
      >
        {label}
      </label>

      <input type="hidden" name={name} value={value} required={required} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left text-sm outline-none transition ${
          open
            ? "border-accent ring-2 ring-accent/15"
            : "border-black/10 hover:border-black/20"
        } ${value ? "text-ink" : "text-ink/35"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-auto size-3 shrink-0 text-ink/40 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <ul
        ref={listRef}
        role="listbox"
        aria-labelledby={`${id}-label`}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="absolute left-0 right-0 top-full z-20 mt-2 origin-top overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-1.5 shadow-xl shadow-black/[0.08] outline-none"
        style={{
          transition:
            "opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1), visibility 220ms",
          opacity: open ? 1 : 0,
          transform: open
            ? "scaleY(1) translateY(0)"
            : "scaleY(0.96) translateY(-4px)",
          visibility: open ? "visible" : "hidden",
        }}
      >
        {options.map((o, i) => {
          const selected = o === value;
          return (
            <li key={o} role="option" aria-selected={selected}>
              <button
                type="button"
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(o)}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  i === activeIndex ? "bg-mist text-ink" : "text-ink/70"
                }`}
              >
                {o}
                {selected && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="ml-auto size-3 text-accent"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
