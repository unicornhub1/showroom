"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../_design/components/CartProvider";
import { formatPrice } from "../_design/data";

const BASE = "/templates/fashion/streetwear";

/* ── Cart Page ─────────────────────────────────────────────────────────── */

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: "var(--kr-black)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 pt-4">
          <ol
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-muted)",
            }}
          >
            <li>
              <Link
                href={BASE}
                className="transition-colors duration-200 hover:text-[var(--kr-neon)]"
              >
                Home
              </Link>
            </li>
            <li style={{ color: "var(--kr-charcoal)" }}>/</li>
            <li style={{ color: "var(--kr-text)" }}>Warenkorb</li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="mb-10">
          <h1
            className="text-5xl uppercase leading-[0.9] md:text-7xl"
            style={{
              fontFamily: "var(--kr-font-heading)",
              color: "var(--kr-text)",
            }}
          >
            Warenkorb
          </h1>
          <p
            className="mt-3 text-[10px] uppercase tracking-[0.15em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-muted)",
            }}
          >
            {itemCount} {itemCount === 1 ? "Artikel" : "Artikel"}
          </p>
          <div
            className="mt-4 h-[2px] w-16"
            style={{ backgroundColor: "var(--kr-neon)" }}
          />
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div
            className="flex flex-col items-center justify-center py-24"
          >
            <ShoppingBag
              className="mb-6 h-16 w-16"
              style={{ color: "var(--kr-charcoal)" }}
            />
            <p
              className="mb-2 text-2xl uppercase"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              Dein Warenkorb ist leer
            </p>
            <p
              className="mb-8 text-sm"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Sieht so aus, als haettest du noch nichts gefunden.
            </p>
            <Link
              href={`${BASE}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                fontFamily: "var(--kr-font-body)",
                backgroundColor: "var(--kr-neon)",
                color: "var(--kr-black)",
                boxShadow: "4px 4px 0px var(--kr-charcoal)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow =
                  "6px 6px 0px var(--kr-neon)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow =
                  "4px 4px 0px var(--kr-charcoal)";
              }}
            >
              Jetzt Shoppen
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              {/* Table Header */}
              <div
                className="hidden grid-cols-12 gap-4 pb-4 md:grid"
                style={{
                  borderBottom: "1px solid var(--kr-charcoal)",
                }}
              >
                <span
                  className="col-span-6 text-[9px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-muted)",
                  }}
                >
                  Produkt
                </span>
                <span
                  className="col-span-2 text-[9px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-muted)",
                  }}
                >
                  Menge
                </span>
                <span
                  className="col-span-3 text-right text-[9px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-muted)",
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
                    style={{
                      borderBottom: "1px solid var(--kr-charcoal)",
                    }}
                  >
                    {/* Product info */}
                    <div className="flex gap-4 md:col-span-6">
                      {/* Thumbnail */}
                      <Link
                        href={`${BASE}/products/${item.productId}`}
                        className="relative h-24 w-20 shrink-0 overflow-hidden"
                        style={{
                          background: item.gradient,
                          border: "1px solid var(--kr-charcoal)",
                        }}
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
                      </Link>
                      <div>
                        <Link
                          href={`${BASE}/products/${item.productId}`}
                          className="text-sm font-medium transition-colors duration-200 hover:text-[var(--kr-neon)]"
                          style={{
                            fontFamily: "var(--kr-font-body)",
                            color: "var(--kr-text)",
                          }}
                        >
                          {item.name}
                        </Link>
                        <p
                          className="mt-1 text-[10px] uppercase tracking-wider"
                          style={{
                            fontFamily: "var(--kr-font-mono)",
                            color: "var(--kr-muted)",
                          }}
                        >
                          {item.size} / {item.color}
                        </p>
                        <p
                          className="mt-1 text-xs font-bold md:hidden"
                          style={{
                            fontFamily: "var(--kr-font-mono)",
                            color: "var(--kr-text)",
                          }}
                        >
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center md:col-span-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center transition-colors duration-200"
                        style={{
                          border: "1px solid var(--kr-charcoal)",
                          color: "var(--kr-text)",
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        className="flex h-9 w-10 items-center justify-center text-xs"
                        style={{
                          fontFamily: "var(--kr-font-mono)",
                          color: "var(--kr-text)",
                          borderTop: "1px solid var(--kr-charcoal)",
                          borderBottom: "1px solid var(--kr-charcoal)",
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
                        className="flex h-9 w-9 items-center justify-center transition-colors duration-200"
                        style={{
                          border: "1px solid var(--kr-charcoal)",
                          color: "var(--kr-text)",
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="hidden text-right md:col-span-3 md:block">
                      <span
                        className="text-sm font-bold"
                        style={{
                          fontFamily: "var(--kr-font-mono)",
                          color: "var(--kr-text)",
                        }}
                      >
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Remove */}
                    <div className="flex justify-end md:col-span-1">
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="flex h-8 w-8 items-center justify-center transition-colors duration-200"
                        style={{
                          border: "1px solid var(--kr-charcoal)",
                          color: "var(--kr-muted)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--kr-red)";
                          e.currentTarget.style.color = "var(--kr-red)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--kr-charcoal)";
                          e.currentTarget.style.color = "var(--kr-muted)";
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div
                className="sticky top-[100px] p-6"
                style={{
                  backgroundColor: "var(--kr-dark)",
                  border: "1px solid var(--kr-charcoal)",
                }}
              >
                <h2
                  className="mb-6 text-xs font-bold uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-neon)",
                  }}
                >
                  Zusammenfassung
                </h2>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: "var(--kr-font-body)",
                        color: "var(--kr-muted)",
                      }}
                    >
                      Zwischensumme
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        color: "var(--kr-text)",
                      }}
                    >
                      {formatPrice(total)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: "var(--kr-font-body)",
                        color: "var(--kr-muted)",
                      }}
                    >
                      Versand
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        color: total >= 150 ? "var(--kr-neon)" : "var(--kr-text)",
                      }}
                    >
                      {total >= 150 ? "Kostenlos" : formatPrice(5)}
                    </span>
                  </div>

                  <div
                    className="my-3 h-px w-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, var(--kr-charcoal) 0px, var(--kr-charcoal) 4px, transparent 4px, transparent 8px)",
                    }}
                  />

                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-bold uppercase"
                      style={{
                        fontFamily: "var(--kr-font-body)",
                        color: "var(--kr-text)",
                      }}
                    >
                      Gesamt
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        color: "var(--kr-neon)",
                      }}
                    >
                      {formatPrice(total >= 150 ? total : total + 5)}
                    </span>
                  </div>
                </div>

                {total < 150 && (
                  <p
                    className="mt-4 text-[10px]"
                    style={{
                      fontFamily: "var(--kr-font-mono)",
                      color: "var(--kr-muted)",
                    }}
                  >
                    Noch {formatPrice(150 - total)} bis zum kostenlosen Versand.
                  </p>
                )}

                <button
                  className="mt-6 w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    backgroundColor: "var(--kr-neon)",
                    color: "var(--kr-black)",
                    boxShadow: "4px 4px 0px var(--kr-charcoal)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                    e.currentTarget.style.boxShadow =
                      "6px 6px 0px var(--kr-neon)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow =
                      "4px 4px 0px var(--kr-charcoal)";
                  }}
                >
                  Zur Kasse
                </button>

                <Link
                  href={`${BASE}/products`}
                  className="mt-4 block text-center text-[10px] uppercase tracking-[0.15em] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--kr-neon)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--kr-muted)";
                  }}
                >
                  Weiter Shoppen
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
