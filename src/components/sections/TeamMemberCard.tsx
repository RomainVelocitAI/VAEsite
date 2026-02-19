"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

interface TeamMemberCardProps {
  memberKey: string;
  image: string;
  isReversed: boolean;
}

export function TeamMemberCard({
  memberKey,
  image,
  isReversed,
}: TeamMemberCardProps) {
  const t = useTranslations("about.team");
  const [expanded, setExpanded] = useState(false);

  const bio = t(`members.${memberKey}.bio`);
  const expertiseList = t(`members.${memberKey}.expertiseList`)
    .split("|")
    .map((s: string) => s.trim());

  // Truncate bio to ~150 chars for preview
  const previewLength = 150;
  const spaceIndex = bio.indexOf(" ", previewLength);
  const bioPreview =
    bio.length > previewLength && spaceIndex !== -1
      ? bio.substring(0, spaceIndex) + "…"
      : bio;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
      {/* Photo */}
      <AnimateOnScroll variant={isReversed ? "fadeRight" : "fadeLeft"}>
        <div className={isReversed ? "lg:order-2" : ""}>
          <div className="group relative aspect-[3/4] overflow-hidden">
            <Image
              src={image}
              alt={t(`members.${memberKey}.name`)}
              fill
              className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/25 via-transparent to-transparent transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-or transition-all duration-700 group-hover:w-full" />
          </div>
        </div>
      </AnimateOnScroll>

      {/* Info */}
      <AnimateOnScroll
        delay={200}
        variant={isReversed ? "fadeLeft" : "fadeRight"}
      >
        <div className={`${isReversed ? "lg:order-1" : ""} lg:pt-4`}>
          <h3 className="text-[26px] md:text-[30px] font-bold text-noir tracking-tight">
            {t(`members.${memberKey}.name`)}
          </h3>
          <p className="mt-1 text-[14px] font-bold uppercase tracking-[0.18em] text-or">
            {t(`members.${memberKey}.title`)}
          </p>

          {/* Bio with expand/collapse */}
          <div className="mt-5">
            <p className="text-base text-texte/70 leading-relaxed">
              {expanded ? bio : bioPreview}
            </p>

            {bio.length > previewLength && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.15em] text-or hover:text-[#b8984f] transition-colors duration-300 cursor-pointer"
              >
                <span>{expanded ? t("seeLess") : t("seeMore")}</span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {/* Expertise list */}
          <div
            className={`mt-5 space-y-2 transition-all duration-500 ${
              expanded
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="h-[1px] w-8 bg-or/30 mb-4" />
            {expertiseList.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 bg-or rounded-full shrink-0" />
                <span className="text-[15px] text-texte/60 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
