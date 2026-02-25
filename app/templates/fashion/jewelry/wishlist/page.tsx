'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { products } from '../_design/data'
import { ProductCard } from '../_design/components/ProductCard'
import { useWishlist } from '../_design/components/WishlistProvider'

const BASE = '/templates/fashion/jewelry'

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
      { threshold: 0.05 },
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
        transform: 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Wishlist Page ───────────────────────────────────────────────────── */

export default function WishlistPage() {
  const { wishlistItems } = useWishlist()

  const wishlistProducts = products.filter((p) =>
    wishlistItems.includes(p.id),
  )

  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--au-white)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
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
                href={BASE}
                className="transition-colors duration-300 hover:text-[var(--au-gold)]"
              >
                Home
              </Link>
            </li>
            <li style={{ opacity: 0.4 }}>/</li>
            <li style={{ color: 'var(--au-black)' }}>Wunschliste</li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="mb-14 text-center">
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.3em]"
            style={{
              fontFamily: 'var(--au-font-sans)',
              color: 'var(--au-gold)',
              fontWeight: 400,
            }}
          >
            Ihre Favoriten
          </p>

          <h1
            className="mb-4 text-3xl md:text-4xl"
            style={{
              fontFamily: 'var(--au-font-serif)',
              color: 'var(--au-black)',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            Wunschliste
          </h1>

          {/* Decorative divider */}
          <div className="mt-6 flex items-center justify-center">
            <div
              className="h-px w-10"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.4 }}
            />
            <div
              className="mx-3 h-1 w-1 rotate-45"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.4 }}
            />
            <div
              className="h-px w-10"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.4 }}
            />
          </div>

          <p
            className="mt-6 text-[11px] tracking-wider"
            style={{
              fontFamily: 'var(--au-font-sans)',
              color: 'var(--au-muted)',
              fontWeight: 300,
            }}
          >
            {wishlistProducts.length}{' '}
            {wishlistProducts.length === 1 ? 'Stück' : 'Stücke'}
          </p>
        </div>

        {/* Product Grid */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {wishlistProducts.map((product, i) => (
              <FadeIn key={product.id} delay={Math.min(i * 80, 400)}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <Heart
              className="mx-auto mb-6 h-10 w-10"
              style={{ color: 'var(--au-line)' }}
              strokeWidth={1}
            />
            <p
              className="text-xl mb-4"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              Ihre Wunschliste ist leer
            </p>
            <p
              className="text-sm mb-8"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-muted)',
                fontWeight: 300,
              }}
            >
              Entdecken Sie unsere Kollektion und bewahren Sie Ihre Lieblingsstücke.
            </p>
            <Link
              href={`${BASE}/products`}
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
          </div>
        )}
      </div>
    </main>
  )
}
