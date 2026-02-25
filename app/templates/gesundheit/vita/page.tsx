"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Star, Phone } from "lucide-react";
import { services, testimonials, contactInfo, openingHours } from "./_design/data";

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

/* ── Star Rating ──────────────────────────────────────────────────────── */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          style={{
            color: i < count ? "var(--vt-warm)" : "var(--vt-border-strong)",
          }}
          fill={i < count ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

/* ── Homepage ─────────────────────────────────────────────────────────── */

export default function VitaHomePage() {
  const servicePreview = services.slice(0, 6);

  return (
    <div style={{ position: "relative" }}>
      {/* ─── Section 1: Organic Hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #ECFDF5 0%, #F9FAFB 30%, #FFFFFF 55%, #FEF2F2 80%, #F9FAFB 100%)",
          backgroundSize: "200% 200%",
          animation: "vt-hero-gradient 12s ease-in-out infinite",
        }}
      >
        {/* Organic blob shapes */}
        <div
          className="vt-blob absolute"
          style={{
            width: "500px",
            height: "500px",
            top: "-80px",
            right: "-100px",
            background:
              "radial-gradient(ellipse, rgba(13, 148, 136, 0.08) 0%, rgba(13, 148, 136, 0.02) 60%, transparent 80%)",
            animation: "vt-blob 12s ease-in-out infinite, vt-float 8s ease-in-out infinite",
          }}
        />
        <div
          className="vt-blob-alt absolute"
          style={{
            width: "400px",
            height: "400px",
            bottom: "5%",
            left: "-80px",
            background:
              "radial-gradient(ellipse, rgba(245, 158, 11, 0.06) 0%, rgba(245, 158, 11, 0.01) 60%, transparent 80%)",
            animation: "vt-blob-alt 14s ease-in-out infinite, vt-float 10s ease-in-out 1s infinite",
          }}
        />
        <div
          className="vt-blob absolute"
          style={{
            width: "300px",
            height: "300px",
            top: "40%",
            right: "15%",
            background:
              "radial-gradient(ellipse, rgba(13, 148, 136, 0.05) 0%, transparent 70%)",
            animation: "vt-blob 16s ease-in-out 2s infinite",
          }}
        />

        {/* Content - Asymmetric layout */}
        <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-7xl items-center px-6 sm:px-8 lg:px-12">
          <div className="grid w-full gap-12 lg:grid-cols-12 lg:gap-8 items-center">
            {/* Left: Text content */}
            <div className="lg:col-span-6 xl:col-span-5">
              {/* Overline */}
              <div
                className="vt-fade-up mb-6 flex items-center gap-3"
                style={{ animationDelay: "0.2s" }}
              >
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
                  Praxis f&uuml;r Gesundheit
                </span>
              </div>

              {/* VITA headline */}
              <h1
                className="vt-fade-up"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  lineHeight: 0.95,
                  color: "var(--vt-text)",
                  animationDelay: "0.4s",
                }}
              >
                V
                <span style={{ position: "relative", display: "inline-block" }}>
                  I
                  <span
                    style={{
                      position: "absolute",
                      top: "0.08em",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "0.12em",
                      height: "0.12em",
                      borderRadius: "50%",
                      backgroundColor: "var(--vt-accent)",
                    }}
                  />
                </span>
                TA
              </h1>

              {/* Tagline */}
              <p
                className="vt-fade-up mt-6 max-w-md"
                style={{
                  fontFamily: "var(--vt-font-body)",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                  lineHeight: 1.5,
                  color: "var(--vt-text)",
                  fontWeight: 500,
                  animationDelay: "0.6s",
                }}
              >
                Ihre Gesundheit.
                <br />
                <span style={{ color: "var(--vt-accent)" }}>
                  Unsere Leidenschaft.
                </span>
              </p>

              {/* Description */}
              <p
                className="vt-fade-up mt-5 max-w-sm"
                style={{
                  fontFamily: "var(--vt-font-body)",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: "var(--vt-muted)",
                  animationDelay: "0.8s",
                }}
              >
                Ganzheitliche Medizin in moderner Praxis. Pers&ouml;nlich,
                einfühlsam und auf dem neuesten Stand der Wissenschaft.
              </p>

              {/* CTA buttons */}
              <div
                className="vt-fade-up mt-8 flex flex-wrap gap-4"
                style={{ animationDelay: "1s" }}
              >
                <Link
                  href={`${BASE}/kontakt`}
                  className="vt-pulse-soft inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium tracking-[0.02em] transition-all duration-300 hover:shadow-lg"
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    color: "#FFFFFF",
                    backgroundColor: "var(--vt-accent)",
                  }}
                >
                  Termin vereinbaren
                  <span style={{ fontSize: "16px" }}>&rarr;</span>
                </Link>
                <Link
                  href={`${BASE}/leistungen`}
                  className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[14px] font-medium tracking-[0.02em] transition-all duration-300 hover:bg-[var(--vt-accent-soft)]"
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    color: "var(--vt-accent)",
                    borderColor: "var(--vt-border-strong)",
                  }}
                >
                  Unsere Leistungen
                </Link>
              </div>
            </div>

            {/* Right: Decorative elements */}
            <div className="hidden lg:col-span-6 xl:col-span-7 lg:flex items-center justify-center relative">
              {/* Main decorative circle */}
              <div
                className="vt-breathe relative"
                style={{
                  width: "min(420px, 32vw)",
                  height: "min(420px, 32vw)",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(13, 148, 136, 0.12) 0%, rgba(236, 253, 245, 0.8) 40%, rgba(254, 242, 242, 0.5) 70%, rgba(13, 148, 136, 0.06) 100%)",
                  border: "1px solid rgba(13, 148, 136, 0.1)",
                }}
              >
                {/* Inner circle with cross/plus symbol */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: "60%",
                    height: "60%",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(236, 253, 245, 0.6) 100%)",
                    border: "1px solid rgba(13, 148, 136, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      color: "var(--vt-accent)",
                      opacity: 0.3,
                      fontWeight: 200,
                      fontFamily: "var(--vt-font-display)",
                    }}
                  >
                    +
                  </span>
                </div>
              </div>

              {/* Floating accent shapes */}
              <div
                className="vt-float absolute"
                style={{
                  width: "80px",
                  height: "80px",
                  top: "10%",
                  right: "15%",
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  background: "rgba(13, 148, 136, 0.08)",
                  animationDelay: "0s",
                }}
              />
              <div
                className="vt-float-slow absolute"
                style={{
                  width: "50px",
                  height: "50px",
                  bottom: "15%",
                  right: "8%",
                  borderRadius: "50%",
                  background: "rgba(245, 158, 11, 0.08)",
                  animationDelay: "2s",
                }}
              />
              <div
                className="vt-float absolute"
                style={{
                  width: "35px",
                  height: "35px",
                  top: "25%",
                  left: "5%",
                  borderRadius: "50%",
                  background: "rgba(13, 148, 136, 0.06)",
                  animationDelay: "4s",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 vt-fade-up"
          style={{ animationDelay: "1.5s" }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{
              fontFamily: "var(--vt-font-display)",
              color: "var(--vt-muted)",
              fontWeight: 300,
            }}
          >
            Mehr erfahren
          </span>
          <div
            className="h-8 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--vt-accent), transparent)",
            }}
          />
        </div>
      </section>

      {/* ─── Section 2: Quick Info Bar ───────────────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--vt-surface)",
          borderBottom: "1px solid var(--vt-border)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
            {[
              { icon: "\uD83D\uDCC5", label: "Termine online buchen", sublabel: "24/7 verf\u00FCgbar" },
              { icon: "\u260E", label: "Notfall: 0681 123456", sublabel: "Wir sind f\u00FCr Sie da" },
              { icon: "\uD83D\uDD52", label: "Mo\u2013Fr 8\u201318 Uhr", sublabel: "Sprechzeiten" },
              { icon: "\u2714", label: "Alle Kassen", sublabel: "Privat & Gesetzlich" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-center gap-3 py-2">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p
                      className="text-[13px] font-medium"
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        color: "var(--vt-text)",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[12px]"
                      style={{
                        fontFamily: "var(--vt-font-body)",
                        color: "var(--vt-muted)",
                      }}
                    >
                      {item.sublabel}
                    </p>
                    <div
                      className="mt-1.5 h-[2px] w-8 rounded-full"
                      style={{ backgroundColor: "var(--vt-accent)", opacity: 0.4 }}
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Leistungen Preview ───────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <FadeIn className="mb-16 max-w-2xl">
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
            <h2
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--vt-text)",
              }}
            >
              Medizin, die den ganzen
              <br />
              <span style={{ color: "var(--vt-accent)" }}>Menschen sieht</span>
            </h2>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--vt-font-body)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--vt-muted)",
              }}
            >
              Von der Vorsorge bis zur ganzheitlichen Therapie &ndash; wir
              begleiten Sie mit einem breiten Leistungsspektrum.
            </p>
          </FadeIn>

          {/* Service cards grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicePreview.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.08}>
                <div
                  className="vt-card-hover group relative rounded-2xl border p-7"
                  style={{
                    backgroundColor: "var(--vt-surface)",
                    borderColor: "var(--vt-border)",
                    boxShadow: "var(--vt-shadow)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "var(--vt-accent-soft)",
                      fontSize: "22px",
                    }}
                  >
                    {service.icon}
                  </div>

                  {/* Name */}
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--vt-text)",
                    }}
                  >
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      color: "var(--vt-muted)",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Hover arrow */}
                  <div
                    className="mt-5 flex items-center gap-2 text-[13px] font-medium transition-all duration-300"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-accent)",
                      opacity: 0.7,
                    }}
                  >
                    Mehr erfahren
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Link to all services */}
          <FadeIn className="mt-12 text-center">
            <Link
              href={`${BASE}/leistungen`}
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[14px] font-medium tracking-[0.02em] transition-all duration-300 hover:bg-[var(--vt-accent)] hover:text-white hover:border-[var(--vt-accent)]"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "var(--vt-accent)",
                borderColor: "var(--vt-accent)",
              }}
            >
              Alle Leistungen entdecken
              <span>&rarr;</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ─── Section 4: About Teaser ─────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Gradient image placeholder */}
            <FadeIn className="lg:col-span-5">
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  aspectRatio: "3/4",
                  maxHeight: "520px",
                  background:
                    "linear-gradient(160deg, #0D9488 0%, #6EE7B7 40%, #A7F3D0 70%, #ECFDF5 100%)",
                  boxShadow: "0 20px 60px rgba(13, 148, 136, 0.15)",
                }}
              >
                {/* Overlay pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)",
                  }}
                />
                {/* Initials badge */}
                <div
                  className="absolute bottom-6 left-6 rounded-xl px-5 py-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p
                    className="text-[11px] uppercase tracking-[0.15em]"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-muted)",
                      fontWeight: 400,
                    }}
                  >
                    Praxisleitung
                  </p>
                  <p
                    className="text-[15px] mt-0.5"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-text)",
                      fontWeight: 600,
                    }}
                  >
                    Dr. med. Anna Bergmann
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Right: Text content */}
            <div className="lg:col-span-7">
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
                    Willkommen
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: "var(--vt-text)",
                  }}
                >
                  &bdquo;Jeder Patient verdient eine
                  <span style={{ color: "var(--vt-accent)" }}>
                    {" "}
                    Medizin, die zuh&ouml;rt
                  </span>
                  .&ldquo;
                </h2>
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
                  Als ich VITA gr&uuml;ndete, war meine Vision klar: Eine
                  Praxis, in der sich Menschen nicht als Nummern f&uuml;hlen.
                  Wo wir uns Zeit nehmen, zuh&ouml;ren und gemeinsam den
                  besten Weg f&uuml;r Ihre Gesundheit finden.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: "var(--vt-font-body)",
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    color: "var(--vt-muted)",
                  }}
                >
                  Unser Team verbindet modernste Diagnostik mit der
                  Erfahrung traditioneller Heilverfahren. Denn wahre
                  Gesundheit entsteht, wenn Körper und Seele im Einklang
                  sind.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p
                  className="mt-6"
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    fontSize: "1rem",
                    color: "var(--vt-text)",
                    fontWeight: 500,
                  }}
                >
                  Dr. med. Anna Bergmann
                  <br />
                  <span
                    className="text-[13px] font-normal"
                    style={{ color: "var(--vt-muted)" }}
                  >
                    Fach&auml;rztin f&uuml;r Allgemeinmedizin &middot; Praxisleitung
                  </span>
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <Link
                  href={`${BASE}/team`}
                  className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium transition-all duration-300 hover:gap-3"
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    color: "var(--vt-accent)",
                  }}
                >
                  Unser Team kennenlernen
                  <span>&rarr;</span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Philosophy ───────────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{
          backgroundColor: "var(--vt-mint)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <FadeIn className="mb-16 text-center">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "var(--vt-accent)",
              }}
            >
              Unsere Philosophie
            </span>
            <h2
              className="mt-3"
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--vt-text)",
              }}
            >
              Was uns antreibt
            </h2>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "\uD83C\uDF3F",
                title: "Ganzheitlich",
                desc: "Wir behandeln nicht nur Symptome \u2013 wir suchen nach den Ursachen. Körper, Geist und Seele bilden eine Einheit, die wir in jeder Behandlung berücksichtigen.",
              },
              {
                icon: "\uD83E\uDD1D",
                title: "Pers\u00F6nlich",
                desc: "Bei uns sind Sie keine Nummer. Wir nehmen uns Zeit f\u00FCr Sie, h\u00F6ren aufmerksam zu und entwickeln gemeinsam die Therapie, die zu Ihnen passt.",
              },
              {
                icon: "\u2728",
                title: "Modern",
                desc: "Modernste Diagnostik, digitale Services und evidenzbasierte Medizin \u2013 kombiniert mit der W\u00E4rme und Zuwendung, die gute Medizin ausmacht.",
              },
            ].map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.15}>
                <div className="relative text-center">
                  {/* Decorative dividers between columns */}
                  {i > 0 && (
                    <div
                      className="absolute -left-4 top-1/2 hidden h-16 w-px -translate-y-1/2 md:block"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, var(--vt-border-strong), transparent)",
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: "var(--vt-surface)",
                      boxShadow: "var(--vt-shadow)",
                      fontSize: "28px",
                    }}
                  >
                    {pillar.icon}
                  </div>

                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--vt-text)",
                    }}
                  >
                    {pillar.title}
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
                    {pillar.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6: Patient Reviews ──────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <FadeIn className="mb-16 text-center">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "var(--vt-accent)",
              }}
            >
              Patientenstimmen
            </span>
            <h2
              className="mt-3"
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--vt-text)",
              }}
            >
              Was unsere Patienten sagen
            </h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.12}>
                <div
                  className="rounded-2xl border p-7 transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: "var(--vt-surface)",
                    borderColor: "var(--vt-border)",
                    boxShadow: "var(--vt-shadow)",
                  }}
                >
                  {/* Stars */}
                  <Stars count={t.rating} />

                  {/* Quote */}
                  <p
                    className="mt-5"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      color: "var(--vt-text)",
                      fontStyle: "italic",
                    }}
                  >
                    &bdquo;{t.text}&ldquo;
                  </p>

                  {/* Author */}
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-semibold"
                      style={{
                        backgroundColor: "var(--vt-accent-soft)",
                        color: "var(--vt-accent)",
                        fontFamily: "var(--vt-font-display)",
                      }}
                    >
                      {t.name}
                    </div>
                    <p
                      className="text-[13px]"
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        color: "var(--vt-muted)",
                      }}
                    >
                      {t.name}, {t.age} Jahre
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 7: Appointment CTA ──────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{
          background:
            "linear-gradient(135deg, #ECFDF5 0%, #F0F7F4 30%, #FFFFFF 60%, #FEF2F2 100%)",
        }}
      >
        {/* Decorative blob */}
        <div
          className="vt-blob absolute"
          style={{
            width: "400px",
            height: "400px",
            top: "-100px",
            right: "-100px",
            background:
              "radial-gradient(ellipse, rgba(13, 148, 136, 0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-8">
          <FadeIn>
            <span
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "var(--vt-accent)",
              }}
            >
              Jetzt Termin vereinbaren
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2
              className="mt-4"
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--vt-text)",
              }}
            >
              Vereinbaren Sie Ihren{" "}
              <span style={{ color: "var(--vt-accent)" }}>Termin</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="mx-auto mt-4 max-w-lg"
              style={{
                fontFamily: "var(--vt-font-body)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--vt-muted)",
              }}
            >
              Wir freuen uns auf Sie. Rufen Sie uns an oder buchen Sie
              bequem online Ihren Wunschtermin.
            </p>
          </FadeIn>

          {/* Phone number prominent */}
          <FadeIn delay={0.3}>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="mt-8 inline-block"
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 600,
                color: "var(--vt-accent)",
                letterSpacing: "0.04em",
              }}
            >
              <Phone className="h-5 w-5 inline-block mr-2" style={{ verticalAlign: 'middle' }} />{contactInfo.phone}
            </a>
          </FadeIn>

          {/* Buttons */}
          <FadeIn delay={0.4}>
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
                Online Termin buchen
                <span>&rarr;</span>
              </Link>
            </div>
          </FadeIn>

          {/* Opening hours compact */}
          <FadeIn delay={0.5}>
            <div
              className="mx-auto mt-10 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border px-8 py-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderColor: "var(--vt-border)",
                backdropFilter: "blur(8px)",
              }}
            >
              {openingHours.slice(0, 5).map((oh) => (
                <div key={oh.day} className="flex items-center gap-2">
                  <span
                    className="text-[12px] font-medium"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-text)",
                    }}
                  >
                    {oh.day.slice(0, 2)}
                  </span>
                  <span
                    className="text-[12px]"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      color: "var(--vt-muted)",
                    }}
                  >
                    {oh.hours}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
