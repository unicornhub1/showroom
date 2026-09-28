"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BASE, PHASES } from "../data";

/* Signatur der Startseite: fünf Lebensphasen als Bildleiste.
   Desktop: das gewählte Feld öffnet sich (Hover, Fokus oder Klick).
   Mobil: ruhiges Akkordeon mit kleinen Bildmarken. */
export default function LifePhases() {
  const [active, setActive] = useState(3);
  const [openMobile, setOpenMobile] = useState<number | null>(3);

  return (
    <>
      {/* Desktop */}
      <div className="ew-phases hidden lg:flex" role="list">
        {PHASES.map((p, i) => {
          const isActive = i === active;
          return (
            <div
              key={p.id}
              role="listitem"
              className="ew-phase"
              data-active={isActive}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{ background: p.gradient }}
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="ew-phase__img object-cover"
              />
              <div className="ew-phase__shade" />

              <button
                type="button"
                className="absolute inset-0 z-[1] focus-visible:outline-offset-[-6px]"
                aria-label={`${p.title} anzeigen`}
                aria-expanded={isActive}
                tabIndex={isActive ? -1 : 0}
                onClick={() => setActive(i)}
              />

              <div className="ew-phase__tab" aria-hidden="true">
                <span>{p.title}</span>
              </div>

              <div className="ew-phase__content z-[2]">
                <p className="ew-sans text-[0.85rem]" style={{ color: "rgba(251,247,243,0.75)" }}>
                  {p.hint}
                </p>
                <h3 className="ew-h3 mt-2" style={{ color: "var(--ew-leinen)" }}>
                  {p.title}
                </h3>
                <p className="ew-serif mt-4 text-[1.08rem] leading-relaxed" style={{ color: "rgba(251,247,243,0.9)" }}>
                  {p.lead}
                </p>
                <p className="ew-sans mt-5 text-[0.86rem] leading-relaxed" style={{ color: "rgba(251,247,243,0.72)" }}>
                  Häufig: {p.topics.slice(0, 3).join(", ")}
                </p>
                <Link
                  href={`${BASE}/schwerpunkte#${p.id}`}
                  className="ew-link mt-6 inline-block"
                  style={{ color: "var(--ew-leinen)" }}
                  tabIndex={isActive ? 0 : -1}
                >
                  {p.more}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobil */}
      <ul className="lg:hidden" style={{ borderTop: "1px solid var(--ew-linie)" }}>
        {PHASES.map((p, i) => {
          const isOpen = openMobile === i;
          return (
            <li key={p.id} style={{ borderBottom: "1px solid var(--ew-linie)" }}>
              <button
                type="button"
                className="flex w-full items-center gap-4 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`phase-m-${p.id}`}
                onClick={() => setOpenMobile(isOpen ? null : i)}
              >
                <span
                  className="relative h-14 w-14 flex-none overflow-hidden rounded-full transition-transform duration-500"
                  style={{ background: p.gradient, transform: isOpen ? "scale(0.82)" : "none" }}
                >
                  <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="ew-serif text-[1.35rem] leading-tight">{p.title}</span>
                  <span className="ew-sans mt-0.5 text-[0.82rem]" style={{ color: "var(--ew-stein)" }}>
                    {p.hint}
                  </span>
                </span>
                <span className="ew-plus" aria-hidden="true" />
              </button>

              <div id={`phase-m-${p.id}`} className="ew-acc__panel" data-open={isOpen}>
                <div className="ew-acc__inner">
                  <div className="pb-7">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]" style={{ background: p.gradient }}>
                      <Image src={p.image} alt={p.alt} fill sizes="100vw" className="object-cover" />
                    </div>
                    <p className="ew-body mt-5">{p.lead}</p>
                    <p className="ew-sans mt-4 text-[0.88rem] leading-relaxed" style={{ color: "var(--ew-stein)" }}>
                      Häufig: {p.topics.slice(0, 3).join(", ")}
                    </p>
                    <Link href={`${BASE}/schwerpunkte#${p.id}`} className="ew-link mt-5 inline-block">
                      {p.more}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
