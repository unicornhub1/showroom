import { Sparkles, Clock, ShieldCheck, Phone } from 'lucide-react';
import { Configurator } from '../_design/components/Configurator';
import { AssistantPanel } from '../_design/components/AssistantPanel';
import { CONTACT, FAQS } from '../_design/data';

const ASSURANCES = [
  { icon: Clock, title: 'Unter zwei Minuten', text: 'Fünf Schritte bis zur Preisspanne' },
  { icon: ShieldCheck, title: 'Unverbindlich', text: 'Keine Anmeldung, keine Verpflichtung' },
  { icon: Sparkles, title: 'Datenbasiert', text: 'Kalkuliert aus 340+ Objekten' },
];

export default function KonfiguratorPage() {
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
        <div className="vg-grid-bg absolute inset-0 opacity-[0.35]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 0%, rgba(200,65,58,0.10), transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: 'var(--vg-signal)' }} />
            <span
              className="text-[11px] tracking-[0.28em] uppercase"
              style={{ color: 'var(--vg-signal)', fontFamily: 'var(--vg-font-mono)' }}
            >
              Preiskalkulator
            </span>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h1
                className="text-4xl leading-[1.08] md:text-6xl"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                }}
              >
                Was kostet der Schutz
                <br />
                Ihres Objekts?
              </h1>
              <p
                className="mt-6 max-w-2xl text-lg leading-relaxed"
                style={{ color: 'var(--vg-text-muted)' }}
              >
                Beantworten Sie vier kurze Fragen zu Ihrem Objekt und erhalten Sie
                eine belastbare Preisspanne — kalkuliert nach denselben Sätzen, mit
                denen wir auch unsere Angebote rechnen.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {ASSURANCES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center"
                    style={{
                      border: '1px solid var(--vg-border-light)',
                      backgroundColor: 'var(--vg-bg)',
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: 'var(--vg-steel)' }} />
                  </span>
                  <div>
                    <p
                      className="text-[14px]"
                      style={{
                        color: 'var(--vg-text)',
                        fontFamily: 'var(--vg-font-display)',
                        fontWeight: 600,
                      }}
                    >
                      {title}
                    </p>
                    <p className="mt-0.5 text-[12px]" style={{ color: 'var(--vg-text-dim)' }}>
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Konfigurator ──────────────────────────────────────────────────── */}
      <section
        className="border-b"
        style={{ borderColor: 'var(--vg-border)', backgroundColor: 'var(--vg-bg)' }}
      >
        <div className="mx-auto max-w-7xl">
          <Configurator />
        </div>
      </section>

      {/* ── KI-Assistent ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-bg)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div className="lg:pt-6">
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-10"
                  style={{ backgroundColor: 'var(--vg-signal)' }}
                />
                <span
                  className="text-[11px] tracking-[0.28em] uppercase"
                  style={{
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  KI-Assistent
                </span>
              </div>

              <h2
                className="mt-6 text-3xl leading-[1.12] md:text-[42px]"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                Lieber im Gespräch
                <br />
                als im Formular?
              </h2>

              <p
                className="mt-6 text-base leading-relaxed"
                style={{ color: 'var(--vg-text-muted)' }}
              >
                Nicht jedes Objekt passt in vorgegebene Kategorien. Unser
                KI-Assistent nimmt Ihre Situation in eigenen Worten auf, stellt
                gezielte Rückfragen und schlägt ein passendes Leistungsbild vor —
                das Sie anschließend direkt im Konfigurator übernehmen können.
              </p>

              <ul className="mt-8 flex flex-col gap-4">
                {[
                  'Beschreibung in freiem Text statt Auswahlfeldern',
                  'Rückfragen zu Risiken, die im Formular untergehen',
                  'Vorschlag wird als Konfiguration übernommen',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1 w-1 shrink-0"
                      style={{ backgroundColor: 'var(--vg-signal)' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--vg-text-muted)' }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-9 flex flex-wrap items-center gap-4 px-6 py-5"
                style={{
                  backgroundColor: 'var(--vg-surface)',
                  border: '1px solid var(--vg-border)',
                }}
              >
                <Phone className="h-4 w-4" style={{ color: 'var(--vg-signal)' }} />
                <div>
                  <p className="text-[13px]" style={{ color: 'var(--vg-text)' }}>
                    Oder direkt mit einem Berater sprechen
                  </p>
                  <p
                    className="mt-0.5 text-[13px]"
                    style={{
                      color: 'var(--vg-text-muted)',
                      fontFamily: 'var(--vg-font-mono)',
                    }}
                  >
                    {CONTACT.phone}
                  </p>
                </div>
              </div>
            </div>

            <AssistantPanel />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ backgroundColor: 'var(--vg-light)', borderColor: 'var(--vg-border)' }}
      >
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <h2
            className="text-3xl leading-tight md:text-[40px]"
            style={{
              color: 'var(--vg-on-light)',
              fontFamily: 'var(--vg-font-display)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Häufige Fragen zur Kalkulation
          </h2>

          <div className="mt-12 flex flex-col">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group border-b py-6"
                style={{ borderColor: 'var(--vg-light-border)' }}
              >
                <summary
                  className="flex items-start justify-between gap-6 text-lg leading-snug marker:content-none"
                  style={{
                    color: 'var(--vg-on-light)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 600,
                  }}
                >
                  {faq.q}
                  <span
                    className="mt-1 shrink-0 text-2xl leading-none transition-transform group-open:rotate-45"
                    style={{ color: 'var(--vg-signal)', fontWeight: 300 }}
                  >
                    +
                  </span>
                </summary>
                <p
                  className="mt-4 max-w-3xl text-[15px] leading-relaxed"
                  style={{ color: 'var(--vg-on-light-muted)' }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
