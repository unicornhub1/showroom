"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

const BASE = "/templates/fashion/jardin";

const SHOP_LINKS = [
  { label: "Kollektionen", href: `${BASE}/collections` },
  { label: "Neuheiten", href: `${BASE}/products` },
  { label: "Editorial", href: `${BASE}/editorial` },
  { label: "Größentabelle", href: `${BASE}/size-guide` },
];

const INFO_LINKS = [
  { label: "Über uns", href: `${BASE}/about` },
  { label: "Versand & Retouren", href: `${BASE}/about` },
  { label: "Nachhaltigkeit", href: `${BASE}/about` },
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
        backgroundColor: "var(--jd-sage-light)",
      }}
    >
      {/* Sage top rule */}
      <div className="h-px" style={{ backgroundColor: "var(--jd-sage)", opacity: 0.3 }} />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3
              className="text-2xl tracking-[0.15em]"
              style={{
                fontFamily: "var(--jd-font-serif)",
                color: "var(--jd-charcoal)",
                fontWeight: 500,
              }}
            >
              JARDIN
            </h3>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
                opacity: 0.7,
              }}
            >
              Zeitgenössische französische Mode, inspiriert von der Natur und
              gefertigt mit Respekt für Handwerkskunst und Nachhaltigkeit.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300"
                style={{ backgroundColor: "var(--jd-sage)", color: "var(--jd-offwhite)" }}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300"
                style={{ backgroundColor: "var(--jd-sage)", color: "var(--jd-offwhite)" }}
                aria-label="E-Mail"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300"
                style={{ backgroundColor: "var(--jd-sage)", color: "var(--jd-offwhite)" }}
                aria-label="Telefon"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
              }}
            >
              Einkaufen
            </h4>
            <ul className="mt-4 space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{
                      fontFamily: "var(--jd-font-sans)",
                      color: "var(--jd-charcoal)",
                      opacity: 0.7,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--jd-sage)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--jd-charcoal)";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Info */}
          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
              }}
            >
              Informationen
            </h4>
            <ul className="mt-4 space-y-3">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{
                      fontFamily: "var(--jd-font-sans)",
                      color: "var(--jd-charcoal)",
                      opacity: 0.7,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--jd-sage)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--jd-charcoal)";
                      e.currentTarget.style.opacity = "0.7";
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
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
              }}
            >
              Newsletter
            </h4>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
                opacity: 0.7,
              }}
            >
              Erhalten Sie als Erste Neuigkeiten zu neuen Kollektionen und exklusiven Angeboten.
            </p>

            {subscribed ? (
              <p
                className="mt-4 text-sm"
                style={{
                  fontFamily: "var(--jd-font-sans)",
                  color: "var(--jd-sage)",
                }}
              >
                Merci! Sie sind angemeldet.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ihre E-Mail-Adresse"
                    className="flex-1 rounded-l-lg border px-3 py-2.5 text-sm outline-none transition-colors duration-300"
                    style={{
                      fontFamily: "var(--jd-font-sans)",
                      backgroundColor: "var(--jd-offwhite)",
                      borderColor: "var(--jd-light)",
                      color: "var(--jd-charcoal)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--jd-sage)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--jd-light)";
                    }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-r-lg px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-85"
                    style={{
                      fontFamily: "var(--jd-font-sans)",
                      backgroundColor: "var(--jd-sage)",
                      color: "var(--jd-offwhite)",
                    }}
                  >
                    Anmelden
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: "var(--jd-sage)", borderTopWidth: "1px", opacity: 0.3 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row" style={{ opacity: 1 }}>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
                opacity: 0.6,
              }}
            >
              2026 JARDIN. Alle Rechte vorbehalten.
            </p>

            <div className="flex items-center gap-6">
              {["Datenschutz", "AGB", "Impressum"].map(
                (label) => (
                  <Link
                    key={label}
                    href={`${BASE}/about`}
                    className="text-xs transition-colors duration-300"
                    style={{
                      fontFamily: "var(--jd-font-sans)",
                      color: "var(--jd-charcoal)",
                      opacity: 0.6,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--jd-sage)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--jd-charcoal)";
                      e.currentTarget.style.opacity = "0.6";
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
