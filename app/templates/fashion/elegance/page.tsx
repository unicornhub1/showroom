'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { products, collections, formatPrice, type Product } from './_design/data'
import { SectionHeading } from './_design/components/SectionHeading'
import { ProductCard } from './_design/components/ProductCard'
import { QuickViewModal } from './_design/components/QuickViewModal'

/* ── Scroll-triggered fade-in hook ───────────────────────────────────── */

function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('el-fade-up')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(24px)',
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Homepage ────────────────────────────────────────────────────────── */

export default function EleganceHomePage() {
  const newArrivals = products.filter((p) => p.isNew)
  const featuredProduct = products.find((p) => p.collection === 'heritage') || products[0]
  const displayCollections = collections.slice(0, 3)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <main>
      {/* ═══ 1. Hero ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero background image with ken-burns */}
        <div className="el-ken-burns absolute inset-0">
          <Image
            src="/templates/fashion/elegance/images/hero/homepage-hero.jpg"
            alt="MAISON ÉLÉGANCE - Heritage Kollektion"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <FadeIn delay={200}>
            <p
              className="text-xs tracking-[0.35em] uppercase mb-8"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-gold)',
              }}
            >
              Frühling / Sommer 2026
            </p>
          </FadeIn>

          <FadeIn delay={500}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8"
              style={{
                fontFamily: 'var(--el-font-serif)',
                color: 'var(--el-cream)',
                fontWeight: 300,
              }}
            >
              Die neue Heritage
              <br />
              Kollektion
            </h1>
          </FadeIn>

          <FadeIn delay={800}>
            <p
              className="text-lg md:text-xl mb-12 max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-light)',
                fontWeight: 300,
              }}
            >
              Zeitlose Eleganz entdecken
            </p>
          </FadeIn>

          <FadeIn delay={1100}>
            <Link
              href="/templates/fashion/elegance/collections"
              className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase transition-opacity duration-300 hover:opacity-70"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-cream)',
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
              }}
            >
              Jetzt entdecken
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, var(--el-offwhite), transparent)',
          }}
        />
      </section>

      {/* ═══ 2. New Arrivals ═══ */}
      <section
        className="py-16 md:py-20 px-6"
        style={{ backgroundColor: 'var(--el-offwhite)' }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={100}>
            <SectionHeading
              label="MAISON ÉLÉGANCE"
              title="Neuheiten"
              subtitle="Die neuesten Ergänzungen unserer Kollektion"
            />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {newArrivals.slice(0, 4).map((product, i) => (
              <FadeIn key={product.id} delay={200 + i * 120}>
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={700}>
            <div className="text-center mt-12">
              <Link
                href="/templates/fashion/elegance/products"
                className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-60"
                style={{
                  fontFamily: 'var(--el-font-sans)',
                  color: 'var(--el-navy)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                Jetzt entdecken
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 3. Editorial Banner ═══ */}
      <section
        className="py-0 md:py-0"
        style={{ backgroundColor: 'var(--el-cream)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px] md:min-h-[85vh]">
          {/* Left: Editorial lifestyle image */}
          <FadeIn className="h-full">
            <div className="w-full h-full min-h-[500px] md:min-h-full relative">
              <Image
                src="/templates/fashion/elegance/images/editorial/editorial-left.jpg"
                alt="Maison Élégance - Gefertigt für Kenner"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Right: Text block */}
          <div className="flex items-center px-8 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-lg">
              <FadeIn delay={200}>
                <p
                  className="text-[10px] tracking-[0.35em] uppercase mb-6"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-gold)',
                  }}
                >
                  MAISON ÉLÉGANCE
                </p>
              </FadeIn>

              <FadeIn delay={350}>
                <h2
                  className="text-4xl md:text-5xl leading-tight mb-8"
                  style={{
                    fontFamily: 'var(--el-font-serif)',
                    color: 'var(--el-navy)',
                    fontWeight: 300,
                  }}
                >
                  Gefertigt für
                  <br />
                  Kenner
                </h2>
              </FadeIn>

              <FadeIn delay={500}>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-gray)',
                    fontWeight: 300,
                  }}
                >
                  Jedes Stück unserer Kollektion beginnt mit einer Idee, die in Tradition
                  verwurzelt und durch modernes Feingefühl verfeinert wird. Von der Auswahl
                  der edelsten Stoffe bis zur Präzision jeder Naht bewahrt unser Atelier
                  eine Tradition der Exzellenz.
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <p
                  className="text-base leading-relaxed mb-10"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-gray)',
                    fontWeight: 300,
                  }}
                >
                  Wir glauben, dass wahrer Luxus in den Details liegt, die andere übersehen
                  -- das Gewicht eines Knopfes, der Fall eines Kragens, die stille
                  Eleganz makelloser Schneiderkunst.
                </p>
              </FadeIn>

              <FadeIn delay={750}>
                <Link
                  href="/templates/fashion/elegance/about"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-60"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-navy)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Unsere Geschichte entdecken
                  <ArrowRight size={14} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. Collections Grid ═══ */}
      <section
        className="py-16 md:py-20 px-6"
        style={{ backgroundColor: 'var(--el-offwhite)' }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionHeading
              label="MAISON ÉLÉGANCE"
              title="Unsere Kollektionen"
              subtitle="Entdecken Sie die Welt von Maison Élégance"
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
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
            <div className="text-center mt-12">
              <Link
                href="/templates/fashion/elegance/collections"
                className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-60"
                style={{
                  fontFamily: 'var(--el-font-sans)',
                  color: 'var(--el-navy)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                Jetzt entdecken
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 5. Featured Product ═══ */}
      <section
        className="py-0 md:py-0"
        style={{ backgroundColor: 'var(--el-cream)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] md:min-h-[80vh]">
          {/* Left: Featured product image */}
          <FadeIn className="h-full">
            <div
              className="w-full h-full min-h-[500px] md:min-h-full relative"
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
            </div>
          </FadeIn>

          {/* Right: Product details */}
          <div className="flex items-center px-8 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-lg">
              <FadeIn delay={200}>
                <p
                  className="text-[10px] tracking-[0.35em] uppercase mb-3"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-gold)',
                  }}
                >
                  MAISON ÉLÉGANCE
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-4"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-gray)',
                  }}
                >
                  Highlight
                </p>
              </FadeIn>

              <FadeIn delay={400}>
                <h2
                  className="text-4xl md:text-5xl leading-tight mb-6"
                  style={{
                    fontFamily: 'var(--el-font-serif)',
                    color: 'var(--el-navy)',
                    fontWeight: 300,
                  }}
                >
                  {featuredProduct.name}
                </h2>
              </FadeIn>

              <FadeIn delay={500}>
                <p
                  className="text-base leading-relaxed mb-8 max-w-md"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-gray)',
                    fontWeight: 300,
                  }}
                >
                  {featuredProduct.description}
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <p
                  className="text-2xl mb-10"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-navy)',
                    fontWeight: 300,
                  }}
                >
                  {formatPrice(featuredProduct.price)}
                </p>
              </FadeIn>

              <FadeIn delay={700}>
                <Link
                  href={`/templates/fashion/elegance/products/${featuredProduct.id}`}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-60"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-navy)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Jetzt entdecken
                  <ArrowRight size={14} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. Lookbook Teaser ═══ */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '80vh' }}>
        <div className="el-ken-burns absolute inset-0">
          <Image
            src="/templates/fashion/elegance/images/editorial/lookbook-teaser.jpg"
            alt="MAISON ÉLÉGANCE - Das Lookbook"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <FadeIn>
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-4"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-gold)',
              }}
            >
              MAISON ÉLÉGANCE
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-cream)',
                opacity: 0.8,
              }}
            >
              Redaktionell
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl leading-tight mb-8"
              style={{
                fontFamily: 'var(--el-font-serif)',
                color: 'var(--el-cream)',
                fontWeight: 300,
              }}
            >
              Das Lookbook
            </h2>
          </FadeIn>

          <FadeIn delay={500}>
            <p
              className="text-lg mb-12"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-light)',
                fontWeight: 300,
              }}
            >
              Entdecken Sie unser neuestes Editorial
            </p>
          </FadeIn>

          <FadeIn delay={700}>
            <Link
              href="/templates/fashion/elegance/lookbook"
              className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase transition-opacity duration-300 hover:opacity-70"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-cream)',
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
              }}
            >
              Jetzt entdecken
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. Newsletter / Brand Statement ═══ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--el-offwhite)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="flex items-center justify-center mb-12">
              <div
                className="h-px w-12"
                style={{ backgroundColor: 'var(--el-gold)' }}
              />
              <div
                className="w-1.5 h-1.5 rotate-45 mx-3"
                style={{ backgroundColor: 'var(--el-gold)' }}
              />
              <div
                className="h-px w-12"
                style={{ backgroundColor: 'var(--el-gold)' }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <h2
              className="text-4xl md:text-5xl leading-tight mb-6"
              style={{
                fontFamily: 'var(--el-font-serif)',
                color: 'var(--el-navy)',
                fontWeight: 300,
              }}
            >
              Werden Sie Teil der Maison
            </h2>
          </FadeIn>

          <FadeIn delay={300}>
            <p
              className="text-base leading-relaxed mb-12"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-gray)',
                fontWeight: 300,
              }}
            >
              Erfahren Sie als Erste von neuen Kollektionen und exklusiven Angeboten
            </p>
          </FadeIn>

          <FadeIn delay={450}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 px-6 py-4 text-sm border outline-none transition-colors duration-300 focus:border-[var(--el-gold)]"
                style={{
                  fontFamily: 'var(--el-font-sans)',
                  backgroundColor: 'transparent',
                  borderColor: 'var(--el-light)',
                  color: 'var(--el-navy)',
                }}
              />
              <button
                type="submit"
                className="px-10 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:opacity-90"
                style={{
                  fontFamily: 'var(--el-font-sans)',
                  backgroundColor: 'var(--el-gold)',
                  color: 'var(--el-offwhite)',
                }}
              >
                Abonnieren
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  )
}

/* ── Collection Card (used in the homepage grid) ─────────────────────── */

function CollectionCard({
  collection,
  tall = false,
}: {
  collection: { id: string; name: string; subtitle: string; gradient: string; image?: string }
  tall?: boolean
}) {
  return (
    <Link
      href={`/templates/fashion/elegance/products?collection=${collection.id}`}
      className={`group relative block overflow-hidden ${tall ? 'h-full min-h-[600px] md:min-h-full' : 'h-[500px] md:h-[520px]'}`}
    >
      {/* Collection image with gradient fallback */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
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
      {/* Dark gradient overlay at bottom for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)',
        }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
        <div className="transition-transform duration-500 group-hover:-translate-y-2">
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-2"
            style={{
              fontFamily: 'var(--el-font-sans)',
              color: 'var(--el-gold)',
            }}
          >
            MAISON ÉLÉGANCE
          </p>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3 opacity-80"
            style={{
              fontFamily: 'var(--el-font-sans)',
              color: 'var(--el-cream)',
            }}
          >
            {collection.subtitle}
          </p>
          <h3
            className="text-3xl md:text-4xl mb-4"
            style={{
              fontFamily: 'var(--el-font-serif)',
              color: 'var(--el-cream)',
              fontWeight: 300,
            }}
          >
            {collection.name}
          </h3>
          <span
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-70"
            style={{
              fontFamily: 'var(--el-font-sans)',
              color: 'var(--el-cream)',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            Jetzt entdecken <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
