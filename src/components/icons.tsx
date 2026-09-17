/**
 * The site's icons, drawn inline.
 *
 * These replace Font Awesome, which shipped its React wrapper, its SVG core
 * runtime and a stylesheet to the browser in order to draw about a dozen
 * glyphs. Every icon here is the same stroked, round capped construction as
 * Check, so the set finally looks like one family.
 *
 * Colour with a text-* class on the icon or its parent. Size with size-*.
 */
import type { SVGProps } from "react";

type IconProps = { className?: string } & Omit<
  SVGProps<SVGSVGElement>,
  "className"
>;

function Icon({
  className = "size-4",
  children,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Long arrow, the site's primary "continue" mark. */
export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12h17" />
      <path d="m14 6 6 6-6 6" />
    </Icon>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 12H4" />
      <path d="m10 18-6-6 6-6" />
    </Icon>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m9 5 7 7-7 7" />
    </Icon>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m15 5-7 7 7 7" />
    </Icon>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 9 7 7 7-7" />
    </Icon>
  );
}

export function Envelope(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 7.1 5.1a2.4 2.4 0 0 0 2.8 0L20.5 7" />
    </Icon>
  );
}

export function Bolt(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13.5 2 4 13.5h6.5L10 22l9.5-11.5H13z" />
    </Icon>
  );
}

export function FileLines(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 2.5H7.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7z" />
      <path d="M14 2.5V7h4.5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </Icon>
  );
}

export function Comments(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.5 13.5a2 2 0 0 1-2 2H8l-4.5 4V5.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    </Icon>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 10.5c0 5.8-8 11.5-8 11.5s-8-5.7-8-11.5a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10.5" r="2.8" />
    </Icon>
  );
}

/** Solid triangle. The one icon that reads better filled than stroked. */
export function Play({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z" />
    </svg>
  );
}
