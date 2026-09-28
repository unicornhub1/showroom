"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BASE, BRAND, CONTACT, NAV } from "../data";
import DropMark from "./DropMark";
import NextSlot from "./NextSlot";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href={BASE} onClick={onClick} className="group flex items-center gap-3" aria-label={`${BRAND.title}, Startseite`}>
      <DropMark size={17} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className="ew-serif text-[1.32rem] tracking-[-0.01em]" style={{ color: "var(--ew-pflaume)" }}>
          {BRAND.name}
        </span>
        <span className="ew-sans mt-1 text-[0.74rem]" style={{ color: "var(--ew-stein)" }}>
          {BRAND.practice}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 8, () => false);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: "90%", y: "32px" });
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const openMenu = () => {
    const r = menuBtn.current?.getBoundingClientRect();
    if (r) setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` });
    setOpen(true);
  };

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) menuBtn.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 450);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  const menuLinks = [{ label: "Start", href: BASE, hint: "Übersicht der Praxis" }, ...NAV];

  return (
    <>
      <header className="ew-header" data-scrolled={scrolled}>
        <div className="ew-wrap flex h-16 items-center justify-between lg:h-[84px]">
          <Wordmark />

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="ew-nav-link"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href={`${BASE}/termin`} className="ew-btn ml-2 min-h-[46px] px-5">
              Termin vereinbaren
            </Link>
          </nav>

          <button
            ref={menuBtn}
            type="button"
            onClick={openMenu}
            aria-expanded={open}
            aria-controls="ew-menu"
            className="ew-sans -mr-2 flex h-11 items-center gap-3 px-2 text-[0.92rem] font-medium lg:hidden"
            style={{ color: "var(--ew-pflaume)" }}
          >
            Menü
            <span className="ew-burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobiles Menü: öffnet sich als Kreis aus dem Menü-Knopf ───────── */}
      <div
        id="ew-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        className="ew-menu lg:hidden"
        data-open={open}
        inert={!open}
        style={{ "--ew-mx": origin.x, "--ew-my": origin.y } as React.CSSProperties}
      >
        <div className="ew-menu__bloom" aria-hidden="true" />

        <div className="ew-wrap relative flex h-16 flex-none items-center justify-between">
          <Wordmark onClick={() => closeMenu()} />
          <button
            type="button"
            onClick={() => closeMenu(true)}
            className="ew-sans -mr-2 flex h-11 items-center gap-3 px-2 text-[0.92rem] font-medium"
            style={{ color: "var(--ew-pflaume)" }}
          >
            Schließen
            <span className="ew-burger" aria-hidden="true">
              <span style={{ top: 5, transform: "rotate(45deg)" }} />
              <span style={{ top: 5, width: "100%", transform: "rotate(-45deg)" }} />
            </span>
          </button>
        </div>

        <nav aria-label="Mobile Navigation" className="ew-wrap relative mt-6 flex-none">
          <ul>
            {menuLinks.map((item, i) => (
              <li key={item.href} className="ew-menu__item" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={item.href}
                  onClick={() => closeMenu()}
                  className="ew-menu__link"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <span className="ew-menu__mark">
                    <DropMark size={10} />
                  </span>
                  <span className="flex flex-col">
                    <span className="ew-serif text-[2.35rem] font-light leading-[1.05] tracking-[-0.02em]">
                      {item.label}
                    </span>
                    <span className="ew-sans mt-1.5 text-[0.84rem]" style={{ color: "var(--ew-stein)" }}>
                      {item.hint}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ew-wrap relative mt-auto flex-none pb-10 pt-10">
          <div className="ew-menu__item" style={{ "--i": menuLinks.length } as React.CSSProperties}>
            <NextSlot />
            <Link href={`${BASE}/termin`} onClick={() => closeMenu()} className="ew-btn mt-5 w-full">
              Termin online vereinbaren
            </Link>
          </div>
          <div
            className="ew-menu__item ew-sans mt-7 grid grid-cols-2 gap-4 text-[0.86rem] leading-relaxed"
            style={{ "--i": menuLinks.length + 1, color: "var(--ew-pflaume-2)" } as React.CSSProperties}
          >
            <p>
              <a href={CONTACT.phoneHref} className="block" style={{ color: "var(--ew-pflaume)" }}>
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="block">
                {CONTACT.email}
              </a>
            </p>
            <p>
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
