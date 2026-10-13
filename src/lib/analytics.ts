/**
 * GA4 event helpers.
 *
 * window.gtag only exists once the Analytics component has rendered the tag,
 * which it does only after the visitor opts in to analytics. Calling these
 * without consent is therefore a no-op, so call sites never need to check.
 */

type Gtag = (
  command: "event",
  name: string,
  params?: Record<string, string | number | boolean>,
) => void;

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}

export type ContactMethod = "email" | "phone" | "whatsapp";

/** Which contact channel a link opens, or null if it is an ordinary link. */
export function contactMethod(href: string): ContactMethod | null {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  try {
    const host = new URL(href).hostname;
    if (host === "wa.me" || host.endsWith("whatsapp.com")) return "whatsapp";
  } catch {
    // Relative or malformed href: not a contact link.
  }
  return null;
}
