"use client";

import { useEffect, useRef, useState } from "react";

type AnimationVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "slideUp";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
}

const VARIANTS: Record<AnimationVariant, { hidden: string; visible: string }> = {
  fadeUp: {
    hidden: "opacity-0 translate-y-6",
    visible: "opacity-100 translate-y-0",
  },
  fadeLeft: {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  fadeRight: {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  scaleIn: {
    hidden: "opacity-0 scale-[0.92]",
    visible: "opacity-100 scale-100",
  },
  slideUp: {
    hidden: "opacity-0 translate-y-10",
    visible: "opacity-100 translate-y-0",
  },
};

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const v = VARIANTS[variant];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? v.visible : v.hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
