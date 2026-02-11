import type { MetadataRoute } from "next";

const BASE_URL = "https://v2agroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/a-propos",
    "/services",
    "/galerie",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}/fr${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/services" ? 0.9 : 0.7,
  }));
}
