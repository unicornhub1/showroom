import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import {
  NAV_ITEMS,
  SERVICES,
  CONTACT,
  CERTIFICATES,
  HOME_HREF,
  CONFIGURATOR_HREF,
} from '../data';

export function Footer() {
  return (
    <footer
      className="vg-dark border-t"
      style={{
        backgroundColor: 'var(--vg-bg)',
        borderColor: 'var(--vg-border)',
      }}
    >
      {/* Zertifikatsleiste */}
      <div className="border-b" style={{ borderColor: 'var(--vg-border)' }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-7">
          {CERTIFICATES.map((cert) => (
            <span
              key={cert}
              className="text-[11px] tracking-[0.22em] uppercase"
              style={{
                color: 'var(--vg-text-dim)',
                fontFamily: 'var(--vg-font-mono)',
              }}
            >
              {cert}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marke */}
          <div>
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
              <span
                className="text-[19px] tracking-[0.22em] uppercase"
                style={{
                  color: 'var(--vg-text)',
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                }}
              >
                Vigilis
              </span>
            </Link>
            <p
              className="mt-5 text-sm leading-relaxed"
              style={{ color: 'var(--vg-text-muted)' }}
            >
              Objektschutz für Gewerbe, Industrie und öffentliche Auftraggeber.
              Zertifiziert, versichert und mit eigener Leitstelle rund um die Uhr
              erreichbar.
            </p>
            <div
              className="mt-6 flex items-center gap-2.5 px-3 py-2"
              style={{
                border: '1px solid var(--vg-border)',
                backgroundColor: 'var(--vg-surface)',
                width: 'fit-content',
              }}
            >
              <span
                className="vg-pulse inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--vg-ok)' }}
              />
              <span
                className="text-[10px] tracking-[0.18em] uppercase"
                style={{
                  color: 'var(--vg-text-muted)',
                  fontFamily: 'var(--vg-font-mono)',
                }}
              >
                Leitstelle besetzt
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="mb-5 text-[11px] tracking-[0.24em] uppercase"
              style={{
                color: 'var(--vg-signal)',
                fontFamily: 'var(--vg-font-mono)',
              }}
            >
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--vg-text-muted)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={CONFIGURATOR_HREF}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--vg-text)' }}
                >
                  Preiskalkulator
                </Link>
              </li>
            </ul>
          </div>

          {/* Leistungen */}
          <div>
            <h3
              className="mb-5 text-[11px] tracking-[0.24em] uppercase"
              style={{
                color: 'var(--vg-signal)',
                fontFamily: 'var(--vg-font-mono)',
              }}
            >
              Leistungen
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <span className="text-sm" style={{ color: 'var(--vg-text-muted)' }}>
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3
              className="mb-5 text-[11px] tracking-[0.24em] uppercase"
              style={{
                color: 'var(--vg-signal)',
                fontFamily: 'var(--vg-font-mono)',
              }}
            >
              Kontakt
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: 'var(--vg-text-dim)' }}
                />
                <span className="text-sm" style={{ color: 'var(--vg-text-muted)' }}>
                  {CONTACT.phone}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: 'var(--vg-text-dim)' }}
                />
                <span className="text-sm" style={{ color: 'var(--vg-text-muted)' }}>
                  {CONTACT.email}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: 'var(--vg-text-dim)' }}
                />
                <span className="text-sm" style={{ color: 'var(--vg-text-muted)' }}>
                  {CONTACT.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: 'var(--vg-text-dim)' }}
                />
                <span className="text-sm" style={{ color: 'var(--vg-text-muted)' }}>
                  {CONTACT.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rechtliches */}
        <div
          className="mt-14 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--vg-border)' }}
        >
          <p
            className="text-xs"
            style={{
              color: 'var(--vg-text-dim)',
              fontFamily: 'var(--vg-font-mono)',
            }}
          >
            © 2025 Unicorn Factory · VIGILIS (Designvorlage)
          </p>
          <div className="flex gap-7">
            {['Impressum', 'Datenschutz', 'AGB'].map((label) => (
              <span
                key={label}
                className="text-xs"
                style={{ color: 'var(--vg-text-dim)' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
