import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Shield, Eye, Handshake, Lock } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";

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
  {
    key: "valere",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    key: "andrew",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  },
  {
    key: "angelo",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
  },
] as const;

const VALUES = [
  { key: "selectivity", Icon: Shield },
  { key: "transparency", Icon: Eye },
  { key: "alignment", Icon: Handshake },
  { key: "confidentiality", Icon: Lock },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tCta = await getTranslations("ctaBand");

  return (
    <>
      <PageHeader title={t("vision.sectionTitle")} />

      {/* Vision & Mission */}
      <section className="section-diagonal-top bg-creme py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimateOnScroll variant="fadeLeft">
              <div>
                <p className="text-base md:text-lg text-texte leading-relaxed mb-8">
                  {t("vision.text")}
                </p>

                {/* Mission quote */}
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

      {/* Team */}
      <section className="section-diagonal-top-reverse bg-blanc py-20 md:py-28">
        <Container>
          <SectionTitle title={t("team.sectionTitle")} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <AnimateOnScroll key={member.key} delay={i * 150} variant="slideUp">
                <div className="group hover-lift">
                  {/* Portrait */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={member.image}
                      alt={t(`team.members.${member.key}.name`)}
                      fill
                      className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/30 via-noir/5 to-transparent transition-opacity duration-500 group-hover:from-noir/40" />

                    {/* Gold line bottom + top corner reveal on hover */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-or transition-all duration-700 group-hover:w-full" />
                    <div className="absolute top-0 right-0 w-0 h-[2px] bg-or/50 transition-all duration-700 delay-100 group-hover:w-1/3" />
                  </div>

                  {/* Info */}
                  <h3 className="text-[20px] font-bold text-noir tracking-wide hover-gold-line">
                    {t(`team.members.${member.key}.name`)}
                  </h3>
                  <p className="mt-1 text-[14px] font-bold uppercase tracking-[0.15em] text-or">
                    {t(`team.members.${member.key}.title`)}
                  </p>
                  <p className="mt-3 text-base text-texte/60 leading-relaxed">
                    {t(`team.members.${member.key}.expertise`)}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-diagonal-both bg-creme py-20 md:py-28">
        <Container>
          <SectionTitle title={t("values.sectionTitle")} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <AnimateOnScroll key={value.key} delay={i * 120} variant="scaleIn">
                <div className="group bg-blanc p-8 border-t-2 border-or/30 hover:border-or transition-all duration-500 hover-glow">
                  <value.Icon
                    size={24}
                    strokeWidth={1.2}
                    className="text-or mb-5 transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className="text-[18px] font-bold text-noir mb-3">
                    {t(`values.${value.key}.title`)}
                  </h3>
                  <p className="text-base text-texte/60 leading-relaxed">
                    {t(`values.${value.key}.description`)}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-diagonal-top-reverse bg-blanc py-20 md:py-28">
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
