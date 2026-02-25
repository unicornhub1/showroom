"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { rooms, formatPrice } from "../_design/data";

const BASE = "/templates/hotel/haven";

/* ── FadeIn ────────────────────────────────────────────────────────────── */

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Amenity icon helper ──────────────────────────────────────────────── */

const AMENITY_ICONS: Record<string, string> = {
  "Freistehende Badewanne": "\u{1F6C1}",
  "Private Terrasse": "\u{1F3D6}",
  "Bergpanorama": "\u{26F0}",
  "Minibar": "\u{1F379}",
  "Nespresso-Maschine": "\u2615",
  "WLAN": "\u{1F4F6}",
  "Safe": "\u{1F512}",
  "Bademantel & Pantoffeln": "\u{1F9E3}",
  "Gartenblick": "\u{1F33F}",
  "Regendusche": "\u{1F6BF}",
  "Boxspringbett": "\u{1F6CF}",
  "Flat-TV": "\u{1F4FA}",
  "Balkon": "\u{1F3D7}",
  "Lesesessel": "\u{1FA91}",
  "Bademantel": "\u{1F9E3}",
  "Arbeitsplatz": "\u{1F4BB}",
};

function AmenityIcon({ name }: { name: string }) {
  const icon = AMENITY_ICONS[name] || "\u2728";
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-sm" role="img" aria-label={name}>
        {icon}
      </span>
      <span
        className="text-sm"
        style={{
          fontFamily: "var(--hv-font-body)",
          color: "var(--hv-muted)",
        }}
      >
        {name}
      </span>
    </div>
  );
}

/* ── Zimmer Page ──────────────────────────────────────────────────────── */

export default function ZimmerPage() {
  return (
    <div>
      {/* Page hero */}
      <section
        className="relative flex items-end overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44"
        style={{
          background:
            "linear-gradient(160deg, var(--hv-bg) 0%, var(--hv-blush) 50%, var(--hv-sage) 100%)",
          minHeight: "45vh",
        }}
      >
        {/* Decorative floating circle */}
        <div
          className="hv-float absolute hidden lg:block"
          style={{
            top: "20%",
            right: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(184,150,90,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{
              fontFamily: "var(--hv-font-display)",
              color: "var(--hv-accent)",
            }}
          >
            Zimmer &amp; Suiten
          </span>
          <h1
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--hv-font-display)",
              color: "var(--hv-text)",
            }}
          >
            R&auml;ume der Ruhe
          </h1>
          <div
            className="mt-6 h-px w-16"
            style={{ backgroundColor: "var(--hv-accent)" }}
          />
          <p
            className="mt-6 max-w-lg text-lg italic leading-relaxed"
            style={{
              fontFamily: "var(--hv-font-body)",
              color: "var(--hv-muted)",
            }}
          >
            Jedes Zimmer ein R&uuml;ckzugsort &ndash; gestaltet mit nat&uuml;rlichen Materialien,
            warmen Farben und einem feinen Gesp&uuml;r f&uuml;r Komfort.
          </p>
        </div>
      </section>

      {/* Room listing */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--hv-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-24 lg:space-y-32">
            {rooms.map((room, i) => (
              <FadeIn key={room.id}>
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                    i % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image area */}
                  <div
                    className={`${i % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div
                      className="aspect-[4/3] w-full overflow-hidden rounded-sm"
                      style={{ background: room.gradient }}
                    />
                  </div>

                  {/* Details */}
                  <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span
                      className="text-[10px] uppercase tracking-[0.25em]"
                      style={{
                        fontFamily: "var(--hv-font-display)",
                        color: "var(--hv-accent)",
                      }}
                    >
                      {room.size} m&sup2; &middot; bis {room.maxGuests}{" "}
                      {room.maxGuests === 1 ? "Gast" : "G\u00E4ste"}
                    </span>

                    <h2
                      className="mt-3 text-3xl sm:text-4xl"
                      style={{
                        fontFamily: "var(--hv-font-display)",
                        color: "var(--hv-text)",
                      }}
                    >
                      {room.name}
                    </h2>

                    <div
                      className="my-6 h-px w-12"
                      style={{ backgroundColor: "var(--hv-accent)" }}
                    />

                    <p
                      className="text-lg leading-[1.8]"
                      style={{
                        fontFamily: "var(--hv-font-body)",
                        color: "var(--hv-muted)",
                      }}
                    >
                      {room.description}
                    </p>

                    {/* Amenities */}
                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {room.amenities.map((a) => (
                        <AmenityIcon key={a} name={a} />
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-10 flex items-center gap-8">
                      <div>
                        <span
                          className="text-[10px] uppercase tracking-[0.2em]"
                          style={{
                            fontFamily: "var(--hv-font-display)",
                            color: "var(--hv-muted)",
                          }}
                        >
                          Preis pro Nacht
                        </span>
                        <p
                          className="mt-1 text-2xl"
                          style={{
                            fontFamily: "var(--hv-font-body)",
                            color: "var(--hv-accent)",
                            fontWeight: 600,
                          }}
                        >
                          ab {formatPrice(room.price)}
                        </p>
                      </div>

                      <Link
                        href={`${BASE}/kontakt`}
                        className="inline-block px-7 py-3 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-85"
                        style={{
                          fontFamily: "var(--hv-font-display)",
                          backgroundColor: "var(--hv-accent)",
                          color: "var(--hv-surface)",
                        }}
                      >
                        Anfragen
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: "var(--hv-card)" }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <FadeIn>
            <h2
              className="text-3xl sm:text-4xl"
              style={{
                fontFamily: "var(--hv-font-display)",
                color: "var(--hv-text)",
              }}
            >
              Ihr Zimmer wartet
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-lg italic leading-relaxed"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-muted)",
              }}
            >
              Kontaktieren Sie uns f&uuml;r eine individuelle Beratung oder buchen Sie direkt Ihren Wunschtermin.
            </p>
            <div className="mt-8 flex items-center justify-center gap-6">
              <Link
                href={`${BASE}/kontakt`}
                className="inline-block px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-85"
                style={{
                  fontFamily: "var(--hv-font-display)",
                  backgroundColor: "var(--hv-accent)",
                  color: "var(--hv-surface)",
                }}
              >
                Jetzt buchen
              </Link>
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--hv-font-body)",
                  color: "var(--hv-muted)",
                }}
              >
                oder +49 (0) 8321 / 94 78 0
              </span>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
