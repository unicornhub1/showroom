import Link from 'next/link';
import { contactInfo } from '../data';

const BASE = '/templates/handwerk/werkbank';

const NAV_LINKS = [
  { label: 'Leistungen', href: `${BASE}/leistungen` },
  { label: 'Projekte', href: `${BASE}/projekte` },
  { label: 'Über uns', href: `${BASE}/ueber-uns` },
  { label: 'Kontakt', href: `${BASE}/kontakt` },
];

const CERTIFICATIONS = [
  'Meisterbetrieb',
  'Innungsmitglied',
  'Fachbetrieb für Restaurierung',
  'Nachhaltige Holzwirtschaft',
];

export default function Footer() {
  return (
    <footer>
      {/* Terracotta accent line */}
      <div
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--wb-accent), var(--wb-forge), var(--wb-accent))',
        }}
      />

      {/* Main footer */}
      <div
        style={{
          backgroundColor: 'var(--wb-dark)',
          color: '#F5EDE3',
          padding: '64px 24px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
          }}
        >
          {/* Brand Column */}
          <div>
            <Link
              href={BASE}
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#F5EDE3',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                display: 'inline-block',
                marginBottom: '12px',
              }}
            >
              WERKBANK
            </Link>
            <p
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.85rem',
                color: 'var(--wb-forge)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginBottom: '20px',
              }}
            >
              Meisterbetrieb seit 1987
            </p>
            <p
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.9rem',
                color: 'rgba(245, 237, 227, 0.7)',
                lineHeight: 1.7,
                maxWidth: '280px',
              }}
            >
              Individuelle Möbel, Innenausbau und Restaurierung in höchster handwerklicher Qualität.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#F5EDE3',
                marginBottom: '20px',
                letterSpacing: '0.03em',
              }}
            >
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--wb-font-body)',
                    fontSize: '0.9rem',
                    color: 'rgba(245, 237, 227, 0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  className="hover:text-[var(--wb-forge)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#F5EDE3',
                marginBottom: '20px',
                letterSpacing: '0.03em',
              }}
            >
              Kontakt
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.9rem',
                color: 'rgba(245, 237, 227, 0.7)',
                lineHeight: 1.6,
              }}
            >
              <p>{contactInfo.company}</p>
              <p>{contactInfo.street}</p>
              <p>{contactInfo.city}</p>
              <p style={{ marginTop: '8px' }}>
                <span style={{ color: 'var(--wb-forge)' }}>Tel:</span> {contactInfo.phone}
              </p>
              <p>
                <span style={{ color: 'var(--wb-forge)' }}>Mail:</span> {contactInfo.email}
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#F5EDE3',
                marginBottom: '20px',
                letterSpacing: '0.03em',
              }}
            >
              Qualifikationen
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--wb-font-body)',
                    fontSize: '0.85rem',
                    color: 'rgba(245, 237, 227, 0.7)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--wb-accent)',
                      flexShrink: 0,
                    }}
                  />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '48px auto 0',
            paddingTop: '24px',
            borderTop: '1px solid rgba(245, 237, 227, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--wb-font-body)',
              fontSize: '0.8rem',
              color: 'rgba(245, 237, 227, 0.4)',
            }}
          >
            &copy; 2025 Unicorn Factory &middot; WERKBANK (Designvorlage)
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.8rem',
                color: 'rgba(245, 237, 227, 0.4)',
              }}
            >
              Impressum
            </span>
            <span
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.8rem',
                color: 'rgba(245, 237, 227, 0.4)',
              }}
            >
              Datenschutz
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
