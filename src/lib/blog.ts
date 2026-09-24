import type { DiagramKey } from "@/components/blog/Diagrams";

/**
 * Blog content.
 *
 * Articles are structured blocks rather than raw HTML, so the rendering stays
 * consistent with the rest of the site and every diagram is a real component
 * instead of an image. Same rules as the service pages: no invented client
 * names, no numbers Corefinity cannot stand behind, no long dashes.
 */

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; items: string[] }
  | { type: "figure"; diagram: DiagramKey; caption: string };

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
  datePublished: string;
  /** Service pages this article naturally leads to. */
  services: string[];
  blocks: BlogBlock[];
  faqs: { q: string; a: string }[];
};

export const posts: BlogPost[] = [
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
        text: "That is usually the work we are asked for at Corefinity: understanding what is really happening behind a product, finding the step that gives way first, and planning a path that grows with the business rather than against it. Sometimes that means building something new. Often it just means knowing where you stand before the busy day arrives.",
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
      if (b.type === "figure") return [b.caption];
      return [b.text];
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Newest first, for the index. */
export function postsByDate() {
  return [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
