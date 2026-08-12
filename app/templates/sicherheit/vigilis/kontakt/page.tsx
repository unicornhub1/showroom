import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, AlertTriangle, Calculator } from 'lucide-react';
import { ContactForm } from '../_design/components/ContactForm';
import { CONTACT, CONFIGURATOR_HREF } from '../_design/data';

const CHANNELS = [
  { icon: Phone, label: 'Telefon', value: CONTACT.phone },
  { icon: Mail, label: 'E-Mail', value: CONTACT.email },
  { icon: MapPin, label: 'Anschrift', value: CONTACT.address },
  { icon: Clock, label: 'Bürozeiten', value: CONTACT.hours },
];

export default function KontaktPage() {
  return (
    <main className="pt-[70px] md:pt-[106px]">
      {/* ── Kopf ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b"
        style={{
          backgroundColor: 'var(--vg-surface)',
          borderColor: 'var(--vg-border)',
        }}
      >
        <div className="vg-grid-bg absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: 'var(--vg-signal)' }} />
            <span
              className="text-[11px] tracking-[0.28em] uppercase"
              style={{ color: 'var(--vg-signal)', fontFamily: 'var(--vg-font-mono)' }}
            >
              Kontakt
            </span>
          </div>
          <h1
            className="mt-7 max-w-3xl text-4xl leading-[1.08] md:text-6xl"
            style={{
              color: 'var(--vg-text)',
              fontFamily: 'var(--vg-font-display)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            Sprechen wir über
            <br />
            Ihr Objekt
          </h1>
          <p
            className="mt-7 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'var(--vg-text-muted)' }}
          >
            Sie erreichen uns werktags im Büro und rund um die Uhr über die
            Leitstelle. Wenn Sie zuerst eine Preisvorstellung möchten, nutzen Sie
            den Kalkulator — das Ergebnis können Sie Ihrer Anfrage direkt
            beilegen.
          </p>
        </div>
      </section>

      {/* ── Formular & Kontaktwege ────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-bg)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <ContactForm />

            <aside className="flex flex-col gap-6">
              {/* Kontaktwege */}
              <div
                className="px-8 py-9"
                style={{
                  backgroundColor: 'var(--vg-surface)',
                  border: '1px solid var(--vg-border)',
                }}
              >
                <h2
                  className="text-[11px] tracking-[0.24em] uppercase"
                  style={{
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  Direkter Draht
                </h2>

                <ul className="mt-7 flex flex-col gap-6">
                  {CHANNELS.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-4">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center"
                        style={{
                          border: '1px solid var(--vg-border-light)',
                          backgroundColor: 'var(--vg-bg)',
                        }}
                      >
                        <Icon className="h-4 w-4" style={{ color: 'var(--vg-steel)' }} />
                      </span>
                      <div>
                        <p
                          className="text-[9px] tracking-[0.18em] uppercase"
                          style={{
                            color: 'var(--vg-text-dim)',
                            fontFamily: 'var(--vg-font-mono)',
                          }}
                        >
                          {label}
                        </p>
                        <p
                          className="mt-1 text-[14px] leading-snug"
                          style={{ color: 'var(--vg-text)' }}
                        >
                          {value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notfall */}
              <div
                className="px-8 py-8"
                style={{
                  backgroundColor: 'var(--vg-surface)',
                  border: '1px solid var(--vg-signal)',
                }}
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    className="h-4 w-4"
                    style={{ color: 'var(--vg-signal)' }}
                  />
                  <span
                    className="text-[11px] tracking-[0.2em] uppercase"
                    style={{
                      color: 'var(--vg-signal)',
                      fontFamily: 'var(--vg-font-mono)',
                    }}
                  >
                    Leitstelle · 24/7
                  </span>
                </div>
                <p
                  className="mt-5 text-2xl"
                  style={{
                    color: 'var(--vg-text)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 700,
                  }}
                >
                  {CONTACT.emergency}
                </p>
                <p
                  className="mt-3 text-[13px] leading-relaxed"
                  style={{ color: 'var(--vg-text-muted)' }}
                >
                  Für Bestandskunden bei Alarmmeldungen, Störungen und akuten
                  Vorfällen — jederzeit erreichbar.
                </p>
              </div>

              {/* Kalkulator-Hinweis */}
              <Link
                href={CONFIGURATOR_HREF}
                className="group flex items-start gap-4 px-8 py-8 transition-colors"
                style={{
                  backgroundColor: 'var(--vg-surface-alt)',
                  border: '1px solid var(--vg-border-light)',
                }}
              >
                <Calculator
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: 'var(--vg-signal)' }}
                />
                <div>
                  <p
                    className="text-[15px]"
                    style={{
                      color: 'var(--vg-text)',
                      fontFamily: 'var(--vg-font-display)',
                      fontWeight: 600,
                    }}
                  >
                    Zuerst den Preis wissen?
                  </p>
                  <p
                    className="mt-2 text-[13px] leading-relaxed"
                    style={{ color: 'var(--vg-text-muted)' }}
                  >
                    Der Kalkulator liefert in zwei Minuten eine belastbare
                    Preisspanne — kostenlos und ohne Anmeldung.
                  </p>
                  <span
                    className="mt-4 inline-block text-[11px] tracking-[0.14em] uppercase"
                    style={{
                      color: 'var(--vg-signal)',
                      fontFamily: 'var(--vg-font-mono)',
                    }}
                  >
                    Zum Kalkulator →
                  </span>
                </div>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Kartenfläche ──────────────────────────────────────────────────── */}
      <section
        className="relative h-[360px] border-t"
        style={{
          backgroundColor: 'var(--vg-surface)',
          borderColor: 'var(--vg-border)',
        }}
      >
        <div className="vg-grid-bg absolute inset-0 opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200,65,58,0.10), transparent 70%)',
          }}
        />
        <div className="relative flex h-full items-center justify-center">
          <div className="text-center">
            <span
              className="mx-auto flex h-12 w-12 items-center justify-center"
              style={{ border: '1px solid var(--vg-signal)' }}
            >
              <MapPin className="h-5 w-5" style={{ color: 'var(--vg-signal)' }} />
            </span>
            <p
              className="mt-6 text-lg"
              style={{
                color: 'var(--vg-text)',
                fontFamily: 'var(--vg-font-display)',
                fontWeight: 600,
              }}
            >
              {CONTACT.address}
            </p>
            <p
              className="mt-2 text-[11px] tracking-[0.18em] uppercase"
              style={{
                color: 'var(--vg-text-dim)',
                fontFamily: 'var(--vg-font-mono)',
              }}
            >
              Besuche nach Vereinbarung
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
