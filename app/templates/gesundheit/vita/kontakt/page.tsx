"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Siren, Phone, Check, Printer, Mail, MapPin } from "lucide-react";
import { contactInfo, openingHours, directions } from "../_design/data";

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

/* ── Kontakt Page ─────────────────────────────────────────────────────── */

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    anliegen: "termin",
    name: "",
    geburtsdatum: "",
    email: "",
    telefon: "",
    nachricht: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            top: "-80px",
            left: "-60px",
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
                Kontakt
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
              Wir sind{" "}
              <span style={{ color: "var(--vt-accent)" }}>f&uuml;r Sie da</span>
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
              Ob Terminvereinbarung, Rezeptbestellung oder allgemeine Fragen
              &ndash; kontaktieren Sie uns gerne. Wir melden uns schnellstm&ouml;glich
              bei Ihnen.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Emergency Banner ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--vt-blush)" }}>
        <div className="mx-auto max-w-7xl px-6 py-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    color: "#EF4444",
                  }}
                >
                  <Siren className="h-5 w-5" />
                </span>
                <div>
                  <p
                    className="text-[13px] font-semibold"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-text)",
                    }}
                  >
                    Notfall-Telefon
                  </p>
                  <p
                    className="text-[12px]"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      color: "var(--vt-muted)",
                    }}
                  >
                    Bei akuten Notf&auml;llen w&auml;hrend der Sprechzeiten
                  </p>
                </div>
              </div>
              <a
                href={`tel:${contactInfo.emergency.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all duration-300"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "#FFFFFF",
                  backgroundColor: "#EF4444",
                }}
              >
                <Phone className="h-4 w-4" /> {contactInfo.emergency}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Main Content: Form + Info ───────────────────────────────── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--vt-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div
                  className="rounded-2xl border p-8 lg:p-10"
                  style={{
                    backgroundColor: "var(--vt-surface)",
                    borderColor: "var(--vt-border)",
                    boxShadow: "var(--vt-shadow)",
                  }}
                >
                  <h2
                    className="mb-2"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "var(--vt-text)",
                    }}
                  >
                    Nachricht senden
                  </h2>
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      fontSize: "0.95rem",
                      color: "var(--vt-muted)",
                    }}
                  >
                    F&uuml;llen Sie das Formular aus und wir melden uns
                    schnellstm&ouml;glich bei Ihnen.
                  </p>

                  {submitted ? (
                    <div
                      className="rounded-xl p-8 text-center"
                      style={{ backgroundColor: "var(--vt-mint)" }}
                    >
                      <Check className="h-10 w-10 mx-auto" style={{ color: "var(--vt-accent)" }} />
                      <h3
                        className="mt-4"
                        style={{
                          fontFamily: "var(--vt-font-display)",
                          fontSize: "1.2rem",
                          fontWeight: 600,
                          color: "var(--vt-accent)",
                        }}
                      >
                        Nachricht gesendet!
                      </h3>
                      <p
                        className="mt-2"
                        style={{
                          fontFamily: "var(--vt-font-body)",
                          fontSize: "1rem",
                          color: "var(--vt-muted)",
                        }}
                      >
                        Vielen Dank f&uuml;r Ihre Nachricht. Wir melden uns
                        innerhalb eines Werktages bei Ihnen.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Anliegen */}
                      <div>
                        <label
                          className="mb-1.5 block text-[13px] font-medium"
                          style={{
                            fontFamily: "var(--vt-font-display)",
                            color: "var(--vt-text)",
                          }}
                        >
                          Anliegen
                        </label>
                        <select
                          name="anliegen"
                          value={formData.anliegen}
                          onChange={handleChange}
                          className="w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--vt-accent)] focus:ring-opacity-20"
                          style={{
                            fontFamily: "var(--vt-font-body)",
                            borderColor: "var(--vt-border-strong)",
                            backgroundColor: "var(--vt-bg)",
                            color: "var(--vt-text)",
                          }}
                        >
                          <option value="termin">Terminvereinbarung</option>
                          <option value="rezept">Rezeptbestellung</option>
                          <option value="ueberweisung">&Uuml;berweisung</option>
                          <option value="sonstiges">Sonstiges</option>
                        </select>
                      </div>

                      {/* Name + Geburtsdatum */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            className="mb-1.5 block text-[13px] font-medium"
                            style={{
                              fontFamily: "var(--vt-font-display)",
                              color: "var(--vt-text)",
                            }}
                          >
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Vor- und Nachname"
                            className="w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--vt-accent)] focus:ring-opacity-20"
                            style={{
                              fontFamily: "var(--vt-font-body)",
                              borderColor: "var(--vt-border-strong)",
                              backgroundColor: "var(--vt-bg)",
                              color: "var(--vt-text)",
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="mb-1.5 block text-[13px] font-medium"
                            style={{
                              fontFamily: "var(--vt-font-display)",
                              color: "var(--vt-text)",
                            }}
                          >
                            Geburtsdatum
                          </label>
                          <input
                            type="date"
                            name="geburtsdatum"
                            value={formData.geburtsdatum}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--vt-accent)] focus:ring-opacity-20"
                            style={{
                              fontFamily: "var(--vt-font-body)",
                              borderColor: "var(--vt-border-strong)",
                              backgroundColor: "var(--vt-bg)",
                              color: "var(--vt-text)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Email + Telefon */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            className="mb-1.5 block text-[13px] font-medium"
                            style={{
                              fontFamily: "var(--vt-font-display)",
                              color: "var(--vt-text)",
                            }}
                          >
                            E-Mail *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="ihre@email.de"
                            className="w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--vt-accent)] focus:ring-opacity-20"
                            style={{
                              fontFamily: "var(--vt-font-body)",
                              borderColor: "var(--vt-border-strong)",
                              backgroundColor: "var(--vt-bg)",
                              color: "var(--vt-text)",
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="mb-1.5 block text-[13px] font-medium"
                            style={{
                              fontFamily: "var(--vt-font-display)",
                              color: "var(--vt-text)",
                            }}
                          >
                            Telefon
                          </label>
                          <input
                            type="tel"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            placeholder="+49 ..."
                            className="w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--vt-accent)] focus:ring-opacity-20"
                            style={{
                              fontFamily: "var(--vt-font-body)",
                              borderColor: "var(--vt-border-strong)",
                              backgroundColor: "var(--vt-bg)",
                              color: "var(--vt-text)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Nachricht */}
                      <div>
                        <label
                          className="mb-1.5 block text-[13px] font-medium"
                          style={{
                            fontFamily: "var(--vt-font-display)",
                            color: "var(--vt-text)",
                          }}
                        >
                          Nachricht *
                        </label>
                        <textarea
                          name="nachricht"
                          value={formData.nachricht}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Ihre Nachricht an uns..."
                          className="w-full resize-none rounded-xl border px-4 py-3 text-[15px] outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--vt-accent)] focus:ring-opacity-20"
                          style={{
                            fontFamily: "var(--vt-font-body)",
                            borderColor: "var(--vt-border-strong)",
                            backgroundColor: "var(--vt-bg)",
                            color: "var(--vt-text)",
                          }}
                        />
                      </div>

                      {/* Privacy note */}
                      <p
                        className="text-[12px]"
                        style={{
                          fontFamily: "var(--vt-font-body)",
                          color: "var(--vt-muted)",
                          lineHeight: 1.5,
                        }}
                      >
                        Mit dem Absenden stimmen Sie unserer Datenschutzerkl&auml;rung
                        zu. Ihre Daten werden vertraulich behandelt und nicht an
                        Dritte weitergegeben.
                      </p>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full rounded-xl px-8 py-4 text-[15px] font-medium tracking-[0.02em] transition-all duration-300 hover:shadow-lg sm:w-auto"
                        style={{
                          fontFamily: "var(--vt-font-display)",
                          color: "#FFFFFF",
                          backgroundColor: "var(--vt-accent)",
                        }}
                      >
                        Nachricht senden &rarr;
                      </button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Right sidebar: Contact info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Address card */}
              <FadeIn delay={0.1}>
                <div
                  className="rounded-2xl border p-7"
                  style={{
                    backgroundColor: "var(--vt-surface)",
                    borderColor: "var(--vt-border)",
                    boxShadow: "var(--vt-shadow)",
                  }}
                >
                  <h3
                    className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-accent)",
                    }}
                  >
                    Praxisadresse
                  </h3>
                  <div
                    className="space-y-3"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      fontSize: "1rem",
                      color: "var(--vt-text)",
                    }}
                  >
                    <p className="font-semibold">VITA &ndash; Praxis f&uuml;r Gesundheit</p>
                    <p style={{ color: "var(--vt-muted)" }}>
                      {contactInfo.address}
                      <br />
                      {contactInfo.city}
                    </p>
                    <div
                      className="h-px w-full"
                      style={{ backgroundColor: "var(--vt-border)" }}
                    />
                    <div className="space-y-2">
                      <p className="flex items-center gap-3">
                        <Phone className="h-4 w-4" style={{ color: "var(--vt-accent)" }} />
                        <span style={{ color: "var(--vt-accent)", fontWeight: 600 }}>
                          {contactInfo.phone}
                        </span>
                      </p>
                      <p
                        className="flex items-center gap-3"
                        style={{ color: "var(--vt-muted)" }}
                      >
                        <Printer className="h-4 w-4" />
                        {contactInfo.fax}
                      </p>
                      <p className="flex items-center gap-3">
                        <Mail className="h-4 w-4" style={{ color: "var(--vt-accent)" }} />
                        <span style={{ color: "var(--vt-accent)" }}>
                          {contactInfo.email}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Opening hours */}
              <FadeIn delay={0.2}>
                <div
                  className="rounded-2xl border p-7"
                  style={{
                    backgroundColor: "var(--vt-surface)",
                    borderColor: "var(--vt-border)",
                    boxShadow: "var(--vt-shadow)",
                  }}
                >
                  <h3
                    className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-accent)",
                    }}
                  >
                    Sprechzeiten
                  </h3>
                  <div className="space-y-2.5">
                    {openingHours.map((oh) => (
                      <div
                        key={oh.day}
                        className="flex items-center justify-between"
                      >
                        <span
                          className="text-[14px]"
                          style={{
                            fontFamily: "var(--vt-font-body)",
                            color: "var(--vt-muted)",
                          }}
                        >
                          {oh.day}
                        </span>
                        <span
                          className="text-[14px]"
                          style={{
                            fontFamily: "var(--vt-font-body)",
                            color:
                              oh.hours === "Geschlossen"
                                ? "var(--vt-muted)"
                                : "var(--vt-text)",
                            fontWeight:
                              oh.hours === "Geschlossen" ? 400 : 600,
                            opacity:
                              oh.hours === "Geschlossen" ? 0.5 : 1,
                          }}
                        >
                          {oh.hours}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-5 rounded-xl p-3 text-center"
                    style={{ backgroundColor: "var(--vt-accent-soft)" }}
                  >
                    <p
                      className="text-[12px]"
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        color: "var(--vt-accent)",
                        fontWeight: 500,
                      }}
                    >
                      Termine nach Vereinbarung auch au&szlig;erhalb der
                      Sprechzeiten m&ouml;glich
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Quick links */}
              <FadeIn delay={0.3}>
                <div
                  className="rounded-2xl border p-7"
                  style={{
                    backgroundColor: "var(--vt-mint)",
                    borderColor: "var(--vt-border)",
                  }}
                >
                  <h3
                    className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-accent)",
                    }}
                  >
                    Schnellzugriff
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        icon: "\uD83D\uDCC5",
                        label: "Online-Terminbuchung",
                        desc: "Rund um die Uhr verf\u00FCgbar",
                      },
                      {
                        icon: "\uD83D\uDCDD",
                        label: "Rezept bestellen",
                        desc: "\u00DCber das Kontaktformular",
                      },
                      {
                        icon: "\uD83D\uDCF1",
                        label: "Videosprechstunde",
                        desc: "Nach Terminvereinbarung",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-[var(--vt-surface)]"
                      >
                        <span style={{ fontSize: "20px" }}>{item.icon}</span>
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
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Map Placeholder ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--vt-surface)" }}>
        <div className="mx-auto max-w-7xl px-6 pb-8 sm:px-8 lg:px-12">
          <FadeIn>
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                aspectRatio: "21/9",
                background:
                  "linear-gradient(160deg, #E5E7EB 0%, #D1D5DB 30%, #9CA3AF 60%, #6B7280 100%)",
                boxShadow: "var(--vt-shadow-lg)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span style={{ opacity: 0.4, color: "var(--vt-accent)" }}>
                  <MapPin className="h-10 w-10" />
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
                  {contactInfo.address}, {contactInfo.city}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Anfahrt ─────────────────────────────────────────────────── */}
      <section
        className="py-20 lg:py-24"
        style={{ backgroundColor: "var(--vt-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <FadeIn className="mb-12">
            <h2
              style={{
                fontFamily: "var(--vt-font-display)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--vt-text)",
              }}
            >
              Anfahrt
            </h2>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "\uD83D\uDE8C", label: "Bus", text: directions.bus },
              { icon: "\uD83D\uDE83", label: "Saarbahn", text: directions.bahn },
              { icon: "\uD83D\uDE97", label: "Auto", text: directions.auto },
              { icon: "\uD83D\uDEB2", label: "Fahrrad", text: directions.fahrrad },
            ].map((dir, j) => (
              <FadeIn key={dir.label} delay={j * 0.08}>
                <div
                  className="rounded-2xl border p-6 transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: "var(--vt-bg)",
                    borderColor: "var(--vt-border)",
                    height: "100%",
                  }}
                >
                  <span className="text-2xl">{dir.icon}</span>
                  <h3
                    className="mt-3 text-[14px] font-semibold"
                    style={{
                      fontFamily: "var(--vt-font-display)",
                      color: "var(--vt-text)",
                    }}
                  >
                    {dir.label}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-relaxed"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      color: "var(--vt-muted)",
                    }}
                  >
                    {dir.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
