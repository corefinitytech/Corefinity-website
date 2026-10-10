/**
 * A visible placeholder for a fact the redesign brief marks [FILL].
 *
 * The brief's rule is "do not publish a guess in its place", so instead of
 * inventing copy the page shows exactly what is missing, in a dashed coral
 * box nobody could mistake for finished content. Search for <Fill to find
 * every one that still needs an answer before this goes live.
 */
export default function Fill({
  children,
  inline = false,
  dark = false,
}: {
  /** The question that needs answering, written to the person who knows. */
  children: React.ReactNode;
  inline?: boolean;
  /** For use on the dark gradient cards. */
  dark?: boolean;
}) {
  const tone = dark
    ? "border-coral/70 bg-coral/10 text-white"
    : "border-coral/60 bg-coral/[0.06] text-ink";
  if (inline) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border border-dashed px-1.5 py-0.5 align-baseline text-[0.85em] ${tone}`}
      >
        <span className="text-[0.75em] font-semibold uppercase tracking-[0.12em] text-[#c23a28]">
          To confirm
        </span>
        {children}
      </span>
    );
  }
  return (
    <div className={`rounded-xl border border-dashed px-4 py-3 ${tone}`}>
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-coral" : "text-[#c23a28]"}`}
      >
        To confirm before launch
      </p>
      <p className="mt-1 text-[13px] leading-relaxed opacity-80">{children}</p>
    </div>
  );
}
