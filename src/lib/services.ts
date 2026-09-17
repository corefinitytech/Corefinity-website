/**
 * Service page content.
 *
 * Every claim here describes how Corefinity works, not what it has delivered.
 * No client names, no project counts, no outcome figures, because none of that
 * is published yet and inventing it would poison the structured data these
 * pages emit. Add proof to a page the day there is real proof to add.
 */

export type ServiceFaq = { q: string; a: string };

export type ServicePage = {
  slug: string;
  /** Short label for navigation and related links. */
  navLabel: string;
  /** Full name, used as the H1 tail and in structured data. */
  name: string;
  /** Metadata title. Written for search intent, not for the brand. */
  title: string;
  description: string;
  headline: { lead: string; accent: string };
  /** Sits beside the H1. */
  summary: string;
  intro: string[];
  covers: { title: string; body: string }[];
  suitedTo: string[];
  process: { title: string; detail: string }[];
  handover: string[];
  stack: string[];
  faqs: ServiceFaq[];
  related: string[];
};

export const services: ServicePage[] = [
  {
    slug: "web-development",
    navLabel: "Web development",
    name: "Web Development",
    title: "Custom Web Development: Platforms, Dashboards and Portals",
    description:
      "Custom web development across frontend, backend and full stack. Web applications, SaaS dashboards, customer portals and internal tools built on Next.js and TypeScript, quoted at a fixed price.",
    headline: { lead: "Web platforms built", accent: "around your business." },
    summary:
      "Frontend, backend and everything between, built from scratch rather than assembled from plugins.",
    intro: [
      "Most businesses reach a point where the tools stop fitting. The spreadsheet that ran operations becomes the thing everyone complains about. The website builder cannot do the one thing the business actually needs. Four separate subscriptions hold four pieces of the same process, and somebody retypes data between them every morning.",
      "That is the point where custom software pays for itself. We build web applications that match how a business already works, rather than asking the business to reshape itself around a product someone else designed.",
    ],
    covers: [
      {
        title: "Web applications",
        body: "Multi user systems with authentication, permissions and real workflows behind them. Built to handle the awkward cases your business actually has, not just the happy path.",
      },
      {
        title: "SaaS dashboards",
        body: "Multitenant architecture, role based access, billing and admin tooling. The parts that are tedious to build and expensive to get wrong.",
      },
      {
        title: "Customer portals",
        body: "Places for your clients to log in, see their own data, submit what you need from them and stop emailing your team for status updates.",
      },
      {
        title: "Internal operations tools",
        body: "The systems that replace the spreadsheet, the shared inbox and the three subscriptions nobody can quite cancel.",
      },
      {
        title: "Marketing sites that perform",
        body: "Fast, accessible, properly structured for search. This site scores 100 across every Lighthouse category, which is the standard we build to.",
      },
      {
        title: "Backend and APIs",
        body: "Databases designed properly, APIs your other systems can talk to, and background jobs that run without anyone watching them.",
      },
    ],
    suitedTo: [
      "Your team spends hours a week moving data between tools by hand",
      "An off the shelf product does almost what you need, but not the part that matters",
      "You are paying for several subscriptions that each solve a slice of one problem",
      "You need something your competitors cannot simply buy",
      "A previous build was left half finished and you need someone to take it on",
    ],
    process: [
      {
        title: "Understand the work",
        detail:
          "We learn how the process runs today, including the exceptions people handle manually. Those exceptions are usually where the value is.",
      },
      {
        title: "Design before code",
        detail:
          "Screens are agreed in Figma first. Changing a design takes minutes; changing a built feature takes days.",
      },
      {
        title: "Build in visible stages",
        detail:
          "Work goes to a live staging URL as it is built, so you see progress continuously rather than at a reveal.",
      },
      {
        title: "Launch and hand over",
        detail:
          "Deployment, domains, monitoring, and a walkthrough with whoever will run it.",
      },
    ],
    handover: [
      "The GitHub repository, with its full commit history",
      "Figma source files for every screen",
      "Environment configuration and deployment access",
      "The database, and documentation for its schema",
      "A walkthrough recording for whoever maintains it next",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Vercel",
    ],
    faqs: [
      {
        q: "How long does a web application take?",
        a: "A focused MVP or marketing build is usually ready for review on staging inside 10 to 14 business days. A full application with authentication, a real data model and an admin side runs 3 to 4 weeks. Anything larger we break into stages so something useful ships early.",
      },
      {
        q: "Can you take over a project someone else started?",
        a: "Often, yes. We read the codebase first and tell you honestly whether continuing or restarting is the better value. Sometimes the existing work is a solid foundation. Sometimes rebuilding is genuinely cheaper than untangling it, and we will say so rather than quietly billing for the untangling.",
      },
      {
        q: "Do you work with our existing designers?",
        a: "Yes. If you have a design team or a brand system, we build to it. If you do not, we design the screens first and agree them with you before writing production code.",
      },
      {
        q: "What happens after launch?",
        a: "Defects in what we built are fixed at no charge for the support period in your proposal. Beyond that, you can take the code to any team you like, or keep working with us. There is no retainer you have to sign to keep your own software running.",
      },
    ],
    related: ["ui-ux-design", "systems-integration", "cloud-deployment"],
  },

  {
    slug: "mobile-app-development",
    navLabel: "Mobile apps",
    name: "Mobile App Development",
    title: "Mobile App Development for iOS and Android",
    description:
      "Cross platform mobile app development for iOS and Android, with the APIs, admin tooling and store submission handled. Fixed scope, full code ownership.",
    headline: { lead: "Apps for iOS and Android,", accent: "one codebase." },
    summary:
      "Cross platform apps, plus the backend and admin tooling that has to exist behind them.",
    intro: [
      "An app is rarely just an app. Behind the screens people tap there is an API, a database, an admin panel somebody uses to manage content, push notifications, and an account system. Quotes that cover only the screens tend to grow later.",
      "We build the whole thing, and we build it cross platform, so iOS and Android come from one codebase rather than two teams solving the same problem twice.",
    ],
    covers: [
      {
        title: "Cross platform builds",
        body: "One codebase producing both iOS and Android apps. Roughly half the build cost of writing each natively, and one place to fix a bug.",
      },
      {
        title: "The backend behind it",
        body: "APIs, database, authentication and file storage, designed alongside the app rather than bolted on once the screens are done.",
      },
      {
        title: "Admin tooling",
        body: "A web dashboard for your team to manage content, users and orders, so changing something in the app does not require a developer.",
      },
      {
        title: "Push notifications",
        body: "Set up properly, with the permission flows and scheduling that make people keep them switched on.",
      },
      {
        title: "Payments and subscriptions",
        body: "In app purchases where the stores require them, Stripe where they do not, and the receipt handling both need.",
      },
      {
        title: "Store submission",
        body: "App Store and Play Store listings, review guidelines, privacy declarations and the resubmissions that usually follow a first rejection.",
      },
    ],
    suitedTo: [
      "Your customers ask for an app and the mobile website is not enough",
      "You need features a browser cannot reach, such as offline use or push notifications",
      "You have a working web product and want a mobile companion to it",
      "You were quoted separately for iOS and Android and want to understand why",
    ],
    process: [
      {
        title: "Decide what version one is",
        detail:
          "App stores punish abandoned apps. We agree the smallest version worth shipping, then plan what follows it.",
      },
      {
        title: "Design the screens",
        detail:
          "Mobile design is its own discipline. Screens are agreed in Figma, including the states people hit when something goes wrong.",
      },
      {
        title: "Build app and backend together",
        detail:
          "Both progress side by side, with builds you can install on a real device as they are made.",
      },
      {
        title: "Submit and support",
        detail:
          "We handle submission to both stores and the first round of review feedback, which almost always comes.",
      },
    ],
    handover: [
      "The app repository and the backend repository",
      "Figma source files",
      "Signing keys and store listing access, transferred to your accounts",
      "The database and its documentation",
      "Build and release instructions any competent developer can follow",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Firebase",
      "Stripe",
    ],
    faqs: [
      {
        q: "Cross platform or native?",
        a: "Cross platform suits most products, and it is what we recommend by default: one codebase, one set of fixes, roughly half the cost. Native earns its price when an app leans hard on device hardware, heavy graphics or platform specific features. We will tell you which one your product actually needs rather than defaulting to the more expensive answer.",
      },
      {
        q: "Do the app stores charge separately?",
        a: "Yes. Apple charges an annual developer fee and Google a one time registration fee. Both are paid on your own accounts, so the app is registered to your business rather than to us.",
      },
      {
        q: "How long does store approval take?",
        a: "Usually a few days per store, though a first submission is often rejected over something small in the guidelines. We build that round trip into the timeline rather than treating it as a surprise.",
      },
      {
        q: "Can the app work offline?",
        a: "Depending on what it does, yes. Offline support changes how the data layer is designed, so it is worth raising in the brief rather than after the build has started.",
      },
    ],
    related: ["web-development", "ai-development", "systems-integration"],
  },

  {
    slug: "ai-development",
    navLabel: "AI development",
    name: "AI & Chatbot Development",
    title: "AI Development and Chatbot Integration for Business",
    description:
      "AI development, chatbots and assistants that answer from your own documents, plus language model integration into the systems your business already runs.",
    headline: { lead: "AI wired into", accent: "the work you already do." },
    summary:
      "Assistants that answer from your own material, and automation that removes the queries nobody wants to answer twice.",
    intro: [
      "Plenty of AI projects fail for the same reason. A model is bolted onto the side of a business, given no access to anything real, and asked to be impressive. It answers confidently, it answers wrongly, and people stop trusting it within a fortnight.",
      "The useful version is narrower and duller. A model connected to your actual documents, your actual database and your actual rules, doing a specific job with limits you can see. That is what we build.",
    ],
    covers: [
      {
        title: "Chatbots that answer from your documents",
        body: "Retrieval over your handbooks, policies, catalogue or knowledge base, so replies come from your material and can be traced back to the source.",
      },
      {
        title: "Customer support assistants",
        body: "Handling the repetitive questions, passing anything unusual to a person, with the handover built in from the start rather than added after complaints.",
      },
      {
        title: "Document processing",
        body: "Pulling structured data out of invoices, forms, contracts and scans, and putting it where your systems expect it.",
      },
      {
        title: "Language model integration",
        body: "Adding drafting, summarising, classifying or extraction inside the software you already run, rather than in a separate tool nobody opens.",
      },
      {
        title: "Internal knowledge assistants",
        body: "Letting your own team ask questions across scattered internal material instead of interrupting the person who happens to know.",
      },
      {
        title: "Guardrails and evaluation",
        body: "Tests against real questions, limits on what the system will attempt, and a defined answer for when it does not know.",
      },
    ],
    suitedTo: [
      "Your support team answers the same questions every day",
      "Information exists but nobody can find it quickly",
      "Data arrives as documents and someone retypes it into a system",
      "You have been sold an AI product that impresses in a demo and fails in practice",
      "You want to use AI but need to know where it should not be trusted",
    ],
    process: [
      {
        title: "Pick a job worth doing",
        detail:
          "We start from a specific task with a measurable outcome, not from the technology. Some briefs are better solved by ordinary code, and we will say so.",
      },
      {
        title: "Get the data in order",
        detail:
          "Quality of answers follows quality of source material. We work out what the system can draw on before choosing a model.",
      },
      {
        title: "Build with limits",
        detail:
          "Retrieval so answers are grounded, guardrails on scope, and a clear route to a human when confidence is low.",
      },
      {
        title: "Test against real questions",
        detail:
          "We evaluate on questions your business actually receives, not on examples chosen to make the demo look good.",
      },
    ],
    handover: [
      "The repository, including prompts, retrieval logic and evaluation tests",
      "API keys held on your own provider accounts, so usage bills go to you",
      "Documentation of what the system will and will not attempt",
      "An architecture written so a provider can be swapped later",
    ],
    stack: [
      "Python",
      "TypeScript",
      "OpenAI",
      "Anthropic",
      "Vector databases",
      "FastAPI",
      "PostgreSQL",
    ],
    faqs: [
      {
        q: "Will it make things up?",
        a: "Language models are probabilistic and can produce output that is wrong. Nothing removes that entirely, and anyone promising otherwise is overselling. What we do is ground answers in your own documents, constrain what the system will attempt, and design a clear path to a person when it is unsure. We will be direct with you about where the limits sit.",
      },
      {
        q: "Does our data get used to train models?",
        a: "Not by us. We use provider configurations that exclude your data from training, and we do not use your material to build anything for anyone else. This is written into our terms rather than just promised here.",
      },
      {
        q: "What does it cost to run?",
        a: "Model usage is billed by the provider, on your own account, so you keep control of it. We size the likely monthly cost during scoping and design to keep it predictable rather than letting it drift.",
      },
      {
        q: "What if a provider changes or shuts down a model?",
        a: "It happens regularly. We build so that swapping providers is possible wherever it is practical, rather than wiring your business into one vendor's roadmap.",
      },
    ],
    related: ["python-automation", "web-development", "systems-integration"],
  },

  {
    slug: "python-automation",
    navLabel: "Python automation",
    name: "Python Scripting & Automation",
    title: "Python Scripting and Business Process Automation",
    description:
      "Python automation for data pipelines, web scraping, scheduled reporting and repetitive back office work, built to run unattended and tell you when something breaks.",
    headline: { lead: "Automate the work", accent: "nobody should be doing." },
    summary:
      "Data pipelines, scraping, scheduled jobs and reporting that take repetitive tasks off someone's desk.",
    intro: [
      "Most businesses have at least one job that exists only because software does not talk to software. Someone downloads a report every Monday, reformats it, and emails it on. Someone copies orders from one system into another. Someone checks a supplier site for price changes.",
      "These tasks are small individually and enormous in aggregate. They are also, almost always, automatable in days rather than months.",
    ],
    covers: [
      {
        title: "Data pipelines",
        body: "Moving data between systems on a schedule, with the transformations, deduplication and validation that make it trustworthy at the far end.",
      },
      {
        title: "Web scraping",
        body: "Collecting public data reliably, handling the sites that change their markup and the ones that would rather you did not.",
      },
      {
        title: "Scheduled reporting",
        body: "Reports built and delivered automatically, to an inbox, a spreadsheet or a dashboard, without anyone remembering to run them.",
      },
      {
        title: "Back office automation",
        body: "Invoice handling, file processing, bulk updates and the routine tasks that consume mornings.",
      },
      {
        title: "System synchronisation",
        body: "Keeping two systems that were never designed to talk to each other in agreement.",
      },
      {
        title: "Monitoring and alerts",
        body: "Automation that stays quiet when it works and tells you clearly when it does not, which is the difference between a tool and a liability.",
      },
    ],
    suitedTo: [
      "Someone on your team does the same task every week",
      "Data is copied between two systems by hand",
      "Reports are assembled manually and are always slightly late",
      "You need data from sources that publish no API",
      "A script already exists, written by someone who has left",
    ],
    process: [
      {
        title: "Watch the task as it is done",
        detail:
          "We map the real process, including the judgement calls the person makes without thinking about them.",
      },
      {
        title: "Automate the reliable part",
        detail:
          "Not everything should be automated. We separate what a script can own from what still needs a person, and say which is which.",
      },
      {
        title: "Build to fail loudly",
        detail:
          "Logging, retries and alerts, so a broken job announces itself instead of quietly producing wrong numbers for a month.",
      },
      {
        title: "Deploy and hand over",
        detail:
          "Scheduled on infrastructure you control, with documentation written for whoever inherits it.",
      },
    ],
    handover: [
      "The repository, with readable code and comments that explain the why",
      "Deployment and scheduling configuration",
      "Documentation of every input, output and failure mode",
      "Alerting wired to wherever your team actually looks",
    ],
    stack: [
      "Python",
      "Pandas",
      "Playwright",
      "FastAPI",
      "PostgreSQL",
      "Celery",
      "Docker",
    ],
    faqs: [
      {
        q: "How long does a typical automation take?",
        a: "A single well defined job is often a few days. A pipeline spanning several systems, with validation and alerting, is usually one to two weeks. We quote it fixed once the task is clear.",
      },
      {
        q: "What happens when a website we scrape changes?",
        a: "It will, eventually. We build scrapers to fail visibly rather than silently return nothing, so you find out immediately. Repairs are quick because the code is written to be repaired.",
      },
      {
        q: "Is scraping legal?",
        a: "It depends entirely on the source, its terms and what the data is. We check before building, and we will tell you if a particular source is a bad idea rather than building it and leaving the question with you.",
      },
      {
        q: "Can you fix a script we already have?",
        a: "Usually. We read it first and tell you whether repairing or rewriting is better value, which for a short script is often rewriting.",
      },
    ],
    related: ["ai-development", "systems-integration", "web-development"],
  },

  {
    slug: "seo",
    navLabel: "SEO",
    name: "Search Engine Optimisation",
    title: "Technical SEO and Search Performance",
    description:
      "Technical SEO, structured data, page speed and site architecture, done by the engineers who build the site. No ranking guarantees, because nobody can honestly give one.",
    headline: { lead: "SEO done by the people", accent: "who build the site." },
    summary:
      "Technical SEO, structured data, speed and architecture. We commit to the work, not to a position.",
    intro: [
      "A great deal of SEO advice is guesswork sold with confidence. We do the part that is not guesswork: the technical foundation that determines whether a search engine can crawl your site, understand it, and rank it at all.",
      "That work is measurable, it is durable, and it is mostly engineering. It is also increasingly what decides whether an AI assistant can find and quote you, which is becoming its own channel.",
    ],
    covers: [
      {
        title: "Technical audit",
        body: "Crawlability, indexing, redirects, duplicate content, canonical tags and the structural problems that quietly cap a site's ceiling.",
      },
      {
        title: "Core Web Vitals",
        body: "Load speed, layout stability and responsiveness, measured properly and fixed at the source rather than patched with a plugin.",
      },
      {
        title: "Structured data",
        body: "Schema markup so search engines understand what your pages describe. Accurate markup only. Anything invented gets penalised.",
      },
      {
        title: "Site architecture",
        body: "URL structure, internal linking and page hierarchy, so authority flows to the pages that need to rank.",
      },
      {
        title: "AI and assistant visibility",
        body: "Bing indexing, IndexNow submission and an llms.txt describing your business accurately, because assistants retrieve from indexes too.",
      },
      {
        title: "Search Console setup",
        body: "Google and Bing properties verified, sitemaps submitted, and someone explaining what the reports actually mean.",
      },
    ],
    suitedTo: [
      "Your site does not appear for terms it obviously should",
      "An agency sends monthly reports that never quite explain anything",
      "The site is slow and you have been told that is simply how it is",
      "You are about to rebuild and want to keep the rankings you have",
      "You want AI assistants to describe your business correctly",
    ],
    process: [
      {
        title: "Audit and prioritise",
        detail:
          "A full technical crawl, and a list ordered by impact rather than by how easy each item is to bill for.",
      },
      {
        title: "Fix the foundation",
        detail:
          "Crawl and index problems first, because content work on an unindexable site is wasted effort.",
      },
      {
        title: "Speed and structure",
        detail:
          "Core Web Vitals and architecture, fixed in the code rather than masked.",
      },
      {
        title: "Measure and report plainly",
        detail:
          "What changed, what it did, and what remains. In language that does not require a glossary.",
      },
    ],
    handover: [
      "The full audit, with every finding and its reasoning",
      "Search Console and Bing Webmaster Tools access on your own accounts",
      "A written record of every change made and why",
      "A prioritised list of what to do next, whoever does it",
    ],
    stack: [
      "Google Search Console",
      "Bing Webmaster Tools",
      "Lighthouse",
      "Schema.org",
      "IndexNow",
      "Plausible",
    ],
    faqs: [
      {
        q: "Can you guarantee first page rankings?",
        a: "No, and you should be wary of anyone who does. Nobody controls how a search engine ranks a page. What we can commit to is the technical work, done properly and documented, which is the part that is actually within anyone's control.",
      },
      {
        q: "How long before results show?",
        a: "Technical fixes such as indexing and speed can register within weeks. Competitive ranking movement usually takes months. Anyone promising quick wins on a competitive term is either lucky or misleading you.",
      },
      {
        q: "Do you write content too?",
        a: "We handle structure, technical work and how content should be organised. Words about your own business are usually better written by you, and we will tell you exactly what each page needs to cover.",
      },
      {
        q: "Why does Bing matter if Google is bigger?",
        a: "Because Bing's index is what ChatGPT browsing and Microsoft Copilot retrieve from. If Bing has never crawled you, those assistants cannot cite you, whatever your Google position looks like.",
      },
    ],
    related: ["web-development", "cloud-deployment", "ui-ux-design"],
  },

  {
    slug: "systems-integration",
    navLabel: "Integration",
    name: "Systems Integration",
    title: "API and Systems Integration Services",
    description:
      "Two way integrations across payment gateways, CRMs, WhatsApp, calendars and databases, so your systems stop needing a person to copy data between them.",
    headline: { lead: "Make your systems", accent: "talk to each other." },
    summary:
      "Two way connections across payments, CRMs, messaging, calendars and databases.",
    intro: [
      "Businesses rarely run on one system. They run on a payment provider, a CRM, an accounting package, a booking calendar and a messaging channel, none of which were designed with the others in mind.",
      "The gap between them is usually filled by a person with a spreadsheet. Integration work closes that gap, which is both cheaper than the person and considerably less error prone.",
    ],
    covers: [
      {
        title: "Payment gateways",
        body: "Stripe and regional providers, including subscriptions, refunds, settlement reconciliation and the webhook handling that keeps records straight.",
      },
      {
        title: "CRM connections",
        body: "Leads, contacts and deals synchronised automatically, so your sales system reflects reality without anyone updating it.",
      },
      {
        title: "WhatsApp and messaging",
        body: "Order confirmations, reminders and notifications through the channel your customers actually read.",
      },
      {
        title: "Calendar synchronisation",
        body: "Two way iCal sync so availability stays correct across every channel you sell through, and double bookings stop happening.",
      },
      {
        title: "Database integration",
        body: "Connecting systems that hold overlapping data, with a clear decision about which one is the source of truth.",
      },
      {
        title: "Custom API work",
        body: "Building the API your partners need, or consuming one that is badly documented, which is most of them.",
      },
    ],
    suitedTo: [
      "The same information is entered into two systems by hand",
      "Your booking availability is wrong across channels",
      "Payments reconcile manually at the end of every month",
      "A supplier or partner has an API and nobody has connected it",
      "An existing integration breaks regularly and nobody knows why",
    ],
    process: [
      {
        title: "Map what exists",
        detail:
          "Which systems hold what, where they disagree, and which one should win when they do.",
      },
      {
        title: "Design the flow",
        detail:
          "Direction, frequency, and what happens on conflict. Two way sync without conflict rules causes more problems than it solves.",
      },
      {
        title: "Build with failure in mind",
        detail:
          "Retries, idempotency and alerting, because third party APIs go down and yours should survive it.",
      },
      {
        title: "Verify against real data",
        detail:
          "Tested with your actual records, not with clean examples that hide the edge cases.",
      },
    ],
    handover: [
      "The integration code and its configuration",
      "Documentation of every flow, including conflict rules",
      "Credentials held on your own accounts throughout",
      "Monitoring so a failed sync raises an alert, not a mystery",
    ],
    stack: [
      "Node.js",
      "Python",
      "Stripe",
      "REST and GraphQL",
      "Webhooks",
      "iCal",
      "PostgreSQL",
      "Redis",
    ],
    faqs: [
      {
        q: "What if a system has no API?",
        a: "There is often another route, such as a file export, a database connection or careful automation of the interface. We check what is available before quoting, and we tell you if the only honest answer is that it cannot be done reliably.",
      },
      {
        q: "Who pays for third party API costs?",
        a: "You do, billed to your own accounts. We set them up in your name so you keep control of the keys, the spend and the relationship.",
      },
      {
        q: "What happens when their API changes?",
        a: "Providers deprecate endpoints with varying amounts of notice. We build so breakage is detected and reported immediately rather than discovered through missing data weeks later.",
      },
      {
        q: "Can you fix an integration built by someone else?",
        a: "Usually. We read what is there, find why it fails, and tell you whether repairing or replacing is better value.",
      },
    ],
    related: ["web-development", "python-automation", "cloud-deployment"],
  },

  {
    slug: "ui-ux-design",
    navLabel: "UI and UX design",
    name: "UI & UX Design",
    title: "UI and UX Design for Web and Mobile Products",
    description:
      "Interface and experience design for web and mobile products, agreed in Figma before production code is written, so nobody pays to build the same screen twice.",
    headline: { lead: "Designed first,", accent: "built once." },
    summary:
      "Design systems built and agreed in Figma before any production code is written.",
    intro: [
      "Changing a design takes minutes. Changing a built feature takes days, and changing a built feature that other features now depend on takes considerably longer than that.",
      "So we design first. Not as a formality before the real work, but because it is the cheapest place to have the arguments, change the layout and discover that a screen does not make sense.",
    ],
    covers: [
      {
        title: "Interface design",
        body: "Every screen your product needs, including the empty ones, the loading ones and the ones people see when something goes wrong.",
      },
      {
        title: "Design systems",
        body: "Reusable components, type scale, colour and spacing defined once, so the tenth screen takes an hour instead of a day.",
      },
      {
        title: "Interactive prototypes",
        body: "Clickable flows you can navigate and put in front of people before a line of production code exists.",
      },
      {
        title: "Accessibility built in",
        body: "Contrast, focus states and keyboard paths designed from the start. Retrofitting accessibility costs several times more than including it.",
      },
      {
        title: "Responsive behaviour",
        body: "How each layout behaves from phone to desktop, decided in design rather than improvised during the build.",
      },
      {
        title: "Developer ready handover",
        body: "Files organised so the build is unambiguous, whether we do it or your own team does.",
      },
    ],
    suitedTo: [
      "You have a product idea and need to see it before committing to a build",
      "Your existing product works but people find it confusing",
      "Every new screen looks slightly different from the last",
      "You need something to show investors or early customers",
      "Your developers are making design decisions in code by default",
    ],
    process: [
      {
        title: "Understand the job",
        detail:
          "Who uses this, what they are trying to finish, and what currently gets in their way.",
      },
      {
        title: "Structure before surface",
        detail:
          "Layout and flow settled first. Colour and polish on top of a structure that already works.",
      },
      {
        title: "Build the system",
        detail:
          "Components and tokens defined so the design stays consistent as it grows.",
      },
      {
        title: "Prototype and agree",
        detail:
          "A clickable version to review, so approval is based on using it rather than imagining it.",
      },
    ],
    handover: [
      "Figma source files, organised and named for someone else to work in",
      "The component library and design tokens",
      "An interactive prototype anyone can open",
      "Specifications any developer can build from",
    ],
    stack: ["Figma", "Design tokens", "Tailwind CSS", "WCAG 2.2"],
    faqs: [
      {
        q: "Can we take the designs elsewhere to build?",
        a: "Yes. The Figma files are yours, organised for another team to work from. We would like to build it, but you are not locked in, and the files are not structured to make leaving difficult.",
      },
      {
        q: "How many revisions are included?",
        a: "Your proposal states a number, and it is a realistic one rather than a trap. In practice, designing structure before surface means most revisions are small by the time anyone is looking at colour.",
      },
      {
        q: "Do you do brand and logo work?",
        a: "We work with your existing brand. If you do not have one, we can define a workable visual direction for the product, but a full brand identity is a different discipline and we will say so rather than improvising it.",
      },
      {
        q: "Is design worth it for an internal tool?",
        a: "Often more than for a public site. Internal tools get used for hours a day by people who cannot leave, so friction compounds rather than costing you a visitor.",
      },
    ],
    related: ["web-development", "mobile-app-development", "seo"],
  },

  {
    slug: "cloud-deployment",
    navLabel: "Cloud and DevOps",
    name: "Cloud Deployment & Infrastructure",
    title: "Cloud Deployment, CI/CD and Infrastructure",
    description:
      "Production deployment pipelines, edge hosting, monitoring, backups and security, set up so releases are routine and problems announce themselves.",
    headline: { lead: "Ship it properly,", accent: "then sleep." },
    summary:
      "CI and CD pipelines, edge hosting, monitoring and backups, on infrastructure you own.",
    intro: [
      "Software that is not deployed properly behaves like software that does not work. Releases become events people dread, nobody is quite sure what is running in production, and the first sign of a problem is a customer mentioning it.",
      "Deployment done well is dull, which is the point. Changes ship in minutes, problems are caught before users find them, and restoring from a backup is something that has actually been tested.",
    ],
    covers: [
      {
        title: "CI and CD pipelines",
        body: "Automated tests, builds and deployment on every change, so shipping is routine rather than a decision.",
      },
      {
        title: "Edge hosting",
        body: "Served close to your users, with caching configured so pages are fast wherever people are.",
      },
      {
        title: "Environments",
        body: "Separate staging and production, with preview deployments per change so work can be reviewed before it is live.",
      },
      {
        title: "Monitoring and alerting",
        body: "Uptime, errors and performance tracked, with alerts that reach a person before a customer does.",
      },
      {
        title: "Backups and recovery",
        body: "Automated backups, and a restore that has been rehearsed. An untested backup is a hope, not a plan.",
      },
      {
        title: "Security hardening",
        body: "HTTPS, security headers, secret management and dependency updates applied as routine rather than after an incident.",
      },
    ],
    suitedTo: [
      "Deploying means someone copying files onto a server",
      "There is no staging environment, so changes are tested in production",
      "You learn about outages from customers",
      "Nobody is certain whether backups work, because nobody has restored one",
      "Your infrastructure was set up by someone who has since left",
    ],
    process: [
      {
        title: "Review what is running",
        detail:
          "What exists, what it costs, and where the actual risks are rather than the theoretical ones.",
      },
      {
        title: "Automate the pipeline",
        detail:
          "Build, test and deploy on every change, so releasing stops being a manual ritual.",
      },
      {
        title: "Add the safety net",
        detail:
          "Monitoring, alerting and backups, with a restore tested rather than assumed.",
      },
      {
        title: "Document and hand over",
        detail:
          "Written so someone who did not build it can operate it at short notice.",
      },
    ],
    handover: [
      "Infrastructure configuration held in your repository",
      "Every account and service in your organisation's name",
      "Runbooks for deployment, rollback and recovery",
      "Monitoring dashboards your team can actually read",
    ],
    stack: [
      "Vercel",
      "GitHub Actions",
      "Docker",
      "PostgreSQL",
      "Cloudflare",
      "Sentry",
    ],
    faqs: [
      {
        q: "Do we have to use Vercel?",
        a: "No. It suits Next.js projects and it is our default for that reason, but we work with AWS, Cloudflare and traditional hosting where those fit better. The right answer depends on your stack and your compliance requirements, not on our preference.",
      },
      {
        q: "Who owns the hosting accounts?",
        a: "You do. Everything is set up in your organisation's name, billed to you, with us added as collaborators. Removing us never puts your infrastructure at risk.",
      },
      {
        q: "What does hosting cost?",
        a: "It varies with traffic and what the application does. Most small to medium projects sit in the low tens of dollars a month. We size it during scoping rather than letting you find out from an invoice.",
      },
      {
        q: "Can you take over existing infrastructure?",
        a: "Yes. We audit what is running first and give you a written picture of the risks, then fix them in priority order.",
      },
    ],
    related: ["web-development", "systems-integration", "seo"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function relatedTo(service: ServicePage) {
  return service.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServicePage => Boolean(s));
}
