"use client";

import Link from "next/link";
import { openingHours } from "../data";

const BASE = "/templates/gastro/saveur";

const NAV_LINKS = [
  { label: "Speisekarte", href: `${BASE}/speisekarte` },
  { label: "Reservierung", href: `${BASE}/reservierung` },
  { label: "\u00DCber uns", href: `${BASE}/ueber-uns` },
  { label: "Galerie", href: `${BASE}/galerie` },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--sv-surface)" }}>
      {/* Decorative top divider */}
      <div className="relative flex items-center justify-center py-0">
        <div
          className="h-px w-full"
          style={{ backgroundColor: "var(--sv-border)" }}
        />
        <div
          className="absolute h-2 w-2 rotate-45"
          style={{
            backgroundColor: "var(--sv-gold)",
            boxShadow: "0 0 12px rgba(212, 175, 55, 0.4)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3
              className="text-xl tracking-[0.25em]"
              style={{
                fontFamily: "var(--sv-font-display)",
                color: "var(--sv-text)",
                fontWeight: 300,
              }}
            >
              SAVEUR
            </h3>
            <p
              className="mt-1 text-[10px] tracking-[0.3em] uppercase"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-accent)",
              }}
            >
              Restaurant & Fine Dining
            </p>
            <p
              className="mt-5 text-sm font-light leading-relaxed"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-muted)",
              }}
            >
              Kulinarische Exzellenz in warmem Ambiente. Wo Tradition auf
              Innovation trifft und jeder Gang eine Geschichte erz&auml;hlt.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4
              className="text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-accent)",
              }}
            >
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light transition-colors duration-300 hover:text-[var(--sv-accent)]"
                    style={{
                      fontFamily: "var(--sv-font-body)",
                      color: "var(--sv-muted)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div>
            <h4
              className="text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-accent)",
              }}
            >
              &Ouml;ffnungszeiten
            </h4>
            <ul className="mt-5 space-y-2">
              {openingHours.map((item) => (
                <li
                  key={item.day}
                  className="flex justify-between text-sm font-light"
                  style={{
                    fontFamily: "var(--sv-font-body)",
                    color:
                      item.hours === "Ruhetag"
                        ? "var(--sv-muted)"
                        : "var(--sv-muted)",
                    opacity: item.hours === "Ruhetag" ? 0.5 : 1,
                  }}
                >
                  <span>{item.day}</span>
                  <span
                    style={{
                      color:
                        item.hours === "Ruhetag"
                          ? "var(--sv-wine)"
                          : "var(--sv-text)",
                      fontStyle:
                        item.hours === "Ruhetag" ? "italic" : "normal",
                    }}
                  >
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4
              className="text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-accent)",
              }}
            >
              Kontakt
            </h4>
            <div
              className="mt-5 space-y-3 text-sm font-light"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-muted)",
              }}
            >
              <p>
                Friedrichstra&szlig;e 42
                <br />
                10117 Berlin-Mitte
              </p>
              <p>
                <span style={{ color: "var(--sv-accent)" }}>
                  +49 30 1234 5678
                </span>
              </p>
              <p>
                <span style={{ color: "var(--sv-accent)" }}>
                  reservierung@saveur.de
                </span>
              </p>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{ color: "var(--sv-muted)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{ color: "var(--sv-muted)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* TripAdvisor / Fork-knife */}
              <a
                href="#"
                aria-label="Bewertungen"
                className="transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{ color: "var(--sv-muted)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: "var(--sv-border)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-xs font-light"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-muted)",
                opacity: 0.6,
              }}
            >
              &copy; 2026 SAVEUR Restaurant. Alle Rechte vorbehalten.
            </p>

            <div className="flex items-center gap-6">
              {["Datenschutz", "Impressum", "AGB"].map((label) => (
                <Link
                  key={label}
                  href={`${BASE}/ueber-uns`}
                  className="text-xs font-light transition-colors duration-300 hover:text-[var(--sv-accent)]"
                  style={{
                    fontFamily: "var(--sv-font-body)",
                    color: "var(--sv-muted)",
                    opacity: 0.6,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
