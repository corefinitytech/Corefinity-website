# corefinity.tech homepage redesign

**Goal:** a hardware founder or a design-house CTO lands on the homepage and, within one scroll, thinks "these people build the software side of devices, and they clearly know how it goes." By the bottom of the page they understand the whole process and have seen proof.

**One service:** app, cloud and admin software for connected devices (BLE / MQTT / LoRa, AWS IoT Core, web admin panels, DevOps).

**Two readers to write for:**

1. A hardware founder (like the wristband client) who has a device in development and does not know what the software side involves.
2. An engineering lead at a hardware design house who needs an app and cloud partner for their own clients.

Anything marked `[FILL]` needs a real fact from you. Do not publish a guess in its place.

---

## 1. What the current site says

| Area | Today | Problem for a hardware visitor |
|---|---|---|
| Page title and H1 | "Custom software development company: Architecting High Performance Digital Platforms" | Could be any agency. No device, no protocol, no cloud. |
| Sub-headline | Web platforms, operations dashboards, automated workflows for companies that outgrew spreadsheets | Speaks to an office manager, not an engineer. |
| Stack strip | Next.js, React Native, TypeScript, Python, Node.js, PostgreSQL, Stripe, Vercel | No BLE, MQTT, LoRa or AWS IoT Core anywhere on the site. |
| Capabilities | Nine cards including SEO, AI chatbots, Python scraping, direct booking | Reads as a generalist. The relevant ones (mobile, cloud, integration) are buried. |
| Shopify section | Full section on the homepage | Actively signals "web agency". |
| Pricing | Prototype Sprint (10 to 14 days), Platform OS (3 to 4 weeks) | Website timelines. A device project cannot be promised like this. |
| Case studies | IELTS Counsel, Aeroflex (a 13-page website) | Neither shows a device, a protocol or a data pipeline. |
| "Trusted by" | Relocation companies, IELTS institute | Real clients, wrong signal when placed high on the page. |
| FAQ | Timelines for showcase websites, Stripe, Vercel | Answers questions a hardware buyer is not asking. |

**Worth keeping.** The plain, honest voice. The "things we will not do" list on the About page. 100% code ownership. The 48-hour written scope. The two blog posts on sizing a system and surviving sudden growth, which are directly relevant to device backends.

**Small fix spotted.** The footer LinkedIn link goes to `/company/corefintytech` (missing an "i"). Check that this is the real handle and not a typo.

---

## 2. Homepage, section by section

### Navigation

`How it works` · `What we build` · `Work` · `About` · button: **Talk to an engineer**

Replace "Get a Quote". Hardware buyers want a technical conversation before a price.

### Section 1: Hero

**Purpose:** say who this is for in five seconds.

- **H1:** Your device works on the bench. We build the software that makes it a product.
- **Sub-line:** Companion apps, device-to-cloud pipelines, admin panels and DevOps for connected hardware. Built over BLE, MQTT and LoRa, running on AWS IoT Core.
- **Primary button:** See how a build goes (scrolls to the process)
- **Secondary button:** Watch a device we shipped (scrolls to FuelGuard)
- **Visual:** a simple animated line of four nodes: Device → Phone or gateway → Cloud → Admin panel. No stock photos.

### Section 2: Protocol and stack strip

**Purpose:** let an engineer pattern-match instantly.

Replace the current strip with: `BLE` · `MQTT` · `LoRa` · `AWS IoT Core` · `React Native` · `Go` · `Node.js` · `PostgreSQL` · `[FILL: anything else you have really shipped with]`

Remove Stripe and Vercel from this strip.

### Section 3: The gap

**Purpose:** name the problem better than the visitor can. This is where confidence starts.

- **Heading:** A working prototype is about a third of a connected product.
- **Body, four short blocks:**
  - **Connections drop.** Phones kill background Bluetooth. Without reconnect logic, users think the device is broken.
  - **Data goes missing.** A device that is offline for an hour needs somewhere to keep its readings and a clean way to sync them.
  - **Nobody can see the fleet.** Once 500 units are in the field, someone needs a panel showing which are online, which are failing and why.
  - **The cloud bill surprises you.** Message volume is predictable. It should be calculated before launch, not discovered after.

### Section 4: System map

**Purpose:** one picture of everything you build, so the visitor sees the whole package at once.

A diagram with four columns and what you deliver in each:

| Device | App | Cloud | Admin |
|---|---|---|---|
| Your hardware and firmware | Pairing, reconnect, offline sync | Secure onboarding, ingestion, storage, alerts | Fleet view, users and roles, reports |
| `[FILL: do you offer firmware through your partner, or only work alongside the client's firmware team?]` | iOS and Android | AWS IoT Core, MQTT | Web dashboard |

Under the diagram, one line: **One team for everything after the antenna.**

### Section 5: Where is your hardware today?

**Purpose:** let each visitor find themselves. Three cards.

- **Still prototyping.** Software does not have to wait. We agree the data format with you and build against a simulated device, so the app and cloud are ready when the boards are.
- **Heading to production.** We size the backend for your launch numbers, set up device onboarding and get the app through store review.
- **Already shipping.** We fix dropped connections, add fleet monitoring and take over a codebase someone else left behind.

### Section 6: How a build goes (the step-by-step)

**Purpose:** the centrepiece. The visitor reads the process and learns what their own project needs. Each step shows what they receive, because deliverables build trust more than adjectives.

| Step | What happens | What you receive |
|---|---|---|
| 1. Data contract | We define what the device sends, how often and over which protocol. | A one-page message specification both teams sign off. |
| 2. Sizing | We work out users, messages per second, storage and monthly cloud cost. | A sizing sheet with the arithmetic shown. |
| 3. Device to cloud | Secure device onboarding, ingestion, storage and alert rules. | A working pipeline you can send test data through. |
| 4. Companion app | Pairing, auto-reconnect, offline sync, the screens your users see. | Test builds on your phone every week. |
| 5. Admin panel | Fleet view, alerts, users and roles. | A staging link you can log into. |
| 6. DevOps and handover | Pipelines, monitoring, documentation. | Repositories, cloud accounts and keys in your name. |

**Design note:** show a real cropped screenshot or sample beside steps 1, 2 and 5 (a message spec, a sizing sheet, an admin screen). Link step 2 to the existing blog post "Before we build anything, we do the arithmetic."

### Section 7: Case study, FuelGuard

**Purpose:** proof that the process above has been done for real.

- **Heading:** FuelGuard: catching fuel fraud at the dispenser.
- **Video first.** The clip of the device working, 60 to 120 seconds, captions on, no music needed.
- **Three lines under it:**
  - **Problem:** `[FILL: who was losing fuel or money, and how]`
  - **What we built:** a device that reads the dispenser and sounds an alert on fraud, connected to a web admin panel. `[FILL: protocol, cloud services, panel stack]`
  - **Result:** `[FILL: one number or outcome, e.g. dispensers monitored, fraud events caught, time to deploy]`
- **Client quote** if you can get one, with name and role.
- **Button:** Read the full case study.

### Section 8: The hard parts

**Purpose:** engineers trust detail. Three short technical notes, each linking to a blog post once written.

- **Auto-reconnect that survives the phone's battery saver.** `[FILL: two sentences on how you handle it]`
- **Measuring latency end to end.** `[FILL: what you measure and what numbers you have hit]`
- **Sizing for the launch you hope for.** Link to the existing "11,670 users turned up" post.

Describe this experience without naming any employer or their products. Say "our engineers have shipped", never show their work.

### Section 9: Working with your team

**Purpose:** answer the design-house reader directly.

- **Heading:** We fit beside your hardware team.
- **Points:** we work from your firmware team's spec; white-label delivery under your brand if you are a design house; NDA before any files change hands; weekly demo on a staging link; overlap hours with UK and EU working days `[FILL: your real overlap hours]`.

### Section 10: How to start

**Purpose:** replace the two website pricing blocks with a low-risk first step.

1. **Technical call, 30 minutes, free.** You show us the device and the plan.
2. **Proof of concept, fixed price, one to two weeks.** One device talking to the cloud and showing up on a screen. `[FILL: price or "from" price, if you want to show one]`
3. **Full build.** Written scope and fixed price within 48 hours of the call.
4. **Support.** Optional monthly monitoring and updates.

Keep the existing promises here: fixed scope, 100% code ownership, 48-hour written roadmap.

### Section 11: Other software we have built

**Purpose:** keep the real client names without confusing the message.

A slim row, low on the page: IELTS Counsel, the relocation platforms, Aeroflex. One line: "The same team builds web platforms and dashboards. A few that are live."

### Section 12: Questions

Replace the current FAQ with:

- My hardware is not finished. Can you start now?
- Do you write firmware? `[FILL]`
- Which protocols and chips have you worked with? `[FILL]`
- Can you take over an app or backend another team started?
- Who owns the code and the cloud accounts?
- How do you handle security and device onboarding?
- We are a design house. Can you work under our brand?
- Where are you based and when are you online?

### Section 13: Closing call to action

- **Heading:** Show us your device.
- **Line:** Send a spec sheet or book 30 minutes with an engineer. You get a written plan within 48 hours.
- **Buttons:** Talk to an engineer · Email hello@corefinity.tech

---

## 3. Remove from the homepage

- The Shopify section.
- The SEO, Python scraping, direct booking and AI chatbot cards.
- The Prototype Sprint and Platform OS pricing blocks.
- The scrolling ticker of eight services.
- "Trusted by teams across Scandinavia" as a headline (the names move to section 11).

Shopify and web work can stay on their own service pages for existing clients. They just should not be on the front door.

---

## 4. Changes beyond the homepage

- **Page title and meta description:** "CoreFinity Tech | App, cloud and admin software for connected devices". Rewrite the description and keywords around IoT companion apps, BLE, MQTT and AWS IoT Core.
- **Social preview image:** currently says "Architecting high performance digital platforms". Update to the new headline.
- **Services page:** lead with four services (Companion apps, Device to cloud, Admin panels, DevOps). Move the rest under "Also".
- **Case studies page:** FuelGuard first. Title currently reads "AI, Web and Automation".
- **About page:** change the opening line to mention connected devices. Keep "The things we will not do" as is.
- **Contact page:** add a field for "What does your device do and how does it connect?" and allow a file upload for a spec sheet.
- **Footer tagline:** currently "custom web platforms, operations dashboards and direct booking systems".

---

## 5. Build order

1. Hero, stack strip and page title (sections 1 and 2). One hour, biggest effect.
2. Remove the items in part 3.
3. Process table (section 6) and system map (section 4).
4. FuelGuard case study with the video (section 7).
5. The gap, hardware stage cards and FAQ (sections 3, 5, 12).
6. How to start (section 10) and team fit (section 9).
7. The hard parts (section 8), once the first technical blog post exists.

---

## 6. What I need from you to write final copy

- FuelGuard: the problem, hardware used, protocol, cloud services, panel stack, any numbers, and whether the client will give a quote.
- Firmware: offered through your partner, or not offered.
- Chips and modules you have really worked with.
- Your working-hours overlap with the UK and EU.
- Whether you want to show a proof-of-concept price.