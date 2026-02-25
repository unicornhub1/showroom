'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { collections, products } from '../_design/data'
import { SectionHeading } from '../_design/components/SectionHeading'

/* ── Fade-in wrapper ─────────────────────────────────────────────────── */

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
        transform: 'translateY(16px)',
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Collections Page ────────────────────────────────────────────────── */

export default function CollectionsPage() {
  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--au-white)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-10 pt-4">
          <ol
            className="flex items-center gap-2 text-[11px] tracking-wider"
            style={{
              fontFamily: 'var(--au-font-sans)',
              color: 'var(--au-muted)',
              fontWeight: 300,
            }}
          >
            <li>
              <Link
                href="/templates/fashion/jewelry"
                className="transition-colors duration-300 hover:text-[var(--au-gold)]"
              >
                Home
              </Link>
            </li>
            <li style={{ opacity: 0.4 }}>/</li>
            <li style={{ color: 'var(--au-black)' }}>Kollektionen</li>
          </ol>
        </nav>

        {/* Page heading */}
        <FadeIn>
          <SectionHeading
            label="AURUM"
            title="Unsere Kollektionen"
            subtitle="Drei Welten, vereint durch eine gemeinsame Handschrift"
          />
        </FadeIn>

        {/* Collections list */}
        <div className="mt-16 space-y-24">
          {collections.map((collection, i) => {
            const collectionProducts = products.filter(
              (p) => p.collection === collection.id,
            )
            const isEven = i % 2 === 0

            return (
              <FadeIn key={collection.id} delay={200 + i * 150}>
                <div
                  className={`grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 ${
                    !isEven ? 'md:direction-rtl' : ''
                  }`}
                >
                  {/* Collection image with gradient fallback */}
                  <Link
                    href={`/templates/fashion/jewelry/products?collection=${collection.id}`}
                    className={`group block ${!isEven ? 'md:order-2' : ''}`}
                  >
                    <div
                      className="relative flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]"
                      style={{
                        aspectRatio: '4/3',
                        background: collection.gradient,
                      }}
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
                      {/* Decorative circle */}
                      <div
                        className="relative h-32 w-32 rounded-full transition-transform duration-700 group-hover:scale-110 md:h-40 md:w-40"
                        style={{
                          border: '0.5px solid rgba(255,255,255,0.2)',
                        }}
                      />

                      {/* Corner brackets */}
                      <div className="absolute left-5 top-5 h-8 w-8">
                        <div
                          className="absolute left-0 top-0 h-full w-px"
                          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                        />
                        <div
                          className="absolute left-0 top-0 h-px w-full"
                          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                        />
                      </div>
                      <div className="absolute bottom-5 right-5 h-8 w-8">
                        <div
                          className="absolute bottom-0 right-0 h-full w-px"
                          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                        />
                        <div
                          className="absolute bottom-0 right-0 h-px w-full"
                          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                        />
                      </div>
                    </div>
                  </Link>

                  {/* Text content */}
                  <div
                    className={`flex flex-col justify-center ${!isEven ? 'md:order-1' : ''}`}
                  >
                    <p
                      className="mb-2 text-[10px] uppercase tracking-[0.3em]"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-gold)',
                        fontWeight: 400,
                      }}
                    >
                      {collection.subtitle}
                    </p>

                    <h2
                      className="mb-5 text-3xl md:text-4xl"
                      style={{
                        fontFamily: 'var(--au-font-serif)',
                        color: 'var(--au-black)',
                        fontWeight: 300,
                        fontStyle: 'italic',
                      }}
                    >
                      {collection.name}
                    </h2>

                    <p
                      className="mb-6 text-sm leading-[1.9]"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-charcoal)',
                        fontWeight: 300,
                      }}
                    >
                      {collection.description}
                    </p>

                    <p
                      className="mb-8 text-[11px]"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-muted)',
                        fontWeight: 300,
                      }}
                    >
                      {collectionProducts.length} Stücke
                    </p>

                    {/* Product preview dots */}
                    <div className="mb-8 flex items-center gap-3">
                      {collectionProducts.slice(0, 4).map((p) => (
                        <Link
                          key={p.id}
                          href={`/templates/fashion/jewelry/products/${p.id}`}
                          className="group/dot block"
                        >
                          <div
                            className="relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-300 group-hover/dot:scale-110"
                            style={{
                              background: p.gradient,
                              border: '0.5px solid var(--au-line)',
                            }}
                            title={p.name}
                          >
                            {p.image && (
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/templates/fashion/jewelry/products?collection=${collection.id}`}
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
                      Kollektion entdecken
                    </Link>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </main>
  )
}
