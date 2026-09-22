import { ImageResponse } from "next/og";

import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { site } from "@/lib/site";

export const alt = `${site.name} case study`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Rendered once per study at build time rather than on every share. */
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

/** Per study social card, in the same construction as the site card. */
export default async function CaseStudyImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const headline = study
    ? `${study.headline.lead} ${study.headline.accent}`
    : site.tagline;
  const metrics = study?.metrics.slice(0, 3) ?? [];

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
          {`CASE STUDY  /  ${(study?.industry ?? "").toUpperCase()}`}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 66,
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
          gap: 20,
          borderTop: "1px solid rgba(255,255,255,0.16)",
          paddingTop: 32,
        }}
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
          >
            <div style={{ display: "flex", fontSize: 52, fontWeight: 600 }}>
              {`${m.prefix ?? ""}${m.value}${m.suffix ?? ""}`}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 6,
                fontSize: 20,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
