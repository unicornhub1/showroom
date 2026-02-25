"use client";

import Link from "next/link";
import { useState } from "react";

const BASE = "/templates/fashion/elegance";

const SHOP_LINKS = [
  { label: "Kollektionen", href: `${BASE}/collections` },
  { label: "Neuheiten", href: `${BASE}/collections` },
  { label: "Sale", href: `${BASE}/sale` },
  { label: "Lookbook", href: `${BASE}/lookbook` },
];

const ABOUT_LINKS = [
  { label: "Unsere Geschichte", href: `${BASE}/about` },
  { label: "Größentabelle", href: `${BASE}/size-guide` },
  { label: "Versand", href: `${BASE}/about` },
  { label: "Rückgabe", href: `${BASE}/about` },
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
        backgroundColor: "#EDE8DF",
      }}
    >
      {/* Gold top rule */}
      <div className="h-px" style={{ backgroundColor: "var(--el-gold)" }} />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3
              className="text-lg font-light tracking-[0.1em]"
              style={{
                fontFamily: "var(--el-font-serif)",
                color: "var(--el-navy)",
              }}
            >
              MAISON &Eacute;L&Eacute;GANCE
            </h3>
            <p
              className="mt-4 text-sm font-light leading-relaxed"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
              }}
            >
              Zeitloser Luxus, modernes Gespür. Jedes Stück unserer Kollektion
              wird mit kompromisslosem Qualitätsanspruch und einem Blick für
              beständigen Stil gefertigt.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4
              className="text-xs font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-navy)",
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
                      fontFamily: "var(--el-font-sans)",
                      color: "var(--el-gray)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--el-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--el-gray)";
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
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-navy)",
              }}
            >
              Über uns
            </h4>
            <ul className="mt-4 space-y-3">
              {ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light transition-colors duration-300"
                    style={{
                      fontFamily: "var(--el-font-sans)",
                      color: "var(--el-gray)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--el-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--el-gray)";
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
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-navy)",
              }}
            >
              Newsletter
            </h4>
            <p
              className="mt-4 text-sm font-light leading-relaxed"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
              }}
            >
              Entdecken Sie als Erste neue Kollektionen und exklusive Angebote.
            </p>

            {subscribed ? (
              <p
                className="mt-4 text-sm font-light"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gold)",
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
                    placeholder="E-Mail-Adresse eingeben"
                    className="flex-1 border px-3 py-2.5 text-sm font-light outline-none transition-colors duration-300 placeholder:uppercase placeholder:tracking-[0.1em]"
                    style={{
                      fontFamily: "var(--el-font-sans)",
                      backgroundColor: "var(--el-offwhite)",
                      borderColor: "var(--el-light)",
                      color: "var(--el-black)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--el-gold)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--el-light)";
                    }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-85"
                    style={{
                      fontFamily: "var(--el-font-sans)",
                      backgroundColor: "var(--el-gold)",
                      color: "var(--el-offwhite)",
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
          style={{ borderColor: "var(--el-light)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-xs font-light"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
              }}
            >
              &copy; 2026 Maison &Eacute;l&eacute;gance. Alle Rechte vorbehalten.
            </p>

            <div className="flex items-center gap-6">
              {["Datenschutz", "AGB", "Cookie-Einstellungen"].map(
                (label) => (
                  <Link
                    key={label}
                    href={`${BASE}/about`}
                    className="text-xs font-light transition-colors duration-300"
                    style={{
                      fontFamily: "var(--el-font-sans)",
                      color: "var(--el-gray)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--el-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--el-gray)";
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
