"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function useCounter({ end, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const start = useCallback(() => {
    if (started) return;
    setStarted(true);

    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);

  return { count, start };
}

const FIGURES = [
  { key: "experience", end: 50, suffix: "+", label: "experience" },
  { key: "continents", end: 5, suffix: "", label: "continents" },
  { key: "projects", end: 120, suffix: "+", label: "projects" },
  { key: "partners", end: 40, suffix: "+", label: "partners" },
] as const;

export function KeyFigures() {
  const t = useTranslations("keyFigures");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const counter0 = useCounter({ end: FIGURES[0].end });
  const counter1 = useCounter({ end: FIGURES[1].end, duration: 1200 });
  const counter2 = useCounter({ end: FIGURES[2].end });
  const counter3 = useCounter({ end: FIGURES[3].end });
  const counters = [counter0, counter1, counter2, counter3];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          counters.forEach((c) => c.start());
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-noir py-20 md:py-28 overflow-hidden">
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(197,165,114,1) 40px,
            rgba(197,165,114,1) 41px
          )`,
        }}
      />

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {FIGURES.map((figure, i) => (
            <div
              key={figure.key}
              className={`text-center transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-or leading-none tracking-tight">
                {counters[i].count}
                <span className="text-or/70">{figure.suffix}</span>
              </div>
              <div className="mt-3 w-6 h-[1px] bg-or/30 mx-auto" />
              <p className="mt-3 text-[14px] md:text-[15px] font-bold uppercase tracking-[0.15em] text-blanc/50">
                {t(figure.label)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
