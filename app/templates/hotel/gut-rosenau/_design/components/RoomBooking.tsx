"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "../data";

/* ── GUT ROSENAU — Zimmerbuchung (Kalender-Widget) ──────────────────────────
   Warme, gastliche Buchungs-/Verfügbarkeits-UI im Landgut-Stil: Surface-Karte,
   Messing-Akzent (--ro-accent) für ausgewählte Tage/Range, Cormorant-Italic für
   Überschriften, Jost für Bedienelemente, feine --ro-line-Borders, rounded-sm.
   Designvorlage — kein echtes Backend.
─────────────────────────────────────────────────────────────────────────── */

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

/* Tag ohne Uhrzeit (Mitternacht lokal) — für saubere Vergleiche. */
function dayOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/* Montag-basierter Wochentag-Index: Mo=0 … So=6 */
function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

function formatDateDE(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

function nightsBetween(a: Date, b: Date): number {
  return Math.round((dayOnly(b).getTime() - dayOnly(a).getTime()) / 86_400_000);
}

export default function RoomBooking({
  room,
}: {
  room: { name: string; price: number };
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [guests, setGuests] = useState(2);
  const [arrival, setArrival] = useState<Date | null>(null);
  const [departure, setDeparture] = useState<Date | null>(null);

  const today = dayOnly(new Date());
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  /* Body-Scroll sperren, ESC schließt. */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function closeModal() {
    setOpen(false);
  }

  function resetAndOpen() {
    setSent(false);
    setOpen(true);
  }

  function selectDay(day: Date) {
    // Vergangenheit ignorieren
    if (day < today) return;

    // Noch keine Anreise oder bereits Range komplett → neu starten
    if (!arrival || (arrival && departure)) {
      setArrival(day);
      setDeparture(null);
      return;
    }

    // Anreise gesetzt, Abreise offen
    if (day > arrival) {
      setDeparture(day);
    } else {
      // früherer oder gleicher Tag → Auswahl neu starten
      setArrival(day);
      setDeparture(null);
    }
  }

  const canGoPrev =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());

  function prevMonth() {
    if (!canGoPrev) return;
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  // Tage des angezeigten Monats aufbauen
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const daysInMonth = new Date(
    viewMonth.getFullYear(),
    viewMonth.getMonth() + 1,
    0
  ).getDate();
  const leading = mondayIndex(firstOfMonth);
  const cells: (Date | null)[] = [];
  for (let i = 0; i < leading; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
  }

  const nights = arrival && departure ? nightsBetween(arrival, departure) : 0;
  const canSubmit = Boolean(arrival && departure);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={resetAndOpen}
        className="px-6 py-3 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90"
        style={{
          fontFamily: "var(--ro-font-sans)",
          backgroundColor: "var(--ro-accent)",
          color: "#FBF8F2",
          borderRadius: 2,
        }}
      >
        Verfügbarkeit &amp; Buchung
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0"
            style={{ backgroundColor: "rgba(42,37,32,0.55)" }}
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Buchung — ${room.name}`}
            className="ro-scroll relative z-[81] my-auto w-full max-w-md rounded-sm"
            style={{
              backgroundColor: "var(--ro-surface)",
              border: "1px solid var(--ro-line)",
              boxShadow: "0 24px 70px rgba(42,37,32,0.28)",
            }}
          >
            {/* X schließen */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Schließen"
              className="absolute right-4 top-4 z-[82] flex h-9 w-9 items-center justify-center rounded-full transition-opacity duration-300 hover:opacity-60"
              style={{ color: "var(--ro-muted)" }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="3" x2="17" y2="17" />
                <line x1="17" y1="3" x2="3" y2="17" />
              </svg>
            </button>

            {sent ? (
              /* ── Bestätigung ──────────────────────────────────────── */
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
                <div className="ro-rule mb-6" />
                <h3
                  className="text-2xl sm:text-3xl"
                  style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)", fontStyle: "italic" }}
                >
                  Vielen Dank
                </h3>
                <p
                  className="mt-4 max-w-sm text-[15px] leading-relaxed"
                  style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}
                >
                  Wir prüfen die Verfügbarkeit für{" "}
                  <span style={{ color: "var(--ro-text)" }}>{room.name}</span> vom{" "}
                  <span style={{ color: "var(--ro-text)" }}>
                    {arrival ? formatDateDE(arrival) : ""}
                  </span>{" "}
                  bis{" "}
                  <span style={{ color: "var(--ro-text)" }}>
                    {departure ? formatDateDE(departure) : ""}
                  </span>{" "}
                  ({guests} {guests === 1 ? "Gast" : "Gäste"}) und melden uns persönlich.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-8 border px-7 py-3 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-70"
                  style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)", borderColor: "var(--ro-accent)", borderRadius: 2 }}
                >
                  Schließen
                </button>
              </div>
            ) : (
              /* ── Buchungs-UI ──────────────────────────────────────── */
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                {/* Kopf */}
                <div className="pr-9">
                  <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>
                    Verfügbarkeit anfragen
                  </span>
                  <h3
                    className="mt-3 text-2xl sm:text-3xl"
                    style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)", fontStyle: "italic" }}
                  >
                    {room.name}
                  </h3>
                  <p
                    className="mt-1 text-sm"
                    style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}
                  >
                    ab {formatPrice(room.price)} / Nacht
                  </p>
                </div>

                <div className="my-6 h-px w-full" style={{ backgroundColor: "var(--ro-line)" }} />

                {/* Kalender-Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevMonth}
                    disabled={!canGoPrev}
                    aria-label="Vorheriger Monat"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-opacity duration-200"
                    style={{
                      fontFamily: "var(--ro-font-sans)",
                      color: "var(--ro-accent)",
                      opacity: canGoPrev ? 1 : 0.25,
                      cursor: canGoPrev ? "pointer" : "not-allowed",
                    }}
                  >
                    &lsaquo;
                  </button>
                  <span
                    aria-live="polite"
                    className="text-base"
                    style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)", fontWeight: 600 }}
                  >
                    {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    aria-label="Nächster Monat"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-opacity duration-200 hover:opacity-60"
                    style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}
                  >
                    &rsaquo;
                  </button>
                </div>

                {/* Wochentags-Kopf */}
                <div className="mt-4 grid grid-cols-7 gap-1">
                  {WEEKDAYS.map((w) => (
                    <div
                      key={w}
                      className="py-1 text-center text-[10px] uppercase tracking-[0.12em]"
                      style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 500 }}
                    >
                      {w}
                    </div>
                  ))}
                </div>

                {/* Tage-Grid */}
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {cells.map((cell, idx) => {
                    if (!cell) return <div key={`e-${idx}`} aria-hidden="true" />;

                    const isPast = cell < today;
                    const isArrival = arrival ? isSameDay(cell, arrival) : false;
                    const isDeparture = departure ? isSameDay(cell, departure) : false;
                    const inRange =
                      arrival && departure
                        ? cell > arrival && cell < departure
                        : false;
                    const isEndpoint = isArrival || isDeparture;

                    let bg = "transparent";
                    let color = "var(--ro-text)";
                    let borderColor = "transparent";
                    if (isEndpoint) {
                      bg = "var(--ro-accent)";
                      color = "#FBF8F2";
                    } else if (inRange) {
                      bg = "var(--ro-blush)";
                      color = "var(--ro-text)";
                    } else if (isSameDay(cell, today)) {
                      borderColor = "var(--ro-line)";
                    }

                    return (
                      <button
                        key={cell.toISOString()}
                        type="button"
                        disabled={isPast}
                        onClick={() => selectDay(cell)}
                        aria-label={formatDateDE(cell)}
                        aria-pressed={isEndpoint || inRange}
                        className="flex aspect-square items-center justify-center rounded-sm text-sm transition-colors duration-150"
                        style={{
                          fontFamily: "var(--ro-font-sans)",
                          backgroundColor: bg,
                          color: isPast ? "var(--ro-muted)" : color,
                          opacity: isPast ? 0.35 : 1,
                          border: `1px solid ${borderColor}`,
                          fontWeight: isEndpoint ? 600 : 400,
                          cursor: isPast ? "not-allowed" : "pointer",
                          textDecoration: isPast ? "line-through" : "none",
                        }}
                      >
                        {cell.getDate()}
                      </button>
                    );
                  })}
                </div>

                {/* Auswahl-Zusammenfassung */}
                <div
                  className="mt-5 rounded-sm px-4 py-3 text-center text-[13px]"
                  style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-card)", color: "var(--ro-text)" }}
                >
                  {arrival && departure ? (
                    <span>
                      Anreise: <strong style={{ fontWeight: 600 }}>{formatDateDE(arrival)}</strong>{" "}
                      &middot; Abreise: <strong style={{ fontWeight: 600 }}>{formatDateDE(departure)}</strong>{" "}
                      &middot; {nights} {nights === 1 ? "Nacht" : "Nächte"}
                    </span>
                  ) : arrival ? (
                    <span style={{ color: "var(--ro-muted)" }}>
                      Anreise: <strong style={{ fontWeight: 600, color: "var(--ro-text)" }}>{formatDateDE(arrival)}</strong>{" "}
                      &middot; bitte Abreise wählen
                    </span>
                  ) : (
                    <span style={{ color: "var(--ro-muted)" }}>
                      Bitte Anreise &amp; Abreise wählen
                    </span>
                  )}
                </div>

                {/* Gäste-Stepper */}
                <div className="mt-5 flex items-center justify-between">
                  <span
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 500 }}
                  >
                    Gäste
                  </span>
                  <div
                    className="flex items-center gap-1 rounded-sm px-1.5 py-1"
                    style={{ border: "1px solid var(--ro-line)", backgroundColor: "var(--ro-bg)" }}
                  >
                    <button
                      type="button"
                      aria-label="Weniger Gäste"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex h-9 w-9 items-center justify-center text-xl leading-none transition-opacity hover:opacity-60"
                      style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}
                    >
                      &minus;
                    </button>
                    <span
                      aria-live="polite"
                      className="min-w-[2ch] text-center text-lg"
                      style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}
                    >
                      {guests}
                    </span>
                    <button
                      type="button"
                      aria-label="Mehr Gäste"
                      onClick={() => setGuests((g) => g + 1)}
                      className="flex h-9 w-9 items-center justify-center text-xl leading-none transition-opacity hover:opacity-60"
                      style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Optionales E-Mail-Feld (dezent) */}
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="E-Mail (optional)"
                    className="w-full rounded-sm px-3 py-2.5 text-[14px] outline-none transition-colors focus:border-[var(--ro-accent)]"
                    style={{
                      fontFamily: "var(--ro-font-sans)",
                      backgroundColor: "var(--ro-bg)",
                      border: "1px solid var(--ro-line)",
                      color: "var(--ro-text)",
                    }}
                  />
                </div>

                {/* Senden */}
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => setSent(true)}
                  className="mt-5 w-full px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300"
                  style={{
                    fontFamily: "var(--ro-font-sans)",
                    backgroundColor: "var(--ro-accent)",
                    color: "#FBF8F2",
                    borderRadius: 2,
                    opacity: canSubmit ? 1 : 0.4,
                    cursor: canSubmit ? "pointer" : "not-allowed",
                  }}
                >
                  Anfrage senden
                </button>

                <p
                  className="mt-4 text-center text-[11px]"
                  style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}
                >
                  Designvorlage — diese Anfrage versendet keine echten Daten.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
