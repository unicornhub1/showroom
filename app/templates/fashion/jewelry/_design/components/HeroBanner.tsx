"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface HeroBannerProps {
  label?: string;
  title: string;
  subtitle?: string;
  cta?: { text: string; href: string };
  gradient?: string;
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(16px)",
        transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
      }}
    >
      {children}
    </div>
  );
}

export function HeroBanner({
  label,
  title,
  subtitle,
  cta,
  gradient = "radial-gradient(circle at 50% 45%, var(--au-cream) 0%, var(--au-white) 100%)",
}: HeroBannerProps) {
  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden"
      style={{ background: gradient }}
    >
      {/* Subtle decorative corner brackets */}
      <div className="absolute left-8 top-8 h-12 w-12 md:left-16 md:top-16 md:h-16 md:w-16">
        <div
          className="absolute left-0 top-0 h-full w-px"
          style={{ backgroundColor: "var(--au-gold)", opacity: 0.3 }}
        />
        <div
          className="absolute left-0 top-0 h-px w-full"
          style={{ backgroundColor: "var(--au-gold)", opacity: 0.3 }}
        />
      </div>
      <div className="absolute bottom-8 right-8 h-12 w-12 md:bottom-16 md:right-16 md:h-16 md:w-16">
        <div
          className="absolute bottom-0 right-0 h-full w-px"
          style={{ backgroundColor: "var(--au-gold)", opacity: 0.3 }}
        />
        <div
          className="absolute bottom-0 right-0 h-px w-full"
          style={{ backgroundColor: "var(--au-gold)", opacity: 0.3 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {label && (
          <FadeIn delay={200}>
            <p
              className="mb-6 text-[10px] uppercase tracking-[0.35em]"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-gold)",
                fontWeight: 400,
              }}
            >
              {label}
            </p>
          </FadeIn>
        )}

        <FadeIn delay={500}>
          <h1
            className="mb-6 text-5xl leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl"
            style={{
              fontFamily: "var(--au-font-serif)",
              color: "var(--au-black)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {title}
          </h1>
        </FadeIn>

        {subtitle && (
          <FadeIn delay={800}>
            <p
              className="mx-auto mb-12 max-w-md text-base md:text-lg"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-charcoal)",
                fontWeight: 300,
              }}
            >
              {subtitle}
            </p>
          </FadeIn>
        )}

        {cta && (
          <FadeIn delay={1100}>
            <Link
              href={cta.href}
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-70"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-black)",
                fontWeight: 400,
              }}
            >
              <span
                className="h-px w-6 transition-all duration-500 group-hover:w-10"
                style={{ backgroundColor: "var(--au-gold)" }}
              />
              {cta.text}
              <span
                className="h-px w-6 transition-all duration-500 group-hover:w-10"
                style={{ backgroundColor: "var(--au-gold)" }}
              />
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

export default HeroBanner;
