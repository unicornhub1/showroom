import Link from "next/link";
import { BASE, BRAND, NAV_ITEMS, CONTACT } from "../data";

const LEGAL = [
  { label: "Datenschutz", href: `${BASE}/kontakt` },
  { label: "Impressum", href: `${BASE}/kontakt` },
  { label: "AGB", href: `${BASE}/kontakt` },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--sp-bg)", borderTop: "1px solid var(--sp-line)" }}>
      <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Brand + claim */}
        <div className="flex flex-col items-start gap-8 border-b pb-14 md:flex-row md:items-end md:justify-between" style={{ borderColor: "var(--sp-line)" }}>
          <div>
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
              SPEICHER No.7
            </h3>
            <p
              className="mt-3 text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
            >
              {BRAND.tagline}
            </p>
          </div>
          <p
            className="max-w-sm text-base leading-relaxed md:text-right"
            style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}
          >
            {BRAND.claim} &ndash; seit {BRAND.founded}.
          </p>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h4 className="sp-eyebrow" style={{ color: "var(--sp-muted)" }}>01 &mdash; Entdecken</h4>
            <ul className="mt-6 space-y-3">
              {NAV_ITEMS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="sp-foot-link text-[15px] transition-colors duration-200"
                    style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-text)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="sp-eyebrow" style={{ color: "var(--sp-muted)" }}>02 &mdash; Kontakt</h4>
            <div className="mt-6 space-y-3" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-text)" }}>
              <p className="text-[15px]">{CONTACT.phone}</p>
              <p className="text-[15px]" style={{ color: "var(--sp-accent)" }}>{CONTACT.email}</p>
            </div>
          </div>

          <div>
            <h4 className="sp-eyebrow" style={{ color: "var(--sp-muted)" }}>03 &mdash; Anschrift</h4>
            <p className="mt-6 text-[15px] leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-text)" }}>
              {CONTACT.address.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div>
            <h4 className="sp-eyebrow" style={{ color: "var(--sp-muted)" }}>04 &mdash; Öffnungszeiten</h4>
            <div className="mt-6 space-y-3" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-text)" }}>
              {CONTACT.hours.map((h) => (
                <p key={h.label} className="text-[15px] leading-relaxed">
                  <span className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                    {h.label}
                  </span>
                  <br />
                  {h.value}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 border-t pt-8" style={{ borderColor: "var(--sp-line)" }}>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
              &copy; 2025 Unicorn Factory &middot; {BRAND.name} (Designvorlage)
            </p>
            <div className="flex items-center gap-6">
              {LEGAL.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="sp-foot-legal text-[11px] uppercase tracking-[0.14em] transition-colors duration-200"
                  style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
