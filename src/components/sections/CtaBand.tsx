import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";

export async function CtaBand() {
  const t = await getTranslations("ctaBand");

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/cta.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-noir/65" />
      </div>

      <Container className="relative z-10">
        <AnimateOnScroll variant="scaleIn">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-[28px] md:text-[36px] font-bold text-blanc tracking-tight">
              {t("title")}
            </h2>
            <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
            <p className="mt-5 text-[19px] font-accent italic text-or/80">
              {t("description")}
            </p>
            <div className="mt-8">
              <Button href="/contact">{t("cta")}</Button>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
