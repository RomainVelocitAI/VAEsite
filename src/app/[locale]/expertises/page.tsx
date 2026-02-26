import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getAlternates } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ExpertiseSectorDetail } from "@/components/sections/ExpertiseSectorDetail";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "expertises.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getAlternates("/expertises", locale),
  };
}

const SECTORS = [
  {
    key: "hospitality",
    iconName: "Hotel" as const,
    image: "/images/sectors/carte-hotellerie.webp",
    expandedImage: "/images/sectors/developpe-hotellerie.webp",
  },
  {
    key: "realEstate",
    iconName: "Building2" as const,
    image: "/images/sectors/carte-promotion-immobiliere.webp",
    expandedImage: "/images/sectors/developpe-promotion-immobiliere.webp",
  },
  {
    key: "energy",
    iconName: "Zap" as const,
    image: "/images/sectors/carte-energies-renouvelables.webp",
    expandedImage: "/images/sectors/developpe-energies-renouvelables.webp",
  },
  {
    key: "dataCenters",
    iconName: "Server" as const,
    image: "/images/sectors/carte-data-centers.webp",
    expandedImage: "/images/sectors/developpe-data-centers.webp",
  },
  {
    key: "fundraising",
    iconName: "TrendingUp" as const,
    image: "/images/sectors/carte-levee-de-fonds.webp",
    expandedImage: "/images/sectors/developpe-levee-de-fonds.webp",
  },
  {
    key: "assets",
    iconName: "Briefcase" as const,
    image: "/images/sectors/carte-actifs-diversifies.webp",
    expandedImage: "/images/sectors/developpe-actifs-diversifies.webp",
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

export default async function ExpertisesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("expertises");

  return (
    <>
      <Breadcrumb internalPath="/expertises" locale={locale} />

      {/* Hero with background image */}
      <section className="relative h-[45vh] md:h-[50vh] min-h-[300px] max-h-[450px] sm:max-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/page-expertises.webp"
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
            <h1 className="text-[clamp(1.8rem,6vw,3.5rem)] font-bold text-blanc tracking-tight">
              {t("pageTitle")}
            </h1>
            <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
            <p className="mt-4 text-[17px] md:text-lg font-accent italic text-or/70 max-w-xl mx-auto">
              {t("pageSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Sectors with expandable details */}
      {SECTORS.map((sector, i) => {
        const bgColor = i % 2 === 0 ? "bg-blanc" : "bg-creme";

        return (
          <section key={sector.key} className={`${bgColor} py-16 md:py-24`}>
            <Container>
              <ExpertiseSectorDetail
                sectorKey={sector.key}
                image={sector.image}
                expandedImage={sector.expandedImage}
                iconName={sector.iconName}
                isReversed={i % 2 === 1}
              />
            </Container>
          </section>
        );
      })}

      {/* Timeline Process — lighter design with background image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/accompagnement-integral.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-creme/85" />
        </div>

        <Container className="relative z-10">
          <div className="text-center mb-16">
            <AnimateOnScroll variant="scaleIn">
              <h2 className="text-[30px] md:text-[38px] font-bold text-noir tracking-tight">
                {t("process.sectionTitle")}
              </h2>
              <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
              <p className="mt-4 text-[17px] text-texte/60 max-w-xl mx-auto">
                {t("process.subtitle")}
              </p>
            </AnimateOnScroll>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            <div className="absolute top-8 left-0 right-0 h-[1px] bg-or/30" />

            <div className="grid grid-cols-6 gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <AnimateOnScroll key={step} delay={i * 120} variant="slideUp">
                  <div className="group relative text-center pt-16">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-creme border-2 border-or flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(197,165,114,0.3)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-or" />
                      </div>
                    </div>

                    <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-or/50 mb-2 transition-colors duration-300 group-hover:text-or">
                      0{i + 1}
                    </span>
                    <h3 className="text-[16px] font-bold text-noir mb-2 tracking-wide">
                      {t(`process.steps.${step}.title`)}
                    </h3>
                    <p className="text-[14px] text-texte/50 leading-relaxed transition-colors duration-300 group-hover:text-texte/70">
                      {t(`process.steps.${step}.description`)}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-or/30" />

            <div className="space-y-10">
              {PROCESS_STEPS.map((step, i) => (
                <AnimateOnScroll key={step} delay={i * 80} variant="fadeRight">
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-6 h-6 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-creme border-2 border-or">
                        <div className="w-1 h-1 rounded-full bg-or mx-auto mt-[2px]" />
                      </div>
                    </div>

                    <span className="inline-block text-[11px] font-bold tracking-[0.2em] text-or/50 mb-1">
                      0{i + 1}
                    </span>
                    <h3 className="text-[17px] font-bold text-noir mb-1.5 tracking-wide">
                      {t(`process.steps.${step}.title`)}
                    </h3>
                    <p className="text-[15px] text-texte/50 leading-relaxed">
                      {t(`process.steps.${step}.description`)}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Band with background image */}
      <CtaBand />
    </>
  );
}
