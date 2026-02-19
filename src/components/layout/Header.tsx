"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";

function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </svg>
  );
}

function FlagEN({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" strokeWidth="5" />
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}

const NAV_ITEMS = [
  { key: "home", href: "/" as const },
  { key: "about", href: "/a-propos" as const },
  { key: "expertises", href: "/expertises" as const },
  { key: "gallery", href: "/galerie" as const },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const switchLocale = useCallback((newLocale: "fr" | "en") => {
    router.replace(pathname, { locale: newLocale });
  }, [router, pathname]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-blanc/95 backdrop-blur-md shadow-[0_1px_0_rgba(197,165,114,0.15)] py-3"
          : "bg-blanc/80 backdrop-blur-sm py-5 md:py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group relative flex items-center gap-2"
          aria-label="Groupe V2A — Accueil"
        >
          <span className="relative text-2xl font-bold tracking-[0.15em] text-noir transition-colors duration-300">
            V2A
            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-or origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </span>
          <span className="hidden sm:block w-[1px] h-5 bg-or/40 mx-1" />
          <span className="hidden sm:block text-[10px] font-normal tracking-[0.25em] uppercase text-texte/60 leading-tight">
            Group
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`relative px-4 py-2 text-[14px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                isActive(item.href)
                  ? "text-noir"
                  : "text-texte/70 hover:text-noir"
              }`}
            >
              {t(item.key)}
              <span
                className={`absolute bottom-0 left-4 right-4 h-[2px] bg-or transition-all duration-500 ease-out ${
                  isActive(item.href)
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => switchLocale("fr")}
              className={`relative p-1.5 rounded transition-all duration-300 ${
                locale === "fr"
                  ? "opacity-100 ring-1 ring-or/50"
                  : "opacity-40 hover:opacity-80"
              }`}
              aria-label="Français"
              title="Français"
            >
              <FlagFR className="w-5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={`relative p-1.5 rounded transition-all duration-300 ${
                locale === "en"
                  ? "opacity-100 ring-1 ring-or/50"
                  : "opacity-40 hover:opacity-80"
              }`}
              aria-label="English"
              title="English"
            >
              <FlagEN className="w-5 h-3.5" />
            </button>
          </div>

          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center px-6 py-2.5 bg-or text-noir text-[14px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#b8984f] hover:shadow-[0_4px_20px_rgba(197,165,114,0.3)]"
          >
            {tHeader("cta")}
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-noir"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`absolute transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-0 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
              }`}
            >
              <Menu size={22} strokeWidth={1.5} />
            </span>
            <span
              className={`absolute transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "rotate-90 opacity-0 scale-75"
              }`}
            >
              <X size={22} strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-noir/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-blanc shadow-[-20px_0_60px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col justify-center h-full px-10 py-20">
            <nav className="flex flex-col gap-1" aria-label="Menu mobile">
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group relative py-4 text-[15px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-noir"
                      : "text-texte/50 hover:text-noir"
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${i * 60 + 150}ms` : "0ms",
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-[2px] transition-all duration-300 ${
                        isActive(item.href)
                          ? "w-6 bg-or"
                          : "w-0 bg-or group-hover:w-4"
                      }`}
                    />
                    {t(item.key)}
                  </span>
                </Link>
              ))}
            </nav>

            <div
              className="mt-10 pt-8 border-t border-noir/5"
              style={{
                transitionDelay: isMobileMenuOpen ? "500ms" : "0ms",
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.4s ease-out",
              }}
            >
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-full py-4 bg-or text-noir text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#b8984f]"
              >
                {tHeader("cta")}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => { switchLocale("fr"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition-all duration-300 ${
                    locale === "fr"
                      ? "bg-noir/5 ring-1 ring-or/40"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label="Français"
                >
                  <FlagFR className="w-5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-texte/70">FR</span>
                </button>
                <button
                  type="button"
                  onClick={() => { switchLocale("en"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition-all duration-300 ${
                    locale === "en"
                      ? "bg-noir/5 ring-1 ring-or/40"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label="English"
                >
                  <FlagEN className="w-5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-texte/70">EN</span>
                </button>
              </div>

              <p className="mt-4 text-[11px] tracking-[0.1em] text-texte/30 font-normal italic font-accent">
                Connecting Capital, Creating Impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
