'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../_design/components/CartProvider'
import { formatPrice } from '../_design/data'

const BASE = '/templates/fashion/jewelry'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart()

  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--au-white)' }}
    >
      <div className="mx-auto max-w-4xl px-6">
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
            <li style={{ color: 'var(--au-black)' }}>Warenkorb</li>
          </ol>
        </nav>

        {/* Page heading */}
        <h1
          className="mb-12 text-3xl md:text-4xl"
          style={{
            fontFamily: 'var(--au-font-serif)',
            color: 'var(--au-black)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          Warenkorb
        </h1>

        {items.length === 0 ? (
          /* Empty cart */
          <div className="flex flex-col items-center justify-center py-24">
            <ShoppingBag
              className="mb-6 h-12 w-12"
              style={{ color: 'var(--au-line)' }}
              strokeWidth={0.8}
            />
            <p
              className="mb-2 text-lg"
              style={{
                fontFamily: 'var(--au-font-serif)',
                color: 'var(--au-black)',
                fontStyle: 'italic',
              }}
            >
              Ihr Warenkorb ist leer
            </p>
            <p
              className="mb-8 text-sm"
              style={{
                fontFamily: 'var(--au-font-sans)',
                color: 'var(--au-muted)',
                fontWeight: 300,
              }}
            >
              Entdecken Sie unsere Kollektionen und finden Sie Ihr perfektes Stück.
            </p>
            <Link
              href={`${BASE}/products`}
              className="inline-block px-8 py-3 text-[10px] uppercase tracking-[0.25em] transition-opacity duration-400 hover:opacity-90"
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
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Cart items */}
            <div className="lg:col-span-2">
              {/* Header row */}
              <div
                className="mb-6 hidden grid-cols-12 gap-4 pb-4 md:grid"
                style={{ borderBottom: '0.5px solid var(--au-line)' }}
              >
                <span
                  className="col-span-6 text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-muted)',
                    fontWeight: 400,
                  }}
                >
                  Artikel
                </span>
                <span
                  className="col-span-2 text-center text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-muted)',
                    fontWeight: 400,
                  }}
                >
                  Menge
                </span>
                <span
                  className="col-span-3 text-right text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-muted)',
                    fontWeight: 400,
                  }}
                >
                  Preis
                </span>
                <span className="col-span-1" />
              </div>

              {/* Items */}
              <ul className="flex flex-col">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="grid grid-cols-1 gap-4 py-6 md:grid-cols-12 md:items-center"
                    style={{ borderBottom: '0.5px solid var(--au-line)' }}
                  >
                    {/* Product info */}
                    <div className="flex items-center gap-5 md:col-span-6">
                      {/* Circular image with gradient fallback */}
                      <div
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full"
                        style={{ background: item.gradient }}
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className="text-base leading-snug"
                          style={{
                            fontFamily: 'var(--au-font-serif)',
                            color: 'var(--au-black)',
                            fontWeight: 300,
                            fontStyle: 'italic',
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="mt-1 text-[11px]"
                          style={{
                            fontFamily: 'var(--au-font-sans)',
                            color: 'var(--au-muted)',
                            fontWeight: 300,
                          }}
                        >
                          {item.size} / {item.color}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center md:col-span-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-[var(--au-cream)]"
                          style={{ border: '0.5px solid var(--au-line)' }}
                        >
                          <Minus className="h-2.5 w-2.5" style={{ color: 'var(--au-charcoal)' }} />
                        </button>
                        <span
                          className="w-5 text-center text-sm"
                          style={{
                            fontFamily: 'var(--au-font-sans)',
                            color: 'var(--au-black)',
                            fontWeight: 300,
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-[var(--au-cream)]"
                          style={{ border: '0.5px solid var(--au-line)' }}
                        >
                          <Plus className="h-2.5 w-2.5" style={{ color: 'var(--au-charcoal)' }} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right md:col-span-3">
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--au-font-sans)',
                          color: 'var(--au-black)',
                          fontWeight: 300,
                        }}
                      >
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Remove */}
                    <div className="flex justify-end md:col-span-1">
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        aria-label="Entfernen"
                        className="transition-opacity hover:opacity-60"
                      >
                        <Trash2
                          className="h-3.5 w-3.5"
                          style={{ color: 'var(--au-muted)' }}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div
                className="p-8 lg:sticky lg:top-[160px]"
                style={{
                  backgroundColor: 'var(--au-cream)',
                  border: '0.5px solid var(--au-line)',
                }}
              >
                <h2
                  className="mb-6 text-[10px] uppercase tracking-[0.25em]"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-black)',
                    fontWeight: 400,
                  }}
                >
                  Zusammenfassung
                </h2>

                <div
                  className="mb-4 flex items-center justify-between pb-4"
                  style={{ borderBottom: '0.5px solid var(--au-line)' }}
                >
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: 'var(--au-muted)',
                      fontWeight: 300,
                    }}
                  >
                    Artikel ({itemCount})
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: 'var(--au-black)',
                      fontWeight: 300,
                    }}
                  >
                    {formatPrice(total)}
                  </span>
                </div>

                <div
                  className="mb-4 flex items-center justify-between pb-4"
                  style={{ borderBottom: '0.5px solid var(--au-line)' }}
                >
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: 'var(--au-muted)',
                      fontWeight: 300,
                    }}
                  >
                    Versand
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: total >= 300 ? 'var(--au-gold)' : 'var(--au-black)',
                      fontWeight: 300,
                    }}
                  >
                    {total >= 300 ? 'Kostenlos' : formatPrice(9)}
                  </span>
                </div>

                <div className="mb-8 flex items-center justify-between">
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: 'var(--au-black)',
                      fontWeight: 400,
                    }}
                  >
                    Gesamt
                  </span>
                  <span
                    className="text-lg"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: 'var(--au-black)',
                      fontWeight: 300,
                    }}
                  >
                    {formatPrice(total >= 300 ? total : total + 9)}
                  </span>
                </div>

                <button
                  className="w-full py-3.5 text-[10px] uppercase tracking-[0.25em] transition-opacity duration-400 hover:opacity-90"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    backgroundColor: 'var(--au-black)',
                    color: 'var(--au-white)',
                    fontWeight: 400,
                  }}
                >
                  Zur Kasse
                </button>

                <Link
                  href={`${BASE}/products`}
                  className="mt-4 block w-full py-2 text-center text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-60"
                  style={{
                    fontFamily: 'var(--au-font-sans)',
                    color: 'var(--au-gold)',
                  }}
                >
                  Weiter stöbern
                </Link>

                {total < 300 && (
                  <p
                    className="mt-6 text-center text-[11px]"
                    style={{
                      fontFamily: 'var(--au-font-sans)',
                      color: 'var(--au-muted)',
                      fontWeight: 300,
                    }}
                  >
                    Noch {formatPrice(300 - total)} bis zum kostenlosen Versand.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
