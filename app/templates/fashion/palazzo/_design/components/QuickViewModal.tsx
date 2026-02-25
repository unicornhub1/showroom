"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";
import type { Product } from "../data";
import { formatPrice } from "../data";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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

  /* Reset selections when product changes */
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0]?.name || "");
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);

  function handleAddToCart() {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      gradient: product.gradient,
      image: product.image,
    });
    onClose();
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
        style={{ animation: "qv-fade-in 0.25s ease-out both" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-[71] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="relative w-[92vw] max-w-[900px]"
          style={{
            backgroundColor: "var(--pz-charcoal)",
            animation: "qv-scale-in 0.3s ease-out both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 transition-colors duration-200 hover:opacity-60"
            style={{ color: "var(--pz-ivory)" }}
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product image */}
            <div
              className="relative"
              style={{ aspectRatio: "3/4", background: product.gradient }}
            >
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="450px"
                  className="object-cover"
                />
              )}
            </div>

            {/* Product details */}
            <div className="flex flex-col justify-center p-8 md:p-10">
              {/* Brand label */}
              <p
                className="mb-2 text-[10px] uppercase tracking-[0.25em]"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-gold)",
                }}
              >
                Palazzo
              </p>

              {/* Name */}
              <h2
                className="text-2xl md:text-3xl font-normal leading-tight"
                style={{
                  fontFamily: "var(--pz-font-serif)",
                  color: "var(--pz-ivory)",
                }}
              >
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-center gap-3">
                {product.isSale && product.originalPrice ? (
                  <>
                    <span
                      className="text-sm line-through"
                      style={{
                        fontFamily: "var(--pz-font-sans)",
                        color: "var(--pz-warm-gray)",
                      }}
                    >
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span
                      className="text-base"
                      style={{
                        fontFamily: "var(--pz-font-sans)",
                        color: "var(--pz-burgundy)",
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span
                    className="text-base font-light"
                    style={{
                      fontFamily: "var(--pz-font-sans)",
                      color: "var(--pz-gold)",
                    }}
                  >
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div
                className="my-6 h-px w-full"
                style={{ backgroundColor: "rgba(201,165,92,0.2)" }}
              />

              {/* Color selector */}
              <div className="mb-5">
                <p
                  className="mb-2 text-xs uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--pz-font-sans)",
                    color: "var(--pz-warm-gray)",
                  }}
                >
                  Farbe: {selectedColor}
                </p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className="h-7 w-7 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: c.hex,
                        border:
                          selectedColor === c.name
                            ? "2px solid var(--pz-gold)"
                            : "1px solid var(--pz-charcoal)",
                        outline:
                          selectedColor === c.name
                            ? "2px solid var(--pz-charcoal)"
                            : "none",
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <p
                  className="mb-2 text-xs uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--pz-font-sans)",
                    color: "var(--pz-warm-gray)",
                  }}
                >
                  Größe
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[48px] px-3 py-2 text-xs tracking-wider transition-all duration-200"
                      style={{
                        fontFamily: "var(--pz-font-sans)",
                        backgroundColor:
                          selectedSize === size
                            ? "var(--pz-gold)"
                            : "transparent",
                        color:
                          selectedSize === size
                            ? "var(--pz-black)"
                            : "var(--pz-ivory)",
                        border:
                          selectedSize === size
                            ? "1px solid var(--pz-gold)"
                            : "1px solid var(--pz-warm-gray)",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-300"
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
                  In die Tasche
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="flex items-center justify-center px-4 py-3.5 transition-all duration-300"
                  style={{
                    border: "1px solid var(--pz-warm-gray)",
                    color: inWishlist ? "var(--pz-gold)" : "var(--pz-warm-gray)",
                  }}
                  title={inWishlist ? "Von Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={inWishlist ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Description preview */}
              <p
                className="mt-6 text-xs leading-relaxed"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-warm-gray)",
                  fontWeight: 300,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes qv-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes qv-scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>,
    document.body
  );
}
