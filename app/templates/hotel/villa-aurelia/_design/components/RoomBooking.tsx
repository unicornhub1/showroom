"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { formatPrice } from "../data";

/* ── VILLA AURELIA — Zimmer-Buchung (Kalender-Modal) ────────────────────────
   Edles, gold-gerahmtes Couture-Buchungs-Panel. Trigger-Button öffnet ein
   Overlay mit Monats-Kalender (Montag-Start, Range-Auswahl Anreise→Abreise),
   Gäste-Stepper und „Anfrage senden". Gold (--va-gold) markiert die Auswahl,
   Playfair-Überschrift, .va-btn-gold-Senden-Button, .va-ornament-Divider.
   Designvorlage — kein echtes Backend.
─────────────────────────────────────────────────────────────────────────── */

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

/* Tag auf Mitternacht normalisieren (lokale Zeit), für stabile Vergleiche. */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/* Stabiler Tages-Schlüssel YYYY-M-D (kein UTC-Versatz). */
function dayKey(d: Date): number {
  return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
}

/* Datum als TT.MM.JJJJ (deutsch). */
function formatDE(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}

/* Nächte zwischen zwei Tagen (ganze Tage). */
function nightsBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / 86_400_000);
}

/* Wochentag des Monatsersten als Montag-basierter Index (Mo=0 … So=6). */
function leadingBlanks(year: number, month: number): number {
  const jsDay = new Date(year, month, 1).getDay(); // So=0 … Sa=6
  return (jsDay + 6) % 7;
}

const LABEL_STYLE: CSSProperties = {
  fontFamily: "var(--va-font-sans)",
  color: "var(--va-gold)",
  textTransform: "uppercase",
  letterSpacing: "0.22em",
  fontSize: "10px",
  fontWeight: 500,
};

export default function RoomBooking({ room }: { room: { name: string; price: number } }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [guests, setGuests] = useState(2);

  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const [arrival, setArrival] = useState<Date | null>(null);
  const [departure, setDeparture] = useState<Date | null>(null);

  /* Body-Scroll sperren + ESC-Schließen, solange das Overlay offen ist. */
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
    // Frischer Start bei jedem Öffnen.
    setSent(false);
    setGuests(2);
    setArrival(null);
    setDeparture(null);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setOpen(true);
  }

  function selectDay(day: Date) {
    const d = startOfDay(day);
    if (dayKey(d) < dayKey(today)) return; // Vergangenheit gesperrt

    if (!arrival || (arrival && departure)) {
      // Neue Auswahl starten
      setArrival(d);
      setDeparture(null);
      return;
    }
    // arrival gesetzt, departure noch offen
    if (dayKey(d) > dayKey(arrival)) {
      setDeparture(d);
    } else {
      // früherer oder gleicher Tag → Auswahl neu beginnen
      setArrival(d);
      setDeparture(null);
    }
  }

  function prevMonth() {
    // Nicht in Monate vor dem aktuellen Monat zurück.
    if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const atMinMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const blanks = leadingBlanks(viewYear, viewMonth);

  const nights = arrival && departure ? nightsBetween(arrival, departure) : 0;
  const canSubmit = Boolean(arrival && departure);

  return (
    <>
      <button type="button" onClick={openModal} className="va-btn-gold px-7 py-3">
        Verfügbarkeit &amp; Buchung
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto va-scroll"
          style={{ background: "rgba(15,22,18,0.62)", backdropFilter: "blur(3px)" }}
          onMouseDown={(e) => {
            // Nur schließen, wenn direkt auf den Backdrop geklickt wird.
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Buchung — ${room.name}`}
            className="relative my-6 w-full max-w-md sm:my-10"
            style={{
              background: "var(--va-deep)",
              boxShadow: "0 40px 90px -30px rgba(0,0,0,0.7)",
            }}
          >
            {/* Gold-Haarlinien-Rahmen (Couture-Inset) */}
            <div
              aria-hidden
              className="pointer-events-none absolute z-[1]"
              style={{ inset: "10px", border: "1px solid rgba(183,146,87,0.55)" }}
            />

            {/* Schließen */}
            <button
              type="button"
              onClick={close}
              aria-label="Schließen"
              className="absolute right-5 top-5 z-[3] flex h-9 w-9 items-center justify-center transition-colors duration-300"
              style={{
                border: "1px solid rgba(183,146,87,0.5)",
                color: "var(--va-gold)",
                fontFamily: "var(--va-font-sans)",
                fontSize: "18px",
                lineHeight: 1,
                background: "transparent",
              }}
            >
              &times;
            </button>

            <div className="relative z-[2] p-7 sm:p-9">
              {sent ? (
                /* ── Bestätigung ───────────────────────────────────────── */
                <div className="py-6 text-center">
                  <div aria-hidden className="mx-auto mb-6 va-ornament" style={{ maxWidth: "220px" }}>
                    <span className="va-ornament__mark">&#9670;</span>
                  </div>
                  <p
                    className="text-2xl italic leading-snug sm:text-3xl"
                    style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4" }}
                  >
                    Vielen Dank
                  </p>
                  <p
                    className="mx-auto mt-5 max-w-sm text-[15px] leading-relaxed"
                    style={{
                      fontFamily: "var(--va-font-sans)",
                      color: "rgba(250,248,244,0.78)",
                      fontWeight: 300,
                    }}
                  >
                    Wir prüfen die Verfügbarkeit für{" "}
                    <span style={{ color: "var(--va-gold)" }}>{room.name}</span> vom{" "}
                    {arrival ? formatDE(arrival) : ""} bis {departure ? formatDE(departure) : ""}{" "}
                    ({guests} {guests === 1 ? "Gast" : "Gäste"}) und melden uns persönlich.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="va-btn-gold va-btn-gold--ondark mt-8 px-9 py-3.5"
                  >
                    Schließen
                  </button>
                </div>
              ) : (
                <>
                  {/* ── Kopf ────────────────────────────────────────────── */}
                  <div className="pr-10">
                    <span className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-gold)" }}>
                      Verfügbarkeit &amp; Buchung
                    </span>
                    <h2
                      className="mt-4 text-3xl sm:text-4xl"
                      style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4" }}
                    >
                      {room.name}
                    </h2>
                    <p
                      className="mt-2 text-sm"
                      style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.7)", fontWeight: 300 }}
                    >
                      ab{" "}
                      <span style={{ color: "var(--va-gold)" }}>{formatPrice(room.price)}</span> / Nacht
                    </p>
                  </div>

                  <div className="my-7 va-ornament" aria-hidden>
                    <span className="va-ornament__mark">&#9670;</span>
                  </div>

                  {/* ── Kalender ────────────────────────────────────────── */}
                  <div>
                    {/* Monats-Navigation */}
                    <div className="mb-5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={prevMonth}
                        disabled={atMinMonth}
                        aria-label="Vorheriger Monat"
                        className="flex h-9 w-9 items-center justify-center transition-colors duration-300"
                        style={{
                          border: "1px solid rgba(183,146,87,0.5)",
                          color: "var(--va-gold)",
                          fontFamily: "var(--va-font-sans)",
                          fontSize: "16px",
                          lineHeight: 1,
                          background: "transparent",
                          opacity: atMinMonth ? 0.3 : 1,
                          cursor: atMinMonth ? "not-allowed" : "pointer",
                        }}
                      >
                        &lsaquo;
                      </button>
                      <span
                        aria-live="polite"
                        style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4", fontSize: "19px" }}
                      >
                        {MONTHS[viewMonth]} {viewYear}
                      </span>
                      <button
                        type="button"
                        onClick={nextMonth}
                        aria-label="Nächster Monat"
                        className="flex h-9 w-9 items-center justify-center transition-colors duration-300"
                        style={{
                          border: "1px solid rgba(183,146,87,0.5)",
                          color: "var(--va-gold)",
                          fontFamily: "var(--va-font-sans)",
                          fontSize: "16px",
                          lineHeight: 1,
                          background: "transparent",
                        }}
                      >
                        &rsaquo;
                      </button>
                    </div>

                    {/* Wochentags-Kopf */}
                    <div className="grid grid-cols-7 gap-1">
                      {WEEKDAYS.map((w) => (
                        <div
                          key={w}
                          className="py-1 text-center"
                          style={{
                            fontFamily: "var(--va-font-sans)",
                            color: "rgba(250,248,244,0.45)",
                            fontSize: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                          }}
                        >
                          {w}
                        </div>
                      ))}
                    </div>

                    {/* Tage */}
                    <div className="mt-1 grid grid-cols-7 gap-1">
                      {Array.from({ length: blanks }).map((_, i) => (
                        <div key={`blank-${i}`} aria-hidden />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = new Date(viewYear, viewMonth, i + 1);
                        const k = dayKey(day);
                        const isPast = k < dayKey(today);
                        const isArrival = arrival !== null && k === dayKey(arrival);
                        const isDeparture = departure !== null && k === dayKey(departure);
                        const inRange =
                          arrival !== null &&
                          departure !== null &&
                          k > dayKey(arrival) &&
                          k < dayKey(departure);
                        const isEdge = isArrival || isDeparture;

                        let bg = "transparent";
                        let color = "rgba(250,248,244,0.85)";
                        let border = "1px solid transparent";
                        if (isEdge) {
                          bg = "var(--va-gold)";
                          color = "var(--va-deep)";
                        } else if (inRange) {
                          bg = "rgba(183,146,87,0.22)";
                          color = "#FAF8F4";
                          border = "1px solid rgba(183,146,87,0.4)";
                        }
                        if (isPast) {
                          color = "rgba(250,248,244,0.2)";
                        }

                        return (
                          <button
                            key={k}
                            type="button"
                            disabled={isPast}
                            onClick={() => selectDay(day)}
                            aria-label={formatDE(day)}
                            aria-pressed={isEdge || inRange}
                            className="flex aspect-square items-center justify-center text-sm transition-colors duration-200"
                            style={{
                              fontFamily: "var(--va-font-sans)",
                              fontWeight: isEdge ? 600 : 300,
                              background: bg,
                              color,
                              border,
                              cursor: isPast ? "not-allowed" : "pointer",
                            }}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>

                    {/* Auswahl-Zusammenfassung */}
                    <div className="mt-5 text-center">
                      {arrival && departure ? (
                        <p
                          style={{
                            fontFamily: "var(--va-font-sans)",
                            color: "rgba(250,248,244,0.85)",
                            fontSize: "13px",
                            letterSpacing: "0.02em",
                          }}
                        >
                          Anreise:{" "}
                          <span style={{ color: "var(--va-gold)" }}>{formatDE(arrival)}</span> &middot;
                          Abreise:{" "}
                          <span style={{ color: "var(--va-gold)" }}>{formatDE(departure)}</span> &middot;{" "}
                          {nights} {nights === 1 ? "Nacht" : "Nächte"}
                        </p>
                      ) : arrival ? (
                        <p
                          style={{
                            fontFamily: "var(--va-font-sans)",
                            color: "rgba(250,248,244,0.7)",
                            fontSize: "13px",
                          }}
                        >
                          Anreise:{" "}
                          <span style={{ color: "var(--va-gold)" }}>{formatDE(arrival)}</span> &middot;
                          jetzt Abreise wählen
                        </p>
                      ) : (
                        <p
                          style={{
                            fontFamily: "var(--va-font-sans)",
                            color: "rgba(250,248,244,0.5)",
                            fontSize: "13px",
                            fontWeight: 300,
                            fontStyle: "italic",
                          }}
                        >
                          Bitte Anreise &amp; Abreise wählen
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ── Gäste-Stepper ───────────────────────────────────── */}
                  <div
                    className="mt-7 flex items-center justify-between border-t pt-6"
                    style={{ borderColor: "rgba(183,146,87,0.25)" }}
                  >
                    <span style={LABEL_STYLE}>Gäste</span>
                    <div className="flex items-center gap-5">
                      <button
                        type="button"
                        aria-label="Weniger Gäste"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="flex h-9 w-9 items-center justify-center transition-colors duration-300"
                        style={{
                          border: "1px solid rgba(183,146,87,0.5)",
                          color: "var(--va-gold)",
                          fontFamily: "var(--va-font-sans)",
                          fontSize: "18px",
                          lineHeight: 1,
                          background: "transparent",
                        }}
                      >
                        &minus;
                      </button>
                      <span
                        aria-live="polite"
                        className="min-w-[2ch] text-center"
                        style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4", fontSize: "20px" }}
                      >
                        {guests}
                      </span>
                      <button
                        type="button"
                        aria-label="Mehr Gäste"
                        onClick={() => setGuests((g) => g + 1)}
                        className="flex h-9 w-9 items-center justify-center transition-colors duration-300"
                        style={{
                          border: "1px solid rgba(183,146,87,0.5)",
                          color: "var(--va-gold)",
                          fontFamily: "var(--va-font-sans)",
                          fontSize: "18px",
                          lineHeight: 1,
                          background: "transparent",
                        }}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>

                  {/* ── Absenden ────────────────────────────────────────── */}
                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={() => setSent(true)}
                    className="va-btn-gold va-btn-gold--ondark mt-7 w-full px-10 py-4"
                    style={{
                      opacity: canSubmit ? 1 : 0.4,
                      cursor: canSubmit ? "pointer" : "not-allowed",
                    }}
                  >
                    Anfrage senden
                  </button>
                  <p
                    className="mt-4 text-center text-[12px]"
                    style={{
                      fontFamily: "var(--va-font-sans)",
                      color: "rgba(250,248,244,0.5)",
                      fontWeight: 300,
                    }}
                  >
                    Unverbindlich &middot; persönliche Antwort innerhalb 24&nbsp;h
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
