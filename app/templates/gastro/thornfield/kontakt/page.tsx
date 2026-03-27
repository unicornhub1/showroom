'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function KontaktPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: 'var(--tf-amber)' }}
          />
          <p
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
          >
            Wir freuen uns auf Sie
          </p>
          <h1
            className="mt-4 text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--tf-font-serif)' }}
          >
            Kontakt
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <div className="space-y-8">
              {[
                { icon: MapPin, label: 'Adresse', value: 'Musterstraße 1, 10115 Berlin' },
                { icon: Phone, label: 'Telefon', value: '+49 (0) 30 123 456 78' },
                { icon: Mail, label: 'E-Mail', value: 'info@beispiel.de' },
                { icon: Clock, label: 'Öffnungszeiten', value: 'Mo–Fr 10–18 Uhr, Sa 10–16 Uhr' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center border"
                    style={{ borderColor: 'var(--tf-border-light)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: 'var(--tf-amber)' }} />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-[0.15em]"
                      style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
                    >
                      {label}
                    </p>
                    <p
                      className="mt-1"
                      style={{ color: 'var(--tf-cream)', fontFamily: 'var(--tf-font-sans)' }}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Verkostung info */}
            <div
              className="mt-12 border p-8"
              style={{ borderColor: 'var(--tf-border)', backgroundColor: 'var(--tf-surface)' }}
            >
              <h3
                className="text-lg"
                style={{ fontFamily: 'var(--tf-font-serif)' }}
              >
                Führungen & Verkostungen
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
              >
                Erleben Sie Thornfield hautnah. Unsere Führungen finden jeden
                Samstag um 11 und 14 Uhr statt. Gruppen ab 6 Personen können
                individuelle Termine vereinbaren. Inklusive Verkostung von drei
                Whiskeys und einer exklusiven Fassprobe.
              </p>
              <p
                className="mt-4 text-sm"
                style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
              >
                Ab 35,00 € pro Person
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="border p-8 md:p-10"
            style={{ borderColor: 'var(--tf-border)', backgroundColor: 'var(--tf-surface)' }}
          >
            <h2
              className="mb-8 text-2xl"
              style={{ fontFamily: 'var(--tf-font-serif)' }}
            >
              Schreiben Sie uns
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-xs uppercase tracking-[0.15em]"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                    style={{
                      borderColor: 'var(--tf-border-light)',
                      color: 'var(--tf-cream)',
                      fontFamily: 'var(--tf-font-sans)',
                    }}
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-xs uppercase tracking-[0.15em]"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    E-Mail
                  </label>
                  <input
                    type="email"
                    className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                    style={{
                      borderColor: 'var(--tf-border-light)',
                      color: 'var(--tf-cream)',
                      fontFamily: 'var(--tf-font-sans)',
                    }}
                    placeholder="ihre@email.de"
                  />
                </div>
              </div>
              <div>
                <label
                  className="mb-2 block text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  Betreff
                </label>
                <select
                  className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                  style={{
                    borderColor: 'var(--tf-border-light)',
                    color: 'var(--tf-cream)',
                    fontFamily: 'var(--tf-font-sans)',
                    backgroundColor: 'var(--tf-surface)',
                  }}
                >
                  <option value="">Bitte wählen</option>
                  <option value="fuehrung">Führung buchen</option>
                  <option value="verkostung">Verkostung anfragen</option>
                  <option value="bestellung">Bestellung</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>
              <div>
                <label
                  className="mb-2 block text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  Nachricht
                </label>
                <textarea
                  rows={5}
                  className="w-full resize-none border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                  style={{
                    borderColor: 'var(--tf-border-light)',
                    color: 'var(--tf-cream)',
                    fontFamily: 'var(--tf-font-sans)',
                  }}
                  placeholder="Ihre Nachricht..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: 'var(--tf-amber)',
                  color: 'var(--tf-bg)',
                  fontFamily: 'var(--tf-font-sans)',
                  fontWeight: 600,
                }}
              >
                Nachricht senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
