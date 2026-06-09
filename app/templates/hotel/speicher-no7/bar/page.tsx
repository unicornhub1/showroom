import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import { BASE, barSpaces, signatureDrinks, formatPrice, CONTACT } from "../_design/data";

export const metadata: Metadata = {
  title: "Bar | SPEICHER No.7",
  description:
    "Die Bar im SPEICHER No.7: Signature-Cocktails am Tresen unter den Gussstützen, Naturweine auf der Dachterrasse und ein Drink mit Hafenblick an der Kaikante.",
};

const IMG = `${BASE}/images`;
const barHours = CONTACT.hours.find((h) => h.label === "Bar")?.value ?? "Mi – Sa, 17:00 – 1:00 Uhr";

export default function BarPage() {
  return (
    <div>
      <PageHeader
        image={`${IMG}/wedding/dachterrasse.jpg`}
        gradient="linear-gradient(135deg, #B5603A 0%, #2A2826 100%)"
        eyebrow="Die Bar"
        title="Ein Drink mit Hafenblick"
        subtitle="Cocktails, Naturweine und ein Glas mit Aussicht — am Tresen, auf der Dachterrasse und direkt am Wasser."
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
                  Wenn das Tageslicht weich wird, öffnet die Bar im alten Speicher: dunkles Holz,
                  ein offenes Spirituosen-Regal und der Blick aufs Hafenbecken.
                </p>
                <p className="mt-7 max-w-xl text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                  Unsere Bartender mixen durchdachte Signature-Cocktails, schenken Naturweine aus
                  und kennen den richtigen Drink für jede Stunde des Abends — ob zum Aperitivo
                  oder als letztes Glas an der Kaikante.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bereiche */}
      <section className="pb-24 lg:pb-36" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <span className="sp-index" style={{ color: "var(--sp-muted)" }}>01 &mdash; Bereiche</span>
            <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
              Drei Orte, ein Glas
            </h2>
            <div className="mt-8 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
          </FadeIn>
          <div className="mt-12 grid gap-px md:grid-cols-3" style={{ backgroundColor: "var(--sp-line)" }}>
            {barSpaces.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.1}>
                <div className="flex h-full flex-col" style={{ backgroundColor: "var(--sp-bg)" }}>
                  <Media src={s.image} alt={s.name} gradient={s.gradient} className="aspect-[4/3] w-full rounded-none" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="flex flex-1 flex-col p-8 lg:p-10">
                    <span className="sp-index" style={{ color: "var(--sp-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 text-2xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>{s.name}</h3>
                    <div className="mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--sp-font-mono)" }}>
                      <span style={{ color: "var(--sp-text)" }}>{s.best}</span>
                      <span style={{ color: "var(--sp-line)" }}>/</span>
                      <span style={{ color: "var(--sp-muted)" }}>{s.capacity}</span>
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

      {/* Signature Drinks */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <Media src={`${IMG}/wedding/kai.jpg`} alt="Drinks an der Kaikante" gradient="linear-gradient(135deg, #2A2826 0%, #B5603A 100%)" className="aspect-[4/5] w-full rounded-none" sizes="(max-width: 1024px) 100vw, 50vw" />
            </FadeIn>
            <FadeIn delay={0.12}>
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>02 &mdash; Signature Drinks</span>
              <div className="mt-5 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
              <h2 className="mt-8 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                Unsere Hausmischungen
              </h2>
              <p className="mt-7 max-w-xl text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                Eine kleine, eigene Karte, die wir mit den Jahreszeiten verändern — frische
                Kräuter, hausgemachte Cordials und gute Spirituosen, ehrlich gemixt.
              </p>
              <div className="mt-8">
                {signatureDrinks.map((d) => (
                  <div key={d.id} className="flex items-baseline justify-between gap-4 border-b py-4" style={{ borderColor: "var(--sp-line)" }}>
                    <div>
                      <div className="text-lg font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>{d.name}</div>
                      <div className="mt-1 text-sm" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)" }}>{d.description}</div>
                    </div>
                    <span className="shrink-0 text-[13px]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}>{formatPrice(d.price)}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bilderstreifen */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-px md:grid-cols-4" style={{ backgroundColor: "var(--sp-line)" }}>
            {[
              { src: `${IMG}/wedding/kai.jpg`, alt: "Ein Drink an der Kaikante" },
              { src: `${IMG}/restaurant/interior.jpg`, alt: "Am Tresen der Hafenbar" },
              { src: `${IMG}/wedding/halle.jpg`, alt: "Die Bar unter den Gussstützen" },
              { src: `${IMG}/wedding/dachterrasse.jpg`, alt: "Sundowner auf der Dachterrasse" },
            ].map((p, i) => (
              <FadeIn key={p.src} delay={i * 0.08}>
                <Media src={p.src} alt={p.alt} gradient="linear-gradient(135deg, #B5603A 0%, #2A2826 100%)" className="aspect-square w-full rounded-none" sizes="(max-width: 768px) 50vw, 25vw" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Öffnungszeiten & CTA */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>03 &mdash; Geöffnet</span>
              <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                Auf einen Drink vorbei
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                Die Bar ist {barHours} geöffnet. Für größere Runden reservieren Sie gern vorab —
                schreiben Sie uns kurz, wir halten Ihnen den Tresen frei.
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}>
                Bar &middot; {barHours}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href={`${BASE}/kontakt`} className="inline-block rounded-none border px-8 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-bg)", backgroundColor: "var(--sp-text)", borderColor: "var(--sp-text)" }}>
                Tisch an der Bar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
