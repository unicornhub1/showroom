'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Leaf } from 'lucide-react'
import { collections } from '../_design/data'
import { useEffect, useRef } from 'react'

const BASE = '/templates/fashion/jardin'

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
    <main>
      {/* Hero header */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: '45vh',
          background: 'linear-gradient(160deg, #E8EDE5 0%, #7A8B6F 35%, #C17C5F 70%, #D4C5B2 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(61,61,61,0.15) 0%, rgba(61,61,61,0.35) 100%)',
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-offwhite)', opacity: 0.5 }} />
            <Leaf size={16} style={{ color: 'var(--jd-offwhite)', opacity: 0.7 }} />
            <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-offwhite)', opacity: 0.5 }} />
          </div>
          <h1
            className="text-4xl tracking-wide sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'var(--jd-font-serif)',
              color: 'var(--jd-offwhite)',
              fontWeight: 400,
            }}
          >
            Unsere Kollektionen
          </h1>
          <p
            className="mx-auto mt-4 max-w-lg text-sm tracking-wide"
            style={{
              fontFamily: 'var(--jd-font-sans)',
              color: 'var(--jd-offwhite)',
              opacity: 0.85,
            }}
          >
            Mit Intention kuratiert, mit Sorgfalt gefertigt
          </p>
        </div>
      </section>

      {/* Collection Grid */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--jd-offwhite)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((collection, i) => (
              <FadeIn key={collection.id} delay={i * 150}>
                <Link
                  href={`${BASE}/products?collection=${collection.id}`}
                  className="group relative block overflow-hidden rounded-2xl"
                  style={{ height: '520px' }}
                >
                  {/* Gradient bg */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 rounded-2xl"
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

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 rounded-2xl" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
                    <div className="transition-transform duration-500 group-hover:-translate-y-3">
                      <p
                        className="text-xs tracking-[0.2em] uppercase mb-3 opacity-80"
                        style={{
                          fontFamily: 'var(--jd-font-sans)',
                          color: 'var(--jd-offwhite)',
                        }}
                      >
                        {collection.subtitle}
                      </p>

                      <h2
                        className="text-3xl md:text-4xl lg:text-5xl mb-4"
                        style={{
                          fontFamily: 'var(--jd-font-serif)',
                          color: 'var(--jd-offwhite)',
                          fontWeight: 400,
                        }}
                      >
                        {collection.name}
                      </h2>

                      <p
                        className="text-sm mb-6 max-w-sm opacity-0 transition-opacity duration-500 group-hover:opacity-90"
                        style={{
                          fontFamily: 'var(--jd-font-sans)',
                          color: 'var(--jd-offwhite)',
                          fontWeight: 300,
                        }}
                      >
                        {collection.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase"
                          style={{
                            fontFamily: 'var(--jd-font-sans)',
                            color: 'var(--jd-offwhite)',
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
                            fontFamily: 'var(--jd-font-sans)',
                            color: 'var(--jd-offwhite)',
                          }}
                        >
                          {collection.productCount} {collection.productCount === 1 ? 'Stück' : 'Stücke'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: 'var(--jd-cream)' }}
      >
        <FadeIn>
          <p
            className="text-base mb-6"
            style={{
              fontFamily: 'var(--jd-font-sans)',
              color: 'var(--jd-charcoal)',
              opacity: 0.6,
            }}
          >
            Suchen Sie etwas Bestimmtes?
          </p>
          <Link
            href={`${BASE}/products`}
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-60"
            style={{
              fontFamily: 'var(--jd-font-sans)',
              color: 'var(--jd-sage)',
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
