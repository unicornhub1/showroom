"use client";

import { useState } from "react";
import FadeIn from "../_design/components/FadeIn";
import PageHeader from "../_design/components/PageHeader";
import { BASE, CONTACT } from "../_design/data";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--sp-font-sans)",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid var(--sp-line)",
  borderRadius: 0,
  color: "var(--sp-text)",
};

export default function KontaktPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHeader
        image={`${BASE}/images/hero/intro.jpg`}
        gradient="linear-gradient(135deg, #B5603A 0%, #2A2826 100%)"
        eyebrow="Kontakt & Anfrage"
        title="Schreiben Sie uns"
        subtitle="Ob Übernachtung, Tisch oder Hochzeit — wir antworten persönlich."
      />

      <section className="py-20 lg:py-32" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            {/* Info */}
            <FadeIn>
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>01 &mdash; So erreichen Sie uns</span>
              <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                SPEICHER No.7
              </h2>
              <div className="mt-8 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>Anschrift</h3>
                  <p className="mt-3 text-lg leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-text)" }}>
                    {CONTACT.address.map((l, i) => (
                      <span key={i}>{l}<br /></span>
                    ))}
                  </p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>Telefon & E-Mail</h3>
                  <p className="mt-3 text-lg" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-text)" }}>{CONTACT.phone}</p>
                  <p className="text-lg" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-accent)" }}>{CONTACT.email}</p>
                </div>
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>Öffnungszeiten</h3>
                  <div className="mt-3 space-y-2">
                    {CONTACT.hours.map((h) => (
                      <p key={h.label} className="text-[15px]" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)" }}>
                        <span style={{ color: "var(--sp-text)" }}>{h.label}:</span> {h.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.15}>
              <div className="border p-8 lg:p-12" style={{ backgroundColor: "var(--sp-surface)", borderColor: "var(--sp-line)", borderRadius: 0 }}>
                {sent ? (
                  <div className="flex min-h-[420px] flex-col items-start justify-center">
                    <span className="sp-index" style={{ color: "var(--sp-accent)" }}>Eingegangen</span>
                    <h3 className="mt-5 text-3xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>Vielen Dank!</h3>
                    <p className="mt-4 max-w-sm text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                      Ihre Anfrage ist bei uns eingegangen. Wir melden uns persönlich bei Ihnen — in
                      der Regel innerhalb von 24 Stunden.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-8 rounded-none border px-6 py-3 text-[11px] uppercase tracking-[0.18em]"
                      style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)", borderColor: "var(--sp-text)" }}
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
                    className="space-y-7"
                  >
                    <div className="grid gap-7 sm:grid-cols-2">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>Name</label>
                        <input required type="text" className="mt-2 w-full py-3 text-[15px] outline-none" style={inputStyle} placeholder="Ihr Name" />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>Telefon</label>
                        <input type="tel" className="mt-2 w-full py-3 text-[15px] outline-none" style={inputStyle} placeholder="Optional" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>E-Mail</label>
                      <input required type="email" className="mt-2 w-full py-3 text-[15px] outline-none" style={inputStyle} placeholder="ihre@email.de" />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>Ihr Anliegen</label>
                      <select required defaultValue="" className="mt-2 w-full py-3 text-[15px] outline-none" style={inputStyle}>
                        <option value="" disabled>Bitte wählen</option>
                        <option>Übernachtung / Loft</option>
                        <option>Tischreservierung</option>
                        <option>Hochzeit</option>
                        <option>Firmenevent / Feier</option>
                        <option>Sonstiges</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>Nachricht</label>
                      <textarea required rows={5} className="mt-2 w-full resize-none py-3 text-[15px] outline-none" style={inputStyle} placeholder="Erzählen Sie uns von Ihrem Anliegen, Wunschterminen und Gästezahl …" />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-none py-4 text-[11px] uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-90"
                      style={{ fontFamily: "var(--sp-font-mono)", backgroundColor: "var(--sp-text)", color: "var(--sp-bg)" }}
                    >
                      Anfrage senden
                    </button>
                    <p className="text-center text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
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
