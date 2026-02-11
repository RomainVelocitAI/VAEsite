import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hotel, Building2, Zap, TrendingUp, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const SECTORS = [
  {
    key: "hospitality",
    Icon: Hotel,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
  },
  {
    key: "realEstate",
    Icon: Building2,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
  },
  {
    key: "energy",
    Icon: Zap,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80",
  },
  {
    key: "fundraising",
    Icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
  },
  {
    key: "assets",
    Icon: Briefcase,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
  },
] as const;

const PROCESS_STEPS = [
  "identification",
  "qualification",
  "structuring",
  "connection",
  "negotiation",
  "delivery",
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const tCta = await getTranslations("ctaBand");

  return (
    <>
      <PageHeader title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      {/* Sectors */}
      {SECTORS.map((sector, i) => {
        const isReversed = i % 2 === 1;
        const bgColor = i % 2 === 0 ? "bg-blanc" : "bg-creme";
        const diagonalClass = i === 0
          ? "section-diagonal-top"
          : i % 2 === 0
            ? "section-diagonal-top"
            : "section-diagonal-top-reverse";

        return (
          <section key={sector.key} className={`${bgColor} ${diagonalClass} py-16 md:py-24`}>
            <Container>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}
              >
                {/* Image with parallax */}
                <AnimateOnScroll delay={0} variant={isReversed ? "fadeRight" : "fadeLeft"}>
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <div className="group relative overflow-hidden">
                      <ParallaxImage
                        src={sector.image}
                        alt={t(`sectors.${sector.key}.title`)}
                        speed={0.12}
                        aspectRatio="4/3"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir/10 to-transparent pointer-events-none" />

                      {/* Corner accents with hover animation */}
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-or/30 transition-all duration-700 group-hover:w-20 group-hover:h-20 group-hover:border-or/60" />
                      <div className="absolute top-4 left-4 w-16 h-16 border-l border-t border-or/30 transition-all duration-700 group-hover:w-20 group-hover:h-20 group-hover:border-or/60" />
                    </div>
                  </div>
                </AnimateOnScroll>

                {/* Content */}
                <AnimateOnScroll delay={200} variant={isReversed ? "fadeLeft" : "fadeRight"}>
                  <div className={isReversed ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <sector.Icon
                        size={20}
                        strokeWidth={1.2}
                        className="text-or"
                      />
                      <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-or">
                        {t(`sectors.${sector.key}.type`)}
                      </span>
                    </div>

                    <h2 className="text-[26px] md:text-[32px] font-bold text-noir tracking-tight leading-tight mb-5">
                      {t(`sectors.${sector.key}.title`)}
                    </h2>

                    <p className="text-base md:text-lg text-texte/70 leading-relaxed mb-6">
                      {t(`sectors.${sector.key}.description`)}
                    </p>

                    <ul className="space-y-3">
                      {[0, 1, 2, 3].map((hi) => (
                        <li key={hi} className="group/item flex items-start gap-3">
                          <span className="mt-2.5 w-1.5 h-1.5 bg-or rounded-full shrink-0 transition-transform duration-300 group-hover/item:scale-150" />
                          <span className="text-base text-texte/60 leading-relaxed transition-colors duration-300 group-hover/item:text-texte">
                            {t(`sectors.${sector.key}.highlights.${hi}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateOnScroll>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Timeline Process — diagonal both */}
      <section className="section-diagonal-both relative bg-noir py-20 md:py-28 overflow-hidden">
        {/* Diagonal texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(197,165,114,1) 40px,
              rgba(197,165,114,1) 41px
            )`,
          }}
        />

        <Container className="relative z-10">
          <div className="text-center mb-16">
            <AnimateOnScroll variant="scaleIn">
              <h2 className="text-[30px] md:text-[38px] font-bold text-blanc tracking-tight">
                {t("process.sectionTitle")}
              </h2>
              <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
              <p className="mt-4 text-[17px] text-blanc/50 max-w-xl mx-auto">
                {t("process.subtitle")}
              </p>
            </AnimateOnScroll>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-0 right-0 h-[1px] bg-or/20" />

            <div className="grid grid-cols-6 gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <AnimateOnScroll key={step} delay={i * 120} variant="slideUp">
                  <div className="group relative text-center pt-16">
                    {/* Step dot with hover pulse */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-noir border-2 border-or flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(197,165,114,0.3)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-or" />
                      </div>
                    </div>

                    <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-or/50 mb-2 transition-colors duration-300 group-hover:text-or">
                      0{i + 1}
                    </span>
                    <h3 className="text-[16px] font-bold text-blanc mb-2 tracking-wide">
                      {t(`process.steps.${step}.title`)}
                    </h3>
                    <p className="text-[14px] text-blanc/40 leading-relaxed transition-colors duration-300 group-hover:text-blanc/60">
                      {t(`process.steps.${step}.description`)}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-or/20" />

            <div className="space-y-10">
              {PROCESS_STEPS.map((step, i) => (
                <AnimateOnScroll key={step} delay={i * 80} variant="fadeRight">
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-noir border-2 border-or">
                        <div className="w-1 h-1 rounded-full bg-or mx-auto mt-[2px]" />
                      </div>
                    </div>

                    <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-or/50 mb-1">
                      0{i + 1}
                    </span>
                    <h3 className="text-[17px] font-bold text-blanc mb-1.5 tracking-wide">
                      {t(`process.steps.${step}.title`)}
                    </h3>
                    <p className="text-[15px] text-blanc/40 leading-relaxed">
                      {t(`process.steps.${step}.description`)}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA — diagonal top reverse */}
      <section className="section-diagonal-top-reverse bg-creme py-20 md:py-28">
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
