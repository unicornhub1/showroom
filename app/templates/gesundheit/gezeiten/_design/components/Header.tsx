"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BASE, BRAND, CONTACT, NAV } from "../data";
import Wave from "./Wave";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href={BASE} onClick={onClick} className="group flex items-center gap-3" aria-label={`${BRAND.name}, Startseite`}>
      <Wave className="h-[18px] w-[30px] transition-transform duration-700 group-hover:translate-x-0.5" />
      <span className="flex flex-col leading-none">
        <span className="gz-serif text-[1.45rem] tracking-[-0.02em]">{BRAND.name}</span>
        <span className="gz-sans mt-1 text-[0.72rem]" style={{ color: "var(--gz-schiefer)" }}>
          {BRAND.practice}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 8, () => false);
  const showFloat = useSyncExternalStore(subscribeScroll, () => window.scrollY > 560, () => false);
  const [open, setOpen] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const startT = useRef(0);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  const close = (restoreFocus = false) => {
    setOpen(false);
    setDrag(0);
    if (restoreFocus) menuBtn.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDrag(0);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => sheet.current?.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true }), 380);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  /* Sheet mit dem Finger nach unten ziehen, um es zu schließen */
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    startY.current = e.clientY;
    startT.current = performance.now();
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDrag(Math.max(0, e.clientY - startY.current));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dy = Math.max(0, e.clientY - startY.current);
    const velocity = dy / Math.max(1, performance.now() - startT.current);
    setDragging(false);
    if (dy > 110 || velocity > 0.6) close();
    else setDrag(0);
  };

  const menuLinks = [{ label: "Start", href: BASE, hint: "Übersicht" }, ...NAV];

  return (
    <>
      <header className="gz-header" data-scrolled={scrolled}>
        <div className="gz-wrap flex h-16 items-center justify-between lg:h-[84px]">
          <Wordmark />

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="gz-nav-link"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href={`${BASE}/kontakt`} className="gz-btn ml-4 min-h-[46px] px-5 text-[0.93rem]">
              Termin anfragen
            </Link>
          </nav>

          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="gz-sheet"
            className="gz-sans flex h-11 items-center gap-2.5 rounded-full px-4 text-[0.92rem] font-semibold lg:hidden"
            style={{ background: "var(--gz-kalk)" }}
          >
            <span className="flex flex-col gap-[4px]" aria-hidden="true">
              <span className="block h-[1.5px] w-4 rounded bg-current" />
              <span className="block h-[1.5px] w-4 rounded bg-current" />
            </span>
            Menü
          </button>
        </div>
      </header>

      {/* Schwebender Termin-Knopf auf Mobilgeräten (rechts, damit er den Showroom-Zurück-Knopf nicht verdeckt) */}
      <Link
        href={`${BASE}/kontakt`}
        className="gz-btn gz-float-cta min-h-[48px] px-5 text-[0.92rem] lg:hidden"
        data-visible={showFloat && !open && pathname !== `${BASE}/kontakt`}
        tabIndex={showFloat ? 0 : -1}
      >
        Termin anfragen
      </Link>

      {/* ── Mobiles Menü: Sheet von unten ────────────────────────────────── */}
      <div className="gz-backdrop lg:hidden" data-open={open} onClick={() => close()} aria-hidden="true" />
      <div
        ref={sheet}
        id="gz-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        className="gz-sheet lg:hidden"
        data-open={open}
        data-dragging={dragging}
        inert={!open}
        style={{ "--gz-drag": `${drag}px` } as React.CSSProperties}
      >
        <div
          className="flex flex-none cursor-grab flex-col items-center pb-2 pt-3 active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span className="gz-sheet__handle" aria-hidden="true" />
          <div className="mt-3 flex w-full items-center justify-between px-6">
            <span className="gz-sans text-[0.8rem]" style={{ color: "var(--gz-schiefer)" }}>
              Zum Schließen nach unten ziehen
            </span>
            <button
              type="button"
              onClick={() => close(true)}
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{ background: "var(--gz-salbei)" }}
              aria-label="Menü schließen"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8" style={{ touchAction: "pan-y" }}>
          <nav aria-label="Mobile Navigation">
            <ul>
              {menuLinks.map((item, i) => {
                const current = pathname === item.href;
                return (
                  <li key={item.href} className="gz-sheet__item" style={{ "--i": i } as React.CSSProperties}>
                    <Link
                      href={item.href}
                      onClick={() => close()}
                      aria-current={current ? "page" : undefined}
                      className="flex items-center justify-between gap-4 border-b py-4"
                      style={{ borderColor: "var(--gz-linie)" }}
                    >
                      <span className="flex flex-col">
                        <span className="gz-serif text-[2.1rem] leading-none tracking-[-0.025em]">{item.label}</span>
                        <span className="gz-sans mt-2 text-[0.84rem]" style={{ color: "var(--gz-schiefer)" }}>
                          {item.hint}
                        </span>
                      </span>
                      <span
                        className="h-2.5 w-2.5 flex-none rounded-full transition-transform duration-500"
                        style={{ background: "var(--gz-lehm)", transform: current ? "scale(1)" : "scale(0)" }}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="gz-sheet__item mt-7 grid grid-cols-2 gap-3" style={{ "--i": menuLinks.length } as React.CSSProperties}>
            <a href={CONTACT.phoneHref} className="gz-btn gz-btn--ghost px-3">
              Anrufen
            </a>
            <Link href={`${BASE}/kontakt`} onClick={() => close()} className="gz-btn px-3">
              Termin anfragen
            </Link>
          </div>

          <div
            className="gz-sheet__item gz-sans mt-7 flex items-start justify-between gap-6 rounded-[18px] p-5 text-[0.86rem] leading-relaxed"
            style={{ "--i": menuLinks.length + 1, background: "var(--gz-nebel)", color: "var(--gz-moos-2)" } as React.CSSProperties}
          >
            <p>
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </p>
            <p className="text-right">
              Mo–Fr 10–18 Uhr
              <br />
              Sa 10–16 Uhr
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
