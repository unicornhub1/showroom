import Link from 'next/link';
import { openingHours, contactInfo } from '../data';

const BASE = '/templates/sport/peak';

const footerLinks = [
  { label: 'Kurse', href: `${BASE}/kurse` },
  { label: 'Team', href: `${BASE}/team` },
  { label: 'Mitgliedschaft', href: `${BASE}/mitgliedschaft` },
  { label: 'Kontakt', href: `${BASE}/kontakt` },
];

const socialLinks = [
  { label: 'Instagram', icon: 'IG' },
  { label: 'YouTube', icon: 'YT' },
  { label: 'TikTok', icon: 'TK' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--pk-bg)',
        borderTop: '2px solid var(--pk-accent)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Geometric accent */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, var(--pk-accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '64px 24px 32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--pk-font-display)',
                fontSize: '40px',
                letterSpacing: '-0.02em',
                color: 'var(--pk-text)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              PRSM
              <span
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--pk-accent)',
                  marginLeft: '3px',
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '14px',
                color: 'var(--pk-muted)',
                lineHeight: 1.7,
                maxWidth: '280px',
              }}
            >
              Dein Premium Fitness Studio in Berlin.
              Kein Limit. Kein Aufgeben. Nur Ergebnisse.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {socialLinks.map((s) => (
                <div
                  key={s.label}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--pk-steel)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--pk-muted)',
                    letterSpacing: '0.05em',
                  }}
                  className="hover:border-[var(--pk-accent)] hover:text-[var(--pk-accent)] transition-colors duration-200"
                >
                  {s.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--pk-accent)',
                marginBottom: '20px',
              }}
            >
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--pk-accent)] hover:translate-x-1 transition-all duration-200"
                  style={{
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '14px',
                    color: 'var(--pk-muted)',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--pk-accent)',
                marginBottom: '20px',
              }}
            >
              Öffnungszeiten
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {openingHours.map((h) => (
                <div
                  key={h.day}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '14px',
                    gap: '16px',
                  }}
                >
                  <span style={{ color: 'var(--pk-muted)' }}>{h.day}</span>
                  <span style={{ color: 'var(--pk-text)', fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--pk-accent)',
                marginBottom: '20px',
              }}
            >
              Kontakt
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-muted)', lineHeight: 1.6 }}>
                {contactInfo.address}
              </p>
              <p style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-text)', fontWeight: 500 }}>
                {contactInfo.phone}
              </p>
              <p style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-accent)' }}>
                {contactInfo.email}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--pk-steel)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--pk-font-body)',
              fontSize: '12px',
              color: 'var(--pk-muted)',
            }}
          >
            © 2025 Unicorn Factory · PRSM (Designvorlage)
          </p>
          <p
            style={{
              fontFamily: 'var(--pk-font-body)',
              fontSize: '12px',
              color: 'var(--pk-steel)',
            }}
          >
            Template by Unicorn Factory
          </p>
        </div>
      </div>
    </footer>
  );
}
