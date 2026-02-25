'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  galleryItems,
  galleryCategoryLabels,
  type GalleryItem,
} from '../_design/data'

const BASE = "/templates/gastro/saveur"

/* ── Scroll-triggered FadeIn ─────────────────────────────────────────── */

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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Lightbox Modal ──────────────────────────────────────────────────── */

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem | null
  onClose: () => void
}) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [item])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(26, 20, 18, 0.92)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 transition-colors duration-300 hover:text-[var(--sv-accent)]"
          style={{ color: 'var(--sv-muted)' }}
          aria-label="Schlie\u00DFen"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image area */}
        <div
          className="relative aspect-[4/3] sm:aspect-[16/10] w-full border"
          style={{
            background: item.gradient,
            borderColor: 'var(--sv-border)',
          }}
        >
          {/* Decorative corners */}
          <div
            className="absolute top-3 left-3 h-8 w-8 border-t border-l"
            style={{ borderColor: 'var(--sv-accent)', opacity: 0.4 }}
          />
          <div
            className="absolute top-3 right-3 h-8 w-8 border-t border-r"
            style={{ borderColor: 'var(--sv-accent)', opacity: 0.4 }}
          />
          <div
            className="absolute bottom-3 left-3 h-8 w-8 border-b border-l"
            style={{ borderColor: 'var(--sv-accent)', opacity: 0.4 }}
          />
          <div
            className="absolute bottom-3 right-3 h-8 w-8 border-b border-r"
            style={{ borderColor: 'var(--sv-accent)', opacity: 0.4 }}
          />
        </div>

        {/* Caption */}
        <div className="mt-4 flex items-center justify-between">
          <h3
            className="text-lg sm:text-xl"
            style={{
              fontFamily: 'var(--sv-font-display)',
              color: 'var(--sv-text)',
              fontWeight: 400,
            }}
          >
            {item.title}
          </h3>
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{
              fontFamily: 'var(--sv-font-body)',
              color: 'var(--sv-accent)',
            }}
          >
            {galleryCategoryLabels[item.category]}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Gallery Card ────────────────────────────────────────────────────── */

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem
  index: number
  onClick: () => void
}) {
  // Create masonry-style heights
  const heights = [
    'h-[250px] sm:h-[300px]',
    'h-[300px] sm:h-[380px]',
    'h-[250px] sm:h-[320px]',
    'h-[320px] sm:h-[400px]',
    'h-[280px] sm:h-[350px]',
    'h-[250px] sm:h-[300px]',
  ]
  const height = heights[index % heights.length]

  return (
    <FadeIn delay={0.08 * index}>
      <button
        onClick={onClick}
        className={`group relative w-full ${height} overflow-hidden border transition-all duration-500 hover:border-[var(--sv-accent)]`}
        style={{
          borderColor: 'var(--sv-border)',
          background: item.gradient,
        }}
      >
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(to top, rgba(26,20,18,0.8) 0%, rgba(26,20,18,0.2) 50%, transparent 100%)',
          }}
        />

        {/* Title on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p
            className="text-[10px] tracking-[0.2em] uppercase mb-1"
            style={{
              fontFamily: 'var(--sv-font-body)',
              color: 'var(--sv-accent)',
            }}
          >
            {galleryCategoryLabels[item.category]}
          </p>
          <h3
            className="text-base sm:text-lg"
            style={{
              fontFamily: 'var(--sv-font-display)',
              color: 'var(--sv-text)',
              fontWeight: 400,
            }}
          >
            {item.title}
          </h3>
        </div>

        {/* Expand icon on hover */}
        <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--sv-accent)"
            strokeWidth="1.5"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>

        {/* Decorative border corners */}
        <div
          className="absolute top-2 left-2 h-5 w-5 border-t border-l opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ borderColor: 'var(--sv-accent)', opacity: 0 }}
        />
        <div
          className="absolute bottom-2 right-2 h-5 w-5 border-b border-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ borderColor: 'var(--sv-accent)', opacity: 0 }}
        />
      </button>
    </FadeIn>
  )
}

/* ── Galerie Page ────────────────────────────────────────────────────── */

export default function GaleriePage() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | GalleryItem['category']
  >('all')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)

  const filters: Array<{
    key: 'all' | GalleryItem['category']
    label: string
  }> = [
    { key: 'all', label: 'Alle' },
    { key: 'restaurant', label: 'Restaurant' },
    { key: 'kueche', label: 'K\u00FCche' },
    { key: 'events', label: 'Events' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 40% 20%, rgba(200,149,108,0.08) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="h-px w-8"
                style={{ backgroundColor: 'var(--sv-gold)' }}
              />
              <span
                className="text-[10px] tracking-[0.5em] uppercase"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-accent)',
                }}
              >
                Eindr&uuml;cke
              </span>
              <div
                className="h-px w-8"
                style={{ backgroundColor: 'var(--sv-gold)' }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
              }}
            >
              Galerie
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              className="text-base sm:text-lg max-w-lg mx-auto"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Tauchen Sie ein in die Welt von SAVEUR &mdash; Momente,
              Atmosph&auml;re und kulinarische Kunst.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters + Gallery */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Filter bar */}
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12 sm:mb-16">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className="px-4 sm:px-6 py-2 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color:
                      activeFilter === filter.key
                        ? 'var(--sv-bg)'
                        : 'var(--sv-muted)',
                    backgroundColor:
                      activeFilter === filter.key
                        ? 'var(--sv-accent)'
                        : 'transparent',
                    borderColor:
                      activeFilter === filter.key
                        ? 'var(--sv-accent)'
                        : 'var(--sv-border)',
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5">
            {filteredItems.map((item, i) => (
              <div key={item.id} className="mb-4 sm:mb-5 break-inside-avoid">
                <GalleryCard
                  item={item}
                  index={i}
                  onClick={() => setLightboxItem(item)}
                />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p
                className="text-base"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-muted)',
                  fontWeight: 300,
                }}
              >
                Keine Bilder in dieser Kategorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--sv-surface)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <FadeIn>
            <h2
              className="text-3xl sm:text-4xl mb-6"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
              }}
            >
              &Uuml;berzeugt?
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p
              className="text-base leading-relaxed mb-10"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
              }}
            >
              Erleben Sie SAVEUR pers&ouml;nlich &mdash; reservieren Sie
              noch heute Ihren Tisch.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href={`${BASE}/reservierung`}
              className="inline-block border-2 px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] transition-all duration-500 hover:bg-[var(--sv-accent)] hover:text-[var(--sv-bg)] hover:border-[var(--sv-accent)]"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-accent)',
                borderColor: 'var(--sv-accent)',
              }}
            >
              Tisch reservieren
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </>
  )
}
