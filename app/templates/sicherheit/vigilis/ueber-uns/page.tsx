import Image from 'next/image';
import { ConfiguratorTeaser } from '../_design/components/ConfiguratorTeaser';
import { TEAM, CERTIFICATES, STATS } from '../_design/data';

export default function UeberUnsPage() {
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
              Unternehmen
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
            Seit 2009 im
            <br />
            Objektschutz
          </h1>
          <p
            className="mt-7 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'var(--vg-text-muted)' }}
          >
            Was als Zwei-Mann-Betrieb begann, betreut heute über 340 Objekte mit
            eigener Leitstelle und festem Stammpersonal. Gewachsen ist dabei die
            Größe — nicht der Anspruch.
          </p>
        </div>
      </section>

      {/* ── Leitstelle ────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-bg)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div
              className="relative aspect-[4/3] overflow-hidden"
              style={{ border: '1px solid var(--vg-border)' }}
            >
              <Image
                src="/templates/sicherheit/vigilis/images/leitstand/leitstand.jpg"
                alt="Leitstelle"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,13,18,0.6), transparent 55%)',
                }}
              />
            </div>

            <div>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  color: 'var(--vg-signal)',
                  fontFamily: 'var(--vg-font-mono)',
                }}
              >
                Eigene Leitstelle
              </span>
              <h2
                className="mt-5 text-3xl leading-tight md:text-[40px]"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                Menschen, die hinsehen
              </h2>
              <p
                className="mt-6 text-base leading-relaxed"
                style={{ color: 'var(--vg-text-muted)' }}
              >
                Unsere Leitstelle ist an 365 Tagen im Jahr durchgehend besetzt —
                mit eigenen Mitarbeitern, nicht mit einem Callcenter. Jeder Alarm
                wird durch einen Menschen bewertet, bevor eine Einsatzkraft
                losfährt. Das reduziert Fehleinsätze und damit Ihre Kosten.
              </p>
              <p
                className="mt-5 text-base leading-relaxed"
                style={{ color: 'var(--vg-text-muted)' }}
              >
                Die technische Anbindung ist redundant ausgelegt: zwei getrennte
                Übertragungswege, unterbrechungsfreie Stromversorgung und ein
                zweiter Standort, der im Ernstfall innerhalb von Minuten
                übernimmt.
              </p>

              <div
                className="mt-9 grid grid-cols-2 gap-px"
                style={{ backgroundColor: 'var(--vg-border)' }}
              >
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-6 py-6"
                    style={{ backgroundColor: 'var(--vg-surface)' }}
                  >
                    <p
                      className="text-2xl leading-none"
                      style={{
                        color: 'var(--vg-text)',
                        fontFamily: 'var(--vg-font-display)',
                        fontWeight: 700,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="mt-2.5 text-[10px] tracking-[0.16em] uppercase"
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
          </div>
        </div>
      </section>

      {/* ── Team (hell) ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-light)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: 'var(--vg-signal)' }} />
            <span
              className="text-[11px] tracking-[0.28em] uppercase"
              style={{ color: 'var(--vg-signal)', fontFamily: 'var(--vg-font-mono)' }}
            >
              Verantwortliche
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
            Feste Ansprechpartner statt Hotline
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name}>
                <div
                  className="h-px w-full"
                  style={{ backgroundColor: 'var(--vg-signal)' }}
                />
                <h3
                  className="mt-6 text-xl"
                  style={{
                    color: 'var(--vg-on-light)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 700,
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="mt-1.5 text-[12px] tracking-[0.12em] uppercase"
                  style={{
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  {member.role}
                </p>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: 'var(--vg-on-light-muted)' }}
                >
                  {member.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Zertifikate ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-surface)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  color: 'var(--vg-signal)',
                  fontFamily: 'var(--vg-font-mono)',
                }}
              >
                Qualifikation
              </span>
              <h2
                className="mt-5 text-3xl leading-tight md:text-[38px]"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                Geprüft, zertifiziert, versichert
              </h2>
              <p
                className="mt-6 text-base leading-relaxed"
                style={{ color: 'var(--vg-text-muted)' }}
              >
                Sicherheitsdienstleistung ist Vertrauenssache — und Vertrauen muss
                nachweisbar sein. Unsere Zertifizierungen werden jährlich extern
                auditiert, jeder Mitarbeiter durchläuft vor dem ersten Einsatz eine
                Zuverlässigkeitsüberprüfung.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-px sm:grid-cols-3"
              style={{ backgroundColor: 'var(--vg-border)' }}
            >
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert}
                  className="flex aspect-[3/2] items-center justify-center px-4"
                  style={{ backgroundColor: 'var(--vg-surface)' }}
                >
                  <span
                    className="text-center text-[13px] tracking-[0.14em] uppercase"
                    style={{
                      color: 'var(--vg-text-muted)',
                      fontFamily: 'var(--vg-font-mono)',
                    }}
                  >
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConfiguratorTeaser />
    </main>
  );
}
