"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BASE = "/templates/gastro/saveur";

const NAV_LINKS = [
  { label: "Speisekarte", href: `${BASE}/speisekarte` },
  { label: "Reservierung", href: `${BASE}/reservierung` },
  { label: "\u00DCber uns", href: `${BASE}/ueber-uns` },
  { label: "Galerie", href: `${BASE}/galerie` },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? "rgba(26, 20, 18, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(200, 149, 108, 0.1)"
            : "1px solid transparent",
        }}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
          {/* Left: Desktop nav links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[11px] font-normal uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{
                  fontFamily: "var(--sv-font-body)",
                  color: "var(--sv-muted)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col items-center justify-center gap-[5px] lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Men\u00FC \u00F6ffnen"
          >
            <span
              className="block h-[1.5px] w-6 transition-all"
              style={{ backgroundColor: "var(--sv-accent)" }}
            />
            <span
              className="block h-[1.5px] w-4 transition-all"
              style={{ backgroundColor: "var(--sv-accent)" }}
            />
            <span
              className="block h-[1.5px] w-6 transition-all"
              style={{ backgroundColor: "var(--sv-accent)" }}
            />
          </button>

          {/* Center: Logo */}
          <Link
            href={BASE}
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
          >
            <span
              className="text-xl tracking-[0.3em] sm:text-2xl md:text-[26px]"
              style={{
                fontFamily: "var(--sv-font-display)",
                color: "var(--sv-text)",
                fontWeight: 300,
              }}
            >
              SAVEUR
            </span>
            <span
              className="block text-center text-[8px] tracking-[0.4em] uppercase"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-accent)",
                marginTop: "-2px",
              }}
            >
              Restaurant
            </span>
          </Link>

          {/* Right: Desktop nav links + CTA */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[11px] font-normal uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{
                  fontFamily: "var(--sv-font-body)",
                  color: "var(--sv-muted)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/reservierung`}
              className="border px-5 py-2 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[var(--sv-accent)] hover:text-[var(--sv-bg)] hover:border-[var(--sv-accent)]"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-accent)",
                borderColor: "var(--sv-accent)",
              }}
            >
              Tisch reservieren
            </Link>
          </div>

          {/* Mobile CTA button */}
          <Link
            href={`${BASE}/reservierung`}
            className="border px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[var(--sv-accent)] hover:text-[var(--sv-bg)] lg:hidden"
            style={{
              fontFamily: "var(--sv-font-body)",
              color: "var(--sv-accent)",
              borderColor: "var(--sv-accent)",
            }}
          >
            Reservieren
          </Link>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-[60] lg:hidden transition-opacity duration-300"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className="absolute bottom-0 left-0 top-0 w-[280px] flex flex-col p-8 shadow-xl transition-transform duration-500 ease-out"
          style={{
            backgroundColor: "var(--sv-bg)",
            transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="mb-12 self-end"
            aria-label="Men\u00FC schlie\u00DFen"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--sv-muted)"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-10">
            <span
              className="text-lg tracking-[0.3em]"
              style={{
                fontFamily: "var(--sv-font-display)",
                color: "var(--sv-text)",
                fontWeight: 300,
              }}
            >
              SAVEUR
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{
                  fontFamily: "var(--sv-font-display)",
                  color: "var(--sv-muted)",
                  fontWeight: 300,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Decorative divider */}
          <div className="my-8 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "var(--sv-border-strong)" }}
            />
            <div
              className="h-1.5 w-1.5 rotate-45"
              style={{ backgroundColor: "var(--sv-gold)" }}
            />
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "var(--sv-border-strong)" }}
            />
          </div>

          {/* Contact info */}
          <div className="mt-auto">
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: "var(--sv-font-body)",
                color: "var(--sv-muted)",
              }}
            >
              Reservierungen
              <br />
              <span style={{ color: "var(--sv-accent)" }}>
                +49 30 1234 5678
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
