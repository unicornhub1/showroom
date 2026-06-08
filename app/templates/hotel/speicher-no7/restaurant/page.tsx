import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import { BASE, menu, featuredDishes, formatPrice } from "../_design/data";

export const metadata: Metadata = {
  title: "Restaurant | SPEICHER No.7",
  description:
    "Open-Kitchen am Wasser im SPEICHER No.7: saisonale Küche, ehrlich und regional, mit Blick aufs Hafenbecken.",
};

export default function RestaurantPage() {
  return (
    <div>
      <PageHeader
        image={`${BASE}/images/restaurant/interior.jpg`}
        gradient="linear-gradient(135deg, #2A2826 0%, #B5603A 100%)"
        eyebrow="Das Restaurant"
        title="Open Kitchen am Wasser"
        subtitle="Unsere Küche denkt in Jahreszeiten — ehrlich, regional und mit Finesse, offen vor Ihren Augen gekocht."
      />

      {/* Featured dishes */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <span className="sp-index" style={{ color: "var(--sp-muted)" }}>01 &mdash; Empfehlungen</span>
            <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
              Drei Lieblinge aus unserer Küche
            </h2>
            <div className="mt-8 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
          </FadeIn>
          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {featuredDishes.map((d, i) => (
              <FadeIn key={d.id} delay={i * 0.1}>
                <Media src={d.image} alt={d.name} gradient={d.gradient} className="aspect-[4/5] w-full rounded-none" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--sp-line)" }}>
                  <h3 className="text-xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>{d.name}</h3>
                  <span className="shrink-0 text-[13px]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}>{formatPrice(d.price)}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)" }}>{d.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Full menu */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <span className="sp-index" style={{ color: "var(--sp-muted)" }}>02 &mdash; Speisekarte</span>
                <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                  Saisonal &amp; regional
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                  Eine Auswahl unserer aktuellen Karte. Sie wechselt mit den Jahreszeiten und dem, was
                  Markt und Region hergeben.
                </p>
              </div>

              <div className="space-y-14 lg:col-span-8">
                {menu.map((cat, ci) => (
                  <FadeIn key={cat.title} delay={ci * 0.08}>
                    <h3 className="text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}>
                      {cat.title}
                    </h3>
                    <div className="mt-5">
                      {cat.items.map((item) => (
                        <div key={item.name} className="flex items-baseline gap-4 border-t py-5" style={{ borderColor: "var(--sp-line)" }}>
                          <div className="min-w-0 flex-1">
                            <span className="text-lg font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>{item.name}</span>
                            <p className="mt-1 text-sm leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)" }}>{item.description}</p>
                          </div>
                          <span className="shrink-0 text-[13px]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}>{formatPrice(item.price)}</span>
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>03 &mdash; Reservierung</span>
              <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                Einen Tisch reservieren
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                Unser Restaurant ist von Mittwoch bis Sonntag abends geöffnet. Wir empfehlen eine
                Reservierung.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href={`${BASE}/kontakt`} className="inline-block rounded-none border px-8 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-bg)", backgroundColor: "var(--sp-text)", borderColor: "var(--sp-text)" }}>
                Tisch anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
