import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAlternates, getOpenGraph, getTwitterCard, BASE_URL } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = t("description");

  return {
    title: {
      default: title,
      template: `%s | V2A Group`,
    },
    description,
    metadataBase: new URL(BASE_URL),
    alternates: getAlternates("/", locale),
    openGraph: getOpenGraph(locale, title, description),
    twitter: getTwitterCard(title, description),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "V2A Group",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo-v2a.png`,
    image: `${BASE_URL}/images/og/open-graph.webp`,
    description:
      locale === "fr"
        ? "Société de conseil et d'intermédiation en investissements stratégiques"
        : "Strategic investment advisory and intermediation firm",
    foundingDate: "2024",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "8, Ruelle Boulot",
        postalCode: "97400",
        addressLocality: "Saint-Denis",
        addressRegion: "La Réunion",
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "63, Happtstrooss",
        postalCode: "L-9780",
        addressLocality: "Wincrange",
        addressCountry: "LU",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+32475292338",
      email: "contact@v2agroup.com",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
    },
    telephone: ["+32475292338", "+262693659589"],
    email: "contact@v2agroup.com",
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "V2A Group",
    url: BASE_URL,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };

  const localBusinessJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#reunion`,
      name: "V2A Group — La Réunion",
      image: `${BASE_URL}/images/og/open-graph.webp`,
      url: BASE_URL,
      telephone: "+262693659589",
      email: "contact@v2agroup.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "8, Ruelle Boulot",
        postalCode: "97400",
        addressLocality: "Saint-Denis",
        addressRegion: "La Réunion",
        addressCountry: "FR",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "V2A Group",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#luxembourg`,
      name: "V2A Group — Luxembourg",
      image: `${BASE_URL}/images/og/open-graph.webp`,
      url: BASE_URL,
      telephone: "+32475292338",
      email: "contact@v2agroup.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "63, Happtstrooss",
        postalCode: "L-9780",
        addressLocality: "Wincrange",
        addressCountry: "LU",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "V2A Group",
      },
    },
  ];

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {localBusinessJsonLd.map((lb, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(lb),
            }}
          />
        ))}
      </head>
      <body className="bg-creme text-texte antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="skip-to-content"
          >
            Aller au contenu principal
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
