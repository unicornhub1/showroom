"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { collections, getProductsByCollection, formatPrice } from "../_design/data";

const BASE = "/templates/fashion/streetwear";

/* ── Fade-in wrapper ─────────────────────────────────────────────────── */

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Collections Page ──────────────────────────────────────────────────── */

export default function CollectionsPage() {
  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: "var(--kr-black)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 pt-4">
          <ol
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-muted)",
            }}
          >
            <li>
              <Link
                href={BASE}
                className="transition-colors duration-200 hover:text-[var(--kr-neon)]"
              >
                Home
              </Link>
            </li>
            <li style={{ color: "var(--kr-charcoal)" }}>/</li>
            <li style={{ color: "var(--kr-text)" }}>Kollektionen</li>
          </ol>
        </nav>

        {/* Page Heading */}
        <FadeIn>
          <div className="mb-16">
            <h1
              className="text-6xl uppercase leading-[0.9] md:text-8xl"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              Kollektionen
            </h1>
            <p
              className="mt-4 max-w-lg text-base"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Jede Kollektion erzaehlt eine Geschichte. Finde die, die zu dir
              passt.
            </p>
            <div
              className="mt-6 h-[2px] w-16"
              style={{ backgroundColor: "var(--kr-neon)" }}
            />
          </div>
        </FadeIn>

        {/* Collections List */}
        <div className="flex flex-col gap-6">
          {collections.map((collection, i) => {
            const collectionProducts = getProductsByCollection(collection.id);
            return (
              <FadeIn key={collection.id} delay={100 + i * 150}>
                <Link
                  href={`${BASE}/products?collection=${collection.id}`}
                  className="group relative block overflow-hidden"
                  style={{
                    border: "1px solid var(--kr-charcoal)",
                    minHeight: "320px",
                  }}
                >
                  {/* Gradient background */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ background: collection.gradient }}
                  >
                    {collection.image && (
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Scanline hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(205,255,0,0.03) 2px, rgba(205,255,0,0.03) 4px)",
                    }}
                  />

                  {/* Dark overlay for text */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-center p-8 md:p-12 lg:p-16">
                    <p
                      className="mb-2 text-[10px] uppercase tracking-[0.3em]"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        color: "var(--kr-neon)",
                      }}
                    >
                      [{collection.subtitle}]
                    </p>
                    <h2
                      className="mb-3 text-5xl uppercase leading-[0.9] md:text-6xl lg:text-7xl"
                      style={{
                        fontFamily: "var(--kr-font-heading)",
                        color: "var(--kr-text)",
                      }}
                    >
                      {collection.name}
                    </h2>
                    <p
                      className="mb-6 max-w-md text-sm"
                      style={{
                        fontFamily: "var(--kr-font-body)",
                        color: "var(--kr-muted)",
                      }}
                    >
                      {collection.description}
                    </p>

                    <div className="flex items-center gap-6">
                      <span
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200"
                        style={{
                          fontFamily: "var(--kr-font-mono)",
                          color: "var(--kr-text)",
                          borderBottom: "1px solid var(--kr-text)",
                          paddingBottom: "2px",
                        }}
                      >
                        Entdecken
                        <ArrowRight size={14} />
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-[0.15em]"
                        style={{
                          fontFamily: "var(--kr-font-mono)",
                          color: "var(--kr-muted)",
                        }}
                      >
                        {collectionProducts.length}{" "}
                        {collectionProducts.length === 1
                          ? "Produkt"
                          : "Produkte"}
                      </span>
                    </div>

                    {/* Small product price previews */}
                    {collectionProducts.length > 0 && (
                      <div className="mt-6 flex gap-3">
                        {collectionProducts.slice(0, 3).map((p) => (
                          <div
                            key={p.id}
                            className="px-3 py-1.5"
                            style={{
                              backgroundColor: "rgba(10, 10, 10, 0.6)",
                              border: "1px solid var(--kr-charcoal)",
                            }}
                          >
                            <p
                              className="text-[9px] uppercase tracking-wider"
                              style={{
                                fontFamily: "var(--kr-font-mono)",
                                color: "var(--kr-muted)",
                              }}
                            >
                              {p.name}
                            </p>
                            <p
                              className="text-xs font-bold"
                              style={{
                                fontFamily: "var(--kr-font-mono)",
                                color: "var(--kr-text)",
                              }}
                            >
                              {formatPrice(p.price)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </main>
  );
}
