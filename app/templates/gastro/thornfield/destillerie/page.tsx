import Image from 'next/image';
import { PROCESS_STEPS } from '../_design/data';

const IMG = '/templates/gastro/thornfield/images';

export default function DestilleriePage() {
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
            Handwerk & Hingabe
          </p>
          <h1
            className="mt-4 text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--tf-font-serif)' }}
          >
            Unsere Destillerie
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl leading-relaxed"
            style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
          >
            Von der Gerste bis ins Glas — jeder Schritt in unserem Prozess
            folgt Traditionen, die seit fast einem Jahrhundert bestehen.
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mx-auto max-w-7xl aspect-[21/9] overflow-hidden">
        <Image
          src={`${IMG}/editorial/distillery.jpg`}
          alt="Kupferne Brennblasen"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(12,10,7,0.6) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Process Steps — detailed */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="space-y-24">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.title}
              className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_2fr]"
            >
              <div>
                <span
                  className="text-6xl font-bold"
                  style={{
                    color: 'var(--tf-amber)',
                    opacity: 0.2,
                    fontFamily: 'var(--tf-font-serif)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2
                  className="mt-2 text-2xl md:text-3xl"
                  style={{ fontFamily: 'var(--tf-font-serif)' }}
                >
                  {step.title}
                </h2>
              </div>
              <div
                className="border-l pl-8"
                style={{ borderColor: 'var(--tf-border-light)' }}
              >
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--tf-cream-muted)', fontFamily: 'var(--tf-font-sans)' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image grid */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--tf-border)' }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={`${IMG}/editorial/barrels.jpg`}
                alt="Eichenfässer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={`${IMG}/editorial/tasting.jpg`}
                alt="Verkostung"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
