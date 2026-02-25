"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products, collections, formatPrice } from "./_design/data";
import { SectionHeading } from "./_design/components/SectionHeading";
import { ProductCard } from "./_design/components/ProductCard";
import HeroBanner from "./_design/components/HeroBanner";
import QuickViewModal from "./_design/components/QuickViewModal";
import type { Product } from "./_design/data";

const BASE = "/templates/fashion/streetwear";

/* ── Scroll-triggered fade-in ──────────────────────────────────────────── */

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

/* ── Homepage ──────────────────────────────────────────────────────────── */

export default function StreetWearHomePage() {
  const newArrivals = products.filter((p) => p.isNew);
  const featuredProduct =
    products.find((p) => p.id === "platform-runner") || products[0];
  const displayCollections = collections.slice(0, 3);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <main>
      {/* 1. Hero */}
      <HeroBanner />

      {/* 2. New Drops */}
      <section
        className="px-6 py-16 md:py-24"
        style={{ backgroundColor: "var(--kr-black)" }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading
              label="Frisch eingetroffen"
              title="Neue Drops"
              subtitle="Limitiert und exklusiv — wer zuerst kommt, mahlt zuerst."
            />
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.slice(0, 4).map((product, i) => (
              <FadeIn key={product.id} delay={150 + i * 100}>
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={700}>
            <div className="mt-12 text-center">
              <Link
                href={`${BASE}/products`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-200"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-neon)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--kr-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--kr-neon)";
                }}
              >
                Alle Produkte ansehen
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Editorial Split — Brutalist */}
      <section style={{ backgroundColor: "var(--kr-dark)" }}>
        <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-2 md:min-h-[85vh]">
          {/* Left: Featured product gradient */}
          <FadeIn className="h-full">
            <div
              className="relative flex h-full min-h-[500px] items-center justify-center overflow-hidden md:min-h-full"
              style={{ background: featuredProduct.gradient }}
            >
              {featuredProduct.image && (
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
              {/* Large product name watermark */}
              <span
                className="absolute text-[8rem] uppercase leading-[0.85] opacity-[0.08] sm:text-[12rem] md:text-[16rem]"
                style={{
                  fontFamily: "var(--kr-font-heading)",
                  color: "var(--kr-text)",
                  transform: "rotate(-10deg)",
                }}
              >
                VLTG
              </span>
            </div>
          </FadeIn>

          {/* Right: Text block */}
          <div className="flex items-center px-8 py-16 md:px-16 md:py-24 lg:px-24">
            <div className="max-w-lg">
              <FadeIn delay={200}>
                <p
                  className="mb-4 text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-neon)",
                  }}
                >
                  [Manifest]
                </p>
              </FadeIn>

              <FadeIn delay={350}>
                <h2
                  className="mb-6 text-5xl uppercase leading-[0.9] md:text-6xl"
                  style={{
                    fontFamily: "var(--kr-font-heading)",
                    color: "var(--kr-text)",
                  }}
                >
                  Gebaut für
                  <br />
                  die Straße
                </h2>
              </FadeIn>

              <FadeIn delay={500}>
                <p
                  className="mb-6 text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    color: "var(--kr-muted)",
                  }}
                >
                  VLTG entsteht aus der Überzeugung, dass Streetwear mehr ist
                  als Kleidung. Es ist Haltung. Jedes Stück wird mit dem
                  gleichen Anspruch entworfen, den wir an alles anlegen: keine
                  Kompromisse bei Material, Passform und Design.
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <p
                  className="mb-10 text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    color: "var(--kr-muted)",
                  }}
                >
                  Von den Straßen inspiriert, für die Straßen gemacht.
                  Limitierte Stückzahlen, weil Massenproduktion nicht zu uns
                  passt.
                </p>
              </FadeIn>

              <FadeIn delay={750}>
                <Link
                  href={`${BASE}/about`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-text)",
                    borderBottom: "1px solid var(--kr-charcoal)",
                    paddingBottom: "4px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--kr-neon)";
                    e.currentTarget.style.borderColor = "var(--kr-neon)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--kr-text)";
                    e.currentTarget.style.borderColor = "var(--kr-charcoal)";
                  }}
                >
                  Mehr über VLTG
                  <ArrowRight size={14} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Collections Grid — Staggered layout */}
      <section
        className="px-6 py-16 md:py-24"
        style={{ backgroundColor: "var(--kr-black)" }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading
              label="Entdecken"
              title="Kollektionen"
              subtitle="Finde deinen Style"
            />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Large card — spans two rows */}
            {displayCollections[0] && (
              <FadeIn delay={150} className="md:row-span-2">
                <CollectionCard
                  collection={displayCollections[0]}
                  tall
                />
              </FadeIn>
            )}
            {/* Top right */}
            {displayCollections[1] && (
              <FadeIn delay={300}>
                <CollectionCard collection={displayCollections[1]} />
              </FadeIn>
            )}
            {/* Bottom right */}
            {displayCollections[2] && (
              <FadeIn delay={450}>
                <CollectionCard collection={displayCollections[2]} />
              </FadeIn>
            )}
          </div>

          <FadeIn delay={600}>
            <div className="mt-12 text-center">
              <Link
                href={`${BASE}/collections`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-200"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-neon)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--kr-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--kr-neon)";
                }}
              >
                Alle Kollektionen
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. Featured Product */}
      <section style={{ backgroundColor: "var(--kr-dark)" }}>
        <div className="grid min-h-[600px] grid-cols-1 md:grid-cols-2 md:min-h-[80vh]">
          {/* Left: Product details */}
          <div className="flex items-center px-8 py-16 md:px-16 md:py-24 lg:px-24">
            <div className="max-w-lg">
              <FadeIn delay={100}>
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-neon)",
                  }}
                >
                  [Highlight]
                </p>
              </FadeIn>

              <FadeIn delay={200}>
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-muted)",
                  }}
                >
                  {featuredProduct.category}
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <h2
                  className="mb-4 text-5xl uppercase leading-[0.9] md:text-6xl lg:text-7xl"
                  style={{
                    fontFamily: "var(--kr-font-heading)",
                    color: "var(--kr-text)",
                  }}
                >
                  {featuredProduct.name}
                </h2>
              </FadeIn>

              <FadeIn delay={400}>
                <p
                  className="mb-8 max-w-md text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    color: "var(--kr-muted)",
                  }}
                >
                  {featuredProduct.description}
                </p>
              </FadeIn>

              <FadeIn delay={500}>
                <p
                  className="mb-8 text-3xl font-bold"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-neon)",
                  }}
                >
                  {formatPrice(featuredProduct.price)}
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <Link
                  href={`${BASE}/products/${featuredProduct.id}`}
                  className="inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    backgroundColor: "var(--kr-neon)",
                    color: "var(--kr-black)",
                    boxShadow: "4px 4px 0px var(--kr-charcoal)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                    e.currentTarget.style.boxShadow =
                      "6px 6px 0px var(--kr-neon)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow =
                      "4px 4px 0px var(--kr-charcoal)";
                  }}
                >
                  Jetzt ansehen
                  <ArrowRight size={14} />
                </Link>
              </FadeIn>
            </div>
          </div>

          {/* Right: Featured product gradient */}
          <FadeIn className="h-full">
            <div
              className="relative h-full min-h-[500px] overflow-hidden md:min-h-full"
              style={{ background: featuredProduct.gradient }}
            >
              {featuredProduct.image && (
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
              {/* Dashed border detail */}
              <div
                className="absolute bottom-8 left-8 right-8 top-8"
                style={{
                  border: "1px dashed rgba(245, 245, 240, 0.1)",
                }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. Newsletter / Brand Statement */}
      <section
        className="relative overflow-hidden px-6 py-24 md:py-32"
        style={{ backgroundColor: "var(--kr-black)" }}
      >
        {/* Background neon glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-10"
          style={{ backgroundColor: "var(--kr-neon)" }}
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <FadeIn>
            <div className="mb-8 flex items-center justify-center">
              <div
                className="h-px w-12"
                style={{ backgroundColor: "var(--kr-charcoal)" }}
              />
              <div
                className="mx-3 h-2 w-2"
                style={{ backgroundColor: "var(--kr-neon)" }}
              />
              <div
                className="h-px w-12"
                style={{ backgroundColor: "var(--kr-charcoal)" }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h2
              className="mb-4 text-5xl uppercase leading-[0.9] md:text-6xl"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              Bleib im Loop
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p
              className="mb-10 text-base leading-relaxed"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Erfahre als Erster von neuen Drops, Restocks und exklusiven
              Aktionen. Kein Spam, versprochen.
            </p>
          </FadeIn>

          <FadeIn delay={350}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="DEINE EMAIL"
                className="flex-1 px-5 py-4 text-xs outline-none transition-all duration-200"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  backgroundColor: "var(--kr-dark)",
                  border: "1px solid var(--kr-charcoal)",
                  color: "var(--kr-text)",
                  letterSpacing: "0.1em",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--kr-neon)";
                  e.currentTarget.style.boxShadow =
                    "0 0 12px rgba(205, 255, 0, 0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--kr-charcoal)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                className="px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                style={{
                  fontFamily: "var(--kr-font-body)",
                  backgroundColor: "var(--kr-neon)",
                  color: "var(--kr-black)",
                  boxShadow: "4px 4px 0px var(--kr-charcoal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-2px, -2px)";
                  e.currentTarget.style.boxShadow =
                    "6px 6px 0px var(--kr-neon)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0, 0)";
                  e.currentTarget.style.boxShadow =
                    "4px 4px 0px var(--kr-charcoal)";
                }}
              >
                Anmelden
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
}

/* ── Collection Card ─────────────────────────────────────────────────── */

function CollectionCard({
  collection,
  tall = false,
}: {
  collection: {
    id: string;
    name: string;
    subtitle: string;
    gradient: string;
    image: string;
  };
  tall?: boolean;
}) {
  return (
    <Link
      href={`${BASE}/products?collection=${collection.id}`}
      className={`group relative block overflow-hidden ${
        tall
          ? "h-full min-h-[600px] md:min-h-full"
          : "h-[400px] md:h-[420px]"
      }`}
      style={{ border: "1px solid var(--kr-charcoal)" }}
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
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Scanline hover effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(205,255,0,0.04) 2px, rgba(205,255,0,0.04) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-10">
        <div className="transition-transform duration-500 group-hover:-translate-y-2">
          <p
            className="mb-2 text-[10px] uppercase tracking-[0.3em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-neon)",
            }}
          >
            [{collection.subtitle}]
          </p>
          <h3
            className="mb-4 text-4xl uppercase leading-[0.9] md:text-5xl"
            style={{
              fontFamily: "var(--kr-font-heading)",
              color: "var(--kr-text)",
            }}
          >
            {collection.name}
          </h3>
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-text)",
              borderBottom: "1px solid var(--kr-text)",
              paddingBottom: "2px",
            }}
          >
            Entdecken <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
