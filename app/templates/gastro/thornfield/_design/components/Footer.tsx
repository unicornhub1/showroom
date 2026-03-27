import Link from 'next/link';
import { NAV_ITEMS } from '../data';

const HOME = '/templates/gastro/thornfield';

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--tf-bg)',
        borderColor: 'var(--tf-border)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href={HOME}
              className="text-xl tracking-[0.25em] uppercase"
              style={{
                color: 'var(--tf-amber)',
                fontFamily: 'var(--tf-font-serif)',
                fontWeight: 600,
              }}
            >
              Thornfield
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: 'var(--tf-cream-muted)' }}
            >
              Seit 1928 brennen wir Whiskey mit Leidenschaft, Geduld und den
              besten Zutaten, die das schottische Hochland zu bieten hat.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="mb-4 text-xs uppercase tracking-[0.2em]"
              style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: 'var(--tf-cream-muted)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="mb-4 text-xs uppercase tracking-[0.2em]"
              style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Kontakt
            </h3>
            <div
              className="space-y-2 text-sm"
              style={{ color: 'var(--tf-cream-muted)' }}
            >
              <p>Musterstraße 1, 10115 Berlin</p>
              <p>+49 (0) 30 123 456 78</p>
              <p>info@beispiel.de</p>
              <p className="pt-2">Mo–Fr 10–18 Uhr, Sa 10–16 Uhr</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 border-t pt-8 flex flex-col items-center gap-3 md:flex-row md:justify-between"
          style={{ borderColor: 'var(--tf-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--tf-cream-muted)' }}>
            © 2025 Unicorn Factory · THORNFIELD (Designvorlage)
          </p>
          <p className="text-xs" style={{ color: 'var(--tf-cream-muted)', opacity: 0.5 }}>
            Bitte verantwortungsvoll genießen.
          </p>
        </div>
      </div>
    </footer>
  );
}
