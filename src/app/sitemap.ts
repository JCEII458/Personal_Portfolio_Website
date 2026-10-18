import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/expertise", "/research", "/experience", "/cv", "/contact"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projects.map((p) => ({
      url: `${siteConfig.url}/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
