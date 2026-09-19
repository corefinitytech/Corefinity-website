import type { Metadata } from "next";
import Link from "next/link";

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";
import { legal, site } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "How Corefinity collects, uses and protects personal information, what we never do with it, and the rights you hold over your own data.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <>
        <p>
          {legal.entity} is a software and digital services studio operating
          from {legal.country}. We build websites, web applications, mobile
          apps, AI assistants and automation for clients worldwide, and we run
          this website at {site.url}.
        </p>
        <p>
          This policy explains what we do with personal information when you use
          this website or engage us for work. For anything in it, you can reach
          us at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: (
      <>
        <p>
          We keep this deliberately small. There is no account system on this
          site, and nothing here asks you to register.
        </p>
        <p>
          <strong>When you send a project brief.</strong> The form on our{" "}
          <Link href="/contact">contact page</Link> asks for your name, your
          email address, the type of project you have in mind, and a description
          of it. Those four fields are the whole of it. We do not ask for a
          phone number, a company address, or payment details at this stage.
        </p>
        <p>
          <strong>When you email us.</strong> We hold whatever you choose to put
          in the message, along with your email address, so that we can reply
          and keep track of the conversation.
        </p>
        <p>
          <strong>When you become a client.</strong> Delivering a project
          usually means we hold billing details, the contact details of people
          on your team, and access credentials for the systems we are asked to
          build on. Anything of that kind is covered by the agreement we sign
          with you rather than by this page alone.
        </p>
        <p>
          <strong>Technical information.</strong> Our host records standard
          server logs, including IP address, browser type and the pages
          requested. These exist to keep the site running and secure. We do not
          use them to build a profile of you.
        </p>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    heading: "Why we use it",
    body: (
      <>
        <p>We use personal information for these purposes only:</p>
        <ul>
          <li>To answer your enquiry and prepare a proposal or quote.</li>
          <li>To deliver, support and invoice work you have engaged us for.</li>
          <li>
            To keep the website available, fast and protected against abuse.
          </li>
          <li>
            To meet legal, tax and accounting obligations that apply to us.
          </li>
        </ul>
        <p>
          Where the law requires a stated legal basis, we rely on the steps
          taken at your request before entering a contract, on performing that
          contract once agreed, on our legitimate interest in running and
          securing this site, and on your consent for anything optional.
        </p>
      </>
    ),
  },
  {
    id: "what-we-never-do",
    heading: "What we never do",
    body: (
      <>
        <p>
          We do not sell personal information. We do not rent, trade or share it
          with data brokers, advertising networks or list builders.
        </p>
        <p>
          We do not add you to a marketing list because you sent a project
          brief. If you enquire and decide not to proceed, that is the end of
          it. You will not receive a sequence of follow up emails from us.
        </p>
        <p>
          We do not use the content of your brief, your codebase or your
          business data to train machine learning models, our own or anyone else
          {"'"}s.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    heading: "Who we share it with",
    body: (
      <>
        <p>
          We share personal information only with service providers who help us
          run the business, and only to the extent they need it:
        </p>
        <ul>
          <li>
            <strong>Hosting.</strong> This website is hosted on Vercel, which
            processes server logs and serves the pages.
          </li>
          <li>
            <strong>Email.</strong> The address you write to is handled by our
            email provider.
          </li>
          <li>
            <strong>Analytics.</strong> Google Analytics, but only for visitors
            who switch analytics on in the cookie banner. It receives page
            views, approximate location derived from IP address, and general
            device and browser information. It is never given your name or
            email, and it is not loaded at all for anyone who declines.
          </li>
          <li>
            <strong>Professional advisers.</strong> Accountants or legal
            advisers where we are obliged to involve them.
          </li>
        </ul>
        <p>
          We may also disclose information where the law compels us to, or where
          it is necessary to establish or defend a legal claim.
        </p>
        <p>
          Because we work with clients internationally and our providers operate
          globally, information may be processed outside {legal.country}. Where
          that happens we rely on the safeguards those providers put in place
          under their own data protection terms.
        </p>
      </>
    ),
  },
  {
    id: "how-long",
    heading: "How long we keep it",
    body: (
      <>
        <p>
          Project briefs that do not turn into work are deleted once they are
          clearly no longer live, and in any case within two years.
        </p>
        <p>
          Records connected to paid work are kept for as long as tax and
          accounting rules require, then deleted.
        </p>
        <p>
          Server logs are short lived and rotate automatically. Ask us to delete
          something sooner and we will, unless we are legally required to keep
          it.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>Tell you what personal information we hold about you.</li>
          <li>Give you a copy of it.</li>
          <li>Correct it if it is wrong.</li>
          <li>Delete it.</li>
          <li>Stop using it for a particular purpose.</li>
          <li>Withdraw consent you previously gave.</li>
        </ul>
        <p>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will
          respond within 30 days. We will not charge you for asking, and we will
          not treat you differently for having asked.
        </p>
        <p>
          If you are in the United Kingdom or the European Economic Area, the
          General Data Protection Regulation gives you these rights directly,
          including the right to complain to your national supervisory
          authority. We apply the same standard to everyone who contacts us,
          wherever they are.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    body: (
      <>
        <p>
          The site is served over HTTPS. Access to client systems and
          credentials is limited to the people working on that project, and
          credentials are handed back or rotated at the end of an engagement.
        </p>
        <p>
          No system is perfectly secure, and we would rather say so than claim
          otherwise. If we ever discover a breach affecting your personal
          information, we will tell you and the relevant authority promptly.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <p>
        This website and our services are meant for businesses and for adults.
        We do not knowingly collect information from anyone under 18. If you
        believe a child has sent us personal information, write to us and we
        will delete it.
      </p>
    ),
  },
  {
    id: "cookies-note",
    heading: "Cookies",
    body: (
      <p>
        How this site handles cookies and similar storage is set out in full on
        our <Link href="/cookies">cookie policy</Link>, including how to change
        your choice at any time.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We update this page when what we do changes. The date shown beside these
        contents is when the current version took effect. If a change materially
        affects how we handle your information, we will make that clear rather
        than quietly editing the text.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Privacy Policy"
      title="What we do with"
      accent="your information."
      summary="Short version: we collect very little, we never sell it, and you can ask us to delete it at any time."
      sections={sections}
    />
  );
}
