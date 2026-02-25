"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/page-accueil.webp"
          alt=""
          fill
          className={`object-cover transition-transform duration-[2s] ease-out ${
            isLoaded ? "scale-100" : "scale-105"
          }`}
          priority
          sizes="100vw"
        />
      </div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-noir/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/10 to-noir/30" />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
        {/* Decorative line above */}
        <div
          className={`mx-auto w-[1px] bg-or/60 mb-10 transition-all duration-1000 ease-out ${
            isLoaded ? "h-16 opacity-100" : "h-0 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        />

        {/* Logo mark */}
        <div
          className={`transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <Image
            src="/images/logo-v2a-icon-white.png"
            alt="V2A"
            width={823}
            height={311}
            className="h-12 md:h-16 w-auto mx-auto"
            priority
          />
        </div>

        {/* Main title */}
        <h1
          className={`mt-3 text-[clamp(2.8rem,8vw,5.5rem)] font-bold tracking-[0.04em] text-blanc leading-[0.95] transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "650ms" }}
        >
          {t("title")}
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 text-[clamp(1rem,2.5vw,1.25rem)] font-accent italic text-or tracking-[0.04em] transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "850ms" }}
        >
          {t("subtitle")}
        </p>

        {/* CTA */}
        <div
          className={`mt-12 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "1050ms" }}
        >
          <Link
            href="/expertises"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-or text-noir text-[14px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-blanc hover:shadow-[0_8px_40px_rgba(197,165,114,0.25)]"
          >
            <span>{t("cta")}</span>
            <span className="inline-block w-4 h-[1px] bg-noir transition-all duration-500 group-hover:w-6" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1400ms" }}
      >
        <ChevronDown
          size={20}
          strokeWidth={1}
          className="text-blanc/40 animate-bounce"
          style={{ animationDuration: "2.5s" }}
        />
      </div>

      {/* Side decorative elements */}
      <div
        className={`absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-or/30 to-transparent" />
      </div>
      <div
        className={`absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-or/30 to-transparent" />
      </div>
    </section>
  );
}
