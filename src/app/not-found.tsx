import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page does not exist. Head back to the Corefinity home page.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="grid min-h-[70vh] place-items-center px-4 pt-28 sm:px-6"
    >
      <div className="mx-auto max-w-lg text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40">
          ( 404 )
        </p>
        <h1 className="mt-5 text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
          That page{" "}
          <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
            does not exist.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
          The link may be out of date, or the page may have moved. Everything we
          build is still one click away.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink/85"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-[13px] font-medium text-ink/75 transition hover:border-ink hover:text-ink"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </main>
  );
}
