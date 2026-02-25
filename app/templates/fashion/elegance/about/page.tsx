"use client";

import Link from "next/link";
import { Gem, Leaf, Award } from "lucide-react";

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "var(--el-offwhite)" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: "50vh",
          background:
            "linear-gradient(160deg, #1B2A4A 0%, #2C3E6B 35%, #C4A265 70%, #F5F0E8 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.25) 0%, rgba(26,26,26,0.45) 100%)",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <div
            className="mx-auto mb-8 h-px w-20"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <h1
            className="text-5xl font-light leading-tight tracking-wide sm:text-6xl md:text-7xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-offwhite)",
            }}
          >
            UNSERE GESCHICHTE
          </h1>
          <p
            className="mx-auto mt-6 max-w-lg text-base font-light tracking-wide"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-light)",
            }}
          >
            Das Erbe, die Werte und die Vision hinter Maison Elegance
          </p>
          <div
            className="mx-auto mt-8 h-px w-20"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
        </div>
      </section>

      {/* ── Section 1: Origin ────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-32">
        <div className="text-center">
          <div
            className="mx-auto mb-8 h-px w-16"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <p
            className="mb-4 text-xs tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gold)",
            }}
          >
            Unser Anfang
          </p>
          <h2
            className="mb-10 text-5xl font-light tracking-wide sm:text-6xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Gegründet 2020
          </h2>
          <p
            className="mx-auto max-w-2xl text-base font-light leading-relaxed"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gray)",
              lineHeight: 1.9,
            }}
          >
            Maison Elegance entstand aus einer einfachen Überzeugung: dass
            außergewöhnliche Kleidung die flüchtigen Launen der Trends
            überdauern sollte. In einem kleinen Atelier in Berlin machten sich
            unsere Gründer daran, ein Haus zu schaffen, das der Kunst des
            zeitlosen Ankleidens gewidmet ist -- Stücke, die traditionelle
            Handwerkskunst ehren und gleichzeitig die Sensibilität der modernen
            Welt aufgreifen. Was als stilles Streben nach Perfektion begann, ist
            zu einem weltweit anerkannten Symbol für zurückhaltenden Luxus
            geworden.
          </p>
        </div>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-center">
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="mx-4 h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
      </div>

      {/* ── Section 2: Values ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <h2
            className="text-3xl font-light tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Unsere Werte
          </h2>
          <p
            className="mt-3 text-sm tracking-[0.1em] uppercase"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gray)",
            }}
          >
            Die Säulen unserer Handwerkskunst
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: Gem,
              title: "Zeitloses Design",
              description:
                "Wir entwerfen jenseits der Saisons. Jedes Stück ist darauf ausgelegt zu bestehen -- im Stil, in der Struktur und im Geist. Unsere Kollektionen werden nicht von Trends diktiert, sondern von einem unerschütterlichen Bekenntnis zu beständiger Schönheit.",
            },
            {
              icon: Leaf,
              title: "Nachhaltige Handwerkskunst",
              description:
                "Luxus und Verantwortung sind keine Gegensätze. Wir arbeiten ausschließlich mit zertifizierten Manufakturen, verwenden natürlich gewonnene Materialien und produzieren in begrenzten Mengen, um Abfall zu minimieren und Wirkung zu maximieren.",
            },
            {
              icon: Award,
              title: "Kompromisslose Qualität",
              description:
                "Vom ersten Entwurf bis zum letzten Stich wird jedes Detail geprüft. Unsere Kleidungsstücke sind darauf ausgelegt, jahrelang getragen und über Generationen weitergegeben zu werden -- Kleidung, die mit der Zeit an Wert gewinnt.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="px-8 py-10"
              style={{
                backgroundColor: "var(--el-cream)",
                borderTop: "2px solid var(--el-gold)",
              }}
            >
              <value.icon
                size={28}
                strokeWidth={1.2}
                style={{ color: "var(--el-gold)" }}
                className="mb-6"
              />
              <h3
                className="mb-4 text-xl font-light tracking-wide"
                style={{
                  fontFamily: "var(--el-font-serif)",
                  color: "var(--el-navy)",
                }}
              >
                {value.title}
              </h3>
              <p
                className="text-sm font-light leading-relaxed"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
                  lineHeight: 1.8,
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-center">
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="mx-4 h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
      </div>

      {/* ── Section 3: Heritage Timeline ─────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <h2
            className="text-3xl font-light tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Unser Erbe
          </h2>
          <p
            className="mt-3 text-sm tracking-[0.1em] uppercase"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gray)",
            }}
          >
            Eine Reise der Handwerkskunst und Überzeugung
          </p>
        </div>

        <div className="relative">
          {/* Vertical gold line */}
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{ backgroundColor: "var(--el-gold)" }}
          />

          {[
            {
              year: "2020",
              title: "Markengründung in Berlin",
              description:
                "Ein kleines Atelier in Berlin-Mitte wird zum Geburtsort einer Vision: Kleidung, die die Zeit überdauert.",
            },
            {
              year: "2021",
              title: "Erste Flaggschiff-Kollektion veröffentlicht",
              description:
                "Die Heritage-Kollektion debütiert unter großem Beifall und begründet unsere einzigartige Verbindung aus traditioneller Handwerkskunst und moderner Formgebung.",
            },
            {
              year: "2023",
              title: "Expansion in internationale Märkte",
              description:
                "Von Paris bis Tokio -- Maison Elegance erreicht anspruchsvolle Kunden auf drei Kontinenten.",
            },
            {
              year: "2025",
              title: "Initiative für nachhaltige Materialien gestartet",
              description:
                "Ein Bekenntnis zu vollständig rückverfolgbaren, nachhaltig gewonnenen Materialien in allen zukünftigen Kollektionen.",
            },
          ].map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative mb-16 flex last:mb-0 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Center dot */}
              <div
                className="absolute left-1/2 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full"
                style={{
                  backgroundColor: "var(--el-gold)",
                  boxShadow: "0 0 0 4px var(--el-offwhite)",
                }}
              />

              {/* Content card */}
              <div
                className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
              >
                <span
                  className="text-3xl font-light tracking-wide"
                  style={{
                    fontFamily: "var(--el-font-serif)",
                    color: "var(--el-gold)",
                  }}
                >
                  {milestone.year}
                </span>
                <h3
                  className="mt-2 text-lg font-light tracking-wide"
                  style={{
                    fontFamily: "var(--el-font-serif)",
                    color: "var(--el-navy)",
                  }}
                >
                  {milestone.title}
                </h3>
                <p
                  className="mt-2 text-sm font-light leading-relaxed"
                  style={{
                    fontFamily: "var(--el-font-sans)",
                    color: "var(--el-gray)",
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

      {/* ── Gold divider ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-center">
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="mx-4 h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
      </div>

      {/* ── Section 4: Craftsmanship ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* Left: gradient placeholder */}
          <div
            className="w-full overflow-hidden"
            style={{
              aspectRatio: "4/5",
              background:
                "linear-gradient(155deg, #E8E3DA 0%, #C4A265 25%, #A88B50 55%, #1B2A4A 100%)",
            }}
          />

          {/* Right: text */}
          <div className="max-w-lg py-8">
            <div
              className="mb-8 h-px w-12"
              style={{ backgroundColor: "var(--el-gold)" }}
            />
            <p
              className="mb-3 text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gold)",
              }}
            >
              Das Atelier
            </p>
            <h3
              className="mb-6 text-3xl font-light leading-snug tracking-wide sm:text-4xl"
              style={{
                fontFamily: "var(--el-font-serif)",
                color: "var(--el-navy)",
              }}
            >
              Wo Hände das Erbe formen
            </h3>
            <p
              className="mb-6 text-base font-light leading-relaxed"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
                lineHeight: 1.85,
              }}
            >
              Unsere Materialien stammen aus den feinsten Manufakturen in
              Italien, Japan und Belgien. Wir arbeiten mit Kunsthandwerkern, die
              ihr Leben der Meisterung eines einzigen Handwerks gewidmet haben
              -- Weber, Färber, Zuschneider und Schneider, deren Expertise über
              Generationen reicht.
            </p>
            <p
              className="text-base font-light leading-relaxed"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
                lineHeight: 1.85,
              }}
            >
              Jedes Kleidungsstück passiert Dutzende geschickter Hände, bevor
              es zu Ihnen gelangt. Vom ersten Drapieren auf der Schneiderpuppe
              bis zum finalen Bügeln glauben wir, dass die Schönheit eines
              Stückes nicht nur in dem liegt, was Sie sehen, sondern in den
              unsichtbaren Stunden der Hingabe, die in jede Naht eingewoben
              sind.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: CTA ───────────────────────────────────────────── */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--el-cream)" }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div
            className="mx-auto mb-8 h-px w-16"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <h2
            className="mb-6 text-3xl font-light tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Die Kollektion entdecken
          </h2>
          <p
            className="mb-10 text-base font-light leading-relaxed"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gray)",
              lineHeight: 1.8,
            }}
          >
            Entdecken Sie unsere sorgfältig kuratierten Kollektionen, von denen
            jede ihre eigene Geschichte von Handwerkskunst, Schönheit und
            Intention erzählt.
          </p>
          <Link
            href="/templates/fashion/elegance/collections"
            className="inline-block px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
            style={{
              fontFamily: "var(--el-font-sans)",
              backgroundColor: "var(--el-navy)",
              color: "var(--el-cream)",
              border: "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--el-gold)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--el-navy)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.backgroundColor = "var(--el-navy)";
              e.currentTarget.style.color = "var(--el-cream)";
            }}
          >
            Unsere Kollektionen besuchen
          </Link>
        </div>
      </section>
    </main>
  );
}
