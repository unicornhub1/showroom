import Image from 'next/image';

const IMG = '/templates/fashion/meridian/images';

const SERVICES = [
  { title: 'Authentifizierung', desc: 'Jede Uhr wird auf Echtheit geprüft — vom Werk bis zum Gehäuse, von der Krone bis zum Zifferblatt.' },
  { title: 'Komplettservice', desc: 'Zerlegung, Reinigung, Regulierung und Dichtungstausch — durchgeführt von unseren Uhrmachermeistern.' },
  { title: 'Restaurierung', desc: 'Behutsame Aufarbeitung von Zifferblättern, Zeigern und Gehäusen unter Wahrung des Originalzustands.' },
  { title: 'Zertifizierung', desc: 'Jedes Stück verlässt unser Atelier mit einem detaillierten Zustandsbericht und Echtheits-Zertifikat.' },
];

export default function AtelierPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 h-px w-16" style={{ backgroundColor: 'var(--mr-gold)' }} />
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}>
            Handwerk & Präzision
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
            Unser Atelier
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
            Im Herzen unseres Hauses arbeiten erfahrene Uhrmacher daran, jedem
            Zeitmesser neues Leben einzuhauchen — mit Werkzeugen, die sich seit
            Jahrhunderten kaum verändert haben.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="relative mx-auto max-w-7xl aspect-[21/9] overflow-hidden">
        <Image
          src={`${IMG}/editorial/atelier.jpg`}
          alt="Uhrmacher-Atelier"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Services */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
            Unsere Leistungen
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="border p-8"
              style={{ borderColor: 'var(--mr-border)' }}
            >
              <h3 className="text-lg" style={{ fontFamily: 'var(--mr-font-serif)' }}>
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
