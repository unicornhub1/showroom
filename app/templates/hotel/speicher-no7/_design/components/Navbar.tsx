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
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? "var(--sp-bg)" : "rgba(244,242,237,0.86)",
          borderBottom: "1px solid var(--sp-line)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <Link href={BASE} className="flex items-baseline gap-3 leading-none">
            <span
              className="text-lg font-semibold tracking-[0.12em] sm:text-xl"
              style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}
            >
              SPEICHER&nbsp;No.7
            </span>
            <span
              className="hidden text-[10px] uppercase tracking-[0.2em] sm:inline"
              style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
            >
              EST. {BRAND.founded}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.16em] transition-colors duration-200"
                style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sp-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sp-text)")}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`${BASE}/kontakt`}
              className="rounded-none border px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors duration-200"
              style={{
                fontFamily: "var(--sp-font-mono)",
                color: "var(--sp-text)",
                borderColor: "var(--sp-text)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--sp-text)";
                e.currentTarget.style.color = "var(--sp-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--sp-text)";
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
            <span className="block h-[1.5px] w-6" style={{ backgroundColor: "var(--sp-text)" }} />
            <span className="block h-[1.5px] w-6" style={{ backgroundColor: "var(--sp-text)" }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(27,26,24,0.4)" }}
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute bottom-0 right-0 top-0 flex w-80 max-w-[85vw] flex-col p-9"
            style={{ backgroundColor: "var(--sp-bg)", borderLeft: "1px solid var(--sp-line)" }}
          >
            <button onClick={() => setOpen(false)} className="mb-12 self-end" aria-label="Menü schließen">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--sp-text)" }}>
                <line x1="2" y1="2" x2="18" y2="18" />
                <line x1="18" y1="2" x2="2" y2="18" />
              </svg>
            </button>
            <span className="text-lg font-semibold tracking-[0.1em]" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
              SPEICHER No.7
            </span>
            <div className="my-7 sp-hairline" />
            <nav className="flex flex-col">
              {NAV_ITEMS.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b py-4 text-xl"
                  style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)", borderColor: "var(--sp-line)" }}
                >
                  <span className="text-[11px]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex-1" />
            <Link
              href={`${BASE}/kontakt`}
              onClick={() => setOpen(false)}
              className="mt-6 block rounded-none py-3.5 text-center text-[11px] uppercase tracking-[0.16em] transition-opacity hover:opacity-85"
              style={{ fontFamily: "var(--sp-font-mono)", backgroundColor: "var(--sp-text)", color: "var(--sp-bg)" }}
            >
              Anfragen
            </Link>
            <p className="mt-6 text-sm leading-relaxed" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
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
