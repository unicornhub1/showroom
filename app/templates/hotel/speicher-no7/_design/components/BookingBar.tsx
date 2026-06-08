"use client";

import { useState, type FormEvent } from "react";

/* ── SPEICHER No.7 — Buchungs-/Reservierungs-Leiste ────────────────────────
   Scharfe, architektonische Buchungs-BAR im Template-Stil:
   full-width Band, Zellen durch Haarlinien getrennt, Mono-Labels (uppercase),
   Underline-Inputs statt Boxen, rounded-none, Terrakotta-Akzent.
   Designvorlage — kein echtes Backend.
─────────────────────────────────────────────────────────────────────────── */

const ANLIEGEN = ["Übernachtung", "Tisch", "Hochzeit / Event"] as const;

/* Wiederverwendbares Mono-Label über jeder Zelle */
function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[10px] uppercase tracking-[0.2em]"
      style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}
    >
      {children}
    </span>
  );
}

export default function BookingBar() {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(2);
  const [concern, setConcern] = useState<(typeof ANLIEGEN)[number]>("Übernachtung");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  function reset() {
    setSent(false);
    setArrival("");
    setDeparture("");
    setGuests(2);
    setConcern("Übernachtung");
  }

  /* Underline-Input-Stil — kein Browser-Default-Look */
  const inputClass =
    "mt-3 w-full rounded-none border-0 border-b bg-transparent pb-2 text-[15px] outline-none transition-colors duration-200 focus:border-current";
  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--sp-font-sans)",
    color: "var(--sp-text)",
    borderColor: "var(--sp-line)",
  };

  return (
    <div
      className="rounded-none border"
      style={{ backgroundColor: "var(--sp-surface)", borderColor: "var(--sp-line)" }}
    >
      {sent ? (
        /* ── Bestätigung ──────────────────────────────────────────────── */
        <div className="flex flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <span
              className="block text-[10px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}
            >
              Anfrage eingegangen
            </span>
            <p
              className="mt-3 max-w-xl text-lg font-medium leading-snug tracking-tight"
              style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}
            >
              Vielen Dank &mdash; wir melden uns persönlich innerhalb von 24&nbsp;Stunden.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="group inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}
          >
            <span className="border-b border-transparent pb-1 transition-colors duration-200 group-hover:border-current">
              Neue Anfrage
            </span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </button>
        </div>
      ) : (
        /* ── Buchungs-Bar ─────────────────────────────────────────────── */
        <form onSubmit={handleSubmit}>
          {/* Zellen-Band: Haarlinien via gap-px auf Linien-Hintergrund.
              Mobil gestapelt (1 Spalte), ab sm 2, ab lg 4 + Button. */}
          <div
            className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr_auto]"
            style={{ backgroundColor: "var(--sp-line)" }}
          >
            {/* Anreise */}
            <div className="px-6 py-6 lg:px-8" style={{ backgroundColor: "var(--sp-surface)" }}>
              <CellLabel>Anreise</CellLabel>
              <input
                type="date"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                required
                aria-label="Anreise"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* Abreise */}
            <div className="px-6 py-6 lg:px-8" style={{ backgroundColor: "var(--sp-surface)" }}>
              <CellLabel>Abreise</CellLabel>
              <input
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                min={arrival || undefined}
                aria-label="Abreise"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* Gäste — Stepper */}
            <div className="px-6 py-6 lg:px-8" style={{ backgroundColor: "var(--sp-surface)" }}>
              <CellLabel>Gäste</CellLabel>
              <div
                className="mt-3 flex items-center justify-between border-b pb-2"
                style={{ borderColor: "var(--sp-line)" }}
              >
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  aria-label="Gäste verringern"
                  className="flex h-7 w-7 items-center justify-center rounded-none border text-base leading-none transition-colors duration-200 hover:border-current disabled:opacity-30"
                  style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)", borderColor: "var(--sp-line)" }}
                  disabled={guests <= 1}
                >
                  &minus;
                </button>
                <span
                  className="text-[15px] tabular-nums"
                  style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}
                  aria-live="polite"
                >
                  {String(guests).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(99, g + 1))}
                  aria-label="Gäste erhöhen"
                  className="flex h-7 w-7 items-center justify-center rounded-none border text-base leading-none transition-colors duration-200 hover:border-current"
                  style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)", borderColor: "var(--sp-line)" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Anliegen — Select */}
            <div className="px-6 py-6 lg:px-8" style={{ backgroundColor: "var(--sp-surface)" }}>
              <CellLabel>Anliegen</CellLabel>
              <select
                value={concern}
                onChange={(e) => setConcern(e.target.value as (typeof ANLIEGEN)[number])}
                aria-label="Anliegen"
                className={`${inputClass} appearance-none`}
                style={inputStyle}
              >
                {ANLIEGEN.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Button-Zelle */}
            <div style={{ backgroundColor: "var(--sp-surface)" }}>
              <button
                type="submit"
                className="flex h-full w-full items-center justify-center gap-2 px-8 py-6 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 hover:opacity-90"
                style={{
                  fontFamily: "var(--sp-font-mono)",
                  color: "#F7F5F1",
                  backgroundColor: "var(--sp-accent)",
                }}
              >
                <span className="transition-transform duration-200">&rarr;</span> Anfrage senden
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
