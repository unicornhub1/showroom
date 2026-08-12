import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ConfiguratorTeaser } from '../_design/components/ConfiguratorTeaser';
import { OBJECT_TYPES, CONFIGURATOR_HREF, formatNumber } from '../_design/data';

export default function BranchenPage() {
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
              Branchen
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
            Wir kennen Ihr
            <br />
            Objekt bereits
          </h1>
          <p
            className="mt-7 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'var(--vg-text-muted)' }}
          >
            Ein Logistikzentrum braucht ein anderes Konzept als eine Kanzlei. Aus
            über 340 betreuten Objekten kennen wir die typischen Schwachstellen
            jeder Objektart — und kalkulieren entsprechend.
          </p>
        </div>
      </section>

      {/* ── Objektarten ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--vg-bg)' }}>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="flex flex-col gap-16 md:gap-24">
            {OBJECT_TYPES.map((obj, i) => {
              const reversed = i % 2 === 1;
              return (
                <article
                  key={obj.id}
                  className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden ${
                      reversed ? 'lg:order-2' : ''
                    }`}
                    style={{ border: '1px solid var(--vg-border)' }}
                  >
                    <Image
                      src={obj.image}
                      alt={obj.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 620px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(10,13,18,0.7), transparent 55%)',
                      }}
                    />
                  </div>

                  <div className={reversed ? 'lg:order-1' : ''}>
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase"
                      style={{
                        color: 'var(--vg-signal)',
                        fontFamily: 'var(--vg-font-mono)',
                      }}
                    >
                      {obj.tagline}
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
                      {obj.name}
                    </h2>

                    <p
                      className="mt-6 text-base leading-relaxed"
                      style={{ color: 'var(--vg-text-muted)' }}
                    >
                      {obj.description}
                    </p>

                    {/* Schwerpunkte */}
                    <div className="mt-8 flex flex-wrap gap-2.5">
                      {obj.focus.map((f) => (
                        <span
                          key={f}
                          className="px-4 py-2 text-[11px] tracking-[0.1em] uppercase"
                          style={{
                            border: '1px solid var(--vg-border-light)',
                            color: 'var(--vg-text-muted)',
                            fontFamily: 'var(--vg-font-mono)',
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Typische Größe */}
                    <div
                      className="mt-8 flex items-center justify-between border-t pt-6"
                      style={{ borderColor: 'var(--vg-border)' }}
                    >
                      <div>
                        <p
                          className="text-[10px] tracking-[0.18em] uppercase"
                          style={{
                            color: 'var(--vg-text-dim)',
                            fontFamily: 'var(--vg-font-mono)',
                          }}
                        >
                          Typische Objektgröße
                        </p>
                        <p
                          className="mt-1.5 text-xl"
                          style={{
                            color: 'var(--vg-text)',
                            fontFamily: 'var(--vg-font-display)',
                            fontWeight: 700,
                          }}
                        >
                          {formatNumber(obj.typicalArea)} m²
                        </p>
                      </div>

                      <Link
                        href={CONFIGURATOR_HREF}
                        className="group inline-flex items-center gap-2.5 text-[12px] tracking-[0.14em] uppercase"
                        style={{
                          color: 'var(--vg-text)',
                          fontFamily: 'var(--vg-font-body)',
                          fontWeight: 600,
                          borderBottom: '1px solid var(--vg-signal)',
                          paddingBottom: '6px',
                        }}
                      >
                        Kalkulieren
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
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
