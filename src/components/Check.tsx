/**
 * The site's checkmark. A stroked path with round caps stays crisp at the
 * small sizes these lists use, where a solid glyph turns to mush. Colour it
 * with a `text-*` class on the parent or via className.
 */
export default function Check({
  className = "size-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 8.5 3.5 3.5L13 5" />
    </svg>
  );
}
