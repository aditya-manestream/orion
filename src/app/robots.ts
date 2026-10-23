import type { MetadataRoute } from "next";

// Library copy: a client site, so the library build is never indexed (and has no sitemap).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
