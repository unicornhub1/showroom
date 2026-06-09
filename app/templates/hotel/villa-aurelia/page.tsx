"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FadeIn from "./_design/components/FadeIn";
import Media from "./_design/components/Media";
import Ornament from "./_design/components/Ornament";
import {
  BASE,
  BRAND,
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
    title: "Das Hotel",
    text: "Sechsundzwanzig individuelle Zimmer und Suiten zwischen Gründerzeit-Stuck und stillem, modernem Komfort.",
    href: `${BASE}/hotel`,
    image: `${IMG}/rooms/beletage.jpg`,
    gradient: "linear-gradient(135deg, #DDE3DC 0%, #EEE9E1 100%)",
  },
  {
    title: "Das Restaurant",
    text: "Fine Dining mit klassischer Eleganz — aus dem Villengarten und von den Höfen der Region, kultiviert serviert.",
    href: `${BASE}/restaurant`,
    image: `${IMG}/restaurant/interior.jpg`,
    gradient: "linear-gradient(135deg, #1C2620 0%, #1F4D3A 100%)",
  },
  {
    title: "Hochzeiten",
    text: "Ihr schönster Tag in Spiegelsaal, Wintergarten und auf der Park-Terrasse — exklusiv, für bis zu 140 Gäste.",
    href: `${BASE}/hochzeiten`,
    image: `${IMG}/wedding/spiegelsaal.jpg`,
    gradient: "linear-gradient(135deg, #B79257 0%, #EEE9E1 100%)",
  },
];

export default function VillaAureliaHome() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* ════════════════════════ HERO — zentrierte, dramatische Komposition ════ */}
      <section
        className="va-vignette relative overflow-hidden"
        style={{ minHeight: "calc(100vh - 68px)" }}
      >
        {/* Ebene 0 — Gradient-Fallback (unterste Ebene, falls Video & Bild fehlen) */}
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(135deg, #1C2620 0%, #1F4D3A 100%)" }}
        />

        {/* Ebene 1 — Hintergrundvideo (poster = bisheriges Hero-Bild als Fallback) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${IMG}/hero/hero.jpg`}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          aria-hidden
        >
          <source src={`${BASE}/video/hero.mp4`} type="video/mp4" />
        </video>

        {/* Scrim */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,38,32,0.46) 0%, rgba(28,38,32,0.20) 42%, rgba(28,38,32,0.62) 100%)",
          }}
        />

        <div className="relative z-[2] mx-auto flex min-h-[calc(100vh-68px)] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center lg:px-10">
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition: "opacity 1s ease .2s, transform 1s ease .2s",
            }}
          >
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "#EEE9E1" }}>
              Stadtvilla &middot; Anno {BRAND.founded}
            </span>
          </div>

          <h1
            className="mt-8 text-[3.25rem] leading-[1.02] sm:text-7xl lg:text-[6.5rem]"
            style={{
              fontFamily: "var(--va-font-display)",
              color: "#FAF8F4",
              letterSpacing: "0.005em",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(26px)",
              transition: "opacity 1.2s ease .4s, transform 1.2s ease .4s",
              textShadow: "0 2px 36px rgba(0,0,0,0.3)",
            }}
          >
            Eine Villa für
            <br />
            <span style={{ fontStyle: "italic", color: "#DDE3DC" }}>große Momente</span>
          </h1>

          <div
            className="mt-9 h-px w-24"
            style={{
              background: "linear-gradient(90deg, transparent, var(--va-gold), transparent)",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1s ease .7s",
            }}
          />

          <p
            className="mt-9 max-w-xl text-lg leading-relaxed sm:text-xl"
            style={{
              fontFamily: "var(--va-font-sans)",
              color: "rgba(250,248,244,0.92)",
              fontWeight: 300,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition: "opacity 1s ease .8s, transform 1s ease .8s",
            }}
          >
            Eine Stadtvilla von 1897, behutsam in unsere Zeit geholt. Wohnen, speisen und feiern,
            wo jeder Stuck und jede Tür eine Geschichte erzählt.
          </p>

          <div
            className="mt-11 flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(12px)",
              transition: "opacity 1s ease 1.05s, transform 1s ease 1.05s",
            }}
          >
            <Link
              href={`${BASE}/hochzeiten`}
              className="va-btn-gold va-btn-gold--ondark px-10 py-4"
            >
              Hochzeit anfragen
            </Link>
            <Link
              href={`${BASE}/hotel`}
              className="border-b pb-1 text-[11px] uppercase tracking-[0.24em] transition-opacity duration-300 hover:opacity-70"
              style={{ fontFamily: "var(--va-font-sans)", color: "#FAF8F4", borderColor: "rgba(250,248,244,0.5)" }}
            >
              Zimmer entdecken
            </Link>
          </div>
        </div>

      </section>

      {/* ════════════════════════ STATS — Serifen-Zahlen in Gold ════════════════ */}
      <section style={{ backgroundColor: "var(--va-deep)" }}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div
            className="grid grid-cols-2 gap-y-14 border-y py-12 sm:grid-cols-4"
            style={{ borderColor: "rgba(183,146,87,0.3)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="px-4 text-center sm:px-8">
                <span
                  className="mx-auto mb-5 block h-px w-8"
                  style={{ backgroundColor: "var(--va-gold)" }}
                  aria-hidden
                />
                <div
                  className="text-5xl sm:text-6xl"
                  style={{ fontFamily: "var(--va-font-display)", color: "var(--va-gold)", lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-4 text-[10px] uppercase tracking-[0.26em]"
                  style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.7)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ STORY — editorial, Drop-Cap, Pull-Quote ════════ */}
      <section className="py-28 lg:py-44" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
            <FadeIn delay={0.1} className="order-2 lg:order-1">
              <span className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-gold)" }}>
                Anno {BRAND.founded}
              </span>
              <h2
                className="mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}
              >
                Eine Villa mit Geschichte —
                <br />
                <span style={{ color: "var(--va-accent)", fontStyle: "italic" }}>neu erzählt</span>
              </h2>
              <div className="my-9 va-rule" />
              <p
                className="va-dropcap text-lg leading-[1.9]"
                style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}
              >
                Was 1897 als großbürgerliche Stadtvilla erbaut wurde, ist heute ein Ort des
                Ankommens mitten in der Stadt. Wir haben Stuck, Parkett und hohe Fenster bewahrt
                und mit klarer, moderner Handschrift versehen — vom Salon-Zimmer bis zum
                lichtdurchfluteten Wintergarten.
              </p>
              <blockquote
                className="mt-9 border-l-2 pl-7 text-2xl italic leading-relaxed sm:text-3xl"
                style={{ fontFamily: "var(--va-font-display)", color: "var(--va-accent)", borderColor: "var(--va-gold)" }}
              >
                &bdquo;Wir bewahren das Alte und schaffen Raum für das Neue.&ldquo;
              </blockquote>
              <Link
                href={`${BASE}/hotel`}
                className="mt-10 inline-block border-b pb-1 text-[11px] uppercase tracking-[0.24em] transition-opacity duration-300 hover:opacity-60"
                style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-text)", borderColor: "var(--va-gold)" }}
              >
                Unsere Geschichte
              </Link>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <div className="relative">
                <div className="va-frame">
                  <Media
                    src={`${IMG}/hero/intro.jpg`}
                    alt="Im Inneren der Villa Aurelia"
                    gradient="linear-gradient(170deg, #EEE9E1 0%, #1F4D3A 100%)"
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
                <div
                  className="absolute -bottom-8 -left-8 z-10 hidden h-44 w-44 items-center justify-center lg:flex"
                  style={{ backgroundColor: "var(--va-accent)", boxShadow: "0 20px 50px -18px rgba(28,38,32,0.55)" }}
                >
                  <div
                    className="absolute inset-2.5"
                    style={{ border: "1px solid rgba(183,146,87,0.6)" }}
                  />
                  <div className="relative text-center">
                    <div className="text-5xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-gold)" }}>128</div>
                    <div className="mt-2 text-[9px] uppercase tracking-[0.24em]" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.85)" }}>
                      Jahre Geschichte
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Ornament-Divider */}
      <div style={{ backgroundColor: "var(--va-bg)" }}>
        <Ornament className="mx-auto max-w-7xl px-6 pb-2 lg:px-10" />
      </div>

      {/* ════════════════════════ DREI SÄULEN — raffinierte Karten ══════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--va-card)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeIn className="text-center">
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "var(--va-gold)" }}>Ein Haus, drei Welten</span>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              Hotel, Restaurant <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>&amp;</span> Events
            </h2>
          </FadeIn>

          <div className="mt-20 grid gap-8 md:grid-cols-3 lg:gap-10">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.12}>
                <Link href={p.href} className="group block h-full">
                  <div
                    className="flex h-full flex-col overflow-hidden transition-shadow duration-500"
                    style={{ backgroundColor: "var(--va-surface)", border: "1px solid var(--va-line)", boxShadow: "0 2px 24px rgba(28,38,32,0.05)" }}
                  >
                    <div className="overflow-hidden">
                      <Media
                        src={p.image}
                        alt={p.title}
                        gradient={p.gradient}
                        className="aspect-[4/3] w-full transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-9 lg:p-10">
                      <span className="va-grow-line mb-6" />
                      <h3 className="text-2xl sm:text-3xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>{p.title}</h3>
                      <p className="mt-4 flex-1 text-[15px] leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}>
                        {p.text}
                      </p>
                      <span className="mt-7 inline-block text-[11px] uppercase tracking-[0.24em]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-accent)" }}>
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

      {/* ════════════════════════ ZIMMER-TEASER ═════════════════════════════════ */}
      <section className="py-28 lg:py-44" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <FadeIn>
                <span className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-gold)" }}>Zimmer &amp; Suiten</span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
                  Räume zum <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>Ankommen</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <Link href={`${BASE}/hotel`} className="text-[11px] uppercase tracking-[0.24em] transition-opacity hover:opacity-60" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-accent)", borderBottom: "1px solid var(--va-gold)", paddingBottom: 2 }}>
                Alle Zimmer
              </Link>
            </FadeIn>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 3).map((room, i) => (
              <FadeIn key={room.id} delay={i * 0.12}>
                <Link href={`${BASE}/hotel`} className="group block">
                  <div className="va-frame">
                    <Media src={room.image} alt={room.name} gradient={room.gradient} className="aspect-[4/3] w-full transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="mt-6">
                    <span className="va-grow-line" />
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h3 className="text-2xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>{room.name}</h3>
                      <span className="shrink-0 text-[15px]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-accent)" }}>
                        ab {formatPrice(room.price)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>
                      {room.size} m&sup2; &middot; bis {room.maxGuests} Gäste
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ ZITAT-INTERLUDE (NEU) ═════════════════════════ */}
      <section className="va-vignette relative overflow-hidden">
        <Media
          src={`${IMG}/wedding/spiegelsaal.jpg`}
          alt="Im Spiegelsaal der Villa Aurelia"
          gradient="linear-gradient(135deg, #1C2620 0%, #B79257 100%)"
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(16,22,18,0.66) 0%, rgba(16,22,18,0.74) 100%)" }}
        />
        <div className="relative z-[2] mx-auto max-w-4xl px-6 py-32 text-center lg:px-10 lg:py-48">
          <FadeIn>
            <div aria-hidden className="text-5xl leading-none" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-gold)" }}>
              &ldquo;
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <blockquote
              className="mt-4 text-3xl italic leading-[1.4] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4", letterSpacing: "0.005em" }}
            >
              Manche Häuser beherbergen Gäste. Andere bewahren Erinnerungen — und schenken
              Ihnen die schönsten gleich dazu.
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mx-auto mt-10 va-ornament max-w-xs">
              <span className="va-ornament__mark">&#9670;</span>
            </div>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-gold)" }}>
              Villa Aurelia &middot; seit {BRAND.founded}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════ RESTAURANT-TEASER ═════════════════════════════ */}
      <section className="py-28 lg:py-44" style={{ backgroundColor: "var(--va-deep)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <FadeIn>
              <div className="va-frame" style={{ backgroundColor: "transparent", boxShadow: "0 30px 70px -28px rgba(0,0,0,0.6)" }}>
                <Media src={`${IMG}/restaurant/interior.jpg`} alt="Restaurant der Villa Aurelia" gradient="linear-gradient(135deg, #1C2620 0%, #1F4D3A 100%)" className="aspect-[5/4] w-full" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <span className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-gold)" }}>Das Restaurant</span>
              <h2 className="mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4" }}>
                Klassik, <span style={{ fontStyle: "italic", color: "var(--va-gold)" }}>modern</span> serviert
              </h2>
              <div className="my-8 va-rule" />
              <p className="text-lg leading-[1.9]" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.78)", fontWeight: 300 }}>
                Unsere Küche denkt in Jahreszeiten. Gemüse aus dem Villengarten, Wild aus dem
                Umland, Käse von den Höfen der Region — ehrlich, regional und mit kultivierter
                Finesse interpretiert.
              </p>
              <div className="mt-10 space-y-5">
                {featuredDishes.map((d) => (
                  <div key={d.id} className="flex items-baseline justify-between gap-4 border-b pb-4" style={{ borderColor: "rgba(183,146,87,0.25)" }}>
                    <div>
                      <div className="text-lg" style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4" }}>{d.name}</div>
                      <div className="mt-1 text-sm" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.6)" }}>{d.description}</div>
                    </div>
                    <span className="shrink-0 text-[15px]" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-gold)" }}>{formatPrice(d.price)}</span>
                  </div>
                ))}
              </div>
              <Link href={`${BASE}/restaurant`} className="va-btn-gold va-btn-gold--ondark mt-10 px-8 py-3.5">
                Zur Speisekarte
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════ HOCHZEITS-FOKUS ═══════════════════════════════ */}
      <section className="va-vignette relative overflow-hidden">
        <Media src={`${IMG}/wedding/dinner.jpg`} alt="Hochzeit in der Villa Aurelia" gradient="linear-gradient(135deg, #B79257 0%, #1C2620 100%)" className="absolute inset-0 h-full w-full" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(28,38,32,0.58) 0%, rgba(28,38,32,0.78) 100%)" }} />
        <div className="relative z-[2] mx-auto max-w-4xl px-6 py-32 text-center lg:px-10 lg:py-48">
          <FadeIn>
            <span className="va-eyebrow va-eyebrow--center" style={{ color: "var(--va-gold)" }}>Hochzeiten &amp; Feste</span>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h2 className="mt-7 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "#FAF8F4" }}>
              Der schönste Tag, an einem
              <br className="hidden sm:block" /> Ort voller <span style={{ fontStyle: "italic", color: "#DDE3DC" }}>Geschichte</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "rgba(250,248,244,0.88)", fontWeight: 300 }}>
              Freie Trauung im Wintergarten, Dinner im Spiegelsaal, Feiern bis in die Nacht —
              für bis zu 140 Gäste, exklusiv nur für Sie.
            </p>
          </FadeIn>
          <FadeIn delay={0.36}>
            <Link href={`${BASE}/hochzeiten`} className="va-btn-gold va-btn-gold--ondark mt-11 px-10 py-4">
              Hochzeit planen
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIAL ═══════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 lg:py-44" style={{ backgroundColor: "var(--va-bg)" }}>
        <div aria-hidden className="absolute left-6 top-12 select-none lg:left-20" style={{ fontFamily: "var(--va-font-display)", fontSize: "clamp(180px, 20vw, 340px)", lineHeight: 0.8, color: "var(--va-gold)", opacity: 0.1 }}>
          &ldquo;
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <blockquote className="text-2xl italic leading-[1.65] sm:text-3xl lg:text-[2.2rem]" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              &bdquo;{testimonials[0].quote}&ldquo;
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mx-auto mt-9 va-ornament max-w-xs">
              <span className="va-ornament__mark">&#9670;</span>
            </div>
            <p className="mt-7 text-sm uppercase tracking-[0.22em]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-text)" }}>{testimonials[0].author}</p>
            <p className="mt-1.5 text-sm" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>{testimonials[0].context}</p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════ GALERIE-TEASER ════════════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--va-card)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <FadeIn><span className="va-eyebrow va-eyebrow--lead" style={{ color: "var(--va-gold)" }}>Impressionen</span></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
                  Bilder, die <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>erzählen</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <Link href={`${BASE}/galerie`} className="text-[11px] uppercase tracking-[0.24em] transition-opacity hover:opacity-60" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-accent)", borderBottom: "1px solid var(--va-gold)", paddingBottom: 2 }}>
                Zur Galerie
              </Link>
            </FadeIn>
          </div>
          <div className="columns-2 gap-4 sm:gap-5 lg:columns-3 [&>*]:mb-4 sm:[&>*]:mb-5">
            {galleryItems.map((g, i) => (
              <FadeIn key={g.id} delay={(i % 3) * 0.08} className="break-inside-avoid">
                <div className="group relative overflow-hidden">
                  <div className="va-frame">
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
                      } transition-transform duration-[1100ms] ease-out group-hover:scale-105`}
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 z-[3] p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="relative">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">{g.category}</span>
                      <p className="mt-0.5 text-sm italic text-white" style={{ fontFamily: "var(--va-font-display)" }}>{g.title}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ FINAL CTA ═════════════════════════════════════ */}
      <section className="py-28 lg:py-40" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <Ornament className="mb-10" />
            <h2 className="text-4xl leading-snug sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--va-font-display)", color: "var(--va-text)" }}>
              Wir freuen uns auf <span style={{ fontStyle: "italic", color: "var(--va-accent)" }}>Sie</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)", fontWeight: 300 }}>
              Ob Übernachtung, Tischreservierung oder Eventanfrage — schreiben Sie uns, wir
              melden uns persönlich.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link href={`${BASE}/kontakt`} className="va-btn-gold px-10 py-4">
                Anfrage senden
              </Link>
              <span className="text-[15px]" style={{ fontFamily: "var(--va-font-sans)", color: "var(--va-muted)" }}>
                oder +49 (0) 30 123 456 78
              </span>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
