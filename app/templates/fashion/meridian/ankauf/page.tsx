'use client';

import Image from 'next/image';
import { ArrowRight, Upload, Search, Handshake, Shield } from 'lucide-react';

const IMG = '/templates/fashion/meridian/images';

const STEPS = [
  {
    icon: Upload,
    title: 'Anfrage einreichen',
    description:
      'Senden Sie uns Marke, Modell, Referenznummer und Fotos Ihrer Uhr. Wir melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung.',
  },
  {
    icon: Search,
    title: 'Expertenbewertung',
    description:
      'Unsere zertifizierten Uhrmacher bewerten Zustand, Authentizität und aktuellen Marktwert. Sie erhalten ein transparentes, faires Angebot.',
  },
  {
    icon: Handshake,
    title: 'Ankauf oder Vermittlung',
    description:
      'Wir kaufen Ihre Uhr direkt an oder vermitteln sie über unser Sammlernetzwerk — je nach Ihren Wünschen. Auszahlung innerhalb von 48 Stunden.',
  },
];

export default function AnkaufPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 h-px w-16" style={{ backgroundColor: 'var(--mr-gold)' }} />
          <p
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
          >
            Ankauf & Vermittlung
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
            Ihre Uhr verkaufen
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl leading-relaxed"
            style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}
          >
            Ob Einzelstück oder Sammlung — wir sind Ihr vertrauensvoller Partner
            für den Verkauf hochwertiger Zeitmesser. Fair, diskret und schnell.
          </p>
        </div>

        {/* What we buy */}
        <div
          className="mb-20 grid grid-cols-1 overflow-hidden border md:grid-cols-2"
          style={{ borderColor: 'var(--mr-border)' }}
        >
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={`${IMG}/editorial/collection.jpg`}
              alt="Uhrenkollektion"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12" style={{ backgroundColor: 'var(--mr-surface)' }}>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
              Was wir ankaufen
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                'Mechanische Armbanduhren ab Baujahr 1940',
                'Chronographen, Taucheruhren & Komplikationen',
                'Uhren mit Originalbox und Papieren',
                'Komplette Sammlungen & Nachlässe',
                'Seltene Sondereditionen & limitierte Auflagen',
                'Taschenuhren & historische Zeitmesser',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--mr-gold)' }} />
                  <span className="text-sm" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
            >
              So funktioniert's
            </p>
            <h2 className="mt-4 text-2xl md:text-3xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
              In drei Schritten zum Verkauf
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="border p-8 text-center"
                style={{ borderColor: 'var(--mr-border)', backgroundColor: 'var(--mr-surface)' }}
              >
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center border"
                  style={{ borderColor: 'var(--mr-border-dark)' }}
                >
                  <step.icon className="h-6 w-6" style={{ color: 'var(--mr-gold)' }} />
                </div>
                <span
                  className="mt-4 block text-xs uppercase tracking-[0.2em]"
                  style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}
                >
                  Schritt {i + 1}
                </span>
                <h3 className="mt-2 text-lg" style={{ fontFamily: 'var(--mr-font-serif)' }}>
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div
          className="mb-20 grid grid-cols-1 gap-px md:grid-cols-3"
          style={{ backgroundColor: 'var(--mr-border)' }}
        >
          {[
            { title: 'Zertifizierte Bewertung', desc: 'Durch hauseigene Uhrmachermeister' },
            { title: 'Diskrete Abwicklung', desc: 'Vertraulich und professionell' },
            { title: 'Sofortige Auszahlung', desc: 'Innerhalb von 48 Stunden' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center p-8 text-center"
              style={{ backgroundColor: 'var(--mr-bg)' }}
            >
              <Shield className="h-5 w-5" style={{ color: 'var(--mr-gold)' }} />
              <h4 className="mt-3 text-sm font-semibold" style={{ fontFamily: 'var(--mr-font-sans)' }}>
                {item.title}
              </h4>
              <p className="mt-1 text-xs" style={{ color: 'var(--mr-text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div
          className="border p-8 md:p-12"
          style={{ borderColor: 'var(--mr-border)', backgroundColor: 'var(--mr-surface)' }}
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
                Uhr einreichen
              </h2>
              <p className="mt-3 text-sm" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                Unverbindlich und kostenlos — wir melden uns innerhalb von 24 Stunden.
              </p>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    Ihr Name *
                  </label>
                  <input type="text" required className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    E-Mail *
                  </label>
                  <input type="email" required className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    Marke / Hersteller *
                  </label>
                  <input type="text" required placeholder="z.B. Omega, Rolex, Patek Philippe" className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    Modell / Referenznummer
                  </label>
                  <input type="text" placeholder="z.B. Speedmaster 145.022" className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    Baujahr (ca.)
                  </label>
                  <input type="text" placeholder="z.B. 1972" className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    Zustand
                  </label>
                  <select className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)', backgroundColor: 'var(--mr-surface)' }}>
                    <option value="">Bitte wählen</option>
                    <option value="neuwertig">Neuwertig</option>
                    <option value="sehr-gut">Sehr gut</option>
                    <option value="gut">Gut</option>
                    <option value="servicebedürftig">Servicebedürftig</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    Box & Papiere
                  </label>
                  <select className="w-full border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)', backgroundColor: 'var(--mr-surface)' }}>
                    <option value="">Bitte wählen</option>
                    <option value="komplett">Komplett vorhanden</option>
                    <option value="nur-box">Nur Box</option>
                    <option value="nur-papiere">Nur Papiere</option>
                    <option value="ohne">Ohne</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                  Anmerkungen / Preisvorstellung
                </label>
                <textarea rows={4} placeholder="Besonderheiten, Herkunft, gewünschter Verkaufspreis..." className="w-full resize-none border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--mr-gold)]" style={{ borderColor: 'var(--mr-border-dark)', color: 'var(--mr-text)', fontFamily: 'var(--mr-font-sans)' }} />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                  Fotos (optional)
                </label>
                <div
                  className="flex cursor-pointer flex-col items-center justify-center border border-dashed px-6 py-10 text-center transition-colors hover:border-[var(--mr-gold)]"
                  style={{ borderColor: 'var(--mr-border-dark)' }}
                >
                  <Upload className="mb-3 h-6 w-6" style={{ color: 'var(--mr-text-muted)' }} />
                  <p className="text-sm" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    Klicken oder Dateien hierher ziehen
                  </p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--mr-text-muted)', opacity: 0.5 }}>
                    JPG, PNG — max. 10 MB pro Datei
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: 'var(--mr-text)', color: 'var(--mr-bg)', fontFamily: 'var(--mr-font-sans)', fontWeight: 600 }}
              >
                Unverbindliche Anfrage senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
