'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Phone, Calculator } from 'lucide-react';
import { NAV_ITEMS, CONFIGURATOR_HREF, HOME_HREF, CONTACT } from '../data';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Servicezeile */}
      <div
        className="hidden border-b md:block"
        style={{
          backgroundColor: 'var(--vg-bg)',
          borderColor: 'var(--vg-border)',
        }}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6">
          <div
            className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase"
            style={{ color: 'var(--vg-text-dim)', fontFamily: 'var(--vg-font-mono)' }}
          >
            <span
              className="vg-pulse inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'var(--vg-ok)' }}
            />
            Leitstelle besetzt · 24/7
          </div>
          <a
            href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
            className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase transition-colors"
            style={{ color: 'var(--vg-text-muted)', fontFamily: 'var(--vg-font-mono)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--vg-text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--vg-text-muted)')}
          >
            <Phone className="h-3 w-3" />
            {CONTACT.phone}
          </a>
        </div>
      </div>

      {/* Hauptnavigation */}
      <nav
        className="border-b transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(10, 13, 18, 0.94)' : 'var(--vg-bg)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderColor: 'var(--vg-border)',
        }}
      >
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href={HOME_HREF} className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center"
              style={{
                border: '1.5px solid var(--vg-signal)',
                color: 'var(--vg-signal)',
                fontFamily: 'var(--vg-font-display)',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              V
            </span>
            <span className="leading-none">
              <span
                className="block text-[19px] tracking-[0.22em] uppercase"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                }}
              >
                Vigilis
              </span>
              <span
                className="mt-1 block text-[9px] tracking-[0.28em] uppercase"
                style={{ color: 'var(--vg-text-dim)', fontFamily: 'var(--vg-font-mono)' }}
              >
                Objektschutz
              </span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative py-1 text-[13px] tracking-[0.1em] uppercase transition-colors"
                  style={{
                    color: active ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                    fontFamily: 'var(--vg-font-body)',
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--vg-text)')}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = 'var(--vg-text-muted)';
                  }}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute -bottom-0.5 left-0 h-[2px] w-full"
                      style={{ backgroundColor: 'var(--vg-signal)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA — Bewerbung des Konfigurators, Stelle 1 */}
          <div className="flex items-center gap-3">
            <Link
              href={CONFIGURATOR_HREF}
              className="hidden items-center gap-2 px-5 py-3 text-[12px] tracking-[0.14em] uppercase transition-all sm:flex"
              style={{
                backgroundColor: 'var(--vg-signal)',
                color: '#fff',
                fontFamily: 'var(--vg-font-body)',
                fontWeight: 600,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--vg-signal-light)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--vg-signal)')
              }
            >
              <Calculator className="h-4 w-4" />
              Preis berechnen
            </Link>

            <button
              className="lg:hidden"
              onClick={() => setOpen(!open)}
              style={{ color: 'var(--vg-text)' }}
              aria-label="Menü"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className="border-t px-6 py-6 lg:hidden"
            style={{
              backgroundColor: 'var(--vg-bg)',
              borderColor: 'var(--vg-border)',
            }}
          >
            <div className="flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm tracking-[0.1em] uppercase"
                  style={{
                    color:
                      pathname === item.href ? 'var(--vg-signal)' : 'var(--vg-text-muted)',
                    fontFamily: 'var(--vg-font-body)',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={CONFIGURATOR_HREF}
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3.5 text-[12px] tracking-[0.14em] uppercase"
                style={{
                  backgroundColor: 'var(--vg-signal)',
                  color: '#fff',
                  fontFamily: 'var(--vg-font-body)',
                  fontWeight: 600,
                }}
              >
                <Calculator className="h-4 w-4" />
                Preis berechnen
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
