"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("v2a-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("v2a-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("v2a-cookie-consent", "rejected");
    setIsVisible(false);
  };

  const handleCustomize = () => {
    localStorage.setItem("v2a-cookie-consent", "customized");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in-up"
      role="dialog"
      aria-label={t("title")}
    >
      <div className="bg-blanc border-t border-marron-pourpre/5 shadow-[0_-8px_40px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-marron-pourpre mb-1">
              {t("title")}
            </p>
            <p className="text-[13px] text-taupe/60 leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 bg-chamois text-marron-pourpre text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-chamois-dark hover:shadow-[0_4px_20px_rgba(170,125,88,0.3)] cursor-pointer"
            >
              {t("acceptAll")}
            </button>
            <button
              onClick={handleReject}
              className="px-5 py-2.5 border border-marron-pourpre text-marron-pourpre text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-marron-pourpre hover:text-blanc cursor-pointer"
            >
              {t("rejectAll")}
            </button>
            <button
              onClick={handleCustomize}
              className="px-4 py-2.5 text-taupe/60 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:text-marron-pourpre underline underline-offset-4 decoration-taupe/20 hover:decoration-marron-pourpre cursor-pointer"
            >
              {t("customize")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
