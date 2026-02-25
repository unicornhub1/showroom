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

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    anliegen: "",
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
        className="relative overflow-hidden py-16 sm:py-20"
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
              Kontakt
            </span>
          </div>
          <h1
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold"
            style={{
              fontFamily: "var(--qt-font-display)",
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Kontakt
          </h1>
          <p
            className="mt-3 max-w-lg text-[14px] font-light leading-relaxed"
            style={{
              fontFamily: "var(--qt-font-body)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Wir freuen uns auf Ihre Nachricht. Ob Kaufinteresse, Verkaufsanfrage
            oder allgemeine Beratung -- wir sind gerne für Sie da.
          </p>
        </div>
      </section>

      {/* Contact form + Info */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--qt-bg)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-5 lg:gap-12">
            {/* Form - 3 cols */}
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
                    <span
                      className="text-[11px] font-medium uppercase tracking-[0.15em]"
                      style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-accent)" }}
                    >
                      Nachricht senden
                    </span>
                  </div>
                  <h2
                    className="text-[clamp(1.4rem,3vw,2rem)] font-bold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    Schreiben Sie uns
                  </h2>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                {submitted ? (
                  <div
                    className="p-8"
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
                      Nachricht gesendet!
                    </h3>
                    <p
                      className="mt-2 text-[14px] font-light"
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        color: "var(--qt-muted)",
                      }}
                    >
                      Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <select
                      required
                      value={formData.anliegen}
                      onChange={(e) => setFormData({ ...formData, anliegen: e.target.value })}
                      className="w-full px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    >
                      <option value="">Anliegen wählen</option>
                      <option value="kauf">Kaufinteresse</option>
                      <option value="verkauf">Verkaufsanfrage</option>
                      <option value="bewertung">Immobilienbewertung</option>
                      <option value="beratung">Allgemeine Beratung</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>

                    <div className="grid gap-5 sm:grid-cols-2">
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
                    </div>

                    <input
                      type="tel"
                      placeholder="Telefonnummer (optional)"
                      value={formData.telefon}
                      onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                      className="w-full px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    />

                    <textarea
                      required
                      rows={5}
                      placeholder="Ihre Nachricht..."
                      value={formData.nachricht}
                      onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })}
                      className="w-full resize-none px-4 py-3 text-[13px] font-light outline-none transition-colors duration-300 focus:border-[var(--qt-accent)]"
                      style={inputStyle}
                    />

                    <button
                      type="submit"
                      className="w-full py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-opacity duration-300 hover:opacity-90 sm:w-auto sm:px-10"
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        backgroundColor: "var(--qt-accent)",
                        color: "#FFFFFF",
                      }}
                    >
                      Nachricht senden
                    </button>

                    <p
                      className="text-[11px] font-light"
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        color: "var(--qt-muted)",
                      }}
                    >
                      Wir behandeln Ihre Daten vertraulich gemäß unserer Datenschutzerklärung.
                    </p>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Info sidebar - 2 cols */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.2}>
                {/* Contact info card */}
                <div
                  className="p-6"
                  style={{
                    backgroundColor: "var(--qt-surface)",
                    borderTop: "3px solid var(--qt-accent)",
                  }}
                >
                  <h3
                    className="text-[16px] font-bold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    Kontaktdaten
                  </h3>
                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                        <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="var(--qt-accent)" strokeWidth="1.2" />
                        <circle cx="8" cy="6" r="1.5" stroke="var(--qt-accent)" strokeWidth="1" />
                      </svg>
                      <div>
                        <p
                          className="text-[13px] font-medium"
                          style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-text)" }}
                        >
                          Musterstraße 1
                        </p>
                        <p
                          className="text-[12px] font-light"
                          style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                        >
                          10115 Berlin
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                        <path d="M14.5 11.2v1.8a1.2 1.2 0 01-1.3 1.2A11.9 11.9 0 011.8 2.8 1.2 1.2 0 013 1.5h1.8a1.2 1.2 0 011.2 1c.14.76.4 1.5.76 2.17a1.2 1.2 0 01-.27 1.34l-.76.76a9.6 9.6 0 004.5 4.5l.76-.76a1.2 1.2 0 011.34-.27c.67.36 1.41.62 2.17.76a1.2 1.2 0 011 1.2z" stroke="var(--qt-accent)" strokeWidth="1.2" />
                      </svg>
                      <div>
                        <p
                          className="text-[13px] font-medium"
                          style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-text)" }}
                        >
                          +49 (0) 30 123 456 78
                        </p>
                        <p
                          className="text-[12px] font-light"
                          style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                        >
                          Mo-Fr 09:00 - 18:00
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                        <rect x="1" y="3" width="14" height="10" rx="1" stroke="var(--qt-accent)" strokeWidth="1.2" />
                        <path d="M1 4l7 4.5L15 4" stroke="var(--qt-accent)" strokeWidth="1.2" />
                      </svg>
                      <p
                        className="text-[13px] font-medium"
                        style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-text)" }}
                      >
                        info@beispiel.de
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opening hours */}
                <div
                  className="mt-6 p-6"
                  style={{
                    backgroundColor: "var(--qt-surface)",
                    borderTop: "3px solid var(--qt-gold)",
                  }}
                >
                  <h3
                    className="text-[16px] font-bold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    Öffnungszeiten
                  </h3>
                  <div className="mt-4 space-y-2.5">
                    {[
                      { day: "Montag - Freitag", time: "09:00 - 18:00 Uhr" },
                      { day: "Samstag", time: "10:00 - 14:00 Uhr" },
                      { day: "Sonntag", time: "Geschlossen" },
                    ].map((slot) => (
                      <div key={slot.day} className="flex items-center justify-between">
                        <span
                          className="text-[13px] font-light"
                          style={{
                            fontFamily: "var(--qt-font-body)",
                            color: "var(--qt-muted)",
                          }}
                        >
                          {slot.day}
                        </span>
                        <span
                          className="text-[13px] font-medium"
                          style={{
                            fontFamily: "var(--qt-font-body)",
                            color: "var(--qt-text)",
                          }}
                        >
                          {slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p
                    className="mt-4 text-[11px] font-light"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-muted)",
                    }}
                  >
                    Besichtigungstermine nach Vereinbarung auch außerhalb der Öffnungszeiten.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--qt-surface)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div className="mb-14">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-accent)" }}
                >
                  Standorte
                </span>
              </div>
              <h2
                className="text-[clamp(1.4rem,3vw,2rem)] font-bold"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                }}
              >
                Unsere Büros
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                city: "Standort 1",
                label: "Hauptsitz",
                address: "Musterstraße 1",
                zip: "10115 Berlin",
                phone: "+49 (0) 30 123 456 78",
                email: "info@beispiel.de",
                accent: "var(--qt-accent)",
              },
              {
                city: "Standort 2",
                label: "Filiale Süd",
                address: "Musterstraße 1",
                zip: "10115 Berlin",
                phone: "+49 (0) 30 123 456 78",
                email: "info@beispiel.de",
                accent: "var(--qt-accent)",
              },
              {
                city: "Standort 3",
                label: "Filiale",
                address: "Musterstraße 1",
                zip: "10115 Berlin",
                phone: "+49 (0) 30 123 456 78",
                email: "info@beispiel.de",
                accent: "var(--qt-gold)",
              },
            ].map((office, i) => (
              <FadeIn key={office.city} delay={i * 0.1}>
                <div
                  className="h-full p-6"
                  style={{
                    backgroundColor: "var(--qt-bg)",
                    borderTop: `3px solid ${office.accent}`,
                  }}
                >
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: office.accent,
                    }}
                  >
                    {office.label}
                  </span>
                  <h4
                    className="mt-2 text-[22px] font-bold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    {office.city}
                  </h4>
                  <div className="mt-4 space-y-1.5">
                    <p
                      className="text-[13px] font-light"
                      style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                    >
                      {office.address}
                    </p>
                    <p
                      className="text-[13px] font-light"
                      style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                    >
                      {office.zip}
                    </p>
                    <p
                      className="text-[13px] font-light"
                      style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                    >
                      {office.phone}
                    </p>
                    <p
                      className="text-[13px] font-light"
                      style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                    >
                      {office.email}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Map placeholder */}
          <FadeIn delay={0.2}>
            <div
              className="relative mt-10 flex h-[300px] items-center justify-center overflow-hidden"
              style={{
                backgroundColor: "var(--qt-card)",
                border: "1px solid var(--qt-border-light)",
              }}
            >
              {/* Geometric grid as map stand-in */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Location markers */}
              <div className="absolute left-[30%] top-[40%]">
                <div className="relative">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: "var(--qt-accent)",
                      boxShadow: "0 0 0 4px rgba(37,99,235,0.2)",
                    }}
                  />
                  <span
                    className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-accent)",
                    }}
                  >
                    Standort 1
                  </span>
                </div>
              </div>
              <div className="absolute left-[55%] top-[55%]">
                <div className="relative">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: "var(--qt-accent)",
                      boxShadow: "0 0 0 4px rgba(37,99,235,0.2)",
                    }}
                  />
                  <span
                    className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-accent)",
                    }}
                  >
                    Standort 2
                  </span>
                </div>
              </div>
              <div className="absolute left-[40%] top-[60%]">
                <div className="relative">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: "var(--qt-gold)",
                      boxShadow: "0 0 0 4px rgba(184,150,90,0.2)",
                    }}
                  />
                  <span
                    className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-gold)",
                    }}
                  >
                    Standort 3
                  </span>
                </div>
              </div>
              {/* Center label */}
              <div className="relative z-10 text-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="var(--qt-muted)" strokeWidth="1.5" />
                  <circle cx="12" cy="9" r="2" stroke="var(--qt-muted)" strokeWidth="1.5" />
                </svg>
                <p
                  className="text-[12px] font-medium"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Unsere Standorte
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
