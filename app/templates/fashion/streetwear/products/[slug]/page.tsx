"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Heart, Minus, Plus, Ruler } from "lucide-react";
import { products, formatPrice } from "../../_design/data";
import { ProductCard } from "../../_design/components/ProductCard";
import { useCart } from "../../_design/components/CartProvider";
import { useWishlist } from "../../_design/components/WishlistProvider";

const BASE = "/templates/fashion/streetwear";

/* ── Fade-in wrapper ─────────────────────────────────────────────────── */

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Accordion / Collapsible ─────────────────────────────────────────── */

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ borderBottom: "1px solid var(--kr-charcoal)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{
            fontFamily: "var(--kr-font-mono)",
            color: "var(--kr-text)",
          }}
        >
          {title}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: "var(--kr-muted)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{
          maxHeight: open
            ? `${contentRef.current?.scrollHeight || 200}px`
            : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pb-5">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Product Detail Page ─────────────────────────────────────────────── */

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find((p) => p.id === slug);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Set default color on mount
  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  // Related products: same collection or same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.collection === product.collection ||
            p.category === product.category)
      )
      .slice(0, 4);
  }, [product]);

  function handleAddToCart() {
    if (!product || !selectedSize) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor || product.colors[0]?.name || "",
      gradient: product.gradient,
      image: product.image,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }

  /* Not Found */
  if (!product) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center px-6"
        style={{ backgroundColor: "var(--kr-black)" }}
      >
        <h1
          className="mb-6 text-5xl uppercase"
          style={{
            fontFamily: "var(--kr-font-heading)",
            color: "var(--kr-text)",
          }}
        >
          404
        </h1>
        <p
          className="mb-4 text-lg"
          style={{
            fontFamily: "var(--kr-font-body)",
            color: "var(--kr-muted)",
          }}
        >
          Produkt nicht gefunden
        </p>
        <p
          className="mb-10 text-sm"
          style={{
            fontFamily: "var(--kr-font-body)",
            color: "var(--kr-muted)",
          }}
        >
          Das gesuchte Produkt existiert nicht oder wurde entfernt.
        </p>
        <Link
          href={`${BASE}/products`}
          className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200"
          style={{
            fontFamily: "var(--kr-font-mono)",
            color: "var(--kr-neon)",
          }}
        >
          Zurück zum Shop
        </Link>
      </main>
    );
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: "var(--kr-black)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
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
            <li>
              <Link
                href={`${BASE}/products`}
                className="transition-colors duration-200 hover:text-[var(--kr-neon)]"
              >
                Produkte
              </Link>
            </li>
            <li style={{ color: "var(--kr-charcoal)" }}>/</li>
            <li style={{ color: "var(--kr-text)" }}>{product.name}</li>
          </ol>
        </nav>

        {/* Product Layout: 7 / 5 split */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Left: Image Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <FadeIn>
              {/* Main image */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background: product.gradient,
                  border: "1px solid var(--kr-charcoal)",
                }}
              >
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                )}
                {/* Dashed inner frame */}
                <div
                  className="absolute bottom-6 left-6 right-6 top-6"
                  style={{
                    border: "1px dashed rgba(245, 245, 240, 0.08)",
                  }}
                />
                {/* Badges */}
                <div className="absolute left-0 top-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span
                      className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        backgroundColor: "var(--kr-neon)",
                        color: "var(--kr-black)",
                      }}
                    >
                      Neu
                    </span>
                  )}
                  {product.isSale && (
                    <span
                      className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        backgroundColor: "var(--kr-red)",
                        color: "var(--kr-text)",
                      }}
                    >
                      Sale
                    </span>
                  )}
                </div>
              </div>

              {/* Secondary images row */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div
                  className="relative"
                  style={{
                    aspectRatio: "3/4",
                    background: product.gradient,
                    border: "1px solid var(--kr-charcoal)",
                    filter: "brightness(1.1) contrast(0.95)",
                  }}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={`${product.name} - Ansicht 2`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 29vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div
                  className="relative"
                  style={{
                    aspectRatio: "3/4",
                    background: product.gradient,
                    border: "1px solid var(--kr-charcoal)",
                    filter: "brightness(0.85) saturate(1.2)",
                  }}
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={`${product.name} - Ansicht 3`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 29vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Product Info (5 cols, sticky) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[100px]">
              <FadeIn delay={150}>
                {/* Category */}
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-neon)",
                  }}
                >
                  [{product.category}]
                </p>

                {/* Product name */}
                <h1
                  className="mb-3 text-4xl uppercase leading-[0.9] md:text-5xl"
                  style={{
                    fontFamily: "var(--kr-font-heading)",
                    color: "var(--kr-text)",
                  }}
                >
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-3">
                  {product.isSale && product.originalPrice ? (
                    <>
                      <span
                        className="text-2xl font-bold"
                        style={{
                          fontFamily: "var(--kr-font-mono)",
                          color: "var(--kr-red)",
                        }}
                      >
                        {formatPrice(product.price)}
                      </span>
                      <span
                        className="text-sm line-through"
                        style={{
                          fontFamily: "var(--kr-font-mono)",
                          color: "var(--kr-muted)",
                        }}
                      >
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span
                        className="px-2 py-0.5 text-[9px] font-bold uppercase"
                        style={{
                          fontFamily: "var(--kr-font-mono)",
                          backgroundColor: "var(--kr-red)",
                          color: "var(--kr-text)",
                        }}
                      >
                        -
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        %
                      </span>
                    </>
                  ) : (
                    <span
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        color: "var(--kr-text)",
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Dashed divider */}
                <div
                  className="mb-6 h-px w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, var(--kr-charcoal) 0px, var(--kr-charcoal) 4px, transparent 4px, transparent 8px)",
                  }}
                />

                {/* Color selector */}
                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <p
                      className="mb-3 text-[10px] uppercase tracking-[0.15em]"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        color: "var(--kr-muted)",
                      }}
                    >
                      Farbe:{" "}
                      <span style={{ color: "var(--kr-text)" }}>
                        {selectedColor}
                      </span>
                    </p>
                    <div className="flex gap-2">
                      {product.colors.map((color) => {
                        const isSelected = selectedColor === color.name;
                        return (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className="h-10 w-10 transition-all duration-200"
                            style={{
                              backgroundColor: color.hex,
                              border: isSelected
                                ? "2px solid var(--kr-neon)"
                                : color.hex === "#0A0A0A"
                                ? "1px solid var(--kr-charcoal)"
                                : "1px solid rgba(255,255,255,0.15)",
                              boxShadow: isSelected
                                ? "0 0 10px rgba(205, 255, 0, 0.4)"
                                : "none",
                            }}
                            title={color.name}
                          />
                        );
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
                        fontFamily: "var(--kr-font-mono)",
                        color: "var(--kr-muted)",
                      }}
                    >
                      Größe
                    </p>
                    <Link
                      href={`${BASE}/size-guide`}
                      className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] transition-colors duration-200"
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
                      <Ruler size={11} />
                      Größenguide
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className="py-3 text-center text-[11px] uppercase tracking-wider transition-all duration-200"
                          style={{
                            fontFamily: "var(--kr-font-mono)",
                            backgroundColor: isSelected
                              ? "var(--kr-neon)"
                              : "transparent",
                            color: isSelected
                              ? "var(--kr-black)"
                              : "var(--kr-text)",
                            border: isSelected
                              ? "1px solid var(--kr-neon)"
                              : "1px solid var(--kr-charcoal)",
                          }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <p
                    className="mb-3 text-[10px] uppercase tracking-[0.15em]"
                    style={{
                      fontFamily: "var(--kr-font-mono)",
                      color: "var(--kr-muted)",
                    }}
                  >
                    Menge
                  </p>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-11 w-11 items-center justify-center transition-colors duration-200"
                      style={{
                        border: "1px solid var(--kr-charcoal)",
                        color: "var(--kr-text)",
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span
                      className="flex h-11 w-14 items-center justify-center text-sm"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        color: "var(--kr-text)",
                        borderTop: "1px solid var(--kr-charcoal)",
                        borderBottom: "1px solid var(--kr-charcoal)",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-11 w-11 items-center justify-center transition-colors duration-200"
                      style={{
                        border: "1px solid var(--kr-charcoal)",
                        color: "var(--kr-text)",
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart + Wishlist */}
                <div className="mb-2 flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className="flex-1 py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                      fontFamily: "var(--kr-font-body)",
                      backgroundColor: addedToCart
                        ? "var(--kr-charcoal)"
                        : "var(--kr-neon)",
                      color: addedToCart
                        ? "var(--kr-neon)"
                        : "var(--kr-black)",
                      boxShadow: addedToCart
                        ? "none"
                        : "4px 4px 0px var(--kr-charcoal)",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedSize && !addedToCart) {
                        e.currentTarget.style.transform =
                          "translate(-2px, -2px)";
                        e.currentTarget.style.boxShadow =
                          "6px 6px 0px var(--kr-neon)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!addedToCart) {
                        e.currentTarget.style.transform = "translate(0, 0)";
                        e.currentTarget.style.boxShadow =
                          "4px 4px 0px var(--kr-charcoal)";
                      }
                    }}
                  >
                    {addedToCart
                      ? "Im Warenkorb!"
                      : selectedSize
                      ? "In den Warenkorb"
                      : "Größe wählen"}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="flex h-[52px] w-[52px] items-center justify-center transition-all duration-200"
                    style={{
                      border: wishlisted
                        ? "2px solid var(--kr-neon)"
                        : "2px solid var(--kr-charcoal)",
                      backgroundColor: wishlisted
                        ? "var(--kr-neon-dim)"
                        : "transparent",
                    }}
                  >
                    <Heart
                      size={18}
                      fill={wishlisted ? "var(--kr-neon)" : "none"}
                      style={{
                        color: wishlisted
                          ? "var(--kr-neon)"
                          : "var(--kr-text)",
                      }}
                    />
                  </button>
                </div>

                {!selectedSize && (
                  <p
                    className="mb-4 text-center text-[10px]"
                    style={{
                      fontFamily: "var(--kr-font-mono)",
                      color: "var(--kr-muted)",
                    }}
                  >
                    Bitte wähle eine Größe aus
                  </p>
                )}

                {/* Dashed divider */}
                <div
                  className="my-6 h-px w-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, var(--kr-charcoal) 0px, var(--kr-charcoal) 4px, transparent 4px, transparent 8px)",
                  }}
                />

                {/* Description */}
                <p
                  className="mb-8 text-[13px] leading-[1.9]"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    color: "var(--kr-muted)",
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
                        fontFamily: "var(--kr-font-body)",
                        color: "var(--kr-muted)",
                      }}
                    >
                      Kostenloser Versand für alle Bestellungen über 150 EUR.
                      Standardlieferung in 3-5 Werktagen. Express-Versand mit
                      Zustellung am nächsten Tag ist an der Kasse verfügbar.
                    </p>
                  </Accordion>

                  <Accordion title="Retoure">
                    <p
                      className="text-[13px] leading-[1.9]"
                      style={{
                        fontFamily: "var(--kr-font-body)",
                        color: "var(--kr-muted)",
                      }}
                    >
                      30 Tage Rückgaberecht für alle nicht reduzierten
                      Artikel. Die Artikel müssen ungetragen sein und alle
                      Etiketten tragen. Sale-Artikel können nur umgetauscht
                      werden.
                    </p>
                  </Accordion>

                  <Accordion title="Material & Pflege">
                    <p
                      className="text-[13px] leading-[1.9]"
                      style={{
                        fontFamily: "var(--kr-font-body)",
                        color: "var(--kr-muted)",
                      }}
                    >
                      Hochwertige Materialien für langlebige Qualität.
                      Pflegehinweise findest du auf dem eingenähten Etikett.
                      Generell empfehlen wir Handwäsche oder Schonwaschgang bei
                      30 Grad.
                    </p>
                  </Accordion>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 md:mt-32">
            <FadeIn>
              <div
                className="mb-16 h-px w-full"
                style={{ backgroundColor: "var(--kr-charcoal)" }}
              />
            </FadeIn>

            <FadeIn delay={100}>
              <p
                className="mb-2 text-center text-[10px] uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-neon)",
                }}
              >
                [Empfehlungen]
              </p>
              <h2
                className="mb-14 text-center text-4xl uppercase md:text-5xl"
                style={{
                  fontFamily: "var(--kr-font-heading)",
                  color: "var(--kr-text)",
                }}
              >
                Das könnte dir auch gefallen
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
  );
}
