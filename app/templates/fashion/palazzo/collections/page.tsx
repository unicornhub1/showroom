'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { collections } from '../_design/data'
import { useEffect, useRef } from 'react'

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
        transform: 'translateY(24px)',
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
    <main style={{ backgroundColor: 'var(--pz-black)' }}>
      {/* Hero */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: '50vh',
          background:
            'linear-gradient(160deg, #0A0A0A 0%, #2A2A2A 35%, #C9A55C 70%, #6B2D3E 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 100%)',
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <div
            className="mx-auto mb-8 h-px w-20"
            style={{ backgroundColor: 'var(--pz-gold)' }}
          />
          <h1
            className="text-5xl font-normal leading-tight tracking-wide sm:text-6xl md:text-7xl"
            style={{
              fontFamily: 'var(--pz-font-serif)',
              color: 'var(--pz-ivory)',
            }}
          >
            Unsere Kollektionen
          </h1>
          <p
            className="mx-auto mt-6 max-w-lg text-base font-light tracking-wide"
            style={{
              fontFamily: 'var(--pz-font-sans)',
              color: 'var(--pz-warm-gray)',
            }}
          >
            Mit Intention kuratiert, mit Meisterhand gefertigt
          </p>
          <div
            className="mx-auto mt-8 h-px w-20"
            style={{ backgroundColor: 'var(--pz-gold)' }}
          />
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((collection, i) => (
              <FadeIn key={collection.id} delay={i * 150}>
                <CollectionCard collection={collection} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: 'var(--pz-charcoal)' }}
      >
        <FadeIn>
          <p
            className="text-base mb-6"
            style={{
              fontFamily: 'var(--pz-font-sans)',
              color: 'var(--pz-warm-gray)',
              fontWeight: 300,
            }}
          >
            Suchen Sie etwas Bestimmtes?
          </p>
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
            Alle Produkte
            <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </section>
    </main>
  )
}

/* ── Collection Card ─────────────────────────────────────────────────── */

function CollectionCard({
  collection,
}: {
  collection: {
    id: string
    name: string
    subtitle: string
    description: string
    gradient: string
    image?: string
    productCount: number
  }
}) {
  return (
    <Link
      href={`/templates/fashion/palazzo/products?collection=${collection.id}`}
      className="group relative block overflow-hidden h-[520px] md:h-[600px]"
    >
      {/* Collection gradient */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{ background: collection.gradient }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.2) 40%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
        <div className="transition-transform duration-500 group-hover:-translate-y-3">
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-2"
            style={{
              fontFamily: 'var(--pz-font-sans)',
              color: 'var(--pz-gold)',
            }}
          >
            PALAZZO
          </p>

          <p
            className="text-xs tracking-[0.25em] uppercase mb-3 opacity-80"
            style={{
              fontFamily: 'var(--pz-font-sans)',
              color: 'var(--pz-ivory)',
            }}
          >
            {collection.subtitle}
          </p>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{
              fontFamily: 'var(--pz-font-serif)',
              color: 'var(--pz-ivory)',
              fontWeight: 400,
            }}
          >
            {collection.name}
          </h2>

          <p
            className="text-sm mb-6 max-w-sm opacity-0 transition-opacity duration-500 group-hover:opacity-90"
            style={{
              fontFamily: 'var(--pz-font-sans)',
              color: 'var(--pz-warm-gray)',
              fontWeight: 300,
            }}
          >
            {collection.description}
          </p>

          <div className="flex items-center justify-between">
            <span
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-gold)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              Jetzt entdecken
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>

            <span
              className="text-xs tracking-wider opacity-60"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-ivory)',
              }}
            >
              {collection.productCount} {collection.productCount === 1 ? 'Stück' : 'Stücke'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
