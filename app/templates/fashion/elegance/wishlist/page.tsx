'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { products, type Product } from '../_design/data'
import { ProductCard } from '../_design/components/ProductCard'
import { useWishlist } from '../_design/components/WishlistProvider'

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
      style={{ backgroundColor: 'var(--el-offwhite)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-12 pt-4">
          <ol
            className="flex items-center gap-2 text-xs tracking-wider"
            style={{
              fontFamily: 'var(--el-font-sans)',
              color: 'var(--el-gray)',
            }}
          >
            <li>
              <Link
                href="/templates/fashion/elegance"
                className="transition-colors duration-300 hover:text-[var(--el-navy)]"
              >
                Home
              </Link>
            </li>
            <li className="opacity-40">/</li>
            <li style={{ color: 'var(--el-navy)' }}>Wunschliste</li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: 'var(--el-font-serif)',
              color: 'var(--el-navy)',
              fontWeight: 300,
            }}
          >
            Wunschliste
          </h1>
          <p
            className="text-xs tracking-wider"
            style={{
              fontFamily: 'var(--el-font-sans)',
              color: 'var(--el-gray)',
            }}
          >
            {wishlistProducts.length}{' '}
            {wishlistProducts.length === 1 ? 'Artikel' : 'Artikel'}
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
              className="mx-auto mb-6 h-12 w-12"
              style={{ color: 'var(--el-light)' }}
            />
            <p
              className="text-lg mb-4"
              style={{
                fontFamily: 'var(--el-font-serif)',
                color: 'var(--el-navy)',
              }}
            >
              Ihre Wunschliste ist leer
            </p>
            <p
              className="text-sm mb-8"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-gray)',
                fontWeight: 300,
              }}
            >
              Entdecken Sie unsere Kollektion und speichern Sie Ihre Favoriten.
            </p>
            <Link
              href="/templates/fashion/elegance/products"
              className="text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[var(--el-gold)]"
              style={{
                fontFamily: 'var(--el-font-sans)',
                color: 'var(--el-navy)',
              }}
            >
              Produkte entdecken
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
