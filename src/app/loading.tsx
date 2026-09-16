/**
 * Shown while a route segment streams in. Deliberately quiet: a skeleton that
 * guesses at the layout is more distracting than a still frame.
 */
export default function Loading() {
  return (
    <main
      id="main"
      className="grid min-h-[70vh] place-items-center px-4 pt-28 sm:px-6"
    >
      <span className="sr-only">Loading</span>
      <span
        aria-hidden
        className="size-6 animate-spin rounded-full border-2 border-black/10 border-t-ink"
      />
    </main>
  );
}
