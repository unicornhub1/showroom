import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import RoomBooking from "../_design/components/RoomBooking";
import { BASE, rooms, formatPrice } from "../_design/data";

export const metadata: Metadata = {
  title: "Zimmer & Suiten | GUT ROSENAU",
  description:
    "24 individuelle Zimmer und Suiten auf Gut Rosenau — vom Kaminzimmer im historischen Gutshaus bis zum Scheunen-Loft.",
};

export default function HotelPage() {
  return (
    <div>
      <PageHeader
        image={`${BASE}/images/rooms/gartensuite.jpg`}
        gradient="linear-gradient(135deg, #D7DCCE 0%, #9C7B3F 100%)"
        eyebrow="Das Hotel"
        title="Zimmer & Suiten"
        subtitle="Vierundzwanzig Räume, kein Zimmer wie das andere — historisches Gemäuer, mit moderner Hand eingerichtet."
      />

      {/* Intro */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Ankommen & bleiben</span>
            <p className="mt-6 text-xl leading-[1.8] sm:text-2xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)", fontStyle: "italic" }}>
              Jedes unserer Zimmer trägt den Charakter des alten Guts — dicke Mauern, warmes Holz,
              viel Licht. Und überall der leise Komfort, den man heute erwartet.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Rooms */}
      <section className="pb-24 lg:pb-36" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-7xl space-y-20 px-6 lg:space-y-28 lg:px-10">
          {rooms.map((room, i) => (
            <FadeIn key={room.id}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <Media
                    src={room.image}
                    alt={room.name}
                    gradient={room.gradient}
                    className="aspect-[4/3] w-full rounded-sm"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>
                    {room.size} m&sup2; &middot; bis {room.maxGuests} Gäste
                  </span>
                  <h2 className="mt-4 text-3xl sm:text-4xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
                    {room.name}
                  </h2>
                  <div className="my-6 ro-rule" />
                  <p className="text-lg leading-[1.8]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
                    {room.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {room.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full px-3 py-1.5 text-xs"
                        style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-card)", color: "var(--ro-text)", border: "1px solid var(--ro-line)" }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-6">
                    <div>
                      <span className="text-2xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-accent)" }}>
                        ab {formatPrice(room.price)}
                      </span>
                      <span className="ml-1 text-sm" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>
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
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--ro-deep)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "var(--ro-font-display)", color: "#FBF8F2" }}>
            Bereit für ein paar ruhige Tage?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg" style={{ fontFamily: "var(--ro-font-sans)", color: "rgba(251,248,242,0.75)", fontWeight: 300 }}>
            Prüfen Sie Ihre Wunschtermine — wir bestätigen Ihre Reservierung persönlich.
          </p>
          <Link href={`${BASE}/kontakt`} className="mt-8 inline-block px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90" style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "#FBF8F2" }}>
            Verfügbarkeit anfragen
          </Link>
        </div>
      </section>
    </div>
  );
}
