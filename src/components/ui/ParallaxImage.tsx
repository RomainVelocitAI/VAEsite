"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = "",
  aspectRatio = "4/3",
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isInView = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(container);

    const handleScroll = () => {
      if (!isInView || !container) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = elementCenter - viewportCenter;
        setOffset(distance * speed);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <div
        className="absolute inset-[-15%] will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    </div>
  );
}
