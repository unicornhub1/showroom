'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

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

/* ── About Page ──────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--au-white)' }}
    >
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6">
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
            <li style={{ color: 'var(--au-black)' }}>Über uns</li>
          </ol>
        </nav>
      </div>

      {/* Hero section */}
      <section
        className="flex min-h-[50vh] items-center justify-center px-6"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, var(--au-cream) 0%, var(--au-white) 70%)',
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn delay={200}>
            <p
              className="mb-4 text-[10px] uppercase tracking-[0.35em]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-gold)',
                fontWeight: 400,
              }}
            >
              Unsere Geschichte
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <h1
              className="mb-6 text-4xl leading-tight md:text-5xl lg:text-6xl"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Wo Tradition auf
              <br />
              Moderne trifft
            </h1>
          </FadeIn>

          <FadeIn delay={600}>
            <p
              className="text-base leading-relaxed md:text-lg"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              AURUM verbindet jahrhundertealte Goldschmiedekunst mit zeitgenössischem Design.
              Jedes Stück wird von Hand gefertigt, mit dem Anspruch, für immer zu bestehen.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy sections */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Section 1: Handwerk */}
        <FadeIn>
          <div className="mb-20">
            <div className="mb-8 flex items-center">
              <div
                className="h-px w-10"
                style={{ backgroundColor: 'var(--au-gold)' }}
              />
              <p
                className="ml-4 text-[10px] uppercase tracking-[0.3em]"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  color: 'var(--au-gold)',
                  fontWeight: 400,
                }}
              >
                01 / Handwerk
              </p>
            </div>

            <h2
              className="mb-6 text-2xl md:text-3xl"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Von Hand, mit Herz
            </h2>

            <p
              className="mb-4 text-sm leading-[2]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              In unserem Atelier in der Altstadt arbeiten Goldschmiede mit Werkzeugen,
              die seit drei Generationen weitergereicht werden. Jeder Ring wird einzeln
              geschmiedet, jede Kette Glied für Glied zusammengesetzt. Es gibt keine
              Massenproduktion, keine Abkürzungen — nur das stille Geräusch von
              Hammer auf Gold.
            </p>

            <p
              className="text-sm leading-[2]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              Dieser Prozess dauert länger. Er kostet mehr. Aber er erschafft Dinge,
              die man spürt, wenn man sie in der Hand hält — eine Schwere, eine
              Glätte, die kein industrieller Prozess replizieren kann.
            </p>
          </div>
        </FadeIn>

        {/* Decorative divider */}
        <FadeIn delay={100}>
          <div className="mb-20 flex items-center justify-center">
            <div
              className="h-px w-10"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.3 }}
            />
            <div
              className="mx-3 h-1 w-1 rotate-45"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.3 }}
            />
            <div
              className="h-px w-10"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.3 }}
            />
          </div>
        </FadeIn>

        {/* Section 2: Materialien */}
        <FadeIn>
          <div className="mb-20">
            <div className="mb-8 flex items-center">
              <div
                className="h-px w-10"
                style={{ backgroundColor: 'var(--au-gold)' }}
              />
              <p
                className="ml-4 text-[10px] uppercase tracking-[0.3em]"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  color: 'var(--au-gold)',
                  fontWeight: 400,
                }}
              >
                02 / Materialien
              </p>
            </div>

            <h2
              className="mb-6 text-2xl md:text-3xl"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Reinheit als Prinzip
            </h2>

            <p
              className="mb-4 text-sm leading-[2]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              Wir verwenden ausschließlich recyceltes Gold und Silber — ohne
              Qualitätseinbußen. Unsere Diamanten stammen aus zertifiziert ethischen
              Quellen, unsere Perlen aus nachhaltiger Zucht. Jeder Edelstein wird
              von unserem Gemmologen persönlich geprüft und ausgewählt.
            </p>

            <p
              className="text-sm leading-[2]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              14 und 18 Karat Gold bilden die Basis unserer Kollektionen — ein
              bewusster Kompromiss zwischen Reinheit und Alltagstauglichkeit.
              Jedes Stück trägt die AURUM-Punze als Zeichen seiner Herkunft.
            </p>
          </div>
        </FadeIn>

        {/* Decorative divider */}
        <FadeIn delay={100}>
          <div className="mb-20 flex items-center justify-center">
            <div
              className="h-px w-10"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.3 }}
            />
            <div
              className="mx-3 h-1 w-1 rotate-45"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.3 }}
            />
            <div
              className="h-px w-10"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.3 }}
            />
          </div>
        </FadeIn>

        {/* Section 3: Nachhaltigkeit */}
        <FadeIn>
          <div className="mb-10">
            <div className="mb-8 flex items-center">
              <div
                className="h-px w-10"
                style={{ backgroundColor: 'var(--au-gold)' }}
              />
              <p
                className="ml-4 text-[10px] uppercase tracking-[0.3em]"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  color: 'var(--au-gold)',
                  fontWeight: 400,
                }}
              >
                03 / Verantwortung
              </p>
            </div>

            <h2
              className="mb-6 text-2xl md:text-3xl"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Für morgen gefertigt
            </h2>

            <p
              className="mb-4 text-sm leading-[2]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              Nachhaltigkeit ist für uns kein Trend, sondern eine Grundhaltung.
              Unsere Verpackungen bestehen aus FSC-zertifiziertem Papier und
              recyceltem Baumwollsamt. Unser Atelier wird mit erneuerbarer
              Energie betrieben.
            </p>

            <p
              className="text-sm leading-[2]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                fontWeight: 300,
              }}
            >
              Wir glauben, dass der schönste Schmuck jener ist, der ein
              gutes Gewissen trägt. Deshalb investieren wir 2% unseres Umsatzes
              in Bildungsprojekte in Bergbauregionen.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Values grid */}
      <section
        className="px-6 py-20"
        style={{ backgroundColor: 'var(--au-cream)' }}
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-16 text-center">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.3em]"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  color: 'var(--au-gold)',
                  fontWeight: 400,
                }}
              >
                Unsere Werte
              </p>
              <h2
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: 'var(--au-font-serif)',
                  color: 'var(--au-black)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                }}
              >
                Was uns leitet
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                number: 'I',
                title: 'Zeitlosigkeit',
                text: 'Wir entwerfen nicht für eine Saison, sondern für ein Leben. Jedes Stück soll in 50 Jahren genauso relevant sein wie heute.',
              },
              {
                number: 'II',
                title: 'Reduktion',
                text: 'Weniger, aber besser. Wir glauben an die Kraft des Weglassens und die Schönheit, die entsteht, wenn jedes Detail seinen Platz verdient.',
              },
              {
                number: 'III',
                title: 'Integrität',
                text: 'Von der Quelle bis zur Vitrine — Transparenz in jedem Schritt. Wir wissen, woher jedes Gramm Gold und jeder Stein stammt.',
              },
            ].map((value, i) => (
              <FadeIn key={value.number} delay={200 + i * 150}>
                <div className="text-center">
                  <p
                    className="mb-4 text-2xl"
                    style={{
                      fontFamily: 'var(--au-font-serif)',
                      color: 'var(--au-gold)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                    }}
                  >
                    {value.number}
                  </p>
                  <h3
                    className="mb-3 text-lg"
                    style={{
                      fontFamily: 'var(--au-font-serif)',
                      color: 'var(--au-black)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.9]"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: 'var(--au-charcoal)',
                      fontWeight: 300,
                    }}
                  >
                    {value.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
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
          <p
            className="mb-10 text-base"
            style={{
              fontFamily: 'var(--au-font-sans)',
              color: 'var(--au-charcoal)',
              fontWeight: 300,
            }}
          >
            Entdecken Sie unsere Kollektionen und finden Sie Ihr Stück für die Ewigkeit.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <Link
            href="/templates/fashion/jewelry/products"
            className="inline-block px-10 py-3.5 text-[10px] uppercase tracking-[0.25em] transition-opacity duration-400 hover:opacity-90"
            style={{
              fontFamily: 'var(--au-font-sans)',
              backgroundColor: 'var(--au-black)',
              color: 'var(--au-white)',
              fontWeight: 400,
            }}
          >
            Schmuck entdecken
          </Link>
        </FadeIn>
      </section>
    </main>
  )
}
