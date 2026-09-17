import type { Metadata } from "next";
import Link from "next/link";

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";
import { legal, site } from "@/lib/site";

const title = "Terms of Service";
const description =
  "The terms that govern using the Corefinity website and engaging Corefinity for web, mobile, AI, automation and SEO work.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "these-terms",
    heading: "These terms",
    body: (
      <>
        <p>
          These terms apply when you use {site.url} and when you engage{" "}
          {legal.entity} for work. By using this site you accept them. If you do
          not, please do not use the site.
        </p>
        <p>
          For an actual project we also sign a separate proposal or statement of
          work. That document sets out scope, price and dates. Where it
          disagrees with this page, the signed document wins.
        </p>
      </>
    ),
  },
  {
    id: "what-we-do",
    heading: "What we provide",
    body: (
      <>
        <p>{legal.entity} provides software and digital services, including:</p>
        <ul>
          <li>
            Web development across frontend, backend and full stack, including
            websites, web applications, dashboards and customer portals.
          </li>
          <li>Mobile application development and the APIs behind it.</li>
          <li>
            AI development, including chatbots, assistants, document processing
            and language model integration.
          </li>
          <li>Python scripting, data pipelines and process automation.</li>
          <li>Search engine optimisation and technical performance work.</li>
          <li>
            Systems integration across payment gateways, CRMs, messaging
            platforms, calendars and databases.
          </li>
          <li>UI and UX design, and cloud deployment and infrastructure.</li>
        </ul>
        <p>
          What is included in your project is whatever the signed proposal says,
          and nothing is implied beyond it.
        </p>
      </>
    ),
  },
  {
    id: "quotes",
    heading: "Quotes and scope",
    body: (
      <>
        <p>
          Sending a project brief costs nothing and commits you to nothing. We
          reply with a written scope, a timeline and a price. A quote is valid
          for 30 days unless it says otherwise.
        </p>
        <p>
          We quote a fixed price against a fixed scope. If you later want
          something outside that scope, we will tell you what it adds in time
          and cost before doing it, and we will not proceed until you agree.
          Nothing gets added to your invoice as a surprise.
        </p>
        <p>
          Timelines assume we get what we need from you when we need it.
          Content, access, approvals and answers all sit on the critical path,
          and delays there move the delivery date.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    heading: "Payment",
    body: (
      <>
        <p>
          Unless the proposal says otherwise, projects are invoiced across
          agreed milestones, with the first payable before work starts.
        </p>
        <p>
          Invoices are due within {legal.paymentTermDays} days. If you think an
          invoice is wrong, tell us within {legal.paymentTermDays} days and we
          will sort it out before anything else happens.
        </p>
        <p>
          Prices exclude any taxes, duties or bank charges that apply where you
          are. Third party costs such as hosting, domains, app store fees, paid
          APIs and language model usage are yours, billed to your own accounts
          wherever possible so you keep control of them.
        </p>
        <p>
          If an invoice goes unpaid well past its due date and you have not
          raised a dispute, we may pause work until it is settled.
        </p>
      </>
    ),
  },
  {
    id: "your-responsibilities",
    heading: "What we need from you",
    body: (
      <>
        <p>To do the work, we rely on you to:</p>
        <ul>
          <li>
            Give us accurate information, content and access in reasonable time.
          </li>
          <li>Name someone who can make decisions and give approvals.</li>
          <li>
            Confirm that any material you supply, including text, images, logos
            and data, is yours to use.
          </li>
          <li>
            Keep your own accounts, credentials and devices reasonably secure.
          </li>
        </ul>
        <p>
          We are not responsible for delays, costs or claims caused by material
          you supplied that you did not have the right to use.
        </p>
      </>
    ),
  },
  {
    id: "ownership",
    heading: "Ownership of the work",
    body: (
      <>
        <p>
          Once you have paid in full for a project, the custom code, designs and
          assets we produced for it are yours. We hand over the repositories,
          the design source files, the environment configuration and the
          database. You get deployment rights and you are free to take the
          project to any other team.
        </p>
        <p>
          Two sensible exceptions. Open source components stay under their own
          licences, which travel with the code. And we keep ownership of our own
          general knowledge, internal tooling and reusable building blocks,
          which we license to you as part of the delivered work rather than
          transfer outright.
        </p>
        <p>
          Before full payment, the work remains ours. We are not claiming your
          content or your data at any point. Those are yours throughout.
        </p>
      </>
    ),
  },
  {
    id: "portfolio",
    heading: "Showing the work",
    body: (
      <p>
        We would like to show finished work in our portfolio and describe what
        we built. If you would rather we did not, tell us and we will not. We
        will never publish your data, credentials or anything you have told us
        is confidential, whatever you decide about the portfolio.
      </p>
    ),
  },
  {
    id: "ai-work",
    heading: "AI and automation work",
    body: (
      <>
        <p>
          Systems built on language models are probabilistic. They can produce
          output that is wrong, incomplete or unsuitable, and no amount of
          engineering removes that entirely. Where we build one for you, we will
          be straight with you about the limits and design sensible guardrails,
          but you remain responsible for how the system is used in your business
          and for any human review you decide it needs.
        </p>
        <p>
          Third party model providers set their own terms, pricing and
          availability, and they change them. We cannot guarantee a provider
          will keep a model running, keep its behaviour identical, or hold its
          price. We will build so that swapping a provider is possible wherever
          it is practical to do so.
        </p>
      </>
    ),
  },
  {
    id: "seo-note",
    heading: "A note on SEO work",
    body: (
      <p>
        We do technical and structural SEO properly, and we will tell you
        exactly what we changed and why. What we will not do is promise you a
        position in search results. Nobody can control how a search engine ranks
        a page, and anyone who guarantees a ranking is either guessing or
        selling you something. We commit to the work, not to a number.
      </p>
    ),
  },
  {
    id: "support",
    heading: "Support and warranty",
    body: (
      <>
        <p>
          We fix defects in what we built, at no charge, for the support period
          stated in your proposal. A defect means the delivered work does not do
          what the agreed scope said it would.
        </p>
        <p>
          New features, changes of mind, and problems caused by edits made by
          others, by third party outages or by changes to services we integrated
          with, fall outside that and are quoted separately.
        </p>
        <p>
          Software is never finished, and dependencies age. We recommend an
          ongoing maintenance arrangement, but we do not require one, and your
          code is yours to maintain however you prefer.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: (
      <p>
        Anything you share with us about your business, your plans or your
        systems stays confidential. We will not repeat it or use it for anyone
        else. This continues after the project ends. We expect the same from you
        regarding our proposals, pricing and methods.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Liability",
    body: (
      <>
        <p>
          This website is provided as it is. We keep the information on it
          accurate and current, but we do not warrant that it is free of errors
          or always available.
        </p>
        <p>
          For project work, our total liability for any claim is limited to the
          amount you paid us for the piece of work the claim relates to. We are
          not liable for indirect losses such as lost profits, lost revenue,
          lost data or business interruption.
        </p>
        <p>
          Nothing here limits liability that cannot be limited by law, including
          liability for fraud or for death or personal injury caused by
          negligence.
        </p>
      </>
    ),
  },
  {
    id: "ending",
    heading: "Ending an engagement",
    body: (
      <p>
        Either of us can end a project in writing. If you end it, you pay for
        work completed and for anything we have already committed to on your
        behalf. If we end it, other than for unpaid invoices, we hand over what
        has been completed and paid for. We will not hold finished, paid work
        hostage in either case.
      </p>
    ),
  },
  {
    id: "law",
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by {legal.governingLaw}, and {legal.courts}{" "}
        have jurisdiction over any dispute. If part of these terms turns out to
        be unenforceable, the rest continues to apply. Before anyone goes
        anywhere near a court, we would much rather you emailed us and we sorted
        it out.
      </p>
    ),
  },
  {
    id: "contact-terms",
    heading: "Contact",
    body: (
      <p>
        Questions about these terms go to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. To start a project,
        use the <Link href="/contact">project brief form</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Terms of Service"
      title="The terms we"
      accent="work under."
      summary="Written to be read. Fixed scope, no surprise invoices, and the work is yours once it is paid for."
      sections={sections}
    />
  );
}
