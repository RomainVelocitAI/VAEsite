"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronDown, Hotel, Building2, Zap, Server, TrendingUp, Briefcase } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const ICON_MAP = {
  Hotel,
  Building2,
  Zap,
  Server,
  TrendingUp,
  Briefcase,
} as const;

interface ExpertiseSectorDetailProps {
  sectorKey: string;
  image: string;
  expandedImage: string;
  iconName: keyof typeof ICON_MAP;
  isReversed: boolean;
}

export function ExpertiseSectorDetail({
  sectorKey,
  image,
  expandedImage,
  iconName,
  isReversed,
}: ExpertiseSectorDetailProps) {
  const t = useTranslations("expertises");
  const [expanded, setExpanded] = useState(false);
  const Icon = ICON_MAP[iconName];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
        {/* Image */}
        <AnimateOnScroll delay={0} variant={isReversed ? "fadeRight" : "fadeLeft"}>
          <div className={isReversed ? "lg:order-2" : ""}>
            <div className="group relative overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={t(`sectors.${sectorKey}.title`)}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-noir/10 to-transparent pointer-events-none" />

              {/* Corner accents */}
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-or/30 transition-all duration-700 group-hover:w-20 group-hover:h-20 group-hover:border-or/60" />
              <div className="absolute top-4 left-4 w-16 h-16 border-l border-t border-or/30 transition-all duration-700 group-hover:w-20 group-hover:h-20 group-hover:border-or/60" />
            </div>
          </div>
        </AnimateOnScroll>

        {/* Content */}
        <AnimateOnScroll delay={200} variant={isReversed ? "fadeLeft" : "fadeRight"}>
          <div className={isReversed ? "lg:order-1" : ""}>
            <div className="flex items-center gap-3 mb-4">
              <Icon size={20} strokeWidth={1.2} className="text-or" />
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-or">
                {t(`sectors.${sectorKey}.type`)}
              </span>
            </div>

            <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-noir tracking-tight leading-tight mb-5">
              {t(`sectors.${sectorKey}.title`)}
            </h2>

            <p className="text-base md:text-lg text-texte/70 leading-relaxed mb-6">
              {t(`sectors.${sectorKey}.summary`)}
            </p>

            <ul className="space-y-3 mb-6">
              {[0, 1, 2, 3].map((hi) => (
                <li key={hi} className="group/item flex items-start gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 bg-or rounded-full shrink-0 transition-transform duration-300 group-hover/item:scale-150" />
                  <span className="text-base text-texte/60 leading-relaxed transition-colors duration-300 group-hover/item:text-texte">
                    {t(`sectors.${sectorKey}.highlights.${hi}`)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Expand button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.15em] text-or hover:text-[#b8984f] transition-colors duration-300 cursor-pointer"
            >
              <span>{expanded ? t("showLess") : t("learnMore")}</span>
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Expanded content */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          expanded ? "max-h-[600px] sm:max-h-[800px] opacity-100 mt-10" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Expanded image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
            <Image
              src={expandedImage}
              alt={t(`sectors.${sectorKey}.title`)}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/10 to-transparent" />
          </div>

          {/* Expanded text */}
          <div className="lg:pt-2">
            <div className="h-[2px] w-12 bg-or/40 mb-6" />
            <p className="text-base text-texte/70 leading-relaxed">
              {t(`sectors.${sectorKey}.expanded`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
