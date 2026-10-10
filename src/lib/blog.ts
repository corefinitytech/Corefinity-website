import type { DiagramKey } from "@/components/blog/Diagrams";

/**
 * Blog content.
 *
 * Articles are structured blocks rather than raw HTML, so the rendering stays
 * consistent with the rest of the site and every diagram is a real component
 * instead of an image. Same rules as the service pages: no invented client
 * names, no numbers CoreFinity Tech cannot stand behind, no long dashes.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; items: string[] }
  | { type: "figure"; diagram: DiagramKey; caption: string }
  /** A supplied illustration, rather than one drawn in code. */
  | {
      type: "image";
      src: string;
      /** Describes the diagram for search engines and screen readers. */
      alt: string;
      width: number;
      height: number;
      caption: string;
    };

export type BlogPost = {
  slug: string;
  /** Metadata title, written for search intent. The brand is appended. */
  title: string;
  description: string;
  keywords: string[];
  /** Page heading, split so the tail carries the brand gradient. */
  headline: { lead: string; accent: string };
  /** Shown on the index card and beside the heading. */
  excerpt: string;
  topic: string;
  /**
   * Studio photograph shown on the cards and above the article. Lives in
   * public/blog/covers, 1200 by 800, on a deep navy backdrop.
   */
  cover: { src: string; alt: string };
  datePublished: string;
  /** Service pages this article naturally leads to. */
  services: string[];
  blocks: BlogBlock[];
  faqs: { q: string; a: string }[];
};

/** Backdrop behind the covers, the darkest tone of the studio photographs. */
export const COVER_PAPER = "#05070f";

export const posts: BlogPost[] = [
  {
    slug: "why-ble-apps-disconnect-in-the-background",
    title: "Why BLE Apps Disconnect in the Background",
    description:
      "Why phones drop Bluetooth connections in the background, how iOS state restoration and Android foreground services keep them alive, and how to stop data loss.",
    keywords: [
      "BLE app disconnects in background",
      "Android BLE foreground service",
      "iOS Core Bluetooth state restoration",
      "Companion Device Manager",
      "BLE reconnect",
      "companion app development",
    ],
    headline: {
      lead: "Your device did not break.",
      accent: "The phone closed the app.",
    },
    excerpt:
      "Most dropped Bluetooth connections come from the phone, not the firmware. Here is what iOS and Android do, and how to design around it.",
    topic: "Connected devices",
    cover: {
      src: "/blog/covers/ble-device-phone-asleep.webp",
      alt: "A Bluetooth wearable sensor with its lid open and a blue status LED glowing, beside a smartphone whose screen is switched off",
    },
    datePublished: "2026-10-10",
    services: [
      "mobile-app-development",
      "systems-integration",
      "cloud-deployment",
    ],
    blocks: [
      {
        type: "p",
        text: "A connected device is only as good as its connection to the phone. When that connection drops, the user does not blame the operating system. They blame the device, and often they return it.",
      },
      {
        type: "p",
        text: "Most dropped Bluetooth connections are not bugs in the firmware. They come from the phone itself, which closes background work to save battery. This guide covers what iOS and Android actually do, the tools each one gives you, and how to design a device and its app so a lost connection never loses data.",
      },
      {
        type: "h2",
        text: "Why phones close Bluetooth connections",
      },
      {
        type: "p",
        text: "Phones have small batteries and dozens of apps that would all like to run in the background. Apple and Google handle this the same way: once an app leaves the screen, the system limits what it can do, and after a while it stops the app entirely. A companion app holding a Bluetooth connection is exactly the kind of background work the system wants to stop.",
      },
      {
        type: "figure",
        diagram: "ble-app-states",
        caption:
          "Each step to the right gives the operating system more control over your app.",
      },
      {
        type: "p",
        text: "The four states matter because each one needs a different answer. Code that works perfectly while the app is on screen can fail the moment the screen locks, and testing on a desk with the app open will never show it.",
      },
      {
        type: "h2",
        text: "iOS: Core Bluetooth state restoration",
      },
      {
        type: "p",
        text: "On iOS, an app that declares the Bluetooth background mode keeps its connections while it is in the background. When memory runs low, the system may still suspend the app and then end it. State preservation and restoration is how Apple lets a Bluetooth app survive that. The app opts in when it creates its Bluetooth manager, and the system keeps track of its connections and pending requests on its behalf.",
      },
      {
        type: "p",
        text: "When the device reconnects, sends a notification or completes a pending request, iOS relaunches the app in the background and hands back the state it saved. The app has a short window to restore its Bluetooth manager and handle the event, so that code has to be fast and has to run before anything else at launch.",
      },
      {
        type: "callout",
        title: "What state restoration will not do",
        items: [
          "Relaunch an app the user swiped away in the app switcher.",
          "Relaunch an app after Bluetooth was turned off and on again in settings.",
          "Keep a connection the app never asked the system to restore.",
        ],
      },
      {
        type: "p",
        text: "The first point catches most teams out. When a user closes the app by swiping it away, iOS treats that as a clear instruction, and nothing in Core Bluetooth will bring the app back until the user opens it again.",
      },
      {
        type: "h2",
        text: "Android: a foreground service and the Companion Device Manager",
      },
      {
        type: "p",
        text: "Android gives an app more freedom in the background, and takes it away more suddenly. Without a foreground service, a backgrounded app usually loses its Bluetooth connection within minutes. A foreground service tells the system the app is doing work the user cares about, and shows a notification so the user knows it is running. On recent Android versions the service has to declare the connected device type and request the matching permission.",
      },
      {
        type: "p",
        text: "The Companion Device Manager goes a step further. When the user pairs the device through it, Android treats the app as the companion of that device and grants exemptions ordinary apps do not get, including permission to start its foreground service from the background when the device comes back into range. For a product that needs to stay connected all day, this is the most reliable route Android offers.",
      },
      {
        type: "h3",
        text: "Phone makers add their own battery rules",
      },
      {
        type: "p",
        text: "Some manufacturers ship battery savers that go further than stock Android and close apps even while a foreground service is running, sometimes within twenty minutes. The dependable answer is to detect these phones and walk the user through allowing the app to run unrestricted, at the moment it matters, with clear steps for their exact phone.",
      },
      {
        type: "h2",
        text: "Design the device for a missing app",
      },
      {
        type: "p",
        text: "Every technique above makes disconnections rarer. None of them makes disconnections impossible, so the device and the app have to treat a lost link as normal. The pattern that works is simple: the device stores readings it could not send, numbers each one, and sends them in order when the link returns.",
      },
      {
        type: "figure",
        diagram: "ble-sync",
        caption:
          "With sequence numbers, a reconnect is a short catch up instead of a guess.",
      },
      {
        type: "list",
        items: [
          "The device keeps readings in a buffer sized for the longest gap you expect, with a clear rule for what to drop if it fills.",
          "Each reading carries a sequence number and the time it was taken, so its place in the history is fixed whenever it arrives.",
          "On reconnect, the app asks for everything after the last number it confirmed, and the cloud ignores any number it has already stored.",
          "The app shows the user when data last synced, so a gap looks like a gap and the device does not look broken.",
        ],
      },
      {
        type: "h2",
        text: "How to test it before your users do",
      },
      {
        type: "p",
        text: "Background behaviour only shows up in testing that copies real life. Every companion app should go through the same set of situations on real phones, including at least one phone from each manufacturer known for aggressive battery saving.",
      },
      {
        type: "list",
        items: [
          "Lock the screen for an hour, then check every reading arrived.",
          "Leave the phone still overnight so it reaches its deepest power saving state.",
          "Walk out of range and back again.",
          "Swipe the app away, take readings, then open the app and check the sync.",
          "Turn Bluetooth off and on, and restart the phone.",
          "Update the app while the device is connected.",
        ],
        ordered: true,
      },
      {
        type: "p",
        text: "A test passes only when every reading taken during it reaches the cloud once, in the right order.",
      },
      {
        type: "p",
        text: "That is how we build companion apps at CoreFinity Tech. The firmware, the app and the cloud are designed together around one message format, so a dropped connection becomes a short delay the user barely notices. If your device is losing data in the background, send us a short description and we will tell you where it is likely breaking.",
      },
    ],
    faqs: [
      {
        q: "Why does my BLE device disconnect when the phone screen is off?",
        a: "Phones limit what apps can do in the background to save battery, and a companion app holding a Bluetooth connection is one of the first things they stop. iOS needs the Bluetooth background mode and state restoration, and Android needs a foreground service or the Companion Device Manager to keep the link alive.",
      },
      {
        q: "Can an iOS app reconnect to a BLE device after the user closes it?",
        a: "No. When a user swipes an iOS app away, Core Bluetooth will not relaunch it, even with state restoration enabled. The device should keep its readings and sync them the next time the app opens.",
      },
      {
        q: "What is the Companion Device Manager on Android?",
        a: "The Companion Device Manager is an Android system service for pairing an app with a specific device. Apps paired through it get exemptions ordinary apps do not, including starting a foreground service from the background, which makes all day connections far more reliable.",
      },
      {
        q: "How do you stop data loss when a Bluetooth connection drops?",
        a: "Store readings on the device while the link is down, give each one a sequence number, and sync everything after the last confirmed number when the connection returns. The cloud ignores numbers it has already stored, so nothing is lost and nothing is counted twice.",
      },
    ],
  },
  {
    slug: "measuring-iot-latency-end-to-end",
    title: "Measuring IoT Latency End to End",
    description:
      "How to measure IoT latency from the device to the alert: a timestamp at every hop, synced clocks, and percentiles that show the slow messages users notice.",
    keywords: [
      "IoT latency measurement",
      "end to end latency",
      "MQTT latency",
      "latency percentiles p95 p99",
      "NTP device clock sync",
      "IoT alert latency",
    ],
    headline: {
      lead: "Measure latency where",
      accent: "your users feel it.",
    },
    excerpt:
      "A dashboard can say 200 milliseconds while some alerts arrive a minute late. Here is how to see every hop, and every slow message.",
    topic: "Connected devices",
    cover: {
      src: "/blog/covers/gateway-stopwatch.webp",
      alt: "An industrial IoT gateway with blue status LEDs passing data, a precision stopwatch standing beside it",
    },
    datePublished: "2026-10-10",
    services: ["cloud-deployment", "systems-integration", "web-development"],
    blocks: [
      {
        type: "p",
        text: "When a device raises an alert, someone is waiting for it. A fuel pump reporting a fault, a freezer warming up, a door left open. The question that matters is simple: how long did it take from the moment it happened to the moment a person knew?",
      },
      {
        type: "p",
        text: "Most teams cannot answer that with confidence. They have one number from one place, usually an average, and it describes the system on a good day. This guide covers how to measure latency end to end, so you know where the time goes and how slow your slowest alerts really are.",
      },
      {
        type: "h2",
        text: "Where the time goes",
      },
      {
        type: "p",
        text: "A message from a connected device passes through several systems before it reaches anyone. Each one adds a little time, and each one can be the place where a delay starts.",
      },
      {
        type: "figure",
        diagram: "latency-hops",
        caption:
          "Five timestamps turn one total into five separate measurements.",
      },
      {
        type: "list",
        items: [
          "The device takes the reading and may wait to batch it with others.",
          "A phone or gateway receives it and forwards it, sometimes after reconnecting first.",
          "The broker, often MQTT on a service such as AWS IoT Core, accepts it and routes it.",
          "Rules and backend code decide whether it needs an alert.",
          "The alert goes out by push notification, SMS or email, each with its own delivery time.",
        ],
      },
      {
        type: "p",
        text: "Measure only the total, and a slow gateway looks exactly like a slow notification service. Measure hop by hop, and the slow one is obvious.",
      },
      {
        type: "h2",
        text: "Put a timestamp on every hop",
      },
      {
        type: "p",
        text: "The method is straightforward. The device writes the time it took the reading into the message itself. Every system the message passes through adds its own time as it handles it: when the broker received it, when the backend made its decision, when the alert was handed to the delivery service. Store those times with the message, and the delay of every hop becomes a subtraction.",
      },
      {
        type: "p",
        text: "Two rules keep this honest. Start from the time the event happened on the device, never the time the message arrived. And keep every timestamp in one fixed format, in UTC, with milliseconds, so times from different systems compare without conversion errors.",
      },
      {
        type: "h2",
        text: "Keep the clocks honest",
      },
      {
        type: "p",
        text: "Comparing a device time with a cloud time only works if both clocks agree. Device clocks drift, and a device that has been offline or restarted may not know the time at all.",
      },
      {
        type: "list",
        items: [
          "Sync the device clock over NTP when it connects, and record whether each reading was taken with a synced clock.",
          "Measure durations inside one system with a monotonic clock, which never jumps when the time is corrected.",
          "Flag messages whose device time is in the future or far in the past, and fall back to the time they were received.",
          "Keep cloud services on one time source, which managed cloud services already do.",
        ],
      },
      {
        type: "p",
        text: "With synced clocks, the gap between device and cloud is accurate to a few milliseconds, far finer than any delay a person would notice.",
      },
      {
        type: "h2",
        text: "Report percentiles, not averages",
      },
      {
        type: "p",
        text: "Latency is never spread evenly. Most messages are quick and a small share are slow, sometimes very slow, because of a weak signal, a reconnect or a busy service. An average blends them together and lands on a figure that describes almost no real message.",
      },
      {
        type: "figure",
        diagram: "latency-percentiles",
        caption:
          "The median describes a typical message. The 95th and 99th percentiles describe the alerts people complain about.",
      },
      {
        type: "p",
        text: "Percentiles answer better questions. The median is the time half your messages beat. The 95th percentile is the time all but one in twenty beat, and the 99th percentile all but one in a hundred. A fleet that sends ten thousand alerts a month has a hundred above its 99th percentile, and those are the ones users remember.",
      },
      {
        type: "h2",
        text: "Set a budget and alert on it",
      },
      {
        type: "p",
        text: "Once the hops are measured, give each one a share of the total delay you can accept. That split is a latency budget. A fault alert that must reach someone within ten seconds might allow two seconds on the device and gateway, one in the broker, two in the backend and five for delivery. The numbers differ for every product. Writing them down is what matters.",
      },
      {
        type: "callout",
        title: "What to watch once the fleet is live",
        items: [
          "The 95th and 99th percentile of total latency, every day.",
          "Each hop against its share of the budget.",
          "How many messages arrive without a synced device time.",
          "Every alert that took longer than the budget, listed one by one so each can be traced.",
        ],
      },
      {
        type: "p",
        text: "Treat latency like any other health signal. When a percentile moves past its budget, someone should hear about it before a customer does.",
      },
      {
        type: "p",
        text: "This is how we measure the systems we build at CoreFinity Tech. Every message is timestamped from the device to the alert, and the slow ones are tracked as closely as the typical ones. If you want to know how quickly your own alerts really arrive, send us a short description of the system and we will tell you what to measure first.",
      },
    ],
    faqs: [
      {
        q: "What is end to end latency in an IoT system?",
        a: "End to end latency is the time from an event happening on the device to the result reaching its destination, usually an alert or a dashboard. Measuring it means timestamping the message on the device and at every system it passes through.",
      },
      {
        q: "How do you measure IoT latency accurately?",
        a: "Write the device time into each message, have every system add its own timestamp as it handles the message, and keep device clocks synced over NTP. The difference between neighbouring timestamps is the time spent in each hop.",
      },
      {
        q: "Why use percentiles instead of the average for latency?",
        a: "Latency is uneven, with most messages fast and a few very slow, so an average hides the slow ones. The 95th and 99th percentiles show how long the slowest messages take, which is what users notice.",
      },
      {
        q: "What is a latency budget?",
        a: "A latency budget is the total delay a system can accept, split into a share for each hop between the device and the user. Watching each hop against its share shows exactly where a slowdown starts.",
      },
    ],
  },
  {
    slug: "how-to-evaluate-a-software-agency",
    title: "How to Evaluate a Software Agency",
    description:
      "A practical guide to choosing a software development company: what to check, what to ask on the first call, and the warning signs to walk away from.",
    keywords: [
      "how to choose a software development company",
      "hire a software agency",
      "questions to ask a software development company",
      "software agency red flags",
      "fixed price software development",
      "who owns the code software development",
    ],
    headline: {
      lead: "How to judge a software agency",
      accent: "before you sign anything.",
    },
    excerpt:
      "Every proposal says experienced, fast and affordable. Here is how to tell which one means it.",
    topic: "Hiring a software team",
    cover: {
      src: "/blog/covers/board-contract-pen.webp",
      alt: "A carefully assembled circuit board next to a blank contract and an uncapped fountain pen, before signing",
    },
    datePublished: "2026-10-04",
    services: ["web-development", "ui-ux-design", "mobile-app-development"],
    blocks: [
      {
        type: "p",
        text: "Hiring a software agency is a decision most business owners make once or twice, with real money and very little to compare. The proposals arrive looking alike. Everyone is experienced, everyone is fast, everyone cares about quality. By the third call it is hard to remember who said what.",
      },
      {
        type: "p",
        text: "You do not need to be technical to choose well. You need to know what to look at, what to ask, and which answers should make you pause. This guide covers all three, from the point of view of the person paying for the work.",
      },
      { type: "h2", text: "Write down the problem before you talk to anyone" },
      {
        type: "p",
        text: "Most poor agency choices start before the first call. Without a clear brief, every proposal answers a slightly different question, and you end up comparing prices for different projects. Half an hour spent on a short note saves weeks of confusion later.",
      },
      {
        type: "callout",
        title: "What your brief should cover",
        items: [
          "The problem you want solved, in one or two sentences.",
          "Who will use the software, and roughly how many people.",
          "What success looks like three months after launch.",
          "The budget range you are comfortable with.",
          "Any date that cannot move, such as a launch or a busy season.",
        ],
      },
      {
        type: "p",
        text: "You do not need technical detail. A good agency will turn your note into a technical plan. How they respond to it is your first piece of evidence: the best ones ask questions about it before they talk about price.",
      },
      { type: "h2", text: "Five things worth weighing" },
      {
        type: "figure",
        diagram: "agency-scorecard",
        caption:
          "Five checks that separate a capable agency from a confident pitch.",
      },
      { type: "h3", text: "Proof" },
      {
        type: "p",
        text: "Ask to see software that is live and in use, not only designs or screenshots. A named client, a working link and a case study that explains what changed for the business tell you far more than a page of logos. If you can, ask to speak to one of those clients for ten minutes.",
      },
      { type: "h3", text: "Process" },
      {
        type: "p",
        text: "Ask what happens between signing and launch. You want to hear about a short discovery stage where the requirements are tested, a written scope, regular demos you can click through yourself, and a clear point where you approve the work. An agency that cannot describe its process will improvise one on your project.",
      },
      { type: "h3", text: "Price" },
      {
        type: "p",
        text: "There are two common ways to charge. Hourly billing is flexible but leaves the final cost open. A fixed price for an agreed scope gives you a number you can plan around, as long as the scope is written down properly. Whichever you choose, ask how changes are priced, because changes are where most budgets grow.",
      },
      { type: "h3", text: "Ownership" },
      {
        type: "p",
        text: "At the end of the project you should own the source code, the design files, the hosting account, the domain and the database. Ask for this in the contract, and ask for access to the code repository from the first week. Software you cannot take elsewhere keeps you tied to one supplier for as long as it runs.",
      },
      { type: "h3", text: "People" },
      {
        type: "p",
        text: "Find out who will actually build your product and whether you can talk to them directly. Some agencies sell with a senior team and deliver with a different one. Short lines of communication mean fewer misunderstandings and faster answers when something needs a decision.",
      },
      { type: "h2", text: "Questions to ask on the first call" },
      {
        type: "p",
        text: "These questions are simple, and the answers are revealing. Write down what each agency says so you can compare them side by side afterwards.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "What would you need to know before giving us a price?",
          "Can you show us something similar you built that is live today?",
          "Who will work on our project, and will we speak to them directly?",
          "What does the first month look like, week by week?",
          "How do you handle a change to the scope halfway through?",
          "Who owns the code, the hosting and the accounts when you finish?",
          "What happens after launch if something breaks?",
          "What would you advise us not to build?",
        ],
      },
      {
        type: "p",
        text: "The last question is the most useful. An agency that can tell you what to leave out is thinking about your budget and your users.",
      },
      { type: "h2", text: "Good signs and warning signs" },
      {
        type: "figure",
        diagram: "agency-signals",
        caption:
          "None of these settles the decision alone, but a pattern usually does.",
      },
      {
        type: "p",
        text: "One warning sign is not a reason to walk away. A small agency may not have many named clients yet, and a new one may still be refining how it works. What matters is the pattern. If several of the signs on the right appear together, take that seriously.",
      },
      { type: "h2", text: "Comparing quotes that look nothing alike" },
      {
        type: "p",
        text: "Quotes are hard to compare because each agency includes different things. One price covers design, testing and the first month of support. Another covers development only and adds the rest later. Before comparing numbers, check every quote against the same list.",
      },
      {
        type: "list",
        items: [
          "Is design included, or only development?",
          "Is testing on real phones and browsers included?",
          "Who sets up the hosting, and who pays for it?",
          "How many rounds of changes are included?",
          "What support is included after launch, and for how long?",
          "When are payments due, and what is each one tied to?",
        ],
      },
      {
        type: "p",
        text: "Once the quotes cover the same work, the real differences become clear. The cheapest quote is often the one that left the most out.",
      },
      { type: "h2", text: "What a good first month looks like" },
      {
        type: "p",
        text: "The first few weeks show you whether you chose well. By the end of the first month with a capable agency you should have a written scope you have approved, a working link where you can see progress, a short demo every week or two, and access to the code from day one. If any of those are missing, raise it early, while changing direction is still cheap.",
      },
      {
        type: "p",
        text: "This is how we run projects at CoreFinity Tech. Every engagement starts with a written scope and a fixed price, the client owns the code and the accounts from the start, and progress is shown on a live link you can open at any time. Our IELTS Counsel case study shows what that looks like on a real project.",
      },
    ],
    faqs: [
      {
        q: "How do I choose a software development company?",
        a: "Start with a short written brief so every agency answers the same question. Then compare them on proof of live work, a clear process, how the price is set, who owns the result, and who you will actually work with.",
      },
      {
        q: "What questions should I ask a software agency before hiring?",
        a: "Ask what they need to know before pricing, to see similar live work, who will build it, how scope changes are handled and who owns the code at the end. Also ask what they would advise you not to build, since the answer shows whether they are thinking about your budget.",
      },
      {
        q: "Is a fixed price or an hourly rate better for software development?",
        a: "A fixed price for a written scope gives a cost you can plan around, while hourly billing stays flexible but leaves the total open. Either works when changes are priced clearly in advance.",
      },
      {
        q: "Who owns the code when an agency builds my software?",
        a: "Ownership depends on the contract, so agree it in writing before work starts. The client should own the source code, design files, hosting, domain and database, with access to the code repository from the first week.",
      },
      {
        q: "What are the warning signs of a bad software agency?",
        a: "Common warning signs are a price given before any real questions, no live work to show, a vague scope, code or hosting kept in the agency's name, and agreement with every request. One sign alone is not decisive, but several together are worth taking seriously.",
      },
    ],
  },
  {
    slug: "how-we-size-a-system-before-building-it",
    title: "How We Size a System Before We Build It",
    description:
      "The questions we ask before any code gets written: how many people at once, what they are doing, and the arithmetic that turns those answers into a build.",
    keywords: [
      "how many users can a website handle",
      "concurrent users",
      "capacity planning for web applications",
      "system design for business",
      "peak traffic calculation",
      "scalable architecture planning",
    ],
    headline: {
      lead: "Before we build anything,",
      accent: "we do the arithmetic.",
    },
    excerpt:
      "How big should we build this? Ask three developers and you get three confident answers. We would rather work it out on paper.",
    topic: "How we work",
    cover: {
      src: "/blog/covers/bare-board-calipers.webp",
      alt: "An empty, unpopulated circuit board held in steel vernier calipers, measured before anything is built on it",
    },
    datePublished: "2026-09-25",
    services: ["web-development", "cloud-deployment", "systems-integration"],
    blocks: [
      {
        type: "p",
        text: "Every project runs into the same awkward question, usually about ten minutes into the first call. How big should we build this? Ask three developers and you will get three confident answers, none of them written down, each one shaped by whatever the last project happened to need.",
      },
      {
        type: "p",
        text: "We would rather do arithmetic. Not difficult arithmetic. The kind you can do on the back of an envelope while the kettle boils, using numbers that come from your business rather than from somebody's instinct about what a modern system ought to look like.",
      },
      { type: "h2", text: "The questions come before the technology" },
      {
        type: "p",
        text: "Before anyone draws a box or argues about a database, we ask a short list of questions. None of them are technical. You already know most of the answers, and the ones you do not know usually turn out to be worth finding out anyway.",
      },
      {
        type: "figure",
        diagram: "sizing-inputs",
        caption:
          "Answers on the left decide the choices on the right. Change one and the other side moves with it.",
      },
      { type: "h3", text: "How many people, and when do they turn up" },
      {
        type: "p",
        text: "Monthly visitors is a number for investors. It tells us very little. Thirty thousand a month spread evenly is one person every ninety seconds, which almost anything can handle. Thirty thousand a month where eight thousand arrive the morning tickets go on sale is a completely different piece of software. The busiest hour is the system you are actually paying for. The rest of the month is quiet by comparison.",
      },
      { type: "h3", text: "What are they doing while they are there" },
      {
        type: "p",
        text: "Reading is cheap. Writing is expensive. Somebody browsing twenty pages costs less than somebody finishing one checkout, because the checkout has to check stock, take money, write a record and send a confirmation, and it has to manage all of that without ever ending up half done. So we count actions, not visitors.",
      },
      { type: "h3", text: "How much data is there, and how fast does it grow" },
      {
        type: "p",
        text: "A search across five hundred records is instant however badly it is written. The same search across five million is a different experience entirely. Most of the slow systems we get asked to look at were not slow when they launched. They simply filled up, quietly, over about two years.",
      },
      { type: "h3", text: "How quickly does it need to feel" },
      {
        type: "p",
        text: "Fast is not a plan. A number is. Under a second for a page, a couple of seconds for a search, ten seconds for a report nobody sits and watches. Once those are written down they can be tested, and everybody stops arguing from taste.",
      },
      { type: "h3", text: "What must never fail, and what can wait" },
      {
        type: "p",
        text: "Not every part deserves the same protection. If the payment path stays up while a dashboard graph goes missing for an hour, most businesses get through the afternoon comfortably. Reverse it and nobody is comfortable. Knowing which is which changes where the effort goes, and usually saves money.",
      },
      { type: "h3", text: "What does it lean on that you do not control" },
      {
        type: "p",
        text: "Payment providers, SMS gateways, calendars, delivery partners. Each has its own limits, and the moment you depend on one, their ceiling becomes your ceiling. Far better to know that number in advance than to learn it during your best hour of trading.",
      },
      { type: "h3", text: "What is it allowed to cost to run" },
      {
        type: "p",
        text: "Monthly hosting is a design input, not a surprise on a card statement. Tell us the budget early and the design bends around it. Mention it after launch and something has to be unpicked.",
      },
      { type: "h2", text: "Then we do the sums" },
      {
        type: "p",
        text: "Here is the entire method, on a launch that expects ten thousand visits in its first day.",
      },
      {
        type: "figure",
        diagram: "peak-math",
        caption:
          "Four steps from a headline number to a figure you can build against, then a multiplier for the fact that people do not arrive in an orderly queue.",
      },
      {
        type: "p",
        text: "Two requests a second. That is the honest answer, and it tends to disappoint people who were braced for something more dramatic. Two a second is not much at all. But traffic clumps rather than spacing itself out politely, so we design for several times that, somewhere between eight and twenty a second in this example. We would rather carry headroom we never use than go looking for it at ten past nine on launch morning.",
      },
      {
        type: "p",
        text: "The arithmetic is not the clever part. The clever part is that it exists on paper, where you can disagree with it. If you think ten thousand is optimistic, or that the rush lasts thirty minutes rather than two hours, say so and the numbers move. Nobody has to take anybody's word for anything.",
      },
      { type: "h2", text: "What the three layers are actually doing" },
      {
        type: "p",
        text: "Nearly everything we build has three parts, and it helps to know who talks to whom, because that is what explains where things pile up when it gets busy.",
      },
      {
        type: "figure",
        diagram: "layers",
        caption:
          "The customer only ever talks to the first box. The other two do the work, in that order, every single time.",
      },
      {
        type: "p",
        text: "The screen never speaks to the database directly. It asks the backend, the backend decides whether that request is allowed and who is making it, and only then does the database get involved. It looks like a detour. It is the reason your data does not walk out of the building the first time somebody curious starts poking at the page.",
      },
      {
        type: "p",
        text: "It is also where capacity lives. The frontend usually copes with far more people than the rest of the chain. The middle hop is where a queue forms first, which is why we size the backend and the database together and never one without the other.",
      },
      { type: "h2", text: "Headroom is a decision, not a feeling" },
      {
        type: "p",
        text: "We aim for something that can absorb roughly five to ten times the expected peak without needing to be redesigned. That range covers nearly every launch that goes well. Past that point you are buying insurance against a scenario nobody can describe, and paying for it every month until you stop.",
      },
      {
        type: "quote",
        text: "The goal is not a system that cannot break. It is knowing what breaks first, and how long it takes to add room.",
      },
      { type: "h2", text: "Capacity gets added in stages" },
      {
        type: "p",
        text: "You do not need all of this on day one, and buying it early is how budgets quietly disappear. Each stage has a signal that says it is time. Until the signal shows up, the stage is a cost with nothing to show for it.",
      },
      {
        type: "figure",
        diagram: "capacity-ladder",
        caption:
          "Five steps, each triggered by something real rather than by a plan written a year earlier.",
      },
      {
        type: "p",
        text: "Plenty of products sit happily on the first two steps for years. We have also seen teams jump straight to the last one before they had a single customer, because that is what big companies do, and then spend their budget maintaining a shape nobody needed yet. Taken in order, in response to something that has actually happened, these steps are cheap.",
      },
      { type: "h2", text: "The part where we try to break it" },
      {
        type: "p",
        text: "Before launch, a copy of the system gets a rehearsal. Thousands of pretend customers do what real ones are about to do, all at once, while nobody is watching. It gives us the measured number rather than the calculated one, and the two are never quite the same. Finding the limit on a quiet Tuesday costs nothing. Finding it on launch day costs customers.",
      },
      { type: "h2", text: "What you end up holding" },
      {
        type: "list",
        items: [
          "A number: how many people at once, comfortably, with the working shown.",
          "The name of the first thing that will give way, and a rough idea of when.",
          "Which stage you are on, and what the next one would cost.",
          "Alerts set below the limit, so a warning arrives before a problem does.",
          "A plan for the day demand goes past all of it, because occasionally it will.",
        ],
      },
      {
        type: "p",
        text: "None of that makes a product exciting. It makes a launch boring, which is the correct ambition for a launch.",
      },
      {
        type: "p",
        text: "If you already have something running and nobody has ever done this arithmetic for it, you are in the majority. Working out where you currently stand is usually a short piece of work, and it is a fair amount of what we get asked for.",
      },
    ],
    faqs: [
      {
        q: "How many users should a new web application be built for?",
        a: "Build for the busiest hour rather than the monthly total, then allow five to ten times that as headroom. For most new products the resulting number is smaller than people expect, and it comes from the launch plan rather than from ambition.",
      },
      {
        q: "What does concurrent users mean?",
        a: "Concurrent users means the number of people using a system in the same moment, rather than across a day or a month. A thousand people spread over a day and a thousand arriving in one minute are completely different loads, and only the second one decides how much capacity is needed.",
      },
      {
        q: "How do you calculate peak traffic for a website?",
        a: "Start with the visits expected on the busiest day, estimate the share arriving in the busiest hour or two, divide that down to a figure per second, then multiply by the number of actions each visitor performs. Multiply the result again by four or more, because real traffic arrives in bursts.",
      },
      {
        q: "Does designing for scale cost more at the start?",
        a: "Designing for scale costs very little when it is arithmetic and a few sensible choices made early. Building infrastructure for users who do not exist yet is the expensive version, which is why capacity is best added in stages as real signals appear.",
      },
    ],
  },
  {
    slug: "is-your-product-ready-for-sudden-growth",
    title: "Is Your Product Ready for Sudden Growth?",
    description:
      "Your biggest growth moment can break the product that earned it. A plain English look at scalability, bottlenecks, and what to check before the demand arrives.",
    keywords: [
      "website scalability",
      "can my website handle traffic",
      "scalable web application",
      "traffic spike website crash",
      "application bottleneck",
      "load testing for business",
    ],
    headline: { lead: "Success should not break", accent: "what you built." },
    excerpt:
      "You planned for 50 users. 11,670 turned up. The good news and the bad news are the same sentence.",
    topic: "Growth and scalability",
    cover: {
      src: "/blog/covers/gateway-fleet.webp",
      alt: "One IoT gateway in front of a vast grid of identical sensor devices, every one glowing blue and online",
    },
    datePublished: "2026-09-24",
    services: ["web-development", "cloud-deployment", "systems-integration"],
    blocks: [
      {
        type: "p",
        text: "Nobody builds a product hoping it stays quiet. You build it because you want people to use it, and somewhere in the back of your mind there is a day when they finally do. The launch that works. The post that travels further than expected. The partnership that puts you in front of an audience you did not have last month.",
      },
      {
        type: "p",
        text: "Here is the part that rarely gets discussed. That day is also the first time your software is properly tested. Not by you, not by your developer, but by real people all arriving at the same time. And how that day goes was largely decided months earlier, by decisions nobody wrote down and nobody thought were important at the time.",
      },
      { type: "h2", text: "The day the plan stops being true" },
      {
        type: "p",
        text: "Picture a launch built around a sensible number. Fifty people in the first week. Enough to prove the idea, small enough that nothing feels risky. Then something works better than anyone expected, and 11,670 people want in.",
      },
      {
        type: "figure",
        diagram: "growth-spike",
        caption:
          "The plan assumed a gentle climb. Real demand does not always ask permission.",
      },
      {
        type: "p",
        text: "Read that number again, because the interesting part is not the number itself. Eleven thousand people wanting what you made is not a problem. That is the outcome every business says it wants, the one you spent money on advertising to get. The problem is the hour that follows, when the system built for fifty tries to serve all of them at once.",
      },
      {
        type: "quote",
        text: "Your success and your breaking point can arrive in the same afternoon.",
      },
      { type: "h2", text: "Working and ready are not the same thing" },
      {
        type: "p",
        text: "Most business owners judge their software by one question: does it work? It is a fair question, and the answer is usually yes. The site loads, orders go through, the team uses it every day. So the box is ticked and attention moves elsewhere.",
      },
      {
        type: "p",
        text: "But working is only the first of three states, and the distance between them is where growth gets lost.",
      },
      {
        type: "callout",
        title: "Three different claims about the same product",
        items: [
          "It works. Today, at today's volume, with today's customers.",
          "It can handle growth. More people, arriving at the pace you expect.",
          "It can handle growth you did not see coming. Ten times the traffic, in an hour, without warning.",
        ],
      },
      {
        type: "p",
        text: "Almost every product can make the first claim. Far fewer can make the third. And nobody finds out which one they own on a normal Tuesday. They find out on the best day their business has ever had.",
      },
      { type: "h2", text: "What actually happens when someone signs up" },
      {
        type: "p",
        text: "To see where things break, it helps to know what one ordinary action really involves. A customer taps a button. From their side, that is one moment. Behind it, several separate pieces of software have to talk to each other and agree.",
      },
      {
        type: "figure",
        diagram: "signup-flow",
        caption:
          "One tap, five handovers. Each step waits for the one before it to answer.",
      },
      {
        type: "p",
        text: "While things are quiet, this whole chain finishes faster than the customer can notice. That is the experience you tested, the one you signed off, the one that felt fine. Nothing in it hints at what happens when the same chain has to run eleven thousand times in the same hour.",
      },
      { type: "h2", text: "One slow step is enough" },
      {
        type: "p",
        text: "Think about a small restaurant with six tables. The food is good, the service is quick, and on any normal evening the kitchen is comfortable. Now a hundred people walk in together. The chairs are not the problem. The menu is not the problem. There is one cook, and everything now waits on that cook.",
      },
      {
        type: "p",
        text: "Software behaves the same way. The chain is only as quick as its slowest link, and under pressure one part always gives way first.",
      },
      {
        type: "figure",
        diagram: "bottleneck",
        caption:
          "The parts that are coping are not the ones that decide the outcome. The slowest step sets the pace for everyone.",
      },
      {
        type: "p",
        text: "This is why the common instinct, buy a bigger server, so often disappoints. A bigger kitchen does not help if there is still one cook. Worse, the weak point moves. Fix the database today and the payment provider becomes the limit next month. Different parts of a system run out of room at different stages of growth, which is why this is a question of design rather than a question of spending.",
      },
      { type: "h2", text: "Your customer never sees the reason" },
      {
        type: "p",
        text: "Inside the business, an outage has a story. Traffic was unusual, a service was slow, somebody is fixing it, it will be back shortly. It feels explainable, almost forgivable.",
      },
      {
        type: "p",
        text: "The customer has none of that. They do not know your database is under strain. They do not know you are having your best day. They see a page that will not load, a payment that will not go through, a form that spins and then forgets what they typed.",
      },
      {
        type: "figure",
        diagram: "customer-journey",
        caption:
          "Four steps, each one holding fewer people than the last. From inside the business, this drop is invisible.",
      },
      {
        type: "p",
        text: "And they do not file it under technical difficulty. They file it under this does not work, which quietly becomes this company does not work.",
      },
      { type: "h2", text: "The real cost is not the downtime" },
      {
        type: "p",
        text: "When people count the cost of an outage, they count the hours it lasted. That is the cheapest part of it. The expensive part walked away without telling you.",
      },
      {
        type: "list",
        items: [
          "Signups that were half completed and never finished.",
          "Orders and bookings abandoned at the last step, with money in hand.",
          "Advertising spend that delivered people to a page that would not open.",
          "First impressions, which you only ever get one of.",
          "Trust, which takes far longer to rebuild than a server takes to restart.",
          "Customers who found an alternative that day and never had a reason to come back.",
        ],
      },
      {
        type: "p",
        text: "A technical fault can be fixed in an afternoon. The person who met your product at its worst moment is not waiting for that fix. This matters most when the broken moment is also the first moment, because for that customer it is not a bad day, it is simply who you are.",
      },
      { type: "h2", text: "Growth rarely arrives politely" },
      {
        type: "p",
        text: "Plans tend to assume an orderly climb. Fifty, then a hundred, then two hundred, then five hundred, with time to react between each step. Real demand is lumpier than that. A single post travels. A publication mentions you. A partner emails their list. An advert finally finds the right audience.",
      },
      {
        type: "p",
        text: "You cannot schedule those moments, which is exactly why they are worth preparing for. The whole point of a good launch is that you do not control how well it goes.",
      },
      { type: "h2", text: "What actually helps, in plain terms" },
      {
        type: "p",
        text: "None of this needs a big budget or a rebuild. Most of it is a handful of habits, and each one answers a question you would otherwise be answering live, in front of customers.",
      },
      { type: "h3", text: "Rehearse the busy day before it arrives" },
      {
        type: "p",
        text: "You can imitate a crowd. A load test sends thousands of pretend customers at the system on a quiet Tuesday and shows you exactly where it slows down and what gives way first. It turns an argument about opinions into a number you can plan around, and it is far cheaper than finding out during a campaign.",
      },
      { type: "h3", text: "Let the system tell you, not your customers" },
      {
        type: "p",
        text: "Something should be checking speed and errors continuously, and something should message a human when the numbers drift. Most damaging outages are not sudden. They creep, and a complaint from a customer is a slow, expensive alarm clock.",
      },
      { type: "h3", text: "Make sure one broken part is not the whole shop" },
      {
        type: "p",
        text: "Systems fail in pieces, and that is fine if you plan for it. If the recommendations stop working, checkout should still take money. If the email provider is down, the order should still be recorded and the email sent later. Keeping the money path alive while a side feature rests is a design decision, made long before the bad afternoon.",
      },
      { type: "h3", text: "Let capacity follow demand, not your best guess" },
      {
        type: "p",
        text: "Hosting can add capacity as the queue grows and release it when the rush passes. That way you pay for a crowd on the days you have one, instead of paying all year for a crowd that visits twice.",
      },
      { type: "h3", text: "Keep the busiest pages cheap to serve" },
      {
        type: "p",
        text: "At peak, most people ask for the same handful of pages. Serving a ready made copy of those, rather than rebuilding them for every visitor, removes a large share of the pressure for very little effort. It is the cheapest win available in most projects.",
      },
      { type: "h3", text: "Decide now what you will do at 2am" },
      {
        type: "p",
        text: "Write the short version down: who gets called, what gets switched off first, what you tell customers, and how you know it is over. An hour of confusion during an incident costs more than the incident, and nobody thinks clearly while the phone is going.",
      },
      {
        type: "figure",
        diagram: "readiness-loop",
        caption:
          "Measure, rehearse, fix the step that gave way, then watch. Each pass raises the ceiling, which is why it is worth repeating before every growth event.",
      },
      {
        type: "p",
        text: "The loop matters more than any single fix. Raise one limit and the next one appears somewhere else, which sounds discouraging but is actually the useful part: the ceiling moves in a direction you chose, at a pace you control, rather than arriving as a surprise.",
      },
      {
        type: "callout",
        title: "A sensible rhythm for a growing business",
        items: [
          "Before anything that could bring a crowd: a campaign, a launch, press coverage or a partnership.",
          "After any change to the parts that carry money: payments, signups, bookings or the database.",
          "Every few months while you are growing, because the limit moves as the product changes.",
          "After every incident, while the detail is still fresh and the lesson is free.",
        ],
      },
      { type: "h2", text: "Nine questions worth asking before the spike" },
      {
        type: "p",
        text: "You do not need to be technical to ask these. You only need someone who can answer them honestly.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "How many people can our system comfortably serve at the same time today?",
          "What happens if demand is ten times higher than our best month?",
          "What happens if all of that arrives within one hour rather than one week?",
          "Which part gives way first, and how do we know?",
          "If one piece fails, does the whole product stop, or does the rest keep working?",
          "Are we watching performance, or will a customer be the one who tells us?",
          "Will we get a warning as we approach the limit, or only after we pass it?",
          "Has anyone tested this with realistic traffic, rather than assumed it?",
          "If demand goes beyond our plan, what is the plan?",
        ],
      },
      {
        type: "p",
        text: "If nobody in the business can answer three of those, that is worth knowing now, while it is a calm conversation rather than an emergency.",
      },
      { type: "h2", text: "This is not an argument for overbuilding" },
      {
        type: "p",
        text: "It would be easy to read all of this as build for millions from day one. That advice wastes money and slows you down, and for most businesses it is simply wrong. Infrastructure sized for an audience you do not have is a cost with no return.",
      },
      {
        type: "p",
        text: "The useful goal is narrower. Know roughly where your ceiling sits. Know which part reaches it first. Have a route to more capacity that does not involve rebuilding the product under pressure. That is a few sensible decisions early, not a large budget. The difference between a business that absorbs a spike and one that is flattened by it is rarely money. It is usually whether anyone thought about it in advance.",
      },
      { type: "h2", text: "Prepare for success, not just survival" },
      {
        type: "p",
        text: "You did not build your product hoping nobody would use it. You built it hoping the opposite. So when the moment finally comes, and it may come with no notice at all, the technology should be the part that lets you say yes.",
      },
      {
        type: "p",
        text: "Growth should open a bigger opportunity. It should not quietly become a bigger problem.",
      },
      {
        type: "p",
        text: "That is usually the work we are asked for at CoreFinity Tech: understanding what is really happening behind a product, finding the step that gives way first, and planning a path that grows with the business rather than against it. Sometimes that means building something new. Often it just means knowing where you stand before the busy day arrives.",
      },
    ],
    faqs: [
      {
        q: "What does scalability mean for a business?",
        a: "Scalability means a product keeps working properly as more people use it at the same time. A scalable system serves ten times the customers without becoming slow or unavailable, which is what turns a growth moment into revenue instead of complaints.",
      },
      {
        q: "How do I know if my website can handle more traffic?",
        a: "Test it rather than assume it. A load test simulates thousands of simultaneous visitors and shows which part slows down first, and monitoring shows how close the system runs to that limit day to day. Without both, the first real answer comes from customers.",
      },
      {
        q: "Does scalability just mean buying a bigger server?",
        a: "No. A bigger server helps only if the server is the limit, and often it is not. Bottlenecks move between the database, outside services and the application itself as traffic grows, so capacity is a question of design and measurement rather than spending.",
      },
      {
        q: "How can a business reduce downtime during a traffic spike?",
        a: "Rehearse the peak with a load test so the weak step is known in advance, monitor speed and errors so problems surface before customers report them, and design so one failed part does not stop the rest. Hosting that adds capacity as demand grows absorbs most of what is left.",
      },
      {
        q: "When should a small business think about scalability?",
        a: "Before any event that could bring a surge: a launch, a campaign, a partnership or press coverage. Checking capacity while everything is calm takes a fraction of the effort of fixing an overloaded system while customers are watching.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/** Rough reading time, from the words actually rendered on the page. */
export function readingMinutes(post: BlogPost) {
  const words = post.blocks
    .flatMap((b) => {
      if (b.type === "list") return b.items;
      if (b.type === "callout") return [b.title, ...b.items];
      if (b.type === "figure" || b.type === "image") return [b.caption];
      return [b.text];
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** The next article to read, wrapping round. Null while only one exists. */
export function nextPost(post: BlogPost) {
  const ordered = postsByDate();
  if (ordered.length < 2) return null;
  const i = ordered.findIndex((p) => p.slug === post.slug);
  return ordered[(i + 1) % ordered.length];
}

/** Newest first, for the index. */
export function postsByDate() {
  return [...posts].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
}
