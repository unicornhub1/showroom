"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { teamMembers } from "../_design/data";

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

/* ── Team Page ────────────────────────────────────────────────────────── */

export default function TeamPage() {
  const featured = teamMembers.find((m) => m.featured);
  const rest = teamMembers.filter((m) => !m.featured);

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
          className="vt-blob-alt absolute"
          style={{
            width: "350px",
            height: "350px",
            top: "-60px",
            left: "-80px",
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
                Unser Team
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
              Menschen, die f&uuml;r
              <br />
              <span style={{ color: "var(--vt-accent)" }}>
                Ihre Gesundheit da sind
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
              Hinter VITA steht ein eingespieltes Team aus erfahrenen &Auml;rzten
              und engagierten Mitarbeitern, die eines gemeinsam haben: die
              Leidenschaft f&uuml;r Ihre Gesundheit.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Featured Doctor ─────────────────────────────────────────── */}
      {featured && (
        <section
          className="py-24 lg:py-32"
          style={{ backgroundColor: "var(--vt-surface)" }}
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Portrait placeholder */}
              <FadeIn className="lg:col-span-5">
                <div
                  className="relative overflow-hidden rounded-3xl"
                  style={{
                    aspectRatio: "3/4",
                    maxHeight: "560px",
                    background: featured.gradient,
                    boxShadow: "0 20px 60px rgba(13, 148, 136, 0.15)",
                  }}
                >
                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)",
                    }}
                  />
                  {/* Large initials */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      fontSize: "6rem",
                      fontWeight: 700,
                      color: "rgba(255, 255, 255, 0.25)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {featured.initials}
                  </div>
                </div>
              </FadeIn>

              {/* Info */}
              <div className="lg:col-span-7">
                <FadeIn>
                  <span
                    className="inline-block rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-accent)",
                      backgroundColor: "var(--vt-accent-soft)",
                    }}
                  >
                    Praxisleitung
                  </span>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h2
                    className="mt-5"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      color: "var(--vt-text)",
                    }}
                  >
                    {featured.name}
                  </h2>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      fontSize: "1rem",
                      color: "var(--vt-accent)",
                      fontWeight: 400,
                    }}
                  >
                    {featured.title}
                  </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p
                    className="mt-6"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                      color: "var(--vt-muted)",
                    }}
                  >
                    {featured.bio}
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="mt-8">
                    <h3
                      className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        color: "var(--vt-text)",
                      }}
                    >
                      Schwerpunkte & Qualifikationen
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {featured.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full border px-4 py-1.5 text-[13px]"
                          style={{
                            fontFamily: "var(--vt-font-body)",
                            color: "var(--vt-text)",
                            borderColor: "var(--vt-border-strong)",
                            backgroundColor: "var(--vt-accent-soft)",
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Other Team Members ──────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <FadeIn className="mb-16">
            <h2
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--vt-text)",
              }}
            >
              Unser gesamtes Team
            </h2>
            <p
              className="mt-3 max-w-lg"
              style={{
                fontFamily: "var(--vt-font-body)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "var(--vt-muted)",
              }}
            >
              Jedes Teammitglied bringt einzigartige F&auml;higkeiten und
              Leidenschaft mit, um Ihnen die bestm&ouml;gliche Versorgung zu bieten.
            </p>
          </FadeIn>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.1}>
                <div
                  className="vt-card-hover rounded-2xl border overflow-hidden"
                  style={{
                    backgroundColor: "var(--vt-surface)",
                    borderColor: "var(--vt-border)",
                    boxShadow: "var(--vt-shadow)",
                  }}
                >
                  {/* Gradient portrait placeholder */}
                  <div
                    className="relative"
                    style={{
                      aspectRatio: "1/1",
                      background: member.gradient,
                    }}
                  >
                    {/* Initials */}
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        fontSize: "3rem",
                        fontWeight: 700,
                        color: "rgba(255, 255, 255, 0.3)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {member.initials}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--vt-text)",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="mt-1"
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        fontSize: "0.8rem",
                        color: "var(--vt-accent)",
                        fontWeight: 400,
                      }}
                    >
                      {member.title}
                    </p>

                    <p
                      className="mt-3 text-[14px] leading-relaxed"
                      style={{
                        fontFamily: "var(--vt-font-body)",
                        color: "var(--vt-muted)",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {member.bio}
                    </p>

                    {/* Specializations */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {member.specializations.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full px-2.5 py-1 text-[11px]"
                          style={{
                            fontFamily: "var(--vt-font-display)",
                            color: "var(--vt-accent)",
                            backgroundColor: "var(--vt-accent-soft)",
                            fontWeight: 400,
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                      {member.specializations.length > 2 && (
                        <span
                          className="rounded-full px-2.5 py-1 text-[11px]"
                          style={{
                            fontFamily: "var(--vt-font-display)",
                            color: "var(--vt-muted)",
                            backgroundColor: "var(--vt-card)",
                          }}
                        >
                          +{member.specializations.length - 2} mehr
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Values / Culture ────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-mint)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <FadeIn className="mb-16 text-center">
            <h2
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--vt-text)",
              }}
            >
              Was uns als Team auszeichnet
            </h2>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "\uD83C\uDFAF",
                title: "Fortbildung",
                desc: "Regelm\u00E4\u00DFige Fortbildungen und Qualit\u00E4tszirkel gew\u00E4hrleisten, dass unser Wissen stets auf dem neuesten Stand ist.",
              },
              {
                icon: "\uD83D\uDCAC",
                title: "Kommunikation",
                desc: "Offene Kommunikation im Team und mit unseren Patienten ist die Basis unserer t\u00E4glichen Arbeit.",
              },
              {
                icon: "\u2764\uFE0F",
                title: "Leidenschaft",
                desc: "Jedes Teammitglied bringt Herzblut und Engagement mit \u2013 weil gute Medizin von Menschen gemacht wird.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className="text-center">
                  <span className="text-3xl">{item.icon}</span>
                  <h3
                    className="mt-4 mb-2"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--vt-text)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mx-auto max-w-xs"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      color: "var(--vt-muted)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-28"
        style={{ backgroundColor: "var(--vt-surface)" }}
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
              Lernen Sie uns{" "}
              <span style={{ color: "var(--vt-accent)" }}>pers&ouml;nlich</span>{" "}
              kennen
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
              Vereinbaren Sie einen Termin und &uuml;berzeugen Sie sich selbst
              von unserer herzlichen Betreuung.
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
                href={`${BASE}/praxis`}
                className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-[15px] font-medium tracking-[0.02em] transition-all duration-300 hover:bg-[var(--vt-accent-soft)]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-accent)",
                  borderColor: "var(--vt-border-strong)",
                }}
              >
                Unsere Praxis entdecken
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
