import type { Metadata } from "next";
import Link from "next/link";

import LegalLayout, { type LegalSection } from "@/components/LegalLayout";
import ConsentReset from "@/components/ConsentReset";
import { site } from "@/lib/site";

const title = "Cookie Policy";
const description =
  "What this site stores in your browser, what it does not, and how to change your choice at any time.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookies" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/cookies" },
};

const sections: LegalSection[] = [
  {
    id: "short-version",
    heading: "The short version",
    body: (
      <>
        <p>
          This site sets{" "}
          <strong>no advertising cookies and no tracking cookies</strong>. There
          is no Facebook pixel, no advertising tag and no third party following
          you from here to anywhere else.
        </p>
        <p>
          The only thing we store by default is your answer to the cookie
          banner, so that we stop asking. Everything else is off until you
          switch it on.
        </p>
      </>
    ),
  },
  {
    id: "what-a-cookie-is",
    heading: "What a cookie actually is",
    body: (
      <>
        <p>
          A cookie is a small file a website asks your browser to keep, so it
          can recognise the browser later. Similar technologies do much the same
          job under different names. One of them is local storage, which is what
          this site uses.
        </p>
        <p>
          We mention this because the honest description of our setup is that we
          use local storage rather than a cookie. The law treats both the same
          way, so we treat them the same way here.
        </p>
      </>
    ),
  },
  {
    id: "what-we-store",
    heading: "What we store",
    body: (
      <>
        <p>
          <strong>Your consent choice.</strong> Stored in your browser under the
          name{" "}
          <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[12px]">
            corefinity.consent
          </code>{" "}
          as local storage, not a cookie. It records which categories you
          allowed and when you decided. It never leaves your device, we cannot
          read it from our servers, and it identifies nobody.
        </p>
        <p>
          <strong>Nothing else, today.</strong> At the time this page took
          effect, that single entry is the only thing this site writes to your
          browser.
        </p>
      </>
    ),
  },
  {
    id: "categories",
    heading: "The categories in the banner",
    body: (
      <>
        <p>
          <strong>Strictly necessary.</strong> Remembering your consent choice
          and keeping the site secure. This cannot be turned off, because
          turning it off would mean asking you the same question on every page.
        </p>
        <p>
          <strong>Analytics.</strong> Counting page views so we can see which
          pages people actually read and which ones need work. Off unless you
          turn it on. If we add an analytics tool, it will be one that respects
          this choice, and it will not run for anyone who said no.
        </p>
        <p>
          <strong>Marketing.</strong> Measuring whether an advert brought
          someone here. We run no advertising at present, so this category
          currently does nothing at all. It exists so that the day we do run a
          campaign, you have already been asked rather than quietly opted in.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    heading: "Third parties",
    body: (
      <>
        <p>
          <strong>Hosting.</strong> The site runs on Vercel, which keeps
          standard server logs to deliver pages and block abuse. That is
          infrastructure rather than tracking, and it happens for every visitor
          regardless of consent.
        </p>
        <p>
          <strong>Fonts.</strong> The Inter typeface is served from our own
          domain, not fetched from Google at page load. Your browser makes no
          request to Google when you visit this site.
        </p>
        <p>
          <strong>Embeds.</strong> There are no embedded videos, maps, chat
          widgets or social buttons on this site, which is the usual way third
          party cookies arrive on a page.
        </p>
      </>
    ),
  },
  {
    id: "changing",
    heading: "Changing your mind",
    body: (
      <>
        <p>
          You can change your answer whenever you like, and we will not make it
          difficult.
        </p>
        <p className="rounded-2xl border border-black/[0.08] bg-white p-5">
          <ConsentReset />
        </p>
        <p>
          You can also clear site data for this domain in your browser settings,
          which removes the stored choice and makes the banner appear again.
          Most browsers additionally let you block storage for a site entirely.
          If you do that, this site still works; it will simply ask you the
          question again on each visit, because it has nowhere to record the
          answer.
        </p>
      </>
    ),
  },
  {
    id: "changes-cookies",
    heading: "Changes to this policy",
    body: (
      <p>
        If we add anything that stores data in your browser, we will update this
        page and reset the banner so you are asked again, rather than treating
        an old answer as covering something new. For how we handle personal
        information more broadly, see the{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Cookie Policy"
      title="What we store"
      accent="in your browser."
      summary="One entry, holding your own answer to the banner. No advertising, no tracking, nothing that follows you elsewhere."
      sections={sections}
    />
  );
}
