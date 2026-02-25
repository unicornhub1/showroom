'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Leaf, Heart, Recycle, Sparkles } from 'lucide-react'
import { products, collections, formatPrice, type Product } from './_design/data'
import { SectionHeading } from './_design/components/SectionHeading'
import { ProductCard } from './_design/components/ProductCard'
import { QuickViewModal } from './_design/components/QuickViewModal'

const BASE = '/templates/fashion/jardin'

/* ── Scroll-triggered fade-in ────────────────────────────────────────── */

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

export default function JardinHomePage() {
  const featuredProducts = products.filter((p) => p.isNew).slice(0, 4)
  const displayCollections = collections.slice(0, 4)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <main>
      {/* ═══ 1. Hero ═══ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: '85vh',
          background: 'linear-gradient(160deg, #FAF7F2 0%, #E8EDE5 30%, #D4C5B2 60%, #C4A08A 100%)',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: Text content */}
            <div className="max-w-xl">
              <FadeIn>
                <p
                  className="mb-4 text-xs uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: 'var(--jd-font-sans)',
                    color: 'var(--jd-sage)',
                  }}
                >
                  Nouvelle Collection
                </p>
              </FadeIn>

              <FadeIn delay={100}>
                <h1
                  className="text-5xl leading-[1.1] sm:text-6xl md:text-7xl"
                  style={{
                    fontFamily: 'var(--jd-font-serif)',
                    color: 'var(--jd-charcoal)',
                    fontWeight: 500,
                  }}
                >
                  La Vie
                  <br />
                  est Belle
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p
                  className="mt-6 max-w-md text-base leading-relaxed"
                  style={{
                    fontFamily: 'var(--jd-font-sans)',
                    color: 'var(--jd-charcoal)',
                    opacity: 0.7,
                  }}
                >
                  Entdecken Sie unsere neue Sommerkollektion -- zeitgenössische
                  französische Mode, gefertigt aus natürlichen Materialien mit
                  Respekt für Handwerk und Umwelt.
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`${BASE}/products`}
                    className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-90"
                    style={{
                      fontFamily: 'var(--jd-font-sans)',
                      backgroundColor: 'var(--jd-sage)',
                      color: 'var(--jd-offwhite)',
                    }}
                  >
                    Jetzt entdecken
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href={`${BASE}/collections`}
                    className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--jd-font-sans)',
                      border: '1px solid var(--jd-charcoal)',
                      color: 'var(--jd-charcoal)',
                    }}
                  >
                    Kollektionen
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right: Decorative gradient visual */}
            <FadeIn delay={200}>
              <div className="hidden lg:block">
                <div
                  className="aspect-[3/4] w-full max-w-lg rounded-2xl ml-auto"
                  style={{
                    background: 'linear-gradient(145deg, #7A8B6F 0%, #A8B89A 30%, #C17C5F 60%, #D4C5B2 100%)',
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 2. Featured Products ═══ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--jd-offwhite)' }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading
              title="Neuheiten"
              subtitle="Frisch eingetroffen -- unsere neuesten Lieblingsstücke"
              label="JARDIN"
            />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={i * 100}>
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-14 text-center">
              <Link
                href={`${BASE}/products`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-colors duration-300"
                style={{
                  fontFamily: 'var(--jd-font-sans)',
                  color: 'var(--jd-sage)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                Alle Produkte anzeigen
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 3. Editorial Story Section ═══ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--jd-cream)' }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            {/* Left: gradient visual */}
            <FadeIn>
              <div
                className="aspect-[4/5] w-full rounded-2xl"
                style={{
                  background: 'linear-gradient(155deg, #E8EDE5 0%, #7A8B6F 30%, #C17C5F 65%, #D4C5B2 100%)',
                }}
              />
            </FadeIn>

            {/* Right: text */}
            <FadeIn delay={150}>
              <div className="max-w-lg py-8">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="h-px w-8"
                    style={{ backgroundColor: 'var(--jd-sage)', opacity: 0.4 }}
                  />
                  <Leaf size={16} style={{ color: 'var(--jd-sage)', opacity: 0.6 }} />
                </div>
                <p
                  className="mb-3 text-xs tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: 'var(--jd-font-sans)',
                    color: 'var(--jd-sage)',
                  }}
                >
                  Notre Histoire
                </p>
                <h2
                  className="mb-6 text-3xl leading-snug tracking-wide sm:text-4xl"
                  style={{
                    fontFamily: 'var(--jd-font-serif)',
                    color: 'var(--jd-charcoal)',
                    fontWeight: 400,
                  }}
                >
                  Von der Natur inspiriert,
                  <br />
                  mit Liebe gefertigt
                </h2>
                <p
                  className="mb-6 text-base leading-relaxed"
                  style={{
                    fontFamily: 'var(--jd-font-sans)',
                    color: 'var(--jd-charcoal)',
                    opacity: 0.7,
                    lineHeight: 1.85,
                  }}
                >
                  Jedes Stück bei JARDIN wird mit der Sorgfalt entworfen, die es
                  verdient. Wir arbeiten mit kleinen Manufakturen in Frankreich
                  zusammen, die traditionelle Handwerkskunst mit modernem Design
                  verbinden. Natürliche Materialien, zeitlose Schnitte und eine
                  Farbpalette, die von der Provence bis Paris reicht.
                </p>
                <Link
                  href={`${BASE}/editorial`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--jd-font-sans)',
                    color: 'var(--jd-sage)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Mehr erfahren
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 4. Collection Showcase ═══ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--jd-offwhite)' }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading
              title="Unsere Kollektionen"
              subtitle="Mit Intention kuratiert, mit Sorgfalt gefertigt"
            />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayCollections.map((collection, i) => (
              <FadeIn key={collection.id} delay={i * 120}>
                <Link
                  href={`${BASE}/products?collection=${collection.id}`}
                  className="group relative block overflow-hidden rounded-2xl"
                  style={{ height: '420px' }}
                >
                  {/* Gradient bg */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 rounded-2xl"
                    style={{ background: collection.gradient }}
                  />

                  {/* Dark overlay for text */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 rounded-2xl" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
                    <div className="transition-transform duration-500 group-hover:-translate-y-2">
                      <p
                        className="text-[10px] tracking-[0.25em] uppercase mb-2"
                        style={{
                          fontFamily: 'var(--jd-font-sans)',
                          color: 'var(--jd-offwhite)',
                          opacity: 0.8,
                        }}
                      >
                        {collection.subtitle}
                      </p>
                      <h3
                        className="text-3xl md:text-4xl mb-3"
                        style={{
                          fontFamily: 'var(--jd-font-serif)',
                          color: 'var(--jd-offwhite)',
                          fontWeight: 400,
                        }}
                      >
                        {collection.name}
                      </h3>
                      <span
                        className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          fontFamily: 'var(--jd-font-sans)',
                          color: 'var(--jd-offwhite)',
                          textDecoration: 'underline',
                          textUnderlineOffset: '4px',
                        }}
                      >
                        Entdecken
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. Nos Valeurs ═══ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--jd-sage-light)' }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <SectionHeading
              title="Nos Valeurs"
              subtitle="Woran wir glauben und wofür wir stehen"
            />
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: 'Natürliche Materialien',
                description:
                  'Leinen, Baumwolle, Seide, Kaschmir -- wir verwenden ausschließlich natürliche und nachhaltig gewonnene Materialien. Jeder Stoff wird sorgfältig ausgewählt für Qualität und Langlebigkeit.',
              },
              {
                icon: Heart,
                title: 'Handwerkskunst',
                description:
                  'Wir arbeiten mit kleinen Manufakturen und Kunsthandwerkern zusammen, die ihr Handwerk über Generationen perfektioniert haben. Jedes Stück trägt die Handschrift seiner Schöpfer.',
              },
              {
                icon: Recycle,
                title: 'Verantwortung',
                description:
                  'Begrenzte Auflagen, faire Produktion und plastikfreie Verpackung. Wir glauben daran, dass Mode langsam und bewusst sein sollte -- weniger, aber besser.',
              },
            ].map((value, i) => (
              <FadeIn key={value.title} delay={i * 100}>
                <div
                  className="rounded-2xl px-8 py-10"
                  style={{
                    backgroundColor: 'var(--jd-offwhite)',
                  }}
                >
                  <value.icon
                    size={28}
                    strokeWidth={1.2}
                    style={{ color: 'var(--jd-sage)' }}
                    className="mb-6"
                  />
                  <h3
                    className="mb-4 text-xl tracking-wide"
                    style={{
                      fontFamily: 'var(--jd-font-serif)',
                      color: 'var(--jd-charcoal)',
                      fontWeight: 400,
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: 'var(--jd-font-sans)',
                      color: 'var(--jd-charcoal)',
                      opacity: 0.7,
                      lineHeight: 1.8,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. Newsletter ═══ */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: 'var(--jd-cream)' }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <SectionHeading
              title="Bleiben Sie inspiriert"
              subtitle="Melden Sie sich an für exklusive Einblicke und frühen Zugang zu neuen Kollektionen"
            />
          </FadeIn>

          <FadeIn delay={150}>
            <NewsletterForm />
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

/* ── Newsletter Form (separated for client state) ────────────────────── */

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  if (submitted) {
    return (
      <p
        className="text-base"
        style={{
          fontFamily: 'var(--jd-font-sans)',
          color: 'var(--jd-sage)',
        }}
      >
        Merci! Sie erhalten bald Post von uns.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-2 max-w-md">
      <div className="flex">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ihre E-Mail-Adresse"
          className="flex-1 rounded-l-lg border px-4 py-3 text-sm outline-none transition-colors duration-300"
          style={{
            fontFamily: 'var(--jd-font-sans)',
            backgroundColor: 'var(--jd-offwhite)',
            borderColor: 'var(--jd-light)',
            color: 'var(--jd-charcoal)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--jd-sage)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--jd-light)'
          }}
        />
        <button
          type="submit"
          className="shrink-0 rounded-r-lg px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-85"
          style={{
            fontFamily: 'var(--jd-font-sans)',
            backgroundColor: 'var(--jd-sage)',
            color: 'var(--jd-offwhite)',
          }}
        >
          Anmelden
        </button>
      </div>
    </form>
  )
}
