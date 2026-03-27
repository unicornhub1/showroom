import Image from 'next/image';

const IMG = '/templates/fashion/meridian/images';

const MILESTONES = [
  { year: '1952', title: 'Gründung', text: 'Heinrich Meridian eröffnet sein erstes Uhrengeschäft in Berlin — spezialisiert auf Schweizer Präzisionsuhren.' },
  { year: '1968', title: 'Vintage-Pionier', text: 'Als einer der ersten Händler in Deutschland erkennt Meridian das Potenzial von Vintage-Uhren als Sammlerobjekte.' },
  { year: '1985', title: 'Eigenes Atelier', text: 'Eröffnung der hauseigenen Uhrmacherwerkstatt. Fortan werden alle Uhren im Haus geprüft, serviciert und zertifiziert.' },
  { year: '2005', title: 'Internationales Netzwerk', text: 'Meridian etabliert Partnerschaften mit Sammlern und Auktionshäusern in Europa, den USA und Asien.' },
  { year: '2024', title: 'Heute', text: 'Über 70 Jahre Erfahrung im An- und Verkauf feiner Zeitmesser. Ein Name, dem Sammler weltweit vertrauen.' },
];

export default function UeberUnsPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 h-px w-16" style={{ backgroundColor: 'var(--mr-gold)' }} />
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}>
            Seit über 70 Jahren
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
            Unsere Geschichte
          </h1>
        </div>
      </div>

      {/* Intro */}
      <div className="border-t border-b" style={{ borderColor: 'var(--mr-border)' }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-16 md:px-16">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
              Meridian wurde aus einer einfachen Überzeugung geboren: Jede
              große Uhr verdient einen Besitzer, der ihre Geschichte zu
              schätzen weiß. Was als kleines Uhrengeschäft begann, ist heute
              eine der angesehensten Adressen für erlesene Zeitmesser.
            </p>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
              Unser Anspruch ist dabei immer gleich geblieben: Ehrlichkeit,
              Expertise und die Leidenschaft für mechanische Perfektion.
            </p>
          </div>
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={`${IMG}/editorial/heritage.jpg`}
              alt="Meridian Heritage"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
            style={{ backgroundColor: 'var(--mr-border-dark)' }}
          />
          <div className="space-y-16">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="relative pl-10 md:pl-0">
                <div
                  className="absolute left-0 top-1 h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2"
                  style={{ backgroundColor: 'var(--mr-gold)' }}
                />
                <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'}`}>
                  <span className="text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--mr-gold)', fontFamily: 'var(--mr-font-sans)', fontWeight: 500 }}>
                    {m.year}
                  </span>
                  <h3 className="mt-1 text-xl" style={{ fontFamily: 'var(--mr-font-serif)' }}>
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--mr-text-muted)', fontFamily: 'var(--mr-font-sans)' }}>
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
