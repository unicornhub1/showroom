import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import Ornament from "../_design/components/Ornament";
import PageHeader from "../_design/components/PageHeader";
import RoomBooking from "../_design/components/RoomBooking";
import { BASE, rooms, formatPrice } from "../_design/data";

export const metadata: Metadata = {
  title: "Zimmer & Suiten | VILLA AURELIA",
  description:
    "26 individuelle Zimmer und Suiten in der Villa Aurelia — von der Beletage-Suite mit Stuckdecke bis zum Atelier unterm Dach.",
};

export default function HotelPage() {
  return (
    <div>
      <PageHeader
        image={`${BASE}/images/rooms/beletage.jpg`}
        gradient="linear-gradient(135deg, #DDE3DC 0%, #1F4D3A 100%)"
        eyebrow="Das Hotel"
        title="Zimmer & Suiten"
        subtitle="Sechsundzwanzig Räume, kein Zimmer wie das andere — Gründerzeit-Substanz, mit moderner Hand eingerichtet."
      />

      {/* Intro */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "var(--va-gold)" }}>Ankommen &amp; bleiben</span>
            <p className="mt-8 text-2xl leading-[1.7] sm:text-3xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)", fontStyle: "italic" }}>
              Jedes unserer Zimmer trägt den Charakter der alten Villa — hohe Decken, warmes
              Parkett, viel Licht. Und überall der leise Komfort, den man heute erwartet.
            </p>
            <Ornament className="mt-10" />
          </FadeIn>
        </div>
      </section>

      {/* Rooms */}
      <section className="pb-28 lg:pb-44" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-7xl space-y-24 px-6 lg:space-y-36 lg:px-10">
          {rooms.map((room, i) => (
            <FadeIn key={room.id}>
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="va-frame">
                    <Media
                      src={room.image}
                      alt={room.name}
                      gradient={room.gradient}
                      className="aspect-[4/3] w-full"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-gold)" }}>
                    {room.size} m&sup2; &middot; bis {room.maxGuests} Gäste
                  </span>
                  <h2 className="mt-5 text-4xl sm:text-5xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
                    {room.name}
                  </h2>
                  <div className="my-7 va-rule" />
                  <p className="text-lg leading-[1.85]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}>
                    {room.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {room.amenities.map((a) => (
                      <span
                        key={a}
                        className="px-4 py-1.5 text-xs"
                        style={{ fontFamily: "var(--va-font-sans)", backgroundColor: "var(--va-surface)", color: "var(--va-text)", border: "1px solid var(--va-line)", letterSpacing: "0.04em" }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <div className="mt-9 flex flex-wrap items-center gap-7">
                    <div>
                      <span className="text-3xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-accent)" }}>
                        ab {formatPrice(room.price)}
                      </span>
                      <span className="ml-2 text-sm" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>
                        pro Nacht
                      </span>
                    </div>
                    <RoomBooking room={{ name: room.name, price: room.price }} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--va-deep)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Ornament className="mb-10" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4" }}>
            Bereit für ein paar <span style={{ fontStyle: "italic", color: "var(--va-gold)" }}>ruhige Tage</span> in der Stadt?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.78)", fontWeight: 300 }}>
            Prüfen Sie Ihre Wunschtermine — wir bestätigen Ihre Reservierung persönlich.
          </p>
          <Link href={`${BASE}/kontakt`} className="va-btn-gold va-btn-gold--ondark mt-10 px-9 py-4">
            Verfügbarkeit anfragen
          </Link>
        </div>
      </section>
    </div>
  );
}
