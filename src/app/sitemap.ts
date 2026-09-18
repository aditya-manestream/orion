import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
      {
        url: absoluteUrl("/capabilities"),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.7 },
      { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
