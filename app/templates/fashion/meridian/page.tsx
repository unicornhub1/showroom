import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Shield, Award } from 'lucide-react';
import { WATCHES } from './_design/data';
import { WatchCard } from './_design/components/WatchCard';

const IMG = '/templates/fashion/meridian/images';

export default function MeridianHome() {
  const featured = WATCHES.filter((w) => w.featured);

  return (
    <main>
      {/* ── Split Hero ───────────────────────────────────────────────────── */}
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Left — Content */}
        <div className="flex flex-col justify-center px-8 pt-32 pb-16 md:px-16 md:py-0 lg:px-24">
          <p
            className="text-[10px] uppercase tracking-[0.4em]"
            style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
          >
            Feine Uhrmacherkunst · Seit 1952
          </p>
          <h1
            className="mt-6 text-4xl leading-tight md:text-5xl lg:text-6xl lg:leading-tight"
            style={{ fontFamily: 'var(--mr-font-serif)', color: 'var(--mr-text)' }}
          >
            Zeitmesser von bleibendem Wert
          </h1>
          <p
            className="mt-6 max-w-md leading-relaxed"
            style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}
          >
            Wir kaufen und verkaufen ausgewählte Uhren — von seltenen
            Vintage-Stücken bis hin zu modernen Klassikern.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/templates/fashion/meridian/kollektion"
              className="inline-flex items-center gap-3 px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: 'var(--mr-text)', color: 'var(--mr-bg)', fontFamily: 'var(--mr-font-sans)', fontWeight: 600 }}
            >
              Kollektion
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/templates/fashion/meridian/ankauf"
              className="inline-flex items-center gap-3 border px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:border-[var(--mr-text)]"
              style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
            >
              Uhr verkaufen
            </Link>
          </div>
        </div>
        {/* Right — Image */}
        <div className="relative min-h-[50vh] md:min-h-0">
          <Image
            src={`${IMG}/hero/hero.jpg`}
            alt="Meridian Zeitmesser"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── Stats Band ───────────────────────────────────────────────────── */}
      <section
        className="border-t border-b"
        style={{ borderColor: 'var(--mr-border)', backgroundColor: 'var(--mr-surface)' }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[
            { number: '70+', label: 'Jahre Erfahrung' },
            { number: '2.400', label: 'Vermittelte Uhren' },
            { number: '100%', label: 'Authentizitätsgarantie' },
            { number: '48h', label: 'Sofortige Auszahlung' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="border-r px-6 py-10 text-center last:border-r-0 md:py-12"
              style={{ borderColor: 'var(--mr-border)' }}
            >
              <span
                className="text-3xl md:text-4xl"
                style={{ fontFamily: 'var(--mr-font-serif)', color: 'var(--mr-text)' }}
              >
                {stat.number}
              </span>
              <p
                className="mt-2 text-[10px] uppercase tracking-[0.2em]"
                style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured — Asymmetric 2-col ──────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
              >
                Ausgewählte Stücke
              </p>
              <h2
                className="mt-3 text-3xl md:text-4xl"
                style={{ fontFamily: 'var(--mr-font-serif)' }}
              >
                Aktuelle Kollektion
              </h2>
            </div>
            <Link
              href="/templates/fashion/meridian/kollektion"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.15em] transition-colors hover:opacity-70 md:inline-flex"
              style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
            >
              Alle ansehen
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Staggered grid — first card large, rest smaller */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <WatchCard watch={featured[0]} />
            </div>
            <div className="md:col-span-5 flex flex-col gap-6">
              {featured.slice(1).map((watch) => (
                <WatchCard key={watch.id} watch={watch} />
              ))}
            </div>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/templates/fashion/meridian/kollektion"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em]"
              style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
            >
              Alle Zeitmesser
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Ankauf — Full-width Dark Band ────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: 'var(--mr-text)' }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
              >
                Ankauf & Vermittlung
              </p>
              <h2
                className="mt-4 text-3xl leading-snug md:text-4xl"
                style={{ fontFamily: 'var(--mr-font-serif)', color: 'var(--mr-bg)' }}
              >
                Ihre Uhr in besten Händen
              </h2>
              <p
                className="mt-6 leading-relaxed"
                style={{ color: 'var(--mr-border)', fontFamily: 'var(--mr-font-sans)' }}
              >
                Sie möchten eine Uhr oder eine ganze Sammlung veräußern? Wir
                bieten faire Bewertungen, diskrete Abwicklung und sofortige
                Auszahlung.
              </p>
              <Link
                href="/templates/fashion/meridian/ankauf"
                className="mt-8 inline-flex items-center gap-3 px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: 'var(--mr-gold)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)', fontWeight: 600 }}
              >
                Jetzt anfragen
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="md:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { icon: Clock, title: '24h Rückmeldung', desc: 'Erste Einschätzung innerhalb eines Werktags' },
                { icon: Shield, title: 'Faire Bewertung', desc: 'Durch zertifizierte Uhrmachermeister' },
                { icon: Award, title: 'Diskret & Sicher', desc: 'Vertrauliche Abwicklung garantiert' },
              ].map((item) => (
                <div key={item.title} className="border-l pl-6" style={{ borderColor: 'rgba(221,217,210,0.15)' }}>
                  <item.icon className="h-5 w-5" style={{ color: 'var(--mr-gold)' }} />
                  <h3
                    className="mt-3 text-sm"
                    style={{ color: 'var(--mr-bg)', fontFamily: 'var(--mr-font-sans)', fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--mr-border)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Atelier Teaser — Image with floating card ────────────────────── */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative">
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src={`${IMG}/editorial/atelier.jpg`}
                alt="Uhrmacher-Atelier"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            {/* Floating card */}
            <div
              className="relative mx-6 -mt-16 border p-8 md:absolute md:bottom-8 md:right-8 md:mt-0 md:max-w-md md:p-10"
              style={{ backgroundColor: 'var(--mr-bg)', borderColor: 'var(--mr-border)' }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
              >
                Unser Atelier
              </p>
              <h2 className="mt-3 text-2xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
                Wo Präzision zu Hause ist
              </h2>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}
              >
                Jeder Zeitmesser wird von unseren Uhrmachern geprüft, serviciert
                und zertifiziert — mit der gleichen Sorgfalt wie vor 70 Jahren.
              </p>
              <Link
                href="/templates/fashion/meridian/atelier"
                className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-colors hover:opacity-70"
                style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
              >
                Mehr erfahren
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
