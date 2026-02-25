"use client";

import Link from "next/link";

const BASE = "/templates/immobilien/quartier";

const NAV_LINKS = [
  { label: "Objekte", href: `${BASE}/objekte` },
  { label: "Verkaufen", href: `${BASE}/verkaufen` },
  { label: "Über uns", href: `${BASE}/ueber-uns` },
  { label: "Kontakt", href: `${BASE}/kontakt` },
];

const LEGAL_LINKS = [
  { label: "Impressum", href: `${BASE}/kontakt` },
  { label: "Datenschutz", href: `${BASE}/kontakt` },
  { label: "AGB", href: `${BASE}/kontakt` },
];

const OFFICES = [
  { city: "München", address: "Maximilianstraße 12", phone: "+49 89 123 456 0" },
  { city: "Starnberg", address: "Hauptstraße 8", phone: "+49 8151 789 012" },
  { city: "Grünwald", address: "Rathausstraße 3", phone: "+49 89 649 345 0" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--qt-card)" }}>
      {/* Accent top line */}
      <div className="h-[3px]" style={{ background: "linear-gradient(90deg, var(--qt-accent) 0%, var(--qt-accent) 30%, transparent 100%)" }} />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div
                className="relative flex h-8 w-8 items-center justify-center"
                style={{ border: "1.5px solid var(--qt-dark)" }}
              >
                <span
                  className="text-[10px] font-bold tracking-[0.08em]"
                  style={{ fontFamily: "var(--qt-font-display)", color: "var(--qt-dark)" }}
                >
                  Q
                </span>
                <div
                  className="absolute -bottom-[2px] -right-[2px] h-[5px] w-[5px]"
                  style={{ backgroundColor: "var(--qt-accent)" }}
                />
              </div>
              <span
                className="text-[14px] font-bold tracking-[0.25em]"
                style={{ fontFamily: "var(--qt-font-display)", color: "var(--qt-dark)" }}
              >
                QUARTIER
              </span>
            </div>
            <p
              className="mt-5 text-[13px] font-light leading-relaxed"
              style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
            >
              Premium Immobilienvermittlung in München und Umgebung. Seit 2011 Ihr Partner für Kauf, Verkauf und Beratung auf höchstem Niveau.
            </p>
          </div>

          {/* Standorte */}
          <div>
            <h4
              className="text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--qt-font-display)", color: "var(--qt-dark)" }}
            >
              Standorte
            </h4>
            <ul className="mt-5 space-y-4">
              {OFFICES.map((o) => (
                <li key={o.city}>
                  <p
                    className="text-[13px] font-medium"
                    style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-text)" }}
                  >
                    {o.city}
                  </p>
                  <p
                    className="mt-0.5 text-[12px] font-light"
                    style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                  >
                    {o.address}
                  </p>
                  <p
                    className="text-[12px] font-light"
                    style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                  >
                    {o.phone}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--qt-font-display)", color: "var(--qt-dark)" }}
            >
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-light transition-colors duration-300 hover:text-[var(--qt-accent)]"
                    style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4
              className="text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ fontFamily: "var(--qt-font-display)", color: "var(--qt-dark)" }}
            >
              Kontakt
            </h4>
            <div className="mt-5 space-y-3">
              <p
                className="text-[13px] font-light"
                style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
              >
                info@quartier-immobilien.de
              </p>
              <p
                className="text-[13px] font-light"
                style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
              >
                +49 89 123 456 0
              </p>
              <div className="pt-2">
                <Link
                  href={`${BASE}/kontakt`}
                  className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.04em] transition-colors duration-300 hover:opacity-80"
                  style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-accent)" }}
                >
                  Beratung anfragen
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: "var(--qt-border)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-[11px] font-light"
              style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
            >
              &copy; 2026 QUARTIER Immobilien GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] font-light transition-colors duration-300 hover:text-[var(--qt-accent)]"
                  style={{ fontFamily: "var(--qt-font-body)", color: "var(--qt-muted)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
