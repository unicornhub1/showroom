"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BASE = "/templates/immobilien/quartier";

const NAV_LINKS = [
  { label: "Objekte", href: `${BASE}/objekte` },
  { label: "Verkaufen", href: `${BASE}/verkaufen` },
  { label: "Über uns", href: `${BASE}/ueber-uns` },
  { label: "Kontakt", href: `${BASE}/kontakt` },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled ? "0 1px 20px rgba(10,22,40,0.06)" : "none",
          borderBottom: scrolled ? "1px solid var(--qt-border-light)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
          style={{ height: "80px" }}
        >
          {/* Logo */}
          <Link
            href={BASE}
            className="flex items-center gap-3"
          >
            {/* Geometric logo mark */}
            <div
              className="relative flex h-9 w-9 items-center justify-center"
              style={{
                border: "1.5px solid var(--qt-dark)",
              }}
            >
              <span
                className="text-[11px] font-bold tracking-[0.08em]"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                }}
              >
                Q
              </span>
              <div
                className="absolute -bottom-[3px] -right-[3px] h-[6px] w-[6px]"
                style={{ backgroundColor: "var(--qt-accent)" }}
              />
            </div>
            <span
              className="text-[15px] font-bold tracking-[0.25em] sm:text-[17px]"
              style={{
                fontFamily: "var(--qt-font-display)",
                color: "var(--qt-dark)",
              }}
            >
              QUARTIER
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-medium tracking-[0.04em] transition-colors duration-300 hover:text-[var(--qt-accent)]"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  color: "var(--qt-text)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              href={`${BASE}/kontakt`}
              className="hidden items-center gap-2 px-5 py-2.5 text-[12px] font-semibold tracking-[0.06em] transition-all duration-300 hover:opacity-90 sm:flex"
              style={{
                fontFamily: "var(--qt-font-body)",
                backgroundColor: "var(--qt-accent)",
                color: "#FFFFFF",
              }}
            >
              Beratung anfragen
            </Link>

            {/* Mobile hamburger */}
            <button
              className="flex flex-col items-center justify-center gap-[5px] md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
              style={{ width: "28px", height: "28px" }}
            >
              <span
                className="block h-[1.5px] w-5 transition-all"
                style={{ backgroundColor: "var(--qt-dark)" }}
              />
              <span
                className="block h-[1.5px] w-5 transition-all"
                style={{ backgroundColor: "var(--qt-dark)" }}
              />
              <span
                className="block h-[1.5px] w-3.5 transition-all"
                style={{ backgroundColor: "var(--qt-dark)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(10,22,40,0.4)" }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute bottom-0 right-0 top-0 flex w-80 flex-col shadow-2xl"
            style={{ backgroundColor: "var(--qt-surface)" }}
          >
            {/* Close */}
            <div className="flex items-center justify-between px-6 py-6">
              <span
                className="text-[13px] font-bold tracking-[0.25em]"
                style={{
                  fontFamily: "var(--qt-font-display)",
                  color: "var(--qt-dark)",
                }}
              >
                QUARTIER
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Menü schließen"
                className="flex h-8 w-8 items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="var(--qt-dark)" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {/* Accent line */}
            <div className="mx-6 h-[2px]" style={{ backgroundColor: "var(--qt-accent)" }} />

            {/* Links */}
            <nav className="flex flex-col gap-1 px-6 pt-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-[15px] font-medium tracking-[0.02em] transition-colors duration-300"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                    borderBottom: "1px solid var(--qt-border-light)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-auto px-6 pb-8">
              <Link
                href={`${BASE}/kontakt`}
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center py-3.5 text-[13px] font-semibold tracking-[0.06em] transition-opacity hover:opacity-90"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  backgroundColor: "var(--qt-accent)",
                  color: "#FFFFFF",
                }}
              >
                Beratung anfragen
              </Link>
              <p
                className="mt-4 text-center text-[11px]"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  color: "var(--qt-muted)",
                }}
              >
                +49 89 123 456 0 &middot; info@quartier-immobilien.de
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
