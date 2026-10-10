/**
 * Homepage copy for the connected devices positioning (see Redesign.md).
 *
 * One file so the voice stays consistent and the copy rules can be tested in
 * one place: plain sentences, no hyphenated compounds, no long dashes. Where
 * the brief marks a fact [FILL], the field is a `fill` question instead of a
 * guess, and the page renders it as a visible "to confirm" box.
 */

export const hero = {
  eyebrow: "Software for connected devices",
  lead: "From prototype",
  accent: "to product.",
  sub: "Your device works on the bench. We build the firmware, companion app, cloud and admin panel that make it a product, over BLE, MQTT and LoRa on AWS IoT Core.",
  primary: { label: "See how a build goes", href: "#how-it-works" },
  secondary: { label: "Watch a device we shipped", href: "#fuelguard" },
  /** The animated line in the hero visual, left to right. */
  flow: ["Device", "Phone or gateway", "Cloud", "Admin panel"],
};

/** Protocols and tools an engineer pattern matches on. Shipped with only. */
export const stack = [
  // Chip families the firmware team works with professionally.
  "STM32",
  "Nordic nRF",
  "ESP32",
  "RAKwireless",
  "BLE",
  "MQTT",
  "LoRa",
  "AWS IoT Core",
  "React Native",
  "Go",
  "Node.js",
  "PostgreSQL",
];

export const gap = {
  heading: "A working prototype is about a third of a connected product.",
  blocks: [
    {
      title: "Connections drop.",
      body: "Phones kill background Bluetooth. Without reconnect logic, users think the device is broken.",
      icon: "signal",
    },
    {
      title: "Data goes missing.",
      body: "A device that is offline for an hour needs somewhere to keep its readings and a clean way to sync them.",
      icon: "database",
    },
    {
      title: "Nobody can see the fleet.",
      body: "Once 500 units are in the field, someone needs a panel showing which are online, which are failing and why.",
      icon: "fleet",
    },
    {
      title: "The cloud bill surprises you.",
      body: "Message volume is predictable. It should be calculated before launch, not discovered after.",
      icon: "receipt",
    },
  ],
} as const;

export type SystemColumn = {
  name: string;
  owner: string;
  items: string[];
  runsOn: string;
  /** The client's own part of the system, drawn differently. */
  theirs?: boolean;
  fill?: string;
};

export const systemMap: {
  heading: string;
  columns: SystemColumn[];
  line: string;
} = {
  heading: "From firmware to fleet, in one picture",
  columns: [
    {
      name: "Device",
      owner: "Your hardware, our firmware",
      items: [
        "Firmware for your boards",
        "Sensor and radio drivers",
        "Message format we agree together",
      ],
      runsOn: "Your boards",
    },
    {
      name: "App",
      owner: "Built by us",
      items: ["Pairing", "Automatic reconnect", "Offline sync"],
      runsOn: "iOS and Android",
    },
    {
      name: "Cloud",
      owner: "Built by us",
      items: ["Secure onboarding", "Ingestion and storage", "Alerts"],
      runsOn: "AWS IoT Core, MQTT",
    },
    {
      name: "Admin",
      owner: "Built by us",
      items: ["Fleet view", "Users and roles", "Reports"],
      runsOn: "Web dashboard",
    },
  ],
  line: "One team from the firmware to the fleet.",
};

export const stages = {
  heading: "Where is your hardware today?",
  cards: [
    {
      title: "Still prototyping",
      body: "Software does not have to wait. We agree the data format with you and build against a simulated device, so the app and cloud are ready when the boards are.",
      href: "/#how-it-works",
      action: "See how a build goes",
    },
    {
      title: "Heading to production",
      body: "We size the backend for your launch numbers, set up device onboarding and get the app through store review.",
      href: "/blog/how-we-size-a-system-before-building-it",
      action: "How we size a launch",
    },
    {
      title: "Already shipping",
      body: "We fix dropped connections, add fleet monitoring and take over a codebase someone else left behind.",
      href: "/blog/why-ble-apps-disconnect-in-the-background",
      action: "Fixing dropped connections",
    },
  ],
};

export type BuildStep = {
  title: string;
  happens: string;
  receive: string;
  /** A small example of the deliverable, drawn beside the step. */
  sample?: "spec" | "sizing" | "admin";
  link?: { label: string; href: string };
};

export const buildSteps: BuildStep[] = [
  {
    title: "Data contract",
    happens:
      "We define what the device sends, how often and over which protocol, and write the firmware that sends it.",
    receive: "A one page message specification both teams sign off.",
    sample: "spec",
  },
  {
    title: "Sizing",
    happens:
      "We work out users, messages per second, storage and monthly cloud cost.",
    receive: "A sizing sheet with the arithmetic shown.",
    sample: "sizing",
    link: {
      label: "How we do the arithmetic",
      href: "/blog/how-we-size-a-system-before-building-it",
    },
  },
  {
    title: "Device to cloud",
    happens: "Secure device onboarding, ingestion, storage and alert rules.",
    receive: "A working pipeline you can send test data through.",
  },
  {
    title: "Companion app",
    happens:
      "Pairing, automatic reconnect, offline sync and the screens your users see.",
    receive: "Test builds on your phone every week.",
  },
  {
    title: "Admin panel",
    happens: "Fleet view, alerts, users and roles.",
    receive: "A staging link you can log into.",
    sample: "admin",
  },
  {
    title: "DevOps and handover",
    happens: "Pipelines, monitoring and documentation.",
    receive: "Repositories, cloud accounts and keys in your name.",
  },
];

export const fuelguard = {
  heading: "FuelGuard: catching fuel fraud at the dispenser.",
  problem:
    "Drivers, families and fleet owners paying for fuel see only the pump's own reading, with no way to check the tank received it. Stations had no record to prove honest fills or find repeated problems.",
  built:
    "An ESP32 device at the nozzle that measures every fill with its own flow meter and the dispenser's pulse signal at once, compared live every second. A Flutter app connects to it over the device's own WiFi, captures photo evidence and works without mobile signal. A FastAPI backend raises fraud alerts, and a Next.js admin panel gives stations a live view of every nozzle.",
  stack: ["ESP32", "Flutter", "FastAPI", "Firebase", "Next.js"],
  result:
    "Every fill is checked litre by litre, any gap above 0.05 litres is flagged, tampering is reported instantly, and firmware updates reach every device over the air.",
  confidential:
    "The client is not named here. Their identity is kept confidential under our agreement.",
  caseStudy: {
    label: "Read the full case study",
    href: "/case-studies/fuelguard-iot-fuel-monitoring",
  },
};

export const hardParts = {
  heading: "The hard parts, and how we handle them",
  notes: [
    {
      title: "Automatic reconnect that survives the phone's battery saver.",
      icon: "bluetooth",
      topic: "Companion apps",
      body: "Phones close background Bluetooth to save battery. We use the tools iOS and Android give connected devices, and the device keeps every reading until the app is back.",
      link: {
        label: "Read the article",
        href: "/blog/why-ble-apps-disconnect-in-the-background",
      },
    },
    {
      title: "Measuring latency end to end.",
      icon: "timer",
      topic: "Cloud and alerts",
      body: "Every message is timestamped at each hop, from the device to the alert. We watch the 95th and 99th percentiles, where the late alerts users notice show up.",
      link: {
        label: "Read the article",
        href: "/blog/measuring-iot-latency-end-to-end",
      },
    },
    {
      title: "Sizing for the launch you hope for.",
      icon: "trend",
      topic: "Backend sizing",
      body: "A launch planned for 50 users met 11,670. What decides whether a backend survives that, and what to check before the day arrives.",
      link: {
        label: "Read the article",
        href: "/blog/is-your-product-ready-for-sudden-growth",
      },
    },
  ],
};

export const teamFit = {
  heading: "We fit beside your hardware team.",
  points: [
    "We work from your firmware team's specification.",
    "White label delivery under your brand, if you are a design house.",
    "An NDA before any files change hands.",
    "A weekly demo on a staging link.",
  ],
};

export const howToStart = {
  heading: "A small first step, then the full build",
  steps: [
    {
      title: "Technical call",
      meta: "30 minutes, free",
      body: "You show us the device and the plan.",
    },
    {
      title: "Proof of concept",
      meta: "Fixed price, one to two weeks",
      body: "One device talking to the cloud and showing up on a screen.",
    },
    {
      title: "Full build",
      meta: "Fixed price",
      body: "A written scope and a fixed price within 48 hours of the call.",
    },
    {
      title: "Partnership",
      meta: "Monthly, if you want it",
      body: "We stay on to monitor the fleet, fix problems early and keep the cloud bill in check.",
    },
  ],
  promises: [
    "Fixed scope",
    "100% code ownership",
    "Written roadmap in 48 hours",
  ],
};

/** The monthly partnership: how most of our work continues after launch. */
export const partnership = {
  eyebrow: "After launch",
  lead: "Launch is where the",
  accent: "partnership starts.",
  intro:
    "We like to stay on as your technical partner once the devices are in the field. Every month we watch how the system is used, fix problems before your customers find them, and keep the running costs honest.",
  items: [
    {
      icon: "pulse",
      title: "Fleet and system monitoring",
      body: "Devices, app, cloud and panel watched every day, with alerts that reach us before they reach your users.",
    },
    {
      icon: "shield",
      title: "Problems fixed early",
      body: "Rising error rates, slow messages and failing units are spotted in the data and dealt with while they are still small.",
    },
    {
      icon: "coins",
      title: "A cloud bill that earns its keep",
      body: "We review usage every month and switch off any service that costs you money without adding value.",
    },
    {
      icon: "update",
      title: "Updates that keep it working",
      body: "Firmware updates over the air, app releases for new iOS and Android versions, and security patches.",
    },
    {
      icon: "report",
      title: "A short monthly report",
      body: "What we checked, what we changed, what it cost and what we suggest next.",
    },
  ],
  oneOff:
    "Prefer a single build? That works too. You receive the full handover, the code, the cloud accounts and the documentation, and you can come back for more whenever you need it.",
  cta: { label: "Ask about a monthly partnership", href: "/contact" },
};

export const otherWork = {
  line: "The same team builds web platforms and dashboards. A few that are live.",
  names: [
    { name: "IELTS Counsel", url: "https://ieltscounsel.com/" },
    { name: "Aeroflex", url: "https://www.aeroflex.pk/" },
    { name: "Nordic Relocators", url: "http://nordicrelocators.no/" },
    { name: "Sweden Relocators", url: "http://website.swedenrelocators.se/" },
    { name: "Relofy", url: "https://relofy.tech/" },
    { name: "Future Concerns", url: "http://futureconcerns.eu/" },
  ],
};

export const closing = {
  heading: "Show us your device.",
  line: "Send a spec sheet or book 30 minutes with an engineer. You get a written plan within 48 hours.",
};

/** The four services the services page leads with. */
export const deviceServices = [
  {
    name: "Companion apps",
    summary:
      "iOS and Android apps with pairing, automatic reconnect and offline sync, over BLE or LoRa.",
    href: "/#how-it-works",
  },
  {
    name: "Device to cloud",
    summary:
      "Secure device onboarding, ingestion, storage and alert rules on AWS IoT Core and MQTT.",
    href: "/#what-we-build",
  },
  {
    name: "Admin panels",
    summary:
      "A web dashboard with a fleet view, alerts, users and roles, and reports.",
    href: "/#what-we-build",
  },
  {
    name: "DevOps",
    summary:
      "Pipelines, monitoring and documentation, with repositories, cloud accounts and keys in your name.",
    href: "/#how-it-works",
  },
];
