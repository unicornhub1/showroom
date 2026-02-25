"use client";

import Link from "next/link";
import { Gem, Leaf, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "var(--pz-black)" }}>
      {/* Hero */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: "50vh",
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #2A2A2A 35%, #C9A55C 70%, #6B2D3E 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.55) 100%)",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <div
            className="mx-auto mb-8 h-px w-20"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <h1
            className="text-5xl font-normal leading-tight tracking-wide sm:text-6xl md:text-7xl"
            style={{
              fontFamily: "var(--pz-font-serif)",
              color: "var(--pz-ivory)",
            }}
          >
            LA NOSTRA STORIA
          </h1>
          <p
            className="mx-auto mt-6 max-w-lg text-base font-light tracking-wide"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-warm-gray)",
            }}
          >
            Das Erbe, die Werte und die Vision hinter Palazzo
          </p>
          <div
            className="mx-auto mt-8 h-px w-20"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
        </div>
      </section>

      {/* Section 1: Origin */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-32">
        <div className="text-center">
          <div
            className="mx-auto mb-8 h-px w-16"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <p
            className="mb-4 text-xs tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-gold)",
            }}
          >
            L'Inizio
          </p>
          <h2
            className="mb-10 text-5xl font-normal tracking-wide sm:text-6xl"
            style={{
              fontFamily: "var(--pz-font-serif)",
              color: "var(--pz-ivory)",
            }}
          >
            Gegründet in Florenz
          </h2>
          <p
            className="mx-auto max-w-2xl text-base font-light leading-relaxed"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-warm-gray)",
              lineHeight: 1.9,
            }}
          >
            Palazzo entstand aus der Überzeugung, dass wahre Schönheit in der
            Verbindung von Dunkelheit und Licht liegt. In einer historischen
            Werkstatt im Herzen von Florenz machten sich unsere Gründer daran,
            ein Haus zu schaffen, das die dramatische Opulenz der italienischen
            Renaissance mit der Präzision moderner Schneiderkunst verbindet.
            Was als stilles Streben nach Perfektion begann, ist zu einem Symbol
            für kompromisslosen italienischen Luxus geworden.
          </p>
        </div>
      </section>

      {/* Gold divider */}
      <div className="flex items-center justify-center">
        <div className="h-px w-8" style={{ backgroundColor: "var(--pz-gold)" }} />
        <div className="mx-4 h-1.5 w-1.5 rotate-45" style={{ backgroundColor: "var(--pz-gold)" }} />
        <div className="h-px w-8" style={{ backgroundColor: "var(--pz-gold)" }} />
      </div>

      {/* Section 2: Values */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <h2
            className="text-3xl font-normal tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--pz-font-serif)",
              color: "var(--pz-ivory)",
            }}
          >
            I Nostri Valori
          </h2>
          <p
            className="mt-3 text-sm tracking-[0.1em] uppercase"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-warm-gray)",
            }}
          >
            Die Säulen unserer Handwerkskunst
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: Gem,
              title: "Dramatisches Design",
              description:
                "Wir scheuen nicht vor Opulenz zurück. Jedes Stück ist ein Statement -- entworfen, um Eindruck zu hinterlassen, um zu faszinieren, um unvergesslich zu sein. Unsere Designs ehren die große Tradition italienischer Couture.",
            },
            {
              icon: Leaf,
              title: "Nachhaltige Materialien",
              description:
                "Luxus und Verantwortung gehen Hand in Hand. Wir arbeiten ausschließlich mit zertifizierten italienischen Manufakturen, verwenden natürlich gewonnene Materialien und produzieren in begrenzten Auflagen.",
            },
            {
              icon: Award,
              title: "Meisterliche Qualität",
              description:
                "Vom ersten Entwurf bis zum letzten Stich wird jedes Detail von Meisterhand geprüft. Unsere Kleidungsstücke sind Erbstücke -- geschaffen, um Generationen zu überdauern und mit der Zeit an Wert zu gewinnen.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="px-8 py-10"
              style={{
                backgroundColor: "var(--pz-charcoal)",
                borderTop: "2px solid var(--pz-gold)",
              }}
            >
              <value.icon
                size={28}
                strokeWidth={1.2}
                style={{ color: "var(--pz-gold)" }}
                className="mb-6"
              />
              <h3
                className="mb-4 text-xl font-normal tracking-wide"
                style={{
                  fontFamily: "var(--pz-font-serif)",
                  color: "var(--pz-ivory)",
                }}
              >
                {value.title}
              </h3>
              <p
                className="text-sm font-light leading-relaxed"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-warm-gray)",
                  lineHeight: 1.8,
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gold divider */}
      <div className="flex items-center justify-center">
        <div className="h-px w-8" style={{ backgroundColor: "var(--pz-gold)" }} />
        <div className="mx-4 h-1.5 w-1.5 rotate-45" style={{ backgroundColor: "var(--pz-gold)" }} />
        <div className="h-px w-8" style={{ backgroundColor: "var(--pz-gold)" }} />
      </div>

      {/* Section 3: Heritage Timeline */}
      <section className="mx-auto max-w-3xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <h2
            className="text-3xl font-normal tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--pz-font-serif)",
              color: "var(--pz-ivory)",
            }}
          >
            Il Nostro Patrimonio
          </h2>
          <p
            className="mt-3 text-sm tracking-[0.1em] uppercase"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-warm-gray)",
            }}
          >
            Eine Reise der Handwerkskunst
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />

          {[
            {
              year: "2019",
              title: "Gründung in Florenz",
              description:
                "In einer historischen Werkstatt nahe der Ponte Vecchio wird die Vision von Palazzo geboren.",
            },
            {
              year: "2020",
              title: "Erste Notte Italiana Kollektion",
              description:
                "Die Debütkollektion verbindet dunkle Dramatik mit florentinischer Goldschmiedekunst und sorgt für Aufsehen.",
            },
            {
              year: "2022",
              title: "Expansion nach Mailand und Rom",
              description:
                "Palazzo eröffnet Ateliers in der Via Montenapoleone und der Via Condotti.",
            },
            {
              year: "2025",
              title: "Nachhaltigkeitsinitiative",
              description:
                "Verpflichtung zu vollständig rückverfolgbaren Materialien und klimaneutraler Produktion in allen Manufakturen.",
            },
          ].map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative mb-16 flex last:mb-0 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className="absolute left-1/2 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full"
                style={{
                  backgroundColor: "var(--pz-gold)",
                  boxShadow: "0 0 0 4px var(--pz-black)",
                }}
              />

              <div
                className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
              >
                <span
                  className="text-3xl font-normal tracking-wide"
                  style={{
                    fontFamily: "var(--pz-font-serif)",
                    color: "var(--pz-gold)",
                  }}
                >
                  {milestone.year}
                </span>
                <h3
                  className="mt-2 text-lg font-normal tracking-wide"
                  style={{
                    fontFamily: "var(--pz-font-serif)",
                    color: "var(--pz-ivory)",
                  }}
                >
                  {milestone.title}
                </h3>
                <p
                  className="mt-2 text-sm font-light leading-relaxed"
                  style={{
                    fontFamily: "var(--pz-font-sans)",
                    color: "var(--pz-warm-gray)",
                    lineHeight: 1.7,
                  }}
                >
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gold divider */}
      <div className="flex items-center justify-center">
        <div className="h-px w-8" style={{ backgroundColor: "var(--pz-gold)" }} />
        <div className="mx-4 h-1.5 w-1.5 rotate-45" style={{ backgroundColor: "var(--pz-gold)" }} />
        <div className="h-px w-8" style={{ backgroundColor: "var(--pz-gold)" }} />
      </div>

      {/* Section 4: Craftsmanship */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div
            className="w-full overflow-hidden"
            style={{
              aspectRatio: "4/5",
              background:
                "linear-gradient(155deg, #0A0A0A 0%, #C9A55C 25%, #B8956A 55%, #6B2D3E 100%)",
            }}
          />

          <div className="max-w-lg py-8">
            <div
              className="mb-8 h-px w-12"
              style={{ backgroundColor: "var(--pz-gold)" }}
            />
            <p
              className="mb-3 text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-gold)",
              }}
            >
              La Bottega
            </p>
            <h3
              className="mb-6 text-3xl font-normal leading-snug tracking-wide sm:text-4xl"
              style={{
                fontFamily: "var(--pz-font-serif)",
                color: "var(--pz-ivory)",
              }}
            >
              Wo Meisterhände das Erbe formen
            </h3>
            <p
              className="mb-6 text-base font-light leading-relaxed"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
                lineHeight: 1.85,
              }}
            >
              Unsere Materialien stammen aus den feinsten Manufakturen der Toskana,
              der Lombardei und Kampaniens. Wir arbeiten mit Kunsthandwerkern, die
              ihr Leben der Meisterung eines einzigen Handwerks gewidmet haben --
              Gerber, Seidenweber, Schneider, deren Expertise über Generationen reicht.
            </p>
            <p
              className="text-base font-light leading-relaxed"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
                lineHeight: 1.85,
              }}
            >
              Jedes Kleidungsstück passiert Dutzende geschickter Hände, bevor
              es zu Ihnen gelangt. Wir glauben, dass die Schönheit eines
              Stückes nicht nur in dem liegt, was Sie sehen, sondern in den
              unsichtbaren Stunden der Hingabe, die in jede Naht eingewoben sind.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--pz-charcoal)" }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div
            className="mx-auto mb-8 h-px w-16"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <h2
            className="mb-6 text-3xl font-normal tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--pz-font-serif)",
              color: "var(--pz-ivory)",
            }}
          >
            Die Kollektion entdecken
          </h2>
          <p
            className="mb-10 text-base font-light leading-relaxed"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-warm-gray)",
              lineHeight: 1.8,
            }}
          >
            Entdecken Sie unsere sorgfältig kuratierten Kollektionen, von denen
            jede ihre eigene Geschichte von Handwerkskunst und Opulenz erzählt.
          </p>
          <Link
            href="/templates/fashion/palazzo/collections"
            className="inline-block px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
            style={{
              fontFamily: "var(--pz-font-sans)",
              backgroundColor: "var(--pz-gold)",
              color: "var(--pz-black)",
              border: "1px solid var(--pz-gold)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--pz-gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--pz-gold)";
              e.currentTarget.style.color = "var(--pz-black)";
            }}
          >
            Unsere Kollektionen
          </Link>
        </div>
      </section>
    </main>
  );
}
