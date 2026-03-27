import { WHISKEYS } from '../_design/data';
import { WhiskeyCard } from '../_design/components/WhiskeyCard';

export default function SortimentPage() {
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
            Unsere Abfüllungen
          </p>
          <h1
            className="mt-4 text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--tf-font-serif)' }}
          >
            Sortiment
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl leading-relaxed"
            style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
          >
            Jeder Thornfield erzählt seine eigene Geschichte — von leicht und
            fruchtig bis tief und rauchig. Entdecken Sie Ihren Favoriten.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {WHISKEYS.map((whiskey) => (
            <WhiskeyCard key={whiskey.id} whiskey={whiskey} />
          ))}
        </div>

        {/* Info banner */}
        <div
          className="mt-20 border p-8 text-center md:p-12"
          style={{ borderColor: 'var(--tf-border)', backgroundColor: 'var(--tf-surface)' }}
        >
          <h3
            className="text-xl"
            style={{ fontFamily: 'var(--tf-font-serif)' }}
          >
            Verkostung vor Ort
          </h3>
          <p
            className="mx-auto mt-3 max-w-xl text-sm leading-relaxed"
            style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
          >
            Alle unsere Whiskeys können Sie bei einer geführten Verkostung in
            unserer Destillerie probieren. Inklusive exklusiver Fassproben, die
            nicht im regulären Sortiment erhältlich sind.
          </p>
        </div>
      </div>
    </main>
  );
}
