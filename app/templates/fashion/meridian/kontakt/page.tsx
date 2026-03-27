'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function KontaktPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 h-px w-16" style={{ backgroundColor: 'var(--mr-gold)' }} />
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}>
            Wir freuen uns auf Sie
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
            Kontakt
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="space-y-8">
              {[
                { icon: MapPin, label: 'Adresse', value: 'Musterstraße 1, 10115 Berlin' },
                { icon: Phone, label: 'Telefon', value: '+49 (0) 30 123 456 78' },
                { icon: Mail, label: 'E-Mail', value: 'info@beispiel.de' },
                { icon: Clock, label: 'Öffnungszeiten', value: 'Mo–Fr 10–18 Uhr, Sa 10–16 Uhr' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border" style={{ borderColor: 'var(--mr-border-dark)' }}>
                    <Icon className="h-5 w-5" style={{ color: 'var(--mr-gold)' }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}>{label}</p>
                    <p className="mt-1" style={{ color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 border p-8" style={{ borderColor: 'var(--mr-border)', backgroundColor: 'var(--mr-surface)' }}>
              <h3 className="text-lg" style={{ fontFamily: 'var(--mr-font-serif)' }}>
                Persönliche Beratung
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                Für eine ausführliche Beratung oder die Begutachtung Ihrer Uhr
                vereinbaren wir gerne einen persönlichen Termin in unserem
                Atelier. Vertraulich und unverbindlich.
              </p>
            </div>
          </div>

          <div className="border p-8 md:p-10" style={{ borderColor: 'var(--mr-border)', backgroundColor: 'var(--mr-surface)' }}>
            <h2 className="mb-8 text-2xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
              Schreiben Sie uns
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>Name</label>
                  <input type="text" className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} placeholder="Ihr Name" />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>E-Mail</label>
                  <input type="email" className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} placeholder="ihre@email.de" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>Betreff</label>
                <select className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)', backgroundColor: 'var(--mr-surface)' }}>
                  <option value="">Bitte wählen</option>
                  <option value="ankauf">Ankauf / Verkauf</option>
                  <option value="beratung">Persönliche Beratung</option>
                  <option value="service">Service / Restaurierung</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>Nachricht</label>
                <textarea rows={5} className="w-full resize-none border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} placeholder="Ihre Nachricht..." />
              </div>
              <button type="submit" className="w-full py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90" style={{ backgroundColor: 'var(--mr-text)', color: 'var(--mr-bg)', fontFamily: 'var(--mr-font-sans)', fontWeight: 600 }}>
                Nachricht senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
