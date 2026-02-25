"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { teamMembers } from "../_design/data";

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

export default function UeberUnsPage() {
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
        {/* Blueprint corner marks */}
        <div className="absolute left-8 top-[100px] hidden lg:block" style={{ opacity: 0.15 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M0 0L30 0M0 0L0 30" stroke="#2563EB" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 hidden lg:block" style={{ opacity: 0.15 }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M30 30L0 30M30 30L30 0" stroke="#2563EB" strokeWidth="1" />
          </svg>
        </div>

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
              Über uns
            </span>
          </div>
          <div className="max-w-2xl">
            <h1
              className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
              style={{
                fontFamily: "var(--qt-font-display)",
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Über QUARTIER
            </h1>
            <p
              className="mt-4 max-w-lg text-[14px] font-light leading-relaxed"
              style={{
                fontFamily: "var(--qt-font-body)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Seit 2011 vermitteln wir Premium-Immobilien in München und Umgebung.
              Mit Leidenschaft, Expertise und einem kompromisslosen Qualitätsanspruch.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--qt-surface)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <FadeIn>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-8" style={{ backgroundColor: "var(--qt-accent)" }} />
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.15em]"
                    style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-accent)" }}
                  >
                    Unsere Geschichte
                  </span>
                </div>
                <h2
                  className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                  }}
                >
                  Immobilien sind mehr als Quadratmeter
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-5">
                <p
                  className="text-[14px] font-light leading-[1.8]"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  QUARTIER wurde 2011 von Alexander Hoffmann mit einer klaren Vision gegründet:
                  Immobilienvermittlung auf einem Niveau, das dem Wert der Objekte und der Erwartung
                  unserer Kunden gerecht wird. In einer Branche, die oft von Schnelligkeit geprägt ist,
                  setzen wir auf Sorgfalt, Transparenz und persönliche Beziehungen.
                </p>
                <p
                  className="text-[14px] font-light leading-[1.8]"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Heute sind wir ein Team von fünf Experten mit drei Standorten in München,
                  Starnberg und Grünwald. Jedes Mitglied bringt einzigartige Kompetenzen mit --
                  von der Immobilienbewertung über Marketing bis zur rechtlichen Beratung.
                </p>
                <p
                  className="text-[14px] font-light leading-[1.8]"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Was uns antreibt? Die Überzeugung, dass jede Immobilie eine Geschichte hat
                  und dass der perfekte Match zwischen Objekt und Mensch den Unterschied macht.
                  Darum nehmen wir uns Zeit, hören zu und beraten ehrlich.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--qt-bg)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div className="mb-14 text-center">
              <h2
                className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                }}
              >
                Unsere Werte
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Transparenz",
                desc: "Offene Kommunikation und ehrliche Beratung. Wir verschweigen nichts und versprechen nur, was wir halten können.",
                accent: "var(--qt-accent)",
              },
              {
                title: "Expertise",
                desc: "Fundiertes Fachwissen und langjährige Markterfahrung. Jeder im Team ist Spezialist in seinem Bereich.",
                accent: "var(--qt-accent)",
              },
              {
                title: "Persönlichkeit",
                desc: "Jeder Kunde ist einzigartig. Wir nehmen uns Zeit für individuelle Beratung und maßgeschneiderte Lösungen.",
                accent: "var(--qt-gold)",
              },
              {
                title: "Qualität",
                desc: "Kompromissloser Anspruch an jedes Detail. Von der Fotografie bis zum Vertragswerk -- alles auf höchstem Niveau.",
                accent: "var(--qt-gold)",
              },
            ].map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div
                  className="relative h-full p-6"
                  style={{
                    backgroundColor: "var(--qt-surface)",
                    borderTop: `3px solid ${value.accent}`,
                  }}
                >
                  {/* Number */}
                  <span
                    className="text-[48px] font-bold leading-none"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-border-light)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4
                    className="mt-3 text-[17px] font-bold"
                    style={{
                      fontFamily: "var(--qt-font-display)",
                      color: "var(--qt-dark)",
                    }}
                  >
                    {value.title}
                  </h4>
                  <p
                    className="mt-2 text-[13px] font-light leading-relaxed"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-muted)",
                    }}
                  >
                    {value.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
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
                  Das Team
                </span>
              </div>
              <h2
                className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                }}
              >
                Die Menschen hinter QUARTIER
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.1}>
                <div
                  className="group overflow-hidden transition-shadow duration-400 hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--qt-bg)",
                    border: "1px solid var(--qt-border-light)",
                  }}
                >
                  {/* Avatar with initials */}
                  <div
                    className="flex h-[200px] items-center justify-center"
                    style={{ background: member.gradient }}
                  >
                    <span
                      className="text-[40px] font-bold tracking-[0.1em]"
                      style={{
                        fontFamily: "var(--qt-font-display)",
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {member.initials}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h4
                      className="text-[16px] font-bold"
                      style={{
                        fontFamily: "var(--qt-font-display)",
                        color: "var(--qt-dark)",
                      }}
                    >
                      {member.name}
                    </h4>
                    <p
                      className="mt-0.5 text-[12px] font-medium uppercase tracking-[0.08em]"
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        color: "var(--qt-accent)",
                      }}
                    >
                      {member.role}
                    </p>
                    <p
                      className="mt-3 text-[13px] font-light leading-relaxed"
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        color: "var(--qt-muted)",
                      }}
                    >
                      {member.bio}
                    </p>

                    {/* Contact details */}
                    <div
                      className="mt-4 flex flex-col gap-1.5 border-t pt-4"
                      style={{ borderColor: "var(--qt-border-light)" }}
                    >
                      <p
                        className="text-[12px] font-light"
                        style={{
                          fontFamily: "var(--qt-font-body)",
                          color: "var(--qt-muted)",
                        }}
                      >
                        {member.phone}
                      </p>
                      <p
                        className="text-[12px] font-light"
                        style={{
                          fontFamily: "var(--qt-font-body)",
                          color: "var(--qt-muted)",
                        }}
                      >
                        {member.email}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "var(--qt-bg)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div className="mb-14">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8" style={{ backgroundColor: "var(--qt-gold)" }} />
                <span
                  className="text-[11px] font-medium uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-gold)" }}
                >
                  Unsere Standorte
                </span>
              </div>
              <h2
                className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                }}
              >
                Vor Ort für Sie da
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                city: "München",
                label: "Hauptsitz",
                address: "Maximilianstraße 12",
                zip: "80539 München",
                phone: "+49 89 123 456 0",
              },
              {
                city: "Starnberg",
                label: "Filiale Süd",
                address: "Hauptstraße 8",
                zip: "82319 Starnberg",
                phone: "+49 8151 789 012",
              },
              {
                city: "Grünwald",
                label: "Filiale",
                address: "Rathausstraße 3",
                zip: "82031 Grünwald",
                phone: "+49 89 649 345 0",
              },
            ].map((office, i) => (
              <FadeIn key={office.city} delay={i * 0.1}>
                <div
                  className="relative h-full p-6"
                  style={{
                    backgroundColor: "var(--qt-surface)",
                    borderLeft: "2px solid var(--qt-accent)",
                  }}
                >
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--qt-font-body)",
                      color: "var(--qt-accent)",
                    }}
                  >
                    {office.label}
                  </span>
                  <h4
                    className="mt-2 text-[20px] font-bold"
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
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        color: "var(--qt-muted)",
                      }}
                    >
                      {office.address}
                    </p>
                    <p
                      className="text-[13px] font-light"
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        color: "var(--qt-muted)",
                      }}
                    >
                      {office.zip}
                    </p>
                    <p
                      className="text-[13px] font-light"
                      style={{
                        fontFamily: "var(--qt-font-body)",
                        color: "var(--qt-muted)",
                      }}
                    >
                      {office.phone}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 sm:py-20"
        style={{ backgroundColor: "var(--qt-dark)" }}
      >
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
          <FadeIn>
            <h2
              className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold"
              style={{
                fontFamily: "var(--qt-font-display)",
                color: "#FFFFFF",
              }}
            >
              Lernen Sie uns persönlich kennen
            </h2>
            <p
              className="mx-auto mt-3 max-w-md text-[14px] font-light leading-relaxed"
              style={{
                fontFamily: "var(--qt-font-body)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Vereinbaren Sie ein unverbindliches Erstgespräch. Wir freuen uns auf Sie.
            </p>
            <Link
              href={`${BASE}/kontakt`}
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-semibold tracking-[0.04em] transition-opacity duration-300 hover:opacity-90"
              style={{
                fontFamily: "var(--qt-font-body)",
                backgroundColor: "var(--qt-accent)",
                color: "#FFFFFF",
              }}
            >
              Kontakt aufnehmen
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
