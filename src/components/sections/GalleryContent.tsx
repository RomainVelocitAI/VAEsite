"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface GalleryItem {
  id: string;
  src: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "1", src: "/images/gallery/maurice.webp", caption: "Océan Indien — La Réunion, L'île Maurice, Madagascar..." },
  { id: "2", src: "/images/gallery/dubai.webp", caption: "Moyen-Orient — Bahreïn, Dubaï..." },
  { id: "3", src: "/images/gallery/afrique.webp", caption: "Afrique — Afrique du Sud, Maroc..." },
  { id: "4", src: "/images/gallery/luxembourg.webp", caption: "Europe" },
  { id: "5", src: "/images/gallery/mexique.webp", caption: "Mexique" },
  { id: "6", src: "/images/gallery/concept-hotelier.webp", caption: "Concepts d'hébergements premium" },
  { id: "7", src: "/images/gallery/construction-premium.webp", caption: "Construction haut de gamme — Matériaux d'excellence" },
  { id: "8", src: "/images/gallery/matieres-premieres.webp", caption: "Actifs stratégiques — Matières premières" },
  { id: "9", src: "/images/gallery/levee-capitaux.webp", caption: "Structuration et levée de capitaux ciblée" },
];

export function GalleryContent() {
  const t = useTranslations("gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? GALLERY_ITEMS.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex]);

  const goToNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === GALLERY_ITEMS.length - 1 ? 0 : lightboxIndex + 1);
  }, [lightboxIndex]);

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
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => openLightbox(i)}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer text-left hover-lift"
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 6 ? "eager" : "lazy"}
                />

                {/* Always-visible caption overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/80 via-noir/40 to-transparent pt-10 pb-4 px-5">
                  <div className="w-6 h-[2px] bg-or mb-2" />
                  <p className="text-[14px] text-blanc font-bold tracking-wide leading-snug">
                    {item.caption}
                  </p>
                </div>

                {/* Hover enhancement */}
                <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/15 transition-all duration-500" />

                {/* Corner accents on hover */}
                <div className="absolute top-3 right-3 w-0 h-0 border-t-2 border-r-2 border-or/0 group-hover:w-10 group-hover:h-10 group-hover:border-or/60 transition-all duration-500" />
                <div className="absolute bottom-3 left-3 w-0 h-0 border-b-2 border-l-2 border-or/0 group-hover:w-6 group-hover:h-6 group-hover:border-or/40 transition-all duration-500 delay-100" />
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && GALLERY_ITEMS[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY_ITEMS[lightboxIndex].caption}
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
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={GALLERY_ITEMS[lightboxIndex].src}
                alt={GALLERY_ITEMS[lightboxIndex].caption}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <div className="mt-6 text-center">
              <div className="w-8 h-[1px] bg-or/40 mx-auto mb-3" />
              <p className="text-[14px] text-blanc/60 tracking-wide">
                {GALLERY_ITEMS[lightboxIndex].caption}
              </p>
              <p className="mt-1 text-[11px] text-blanc/25 tracking-[0.1em]">
                {lightboxIndex + 1} / {GALLERY_ITEMS.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
