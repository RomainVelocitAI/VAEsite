import type { MetadataRoute } from "next";
import { BASE_URL, LOCALIZED_PATHS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["fr", "en"] as const;

  const priorities: Record<string, number> = {
    "/": 1,
    "/expertises": 0.9,
    "/a-propos": 0.8,
    "/contact": 0.8,
    "/galerie": 0.7,
    "/mentions-legales": 0.3,
    "/politique-de-confidentialite": 0.3,
  };

  const changeFrequencies: Record<string, "weekly" | "monthly" | "yearly"> = {
    "/": "weekly",
    "/expertises": "monthly",
    "/a-propos": "monthly",
    "/contact": "monthly",
    "/galerie": "monthly",
    "/mentions-legales": "yearly",
    "/politique-de-confidentialite": "yearly",
  };

  const entries: MetadataRoute.Sitemap = [];

  for (const internalPath of Object.keys(LOCALIZED_PATHS)) {
    const paths = LOCALIZED_PATHS[internalPath];

    for (const locale of locales) {
      const localePath = locale === "fr" ? paths.fr : paths.en;

      entries.push({
        url: `${BASE_URL}/${locale}${localePath}`,
        lastModified: new Date(),
        changeFrequency: changeFrequencies[internalPath] ?? "monthly",
        priority: priorities[internalPath] ?? 0.5,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr${paths.fr}`,
            en: `${BASE_URL}/en${paths.en}`,
          },
        },
      });
    }
  }

  return entries;
}
