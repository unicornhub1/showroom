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
        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
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
            backgroundColor: "var(--el-offwhite)",
            animation: "qv-scale-in 0.3s ease-out both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 transition-colors duration-200 hover:opacity-60"
          style={{ color: "var(--el-navy)" }}
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
            {/* Collection label */}
            <p
              className="mb-2 text-[10px] uppercase tracking-[0.25em]"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gold)",
              }}
            >
              Maison Élégance
            </p>

            {/* Name */}
            <h2
              className="text-2xl md:text-3xl font-normal leading-tight"
              style={{
                fontFamily: "var(--el-font-serif)",
                color: "var(--el-navy)",
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
                      fontFamily: "var(--el-font-sans)",
                      color: "var(--el-gray)",
                    }}
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span
                    className="text-base"
                    style={{
                      fontFamily: "var(--el-font-sans)",
                      color: "var(--el-rose)",
                    }}
                  >
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span
                  className="text-base font-light"
                  style={{
                    fontFamily: "var(--el-font-sans)",
                    color: "var(--el-black)",
                  }}
                >
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Divider */}
            <div
              className="my-6 h-px w-full"
              style={{ backgroundColor: "var(--el-light)" }}
            />

            {/* Color selector */}
            <div className="mb-5">
              <p
                className="mb-2 text-xs uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
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
                          ? "2px solid var(--el-navy)"
                          : "1px solid var(--el-light)",
                      outline:
                        selectedColor === c.name
                          ? "2px solid var(--el-offwhite)"
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
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
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
                      fontFamily: "var(--el-font-sans)",
                      backgroundColor:
                        selectedSize === size
                          ? "var(--el-navy)"
                          : "transparent",
                      color:
                        selectedSize === size
                          ? "var(--el-offwhite)"
                          : "var(--el-navy)",
                      border:
                        selectedSize === size
                          ? "1px solid var(--el-navy)"
                          : "1px solid var(--el-light)",
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
                  fontFamily: "var(--el-font-sans)",
                  backgroundColor: "var(--el-navy)",
                  color: "var(--el-offwhite)",
                  border: "1px solid var(--el-navy)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--el-gold)";
                  e.currentTarget.style.borderColor = "var(--el-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--el-navy)";
                  e.currentTarget.style.borderColor = "var(--el-navy)";
                }}
              >
                In die Tasche
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center justify-center px-4 py-3.5 transition-all duration-300"
                style={{
                  border: "1px solid var(--el-light)",
                  color: inWishlist ? "var(--el-rose)" : "var(--el-gray)",
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
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
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
