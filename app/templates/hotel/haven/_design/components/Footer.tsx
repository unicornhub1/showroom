"use client";

import Link from "next/link";

const BASE = "/templates/hotel/haven";

const FOOTER_NAV = [
  { label: "Zimmer & Suiten", href: `${BASE}/zimmer` },
  { label: "Erlebnisse", href: `${BASE}/erlebnis` },
  { label: "Galerie", href: `${BASE}/galerie` },
  { label: "Kontakt & Anfahrt", href: `${BASE}/kontakt` },
];

const LEGAL_LINKS = [
  { label: "Datenschutz", href: `${BASE}/kontakt` },
  { label: "Impressum", href: `${BASE}/kontakt` },
  { label: "AGB", href: `${BASE}/kontakt` },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--hv-card)" }}>
      {/* Top gold accent line */}
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent 0%, var(--hv-accent) 50%, transparent 100%)" }} />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        {/* Top section: Brand + Tagline */}
        <div className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h3
              className="text-3xl tracking-[0.3em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              HAVEN
            </h3>
            <p
              className="mt-2 text-sm tracking-[0.15em] uppercase"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-muted)",
              }}
            >
              Boutique Hotel &amp; Spa
            </p>
          </div>

          <p
            className="max-w-md text-right text-lg italic leading-relaxed"
            style={{
              fontFamily: "var(--hv-font-body)",
              color: "var(--hv-muted)",
            }}
          >
            &bdquo;Wo die Zeit still steht
            <br />
            und die Seele atmet.&ldquo;
          </p>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ backgroundColor: "var(--hv-blush)" }} />

        {/* Grid section */}
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Navigation */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              Entdecken
            </h4>
            <ul className="mt-5 space-y-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] leading-relaxed transition-colors duration-300 hover:opacity-60"
                    style={{
                      fontFamily: "var(--hv-font-body)",
                      color: "var(--hv-muted)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              Kontakt
            </h4>
            <div className="mt-5 space-y-3">
              <p
                className="text-[15px] leading-relaxed"
                style={{
                  fontFamily: "var(--hv-font-body)",
                  color: "var(--hv-muted)",
                }}
              >
                +49 (0) 30 123 456 78
              </p>
              <p
                className="text-[15px] leading-relaxed"
                style={{
                  fontFamily: "var(--hv-font-body)",
                  color: "var(--hv-muted)",
                }}
              >
                info@beispiel.de
              </p>
            </div>
          </div>

          {/* Column 3: Address */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              Adresse
            </h4>
            <p
              className="mt-5 text-[15px] leading-relaxed"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-muted)",
              }}
            >
              HAVEN Boutique Hotel
              <br />
              Musterstraße 1
              <br />
              10115 Berlin
              <br />
              Deutschland
            </p>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h4
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              Öffnungszeiten
            </h4>
            <div className="mt-5 space-y-2">
              <p
                className="text-[15px] leading-relaxed"
                style={{
                  fontFamily: "var(--hv-font-body)",
                  color: "var(--hv-muted)",
                }}
              >
                <span style={{ color: "var(--hv-text)" }}>Rezeption</span>
                <br />
                Täglich 6:00 &ndash; 23:00 Uhr
              </p>
              <p
                className="text-[15px] leading-relaxed"
                style={{
                  fontFamily: "var(--hv-font-body)",
                  color: "var(--hv-muted)",
                }}
              >
                <span style={{ color: "var(--hv-text)" }}>Restaurant</span>
                <br />
                18:30 &ndash; 22:00 Uhr
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: "var(--hv-blush)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-muted)",
              }}
            >
              &copy; 2025 Unicorn Factory &middot; HAVEN (Designvorlage)
            </p>

            <div className="flex items-center gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs transition-colors duration-300 hover:opacity-60"
                  style={{
                    fontFamily: "var(--hv-font-body)",
                    color: "var(--hv-muted)",
                  }}
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
