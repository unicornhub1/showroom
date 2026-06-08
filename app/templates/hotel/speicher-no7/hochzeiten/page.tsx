import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import { BASE, eventSpaces, weddingPackages, testimonials } from "../_design/data";

export const metadata: Metadata = {
  title: "Hochzeiten & Events | SPEICHER No.7",
  description:
    "Heiraten im SPEICHER No.7: freie Trauung an der Kaikante, Empfang auf der Dachterrasse, Lofthochzeit in der Halle — für bis zu 150 Gäste.",
};

const IMG = `${BASE}/images`;
const wedding = testimonials.find((t) => t.context.includes("Hochzeit")) ?? testimonials[0];

export default function HochzeitenPage() {
  return (
    <div>
      <PageHeader
        image={`${IMG}/wedding/ceremony.jpg`}
        gradient="linear-gradient(135deg, #B5603A 0%, #2A2826 100%)"
        eyebrow="Hochzeiten & Events"
        title="Ihr Ja-Wort, wo Geschichte wohnt"
        subtitle="Drei einzigartige Orte am Wasser, ein unvergesslicher Tag — exklusiv nur für Sie und Ihre Gäste."
      />

      {/* Intro */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <span className="sp-index" style={{ color: "var(--sp-muted)" }}>00 &mdash; Willkommen</span>
                <div className="mt-5 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
              </div>
              <div className="lg:col-span-8">
                <p className="text-2xl font-medium leading-[1.3] tracking-tight sm:text-3xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                  Vom Sektempfang über den Dächern bis zur Party in der Halle: Im SPEICHER No.7 wird
                  Ihre Hochzeit zu einem Tag, der nach Geschichte schmeckt und sich modern anfühlt.
                </p>
                <p className="mt-7 max-w-xl text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                  Eine persönliche Hochzeitsplanerin begleitet Sie von der ersten Idee bis zum letzten
                  Tanz. Auf Wunsch übernachten alle Gäste direkt bei uns im Speicher.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Locations */}
      <section className="pb-24 lg:pb-36" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <span className="sp-index" style={{ color: "var(--sp-muted)" }}>01 &mdash; Locations</span>
            <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
              Drei Orte, eine Feier
            </h2>
            <div className="mt-8 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
          </FadeIn>
          <div className="mt-12 grid gap-px md:grid-cols-3" style={{ backgroundColor: "var(--sp-line)" }}>
            {eventSpaces.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.1}>
                <div className="flex h-full flex-col" style={{ backgroundColor: "var(--sp-bg)" }}>
                  <Media src={s.image} alt={s.name} gradient={s.gradient} className="aspect-[4/3] w-full rounded-none" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="flex flex-1 flex-col p-8 lg:p-10">
                    <span className="sp-index" style={{ color: "var(--sp-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 text-2xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>{s.name}</h3>
                    <div className="mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--sp-font-mono)" }}>
                      <span style={{ color: "var(--sp-text)" }}>{s.capacity}</span>
                      <span style={{ color: "var(--sp-line)" }}>/</span>
                      <span style={{ color: "var(--sp-muted)" }}>{s.best}</span>
                    </div>
                    <p className="mt-5 flex-1 text-[15px] leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
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
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <span className="sp-index" style={{ color: "var(--sp-muted)" }}>02 &mdash; Hochzeitspakete</span>
            <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
              Für jede Feier das Passende
            </h2>
            <div className="mt-8 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
          </FadeIn>
          <div className="mt-12 grid gap-px lg:grid-cols-3" style={{ backgroundColor: "var(--sp-line)" }}>
            {weddingPackages.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <div
                  className="flex h-full flex-col p-8 lg:p-10"
                  style={{ backgroundColor: p.featured ? "var(--sp-text)" : "var(--sp-bg)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="sp-index" style={{ color: p.featured ? "rgba(247,245,241,0.6)" : "var(--sp-muted)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p.featured && (
                      <span className="text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}>
                        {p.note}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-2xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: p.featured ? "#F7F5F1" : "var(--sp-text)" }}>
                    {p.name}
                  </h3>
                  <div className="mt-3 text-3xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: p.featured ? "#F7F5F1" : "var(--sp-text)" }}>
                    {p.priceLabel}
                  </div>
                  {!p.featured && (
                    <span className="mt-2 text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                      {p.note}
                    </span>
                  )}
                  <div className="my-7 h-px" style={{ backgroundColor: p.featured ? "rgba(247,245,241,0.18)" : "var(--sp-line)" }} />
                  <ul className="flex-1 space-y-4">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: p.featured ? "rgba(247,245,241,0.82)" : "var(--sp-muted)", fontWeight: 300 }}>
                        <span style={{ color: "var(--sp-accent)" }}>—</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${BASE}/kontakt`}
                    className="mt-9 block rounded-none border py-3.5 text-center text-[11px] uppercase tracking-[0.18em] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--sp-font-mono)",
                      backgroundColor: p.featured ? "#F7F5F1" : "transparent",
                      color: p.featured ? "var(--sp-text)" : "var(--sp-text)",
                      borderColor: p.featured ? "#F7F5F1" : "var(--sp-text)",
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
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-px md:grid-cols-4" style={{ backgroundColor: "var(--sp-line)" }}>
            {[
              { src: `${IMG}/wedding/kai.jpg`, alt: "Trauung an der Kaikante" },
              { src: `${IMG}/wedding/dinner.jpg`, alt: "Hochzeitsdinner" },
              { src: `${IMG}/wedding/halle.jpg`, alt: "Feier in der Halle" },
              { src: `${IMG}/wedding/dachterrasse.jpg`, alt: "Empfang auf der Dachterrasse" },
            ].map((p, i) => (
              <FadeIn key={p.src} delay={i * 0.08}>
                <Media src={p.src} alt={p.alt} gradient="linear-gradient(135deg, #B5603A 0%, #2A2826 100%)" className="aspect-square w-full rounded-none" sizes="(max-width: 768px) 50vw, 25vw" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>03 &mdash; Stimmen</span>
              <div className="mt-5 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
            </div>
            <FadeIn className="lg:col-span-9">
              <blockquote className="text-2xl font-medium leading-[1.35] tracking-tight sm:text-4xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                {wedding.quote}
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-10" style={{ backgroundColor: "var(--sp-accent)" }} />
                <p className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}>{wedding.author}</p>
                <span className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>{wedding.context}</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>04 &mdash; Planung</span>
              <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                Lassen Sie uns Ihren Tag planen
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                Erzählen Sie uns von Ihrer Wunschhochzeit — wir melden uns mit einem persönlichen
                Angebot und laden Sie zu einer Besichtigung ein.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href={`${BASE}/kontakt`} className="inline-block rounded-none border px-8 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-bg)", backgroundColor: "var(--sp-text)", borderColor: "var(--sp-text)" }}>
                Hochzeit anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
