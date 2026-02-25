import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TeamMemberCard } from "@/components/sections/TeamMemberCard";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const TEAM_MEMBERS = [
  { key: "valere", image: "/images/team/valere.webp" },
  { key: "andrew", image: "/images/team/andrew.webp" },
  { key: "angelo", image: "/images/team/angelo.webp" },
] as const;


export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <>
      {/* Hero with background image */}
      <section className="relative h-[50vh] min-h-[360px] max-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/page-a-propos.webp"
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
              {t("vision.sectionTitle")}
            </h1>
            <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="section-diagonal-top bg-creme py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimateOnScroll variant="fadeLeft">
              <div>
                <p className="text-base md:text-lg text-texte leading-relaxed mb-8">
                  {t("vision.text")}
                </p>
                <div className="relative pl-6 border-l-2 border-or">
                  <p className="text-[17px] md:text-[19px] font-accent italic text-texte/80 leading-relaxed">
                    {t("vision.mission")}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200} variant="fadeRight">
              <div className="relative">
                <div className="aspect-[4/3] relative">
                  <div className="absolute inset-4 border border-or/20" />
                  <div className="absolute top-0 left-0 w-2/3 h-full bg-noir/[0.03]" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-or/30" />
                  <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-or/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-5xl md:text-6xl font-bold text-or/15 tracking-[0.1em]">
                        V2A
                      </span>
                      <span className="block mt-2 text-[10px] tracking-[0.4em] uppercase text-or/30 font-bold">
                        Vision to Action
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Team — Asymmetric layout with expand/collapse bios */}
      <section className="section-diagonal-top-reverse bg-blanc py-20 md:py-28">
        <Container>
          <SectionTitle title={t("team.sectionTitle")} />

          <div className="space-y-20 md:space-y-28">
            {TEAM_MEMBERS.map((member, i) => (
              <TeamMemberCard
                key={member.key}
                memberKey={member.key}
                image={member.image}
                isReversed={i % 2 === 1}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Values with background image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/nos-valeurs.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-noir/70" />
        </div>

        <Container className="relative z-10">
          <AnimateOnScroll variant="scaleIn">
            <div className="text-center mb-14">
              <h2 className="text-[30px] md:text-[38px] font-bold text-blanc tracking-tight">
                {t("values.sectionTitle")}
              </h2>
              <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
            </div>
          </AnimateOnScroll>

          <ValuesSection />
        </Container>
      </section>

      {/* CTA Band with background image */}
      <CtaBand />
    </>
  );
}
