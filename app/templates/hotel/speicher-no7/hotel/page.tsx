import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import RoomBooking from "../_design/components/RoomBooking";
import { BASE, rooms, formatPrice } from "../_design/data";

export const metadata: Metadata = {
  title: "Lofts & Studios | SPEICHER No.7",
  description:
    "32 individuelle Lofts und Studios im SPEICHER No.7 — vom Loft am Wasser bis zum Penthouse unter dem alten Dachstuhl. Hell, luftig, am Hafen.",
};

export default function HotelPage() {
  return (
    <div>
      <PageHeader
        image={`${BASE}/images/rooms/loft-wasser.jpg`}
        gradient="linear-gradient(135deg, #DCD6CC 0%, #B5603A 100%)"
        eyebrow="Das Hotel"
        title="Lofts & Studios"
        subtitle="Zweiunddreißig Räume, kein Loft wie das andere — historischer Speicher, mit moderner Hand eingerichtet."
      />

      {/* Intro */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-3">
                <span className="sp-index" style={{ color: "var(--sp-muted)" }}>00 &mdash; Ankommen</span>
                <div className="mt-5 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
              </div>
              <p className="text-2xl font-medium leading-[1.3] tracking-tight sm:text-3xl lg:col-span-9" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                Jedes unserer Lofts trägt den Charakter des alten Speichers — Sichtbackstein, blondes
                Holz, raumhohe Fenster. Und überall der leise Komfort, den man heute erwartet.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Rooms */}
      <section className="pb-24 lg:pb-36" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          {rooms.map((room, i) => (
            <FadeIn key={room.id}>
              <div className="border-t pt-14 lg:pt-20" style={{ borderColor: "var(--sp-line)", marginTop: i === 0 ? 0 : "3.5rem" }}>
                <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className={i % 2 === 1 ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}>
                    <Media
                      src={room.image}
                      alt={room.name}
                      gradient={room.gradient}
                      className="aspect-[16/11] w-full rounded-none"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
                    <div className="flex items-center justify-between">
                      <span className="sp-index" style={{ color: "var(--sp-accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                        {room.size} m&sup2; &middot; bis {room.maxGuests} Gäste
                      </span>
                    </div>
                    <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                      {room.name}
                    </h2>
                    <p className="mt-6 text-base leading-[1.85]" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                      {room.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                      {room.amenities.map((a) => (
                        <span
                          key={a}
                          className="text-[11px] uppercase tracking-[0.14em]"
                          style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="mt-9 flex items-end justify-between gap-6 border-t pt-6" style={{ borderColor: "var(--sp-line)" }}>
                      <div>
                        <span className="text-2xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                          ab {formatPrice(room.price)}
                        </span>
                        <span className="ml-2 text-[11px] uppercase tracking-[0.14em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                          / Nacht
                        </span>
                      </div>
                      <RoomBooking room={{ name: room.name, price: room.price }} />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>Reservierung</span>
              <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                Ein paar ruhige Tage am Wasser?
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                Prüfen Sie Ihre Wunschtermine — wir bestätigen Ihre Reservierung persönlich.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link href={`${BASE}/kontakt`} className="inline-block rounded-none border px-8 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-bg)", backgroundColor: "var(--sp-text)", borderColor: "var(--sp-text)" }}>
                Verfügbarkeit anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
