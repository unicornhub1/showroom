import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import { BASE, menu, featuredDishes, formatPrice } from "../_design/data";

export const metadata: Metadata = {
  title: "Restaurant | GUT ROSENAU",
  description:
    "Farm-to-table auf Gut Rosenau: saisonale Küche aus eigenem Garten, eigener Jagd und von den Höfen der Region.",
};

export default function RestaurantPage() {
  return (
    <div>
      <PageHeader
        image={`${BASE}/images/restaurant/interior.jpg`}
        gradient="linear-gradient(135deg, #34302A 0%, #9C7B3F 100%)"
        eyebrow="Das Restaurant"
        title="Vom Feld auf den Teller"
        subtitle="Unsere Küche denkt in Jahreszeiten — ehrlich, regional und mit Finesse interpretiert."
      />

      {/* Featured dishes */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Empfehlungen des Hauses</span>
            <h2 className="mt-4 text-3xl sm:text-4xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              Drei Lieblinge aus unserer Küche
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {featuredDishes.map((d, i) => (
              <FadeIn key={d.id} delay={i * 0.12}>
                <Media src={d.image} alt={d.name} gradient={d.gradient} className="aspect-[4/5] w-full rounded-sm" sizes="(max-width: 768px) 100vw, 33vw" />
                <h3 className="mt-5 text-xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>{d.description}</p>
                <span className="mt-2 inline-block text-[15px]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}>{formatPrice(d.price)}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Full menu */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--ro-card)" }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <FadeIn className="text-center">
            <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Speisekarte</span>
            <h2 className="mt-4 text-3xl sm:text-4xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              Saisonal & regional
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>
              Eine Auswahl unserer aktuellen Karte. Sie wechselt mit den Jahreszeiten und dem, was
              Garten und Region hergeben.
            </p>
          </FadeIn>

          <div className="mt-14 space-y-14">
            {menu.map((cat, ci) => (
              <FadeIn key={cat.title} delay={ci * 0.08}>
                <h3 className="mb-6 text-center text-2xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-accent)" }}>
                  {cat.title}
                </h3>
                <div className="space-y-5">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-baseline gap-4">
                      <div className="min-w-0">
                        <span className="text-lg" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>{item.name}</span>
                        <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>{item.description}</p>
                      </div>
                      <span className="flex-1 translate-y-[-3px] border-b border-dotted" style={{ borderColor: "var(--ro-line)" }} />
                      <span className="shrink-0 text-lg" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              Einen Tisch reservieren
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
              Unser Restaurant ist von Mittwoch bis Sonntag abends geöffnet. Wir empfehlen eine
              Reservierung.
            </p>
            <Link href={`${BASE}/kontakt`} className="mt-8 inline-block px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90" style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "#FBF8F2" }}>
              Tisch anfragen
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
