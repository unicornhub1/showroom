'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { products } from '../_design/data'
import { ProductCard } from '../_design/components/ProductCard'
import { useWishlist } from '../_design/components/WishlistProvider'

const BASE = '/templates/fashion/streetwear'

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
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
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
      style={{ backgroundColor: 'var(--kr-bg)' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 pt-4">
          <ol
            className="flex items-center gap-2 text-xs tracking-wider"
            style={{
              fontFamily: 'var(--kr-font-mono)',
              color: 'var(--kr-muted)',
            }}
          >
            <li>
              <Link
                href={BASE}
                className="transition-colors duration-200 hover:text-[var(--kr-neon)]"
              >
                [HOME]
              </Link>
            </li>
            <li style={{ opacity: 0.4 }}>/</li>
            <li style={{ color: 'var(--kr-text)' }}>[WUNSCHLISTE]</li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="mb-10">
          <p
            className="mb-2 text-[10px] uppercase tracking-[0.25em]"
            style={{
              fontFamily: 'var(--kr-font-mono)',
              color: 'var(--kr-neon)',
            }}
          >
            [DEINE PICKS]
          </p>
          <h1
            className="text-5xl md:text-7xl uppercase"
            style={{
              fontFamily: 'var(--kr-font-heading)',
              color: 'var(--kr-text)',
              fontWeight: 400,
              lineHeight: 0.95,
            }}
          >
            WUNSCHLISTE
          </h1>
          <p
            className="mt-4 text-xs tracking-wider"
            style={{
              fontFamily: 'var(--kr-font-mono)',
              color: 'var(--kr-muted)',
            }}
          >
            {wishlistProducts.length}{' '}
            {wishlistProducts.length === 1 ? 'ARTIKEL' : 'ARTIKEL'}
          </p>
        </div>

        {/* Neon divider */}
        <div
          className="mb-10 h-[2px] w-16"
          style={{ backgroundColor: 'var(--kr-neon)' }}
        />

        {/* Product Grid */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product, i) => (
              <FadeIn key={product.id} delay={Math.min(i * 60, 300)}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <Heart
              className="mx-auto mb-6 h-12 w-12"
              style={{ color: 'var(--kr-muted)', opacity: 0.3 }}
            />
            <p
              className="text-2xl uppercase mb-4"
              style={{
                fontFamily: 'var(--kr-font-heading)',
                color: 'var(--kr-text)',
              }}
            >
              NOCH NICHTS GESAVED
            </p>
            <p
              className="text-xs mb-8"
              style={{
                fontFamily: 'var(--kr-font-body)',
                color: 'var(--kr-muted)',
              }}
            >
              Finde Pieces die zu dir passen und save sie hier.
            </p>
            <Link
              href={`${BASE}/products`}
              className="inline-block px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200"
              style={{
                fontFamily: 'var(--kr-font-mono)',
                backgroundColor: 'var(--kr-neon)',
                color: 'var(--kr-black)',
              }}
            >
              DROPS CHECKEN
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
