import { ImageResponse } from "next/og";

import { getPost, posts, readingMinutes } from "@/lib/blog";
import { site } from "@/lib/site";

export const alt = `${site.name} article`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Rendered once per article at build time rather than on every share. */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const headline = post
    ? `${post.headline.lead} ${post.headline.accent}`
    : site.tagline;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background:
          "radial-gradient(120% 140% at 12% 8%, #1880d8 0%, #0f4c93 34%, #0d1a33 72%, #05070f 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#18a8e8",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontWeight: 600, color: "white" }}>
            {site.name}
          </div>
        </div>
        <div style={{ display: "flex", letterSpacing: "0.12em" }}>
          {(post?.topic ?? "ARTICLE").toUpperCase()}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 68,
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          maxWidth: 1000,
        }}
      >
        {headline}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.16)",
          paddingTop: 30,
          fontSize: 22,
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <div style={{ display: "flex" }}>corefinity.tech</div>
        <div style={{ display: "flex" }}>
          {post ? `${readingMinutes(post)} minute read` : ""}
        </div>
      </div>
    </div>,
    size,
  );
}
