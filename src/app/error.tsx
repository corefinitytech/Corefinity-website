"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route level error boundary. Without one, a thrown error in any page shows
 * Next's stock screen, which looks like a broken site rather than a handled
 * problem.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with a reporting call once an error tracker is wired up.
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="grid min-h-[70vh] place-items-center px-4 pt-28 sm:px-6"
    >
      <div className="mx-auto max-w-lg text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
          ( Something broke )
        </p>
        <h1 className="mt-5 text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
          That did not{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            go to plan.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ink/65">
          An error stopped this page loading. Trying again usually sorts it. If
          it keeps happening, tell us and we will fix it.
        </p>
        {error.digest && (
          <p className="mt-3 text-[12px] text-ink/60">
            Reference: <span className="font-medium">{error.digest}</span>
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink/85"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-[13px] font-medium text-ink/75 transition hover:border-ink hover:text-ink"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
