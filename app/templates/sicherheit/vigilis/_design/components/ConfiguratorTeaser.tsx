import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { CONFIGURATOR_HREF } from '../data';

const ASSURANCES = [
  { icon: Clock, text: 'Ergebnis in unter zwei Minuten' },
  { icon: ShieldCheck, text: 'Kostenlos und unverbindlich' },
  { icon: Sparkles, text: 'Mit KI-gestützter Bedarfsanalyse' },
];

/**
 * Bewerbung des Konfigurators — Stelle 2, direkt über dem Footer.
 */
export function ConfiguratorTeaser() {
  return (
    <section className="relative overflow-hidden">
      {/* Hintergrundbild */}
      <div className="absolute inset-0">
        <Image
          src="/templates/sicherheit/vigilis/images/hero/cta.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, var(--vg-bg) 8%, rgba(10,13,18,0.95) 46%, rgba(10,13,18,0.7) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
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
              Preiskalkulator
            </span>
          </div>

          <h2
            className="mt-7 text-4xl leading-[1.1] md:text-6xl"
            style={{
              fontFamily: 'var(--vg-font-display)',
              fontWeight: 700,
              color: 'var(--vg-text)',
              letterSpacing: '-0.02em',
            }}
          >
            Was kostet der Schutz
            <br />
            Ihres Objekts?
          </h2>

          <p
            className="mt-7 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'var(--vg-text-muted)' }}
          >
            Objektart, Größe und gewünschte Leistungen eingeben — Sie erhalten
            sofort eine belastbare Preisspanne auf Basis realer Kalkulationsdaten
            aus über 340 betreuten Objekten. Ohne Anmeldung, ohne Vertreterbesuch.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={CONFIGURATOR_HREF}
              className="group inline-flex items-center justify-center gap-3 px-9 py-5 text-[13px] tracking-[0.14em] uppercase transition-all"
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

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {ASSURANCES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon className="h-4 w-4" style={{ color: 'var(--vg-steel)' }} />
                <span
                  className="text-[12px] tracking-[0.06em]"
                  style={{ color: 'var(--vg-text-dim)' }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
