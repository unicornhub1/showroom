'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Check, Heart } from 'lucide-react'
import { products, formatPrice } from '../../_design/data'
import { ProductCard } from '../../_design/components/ProductCard'
import { useCart } from '../../_design/components/CartProvider'
import { useWishlist } from '../../_design/components/WishlistProvider'

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
    <div style={{ borderBottom: '0.5px solid var(--au-line)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{
            fontFamily: 'var(--au-font-sans)',
            color: 'var(--au-black)',
            fontWeight: 400,
          }}
        >
          {title}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--au-muted)' }}
          strokeWidth={1}
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
  const { isInWishlist, toggleWishlist } = useWishlist()

  const product = products.find((p) => p.id === slug)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [addedToCart, setAddedToCart] = useState(false)

  const wishlisted = product ? isInWishlist(product.id) : false

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
        className="flex min-h-screen flex-col items-center justify-center px-6"
        style={{ backgroundColor: 'var(--au-white)' }}
      >
        <h1
          className="mb-6 text-4xl"
          style={{
            fontFamily: 'var(--au-font-serif)',
            color: 'var(--au-black)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          Stück nicht gefunden
        </h1>
        <p
          className="mb-10 text-base"
          style={{
            fontFamily: 'var(--au-font-sans)',
            color: 'var(--au-muted)',
            fontWeight: 300,
          }}
        >
          Das gesuchte Stück existiert nicht oder wurde entfernt.
        </p>
        <Link
          href="/templates/fashion/jewelry/products"
          className="text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--au-gold)]"
          style={{
            fontFamily: 'var(--au-font-sans)',
            color: 'var(--au-black)',
            fontWeight: 400,
          }}
        >
          Zurück zum Schmuck
        </Link>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--au-white)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 pt-4">
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
            <li>
              <Link
                href="/templates/fashion/jewelry/products"
                className="transition-colors duration-300 hover:text-[var(--au-gold)]"
              >
                Schmuck
              </Link>
            </li>
            <li style={{ opacity: 0.4 }}>/</li>
            <li style={{ color: 'var(--au-black)' }}>{product.name}</li>
          </ol>
        </nav>

        {/* ── Product Layout: 7 / 5 split ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">

          {/* ── Left: Image Gallery (7 cols) — jewelry-style circular framing ── */}
          <div className="lg:col-span-7">
            <FadeIn>
              {/* Main image — 1:1 square for jewelry centering */}
              <div
                className="relative flex w-full items-center justify-center"
                style={{
                  aspectRatio: '1/1',
                  background: product.gradient,
                }}
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
                {/* Large decorative circle frame */}
                <div
                  className="relative h-3/5 w-3/5 rounded-full"
                  style={{
                    border: '0.5px solid var(--au-line)',
                    boxShadow: '0 0 80px rgba(201,169,110,0.1)',
                  }}
                />
              </div>

              {/* Secondary images row — 2 squares side by side */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    aspectRatio: '1/1',
                    background: product.gradient,
                    filter: 'brightness(1.05) saturate(0.9)',
                  }}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={`${product.name} — Detailansicht`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 29vw"
                      className="object-cover"
                    />
                  )}
                  <div
                    className="relative h-1/2 w-1/2 rounded-full"
                    style={{ border: '0.5px solid var(--au-line)', opacity: 0.5 }}
                  />
                </div>
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    aspectRatio: '1/1',
                    background: product.gradient,
                    filter: 'brightness(0.95)',
                  }}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={`${product.name} — Nahaufnahme`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 29vw"
                      className="object-cover"
                    />
                  )}
                  <div
                    className="relative h-1/2 w-1/2 rounded-full"
                    style={{ border: '0.5px solid var(--au-line)', opacity: 0.5 }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── Right: Product Info (5 cols, sticky) ── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[160px]">
              <FadeIn delay={150}>
                {/* AURUM sub-brand */}
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-gold)',
                    fontWeight: 400,
                  }}
                >
                  AURUM
                </p>

                {/* Product name */}
                <h1
                  className="mb-4 text-2xl leading-snug md:text-3xl"
                  style={{
                    fontFamily: 'var(--au-font-serif)',
                    color: 'var(--au-black)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                  }}
                >
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-3">
                  {product.isSale && product.originalPrice ? (
                    <>
                      <span
                        className="text-lg"
                        style={{
                          fontFamily: 'var(--au-font-sans)',
                          color: 'var(--au-rose)',
                        }}
                      >
                        {formatPrice(product.price)}
                      </span>
                      <span
                        className="text-sm line-through"
                        style={{
                          fontFamily: 'var(--au-font-sans)',
                          color: 'var(--au-muted)',
                        }}
                      >
                        {formatPrice(product.originalPrice)}
                      </span>
                    </>
                  ) : (
                    <span
                      className="text-lg"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-black)',
                        fontWeight: 300,
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Thin divider */}
                <div
                  className="mb-6 h-px w-full"
                  style={{ backgroundColor: 'var(--au-line)' }}
                />

                {/* Color selector */}
                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <p
                      className="mb-3 text-[10px] uppercase tracking-[0.15em]"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-black)',
                        fontWeight: 400,
                      }}
                    >
                      Material:{' '}
                      <span
                        className="normal-case tracking-normal"
                        style={{ color: 'var(--au-muted)', fontWeight: 300 }}
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
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: color.hex,
                              boxShadow: isSelected
                                ? '0 0 0 1.5px var(--au-white), 0 0 0 2.5px var(--au-gold)'
                                : 'inset 0 0 0 0.5px rgba(0,0,0,0.06)',
                            }}
                            title={color.name}
                          >
                            {isSelected && (
                              <Check
                                size={11}
                                strokeWidth={2}
                                style={{
                                  color:
                                    isLightColor(color.hex) ? 'var(--au-black)' : 'var(--au-white)',
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
                  <div className="mb-3 flex items-center justify-between">
                    <p
                      className="text-[10px] uppercase tracking-[0.15em]"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-black)',
                        fontWeight: 400,
                      }}
                    >
                      Größe
                    </p>
                    {product.category === 'rings' && (
                      <Link
                        href="/templates/fashion/jewelry/ring-size-guide"
                        className="flex items-center gap-1.5 text-[10px] tracking-wider transition-colors duration-300 hover:text-[var(--au-gold)]"
                        style={{
                          fontFamily: 'var(--au-font-sans)',
                          color: 'var(--au-muted)',
                          fontWeight: 300,
                        }}
                      >
                        Größentabelle
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className="px-4 py-2.5 text-[10px] tracking-wider transition-all duration-300 text-center"
                          style={{
                            fontFamily: 'var(--au-font-sans)',
                            backgroundColor: isSelected
                              ? 'var(--au-black)'
                              : 'transparent',
                            color: isSelected
                              ? 'var(--au-white)'
                              : 'var(--au-charcoal)',
                            border: `0.5px solid ${isSelected ? 'var(--au-black)' : 'var(--au-line)'}`,
                            fontWeight: isSelected ? 400 : 300,
                          }}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Add to Cart + Wishlist */}
                <div className="mb-2 flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className="flex-1 py-3.5 text-[10px] uppercase tracking-[0.25em] transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      backgroundColor: addedToCart
                        ? 'var(--au-gold)'
                        : 'var(--au-black)',
                      color: 'var(--au-white)',
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => {
                      if (selectedSize && !addedToCart) {
                        e.currentTarget.style.backgroundColor = 'var(--au-gold)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!addedToCart) {
                        e.currentTarget.style.backgroundColor = 'var(--au-black)'
                      }
                    }}
                  >
                    {addedToCart
                      ? 'Hinzugefügt'
                      : selectedSize
                        ? 'In den Warenkorb'
                        : 'Größe wählen'}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="flex h-[46px] w-[46px] items-center justify-center transition-all duration-300"
                    style={{
                      border: `0.5px solid ${wishlisted ? 'var(--au-gold)' : 'var(--au-line)'}`,
                      backgroundColor: wishlisted ? 'var(--au-gold-light)' : 'transparent',
                    }}
                    aria-label="Wunschliste"
                  >
                    <Heart
                      className="h-4 w-4"
                      fill={wishlisted ? 'var(--au-gold)' : 'none'}
                      style={{
                        color: wishlisted ? 'var(--au-gold)' : 'var(--au-muted)',
                      }}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                {!selectedSize && (
                  <p
                    className="mb-4 text-center text-[10px]"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: 'var(--au-muted)',
                      fontWeight: 300,
                    }}
                  >
                    Bitte wählen Sie eine Größe aus
                  </p>
                )}

                {/* Description */}
                <div
                  className="my-6 h-px w-full"
                  style={{ backgroundColor: 'var(--au-line)' }}
                />

                <p
                  className="mb-8 text-[13px] leading-[1.9]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-charcoal)',
                    fontWeight: 300,
                  }}
                >
                  {product.description}
                </p>

                {/* Collapsible details */}
                <div>
                  <Accordion title="Material & Pflege" defaultOpen>
                    <p
                      className="text-[13px] leading-[1.9]"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-charcoal)',
                        fontWeight: 300,
                      }}
                    >
                      Gefertigt aus recyceltem 14 bzw. 18 Karat Gold. Bewahren Sie Ihren
                      Schmuck in dem beigelegten AURUM-Etui auf. Vermeiden Sie den Kontakt
                      mit Parfüm, Chlor und aggressiven Reinigungsmitteln. Polieren Sie
                      gelegentlich mit dem mitgelieferten Poliertuch.
                    </p>
                  </Accordion>

                  <Accordion title="Versand">
                    <p
                      className="text-[13px] leading-[1.9]"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-charcoal)',
                        fontWeight: 300,
                      }}
                    >
                      Kostenloser Versand ab einem Bestellwert von 300 €. Lieferung in
                      2–4 Werktagen in handgefertigter Geschenkverpackung. Expresslieferung
                      am nächsten Werktag verfügbar.
                    </p>
                  </Accordion>

                  <Accordion title="Rückgabe & Gravur">
                    <p
                      className="text-[13px] leading-[1.9]"
                      style={{
                        fontFamily: 'var(--au-font-sans)',
                        color: 'var(--au-charcoal)',
                        fontWeight: 300,
                      }}
                    >
                      30 Tage Rückgaberecht für ungetragene Artikel in Originalverpackung.
                      Gravierte Stücke sind vom Umtausch ausgeschlossen. Kontaktieren
                      Sie unser Atelier für individuelle Gravur-Optionen.
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
                className="mb-16 h-px w-full"
                style={{ backgroundColor: 'var(--au-line)' }}
              />
            </FadeIn>

            <FadeIn delay={100}>
              <div className="mb-14 flex items-center justify-center">
                <div
                  className="h-px w-8"
                  style={{ backgroundColor: 'var(--au-gold)' }}
                />
                <div
                  className="mx-3 h-1 w-1 rotate-45"
                  style={{ backgroundColor: 'var(--au-gold)' }}
                />
                <div
                  className="h-px w-8"
                  style={{ backgroundColor: 'var(--au-gold)' }}
                />
              </div>
              <h2
                className="mb-14 text-center text-2xl md:text-3xl"
                style={{
                  fontFamily: 'var(--au-font-serif)',
                  color: 'var(--au-black)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                }}
              >
                Das könnte Ihnen auch gefallen
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
  )
}

/* ── Helper: detect if a hex color is light ──────────────────────────── */

function isLightColor(hex: string): boolean {
  const clean = hex.replace('#', '')
  if (clean.length < 6) return true
  const r = parseInt(clean.substring(0, 2), 16)
  const g = parseInt(clean.substring(2, 4), 16)
  const b = parseInt(clean.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6
}
