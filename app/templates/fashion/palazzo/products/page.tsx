'use client'

import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChevronDown, X } from 'lucide-react'
import { products, collections, type Product } from '../_design/data'
import { SectionHeading } from '../_design/components/SectionHeading'
import { ProductCard } from '../_design/components/ProductCard'
import { QuickViewModal } from '../_design/components/QuickViewModal'

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

/* ── Constants ───────────────────────────────────────────────────────── */

const CATEGORIES = ['Alle', 'Jacken', 'Hemden', 'Kleider', 'Hosen', 'Accessoires', 'Schuhe']
const CATEGORY_MAP: Record<string, string> = {
  'Alle': 'All',
  'Jacken': 'jackets',
  'Hemden': 'shirts',
  'Kleider': 'dresses',
  'Hosen': 'pants',
  'Accessoires': 'accessories',
  'Schuhe': 'shoes',
}
const SORT_OPTIONS = [
  { value: 'featured', label: 'Empfohlen' },
  { value: 'price-asc', label: 'Preis: Aufsteigend' },
  { value: 'price-desc', label: 'Preis: Absteigend' },
  { value: 'newest', label: 'Neuheiten' },
]

/* ── Product Listing Page ────────────────────────────────────────────── */

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const collectionFilter = searchParams.get('collection')
  const categoryFilter = searchParams.get('category')

  const [activeCategory, setActiveCategory] = useState(categoryFilter || 'Alle')
  const [sortBy, setSortBy] = useState('featured')
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [sortOpen, setSortOpen] = useState(false)

  useEffect(() => {
    if (categoryFilter) {
      setActiveCategory(categoryFilter)
    }
  }, [categoryFilter])

  const activeCollection = collectionFilter
    ? collections.find((c) => c.id === collectionFilter)
    : null

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (collectionFilter) {
      result = result.filter((p) => p.collection === collectionFilter)
    }

    if (activeCategory && activeCategory !== 'Alle') {
      const englishCat = CATEGORY_MAP[activeCategory] || activeCategory
      result = result.filter(
        (p) => p.category.toLowerCase() === englishCat.toLowerCase(),
      )
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        break
    }

    return result
  }, [collectionFilter, activeCategory, sortBy])

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'Alle') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`/templates/fashion/palazzo/products?${params.toString()}`, {
      scroll: false,
    })
  }

  function clearCollectionFilter() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('collection')
    router.push(`/templates/fashion/palazzo/products?${params.toString()}`, {
      scroll: false,
    })
  }

  const pageTitle = activeCollection ? activeCollection.name : 'Alle Produkte'

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
            <li style={{ color: 'var(--pz-ivory)' }}>
              {activeCollection ? (
                <>
                  <Link
                    href="/templates/fashion/palazzo/products"
                    className="transition-colors duration-300 hover:text-[var(--pz-gold)]"
                    style={{ color: 'var(--pz-warm-gray)' }}
                  >
                    Produkte
                  </Link>
                  <span className="mx-2 opacity-40">/</span>
                  <span>{activeCollection.name}</span>
                </>
              ) : (
                'Produkte'
              )}
            </li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: 'var(--pz-font-serif)',
              color: 'var(--pz-ivory)',
              fontWeight: 400,
            }}
          >
            {pageTitle}
          </h1>

          {activeCollection && (
            <div className="flex items-center gap-4 mt-4">
              <p
                className="text-sm"
                style={{
                  fontFamily: 'var(--pz-font-sans)',
                  color: 'var(--pz-warm-gray)',
                  fontWeight: 300,
                }}
              >
                {activeCollection.description}
              </p>
              <button
                onClick={clearCollectionFilter}
                className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase px-3 py-1.5 transition-colors duration-300 hover:bg-[var(--pz-charcoal)]"
                style={{
                  fontFamily: 'var(--pz-font-sans)',
                  color: 'var(--pz-warm-gray)',
                  border: '1px solid var(--pz-charcoal)',
                }}
              >
                Filter entfernen
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Filter bar + Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          {/* Category pills */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300"
                  style={{
                    fontFamily: 'var(--pz-font-sans)',
                    backgroundColor: isActive ? 'var(--pz-gold)' : 'transparent',
                    color: isActive ? 'var(--pz-black)' : 'var(--pz-warm-gray)',
                    border: isActive
                      ? '1px solid var(--pz-gold)'
                      : '1px solid var(--pz-charcoal)',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs tracking-wider transition-colors duration-300"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-ivory)',
                border: '1px solid var(--pz-charcoal)',
              }}
            >
              Sortierung: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {sortOpen && (
              <div
                className="absolute right-0 top-full mt-2 py-2 min-w-[200px] z-20 shadow-lg"
                style={{ backgroundColor: 'var(--pz-charcoal)' }}
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setSortOpen(false)
                    }}
                    className="block w-full text-left px-5 py-2.5 text-xs tracking-wider transition-colors duration-200 hover:bg-[var(--pz-black)]"
                    style={{
                      fontFamily: 'var(--pz-font-sans)',
                      color:
                        sortBy === option.value
                          ? 'var(--pz-gold)'
                          : 'var(--pz-ivory)',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product count */}
        <p
          className="text-xs tracking-wider mb-10"
          style={{
            fontFamily: 'var(--pz-font-sans)',
            color: 'var(--pz-warm-gray)',
          }}
        >
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'Produkt' : 'Produkte'}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={Math.min(i * 80, 400)}>
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p
              className="text-lg mb-4"
              style={{
                fontFamily: 'var(--pz-font-serif)',
                color: 'var(--pz-ivory)',
              }}
            >
              Keine Produkte gefunden
            </p>
            <p
              className="text-sm mb-8"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-warm-gray)',
                fontWeight: 300,
              }}
            >
              Passen Sie Ihre Filter an, um das Gewünschte zu finden.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Alle')
                clearCollectionFilter()
              }}
              className="text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[var(--pz-gold)]"
              style={{
                fontFamily: 'var(--pz-font-sans)',
                color: 'var(--pz-ivory)',
              }}
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}
      </div>

      {sortOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setSortOpen(false)}
        />
      )}

      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  )
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  )
}
