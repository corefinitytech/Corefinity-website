/**
 * Shared by the FAQ section and the FAQPage structured data, so what Google
 * and an LLM read is always exactly what a visitor reads.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How quickly can Corefinity ship our platform?",
    a: "Showcase sites and MVP builds are usually ready for review on staging inside 10 to 14 business days. Full stack dashboards and custom operating systems run 3 to 4 weeks, depending on how complex the data model turns out to be.",
  },
  {
    q: "Who owns the code and the intellectual property?",
    a: "You do, all of it. When the project signs off we hand over the GitHub repositories, the Figma source files, the environment keys and the database. Nothing stays locked to us.",
  },
  {
    q: "Do you build the public website and the internal dashboard?",
    a: "Yes. That is the point of the way we work. The public pages connect straight through to the admin tools, the customer portal and the database behind them, so there is no seam between marketing and operations.",
  },
  {
    q: "What does a project cost?",
    a: "We quote a fixed price once the requirements are clear, so there is no hourly meter running. Send a brief and you get a written scope with the price and the timeline in it within 48 hours.",
  },
  {
    q: "What technology do you build on?",
    a: "Next.js and TypeScript on the front end, Node.js and PostgreSQL behind it, Stripe for payments, and Vercel for hosting. These are mainstream tools with large talent pools, so any competent developer can pick the project up later.",
  },
  {
    q: "How do we start?",
    a: "Send a project brief through the form. We read it, book a short call to pressure test the requirements, and come back with a technical roadmap and a fixed price inside 48 hours.",
  },
];
