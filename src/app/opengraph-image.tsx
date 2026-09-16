import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Drawn here rather than shipped as a static PNG so the wording
 * can never fall out of step with the site config.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background:
          "radial-gradient(120% 140% at 12% 8%, #1880d8 0%, #0f4c93 34%, #0d1a33 72%, #05070f 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "#18a8e8",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          {site.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            maxWidth: 940,
            display: "flex",
          }}
        >
          Architecting high performance digital platforms
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.66)",
            maxWidth: 860,
            display: "flex",
          }}
        >
          Custom web platforms, operations dashboards and direct booking
          systems.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.16)",
          paddingTop: 28,
          fontSize: 24,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <div style={{ display: "flex" }}>corefinity.tech</div>
        <div style={{ display: "flex" }}>Fixed scope. You own the code.</div>
      </div>
    </div>,
    size,
  );
}
