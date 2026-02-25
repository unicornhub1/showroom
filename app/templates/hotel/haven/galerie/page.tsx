"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { galleryItems, type GalleryItem } from "../_design/data";

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

/* ── Categories ───────────────────────────────────────────────────────── */

const CATEGORIES = ["Alle", "Hotel", "Zimmer", "Restaurant", "Natur", "Events"] as const;

/* ── Gallery Page ─────────────────────────────────────────────────────── */

export default function GaleriePage() {
  const [activeFilter, setActiveFilter] = useState<string>("Alle");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeFilter === "Alle"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  /* Close lightbox on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxItem(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* Lock body scroll on lightbox */
  useEffect(() => {
    document.body.style.overflow = lightboxItem ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxItem]);

  return (
    <div>
      {/* Page hero */}
      <section
        className="relative flex items-end overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44"
        style={{
          background:
            "linear-gradient(160deg, var(--hv-bg) 0%, var(--hv-blush) 40%, var(--hv-card) 100%)",
          minHeight: "40vh",
        }}
      >
        <div
          className="hv-float absolute hidden lg:block"
          style={{
            top: "18%",
            right: "12%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,218,206,0.25) 0%, transparent 70%)",
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
            Galerie
          </span>
          <h1
            className="mt-4 text-4xl sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--hv-font-display)",
              color: "var(--hv-text)",
            }}
          >
            Eindr&uuml;cke &amp; Momente
          </h1>
          <div
            className="mt-6 h-px w-16"
            style={{ backgroundColor: "var(--hv-accent)" }}
          />
        </div>
      </section>

      {/* Gallery section */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "var(--hv-bg)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Filter buttons */}
          <FadeIn>
            <div className="mb-12 flex flex-wrap items-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-300"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    backgroundColor:
                      activeFilter === cat ? "var(--hv-accent)" : "transparent",
                    color:
                      activeFilter === cat ? "var(--hv-surface)" : "var(--hv-muted)",
                    border:
                      activeFilter === cat
                        ? "1px solid var(--hv-accent)"
                        : "1px solid var(--hv-blush)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Masonry grid */}
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 lg:gap-5">
            {filteredItems.map((item, i) => (
              <FadeIn key={item.id} delay={Math.min(i * 0.06, 0.6)}>
                <div
                  className="group relative mb-4 cursor-pointer overflow-hidden rounded-sm break-inside-avoid transition-all duration-500 lg:mb-5"
                  style={{
                    aspectRatio:
                      item.aspect === "portrait"
                        ? "3/4"
                        : item.aspect === "landscape"
                        ? "4/3"
                        : "1/1",
                  }}
                  onClick={() => setLightboxItem(item)}
                >
                  {/* Gradient background */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.05]"
                    style={{ background: item.gradient }}
                  />

                  {/* Golden border highlight on hover */}
                  <div
                    className="absolute inset-0 border-2 border-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"
                    style={{ borderColor: "var(--hv-accent)" }}
                  />

                  {/* Info overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p
                      className="text-sm leading-snug text-white"
                      style={{ fontFamily: "var(--hv-font-body)" }}
                    >
                      {item.title}
                    </p>
                    <span
                      className="mt-1 block text-[10px] uppercase tracking-[0.15em] text-white/70"
                      style={{ fontFamily: "var(--hv-font-display)" }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Expand icon */}
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/0 opacity-0 transition-all duration-500 group-hover:bg-white/20 group-hover:opacity-100">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Item count */}
          <div className="mt-12 text-center">
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-muted)",
              }}
            >
              {filteredItems.length} {filteredItems.length === 1 ? "Bild" : "Bilder"}
              {activeFilter !== "Alle" ? ` in "${activeFilter}"` : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox overlay */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(26, 26, 26, 0.85)" }}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image area */}
            <div
              className="aspect-[4/3] w-full"
              style={{ background: lightboxItem.gradient }}
            />

            {/* Info bar */}
            <div
              className="flex items-center justify-between p-5"
              style={{ backgroundColor: "var(--hv-surface)" }}
            >
              <div>
                <p
                  className="text-base"
                  style={{
                    fontFamily: "var(--hv-font-body)",
                    color: "var(--hv-text)",
                  }}
                >
                  {lightboxItem.title}
                </p>
                <span
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--hv-font-display)",
                    color: "var(--hv-muted)",
                  }}
                >
                  {lightboxItem.category}
                </span>
              </div>

              <button
                onClick={() => setLightboxItem(null)}
                className="flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60"
                aria-label="Schließen"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="var(--hv-text)"
                  strokeWidth="1.5"
                >
                  <line x1="2" y1="2" x2="18" y2="18" />
                  <line x1="18" y1="2" x2="2" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

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
              Erleben Sie es selbst
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-lg italic leading-relaxed"
              style={{
                fontFamily: "var(--hv-font-body)",
                color: "var(--hv-muted)",
              }}
            >
              Bilder k&ouml;nnen nur andeuten, was Sie vor Ort erwartet.
              Kommen Sie vorbei und lassen Sie sich verzaubern.
            </p>
            <Link
              href={`${BASE}/kontakt`}
              className="mt-8 inline-block px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-85"
              style={{
                fontFamily: "var(--hv-font-display)",
                backgroundColor: "var(--hv-accent)",
                color: "var(--hv-surface)",
              }}
            >
              Aufenthalt planen
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
