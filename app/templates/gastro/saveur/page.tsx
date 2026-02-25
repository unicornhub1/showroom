'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Diamond } from 'lucide-react'
import { openingHours, menuItems, formatPrice } from './_design/data'

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

/* ── Hero Letter Animation ───────────────────────────────────────────── */

function AnimatedTitle() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const letters = 'SAVEUR'.split('')

  return (
    <h1
      className="flex items-baseline justify-start"
      style={{
        fontFamily: 'var(--sv-font-display)',
        fontWeight: 300,
        perspective: '600px',
      }}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          className="inline-block text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem]"
          style={{
            color: 'var(--sv-text)',
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? 'translateY(0) rotateX(0deg)'
              : 'translateY(40px) rotateX(-40deg)',
            filter: mounted ? 'blur(0px)' : 'blur(4px)',
            transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.08}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.08}s, filter 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.08}s`,
            lineHeight: 1,
          }}
        >
          {letter}
        </span>
      ))}
    </h1>
  )
}

/* ── Floating Particles ──────────────────────────────────────────────── */

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full sv-float"
          style={{
            width: `${2 + i * 0.5}px`,
            height: `${2 + i * 0.5}px`,
            backgroundColor: 'var(--sv-accent)',
            opacity: 0.2 + i * 0.05,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${5 + i * 0.8}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Homepage ────────────────────────────────────────────────────────── */

export default function SaveurHomePage() {
  const signatureDishes = menuItems
    .filter((item) => item.category === 'hauptgerichte')
    .slice(0, 4)

  const dishGradients = [
    'radial-gradient(ellipse at 30% 40%, #C8956C 0%, #6B2D3E 50%, #1A1412 90%)',
    'linear-gradient(160deg, #D4AF37 0%, #3D2B1F 40%, #1A1412 100%)',
    'radial-gradient(circle at 60% 30%, #6B2D3E 0%, #C8956C 40%, #231C18 90%)',
    'linear-gradient(135deg, #231C18 0%, #D4AF37 50%, #6B2D3E 100%)',
  ]

  return (
    <>
      {/* ═══ 1. ATMOSPHERIC HERO ═══ */}
      <section className="relative min-h-screen flex items-end overflow-hidden -mt-[80px]">
        {/* Ambient background gradients */}
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--sv-bg)' }}>
          {/* Large radial gradient - warm amber top-right */}
          <div
            className="absolute sv-glow"
            style={{
              width: '60vw',
              height: '60vw',
              top: '-10%',
              right: '-15%',
              background: 'radial-gradient(circle, rgba(200,149,108,0.15) 0%, transparent 70%)',
            }}
          />
          {/* Wine gradient bottom-left */}
          <div
            className="absolute sv-glow"
            style={{
              width: '50vw',
              height: '50vw',
              bottom: '-5%',
              left: '-10%',
              background: 'radial-gradient(circle, rgba(107,45,62,0.2) 0%, transparent 70%)',
              animationDelay: '2s',
            }}
          />
          {/* Gold accent center */}
          <div
            className="absolute"
            style={{
              width: '30vw',
              height: '30vw',
              top: '30%',
              left: '40%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Floating particles */}
        <FloatingParticles />

        {/* Content - asymmetric editorial layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-24 lg:pb-32 pt-32">
          {/* Top-right: Small decorative text */}
          <div className="absolute top-32 right-6 sm:right-8 lg:right-12 hidden sm:block">
            <FadeIn delay={1.2}>
              <p
                className="text-[10px] tracking-[0.4em] uppercase writing-vertical"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-muted)',
                  writingMode: 'vertical-rl',
                  opacity: 0.5,
                }}
              >
                Est. 2019 &mdash; Berlin Mitte
              </p>
            </FadeIn>
          </div>

          {/* Left-aligned title block */}
          <div className="max-w-5xl">
            {/* Pre-title ornament */}
            <FadeIn delay={0}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-px w-12"
                  style={{ backgroundColor: 'var(--sv-accent)' }}
                />
                <span
                  className="text-[10px] tracking-[0.5em] uppercase"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-accent)',
                  }}
                >
                  Restaurant & Fine Dining
                </span>
              </div>
            </FadeIn>

            {/* Main title with letter animation */}
            <AnimatedTitle />

            {/* Poetic tagline - offset to the right for asymmetry */}
            <div className="ml-2 sm:ml-4 md:ml-16 lg:ml-24 mt-6 sm:mt-8">
              <FadeIn delay={1}>
                <p
                  className="text-lg sm:text-xl md:text-2xl font-light italic max-w-md"
                  style={{
                    fontFamily: 'var(--sv-font-display)',
                    color: 'var(--sv-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  Wo jeder Gang eine Geschichte erz&auml;hlt
                  und jeder Abend unvergesslich wird.
                </p>
              </FadeIn>
            </div>

            {/* CTA - further offset */}
            <div className="ml-2 sm:ml-4 md:ml-16 lg:ml-24 mt-10">
              <FadeIn delay={1.3}>
                <div className="flex items-center gap-8">
                  <Link
                    href={`${BASE}/reservierung`}
                    className="group inline-flex items-center gap-3 border px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] transition-all duration-500 hover:bg-[var(--sv-accent)] hover:text-[var(--sv-bg)] hover:border-[var(--sv-accent)]"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-accent)',
                      borderColor: 'var(--sv-accent)',
                    }}
                  >
                    Tisch reservieren
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href={`${BASE}/speisekarte`}
                    className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-muted)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    Speisekarte
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Bottom decorative line */}
          <FadeIn delay={1.5}>
            <div
              className="mt-16 h-px sv-line-expand origin-left"
              style={{
                backgroundColor: 'var(--sv-border)',
                maxWidth: '200px',
              }}
            />
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <FadeIn delay={2}>
            <div className="flex flex-col items-center gap-2">
              <span
                className="text-[9px] tracking-[0.3em] uppercase"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-muted)',
                  opacity: 0.4,
                }}
              >
                Entdecken
              </span>
              <div
                className="w-px h-8 origin-top"
                style={{
                  background: 'linear-gradient(to bottom, var(--sv-accent), transparent)',
                }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 2. PHILOSOPHY SECTION ═══ */}
      <section
        className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
        style={{ backgroundColor: 'var(--sv-surface)' }}
      >
        {/* Subtle background glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 sv-glow"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Decorative quote */}
            <FadeIn>
              <div className="relative">
                {/* Oversized quotation mark */}
                <span
                  className="absolute -top-12 -left-4 sm:-left-8 text-[120px] sm:text-[180px] leading-none select-none"
                  style={{
                    fontFamily: 'var(--sv-font-display)',
                    color: 'var(--sv-accent)',
                    opacity: 0.1,
                  }}
                >
                  &ldquo;
                </span>

                <blockquote className="relative z-10 pl-2">
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl leading-snug"
                    style={{
                      fontFamily: 'var(--sv-font-display)',
                      color: 'var(--sv-text)',
                      fontWeight: 300,
                    }}
                  >
                    Kochen ist die Kunst,
                    <br />
                    <span style={{ color: 'var(--sv-accent)' }}>
                      Erinnerungen
                    </span>{' '}
                    auf einem
                    <br />
                    Teller zu erschaffen.
                  </p>

                  <footer className="mt-8">
                    <div className="flex items-center gap-4">
                      <div
                        className="h-px w-8"
                        style={{ backgroundColor: 'var(--sv-gold)' }}
                      />
                      <cite
                        className="text-sm not-italic tracking-[0.15em] uppercase"
                        style={{
                          fontFamily: 'var(--sv-font-body)',
                          color: 'var(--sv-muted)',
                        }}
                      >
                        Jean-Marc Dubois, K&uuml;chenchef
                      </cite>
                    </div>
                  </footer>
                </blockquote>

                {/* Closing quotation mark */}
                <span
                  className="absolute -bottom-16 right-0 sm:right-12 text-[120px] sm:text-[180px] leading-none select-none rotate-180"
                  style={{
                    fontFamily: 'var(--sv-font-display)',
                    color: 'var(--sv-accent)',
                    opacity: 0.1,
                  }}
                >
                  &ldquo;
                </span>
              </div>
            </FadeIn>

            {/* Divider line with gold ornament (visible on lg) */}
            <div className="hidden lg:flex flex-col items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2/3">
              <div
                className="w-px flex-1"
                style={{ background: 'linear-gradient(to bottom, transparent, var(--sv-gold), transparent)' }}
              />
              <div
                className="my-3 h-2 w-2 rotate-45"
                style={{
                  backgroundColor: 'var(--sv-gold)',
                  boxShadow: '0 0 12px rgba(212,175,55,0.3)',
                }}
              />
              <div
                className="w-px flex-1"
                style={{ background: 'linear-gradient(to bottom, transparent, var(--sv-gold), transparent)' }}
              />
            </div>

            {/* Right: Atmospheric description */}
            <FadeIn delay={0.3}>
              <div>
                <h2
                  className="text-[10px] tracking-[0.5em] uppercase mb-8"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-accent)',
                  }}
                >
                  Unsere Philosophie
                </h2>
                <p
                  className="text-base sm:text-lg leading-relaxed mb-6"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-muted)',
                    fontWeight: 300,
                  }}
                >
                  Bei SAVEUR glauben wir, dass gro&szlig;artige K&uuml;che dort entsteht,
                  wo Respekt vor dem Produkt auf kreative Leidenschaft trifft. Jedes
                  Gericht wird mit saisonalen Zutaten von ausgew&auml;hlten Erzeugern
                  komponiert.
                </p>
                <p
                  className="text-base sm:text-lg leading-relaxed mb-8"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-muted)',
                    fontWeight: 300,
                  }}
                >
                  Unser Anspruch ist es, franz&ouml;sische Haute Cuisine mit regionaler
                  Identit&auml;t zu verbinden &mdash; in einem Ambiente, das so warm und
                  einladend ist wie unsere Gerichte.
                </p>

                <Link
                  href={`${BASE}/ueber-uns`}
                  className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-muted)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Mehr erfahren
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 3. SIGNATURE DISHES SHOWCASE ═══ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, var(--sv-bg) 0%, var(--sv-surface) 50%, var(--sv-bg) 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="h-px w-16"
                style={{ backgroundColor: 'var(--sv-accent)' }}
              />
              <span
                className="text-[10px] tracking-[0.5em] uppercase"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-accent)',
                }}
              >
                Signature
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl mb-4"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
              }}
            >
              Unsere Klassiker
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-base max-w-lg mb-16"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
              }}
            >
              Gerichte, die unsere G&auml;ste immer wieder zur&uuml;ckbringen &mdash;
              perfektioniert &uuml;ber Jahre, inspiriert von Tradition.
            </p>
          </FadeIn>

          {/* Asymmetric dish grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {signatureDishes.map((dish, i) => {
              // Create asymmetric layout: large-small-small-large
              const colSpan =
                i === 0
                  ? 'md:col-span-7'
                  : i === 1
                  ? 'md:col-span-5'
                  : i === 2
                  ? 'md:col-span-5'
                  : 'md:col-span-7'
              const height = i === 0 || i === 3 ? 'h-[400px] md:h-[480px]' : 'h-[400px] md:h-[480px]'

              return (
                <FadeIn
                  key={dish.id}
                  className={colSpan}
                  delay={0.15 * (i + 1)}
                >
                  <div
                    className={`group relative ${height} overflow-hidden border transition-all duration-500 hover:border-[var(--sv-accent)]`}
                    style={{
                      borderColor: 'var(--sv-border)',
                      background: dishGradients[i],
                    }}
                  >
                    {/* Hover overlay with dish info */}
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(to top, rgba(26,20,18,0.95) 0%, rgba(26,20,18,0.4) 40%, transparent 70%)',
                      }}
                    >
                      {/* Price tag */}
                      <span
                        className="absolute top-6 right-6 text-sm"
                        style={{
                          fontFamily: 'var(--sv-font-body)',
                          color: 'var(--sv-gold)',
                          fontWeight: 500,
                        }}
                      >
                        {formatPrice(dish.price)}
                      </span>

                      {/* Dish info */}
                      <div>
                        <h3
                          className="text-xl sm:text-2xl mb-2"
                          style={{
                            fontFamily: 'var(--sv-font-display)',
                            color: 'var(--sv-text)',
                            fontWeight: 400,
                          }}
                        >
                          {dish.name}
                        </h3>
                        <p
                          className="text-sm leading-relaxed max-w-md opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                          style={{
                            fontFamily: 'var(--sv-font-body)',
                            color: 'var(--sv-muted)',
                            fontWeight: 300,
                          }}
                        >
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 60px rgba(200,149,108,0.1)',
                      }}
                    />
                  </div>
                </FadeIn>
              )
            })}
          </div>

          {/* Link to full menu */}
          <FadeIn delay={0.8}>
            <div className="mt-12 text-center">
              <Link
                href={`${BASE}/speisekarte`}
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-muted)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                Gesamte Speisekarte
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 4. AMBIANCE / EXPERIENCE SECTION ═══ */}
      <section className="relative py-20 sm:py-28 overflow-hidden" style={{ backgroundColor: 'var(--sv-surface)' }}>
        {/* Full-width atmospheric gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(107,45,62,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(200,149,108,0.1) 0%, transparent 60%)',
          }}
        />

        {/* Overlapping decorative text */}
        <div className="absolute top-8 sm:top-12 left-0 right-0 pointer-events-none select-none">
          <FadeIn>
            <p
              className="text-center text-6xl sm:text-8xl md:text-9xl lg:text-[12rem]"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                opacity: 0.02,
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              Erlebnis
            </p>
          </FadeIn>
        </div>

        <div className="relative z-10">
          {/* Center content */}
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center mb-16 sm:mb-20">
            <FadeIn>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl mb-6"
                style={{
                  fontFamily: 'var(--sv-font-display)',
                  color: 'var(--sv-text)',
                  fontWeight: 300,
                }}
              >
                Mehr als ein
                <span style={{ color: 'var(--sv-accent)' }}> Dinner</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-muted)',
                  fontWeight: 300,
                }}
              >
                Ein Abend bei SAVEUR ist eine Reise f&uuml;r alle Sinne.
                Vom leisen Knistern der Kerzen &uuml;ber die harmonische
                Weinbegleitung bis zur letzten s&uuml;&szlig;en Versuchung.
              </p>
            </FadeIn>
          </div>

          {/* Marquee scroll */}
          <div className="relative overflow-hidden py-8 sm:py-12">
            {/* Fade edges */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10"
              style={{
                background: 'linear-gradient(to right, var(--sv-surface), transparent)',
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10"
              style={{
                background: 'linear-gradient(to left, var(--sv-surface), transparent)',
              }}
            />

            {/* Scrolling text */}
            <div className="flex whitespace-nowrap sv-marquee">
              {['Genuss', 'Ambiente', 'Leidenschaft', 'Tradition', 'Handwerk', 'Eleganz', 'Harmonie', 'Genuss', 'Ambiente', 'Leidenschaft', 'Tradition', 'Handwerk', 'Eleganz', 'Harmonie'].map(
                (word, i) => (
                  <span
                    key={i}
                    className="mx-6 sm:mx-10 text-3xl sm:text-5xl md:text-6xl"
                    style={{
                      fontFamily: 'var(--sv-font-display)',
                      color: i % 2 === 0 ? 'var(--sv-text)' : 'var(--sv-accent)',
                      fontWeight: 300,
                      opacity: i % 2 === 0 ? 0.15 : 0.3,
                    }}
                  >
                    {word}
                    <span
                      className="inline-block mx-6 sm:mx-10 text-sm align-middle"
                      style={{ color: 'var(--sv-gold)', opacity: 0.4 }}
                    >
                      <Diamond className="h-2 w-2 inline-block" />
                    </span>
                  </span>
                )
              )}
            </div>
          </div>

          {/* Three experience pillars */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 sm:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  num: '01',
                  title: 'K\u00FCche',
                  desc: 'Franz\u00F6sische Haute Cuisine, interpretiert mit Berliner Freigeist und den besten saisonalen Produkten der Region.',
                },
                {
                  num: '02',
                  title: 'Wein',
                  desc: 'Unser Sommelier kuratiert eine Weinauswahl, die jeden Gang perfekt begleitet \u2014 von Burgund bis an die Mosel.',
                },
                {
                  num: '03',
                  title: 'Atmosph\u00E4re',
                  desc: 'Warmes Kerzenlicht, edles Holz und leise Musik schaffen einen Raum, in dem die Zeit stillsteht.',
                },
              ].map((pillar, i) => (
                <FadeIn key={pillar.num} delay={0.15 * i}>
                  <div className="text-center md:text-left">
                    <span
                      className="text-5xl md:text-6xl block mb-4"
                      style={{
                        fontFamily: 'var(--sv-font-display)',
                        color: 'var(--sv-accent)',
                        fontWeight: 300,
                        opacity: 0.3,
                      }}
                    >
                      {pillar.num}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl mb-3"
                      style={{
                        fontFamily: 'var(--sv-font-display)',
                        color: 'var(--sv-text)',
                        fontWeight: 400,
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-muted)',
                        fontWeight: 300,
                      }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. RESERVATION CTA ═══ */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        {/* Dramatic background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1A1412 0%, #6B2D3E 50%, #1A1412 100%)',
          }}
        />
        {/* Gold radial glow */}
        <div
          className="absolute sv-glow"
          style={{
            width: '60vw',
            height: '60vw',
            top: '10%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12" style={{ backgroundColor: 'var(--sv-gold)' }} />
              <div className="h-2 w-2 rotate-45" style={{ backgroundColor: 'var(--sv-gold)' }} />
              <div className="h-px w-12" style={{ backgroundColor: 'var(--sv-gold)' }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
              }}
            >
              Ihr Tisch wartet
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              className="text-lg sm:text-xl max-w-2xl mx-auto mb-12"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Reservieren Sie Ihren Abend bei SAVEUR und erleben Sie
              kulinarische Exzellenz in einem Ambiente, das Sie nicht
              vergessen werden.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <Link
              href={`${BASE}/reservierung`}
              className="inline-block border-2 px-10 py-4 text-sm uppercase tracking-[0.3em] transition-all duration-500 hover:bg-[var(--sv-gold)] hover:text-[var(--sv-bg)] hover:border-[var(--sv-gold)]"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-gold)',
                borderColor: 'var(--sv-gold)',
              }}
            >
              Jetzt reservieren
            </Link>
          </FadeIn>

          {/* Opening hours displayed creatively */}
          <FadeIn delay={0.6}>
            <div className="mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {openingHours
                .filter((h) => h.hours !== 'Ruhetag')
                .slice(0, 3)
                .map((item) => (
                  <div key={item.day} className="flex items-center gap-3">
                    <span
                      className="text-xs tracking-[0.1em]"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-muted)',
                        opacity: 0.6,
                      }}
                    >
                      {item.day}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-accent)',
                      }}
                    >
                      {item.hours}
                    </span>
                    <span
                      className="hidden sm:inline text-[8px]"
                      style={{ color: 'var(--sv-gold)', opacity: 0.3 }}
                    >
                      <Diamond className="h-2 w-2 inline-block" />
                    </span>
                  </div>
                ))}
              <Link
                href={`${BASE}/reservierung`}
                className="text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-muted)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                Alle Zeiten
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 6. LOCATION / CONTACT TEASER ═══ */}
      <section className="relative py-24 sm:py-32" style={{ backgroundColor: 'var(--sv-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Map placeholder */}
            <FadeIn>
              <div
                className="relative h-[350px] sm:h-[450px] border overflow-hidden"
                style={{
                  borderColor: 'var(--sv-border)',
                  background: 'linear-gradient(135deg, #231C18 0%, #1A1412 40%, #3D2B1F 70%, #231C18 100%)',
                }}
              >
                {/* Map grid lines */}
                <div className="absolute inset-0" style={{ opacity: 0.05 }}>
                  {[...Array(8)].map((_, i) => (
                    <div key={`h${i}`} className="absolute left-0 right-0 h-px" style={{ top: `${(i + 1) * 12.5}%`, backgroundColor: 'var(--sv-accent)' }} />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <div key={`v${i}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${(i + 1) * 12.5}%`, backgroundColor: 'var(--sv-accent)' }} />
                  ))}
                </div>

                {/* Map pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div
                    className="h-4 w-4 rounded-full mb-1"
                    style={{
                      backgroundColor: 'var(--sv-accent)',
                      boxShadow: '0 0 20px rgba(200,149,108,0.4), 0 0 40px rgba(200,149,108,0.2)',
                    }}
                  />
                  <div
                    className="h-8 w-px"
                    style={{ backgroundColor: 'var(--sv-accent)' }}
                  />
                  <span
                    className="mt-2 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-accent)',
                    }}
                  >
                    SAVEUR Berlin
                  </span>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 h-8 w-8 border-t border-l" style={{ borderColor: 'var(--sv-accent)', opacity: 0.3 }} />
                <div className="absolute top-4 right-4 h-8 w-8 border-t border-r" style={{ borderColor: 'var(--sv-accent)', opacity: 0.3 }} />
                <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l" style={{ borderColor: 'var(--sv-accent)', opacity: 0.3 }} />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r" style={{ borderColor: 'var(--sv-accent)', opacity: 0.3 }} />
              </div>
            </FadeIn>

            {/* Right: Address + contact */}
            <FadeIn delay={0.2}>
              <div>
                <h2
                  className="text-[10px] tracking-[0.5em] uppercase mb-6"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-accent)',
                  }}
                >
                  Besuchen Sie uns
                </h2>
                <h3
                  className="text-3xl sm:text-4xl md:text-5xl mb-8"
                  style={{
                    fontFamily: 'var(--sv-font-display)',
                    color: 'var(--sv-text)',
                    fontWeight: 300,
                  }}
                >
                  Im Herzen Berlins
                </h3>

                <div
                  className="space-y-4 mb-10"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    fontWeight: 300,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sv-accent)" strokeWidth="1.5" className="mt-0.5 shrink-0">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <p style={{ color: 'var(--sv-text)' }}>Friedrichstra&szlig;e 42</p>
                      <p style={{ color: 'var(--sv-muted)' }}>10117 Berlin-Mitte</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sv-accent)" strokeWidth="1.5" className="mt-0.5 shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <p style={{ color: 'var(--sv-text)' }}>+49 30 1234 5678</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sv-accent)" strokeWidth="1.5" className="mt-0.5 shrink-0">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <p style={{ color: 'var(--sv-text)' }}>reservierung@saveur.de</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Link
                    href={`${BASE}/reservierung`}
                    className="group inline-flex items-center gap-3 border px-6 py-3 text-[11px] uppercase tracking-[0.25em] transition-all duration-500 hover:bg-[var(--sv-accent)] hover:text-[var(--sv-bg)] hover:border-[var(--sv-accent)]"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-accent)',
                      borderColor: 'var(--sv-accent)',
                    }}
                  >
                    Reservieren
                  </Link>
                  <Link
                    href={`${BASE}/galerie`}
                    className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-muted)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    Galerie
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
