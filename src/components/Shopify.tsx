import Link from "next/link";

import { ArrowRight } from "./icons";

const offers = [
  {
    title: "Custom themes",
    body: "Built from scratch on Online Store 2.0, not a premium theme with half its features switched off. Your team still edits every section in the theme editor.",
  },
  {
    title: "Features the app store lacks",
    body: "Product builders, bundles and custom pricing rules written as private apps against the Shopify APIs, instead of a stack of monthly subscriptions.",
  },
  {
    title: "Wired into your operations",
    body: "Orders, stock and customers synced with your ERP, warehouse, CRM or support channels, so nobody copies data between tabs.",
  },
  {
    title: "Fast, findable, migrated cleanly",
    body: "Lean code that loads quickly on a phone, structured data for search, and moves from WooCommerce or other platforms with every URL redirected.",
  },
];

export default function Shopify() {
  return (
    <section id="shopify" className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-mist px-6 py-16 sm:px-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60">
              ( Shopify development )
            </p>
            <h2 className="mt-4 max-w-md text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              Shopify stores built around{" "}
              <span className="bg-gradient-to-r from-deep to-sky bg-clip-text text-transparent">
                how you actually sell.
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
              Shopify handles the checkout and hosting. We build everything a
              template cannot: the design, the custom features and the
              connections to the rest of your business. The code is yours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:bg-ink/85"
              >
                Discuss your Shopify store
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/case-studies/ai-whatsapp-support-assistant-ecommerce"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-[13px] font-medium text-ink/80 transition hover:border-ink hover:text-ink"
              >
                See our Shopify work
              </Link>
            </div>
          </div>

          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {offers.map((o, i) => (
              <li
                key={o.title}
                className="flex flex-col rounded-[20px] bg-white p-6"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent-ink">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-base font-medium tracking-[-0.01em] text-ink">
                  {o.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
                  {o.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
