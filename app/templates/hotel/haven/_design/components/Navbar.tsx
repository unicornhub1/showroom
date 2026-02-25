"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BASE = "/templates/hotel/haven";

const NAV_LINKS = [
  { label: "Zimmer", href: `${BASE}/zimmer` },
  { label: "Erlebnis", href: `${BASE}/erlebnis` },
  { label: "Galerie", href: `${BASE}/galerie` },
  { label: "Kontakt", href: `${BASE}/kontakt` },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
          backgroundColor: scrolled ? "rgba(250, 248, 245, 0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 20px rgba(26, 26, 26, 0.05)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          {/* Left nav links - desktop */}
          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-60"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  color: scrolled ? "var(--hv-text)" : "var(--hv-text)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-[5px] md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen"
          >
            <span
              className="block h-[1.5px] w-6 transition-all"
              style={{ backgroundColor: "var(--hv-text)" }}
            />
            <span
              className="block h-[1.5px] w-4 transition-all"
              style={{ backgroundColor: "var(--hv-text)" }}
            />
          </button>

          {/* Center logo */}
          <Link
            href={BASE}
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
          >
            <span
              className="text-xl tracking-[0.35em] sm:text-2xl"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              HAVEN
            </span>
          </Link>

          {/* Right nav links + CTA - desktop */}
          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-normal uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-60"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  color: "var(--hv-text)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/kontakt`}
              className="border px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-transparent"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-accent)",
                borderColor: "var(--hv-accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--hv-accent)";
                e.currentTarget.style.color = "var(--hv-surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--hv-accent)";
              }}
            >
              Jetzt buchen
            </Link>
          </div>

          {/* Mobile CTA only */}
          <Link
            href={`${BASE}/kontakt`}
            className="text-[10px] uppercase tracking-[0.15em] md:hidden"
            style={{
              fontFamily: "var(--hv-font-display)",
              color: "var(--hv-accent)",
            }}
          >
            Buchen
          </Link>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(26, 26, 26, 0.3)" }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div
            className="absolute bottom-0 left-0 top-0 flex w-80 flex-col p-10 shadow-2xl"
            style={{ backgroundColor: "var(--hv-bg)" }}
          >
            {/* Close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="mb-12 self-start"
              aria-label="Menü schließen"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="2" y1="2" x2="18" y2="18" />
                <line x1="18" y1="2" x2="2" y2="18" />
              </svg>
            </button>

            {/* Logo */}
            <span
              className="mb-10 text-xl tracking-[0.3em]"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              HAVEN
            </span>

            {/* Gold line */}
            <div className="mb-10 h-px w-12" style={{ backgroundColor: "var(--hv-accent)" }} />

            {/* Nav */}
            <nav className="flex flex-col gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg tracking-wide transition-colors duration-300"
                  style={{
                    fontFamily: "var(--hv-font-body)",
                    color: "var(--hv-text)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA */}
            <Link
              href={`${BASE}/kontakt`}
              onClick={() => setMobileOpen(false)}
              className="mt-8 block w-full py-3.5 text-center text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-85"
              style={{
                fontFamily: "var(--hv-font-display)",
                backgroundColor: "var(--hv-accent)",
                color: "var(--hv-surface)",
              }}
            >
              Jetzt buchen
            </Link>

            {/* Contact */}
            <p
              className="mt-6 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-muted)",
              }}
            >
              +49 (0) 8321 / 94 78 0<br />
              info@haven-hotel.de
            </p>
          </div>
        </div>
      )}
    </>
  );
}
