/**
 * Case study content.
 *
 * Every live entry is a real, client approved engagement. Search engines and
 * assistants treat a case study as a factual claim, so figures here are only
 * ones the client has confirmed or that describe the system itself (counts of
 * modes, samples, layers), never invented outcomes such as revenue or hours
 * saved. The rest of the site holds the same line (see services.ts, schema.ts
 * and the notes in public/llms.txt).
 *
 * Structured data built from this file deliberately uses Article only. There
 * are no Review, Rating or named testimonial nodes, because those would be
 * invented.
 */

export type CaseStudyTheme = "ai" | "ops" | "booking" | "education";

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
  /** The client's own site, linked from the page and named in the schema. */
  clientUrl?: string;
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
    slug: "ielts-counsel-ai-writing-speaking-evaluation",
    client: "IELTS Counsel",
    clientUrl: "https://ieltscounsel.com/",
    industry: "Education",
    summary:
      "An IELTS preparation platform for an Islamabad institute, with instant AI band scores for Writing and Speaking, Easypaisa plans, an admin panel and protected study resources.",
    title: "AI IELTS Writing and Speaking Case Study",
    description:
      "How CoreFinity Tech built IELTS Counsel an IELTS platform with instant AI band scores for Writing and Speaking, Easypaisa checkout and an admin panel.",
    keywords: [
      "AI IELTS evaluation case study",
      "AI IELTS writing checker",
      "IELTS speaking AI scoring",
      "AI essay scoring system",
      "edtech platform development Pakistan",
      "Easypaisa payment integration",
    ],
    headline: {
      lead: "Instant IELTS band scores,",
      accent: "built on the official criteria.",
    },
    timeline: "6 months",
    year: "2026",
    datePublished: "2026-10-03",
    services: ["ai-development", "web-development", "systems-integration"],
    metrics: [
      { value: 7, label: "Evaluation modes across Writing and Speaking" },
      { value: 3, label: "AI judgements per essay, median taken" },
      { value: 6, label: "Expert band samples used to calibrate" },
      { value: 8, label: "Protection layers on every paid PDF" },
    ],
    challenge: [
      "IELTS Counsel is an IELTS institute in Islamabad that prepares Pakistani students for the Academic and General Training tests, in person and online. Writing and Speaking are the modules students most need feedback on, and the slowest to mark. Every essay and every recording waited for an instructor, so how often a student could practise was set by teacher time, not by the student.",
      "The business also ran in separate pieces. Online buyers, on campus students and installment payers lived in different records. Plans had to mean something, so paid tests, downloads and evaluations needed limits that could not be bypassed from the browser. Paid study material needed protecting from being passed around. And students in Pakistan needed to pay the way they actually pay, with Easypaisa rather than a card.",
    ],
    approach: [
      "We built the AI engine as an examiner that gathers evidence, not one that guesses a number. The language model reads the answer and returns counts and observations: grammar and tense errors, uncommon vocabulary, collocations, cohesion problems, whether every part of the question was answered. Code then turns that evidence into criterion bands using threshold tables, hard caps and IELTS style rounding. A confident sounding model never decides a band on its own.",
      "Each essay is judged three times and the median is taken, so one unusual reading cannot move a score. We calibrated the whole engine against the client's expert banded scripts from Band 4 to Band 9, fixed where the earlier version pulled weak and strong essays towards Band 6, and ran the new engine in shadow mode beside the old one before switching students over.",
      "Around the engine sits the rest of the business: plans enforced on the server, Easypaisa checkout, an admin panel for online and on campus students, and mentor review kept for the students who want a human eye.",
    ],
    built: [
      {
        title: "AI Writing engine",
        body: "Scores Task 1 Academic, Task 1 General Training and Task 2 essays on all four IELTS criteria, with strengths, weaknesses and quoted examples from the answer. Short, off topic or memorised answers are capped rather than rewarded.",
      },
      {
        title: "AI Speaking engine",
        body: "A real exam flow across Parts 1, 2 and 3 with a microphone check, question audio and timers. Each recording is transcribed and measured for pace, pauses, hesitation, grammar, vocabulary and pronunciation, then combined into a full exam band.",
      },
      {
        title: "Plans enforced on the server",
        body: "Free trial, Bronze, Silver and Golden plans decide which mock tests, tracks, downloads and AI evaluations a student gets. Usage is counted in transactions, and a failed evaluation hands the credit back.",
      },
      {
        title: "Easypaisa checkout",
        body: "Mobile account payments with status checks, amount verification and a receipt by email. A plan starts when the payment is confirmed, and an old order can never renew it twice.",
      },
      {
        title: "Admin panel and analytics",
        body: "Online and on campus students in one place, with CNIC or passport records, installments, due dates and balances, plus tests, blogs, pending evaluations, revenue by source, plan mix and average bands.",
      },
      {
        title: "Protected study resources",
        body: "Every paid PDF is watermarked for the student who downloads it, with visible and invisible trace marks, so a shared file can be traced back to its source.",
      },
    ],
    phases: [
      {
        when: "Phase 1",
        title: "Platform and plans",
        detail:
          "The student app with Academic and General Training routes, mock tests for all four modules, accounts, and plan access decided on the server.",
      },
      {
        when: "Phase 2",
        title: "Payments and operations",
        detail:
          "Easypaisa checkout, the admin panel, on campus and installment students, protected resources and the analytics dashboard.",
      },
      {
        when: "Phase 3",
        title: "AI engines",
        detail:
          "The Writing and Speaking pipelines, from evidence extraction and audio analysis through to criterion scoring and feedback.",
      },
      {
        when: "Phase 4",
        title: "Calibrate and roll out",
        detail:
          "Tuning against expert banded scripts from Band 4 to Band 9, then shadow mode beside the old engine before students were switched over.",
      },
    ],
    results: [
      "Students get a band score and criterion feedback on Writing and Speaking straight after submitting, instead of waiting for an instructor.",
      "Mentor review is still there, now as a targeted step for the students who want it rather than the only way to get feedback.",
      "The institute sells structured plans online through Easypaisa, with on campus and installment students in the same system.",
      "Paid tests, downloads and AI evaluations are enforced on the server, so every plan delivers exactly what it promises.",
      "Admins see revenue, plan mix, pending evaluations and average bands in one dashboard.",
    ],
    stack: [
      "React",
      "Tailwind CSS",
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "OpenAI API",
      "spaCy",
      "Firebase",
      "Firestore",
      "Redis",
      "Easypaisa",
      "Cloudinary",
      "Docker",
    ],
    theme: "education",
  },
  // The three entries below are SAMPLE engagements with fictional clients and
  // illustrative figures. They are commented out, not deleted, so their shape
  // stays as a reference while real, client approved case studies are written.
  // Do not uncomment them for production: a case study is a factual claim.
  //
  // {
  //   slug: "ai-whatsapp-support-assistant-ecommerce",
  //   client: "Solenne Skincare",
  //   industry: "Ecommerce",
  //   summary:
  //     "An AI support assistant on WhatsApp and web chat that answers from the product catalogue and live order data.",
  //   title: "AI WhatsApp Chatbot: Ecommerce Case Study",
  //   description:
  //     "How CoreFinity Tech built an AI support chatbot on WhatsApp and web chat for an online skincare brand that resolves 71 percent of queries without an agent.",
  //   keywords: [
  //     "AI chatbot case study",
  //     "WhatsApp chatbot for ecommerce",
  //     "AI customer support assistant",
  //     "Shopify AI chatbot",
  //     "customer support automation",
  //   ],
  //   headline: {
  //     lead: "An AI assistant that answers customers",
  //     accent: "in seconds, not hours.",
  //   },
  //   timeline: "5 weeks",
  //   year: "2026",
  //   datePublished: "2026-09-22",
  //   services: ["ai-development", "systems-integration"],
  //   metrics: [
  //     { value: 71, suffix: "%", label: "Queries resolved without an agent" },
  //     { value: 8, suffix: "s", label: "Median first response time" },
  //     { value: 3, suffix: "x", label: "Support volume, same team" },
  //     { value: 5, suffix: " wk", label: "From brief to launch" },
  //   ],
  //   challenge: [
  //     "Solenne sells skincare online across three countries, and almost every order produces a question. Where is my parcel, can I change the size, which serum works with retinol. Most of those questions arrived on WhatsApp, where a team of four answered them by hand.",
  //     "At peak the first reply took more than five hours. Answers varied depending on who picked up the chat, and the team spent its day looking up the same order statuses in Shopify instead of handling the conversations that actually needed a person.",
  //   ],
  //   approach: [
  //     "We built an assistant that answers from two sources it can trust: the product catalogue and ingredient guides, and the live order record in Shopify. It never guesses. If a question falls outside what those sources cover, it says so and hands the chat to a person with the full context attached.",
  //     "Order changes, address updates and returns run through the same checks a human agent would apply, so the assistant can complete them rather than just describe them. Every conversation is logged, scored and reviewable, which is how the team kept improving the answers after launch.",
  //   ],
  //   built: [
  //     {
  //       title: "Grounded answers",
  //       body: "Retrieval over the catalogue, ingredient guides and policies, so every product answer quotes the brand's own material rather than a model's general knowledge.",
  //     },
  //     {
  //       title: "Live order actions",
  //       body: "Order tracking, size swaps, address changes and return requests completed directly against Shopify, inside the rules the business already had.",
  //     },
  //     {
  //       title: "WhatsApp and web chat",
  //       body: "One assistant across the WhatsApp Business API and the website chat widget, with conversation history shared between them.",
  //     },
  //     {
  //       title: "Human handoff",
  //       body: "Anything sensitive or uncertain goes to an agent with a summary, the order details and the conversation so far. The customer never repeats themselves.",
  //     },
  //     {
  //       title: "Guardrails",
  //       body: "Topic limits, refusal rules for medical claims and a confidence threshold that decides when the assistant answers and when it asks for help.",
  //     },
  //     {
  //       title: "Quality dashboard",
  //       body: "Resolution rate, handoff reasons and flagged answers in one view, so the team can see exactly where the assistant needs better material.",
  //     },
  //   ],
  //   phases: [
  //     {
  //       when: "Week 1",
  //       title: "Audit the conversations",
  //       detail:
  //         "We read three months of support chats and grouped them by intent, which showed that eight question types made up most of the volume.",
  //     },
  //     {
  //       when: "Weeks 2 to 3",
  //       title: "Build and ground",
  //       detail:
  //         "Retrieval, the Shopify integration and the order actions, tested against real historical questions before any customer saw it.",
  //     },
  //     {
  //       when: "Week 4",
  //       title: "Shadow mode",
  //       detail:
  //         "The assistant drafted replies that agents approved or corrected, which gave us a measured accuracy figure before switching it on.",
  //     },
  //     {
  //       when: "Week 5",
  //       title: "Launch and tune",
  //       detail:
  //         "Live on WhatsApp and web chat, with daily reviews of flagged answers through the first weeks.",
  //     },
  //   ],
  //   results: [
  //     "Most routine questions are answered and closed without an agent touching them.",
  //     "First responses dropped from hours to seconds, including overnight and at weekends.",
  //     "The same team now handles three times the conversation volume during launches and sales.",
  //     "Agents spend their time on the conversations that need judgement, not on looking up tracking numbers.",
  //   ],
  //   stack: [
  //     "OpenAI API",
  //     "Next.js",
  //     "TypeScript",
  //     "PostgreSQL",
  //     "pgvector",
  //     "WhatsApp Business API",
  //     "Shopify Admin API",
  //     "Vercel",
  //   ],
  //   theme: "ai",
  // },
  // {
  //   slug: "logistics-operations-dashboard-automation",
  //   client: "Carvell Logistics",
  //   industry: "Freight and logistics",
  //   summary:
  //     "An operations dashboard, Python data pipelines and a customer tracking portal that replaced a freight team's spreadsheets.",
  //   title: "Logistics Dashboard Automation Case Study",
  //   description:
  //     "How CoreFinity Tech replaced a freight forwarder's spreadsheets with a logistics dashboard, Python pipelines and a tracking portal, saving 22 hours a week.",
  //   keywords: [
  //     "logistics dashboard case study",
  //     "freight operations software",
  //     "Python automation case study",
  //     "shipment tracking portal",
  //     "custom operations dashboard",
  //   ],
  //   headline: {
  //     lead: "From twelve spreadsheets to",
  //     accent: "one live operations view.",
  //   },
  //   timeline: "6 weeks",
  //   year: "2026",
  //   datePublished: "2026-09-22",
  //   services: ["web-development", "python-automation", "cloud-deployment"],
  //   metrics: [
  //     { value: 22, suffix: " hrs", label: "Manual reporting removed each week" },
  //     { value: 60, suffix: "%", label: "Fewer shipment status emails" },
  //     { value: 15, suffix: " min", label: "Carrier data refresh interval" },
  //     { value: 6, suffix: " wk", label: "From brief to launch" },
  //   ],
  //   challenge: [
  //     "Carvell moves freight for manufacturers across the Gulf and South Asia. Its operations ran on twelve shared spreadsheets, updated by hand from carrier portals, emails and phone calls. Two coordinators spent most of Monday building the weekly report.",
  //     "Customers had no way to check a shipment themselves, so they emailed. Every status question meant opening a spreadsheet, then a carrier site, then writing a reply. Nobody had a reliable picture of what was late until a customer complained.",
  //   ],
  //   approach: [
  //     "We started with the data, not the screens. Python pipelines now pull shipment events from carrier APIs and parse the carriers that only send emails, normalising everything into one PostgreSQL database every fifteen minutes.",
  //     "On top of that sits an operations dashboard for the team and a tracking portal for customers, both reading the same records. Exceptions surface automatically, and the weekly report builds itself and lands in inboxes before anyone starts work on Monday.",
  //   ],
  //   built: [
  //     {
  //       title: "Carrier data pipelines",
  //       body: "Scheduled Python jobs that collect events from carrier APIs, parse emailed updates and reconcile them into one clean shipment record.",
  //     },
  //     {
  //       title: "Operations dashboard",
  //       body: "Every active shipment, its status, its margin and its next milestone, filterable by lane, customer and carrier.",
  //     },
  //     {
  //       title: "Exception alerts",
  //       body: "Shipments that miss a milestone or stall at customs are flagged the moment the data shows it, not when the customer calls.",
  //     },
  //     {
  //       title: "Customer tracking portal",
  //       body: "Customers log in and see their own shipments, documents and estimated arrivals, which answers most questions before they are asked.",
  //     },
  //     {
  //       title: "Automated reporting",
  //       body: "Weekly and monthly performance reports generated from the live data and delivered by email, with no manual assembly.",
  //     },
  //     {
  //       title: "Monitored infrastructure",
  //       body: "CI and CD, error tracking, database backups and alerts on every pipeline, so a failed job is noticed and fixed quickly.",
  //     },
  //   ],
  //   phases: [
  //     {
  //       when: "Week 1",
  //       title: "Map the data",
  //       detail:
  //         "We traced where every spreadsheet column came from and agreed one data model the whole business could share.",
  //     },
  //     {
  //       when: "Weeks 2 to 3",
  //       title: "Pipelines first",
  //       detail:
  //         "Carrier integrations and email parsing, running against real shipments in parallel with the old spreadsheets to prove the numbers matched.",
  //     },
  //     {
  //       when: "Weeks 4 to 5",
  //       title: "Dashboard and portal",
  //       detail:
  //         "The operations view and the customer portal, designed with the coordinators who would use them every day.",
  //     },
  //     {
  //       when: "Week 6",
  //       title: "Cut over",
  //       detail:
  //         "The spreadsheets were archived, customers were invited to the portal and the automated reports went live.",
  //     },
  //   ],
  //   results: [
  //     "The weekly report builds itself, which gave the coordinators back most of a working day.",
  //     "Customers check their own shipments, and status emails fell by more than half.",
  //     "Late shipments are caught from the data, usually before the customer notices.",
  //     "Management sees margin and performance by lane without waiting for a spreadsheet.",
  //   ],
  //   stack: [
  //     "Python",
  //     "Next.js",
  //     "TypeScript",
  //     "PostgreSQL",
  //     "Carrier APIs",
  //     "GitHub Actions",
  //     "Vercel",
  //     "Sentry",
  //   ],
  //   theme: "ops",
  // },
  // {
  //   slug: "hotel-direct-booking-engine",
  //   client: "Lodgex Systems",
  //   industry: "Hospitality",
  //   summary:
  //     "A commission free direct booking engine and the front desk dashboard behind it, live in under three weeks.",
  //   title: "Hotel Direct Booking Engine: Case Study",
  //   description:
  //     "How CoreFinity Tech built a commission free hotel booking engine with Stripe payments, two way iCal sync and a front desk dashboard, live in three weeks.",
  //   keywords: [
  //     "hotel booking engine case study",
  //     "direct booking system",
  //     "commission free hotel booking",
  //     "iCal sync booking engine",
  //     "Stripe booking integration",
  //   ],
  //   headline: {
  //     lead: "Taking bookings back from",
  //     accent: "the booking portals.",
  //   },
  //   timeline: "3 weeks",
  //   year: "2026",
  //   datePublished: "2026-09-22",
  //   services: ["web-development", "systems-integration", "ui-ux-design"],
  //   metrics: [
  //     { value: 0, suffix: "%", label: "Commission on direct bookings" },
  //     { value: 25, suffix: "%", label: "Top commission rate removed" },
  //     { value: 3, suffix: " wk", label: "From brief to launch" },
  //     { value: 24, suffix: "/7", label: "Calendar sync across channels" },
  //   ],
  //   challenge: [
  //     "Lodgex operates a small group of boutique hotels that took nearly all of their bookings through the large booking portals. Each of those bookings cost between 15 and 25 percent in commission, on every night, for guests who often came back.",
  //     "The hotels had a website, but it could not take a booking. Availability lived in three places, double bookings happened every few weeks, and the front desk reconciled everything by hand each morning.",
  //   ],
  //   approach: [
  //     "We built a booking engine on the hotels' own domain, fast enough on a phone that guests would finish the booking there instead of going back to a portal. Payment runs through Stripe and settles straight to the hotels.",
  //     "Behind it sits a front desk dashboard with one source of availability. Two way iCal sync keeps the portals in step, so a room booked anywhere disappears everywhere within minutes, and double bookings stopped.",
  //   ],
  //   built: [
  //     {
  //       title: "Direct booking engine",
  //       body: "Room search, rates, extras and checkout on the hotels' own site, designed for the phone first because that is where guests book.",
  //     },
  //     {
  //       title: "Stripe payments",
  //       body: "Deposits, full payments and refunds, settled directly to the hotels with no platform taking a cut.",
  //     },
  //     {
  //       title: "Two way iCal sync",
  //       body: "Availability shared with every booking portal in both directions, so the hotels can keep the portals for discovery without double bookings.",
  //     },
  //     {
  //       title: "Front desk dashboard",
  //       body: "Arrivals, departures, room status and guest details in one view, replacing the morning reconciliation.",
  //     },
  //     {
  //       title: "Mobile guest passes",
  //       body: "Booking confirmations and arrival details that live on the guest's phone, with the information the front desk would otherwise repeat.",
  //     },
  //   ],
  //   phases: [
  //     {
  //       when: "Week 1",
  //       title: "Design and rates",
  //       detail:
  //         "The booking flow agreed in Figma, along with the rate rules, extras and cancellation policies it had to support.",
  //     },
  //     {
  //       when: "Week 2",
  //       title: "Engine and payments",
  //       detail:
  //         "The booking engine, Stripe checkout and the availability model, tested against real rate plans.",
  //     },
  //     {
  //       when: "Week 3",
  //       title: "Sync and launch",
  //       detail:
  //         "Two way calendar sync with the portals, the front desk dashboard and a staged launch on the first property.",
  //     },
  //   ],
  //   results: [
  //     "Direct bookings carry no commission, on first stays and on repeat guests.",
  //     "Double bookings stopped once every channel read from one availability record.",
  //     "The front desk starts the day with an accurate picture instead of a reconciliation.",
  //     "The hotels keep the booking portals for discovery while owning the guest relationship.",
  //   ],
  //   stack: [
  //     "Next.js",
  //     "TypeScript",
  //     "PostgreSQL",
  //     "Stripe",
  //     "iCal",
  //     "Tailwind CSS",
  //     "Vercel",
  //   ],
  //   theme: "booking",
  // },
];

/**
 * False while there are no real case studies. Every link, nav item, home page
 * section and sitemap entry that points at case studies checks this, so the
 * whole section disappears cleanly and returns as soon as one entry is added.
 */
export const hasCaseStudies = caseStudies.length > 0;

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/**
 * The next study in the list, wrapping round, for the "read next" card.
 * Undefined while there is only one, so a page never recommends itself.
 */
export function nextCaseStudy(study: CaseStudy): CaseStudy | undefined {
  if (caseStudies.length < 2) return undefined;
  const i = caseStudies.findIndex((c) => c.slug === study.slug);
  return caseStudies[(i + 1) % caseStudies.length];
}

/** Case studies that used a given service, for the service pages. */
export function caseStudiesFor(serviceSlug: string) {
  return caseStudies.filter((c) => c.services.includes(serviceSlug));
}
