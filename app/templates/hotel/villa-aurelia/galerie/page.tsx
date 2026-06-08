"use client";

import { useState } from "react";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import { BASE } from "../_design/data";

const IMG = `${BASE}/images`;
const G = "linear-gradient(135deg, #EEE9E1 0%, #1F4D3A 100%)";

type Cat = "Hotel" | "Restaurant" | "Hochzeit" | "Villa";
type Photo = { src: string; title: string; cat: Cat; aspect: "portrait" | "landscape" | "square" };

const PHOTOS: Photo[] = [
  { src: `${IMG}/gallery/g1.jpg`, title: "Die Stadtvilla im Abendlicht", cat: "Villa", aspect: "portrait" },
  { src: `${IMG}/rooms/beletage.jpg`, title: "Beletage-Suite", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/wedding/wintergarten.jpg`, title: "Freie Trauung im Wintergarten", cat: "Hochzeit", aspect: "landscape" },
  { src: `${IMG}/restaurant/dish-1.jpg`, title: "Reh aus dem Umland", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/gallery/g2.jpg`, title: "Stuckdecke & Kronleuchter", cat: "Villa", aspect: "landscape" },
  { src: `${IMG}/wedding/dinner.jpg`, title: "Hochzeitsdinner", cat: "Hochzeit", aspect: "landscape" },
  { src: `${IMG}/rooms/salon.jpg`, title: "Salon-Zimmer", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/restaurant/interior.jpg`, title: "Im Restaurant", cat: "Restaurant", aspect: "landscape" },
  { src: `${IMG}/gallery/g4.jpg`, title: "Brautstrauß im Wintergarten", cat: "Hochzeit", aspect: "square" },
  { src: `${IMG}/gallery/g3.jpg`, title: "Gedeckte Tafel im Spiegelsaal", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/wedding/spiegelsaal.jpg`, title: "Festbankett im Spiegelsaal", cat: "Hochzeit", aspect: "landscape" },
  { src: `${IMG}/rooms/atelier.jpg`, title: "Atelier unterm Dach", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/gallery/g5.jpg`, title: "Morgenlicht im Treppenhaus", cat: "Villa", aspect: "landscape" },
  { src: `${IMG}/wedding/terrasse.jpg`, title: "Sommerfeier auf der Park-Terrasse", cat: "Hochzeit", aspect: "landscape" },
  { src: `${IMG}/rooms/gartenfluegel.jpg`, title: "Gartenflügel mit Parkblick", cat: "Hotel", aspect: "portrait" },
  { src: `${IMG}/restaurant/dish-3.jpg`, title: "Gold & Birne", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/gallery/g6.jpg`, title: "Der Weg zur Villa", cat: "Villa", aspect: "portrait" },
];

const FILTERS: ("Alle" | Cat)[] = ["Alle", "Hotel", "Restaurant", "Hochzeit", "Villa"];

function aspectClass(a: Photo["aspect"]) {
  return a === "portrait" ? "aspect-[3/4]" : a === "square" ? "aspect-square" : "aspect-[4/3]";
}

export default function GaleriePage() {
  const [active, setActive] = useState<"Alle" | Cat>("Alle");
  const photos = active === "Alle" ? PHOTOS : PHOTOS.filter((p) => p.cat === active);

  return (
    <div>
      <PageHeader
        image={`${IMG}/gallery/g1.jpg`}
        gradient={G}
        eyebrow="Impressionen"
        title="Galerie"
        subtitle="Ein Streifzug durch Villa, Salons, Küche und unvergessliche Feste."
      />

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--va-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Filter */}
          <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
            {FILTERS.map((f) => {
              const on = f === active;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="px-6 py-2.5 text-[11px] uppercase tracking-[0.24em] transition-all duration-300"
                  style={{
                    fontFamily: "var(--va-font-sans)",
                    backgroundColor: on ? "var(--va-accent)" : "transparent",
                    color: on ? "#FAF8F4" : "var(--va-muted)",
                    border: `1px solid ${on ? "var(--va-accent)" : "var(--va-line)"}`,
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Masonry */}
          <div className="columns-2 gap-5 lg:columns-3 [&>*]:mb-5">
            {photos.map((p, i) => (
              <FadeIn key={p.src} delay={(i % 6) * 0.05} className="break-inside-avoid">
                <div className="group relative overflow-hidden">
                  <div className="va-frame">
                    <Media src={p.src} alt={p.title} gradient={G} className={`w-full ${aspectClass(p.aspect)} transition-transform duration-[1100ms] ease-out group-hover:scale-105`} sizes="(max-width: 1024px) 50vw, 33vw" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 z-[3] p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    <p className="relative text-[15px] italic text-white" style={{ fontFamily: "var(--va-font-display)" }}>{p.title}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
