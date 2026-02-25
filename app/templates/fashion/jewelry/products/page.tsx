'use client'

import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChevronDown, X } from 'lucide-react'
import { products, collections } from '../_design/data'
import { SectionHeading } from '../_design/components/SectionHeading'
import { ProductCard } from '../_design/components/ProductCard'

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
        transform: 'translateY(16px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Constants ───────────────────────────────────────────────────────── */

const CATEGORIES = ['Alle', 'Ringe', 'Ketten', 'Ohrringe', 'Armbänder']
const CATEGORY_MAP: Record<string, string> = {
  'Alle': 'Alle',
  'Ringe': 'rings',
  'Ketten': 'necklaces',
  'Ohrringe': 'earrings',
  'Armbänder': 'bracelets',
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
  const [sortOpen, setSortOpen] = useState(false)

  // Sync category from URL params
  useEffect(() => {
    if (categoryFilter) {
      setActiveCategory(categoryFilter)
    }
  }, [categoryFilter])

  // Find collection metadata for display
  const activeCollection = collectionFilter
    ? collections.find((c) => c.id === collectionFilter)
    : null

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Collection filter
    if (collectionFilter) {
      result = result.filter((p) => p.collection === collectionFilter)
    }

    // Category filter
    if (activeCategory && activeCategory !== 'Alle') {
      const englishCat = CATEGORY_MAP[activeCategory] || activeCategory
      result = result.filter(
        (p) => p.category.toLowerCase() === englishCat.toLowerCase(),
      )
    }

    // Sort
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
    router.push(`/templates/fashion/jewelry/products?${params.toString()}`, {
      scroll: false,
    })
  }

  function clearCollectionFilter() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('collection')
    router.push(`/templates/fashion/jewelry/products?${params.toString()}`, {
      scroll: false,
    })
  }

  const pageTitle = activeCollection ? activeCollection.name : 'Alle Stücke'

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
                href="/templates/fashion/jewelry"
                className="transition-colors duration-300 hover:text-[var(--au-gold)]"
              >
                Home
              </Link>
            </li>
            <li style={{ opacity: 0.4 }}>/</li>
            <li style={{ color: 'var(--au-black)' }}>
              {activeCollection ? (
                <>
                  <Link
                    href="/templates/fashion/jewelry/products"
                    className="transition-colors duration-300 hover:text-[var(--au-gold)]"
                    style={{ color: 'var(--au-muted)' }}
                  >
                    Schmuck
                  </Link>
                  <span className="mx-2" style={{ opacity: 0.4 }}>/</span>
                  <span>{activeCollection.name}</span>
                </>
              ) : (
                'Schmuck'
              )}
            </li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="mb-12">
          <h1
            className="mb-4 text-4xl md:text-5xl"
            style={{
              fontFamily: 'var(--au-font-serif)',
              color: 'var(--au-black)',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            {pageTitle}
          </h1>

          {activeCollection && (
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p
                className="text-sm"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  color: 'var(--au-charcoal)',
                  fontWeight: 300,
                }}
              >
                {activeCollection.description}
              </p>
              <button
                onClick={clearCollectionFilter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-wider transition-colors duration-300 hover:bg-[var(--au-cream)]"
                style={{
                  fontFamily: 'var(--au-font-sans)',
                  color: 'var(--au-muted)',
                  border: '0.5px solid var(--au-line)',
                }}
              >
                Filter entfernen
                <X size={10} strokeWidth={1} />
              </button>
            </div>
          )}
        </div>

        {/* Filter bar + Sort */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="px-5 py-2 text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    backgroundColor: isActive ? 'var(--au-black)' : 'transparent',
                    color: isActive ? 'var(--au-white)' : 'var(--au-charcoal)',
                    border: isActive
                      ? '0.5px solid var(--au-black)'
                      : '0.5px solid var(--au-line)',
                    fontWeight: isActive ? 400 : 300,
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
              className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-wider transition-colors duration-300"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-charcoal)',
                border: '0.5px solid var(--au-line)',
                fontWeight: 300,
              }}
            >
              Sortierung: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`}
                strokeWidth={1}
              />
            </button>

            {sortOpen && (
              <div
                className="absolute right-0 top-full z-20 mt-1 min-w-[180px] py-1"
                style={{
                  backgroundColor: 'var(--au-white)',
                  border: '0.5px solid var(--au-line)',
                }}
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setSortOpen(false)
                    }}
                    className="block w-full px-4 py-2 text-left text-[10px] tracking-wider transition-colors duration-200 hover:bg-[var(--au-cream)]"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color:
                        sortBy === option.value
                          ? 'var(--au-gold)'
                          : 'var(--au-charcoal)',
                      fontWeight: sortBy === option.value ? 400 : 300,
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
          className="mb-10 text-[11px] tracking-wider"
          style={{
            fontFamily: 'var(--au-font-sans)',
            color: 'var(--au-muted)',
            fontWeight: 300,
          }}
        >
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'Stück' : 'Stücke'}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={Math.min(i * 80, 400)}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p
              className="mb-4 text-lg"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontStyle: 'italic',
              }}
            >
              Keine Stücke gefunden
            </p>
            <p
              className="mb-8 text-sm"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-muted)',
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
              className="text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--au-gold)]"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-black)',
                fontWeight: 400,
              }}
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}
      </div>

      {/* Click-outside listener for sort dropdown */}
      {sortOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setSortOpen(false)}
        />
      )}
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
