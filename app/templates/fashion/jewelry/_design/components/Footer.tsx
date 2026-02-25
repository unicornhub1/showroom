"use client";

import Link from "next/link";
import { useState } from "react";

const BASE = "/templates/fashion/jewelry";

const SHOP_LINKS = [
  { label: "Ringe", href: `${BASE}/products?category=Ringe` },
  { label: "Ketten", href: `${BASE}/products?category=Ketten` },
  { label: "Ohrringe", href: `${BASE}/products?category=Ohrringe` },
  { label: "Armbänder", href: `${BASE}/products?category=Armb%C3%A4nder` },
];

const INFO_LINKS = [
  { label: "Unsere Geschichte", href: `${BASE}/about` },
  { label: "Ringgrößen-Guide", href: `${BASE}/ring-size-guide` },
  { label: "Versand & Retouren", href: `${BASE}/about` },
  { label: "Pflege & Aufbewahrung", href: `${BASE}/about` },
];

const COLLECTION_LINKS = [
  { label: "Signature", href: `${BASE}/products?collection=signature` },
  { label: "Everyday", href: `${BASE}/products?collection=everyday` },
  { label: "Héritage", href: `${BASE}/products?collection=heritage` },
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
    <footer style={{ backgroundColor: "var(--au-cream)" }}>
      {/* Thin gold rule */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px" style={{ backgroundColor: "var(--au-gold)", opacity: 0.3 }} />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3
              className="text-xl tracking-[0.12em]"
              style={{
                fontFamily: "var(--au-font-serif)",
                color: "var(--au-black)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              AURUM
            </h3>
            <p
              className="mt-5 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-muted)",
                fontWeight: 300,
              }}
            >
              Feiner Schmuck, gefertigt mit Hingabe. Jedes Stück erzählt eine Geschichte
              von Handwerkskunst, Reinheit und zeitloser Schönheit.
            </p>
          </div>

          {/* Column 2: Schmuck */}
          <div>
            <h4
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-black)",
                fontWeight: 400,
              }}
            >
              Schmuck
            </h4>
            <ul className="mt-5 space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color: "var(--au-muted)",
                      fontWeight: 300,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--au-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--au-muted)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service */}
          <div>
            <h4
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-black)",
                fontWeight: 400,
              }}
            >
              Service
            </h4>
            <ul className="mt-5 space-y-3">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color: "var(--au-muted)",
                      fontWeight: 300,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--au-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--au-muted)";
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
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-black)",
                fontWeight: 400,
              }}
            >
              Newsletter
            </h4>
            <p
              className="mt-5 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-muted)",
                fontWeight: 300,
              }}
            >
              Erfahren Sie als Erste von neuen Kollektionen und exklusiven Stücken.
            </p>

            {subscribed ? (
              <p
                className="mt-5 text-sm"
                style={{
                  fontFamily: "var(--au-font-serif)",
                  color: "var(--au-gold)",
                  fontStyle: "italic",
                }}
              >
                Vielen Dank für Ihre Anmeldung.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-Mail-Adresse"
                    className="flex-1 px-4 py-2.5 text-sm outline-none transition-colors duration-300"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      backgroundColor: "var(--au-white)",
                      border: "0.5px solid var(--au-line)",
                      color: "var(--au-black)",
                      fontWeight: 300,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--au-gold)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--au-line)";
                    }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-5 py-2.5 text-[9px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-85"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      backgroundColor: "var(--au-gold)",
                      color: "var(--au-white)",
                      fontWeight: 400,
                    }}
                  >
                    Senden
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: "0.5px solid var(--au-line)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-[11px]"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-muted)",
                fontWeight: 300,
              }}
            >
              &copy; 2026 AURUM. Alle Rechte vorbehalten.
            </p>

            <div className="flex items-center gap-6">
              {["Datenschutz", "AGB", "Impressum"].map((label) => (
                <Link
                  key={label}
                  href={`${BASE}/about`}
                  className="text-[11px] transition-colors duration-300"
                  style={{
                    fontFamily: "var(--au-font-sans)",
                    color: "var(--au-muted)",
                    fontWeight: 300,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--au-gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--au-muted)";
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
