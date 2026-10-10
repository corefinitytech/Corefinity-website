/**
 * Shared by the FAQ section and the FAQPage structured data, so what Google
 * and an LLM read is always exactly what a visitor reads.
 *
 * Answer engines lift these verbatim, so every answer must stand alone: name
 * the subject, answer in the first sentence, three sentences at most.
 *
 * Questions the redesign brief marks [FILL] carry a `pending` note instead of
 * an answer. The page shows them as "to confirm", and they are kept out of the
 * structured data and llms.txt until a real answer replaces the note.
 */
export type Faq = { q: string; a: string };
export type HomeFaq = { q: string; a?: string; pending?: string };

export const homeFaqs: HomeFaq[] = [
  {
    q: "My hardware is not finished. Can CoreFinity Tech start now?",
    a: "Yes. CoreFinity Tech agrees the data format with your team and builds the app and cloud against a simulated device, so the software is ready when the boards are.",
  },
  {
    q: "Does CoreFinity Tech write firmware?",
    a: "Yes. CoreFinity Tech has its own firmware team, so the device code, the companion app, the cloud and the admin panel are built by one team working from one message format.",
  },
  {
    q: "Which protocols and chips has CoreFinity Tech worked with?",
    a: "CoreFinity Tech's firmware team works professionally with STM32, Nordic nRF, Espressif ESP32 and RAKwireless modules, over BLE, MQTT and LoRa. The app and cloud are built to the same message format as the firmware.",
  },
  {
    q: "Can CoreFinity Tech take over an app or backend another team started?",
    a: "Yes. CoreFinity Tech reviews the existing code, fixes dropped connections and missing monitoring first, then carries on building from where the previous team stopped.",
  },
  {
    q: "Who owns the code and the cloud accounts in a CoreFinity Tech project?",
    a: "The client owns everything CoreFinity Tech builds. Repositories, cloud accounts and keys are set up in the client's name, and nothing stays locked to CoreFinity Tech.",
  },
  {
    q: "How does CoreFinity Tech handle security and device onboarding?",
    a: "Each device gets its own X.509 certificate and connects to AWS IoT Core over mutual TLS, with a policy that only lets it use its own topics. Firmware updates are signed and verified on the device before they install, keys are kept in secure storage, and data is encrypted in transit and at rest. A lost or compromised device is cut off by revoking its certificate, with no effect on the rest of the fleet.",
  },
  {
    q: "Can CoreFinity Tech work under a design house's brand?",
    a: "Yes. CoreFinity Tech delivers white label work under the design house's brand, signs an NDA before any files change hands, and builds from the hardware team's own specification.",
  },
  {
    q: "Does CoreFinity Tech stay on after launch?",
    a: "Yes. CoreFinity Tech prefers to stay on as a monthly technical partner, covering monitoring, early fixes, updates and a monthly review of cloud costs. Single builds are welcome too, with the full code, accounts and documentation handed over at the end.",
  },
  {
    q: "Where is CoreFinity Tech based, and how quickly does the team reply?",
    a: "CoreFinity Tech is based in Islamabad, Pakistan, and works remotely with hardware teams worldwide. Messages get a reply within one business day, and calls are booked at a time that suits the client's working day.",
  },
];

/** Answered questions only: these feed the structured data and llms.txt. */
export const faqs: Faq[] = homeFaqs.filter(
  (f): f is Faq => typeof f.a === "string" && !f.pending,
);
