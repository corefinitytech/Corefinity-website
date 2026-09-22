/**
 * Case study content.
 *
 * SAMPLE CONTENT. These engagements are placeholders written to show the shape
 * of a case study page. The client names are fictional and the figures are
 * illustrative. Replace each entry with a real, client approved engagement
 * before relying on these pages publicly: search engines and assistants both
 * treat a case study as a factual claim, and the rest of the site is careful
 * to publish only what Corefinity can stand behind (see services.ts, schema.ts
 * and the notes in public/llms.txt).
 *
 * Structured data built from this file deliberately uses Article only. There
 * are no Review, Rating or named testimonial nodes, because those would be
 * invented.
 */

export type CaseStudyTheme = "ai" | "ops" | "booking";

export type CaseStudyMetric = {
  /** Integer, so it can count up. Keep decimals out of here. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  /** Short line for cards and the index. */
  summary: string;
  /** Metadata title. Written for search intent; the brand is appended. */
  title: string;
  description: string;
  keywords: string[];
  headline: { lead: string; accent: string };
  timeline: string;
  year: string;
  /** ISO date, feeds Article structured data. */
  datePublished: string;
  /** Service slugs from services.ts. */
  services: string[];
  metrics: CaseStudyMetric[];
  challenge: string[];
  approach: string[];
  built: { title: string; body: string }[];
  phases: { when: string; title: string; detail: string }[];
  results: string[];
  stack: string[];
  theme: CaseStudyTheme;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-whatsapp-support-assistant-ecommerce",
    client: "Solenne Skincare",
    industry: "Ecommerce",
    summary:
      "An AI support assistant on WhatsApp and web chat that answers from the product catalogue and live order data.",
    title: "AI WhatsApp Support Chatbot for Ecommerce: Case Study",
    description:
      "How Corefinity built an AI support assistant on WhatsApp and web chat for an online skincare brand. It answers from live order data and now resolves 71 percent of queries without an agent.",
    keywords: [
      "AI chatbot case study",
      "WhatsApp chatbot for ecommerce",
      "AI customer support assistant",
      "Shopify AI chatbot",
      "customer support automation",
    ],
    headline: {
      lead: "An AI assistant that answers customers",
      accent: "in seconds, not hours.",
    },
    timeline: "5 weeks",
    year: "2026",
    datePublished: "2026-09-22",
    services: ["ai-development", "systems-integration"],
    metrics: [
      { value: 71, suffix: "%", label: "Queries resolved without an agent" },
      { value: 8, suffix: "s", label: "Median first response time" },
      { value: 3, suffix: "x", label: "Support volume, same team" },
      { value: 5, suffix: " wk", label: "From brief to launch" },
    ],
    challenge: [
      "Solenne sells skincare online across three countries, and almost every order produces a question. Where is my parcel, can I change the size, which serum works with retinol. Most of those questions arrived on WhatsApp, where a team of four answered them by hand.",
      "At peak the first reply took more than five hours. Answers varied depending on who picked up the chat, and the team spent its day looking up the same order statuses in Shopify instead of handling the conversations that actually needed a person.",
    ],
    approach: [
      "We built an assistant that answers from two sources it can trust: the product catalogue and ingredient guides, and the live order record in Shopify. It never guesses. If a question falls outside what those sources cover, it says so and hands the chat to a person with the full context attached.",
      "Order changes, address updates and returns run through the same checks a human agent would apply, so the assistant can complete them rather than just describe them. Every conversation is logged, scored and reviewable, which is how the team kept improving the answers after launch.",
    ],
    built: [
      {
        title: "Grounded answers",
        body: "Retrieval over the catalogue, ingredient guides and policies, so every product answer quotes the brand's own material rather than a model's general knowledge.",
      },
      {
        title: "Live order actions",
        body: "Order tracking, size swaps, address changes and return requests completed directly against Shopify, inside the rules the business already had.",
      },
      {
        title: "WhatsApp and web chat",
        body: "One assistant across the WhatsApp Business API and the website chat widget, with conversation history shared between them.",
      },
      {
        title: "Human handoff",
        body: "Anything sensitive or uncertain goes to an agent with a summary, the order details and the conversation so far. The customer never repeats themselves.",
      },
      {
        title: "Guardrails",
        body: "Topic limits, refusal rules for medical claims and a confidence threshold that decides when the assistant answers and when it asks for help.",
      },
      {
        title: "Quality dashboard",
        body: "Resolution rate, handoff reasons and flagged answers in one view, so the team can see exactly where the assistant needs better material.",
      },
    ],
    phases: [
      {
        when: "Week 1",
        title: "Audit the conversations",
        detail:
          "We read three months of support chats and grouped them by intent, which showed that eight question types made up most of the volume.",
      },
      {
        when: "Weeks 2 to 3",
        title: "Build and ground",
        detail:
          "Retrieval, the Shopify integration and the order actions, tested against real historical questions before any customer saw it.",
      },
      {
        when: "Week 4",
        title: "Shadow mode",
        detail:
          "The assistant drafted replies that agents approved or corrected, which gave us a measured accuracy figure before switching it on.",
      },
      {
        when: "Week 5",
        title: "Launch and tune",
        detail:
          "Live on WhatsApp and web chat, with daily reviews of flagged answers through the first weeks.",
      },
    ],
    results: [
      "Most routine questions are answered and closed without an agent touching them.",
      "First responses dropped from hours to seconds, including overnight and at weekends.",
      "The same team now handles three times the conversation volume during launches and sales.",
      "Agents spend their time on the conversations that need judgement, not on looking up tracking numbers.",
    ],
    stack: [
      "OpenAI API",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "WhatsApp Business API",
      "Shopify Admin API",
      "Vercel",
    ],
    theme: "ai",
  },
  {
    slug: "logistics-operations-dashboard-automation",
    client: "Carvell Logistics",
    industry: "Freight and logistics",
    summary:
      "An operations dashboard, Python data pipelines and a customer tracking portal that replaced a freight team's spreadsheets.",
    title: "Logistics Operations Dashboard and Automation: Case Study",
    description:
      "Corefinity replaced a freight forwarder's spreadsheets with an operations dashboard, Python data pipelines and a customer tracking portal, saving 22 hours of manual reporting every week.",
    keywords: [
      "logistics dashboard case study",
      "freight operations software",
      "Python automation case study",
      "shipment tracking portal",
      "custom operations dashboard",
    ],
    headline: {
      lead: "From twelve spreadsheets to",
      accent: "one live operations view.",
    },
    timeline: "6 weeks",
    year: "2026",
    datePublished: "2026-09-22",
    services: ["web-development", "python-automation", "cloud-deployment"],
    metrics: [
      { value: 22, suffix: " hrs", label: "Manual reporting removed each week" },
      { value: 60, suffix: "%", label: "Fewer shipment status emails" },
      { value: 15, suffix: " min", label: "Carrier data refresh interval" },
      { value: 6, suffix: " wk", label: "From brief to launch" },
    ],
    challenge: [
      "Carvell moves freight for manufacturers across the Gulf and South Asia. Its operations ran on twelve shared spreadsheets, updated by hand from carrier portals, emails and phone calls. Two coordinators spent most of Monday building the weekly report.",
      "Customers had no way to check a shipment themselves, so they emailed. Every status question meant opening a spreadsheet, then a carrier site, then writing a reply. Nobody had a reliable picture of what was late until a customer complained.",
    ],
    approach: [
      "We started with the data, not the screens. Python pipelines now pull shipment events from carrier APIs and parse the carriers that only send emails, normalising everything into one PostgreSQL database every fifteen minutes.",
      "On top of that sits an operations dashboard for the team and a tracking portal for customers, both reading the same records. Exceptions surface automatically, and the weekly report builds itself and lands in inboxes before anyone starts work on Monday.",
    ],
    built: [
      {
        title: "Carrier data pipelines",
        body: "Scheduled Python jobs that collect events from carrier APIs, parse emailed updates and reconcile them into one clean shipment record.",
      },
      {
        title: "Operations dashboard",
        body: "Every active shipment, its status, its margin and its next milestone, filterable by lane, customer and carrier.",
      },
      {
        title: "Exception alerts",
        body: "Shipments that miss a milestone or stall at customs are flagged the moment the data shows it, not when the customer calls.",
      },
      {
        title: "Customer tracking portal",
        body: "Customers log in and see their own shipments, documents and estimated arrivals, which answers most questions before they are asked.",
      },
      {
        title: "Automated reporting",
        body: "Weekly and monthly performance reports generated from the live data and delivered by email, with no manual assembly.",
      },
      {
        title: "Monitored infrastructure",
        body: "CI and CD, error tracking, database backups and alerts on every pipeline, so a failed job is noticed and fixed quickly.",
      },
    ],
    phases: [
      {
        when: "Week 1",
        title: "Map the data",
        detail:
          "We traced where every spreadsheet column came from and agreed one data model the whole business could share.",
      },
      {
        when: "Weeks 2 to 3",
        title: "Pipelines first",
        detail:
          "Carrier integrations and email parsing, running against real shipments in parallel with the old spreadsheets to prove the numbers matched.",
      },
      {
        when: "Weeks 4 to 5",
        title: "Dashboard and portal",
        detail:
          "The operations view and the customer portal, designed with the coordinators who would use them every day.",
      },
      {
        when: "Week 6",
        title: "Cut over",
        detail:
          "The spreadsheets were archived, customers were invited to the portal and the automated reports went live.",
      },
    ],
    results: [
      "The weekly report builds itself, which gave the coordinators back most of a working day.",
      "Customers check their own shipments, and status emails fell by more than half.",
      "Late shipments are caught from the data, usually before the customer notices.",
      "Management sees margin and performance by lane without waiting for a spreadsheet.",
    ],
    stack: [
      "Python",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Carrier APIs",
      "GitHub Actions",
      "Vercel",
      "Sentry",
    ],
    theme: "ops",
  },
  {
    slug: "hotel-direct-booking-engine",
    client: "Lodgex Systems",
    industry: "Hospitality",
    summary:
      "A commission free direct booking engine and the front desk dashboard behind it, live in under three weeks.",
    title: "Hotel Direct Booking Engine Case Study: Lodgex Systems",
    description:
      "How Corefinity built a commission free direct booking engine and front desk dashboard for boutique hotels, with Stripe payments and two way iCal sync, live in under three weeks.",
    keywords: [
      "hotel booking engine case study",
      "direct booking system",
      "commission free hotel booking",
      "iCal sync booking engine",
      "Stripe booking integration",
    ],
    headline: {
      lead: "Taking bookings back from",
      accent: "the booking portals.",
    },
    timeline: "3 weeks",
    year: "2026",
    datePublished: "2026-09-22",
    services: ["web-development", "systems-integration", "ui-ux-design"],
    metrics: [
      { value: 0, suffix: "%", label: "Commission on direct bookings" },
      { value: 25, suffix: "%", label: "Top commission rate removed" },
      { value: 3, suffix: " wk", label: "From brief to launch" },
      { value: 24, suffix: "/7", label: "Calendar sync across channels" },
    ],
    challenge: [
      "Lodgex operates a small group of boutique hotels that took nearly all of their bookings through the large booking portals. Each of those bookings cost between 15 and 25 percent in commission, on every night, for guests who often came back.",
      "The hotels had a website, but it could not take a booking. Availability lived in three places, double bookings happened every few weeks, and the front desk reconciled everything by hand each morning.",
    ],
    approach: [
      "We built a booking engine on the hotels' own domain, fast enough on a phone that guests would finish the booking there instead of going back to a portal. Payment runs through Stripe and settles straight to the hotels.",
      "Behind it sits a front desk dashboard with one source of availability. Two way iCal sync keeps the portals in step, so a room booked anywhere disappears everywhere within minutes, and double bookings stopped.",
    ],
    built: [
      {
        title: "Direct booking engine",
        body: "Room search, rates, extras and checkout on the hotels' own site, designed for the phone first because that is where guests book.",
      },
      {
        title: "Stripe payments",
        body: "Deposits, full payments and refunds, settled directly to the hotels with no platform taking a cut.",
      },
      {
        title: "Two way iCal sync",
        body: "Availability shared with every booking portal in both directions, so the hotels can keep the portals for discovery without double bookings.",
      },
      {
        title: "Front desk dashboard",
        body: "Arrivals, departures, room status and guest details in one view, replacing the morning reconciliation.",
      },
      {
        title: "Mobile guest passes",
        body: "Booking confirmations and arrival details that live on the guest's phone, with the information the front desk would otherwise repeat.",
      },
    ],
    phases: [
      {
        when: "Week 1",
        title: "Design and rates",
        detail:
          "The booking flow agreed in Figma, along with the rate rules, extras and cancellation policies it had to support.",
      },
      {
        when: "Week 2",
        title: "Engine and payments",
        detail:
          "The booking engine, Stripe checkout and the availability model, tested against real rate plans.",
      },
      {
        when: "Week 3",
        title: "Sync and launch",
        detail:
          "Two way calendar sync with the portals, the front desk dashboard and a staged launch on the first property.",
      },
    ],
    results: [
      "Direct bookings carry no commission, on first stays and on repeat guests.",
      "Double bookings stopped once every channel read from one availability record.",
      "The front desk starts the day with an accurate picture instead of a reconciliation.",
      "The hotels keep the booking portals for discovery while owning the guest relationship.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Stripe",
      "iCal",
      "Tailwind CSS",
      "Vercel",
    ],
    theme: "booking",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** The next study in the list, wrapping round, for the "read next" card. */
export function nextCaseStudy(study: CaseStudy) {
  const i = caseStudies.findIndex((c) => c.slug === study.slug);
  return caseStudies[(i + 1) % caseStudies.length];
}

/** Case studies that used a given service, for the service pages. */
export function caseStudiesFor(serviceSlug: string) {
  return caseStudies.filter((c) => c.services.includes(serviceSlug));
}
