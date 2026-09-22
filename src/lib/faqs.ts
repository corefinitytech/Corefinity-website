/**
 * Shared by the FAQ section and the FAQPage structured data, so what Google
 * and an LLM read is always exactly what a visitor reads.
 *
 * Answer engines lift these verbatim, so every answer must stand alone: name
 * the subject, answer in the first sentence, three sentences at most.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How quickly can Corefinity ship a software project?",
    a: "Corefinity delivers showcase websites and MVP builds for staging review in 10 to 14 business days. Full stack dashboards and custom business systems take 3 to 4 weeks, depending on the complexity of the data model.",
  },
  {
    q: "Who owns the code and intellectual property in a Corefinity project?",
    a: "The client owns all code and intellectual property Corefinity produces. At sign off, Corefinity hands over the GitHub repositories, Figma files, environment keys and database, and nothing stays locked to Corefinity.",
  },
  {
    q: "Does Corefinity work with clients outside Pakistan?",
    a: "Yes. Corefinity is based in Pakistan and works remotely with businesses worldwide, running each project over email, video calls and shared project tools.",
  },
  {
    q: "Does Corefinity build both the public website and internal dashboards?",
    a: "Yes. Corefinity builds the public website and the admin tools, customer portals and databases behind it as one connected system, so marketing and operations share the same data.",
  },
  {
    q: "How much does a Corefinity project cost?",
    a: "Corefinity quotes a fixed price once the requirements are clear, with no hourly billing. Clients receive a written scope with the price and timeline within 48 hours of sending a project brief.",
  },
  {
    q: "What technology does Corefinity build with?",
    a: "Corefinity builds with Next.js and TypeScript on the front end, Node.js and PostgreSQL on the back end, Stripe for payments and Vercel for hosting. These are mainstream tools with large developer communities, so any competent team can maintain the software later.",
  },
  {
    q: "How do you start a project with Corefinity?",
    a: "Send a project brief through the form at corefinity.tech/contact. Corefinity reviews it, holds a short call to test the requirements, and returns a technical roadmap and a fixed price within 48 hours.",
  },
];
