'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products, collections, formatPrice, type Product } from './_design/data'
import { SectionHeading } from './_design/components/SectionHeading'
import { ProductCard } from './_design/components/ProductCard'
import { QuickViewModal } from './_design/components/QuickViewModal'

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
        transform: 'translateY(24px)',
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Homepage ────────────────────────────────────────────────────────── */

export default function PalazzoHomePage() {
  const newArrivals = products.filter((p) => p.isNew)
  const featuredProducts = products.slice(0, 4)
  const displayCollections = collections.slice(0, 2)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <main>
      {/* ══ 1. Hero ══ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Hero background with ken-burns */}
        <div
          className="pz-ken-burns absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 25%, #C9A55C 55%, #6B2D3E 80%, #0A0A0A 100%)',
          }}
        />
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
          <FadeIn delay={200}>
            <p
              className="text-xs tracking-[0.35em] uppercase mb-8"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-gold)',
              }}
            >
              Herbst / Winter 2026
            </p>
          </FadeIn>

          <FadeIn delay={500}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-8"
              style={{
                fontFamily: 'var(--pz-font-serif)',
                color: 'var(--pz-ivory)',
                fontWeight: 400,
              }}
            >
              Notte Italiana
            </h1>
          </FadeIn>

          <FadeIn delay={800}>
            <p
              className="text-lg md:text-xl mb-12 max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-warm-gray)',
                fontWeight: 300,
              }}
            >
              Dramatischer Luxus, gefertigt in den Werkstätten Italiens
            </p>
          </FadeIn>

          <FadeIn delay={1100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/templates/fashion/palazzo/collections"
                className="inline-flex items-center gap-2 px-10 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  fontFamily: 'var(--pz-font-sans)',
                  backgroundColor: 'var(--pz-gold)',
                  color: 'var(--pz-black)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--pz-ivory)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--pz-gold)'
                }}
              >
                Kollektion entdecken
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/templates/fashion/palazzo/products"
                className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-70"
                style={{
                  fontFamily: 'var(--pz-font-sans)',
                  color: 'var(--pz-ivory)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                }}
              >
                Alle Produkte
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, var(--pz-black), transparent)',
          }}
        />
      </section>

      {/* ══ 2. Featured Products ══ */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--pz-black)' }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={100}>
            <SectionHeading
              label="PALAZZO"
              title="Ausgewählte Stücke"
              subtitle="Handverlesen aus unseren Kollektionen"
            />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {featuredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={200 + i * 120}>
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={700}>
            <div className="text-center mt-12">
              <Link
                href="/templates/fashion/palazzo/products"
                className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-60"
                style={{
                  fontFamily: 'var(--pz-font-sans)',
                  color: 'var(--pz-gold)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                Alle Produkte entdecken
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ 3. Collection Showcase ══ */}
      <section
        className="py-0 md:py-0"
        style={{ backgroundColor: 'var(--pz-charcoal)' }}
      >
        {displayCollections.map((collection, index) => (
          <div key={collection.id} className={`grid grid-cols-1 md:grid-cols-2 min-h-[600px] md:min-h-[80vh]`}>
            {/* Image */}
            <FadeIn className={`h-full ${index % 2 === 1 ? 'md:order-2' : ''}`}>
              <Link
                href={`/templates/fashion/palazzo/products?collection=${collection.id}`}
                className="block w-full h-full min-h-[400px] md:min-h-full relative group"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: collection.gradient }}
                />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
              </Link>
            </FadeIn>

            {/* Text */}
            <div className={`flex items-center px-8 md:px-16 lg:px-24 py-16 md:py-24 ${index % 2 === 1 ? 'md:order-1' : ''}`} style={{ backgroundColor: 'var(--pz-black)' }}>
              <div className="max-w-lg">
                <FadeIn delay={200}>
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase mb-3"
                    style={{
                      fontFamily: 'var(--pz-font-sans)',
                      color: 'var(--pz-gold)',
                    }}
                  >
                    PALAZZO
                  </p>
                </FadeIn>

                <FadeIn delay={300}>
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-4"
                    style={{
                      fontFamily: 'var(--pz-font-sans)',
                      color: 'var(--pz-warm-gray)',
                    }}
                  >
                    {collection.subtitle}
                  </p>
                </FadeIn>

                <FadeIn delay={400}>
                  <h2
                    className="text-4xl md:text-5xl leading-tight mb-6"
                    style={{
                      fontFamily: 'var(--pz-font-serif)',
                      color: 'var(--pz-ivory)',
                      fontWeight: 400,
                    }}
                  >
                    {collection.name}
                  </h2>
                </FadeIn>

                <FadeIn delay={500}>
                  <p
                    className="text-base leading-relaxed mb-10 max-w-md"
                    style={{
                      fontFamily: 'var(--pz-font-sans)',
                      color: 'var(--pz-warm-gray)',
                      fontWeight: 300,
                    }}
                  >
                    {collection.description}
                  </p>
                </FadeIn>

                <FadeIn delay={600}>
                  <Link
                    href={`/templates/fashion/palazzo/products?collection=${collection.id}`}
                    className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-60"
                    style={{
                      fontFamily: 'var(--pz-font-sans)',
                      color: 'var(--pz-gold)',
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
        ))}
      </section>

      {/* ══ 4. Brand Philosophy ══ */}
      <section
        className="py-0 md:py-0"
        style={{ backgroundColor: 'var(--pz-black)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px] md:min-h-[85vh]">
          {/* Left: gradient image */}
          <FadeIn className="h-full">
            <div
              className="w-full h-full min-h-[500px] md:min-h-full"
              style={{
                background:
                  'linear-gradient(155deg, #0A0A0A 0%, #2A2A2A 20%, #C9A55C 50%, #B8956A 70%, #0A0A0A 100%)',
              }}
            />
          </FadeIn>

          {/* Right: Text block */}
          <div className="flex items-center px-8 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-lg">
              <FadeIn delay={200}>
                <p
                  className="text-[10px] tracking-[0.35em] uppercase mb-6"
                  style={{
                    fontFamily: 'var(--pz-font-sans)',
                    color: 'var(--pz-gold)',
                  }}
                >
                  La Filosofia
                </p>
              </FadeIn>

              <FadeIn delay={350}>
                <h2
                  className="text-4xl md:text-5xl leading-tight mb-8"
                  style={{
                    fontFamily: 'var(--pz-font-serif)',
                    color: 'var(--pz-ivory)',
                    fontWeight: 400,
                  }}
                >
                  Gefertigt für die Ewigkeit
                </h2>
              </FadeIn>

              <FadeIn delay={500}>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{
                    fontFamily: 'var(--pz-font-sans)',
                    color: 'var(--pz-warm-gray)',
                    fontWeight: 300,
                  }}
                >
                  Jedes Stück unserer Kollektion beginnt mit einer Idee, die in den
                  jahrhundertealten Traditionen italienischer Handwerkskunst verwurzelt ist.
                  Von der Auswahl der edelsten Materialien bis zur Präzision jeder Naht --
                  unser Atelier bewahrt das Erbe der Meister.
                </p>
              </FadeIn>

              <FadeIn delay={600}>
                <p
                  className="text-base leading-relaxed mb-10"
                  style={{
                    fontFamily: 'var(--pz-font-sans)',
                    color: 'var(--pz-warm-gray)',
                    fontWeight: 300,
                  }}
                >
                  Wir glauben, dass wahrer Luxus in den unsichtbaren Details liegt --
                  das Gewicht einer Goldschnalle, der Fall eines Seidenfutters,
                  die stille Opulenz makelloser Sartoria.
                </p>
              </FadeIn>

              <FadeIn delay={750}>
                <Link
                  href="/templates/fashion/palazzo/about"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-60"
                  style={{
                    fontFamily: 'var(--pz-font-sans)',
                    color: 'var(--pz-gold)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Unsere Geschichte
                  <ArrowRight size={14} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. New Arrivals ══ */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--pz-charcoal)' }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <SectionHeading
              label="PALAZZO"
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
        </div>
      </section>

      {/* ══ 6. Newsletter ══ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--pz-black)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="flex items-center justify-center mb-12">
              <div
                className="h-px w-12"
                style={{ backgroundColor: 'var(--pz-gold)' }}
              />
              <div
                className="w-1.5 h-1.5 rotate-45 mx-3"
                style={{ backgroundColor: 'var(--pz-gold)' }}
              />
              <div
                className="h-px w-12"
                style={{ backgroundColor: 'var(--pz-gold)' }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <h2
              className="text-4xl md:text-5xl leading-tight mb-6"
              style={{
                fontFamily: 'var(--pz-font-serif)',
                color: 'var(--pz-ivory)',
                fontWeight: 400,
              }}
            >
              Werden Sie Teil des Palazzo
            </h2>
          </FadeIn>

          <FadeIn delay={300}>
            <p
              className="text-base leading-relaxed mb-12"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-warm-gray)',
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
                className="flex-1 px-6 py-4 text-sm border outline-none transition-colors duration-300 focus:border-[var(--pz-gold)]"
                style={{
                  fontFamily: 'var(--pz-font-sans)',
                  backgroundColor: 'transparent',
                  borderColor: 'var(--pz-charcoal)',
                  color: 'var(--pz-ivory)',
                }}
              />
              <button
                type="submit"
                className="px-10 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:opacity-90"
                style={{
                  fontFamily: 'var(--pz-font-sans)',
                  backgroundColor: 'var(--pz-gold)',
                  color: 'var(--pz-black)',
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
