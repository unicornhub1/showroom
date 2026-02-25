'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Check, Ruler } from 'lucide-react'
import { products, formatPrice } from '../../_design/data'
import { ProductCard } from '../../_design/components/ProductCard'
import { useCart } from '../../_design/components/CartProvider'
import { SizeGuideDrawer } from '../../_design/components/SizeGuideDrawer'

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
        transform: 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Accordion / Collapsible ─────────────────────────────────────────── */

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--el-light)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left"
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{
            fontFamily: 'var(--el-font-sans)',
            color: 'var(--el-navy)',
          }}
        >
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--el-gray)' }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight || 200}px` : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pb-6">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ── Product Detail Page ─────────────────────────────────────────────── */

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = React.use(params)
  const { addItem } = useCart()

  const product = products.find((p) => p.id === slug)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  // Set default color on mount
  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name)
    }
  }, [product])

  // Related products: same collection or same category
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.collection === product.collection || p.category === product.category),
      )
      .slice(0, 4)
  }, [product])

  function handleAddToCart() {
    if (!product || !selectedSize) return
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor || product.colors[0]?.name || '',
      gradient: product.gradient,
      image: product.image,
      quantity: 1,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  /* Not Found */
  if (!product) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: 'var(--el-offwhite)' }}
      >
        <h1
          className="text-4xl mb-6"
          style={{
            fontFamily: 'var(--el-font-serif)',
            color: 'var(--el-navy)',
            fontWeight: 400,
          }}
        >
          Produkt nicht gefunden
        </h1>
        <p
          className="text-base mb-10"
          style={{
            fontFamily: 'var(--el-font-sans)',
            color: 'var(--el-gray)',
            fontWeight: 300,
          }}
        >
          Das gesuchte Produkt existiert nicht oder wurde entfernt.
        </p>
        <Link
          href="/templates/fashion/elegance/products"
          className="text-xs tracking-[0.25em] uppercase underline underline-offset-4 transition-colors duration-300 hover:text-[var(--el-gold)]"
          style={{
            fontFamily: 'var(--el-font-sans)',
            color: 'var(--el-navy)',
          }}
        >
          Zurück zu den Produkten
        </Link>
      </main>
    )
  }

  return (
    <>
      <main
        className="min-h-screen pb-24"
        style={{ backgroundColor: 'var(--el-offwhite)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 pt-4">
            <ol
              className="flex items-center gap-2 text-[11px] tracking-wider"
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
                  Startseite
                </Link>
              </li>
              <li className="opacity-40">/</li>
              <li>
                <Link
                  href="/templates/fashion/elegance/products"
                  className="transition-colors duration-300 hover:text-[var(--el-navy)]"
                >
                  Produkte
                </Link>
              </li>
              <li className="opacity-40">/</li>
              <li style={{ color: 'var(--el-navy)' }}>{product.name}</li>
            </ol>
          </nav>

          {/* ── Product Layout: 7 / 5 split like RL ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

            {/* ── Left: Image Gallery (7 cols) ── */}
            <div className="lg:col-span-7">
              <FadeIn>
                {/* Main image — tall 3:4 like RL */}
                <div
                  className="aspect-[3/4] w-full relative"
                  style={{ background: product.gradient }}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                      priority
                    />
                  )}
                </div>

                {/* Secondary images row */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div
                    className="aspect-[3/4] relative"
                    style={{ background: product.gradient }}
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={`${product.name} - Detail 1`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 29vw"
                        className="object-cover"
                        style={{ filter: 'brightness(1.05) saturate(0.9)' }}
                      />
                    )}
                  </div>
                  <div
                    className="aspect-[3/4] relative"
                    style={{ background: product.gradient }}
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={`${product.name} - Detail 2`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 29vw"
                        className="object-cover"
                        style={{ filter: 'brightness(0.92) hue-rotate(8deg)' }}
                      />
                    )}
                  </div>
                </div>

                {/* Detail shot — full width */}
                <div
                  className="aspect-[16/9] w-full mt-3 relative"
                  style={{ background: product.gradient }}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={`${product.name} - Detail`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-top"
                      style={{ filter: 'brightness(1.08) saturate(0.8) contrast(1.05)' }}
                    />
                  )}
                </div>
              </FadeIn>
            </div>

            {/* ── Right: Product Info (5 cols, sticky) ── */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[108px]">
                <FadeIn delay={150}>
                  {/* MAISON ÉLÉGANCE sub-brand */}
                  <p
                    className="text-[10px] tracking-[0.35em] uppercase mb-3"
                    style={{
                      fontFamily: 'var(--el-font-sans)',
                      color: 'var(--el-gold)',
                    }}
                  >
                    MAISON ÉLÉGANCE
                  </p>

                  {/* Product name */}
                  <h1
                    className="text-2xl md:text-3xl leading-snug mb-4"
                    style={{
                      fontFamily: 'var(--el-font-serif)',
                      color: 'var(--el-navy)',
                      fontWeight: 400,
                    }}
                  >
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    {product.isSale && product.originalPrice ? (
                      <>
                        <span
                          className="text-lg"
                          style={{
                            fontFamily: 'var(--el-font-sans)',
                            color: 'var(--el-rose)',
                          }}
                        >
                          {formatPrice(product.price)}
                        </span>
                        <span
                          className="text-sm line-through"
                          style={{
                            fontFamily: 'var(--el-font-sans)',
                            color: 'var(--el-gray)',
                          }}
                        >
                          {formatPrice(product.originalPrice)}
                        </span>
                      </>
                    ) : (
                      <span
                        className="text-lg"
                        style={{
                          fontFamily: 'var(--el-font-sans)',
                          color: 'var(--el-navy)',
                        }}
                      >
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Thin divider */}
                  <div
                    className="h-px w-full mb-6"
                    style={{ backgroundColor: 'var(--el-light)' }}
                  />

                  {/* Color selector */}
                  {product.colors.length > 0 && (
                    <div className="mb-6">
                      <p
                        className="text-[11px] tracking-[0.15em] uppercase mb-3"
                        style={{
                          fontFamily: 'var(--el-font-sans)',
                          color: 'var(--el-navy)',
                        }}
                      >
                        Farbe:{' '}
                        <span
                          className="normal-case tracking-normal"
                          style={{ color: 'var(--el-gray)', fontWeight: 300 }}
                        >
                          {selectedColor}
                        </span>
                      </p>
                      <div className="flex gap-2.5">
                        {product.colors.map((color) => {
                          const isSelected = selectedColor === color.name
                          return (
                            <button
                              key={color.name}
                              onClick={() => setSelectedColor(color.name)}
                              className="w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center"
                              style={{
                                backgroundColor: color.hex,
                                boxShadow: isSelected
                                  ? `0 0 0 2px var(--el-offwhite), 0 0 0 3px var(--el-navy)`
                                  : 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                              }}
                              title={color.name}
                            >
                              {isSelected && (
                                <Check
                                  size={13}
                                  strokeWidth={2.5}
                                  style={{
                                    color:
                                      isLightColor(color.hex) ? 'var(--el-navy)' : 'var(--el-cream)',
                                  }}
                                />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Size selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p
                        className="text-[11px] tracking-[0.15em] uppercase"
                        style={{
                          fontFamily: 'var(--el-font-sans)',
                          color: 'var(--el-navy)',
                        }}
                      >
                        Größe
                      </p>
                      <button
                        onClick={() => setSizeGuideOpen(true)}
                        className="flex items-center gap-1.5 text-[11px] tracking-wider transition-colors duration-300 hover:text-[var(--el-gold)]"
                        style={{
                          fontFamily: 'var(--el-font-sans)',
                          color: 'var(--el-gray)',
                        }}
                      >
                        <Ruler size={12} />
                        Größentabelle
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {product.sizes.map((size) => {
                        const isSelected = selectedSize === size
                        return (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className="py-3 text-[11px] tracking-wider uppercase transition-all duration-300 text-center"
                            style={{
                              fontFamily: 'var(--el-font-sans)',
                              backgroundColor: isSelected
                                ? 'var(--el-navy)'
                                : 'transparent',
                              color: isSelected
                                ? 'var(--el-cream)'
                                : 'var(--el-navy)',
                              border: '1px solid var(--el-navy)',
                            }}
                          >
                            {size}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className="w-full py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed mb-2"
                    style={{
                      fontFamily: 'var(--el-font-sans)',
                      backgroundColor: addedToCart
                        ? 'var(--el-gold)'
                        : 'var(--el-navy)',
                      color: 'var(--el-cream)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedSize && !addedToCart) {
                        e.currentTarget.style.backgroundColor = 'var(--el-gold)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!addedToCart) {
                        e.currentTarget.style.backgroundColor = 'var(--el-navy)'
                      }
                    }}
                  >
                    {addedToCart
                      ? 'In die Tasche gelegt'
                      : selectedSize
                        ? 'In die Tasche'
                        : 'Größe wählen'}
                  </button>

                  {!selectedSize && (
                    <p
                      className="text-[10px] text-center mb-4"
                      style={{
                        fontFamily: 'var(--el-font-sans)',
                        color: 'var(--el-gray)',
                      }}
                    >
                      Bitte wählen Sie eine Größe aus
                    </p>
                  )}

                  {/* Description */}
                  <div
                    className="h-px w-full my-6"
                    style={{ backgroundColor: 'var(--el-light)' }}
                  />

                  <p
                    className="text-[13px] leading-[1.9] mb-8"
                    style={{
                      fontFamily: 'var(--el-font-sans)',
                      color: 'var(--el-gray)',
                      fontWeight: 300,
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Collapsible details */}
                  <div>
                    <Accordion title="Versand" defaultOpen>
                      <p
                        className="text-[13px] leading-[1.9]"
                        style={{
                          fontFamily: 'var(--el-font-sans)',
                          color: 'var(--el-gray)',
                          fontWeight: 300,
                        }}
                      >
                        Kostenloser Versand für alle Bestellungen über 500 €. Die
                        Standardlieferung dauert 3–5 Werktage. Expresslieferung mit
                        Zustellung am nächsten Tag ist an der Kasse verfügbar. Alle
                        Bestellungen werden sorgfältig in unseren exklusiven
                        Geschenkboxen verpackt.
                      </p>
                    </Accordion>

                    <Accordion title="Rückgabe">
                      <p
                        className="text-[13px] leading-[1.9]"
                        style={{
                          fontFamily: 'var(--el-font-sans)',
                          color: 'var(--el-gray)',
                          fontWeight: 300,
                        }}
                      >
                        Wir bieten ein 30-tägiges Rückgaberecht für alle
                        nicht reduzierten Artikel. Die Artikel müssen ungetragen sein,
                        mit allen Etiketten versehen und in der Originalverpackung.
                        Sale-Artikel können nur umgetauscht oder als Gutschrift
                        erstattet werden. Kontaktieren Sie unser Concierge-Team
                        für ein vorfrankiertes Rücksendeetikett.
                      </p>
                    </Accordion>

                    <Accordion title="Pflegehinweise">
                      <p
                        className="text-[13px] leading-[1.9]"
                        style={{
                          fontFamily: 'var(--el-font-sans)',
                          color: 'var(--el-gray)',
                          fontWeight: 300,
                        }}
                      >
                        Für maßgeschneiderte Stücke wird chemische Reinigung empfohlen.
                        Strickwaren bitte von Hand in kaltem Wasser waschen und flach
                        trocknen lassen. Kleidungsstücke auf gepolsterten Bügeln an
                        einem kühlen, trockenen Ort aufbewahren. Längere direkte
                        Sonneneinstrahlung vermeiden, um Farbe und Stoffqualität
                        zu erhalten.
                      </p>
                    </Accordion>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>

          {/* ── You May Also Like ── */}
          {relatedProducts.length > 0 && (
            <section className="mt-24 md:mt-32">
              <FadeIn>
                <div
                  className="h-px w-full mb-16"
                  style={{ backgroundColor: 'var(--el-light)' }}
                />
              </FadeIn>

              <FadeIn delay={100}>
                <p
                  className="text-[10px] tracking-[0.35em] uppercase text-center mb-3"
                  style={{
                    fontFamily: 'var(--el-font-sans)',
                    color: 'var(--el-gold)',
                  }}
                >
                  MAISON ÉLÉGANCE
                </p>
                <h2
                  className="text-2xl md:text-3xl text-center mb-14"
                  style={{
                    fontFamily: 'var(--el-font-serif)',
                    color: 'var(--el-navy)',
                    fontWeight: 400,
                  }}
                >
                  Das könnte Ihnen auch gefallen
                </h2>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p, i) => (
                  <FadeIn key={p.id} delay={200 + i * 100}>
                    <ProductCard product={p} />
                  </FadeIn>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Size Guide Drawer */}
      <SizeGuideDrawer
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        productSizes={product.sizes}
        onSelectSize={(size) => setSelectedSize(size)}
      />
    </>
  )
}

/* ── Helper: detect if a hex color is light ──────────────────────────── */

function isLightColor(hex: string): boolean {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6
}
