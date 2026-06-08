"use client";

import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "../data";

/* ── SPEICHER No.7 — Zimmer-Buchung (Kalender-Modal) ───────────────────────
   Scharfes, architektonisches Buchungs-Widget im Template-Stil:
   Kalkweiß/Anthrazit, Terrakotta (--sp-accent) für ausgewählte Tage/Range,
   Space Grotesk für die Tageszahlen, Space Mono (uppercase) für den
   Wochentags-Kopf & Labels, rounded-none, Haarlinien statt Schatten.
   Monatsansicht mit Montag-Start, Range-Auswahl (Anreise → Abreise).
   Designvorlage — kein echtes Backend.
─────────────────────────────────────────────────────────────────────────── */

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] as const;
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
] as const;

/* Auf Mitternacht normalisierter Tag (verhindert Zeitzonen-/Stunden-Drift). */
function dayStart(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/* Anzahl der Tage in einem Monat. */
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/* Montag-basierter Wochentag-Index (Mo = 0 … So = 6). */
function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

/* Ganzzahlige Tages-Differenz a → b. */
function diffDays(a: Date, b: Date): number {
  return Math.round((dayStart(b).getTime() - dayStart(a).getTime()) / 86_400_000);
}

const DE_DATE = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function fmt(d: Date | null): string {
  return d ? DE_DATE.format(d) : "—";
}

export default function RoomBooking({
  room,
}: {
  room: { name: string; price: number };
}) {
  const [open, setOpen] = useState(false);
  const [arrival, setArrival] = useState<Date | null>(null);
  const [departure, setDeparture] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [sent, setSent] = useState(false);

  const today = useMemo(() => dayStart(new Date()), []);
  /* Aktuell im Kalender angezeigter Monat (1. des Monats). */
  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  /* ── Body-Scroll sperren + ESC schließt ──────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  function resetSelection() {
    setArrival(null);
    setDeparture(null);
    setSent(false);
  }

  /* ── Tages-Auswahl (Range-Logik) ─────────────────────────────────────── */
  function pickDay(day: Date) {
    // Vor erster Auswahl oder bei bereits vollständiger Range → neu starten.
    if (!arrival || (arrival && departure)) {
      setArrival(day);
      setDeparture(null);
      return;
    }
    // Zweiter Klick: späterer Tag → Abreise, sonst Auswahl neu starten.
    if (diffDays(arrival, day) > 0) {
      setDeparture(day);
    } else {
      setArrival(day);
      setDeparture(null);
    }
  }

  /* ── Monats-Navigation ───────────────────────────────────────────────── */
  const atCurrentMonth =
    viewMonth.getFullYear() === today.getFullYear() &&
    viewMonth.getMonth() === today.getMonth();

  function prevMonth() {
    if (atCurrentMonth) return;
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  /* ── Kalenderraster (führende Leerzellen + Tage des Monats) ──────────── */
  const cells = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const lead = mondayIndex(new Date(year, month, 1));
    const total = daysInMonth(year, month);
    const out: (Date | null)[] = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= total; d++) out.push(new Date(year, month, d));
    return out;
  }, [viewMonth]);

  const nights = arrival && departure ? diffDays(arrival, departure) : 0;
  const canSubmit = Boolean(arrival && departure);

  /* Zustand einer einzelnen Tageszelle für das Styling. */
  function cellState(day: Date) {
    const past = diffDays(today, day) < 0;
    const isArrival = arrival != null && diffDays(arrival, day) === 0;
    const isDeparture = departure != null && diffDays(departure, day) === 0;
    const inRange =
      arrival != null &&
      departure != null &&
      diffDays(arrival, day) > 0 &&
      diffDays(day, departure) > 0;
    const isToday = diffDays(today, day) === 0;
    return { past, isArrival, isDeparture, inRange, isEnd: isArrival || isDeparture, isToday };
  }

  return (
    <>
      {/* ── Trigger-Button ───────────────────────────────────────────── */}
      <button
        type="button"
        onClick={openModal}
        className="group inline-flex items-center gap-2 rounded-none border px-6 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200"
        style={{
          fontFamily: "var(--sp-font-mono)",
          color: "var(--sp-bg)",
          backgroundColor: "var(--sp-text)",
          borderColor: "var(--sp-text)",
        }}
      >
        <span>Verfügbarkeit &amp; Buchung</span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
      </button>

      {/* ── Overlay / Modal ──────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Buchung — ${room.name}`}
          style={{ backgroundColor: "rgba(27, 26, 24, 0.55)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="sp-scroll relative my-auto w-full max-w-[440px] rounded-none border"
            style={{
              backgroundColor: "var(--sp-surface)",
              borderColor: "var(--sp-line)",
              maxHeight: "calc(100vh - 2rem)",
              overflowY: "auto",
              animation: "sp-fade-up 0.35s ease both",
            }}
          >
            {/* X-Button */}
            <button
              type="button"
              onClick={close}
              aria-label="Schließen"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-none border text-lg leading-none transition-colors duration-200 hover:border-current"
              style={{
                fontFamily: "var(--sp-font-mono)",
                color: "var(--sp-text)",
                borderColor: "var(--sp-line)",
                backgroundColor: "var(--sp-surface)",
              }}
            >
              &times;
            </button>

            {sent ? (
              /* ── Bestätigung ───────────────────────────────────────── */
              <div className="px-7 py-10 sm:px-9">
                <span
                  className="block text-[10px] uppercase tracking-[0.2em]"
                  style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}
                >
                  Anfrage eingegangen
                </span>
                <p
                  className="mt-4 text-lg font-medium leading-snug tracking-tight"
                  style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}
                >
                  Vielen Dank &mdash; wir prüfen die Verfügbarkeit für{" "}
                  <span style={{ color: "var(--sp-accent)" }}>{room.name}</span> vom{" "}
                  {fmt(arrival)} bis {fmt(departure)} ({guests}{" "}
                  {guests === 1 ? "Gast" : "Gäste"}) und melden uns persönlich.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-none px-8 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 hover:opacity-90"
                  style={{
                    fontFamily: "var(--sp-font-mono)",
                    color: "#F7F5F1",
                    backgroundColor: "var(--sp-accent)",
                  }}
                >
                  Schließen
                </button>
              </div>
            ) : (
              /* ── Buchungs-UI ───────────────────────────────────────── */
              <div className="px-7 py-9 sm:px-9">
                {/* Kopf */}
                <span
                  className="block text-[10px] uppercase tracking-[0.2em]"
                  style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}
                >
                  Verfügbarkeit
                </span>
                <h2
                  className="mt-3 pr-10 text-2xl font-medium leading-[1.05] tracking-tight sm:text-3xl"
                  style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}
                >
                  {room.name}
                </h2>
                <p
                  className="mt-2 text-[12px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
                >
                  ab {formatPrice(room.price)} / Nacht
                </p>

                {/* ── Kalender ────────────────────────────────────────── */}
                <div className="mt-8">
                  {/* Monats-Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevMonth}
                      disabled={atCurrentMonth}
                      aria-label="Vorheriger Monat"
                      className="flex h-9 w-9 items-center justify-center rounded-none border text-base leading-none transition-colors duration-200 hover:border-current disabled:cursor-default disabled:opacity-25"
                      style={{
                        fontFamily: "var(--sp-font-mono)",
                        color: "var(--sp-text)",
                        borderColor: "var(--sp-line)",
                      }}
                    >
                      &lsaquo;
                    </button>
                    <span
                      className="text-[13px] uppercase tracking-[0.16em]"
                      style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}
                      aria-live="polite"
                    >
                      {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                    </span>
                    <button
                      type="button"
                      onClick={nextMonth}
                      aria-label="Nächster Monat"
                      className="flex h-9 w-9 items-center justify-center rounded-none border text-base leading-none transition-colors duration-200 hover:border-current"
                      style={{
                        fontFamily: "var(--sp-font-mono)",
                        color: "var(--sp-text)",
                        borderColor: "var(--sp-line)",
                      }}
                    >
                      &rsaquo;
                    </button>
                  </div>

                  {/* Wochentags-Kopf */}
                  <div className="mt-6 grid grid-cols-7">
                    {WEEKDAYS.map((wd) => (
                      <div
                        key={wd}
                        className="pb-2 text-center text-[10px] uppercase tracking-[0.12em]"
                        style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
                      >
                        {wd}
                      </div>
                    ))}
                  </div>

                  {/* Hairline unter dem Wochentags-Kopf */}
                  <div className="h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />

                  {/* Tage-Grid */}
                  <div className="mt-1 grid grid-cols-7">
                    {cells.map((day, idx) => {
                      if (!day) return <div key={`e-${idx}`} aria-hidden className="aspect-square" />;
                      const s = cellState(day);
                      const selectable = !s.past;

                      let bg = "transparent";
                      let color = "var(--sp-text)";
                      let fontWeight: number = 400;
                      if (s.isEnd) {
                        bg = "var(--sp-accent)";
                        color = "#F7F5F1";
                        fontWeight = 600;
                      } else if (s.inRange) {
                        bg = "var(--sp-soft)";
                        color = "var(--sp-text)";
                      } else if (s.past) {
                        color = "var(--sp-line)";
                      }

                      return (
                        <button
                          key={day.toISOString()}
                          type="button"
                          disabled={!selectable}
                          onClick={() => pickDay(day)}
                          aria-label={fmt(day)}
                          aria-pressed={s.isEnd || s.inRange}
                          className="relative flex aspect-square items-center justify-center rounded-none text-[15px] transition-colors duration-150 disabled:cursor-default"
                          style={{
                            fontFamily: "var(--sp-font-display)",
                            backgroundColor: bg,
                            color,
                            fontWeight,
                            opacity: s.past ? 0.45 : 1,
                          }}
                        >
                          {day.getDate()}
                          {/* Heute-Markierung — dezenter Terrakotta-Punkt */}
                          {s.isToday && !s.isEnd && (
                            <span
                              aria-hidden
                              className="absolute bottom-[5px] h-[3px] w-[3px] rounded-none"
                              style={{ backgroundColor: "var(--sp-accent)" }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Auswahl-Status */}
                  <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--sp-line)" }}>
                    {canSubmit ? (
                      <p
                        className="text-[12px] uppercase tracking-[0.12em]"
                        style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}
                      >
                        Anreise: {fmt(arrival)}
                        <span style={{ color: "var(--sp-muted)" }}> &middot; </span>
                        Abreise: {fmt(departure)}
                        <span style={{ color: "var(--sp-muted)" }}> &middot; </span>
                        <span style={{ color: "var(--sp-accent)" }}>
                          {nights} {nights === 1 ? "Nacht" : "Nächte"}
                        </span>
                      </p>
                    ) : arrival ? (
                      <p
                        className="text-[12px] uppercase tracking-[0.12em]"
                        style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
                      >
                        Anreise: {fmt(arrival)}
                        <span> &middot; </span>
                        <span style={{ color: "var(--sp-text)" }}>Abreise wählen</span>
                      </p>
                    ) : (
                      <p
                        className="text-[12px] uppercase tracking-[0.12em]"
                        style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
                      >
                        Bitte Anreise &amp; Abreise wählen
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Gäste-Stepper ───────────────────────────────────── */}
                <div className="mt-7">
                  <span
                    className="block text-[10px] uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
                  >
                    Gäste
                  </span>
                  <div
                    className="mt-3 flex items-center justify-between border-b pb-3"
                    style={{ borderColor: "var(--sp-line)" }}
                  >
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      aria-label="Gäste verringern"
                      disabled={guests <= 1}
                      className="flex h-9 w-9 items-center justify-center rounded-none border text-base leading-none transition-colors duration-200 hover:border-current disabled:opacity-30"
                      style={{
                        fontFamily: "var(--sp-font-mono)",
                        color: "var(--sp-text)",
                        borderColor: "var(--sp-line)",
                      }}
                    >
                      &minus;
                    </button>
                    <span
                      className="text-[17px] tabular-nums"
                      style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}
                      aria-live="polite"
                    >
                      {String(guests).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(99, g + 1))}
                      aria-label="Gäste erhöhen"
                      className="flex h-9 w-9 items-center justify-center rounded-none border text-base leading-none transition-colors duration-200 hover:border-current"
                      style={{
                        fontFamily: "var(--sp-font-mono)",
                        color: "var(--sp-text)",
                        borderColor: "var(--sp-line)",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ── Absenden ────────────────────────────────────────── */}
                <button
                  type="button"
                  onClick={() => canSubmit && setSent(true)}
                  disabled={!canSubmit}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-none px-8 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 enabled:hover:opacity-90 disabled:cursor-default disabled:opacity-35"
                  style={{
                    fontFamily: "var(--sp-font-mono)",
                    color: "#F7F5F1",
                    backgroundColor: "var(--sp-accent)",
                  }}
                >
                  <span className="transition-transform duration-200">&rarr;</span> Anfrage senden
                </button>

                {(arrival || departure) && (
                  <button
                    type="button"
                    onClick={resetSelection}
                    className="mt-4 block w-full text-center text-[10px] uppercase tracking-[0.16em] transition-colors duration-200 hover:text-current"
                    style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
                  >
                    Auswahl zurücksetzen
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
