"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CONCERNS, DAYTIMES, FOR_WHOM, WEEKDAYS } from "../data";

/* Terminanfrage als Demo. Ein Anliegen kann per ?anliegen=… vorausgewählt sein
   (Links aus „Womit kommst du zu mir?“). Es wird nichts gesendet. */

const OTHER = { id: "anderes", label: "Etwas anderes" };

export default function RequestForm() {
  const params = useSearchParams();
  const preset = CONCERNS.find((c) => c.id === params.get("anliegen"))?.id ?? null;

  const [concern, setConcern] = useState<string | null>(preset);
  const [who, setWho] = useState(FOR_WHOM[0]);
  const [days, setDays] = useState<string[]>([]);
  const [daytime, setDaytime] = useState(DAYTIMES[3]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const options = [...CONCERNS.map((c) => ({ id: c.id, label: c.label })), OTHER];
  const toggleDay = (d: string) => setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Wie heißt du?";
    if (!form.phone.trim() && !/^\S+@\S+\.\S+$/.test(form.email)) next.contact = "Gib bitte eine Telefonnummer oder eine gültige E-Mail-Adresse an.";
    if (!form.consent) next.consent = "Bitte bestätige die Datenschutzhinweise.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      window.setTimeout(() => doneRef.current?.focus(), 50);
    }
  };

  if (sent) {
    const label = options.find((o) => o.id === concern)?.label;
    return (
      <div className="gz-in rounded-[26px] p-7 sm:p-10" style={{ background: "var(--gz-kalk)" }}>
        <h2 ref={doneRef} tabIndex={-1} className="gz-h2 outline-none">
          Danke, {form.name.trim().split(" ")[0]}.
        </h2>
        <p className="gz-lead mt-5 max-w-lg">
          Ich melde mich innerhalb eines Werktags bei dir und schlage dir zwei, drei Termine vor.
        </p>
        <ul className="gz-sans mt-8 flex flex-wrap gap-2 text-[0.88rem]">
          {[label, who, days.length ? days.join(", ") : "alle Tage", daytime].filter(Boolean).map((x) => (
            <li key={x} className="rounded-full px-3.5 py-1.5" style={{ background: "var(--gz-salbei)" }}>
              {x}
            </li>
          ))}
        </ul>
        <p className="gz-meta mt-8">Hinweis: Dies ist eine Designvorlage. Die Anfrage wurde nicht gesendet.</p>
        <button
          type="button"
          className="gz-btn gz-btn--ghost mt-6"
          onClick={() => {
            setSent(false);
            setForm({ name: "", phone: "", email: "", message: "", consent: false });
          }}
        >
          Neue Anfrage
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-10">
      <fieldset>
        <legend className="gz-label">Worum geht es?</legend>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Anliegen">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={concern === o.id}
              className="gz-chip"
              onClick={() => setConcern(concern === o.id ? null : o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="gz-label">Für wen ist der Termin?</legend>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Für wen">
          {FOR_WHOM.map((w) => (
            <button key={w} type="button" role="radio" aria-checked={who === w} className="gz-chip" onClick={() => setWho(w)}>
              {w}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-10 sm:grid-cols-2">
        <fieldset>
          <legend className="gz-label">Welche Tage passen?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {WEEKDAYS.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={days.includes(d)}
                className="gz-chip w-12 justify-center px-0"
                onClick={() => toggleDay(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="gz-label">Zu welcher Tageszeit?</legend>
          <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Tageszeit">
            {DAYTIMES.map((t) => (
              <button key={t} type="button" role="radio" aria-checked={daytime === t} className="gz-chip" onClick={() => setDaytime(t)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="gz-field sm:col-span-2">
          <label htmlFor="gz-name">Dein Name</label>
          <input
            id="gz-name"
            className="gz-input"
            autoComplete="name"
            value={form.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "gz-name-err" : undefined}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && (
            <p id="gz-name-err" className="gz-sans text-[0.85rem] font-medium" style={{ color: "#8A4B2A" }}>
              {errors.name}
            </p>
          )}
        </div>
        <div className="gz-field">
          <label htmlFor="gz-phone">Telefon</label>
          <input
            id="gz-phone"
            type="tel"
            className="gz-input"
            autoComplete="tel"
            value={form.phone}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? "gz-contact-err" : undefined}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="gz-field">
          <label htmlFor="gz-email">E-Mail</label>
          <input
            id="gz-email"
            type="email"
            className="gz-input"
            autoComplete="email"
            value={form.email}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? "gz-contact-err" : undefined}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        {errors.contact && (
          <p id="gz-contact-err" className="gz-sans text-[0.85rem] font-medium sm:col-span-2" style={{ color: "#8A4B2A" }}>
            {errors.contact}
          </p>
        )}
        <div className="gz-field sm:col-span-2">
          <label htmlFor="gz-msg">Magst du kurz erzählen, worum es geht? (optional)</label>
          <textarea
            id="gz-msg"
            className="gz-input"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="gz-sans flex items-start gap-3 text-[0.92rem] leading-relaxed" style={{ color: "var(--gz-moos-2)" }}>
            <input
              type="checkbox"
              className="mt-1 h-[18px] w-[18px] flex-none"
              style={{ accentColor: "var(--gz-moos)" }}
              checked={form.consent}
              aria-invalid={!!errors.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            />
            Ich habe die Datenschutzhinweise gelesen. Meine Angaben werden nur zur Terminvergabe genutzt.
          </label>
          {errors.consent && (
            <p className="gz-sans mt-2 text-[0.85rem] font-medium" style={{ color: "#8A4B2A" }}>
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="gz-btn">
        Anfrage senden
      </button>
    </form>
  );
}
