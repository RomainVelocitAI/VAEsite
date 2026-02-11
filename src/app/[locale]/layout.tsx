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
  title: "Groupe V2A — Conseil & Intermédiation en Investissements Stratégiques",
  description:
    "Le Groupe V2A accompagne investisseurs institutionnels et privés dans leurs projets stratégiques : immobilier, hôtellerie, énergies renouvelables, levée de fonds et actifs diversifiés.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Groupe V2A",
    title: "Groupe V2A — Conseil & Intermédiation en Investissements Stratégiques",
    description:
      "Le Groupe V2A accompagne investisseurs institutionnels et privés dans leurs projets stratégiques.",
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
    name: "Groupe V2A",
    url: "https://v2agroup.com",
    logo: "https://v2agroup.com/images/logo-v2a.svg",
    description:
      "Société de conseil et d'intermédiation en investissements stratégiques",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8, Ruelle Boulot",
    },
    telephone: "+32475292338",
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
