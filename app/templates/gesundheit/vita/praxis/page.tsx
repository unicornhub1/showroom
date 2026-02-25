"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Play, Check, Accessibility, MapPin } from "lucide-react";
import { rooms, equipment, directions, contactInfo } from "../_design/data";

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

/* ── Praxis Page ──────────────────────────────────────────────────────── */

export default function PraxisPage() {
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
        <div
          className="vt-blob absolute"
          style={{
            width: "350px",
            height: "350px",
            bottom: "-60px",
            right: "-80px",
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
                Unsere Praxis
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
              R&auml;ume, die
              <br />
              <span style={{ color: "var(--vt-accent)" }}>Heilung f&ouml;rdern</span>
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
              Unsere modern gestalteten Praxisr&auml;ume verbinden Funktion
              mit Wohlf&uuml;hlatmosph&auml;re. Helle Farben, nat&uuml;rliche
              Materialien und durchdachte Abl&auml;ufe sorgen f&uuml;r einen
              angenehmen Besuch.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Virtual Tour Teaser ─────────────────────────────────────── */}
      <section
        className="py-6"
        style={{ backgroundColor: "var(--vt-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <FadeIn>
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                aspectRatio: "21/9",
                background:
                  "linear-gradient(135deg, #0D9488 0%, #6EE7B7 30%, #A7F3D0 50%, #ECFDF5 70%, #F0F7F4 100%)",
                boxShadow: "var(--vt-shadow-lg)",
              }}
            >
              {/* Overlay with play icon */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(26, 35, 50, 0.15) 0%, rgba(26, 35, 50, 0.4) 100%)",
                }}
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--vt-accent)",
                      marginLeft: "4px",
                    }}
                  >
                    <Play className="h-7 w-7" />
                  </span>
                </div>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.9)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Virtueller Rundgang
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Rooms Grid ──────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <FadeIn className="mb-16">
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
                Unsere R&auml;umlichkeiten
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--vt-text)",
              }}
            >
              Einblick in unsere Praxis
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, i) => (
              <FadeIn key={room.id} delay={i * 0.08}>
                <div
                  className="vt-card-hover group overflow-hidden rounded-2xl border"
                  style={{
                    backgroundColor: "var(--vt-surface)",
                    borderColor: "var(--vt-border)",
                    boxShadow: "var(--vt-shadow)",
                  }}
                >
                  {/* Image placeholder */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: "4/3",
                      background: room.gradient,
                    }}
                  >
                    {/* Room number overlay */}
                    <div
                      className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span
                        className="text-[11px] font-semibold"
                        style={{
                          fontFamily: "var(--vt-font-display)",
                          color: "var(--vt-accent)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--vt-text)",
                      }}
                    >
                      {room.name}
                    </h3>
                    <p
                      className="mt-2 text-[14px] leading-relaxed"
                      style={{
                        fontFamily: "var(--vt-font-body)",
                        color: "var(--vt-muted)",
                      }}
                    >
                      {room.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Equipment / Technology ──────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Text */}
            <div className="lg:col-span-5">
              <FadeIn>
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
                    Ausstattung
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: "var(--vt-text)",
                  }}
                >
                  Moderne{" "}
                  <span style={{ color: "var(--vt-accent)" }}>Ausstattung</span>
                </h2>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: "var(--vt-font-body)",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    color: "var(--vt-muted)",
                  }}
                >
                  Wir investieren kontinuierlich in modernste Medizintechnik und
                  digitale L&ouml;sungen, um Ihnen die bestm&ouml;gliche
                  Diagnostik und Behandlung zu bieten.
                </p>
              </FadeIn>
            </div>

            {/* Equipment grid */}
            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {equipment.map((item, i) => (
                  <FadeIn key={i} delay={i * 0.05}>
                    <div
                      className="flex items-start gap-3 rounded-xl border p-4 transition-all duration-300 hover:shadow-md"
                      style={{
                        backgroundColor: "var(--vt-surface)",
                        borderColor: "var(--vt-border)",
                      }}
                    >
                      <span
                        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[10px]"
                        style={{
                          backgroundColor: "var(--vt-accent-soft)",
                          color: "var(--vt-accent)",
                        }}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span
                        className="text-[14px]"
                        style={{
                          fontFamily: "var(--vt-font-body)",
                          color: "var(--vt-text)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Accessibility ───────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-24"
        style={{ backgroundColor: "var(--vt-mint)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <FadeIn>
            <div
              className="rounded-2xl border p-8 lg:p-12"
              style={{
                backgroundColor: "var(--vt-surface)",
                borderColor: "var(--vt-border)",
                boxShadow: "var(--vt-shadow)",
              }}
            >
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Accessibility className="h-6 w-6" style={{ color: "var(--vt-accent)" }} />
                    <h2
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "var(--vt-text)",
                      }}
                    >
                      Barrierefreie Praxis
                    </h2>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      fontSize: "1.05rem",
                      lineHeight: 1.7,
                      color: "var(--vt-muted)",
                    }}
                  >
                    Unsere Praxis ist vollst&auml;ndig barrierefrei zug&auml;nglich.
                    Ein stufenloser Eingang, breite T&uuml;ren und ein
                    barrierefreies WC gew&auml;hrleisten, dass sich alle Patienten
                    bei uns willkommen f&uuml;hlen.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "\uD83D\uDEAA", label: "Stufenloser Eingang" },
                    { icon: "\uD83D\uDEBD", label: "Barrierefreies WC" },
                    { icon: "\uD83C\uDD7F\uFE0F", label: "Behindertenparkplatz" },
                    { icon: "\uD83E\uDDBB", label: "Haltegriffe vorhanden" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-xl p-3"
                      style={{ backgroundColor: "var(--vt-accent-soft)" }}
                    >
                      <span style={{ fontSize: "18px" }}>{item.icon}</span>
                      <span
                        className="text-[13px] font-medium"
                        style={{
                          fontFamily: "var(--vt-font-display)",
                          color: "var(--vt-text)",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Directions ──────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Map placeholder */}
            <FadeIn className="lg:col-span-6">
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  aspectRatio: "4/3",
                  background:
                    "linear-gradient(160deg, #E5E7EB 0%, #D1D5DB 30%, #9CA3AF 60%, #6B7280 100%)",
                  boxShadow: "var(--vt-shadow-lg)",
                }}
              >
                {/* Map pin icon overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ opacity: 0.4, color: "var(--vt-accent)" }}>
                    <MapPin className="h-12 w-12" />
                  </span>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    Kartenansicht
                  </p>
                </div>

                {/* Address badge */}
                <div
                  className="absolute bottom-4 left-4 rounded-xl px-5 py-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p
                    className="text-[13px] font-semibold"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-text)",
                    }}
                  >
                    {contactInfo.address}
                  </p>
                  <p
                    className="text-[12px]"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-muted)",
                    }}
                  >
                    {contactInfo.city}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Directions */}
            <div className="lg:col-span-6">
              <FadeIn>
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
                    Anfahrt
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: "var(--vt-text)",
                  }}
                >
                  So finden Sie uns
                </h2>
              </FadeIn>

              <div className="mt-8 space-y-5">
                {[
                  { icon: "\uD83D\uDE8C", label: "Bus", text: directions.bus },
                  { icon: "\uD83D\uDE83", label: "Saarbahn", text: directions.bahn },
                  { icon: "\uD83D\uDE97", label: "Auto", text: directions.auto },
                  { icon: "\uD83D\uDEB2", label: "Fahrrad", text: directions.fahrrad },
                ].map((dir, j) => (
                  <FadeIn key={dir.label} delay={j * 0.1}>
                    <div
                      className="flex items-start gap-4 rounded-xl border p-5 transition-all duration-300 hover:shadow-md"
                      style={{
                        backgroundColor: "var(--vt-bg)",
                        borderColor: "var(--vt-border)",
                      }}
                    >
                      <span className="text-2xl flex-shrink-0">{dir.icon}</span>
                      <div>
                        <h3
                          className="text-[14px] font-semibold"
                          style={{
                            fontFamily: "var(--vt-font-display)",
                            color: "var(--vt-text)",
                          }}
                        >
                          {dir.label}
                        </h3>
                        <p
                          className="mt-1 text-[14px] leading-relaxed"
                          style={{
                            fontFamily: "var(--vt-font-body)",
                            color: "var(--vt-muted)",
                          }}
                        >
                          {dir.text}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-28"
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
              Wir freuen uns auf{" "}
              <span style={{ color: "var(--vt-accent)" }}>Ihren Besuch</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href={`${BASE}/kontakt`}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium tracking-[0.02em] transition-all duration-300 hover:shadow-lg"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "#FFFFFF",
                backgroundColor: "var(--vt-accent)",
              }}
            >
              Termin vereinbaren
              <span>&rarr;</span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
