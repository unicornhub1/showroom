"use client";

import { useState } from "react";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import { BASE } from "../_design/data";

const IMG = `${BASE}/images`;
const G = "linear-gradient(135deg, #EADFD0 0%, #9C7B3F 100%)";

type Cat = "Hotel" | "Restaurant" | "Hochzeit" | "Natur";
type Photo = { src: string; title: string; cat: Cat; aspect: "portrait" | "landscape" | "square" };

const PHOTOS: Photo[] = [
  { src: `${IMG}/gallery/g1.jpg`, title: "Der Rosengarten im Sommer", cat: "Natur", aspect: "portrait" },
  { src: `${IMG}/rooms/gartensuite.jpg`, title: "Gartensuite", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/wedding/garten.jpg`, title: "Freie Trauung im Rosengarten", cat: "Hochzeit", aspect: "landscape" },
  { src: `${IMG}/restaurant/dish-1.jpg`, title: "Reh aus eigener Jagd", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/gallery/g2.jpg`, title: "Weinberge bei Sonnenuntergang", cat: "Natur", aspect: "landscape" },
  { src: `${IMG}/wedding/dinner.jpg`, title: "Hochzeitsdinner", cat: "Hochzeit", aspect: "landscape" },
  { src: `${IMG}/rooms/kaminzimmer.jpg`, title: "Kaminzimmer", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/restaurant/interior.jpg`, title: "Im Restaurant", cat: "Restaurant", aspect: "landscape" },
  { src: `${IMG}/gallery/g4.jpg`, title: "Brautstrauß aus dem Garten", cat: "Hochzeit", aspect: "square" },
  { src: `${IMG}/gallery/g3.jpg`, title: "Gedeckte Tafel bei Kerzenschein", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/wedding/scheune.jpg`, title: "Feier in der Zehntscheune", cat: "Hochzeit", aspect: "landscape" },
  { src: `${IMG}/rooms/turmzimmer.jpg`, title: "Turmzimmer mit Rundblick", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/gallery/g5.jpg`, title: "Morgennebel über den Feldern", cat: "Natur", aspect: "landscape" },
  { src: `${IMG}/wedding/saal.jpg`, title: "Dinner im Gewölbesaal", cat: "Hochzeit", aspect: "landscape" },
  { src: `${IMG}/rooms/scheunenloft.jpg`, title: "Scheunen-Loft", cat: "Hotel", aspect: "portrait" },
  { src: `${IMG}/restaurant/dish-3.jpg`, title: "Honig & Birne", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/gallery/g6.jpg`, title: "Der Weg zum Gutshaus", cat: "Natur", aspect: "portrait" },
];

const FILTERS: ("Alle" | Cat)[] = ["Alle", "Hotel", "Restaurant", "Hochzeit", "Natur"];

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
        subtitle="Ein Streifzug durch Haus, Garten, Küche und unvergessliche Feste."
      />

      <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--ro-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Filter */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {FILTERS.map((f) => {
              const on = f === active;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
                  style={{
                    fontFamily: "var(--ro-font-sans)",
                    backgroundColor: on ? "var(--ro-accent)" : "transparent",
                    color: on ? "#FBF8F2" : "var(--ro-muted)",
                    border: `1px solid ${on ? "var(--ro-accent)" : "var(--ro-line)"}`,
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Masonry */}
          <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
            {photos.map((p, i) => (
              <FadeIn key={p.src} delay={(i % 6) * 0.05} className="break-inside-avoid">
                <div className="group relative overflow-hidden rounded-sm">
                  <Media src={p.src} alt={p.title} gradient={G} className={`w-full ${aspectClass(p.aspect)} transition-transform duration-700 group-hover:scale-105`} sizes="(max-width: 1024px) 50vw, 33vw" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="text-sm text-white" style={{ fontFamily: "var(--ro-font-sans)" }}>{p.title}</p>
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
