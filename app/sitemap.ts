import type { MetadataRoute } from "next";
import { projects } from "@/content/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
    },
    {
      url: `${siteUrl}/resume`,
      lastModified: now,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
    })),
  ];
}
