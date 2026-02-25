"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

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

/* ── Input styles ─────────────────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--hv-font-body)",
  backgroundColor: "var(--hv-surface)",
  borderColor: "var(--hv-blush)",
  color: "var(--hv-text)",
};

/* ── Kontakt Page ─────────────────────────────────────────────────────── */

export default function KontaktPage() {
  const [formState, setFormState] = useState({
    anrede: "",
    name: "",
    email: "",
    telefon: "",
    anlass: "",
    nachricht: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Page hero */}
      <section
        className="relative flex items-end overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44"
        style={{
          background:
            "linear-gradient(160deg, var(--hv-bg) 0%, var(--hv-card) 40%, var(--hv-blush) 80%, var(--hv-sage) 100%)",
          minHeight: "40vh",
        }}
      >
        <div
          className="hv-float absolute hidden lg:block"
          style={{
            top: "20%",
            right: "10%",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            border: "1px solid rgba(184, 150, 90, 0.12)",
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
            Kontakt
          </span>
          <h1
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--hv-font-display)",
              color: "var(--hv-text)",
            }}
          >
            Wir freuen uns auf Sie
          </h1>
          <div
            className="mt-6 h-px w-16"
            style={{ backgroundColor: "var(--hv-accent)" }}
          />
        </div>
      </section>

      {/* Contact form + Info */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--hv-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
            {/* Form - 3 columns */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2
                  className="text-2xl sm:text-3xl"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-text)",
                  }}
                >
                  Nachricht senden
                </h2>
                <div
                  className="my-6 h-px w-10"
                  style={{ backgroundColor: "var(--hv-accent)" }}
                />
              </FadeIn>

              {submitted ? (
                <FadeIn>
                  <div
                    className="rounded-sm p-10 text-center"
                    style={{
                      backgroundColor: "var(--hv-card)",
                      border: "1px solid var(--hv-sage)",
                    }}
                  >
                    <div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ backgroundColor: "var(--hv-sage)" }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--hv-forest)"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3
                      className="text-xl"
                      style={{
                        fontFamily: "var(--hv-font-display)",
                        color: "var(--hv-text)",
                      }}
                    >
                      Vielen Dank!
                    </h3>
                    <p
                      className="mt-3 text-base leading-relaxed"
                      style={{
                        fontFamily: "var(--hv-font-body)",
                        color: "var(--hv-muted)",
                      }}
                    >
                      Ihre Nachricht ist bei uns eingegangen. Wir melden uns
                      innerhalb von 24 Stunden bei Ihnen.
                    </p>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0.15}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Anrede */}
                    <div>
                      <label
                        className="mb-2 block text-[11px] uppercase tracking-[0.15em]"
                        style={{
                          fontFamily: "var(--hv-font-display)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Anrede
                      </label>
                      <div className="flex gap-4">
                        {["Herr", "Frau", "Divers"].map((a) => (
                          <label
                            key={a}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <input
                              type="radio"
                              name="anrede"
                              value={a}
                              checked={formState.anrede === a}
                              onChange={handleChange}
                              className="accent-[#B8965A]"
                            />
                            <span
                              className="text-sm"
                              style={{
                                fontFamily: "var(--hv-font-body)",
                                color: "var(--hv-text)",
                              }}
                            >
                              {a}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Name + Email row */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-2 block text-[11px] uppercase tracking-[0.15em]"
                          style={{
                            fontFamily: "var(--hv-font-display)",
                            color: "var(--hv-muted)",
                          }}
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Ihr vollständiger Name"
                          className="w-full border px-4 py-3 text-base outline-none transition-colors duration-300 focus:border-[#B8965A]"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label
                          className="mb-2 block text-[11px] uppercase tracking-[0.15em]"
                          style={{
                            fontFamily: "var(--hv-font-display)",
                            color: "var(--hv-muted)",
                          }}
                        >
                          E-Mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="ihre@email.de"
                          className="w-full border px-4 py-3 text-base outline-none transition-colors duration-300 focus:border-[#B8965A]"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Telefon + Anlass row */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-2 block text-[11px] uppercase tracking-[0.15em]"
                          style={{
                            fontFamily: "var(--hv-font-display)",
                            color: "var(--hv-muted)",
                          }}
                        >
                          Telefon
                        </label>
                        <input
                          type="tel"
                          name="telefon"
                          value={formState.telefon}
                          onChange={handleChange}
                          placeholder="+49 ..."
                          className="w-full border px-4 py-3 text-base outline-none transition-colors duration-300 focus:border-[#B8965A]"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label
                          className="mb-2 block text-[11px] uppercase tracking-[0.15em]"
                          style={{
                            fontFamily: "var(--hv-font-display)",
                            color: "var(--hv-muted)",
                          }}
                        >
                          Anlass
                        </label>
                        <select
                          name="anlass"
                          value={formState.anlass}
                          onChange={handleChange}
                          className="w-full border px-4 py-3 text-base outline-none transition-colors duration-300 focus:border-[#B8965A]"
                          style={inputStyle}
                        >
                          <option value="">Bitte wählen</option>
                          <option value="urlaub">Urlaub / Erholung</option>
                          <option value="wellness">Wellness-Aufenthalt</option>
                          <option value="hochzeit">Hochzeit</option>
                          <option value="firmenfeier">Firmenveranstaltung</option>
                          <option value="jubilaeum">Jubiläum / Feier</option>
                          <option value="sonstiges">Sonstiges</option>
                        </select>
                      </div>
                    </div>

                    {/* Nachricht */}
                    <div>
                      <label
                        className="mb-2 block text-[11px] uppercase tracking-[0.15em]"
                        style={{
                          fontFamily: "var(--hv-font-display)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Nachricht *
                      </label>
                      <textarea
                        name="nachricht"
                        required
                        value={formState.nachricht}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Wie können wir Ihnen behilflich sein?"
                        className="w-full resize-none border px-4 py-3 text-base leading-relaxed outline-none transition-colors duration-300 focus:border-[#B8965A]"
                        style={inputStyle}
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-10 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-85"
                      style={{
                        fontFamily: "var(--hv-font-display)",
                        backgroundColor: "var(--hv-accent)",
                        color: "var(--hv-surface)",
                      }}
                    >
                      Nachricht senden
                    </button>
                  </form>
                </FadeIn>
              )}
            </div>

            {/* Info sidebar - 2 columns */}
            <div className="lg:col-span-2 lg:pl-8">
              {/* Contact info card */}
              <FadeIn delay={0.1}>
                <div
                  className="rounded-sm p-8"
                  style={{
                    backgroundColor: "var(--hv-card)",
                    border: "1px solid var(--hv-blush)",
                  }}
                >
                  <h3
                    className="text-lg tracking-wide"
                    style={{
                      fontFamily: "var(--hv-font-display)",
                      color: "var(--hv-text)",
                    }}
                  >
                    HAVEN Boutique Hotel
                  </h3>
                  <div
                    className="my-4 h-px w-8"
                    style={{ backgroundColor: "var(--hv-accent)" }}
                  />

                  <div className="space-y-4">
                    {/* Address */}
                    <div className="flex gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--hv-accent)"
                        strokeWidth="1.5"
                        className="mt-0.5 shrink-0"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p
                        className="text-[15px] leading-relaxed"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Musterstraße 1
                        <br />
                        10115 Berlin
                        <br />
                        Deutschland
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--hv-accent)"
                        strokeWidth="1.5"
                        className="mt-0.5 shrink-0"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <div>
                        <p
                          className="text-[15px]"
                          style={{
                            fontFamily: "var(--hv-font-body)",
                            color: "var(--hv-muted)",
                          }}
                        >
                          +49 (0) 30 123 456 78
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--hv-accent)"
                        strokeWidth="1.5"
                        className="mt-0.5 shrink-0"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <p
                        className="text-[15px]"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        info@beispiel.de
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Opening hours */}
              <FadeIn delay={0.25}>
                <div
                  className="mt-6 rounded-sm p-8"
                  style={{
                    backgroundColor: "var(--hv-card)",
                    border: "1px solid var(--hv-blush)",
                  }}
                >
                  <h3
                    className="text-[11px] uppercase tracking-[0.2em]"
                    style={{
                      fontFamily: "var(--hv-font-display)",
                      color: "var(--hv-text)",
                    }}
                  >
                    Öffnungszeiten
                  </h3>
                  <div
                    className="my-4 h-px w-8"
                    style={{ backgroundColor: "var(--hv-accent)" }}
                  />

                  <div className="space-y-4">
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-text)",
                        }}
                      >
                        Rezeption
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Täglich 6:00 &ndash; 23:00 Uhr
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-text)",
                        }}
                      >
                        Restaurant
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Fr&uuml;hst&uuml;ck: 7:00 &ndash; 10:30 Uhr
                        <br />
                        Abendessen: 18:30 &ndash; 22:00 Uhr
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-text)",
                        }}
                      >
                        Spa &amp; Wellness
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Täglich 7:00 &ndash; 21:00 Uhr
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-text)",
                        }}
                      >
                        Bar &amp; Lounge
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Täglich 16:00 &ndash; 0:00 Uhr
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Anfahrt */}
              <FadeIn delay={0.4}>
                <div
                  className="mt-6 rounded-sm p-8"
                  style={{
                    backgroundColor: "var(--hv-card)",
                    border: "1px solid var(--hv-blush)",
                  }}
                >
                  <h3
                    className="text-[11px] uppercase tracking-[0.2em]"
                    style={{
                      fontFamily: "var(--hv-font-display)",
                      color: "var(--hv-text)",
                    }}
                  >
                    Anfahrt
                  </h3>
                  <div
                    className="my-4 h-px w-8"
                    style={{ backgroundColor: "var(--hv-accent)" }}
                  />

                  <div className="space-y-3">
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-text)",
                        }}
                      >
                        Mit dem Auto
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        A7 bis Ausfahrt Oy-Mittelberg, weiter auf der B19 Richtung
                        Oberstdorf. Kostenfreie Tiefgarage am Hotel.
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-text)",
                        }}
                      >
                        Mit der Bahn
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Bahnhof Oberstdorf, ca. 5 Min. Taxifahrt. Auf Wunsch
                        organisieren wir gerne einen Abholdienst.
                      </p>
                    </div>

                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-text)",
                        }}
                      >
                        Flughafen
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--hv-font-body)",
                          color: "var(--hv-muted)",
                        }}
                      >
                        Memmingen (FMM): ca. 75 Min.
                        <br />
                        M&uuml;nchen (MUC): ca. 2,5 Std.
                        <br />
                        Z&uuml;rich (ZRH): ca. 2 Std.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder with gradient */}
      <section
        className="relative h-[300px] lg:h-[400px]"
        style={{
          background:
            "linear-gradient(135deg, var(--hv-sage) 0%, var(--hv-blush) 40%, var(--hv-card) 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--hv-accent)"
              strokeWidth="1"
              className="mx-auto mb-3"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-muted)",
              }}
            >
              Interaktive Karte
            </p>
            <p
              className="mt-1 text-sm italic"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-muted)",
              }}
            >
              Musterstraße 1, 10115 Berlin
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
