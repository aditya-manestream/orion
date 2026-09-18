import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

export const alt =
  "Orion Developers — pre-engineered buildings from Nashik, Maharashtra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Brand share card, rendered at build time.
 *
 * Deliberately uses Satori's built-in font rather than fetching the site's
 * Bricolage/Hanken webfonts: an image generated here must never be able to
 * fail a production build over a font request. Swap in the real display
 * face once a self-hosted copy lives in the repo.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b1728",
          backgroundImage:
            "linear-gradient(140deg, #16283f 0%, #0b1728 55%, #0e1d31 100%)",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 64,
                height: 5,
                backgroundColor: "#c2622e",
                marginRight: 22,
              }}
            />
            <div
              style={{
                fontSize: 21,
                letterSpacing: 8,
                color: "#e0916a",
                textTransform: "uppercase",
              }}
            >
              Nashik, Maharashtra
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 34,
            }}
          >
            <div
              style={{
                fontSize: 86,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: -2,
              }}
            >
              ORION
            </div>
            <div
              style={{
                fontSize: 23,
                letterSpacing: 11,
                color: "#e0916a",
                textTransform: "uppercase",
                marginLeft: 26,
              }}
            >
              Developers
            </div>
          </div>

          <div
            style={{
              fontSize: 46,
              fontWeight: 600,
              color: "#edf1f6",
              letterSpacing: -1,
              marginTop: 26,
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 27,
              lineHeight: 1.45,
              color: "#a9bad1",
              maxWidth: 940,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
          <div
            style={{
              display: "flex",
              height: 10,
              backgroundColor: "#c2622e",
              marginTop: 44,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
