import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — wedding and event catering in Pune`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Drawn with layout primitives rather than the site's typeface:
 * ImageResponse cannot consume the woff2 files we self-host, and shipping a
 * second font format purely for this image is not worth the weight.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Warm bloom */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 220,
            width: 760,
            height: 620,
            background:
              "radial-gradient(circle, rgba(245,158,11,0.42) 0%, rgba(245,158,11,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              background: "linear-gradient(135deg,#fcd34d,#f59e0b 55%,#ea7c0b)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 30,
              color: "#f7f4ef",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.02,
              color: "#f7f4ef",
              letterSpacing: -2.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>The food everyone</span>
            <span
              style={{
                background: "linear-gradient(100deg,#fcd34d,#f59e0b 45%,#ea7c0b)",
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
              }}
            >
              remembers
            </span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              color: "#a8a29b",
              display: "flex",
            }}
          >
            Weddings · Mangalkarya · Vastu Shanti · Corporate · Pune
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2a2a30",
            paddingTop: 26,
            fontSize: 22,
            color: "#7d7871",
          }}
        >
          <div style={{ display: "flex" }}>
            Pure vegetarian · FSSAI licensed · Since {siteConfig.founded}
          </div>
          <div style={{ display: "flex", color: "#f59e0b" }}>
            {siteConfig.contact.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
