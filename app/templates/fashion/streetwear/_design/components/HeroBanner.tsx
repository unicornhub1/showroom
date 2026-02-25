"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const BASE = "/templates/fashion/streetwear";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
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
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
      }}
    >
      {children}
    </div>
  );
}

export default function HeroBanner() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--kr-black)" }}
    >
      {/* Background gradient splashes */}
      <div
        className="absolute left-[-20%] top-[-20%] h-[600px] w-[600px] rounded-full blur-[150px] opacity-30"
        style={{ backgroundColor: "var(--kr-neon)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full blur-[120px] opacity-20"
        style={{ backgroundColor: "var(--kr-neon)" }}
      />

      {/* Brutalist grid lines */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ opacity: 0.06 }}>
        <div className="absolute left-1/4 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--kr-text)" }} />
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--kr-text)" }} />
        <div className="absolute left-3/4 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--kr-text)" }} />
        <div className="absolute top-1/3 left-0 right-0 h-px" style={{ backgroundColor: "var(--kr-text)" }} />
        <div className="absolute top-2/3 left-0 right-0 h-px" style={{ backgroundColor: "var(--kr-text)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <FadeIn delay={200}>
          <p
            className="mb-6 text-[10px] uppercase tracking-[0.5em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-neon)",
            }}
          >
            SS26 // Neue Kollektion
          </p>
        </FadeIn>

        <FadeIn delay={500}>
          <h1
            className="mb-4 text-7xl uppercase leading-[0.85] sm:text-8xl md:text-9xl lg:text-[12rem]"
            style={{
              fontFamily: "var(--kr-font-heading)",
              color: "var(--kr-text)",
              textShadow: "4px 4px 0px rgba(205, 255, 0, 0.15)",
            }}
          >
            VLTG
          </h1>
        </FadeIn>

        <FadeIn delay={700}>
          <p
            className="mx-auto mb-2 max-w-md text-lg"
            style={{
              fontFamily: "var(--kr-font-body)",
              color: "var(--kr-muted)",
            }}
          >
            Streetwear für die, die nicht fragen.
          </p>
        </FadeIn>

        <FadeIn delay={900}>
          <p
            className="mx-auto mb-12 text-[11px] uppercase tracking-[0.3em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-muted)",
            }}
          >
            Limitierte Drops / Premium Quality / Zero Kompromisse
          </p>
        </FadeIn>

        <FadeIn delay={1100}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`${BASE}/products`}
              className="group inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300"
              style={{
                fontFamily: "var(--kr-font-body)",
                backgroundColor: "var(--kr-neon)",
                color: "var(--kr-black)",
                boxShadow: "4px 4px 0px var(--kr-charcoal)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "6px 6px 0px var(--kr-neon)";
                e.currentTarget.style.transform = "translate(-2px, -2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "4px 4px 0px var(--kr-charcoal)";
                e.currentTarget.style.transform = "translate(0, 0)";
              }}
            >
              Shop All
              <ArrowRight size={14} />
            </Link>
            <Link
              href={`${BASE}/products?collection=drops`}
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300"
              style={{
                fontFamily: "var(--kr-font-body)",
                border: "2px solid var(--kr-text)",
                color: "var(--kr-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--kr-neon)";
                e.currentTarget.style.color = "var(--kr-neon)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--kr-text)";
                e.currentTarget.style.color = "var(--kr-text)";
              }}
            >
              Neue Drops
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Bottom marquee ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t py-3"
        style={{
          backgroundColor: "var(--kr-neon)",
          borderColor: "var(--kr-neon)",
        }}
      >
        <div className="kr-marquee flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 text-xs font-bold uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-black)",
                fontSize: "14px",
              }}
            >
              NEUE DROPS VERFÜGBAR — KOSTENLOSER VERSAND AB 150 EUR —
              LIMITIERTE STÜCKZAHL — VLTG SS26 —
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
