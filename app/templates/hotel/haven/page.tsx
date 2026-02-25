"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { rooms, experiences, testimonials, galleryItems, formatPrice } from "./_design/data";

const BASE = "/templates/hotel/haven";

/* ── FadeIn Component (scroll-triggered reveal) ───────────────────────── */

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

/* ── Homepage ──────────────────────────────────────────────────────────── */

export default function HavenHomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1: Cinematic Hero
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #FAF8F5 0%, #E8DDD3 25%, #D4DACE 45%, #E8DDD3 65%, #B8965A 90%, #A07D45 100%)",
        }}
      >
        {/* Floating decorative circles */}
        <div
          className="hv-float absolute"
          style={{
            top: "12%",
            right: "8%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(184,150,90,0.15) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="hv-float absolute"
          style={{
            bottom: "18%",
            left: "5%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,218,206,0.3) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
        <div
          className="hv-float absolute"
          style={{
            top: "40%",
            right: "30%",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(184,150,90,0.1) 0%, transparent 70%)",
            animationDelay: "4s",
          }}
        />

        {/* Gold horizontal decorative line */}
        <div
          className="absolute"
          style={{
            top: "35%",
            left: "0",
            width: "40%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, var(--hv-accent) 40%, transparent 100%)",
            opacity: heroLoaded ? 0.4 : 0,
            transition: "opacity 1.5s ease 0.8s",
          }}
        />

        {/* Main hero content - asymmetric left placement */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-40 lg:px-10 lg:pb-32">
          {/* Small uppercase intro */}
          <div
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.3em] sm:text-xs"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-muted)",
              }}
            >
              Boutique Hotel &amp; Spa &mdash; Oberstdorf
            </span>
          </div>

          {/* HAVEN display title */}
          <h1
            className="mt-6"
            style={{
              opacity: heroLoaded ? 1 : 0,
              letterSpacing: heroLoaded ? "0.35em" : "0.6em",
              transition:
                "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.5s, letter-spacing 1.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.5s",
            }}
          >
            <span
              className="text-6xl sm:text-8xl lg:text-[140px] leading-none"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              HAVEN
            </span>
          </h1>

          {/* Poetic tagline */}
          <div
            className="mt-6 max-w-lg"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(16px)",
              transition: "opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s",
            }}
          >
            <p
              className="text-2xl italic leading-relaxed sm:text-3xl lg:text-4xl"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-forest)",
              }}
            >
              Wo die Zeit still steht
            </p>
            {/* Gold accent line below tagline */}
            <div
              className="mt-5"
              style={{
                width: heroLoaded ? "80px" : "0",
                height: "2px",
                backgroundColor: "var(--hv-accent)",
                transition: "width 1s ease 1.6s",
              }}
            />
          </div>

          {/* CTA row - bottom right on desktop */}
          <div
            className="mt-12 flex items-center gap-8"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(12px)",
              transition: "opacity 0.8s ease 1.8s, transform 0.8s ease 1.8s",
            }}
          >
            <Link
              href={`${BASE}/zimmer`}
              className="inline-block border-b-2 pb-1 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
                borderColor: "var(--hv-accent)",
              }}
            >
              Zimmer entdecken
            </Link>
            <Link
              href={`${BASE}/kontakt`}
              className="inline-block px-6 py-3 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-85"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-surface)",
                backgroundColor: "var(--hv-accent)",
              }}
            >
              Jetzt buchen
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: heroLoaded ? 0.5 : 0,
            transition: "opacity 1s ease 2.2s",
          }}
        >
          <div
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[9px] uppercase tracking-[0.25em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-muted)",
              }}
            >
              Entdecken
            </span>
            <div
              className="h-8 w-px"
              style={{
                background: "linear-gradient(180deg, var(--hv-accent) 0%, transparent 100%)",
                animation: "hv-gentle-pulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2: Welcome / Philosophy
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-28 lg:py-40"
        style={{ backgroundColor: "var(--hv-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left - Text content */}
            <div className="lg:pr-12">
              <FadeIn>
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-accent)",
                  }}
                >
                  Willkommen
                </span>
              </FadeIn>

              <FadeIn delay={0.15}>
                <h2
                  className="mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-text)",
                  }}
                >
                  Ein Refugium
                  <br />
                  <span style={{ color: "var(--hv-forest)" }}>der Sinne</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.3}>
                {/* Gold accent line */}
                <div
                  className="my-8 h-px w-16"
                  style={{ backgroundColor: "var(--hv-accent)" }}
                />
              </FadeIn>

              <FadeIn delay={0.4}>
                <p
                  className="text-lg leading-[1.85] sm:text-xl"
                  style={{
                    fontFamily: "var(--hv-font-body)",
                    color: "var(--hv-muted)",
                  }}
                >
                  Eingebettet in die majest&auml;tische Bergwelt der Allg&auml;uer Alpen erwartet Sie
                  ein Ort, an dem Luxus und Natur in perfekter Harmonie verschmelzen. Seit
                  &uuml;ber drei Jahrzehnten pflegen wir die Kunst der Gastfreundschaft &ndash; mit
                  Hingabe, Authentizit&auml;t und einem untr&uuml;glichen Sinn f&uuml;r das Besondere.
                </p>
              </FadeIn>

              <FadeIn delay={0.55}>
                <p
                  className="mt-6 text-lg italic leading-relaxed"
                  style={{
                    fontFamily: "var(--hv-font-body)",
                    color: "var(--hv-accent)",
                  }}
                >
                  &bdquo;Jeder Aufenthalt eine Geschichte, jeder Moment ein Geschenk.&ldquo;
                </p>
              </FadeIn>

              <FadeIn delay={0.7}>
                <Link
                  href={`${BASE}/erlebnis`}
                  className="mt-10 inline-block border-b pb-1 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-60"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-text)",
                    borderColor: "var(--hv-accent)",
                  }}
                >
                  Unsere Philosophie
                </Link>
              </FadeIn>
            </div>

            {/* Right - Gradient placeholder suggesting lobby */}
            <FadeIn delay={0.2}>
              <div className="relative">
                {/* Main image placeholder */}
                <div
                  className="aspect-[4/5] w-full rounded-sm"
                  style={{
                    background:
                      "linear-gradient(170deg, #E8DDD3 0%, #D4DACE 35%, #B8965A 70%, #A07D45 100%)",
                  }}
                />
                {/* Overlapping small accent card */}
                <div
                  className="absolute -bottom-8 -left-8 hidden h-48 w-48 lg:block"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--hv-sage) 0%, var(--hv-blush) 100%)",
                    border: "1px solid rgba(184, 150, 90, 0.2)",
                  }}
                >
                  <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                    <span
                      className="text-4xl font-semibold"
                      style={{
                        fontFamily: "var(--hv-font-body)",
                        color: "var(--hv-accent)",
                      }}
                    >
                      30+
                    </span>
                    <span
                      className="mt-1 text-[10px] uppercase tracking-[0.2em]"
                      style={{
                        fontFamily: "var(--hv-font-display)",
                        color: "var(--hv-muted)",
                      }}
                    >
                      Jahre Tradition
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3: Room Preview
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 lg:py-36"
        style={{ backgroundColor: "var(--hv-card)" }}
      >
        {/* Subtle decorative element */}
        <div
          className="absolute right-0 top-0 h-full w-1/3 hidden lg:block"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(212,218,206,0.15) 50%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          {/* Section header */}
          <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <FadeIn>
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-accent)",
                  }}
                >
                  Unsere Zimmer
                </span>
              </FadeIn>
              <FadeIn delay={0.15}>
                <h2
                  className="mt-4 text-3xl sm:text-4xl lg:text-5xl"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-text)",
                  }}
                >
                  R&auml;ume zum Verweilen
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <Link
                href={`${BASE}/zimmer`}
                className="text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-60"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  color: "var(--hv-accent)",
                  borderBottom: "1px solid var(--hv-accent)",
                  paddingBottom: "2px",
                }}
              >
                Alle Zimmer
              </Link>
            </FadeIn>
          </div>

          {/* Room cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 3).map((room, i) => (
              <FadeIn key={room.id} delay={i * 0.15}>
                <Link href={`${BASE}/zimmer`} className="group block">
                  <div
                    className="overflow-hidden rounded-sm transition-all duration-500"
                    style={{
                      backgroundColor: "var(--hv-surface)",
                      boxShadow: "0 2px 20px rgba(26, 26, 26, 0.04)",
                    }}
                  >
                    {/* Image placeholder */}
                    <div
                      className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ background: room.gradient }}
                    />

                    {/* Card content */}
                    <div
                      className="p-7 transition-all duration-500"
                      style={{
                        borderBottom: "2px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderBottomColor = "var(--hv-accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderBottomColor = "transparent";
                      }}
                    >
                      <h3
                        className="text-lg tracking-wide"
                        style={{
                          fontFamily: "var(--hv-font-display)",
                          color: "var(--hv-text)",
                        }}
                      >
                        {room.name}
                      </h3>

                      <div className="mt-3 flex items-center gap-4">
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "var(--hv-font-body)",
                            color: "var(--hv-muted)",
                          }}
                        >
                          {room.size} m&sup2;
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: "var(--hv-blush)" }}
                        >
                          &bull;
                        </span>
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "var(--hv-font-body)",
                            color: "var(--hv-muted)",
                          }}
                        >
                          bis {room.maxGuests} G&auml;ste
                        </span>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <p
                          className="text-lg"
                          style={{
                            fontFamily: "var(--hv-font-body)",
                            color: "var(--hv-accent)",
                            fontWeight: 600,
                          }}
                        >
                          ab {formatPrice(room.price)}
                          <span
                            className="ml-1 text-sm font-normal"
                            style={{ color: "var(--hv-muted)" }}
                          >
                            pro Nacht
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4: Experience Section (staggered layout)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 lg:py-36"
        style={{ backgroundColor: "var(--hv-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Section header */}
          <FadeIn>
            <div className="text-center">
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  color: "var(--hv-accent)",
                }}
              >
                Erlebnisse
              </span>
              <h2
                className="mt-4 text-3xl sm:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  color: "var(--hv-text)",
                }}
              >
                Momente, die bleiben
              </h2>
            </div>
          </FadeIn>

          {/* Staggered experience grid */}
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.slice(0, 4).map((exp, i) => (
              <FadeIn
                key={exp.id}
                delay={i * 0.12}
                className={i % 2 === 1 ? "lg:mt-12" : ""}
              >
                <Link href={`${BASE}/erlebnis`} className="group block text-center">
                  {/* Circular gradient placeholder */}
                  <div className="mx-auto mb-6 flex h-44 w-44 items-center justify-center overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-[1.05] sm:h-48 sm:w-48">
                    <div
                      className="h-full w-full rounded-full"
                      style={{ background: exp.gradient }}
                    />
                  </div>

                  <h3
                    className="text-base tracking-wide"
                    style={{
                      fontFamily: "var(--hv-font-display)",
                      color: "var(--hv-text)",
                    }}
                  >
                    {exp.name}
                  </h3>

                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--hv-font-body)",
                      color: "var(--hv-muted)",
                    }}
                  >
                    {exp.schedule}
                  </p>

                  {/* Hover reveal line */}
                  <div
                    className="mx-auto mt-4 h-px w-0 transition-all duration-500 group-hover:w-12"
                    style={{ backgroundColor: "var(--hv-accent)" }}
                  />
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-16 text-center">
              <Link
                href={`${BASE}/erlebnis`}
                className="inline-block border px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  color: "var(--hv-accent)",
                  borderColor: "var(--hv-accent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--hv-accent)";
                  e.currentTarget.style.color = "var(--hv-surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--hv-accent)";
                }}
              >
                Alle Erlebnisse entdecken
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5: Testimonial
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-28 lg:py-36"
        style={{
          background:
            "linear-gradient(180deg, var(--hv-card) 0%, var(--hv-bg) 100%)",
        }}
      >
        {/* Oversized decorative quotation mark */}
        <div
          className="absolute left-6 top-16 select-none lg:left-16"
          style={{
            fontFamily: "var(--hv-font-body)",
            fontSize: "clamp(180px, 20vw, 320px)",
            lineHeight: 0.8,
            color: "var(--hv-accent)",
            opacity: 0.08,
          }}
        >
          &ldquo;
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <FadeIn>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-accent)",
              }}
            >
              G&auml;stestimmen
            </span>
          </FadeIn>

          {(() => {
            const t = testimonials[0];
            return (
              <>
                <FadeIn delay={0.15}>
                  <blockquote
                    className="mt-10 text-xl italic leading-[1.8] sm:text-2xl lg:text-3xl"
                    style={{
                      fontFamily: "var(--hv-font-body)",
                      color: "var(--hv-text)",
                    }}
                  >
                    &bdquo;{t.quote}&ldquo;
                  </blockquote>
                </FadeIn>

                <FadeIn delay={0.3}>
                  {/* Gold line */}
                  <div
                    className="mx-auto my-8 h-px w-12"
                    style={{ backgroundColor: "var(--hv-accent)" }}
                  />
                </FadeIn>

                <FadeIn delay={0.4}>
                  <p
                    className="text-sm tracking-wide"
                    style={{
                      fontFamily: "var(--hv-font-display)",
                      color: "var(--hv-text)",
                    }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{
                      fontFamily: "var(--hv-font-body)",
                      color: "var(--hv-muted)",
                    }}
                  >
                    {t.location} &middot; {t.date}
                  </p>
                </FadeIn>

                <FadeIn delay={0.5}>
                  {/* Star rating */}
                  <div className="mt-4 flex items-center justify-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="var(--hv-accent)"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </FadeIn>
              </>
            );
          })()}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6: Gallery Teaser (creative masonry)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 lg:py-36"
        style={{ backgroundColor: "var(--hv-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Section header */}
          <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <FadeIn>
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-accent)",
                  }}
                >
                  Impressionen
                </span>
              </FadeIn>
              <FadeIn delay={0.15}>
                <h2
                  className="mt-4 text-3xl sm:text-4xl lg:text-5xl"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-text)",
                  }}
                >
                  Bilder, die erz&auml;hlen
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <Link
                href={`${BASE}/galerie`}
                className="text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-60"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  color: "var(--hv-accent)",
                  borderBottom: "1px solid var(--hv-accent)",
                  paddingBottom: "2px",
                }}
              >
                Zur Galerie
              </Link>
            </FadeIn>
          </div>

          {/* Creative masonry-like grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {/* Item 1: spans 2 rows */}
            <FadeIn className="row-span-2">
              <div
                className="group relative h-full min-h-[280px] cursor-pointer overflow-hidden rounded-sm transition-all duration-500 sm:min-h-[400px]"
                style={{ background: galleryItems[0].gradient }}
              >
                <div
                  className="absolute inset-0 border-2 border-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ borderColor: "var(--hv-accent)" }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p
                    className="text-sm text-white"
                    style={{ fontFamily: "var(--hv-font-body)" }}
                  >
                    {galleryItems[0].title}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Item 2 */}
            <FadeIn delay={0.1}>
              <div
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-sm transition-all duration-500"
                style={{ background: galleryItems[2].gradient }}
              >
                <div
                  className="absolute inset-0 border-2 border-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ borderColor: "var(--hv-accent)" }}
                />
              </div>
            </FadeIn>

            {/* Item 3 */}
            <FadeIn delay={0.15}>
              <div
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-sm transition-all duration-500"
                style={{ background: galleryItems[3].gradient }}
              >
                <div
                  className="absolute inset-0 border-2 border-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ borderColor: "var(--hv-accent)" }}
                />
              </div>
            </FadeIn>

            {/* Item 4: landscape */}
            <FadeIn delay={0.2} className="hidden lg:block">
              <div
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-sm transition-all duration-500"
                style={{ background: galleryItems[4].gradient }}
              >
                <div
                  className="absolute inset-0 border-2 border-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ borderColor: "var(--hv-accent)" }}
                />
              </div>
            </FadeIn>

            {/* Item 5: spans 2 cols */}
            <FadeIn delay={0.25} className="col-span-2 hidden sm:block">
              <div
                className="group relative aspect-[2/1] cursor-pointer overflow-hidden rounded-sm transition-all duration-500"
                style={{ background: galleryItems[5].gradient }}
              >
                <div
                  className="absolute inset-0 border-2 border-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ borderColor: "var(--hv-accent)" }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p
                    className="text-sm text-white"
                    style={{ fontFamily: "var(--hv-font-body)" }}
                  >
                    {galleryItems[5].title}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Item 6 */}
            <FadeIn delay={0.3} className="hidden lg:block">
              <div
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-sm transition-all duration-500"
                style={{ background: galleryItems[7].gradient }}
              >
                <div
                  className="absolute inset-0 border-2 border-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"
                  style={{ borderColor: "var(--hv-accent)" }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7: Booking CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-28 lg:py-36"
        style={{
          background:
            "linear-gradient(135deg, var(--hv-forest) 0%, #3A5139 50%, var(--hv-forest) 100%)",
        }}
      >
        {/* Decorative gold circles */}
        <div
          className="hv-float absolute"
          style={{
            top: "-60px",
            right: "-40px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: "1px solid rgba(184, 150, 90, 0.15)",
          }}
        />
        <div
          className="hv-float absolute"
          style={{
            bottom: "-80px",
            left: "-60px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            border: "1px solid rgba(184, 150, 90, 0.1)",
            animationDelay: "3s",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <FadeIn>
            <span
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-accent)",
              }}
            >
              Reservierung
            </span>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2
              className="mt-6 text-3xl leading-snug sm:text-4xl lg:text-5xl"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-surface)",
              }}
            >
              Ihren Aufenthalt planen
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              className="mx-auto mt-6 max-w-xl text-lg italic leading-relaxed"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-sage)",
              }}
            >
              Reservieren Sie Ihren Lieblingsplatz in den Bergen &ndash; wir freuen uns darauf,
              Sie willkommen zu heißen.
            </p>
          </FadeIn>

          {/* Booking teaser form */}
          <FadeIn delay={0.45}>
            <div
              className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-6 rounded-sm p-8 sm:flex-row sm:p-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(184, 150, 90, 0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Check-in */}
              <div className="flex-1 text-center sm:text-left">
                <span
                  className="text-[9px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-accent)",
                  }}
                >
                  Anreise
                </span>
                <p
                  className="mt-1 text-lg"
                  style={{
                    fontFamily: "var(--hv-font-body)",
                    color: "var(--hv-surface)",
                  }}
                >
                  Datum w&auml;hlen
                </p>
              </div>

              {/* Divider */}
              <div
                className="hidden h-12 w-px sm:block"
                style={{ backgroundColor: "rgba(184, 150, 90, 0.3)" }}
              />

              {/* Check-out */}
              <div className="flex-1 text-center sm:text-left">
                <span
                  className="text-[9px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-accent)",
                  }}
                >
                  Abreise
                </span>
                <p
                  className="mt-1 text-lg"
                  style={{
                    fontFamily: "var(--hv-font-body)",
                    color: "var(--hv-surface)",
                  }}
                >
                  Datum w&auml;hlen
                </p>
              </div>

              {/* Divider */}
              <div
                className="hidden h-12 w-px sm:block"
                style={{ backgroundColor: "rgba(184, 150, 90, 0.3)" }}
              />

              {/* CTA */}
              <Link
                href={`${BASE}/kontakt`}
                className="inline-block px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-85"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  backgroundColor: "var(--hv-accent)",
                  color: "var(--hv-surface)",
                  whiteSpace: "nowrap",
                }}
              >
                Jetzt buchen
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p
              className="mt-8 text-sm"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "rgba(212, 218, 206, 0.6)",
              }}
            >
              Oder rufen Sie uns direkt an: +49 (0) 8321 / 94 78 0
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
