'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data';

const HOME = '/templates/gastro/thornfield';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50"
      style={{ backgroundColor: 'var(--tf-bg)', borderBottom: '1px solid var(--tf-border)' }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href={HOME}
          className="text-2xl tracking-[0.25em] uppercase"
          style={{
            color: 'var(--tf-amber)',
            fontFamily: 'var(--tf-font-serif)',
            fontWeight: 600,
          }}
        >
          Thornfield
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.15em] transition-colors"
                style={{
                  color: active ? 'var(--tf-amber)' : 'var(--tf-cream-muted)',
                  fontFamily: 'var(--tf-font-sans)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--tf-amber)')}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--tf-cream-muted)';
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: 'var(--tf-cream)' }}
          aria-label="Menü"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="border-t px-6 py-6 md:hidden"
          style={{ backgroundColor: 'var(--tf-bg)', borderColor: 'var(--tf-border)' }}
        >
          <div className="flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.15em]"
                style={{
                  color: pathname === item.href ? 'var(--tf-amber)' : 'var(--tf-cream-muted)',
                  fontFamily: 'var(--tf-font-sans)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
