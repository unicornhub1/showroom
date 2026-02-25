"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BASE = "/templates/gesundheit/vita";

const NAV_LINKS = [
  { label: "Leistungen", href: `${BASE}/leistungen` },
  { label: "Team", href: `${BASE}/team` },
  { label: "Praxis", href: `${BASE}/praxis` },
  { label: "Kontakt", href: `${BASE}/kontakt` },
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
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(13, 148, 136, 0.1)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(26, 35, 50, 0.04)" : "none",
        }}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link href={BASE} className="flex items-center gap-1 z-10">
            <span
              className="text-[22px] tracking-[0.12em] sm:text-[26px]"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "var(--vt-text)",
                fontWeight: 600,
              }}
            >
              V
              <span style={{ position: "relative" }}>
                I
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: "var(--vt-accent)",
                  }}
                />
              </span>
              TA
            </span>
            <span
              className="ml-2 hidden text-[10px] tracking-[0.15em] uppercase sm:block"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "var(--vt-muted)",
                fontWeight: 300,
                borderLeft: "1px solid var(--vt-border-strong)",
                paddingLeft: "8px",
              }}
            >
              Praxis f&uuml;r<br />Gesundheit
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-medium tracking-[0.04em] transition-colors duration-300 hover:text-[var(--vt-accent)]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-muted)",
                  fontWeight: 400,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: CTA + Mobile hamburger */}
          <div className="flex items-center gap-4 z-10">
            {/* CTA Button */}
            <Link
              href={`${BASE}/kontakt`}
              className="hidden rounded-full px-5 py-2.5 text-[12px] font-medium tracking-[0.04em] transition-all duration-300 hover:shadow-lg sm:block"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "#FFFFFF",
                backgroundColor: "var(--vt-accent)",
              }}
            >
              Termin buchen
            </Link>

            {/* Mobile hamburger */}
            <button
              className="flex flex-col items-center justify-center gap-[5px] lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Men&uuml; &ouml;ffnen"
            >
              <span
                className="block h-[2px] w-6 rounded-full transition-all"
                style={{ backgroundColor: "var(--vt-accent)" }}
              />
              <span
                className="block h-[2px] w-4 rounded-full transition-all"
                style={{ backgroundColor: "var(--vt-accent)" }}
              />
              <span
                className="block h-[2px] w-6 rounded-full transition-all"
                style={{ backgroundColor: "var(--vt-accent)" }}
              />
            </button>
          </div>
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
          style={{ backgroundColor: "rgba(26, 35, 50, 0.4)" }}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className="absolute bottom-0 right-0 top-0 w-[300px] flex flex-col p-8 shadow-2xl transition-transform duration-500 ease-out"
          style={{
            backgroundColor: "var(--vt-surface)",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="mb-10 self-end"
            aria-label="Men&uuml; schlie&szlig;en"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--vt-muted)"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-8">
            <span
              className="text-xl tracking-[0.12em]"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "var(--vt-text)",
                fontWeight: 600,
              }}
            >
              VITA
            </span>
            <span
              className="block text-[10px] tracking-[0.15em] uppercase mt-0.5"
              style={{
                fontFamily: "var(--vt-font-display)",
                color: "var(--vt-muted)",
                fontWeight: 300,
              }}
            >
              Praxis f&uuml;r Gesundheit
            </span>
          </div>

          {/* Divider */}
          <div
            className="mb-8 h-px w-full"
            style={{ backgroundColor: "var(--vt-border)" }}
          />

          {/* Nav links */}
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-[var(--vt-accent)]"
                style={{
                  fontFamily: "var(--vt-font-display)",
                  color: "var(--vt-text)",
                  fontWeight: 400,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href={`${BASE}/kontakt`}
            onClick={() => setMobileOpen(false)}
            className="mt-8 rounded-full px-5 py-3 text-center text-[13px] font-medium tracking-[0.04em] transition-all duration-300"
            style={{
              fontFamily: "var(--vt-font-display)",
              color: "#FFFFFF",
              backgroundColor: "var(--vt-accent)",
            }}
          >
            Termin buchen
          </Link>

          {/* Contact info */}
          <div className="mt-auto">
            <div
              className="h-px w-full mb-6"
              style={{ backgroundColor: "var(--vt-border)" }}
            />
            <p
              className="text-[13px] leading-relaxed"
              style={{
                fontFamily: "var(--vt-font-body)",
                color: "var(--vt-muted)",
              }}
            >
              Notfall-Telefon
              <br />
              <span
                className="text-[15px] font-semibold"
                style={{ color: "var(--vt-accent)" }}
              >
                0681 123456
              </span>
            </p>
            <p
              className="mt-3 text-[12px]"
              style={{
                fontFamily: "var(--vt-font-body)",
                color: "var(--vt-muted)",
              }}
            >
              Mo&ndash;Fr 8:00&ndash;18:00 Uhr
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
