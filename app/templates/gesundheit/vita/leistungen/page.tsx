"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";
import { services } from "../_design/data";

const BASE = "/templates/gesundheit/vita";

/* ── FadeIn Component ─────────────────────────────────────────────────── */

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

/* ── Leistungen Page ──────────────────────────────────────────────────── */

export default function LeistungenPage() {
  return (
    <div>
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{
          background:
            "linear-gradient(135deg, #ECFDF5 0%, #F9FAFB 40%, #FFFFFF 70%, #F0F7F4 100%)",
        }}
      >
        {/* Decorative blob */}
        <div
          className="vt-blob absolute"
          style={{
            width: "400px",
            height: "400px",
            top: "-80px",
            right: "-60px",
            background:
              "radial-gradient(ellipse, rgba(13, 148, 136, 0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-10"
                style={{ backgroundColor: "var(--vt-accent)" }}
              />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-accent)",
                }}
              >
                Unsere Leistungen
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--vt-text)",
              }}
            >
              Umfassende Medizin
              <br />
              <span style={{ color: "var(--vt-accent)" }}>
                f&uuml;r Ihr Wohlbefinden
              </span>
            </h1>

            <p
              className="mt-5 max-w-xl"
              style={{
                fontFamily: "var(--vt-font-body)",
                fontSize: "1.15rem",
                lineHeight: 1.7,
                color: "var(--vt-muted)",
              }}
            >
              Von der klassischen Allgemeinmedizin &uuml;ber Naturheilverfahren
              bis zur Sportmedizin &ndash; unser breites Spektrum an Leistungen
              bietet f&uuml;r jeden Patienten die passende Versorgung.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Services Detail ─────────────────────────────────────────── */}
      {services.map((service, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className="py-20 lg:py-28"
            style={{
              backgroundColor: isEven ? "var(--vt-bg)" : "var(--vt-surface)",
            }}
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
              <div
                className={`grid items-start gap-12 lg:grid-cols-12 lg:gap-16 ${
                  isEven ? "" : "direction-rtl"
                }`}
              >
                {/* Content side */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <FadeIn>
                    {/* Number + icon row */}
                    <div className="mb-6 flex items-center gap-4">
                      <span
                        className="text-[13px] font-medium"
                        style={{
                          fontFamily: "var(--vt-font-display)",
                          color: "var(--vt-border-strong)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        className="h-px flex-1 max-w-[40px]"
                        style={{ backgroundColor: "var(--vt-border-strong)" }}
                      />
                      <span style={{ fontSize: "24px" }}>{service.icon}</span>
                    </div>

                    <h2
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        fontWeight: 600,
                        lineHeight: 1.2,
                        color: "var(--vt-text)",
                      }}
                    >
                      {service.name}
                    </h2>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <p
                      className="mt-4"
                      style={{
                        fontFamily: "var(--vt-font-body)",
                        fontSize: "1.1rem",
                        lineHeight: 1.8,
                        color: "var(--vt-muted)",
                      }}
                    >
                      {service.details}
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <div className="mt-8">
                      <h3
                        className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
                        style={{
                          fontFamily: "var(--vt-font-display)",
                          color: "var(--vt-accent)",
                        }}
                      >
                        Das umfasst unser Angebot
                      </h3>
                      <ul className="space-y-3">
                        {service.includes.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span
                              className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                              style={{
                                backgroundColor: "var(--vt-accent-soft)",
                                color: "var(--vt-accent)",
                              }}
                            >
                              <Check className="h-3 w-3" />
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--vt-font-body)",
                                fontSize: "1rem",
                                lineHeight: 1.6,
                                color: "var(--vt-text)",
                              }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                </div>

                {/* Decorative side */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <FadeIn delay={0.15}>
                    <div
                      className="relative overflow-hidden rounded-3xl"
                      style={{
                        aspectRatio: "4/3",
                        background: isEven
                          ? `linear-gradient(${135 + i * 20}deg, rgba(13, 148, 136, 0.15) 0%, rgba(236, 253, 245, 0.8) 40%, rgba(240, 247, 244, 0.9) 100%)`
                          : `linear-gradient(${160 + i * 15}deg, rgba(245, 158, 11, 0.08) 0%, rgba(13, 148, 136, 0.1) 40%, rgba(236, 253, 245, 0.6) 100%)`,
                        boxShadow: "var(--vt-shadow-lg)",
                      }}
                    >
                      {/* Central icon */}
                      <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-2xl"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          backdropFilter: "blur(8px)",
                          fontSize: "36px",
                          boxShadow: "var(--vt-shadow)",
                        }}
                      >
                        {service.icon}
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── CTA Section ─────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{
          background:
            "linear-gradient(135deg, #ECFDF5 0%, #F0F7F4 40%, #FFFFFF 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <FadeIn>
            <h2
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 600,
                lineHeight: 1.3,
                color: "var(--vt-text)",
              }}
            >
              Haben Sie Fragen zu unseren{" "}
              <span style={{ color: "var(--vt-accent)" }}>Leistungen</span>?
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="mx-auto mt-4 max-w-lg"
              style={{
                fontFamily: "var(--vt-font-body)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--vt-muted)",
              }}
            >
              Wir beraten Sie gerne pers&ouml;nlich und finden gemeinsam die
              passende Behandlung f&uuml;r Ihre Bed&uuml;rfnisse.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`${BASE}/kontakt`}
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium tracking-[0.02em] transition-all duration-300 hover:shadow-lg"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "#FFFFFF",
                  backgroundColor: "var(--vt-accent)",
                }}
              >
                Termin vereinbaren
                <span>&rarr;</span>
              </Link>
              <Link
                href={`${BASE}/team`}
                className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-[15px] font-medium tracking-[0.02em] transition-all duration-300 hover:bg-[var(--vt-accent-soft)]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-accent)",
                  borderColor: "var(--vt-border-strong)",
                }}
              >
                Unser Team
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
