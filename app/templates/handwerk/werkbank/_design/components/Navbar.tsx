'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const BASE = '/templates/handwerk/werkbank';

const NAV_ITEMS = [
  { label: 'Leistungen', href: `${BASE}/leistungen` },
  { label: 'Projekte', href: `${BASE}/projekte` },
  { label: 'Über uns', href: `${BASE}/ueber-uns` },
  { label: 'Kontakt', href: `${BASE}/kontakt` },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '80px',
          backgroundColor: scrolled ? 'rgba(245, 237, 227, 0.97)' : 'var(--wb-bg)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 var(--wb-divider)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? 'none' : '1px solid transparent',
        }}
      >
        <nav
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href={BASE}
            style={{
              fontFamily: 'var(--wb-font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--wb-dark)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, var(--wb-accent), var(--wb-leather))',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0',
              }}
            >
              W
            </span>
            WERKBANK
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              gap: '32px',
            }}
            className="hidden md:flex md:items-center"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="wb-line-draw"
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--wb-text)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  paddingBottom: '4px',
                  transition: 'color 0.3s ease',
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/kontakt`}
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: 'var(--wb-accent)',
                textDecoration: 'none',
                padding: '10px 22px',
                borderRadius: '4px',
                letterSpacing: '0.03em',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
              }}
              className="hover:bg-[var(--wb-accent-hover)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Anfrage stellen
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col cursor-pointer"
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              gap: '5px',
            }}
            aria-label="Navigation öffnen"
          >
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--wb-dark)',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--wb-dark)',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--wb-dark)',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'var(--wb-bg)',
            paddingTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            animation: 'wb-fade-up 0.3s ease',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--wb-dark)',
                textDecoration: 'none',
                padding: '16px 32px',
                letterSpacing: '0.03em',
                transition: 'color 0.2s ease',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ marginTop: '16px' }}>
            <Link
              href={`${BASE}/kontakt`}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: 'var(--wb-accent)',
                textDecoration: 'none',
                padding: '14px 40px',
                borderRadius: '4px',
                display: 'inline-block',
              }}
            >
              Anfrage stellen
            </Link>
          </div>

          {/* Decorative */}
          <div
            style={{
              marginTop: 'auto',
              paddingBottom: '40px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.8rem',
                color: 'var(--wb-muted)',
                letterSpacing: '0.05em',
              }}
            >
              Meisterbetrieb seit 1987
            </p>
            <div
              style={{
                width: '40px',
                height: '2px',
                background: 'linear-gradient(90deg, var(--wb-accent), var(--wb-forge))',
                margin: '12px auto 0',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
