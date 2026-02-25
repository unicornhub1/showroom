'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const BASE = '/templates/sport/peak';

const navLinks = [
  { label: 'Kurse', href: `${BASE}/kurse` },
  { label: 'Team', href: `${BASE}/team` },
  { label: 'Mitgliedschaft', href: `${BASE}/mitgliedschaft` },
  { label: 'Kontakt', href: `${BASE}/kontakt` },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--pk-nav-h)',
          backgroundColor: scrolled ? 'rgba(13,13,13,0.95)' : 'rgba(13,13,13,0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid var(--pk-steel)' : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
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
              fontFamily: 'var(--pk-font-display)',
              fontSize: '28px',
              letterSpacing: '-0.02em',
              color: 'var(--pk-text)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'baseline',
              gap: '2px',
            }}
          >
            PRSM
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--pk-accent)',
                marginLeft: '2px',
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              gap: '36px',
            }}
            className="hidden md:flex md:items-center"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[var(--pk-accent)] transition-colors duration-200"
                style={{
                  fontFamily: 'var(--pk-font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--pk-text)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={`${BASE}/mitgliedschaft`}
              className="hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] transition-all duration-300"
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '10px 24px',
                backgroundColor: 'var(--pk-accent)',
                color: '#FFFFFF',
                textDecoration: 'none',
                clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
              }}
            >
              Jetzt starten
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center relative"
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              gap: mobileOpen ? '0' : '6px',
              width: '40px',
              height: '40px',
            }}
            aria-label="Menü"
          >
            <span
              style={{
                display: 'block',
                width: '28px',
                height: '2px',
                backgroundColor: 'var(--pk-accent)',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translateY(0)' : 'none',
                position: mobileOpen ? 'absolute' : 'relative',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '28px',
                height: '2px',
                backgroundColor: 'var(--pk-text)',
                transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '28px',
                height: '2px',
                backgroundColor: 'var(--pk-accent)',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translateY(0)' : 'none',
                position: mobileOpen ? 'absolute' : 'relative',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: 'rgba(13,13,13,0.98)',
          gap: '32px',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          paddingTop: 'var(--pk-nav-h)',
        }}
        className="md:hidden flex flex-col justify-center items-center"
      >
        {/* Diagonal accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '100%',
            background: 'linear-gradient(135deg, transparent 0%, var(--pk-accent-dim) 100%)',
            opacity: 0.5,
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            pointerEvents: 'none',
          }}
        />

        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'var(--pk-font-display)',
              fontSize: '36px',
              color: 'var(--pk-text)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateX(0)' : 'translateX(40px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.08}s, transform 0.4s ease ${0.1 + i * 0.08}s`,
            }}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href={`${BASE}/mitgliedschaft`}
          onClick={() => setMobileOpen(false)}
          style={{
            fontFamily: 'var(--pk-font-body)',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '16px 40px',
            backgroundColor: 'var(--pk-accent)',
            color: '#FFFFFF',
            textDecoration: 'none',
            marginTop: '16px',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s',
            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
          }}
        >
          Jetzt starten
        </Link>
      </div>
    </>
  );
}
