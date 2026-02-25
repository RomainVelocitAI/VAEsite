import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Clock, Globe, ArrowRight, Users, Shield, Eye, Handshake, Lock } from "lucide-react";
import { getAlternates } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { KeyFigures } from "@/components/sections/KeyFigures";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Link } from "@/i18n/navigation";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/", locale),
  };
}

const VALUE_PROPS = [
  { key: "experience", Icon: Clock },
  { key: "global", Icon: Globe },
  { key: "fullService", Icon: ArrowRight },
  { key: "tailored", Icon: Users },
] as const;

const EXPERTISE_SECTORS = [
  { key: "hospitality", image: "/images/sectors/carte-hotellerie.webp" },
  { key: "realEstate", image: "/images/sectors/carte-promotion-immobiliere.webp" },
  { key: "energy", image: "/images/sectors/carte-energies-renouvelables.webp" },
  { key: "dataCenters", image: "/images/sectors/carte-data-centers.webp" },
  { key: "fundraising", image: "/images/sectors/carte-levee-de-fonds.webp" },
  { key: "assets", image: "/images/sectors/carte-actifs-diversifies.webp" },
] as const;

const APPROACH_PILLARS = [
  { key: "selectivity", Icon: Shield },
  { key: "transparency", Icon: Eye },
  { key: "alignment", Icon: Handshake },
  { key: "confidentiality", Icon: Lock },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("valueProps");
  const tExpertise = await getTranslations("expertise");
  const tApproach = await getTranslations("approach");

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Value Proposition */}
      <section className="section-diagonal-top bg-creme py-20 md:py-28" style={{ zIndex: 2 }}>
        <Container>
          <SectionTitle title={t("sectionTitle")} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {VALUE_PROPS.map((item, i) => (
              <AnimateOnScroll key={item.key} delay={i * 120} variant={i % 2 === 0 ? "fadeUp" : "scaleIn"}>
                <div className="group text-center p-6 md:p-8 hover-lift">
                  <div className="inline-flex items-center justify-center w-14 h-14 border border-or/20 text-or mb-6 transition-all duration-500 group-hover:border-or group-hover:bg-or/5 group-hover:shadow-[0_0_30px_rgba(197,165,114,0.15)] group-hover:scale-110">
                    <item.Icon size={22} strokeWidth={1.2} className="transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-[18px] font-bold text-noir mb-3 tracking-wide">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="text-base text-texte/60 leading-relaxed">
                    {t(`items.${item.key}.description`)}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Expertise Sectors */}
      <section className="section-diagonal-top-reverse bg-blanc py-20 md:py-28" style={{ zIndex: 3 }}>
        <Container>
          <SectionTitle title={tExpertise("sectionTitle")} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {EXPERTISE_SECTORS.map((sector, i) => (
              <div key={sector.key} className="lg:col-span-2">
              <AnimateOnScroll delay={i * 100} variant="scaleIn">
                <Link
                  href="/expertises"
                  className="group block relative aspect-[4/3] overflow-hidden rounded-sm shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(0,0,0,0.25),0_0_0_2px_rgba(197,165,114,0.5)]"
                >
                  <Image
                    src={sector.image}
                    alt={tExpertise(`sectors.${sector.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Default gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/30 to-noir/10 transition-opacity duration-500" />
                  {/* Hover darkening */}
                  <div className="absolute inset-0 bg-noir/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Gold border accent on hover */}
                  <div className="absolute inset-0 border-2 border-or/0 group-hover:border-or/60 transition-all duration-500" />
                  {/* Gold top accent line */}
                  <div className="absolute top-0 left-0 w-0 h-[3px] bg-or group-hover:w-full transition-all duration-700" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-[18px] font-bold text-blanc tracking-wide leading-snug transition-transform duration-500 group-hover:-translate-y-2">
                      {tExpertise(`sectors.${sector.key}.title`)}
                    </h3>
                    {/* Summary fades in on hover */}
                    <p className="mt-2 text-[14px] text-blanc/70 leading-relaxed line-clamp-3 max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {tExpertise(`sectors.${sector.key}.description`)}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-or text-[13px] font-bold uppercase tracking-[0.15em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                      <span>Découvrir</span>
                      <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
              </div>
            ))}
          </div>

          <AnimateOnScroll delay={300}>
            <div className="mt-12 text-center">
              <Button href="/expertises" variant="secondary">
                {tExpertise("viewAll")}
              </Button>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* Key Figures */}
      <div className="section-diagonal-both bg-noir" style={{ zIndex: 4 }}>
        <KeyFigures />
      </div>

      {/* Notre approche */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ zIndex: 5 }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/notre-approche.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-noir/75" />
        </div>

        <Container className="relative z-10">
          <AnimateOnScroll variant="scaleIn">
            <div className="text-center mb-14">
              <h2 className="text-[30px] md:text-[38px] font-bold text-blanc tracking-tight">
                {tApproach("sectionTitle")}
              </h2>
              <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPROACH_PILLARS.map((pillar, i) => (
              <AnimateOnScroll key={pillar.key} delay={i * 150} variant="fadeUp">
                <div className="group text-center p-8 border border-blanc/10 bg-blanc/[0.04] backdrop-blur-sm hover:border-or/40 hover:bg-blanc/[0.08] transition-all duration-500">
                  <pillar.Icon
                    size={28}
                    strokeWidth={1.2}
                    className="text-or mx-auto mb-5 transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className="text-[17px] font-bold text-blanc mb-3 tracking-wide">
                    {tApproach(`pillars.${pillar.key}.title`)}
                  </h3>
                  <p className="text-[14px] text-blanc/50 leading-relaxed group-hover:text-blanc/70 transition-colors duration-500">
                    {tApproach(`pillars.${pillar.key}.description`)}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Band with background image */}
      <CtaBand />
    </>
  );
}
