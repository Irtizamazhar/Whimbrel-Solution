import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/constants";
import { getAllServiceSlugs } from "@/data/servicesData";
import { getAllBlogSlugs } from "@/data/blog";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/about",
  "/team",
  "/services",
  "/portfolio",
  "/blog",
  "/careers",
  "/contact",
  ...getAllServiceSlugs().map((slug) => `/services/${slug}`),
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

  const blogEntries = getAllBlogSlugs().map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...portfolioEntries, ...blogEntries];
}
