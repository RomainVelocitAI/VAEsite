import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "V2A Group — Conseil & Intermédiation en Investissements Stratégiques",
  description:
    "V2A Group accompagne investisseurs institutionnels et privés dans leurs projets stratégiques : immobilier, hôtellerie, énergies renouvelables, levée de fonds et actifs diversifiés.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "V2A Group",
    title: "V2A Group — Conseil & Intermédiation en Investissements Stratégiques",
    description:
      "V2A Group accompagne investisseurs institutionnels et privés dans leurs projets stratégiques.",
    images: [
      {
        url: "/images/og/open-graph.webp",
        width: 1200,
        height: 630,
        alt: "V2A Group — Connecting Capital, Creating Impact",
      },
    ],
  },
};

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
    url: "https://v2agroup.com",
    logo: "https://v2agroup.com/images/logo-v2a.svg",
    description:
      "Société de conseil et d'intermédiation en investissements stratégiques",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "8, Ruelle Boulot",
        addressLocality: "La Réunion",
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Luxembourg",
        addressCountry: "LU",
      },
    ],
    telephone: ["+32475292338", "+262693659589"],
    email: "contact@v2agroup.com",
    sameAs: [],
  };

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
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
