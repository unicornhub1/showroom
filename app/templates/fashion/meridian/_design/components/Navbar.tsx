'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data';

const HOME = '/templates/fashion/meridian';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50"
      style={{ backgroundColor: 'var(--mr-bg)', borderBottom: '1px solid var(--mr-border)' }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href={HOME}
          className="text-2xl tracking-[0.3em] uppercase"
          style={{
            color: 'var(--mr-text)',
            fontFamily: 'var(--mr-font-serif)',
            fontWeight: 700,
          }}
        >
          Meridian
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.2em] transition-colors"
                style={{
                  color: active ? 'var(--mr-gold)' : 'var(--mr-text-muted)',
                  fontFamily: 'var(--mr-font-sans)',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mr-gold)')}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = 'var(--mr-text-muted)';
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: 'var(--mr-text)' }}
          aria-label="Menü"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          className="border-t px-6 py-6 md:hidden"
          style={{ backgroundColor: 'var(--mr-bg)', borderColor: 'var(--mr-border)' }}
        >
          <div className="flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-[0.2em]"
                style={{
                  color: pathname === item.href ? 'var(--mr-gold)' : 'var(--mr-text-muted)',
                  fontFamily: 'var(--mr-font-sans)',
                  fontWeight: 500,
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
