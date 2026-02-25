"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Leaf, Heart, Recycle, MapPin, Award, Handshake } from "lucide-react";

const BASE = "/templates/fashion/jardin";

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

/* ── About Page ──────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "var(--jd-offwhite)" }}>
      {/* Hero */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: "50vh",
          background:
            "linear-gradient(160deg, #E8EDE5 0%, #7A8B6F 30%, #4A5D42 60%, #3D3D3D 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(61,61,61,0.1) 0%, rgba(61,61,61,0.35) 100%)",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-offwhite)', opacity: 0.5 }} />
            <Leaf size={16} style={{ color: 'var(--jd-offwhite)', opacity: 0.7 }} />
            <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-offwhite)', opacity: 0.5 }} />
          </div>
          <h1
            className="text-5xl tracking-wide sm:text-6xl md:text-7xl"
            style={{
              fontFamily: "var(--jd-font-serif)",
              color: "var(--jd-offwhite)",
              fontWeight: 400,
            }}
          >
            Über JARDIN
          </h1>
          <p
            className="mx-auto mt-6 max-w-lg text-base tracking-wide"
            style={{
              fontFamily: "var(--jd-font-sans)",
              color: "var(--jd-offwhite)",
              opacity: 0.85,
            }}
          >
            Unsere Geschichte, unsere Werte, unsere Vision
          </p>
        </div>
      </section>

      {/* Origin */}
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
              style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-sage)" }}
            >
              Unser Anfang
            </p>
            <h2
              className="mb-10 text-4xl tracking-wide sm:text-5xl"
              style={{
                fontFamily: "var(--jd-font-serif)",
                color: "var(--jd-charcoal)",
                fontWeight: 400,
              }}
            >
              Gegründet 2022
            </h2>
            <p
              className="mx-auto max-w-2xl text-base leading-relaxed"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
                opacity: 0.7,
                lineHeight: 1.9,
              }}
            >
              JARDIN wurde mit einer einfachen Idee geboren: Mode zu schaffen,
              die sich gut anfühlt -- für diejenigen, die sie tragen, und für
              die Welt, in der wir leben. Inspiriert von der französischen
              Lebensart, in der Qualität über Quantität steht und jedes Detail
              zählt, entstand in einem kleinen Berliner Atelier eine Marke, die
              Natürlichkeit und zeitgenössisches Design vereint.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Values */}
      <section
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: "var(--jd-sage-light)" }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="mb-16 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-sage)', opacity: 0.4 }} />
                <Leaf size={16} style={{ color: 'var(--jd-sage)', opacity: 0.6 }} />
                <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-sage)', opacity: 0.4 }} />
              </div>
              <h2
                className="text-3xl tracking-wide sm:text-4xl"
                style={{
                  fontFamily: "var(--jd-font-serif)",
                  color: "var(--jd-charcoal)",
                  fontWeight: 400,
                }}
              >
                Unsere Werte
              </h2>
              <p
                className="mt-3 text-sm"
                style={{
                  fontFamily: "var(--jd-font-sans)",
                  color: "var(--jd-charcoal)",
                  opacity: 0.6,
                }}
              >
                Was uns antreibt und was wir versprechen
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: "Nachhaltigkeit",
                description:
                  "Natürliche Materialien, plastikfreie Verpackung und begrenzte Auflagen. Wir minimieren unseren ökologischen Fußabdruck bei jedem Schritt der Produktion.",
              },
              {
                icon: Handshake,
                title: "Faire Partnerschaften",
                description:
                  "Wir arbeiten ausschließlich mit Manufakturen zusammen, die faire Löhne zahlen und sichere Arbeitsbedingungen garantieren. Jede Partnerschaft basiert auf Respekt und Vertrauen.",
              },
              {
                icon: Award,
                title: "Handwerkskunst",
                description:
                  "Jedes Stück wird von erfahrenen Kunsthandwerkern gefertigt, die ihr Handwerk über Generationen perfektioniert haben. Qualität, die man sieht und fühlt.",
              },
            ].map((value, i) => (
              <FadeIn key={value.title} delay={i * 120}>
                <div
                  className="rounded-2xl px-8 py-10"
                  style={{ backgroundColor: "var(--jd-offwhite)" }}
                >
                  <value.icon
                    size={28}
                    strokeWidth={1.2}
                    style={{ color: "var(--jd-sage)" }}
                    className="mb-6"
                  />
                  <h3
                    className="mb-4 text-xl tracking-wide"
                    style={{
                      fontFamily: "var(--jd-font-serif)",
                      color: "var(--jd-charcoal)",
                      fontWeight: 400,
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--jd-font-sans)",
                      color: "var(--jd-charcoal)",
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

      {/* Craftsmanship split */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <FadeIn>
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "4/5",
                background:
                  "linear-gradient(155deg, #E8EDE5 0%, #7A8B6F 25%, #C17C5F 55%, #A0724E 100%)",
              }}
            />
          </FadeIn>

          <FadeIn delay={150}>
            <div className="max-w-lg py-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8" style={{ backgroundColor: 'var(--jd-sage)', opacity: 0.4 }} />
                <Leaf size={16} style={{ color: 'var(--jd-sage)', opacity: 0.6 }} />
              </div>
              <p
                className="mb-3 text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-sage)" }}
              >
                Unsere Partner
              </p>
              <h3
                className="mb-6 text-3xl leading-snug tracking-wide sm:text-4xl"
                style={{
                  fontFamily: "var(--jd-font-serif)",
                  color: "var(--jd-charcoal)",
                  fontWeight: 400,
                }}
              >
                Manufakturen mit Seele
              </h3>
              <p
                className="mb-6 text-base leading-relaxed"
                style={{
                  fontFamily: "var(--jd-font-sans)",
                  color: "var(--jd-charcoal)",
                  opacity: 0.7,
                  lineHeight: 1.85,
                }}
              >
                Unsere Materialien stammen aus kleinen Manufakturen in
                Frankreich, Portugal und Italien. Wir besuchen jede Werkstatt
                persönlich und bauen langfristige Beziehungen auf. Von der
                Leinenweberei in der Provence bis zur Ledergerberei in der
                Toskana -- jeder Partner teilt unsere Leidenschaft für
                Qualität und Nachhaltigkeit.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--jd-font-sans)",
                  color: "var(--jd-charcoal)",
                  opacity: 0.7,
                  lineHeight: 1.85,
                }}
              >
                Transparenz ist uns wichtig: Auf jedem Produktetikett finden
                Sie den Namen der Manufaktur, die es gefertigt hat.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--jd-cream)" }}
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
                fontFamily: "var(--jd-font-serif)",
                color: "var(--jd-charcoal)",
                fontWeight: 400,
              }}
            >
              Entdecken Sie JARDIN
            </h2>
            <p
              className="mb-10 text-base leading-relaxed"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
                opacity: 0.7,
              }}
            >
              Sehen Sie selbst, was entsteht, wenn Leidenschaft auf
              Handwerkskunst trifft.
            </p>
            <Link
              href={`${BASE}/collections`}
              className="inline-flex items-center gap-2 rounded-lg px-10 py-4 text-xs font-medium uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-90"
              style={{
                fontFamily: "var(--jd-font-sans)",
                backgroundColor: "var(--jd-sage)",
                color: "var(--jd-offwhite)",
              }}
            >
              Unsere Kollektionen
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
