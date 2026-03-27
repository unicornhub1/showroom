import Image from 'next/image';
import { WATCHES, formatPrice } from '../_design/data';

export default function KollektionPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
          >
            Aktueller Bestand
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
            Kollektion
          </h1>
          <p
            className="mt-4 max-w-2xl leading-relaxed"
            style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}
          >
            Jedes Stück wurde von unseren Uhrmachern geprüft, serviciert und
            zertifiziert. Reservierte Uhren sind für Kunden vorgemerkt.
          </p>
        </div>

        {/* List view — horizontal cards */}
        <div className="space-y-4">
          {WATCHES.map((watch) => {
            const isReserviert = watch.status === 'reserviert';
            return (
              <div
                key={watch.id}
                className="group grid grid-cols-1 border transition-all duration-300 hover:border-[var(--mr-gold)]/40 md:grid-cols-[280px_1fr_200px]"
                style={{ borderColor: 'var(--mr-border)' }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                  <Image
                    src={watch.image}
                    alt={watch.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="inline-block px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em]"
                      style={{
                        backgroundColor: isReserviert ? 'var(--mr-text)' : 'var(--mr-gold)',
                        color: 'var(--mr-bg)',
                        fontFamily: 'var(--mr-font-sans)',
                        fontWeight: 600,
                      }}
                    >
                      {watch.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <p
                    className="text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)' }}
                  >
                    Ref. {watch.reference} · {watch.year}
                  </p>
                  <h2
                    className="mt-1.5 text-xl md:text-2xl"
                    style={{ fontFamily: 'var(--mr-font-serif)' }}
                  >
                    {watch.name}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                    {[
                      { l: 'Werk', v: watch.movement },
                      { l: 'Gehäuse', v: `${watch.caseMaterial}, ${watch.diameter}` },
                      { l: 'Zifferblatt', v: watch.dialColor },
                      { l: 'Zustand', v: watch.condition },
                    ].map((spec) => (
                      <div key={spec.l} className="text-xs" style={{ fontFamily: 'var(--mr-font-sans)' }}>
                        <span style={{ color: 'var(--mr-text-muted)' }}>{spec.l}: </span>
                        <span style={{ color: 'var(--mr-text)' }}>{spec.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div
                  className="flex flex-col items-end justify-center border-t p-6 md:border-t-0 md:border-l md:p-8"
                  style={{ borderColor: 'var(--mr-border)' }}
                >
                  <span
                    className="text-xl md:text-2xl"
                    style={{ fontFamily: 'var(--mr-font-serif)', fontWeight: 700 }}
                  >
                    {formatPrice(watch.price)}
                  </span>
                  <span
                    className="mt-2 text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)' }}
                  >
                    Anfragen →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search service */}
        <div
          className="mt-16 flex flex-col items-center gap-4 border p-10 text-center md:flex-row md:text-left"
          style={{ borderColor: 'var(--mr-border)', backgroundColor: 'var(--mr-surface)' }}
        >
          <div className="flex-1">
            <h3 className="text-lg" style={{ fontFamily: 'var(--mr-font-serif)' }}>
              Suchen Sie etwas Bestimmtes?
            </h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
              Unser Netzwerk umfasst Sammler und Händler weltweit. Wir führen
              gerne eine gezielte Suche für Sie durch.
            </p>
          </div>
          <span
            className="shrink-0 text-xs uppercase tracking-[0.15em]"
            style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
          >
            Kontakt aufnehmen →
          </span>
        </div>
      </div>
    </main>
  );
}
