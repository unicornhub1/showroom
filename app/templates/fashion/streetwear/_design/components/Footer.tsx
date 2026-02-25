"use client";

import Link from "next/link";
import { useState } from "react";

const BASE = "/templates/fashion/streetwear";

const SHOP_LINKS = [
  { label: "Alle Produkte", href: `${BASE}/products` },
  { label: "Neue Drops", href: `${BASE}/products?collection=drops` },
  { label: "Sale", href: `${BASE}/products?collection=sale` },
  { label: "Kollektionen", href: `${BASE}/collections` },
];

const INFO_LINKS = [
  { label: "Über VLTG", href: `${BASE}/about` },
  { label: "Größenguide", href: `${BASE}/size-guide` },
  { label: "Versand & Retouren", href: `${BASE}/about` },
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
    <footer style={{ backgroundColor: "var(--kr-black)" }}>
      {/* Neon top rule */}
      <div className="h-[2px]" style={{ backgroundColor: "var(--kr-neon)" }} />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3
              className="text-4xl uppercase tracking-[0.05em]"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              VLTG
            </h3>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Streetwear ohne Kompromisse. Jedes Stück wird mit Intention
              entworfen und in limitierter Stückzahl produziert. Für die, die
              wissen, was sie wollen.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-neon)",
              }}
            >
              [Shop]
            </h4>
            <ul className="mt-4 space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      fontFamily: "var(--kr-font-body)",
                      color: "var(--kr-muted)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--kr-neon)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--kr-muted)";
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
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-neon)",
              }}
            >
              [Info]
            </h4>
            <ul className="mt-4 space-y-3">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      fontFamily: "var(--kr-font-body)",
                      color: "var(--kr-muted)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--kr-neon)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--kr-muted)";
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
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-neon)",
              }}
            >
              [Newsletter]
            </h4>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Sei der Erste, der von neuen Drops erfährt. Kein Spam, nur das
              Wesentliche.
            </p>

            {subscribed ? (
              <p
                className="mt-4 text-sm font-bold"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-neon)",
                }}
              >
                Du bist drin.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="DEINE EMAIL"
                    className="flex-1 px-4 py-2.5 text-xs outline-none transition-all duration-200"
                    style={{
                      fontFamily: "var(--kr-font-mono)",
                      backgroundColor: "var(--kr-dark)",
                      border: "1px solid var(--kr-charcoal)",
                      color: "var(--kr-text)",
                      letterSpacing: "0.05em",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--kr-neon)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--kr-charcoal)";
                    }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-200"
                    style={{
                      fontFamily: "var(--kr-font-mono)",
                      backgroundColor: "var(--kr-neon)",
                      color: "var(--kr-black)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--kr-text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--kr-neon)";
                    }}
                  >
                    Go
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: "1px solid var(--kr-charcoal)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-[10px] uppercase tracking-[0.1em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-muted)",
              }}
            >
              © 2025 Unicorn Factory · VLTG (Designvorlage)
            </p>

            <div className="flex items-center gap-6">
              {["Datenschutz", "AGB", "Impressum"].map((label) => (
                <Link
                  key={label}
                  href={`${BASE}/about`}
                  className="text-[10px] uppercase tracking-[0.1em] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--kr-neon)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--kr-muted)";
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
