"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FadeIn from "./_design/components/FadeIn";
import Media from "./_design/components/Media";
import {
  BASE,
  BRAND,
  rooms,
  featuredDishes,
  eventSpaces,
  testimonials,
  galleryItems,
  stats,
  formatPrice,
} from "./_design/data";

const IMG = `${BASE}/images`;

const PILLARS = [
  {
    title: "Das Hotel",
    text: "24 individuelle Zimmer und Suiten zwischen historischem Gemäuer und modernem Komfort.",
    href: `${BASE}/hotel`,
    image: `${IMG}/rooms/gartensuite.jpg`,
    gradient: "linear-gradient(135deg, #D7DCCE 0%, #EADFD0 100%)",
  },
  {
    title: "Das Restaurant",
    text: "Farm-to-table aus dem eigenen Garten, der Jagd und von den Höfen der Region.",
    href: `${BASE}/restaurant`,
    image: `${IMG}/restaurant/interior.jpg`,
    gradient: "linear-gradient(135deg, #34302A 0%, #9C7B3F 100%)",
  },
  {
    title: "Hochzeiten",
    text: "Ihr schönster Tag in Scheune, Rosengarten und Gewölbesaal — bis 120 Gäste.",
    href: `${BASE}/hochzeiten`,
    image: `${IMG}/wedding/scheune.jpg`,
    gradient: "linear-gradient(135deg, #9C7B3F 0%, #EADFD0 100%)",
  },
];

export default function GutRosenauHome() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* ════════════════════════ HERO ════════════════════════ */}
      {/* relative Wrapper, damit die Buchungs-Leiste am Hero-Unterrand andocken kann */}
      <div className="relative">
        <section className="relative overflow-hidden" style={{ minHeight: "calc(100vh - 68px)" }}>
          {/* Ebene 0 — Gradient-Fallback (unterste Ebene) */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #34302A 0%, #9C7B3F 100%)" }}
          />

          {/* Ebene 1 — Hintergrund-Video (Poster = bisheriges Hero-Bild als Fallback) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={`${IMG}/hero/hero.jpg`}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={`${BASE}/video/hero.mp4`} type="video/mp4" />
          </video>

          {/* Ebene 2 — Scrim */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(42,37,32,0.30) 0%, rgba(42,37,32,0.10) 35%, rgba(42,37,32,0.55) 100%)",
            }}
          />

          {/* Ebene 3 — Inhalt */}
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-68px)] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
            <div
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(18px)",
                transition: "opacity .9s ease .2s, transform .9s ease .2s",
              }}
            >
              <span className="ro-eyebrow" style={{ color: "#F2EADD" }}>
                {BRAND.tagline}
              </span>
            </div>

            <h1
              className="mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-7xl lg:text-8xl"
              style={{
                fontFamily: "var(--ro-font-display)",
                color: "#FBF8F2",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(24px)",
                transition: "opacity 1.1s ease .4s, transform 1.1s ease .4s",
                textShadow: "0 2px 30px rgba(0,0,0,0.25)",
              }}
            >
              Ein Landgut für <span style={{ fontStyle: "italic", color: "#EADFD0" }}>besondere Tage</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl"
              style={{
                fontFamily: "var(--ro-font-sans)",
                color: "rgba(251,248,242,0.9)",
                fontWeight: 300,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(16px)",
                transition: "opacity .9s ease .7s, transform .9s ease .7s",
              }}
            >
              Ein Landgut von 1788, behutsam in unsere Zeit geholt. Wohnen, speisen und feiern,
              wo jeder Stein eine Geschichte erzählt.
            </p>

            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(12px)",
                transition: "opacity .9s ease 1s, transform .9s ease 1s",
              }}
            >
              <Link
                href={`${BASE}/hochzeiten`}
                className="inline-block px-8 py-4 text-center text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90"
                style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "#FBF8F2" }}
              >
                Hochzeit anfragen
              </Link>
              <Link
                href={`${BASE}/hotel`}
                className="inline-block border-b pb-1 text-center text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-70"
                style={{ fontFamily: "var(--ro-font-sans)", color: "#FBF8F2", borderColor: "rgba(251,248,242,0.5)" }}
              >
                Zimmer entdecken
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ════════════════════════ STATS ════════════════════════ */}
      <section style={{ backgroundColor: "var(--ro-deep)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 sm:grid-cols-4 lg:px-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl sm:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-accent)" }}>
                {s.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--ro-font-sans)", color: "rgba(251,248,242,0.7)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════ STORY ════════════════════════ */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <FadeIn delay={0.1} className="order-2 lg:order-1">
              <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Anno {BRAND.founded}</span>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
                Ein Gut mit Geschichte —<br />
                <span style={{ color: "var(--ro-sage)", fontStyle: "italic" }}>neu erzählt</span>
              </h2>
              <div className="my-8 ro-rule" />
              <p className="text-lg leading-[1.85]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
                Was 1788 als landwirtschaftliches Gut begann, ist heute ein Ort des Ankommens. Wir
                haben das alte Gemäuer bewahrt und mit klarer, moderner Handschrift versehen — vom
                Kaminzimmer im Gutshaus bis zur lichtdurchfluteten Zehntscheune.
              </p>
              <p className="mt-5 text-lg italic leading-relaxed" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-accent)" }}>
                &bdquo;Wir bewahren das Alte und schaffen Raum für das Neue.&ldquo;
              </p>
              <Link
                href={`${BASE}/hotel`}
                className="mt-9 inline-block border-b pb-1 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-60"
                style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-text)", borderColor: "var(--ro-accent)" }}
              >
                Unsere Geschichte
              </Link>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <div className="relative">
                <Media
                  src={`${IMG}/hero/intro.jpg`}
                  alt="Im historischen Gutshaus"
                  gradient="linear-gradient(170deg, #EADFD0 0%, #9C7B3F 100%)"
                  className="aspect-[4/5] w-full rounded-sm"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute -bottom-7 -left-7 hidden h-40 w-40 items-center justify-center rounded-sm lg:flex"
                  style={{ backgroundColor: "var(--ro-sage)", border: "1px solid rgba(156,123,63,0.3)" }}
                >
                  <div className="text-center">
                    <div className="text-4xl" style={{ fontFamily: "var(--ro-font-display)", color: "#FBF8F2" }}>237</div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--ro-font-sans)", color: "rgba(251,248,242,0.85)" }}>
                      Jahre Geschichte
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════ DREI SÄULEN ════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--ro-card)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="text-center">
            <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Ein Ort, drei Häuser</span>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              Hotel, Restaurant &amp; Hochzeiten
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-7 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.12}>
                <Link href={p.href} className="group block">
                  <div className="overflow-hidden rounded-sm" style={{ backgroundColor: "var(--ro-surface)", boxShadow: "0 2px 24px rgba(42,37,32,0.05)" }}>
                    <div className="overflow-hidden">
                      <Media
                        src={p.image}
                        alt={p.title}
                        gradient={p.gradient}
                        className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>{p.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
                        {p.text}
                      </p>
                      <span className="mt-5 inline-block text-[11px] uppercase tracking-[0.2em] transition-colors" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}>
                        Mehr erfahren →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ ZIMMER-TEASER ════════════════════════ */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <FadeIn>
                <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Zimmer &amp; Suiten</span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
                  Räume zum Ankommen
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <Link href={`${BASE}/hotel`} className="text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)", borderBottom: "1px solid var(--ro-accent)", paddingBottom: 2 }}>
                Alle Zimmer
              </Link>
            </FadeIn>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 3).map((room, i) => (
              <FadeIn key={room.id} delay={i * 0.12}>
                <Link href={`${BASE}/hotel`} className="group block">
                  <div className="overflow-hidden">
                    <Media src={room.image} alt={room.name} gradient={room.gradient} className="aspect-[4/3] w-full rounded-sm transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="mt-5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>{room.name}</h3>
                      <span className="text-[15px]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}>
                        ab {formatPrice(room.price)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>
                      {room.size} m&sup2; &middot; bis {room.maxGuests} Gäste
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ RESTAURANT-TEASER ════════════════════════ */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--ro-deep)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <FadeIn>
              <Media src={`${IMG}/restaurant/interior.jpg`} alt="Restaurant Gut Rosenau" gradient="linear-gradient(135deg, #34302A 0%, #9C7B3F 100%)" className="aspect-[5/4] w-full rounded-sm" sizes="(max-width: 1024px) 100vw, 50vw" />
            </FadeIn>
            <FadeIn delay={0.15}>
              <span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Das Restaurant</span>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "#FBF8F2" }}>
                Vom Feld auf den Teller
              </h2>
              <div className="my-7 ro-rule" />
              <p className="text-lg leading-[1.85]" style={{ fontFamily: "var(--ro-font-sans)", color: "rgba(251,248,242,0.75)", fontWeight: 300 }}>
                Unsere Küche denkt in Jahreszeiten. Gemüse aus dem Klostergarten, Wild aus eigener
                Jagd, Käse von den Höfen ringsum — ehrlich, regional und mit Finesse interpretiert.
              </p>
              <div className="mt-8 space-y-4">
                {featuredDishes.map((d) => (
                  <div key={d.id} className="flex items-baseline justify-between gap-4 border-b pb-3" style={{ borderColor: "rgba(251,248,242,0.14)" }}>
                    <div>
                      <div className="text-lg" style={{ fontFamily: "var(--ro-font-display)", color: "#FBF8F2" }}>{d.name}</div>
                      <div className="text-sm" style={{ fontFamily: "var(--ro-font-sans)", color: "rgba(251,248,242,0.6)" }}>{d.description}</div>
                    </div>
                    <span className="shrink-0 text-[15px]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)" }}>{formatPrice(d.price)}</span>
                  </div>
                ))}
              </div>
              <Link href={`${BASE}/restaurant`} className="mt-9 inline-block border px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)", borderColor: "var(--ro-accent)" }}>
                Zur Speisekarte
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════ HOCHZEITS-FOKUS ════════════════════════ */}
      <section className="relative overflow-hidden">
        <Media src={`${IMG}/wedding/dinner.jpg`} alt="Hochzeit auf Gut Rosenau" gradient="linear-gradient(135deg, #9C7B3F 0%, #34302A 100%)" className="absolute inset-0 h-full w-full" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(42,37,32,0.55) 0%, rgba(42,37,32,0.75) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center lg:px-10 lg:py-40">
          <FadeIn>
            <span className="ro-eyebrow" style={{ color: "#EADFD0" }}>Hochzeiten &amp; Feste</span>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--ro-font-display)", color: "#FBF8F2" }}>
              Der schönste Tag, an einem Ort voller Geschichte
            </h2>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "rgba(251,248,242,0.85)", fontWeight: 300 }}>
              Freie Trauung im Rosengarten, Dinner im Gewölbe, Feiern bis in die Nacht in der
              Zehntscheune — für bis zu 120 Gäste, exklusiv nur für Sie.
            </p>
          </FadeIn>
          <FadeIn delay={0.36}>
            <Link href={`${BASE}/hochzeiten`} className="mt-10 inline-block px-9 py-4 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90" style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "#FBF8F2" }}>
              Hochzeit planen
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIAL ════════════════════════ */}
      <section className="relative overflow-hidden py-24 lg:py-36" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div aria-hidden className="absolute left-6 top-10 select-none lg:left-16" style={{ fontFamily: "var(--ro-font-display)", fontSize: "clamp(160px, 18vw, 300px)", lineHeight: 0.8, color: "var(--ro-accent)", opacity: 0.08 }}>
          &ldquo;
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <blockquote className="text-2xl italic leading-[1.7] sm:text-3xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              &bdquo;{testimonials[0].quote}&ldquo;
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mx-auto my-7 ro-rule" style={{ marginLeft: "auto", marginRight: "auto" }} />
            <p className="text-sm uppercase tracking-[0.18em]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-text)" }}>{testimonials[0].author}</p>
            <p className="mt-1 text-sm" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>{testimonials[0].context}</p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════ GALERIE-TEASER ════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--ro-card)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <FadeIn><span className="ro-eyebrow" style={{ color: "var(--ro-accent)" }}>Impressionen</span></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>Bilder, die erzählen</h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <Link href={`${BASE}/galerie`} className="text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-accent)", borderBottom: "1px solid var(--ro-accent)", paddingBottom: 2 }}>
                Zur Galerie
              </Link>
            </FadeIn>
          </div>
          <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 [&>*]:mb-3 sm:[&>*]:mb-4">
            {galleryItems.map((g, i) => (
              <FadeIn key={g.id} delay={(i % 3) * 0.08} className="break-inside-avoid">
                <div className="group relative overflow-hidden rounded-sm">
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
                    } transition-transform duration-700 group-hover:scale-105`}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/70">{g.category}</span>
                    <p className="mt-0.5 text-sm text-white">{g.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ FINAL CTA ════════════════════════ */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <h2 className="text-3xl leading-snug sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--ro-font-display)", color: "var(--ro-text)" }}>
              Wir freuen uns auf Sie
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)", fontWeight: 300 }}>
              Ob Übernachtung, Tischreservierung oder Hochzeitsanfrage — schreiben Sie uns, wir
              melden uns persönlich.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={`${BASE}/kontakt`} className="inline-block px-8 py-4 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90" style={{ fontFamily: "var(--ro-font-sans)", backgroundColor: "var(--ro-accent)", color: "#FBF8F2" }}>
                Anfrage senden
              </Link>
              <span className="text-[15px]" style={{ fontFamily: "var(--ro-font-sans)", color: "var(--ro-muted)" }}>
                oder +49 (0) 30 123 456 78
              </span>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
