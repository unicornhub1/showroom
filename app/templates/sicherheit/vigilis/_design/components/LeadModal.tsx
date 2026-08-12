'use client';

import { useState } from 'react';
import { X, Lock, Check, ShieldCheck } from 'lucide-react';
import { formatEuro } from '../data';

type Mode = 'unlock' | 'offer';

type Props = {
  mode: Mode;
  min: number;
  max: number;
  onClose: () => void;
  onSuccess: () => void;
};

const COPY: Record<Mode, { badge: string; title: string; text: string; cta: string }> = {
  unlock: {
    badge: 'Detailkalkulation',
    title: 'Aufschlüsselung freischalten',
    text: 'Sie erhalten die vollständige Positionsaufstellung mit Einsatzstunden, Stundensätzen und Zuschlägen — sofort auf dieser Seite und zusätzlich per E-Mail.',
    cta: 'Details freischalten',
  },
  offer: {
    badge: 'Angebotsanfrage',
    title: 'Verbindliches Angebot anfordern',
    text: 'Ein Sicherheitsberater prüft Ihre Konfiguration, stimmt offene Punkte mit Ihnen ab und erstellt ein Festpreisangebot — in der Regel innerhalb von 24 Stunden.',
    cta: 'Angebot anfordern',
  },
};

export function LeadModal({ mode, min, max, onClose, onSuccess }: Props) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    consent: false,
  });

  const copy = COPY[mode];
  const valid =
    form.company.trim() && form.name.trim() && form.email.trim() && form.consent;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSent(true);
    onSuccess();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
      style={{ backgroundColor: 'rgba(4, 6, 9, 0.86)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="vg-step-in relative my-8 w-full max-w-lg"
        style={{
          backgroundColor: 'var(--vg-surface)',
          border: '1px solid var(--vg-border-light)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center transition-colors"
          style={{ color: 'var(--vg-text-muted)' }}
          aria-label="Schließen"
        >
          <X className="h-5 w-5" />
        </button>

        {sent ? (
          /* ── Erfolg ───────────────────────────────────────────────────── */
          <div className="px-8 py-14 text-center">
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center"
              style={{
                border: '1.5px solid var(--vg-ok)',
                color: 'var(--vg-ok)',
              }}
            >
              <Check className="h-7 w-7" />
            </span>
            <h3
              className="mt-7 text-2xl"
              style={{
                fontFamily: 'var(--vg-font-display)',
                fontWeight: 700,
                color: 'var(--vg-text)',
              }}
            >
              {mode === 'unlock' ? 'Freigeschaltet' : 'Anfrage eingegangen'}
            </h3>
            <p
              className="mx-auto mt-4 max-w-sm text-sm leading-relaxed"
              style={{ color: 'var(--vg-text-muted)' }}
            >
              {mode === 'unlock'
                ? 'Die vollständige Aufschlüsselung ist jetzt auf dieser Seite sichtbar. Eine Kopie haben wir zusätzlich an Ihre E-Mail-Adresse gesendet.'
                : 'Vielen Dank. Ein Sicherheitsberater meldet sich innerhalb von 24 Stunden bei Ihnen. Ihre Konfiguration ist der Anfrage bereits beigefügt.'}
            </p>
            <button
              onClick={onClose}
              className="mt-9 px-8 py-4 text-[12px] tracking-[0.14em] uppercase"
              style={{
                backgroundColor: 'var(--vg-signal)',
                color: '#fff',
                fontFamily: 'var(--vg-font-body)',
                fontWeight: 600,
              }}
            >
              {mode === 'unlock' ? 'Zur Aufschlüsselung' : 'Schließen'}
            </button>
          </div>
        ) : (
          /* ── Formular ─────────────────────────────────────────────────── */
          <>
            <div
              className="border-b px-8 py-7"
              style={{ borderColor: 'var(--vg-border)' }}
            >
              <div className="flex items-center gap-2.5">
                <Lock className="h-3.5 w-3.5" style={{ color: 'var(--vg-signal)' }} />
                <span
                  className="text-[10px] tracking-[0.24em] uppercase"
                  style={{
                    color: 'var(--vg-signal)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  {copy.badge}
                </span>
              </div>
              <h3
                className="mt-4 text-2xl leading-tight"
                style={{
                  fontFamily: 'var(--vg-font-display)',
                  fontWeight: 700,
                  color: 'var(--vg-text)',
                }}
              >
                {copy.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'var(--vg-text-muted)' }}
              >
                {copy.text}
              </p>

              {/* Ergebnis-Erinnerung */}
              <div
                className="mt-6 flex items-baseline justify-between px-4 py-3.5"
                style={{
                  backgroundColor: 'var(--vg-bg)',
                  border: '1px solid var(--vg-border)',
                }}
              >
                <span
                  className="text-[10px] tracking-[0.16em] uppercase"
                  style={{
                    color: 'var(--vg-text-dim)',
                    fontFamily: 'var(--vg-font-mono)',
                  }}
                >
                  Ihre Kalkulation
                </span>
                <span
                  className="text-lg"
                  style={{
                    color: 'var(--vg-text)',
                    fontFamily: 'var(--vg-font-display)',
                    fontWeight: 600,
                  }}
                >
                  {formatEuro(min)} – {formatEuro(max)}
                </span>
              </div>
            </div>

            <form onSubmit={submit} className="px-8 py-7">
              <div className="flex flex-col gap-5">
                <Field
                  label="Unternehmen"
                  required
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                  placeholder="Musterfirma GmbH"
                />
                <Field
                  label="Ansprechpartner"
                  required
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Vor- und Nachname"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="E-Mail"
                    required
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    placeholder="name@beispiel.de"
                  />
                  <Field
                    label="Telefon"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="Optional"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-current"
                    style={{ accentColor: 'var(--vg-signal)' }}
                  />
                  <span
                    className="text-[12px] leading-relaxed"
                    style={{ color: 'var(--vg-text-muted)' }}
                  >
                    Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung
                    der Anfrage verarbeitet werden. Die Einwilligung kann jederzeit
                    widerrufen werden.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!valid}
                className="mt-7 w-full px-8 py-4.5 text-[12px] tracking-[0.14em] uppercase transition-all"
                style={{
                  backgroundColor: valid ? 'var(--vg-signal)' : 'var(--vg-elevated)',
                  color: valid ? '#fff' : 'var(--vg-text-dim)',
                  fontFamily: 'var(--vg-font-body)',
                  fontWeight: 600,
                  cursor: valid ? 'pointer' : 'not-allowed',
                  paddingTop: '17px',
                  paddingBottom: '17px',
                }}
              >
                {copy.cta}
              </button>

              <div className="mt-5 flex items-center justify-center gap-2">
                <ShieldCheck
                  className="h-3.5 w-3.5"
                  style={{ color: 'var(--vg-text-dim)' }}
                />
                <span className="text-[11px]" style={{ color: 'var(--vg-text-dim)' }}>
                  Keine Weitergabe an Dritte · Kein Newsletter
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-[10px] tracking-[0.18em] uppercase"
        style={{
          color: 'var(--vg-text-dim)',
          fontFamily: 'var(--vg-font-mono)',
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--vg-signal)' }}> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 text-sm outline-none transition-colors"
        style={{
          backgroundColor: 'var(--vg-bg)',
          border: '1px solid var(--vg-border)',
          color: 'var(--vg-text)',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--vg-signal)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--vg-border)')}
      />
    </label>
  );
}
