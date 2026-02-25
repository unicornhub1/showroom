"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Heart, Minus, Plus } from "lucide-react";
import type { Product } from "../data";
import { formatPrice } from "../data";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  /* Reset state when product changes */
  useEffect(() => {
    if (product) {
      setSelectedSize(null);
      setSelectedColor(product.colors[0]?.name || null);
      setQuantity(1);
      setAddedToCart(false);
    }
  }, [product]);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const wishlisted = isInWishlist(product.id);

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
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <div
          className="relative flex w-full max-w-4xl flex-col overflow-hidden md:flex-row"
          style={{
            backgroundColor: "var(--kr-dark)",
            border: "1px solid var(--kr-charcoal)",
            maxHeight: "90vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center transition-colors duration-200"
            style={{
              backgroundColor: "var(--kr-charcoal)",
              color: "var(--kr-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--kr-neon)";
              e.currentTarget.style.color = "var(--kr-black)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--kr-charcoal)";
              e.currentTarget.style.color = "var(--kr-text)";
            }}
          >
            <X size={16} />
          </button>

          {/* Left: Product image */}
          <div
            className="relative w-full md:w-1/2"
            style={{
              background: product.gradient,
              minHeight: "300px",
              aspectRatio: "3/4",
            }}
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            {/* Badges */}
            <div className="absolute left-0 top-3 flex flex-col gap-2">
              {product.isNew && (
                <span
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
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
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]"
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

          {/* Right: Product details */}
          <div className="flex w-full flex-col overflow-y-auto p-6 md:w-1/2 md:p-8">
            {/* Category */}
            <p
              className="mb-2 text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-muted)",
              }}
            >
              {product.category}
            </p>

            {/* Name */}
            <h2
              className="mb-3 text-3xl uppercase leading-[0.95]"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              {product.name}
            </h2>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3">
              {product.isSale && product.originalPrice ? (
                <>
                  <span
                    className="text-xl font-bold"
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
                </>
              ) : (
                <span
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-text)",
                  }}
                >
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Divider */}
            <div
              className="mb-6 h-px w-full"
              style={{
                backgroundColor: "var(--kr-charcoal)",
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--kr-charcoal) 0px, var(--kr-charcoal) 4px, transparent 4px, transparent 8px)",
              }}
            />

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-muted)",
                  }}
                >
                  Farbe: {selectedColor}
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => {
                    const isActive = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className="h-8 w-8 transition-all duration-200"
                        style={{
                          backgroundColor: color.hex,
                          border: isActive
                            ? "2px solid var(--kr-neon)"
                            : color.hex === "#0A0A0A"
                            ? "1px solid var(--kr-charcoal)"
                            : "1px solid rgba(255,255,255,0.15)",
                          boxShadow: isActive
                            ? "0 0 8px rgba(205, 255, 0, 0.4)"
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
            <div className="mb-5">
              <p
                className="mb-2 text-[10px] uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-muted)",
                }}
              >
                Größe
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[44px] px-3 py-2 text-[11px] uppercase tracking-wider transition-all duration-200"
                      style={{
                        fontFamily: "var(--kr-font-mono)",
                        backgroundColor: isActive
                          ? "var(--kr-neon)"
                          : "transparent",
                        color: isActive
                          ? "var(--kr-black)"
                          : "var(--kr-text)",
                        border: isActive
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
                className="mb-2 text-[10px] uppercase tracking-[0.15em]"
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
                  className="flex h-10 w-10 items-center justify-center transition-colors duration-200"
                  style={{
                    border: "1px solid var(--kr-charcoal)",
                    color: "var(--kr-text)",
                  }}
                >
                  <Minus size={14} />
                </button>
                <span
                  className="flex h-10 w-12 items-center justify-center text-sm"
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
                  className="flex h-10 w-10 items-center justify-center transition-colors duration-200"
                  style={{
                    border: "1px solid var(--kr-charcoal)",
                    color: "var(--kr-text)",
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex-1 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
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
              >
                {addedToCart
                  ? "Im Warenkorb!"
                  : selectedSize
                  ? "In den Warenkorb"
                  : "Größe wählen"}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex h-[46px] w-[46px] items-center justify-center transition-all duration-200"
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
                  size={16}
                  fill={wishlisted ? "var(--kr-neon)" : "none"}
                  style={{
                    color: wishlisted ? "var(--kr-neon)" : "var(--kr-text)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
