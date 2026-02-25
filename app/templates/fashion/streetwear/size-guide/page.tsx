"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SneakerSizeCalculator from "../_design/components/SneakerSizeCalculator";

const BASE = "/templates/fashion/streetwear";

/* ── Fade-in wrapper ─────────────────────────────────────────────────── */

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Clothing size table ─────────────────────────────────────────────── */

const CLOTHING_SIZES = [
  { size: "XS", chest: "86-91", waist: "71-76", hips: "86-91" },
  { size: "S", chest: "91-97", waist: "76-81", hips: "91-97" },
  { size: "M", chest: "97-102", waist: "81-86", hips: "97-102" },
  { size: "L", chest: "102-107", waist: "86-91", hips: "102-107" },
  { size: "XL", chest: "107-112", waist: "91-97", hips: "107-112" },
  { size: "XXL", chest: "112-117", waist: "97-102", hips: "112-117" },
];

/* ── Size Guide Page ──────────────────────────────────────────────────── */

export default function SizeGuidePage() {
  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: "var(--kr-black)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 pt-4">
          <ol
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-muted)",
            }}
          >
            <li>
              <Link
                href={BASE}
                className="transition-colors duration-200 hover:text-[var(--kr-neon)]"
              >
                Home
              </Link>
            </li>
            <li style={{ color: "var(--kr-charcoal)" }}>/</li>
            <li style={{ color: "var(--kr-text)" }}>Größenguide</li>
          </ol>
        </nav>

        {/* Page Heading */}
        <FadeIn>
          <div className="mb-16">
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-neon)",
              }}
            >
              [Guide]
            </p>
            <h1
              className="text-6xl uppercase leading-[0.9] md:text-8xl"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              Größen-
              <br />
              Guide
            </h1>
            <p
              className="mt-4 max-w-lg text-base"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Finde deine perfekte Größe. Alle Angaben in Zentimetern.
              Im Zweifelsfall empfehlen wir, eine Größe größer zu wählen
              für den typischen KRSN Oversized Fit.
            </p>
            <div
              className="mt-6 h-[2px] w-16"
              style={{ backgroundColor: "var(--kr-neon)" }}
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: Sneaker Size Calculator */}
          <FadeIn delay={100}>
            <SneakerSizeCalculator />
          </FadeIn>

          {/* Right: Clothing sizes */}
          <FadeIn delay={250}>
            <div
              style={{
                backgroundColor: "var(--kr-dark)",
                border: "1px solid var(--kr-charcoal)",
              }}
            >
              {/* Header */}
              <div
                className="px-6 py-4"
                style={{
                  borderBottom: "1px solid var(--kr-charcoal)",
                }}
              >
                <h3
                  className="text-2xl uppercase"
                  style={{
                    fontFamily: "var(--kr-font-heading)",
                    color: "var(--kr-text)",
                  }}
                >
                  Bekleidung
                </h3>
                <p
                  className="mt-1 text-xs"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    color: "var(--kr-muted)",
                  }}
                >
                  Körpermaße in Zentimetern. KRSN fällt generell oversized
                  aus.
                </p>
              </div>

              {/* Clothing Size Table */}
              <div className="px-6 py-5">
                <div style={{ border: "1px solid var(--kr-charcoal)" }}>
                  <table
                    className="w-full text-xs"
                    style={{ fontFamily: "var(--kr-font-mono)" }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "var(--kr-charcoal)" }}>
                        <th
                          className="px-4 py-3 text-left text-[9px] uppercase tracking-wider"
                          style={{ color: "var(--kr-neon)" }}
                        >
                          Größe
                        </th>
                        <th
                          className="px-4 py-3 text-left text-[9px] uppercase tracking-wider"
                          style={{ color: "var(--kr-neon)" }}
                        >
                          Brust
                        </th>
                        <th
                          className="px-4 py-3 text-left text-[9px] uppercase tracking-wider"
                          style={{ color: "var(--kr-neon)" }}
                        >
                          Taille
                        </th>
                        <th
                          className="px-4 py-3 text-left text-[9px] uppercase tracking-wider"
                          style={{ color: "var(--kr-neon)" }}
                        >
                          Hüfte
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {CLOTHING_SIZES.map((row, i) => (
                        <tr
                          key={row.size}
                          style={{
                            backgroundColor:
                              i % 2 === 0
                                ? "var(--kr-black)"
                                : "var(--kr-dark)",
                          }}
                        >
                          <td
                            className="px-4 py-3 font-bold"
                            style={{ color: "var(--kr-text)" }}
                          >
                            {row.size}
                          </td>
                          <td
                            className="px-4 py-3"
                            style={{ color: "var(--kr-text)" }}
                          >
                            {row.chest}
                          </td>
                          <td
                            className="px-4 py-3"
                            style={{ color: "var(--kr-text)" }}
                          >
                            {row.waist}
                          </td>
                          <td
                            className="px-4 py-3"
                            style={{ color: "var(--kr-text)" }}
                          >
                            {row.hips}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* How to measure */}
        <FadeIn delay={400}>
          <div
            className="mt-10 p-8"
            style={{
              backgroundColor: "var(--kr-dark)",
              border: "1px solid var(--kr-charcoal)",
            }}
          >
            <h3
              className="mb-6 text-2xl uppercase"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              So misst du richtig
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Fußlänge (Sneakers)",
                  text: "Stell dich barfuß auf ein Blatt Papier. Zeichne die Umrisse deines Fußes nach und miss die Länge von der Ferse bis zur längsten Zehe.",
                },
                {
                  step: "02",
                  title: "Brust (Oberbekleidung)",
                  text: "Miss den Umfang an der breitesten Stelle deiner Brust. Halte das Maßband waagerecht und atme normal.",
                },
                {
                  step: "03",
                  title: "Taille (Hosen)",
                  text: "Miss den Umfang an der schmalsten Stelle deiner Taille, normalerweise etwa auf Höhe des Bauchnabels.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <span
                    className="mb-3 block text-2xl"
                    style={{
                      fontFamily: "var(--kr-font-mono)",
                      color: "var(--kr-neon)",
                      opacity: 0.5,
                    }}
                  >
                    {item.step}
                  </span>
                  <h4
                    className="mb-2 text-lg uppercase"
                    style={{
                      fontFamily: "var(--kr-font-heading)",
                      color: "var(--kr-text)",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--kr-font-body)",
                      color: "var(--kr-muted)",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Note */}
        <FadeIn delay={500}>
          <div
            className="mt-6 px-6 py-4"
            style={{
              borderLeft: "2px solid var(--kr-neon)",
              backgroundColor: "var(--kr-neon-dim)",
            }}
          >
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-text)",
              }}
            >
              Hinweis: KRSN Produkte fallen generell etwas oversized aus.
              Wenn du einen engeren Fit bevorzugst, empfehlen wir, eine
              Größe kleiner zu wählen. Bei Fragen erreichst du uns jederzeit.
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
