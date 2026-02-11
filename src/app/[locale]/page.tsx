import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Clock, Globe, ArrowRight, Users } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { KeyFigures } from "@/components/sections/KeyFigures";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Link } from "@/i18n/navigation";

const VALUE_PROPS = [
  { key: "experience", Icon: Clock },
  { key: "global", Icon: Globe },
  { key: "fullService", Icon: ArrowRight },
  { key: "tailored", Icon: Users },
] as const;

const EXPERTISE_SECTORS = [
  {
    key: "hospitality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    key: "realEstate",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    key: "energy",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  {
    key: "fundraising",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    key: "assets",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
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
  const tCta = await getTranslations("ctaBand");

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPERTISE_SECTORS.map((sector, i) => (
              <AnimateOnScroll key={sector.key} delay={i * 100} variant="scaleIn">
                <Link href="/services" className="group block relative aspect-[4/3] overflow-hidden hover-scale">
                  <Image
                    src={sector.image}
                    alt={tExpertise(`sectors.${sector.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Default overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/30 to-noir/10 transition-opacity duration-500" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-noir/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Gold border on hover */}
                  <div className="absolute inset-0 border-2 border-or/0 group-hover:border-or/40 transition-all duration-500 m-3 group-hover:m-4" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-[18px] font-bold text-blanc tracking-wide leading-snug transition-transform duration-500 group-hover:-translate-y-1">
                      {tExpertise(`sectors.${sector.key}.title`)}
                    </h3>
                    <p className="mt-2 text-[15px] text-blanc/60 leading-relaxed line-clamp-2 transition-transform duration-500 group-hover:-translate-y-1">
                      {tExpertise(`sectors.${sector.key}.description`)}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-or text-[13px] font-bold uppercase tracking-[0.15em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <span>Découvrir</span>
                      <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll delay={300}>
            <div className="mt-12 text-center">
              <Button href="/services" variant="secondary">
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

      {/* CTA Band */}
      <section className="section-diagonal-top-reverse bg-creme py-20 md:py-28" style={{ zIndex: 5 }}>
        <Container>
          <AnimateOnScroll variant="scaleIn">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-[28px] md:text-[36px] font-bold text-noir tracking-tight">
                {tCta("title")}
              </h2>
              <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
              <p className="mt-5 text-[17px] text-texte/60 leading-relaxed">
                {tCta("description")}
              </p>
              <div className="mt-8">
                <Button href="/contact">{tCta("cta")}</Button>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
