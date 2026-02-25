"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useMemo } from "react";
import { properties, formatPrice, formatSize, type PropertyType } from "../_design/data";

const BASE = "/templates/immobilien/quartier";

/* ── FadeIn ─────────────────────────────────────────────────────────────── */

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
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
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

/* ── Types ─────────────────────────────────────────────────────────────── */

type SortOption = "price-asc" | "price-desc" | "newest" | "size-desc";
type PriceRange = "all" | "under-1m" | "1m-2m" | "2m-5m" | "over-5m";

const PROPERTY_TYPES: PropertyType[] = ["Wohnung", "Haus", "Gewerbe", "Grundstück"];
const LOCATIONS = [...new Set(properties.map((p) => p.location))].sort();

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function ObjektePage() {
  const [typeFilter, setTypeFilter] = useState<PropertyType | "all">("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    let result = [...properties];

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter);
    }

    // Price filter
    if (priceRange !== "all") {
      result = result.filter((p) => {
        switch (priceRange) {
          case "under-1m":
            return p.price < 1000000;
          case "1m-2m":
            return p.price >= 1000000 && p.price < 2000000;
          case "2m-5m":
            return p.price >= 2000000 && p.price < 5000000;
          case "over-5m":
            return p.price >= 5000000;
          default:
            return true;
        }
      });
    }

    // Location filter
    if (locationFilter !== "all") {
      result = result.filter((p) => p.location === locationFilter);
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "size-desc":
        result.sort((a, b) => b.size - a.size);
        break;
      case "newest":
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [typeFilter, priceRange, locationFilter, sort]);

  const selectStyle = {
    fontFamily: "var(--qt-font-body)",
    backgroundColor: "var(--qt-surface)",
    border: "1px solid var(--qt-border)",
    color: "var(--qt-text)",
  } as React.CSSProperties;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ backgroundColor: "var(--qt-dark)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={BASE}
              className="text-[12px] font-light transition-colors duration-300 hover:text-[var(--qt-accent)]"
              style={{ fontFamily: "var(--qt-font-body)", color: "rgba(255,255,255,0.5)" }}
            >
              Home
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span
              className="text-[12px] font-light"
              style={{ fontFamily: "var(--qt-font-body)", color: "rgba(255,255,255,0.7)" }}
            >
              Objekte
            </span>
          </div>
          <h1
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold"
            style={{
              fontFamily: "var(--qt-font-display)",
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Unsere Objekte
          </h1>
          <p
            className="mt-3 max-w-lg text-[14px] font-light leading-relaxed"
            style={{
              fontFamily: "var(--qt-font-body)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Entdecken Sie handverlesene Immobilien in Münchens besten Lagen.
            Jedes Objekt wurde sorgfältig von unserem Team geprüft.
          </p>
        </div>
      </section>

      {/* Filters + Listings */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: "var(--qt-bg)" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Filter bar */}
          <FadeIn>
            <div
              className="mb-10 flex flex-col gap-4 p-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:p-6"
              style={{
                backgroundColor: "var(--qt-surface)",
                border: "1px solid var(--qt-border-light)",
              }}
            >
              {/* Type */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as PropertyType | "all")}
                className="px-3 py-2.5 text-[13px] font-light outline-none"
                style={selectStyle}
              >
                <option value="all">Alle Typen</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Price range */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as PriceRange)}
                className="px-3 py-2.5 text-[13px] font-light outline-none"
                style={selectStyle}
              >
                <option value="all">Alle Preise</option>
                <option value="under-1m">Bis 1 Mio. &euro;</option>
                <option value="1m-2m">1 - 2 Mio. &euro;</option>
                <option value="2m-5m">2 - 5 Mio. &euro;</option>
                <option value="over-5m">Ab 5 Mio. &euro;</option>
              </select>

              {/* Location */}
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-3 py-2.5 text-[13px] font-light outline-none"
                style={selectStyle}
              >
                <option value="all">Alle Standorte</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              {/* Spacer */}
              <div className="hidden flex-1 sm:block" />

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="px-3 py-2.5 text-[13px] font-light outline-none"
                style={selectStyle}
              >
                <option value="newest">Neueste zuerst</option>
                <option value="price-asc">Preis aufsteigend</option>
                <option value="price-desc">Preis absteigend</option>
                <option value="size-desc">Größe absteigend</option>
              </select>

              {/* Results count */}
              <span
                className="text-[12px] font-light"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  color: "var(--qt-muted)",
                }}
              >
                {filtered.length} {filtered.length === 1 ? "Objekt" : "Objekte"}
              </span>
            </div>
          </FadeIn>

          {/* Properties grid */}
          {filtered.length === 0 ? (
            <FadeIn>
              <div className="py-20 text-center">
                <p
                  className="text-[16px] font-medium"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                  }}
                >
                  Keine Objekte gefunden
                </p>
                <p
                  className="mt-2 text-[13px] font-light"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Bitte passen Sie Ihre Filterkriterien an.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property, i) => (
                <FadeIn key={property.id} delay={Math.min(i * 0.08, 0.5)}>
                  <div
                    className="group overflow-hidden transition-shadow duration-400 hover:shadow-lg"
                    style={{
                      backgroundColor: "var(--qt-surface)",
                      border: "1px solid var(--qt-border-light)",
                    }}
                  >
                    {/* Image area */}
                    <div
                      className="relative h-[240px] overflow-hidden"
                      style={{ background: property.gradient }}
                    >
                      {/* Hover accent border */}
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                        style={{ border: "2px solid var(--qt-accent)" }}
                      />

                      {/* Badges */}
                      <div className="absolute left-3 top-3 flex items-center gap-2">
                        <span
                          className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                          style={{
                            fontFamily: "var(--qt-font-body)",
                            backgroundColor: "rgba(255,255,255,0.95)",
                            color: "var(--qt-dark)",
                          }}
                        >
                          {property.type}
                        </span>
                        {property.isNew && (
                          <span
                            className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                            style={{
                              fontFamily: "var(--qt-font-body)",
                              backgroundColor: "var(--qt-accent)",
                              color: "#FFFFFF",
                            }}
                          >
                            Neu
                          </span>
                        )}
                      </div>

                      {/* Price overlay */}
                      <div className="absolute bottom-3 right-3">
                        <span
                          className="px-3 py-1.5 text-[14px] font-bold"
                          style={{
                            fontFamily: "var(--qt-font-display)",
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "#FFFFFF",
                          }}
                        >
                          {formatPrice(property.price)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3
                        className="text-[16px] font-bold leading-tight"
                        style={{
                          fontFamily: "var(--qt-font-display)",
                          color: "var(--qt-dark)",
                        }}
                      >
                        {property.title}
                      </h3>
                      <p
                        className="mt-1 text-[12px] font-light"
                        style={{
                          fontFamily: "var(--qt-font-body)",
                          color: "var(--qt-muted)",
                        }}
                      >
                        {property.address}, {property.location}
                      </p>

                      {/* Details row */}
                      <div
                        className="mt-4 flex items-center gap-4 border-t pt-4"
                        style={{ borderColor: "var(--qt-border-light)" }}
                      >
                        <div className="flex items-center gap-1.5">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <rect x="1" y="1" width="12" height="12" stroke="var(--qt-muted)" strokeWidth="1" />
                            <line x1="7" y1="1" x2="7" y2="13" stroke="var(--qt-muted)" strokeWidth="0.8" />
                            <line x1="1" y1="7" x2="13" y2="7" stroke="var(--qt-muted)" strokeWidth="0.8" />
                          </svg>
                          <span
                            className="text-[12px] font-light"
                            style={{
                              fontFamily: "var(--qt-font-body)",
                              color: "var(--qt-muted)",
                            }}
                          >
                            {formatSize(property.size)}
                          </span>
                        </div>
                        {property.rooms > 0 && (
                          <div className="flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <rect x="1" y="5" width="12" height="7" rx="1" stroke="var(--qt-muted)" strokeWidth="1" />
                              <path d="M3 5V3a2 2 0 014 0v2M7 5V3a2 2 0 014 0v2" stroke="var(--qt-muted)" strokeWidth="0.8" />
                            </svg>
                            <span
                              className="text-[12px] font-light"
                              style={{
                                fontFamily: "var(--qt-font-body)",
                                color: "var(--qt-muted)",
                              }}
                            >
                              {property.rooms} Zi.
                            </span>
                          </div>
                        )}
                        {property.bathrooms > 0 && (
                          <div className="flex items-center gap-1.5">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7h10v2a3 3 0 01-3 3H5a3 3 0 01-3-3V7z" stroke="var(--qt-muted)" strokeWidth="1" />
                              <path d="M3 7V3a1 1 0 012 0v1" stroke="var(--qt-muted)" strokeWidth="0.8" />
                            </svg>
                            <span
                              className="text-[12px] font-light"
                              style={{
                                fontFamily: "var(--qt-font-body)",
                                color: "var(--qt-muted)",
                              }}
                            >
                              {property.bathrooms} Bad
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        className="mt-3 text-[12px] font-light leading-relaxed line-clamp-2"
                        style={{
                          fontFamily: "var(--qt-font-body)",
                          color: "var(--qt-muted)",
                        }}
                      >
                        {property.description}
                      </p>

                      {/* CTA */}
                      <Link
                        href={`${BASE}/kontakt`}
                        className="group/link mt-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.04em] transition-colors duration-300 hover:text-[var(--qt-accent-hover)]"
                        style={{
                          fontFamily: "var(--qt-font-body)",
                          color: "var(--qt-accent)",
                        }}
                      >
                        Anfrage senden
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover/link:translate-x-1">
                          <path d="M2 7h9M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-14 sm:py-16"
        style={{
          backgroundColor: "var(--qt-accent-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div>
                <h3
                  className="text-[20px] font-bold"
                  style={{
                    fontFamily: "var(--qt-font-display)",
                    color: "var(--qt-dark)",
                  }}
                >
                  Nicht das Richtige dabei?
                </h3>
                <p
                  className="mt-1 text-[13px] font-light"
                  style={{
                    fontFamily: "var(--qt-font-body)",
                    color: "var(--qt-muted)",
                  }}
                >
                  Wir haben weitere Objekte, die noch nicht online sind. Kontaktieren Sie uns.
                </p>
              </div>
              <Link
                href={`${BASE}/kontakt`}
                className="shrink-0 px-6 py-3 text-[13px] font-semibold tracking-[0.04em] transition-opacity duration-300 hover:opacity-90"
                style={{
                  fontFamily: "var(--qt-font-body)",
                  backgroundColor: "var(--qt-accent)",
                  color: "#FFFFFF",
                }}
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
