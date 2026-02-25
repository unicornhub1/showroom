"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";

const BASE = "/templates/fashion/palazzo";

const SHOP_LINKS = [
  { label: "Kollektionen", href: `${BASE}/collections` },
  { label: "Neuheiten", href: `${BASE}/products` },
  { label: "Lookbook", href: `${BASE}/lookbook` },
  { label: "Alle Produkte", href: `${BASE}/products` },
];

const ABOUT_LINKS = [
  { label: "Unsere Geschichte", href: `${BASE}/about` },
  { label: "Größentabelle", href: `${BASE}/size-guide` },
  { label: "Versand & Retoure", href: `${BASE}/about` },
  { label: "Kontakt", href: `${BASE}/about` },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--pz-black)",
      }}
    >
      {/* Gold top rule */}
      <div className="h-px" style={{ backgroundColor: "var(--pz-gold)" }} />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3
              className="text-lg tracking-[0.1em]"
              style={{
                fontFamily: "var(--pz-font-serif)",
                color: "var(--pz-gold)",
              }}
            >
              PALAZZO
            </h3>
            <p
              className="mt-4 text-sm font-light leading-relaxed"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
              }}
            >
              Dunkel. Dramatisch. Opulent. Palazzo steht für die Essenz
              italienischer Luxushandwerkskunst -- zeitlose Stücke, die mit
              kompromissloser Qualität und einem Blick für beständige
              Schönheit gefertigt werden.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="transition-colors duration-300"
                  style={{ color: "var(--pz-warm-gray)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--pz-gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--pz-warm-gray)";
                  }}
                  aria-label="Social media"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-gold)",
              }}
            >
              Einkaufen
            </h4>
            <ul className="mt-4 space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light transition-colors duration-300"
                    style={{
                      fontFamily: "var(--pz-font-sans)",
                      color: "var(--pz-warm-gray)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--pz-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--pz-warm-gray)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-gold)",
              }}
            >
              Über Palazzo
            </h4>
            <ul className="mt-4 space-y-3">
              {ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light transition-colors duration-300"
                    style={{
                      fontFamily: "var(--pz-font-sans)",
                      color: "var(--pz-warm-gray)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--pz-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--pz-warm-gray)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-gold)",
              }}
            >
              Newsletter
            </h4>
            <p
              className="mt-4 text-sm font-light leading-relaxed"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
              }}
            >
              Entdecken Sie als Erste neue Kollektionen und exklusive Angebote.
            </p>

            {subscribed ? (
              <p
                className="mt-4 text-sm font-light"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-gold)",
                }}
              >
                Vielen Dank für Ihre Anmeldung.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-Mail-Adresse"
                    className="flex-1 border px-3 py-2.5 text-sm font-light outline-none transition-colors duration-300 placeholder:uppercase placeholder:tracking-[0.1em]"
                    style={{
                      fontFamily: "var(--pz-font-sans)",
                      backgroundColor: "transparent",
                      borderColor: "var(--pz-charcoal)",
                      color: "var(--pz-ivory)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--pz-gold)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--pz-charcoal)";
                    }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-85"
                    style={{
                      fontFamily: "var(--pz-font-sans)",
                      backgroundColor: "var(--pz-gold)",
                      color: "var(--pz-black)",
                    }}
                  >
                    Abonnieren
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: "var(--pz-charcoal)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-xs font-light"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
              }}
            >
              &copy; 2025 Unicorn Factory &middot; PALAZZO (Designvorlage)
            </p>

            <div className="flex items-center gap-6">
              {["Datenschutz", "AGB", "Cookie-Einstellungen"].map(
                (label) => (
                  <Link
                    key={label}
                    href={`${BASE}/about`}
                    className="text-xs font-light transition-colors duration-300"
                    style={{
                      fontFamily: "var(--pz-font-sans)",
                      color: "var(--pz-warm-gray)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--pz-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--pz-warm-gray)";
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
    </footer>
  );
}
