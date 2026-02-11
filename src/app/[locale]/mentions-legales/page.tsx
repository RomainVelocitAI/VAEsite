import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const SECTIONS = ["editor", "hosting", "ip", "liability", "links"] as const;

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");

  return (
    <>
      <PageHeader title={t("pageTitle")} />

      <section className="section-diagonal-top bg-blanc py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {SECTIONS.map((section, i) => (
              <AnimateOnScroll key={section} delay={i * 80} variant="fadeUp">
                <article>
                  <h2 className="text-[22px] font-bold text-noir mb-4 tracking-tight">
                    {t(`${section}.title`)}
                  </h2>
                  <div className="h-[1px] w-8 bg-or/40 mb-4" />
                  <div className="text-base text-texte/70 leading-relaxed whitespace-pre-line">
                    {t(`${section}.content`)}
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
