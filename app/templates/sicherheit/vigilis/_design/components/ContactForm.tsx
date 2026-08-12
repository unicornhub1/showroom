'use client';

import { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { OBJECT_TYPES } from '../data';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    objectType: '',
    message: '',
    consent: false,
  });

  const valid = form.company.trim() && form.name.trim() && form.email.trim() && form.consent;

  if (sent) {
    return (
      <div
        className="flex flex-col items-center justify-center px-8 py-20 text-center"
        style={{
          backgroundColor: 'var(--vg-surface)',
          border: '1px solid var(--vg-border)',
        }}
      >
        <span
          className="flex h-14 w-14 items-center justify-center"
          style={{ border: '1.5px solid var(--vg-ok)', color: 'var(--vg-ok)' }}
        >
          <Check className="h-7 w-7" />
        </span>
        <h3
          className="mt-7 text-2xl"
          style={{
            color: 'var(--vg-text)',
            fontFamily: 'var(--vg-font-display)',
            fontWeight: 700,
          }}
        >
          Nachricht eingegangen
        </h3>
        <p
          className="mt-4 max-w-md text-sm leading-relaxed"
          style={{ color: 'var(--vg-text-muted)' }}
        >
          Vielen Dank für Ihre Anfrage. Ein Sicherheitsberater meldet sich
          innerhalb eines Werktages bei Ihnen — bei dringenden Anliegen erreichen
          Sie unsere Leitstelle rund um die Uhr telefonisch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) setSent(true);
      }}
      className="px-8 py-9 md:px-10 md:py-10"
      style={{
        backgroundColor: 'var(--vg-surface)',
        border: '1px solid var(--vg-border)',
      }}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      {/* Objektart */}
      <label className="mt-6 block">
        <span
          className="mb-2 block text-[10px] tracking-[0.18em] uppercase"
          style={{ color: 'var(--vg-text-dim)', fontFamily: 'var(--vg-font-mono)' }}
        >
          Objektart
        </span>
        <select
          value={form.objectType}
          onChange={(e) => setForm({ ...form, objectType: e.target.value })}
          className="w-full px-4 py-3.5 text-sm outline-none"
          style={{
            backgroundColor: 'var(--vg-bg)',
            border: '1px solid var(--vg-border)',
            color: form.objectType ? 'var(--vg-text)' : 'var(--vg-text-dim)',
          }}
        >
          <option value="">Bitte wählen</option>
          {OBJECT_TYPES.map((obj) => (
            <option key={obj.id} value={obj.id}>
              {obj.name}
            </option>
          ))}
        </select>
      </label>

      {/* Nachricht */}
      <label className="mt-6 block">
        <span
          className="mb-2 block text-[10px] tracking-[0.18em] uppercase"
          style={{ color: 'var(--vg-text-dim)', fontFamily: 'var(--vg-font-mono)' }}
        >
          Ihre Nachricht
        </span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Beschreiben Sie kurz Ihr Objekt und Ihr Anliegen."
          className="w-full resize-none px-4 py-3.5 text-sm outline-none"
          style={{
            backgroundColor: 'var(--vg-bg)',
            border: '1px solid var(--vg-border)',
            color: 'var(--vg-text)',
          }}
        />
      </label>

      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-0.5 h-4 w-4 shrink-0"
          style={{ accentColor: 'var(--vg-signal)' }}
        />
        <span
          className="text-[12px] leading-relaxed"
          style={{ color: 'var(--vg-text-muted)' }}
        >
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung der
          Anfrage verarbeitet werden. Die Einwilligung kann jederzeit widerrufen
          werden.
        </span>
      </label>

      <button
        type="submit"
        disabled={!valid}
        className="mt-8 flex w-full items-center justify-center gap-3 text-[12px] tracking-[0.14em] uppercase transition-all"
        style={{
          backgroundColor: valid ? 'var(--vg-signal)' : 'var(--vg-elevated)',
          color: valid ? '#fff' : 'var(--vg-text-dim)',
          cursor: valid ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--vg-font-body)',
          fontWeight: 600,
          paddingTop: '18px',
          paddingBottom: '18px',
        }}
      >
        <Send className="h-4 w-4" />
        Anfrage senden
      </button>
    </form>
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
        style={{ color: 'var(--vg-text-dim)', fontFamily: 'var(--vg-font-mono)' }}
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
