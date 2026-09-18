import type { Metadata } from "next";

/**
 * Builds per-route metadata with matching Open Graph and Twitter cards.
 *
 * `title` is the bare page name — the root layout's title template appends
 * "— Orion Developers", so passing it here would double the suffix. The
 * social cards get the full form, since they render standalone.
 *
 * Share images are deliberately not set here. They come from the
 * `opengraph-image` file convention (the brand card at the app root, and a
 * generated per-project card), which emits correct `og:image:width`/
 * `height` automatically. Pointing at a raw photo instead would mean
 * declaring dimensions by hand for files that are not 1200x630 — several
 * of the site photos are portrait or square — which makes crawlers crop
 * and scale them badly.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} — Orion Developers`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
