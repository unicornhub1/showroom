"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "../_design/components/CartProvider";
import { formatPrice } from "../_design/data";

const BASE = "/templates/fashion/jardin";

/* ── Cart Page ────────────────────────────────────────────────────────── */

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  const shipping = total >= 150 ? 0 : 9.90;
  const orderTotal = total + shipping;

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--jd-offwhite)" }}
    >
      {/* Page header */}
      <section className="px-6 pt-16 pb-8 md:px-12 md:pt-24 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <div
            className="mb-6 h-px w-12"
            style={{ backgroundColor: "var(--jd-sage)", opacity: 0.4 }}
          />
          <h1
            className="text-4xl tracking-wide sm:text-5xl"
            style={{
              fontFamily: "var(--jd-font-serif)",
              color: "var(--jd-charcoal)",
              fontWeight: 400,
            }}
          >
            Ihr Warenkorb
          </h1>
          {itemCount > 0 && (
            <p
              className="mt-3 text-sm"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-sand)",
              }}
            >
              {itemCount} {itemCount === 1 ? "Artikel" : "Artikel"}
            </p>
          )}
        </div>
      </section>

      {/* Cart content */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
        {items.length === 0 ? (
          /* Empty state */
          <div className="py-24 text-center">
            <div
              className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--jd-sage-light)" }}
            >
              <ShoppingBag size={32} style={{ color: "var(--jd-sage)", opacity: 0.5 }} />
            </div>
            <h2
              className="mb-4 text-2xl tracking-wide"
              style={{
                fontFamily: "var(--jd-font-serif)",
                color: "var(--jd-charcoal)",
                fontWeight: 400,
              }}
            >
              Ihr Warenkorb ist leer
            </h2>
            <p
              className="mb-10 text-sm"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
                opacity: 0.6,
              }}
            >
              Entdecken Sie unsere Kollektionen und finden Sie Stücke, die Sie lieben werden.
            </p>
            <Link
              href={`${BASE}/products`}
              className="inline-block rounded-lg px-12 py-4 text-xs font-medium uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-90"
              style={{
                fontFamily: "var(--jd-font-sans)",
                backgroundColor: "var(--jd-sage)",
                color: "var(--jd-offwhite)",
              }}
            >
              Weiter einkaufen
            </Link>
          </div>
        ) : (
          /* Cart with items */
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            {/* Items list */}
            <div className="lg:col-span-8">
              {items.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}`}>
                  {index > 0 && (
                    <div
                      className="my-8 h-px w-full"
                      style={{ backgroundColor: "var(--jd-sage)", opacity: 0.15 }}
                    />
                  )}
                  <div className="flex gap-6">
                    {/* Product image */}
                    <div
                      className="h-32 w-24 shrink-0 sm:h-40 sm:w-32 relative rounded-xl overflow-hidden"
                      style={{ background: item.gradient }}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Item details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3
                            className="text-lg tracking-wide"
                            style={{
                              fontFamily: "var(--jd-font-serif)",
                              color: "var(--jd-charcoal)",
                              fontWeight: 400,
                            }}
                          >
                            {item.name}
                          </h3>
                          <p
                            className="mt-1.5 text-xs"
                            style={{
                              fontFamily: "var(--jd-font-sans)",
                              color: "var(--jd-sand)",
                            }}
                          >
                            Größe: {item.size} / Farbe: {item.color}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="ml-4 p-1 transition-colors duration-300"
                          style={{ color: "var(--jd-sand)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--jd-terra)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--jd-sand)";
                          }}
                          aria-label="Artikel entfernen"
                        >
                          <X size={18} strokeWidth={1.2} />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div
                          className="flex items-center rounded-lg border"
                          style={{ borderColor: "var(--jd-light)" }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                            }
                            className="flex h-9 w-9 items-center justify-center transition-colors duration-300 hover:bg-[var(--jd-cream)] rounded-l-lg"
                            style={{ color: "var(--jd-charcoal)" }}
                            aria-label="Menge verringern"
                          >
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span
                            className="flex h-9 w-10 items-center justify-center text-sm border-x"
                            style={{
                              fontFamily: "var(--jd-font-sans)",
                              color: "var(--jd-charcoal)",
                              borderColor: "var(--jd-light)",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                            }
                            className="flex h-9 w-9 items-center justify-center transition-colors duration-300 hover:bg-[var(--jd-cream)] rounded-r-lg"
                            style={{ color: "var(--jd-charcoal)" }}
                            aria-label="Menge erhöhen"
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        <span
                          className="text-base"
                          style={{
                            fontFamily: "var(--jd-font-sans)",
                            color: "var(--jd-charcoal)",
                          }}
                        >
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-4">
              <div
                className="sticky top-32 rounded-2xl p-8"
                style={{
                  backgroundColor: "var(--jd-cream)",
                  borderTop: "2px solid var(--jd-sage)",
                }}
              >
                <h2
                  className="mb-8 text-xl tracking-wide"
                  style={{
                    fontFamily: "var(--jd-font-serif)",
                    color: "var(--jd-charcoal)",
                    fontWeight: 400,
                  }}
                >
                  Bestellübersicht
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm"
                      style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-sand)" }}
                    >
                      Zwischensumme
                    </span>
                    <span
                      className="text-sm"
                      style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-charcoal)" }}
                    >
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm"
                      style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-sand)" }}
                    >
                      Versand
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--jd-font-sans)",
                        color: shipping === 0 ? "var(--jd-sage)" : "var(--jd-charcoal)",
                      }}
                    >
                      {shipping === 0 ? "Kostenfrei" : formatPrice(shipping)}
                    </span>
                  </div>

                  {shipping === 0 && (
                    <p
                      className="text-xs"
                      style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-sand)" }}
                    >
                      Kostenfreier Versand ab 150 EUR Bestellwert
                    </p>
                  )}
                </div>

                <div
                  className="my-6 h-px w-full"
                  style={{ backgroundColor: "var(--jd-sage)", opacity: 0.3 }}
                />

                <div className="flex items-center justify-between">
                  <span
                    className="text-base tracking-wide"
                    style={{
                      fontFamily: "var(--jd-font-serif)",
                      color: "var(--jd-charcoal)",
                      fontWeight: 400,
                    }}
                  >
                    Gesamt
                  </span>
                  <span
                    className="text-xl tracking-wide"
                    style={{
                      fontFamily: "var(--jd-font-serif)",
                      color: "var(--jd-charcoal)",
                      fontWeight: 400,
                    }}
                  >
                    {formatPrice(orderTotal)}
                  </span>
                </div>

                <button
                  className="mt-8 w-full rounded-lg py-4 text-xs font-medium uppercase tracking-[0.15em] transition-opacity duration-300 hover:opacity-90"
                  style={{
                    fontFamily: "var(--jd-font-sans)",
                    backgroundColor: "var(--jd-sage)",
                    color: "var(--jd-offwhite)",
                  }}
                >
                  Zur Kasse
                </button>

                <div className="mt-6 text-center">
                  <Link
                    href={`${BASE}/products`}
                    className="text-xs tracking-wide transition-colors duration-300"
                    style={{
                      fontFamily: "var(--jd-font-sans)",
                      color: "var(--jd-sand)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--jd-sage)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--jd-sand)";
                    }}
                  >
                    oder weiter einkaufen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
