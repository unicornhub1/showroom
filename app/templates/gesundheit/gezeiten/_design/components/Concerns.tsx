"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BASE, CONCERNS, type Concern } from "../data";

/* Signatur: Anliegen in der Ich-Form, so wie Patientinnen und Patienten sie sagen.
   Desktop: Liste links, Antwort rechts. Mobil: Akkordeon. */

function Answer({ c, compact = false }: { c: Concern; compact?: boolean }) {
  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-[22px] ${compact ? "aspect-[16/10]" : "aspect-[5/4]"}`}
        style={{ background: c.gradient }}
      >
        <Image src={c.image} alt={c.alt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
        <span
          className="gz-sans absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[0.8rem] font-semibold"
          style={{ background: "rgba(243,243,238,0.88)", color: "var(--gz-moos)" }}
        >
          {c.label}
        </span>
      </div>
      <dl className="mt-7 space-y-6">
        <div>
          <dt className="gz-sans text-[0.85rem] font-semibold">Was dahinterstecken kann</dt>
          <dd className="gz-body mt-1.5">{c.cause}</dd>
        </div>
        <div>
          <dt className="gz-sans text-[0.85rem] font-semibold">Was ich mache</dt>
          <dd className="gz-body mt-1.5">{c.approach}</dd>
        </div>
        <div>
          <dt className="gz-sans text-[0.85rem] font-semibold">Wie oft</dt>
          <dd className="gz-body mt-1.5">{c.rhythm}</dd>
        </div>
      </dl>
      <Link href={`${BASE}/kontakt?anliegen=${c.id}`} className="gz-btn mt-8">
        Termin für dieses Anliegen
      </Link>
    </div>
  );
}

export default function Concerns() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const current = CONCERNS[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowDown" ? 1 : -1) + CONCERNS.length) % CONCERNS.length;
    setActive(next);
    document.getElementById(`gz-tab-${CONCERNS[next].id}`)?.focus();
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-16 lg:grid lg:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" aria-label="Anliegen" className="lg:col-span-7" onKeyDown={onKeyDown}>
          {CONCERNS.map((c, i) => (
            <button
              key={c.id}
              id={`gz-tab-${c.id}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="gz-concern-panel"
              tabIndex={i === active ? 0 : -1}
              className="gz-concern"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className="gz-concern__dot" aria-hidden="true" />
              <span>„{c.quote}“</span>
            </button>
          ))}
        </div>
        <div
          id="gz-concern-panel"
          role="tabpanel"
          aria-labelledby={`gz-tab-${current.id}`}
          className="lg:col-span-5"
        >
          <div className="sticky top-28">
            <div key={current.id} className="gz-panel-in">
              <Answer c={current} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobil */}
      <ul className="lg:hidden">
        {CONCERNS.map((c, i) => {
          const isOpen = openMobile === i;
          return (
            <li key={c.id} className="border-b" style={{ borderColor: "var(--gz-linie)" }}>
              <button
                type="button"
                className="gz-concern py-5"
                aria-expanded={isOpen}
                aria-controls={`gz-m-${c.id}`}
                onClick={() => setOpenMobile(isOpen ? null : i)}
              >
                <span className="gz-concern__dot" aria-hidden="true" />
                <span>„{c.quote}“</span>
              </button>
              <div id={`gz-m-${c.id}`} className="gz-acc__panel" data-open={isOpen}>
                <div className="gz-acc__inner">
                  <div className="pb-9">
                    <Answer c={c} compact />
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
