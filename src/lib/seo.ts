const BASE_URL = "https://v2agroup.com";

/**
 * Mapping des chemins internes vers les chemins localisés FR/EN.
 * Doit rester synchronisé avec src/i18n/routing.ts
 */
const LOCALIZED_PATHS: Record<string, { fr: string; en: string }> = {
  "/": { fr: "", en: "" },
  "/a-propos": { fr: "/a-propos", en: "/about" },
  "/expertises": { fr: "/expertises", en: "/expertise" },
  "/galerie": { fr: "/galerie", en: "/gallery" },
  "/contact": { fr: "/contact", en: "/contact" },
  "/mentions-legales": { fr: "/mentions-legales", en: "/legal-notice" },
  "/politique-de-confidentialite": {
    fr: "/politique-de-confidentialite",
    en: "/privacy-policy",
  },
};

/**
 * Génère les alternates (canonical + hreflang) pour une page donnée.
 */
export function getAlternates(internalPath: string, locale: string) {
  const paths = LOCALIZED_PATHS[internalPath];
  if (!paths) {
    return { canonical: `${BASE_URL}/${locale}` };
  }

  const localePath = locale === "fr" ? paths.fr : paths.en;

  return {
    canonical: `${BASE_URL}/${locale}${localePath}`,
    languages: {
      fr: `${BASE_URL}/fr${paths.fr}`,
      en: `${BASE_URL}/en${paths.en}`,
      "x-default": `${BASE_URL}/fr${paths.fr}`,
    },
  };
}

/**
 * Génère les propriétés Open Graph communes avec locale dynamique.
 */
export function getOpenGraph(locale: string, title: string, description: string) {
  return {
    type: "website" as const,
    locale: locale === "fr" ? "fr_FR" : "en_US",
    alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
    siteName: "V2A Group",
    title,
    description,
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/images/og/open-graph.webp`,
        width: 1200,
        height: 630,
        alt: "V2A Group — Connecting Capital, Creating Impact",
      },
    ],
  };
}

/**
 * Métadonnées Twitter Card communes.
 */
export function getTwitterCard(title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [`${BASE_URL}/images/og/open-graph.webp`],
  };
}

/**
 * Noms des pages pour le fil d'Ariane, par locale.
 */
const PAGE_NAMES: Record<string, { fr: string; en: string }> = {
  "/": { fr: "Accueil", en: "Home" },
  "/a-propos": { fr: "À propos", en: "About" },
  "/expertises": { fr: "Expertises", en: "Expertise" },
  "/galerie": { fr: "Notre univers", en: "Our World" },
  "/contact": { fr: "Contact", en: "Contact" },
  "/mentions-legales": { fr: "Mentions légales", en: "Legal Notice" },
  "/politique-de-confidentialite": {
    fr: "Politique de confidentialité",
    en: "Privacy Policy",
  },
};

/**
 * Génère le JSON-LD BreadcrumbList pour une page donnée.
 */
export function getBreadcrumbJsonLd(internalPath: string, locale: string) {
  const homePaths = LOCALIZED_PATHS["/"];
  const homeUrl = `${BASE_URL}/${locale}${homePaths.fr}`;
  const homeName = locale === "fr" ? "Accueil" : "Home";

  const items: { "@type": string; position: number; name: string; item?: string }[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeName,
      item: homeUrl,
    },
  ];

  if (internalPath !== "/") {
    const paths = LOCALIZED_PATHS[internalPath];
    const names = PAGE_NAMES[internalPath];
    if (paths && names) {
      const localePath = locale === "fr" ? paths.fr : paths.en;
      items.push({
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? names.fr : names.en,
        item: `${BASE_URL}/${locale}${localePath}`,
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Retourne les données du breadcrumb pour le composant visuel.
 */
export function getBreadcrumbItems(internalPath: string, locale: string) {
  const items: { label: string; href?: string }[] = [
    { label: locale === "fr" ? "Accueil" : "Home", href: "/" },
  ];

  if (internalPath !== "/") {
    const names = PAGE_NAMES[internalPath];
    if (names) {
      items.push({
        label: locale === "fr" ? names.fr : names.en,
      });
    }
  }

  return items;
}

export { BASE_URL, LOCALIZED_PATHS };
