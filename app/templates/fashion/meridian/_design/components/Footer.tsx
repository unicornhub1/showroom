import Link from 'next/link';
import { NAV_ITEMS } from '../data';

const HOME = '/templates/fashion/meridian';

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: 'var(--mr-bg)', borderColor: 'var(--mr-border)' }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Link
              href={HOME}
              className="text-xl tracking-[0.3em] uppercase"
              style={{ color: 'var(--mr-text)', fontFamily: 'var(--mr-font-serif)', fontWeight: 700 }}
            >
              Meridian
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: 'var(--mr-text-muted)' }}
            >
              Feine Uhrmacherkunst seit 1952. An- und Verkauf erlesener
              Zeitmesser für Sammler und Kenner.
            </p>
          </div>
          <div>
            <h3
              className="mb-4 text-xs uppercase tracking-[0.2em]"
              style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 600 }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:opacity-70"
                    style={{ color: 'var(--mr-text-muted)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              className="mb-4 text-xs uppercase tracking-[0.2em]"
              style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 600 }}
            >
              Kontakt
            </h3>
            <div className="space-y-2 text-sm" style={{ color: 'var(--mr-text-muted)' }}>
              <p>Musterstraße 1, 10115 Berlin</p>
              <p>+49 (0) 30 123 456 78</p>
              <p>info@beispiel.de</p>
              <p className="pt-2">Mo–Fr 10–18 Uhr, Sa 10–16 Uhr</p>
            </div>
          </div>
        </div>
        <div
          className="mt-12 border-t pt-8 flex flex-col items-center gap-3 md:flex-row md:justify-between"
          style={{ borderColor: 'var(--mr-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--mr-text-muted)' }}>
            © 2025 Unicorn Factory · MERIDIAN (Designvorlage)
          </p>
        </div>
      </div>
    </footer>
  );
}
