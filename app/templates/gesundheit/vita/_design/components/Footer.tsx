"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { openingHours, contactInfo } from "../data";

const BASE = "/templates/gesundheit/vita";

const NAV_LINKS = [
  { label: "Leistungen", href: `${BASE}/leistungen` },
  { label: "Team", href: `${BASE}/team` },
  { label: "Praxis", href: `${BASE}/praxis` },
  { label: "Kontakt", href: `${BASE}/kontakt` },
];

export default function Footer() {
  return (
    <footer>
      {/* Teal accent line */}
      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--vt-accent) 20%, var(--vt-accent) 80%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      {/* Main footer - soft mint background */}
      <div style={{ backgroundColor: "var(--vt-mint)" }}>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-1">
                <span
                  className="text-[22px] tracking-[0.12em]"
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    color: "var(--vt-text)",
                    fontWeight: 600,
                  }}
                >
                  VITA
                </span>
              </div>
              <p
                className="mt-1 text-[11px] tracking-[0.15em] uppercase"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-accent)",
                  fontWeight: 400,
                }}
              >
                Praxis f&uuml;r Gesundheit
              </p>
              <p
                className="mt-5 text-[15px] leading-relaxed"
                style={{
                  fontFamily: "var(--vt-font-body)",
                  color: "var(--vt-muted)",
                }}
              >
                Ganzheitliche Medizin mit pers&ouml;nlicher Betreuung.
                Ihre Gesundheit ist unsere Leidenschaft &ndash; modern,
                einfühlsam und kompetent.
              </p>

              {/* Emergency highlight */}
              <div
                className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  backgroundColor: "rgba(13, 148, 136, 0.1)",
                  border: "1px solid var(--vt-border-strong)",
                }}
              >
                <Phone className="h-3.5 w-3.5" style={{ color: "var(--vt-accent)" }} />
                <span
                  className="text-[13px] font-semibold"
                  style={{
                    fontFamily: "var(--vt-font-display)",
                    color: "var(--vt-accent)",
                  }}
                >
                  Notfall: {contactInfo.emergency}
                </span>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-text)",
                }}
              >
                Navigation
              </h4>
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] transition-colors duration-300 hover:text-[var(--vt-accent)]"
                      style={{
                        fontFamily: "var(--vt-font-body)",
                        color: "var(--vt-muted)",
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
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-text)",
                }}
              >
                Sprechzeiten
              </h4>
              <ul className="mt-5 space-y-2">
                {openingHours.slice(0, 5).map((item) => (
                  <li
                    key={item.day}
                    className="flex justify-between text-[14px]"
                    style={{
                      fontFamily: "var(--vt-font-body)",
                      color: "var(--vt-muted)",
                    }}
                  >
                    <span>{item.day}</span>
                    <span
                      style={{
                        color:
                          item.hours === "Geschlossen"
                            ? "var(--vt-muted)"
                            : "var(--vt-text)",
                        fontWeight:
                          item.hours === "Geschlossen" ? 400 : 500,
                        opacity: item.hours === "Geschlossen" ? 0.5 : 1,
                      }}
                    >
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-3 text-[12px]"
                style={{
                  fontFamily: "var(--vt-font-body)",
                  color: "var(--vt-muted)",
                  opacity: 0.6,
                }}
              >
                Sa &amp; So geschlossen
              </p>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-text)",
                }}
              >
                Kontakt
              </h4>
              <div
                className="mt-5 space-y-3 text-[15px]"
                style={{
                  fontFamily: "var(--vt-font-body)",
                  color: "var(--vt-muted)",
                }}
              >
                <p>
                  {contactInfo.address}
                  <br />
                  {contactInfo.city}
                </p>
                <p>
                  Tel:{" "}
                  <span style={{ color: "var(--vt-accent)", fontWeight: 600 }}>
                    {contactInfo.phone}
                  </span>
                </p>
                <p>
                  Fax: {contactInfo.fax}
                </p>
                <p>
                  <span style={{ color: "var(--vt-accent)" }}>
                    {contactInfo.email}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-16 border-t pt-8"
            style={{ borderColor: "var(--vt-border)" }}
          >
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p
                className="text-[12px]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-muted)",
                  opacity: 0.6,
                }}
              >
                &copy; 2026 VITA Praxis f&uuml;r Gesundheit. Alle Rechte
                vorbehalten.
              </p>

              <div className="flex items-center gap-6">
                {["Datenschutz", "Impressum", "Barrierefreiheit"].map(
                  (label) => (
                    <Link
                      key={label}
                      href={`${BASE}/kontakt`}
                      className="text-[12px] transition-colors duration-300 hover:text-[var(--vt-accent)]"
                      style={{
                        fontFamily: "var(--vt-font-display)",
                        color: "var(--vt-muted)",
                        opacity: 0.6,
                      }}
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
