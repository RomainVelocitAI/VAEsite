"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact.info");

  return (
    <footer className="bg-noir text-blanc/80" role="contentinfo">
      {/* Gold accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-or to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="text-2xl font-bold tracking-[0.15em] text-blanc">
                V2A
              </span>
              <span className="ml-2 text-[10px] tracking-[0.25em] uppercase text-blanc/40">
                Group
              </span>
            </div>
            <p className="text-or text-sm font-bold tracking-[0.08em]">
              {t("slogan")}
            </p>
            <p className="mt-1 text-[15px] italic font-accent text-blanc/40">
              {t("sloganSub")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-or mb-6">
              {t("navigation")}
            </h3>
            <ul className="space-y-3">
              {[
                { key: "home", href: "/" as const },
                { key: "about", href: "/a-propos" as const },
                { key: "expertises", href: "/expertises" as const },
                { key: "gallery", href: "/galerie" as const },
                { key: "contact", href: "/contact" as const },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-blanc/50 hover:text-or transition-colors duration-300 tracking-wide"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-or mb-6">
              {t("legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-[15px] text-blanc/50 hover:text-or transition-colors duration-300 tracking-wide"
                >
                  {tNav("legalNotice")}
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-[15px] text-blanc/50 hover:text-or transition-colors duration-300 tracking-wide"
                >
                  {tNav("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-or mb-6">
              {t("contact")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-or mt-0.5 shrink-0" strokeWidth={1.5} />
                <div className="space-y-1">
                  <span className="block text-[15px] text-blanc/50 tracking-wide">
                    {t("locationFrance")}
                  </span>
                  <span className="block text-[15px] text-blanc/50 tracking-wide">
                    {t("locationLuxembourg")}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-or mt-0.5 shrink-0" strokeWidth={1.5} />
                <a
                  href="mailto:contact@v2agroup.com"
                  className="text-[15px] text-blanc/50 hover:text-or transition-colors duration-300 tracking-wide"
                >
                  {tContact("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-blanc/5">
          <p className="text-[11px] text-blanc/30 tracking-[0.05em] text-center">
            {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
