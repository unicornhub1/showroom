import Image from 'next/image';
import { formatPrice } from '../data';
import type { Watch } from '../data';

export function WatchCard({ watch }: { watch: Watch }) {
  const isReserviert = watch.status === 'reserviert';

  return (
    <div
      className="group overflow-hidden border transition-all duration-500 hover:border-[var(--mr-gold)]/40"
      style={{ backgroundColor: 'var(--mr-bg)', borderColor: 'var(--mr-border)' }}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{ background: watch.gradient }}
      >
        {watch.image && (
          <Image
            src={watch.image}
            alt={watch.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute top-4 left-4">
          <span
            className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
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

      <div className="p-6">
        <p
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)' }}
        >
          Ref. {watch.reference} · {watch.year}
        </p>
        <h3
          className="mt-2 text-xl"
          style={{ color: 'var(--mr-text)', fontFamily: 'var(--mr-font-serif)' }}
        >
          {watch.name}
        </h3>
        <div className="mt-3 space-y-1">
          {[
            { label: 'Werk', value: watch.movement },
            { label: 'Gehäuse', value: `${watch.caseMaterial}, ${watch.diameter}` },
            { label: 'Zustand', value: watch.condition },
          ].map((spec) => (
            <div key={spec.label} className="flex justify-between text-xs" style={{ fontFamily: 'var(--mr-font-sans)' }}>
              <span style={{ color: 'var(--mr-text-muted)' }}>{spec.label}</span>
              <span style={{ color: 'var(--mr-text)' }}>{spec.value}</span>
            </div>
          ))}
        </div>
        <div
          className="mt-4 border-t pt-4 flex items-center justify-between"
          style={{ borderColor: 'var(--mr-border)' }}
        >
          <span
            className="text-lg"
            style={{ color: 'var(--mr-text)', fontFamily: 'var(--mr-font-serif)', fontWeight: 700 }}
          >
            {formatPrice(watch.price)}
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)' }}
          >
            Anfragen →
          </span>
        </div>
      </div>
    </div>
  );
}
