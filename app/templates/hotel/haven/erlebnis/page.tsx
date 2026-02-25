"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { experiences } from "../_design/data";

const BASE = "/templates/hotel/haven";

/* ── FadeIn ────────────────────────────────────────────────────────────── */

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
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
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

/* ── Erlebnis Page ────────────────────────────────────────────────────── */

export default function ErlebnisPage() {
  return (
    <div>
      {/* Page hero */}
      <section
        className="relative flex items-end overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44"
        style={{
          background:
            "linear-gradient(160deg, var(--hv-bg) 0%, var(--hv-sage) 40%, var(--hv-blush) 80%, var(--hv-bg) 100%)",
          minHeight: "45vh",
        }}
      >
        {/* Decorative elements */}
        <div
          className="hv-float absolute hidden lg:block"
          style={{
            top: "15%",
            right: "15%",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            border: "1px solid rgba(184, 150, 90, 0.15)",
          }}
        />
        <div
          className="hv-float absolute hidden lg:block"
          style={{
            bottom: "20%",
            right: "8%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,150,90,0.1) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{
              fontFamily: "var(--hv-font-display)",
              color: "var(--hv-accent)",
            }}
          >
            Erlebnisse
          </span>
          <h1
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--hv-font-display)",
              color: "var(--hv-text)",
            }}
          >
            Momente f&uuml;r die Sinne
          </h1>
          <div
            className="mt-6 h-px w-16"
            style={{ backgroundColor: "var(--hv-accent)" }}
          />
          <p
            className="mt-6 max-w-lg text-lg italic leading-relaxed"
            style={{
              fontFamily: "var(--hv-font-body)",
              color: "var(--hv-muted)",
            }}
          >
            Von entspannenden Spa-Ritualen &uuml;ber kulinarische Entdeckungen bis hin zu
            Abenteuern in der Natur &ndash; jedes Erlebnis im HAVEN ist ein Geschenk an sich selbst.
          </p>
        </div>
      </section>

      {/* Experience listings - alternating editorial layout */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--hv-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-28 lg:space-y-40">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.id}>
                <div
                  className={`grid items-center gap-12 lg:grid-cols-5 lg:gap-16 ${
                    i % 2 === 1 ? "" : ""
                  }`}
                >
                  {/* Image: 3 cols on even, 2 cols reordered on odd */}
                  <div
                    className={`lg:col-span-3 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div
                      className="aspect-[16/10] w-full overflow-hidden rounded-sm"
                      style={{ background: exp.gradient }}
                    />
                  </div>

                  {/* Text content: 2 cols */}
                  <div
                    className={`lg:col-span-2 ${i % 2 === 1 ? "lg:order-1 lg:pr-8" : "lg:pl-4"}`}
                  >
                    {/* Number */}
                    <span
                      className="text-5xl font-light"
                      style={{
                        fontFamily: "var(--hv-font-body)",
                        color: "var(--hv-accent)",
                        opacity: 0.3,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h2
                      className="mt-4 text-2xl sm:text-3xl"
                      style={{
                        fontFamily: "var(--hv-font-display)",
                        color: "var(--hv-text)",
                      }}
                    >
                      {exp.name}
                    </h2>

                    <div
                      className="my-5 h-px w-10"
                      style={{ backgroundColor: "var(--hv-accent)" }}
                    />

                    <p
                      className="text-base leading-[1.85]"
                      style={{
                        fontFamily: "var(--hv-font-body)",
                        color: "var(--hv-muted)",
                      }}
                    >
                      {exp.description}
                    </p>

                    {/* Schedule badge */}
                    <div
                      className="mt-6 inline-flex items-center gap-2 rounded-sm px-4 py-2"
                      style={{
                        backgroundColor: "var(--hv-card)",
                        border: "1px solid var(--hv-blush)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--hv-accent)"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-text)",
                        }}
                      >
                        {exp.schedule}
                      </span>
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`${BASE}/kontakt`}
                        className="inline-block border-b pb-0.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-60"
                        style={{
                          fontFamily: "var(--hv-font-display)",
                          color: "var(--hv-text)",
                          borderColor: "var(--hv-accent)",
                        }}
                      >
                        Anfrage senden
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom banner */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{
          background:
            "linear-gradient(135deg, var(--hv-forest) 0%, #3A5139 60%, var(--hv-forest) 100%)",
        }}
      >
        <div
          className="hv-float absolute"
          style={{
            top: "-40px",
            right: "-30px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            border: "1px solid rgba(184, 150, 90, 0.12)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <h2
              className="text-3xl sm:text-4xl"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-surface)",
              }}
            >
              Bereit f&uuml;r Ihr Erlebnis?
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-lg italic leading-relaxed"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-sage)",
              }}
            >
              Sprechen Sie uns an &ndash; wir stellen Ihnen gerne ein individuelles
              Erlebnispaket zusammen.
            </p>
            <Link
              href={`${BASE}/kontakt`}
              className="mt-8 inline-block px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-85"
              style={{
                fontFamily: "var(--hv-font-display)",
                backgroundColor: "var(--hv-accent)",
                color: "var(--hv-surface)",
              }}
            >
              Kontakt aufnehmen
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
