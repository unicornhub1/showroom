"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { properties, testimonials, formatPrice, formatSize } from "./_design/data";

const BASE = "/templates/immobilien/quartier";

/* ── FadeIn ─────────────────────────────────────────────────────────────── */

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
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── AnimatedNumber ────────────────────────────────────────────────────── */

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ── Homepage ──────────────────────────────────────────────────────────── */

export default function QuartierHomePage() {
  const featured = properties.filter((p) => p.isFeatured);
  const testimonial = testimonials[0];
  const [emailValue, setEmailValue] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          1. ARCHITECTURAL HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--qt-dark)",
        }}
      >
        {/* Geometric grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            animation: "qt-grid-reveal 2s ease-out forwards",
          }}
        />

        {/* Blueprint decorative lines */}
        <div
          className="absolute left-[10%] top-0 h-full w-px"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.15) 30%, rgba(37,99,235,0.15) 70%, transparent 100%)",
            animation: "qt-line-draw-y 1.5s ease-out 0.5s both",
          }}
        />
        <div
          className="absolute right-[15%] top-0 h-full w-px"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.1) 40%, rgba(37,99,235,0.1) 60%, transparent 100%)",
            animation: "qt-line-draw-y 1.5s ease-out 0.8s both",
          }}
        />
        <div
          className="absolute left-0 top-[40%] h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.1) 20%, rgba(37,99,235,0.1) 80%, transparent 100%)",
            animation: "qt-line-draw 1.5s ease-out 1s both",
          }}
        />

        {/* Corner geometric marks */}
        <div className="absolute left-8 top-[100px] hidden lg:block" style={{ opacity: 0.2 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M0 0L40 0M0 0L0 40" stroke="#2563EB" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 hidden lg:block" style={{ opacity: 0.2 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M40 40L0 40M40 40L40 0" stroke="#2563EB" strokeWidth="1" />
          </svg>
        </div>

        {/* Rotating geometric accent */}
        <div
          className="absolute right-[8%] top-[20%] hidden lg:block"
          style={{
            width: "200px",
            height: "200px",
            border: "1px solid rgba(37,99,235,0.12)",
            animation: "qt-rotate-slow 60s linear infinite",
          }}
        />
        <div
          className="absolute right-[calc(8%+30px)] top-[calc(20%+30px)] hidden lg:block"
          style={{
            width: "140px",
            height: "140px",
            border: "1px solid rgba(184,150,90,0.15)",
            animation: "qt-rotate-slow 45s linear infinite reverse",
          }}
        />

        {/* Main content */}
        <div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col justify-end px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
          {/* Overline */}
          <div
            className="mb-6 flex items-center gap-4"
            style={{
              animation: "qt-fade-up 0.7s ease-out 0.3s both",
            }}
          >
            <div
              className="h-px w-12"
              style={{ backgroundColor: "var(--qt-accent)" }}
            />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--qt-font-body)",
                color: "var(--qt-accent)",
              }}
            >
              Premium Immobilien
            </span>
          </div>

          {/* QUARTIER title */}
          <h1
            className="mb-4 leading-[0.9]"
            style={{
              fontFamily: "var(--qt-font-display)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "0.06em",
            }}
          >
            <span
              className="block text-[clamp(3.5rem,12vw,10rem)]"
              style={{
                animation: "qt-hero-letter 0.8s ease-out 0.5s both",
              }}
            >
              QUAR
            </span>
            <span
              className="block text-[clamp(3.5rem,12vw,10rem)]"
              style={{
                animation: "qt-hero-letter 0.8s ease-out 0.65s both",
                marginLeft: "clamp(1rem, 5vw, 4rem)",
              }}
            >
              TIER
              <span
                className="ml-3 inline-block h-3 w-3 sm:ml-5 sm:h-4 sm:w-4"
                style={{
                  backgroundColor: "var(--qt-accent)",
                  verticalAlign: "super",
                }}
              />
            </span>
          </h1>

          {/* Tagline */}
          <div
            className="mt-6 max-w-lg"
            style={{
              animation: "qt-fade-up 0.7s ease-out 1s both",
            }}
          >
            <p
              className="text-[clamp(1.1rem,2.5vw,1.6rem)] font-light leading-relaxed"
              style={{
                fontFamily: "var(--qt-font-display)",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.04em",
              }}
            >
              Immobilien. Neu gedacht.
            </p>
            <p
              className="mt-3 max-w-md text-[14px] font-light leading-relaxed"
              style={{
                fontFamily: "var(--qt-font-body)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Wir vermitteln nicht nur Immobilien -- wir schaffen Lebensräume.
              Premium-Objekte in Münchens besten Lagen.
            </p>
          </div>

          {/* CTA row */}
          <div
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{
              animation: "qt-fade-up 0.7s ease-out 1.2s both",
            }}
          >
            <Link
              href={`${BASE}/objekte`}
              className="inline-flex items-center gap-3 px-7 py-3.5 text-[13px] font-semibold tracking-[0.04em] transition-all duration-300 hover:opacity-90"
              style={{
                fontFamily: "var(--qt-font-body)",
                backgroundColor: "var(--qt-accent)",
                color: "#FFFFFF",
              }}
            >
              Objekte entdecken
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
            <Link
              href={`${BASE}/verkaufen`}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-medium tracking-[0.04em] transition-all duration-300"
              style={{
                fontFamily: "var(--qt-font-body)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Immobilie verkaufen
            </Link>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 right-8 hidden items-center gap-3 lg:flex"
            style={{
              animation: "qt-fade-up 0.7s ease-out 1.5s both",
            }}
          >
            <span
              className="text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--qt-font-body)",
                color: "rgba(255,255,255,0.3)",
                writingMode: "vertical-rl",
              }}
            >
              Scrollen
            </span>
            <div
              className="h-12 w-px"
              style={{
                background: "linear-gradient(180deg, rgba(37,99,235,0.5) 0%, transparent 100%)",
                animation: "qt-pulse-subtle 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. KEY METRICS BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "var(--qt-surface)",
          borderBottom: "1px solid var(--qt-border-light)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0">
            {[
              { value: 150, suffix: "+", label: "Objekte vermittelt" },
              { value: 98, suffix: "%", label: "Kundenzufriedenheit" },
              { value: 15, suffix: "", label: "Jahre Erfahrung" },
              { value: 3, suffix: "", label: "Standorte" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.12}>
                <div
                  className="flex flex-col items-center text-center md:border-l md:first:border-l-0"
                  style={{
                    borderColor: "var(--qt-border-light)",
                  }}
                >
                  <span
                    className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span
                    className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-muted)",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. FEATURED PROPERTIES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28" style={{ backgroundColor: "var(--qt-bg)" }}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 qt-grid-pattern"
          style={{ opacity: 0.5 }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Section header */}
          <FadeIn>
            <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.15em]"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-accent)",
                    }}
                  >
                    Ausgewählte Objekte
                  </span>
                </div>
                <h2
                  className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Premium Immobilien
                </h2>
              </div>
              <Link
                href={`${BASE}/objekte`}
                className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] transition-colors duration-300 hover:text-[var(--qt-accent-hover)]"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  color: "var(--qt-accent)",
                }}
              >
                Alle Objekte ansehen
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {/* Staggered property grid */}
          <div className="grid gap-6 md:grid-cols-12 md:gap-5">
            {featured.map((property, i) => {
              // Staggered grid: first card spans 7 cols, second 5, third 5 offset
              const colSpan =
                i === 0
                  ? "md:col-span-7 md:row-span-1"
                  : i === 1
                  ? "md:col-span-5"
                  : "md:col-span-5 md:col-start-8";
              const heightClass = i === 0 ? "h-[420px] md:h-[500px]" : "h-[350px] md:h-[420px]";

              return (
                <FadeIn
                  key={property.id}
                  className={colSpan}
                  delay={i * 0.15}
                >
                  <Link href={`${BASE}/objekte`} className="group block">
                    <div
                      className={`relative overflow-hidden ${heightClass}`}
                      style={{
                        background: property.gradient,
                        transition: "box-shadow 0.4s ease",
                      }}
                    >
                      {/* Hover accent border */}
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                        style={{
                          border: "2px solid var(--qt-accent)",
                        }}
                      />

                      {/* Type badge */}
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span
                          className="px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
                          style={{
                            fontFamily: "var(--qt-font-body)",
                            backgroundColor: "rgba(255,255,255,0.95)",
                            color: "var(--qt-dark)",
                          }}
                        >
                          {property.type}
                        </span>
                        {property.isNew && (
                          <span
                            className="px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
                            style={{
                              fontFamily: "var(--qt-font-body)",
                              backgroundColor: "var(--qt-accent)",
                              color: "#FFFFFF",
                            }}
                          >
                            Neu
                          </span>
                        )}
                      </div>

                      {/* Bottom content overlay */}
                      <div
                        className="absolute bottom-0 left-0 right-0 p-5 sm:p-6"
                        style={{
                          background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
                        }}
                      >
                        <h3
                          className="text-[18px] font-bold leading-tight sm:text-[20px]"
                          style={{
                            fontFamily: "var(--qt-font-display)",
                            color: "#FFFFFF",
                          }}
                        >
                          {property.title}
                        </h3>
                        <p
                          className="mt-1 text-[12px] font-light"
                          style={{
                            fontFamily: "var(--qt-font-body)",
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {property.location}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <span
                            className="text-[16px] font-bold"
                            style={{
                              fontFamily: "var(--qt-font-display)",
                              color: "#FFFFFF",
                            }}
                          >
                            {formatPrice(property.price)}
                          </span>
                          <div className="flex items-center gap-3">
                            <span
                              className="text-[11px]"
                              style={{
                                fontFamily: "var(--qt-font-body)",
                                color: "rgba(255,255,255,0.6)",
                              }}
                            >
                              {formatSize(property.size)}
                            </span>
                            <span
                              className="text-[11px]"
                              style={{
                                fontFamily: "var(--qt-font-body)",
                                color: "rgba(255,255,255,0.6)",
                              }}
                            >
                              {property.rooms} Zimmer
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. SERVICES SPLIT
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 sm:py-28"
        style={{ backgroundColor: "var(--qt-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Kaufen */}
            <FadeIn>
              <div className="relative pb-14 pr-0 md:pb-0 md:pr-14 lg:pr-20">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.15em]"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-accent)",
                    }}
                  >
                    Für Käufer
                  </span>
                </div>
                <h3
                  className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Kaufen
                </h3>
                <p
                  className="mt-4 max-w-md text-[14px] font-light leading-relaxed"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Entdecken Sie handverlesene Immobilien in Münchens gefragtesten Lagen.
                  Von der ersten Besichtigung bis zum Notartermin begleiten wir Sie persönlich
                  und diskret.
                </p>
                <Link
                  href={`${BASE}/objekte`}
                  className="group mt-6 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.04em] transition-colors duration-300 hover:text-[var(--qt-accent-hover)]"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-accent)",
                  }}
                >
                  Objekte ansehen
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>

                {/* Vertical divider on desktop */}
                <div
                  className="absolute bottom-0 right-0 top-0 hidden w-px md:block"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, var(--qt-border) 20%, var(--qt-border) 80%, transparent 100%)",
                  }}
                />
                {/* Horizontal divider on mobile */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px md:hidden"
                  style={{ backgroundColor: "var(--qt-border)" }}
                />
              </div>
            </FadeIn>

            {/* Verkaufen */}
            <FadeIn delay={0.15}>
              <div className="pt-14 pl-0 md:pt-0 md:pl-14 lg:pl-20">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-8" style={{ backgroundColor: "var(--qt-gold)" }} />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.15em]"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-gold)",
                    }}
                  >
                    Für Verkäufer
                  </span>
                </div>
                <h3
                  className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Verkaufen
                </h3>
                <p
                  className="mt-4 max-w-md text-[14px] font-light leading-relaxed"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Erzielen Sie den bestmöglichen Preis für Ihre Immobilie. Mit professioneller
                  Bewertung, hochwertiger Vermarktung und unserem exklusiven Käufernetzwerk.
                </p>
                <Link
                  href={`${BASE}/verkaufen`}
                  className="group mt-6 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.04em] transition-colors duration-300"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-gold)",
                  }}
                >
                  Mehr erfahren
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. PROCESS / STEPS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28" style={{ backgroundColor: "var(--qt-bg)" }}>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div className="mb-16 text-center">
              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-accent)",
                  }}
                >
                  Unser Prozess
                </span>
                <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
              </div>
              <h2
                className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                  letterSpacing: "-0.01em",
                }}
              >
                So arbeiten wir
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {[
              {
                num: "01",
                title: "Beratung",
                desc: "Persönliches Kennenlernen und Analyse Ihrer Wünsche und Anforderungen.",
              },
              {
                num: "02",
                title: "Bewertung",
                desc: "Fundierte Marktanalyse und professionelle Wertermittlung Ihrer Immobilie.",
              },
              {
                num: "03",
                title: "Vermarktung",
                desc: "Hochwertige Exposés, professionelle Fotografie und gezielte Käuferansprache.",
              },
              {
                num: "04",
                title: "Abschluss",
                desc: "Verhandlung, Vertragsgestaltung und Begleitung bis zum erfolgreichen Abschluss.",
              },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="relative flex flex-col items-center text-center lg:px-6">
                  {/* Number circle */}
                  <div
                    className="relative z-10 flex h-14 w-14 items-center justify-center"
                    style={{
                      border: "2px solid var(--qt-accent)",
                      backgroundColor: "var(--qt-bg)",
                    }}
                  >
                    <span
                      className="text-[14px] font-bold"
                      style={{
                        fontFamily: "var(--qt-font-display)",
                        color: "var(--qt-accent)",
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Connecting line (hidden on last item and mobile) */}
                  {i < 3 && (
                    <div
                      className="absolute left-[calc(50%+28px)] top-7 hidden h-px lg:block"
                      style={{
                        width: "calc(100% - 56px)",
                        backgroundColor: "var(--qt-border)",
                      }}
                    />
                  )}

                  <h4
                    className="mt-5 text-[16px] font-bold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="mt-2 max-w-[240px] text-[13px] font-light leading-relaxed"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-muted)",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. TESTIMONIAL
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 sm:py-28"
        style={{ backgroundColor: "var(--qt-surface)" }}
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div
              className="relative px-8 py-12 sm:px-14 sm:py-16"
              style={{
                backgroundColor: "var(--qt-bg)",
                borderLeft: "3px solid var(--qt-accent)",
              }}
            >
              {/* Quote mark */}
              <div
                className="absolute -top-4 left-8 flex h-10 w-10 items-center justify-center sm:left-14"
                style={{ backgroundColor: "var(--qt-accent)" }}
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d="M0 14V8.4C0 3.36 2.88 0.56 7.2 0L7.92 1.96C5.28 2.52 3.84 4.28 3.6 6.4H7.2V14H0ZM10.8 14V8.4C10.8 3.36 13.68 0.56 18 0L18.72 1.96C16.08 2.52 14.64 4.28 14.4 6.4H18V14H10.8Z" fill="white" />
                </svg>
              </div>

              <p
                className="text-[clamp(1rem,2vw,1.25rem)] font-light italic leading-relaxed"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  color: "var(--qt-text)",
                }}
              >
                {testimonial.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-6" style={{ backgroundColor: "var(--qt-accent)" }} />
                <div>
                  <p
                    className="text-[13px] font-semibold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    {testimonial.author}
                  </p>
                  <p
                    className="text-[11px] font-light"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-muted)",
                    }}
                  >
                    {testimonial.propertyType} &middot; {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ backgroundColor: "var(--qt-dark)" }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Geometric accent */}
        <div
          className="absolute -right-16 -top-16 hidden h-64 w-64 lg:block"
          style={{
            border: "1px solid rgba(37,99,235,0.12)",
            transform: "rotate(15deg)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-10">
          <FadeIn>
            <div className="mb-3 flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  color: "var(--qt-accent)",
                }}
              >
                Immobilien-Alert
              </span>
              <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
            </div>
            <h2
              className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold"
              style={{
                fontFamily: "var(--qt-font-display)",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Ihr Traumobjekt wartet
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-[14px] font-light leading-relaxed"
              style={{
                fontFamily: "var(--qt-font-body)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Registrieren Sie sich für unseren Immobilien-Alert und erhalten Sie
              neue Premium-Objekte vor allen anderen.
            </p>

            {subscribed ? (
              <div
                className="mx-auto mt-8 max-w-md px-6 py-4"
                style={{
                  border: "1px solid rgba(37,99,235,0.3)",
                  backgroundColor: "rgba(37,99,235,0.08)",
                }}
              >
                <p
                  className="text-[14px] font-medium"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-accent)",
                  }}
                >
                  Vielen Dank! Sie erhalten künftig unseren Immobilien-Alert.
                </p>
              </div>
            ) : (
              <form
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (emailValue.trim()) {
                    setSubscribed(true);
                    setEmailValue("");
                  }
                }}
              >
                <input
                  type="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-1 px-4 py-3.5 text-[13px] font-light outline-none transition-colors duration-300"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#FFFFFF",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--qt-accent)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                />
                <button
                  type="submit"
                  className="shrink-0 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-opacity duration-300 hover:opacity-90"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    backgroundColor: "var(--qt-accent)",
                    color: "#FFFFFF",
                  }}
                >
                  Anmelden
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
