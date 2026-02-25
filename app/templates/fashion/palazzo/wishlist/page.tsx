'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { products, type Product } from '../_design/data'
import { ProductCard } from '../_design/components/ProductCard'
import { useWishlist } from '../_design/components/WishlistProvider'

/* -- Fade-in wrapper -------------------------------------------------------- */

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

/* -- Wishlist Page ---------------------------------------------------------- */

export default function WishlistPage() {
  const { wishlistItems } = useWishlist()

  const wishlistProducts = products.filter((p) =>
    wishlistItems.includes(p.id),
  )

  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--pz-black)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-12 pt-4">
          <ol
            className="flex items-center gap-2 text-xs tracking-wider"
            style={{
              fontFamily: 'var(--pz-font-sans)',
              color: 'var(--pz-warm-gray)',
            }}
          >
            <li>
              <Link
                href="/templates/fashion/palazzo"
                className="transition-colors duration-300 hover:text-[var(--pz-gold)]"
              >
                Home
              </Link>
            </li>
            <li className="opacity-40">/</li>
            <li style={{ color: 'var(--pz-ivory)' }}>Wunschliste</li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="mb-12">
          <div
            className="mb-6 h-px w-16"
            style={{ backgroundColor: 'var(--pz-gold)' }}
          />
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: 'var(--pz-font-serif)',
              color: 'var(--pz-ivory)',
              fontWeight: 400,
            }}
          >
            Wunschliste
          </h1>
          <p
            className="text-xs tracking-wider"
            style={{
              fontFamily: 'var(--pz-font-sans)',
              color: 'var(--pz-warm-gray)',
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
            <div
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background:
                  'radial-gradient(circle, var(--pz-charcoal) 0%, var(--pz-black) 100%)',
              }}
            >
              <Heart
                className="h-10 w-10"
                style={{ color: 'var(--pz-gold)', opacity: 0.6 }}
              />
            </div>
            <p
              className="text-2xl mb-4 tracking-wide"
              style={{
                fontFamily: 'var(--pz-font-serif)',
                color: 'var(--pz-ivory)',
                fontWeight: 400,
              }}
            >
              Ihre Wunschliste ist leer
            </p>
            <p
              className="text-sm mb-10 font-light"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-warm-gray)',
              }}
            >
              Entdecken Sie unsere Kollektionen und speichern Sie Ihre Favoriten.
            </p>
            <Link
              href="/templates/fashion/palazzo/products"
              className="inline-block px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                backgroundColor: 'var(--pz-gold)',
                color: 'var(--pz-black)',
                border: '1px solid var(--pz-gold)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--pz-gold)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--pz-gold)'
                e.currentTarget.style.color = 'var(--pz-black)'
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
