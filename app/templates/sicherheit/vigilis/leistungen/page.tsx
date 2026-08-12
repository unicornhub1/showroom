import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { ConfiguratorTeaser } from '../_design/components/ConfiguratorTeaser';
import { SERVICES, CONFIGURATOR_HREF } from '../_design/data';

export default function LeistungenPage() {
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
              Leistungen
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
            Bausteine, die sich
            <br />
            kombinieren lassen
          </h1>
          <p
            className="mt-7 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'var(--vg-text-muted)' }}
          >
            Kein Objekt gleicht dem anderen. Deshalb setzen wir jedes
            Sicherheitskonzept aus einzelnen Positionen zusammen — jede davon
            separat kalkulierbar und jederzeit anpassbar.
          </p>
        </div>
      </section>

      {/* ── Leistungen im Detail ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-bg)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex flex-col gap-20 md:gap-28">
            {SERVICES.map((service, i) => {
              const reversed = i % 2 === 1;
              return (
                <article
                  key={service.id}
                  className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Text */}
                  <div className={reversed ? 'lg:order-2' : ''}>
                    <span
                      className="text-[10px] tracking-[0.2em]"
                      style={{
                        color: 'var(--vg-signal)',
                        fontFamily: 'var(--vg-font-mono)',
                      }}
                    >
                      0{i + 1} / {service.short}
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
                      {service.name}
                    </h2>

                    <p
                      className="mt-6 text-base leading-relaxed"
                      style={{ color: 'var(--vg-text-muted)' }}
                    >
                      {service.description}
                    </p>

                    <ul className="mt-8 flex flex-col gap-4">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: 'var(--vg-signal)' }}
                          />
                          <span
                            className="text-[15px] leading-relaxed"
                            style={{ color: 'var(--vg-text-muted)' }}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={CONFIGURATOR_HREF}
                      className="group mt-9 inline-flex items-center gap-2.5 text-[12px] tracking-[0.14em] uppercase"
                      style={{
                        color: 'var(--vg-text)',
                        fontFamily: 'var(--vg-font-body)',
                        fontWeight: 600,
                        borderBottom: '1px solid var(--vg-signal)',
                        paddingBottom: '6px',
                      }}
                    >
                      Position kalkulieren
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Bild oder Zahlenpanel */}
                  <div className={reversed ? 'lg:order-1' : ''}>
                    {service.image ? (
                      <div
                        className="relative aspect-[4/3] overflow-hidden"
                        style={{ border: '1px solid var(--vg-border)' }}
                      >
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 560px"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(10,13,18,0.55), transparent 60%)',
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="relative flex aspect-[4/3] flex-col justify-center overflow-hidden px-10"
                        style={{
                          backgroundColor: 'var(--vg-surface)',
                          border: '1px solid var(--vg-border)',
                        }}
                      >
                        <div className="vg-grid-bg absolute inset-0 opacity-40" />
                        <div className="relative">
                          <p
                            className="text-[10px] tracking-[0.2em] uppercase"
                            style={{
                              color: 'var(--vg-text-dim)',
                              fontFamily: 'var(--vg-font-mono)',
                            }}
                          >
                            Im Leistungsverzeichnis
                          </p>
                          <p
                            className="mt-5 text-2xl leading-snug md:text-3xl"
                            style={{
                              color: 'var(--vg-text)',
                              fontFamily: 'var(--vg-font-display)',
                              fontWeight: 700,
                            }}
                          >
                            {service.short}
                          </p>
                          <div
                            className="mt-7 h-px w-16"
                            style={{ backgroundColor: 'var(--vg-signal)' }}
                          />
                          <p
                            className="mt-7 text-sm leading-relaxed"
                            style={{ color: 'var(--vg-text-muted)' }}
                          >
                            Diese Position lässt sich einzeln buchen oder mit
                            anderen Bausteinen kombinieren.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ConfiguratorTeaser />
    </main>
  );
}
