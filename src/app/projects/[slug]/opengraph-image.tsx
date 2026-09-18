import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

/**
 * Supplies per-project alt text. A static `alt` export would label every
 * project's card identically, which is useless to a screen reader and to
 * anyone seeing the card without images loaded.
 */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return [
    {
      id: "card",
      size,
      contentType,
      alt: project
        ? `${project.name} — ${project.category} by Orion Developers`
        : "Orion Developers project",
    },
  ];
}

/**
 * Per-project share card: the project photograph behind a navy scrim and
 * the project name.
 *
 * The photo is inlined as a data URI read from `public/` rather than
 * referenced by URL, so the card renders at build time without the build
 * needing to fetch from its own origin. The site's photos vary in aspect
 * ratio (some portrait, some square), which is exactly why they are
 * composited into a fixed 1200x630 frame here instead of being handed to
 * crawlers directly.
 */
export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  let photoDataUri: string | null = null;
  if (project) {
    try {
      const file = await readFile(
        path.join(process.cwd(), "public", project.photo),
      );
      photoDataUri = `data:image/jpeg;base64,${file.toString("base64")}`;
    } catch {
      // A missing photo must not fail the build — the card falls back to
      // the plain brand background below.
      photoDataUri = null;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0b1728",
        }}
      >
        {photoDataUri && (
          <img
            src={photoDataUri}
            alt=""
            width={size.width}
            height={size.height}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: size.width,
              height: size.height,
              objectFit: "cover",
            }}
          />
        )}
        {/*
          Explicit offsets and dimensions: Satori (which renders this image)
          does not support the `inset` shorthand, so a scrim relying on it
          collapses to zero size and leaves the title unreadable over a
          bright photo.
        */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            backgroundImage:
              "linear-gradient(110deg, rgba(8,17,30,0.96) 0%, rgba(9,19,33,0.90) 42%, rgba(11,23,40,0.62) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "68px 80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 56,
                height: 5,
                backgroundColor: "#c2622e",
                marginRight: 20,
              }}
            />
            <div
              style={{
                fontSize: 20,
                letterSpacing: 7,
                color: "#e0916a",
                textTransform: "uppercase",
              }}
            >
              {project ? project.category : "Project"}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 74,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: -2,
                lineHeight: 1.05,
                maxWidth: 860,
              }}
            >
              {project ? project.name : "Orion Developers"}
            </div>
            <div
              style={{
                fontSize: 26,
                color: "#c4d0e0",
                marginTop: 20,
                maxWidth: 800,
                lineHeight: 1.4,
              }}
            >
              {project ? project.scope : "Design · Supply · Erection"}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: -1,
              }}
            >
              ORION
            </div>
            <div
              style={{
                fontSize: 15,
                letterSpacing: 7,
                color: "#e0916a",
                textTransform: "uppercase",
                marginLeft: 14,
              }}
            >
              Developers
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
