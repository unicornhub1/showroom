import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WHISKEYS, PROCESS_STEPS } from './_design/data';
import { WhiskeyCard } from './_design/components/WhiskeyCard';

const IMG = '/templates/gastro/thornfield/images';

export default function ThornfieldHome() {
  const featured = WHISKEYS.filter((w) => w.featured);

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={`${IMG}/hero/hero.jpg`}
            alt="Thornfield Destillerie"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(12,10,7,0.7) 0%, rgba(12,10,7,0.4) 40%, rgba(12,10,7,0.8) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          {/* Decorative line */}
          <div
            className="mx-auto mb-8 h-px w-16"
            style={{ backgroundColor: 'var(--tf-amber)' }}
          />
          <p
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
          >
            Seit 1928 · Schottisches Hochland
          </p>
          <h1
            className="mt-6 text-5xl leading-tight md:text-7xl md:leading-tight"
            style={{ fontFamily: 'var(--tf-font-serif)', color: 'var(--tf-cream)' }}
          >
            Die Kunst des
            <br />
            <span style={{ color: 'var(--tf-amber)' }}>feinen Whiskeys</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
          >
            Handgebrannt in kupfernen Brennblasen, gereift in Eichenfässern,
            perfektioniert durch Generationen — Thornfield steht für
            kompromisslose Qualität.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/templates/gastro/thornfield/sortiment"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: 'var(--tf-amber)',
                color: 'var(--tf-bg)',
                fontFamily: 'var(--tf-font-sans)',
                fontWeight: 600,
              }}
            >
              Sortiment entdecken
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/templates/gastro/thornfield/destillerie"
              className="inline-flex items-center gap-3 border px-8 py-4 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-[var(--tf-amber)]"
              style={{
                borderColor: 'var(--tf-border-light)',
                color: 'var(--tf-cream)',
                fontFamily: 'var(--tf-font-sans)',
              }}
            >
              Unsere Destillerie
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div
            className="h-12 w-px animate-pulse"
            style={{ backgroundColor: 'var(--tf-amber)', opacity: 0.4 }}
          />
        </div>
      </section>

      {/* ── Heritage Teaser ──────────────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--tf-border)' }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={`${IMG}/editorial/heritage.jpg`}
              alt="Thornfield Heritage"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col justify-center px-8 py-16 md:px-16 md:py-24">
            <div
              className="mb-6 h-px w-12"
              style={{ backgroundColor: 'var(--tf-amber)' }}
            />
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Unsere Geschichte
            </p>
            <h2
              className="mt-4 text-3xl leading-snug md:text-4xl"
              style={{ fontFamily: 'var(--tf-font-serif)' }}
            >
              Tradition trifft
              <br />
              Handwerkskunst
            </h2>
            <p
              className="mt-6 leading-relaxed"
              style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Was 1928 als kleine Brennerei am Flussufer begann, ist heute eine
              der angesehensten Destillerien des Hochlands. Drei Generationen
              Brennmeister haben ihr Wissen weitergegeben — jeder Tropfen
              Thornfield erzählt diese Geschichte.
            </p>
            <Link
              href="/templates/gastro/thornfield/ueber-uns"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] transition-colors hover:opacity-80"
              style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Mehr erfahren
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Whiskeys ────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div
              className="mx-auto mb-6 h-px w-16"
              style={{ backgroundColor: 'var(--tf-amber)' }}
            />
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Ausgewählte Abfüllungen
            </p>
            <h2
              className="mt-4 text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--tf-font-serif)' }}
            >
              Unser Sortiment
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featured.map((whiskey) => (
              <WhiskeyCard key={whiskey.id} whiskey={whiskey} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/templates/gastro/thornfield/sortiment"
              className="inline-flex items-center gap-2 border px-8 py-4 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-[var(--tf-amber)]"
              style={{
                borderColor: 'var(--tf-border-light)',
                color: 'var(--tf-cream)',
                fontFamily: 'var(--tf-font-sans)',
              }}
            >
              Alle Whiskeys ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process Preview ──────────────────────────────────────────────── */}
      <section
        className="border-t border-b"
        style={{ borderColor: 'var(--tf-border)', backgroundColor: 'var(--tf-surface)' }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mb-16 text-center">
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Von der Gerste ins Glas
            </p>
            <h2
              className="mt-4 text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--tf-font-serif)' }}
            >
              Unsere Herstellung
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px md:grid-cols-4" style={{ backgroundColor: 'var(--tf-border)' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="p-8"
                style={{ backgroundColor: 'var(--tf-surface)' }}
              >
                <span
                  className="text-4xl font-bold"
                  style={{ color: 'var(--tf-amber)', opacity: 0.3, fontFamily: 'var(--tf-font-serif)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="mt-4 text-lg"
                  style={{ fontFamily: 'var(--tf-font-serif)', color: 'var(--tf-cream)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Visit ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${IMG}/editorial/barrels.jpg`}
            alt="Fässer"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(12,10,7,0.9) 0%, rgba(12,10,7,0.6) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-xl">
            <div
              className="mb-6 h-px w-12"
              style={{ backgroundColor: 'var(--tf-amber)' }}
            />
            <h2
              className="text-3xl leading-snug md:text-4xl"
              style={{ fontFamily: 'var(--tf-font-serif)' }}
            >
              Besuchen Sie unsere
              <br />
              Destillerie
            </h2>
            <p
              className="mt-6 leading-relaxed"
              style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Erleben Sie die Entstehung von Thornfield hautnah. Bei einer
              Führung durch unsere historischen Brennhallen erfahren Sie alles
              über die Kunst der Destillation — und verkosten exklusive
              Abfüllungen, die es nur vor Ort gibt.
            </p>
            <Link
              href="/templates/gastro/thornfield/kontakt"
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: 'var(--tf-amber)',
                color: 'var(--tf-bg)',
                fontFamily: 'var(--tf-font-sans)',
                fontWeight: 600,
              }}
            >
              Besuch planen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
