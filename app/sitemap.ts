import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/constants";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/blog",
  "/careers",
  "/contact",
  "/services/custom-software",
  "/services/mobile-apps",
  "/services/ai-solutions",
  "/services/devops",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const portfolioEntries = portfolioProjects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...portfolioEntries];
}
