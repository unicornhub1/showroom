'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { collections } from '../_design/data'
import { HeroBanner } from '../_design/components/HeroBanner'
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
    <main>
      {/* Hero */}
      <HeroBanner
        title="Unsere Kollektionen"
        subtitle="Mit Intention kuratiert, mit Sorgfalt gefertigt"
        image="/templates/fashion/elegance/images/hero/collections-hero.jpg"
      />

      {/* Collection Grid */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--el-offwhite)' }}
      >
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
        style={{ backgroundColor: 'var(--el-cream)' }}
      >
        <FadeIn>
          <p
            className="text-base mb-6"
            style={{
              fontFamily: 'var(--el-font-sans)',
              color: 'var(--el-gray)',
              fontWeight: 300,
            }}
          >
            Suchen Sie etwas Bestimmtes?
          </p>
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
      href={`/templates/fashion/elegance/products?collection=${collection.id}`}
      className="group relative block overflow-hidden h-[520px] md:h-[600px]"
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

      {/* Dark overlay at bottom for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)',
        }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
        <div className="transition-transform duration-500 group-hover:-translate-y-3">
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

          <h2
            className="text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{
              fontFamily: 'var(--el-font-serif)',
              color: 'var(--el-cream)',
              fontWeight: 300,
            }}
          >
            {collection.name}
          </h2>

          <p
            className="text-sm mb-6 max-w-sm opacity-0 transition-opacity duration-500 group-hover:opacity-90"
            style={{
              fontFamily: 'var(--el-font-sans)',
              color: 'var(--el-light)',
              fontWeight: 300,
            }}
          >
            {collection.description}
          </p>

          <div className="flex items-center justify-between">
            <span
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-cream)',
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
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-cream)',
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
