"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE, BRAND, NAV_ITEMS, CONTACT } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: "var(--ro-bg)",
          borderBottom: "1px solid var(--ro-line)",
          boxShadow: scrolled ? "0 1px 24px rgba(42,37,32,0.07)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <Link href={BASE} className="flex flex-col leading-none">
            <span
              className="text-xl tracking-[0.26em] sm:text-2xl"
              style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}
            >
              {BRAND.name}
            </span>
            <span
              className="mt-1 text-[9px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}
            >
              Anno {BRAND.founded}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="ro-eyebrow transition-opacity duration-300 hover:opacity-55"
                style={{ color: "var(--ro-text)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/kontakt`}
              className="border px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300"
              style={{
                fontFamily: "var(--ro-font-sans)",
                color: "var(--ro-accent)",
                borderColor: "var(--ro-accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--ro-accent)";
                e.currentTarget.style.color = "var(--ro-surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--ro-accent)";
              }}
            >
              Anfragen
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-[5px] lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
          >
            <span className="block h-[1.5px] w-6" style={{ backgroundColor: "var(--ro-text)" }} />
            <span className="block h-[1.5px] w-4" style={{ backgroundColor: "var(--ro-text)" }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(42,37,32,0.35)" }}
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute bottom-0 right-0 top-0 flex w-80 max-w-[85vw] flex-col p-9 shadow-2xl"
            style={{ backgroundColor: "var(--ro-bg)" }}
          >
            <button onClick={() => setOpen(false)} className="mb-10 self-end" aria-label="Menü schließen">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--ro-text)" }}>
                <line x1="2" y1="2" x2="18" y2="18" />
                <line x1="18" y1="2" x2="2" y2="18" />
              </svg>
            </button>
            <span className="text-xl tracking-[0.24em]" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              {BRAND.name}
            </span>
            <div className="my-7 ro-rule" />
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-lg tracking-wide"
                  style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex-1" />
            <Link
              href={`${BASE}/kontakt`}
              onClick={() => setOpen(false)}
              className="mt-6 block py-3.5 text-center text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-85"
              style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "var(--ro-surface)" }}
            >
              Anfragen
            </Link>
            <p className="mt-5 text-sm leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>
              {CONTACT.phone}
              <br />
              {CONTACT.email}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
