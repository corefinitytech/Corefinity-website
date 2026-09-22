import Link from "next/link";

/**
 * The keyword line at the top of a page H1.
 *
 * Visually it is the site's usual "( Label )" eyebrow. Semantically it sits
 * inside the H1, so the heading search engines weigh reads "Web Development:
 * Web platforms built around your business" instead of a slogan with no
 * searchable words in it. The brackets are drawn with CSS so they never enter
 * the heading text, and the colon exists only for text extraction and screen
 * readers, so the two parts do not run together.
 */
export function H1Eyebrow({ children }: { children: string }) {
  return (
    <>
      <span className="mb-4 block text-[11px] font-normal uppercase leading-normal tracking-[0.2em] text-ink/60 before:content-['(_'] after:content-['_)']">
        {children}
      </span>
      <span className="sr-only">: </span>
    </>
  );
}

/**
 * Visible breadcrumb trail. Mirrors the BreadcrumbList structured data on the
 * same page, which Google expects to match what a visitor can see.
 */
export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; href: string }[];
}) {
  const last = trail.length - 1;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-medium text-ink/60">
        {trail.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i === last ? (
              <span aria-current="page" className="text-ink">
                {c.name}
              </span>
            ) : (
              <>
                <Link href={c.href} className="transition hover:text-ink">
                  {c.name}
                </Link>
                <span aria-hidden className="text-ink/30">
                  /
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
