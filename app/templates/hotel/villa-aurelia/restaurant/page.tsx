import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import Ornament from "../_design/components/Ornament";
import PageHeader from "../_design/components/PageHeader";
import { BASE, menu, featuredDishes, formatPrice } from "../_design/data";

export const metadata: Metadata = {
  title: "Restaurant | VILLA AURELIA",
  description:
    "Fine Dining in der Villa Aurelia: saisonale Küche aus dem Villengarten, dem Umland und von den Höfen der Region — klassisch elegant, modern serviert.",
};

export default function RestaurantPage() {
  return (
    <div>
      <PageHeader
        image={`${BASE}/images/restaurant/interior.jpg`}
        gradient="linear-gradient(135deg, #1C2620 0%, #1F4D3A 100%)"
        eyebrow="Das Restaurant"
        title="Klassik, modern serviert"
        subtitle="Unsere Küche denkt in Jahreszeiten — ehrlich, regional und mit kultivierter Finesse interpretiert."
      />

      {/* Featured dishes */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "var(--va-gold)" }}>Empfehlungen des Hauses</span>
            <h2 className="mt-5 text-4xl sm:text-5xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              Drei Lieblinge aus unserer <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>Küche</span>
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {featuredDishes.map((d, i) => (
              <FadeIn key={d.id} delay={i * 0.12} className="group">
                <div className="va-frame">
                  <Media src={d.image} alt={d.name} gradient={d.gradient} className="aspect-[4/5] w-full transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <span className="va-grow-line mt-6" />
                <h3 className="mt-4 text-2xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>{d.description}</p>
                <span className="mt-3 inline-block text-[15px]" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-accent)" }}>{formatPrice(d.price)}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Full menu */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--va-card)" }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <FadeIn className="text-center">
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "var(--va-gold)" }}>Speisekarte</span>
            <h2 className="mt-5 text-4xl sm:text-5xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              Saisonal <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>&amp;</span> regional
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>
              Eine Auswahl unserer aktuellen Karte. Sie wechselt mit den Jahreszeiten und dem, was
              Garten und Region hergeben.
            </p>
          </FadeIn>

          <div className="mt-16 space-y-16">
            {menu.map((cat, ci) => (
              <FadeIn key={cat.title} delay={ci * 0.08}>
                {ci > 0 && <Ornament className="mb-14" />}
                <h3 className="mb-8 text-center text-3xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-accent)" }}>
                  {cat.title}
                </h3>
                <div className="space-y-6">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-baseline gap-4">
                      <div className="min-w-0">
                        <span className="text-xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>{item.name}</span>
                        <p className="mt-0.5 text-sm leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>{item.description}</p>
                      </div>
                      <span className="flex-1 translate-y-[-4px] border-b border-dotted" style={{ borderColor: "var(--va-gold)", opacity: 0.5 }} />
                      <span className="shrink-0 text-xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-accent)" }}>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <Ornament className="mb-10" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              Einen Tisch <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>reservieren</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}>
              Unser Restaurant ist von Dienstag bis Sonntag abends geöffnet. Wir empfehlen eine
              Reservierung.
            </p>
            <Link href={`${BASE}/kontakt`} className="va-btn-gold mt-10 px-9 py-4">
              Tisch anfragen
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
