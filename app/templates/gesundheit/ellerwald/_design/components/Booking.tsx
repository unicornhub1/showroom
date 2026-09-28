"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { VISIT_TYPES } from "../data";

/* Terminbuchung als Demo: Anliegen → Tag & Uhrzeit → Angaben → Bestätigung.
   Freie Zeiten werden aus dem heutigen Datum erzeugt (deterministisch), damit
   der Kalender immer aktuell aussieht. Es wird nichts gesendet. */

const noopSubscribe = () => () => {};
const WEEKDAY_SLOTS = ["10:00", "10:45", "11:30", "12:15", "14:00", "14:45", "15:30", "16:15", "17:00"];
const SATURDAY_SLOTS = ["10:00", "10:45", "11:30", "12:15", "14:00", "14:45"];
const STEPS = ["Anliegen", "Datum und Uhrzeit", "Ihre Angaben"];

type Day = { key: string; date: Date; slots: { time: string; free: boolean }[] };

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function buildDays(todayKey: string): Day[] {
  if (!todayKey) return [];
  const start = new Date(todayKey);
  const days: Day[] = [];
  const d = new Date(start);
  d.setDate(d.getDate() + 1);
  while (days.length < 12) {
    if (d.getDay() !== 0) {
      const key = d.toISOString().slice(0, 10);
      const base = d.getDay() === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS;
      const slots = base.map((time) => ({
        time,
        free: days.length > 0 && hash(key + time) % 5 > 1,
      }));
      days.push({ key, date: new Date(d), slots });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

const fmtWeekday = new Intl.DateTimeFormat("de-DE", { weekday: "short" });
const fmtDay = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "short" });
const fmtLong = new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export default function Booking() {
  const todayKey = useSyncExternalStore(noopSubscribe, () => new Date().toDateString(), () => "");
  const days = useMemo(() => buildDays(todayKey), [todayKey]);

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", insurance: "Privat versichert", note: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, done]);

  const visit = VISIT_TYPES.find((v) => v.id === type);
  const firstFreeDay = days.find((d) => d.slots.some((s) => s.free));
  const day = days.find((d) => d.key === (dayKey ?? firstFreeDay?.key));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Bitte geben Sie Ihren Namen an.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Bitte prüfen Sie Ihre E-Mail-Adresse.";
    if (!form.consent) next.consent = "Bitte bestätigen Sie die Datenschutzhinweise.";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  };

  const reset = () => {
    setDone(false);
    setStep(0);
    setType(null);
    setDayKey(null);
    setTime(null);
    setForm({ name: "", email: "", phone: "", insurance: "Privat versichert", note: "", consent: false });
    setErrors({});
  };

  if (done && visit && day && time) {
    return (
      <div className="ew-step-in rounded-[3px] p-7 sm:p-10" style={{ background: "var(--ew-leinen)" }}>
        <h2 ref={headingRef} tabIndex={-1} className="ew-h2 scroll-mt-28 outline-none">
          Ihr Termin ist vorgemerkt.
        </h2>
        <p className="ew-body mt-4 max-w-lg">
          Sie erhalten gleich eine Bestätigung an {form.email} und einige Tage vorher den Fragebogen für das erste Gespräch.
        </p>
        <dl className="ew-sans mt-8 grid gap-x-10 gap-y-5 text-[0.95rem] sm:grid-cols-2">
          {[
            ["Anliegen", `${visit.label}, ${visit.minutes} Minuten`],
            ["Datum", fmtLong.format(day.date)],
            ["Uhrzeit", `${time} Uhr`],
            ["Für", form.name],
          ].map(([k, v]) => (
            <div key={k} className="border-t pt-3" style={{ borderColor: "var(--ew-linie)" }}>
              <dt style={{ color: "var(--ew-stein)" }}>{k}</dt>
              <dd className="mt-1" style={{ color: "var(--ew-pflaume)" }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <p className="ew-meta mt-8">Hinweis: Dies ist eine Designvorlage. Es wurde kein echter Termin gebucht.</p>
        <button type="button" onClick={reset} className="ew-btn ew-btn--quiet mt-6">
          Weiteren Termin wählen
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Fortschritt */}
      <ol className="ew-sans mb-10 grid grid-cols-3 gap-3 text-[0.82rem]" aria-label="Schritte der Buchung">
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <span
              className="block h-[2px] transition-colors duration-500"
              style={{ background: i <= step ? "var(--ew-krapp)" : "var(--ew-linie)" }}
            />
            <span
              className="mt-3 block"
              style={{ color: i === step ? "var(--ew-pflaume)" : "var(--ew-stein)" }}
            >
              <span className="sr-only">Schritt {i + 1}: </span>
              {label}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div key="s0" className="ew-step-in">
          <h2 ref={headingRef} tabIndex={-1} className="ew-h3 scroll-mt-28 outline-none">
            Worum geht es?
          </h2>
          <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Anliegen">
            {VISIT_TYPES.map((v) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={type === v.id}
                className="ew-choice"
                onClick={() => {
                  setType(v.id);
                  setStep(1);
                }}
              >
                <span>
                  <span className="ew-serif block text-[1.25rem] leading-tight">{v.label}</span>
                  <span className="ew-sans mt-1 block text-[0.88rem]" style={{ color: "var(--ew-stein)" }}>
                    {v.text}
                  </span>
                </span>
                <span className="ew-sans whitespace-nowrap text-[0.88rem]" style={{ color: "var(--ew-pflaume-2)" }}>
                  {v.minutes} Min.
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div key="s1" className="ew-step-in">
          <div className="flex items-baseline justify-between gap-4">
            <h2 ref={headingRef} tabIndex={-1} className="ew-h3 scroll-mt-28 outline-none">
              Wann passt es Ihnen?
            </h2>
            <button type="button" className="ew-link text-[0.88rem]" onClick={() => setStep(0)}>
              Anliegen ändern
            </button>
          </div>
          {visit && (
            <p className="ew-meta mt-2">
              {visit.label}, {visit.minutes} Minuten
            </p>
          )}

          <div className="ew-scroll-x -mx-5 mt-7 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {days.length === 0 &&
              Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="ew-day h-[74px] animate-pulse" aria-hidden="true" />
              ))}
            {days.map((d) => {
              const free = d.slots.filter((s) => s.free).length;
              const selected = day?.key === d.key;
              return (
                <button
                  key={d.key}
                  type="button"
                  className="ew-day"
                  aria-pressed={selected}
                  disabled={free === 0}
                  onClick={() => {
                    setDayKey(d.key);
                    setTime(null);
                  }}
                  aria-label={`${fmtLong.format(d.date)}, ${free === 0 ? "ausgebucht" : `${free} freie Zeiten`}`}
                >
                  <span className="text-[0.78rem] opacity-70">{fmtWeekday.format(d.date)}</span>
                  <span className="text-[0.98rem] font-medium">{fmtDay.format(d.date)}</span>
                  <span className="text-[0.72rem] opacity-60">{free === 0 ? "voll" : `${free} frei`}</span>
                </button>
              );
            })}
          </div>

          {day && (
            <div key={day.key} className="ew-step-in mt-8">
              <p className="ew-sans text-[0.9rem]" style={{ color: "var(--ew-pflaume-2)" }}>
                {fmtLong.format(day.date)}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {day.slots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    className="ew-slot"
                    disabled={!s.free}
                    aria-pressed={time === s.time}
                    onClick={() => setTime(s.time)}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button type="button" className="ew-btn" disabled={!time} onClick={() => setStep(2)}>
              Weiter zu Ihren Angaben
            </button>
            {time && day && (
              <span className="ew-sans text-[0.9rem]" style={{ color: "var(--ew-pflaume-2)" }}>
                {fmtDay.format(day.date)}, {time} Uhr
              </span>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <form key="s2" className="ew-step-in" onSubmit={submit} noValidate>
          <div className="flex items-baseline justify-between gap-4">
            <h2 ref={headingRef} tabIndex={-1} className="ew-h3 scroll-mt-28 outline-none">
              Ihre Angaben
            </h2>
            <button type="button" className="ew-link text-[0.88rem]" onClick={() => setStep(1)}>
              Zeit ändern
            </button>
          </div>
          {visit && day && time && (
            <p className="ew-meta mt-2">
              {visit.label} am {fmtLong.format(day.date)} um {time} Uhr
            </p>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="ew-field sm:col-span-2">
              <label htmlFor="ew-name">Vor- und Nachname</label>
              <input
                id="ew-name"
                className="ew-input"
                autoComplete="name"
                value={form.name}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "ew-name-err" : undefined}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <p id="ew-name-err" className="ew-sans text-[0.84rem]" style={{ color: "var(--ew-krapp)" }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div className="ew-field">
              <label htmlFor="ew-email">E-Mail</label>
              <input
                id="ew-email"
                type="email"
                className="ew-input"
                autoComplete="email"
                value={form.email}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "ew-email-err" : undefined}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p id="ew-email-err" className="ew-sans text-[0.84rem]" style={{ color: "var(--ew-krapp)" }}>
                  {errors.email}
                </p>
              )}
            </div>
            <div className="ew-field">
              <label htmlFor="ew-phone">Telefon (optional)</label>
              <input
                id="ew-phone"
                type="tel"
                className="ew-input"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <fieldset className="ew-field sm:col-span-2">
              <legend className="ew-label mb-2">Versicherung</legend>
              <div className="flex flex-wrap gap-2">
                {["Privat versichert", "Selbstzahlerin", "Beihilfe"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="ew-choice w-auto px-4 py-3 text-[0.92rem]"
                    aria-pressed={form.insurance === opt}
                    onClick={() => setForm({ ...form, insurance: opt })}
                  >
                    <span className="ew-sans">{opt}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="ew-field sm:col-span-2">
              <label htmlFor="ew-note">Möchten Sie vorab etwas mitteilen? (optional)</label>
              <textarea
                id="ew-note"
                className="ew-input"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="ew-sans flex items-start gap-3 text-[0.9rem] leading-relaxed" style={{ color: "var(--ew-pflaume-2)" }}>
                <input
                  type="checkbox"
                  className="mt-1 h-[18px] w-[18px] flex-none"
                  style={{ accentColor: "var(--ew-krapp)" }}
                  checked={form.consent}
                  aria-invalid={!!errors.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                Ich habe die Datenschutzhinweise gelesen und bin einverstanden, dass meine Angaben zur Terminvergabe gespeichert werden.
              </label>
              {errors.consent && (
                <p className="ew-sans mt-2 text-[0.84rem]" style={{ color: "var(--ew-krapp)" }}>
                  {errors.consent}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="ew-btn mt-9">
            Termin verbindlich anfragen
          </button>
        </form>
      )}
    </div>
  );
}
