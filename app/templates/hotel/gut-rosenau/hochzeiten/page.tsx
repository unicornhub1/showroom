import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import { BASE, eventSpaces, weddingPackages, testimonials } from "../_design/data";

export const metadata: Metadata = {
  title: "Hochzeiten & Feste | GUT ROSENAU",
  description:
    "Heiraten auf Gut Rosenau: freie Trauung im Rosengarten, Dinner im Gewölbesaal, Feiern in der Zehntscheune — für bis zu 120 Gäste.",
};

const IMG = `${BASE}/images`;
const wedding = testimonials.find((t) => t.context.includes("Hochzeit")) ?? testimonials[0];

export default function HochzeitenPage() {
  return (
    <div>
      <PageHeader
        image={`${IMG}/wedding/ceremony.jpg`}
        gradient="linear-gradient(135deg, #9C7B3F 0%, #34302A 100%)"
        eyebrow="Hochzeiten & Feste"
        title="Ihr Ja-Wort, wo Geschichte wohnt"
        subtitle="Drei einzigartige Orte, ein unvergesslicher Tag — exklusiv nur für Sie und Ihre Gäste."
      />

      {/* Intro */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Willkommen</span>
            <p className="mt-6 text-xl leading-[1.8] sm:text-2xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)", fontStyle: "italic" }}>
              Vom Sektempfang unter alten Linden bis zur Party in der Scheune: Auf Gut Rosenau wird
              Ihre Hochzeit zu einem Tag, der nach Geschichte schmeckt und sich modern anfühlt.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
              Eine persönliche Hochzeitsplanerin begleitet Sie von der ersten Idee bis zum letzten
              Tanz. Auf Wunsch übernachten alle Gäste direkt bei uns.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Locations */}
      <section className="pb-8" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="mb-14 text-center">
            <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Unsere Locations</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              Drei Orte, eine Feier
            </h2>
          </FadeIn>
          <div className="grid gap-7 md:grid-cols-3">
            {eventSpaces.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.12}>
                <div className="h-full overflow-hidden rounded-sm" style={{ backgroundColor: "var(--ro-surface)", boxShadow: "0 2px 24px rgba(42,37,32,0.05)" }}>
                  <Media src={s.image} alt={s.name} gradient={s.gradient} className="aspect-[4/3] w-full" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>{s.name}</h3>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}>
                      <span>{s.capacity}</span>
                      <span style={{ color: "var(--ro-line)" }}>•</span>
                      <span style={{ color: "var(--ro-muted)" }}>{s.best}</span>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
                      {s.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--ro-card)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="mb-14 text-center">
            <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Hochzeitspakete</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              Für jede Feier das Passende
            </h2>
          </FadeIn>
          <div className="grid gap-7 lg:grid-cols-3">
            {weddingPackages.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <div
                  className="flex h-full flex-col rounded-sm p-8"
                  style={{
                    backgroundColor: p.featured ? "var(--ro-deep)" : "var(--ro-surface)",
                    border: p.featured ? "none" : "1px solid var(--ro-line)",
                    boxShadow: p.featured ? "0 20px 50px rgba(42,37,32,0.18)" : "none",
                  }}
                >
                  {p.featured && (
                    <span className="mb-4 self-start rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "#FBF8F2" }}>
                      {p.note}
                    </span>
                  )}
                  <h3 className="text-2xl" style={{ fontFamily: "var(--ro-font-display)", color: p.featured ? "#FBF8F2" : "var(--ro-text)" }}>
                    {p.name}
                  </h3>
                  <div className="mt-3 text-3xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-accent)" }}>
                    {p.priceLabel}
                  </div>
                  {!p.featured && (
                    <span className="mt-1 text-xs uppercase tracking-[0.18em]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>
                      {p.note}
                    </span>
                  )}
                  <div className="my-6 h-px" style={{ backgroundColor: p.featured ? "rgba(251,248,242,0.15)" : "var(--ro-line)" }} />
                  <ul className="flex-1 space-y-3">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: p.featured ? "rgba(251,248,242,0.8)" : "var(--ro-muted)", fontWeight: 300 }}>
                        <span style={{ color: "var(--ro-accent)" }}>—</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${BASE}/kontakt`}
                    className="mt-8 block py-3.5 text-center text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90"
                    style={{
                      fontFamily: "var(--ro-font-sans)",
                      backgroundColor: p.featured ? "var(--ro-accent)" : "transparent",
                      color: p.featured ? "#FBF8F2" : "var(--ro-accent)",
                      border: p.featured ? "none" : "1px solid var(--ro-accent)",
                    }}
                  >
                    Anfragen
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { src: `${IMG}/wedding/garten.jpg`, alt: "Trauung im Rosengarten" },
              { src: `${IMG}/wedding/dinner.jpg`, alt: "Hochzeitsdinner" },
              { src: `${IMG}/wedding/scheune.jpg`, alt: "Feier in der Scheune" },
              { src: `${IMG}/wedding/saal.jpg`, alt: "Dinner im Gewölbesaal" },
            ].map((p, i) => (
              <FadeIn key={p.src} delay={i * 0.08}>
                <Media src={p.src} alt={p.alt} gradient="linear-gradient(135deg, #9C7B3F 0%, #34302A 100%)" className="aspect-square w-full rounded-sm" sizes="(max-width: 768px) 50vw, 25vw" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--ro-deep)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <blockquote className="text-2xl italic leading-[1.7] sm:text-3xl" style={{ fontFamily: "var(--ro-font-display)", color: "#FBF8F2" }}>
              &bdquo;{wedding.quote}&ldquo;
            </blockquote>
            <div className="mx-auto my-7 h-px w-14" style={{ backgroundColor: "var(--ro-accent)" }} />
            <p className="text-sm uppercase tracking-[0.18em]" style={{ fontFamily: "var(--ro-font-sans)", color: "#FBF8F2" }}>{wedding.author}</p>
            <p className="mt-1 text-sm" style={{ fontFamily: "var(--ro-font-sans)", color: "rgba(251,248,242,0.6)" }}>{wedding.context}</p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <h2 className="text-3xl leading-snug sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              Lassen Sie uns Ihren Tag planen
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
              Erzählen Sie uns von Ihrer Wunschhochzeit — wir melden uns mit einem persönlichen
              Angebot und laden Sie zu einer Besichtigung ein.
            </p>
            <Link href={`${BASE}/kontakt`} className="mt-9 inline-block px-9 py-4 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90" style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "#FBF8F2" }}>
              Hochzeit anfragen
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
