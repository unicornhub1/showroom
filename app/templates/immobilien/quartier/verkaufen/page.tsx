"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

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

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function VerkaufenPage() {
  const [formData, setFormData] = useState({
    objektart: "",
    adresse: "",
    groesse: "",
    zimmer: "",
    name: "",
    email: "",
    telefon: "",
    nachricht: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    fontFamily: "var(--qt-font-body)",
    backgroundColor: "var(--qt-surface)",
    border: "1px solid var(--qt-border)",
    color: "var(--qt-text)",
  } as React.CSSProperties;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{ backgroundColor: "var(--qt-dark)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Decorative geometric */}
        <div
          className="absolute -right-10 top-1/4 hidden h-48 w-48 lg:block"
          style={{
            border: "1px solid rgba(184,150,90,0.15)",
            transform: "rotate(12deg)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={BASE}
              className="text-[12px] font-light transition-colors duration-300 hover:text-[var(--qt-accent)]"
              style={{ fontFamily: "var(--qt-font-body)", color: "rgba(255,255,255,0.5)" }}
            >
              Home
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span
              className="text-[12px] font-light"
              style={{ fontFamily: "var(--qt-font-body)", color: "rgba(255,255,255,0.7)" }}
            >
              Verkaufen
            </span>
          </div>
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: "var(--qt-gold)" }} />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.15em]"
                style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-gold)" }}
              >
                Für Eigentümer
              </span>
            </div>
            <h1
              className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
              style={{
                fontFamily: "var(--qt-font-display)",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Ihre Immobilie verdient den besten Preis
            </h1>
            <p
              className="mt-4 max-w-lg text-[14px] font-light leading-relaxed"
              style={{
                fontFamily: "var(--qt-font-body)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Mit fundierter Marktkenntnis, professioneller Vermarktung und persönlicher
              Betreuung erzielen wir den optimalen Verkaufspreis für Ihre Immobilie.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--qt-surface)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2
                className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                }}
              >
                In 4 Schritten zum Verkauf
              </h2>
              <p
                className="mx-auto mt-3 max-w-lg text-[14px] font-light leading-relaxed"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  color: "var(--qt-muted)",
                }}
              >
                Unser bewährter Prozess sorgt für einen reibungslosen und erfolgreichen Verkauf.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "Erstgespräch",
                desc: "Kostenlose und unverbindliche Beratung. Wir lernen Ihre Immobilie und Ihre Ziele kennen.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" stroke="var(--qt-accent)" strokeWidth="1.2" />
                    <path d="M10 14l2 2 6-6" stroke="var(--qt-accent)" strokeWidth="1.2" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "Bewertung",
                desc: "Professionelle Wertermittlung basierend auf aktuellen Marktdaten und Vergleichsobjekten.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="4" width="20" height="20" stroke="var(--qt-accent)" strokeWidth="1.2" />
                    <path d="M4 14h20M14 4v20" stroke="var(--qt-accent)" strokeWidth="0.8" strokeDasharray="2 2" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "Vermarktung",
                desc: "Premium-Exposé, professionelle Fotografie, virtuelle Rundgänge und gezielte Käuferansprache.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="6" width="20" height="16" rx="1" stroke="var(--qt-accent)" strokeWidth="1.2" />
                    <path d="M4 10l10 5 10-5" stroke="var(--qt-accent)" strokeWidth="1.2" />
                  </svg>
                ),
              },
              {
                num: "04",
                title: "Abschluss",
                desc: "Vertragsverhandlung, notarielle Abwicklung und persönliche Begleitung bis zur Schlüsselübergabe.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 22l8-8 4 4 6-10" stroke="var(--qt-accent)" strokeWidth="1.2" />
                    <circle cx="22" cy="8" r="3" stroke="var(--qt-accent)" strokeWidth="1.2" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div
                  className="relative p-6"
                  style={{
                    backgroundColor: "var(--qt-bg)",
                    borderTop: "2px solid var(--qt-accent)",
                  }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    {step.icon}
                    <span
                      className="text-[28px] font-bold"
                      style={{
                        fontFamily: "var(--qt-font-display)",
                        color: "var(--qt-border)",
                      }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h4
                    className="text-[16px] font-bold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="mt-2 text-[13px] font-light leading-relaxed"
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

      {/* Benefits */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--qt-bg)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: Text */}
            <FadeIn>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-8" style={{ backgroundColor: "var(--qt-gold)" }} />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.15em]"
                    style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-gold)" }}
                  >
                    Unsere Leistungen
                  </span>
                </div>
                <h2
                  className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                  }}
                >
                  Warum mit QUARTIER verkaufen?
                </h2>
                <p
                  className="mt-4 text-[14px] font-light leading-relaxed"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Wir vereinen lokale Marktkenntnis mit moderner Vermarktungsstrategie.
                  Jedes Objekt erhält eine maßgeschneiderte Strategie für den optimalen Verkaufserfolg.
                </p>
              </div>
            </FadeIn>

            {/* Right: Benefits grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Marktanalyse", desc: "Datenbasierte Bewertung mit aktuellen Vergleichswerten" },
                { title: "Professionelle Fotos", desc: "Hochwertige Fotografie und virtuelle 360°-Rundgänge" },
                { title: "Premium Exposé", desc: "Individuell gestaltete Exposés in Print und Digital" },
                { title: "Käufernetzwerk", desc: "Zugang zu vorgemerkten Suchkunden und Investoren" },
                { title: "Home Staging", desc: "Beratung zur optimalen Präsentation Ihrer Immobilie" },
                { title: "Rechtssicherheit", desc: "Vollständige Begleitung aller Vertragsverhandlungen" },
              ].map((benefit, i) => (
                <FadeIn key={benefit.title} delay={i * 0.08}>
                  <div
                    className="p-5"
                    style={{
                      backgroundColor: "var(--qt-surface)",
                      borderLeft: "2px solid var(--qt-accent)",
                    }}
                  >
                    <h5
                      className="text-[14px] font-bold"
                      style={{
                        fontFamily: "var(--qt-font-display)",
                        color: "var(--qt-dark)",
                      }}
                    >
                      {benefit.title}
                    </h5>
                    <p
                      className="mt-1.5 text-[12px] font-light leading-relaxed"
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        color: "var(--qt-muted)",
                      }}
                    >
                      {benefit.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section
        className="py-14"
        style={{
          backgroundColor: "var(--qt-dark)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "15+", label: "Jahre Erfahrung" },
              { value: "150+", label: "Objekte verkauft" },
              { value: "98%", label: "Zufriedene Kunden" },
            ].map((stat) => (
              <FadeIn key={stat.label}>
                <div>
                  <span
                    className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "#FFFFFF",
                    }}
                  >
                    {stat.value}
                  </span>
                  <p
                    className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em]"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Valuation Form */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--qt-surface)" }}>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div className="text-center">
              <div className="mb-3 flex items-center justify-center gap-3">
                <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-accent)" }}
                >
                  Kostenlose Bewertung
                </span>
                <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
              </div>
              <h2
                className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                }}
              >
                Bewertung anfragen
              </h2>
              <p
                className="mx-auto mt-3 max-w-md text-[14px] font-light leading-relaxed"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  color: "var(--qt-muted)",
                }}
              >
                Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {submitted ? (
              <div
                className="mt-10 p-8 text-center"
                style={{
                  backgroundColor: "var(--qt-accent-soft)",
                  border: "1px solid var(--qt-accent)",
                }}
              >
                <h3
                  className="text-[18px] font-bold"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                  }}
                >
                  Vielen Dank!
                </h3>
                <p
                  className="mt-2 text-[14px] font-light"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                {/* Object details */}
                <div
                  className="p-6"
                  style={{
                    backgroundColor: "var(--qt-bg)",
                    borderTop: "2px solid var(--qt-accent)",
                  }}
                >
                  <h4
                    className="mb-5 text-[14px] font-bold uppercase tracking-[0.08em]"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    Objektdaten
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <select
                      required
                      value={formData.objektart}
                      onChange={(e) => setFormData({ ...formData, objektart: e.target.value })}
                      className="px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    >
                      <option value="">Objektart wählen</option>
                      <option value="wohnung">Wohnung</option>
                      <option value="haus">Haus</option>
                      <option value="grundstueck">Grundstück</option>
                      <option value="gewerbe">Gewerbeimmobilie</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Adresse / PLZ / Ort"
                      value={formData.adresse}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                      className="px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Wohnfläche in m²"
                      value={formData.groesse}
                      onChange={(e) => setFormData({ ...formData, groesse: e.target.value })}
                      className="px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Anzahl Zimmer"
                      value={formData.zimmer}
                      onChange={(e) => setFormData({ ...formData, zimmer: e.target.value })}
                      className="px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Personal data */}
                <div
                  className="p-6"
                  style={{
                    backgroundColor: "var(--qt-bg)",
                    borderTop: "2px solid var(--qt-gold)",
                  }}
                >
                  <h4
                    className="mb-5 text-[14px] font-bold uppercase tracking-[0.08em]"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    Ihre Kontaktdaten
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      placeholder="Vor- und Nachname"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    />
                    <input
                      type="email"
                      required
                      placeholder="E-Mail-Adresse"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    />
                    <input
                      type="tel"
                      placeholder="Telefonnummer"
                      value={formData.telefon}
                      onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                      className="col-span-full px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)] sm:col-span-2"
                      style={inputStyle}
                    />
                    <textarea
                      placeholder="Weitere Informationen zu Ihrer Immobilie..."
                      rows={4}
                      value={formData.nachricht}
                      onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })}
                      className="col-span-full resize-none px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)] sm:col-span-2"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-[13px] font-semibold uppercase tracking-[0.1em] transition-opacity duration-300 hover:opacity-90"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    backgroundColor: "var(--qt-accent)",
                    color: "#FFFFFF",
                  }}
                >
                  Kostenlose Bewertung anfragen
                </button>

                <p
                  className="text-center text-[11px] font-light"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Unverbindlich und kostenfrei. Wir behandeln Ihre Daten vertraulich.
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
