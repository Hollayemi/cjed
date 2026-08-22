import { ImageResponse } from "next/og";
import { siteConfig } from "@/app/config/site";

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0068C1 0%, #004c8c 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#f7cb06",
              color: "#0068C1",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            CJ
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#ffffff",
            }}
          >
            <span style={{ fontSize: "26px", fontWeight: 700, letterSpacing: 1 }}>
              {siteConfig.shortName}
            </span>
            <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)" }}>
              {siteConfig.registration}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <span
            style={{
              fontSize: "54px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
              maxWidth: "980px",
            }}
          >
            {siteConfig.name}
          </span>
          <span
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.85)",
              maxWidth: "900px",
            }}
          >
            Legal aid, human rights and access to justice for underserved
            communities across Nigeria.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {["Legal Aid", "Capacity Building", "Policy & Research"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.12)",
                  color: "#ffffff",
                  fontSize: "16px",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
