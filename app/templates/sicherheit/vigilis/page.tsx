import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Phone, Calculator, Sparkles } from 'lucide-react';
import { ConfiguratorTeaser } from './_design/components/ConfiguratorTeaser';
import {
  STATS,
  TRUST_POINTS,
  SERVICES,
  OBJECT_TYPES,
  PROCESS_STEPS,
  REFERENCES,
  CONTACT,
  CONFIGURATOR_HREF,
  HOME_HREF,
} from './_design/data';

export default function VigilisHome() {
  return (
    <main className="pt-[70px] md:pt-[106px]">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/templates/sicherheit/vigilis/images/hero/hero.jpg"
            alt="Bürogebäude bei Nacht"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(95deg, var(--vg-bg) 12%, rgba(10,13,18,0.93) 45%, rgba(10,13,18,0.55) 100%)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2"
              style={{
                border: '1px solid var(--vg-border-light)',
                backgroundColor: 'rgba(17, 22, 33, 0.7)',
              }}
            >
              <span
                className="vg-pulse inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--vg-ok)' }}
              />
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  color: 'var(--vg-text-muted)',
                  fontFamily: 'var(--vg-font-mono)',
                }}
              >
                Leitstelle rund um die Uhr besetzt
              </span>
            </div>

            <h1
              className="mt-8 text-5xl leading-[1.04] md:text-7xl"
              style={{
                color: 'var(--vg-text)',
                fontFamily: 'var(--vg-font-display)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
              }}
            >
              Sicherheit,
              <br />
              die sich rechnen
              <br />
              lässt.
            </h1>

            <p
              className="mt-8 max-w-xl text-lg leading-relaxed"
              style={{ color: 'var(--vg-text-muted)' }}
            >
              Objektschutz für Gewerbe, Industrie und öffentliche Auftraggeber.
              Zertifiziertes Personal, eigene Leitstelle — und ein Preis, den Sie
              vorab selbst ermitteln können.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={CONFIGURATOR_HREF}
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] tracking-[0.14em] uppercase transition-all"
                style={{
                  backgroundColor: 'var(--vg-signal)',
                  color: '#fff',
                  fontFamily: 'var(--vg-font-body)',
                  fontWeight: 600,
                }}
              >
                <Calculator className="h-4 w-4" />
                Preis berechnen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-5 text-[13px] tracking-[0.14em] uppercase transition-all"
                style={{
                  border: '1px solid var(--vg-border-strong)',
                  color: 'var(--vg-text)',
                  backgroundColor: 'rgba(17, 22, 33, 0.6)',
                  fontFamily: 'var(--vg-font-body)',
                  fontWeight: 500,
                }}
              >
                <Phone className="h-4 w-4" />
                Beratung anfordern
              </a>
            </div>
          </div>
        </div>

        {/* Kennzahlen */}
        <div
          className="relative border-t"
          style={{
            borderColor: 'var(--vg-border)',
            backgroundColor: 'rgba(10, 13, 18, 0.85)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="px-6 py-8 md:px-8"
                style={{
                  borderLeft: i > 0 ? '1px solid var(--vg-border)' : 'none',
                }}
              >
                <p
                  className="text-3xl leading-none md:text-4xl"
                  style={{
                    color: 'var(--vg-text)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 700,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-3 text-[10px] tracking-[0.18em] uppercase"
                  style={{
                    color: 'var(--vg-text-dim)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vertrauen ─────────────────────────────────────────────────────── */}
      <section
        className="border-b"
        style={{ backgroundColor: 'var(--vg-surface)', borderColor: 'var(--vg-border)' }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point, i) => (
              <div key={point.title}>
                <span
                  className="text-[10px] tracking-[0.2em]"
                  style={{
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="mt-4 text-[17px] leading-snug"
                  style={{
                    color: 'var(--vg-text)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 600,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--vg-text-muted)' }}
                >
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leistungen (hell) ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-light)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
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
                  Leistungen
                </span>
              </div>
              <h2
                className="mt-6 max-w-2xl text-3xl leading-[1.12] md:text-[46px]"
                style={{
                  color: 'var(--vg-on-light)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                }}
              >
                Sechs Bausteine für ein
                <br className="hidden md:block" /> vollständiges Sicherheitskonzept
              </h2>
            </div>

            <Link
              href={`${HOME_HREF}/leistungen`}
              className="group inline-flex shrink-0 items-center gap-2.5 text-[12px] tracking-[0.14em] uppercase"
              style={{
                color: 'var(--vg-on-light)',
                fontFamily: 'var(--vg-font-body)',
                fontWeight: 600,
                borderBottom: '1px solid var(--vg-signal)',
                paddingBottom: '6px',
              }}
            >
              Alle Leistungen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div
            className="mt-14 grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3"
            style={{ backgroundColor: 'var(--vg-light-border)' }}
          >
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className="px-8 py-10"
                style={{ backgroundColor: 'var(--vg-light)' }}
              >
                <span
                  className="text-[10px] tracking-[0.2em]"
                  style={{
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="mt-5 text-xl"
                  style={{
                    color: 'var(--vg-on-light)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 700,
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="mt-2 text-[13px]"
                  style={{
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  {service.short}
                </p>
                <p
                  className="mt-5 text-sm leading-relaxed"
                  style={{ color: 'var(--vg-on-light-muted)' }}
                >
                  {service.description.split('.')[0]}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Konfigurator-Bewerbung, Stelle 2 ──────────────────────────────── */}
      <section
        className="relative overflow-hidden border-y"
        style={{ backgroundColor: 'var(--vg-bg)', borderColor: 'var(--vg-border)' }}
      >
        <div className="vg-grid-bg absolute inset-0 opacity-30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(200,65,58,0.12), transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4" style={{ color: 'var(--vg-signal)' }} />
                <span
                  className="text-[11px] tracking-[0.28em] uppercase"
                  style={{
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  Preiskalkulator mit KI-Assistent
                </span>
              </div>

              <h2
                className="mt-7 text-4xl leading-[1.08] md:text-[52px]"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                Ihr Preis. Vorab.
                <br />
                Ohne Vertreterbesuch.
              </h2>

              <p
                className="mt-7 max-w-xl text-lg leading-relaxed"
                style={{ color: 'var(--vg-text-muted)' }}
              >
                Die meisten Anbieter nennen erst nach der Objektbegehung eine Zahl.
                Wir drehen das um: Sie kalkulieren in zwei Minuten selbst — mit
                denselben Sätzen, die auch in unser Angebot einfließen.
              </p>

              <ul className="mt-9 flex flex-col gap-4">
                {[
                  'Objektart, Fläche und Leistungen frei kombinieren',
                  'Sofortige Preisspanne statt Rückruf in drei Tagen',
                  'Detailkalkulation mit Stunden und Sätzen freischaltbar',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: 'var(--vg-signal)' }}
                    />
                    <span className="text-[15px]" style={{ color: 'var(--vg-text-muted)' }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={CONFIGURATOR_HREF}
                className="group mt-10 inline-flex items-center gap-3 px-8 py-5 text-[13px] tracking-[0.14em] uppercase transition-all"
                style={{
                  backgroundColor: 'var(--vg-signal)',
                  color: '#fff',
                  fontFamily: 'var(--vg-font-body)',
                  fontWeight: 600,
                }}
              >
                Jetzt berechnen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Ergebnis-Vorschau */}
            <div
              className="relative"
              style={{
                backgroundColor: 'var(--vg-surface)',
                border: '1px solid var(--vg-border-light)',
              }}
            >
              <div
                className="flex items-center justify-between border-b px-6 py-4"
                style={{ borderColor: 'var(--vg-border)' }}
              >
                <span
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{
                    color: 'var(--vg-text-dim)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  Beispielkalkulation
                </span>
                <span
                  className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase"
                  style={{
                    color: 'var(--vg-ok)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  <span
                    className="vg-pulse inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--vg-ok)' }}
                  />
                  Live
                </span>
              </div>

              <div className="px-7 py-8">
                <p className="text-[13px]" style={{ color: 'var(--vg-text-muted)' }}>
                  Logistikzentrum · 12.000 m² · Nachts inkl. Wochenende
                </p>
                <p
                  className="mt-5 text-4xl leading-none md:text-5xl"
                  style={{
                    color: 'var(--vg-text)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  3.710 €
                  <span
                    className="mx-2.5"
                    style={{ color: 'var(--vg-text-dim)', fontWeight: 400 }}
                  >
                    –
                  </span>
                  4.220 €
                </p>
                <p className="mt-3 text-[12px]" style={{ color: 'var(--vg-text-dim)' }}>
                  pro Monat, zzgl. MwSt.
                </p>

                <div
                  className="mt-8 flex flex-col gap-3 border-t pt-6"
                  style={{ borderColor: 'var(--vg-border)' }}
                >
                  {[
                    ['Streifendienst', '72 h'],
                    ['Videoleitstand', 'Pauschale'],
                    ['Alarmverfolgung', 'Pauschale'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-[13px]" style={{ color: 'var(--vg-text-muted)' }}>
                        {label}
                      </span>
                      <span
                        className="text-[13px]"
                        style={{
                          color: 'var(--vg-text-dim)',
                          fontFamily: 'var(--vg-font-mono)',
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Objektarten ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-bg)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
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
                  Branchen
                </span>
              </div>
              <h2
                className="mt-6 text-3xl leading-[1.12] md:text-[46px]"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                }}
              >
                Jedes Objekt hat
                <br className="hidden md:block" /> eigene Schwachstellen
              </h2>
            </div>

            <Link
              href={`${HOME_HREF}/branchen`}
              className="group inline-flex shrink-0 items-center gap-2.5 text-[12px] tracking-[0.14em] uppercase"
              style={{
                color: 'var(--vg-text)',
                fontFamily: 'var(--vg-font-body)',
                fontWeight: 600,
                borderBottom: '1px solid var(--vg-signal)',
                paddingBottom: '6px',
              }}
            >
              Alle Branchen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECT_TYPES.map((obj) => (
              <Link
                key={obj.id}
                href={`${HOME_HREF}/branchen`}
                className="group relative overflow-hidden"
                style={{ border: '1px solid var(--vg-border)' }}
              >
                <div className="relative h-56">
                  <Image
                    src={obj.image}
                    alt={obj.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  />
                  <div
                    className="absolute inset-0 transition-opacity"
                    style={{
                      background:
                        'linear-gradient(to top, var(--vg-bg) 2%, rgba(10,13,18,0.32) 55%, rgba(10,13,18,0.05) 100%)',
                    }}
                  />
                </div>
                <div
                  className="px-6 py-6"
                  style={{ backgroundColor: 'var(--vg-surface)' }}
                >
                  <h3
                    className="text-lg"
                    style={{
                      color: 'var(--vg-text)',
                      fontFamily: 'var(--vg-font-display)',
                      fontWeight: 600,
                    }}
                  >
                    {obj.name}
                  </h3>
                  <p
                    className="mt-1.5 text-[12px]"
                    style={{
                      color: 'var(--vg-text-dim)',
                      fontFamily: 'var(--vg-font-mono)',
                    }}
                  >
                    {obj.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ablauf (hell) ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-light)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: 'var(--vg-signal)' }} />
            <span
              className="text-[11px] tracking-[0.28em] uppercase"
              style={{ color: 'var(--vg-signal)', fontFamily: 'var(--vg-font-mono)' }}
            >
              Ablauf
            </span>
          </div>
          <h2
            className="mt-6 max-w-2xl text-3xl leading-[1.12] md:text-[46px]"
            style={{
              color: 'var(--vg-on-light)',
              fontFamily: 'var(--vg-font-display)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
            }}
          >
            Von der Kalkulation zum Dienstantritt
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step}>
                <div
                  className="flex h-14 w-14 items-center justify-center text-lg"
                  style={{
                    border: '1px solid var(--vg-signal)',
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  {step.step}
                </div>
                <h3
                  className="mt-6 text-xl"
                  style={{
                    color: 'var(--vg-on-light)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 700,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--vg-on-light-muted)' }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Referenzen ────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-surface)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: 'var(--vg-signal)' }} />
            <span
              className="text-[11px] tracking-[0.28em] uppercase"
              style={{ color: 'var(--vg-signal)', fontFamily: 'var(--vg-font-mono)' }}
            >
              Referenzen
            </span>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-px md:grid-cols-3" style={{ backgroundColor: 'var(--vg-border)' }}>
            {REFERENCES.map((ref, i) => (
              <div
                key={i}
                className="px-8 py-10"
                style={{ backgroundColor: 'var(--vg-surface)' }}
              >
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'var(--vg-text)' }}
                >
                  «&nbsp;{ref.quote}&nbsp;»
                </p>
                <div
                  className="mt-7 border-t pt-5"
                  style={{ borderColor: 'var(--vg-border)' }}
                >
                  <p
                    className="text-[13px]"
                    style={{
                      color: 'var(--vg-text-muted)',
                      fontFamily: 'var(--vg-font-display)',
                      fontWeight: 600,
                    }}
                  >
                    {ref.author}
                  </p>
                  <p
                    className="mt-1 text-[11px]"
                    style={{
                      color: 'var(--vg-text-dim)',
                      fontFamily: 'var(--vg-font-mono)',
                    }}
                  >
                    {ref.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Konfigurator über dem Footer ──────────────────────────────────── */}
      <ConfiguratorTeaser />
    </main>
  );
}
