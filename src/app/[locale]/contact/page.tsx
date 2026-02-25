import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Script from "next/script";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <>
      {/* Hero with background image */}
      <section className="relative h-[50vh] min-h-[360px] max-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/page-contact.webp"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-noir/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-noir/30" />
        </div>
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-blanc tracking-tight">
              {t("pageTitle")}
            </h1>
            <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
            <p className="mt-4 text-[17px] md:text-lg font-accent italic text-or/70 max-w-xl mx-auto">
              {t("pageSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-diagonal-top bg-creme py-20 md:py-28">
        <Container>
          <div className="max-w-2xl mx-auto">
            <AnimateOnScroll variant="fadeUp">
              {/* Email contact */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3">
                  <Mail size={18} strokeWidth={1.2} className="text-or" />
                  <a
                    href="mailto:contact@v2agroup.com"
                    className="text-base text-texte/70 hover:text-or transition-colors duration-300"
                  >
                    {t("info.email")}
                  </a>
                </div>
              </div>

              {/* HubSpot Form */}
              <div
                className="hs-form-frame"
                data-region="eu1"
                data-form-id="22cc6273-ef08-42de-86b7-1f49b9e2bd90"
                data-portal-id="147723774"
              />
              <Script
                src="https://js-eu1.hsforms.net/forms/embed/147723774.js"
                strategy="lazyOnload"
              />
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </>
  );
}
