import Image from 'next/image';
import { formatPrice } from '../data';
import type { Whiskey } from '../data';

export function WhiskeyCard({ whiskey }: { whiskey: Whiskey }) {
  const isReserviert = whiskey.status === 'reserviert';

  return (
    <div
      className="group overflow-hidden border transition-all duration-500 hover:border-[var(--tf-amber)]/30"
      style={{
        backgroundColor: 'var(--tf-surface)',
        borderColor: 'var(--tf-border)',
      }}
    >
      {/* Image */}
      <div
        className="relative aspect-[3/4] overflow-hidden"
        style={{ background: whiskey.gradient }}
      >
        {whiskey.image && (
          <Image
            src={whiskey.image}
            alt={whiskey.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
            style={{
              backgroundColor: isReserviert ? 'var(--tf-copper)' : 'var(--tf-amber)',
              color: 'var(--tf-bg)',
              fontFamily: 'var(--tf-font-sans)',
              fontWeight: 600,
            }}
          >
            {whiskey.status}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <p
          className="text-xs uppercase tracking-[0.15em]"
          style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
        >
          {whiskey.subtitle}
        </p>
        <h3
          className="mt-2 text-xl"
          style={{ color: 'var(--tf-cream)', fontFamily: 'var(--tf-font-serif)' }}
        >
          {whiskey.name}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed line-clamp-2"
          style={{ color: 'var(--tf-cream-muted)' }}
        >
          {whiskey.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span
            className="text-lg"
            style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-serif)' }}
          >
            {formatPrice(whiskey.price)}
          </span>
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: 'var(--tf-cream-muted)' }}
          >
            {whiskey.abv}% vol.
          </span>
        </div>
      </div>
    </div>
  );
}
