'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Leaf } from 'lucide-react'

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

/* ── Editorial Page ──────────────────────────────────────────────────── */

export default function EditorialPage() {
  return (
    <main style={{ backgroundColor: 'var(--jd-offwhite)' }}>

      {/* Hero */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: '60vh',
          background: 'linear-gradient(160deg, #E8EDE5 0%, #7A8B6F 25%, #C17C5F 55%, #D4C5B2 80%, #FAF7F2 100%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(61,61,61,0.1) 0%, rgba(61,61,61,0.3) 100%)',
          }}
        />
        <div className="relative z-10 px-6 text-center max-w-3xl">
          <FadeIn>
            <p
              className="mb-4 text-xs uppercase tracking-[0.25em]"
              style={{
                fontFamily: 'var(--jd-font-sans)',
                color: 'var(--jd-offwhite)',
                opacity: 0.85,
              }}
            >
              Journal
            </p>
            <h1
              className="text-5xl leading-tight tracking-wide sm:text-6xl md:text-7xl"
              style={{
                fontFamily: 'var(--jd-font-serif)',
                color: 'var(--jd-offwhite)',
                fontWeight: 400,
              }}
            >
              Ete Parisien
            </h1>
            <p
              className="mx-auto mt-6 max-w-lg text-base tracking-wide"
              style={{
                fontFamily: 'var(--jd-font-sans)',
                color: 'var(--jd-offwhite)',
                opacity: 0.85,
              }}
            >
              Ein Blick hinter die Kulissen unserer Sommerkollektion --
              von der Inspiration bis zum fertigen Stück
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 1: The Inspiration */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-32">
        <FadeIn>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-sage)', opacity: 0.4 }} />
              <Leaf size={16} style={{ color: 'var(--jd-sage)', opacity: 0.6 }} />
              <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-sage)', opacity: 0.4 }} />
            </div>
            <p
              className="mb-4 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--jd-font-sans)', color: 'var(--jd-sage)' }}
            >
              Die Inspiration
            </p>
            <h2
              className="mb-10 text-4xl tracking-wide sm:text-5xl"
              style={{
                fontFamily: 'var(--jd-font-serif)',
                color: 'var(--jd-charcoal)',
                fontWeight: 400,
              }}
            >
              Ein Garten in der Stadt
            </h2>
            <p
              className="mx-auto max-w-2xl text-base leading-relaxed"
              style={{
                fontFamily: 'var(--jd-font-sans)',
                color: 'var(--jd-charcoal)',
                opacity: 0.7,
                lineHeight: 1.9,
              }}
            >
              Die Kollektion Ete Parisien entstand aus der Sehnsucht nach der
              Leichtigkeit eines französischen Sommers. Wir ließen uns von
              versteckten Gärten in Paris inspirieren, von den Farben reifer
              Aprikosen und dem sanften Grün von Olivenbäumen. Jedes Stück
              erzählt von sonnigen Nachmittagen, langen Abendessen im Freien
              und der Kunst des mühelosen Stils.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Section 2: Lookbook split */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 md:pb-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <FadeIn>
            <div
              className="aspect-[3/4] w-full rounded-2xl"
              style={{
                background: 'linear-gradient(155deg, #FAF7F2 0%, #D4C5B2 25%, #C17C5F 55%, #7A8B6F 100%)',
              }}
            />
          </FadeIn>

          <FadeIn delay={150}>
            <div className="max-w-lg py-8">
              <p
                className="mb-3 text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--jd-font-sans)', color: 'var(--jd-sage)' }}
              >
                Kapitel I
              </p>
              <h3
                className="mb-6 text-3xl leading-snug tracking-wide"
                style={{
                  fontFamily: 'var(--jd-font-serif)',
                  color: 'var(--jd-charcoal)',
                  fontWeight: 400,
                }}
              >
                Die Stoffe der Provence
              </h3>
              <p
                className="mb-6 text-base leading-relaxed"
                style={{
                  fontFamily: 'var(--jd-font-sans)',
                  color: 'var(--jd-charcoal)',
                  opacity: 0.7,
                  lineHeight: 1.85,
                }}
              >
                Für diese Kollektion haben wir uns auf die Suche nach den
                schönsten natürlichen Stoffen gemacht. In einer kleinen Weberei
                in der Provence fanden wir gewaschenes Leinen, das sich anfühlt
                wie ein Sommerwind. Dazu kommen Seiden aus Lyon und Bio-Baumwolle
                aus dem Elsass -- jeder Stoff erzählt seine eigene Geschichte.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: 'var(--jd-font-sans)',
                  color: 'var(--jd-charcoal)',
                  opacity: 0.7,
                  lineHeight: 1.85,
                }}
              >
                Die Farbpalette spiegelt die Landschaft wider: warmes Terrakotta,
                sanftes Salbeigrün, das Creme von altem Kalkstein und das tiefe
                Rosa eines Sonnenuntergangs über den Lavendelfeldern.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 3: Reverse split */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--jd-sage-light)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <FadeIn delay={100}>
              <div className="max-w-lg py-8 order-2 md:order-1">
                <p
                  className="mb-3 text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--jd-font-sans)', color: 'var(--jd-sage)' }}
                >
                  Kapitel II
                </p>
                <h3
                  className="mb-6 text-3xl leading-snug tracking-wide"
                  style={{
                    fontFamily: 'var(--jd-font-serif)',
                    color: 'var(--jd-charcoal)',
                    fontWeight: 400,
                  }}
                >
                  Im Atelier
                </h3>
                <p
                  className="mb-6 text-base leading-relaxed"
                  style={{
                    fontFamily: 'var(--jd-font-sans)',
                    color: 'var(--jd-charcoal)',
                    opacity: 0.7,
                    lineHeight: 1.85,
                  }}
                >
                  In unserem Atelier in Berlin-Mitte nehmen die Entwürfe Gestalt an.
                  Hier werden Schnittmuster von Hand gezeichnet, Stoffe drapiert und
                  jedes Detail diskutiert. Unsere Schneiderin Marie-Claire bringt
                  über 25 Jahre Erfahrung mit und achtet auf jede Naht, jeden Saum,
                  jede Knopfleiste.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: 'var(--jd-font-sans)',
                    color: 'var(--jd-charcoal)',
                    opacity: 0.7,
                    lineHeight: 1.85,
                  }}
                >
                  Wir produzieren in kleinen Auflagen, weil wir glauben, dass
                  wahre Qualität Zeit braucht. Jedes Stück wird einzeln
                  kontrolliert, bevor es seinen Weg zu Ihnen findet.
                </p>
              </div>
            </FadeIn>

            <FadeIn className="order-1 md:order-2">
              <div
                className="aspect-[4/5] w-full rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, #C17C5F 0%, #A0724E 30%, #D4C5B2 60%, #E8EDE5 100%)',
                }}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 4: Full-width visual */}
      <section className="py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div
              className="aspect-[21/9] w-full rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, #E8EDE5 0%, #7A8B6F 20%, #C17C5F 50%, #D4C5B2 80%, #FAF7F2 100%)',
              }}
            />
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mx-auto max-w-2xl text-center mt-16">
              <p
                className="mb-3 text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--jd-font-sans)', color: 'var(--jd-sage)' }}
              >
                Kapitel III
              </p>
              <h3
                className="mb-6 text-3xl tracking-wide sm:text-4xl"
                style={{
                  fontFamily: 'var(--jd-font-serif)',
                  color: 'var(--jd-charcoal)',
                  fontWeight: 400,
                }}
              >
                Tragbar, zeitlos, Ihres
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: 'var(--jd-font-sans)',
                  color: 'var(--jd-charcoal)',
                  opacity: 0.7,
                  lineHeight: 1.85,
                }}
              >
                Am Ende geht es darum, Stücke zu schaffen, die Sie gerne tragen.
                Keine kurzlebigen Trends, sondern zeitlose Begleiter für Ihren
                Alltag. Mode, die sich anfühlt wie eine zweite Haut und mit jedem
                Tragen schöner wird. Das ist das Versprechen von JARDIN.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: 'var(--jd-cream)' }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-sage)', opacity: 0.4 }} />
              <Leaf size={16} style={{ color: 'var(--jd-sage)', opacity: 0.6 }} />
              <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-sage)', opacity: 0.4 }} />
            </div>
            <h2
              className="mb-6 text-3xl tracking-wide sm:text-4xl"
              style={{
                fontFamily: 'var(--jd-font-serif)',
                color: 'var(--jd-charcoal)',
                fontWeight: 400,
              }}
            >
              Die Kollektion entdecken
            </h2>
            <p
              className="mb-10 text-base leading-relaxed"
              style={{
                fontFamily: 'var(--jd-font-sans)',
                color: 'var(--jd-charcoal)',
                opacity: 0.7,
              }}
            >
              Lassen Sie sich inspirieren und finden Sie Ihre neuen Lieblingsstücke.
            </p>
            <Link
              href={`${BASE}/products`}
              className="inline-flex items-center gap-2 rounded-lg px-10 py-4 text-xs font-medium uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-90"
              style={{
                fontFamily: 'var(--jd-font-sans)',
                backgroundColor: 'var(--jd-sage)',
                color: 'var(--jd-offwhite)',
              }}
            >
              Jetzt shoppen
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
