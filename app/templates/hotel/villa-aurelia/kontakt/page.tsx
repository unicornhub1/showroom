"use client";

import { useState } from "react";
import FadeIn from "../_design/components/FadeIn";
import Ornament from "../_design/components/Ornament";
import PageHeader from "../_design/components/PageHeader";
import { BASE, CONTACT } from "../_design/data";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--va-font-sans)",
  backgroundColor: "var(--va-surface)",
  border: "1px solid var(--va-line)",
  color: "var(--va-text)",
};

export default function KontaktPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHeader
        image={`${BASE}/images/hero/intro.jpg`}
        gradient="linear-gradient(135deg, #B79257 0%, #1C2620 100%)"
        eyebrow="Kontakt & Anfrage"
        title="Schreiben Sie uns"
        subtitle="Ob Übernachtung, Tisch oder Event — wir antworten persönlich."
      />

      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            {/* Info */}
            <FadeIn>
              <span className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-gold)" }}>So erreichen Sie uns</span>
              <h2 className="mt-5 text-4xl sm:text-5xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
                Villa Aurelia
              </h2>
              <div className="my-8 va-rule" />

              <div className="space-y-8">
                <div>
                  <h3 className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-muted)" }}>Anschrift</h3>
                  <p className="mt-3 text-lg leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-text)" }}>
                    {CONTACT.address.map((l, i) => (
                      <span key={i}>{l}<br /></span>
                    ))}
                  </p>
                </div>
                <div>
                  <h3 className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-muted)" }}>Telefon &amp; E-Mail</h3>
                  <p className="mt-3 text-lg" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-text)" }}>{CONTACT.phone}</p>
                  <p className="text-lg" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-accent)" }}>{CONTACT.email}</p>
                </div>
                <div>
                  <h3 className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-muted)" }}>Öffnungszeiten</h3>
                  <div className="mt-3 space-y-2">
                    {CONTACT.hours.map((h) => (
                      <p key={h.label} className="text-[15px]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>
                        <span style={{ color: "var(--va-text)" }}>{h.label}:</span> {h.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.15}>
              <div className="va-frame">
                <div className="p-8 lg:p-12" style={{ backgroundColor: "var(--va-card)" }}>
                  {sent ? (
                    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                      <Ornament className="mb-8 w-full" />
                      <h3 className="text-3xl sm:text-4xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>Vielen Dank!</h3>
                      <p className="mt-5 max-w-sm text-lg leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}>
                        Ihre Anfrage ist bei uns eingegangen. Wir melden uns persönlich bei Ihnen — in
                        der Regel innerhalb von 24 Stunden.
                      </p>
                      <button onClick={() => setSent(false)} className="va-btn-gold mt-9 px-7 py-3.5">
                        Neue Anfrage
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                      className="space-y-6"
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-muted)" }}>Name</label>
                          <input required type="text" className="mt-3 w-full px-4 py-3 text-[15px] outline-none" style={inputStyle} placeholder="Ihr Name" />
                        </div>
                        <div>
                          <label className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-muted)" }}>Telefon</label>
                          <input type="tel" className="mt-3 w-full px-4 py-3 text-[15px] outline-none" style={inputStyle} placeholder="Optional" />
                        </div>
                      </div>
                      <div>
                        <label className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-muted)" }}>E-Mail</label>
                        <input required type="email" className="mt-3 w-full px-4 py-3 text-[15px] outline-none" style={inputStyle} placeholder="ihre@email.de" />
                      </div>
                      <div>
                        <label className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-muted)" }}>Ihr Anliegen</label>
                        <select required defaultValue="" className="mt-3 w-full px-4 py-3 text-[15px] outline-none" style={inputStyle}>
                          <option value="" disabled>Bitte wählen</option>
                          <option>Übernachtung / Zimmer</option>
                          <option>Tischreservierung</option>
                          <option>Hochzeit</option>
                          <option>Firmenevent / Feier</option>
                          <option>Sonstiges</option>
                        </select>
                      </div>
                      <div>
                        <label className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-muted)" }}>Nachricht</label>
                        <textarea required rows={5} className="mt-3 w-full resize-none px-4 py-3 text-[15px] outline-none" style={inputStyle} placeholder="Erzählen Sie uns von Ihrem Anliegen, Wunschterminen und Gästezahl …" />
                      </div>
                      <button type="submit" className="va-btn-gold w-full py-4">
                        Anfrage senden
                      </button>
                      <p className="text-center text-xs" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>
                        Designvorlage — dieses Formular versendet keine echten Daten.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
