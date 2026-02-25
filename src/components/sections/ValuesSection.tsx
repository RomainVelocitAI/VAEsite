"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Shield, Eye, Handshake, Lock, ChevronDown } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const VALUES = [
  { key: "selectivity", Icon: Shield },
  { key: "transparency", Icon: Eye },
  { key: "alignment", Icon: Handshake },
  { key: "confidentiality", Icon: Lock },
] as const;

export function ValuesSection() {
  const t = useTranslations("about.values");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Value cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {VALUES.map((value, i) => (
          <AnimateOnScroll key={value.key} delay={i * 120} variant="scaleIn">
            <div className="group p-8 border border-blanc/10 bg-blanc/[0.04] backdrop-blur-sm hover:border-or/40 hover:bg-blanc/[0.08] transition-all duration-500 border-t-2 border-t-or/30 hover:border-t-or">
              <value.Icon
                size={24}
                strokeWidth={1.2}
                className="text-or mb-5 transition-transform duration-500 group-hover:scale-110"
              />
              <h3 className="text-[18px] font-bold text-blanc mb-3">
                {t(`${value.key}.title`)}
              </h3>
              <p className="text-[14px] text-blanc/50 leading-relaxed group-hover:text-blanc/70 transition-colors duration-500">
                {t(`${value.key}.description`)}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      {/* IMPORTANT button */}
      <AnimateOnScroll delay={500} variant="fadeUp">
        <div className="mt-10 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group/btn inline-flex items-center gap-2.5 px-8 py-3.5 bg-or text-noir text-[14px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#b8984f] hover:shadow-[0_0_30px_rgba(197,165,114,0.25)] cursor-pointer"
          >
            {t("importantButton")}
            <ChevronDown
              size={16}
              strokeWidth={2}
              className={`transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </AnimateOnScroll>

      {/* Expandable confidentiality panel */}
      <div
        className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "grid-rows-[1fr] opacity-100 mt-10" : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-2xl mx-auto text-center p-8 border border-or/20 bg-blanc/[0.06] backdrop-blur-sm">
            <Lock
              size={22}
              strokeWidth={1.2}
              className="text-or mx-auto mb-4"
            />
            <p className="text-[15px] text-blanc/70 leading-relaxed">
              {t("confidentiality.descriptionFull")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
