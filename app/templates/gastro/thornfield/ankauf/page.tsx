'use client';

import Image from 'next/image';
import { ArrowRight, Upload, Search, Handshake } from 'lucide-react';

const IMG = '/templates/gastro/thornfield/images';

const STEPS = [
  {
    icon: Upload,
    title: 'Anfrage einreichen',
    description:
      'Senden Sie uns die Details Ihrer Flasche — Name, Jahrgang, Zustand und wenn möglich ein Foto. Wir melden uns innerhalb von 48 Stunden.',
  },
  {
    icon: Search,
    title: 'Bewertung & Angebot',
    description:
      'Unsere Experten bewerten Ihre Flasche anhand aktueller Marktdaten und Sammlernachfrage. Sie erhalten ein faires, transparentes Angebot.',
  },
  {
    icon: Handshake,
    title: 'Unkomplizierte Abwicklung',
    description:
      'Bei Einigung kümmern wir uns um alles — vom versicherten Versand bis zur schnellen Auszahlung. Diskret und professionell.',
  },
];

export default function AnkaufPage() {
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
            Wir kaufen Raritäten
          </p>
          <h1
            className="mt-4 text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--tf-font-serif)' }}
          >
            Ankauf
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl leading-relaxed"
            style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
          >
            Sie besitzen eine seltene Flasche oder eine ganze Sammlung? Wir sind
            stets auf der Suche nach besonderen Abfüllungen — von limitierten
            Single Malts bis hin zu geschlossenen Destillerien.
          </p>
        </div>

        {/* What we buy — split section */}
        <div
          className="mb-20 grid grid-cols-1 overflow-hidden border md:grid-cols-2"
          style={{ borderColor: 'var(--tf-border)' }}
        >
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={`${IMG}/editorial/tasting.jpg`}
              alt="Whiskey Raritäten"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div
            className="flex flex-col justify-center p-8 md:p-12"
            style={{ backgroundColor: 'var(--tf-surface)' }}
          >
            <h2
              className="text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--tf-font-serif)' }}
            >
              Was wir suchen
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                'Limitierte und nummerierte Abfüllungen',
                'Flaschen geschlossener Destillerien',
                'Jahrgänge vor 1980',
                'Komplette Sammlungen & Nachlässe',
                'Seltene Fassabfüllungen (Single Cask)',
                'Originalverpackte Sammlerausgaben',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: 'var(--tf-amber)' }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process steps */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
            >
              So funktioniert's
            </p>
            <h2
              className="mt-4 text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--tf-font-serif)' }}
            >
              In drei Schritten zum Ankauf
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="border p-8 text-center"
                style={{ borderColor: 'var(--tf-border)', backgroundColor: 'var(--tf-surface)' }}
              >
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center border"
                  style={{ borderColor: 'var(--tf-border-light)' }}
                >
                  <step.icon className="h-6 w-6" style={{ color: 'var(--tf-amber)' }} />
                </div>
                <span
                  className="mt-4 block text-xs uppercase tracking-[0.2em]"
                  style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  Schritt {i + 1}
                </span>
                <h3
                  className="mt-2 text-lg"
                  style={{ fontFamily: 'var(--tf-font-serif)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ankauf Form */}
        <div
          className="border p-8 md:p-12"
          style={{ borderColor: 'var(--tf-border)', backgroundColor: 'var(--tf-surface)' }}
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2
                className="text-2xl md:text-3xl"
                style={{ fontFamily: 'var(--tf-font-serif)' }}
              >
                Flasche einreichen
              </h2>
              <p
                className="mt-3 text-sm"
                style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
              >
                Füllen Sie das Formular aus und wir melden uns mit einem
                unverbindlichen Angebot.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-xs uppercase tracking-[0.15em]"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    Ihr Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                    style={{
                      borderColor: 'var(--tf-border-light)',
                      color: 'var(--tf-cream)',
                      fontFamily: 'var(--tf-font-sans)',
                    }}
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-xs uppercase tracking-[0.15em]"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                    style={{
                      borderColor: 'var(--tf-border-light)',
                      color: 'var(--tf-cream)',
                      fontFamily: 'var(--tf-font-sans)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  Bezeichnung der Flasche / Destillerie *
                </label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Macallan 25 Year Sherry Oak, 1987"
                  className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                  style={{
                    borderColor: 'var(--tf-border-light)',
                    color: 'var(--tf-cream)',
                    fontFamily: 'var(--tf-font-sans)',
                  }}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label
                    className="mb-2 block text-xs uppercase tracking-[0.15em]"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    Jahrgang / Alter
                  </label>
                  <input
                    type="text"
                    placeholder="z.B. 1987 oder 25 Jahre"
                    className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                    style={{
                      borderColor: 'var(--tf-border-light)',
                      color: 'var(--tf-cream)',
                      fontFamily: 'var(--tf-font-sans)',
                    }}
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-xs uppercase tracking-[0.15em]"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    Zustand
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
                    <option value="ungeöffnet">Ungeöffnet / versiegelt</option>
                    <option value="geöffnet">Geöffnet</option>
                    <option value="ovp">Mit Originalverpackung</option>
                    <option value="sammlung">Teil einer Sammlung</option>
                  </select>
                </div>
                <div>
                  <label
                    className="mb-2 block text-xs uppercase tracking-[0.15em]"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    Anzahl
                  </label>
                  <input
                    type="number"
                    min={1}
                    defaultValue={1}
                    className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                    style={{
                      borderColor: 'var(--tf-border-light)',
                      color: 'var(--tf-cream)',
                      fontFamily: 'var(--tf-font-sans)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  Weitere Details / Anmerkungen
                </label>
                <textarea
                  rows={4}
                  placeholder="Herkunft, Besonderheiten, Preisvorstellung..."
                  className="w-full resize-none border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tf-amber)]"
                  style={{
                    borderColor: 'var(--tf-border-light)',
                    color: 'var(--tf-cream)',
                    fontFamily: 'var(--tf-font-sans)',
                  }}
                />
              </div>

              {/* Photo upload placeholder */}
              <div>
                <label
                  className="mb-2 block text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  Fotos (optional)
                </label>
                <div
                  className="flex cursor-pointer flex-col items-center justify-center border border-dashed px-6 py-10 text-center transition-colors hover:border-[var(--tf-amber)]"
                  style={{ borderColor: 'var(--tf-border-light)' }}
                >
                  <Upload className="mb-3 h-6 w-6" style={{ color: 'var(--tf-cream-muted)' }} />
                  <p
                    className="text-sm"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    Klicken oder Dateien hierher ziehen
                  </p>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: 'var(--tf-cream-muted)', opacity: 0.5 }}
                  >
                    JPG, PNG — max. 10 MB pro Datei
                  </p>
                </div>
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
                Unverbindliche Anfrage senden
              </button>
              <p
                className="text-center text-xs"
                style={{ color: 'var(--tf-cream-muted)', opacity: 0.5 }}
              >
                Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
