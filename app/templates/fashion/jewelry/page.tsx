'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products, collections, formatPrice } from './_design/data'
import { SectionHeading } from './_design/components/SectionHeading'
import { ProductCard } from './_design/components/ProductCard'

/* ── Scroll-triggered fade-in ──────────────────────────────────────────── */

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
        transform: 'translateY(20px)',
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Homepage ────────────────────────────────────────────────────────── */

export default function JewelryHomePage() {
  const newArrivals = products.filter((p) => p.isNew)
  const featuredProduct = products.find((p) => p.id === 'eternity-solitaire-ring') || products[0]
  const displayCollections = collections.slice(0, 3)

  return (
    <main>
      {/* ═══ 1. Hero — Vast negative space, editorial restraint ═══ */}
      <section
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, var(--au-cream) 0%, var(--au-white) 70%)',
        }}
      >
        {/* Subtle decorative corner brackets */}
        <div className="absolute left-8 top-8 h-12 w-12 md:left-20 md:top-20 md:h-16 md:w-16">
          <div
            className="absolute left-0 top-0 h-full w-px"
            style={{ backgroundColor: 'var(--au-gold)', opacity: 0.25 }}
          />
          <div
            className="absolute left-0 top-0 h-px w-full"
            style={{ backgroundColor: 'var(--au-gold)', opacity: 0.25 }}
          />
        </div>
        <div className="absolute bottom-8 right-8 h-12 w-12 md:bottom-20 md:right-20 md:h-16 md:w-16">
          <div
            className="absolute bottom-0 right-0 h-full w-px"
            style={{ backgroundColor: 'var(--au-gold)', opacity: 0.25 }}
          />
          <div
            className="absolute bottom-0 right-0 h-px w-full"
            style={{ backgroundColor: 'var(--au-gold)', opacity: 0.25 }}
          />
        </div>

        {/* Decorative floating circle — simulates a jewelry piece */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="au-gentle-float h-64 w-64 rounded-full opacity-40 md:h-80 md:w-80 lg:h-96 lg:w-96"
            style={{
              background: 'radial-gradient(circle, var(--au-gold-light) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn delay={200}>
            <p
              className="mb-6 text-[10px] uppercase tracking-[0.4em]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-gold)',
                fontWeight: 400,
              }}
            >
              Feiner Schmuck seit 2024
            </p>
          </FadeIn>

          <FadeIn delay={500}>
            <h1
              className="mb-6 text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Schönheit
              <br />
              in Reinform
            </h1>
          </FadeIn>

          <FadeIn delay={800}>
            <p
              className="mx-auto mb-14 max-w-md text-base md:text-lg"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              Handgefertigter Schmuck, reduziert auf das Wesentliche.
            </p>
          </FadeIn>

          <FadeIn delay={1100}>
            <Link
              href="/templates/fashion/jewelry/products"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-70"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-black)',
                fontWeight: 400,
              }}
            >
              <span
                className="h-px w-6 transition-all duration-500 group-hover:w-10"
                style={{ backgroundColor: 'var(--au-gold)' }}
              />
              Kollektion entdecken
              <span
                className="h-px w-6 transition-all duration-500 group-hover:w-10"
                style={{ backgroundColor: 'var(--au-gold)' }}
              />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 2. New Arrivals ═══ */}
      <section
        className="px-6 py-20 md:py-28"
        style={{ backgroundColor: 'var(--au-white)' }}
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionHeading
              label="AURUM"
              title="Neuheiten"
              subtitle="Die neuesten Kreationen unserer Ateliers"
            />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.slice(0, 4).map((product, i) => (
              <FadeIn key={product.id} delay={200 + i * 150}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={800}>
            <div className="mt-16 text-center">
              <Link
                href="/templates/fashion/jewelry/products"
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-60"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  color: 'var(--au-charcoal)',
                  fontWeight: 300,
                }}
              >
                <span
                  className="h-px w-4 transition-all duration-400 group-hover:w-8"
                  style={{ backgroundColor: 'var(--au-gold)' }}
                />
                Alle Stücke entdecken
                <span
                  className="h-px w-4 transition-all duration-400 group-hover:w-8"
                  style={{ backgroundColor: 'var(--au-gold)' }}
                />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 3. Editorial Split — "Gefertigt für die Ewigkeit" ═══ */}
      <section style={{ backgroundColor: 'var(--au-cream)' }}>
        <div className="mx-auto grid min-h-[600px] max-w-6xl grid-cols-1 md:grid-cols-2 md:min-h-[70vh]">
          {/* Left: Large gradient with decorative circle */}
          <FadeIn className="h-full">
            <div
              className="flex h-full min-h-[400px] items-center justify-center md:min-h-full"
              style={{
                background: 'radial-gradient(circle at 50% 50%, #f5ead6 0%, #e8dcc8 40%, var(--au-cream) 100%)',
              }}
            >
              <div
                className="h-44 w-44 rounded-full md:h-56 md:w-56"
                style={{
                  background: 'radial-gradient(circle, #c9a96e 0%, #e8d8c0 60%, transparent 100%)',
                  opacity: 0.6,
                }}
              />
            </div>
          </FadeIn>

          {/* Right: Text block */}
          <div className="flex items-center px-8 py-16 md:px-16 lg:px-24 md:py-24">
            <div className="max-w-md">
              <FadeIn delay={200}>
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-gold)',
                    fontWeight: 400,
                  }}
                >
                  Philosophie
                </p>
              </FadeIn>

              <FadeIn delay={350}>
                <h2
                  className="mb-8 text-3xl leading-tight md:text-4xl"
                  style={{
                    fontFamily: 'var(--au-font-serif)',
                    color: 'var(--au-black)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                  }}
                >
                  Gefertigt für
                  <br />
                  die Ewigkeit
                </h2>
              </FadeIn>

              <FadeIn delay={500}>
                <p
                  className="mb-6 text-sm leading-[1.9]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-charcoal)',
                    fontWeight: 300,
                  }}
                >
                  Jedes AURUM-Stück beginnt mit einer Skizze, gereift durch
                  monatelange Verfeinerung. Wir verwenden ausschließlich recyceltes
                  Gold und ethisch gewonnene Edelsteine — weil wahrer Luxus keine
                  Kompromisse kennt.
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <p
                  className="mb-10 text-sm leading-[1.9]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-charcoal)',
                    fontWeight: 300,
                  }}
                >
                  Unsere Goldschmiede arbeiten in der Tradition alter
                  Handwerksmeister, mit Werkzeugen, die seit Generationen weitergereicht
                  werden. Das Ergebnis: Schmuck, der Geschichten erzählt.
                </p>
              </FadeIn>

              <FadeIn delay={750}>
                <Link
                  href="/templates/fashion/jewelry/about"
                  className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-60"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-black)',
                    fontWeight: 400,
                  }}
                >
                  <span
                    className="h-px w-4 transition-all duration-400 group-hover:w-8"
                    style={{ backgroundColor: 'var(--au-gold)' }}
                  />
                  Unsere Geschichte
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. Collections ═══ */}
      <section
        className="px-6 py-20 md:py-28"
        style={{ backgroundColor: 'var(--au-white)' }}
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionHeading
              label="AURUM"
              title="Unsere Kollektionen"
              subtitle="Drei Welten, eine Handschrift"
            />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {displayCollections.map((collection, i) => (
              <FadeIn key={collection.id} delay={200 + i * 150}>
                <CollectionCard collection={collection} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. Featured Product — Single highlight ═══ */}
      <section style={{ backgroundColor: 'var(--au-cream)' }}>
        <div className="mx-auto grid min-h-[550px] max-w-6xl grid-cols-1 md:grid-cols-2 md:min-h-[65vh]">
          {/* Left: Product info */}
          <div className="order-2 flex items-center px-8 py-16 md:order-1 md:px-16 lg:px-24 md:py-24">
            <div className="max-w-md">
              <FadeIn delay={200}>
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-gold)',
                    fontWeight: 400,
                  }}
                >
                  Highlight
                </p>
              </FadeIn>

              <FadeIn delay={350}>
                <h2
                  className="mb-4 text-3xl leading-tight md:text-4xl"
                  style={{
                    fontFamily: 'var(--au-font-serif)',
                    color: 'var(--au-black)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                  }}
                >
                  {featuredProduct.name}
                </h2>
              </FadeIn>

              <FadeIn delay={500}>
                <p
                  className="mb-6 text-sm leading-[1.9]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-charcoal)',
                    fontWeight: 300,
                  }}
                >
                  {featuredProduct.description}
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <p
                  className="mb-10 text-xl"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-black)',
                    fontWeight: 300,
                  }}
                >
                  {formatPrice(featuredProduct.price)}
                </p>
              </FadeIn>

              <FadeIn delay={700}>
                <Link
                  href={`/templates/fashion/jewelry/products/${featuredProduct.id}`}
                  className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-60"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-black)',
                    fontWeight: 400,
                  }}
                >
                  <span
                    className="h-px w-4 transition-all duration-400 group-hover:w-8"
                    style={{ backgroundColor: 'var(--au-gold)' }}
                  />
                  Jetzt entdecken
                </Link>
              </FadeIn>
            </div>
          </div>

          {/* Right: Product image with gradient fallback */}
          <FadeIn className="order-1 h-full md:order-2">
            <div
              className="relative flex h-full min-h-[400px] items-center justify-center md:min-h-full"
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
              <div
                className="relative h-48 w-48 rounded-full md:h-64 md:w-64"
                style={{
                  border: '0.5px solid var(--au-line)',
                  boxShadow: '0 0 80px rgba(201,169,110,0.12)',
                }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 6. Ring Size CTA ═══ */}
      <section
        className="px-6 py-20 md:py-28"
        style={{ backgroundColor: 'var(--au-white)' }}
      >
        <div className="mx-auto max-w-xl text-center">
          <FadeIn>
            <div className="mb-8 flex items-center justify-center">
              <div
                className="h-px w-10"
                style={{ backgroundColor: 'var(--au-gold)' }}
              />
              <div
                className="mx-3 h-1 w-1 rotate-45"
                style={{ backgroundColor: 'var(--au-gold)' }}
              />
              <div
                className="h-px w-10"
                style={{ backgroundColor: 'var(--au-gold)' }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <h2
              className="mb-4 text-3xl md:text-4xl"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Ihre perfekte Ringgröße
            </h2>
          </FadeIn>

          <FadeIn delay={300}>
            <p
              className="mb-10 text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              Finden Sie Ihre ideale Größe mit unserem interaktiven Ringgrößen-Finder.
              Einfach, präzise und direkt auf Ihrem Bildschirm.
            </p>
          </FadeIn>

          <FadeIn delay={450}>
            <Link
              href="/templates/fashion/jewelry/ring-size-guide"
              className="inline-block py-3.5 px-10 text-[10px] uppercase tracking-[0.25em] transition-all duration-400 hover:opacity-90"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-black)',
                border: '0.5px solid var(--au-gold)',
                fontWeight: 400,
              }}
            >
              Ringgrößen-Guide
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. Newsletter ═══ */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: 'var(--au-cream)' }}
      >
        <div className="mx-auto max-w-lg text-center">
          <FadeIn>
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-gold)',
                fontWeight: 400,
              }}
            >
              AURUM
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <h2
              className="mb-4 text-3xl md:text-4xl"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Werden Sie Teil der Maison
            </h2>
          </FadeIn>

          <FadeIn delay={300}>
            <p
              className="mb-10 text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              Erfahren Sie als Erste von neuen Kreationen und exklusiven Angeboten.
            </p>
          </FadeIn>

          <FadeIn delay={450}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 px-5 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-[var(--au-gold)]"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  backgroundColor: 'var(--au-white)',
                  border: '0.5px solid var(--au-line)',
                  color: 'var(--au-black)',
                  fontWeight: 300,
                }}
              />
              <button
                type="submit"
                className="px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-85"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  backgroundColor: 'var(--au-gold)',
                  color: 'var(--au-white)',
                  fontWeight: 400,
                }}
              >
                Abonnieren
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}

/* ── Collection Card ──────────────────────────────────────────────────── */

function CollectionCard({
  collection,
}: {
  collection: { id: string; name: string; subtitle: string; description: string; gradient: string; image: string }
}) {
  return (
    <Link
      href={`/templates/fashion/jewelry/products?collection=${collection.id}`}
      className="group block"
    >
      {/* Collection image with gradient fallback */}
      <div
        className="relative flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]"
        style={{
          aspectRatio: '1/1',
          background: collection.gradient,
        }}
      >
        {collection.image && (
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        )}
        {/* Decorative circle */}
        <div
          className="relative h-24 w-24 rounded-full transition-transform duration-700 group-hover:scale-110"
          style={{
            border: '0.5px solid rgba(255,255,255,0.25)',
          }}
        />

        {/* Corner brackets */}
        <div className="absolute left-4 top-4 h-6 w-6">
          <div className="absolute left-0 top-0 h-full w-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div className="absolute left-0 top-0 h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        </div>
        <div className="absolute bottom-4 right-4 h-6 w-6">
          <div className="absolute bottom-0 right-0 h-full w-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div className="absolute bottom-0 right-0 h-px w-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      {/* Text below */}
      <div className="pt-5">
        <p
          className="mb-1 text-[10px] uppercase tracking-[0.25em]"
          style={{
            fontFamily: 'var(--au-font-sans)',
            color: 'var(--au-gold)',
            fontWeight: 400,
          }}
        >
          {collection.subtitle}
        </p>
        <h3
          className="au-hover-underline text-xl"
          style={{
            fontFamily: 'var(--au-font-serif)',
            color: 'var(--au-black)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          {collection.name}
        </h3>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{
            fontFamily: 'var(--au-font-sans)',
            color: 'var(--au-muted)',
            fontWeight: 300,
          }}
        >
          {collection.description}
        </p>
      </div>
    </Link>
  )
}
