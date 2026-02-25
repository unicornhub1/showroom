'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  menuItems,
  formatPrice,
  categoryLabels,
  type MenuItem,
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

/* ── Category Divider ────────────────────────────────────────────────── */

function CategoryDivider({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative mb-12 sm:mb-16">
      <div className="flex items-center gap-4 mb-3">
        <div
          className="h-px flex-1"
          style={{ backgroundColor: 'var(--sv-border)' }}
        />
        <div
          className="h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: 'var(--sv-gold)' }}
        />
        <div
          className="h-px flex-1"
          style={{ backgroundColor: 'var(--sv-border)' }}
        />
      </div>
      <h2
        className="text-3xl sm:text-4xl md:text-5xl text-center"
        style={{
          fontFamily: 'var(--sv-font-display)',
          color: 'var(--sv-text)',
          fontWeight: 300,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-center mt-2 text-sm"
          style={{
            fontFamily: 'var(--sv-font-body)',
            color: 'var(--sv-muted)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ── Menu Item Row ───────────────────────────────────────────────────── */

function MenuItemRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <FadeIn delay={0.08 * index}>
      <div
        className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-6 border-b transition-colors duration-300 hover:border-[var(--sv-accent)]"
        style={{ borderColor: 'var(--sv-border)' }}
      >
        {/* Name and description */}
        <div className="flex-1">
          <h3
            className="text-lg sm:text-xl transition-colors duration-300 group-hover:text-[var(--sv-accent)]"
            style={{
              fontFamily: 'var(--sv-font-display)',
              color: 'var(--sv-text)',
              fontWeight: 400,
            }}
          >
            {item.name}
          </h3>
          <p
            className="mt-1.5 text-sm leading-relaxed max-w-xl"
            style={{
              fontFamily: 'var(--sv-font-body)',
              color: 'var(--sv-muted)',
              fontWeight: 300,
            }}
          >
            {item.description}
          </p>
        </div>

        {/* Dots connector (desktop only) */}
        <div
          className="hidden sm:block flex-1 border-b border-dotted mx-2 self-end mb-2"
          style={{ borderColor: 'var(--sv-border-strong)', minWidth: '40px', maxWidth: '120px' }}
        />

        {/* Price */}
        <span
          className="text-lg sm:text-xl shrink-0 sm:self-end"
          style={{
            fontFamily: 'var(--sv-font-display)',
            color: 'var(--sv-gold)',
            fontWeight: 400,
          }}
        >
          {formatPrice(item.price)}
        </span>
      </div>
    </FadeIn>
  )
}

/* ── Speisekarte Page ────────────────────────────────────────────────── */

export default function SpeisekartePage() {
  const categories: Array<{
    key: MenuItem['category']
    subtitle?: string
  }> = [
    { key: 'vorspeisen', subtitle: 'Zum Beginnen' },
    { key: 'hauptgerichte', subtitle: 'Unsere Signature-Gerichte' },
    { key: 'desserts', subtitle: 'Ein s\u00FC\u00DFes Finale' },
    { key: 'weinbegleitung', subtitle: 'Vom Sommelier empfohlen \u2014 pro Glas' },
  ]

  const categoryIcons: Record<string, string> = {
    vorspeisen: '\u2726',
    hauptgerichte: '\u2726',
    desserts: '\u2726',
    weinbegleitung: '\u2726',
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(107,45,62,0.15) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--sv-gold)' }} />
              <span
                className="text-[10px] tracking-[0.5em] uppercase"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-accent)',
                }}
              >
                Unsere Karte
              </span>
              <div className="h-px w-8" style={{ backgroundColor: 'var(--sv-gold)' }} />
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
              Speisekarte
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
              Saisonale Gerichte, inspiriert von der franz&ouml;sischen
              K&uuml;chentradition und verfeinert mit regionalen Produkten.
            </p>
          </FadeIn>

          {/* Decorative line */}
          <FadeIn delay={0.45}>
            <div className="flex items-center justify-center mt-10">
              <div className="h-px w-20" style={{ backgroundColor: 'var(--sv-border-strong)' }} />
              <div className="mx-3 h-1.5 w-1.5 rotate-45" style={{ backgroundColor: 'var(--sv-gold)' }} />
              <div className="h-px w-20" style={{ backgroundColor: 'var(--sv-border-strong)' }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          {categories.map((cat, catIndex) => {
            const items = menuItems.filter((m) => m.category === cat.key)
            return (
              <div key={cat.key} className={catIndex > 0 ? 'mt-20 sm:mt-28' : ''}>
                <FadeIn>
                  <CategoryDivider
                    title={categoryLabels[cat.key]}
                    subtitle={cat.subtitle}
                  />
                </FadeIn>

                {items.map((item, i) => (
                  <MenuItemRow key={item.id} item={item} index={i} />
                ))}
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 sm:py-28 overflow-hidden" style={{ backgroundColor: 'var(--sv-surface)' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(200,149,108,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <FadeIn>
            <p
              className="text-xl sm:text-2xl italic mb-8"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
              }}
            >
              &bdquo;Allergien oder besondere W&uuml;nsche? Sprechen Sie
              uns gerne an &mdash; wir passen jedes Gericht f&uuml;r
              Sie an.&ldquo;
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href={`${BASE}/reservierung`}
              className="inline-block border px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] transition-all duration-500 hover:bg-[var(--sv-accent)] hover:text-[var(--sv-bg)] hover:border-[var(--sv-accent)]"
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
    </>
  )
}
