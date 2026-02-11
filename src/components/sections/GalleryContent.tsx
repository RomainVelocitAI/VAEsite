"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Category = "all" | "team" | "realEstate" | "energy" | "fundraising" | "assets";

interface GalleryItem {
  id: string;
  src: string;
  category: Exclude<Category, "all">;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", category: "realEstate", caption: "Complexe hôtelier — Côte d'Azur" },
  { id: "2", src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", category: "realEstate", caption: "Résidence de luxe — Genève" },
  { id: "3", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", category: "team", caption: "Réunion stratégique" },
  { id: "4", src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80", category: "energy", caption: "Parc éolien — Mer du Nord" },
  { id: "5", src: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80", category: "realEstate", caption: "Promotion immobilière — Dubai" },
  { id: "6", src: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80", category: "energy", caption: "Centrale solaire — Maroc" },
  { id: "7", src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80", category: "team", caption: "Signature de partenariat" },
  { id: "8", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", category: "fundraising", caption: "Levée de fonds — Série B" },
  { id: "9", src: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80", category: "assets", caption: "Actifs stratégiques — Matières premières" },
];

const FILTER_KEYS: Category[] = ["all", "team", "realEstate", "energy", "fundraising", "assets"];

export function GalleryContent() {
  const t = useTranslations("gallery");
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const filteredItems = useMemo(
    () =>
      activeFilter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeFilter),
    [activeFilter]
  );

  const handleFilterChange = (filter: Category) => {
    if (filter === activeFilter) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex, filteredItems.length]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      <section className="section-diagonal-top bg-blanc py-20 md:py-28">
        <Container>
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 md:mb-16">
            {FILTER_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-400 cursor-pointer ${
                  activeFilter === key
                    ? "bg-or text-noir shadow-[0_4px_20px_rgba(197,165,114,0.3)]"
                    : "border border-noir/10 text-texte/50 hover:border-or hover:text-noir hover:shadow-[0_2px_12px_rgba(197,165,114,0.15)]"
                }`}
              >
                {t(`filters.${key}`)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-250 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {filteredItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => openLightbox(i)}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer text-left hover-lift"
                style={{
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 6 ? "eager" : "lazy"}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir/0 via-noir/0 to-noir/0 group-hover:from-noir/60 group-hover:via-noir/20 group-hover:to-transparent transition-all duration-600" />

                {/* Caption on hover */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  <div className="w-0 group-hover:w-8 h-[2px] bg-or mb-3 transition-all duration-500 delay-150" />
                  <p className="text-[15px] text-blanc font-bold tracking-wide">
                    {item.caption}
                  </p>
                </div>

                {/* Corner accents on hover */}
                <div className="absolute top-3 right-3 w-0 h-0 border-t-2 border-r-2 border-or/0 group-hover:w-10 group-hover:h-10 group-hover:border-or/60 transition-all duration-500" />
                <div className="absolute bottom-3 left-3 w-0 h-0 border-b-2 border-l-2 border-or/0 group-hover:w-6 group-hover:h-6 group-hover:border-or/40 transition-all duration-500 delay-100" />
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={filteredItems[lightboxIndex].caption}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-noir/92 backdrop-blur-md animate-fade-in-up"
            onClick={closeLightbox}
            style={{ animationDuration: "0.3s" }}
          />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-blanc/60 hover:text-or transition-colors duration-300 cursor-pointer"
            aria-label={t("close")}
          >
            <X size={24} strokeWidth={1} />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-blanc/40 hover:text-or transition-colors duration-300 cursor-pointer"
            aria-label={t("previous")}
          >
            <ChevronLeft size={28} strokeWidth={1} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-blanc/40 hover:text-or transition-colors duration-300 cursor-pointer"
            aria-label={t("next")}
          >
            <ChevronRight size={28} strokeWidth={1} />
          </button>

          {/* Image + Caption */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-16 md:px-24">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].caption}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <div className="mt-6 text-center">
              <div className="w-8 h-[1px] bg-or/40 mx-auto mb-3" />
              <p className="text-[14px] text-blanc/60 tracking-wide">
                {filteredItems[lightboxIndex].caption}
              </p>
              <p className="mt-1 text-[11px] text-blanc/25 tracking-[0.1em]">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
