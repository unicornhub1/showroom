"use client";

import { useState } from "react";
import FadeIn from "../_design/components/FadeIn";
import PageHeader from "../_design/components/PageHeader";
import { BASE, CONTACT } from "../_design/data";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--ro-font-sans)",
  backgroundColor: "var(--ro-surface)",
  border: "1px solid var(--ro-line)",
  color: "var(--ro-text)",
};

export default function KontaktPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHeader
        image={`${BASE}/images/hero/intro.jpg`}
        gradient="linear-gradient(135deg, #9C7B3F 0%, #34302A 100%)"
        eyebrow="Kontakt & Anfrage"
        title="Schreiben Sie uns"
        subtitle="Ob Übernachtung, Tisch oder Hochzeit — wir antworten persönlich."
      />

      <section className="py-20 lg:py-32" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            {/* Info */}
            <FadeIn>
              <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>So erreichen Sie uns</span>
              <h2 className="mt-4 text-3xl sm:text-4xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
                Gut Rosenau
              </h2>
              <div className="my-7 ro-rule" />

              <div className="space-y-7">
                <div>
                  <h3 className="ro-eyebrow" style={{ color: "var(--ro-muted)" }}>Anschrift</h3>
                  <p className="mt-2 text-lg leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-text)" }}>
                    {CONTACT.address.map((l, i) => (
                      <span key={i}>{l}<br /></span>
                    ))}
                  </p>
                </div>
                <div>
                  <h3 className="ro-eyebrow" style={{ color: "var(--ro-muted)" }}>Telefon & E-Mail</h3>
                  <p className="mt-2 text-lg" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-text)" }}>{CONTACT.phone}</p>
                  <p className="text-lg" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}>{CONTACT.email}</p>
                </div>
                <div>
                  <h3 className="ro-eyebrow" style={{ color: "var(--ro-muted)" }}>Öffnungszeiten</h3>
                  <div className="mt-2 space-y-2">
                    {CONTACT.hours.map((h) => (
                      <p key={h.label} className="text-[15px]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>
                        <span style={{ color: "var(--ro-text)" }}>{h.label}:</span> {h.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.15}>
              <div className="rounded-sm p-8 lg:p-10" style={{ backgroundColor: "var(--ro-card)", border: "1px solid var(--ro-line)" }}>
                {sent ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <div className="mb-6 ro-rule" />
                    <h3 className="text-3xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>Vielen Dank!</h3>
                    <p className="mt-4 max-w-sm text-lg leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
                      Ihre Anfrage ist bei uns eingegangen. Wir melden uns persönlich bei Ihnen — in
                      der Regel innerhalb von 24 Stunden.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-8 border px-6 py-3 text-[11px] uppercase tracking-[0.2em]"
                      style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)", borderColor: "var(--ro-accent)" }}
                    >
                      Neue Anfrage
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="ro-eyebrow" style={{ color: "var(--ro-muted)" }}>Name</label>
                        <input required type="text" className="mt-2 w-full px-4 py-3 text-[15px] outline-none" style={inputStyle} placeholder="Ihr Name" />
                      </div>
                      <div>
                        <label className="ro-eyebrow" style={{ color: "var(--ro-muted)" }}>Telefon</label>
                        <input type="tel" className="mt-2 w-full px-4 py-3 text-[15px] outline-none" style={inputStyle} placeholder="Optional" />
                      </div>
                    </div>
                    <div>
                      <label className="ro-eyebrow" style={{ color: "var(--ro-muted)" }}>E-Mail</label>
                      <input required type="email" className="mt-2 w-full px-4 py-3 text-[15px] outline-none" style={inputStyle} placeholder="ihre@email.de" />
                    </div>
                    <div>
                      <label className="ro-eyebrow" style={{ color: "var(--ro-muted)" }}>Ihr Anliegen</label>
                      <select required defaultValue="" className="mt-2 w-full px-4 py-3 text-[15px] outline-none" style={inputStyle}>
                        <option value="" disabled>Bitte wählen</option>
                        <option>Übernachtung / Zimmer</option>
                        <option>Tischreservierung</option>
                        <option>Hochzeit</option>
                        <option>Firmenevent / Feier</option>
                        <option>Sonstiges</option>
                      </select>
                    </div>
                    <div>
                      <label className="ro-eyebrow" style={{ color: "var(--ro-muted)" }}>Nachricht</label>
                      <textarea required rows={5} className="mt-2 w-full resize-none px-4 py-3 text-[15px] outline-none" style={inputStyle} placeholder="Erzählen Sie uns von Ihrem Anliegen, Wunschterminen und Gästezahl …" />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90"
                      style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "#FBF8F2" }}
                    >
                      Anfrage senden
                    </button>
                    <p className="text-center text-xs" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>
                      Designvorlage — dieses Formular versendet keine echten Daten.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
