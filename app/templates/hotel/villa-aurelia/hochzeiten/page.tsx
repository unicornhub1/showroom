import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import Ornament from "../_design/components/Ornament";
import PageHeader from "../_design/components/PageHeader";
import { BASE, eventSpaces, weddingPackages, testimonials } from "../_design/data";

export const metadata: Metadata = {
  title: "Hochzeiten & Feste | VILLA AURELIA",
  description:
    "Heiraten in der Villa Aurelia: freie Trauung im Wintergarten, Festbankett im Spiegelsaal, Sommerfeier auf der Park-Terrasse — für bis zu 140 Gäste.",
};

const IMG = `${BASE}/images`;
const wedding = testimonials.find((t) => t.context.includes("Hochzeit")) ?? testimonials[0];

export default function HochzeitenPage() {
  return (
    <div>
      <PageHeader
        image={`${IMG}/wedding/ceremony.jpg`}
        gradient="linear-gradient(135deg, #B79257 0%, #1C2620 100%)"
        eyebrow="Hochzeiten & Feste"
        title="Ihr Ja-Wort, wo Geschichte wohnt"
        subtitle="Drei einzigartige Orte, ein unvergesslicher Tag — exklusiv nur für Sie und Ihre Gäste."
      />

      {/* Intro */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "var(--va-gold)" }}>Willkommen</span>
            <p className="mt-8 text-2xl leading-[1.65] sm:text-3xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)", fontStyle: "italic" }}>
              Vom Sektempfang im Wintergarten bis zum Ball im Spiegelsaal: In der Villa Aurelia
              wird Ihre Hochzeit zu einem Tag, der nach Geschichte schmeckt und sich modern anfühlt.
            </p>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}>
              Eine persönliche Hochzeitsplanerin begleitet Sie von der ersten Idee bis zum letzten
              Tanz. Auf Wunsch übernachten alle Gäste direkt bei uns in der Villa.
            </p>
            <Ornament className="mt-10" />
          </FadeIn>
        </div>
      </section>

      {/* Locations */}
      <section className="pb-8" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="mb-16 text-center">
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "var(--va-gold)" }}>Unsere Locations</span>
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              Drei Orte, eine <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>Feier</span>
            </h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
            {eventSpaces.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.12}>
                <div className="group flex h-full flex-col overflow-hidden" style={{ backgroundColor: "var(--va-surface)", border: "1px solid var(--va-line)", boxShadow: "0 2px 24px rgba(28,38,32,0.05)" }}>
                  <div className="overflow-hidden">
                    <Media src={s.image} alt={s.name} gradient={s.gradient} className="aspect-[4/3] w-full transition-transform duration-[1100ms] ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-8 lg:p-9">
                    <span className="va-grow-line mb-5" />
                    <h3 className="text-2xl sm:text-3xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>{s.name}</h3>
                    <div className="mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-accent)" }}>
                      <span>{s.capacity}</span>
                      <span style={{ color: "var(--va-gold)" }}>&#9670;</span>
                      <span style={{ color: "var(--va-muted)" }}>{s.best}</span>
                    </div>
                    <p className="mt-5 flex-1 text-[15px] leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}>
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
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--va-card)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="mb-16 text-center">
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "var(--va-gold)" }}>Hochzeitspakete</span>
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              Für jede Feier das <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>Passende</span>
            </h2>
          </FadeIn>
          <div className="grid gap-8 lg:grid-cols-3">
            {weddingPackages.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <div
                  className="relative flex h-full flex-col p-9 lg:p-10"
                  style={{
                    backgroundColor: p.featured ? "var(--va-deep)" : "var(--va-surface)",
                    border: p.featured ? "1px solid var(--va-gold)" : "1px solid var(--va-line)",
                    boxShadow: p.featured ? "0 28px 60px -22px rgba(28,38,32,0.4)" : "none",
                  }}
                >
                  {p.featured && (
                    <span className="mb-5 self-start px-4 py-1.5 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--va-font-sans)", border: "1px solid var(--va-gold)", color: "var(--va-gold)" }}>
                      {p.note}
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl" style={{ fontFamily: "var(--va-font-display)", color: p.featured ? "#FAF8F4" : "var(--va-text)" }}>
                    {p.name}
                  </h3>
                  <div className="mt-4 text-3xl sm:text-4xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-gold)" }}>
                    {p.priceLabel}
                  </div>
                  {!p.featured && (
                    <span className="mt-1.5 text-xs uppercase tracking-[0.18em]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>
                      {p.note}
                    </span>
                  )}
                  <div className="my-7 h-px" style={{ backgroundColor: p.featured ? "rgba(183,146,87,0.4)" : "var(--va-line)" }} />
                  <ul className="flex-1 space-y-3.5">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: p.featured ? "rgba(250,248,244,0.82)" : "var(--va-muted)", fontWeight: 300 }}>
                        <span className="mt-2 inline-block h-px w-3 shrink-0" style={{ backgroundColor: "var(--va-gold)" }} />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${BASE}/kontakt`}
                    className={`va-btn-gold mt-9 py-4 text-center ${p.featured ? "va-btn-gold--ondark" : ""}`}
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
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[
              { src: `${IMG}/wedding/wintergarten.jpg`, alt: "Trauung im Wintergarten" },
              { src: `${IMG}/wedding/dinner.jpg`, alt: "Hochzeitsdinner" },
              { src: `${IMG}/wedding/spiegelsaal.jpg`, alt: "Festbankett im Spiegelsaal" },
              { src: `${IMG}/wedding/terrasse.jpg`, alt: "Sommerfeier auf der Park-Terrasse" },
            ].map((p, i) => (
              <FadeIn key={p.src} delay={i * 0.08} className="group">
                <div className="va-frame">
                  <Media src={p.src} alt={p.alt} gradient="linear-gradient(135deg, #B79257 0%, #1C2620 100%)" className="aspect-square w-full transition-transform duration-[1100ms] ease-out group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative overflow-hidden py-24 lg:py-36" style={{ backgroundColor: "var(--va-deep)" }}>
        <div aria-hidden className="absolute left-6 top-10 select-none lg:left-20" style={{ fontFamily: "var(--va-font-display)", fontSize: "clamp(160px, 18vw, 300px)", lineHeight: 0.8, color: "var(--va-gold)", opacity: 0.12 }}>
          &ldquo;
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <blockquote className="text-2xl italic leading-[1.6] sm:text-3xl lg:text-[2.1rem]" style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4" }}>
              &bdquo;{wedding.quote}&ldquo;
            </blockquote>
            <div className="mx-auto mt-9 va-ornament max-w-xs">
              <span className="va-ornament__mark">&#9670;</span>
            </div>
            <p className="mt-7 text-sm uppercase tracking-[0.22em]" style={{ fontFamily: "var(--va-font-sans)", color: "#FAF8F4" }}>{wedding.author}</p>
            <p className="mt-1.5 text-sm" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.6)" }}>{wedding.context}</p>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <Ornament className="mb-10" />
            <h2 className="text-4xl leading-snug sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              Lassen Sie uns Ihren <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>Tag</span> planen
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}>
              Erzählen Sie uns von Ihrer Wunschhochzeit — wir melden uns mit einem persönlichen
              Angebot und laden Sie zu einer Besichtigung ein.
            </p>
            <Link href={`${BASE}/kontakt`} className="va-btn-gold mt-11 px-10 py-4">
              Hochzeit anfragen
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
