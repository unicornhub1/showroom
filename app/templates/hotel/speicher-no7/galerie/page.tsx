"use client";

import { useState } from "react";
import FadeIn from "../_design/components/FadeIn";
import Media from "../_design/components/Media";
import PageHeader from "../_design/components/PageHeader";
import { BASE } from "../_design/data";

const IMG = `${BASE}/images`;
const G = "linear-gradient(135deg, #ECE8E1 0%, #B5603A 100%)";

type Cat = "Hotel" | "Restaurant" | "Bar" | "Speicher";
type Photo = { src: string; title: string; cat: Cat; aspect: "portrait" | "landscape" | "square" };

const PHOTOS: Photo[] = [
  { src: `${IMG}/gallery/g1.jpg`, title: "Die Halle im Morgenlicht", cat: "Speicher", aspect: "portrait" },
  { src: `${IMG}/rooms/loft-wasser.jpg`, title: "Loft am Wasser", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/wedding/kai.jpg`, title: "Ein Drink an der Kaikante", cat: "Bar", aspect: "landscape" },
  { src: `${IMG}/restaurant/dish-1.jpg`, title: "Saibling vom Kai", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/gallery/g2.jpg`, title: "Hafenbecken bei Sonnenuntergang", cat: "Speicher", aspect: "landscape" },
  { src: `${IMG}/wedding/dinner.jpg`, title: "Aperitivo am Abend", cat: "Bar", aspect: "landscape" },
  { src: `${IMG}/rooms/backstein.jpg`, title: "Backstein-Studio", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/restaurant/interior.jpg`, title: "In der Open Kitchen", cat: "Restaurant", aspect: "landscape" },
  { src: `${IMG}/gallery/g4.jpg`, title: "Drinks an der Kaikante", cat: "Bar", aspect: "square" },
  { src: `${IMG}/gallery/g3.jpg`, title: "Gedeckte Tafel in der Halle", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/wedding/halle.jpg`, title: "Die Bar unter den Gussstützen", cat: "Bar", aspect: "landscape" },
  { src: `${IMG}/rooms/penthouse.jpg`, title: "Penthouse-Speicher", cat: "Hotel", aspect: "landscape" },
  { src: `${IMG}/gallery/g5.jpg`, title: "Backstein & Tageslicht", cat: "Speicher", aspect: "landscape" },
  { src: `${IMG}/wedding/dachterrasse.jpg`, title: "Sundowner auf der Dachterrasse", cat: "Bar", aspect: "landscape" },
  { src: `${IMG}/rooms/atelier-loft.jpg`, title: "Atelier-Loft", cat: "Hotel", aspect: "portrait" },
  { src: `${IMG}/restaurant/dish-3.jpg`, title: "Birne, Honig & Walnuss", cat: "Restaurant", aspect: "portrait" },
  { src: `${IMG}/gallery/g6.jpg`, title: "Blick auf die Kaikante", cat: "Speicher", aspect: "portrait" },
];

const FILTERS: ("Alle" | Cat)[] = ["Alle", "Hotel", "Restaurant", "Bar", "Speicher"];

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
        subtitle="Ein Streifzug durch Speicher, Lofts, Open Kitchen und ein paar Drinks am Wasser."
      />

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--sp-bg)" }}>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          {/* Filter — Mono-Labels, scharfe Kanten */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b pb-8" style={{ borderColor: "var(--sp-line)" }}>
            {FILTERS.map((f) => {
              const on = f === active;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="text-[11px] uppercase tracking-[0.18em] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--sp-font-mono)",
                    color: on ? "var(--sp-accent)" : "var(--sp-muted)",
                    borderBottom: on ? "1px solid var(--sp-accent)" : "1px solid transparent",
                    paddingBottom: 4,
                  }}
                >
                  {f}
                </button>
              );
            })}
            <span className="ml-auto text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--sp-font-mono)", color: "var(--sp-muted)" }}>
              {String(photos.length).padStart(2, "0")} Bilder
            </span>
          </div>

          {/* Masonry */}
          <div className="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
            {photos.map((p, i) => (
              <FadeIn key={p.src} delay={(i % 6) * 0.05} className="break-inside-avoid">
                <div className="group relative overflow-hidden rounded-none">
                  <Media src={p.src} alt={p.title} gradient={G} className={`w-full ${aspectClass(p.aspect)} transition-transform duration-700 group-hover:scale-[1.03]`} sizes="(max-width: 1024px) 50vw, 33vw" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(27,26,24,0.55), transparent)" }}>
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--sp-font-mono)", color: "rgba(247,245,241,0.7)" }}>{p.cat}</span>
                    <p className="mt-1 text-sm" style={{ fontFamily: "var(--sp-font-sans)", color: "#F7F5F1" }}>{p.title}</p>
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
