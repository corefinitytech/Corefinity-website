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

export type CaseStudyTheme =
  "ai" | "ops" | "booking" | "education" | "industrial" | "fuel";

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
  /**
   * Set when the client cannot be named. The page then shows the product name
   * and lists the client as confidential, and nothing names them.
   */
  confidential?: boolean;
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
    slug: "fuelguard-iot-fuel-monitoring",
    client: "FuelGuard",
    confidential: true,
    industry: "Fuel and energy",
    summary:
      "A fuel monitoring system that checks every fill at the nozzle, with ESP32 firmware, a Flutter app, a FastAPI backend and an admin panel for stations.",
    title: "FuelGuard IoT Fuel Monitoring Case Study",
    description:
      "How CoreFinity Tech built FuelGuard: ESP32 firmware that checks every fill at the nozzle, a Flutter app, fraud alerts and a live admin panel for stations.",
    keywords: [
      "IoT fuel monitoring system",
      "fuel theft detection",
      "ESP32 flow meter",
      "fuel dispenser fraud detection",
      "Flutter IoT app",
      "IoT admin panel",
    ],
    headline: {
      lead: "Every litre checked",
      accent: "at the nozzle.",
    },
    timeline: "6 months",
    year: "2026",
    datePublished: "2026-10-10",
    services: [
      "mobile-app-development",
      "web-development",
      "systems-integration",
      "cloud-deployment",
    ],
    metrics: [
      { value: 1, suffix: " s", label: "Between live readings during a fill" },
      { value: 4, label: "Parts built: firmware, app, backend and panel" },
      { value: 90, suffix: " days", label: "Photo evidence kept for review" },
      { value: 5, label: "User roles, from super admin to driver" },
    ],
    challenge: [
      "When drivers, families and fleet owners fill up, they see one number: the reading on the pump. They have no way to check that the fuel that went into the tank matches it. A small shortfall on every fill adds up quickly, and without a record nobody can show where it happened.",
      "Stations needed the same answer from the other side: a way to prove honest fills, find the dispensers and staff behind repeated problems, and act on it, all from one place.",
    ],
    approach: [
      "We put an independent measurement at the nozzle itself. An ESP32 device fitted there counts the fuel with its own flow meter and reads the dispenser's pulse signal at the same time, so every fill is measured twice and compared litre by litre.",
      "The device runs its own WiFi hotspot, so the customer's phone connects to it directly and the check works at any pump, with or without mobile signal. The app shows the live readings every second, captures photo evidence and syncs each transaction to the backend, where configurable rules raise fraud alerts and escalate repeat cases automatically.",
      "Stations manage everything from a web admin panel: a live view of every nozzle, fraud alerts, devices, transactions, reports and staff, with firmware updates sent to the devices over the air.",
    ],
    built: [
      {
        title: "Nozzle firmware",
        body: "C++ firmware on the ESP32 that counts flow meter pulses, reads the dispenser signal, converts both to litres and latches a tamper alert the moment the nozzle sensor trips.",
      },
      {
        title: "Live fill session app",
        body: "A Flutter app that scans the pump's QR code, connects to the device's hotspot and shows both readings side by side every second until the fill is complete.",
      },
      {
        title: "Offline first sync",
        body: "Every transaction is saved on the phone first and synced the moment a connection returns, so a fill recorded without signal is never lost.",
      },
      {
        title: "Fraud rules and escalation",
        body: "A FastAPI backend that checks each fill against configurable discrepancy rules, raises fraud alerts and escalates staff and stations with repeated flags to a blacklist.",
      },
      {
        title: "Station admin panel",
        body: "A Next.js panel with a live nozzle monitor, fraud alerts, device management, transactions, reports, staff and complaints, with access set by role.",
      },
      {
        title: "Remote device control",
        body: "Devices are registered from the panel with their own key, receive commands remotely and install firmware updates over the air, reporting progress as they go.",
      },
    ],
    phases: [
      {
        when: "April",
        title: "Live fill sessions",
        detail:
          "Sign in, the app and API foundations, and the live session between the phone and the nozzle device.",
      },
      {
        when: "May",
        title: "Reports and admin",
        detail:
          "The admin panel modules for stations, with transaction history and reports.",
      },
      {
        when: "August",
        title: "Production and fleets",
        detail:
          "Production deployment of the backend, and features for fleet owners managing vehicles and drivers.",
      },
      {
        when: "September",
        title: "Fraud control and devices",
        detail:
          "Flagging and blacklisting rules, the remote command system for devices and over the air firmware updates.",
      },
    ],
    results: [
      "Every fill is measured twice at the nozzle and compared live, with any gap above 0.05 litres flagged.",
      "Tampering with the nozzle is reported the moment the sensor trips.",
      "Each transaction carries photo evidence, kept for 90 days for review.",
      "Fills recorded without mobile signal are saved on the phone and synced automatically.",
      "Repeat problems escalate on their own, flagging staff and stations for the owner to act on.",
      "Firmware updates reach every device over the air, straight from the admin panel.",
    ],
    stack: [
      "ESP32",
      "C++",
      "PlatformIO",
      "Flutter",
      "Dart",
      "FastAPI",
      "Python",
      "Firebase",
      "Firestore",
      "Cloudinary",
      "Next.js",
      "React",
      "TypeScript",
      "Railway",
    ],
    theme: "fuel",
  },
  {
    slug: "ielts-counsel-writing-checker-online-practice",
    client: "IELTS Counsel",
    clientUrl: "https://ieltscounsel.com/",
    industry: "Education",
    summary:
      "An IELTS online practice platform for an Islamabad institute, with an AI writing checker, speaking scores, Easypaisa plans and an admin panel.",
    title: "IELTS Writing Checker Platform Case Study",
    description:
      "How CoreFinity Tech built IELTS Counsel an IELTS online practice platform with an AI writing checker, speaking scores and Easypaisa checkout.",
    keywords: [
      "IELTS writing checker",
      "IELTS online practice",
      "IELTS practice",
      "IELTS online",
      "IELTS speaking score",
      "IELTS platform development",
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
      { value: 7, label: "Scoring modes for Writing and Speaking" },
      { value: 3, label: "Readings per essay, middle score used" },
      { value: 6, label: "Expert marked scripts used for tuning" },
      { value: 8, label: "Protection layers on every paid PDF" },
    ],
    challenge: [
      "IELTS Counsel is an IELTS institute in Islamabad. It prepares students for the Academic and General Training tests, in class and online. Writing and Speaking are where students need the most feedback, and they take the longest to mark. Every essay and recording went to an instructor, so students could only practise as often as a teacher had time to mark.",
      "The rest of the business was split across different places. Online students, campus students and students paying in installments were tracked separately. Paid plans needed limits that students could not get around, and paid study material needed protecting. Most students also wanted to pay with Easypaisa, so a card checkout alone would not work.",
    ],
    approach: [
      "We designed the IELTS writing checker so the AI model does the reading and the code does the marking. The model goes through each answer and reports what it finds: grammar and tense errors, vocabulary range, collocations, linking problems, and whether every part of the question was answered. The code then works out each criterion band from that evidence, using fixed thresholds, caps and IELTS style rounding.",
      "Each essay is read three times and the middle result is used, which keeps scores steady from one attempt to the next. We tuned the engine against the institute's own expert marked scripts from Band 4 to Band 9. The first version pushed weak and strong essays towards Band 6, so we corrected that, then ran the new engine alongside the old one before moving students over.",
      "The rest of the platform covers plans and limits, Easypaisa checkout, an admin panel for online and campus students, and mentor review for students who still want a teacher to look at their work.",
    ],
    built: [
      {
        title: "AI writing checker",
        body: "Marks Task 1 Academic, Task 1 General Training and Task 2 on all four IELTS criteria. Students see their strengths, what to improve and examples quoted from their own answer. Very short, off topic or memorised answers are capped.",
      },
      {
        title: "AI speaking scores",
        body: "Follows the real test across Parts 1, 2 and 3, with a microphone check, question audio and timers. Each recording is transcribed and checked for pace, pauses, hesitation, grammar, vocabulary and pronunciation, and the three parts are combined into one band.",
      },
      {
        title: "Plans and limits",
        body: "Free trial, Bronze, Silver and Golden plans control which mock tests, tracks, downloads and AI evaluations a student can use. The server keeps count, and if an evaluation fails the student gets the credit back.",
      },
      {
        title: "Easypaisa checkout",
        body: "Students pay from their Easypaisa mobile account. The system checks the payment status and amount, emails a receipt and starts the plan once the payment is confirmed. An old order cannot be used to renew a plan.",
      },
      {
        title: "Admin panel and analytics",
        body: "One place for online and campus students, including CNIC or passport records, installments, due dates and balances. Admins also manage tests and blogs, see pending evaluations, and track revenue by source, plan mix and average bands.",
      },
      {
        title: "Protected study resources",
        body: "Each paid PDF is marked for the student who downloaded it, with visible and hidden trace marks, so a shared copy can be traced back.",
      },
    ],
    phases: [
      {
        when: "Phase 1",
        title: "Platform and plans",
        detail:
          "The student app with Academic and General Training routes, IELTS online practice tests for all four modules, accounts, and plan limits checked on the server.",
      },
      {
        when: "Phase 2",
        title: "Payments and operations",
        detail:
          "Easypaisa checkout, the admin panel, campus and installment students, protected resources and the analytics dashboard.",
      },
      {
        when: "Phase 3",
        title: "Writing and speaking scores",
        detail:
          "The writing checker and the speaking pipeline, from reading the answer or the recording through to criterion bands and feedback.",
      },
      {
        when: "Phase 4",
        title: "Tune and roll out",
        detail:
          "We tuned the scores against expert marked scripts from Band 4 to Band 9, then ran the new engine next to the old one before switching students over.",
      },
    ],
    results: [
      "Students get a band score and feedback on each criterion as soon as they submit a Writing or Speaking task.",
      "Mentor review is still available for students who want a teacher's view.",
      "The institute sells its plans online through Easypaisa, and campus and installment students are managed in the same system.",
      "Plan limits are checked on the server for every test, download and AI evaluation.",
      "Admins see revenue, plan mix, pending evaluations and average bands on one dashboard.",
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
  {
    slug: "aeroflex-industrial-supplier-website",
    client: "Aeroflex",
    clientUrl: "https://www.aeroflex.pk/",
    industry: "Industrial equipment",
    summary:
      "The first website for an Islamabad supplier of industrial testing equipment, built in two weeks with 13 pages, a blog and search optimisation from day one.",
    title: "Industrial Supplier Website Case Study",
    description:
      "How CoreFinity Tech built Aeroflex, an Islamabad testing equipment supplier, its first website: 13 pages, a blog and SEO ready for Google and AI search.",
    keywords: [
      "industrial supplier website",
      "website for engineering company",
      "B2B website development Pakistan",
      "calibration company website",
      "web development Islamabad",
      "SEO for industrial suppliers",
    ],
    headline: {
      lead: "A first website for an industrial supplier,",
      accent: "built to be found.",
    },
    timeline: "2 weeks",
    year: "2026",
    datePublished: "2026-10-04",
    services: ["web-development", "seo", "ui-ux-design"],
    metrics: [
      { value: 13, label: "Pages, each with its own search title" },
      { value: 6, label: "Services, each with its own section" },
      { value: 100, label: "Lighthouse SEO score" },
      { value: 15, label: "Search and AI crawlers welcomed by name" },
    ],
    challenge: [
      "Aeroflex supplies, calibrates, repairs and services testing instruments for oil and gas, energy, healthcare and manufacturing teams around Islamabad. The company has been running since 2014, yet it had no website. Work came in through phone calls, WhatsApp messages and referrals.",
      "That works until a plant manager or a procurement officer searches for a calibration or repair supplier and finds nothing. Engineering buyers check a supplier online before they pick up the phone. They want to see the services, the process and a quick way to reach someone. Aeroflex needed a site that answered those questions, showed up in search, and could keep growing with articles over time.",
    ],
    approach: [
      "We started from how an engineering buyer reads a supplier's site. What do you do, can you handle my equipment, how fast, and how do I reach a person? Every page is built around one of those questions, in plain language, with the direct number for urgent repairs always close at hand.",
      "Search was part of the build from the first day. Each page has its own title and description, the site publishes structured data and a sitemap, and its crawler rules welcome Google, Bing and the AI assistants that now answer buying questions. A blog gives Aeroflex a place to publish field notes that keep bringing in searches after launch.",
    ],
    built: [
      {
        title: "Service pages",
        body: "Six services, from instrument supply and calibration to repair, training, procurement and spare parts, each explained by what the customer gets, with a direct way to ask about it.",
      },
      {
        title: "A clear process",
        body: "Consult, specify, deliver and support, laid out in four steps so a buyer knows exactly what happens after the first call.",
      },
      {
        title: "Fast contact for urgent work",
        body: "A contact form, the engineers' direct number on every page and a call button, because broken equipment on a night shift cannot wait for an email reply.",
      },
      {
        title: "Blog and field notes",
        body: "A blog with categories for calibration, maintenance, training, procurement and parts, live with six articles at launch, so the site keeps earning searches.",
      },
      {
        title: "Search and AI ready",
        body: "Unique titles and descriptions, structured data, a sitemap, an llms.txt summary and crawler rules that name Google, Bing, ChatGPT, Claude and Perplexity.",
      },
      {
        title: "Built to grow",
        body: "A component system in Next.js and Tailwind CSS on Vercel, so new services, articles and pages can be added without starting again.",
      },
    ],
    phases: [
      {
        when: "Week 1",
        title: "Structure and pages",
        detail:
          "Mapped the questions engineering buyers ask, planned a page for each, and designed the layout from phone to desktop.",
      },
      {
        when: "Week 2",
        title: "Build",
        detail:
          "Built the pages, the blog and the contact flow in Next.js, with the engineers' number reachable from every screen.",
      },
      {
        when: "Launch",
        title: "Search setup and go live",
        detail:
          "Titles, descriptions, structured data, the sitemap and crawler rules in place, then live on aeroflex.pk.",
      },
    ],
    results: [
      "Aeroflex has its first website, live on its own domain with 13 pages.",
      "The site scores 100 for SEO in Google Lighthouse, with search titles, descriptions and structured data in place from launch.",
      "Google, Bing and AI assistants such as ChatGPT, Claude and Perplexity are all allowed to read the site and cite it.",
      "A buyer can reach an engineer from any page, by form or by phone.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel",
      "Google Analytics",
    ],
    theme: "industrial",
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
