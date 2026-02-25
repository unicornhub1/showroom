"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../_design/components/CartProvider";
import { formatPrice } from "../_design/data";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  const shipping = total >= 500 ? 0 : 15;
  const orderTotal = total + shipping;

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--pz-black)" }}
    >
      {/* Page header */}
      <section className="px-6 pt-16 pb-8 md:px-12 md:pt-24 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <div
            className="mb-6 h-px w-16"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <h1
            className="text-4xl font-normal tracking-wide sm:text-5xl"
            style={{
              fontFamily: "var(--pz-font-serif)",
              color: "var(--pz-ivory)",
            }}
          >
            Ihr Warenkorb
          </h1>
          {itemCount > 0 && (
            <p
              className="mt-3 text-sm tracking-[0.1em] uppercase"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
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
          <div className="py-24 text-center">
            <div
              className="mx-auto mb-10 h-32 w-32 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--pz-charcoal) 0%, var(--pz-black) 100%)",
              }}
            />
            <h2
              className="mb-4 text-2xl font-normal tracking-wide"
              style={{
                fontFamily: "var(--pz-font-serif)",
                color: "var(--pz-ivory)",
              }}
            >
              Ihr Warenkorb ist leer
            </h2>
            <p
              className="mb-10 text-sm font-light"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
              }}
            >
              Entdecken Sie unsere Kollektionen und finden Sie Stücke, die Sie schätzen werden
            </p>
            <Link
              href="/templates/fashion/palazzo/products"
              className="inline-block px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
              style={{
                fontFamily: "var(--pz-font-sans)",
                backgroundColor: "var(--pz-gold)",
                color: "var(--pz-black)",
                border: "1px solid var(--pz-gold)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--pz-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--pz-gold)";
                e.currentTarget.style.color = "var(--pz-black)";
              }}
            >
              Weiter Einkaufen
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            {/* Items list */}
            <div className="lg:col-span-8">
              {items.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}`}>
                  {index > 0 && (
                    <div
                      className="my-8 h-px w-full"
                      style={{ backgroundColor: "var(--pz-gold)", opacity: 0.2 }}
                    />
                  )}
                  <div className="flex gap-6">
                    <div
                      className="h-32 w-24 shrink-0 sm:h-40 sm:w-32 relative"
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

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3
                            className="text-lg font-normal tracking-wide"
                            style={{
                              fontFamily: "var(--pz-font-serif)",
                              color: "var(--pz-ivory)",
                            }}
                          >
                            {item.name}
                          </h3>
                          <p
                            className="mt-1.5 text-xs font-light"
                            style={{
                              fontFamily: "var(--pz-font-sans)",
                              color: "var(--pz-warm-gray)",
                            }}
                          >
                            Größe: {item.size} &nbsp;/&nbsp; Farbe: {item.color}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="ml-4 p-1 transition-colors duration-300"
                          style={{ color: "var(--pz-warm-gray)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--pz-burgundy)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--pz-warm-gray)";
                          }}
                          aria-label="Artikel entfernen"
                        >
                          <X size={18} strokeWidth={1.2} />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div
                          className="flex items-center border"
                          style={{ borderColor: "var(--pz-charcoal)" }}
                        >
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                            className="flex h-9 w-9 items-center justify-center transition-colors duration-300 hover:bg-[var(--pz-charcoal)]"
                            style={{ color: "var(--pz-ivory)" }}
                            aria-label="Menge verringern"
                          >
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span
                            className="flex h-9 w-10 items-center justify-center text-sm"
                            style={{
                              fontFamily: "var(--pz-font-sans)",
                              color: "var(--pz-ivory)",
                              borderLeft: "1px solid var(--pz-charcoal)",
                              borderRight: "1px solid var(--pz-charcoal)",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center transition-colors duration-300 hover:bg-[var(--pz-charcoal)]"
                            style={{ color: "var(--pz-ivory)" }}
                            aria-label="Menge erhöhen"
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        <span
                          className="text-base font-light"
                          style={{
                            fontFamily: "var(--pz-font-sans)",
                            color: "var(--pz-gold)",
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
                className="sticky top-32 p-8"
                style={{
                  backgroundColor: "var(--pz-charcoal)",
                  borderTop: "2px solid var(--pz-gold)",
                }}
              >
                <h2
                  className="mb-8 text-xl font-normal tracking-wide"
                  style={{
                    fontFamily: "var(--pz-font-serif)",
                    color: "var(--pz-ivory)",
                  }}
                >
                  Bestellübersicht
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light" style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-warm-gray)" }}>
                      Zwischensumme
                    </span>
                    <span className="text-sm" style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-ivory)" }}>
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light" style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-warm-gray)" }}>
                      Versand
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--pz-font-sans)",
                        color: shipping === 0 ? "var(--pz-gold)" : "var(--pz-ivory)",
                      }}
                    >
                      {shipping === 0 ? "Kostenfrei" : formatPrice(shipping)}
                    </span>
                  </div>

                  {shipping === 0 && (
                    <p className="text-xs font-light" style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-warm-gray)" }}>
                      Kostenfreier Versand ab einem Bestellwert von 500 EUR
                    </p>
                  )}
                </div>

                <div className="my-6 h-px w-full" style={{ backgroundColor: "var(--pz-gold)" }} />

                <div className="flex items-center justify-between">
                  <span className="text-base font-normal tracking-wide" style={{ fontFamily: "var(--pz-font-serif)", color: "var(--pz-ivory)" }}>
                    Gesamt
                  </span>
                  <span className="text-xl font-normal tracking-wide" style={{ fontFamily: "var(--pz-font-serif)", color: "var(--pz-gold)" }}>
                    {formatPrice(orderTotal)}
                  </span>
                </div>

                <button
                  className="mt-8 w-full py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
                  style={{
                    fontFamily: "var(--pz-font-sans)",
                    backgroundColor: "var(--pz-gold)",
                    color: "var(--pz-black)",
                    border: "1px solid var(--pz-gold)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--pz-ivory)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--pz-gold)";
                  }}
                >
                  Zur Kasse
                </button>

                <div className="mt-6 text-center">
                  <Link
                    href="/templates/fashion/palazzo/products"
                    className="text-xs font-light tracking-[0.08em] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--pz-font-sans)",
                      color: "var(--pz-warm-gray)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--pz-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--pz-warm-gray)";
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
