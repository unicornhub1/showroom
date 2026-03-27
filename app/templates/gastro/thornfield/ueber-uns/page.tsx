import Image from 'next/image';

const IMG = '/templates/gastro/thornfield/images';

const MILESTONES = [
  { year: '1928', title: 'Gründung', text: 'Archibald Thornfield gründet die Brennerei am Ufer des River Spey — mit einer einzigen Kupferbrennblase und einem Traum.' },
  { year: '1952', title: 'Zweite Generation', text: 'James Thornfield übernimmt und erweitert auf vier Brennblasen. Der erste 21-jährige Single Malt wird abgefüllt.' },
  { year: '1978', title: 'Internationale Anerkennung', text: 'Thornfield gewinnt Gold bei den International Spirits Awards. Export nach Europa und Nordamerika beginnt.' },
  { year: '1996', title: 'Dritte Generation', text: 'Eileen Thornfield wird erste Brennmeisterin der Familie. Sie führt die innovativen Sherry-Fass-Finishes ein.' },
  { year: '2024', title: 'Heute', text: 'Thornfield steht für kompromisslose Qualität und verbindet jahrhundertealtes Handwerk mit moderner Nachhaltigkeit.' },
];

export default function UeberUnsPage() {
  return (
    <main className="pt-32 pb-24">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: 'var(--tf-amber)' }}
          />
          <p
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
          >
            Seit fast 100 Jahren
          </p>
          <h1
            className="mt-4 text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--tf-font-serif)' }}
          >
            Unsere Geschichte
          </h1>
        </div>
      </div>

      {/* Intro split */}
      <div
        className="border-t border-b"
        style={{ borderColor: 'var(--tf-border)' }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-16 md:px-16">
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Thornfield ist mehr als eine Destillerie — es ist ein Versprechen.
              Ein Versprechen an die Kunst des langsamen Brennens, an die Geduld
              der jahrelangen Reifung und an den Respekt vor den Rohstoffen, die
              das schottische Hochland uns schenkt.
            </p>
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
            >
              Drei Generationen Brennmeister haben ihr Wissen, ihre Leidenschaft
              und ihre Geheimnisse weitergegeben. Jede Flasche Thornfield trägt
              dieses Erbe in sich.
            </p>
          </div>
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={`${IMG}/editorial/heritage.jpg`}
              alt="Thornfield Heritage"
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
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
            style={{ backgroundColor: 'var(--tf-border-light)' }}
          />

          <div className="space-y-16">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="relative pl-10 md:pl-0">
                {/* Dot */}
                <div
                  className="absolute left-0 top-1 h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2"
                  style={{ backgroundColor: 'var(--tf-amber)' }}
                />

                <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'}`}>
                  <span
                    className="text-sm uppercase tracking-[0.2em]"
                    style={{ color: 'var(--tf-amber)', fontFamily: 'var(--tf-font-sans)' }}
                  >
                    {m.year}
                  </span>
                  <h3
                    className="mt-1 text-xl"
                    style={{ fontFamily: 'var(--tf-font-serif)' }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                  >
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
