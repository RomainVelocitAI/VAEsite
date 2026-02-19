import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ContactForm } from "@/components/sections/ContactForm";

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form — takes 2/3 width */}
            <div className="lg:col-span-2">
              <AnimateOnScroll variant="fadeLeft">
                <ContactForm />
              </AnimateOnScroll>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <AnimateOnScroll delay={200} variant="fadeRight">
                <div className="bg-blanc p-8 border-t-2 border-or/30 hover-glow transition-all duration-500">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-or mb-8">
                    {t("info.title")}
                  </h2>

                  <ul className="space-y-6">
                    {/* Two addresses */}
                    <li className="group flex items-start gap-4">
                      <MapPin size={18} strokeWidth={1.2} className="text-or mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                      <div className="space-y-2">
                        <span className="block text-base text-texte/70 leading-relaxed group-hover:text-texte transition-colors duration-300">
                          {t("info.addressReunion")}
                        </span>
                        <span className="block text-base text-texte/70 leading-relaxed group-hover:text-texte transition-colors duration-300">
                          {t("info.addressLuxembourg")}
                        </span>
                      </div>
                    </li>
                    {/* Two phones */}
                    <li className="group flex items-start gap-4">
                      <Phone size={18} strokeWidth={1.2} className="text-or mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                      <div className="space-y-2">
                        <a
                          href="tel:+32475292338"
                          className="block text-base text-texte/70 hover:text-or transition-colors duration-300"
                        >
                          {t("info.phoneOne")}
                        </a>
                        <a
                          href="tel:+262693659589"
                          className="block text-base text-texte/70 hover:text-or transition-colors duration-300"
                        >
                          {t("info.phoneTwo")}
                        </a>
                      </div>
                    </li>
                    <li className="group flex items-start gap-4">
                      <Mail size={18} strokeWidth={1.2} className="text-or mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
                      <a
                        href="mailto:contact@v2agroup.com"
                        className="text-base text-texte/70 hover:text-or transition-colors duration-300"
                      >
                        {t("info.email")}
                      </a>
                    </li>
                  </ul>

                  {/* Map */}
                  <div className="mt-8 aspect-[4/3] bg-noir/5 overflow-hidden group/map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.5!2d4.35!3d50.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBruxelles!5e0!3m2!1sfr!2sbe!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(0.8) contrast(1.1)" }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localisation V2A Group"
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
