"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../_design/components/CartProvider";
import { formatPrice } from "../_design/data";

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  const shipping = total >= 500 ? 0 : 15;
  const orderTotal = total + shipping;

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--el-offwhite)" }}
    >
      {/* ── Page header ──────────────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-8 md:px-12 md:pt-24 md:pb-12">
        <div className="mx-auto max-w-7xl">
          <div
            className="mb-6 h-px w-16"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <h1
            className="text-4xl font-light tracking-wide sm:text-5xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Ihr Warenkorb
          </h1>
          {itemCount > 0 && (
            <p
              className="mt-3 text-sm tracking-[0.1em] uppercase"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
              }}
            >
              {itemCount} {itemCount === 1 ? "Artikel" : "Artikel"}
            </p>
          )}
        </div>
      </section>

      {/* ── Cart content ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
        {items.length === 0 ? (
          /* ── Empty state ──────────────────────────────────────── */
          <div className="py-24 text-center">
            {/* Decorative gradient */}
            <div
              className="mx-auto mb-10 h-32 w-32 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--el-cream) 0%, var(--el-light) 50%, var(--el-cream) 100%)",
              }}
            />
            <h2
              className="mb-4 text-2xl font-light tracking-wide"
              style={{
                fontFamily: "var(--el-font-serif)",
                color: "var(--el-navy)",
              }}
            >
              Ihr Warenkorb ist leer
            </h2>
            <p
              className="mb-10 text-sm font-light"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
              }}
            >
              Entdecken Sie unsere Kollektionen und finden Sie Stücke, die Sie schätzen werden
            </p>
            <Link
              href="/templates/fashion/elegance/products"
              className="inline-block px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
              style={{
                fontFamily: "var(--el-font-sans)",
                backgroundColor: "var(--el-navy)",
                color: "var(--el-cream)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--el-gold)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--el-navy)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.backgroundColor = "var(--el-navy)";
                e.currentTarget.style.color = "var(--el-cream)";
              }}
            >
              Weiter Einkaufen
            </Link>
          </div>
        ) : (
          /* ── Cart with items ──────────────────────────────────── */
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            {/* ── Items list ────────────────────────────────────── */}
            <div className="lg:col-span-8">
              {items.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}`}>
                  {index > 0 && (
                    <div
                      className="my-8 h-px w-full"
                      style={{ backgroundColor: "var(--el-gold)", opacity: 0.3 }}
                    />
                  )}
                  <div className="flex gap-6">
                    {/* Product image with gradient fallback */}
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

                    {/* Item details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3
                            className="text-lg font-light tracking-wide"
                            style={{
                              fontFamily: "var(--el-font-serif)",
                              color: "var(--el-navy)",
                            }}
                          >
                            {item.name}
                          </h3>
                          <p
                            className="mt-1.5 text-xs font-light"
                            style={{
                              fontFamily: "var(--el-font-sans)",
                              color: "var(--el-gray)",
                            }}
                          >
                            Größe: {item.size} &nbsp;/&nbsp; Farbe: {item.color}
                          </p>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size, item.color)
                          }
                          className="ml-4 p-1 transition-colors duration-300"
                          style={{ color: "var(--el-gray)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--el-rose)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--el-gray)";
                          }}
                          aria-label="Artikel entfernen"
                        >
                          <X size={18} strokeWidth={1.2} />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div
                          className="flex items-center border"
                          style={{ borderColor: "var(--el-light)" }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center transition-colors duration-300"
                            style={{ color: "var(--el-navy)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "var(--el-cream)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                            aria-label="Menge verringern"
                          >
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span
                            className="flex h-9 w-10 items-center justify-center text-sm"
                            style={{
                              fontFamily: "var(--el-font-sans)",
                              color: "var(--el-navy)",
                              borderLeft: "1px solid var(--el-light)",
                              borderRight: "1px solid var(--el-light)",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center transition-colors duration-300"
                            style={{ color: "var(--el-navy)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "var(--el-cream)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                            aria-label="Menge erhöhen"
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Item price */}
                        <span
                          className="text-base font-light"
                          style={{
                            fontFamily: "var(--el-font-sans)",
                            color: "var(--el-navy)",
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

            {/* ── Order summary ─────────────────────────────────── */}
            <div className="lg:col-span-4">
              <div
                className="sticky top-32 p-8"
                style={{
                  backgroundColor: "var(--el-cream)",
                  borderTop: "2px solid var(--el-gold)",
                }}
              >
                <h2
                  className="mb-8 text-xl font-light tracking-wide"
                  style={{
                    fontFamily: "var(--el-font-serif)",
                    color: "var(--el-navy)",
                  }}
                >
                  Bestellübersicht
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-light"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        color: "var(--el-gray)",
                      }}
                    >
                      Zwischensumme
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        color: "var(--el-navy)",
                      }}
                    >
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-light"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        color: "var(--el-gray)",
                      }}
                    >
                      Versand
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        color:
                          shipping === 0
                            ? "var(--el-gold)"
                            : "var(--el-navy)",
                      }}
                    >
                      {shipping === 0 ? "Kostenfrei" : formatPrice(shipping)}
                    </span>
                  </div>

                  {shipping === 0 && (
                    <p
                      className="text-xs font-light"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        color: "var(--el-gray)",
                      }}
                    >
                      Kostenfreier Versand ab einem Bestellwert von 500 EUR
                    </p>
                  )}
                </div>

                {/* Gold divider */}
                <div
                  className="my-6 h-px w-full"
                  style={{ backgroundColor: "var(--el-gold)" }}
                />

                <div className="flex items-center justify-between">
                  <span
                    className="text-base font-normal tracking-wide"
                    style={{
                      fontFamily: "var(--el-font-serif)",
                      color: "var(--el-navy)",
                    }}
                  >
                    Gesamt
                  </span>
                  <span
                    className="text-xl font-light tracking-wide"
                    style={{
                      fontFamily: "var(--el-font-serif)",
                      color: "var(--el-navy)",
                    }}
                  >
                    {formatPrice(orderTotal)}
                  </span>
                </div>

                {/* Checkout button */}
                <button
                  className="mt-8 w-full py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
                  style={{
                    fontFamily: "var(--el-font-sans)",
                    backgroundColor: "var(--el-navy)",
                    color: "var(--el-cream)",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--el-gold)";
                    e.currentTarget.style.backgroundColor = "var(--el-gold)";
                    e.currentTarget.style.color = "var(--el-offwhite)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.backgroundColor = "var(--el-navy)";
                    e.currentTarget.style.color = "var(--el-cream)";
                  }}
                >
                  Zur Kasse
                </button>

                {/* Continue shopping */}
                <div className="mt-6 text-center">
                  <Link
                    href="/templates/fashion/elegance/products"
                    className="text-xs font-light tracking-[0.08em] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--el-font-sans)",
                      color: "var(--el-gray)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--el-navy)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--el-gray)";
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
