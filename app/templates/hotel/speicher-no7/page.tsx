"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FadeIn from "./_design/components/FadeIn";
import Media from "./_design/components/Media";
import BookingBar from "./_design/components/BookingBar";
import {
  BASE,
  rooms,
  featuredDishes,
  testimonials,
  galleryItems,
  stats,
  formatPrice,
} from "./_design/data";

const IMG = `${BASE}/images`;

const PILLARS = [
  {
    index: "01",
    title: "Das Hotel",
    text: "32 individuelle Lofts und Studios zwischen Sichtbackstein, blondem Holz und viel Tageslicht.",
    href: `${BASE}/hotel`,
    image: `${IMG}/rooms/loft-wasser.jpg`,
    gradient: "linear-gradient(135deg, #DCD6CC 0%, #ECE8E1 100%)",
  },
  {
    index: "02",
    title: "Das Restaurant",
    text: "Open-Kitchen am Wasser: saisonal, regional und ehrlich — mit Blick aufs Hafenbecken.",
    href: `${BASE}/restaurant`,
    image: `${IMG}/restaurant/interior.jpg`,
    gradient: "linear-gradient(135deg, #2A2826 0%, #B5603A 100%)",
  },
  {
    index: "03",
    title: "Die Bar",
    text: "Cocktails, Naturweine und ein Drink mit Aussicht — am Tresen, auf der Dachterrasse und an der Kaikante.",
    href: `${BASE}/bar`,
    image: `${IMG}/wedding/dachterrasse.jpg`,
    gradient: "linear-gradient(135deg, #B5603A 0%, #ECE8E1 100%)",
  },
];

/* Text-Link mit Pfeil + Underline-on-hover — durchgängiges CTA-Muster */
function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]"
      style={{ fontFamily: "var(--sp-font-mono)", color: light ? "#F7F5F1" : "var(--sp-text)" }}
    >
      <span className="border-b border-transparent pb-1 transition-colors duration-200 group-hover:border-current">
        {children}
      </span>
      <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
    </Link>
  );
}

export default function SpeicherNo7Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* ════════════════════════ HERO ════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 68px)" }}>
        {/* Ebene 0 — Gradient-Fallback (unterste Ebene, falls Video & Poster fehlen) */}
        <div
          className="absolute inset-0 h-full w-full"
          style={{ background: "linear-gradient(135deg, #2A2826 0%, #B5603A 100%)" }}
          aria-hidden
        />
        {/* Ebene 1 — dezentes Hintergrundvideo; Poster = bisheriges Hero-Bild als Fallback */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${IMG}/hero/hero.jpg`}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        >
          <source src={`${BASE}/video/hero.mp4`} type="video/mp4" />
        </video>
        {/* Ebene 2 — Leichter Scrim — crisp, kein schwerer Verlauf */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(27,26,24,0.38)" }} />

        {/* Ebene 3 — Inhalt */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-68px)] max-w-[1320px] flex-col justify-center px-6 pt-28 lg:px-10">
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(14px)",
              transition: "opacity .8s ease .15s, transform .8s ease .15s",
            }}
          >
            <span className="sp-eyebrow" style={{ color: "rgba(247,245,241,0.8)" }}>
              Hafen-Speicher Anno 1911
            </span>
          </div>

          <h1
            className="mt-6 max-w-4xl text-5xl font-medium leading-[0.98] tracking-tight sm:text-7xl lg:text-[6.5rem]"
            style={{
              fontFamily: "var(--sp-font-display)",
              color: "#F7F5F1",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(20px)",
              transition: "opacity 1s ease .3s, transform 1s ease .3s",
            }}
          >
            leben am<br />hafen<span style={{ color: "var(--sp-accent)" }}>.</span>
          </h1>

          <p
            className="mt-8 max-w-lg text-base leading-relaxed sm:text-lg"
            style={{
              fontFamily: "var(--sp-font-sans)",
              color: "rgba(247,245,241,0.85)",
              fontWeight: 300,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(14px)",
              transition: "opacity .8s ease .55s, transform .8s ease .55s",
            }}
          >
            Ein Hafen-Speicher von 1911, loftig in unsere Zeit geholt. Wohnen, essen und ein Drink
            mit Aussicht, wo Backstein, Licht und Wasser zusammenkommen.
          </p>

          <div
            className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(10px)",
              transition: "opacity .8s ease .75s, transform .8s ease .75s",
            }}
          >
            <ArrowLink href={`${BASE}/hotel`} light>
              Mehr erfahren
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* ════════════════════════ BUCHUNGS-BAR ════════════════════════ */}
      {/* Eigenes Band, am Hero-Unterrand andockend (überlappend per negativem
          Margin). Relativer Container + z-20 + Bottom-Padding → kein Overflow,
          keine Verdeckung. Mobil gestapelt über die Bar-Komponente selbst. */}
      <section
        className="relative z-20 mx-auto -mt-16 max-w-[1320px] px-6 pb-4 sm:-mt-20 lg:px-10"
      >
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(16px)",
            transition: "opacity .8s ease .9s, transform .8s ease .9s",
          }}
        >
          <BookingBar />
        </div>
      </section>

      {/* ════════════════════════ STATS ════════════════════════ */}
      <section style={{ backgroundColor: "var(--sp-bg)", borderBottom: "1px solid var(--sp-line)" }}>
        {/* Dünne, helle Zeile — Zellen durch vertikale Haarlinien getrennt (gap-px auf Linie) */}
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-px lg:grid-cols-4" style={{ backgroundColor: "var(--sp-line)" }}>
            {stats.map((s) => (
              <div key={s.label} className="py-12 pl-6 lg:py-16 lg:pl-8" style={{ backgroundColor: "var(--sp-bg)" }}>
                <div className="text-4xl font-medium tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                  {s.value}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ STORY ════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <FadeIn delay={0.1} className="order-2 lg:order-1 lg:col-span-5">
              <div className="flex items-center gap-4">
                <span className="sp-index" style={{ color: "var(--sp-muted)" }}>01 &mdash; Der Speicher</span>
              </div>
              <div className="mt-5 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
              <h2 className="mt-8 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                Ein Speicher mit Geschichte, neu erzählt
              </h2>
              <p className="mt-8 text-base leading-[1.85]" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                Was 1911 als Lagerspeicher am Hafen begann, ist heute ein Ort des Ankommens. Wir
                haben Backstein, Gussstützen und Dachstuhl bewahrt und mit klarer, heller Handschrift
                versehen — vom Loft am Wasser bis zur lichtdurchfluteten Halle.
              </p>
              <p className="mt-6 text-base leading-[1.85]" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                Wir bewahren das Alte und schaffen Raum für das Neue — reduziert, hell und ehrlich.
              </p>
              <div className="mt-10">
                <ArrowLink href={`${BASE}/hotel`}>Unsere Geschichte</ArrowLink>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2 lg:col-span-7">
              <div className="relative">
                <Media
                  src={`${IMG}/hero/intro.jpg`}
                  alt="Im historischen Speicher"
                  gradient="linear-gradient(170deg, #ECE8E1 0%, #B5603A 100%)"
                  className="aspect-[16/11] w-full rounded-none"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                    Halle &amp; Kaikante
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                    114 Jahre
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════ DREI SÄULEN ════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="sp-index" style={{ color: "var(--sp-muted)" }}>02 &mdash; Programm</span>
                <h2 className="mt-5 max-w-xl text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                  Ein Speicher, drei Welten
                </h2>
              </div>
            </div>
            <div className="mt-8 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
          </FadeIn>

          <div className="mt-12 grid gap-px lg:grid-cols-3" style={{ backgroundColor: "var(--sp-line)" }}>
            {PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <Link href={p.href} className="group flex h-full flex-col" style={{ backgroundColor: "var(--sp-bg)" }}>
                  <div className="overflow-hidden">
                    <Media
                      src={p.image}
                      alt={p.title}
                      gradient={p.gradient}
                      className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8 lg:p-10">
                    <span className="sp-index" style={{ color: "var(--sp-accent)" }}>{p.index}</span>
                    <h3 className="mt-4 text-2xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>{p.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                      {p.text}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}>
                      Mehr <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ ZIMMER-TEASER ════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="sp-index" style={{ color: "var(--sp-muted)" }}>03 &mdash; Lofts &amp; Studios</span>
                <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                  Räume zum Ankommen
                </h2>
              </div>
              <div className="hidden shrink-0 sm:block">
                <ArrowLink href={`${BASE}/hotel`}>Alle Lofts</ArrowLink>
              </div>
            </div>
            <div className="mt-8 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
          </FadeIn>

          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 3).map((room, i) => (
              <FadeIn key={room.id} delay={i * 0.1}>
                <Link href={`${BASE}/hotel`} className="group block">
                  <div className="overflow-hidden">
                    <Media src={room.image} alt={room.name} gradient={room.gradient} className="aspect-[4/5] w-full rounded-none transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--sp-line)" }}>
                    <h3 className="text-xl font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>{room.name}</h3>
                    <span className="shrink-0 text-[13px]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}>
                      ab {formatPrice(room.price)}
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                    {room.size} m&sup2; &middot; bis {room.maxGuests} Gäste
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ RESTAURANT-TEASER (hell) ════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <Media src={`${IMG}/restaurant/interior.jpg`} alt="Restaurant SPEICHER No.7" gradient="linear-gradient(135deg, #2A2826 0%, #B5603A 100%)" className="aspect-[4/5] w-full rounded-none" sizes="(max-width: 1024px) 100vw, 50vw" />
            </FadeIn>
            <FadeIn delay={0.12}>
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>04 &mdash; Das Restaurant</span>
              <div className="mt-5 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
              <h2 className="mt-8 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                Open Kitchen am Wasser
              </h2>
              <p className="mt-7 text-base leading-[1.85]" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                Unsere Küche denkt in Jahreszeiten und kocht offen vor Ihren Augen. Fisch aus der
                Region, Gemüse vom Markt, Brot aus eigenem Sauerteig — ehrlich, hell und mit Finesse.
              </p>
              <div className="mt-8">
                {featuredDishes.map((d) => (
                  <div key={d.id} className="flex items-baseline justify-between gap-4 border-b py-4" style={{ borderColor: "var(--sp-line)" }}>
                    <div>
                      <div className="text-lg font-medium tracking-tight" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>{d.name}</div>
                      <div className="mt-1 text-sm" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)" }}>{d.description}</div>
                    </div>
                    <span className="shrink-0 text-[13px]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-accent)" }}>{formatPrice(d.price)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <ArrowLink href={`${BASE}/restaurant`}>Zur Speisekarte</ArrowLink>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════ BAR-FOKUS ════════════════════════ */}
      <section className="relative overflow-hidden">
        <Media src={`${IMG}/wedding/dachterrasse.jpg`} alt="Die Bar im SPEICHER No.7" gradient="linear-gradient(135deg, #B5603A 0%, #2A2826 100%)" className="absolute inset-0 h-full w-full" sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(27,26,24,0.5)" }} />
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 py-32 lg:px-10 lg:py-48">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="sp-eyebrow" style={{ color: "rgba(247,245,241,0.78)" }}>05 &mdash; Die Bar</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl" style={{ fontFamily: "var(--sp-font-display)", color: "#F7F5F1" }}>
                Drinks mit Aussicht
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-lg text-base leading-relaxed sm:text-lg" style={{ fontFamily: "var(--sp-font-sans)", color: "rgba(247,245,241,0.85)", fontWeight: 300 }}>
                Signature-Cocktails am Tresen unter den Gussstützen, ein Glas Naturwein auf der
                Dachterrasse, ein Sundowner direkt an der Kaikante — die Hafenbar öffnet, wenn das
                Licht weich wird.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10">
                <ArrowLink href={`${BASE}/bar`} light>
                  Zur Bar
                </ArrowLink>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIAL ════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-3">
              <span className="sp-index" style={{ color: "var(--sp-muted)" }}>06 &mdash; Stimmen</span>
              <div className="mt-5 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
            </FadeIn>
            <FadeIn delay={0.12} className="lg:col-span-9">
              <blockquote className="text-2xl font-medium leading-[1.35] tracking-tight sm:text-4xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                {testimonials[0].quote}
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-10" style={{ backgroundColor: "var(--sp-accent)" }} />
                <p className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-text)" }}>
                  {testimonials[0].author}
                </p>
                <span className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                  {testimonials[0].context}
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════ GALERIE-TEASER ════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--sp-card)", borderTop: "1px solid var(--sp-line)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="sp-index" style={{ color: "var(--sp-muted)" }}>07 &mdash; Impressionen</span>
                <h2 className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                  Bilder, die erzählen
                </h2>
              </div>
              <div className="hidden shrink-0 sm:block">
                <ArrowLink href={`${BASE}/galerie`}>Zur Galerie</ArrowLink>
              </div>
            </div>
            <div className="mt-8 h-px w-full" style={{ backgroundColor: "var(--sp-line)" }} />
          </FadeIn>

          <div className="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
            {galleryItems.map((g, i) => (
              <FadeIn key={g.id} delay={(i % 3) * 0.08} className="break-inside-avoid">
                <div className="group relative overflow-hidden rounded-none">
                  <Media
                    src={g.image}
                    alt={g.title}
                    gradient={g.gradient}
                    className={`w-full ${
                      g.aspect === "portrait"
                        ? "aspect-[3/4]"
                        : g.aspect === "square"
                        ? "aspect-square"
                        : "aspect-[4/3]"
                    } transition-transform duration-700 group-hover:scale-[1.03]`}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundColor: "rgba(27,26,24,0.4)" }} />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--sp-font-mono)", color: "rgba(247,245,241,0.7)" }}>{g.category}</span>
                    <p className="mt-1 text-sm" style={{ fontFamily: "var(--sp-font-sans)", color: "#F7F5F1" }}>{g.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ FINAL CTA ════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeIn>
            <div className="border-t pt-16" style={{ borderColor: "var(--sp-line)" }}>
              <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-8">
                  <span className="sp-index" style={{ color: "var(--sp-muted)" }}>08 &mdash; Kontakt</span>
                  <h2 className="mt-5 text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl" style={{ fontFamily: "var(--sp-font-display)", color: "var(--sp-text)" }}>
                    Wir freuen uns auf Sie
                  </h2>
                  <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ fontFamily: "var(--sp-font-sans)", color: "var(--sp-muted)", fontWeight: 300 }}>
                    Ob Übernachtung, Tischreservierung oder ein Platz an der Bar — schreiben Sie uns, wir
                    melden uns persönlich.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
                  <Link
                    href={`${BASE}/kontakt`}
                    className="rounded-none border px-8 py-4 text-[11px] uppercase tracking-[0.18em] transition-colors duration-200"
                    style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-bg)", backgroundColor: "var(--sp-text)", borderColor: "var(--sp-text)" }}
                  >
                    Anfrage senden
                  </Link>
                  <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
                    oder +49 (0) 30 123 456 78
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
