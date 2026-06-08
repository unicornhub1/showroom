import Link from "next/link";
import { BASE, BRAND, NAV_ITEMS, CONTACT } from "../data";

const LEGAL = [
  { label: "Datenschutz", href: `${BASE}/kontakt` },
  { label: "Impressum", href: `${BASE}/kontakt` },
  { label: "AGB", href: `${BASE}/kontakt` },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--va-deep)" }}>
      {/* Top accent line */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--va-gold) 50%, transparent 100%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        {/* Brand + claim */}
        <div className="mb-16 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-3xl tracking-[0.3em] sm:text-4xl" style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4" }}>
              {BRAND.name}
            </h3>
            <p
              className="mt-3 text-[11px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-gold)" }}
            >
              {BRAND.tagline}
            </p>
          </div>
          <p
            className="max-w-md text-xl italic leading-relaxed md:text-right"
            style={{ fontFamily: "var(--va-font-display)", color: "rgba(250,248,244,0.72)" }}
          >
            <span style={{ color: "var(--va-gold)" }}>&bdquo;</span>{BRAND.claim} &ndash; seit {BRAND.founded}.<span style={{ color: "var(--va-gold)" }}>&ldquo;</span>
          </p>
        </div>

        <div className="h-px" style={{ backgroundColor: "rgba(250,248,244,0.12)" }} />

        {/* Columns */}
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h4 className="va-eyebrow va-eyebrow--lead" style={{ color: "#FAF8F4" }}>Entdecken</h4>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] transition-opacity duration-300 hover:opacity-60"
                    style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.7)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="va-eyebrow va-eyebrow--lead" style={{ color: "#FAF8F4" }}>Kontakt</h4>
            <div className="mt-5 space-y-3" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.7)" }}>
              <p className="text-[15px]">{CONTACT.phone}</p>
              <p className="text-[15px]">{CONTACT.email}</p>
            </div>
          </div>

          <div>
            <h4 className="va-eyebrow va-eyebrow--lead" style={{ color: "#FAF8F4" }}>Anschrift</h4>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.7)" }}>
              {CONTACT.address.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div>
            <h4 className="va-eyebrow va-eyebrow--lead" style={{ color: "#FAF8F4" }}>Öffnungszeiten</h4>
            <div className="mt-5 space-y-3" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.7)" }}>
              {CONTACT.hours.map((h) => (
                <p key={h.label} className="text-[15px] leading-relaxed">
                  <span style={{ color: "#FAF8F4" }}>{h.label}</span>
                  <br />
                  {h.value}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t pt-8" style={{ borderColor: "rgba(250,248,244,0.12)" }}>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.55)" }}>
              &copy; 2025 Unicorn Factory &middot; {BRAND.name} (Designvorlage)
            </p>
            <div className="flex items-center gap-6">
              {LEGAL.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs transition-opacity duration-300 hover:opacity-60"
                  style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.55)" }}
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
