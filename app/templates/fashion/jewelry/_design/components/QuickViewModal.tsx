"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Heart } from "lucide-react";
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
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  /* Reset state when product changes */
  useEffect(() => {
    if (product) {
      setSelectedSize(null);
      setSelectedColor(product.colors[0]?.name || null);
      setAdded(false);
    }
  }, [product]);

  /* Lock body scroll */
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

  if (!product || !isOpen) return null;

  const wishlisted = isInWishlist(product.id);

  function handleAdd() {
    if (!product || !selectedSize) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor || product.colors[0]?.name || "",
      gradient: product.gradient,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      {/* Light overlay */}
      <div
        className="fixed inset-0 z-[90] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(250,250,248,0.92)",
          backdropFilter: "blur(2px)",
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
        <div
          className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden md:grid-cols-2"
          style={{
            backgroundColor: "var(--au-white)",
            border: "0.5px solid var(--au-line)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center transition-opacity duration-300 hover:opacity-60"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" style={{ color: "var(--au-charcoal)" }} strokeWidth={1} />
          </button>

          {/* Left: Product image with gradient fallback */}
          <div
            className="relative flex items-center justify-center p-12 md:p-16"
            style={{ background: product.gradient }}
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            )}
            <div
              className="relative h-48 w-48 rounded-full md:h-56 md:w-56"
              style={{
                border: "0.5px solid var(--au-line)",
                boxShadow: "0 0 60px rgba(201,169,110,0.08)",
              }}
            />
          </div>

          {/* Right: Product details */}
          <div className="flex flex-col justify-center px-8 py-10 md:px-10">
            <p
              className="mb-2 text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-gold)",
                fontWeight: 400,
              }}
            >
              AURUM
            </p>

            <h2
              className="mb-3 text-2xl"
              style={{
                fontFamily: "var(--au-font-serif)",
                color: "var(--au-black)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              {product.name}
            </h2>

            {/* Price */}
            <div className="mb-5 flex items-baseline gap-2.5">
              {product.isSale && product.originalPrice ? (
                <>
                  <span
                    className="text-sm line-through"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color: "var(--au-muted)",
                    }}
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span
                    className="text-base"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color: "var(--au-rose)",
                    }}
                  >
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span
                  className="text-base"
                  style={{
                    fontFamily: "var(--au-font-sans)",
                    color: "var(--au-black)",
                    fontWeight: 300,
                  }}
                >
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Divider */}
            <div
              className="mb-5 h-px w-full"
              style={{ backgroundColor: "var(--au-line)" }}
            />

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-4">
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "var(--au-font-sans)",
                    color: "var(--au-muted)",
                  }}
                >
                  Material
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className="h-6 w-6 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: color.hex,
                        border:
                          selectedColor === color.name
                            ? "1.5px solid var(--au-black)"
                            : "0.5px solid var(--au-line)",
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div className="mb-6">
              <p
                className="mb-2 text-[10px] uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-muted)",
                }}
              >
                Größe
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-3 py-1.5 text-[10px] tracking-wider transition-all duration-300"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      backgroundColor:
                        selectedSize === size ? "var(--au-black)" : "transparent",
                      color:
                        selectedSize === size
                          ? "var(--au-white)"
                          : "var(--au-charcoal)",
                      border: `0.5px solid ${
                        selectedSize === size ? "var(--au-black)" : "var(--au-line)"
                      }`,
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
                onClick={handleAdd}
                disabled={!selectedSize}
                className="flex-1 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-400 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  backgroundColor: added ? "var(--au-gold)" : "var(--au-black)",
                  color: "var(--au-white)",
                  border: "none",
                }}
              >
                {added
                  ? "Hinzugefügt"
                  : selectedSize
                    ? "In den Warenkorb"
                    : "Größe wählen"}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex h-[42px] w-[42px] items-center justify-center transition-all duration-300"
                style={{
                  border: `0.5px solid ${wishlisted ? "var(--au-gold)" : "var(--au-line)"}`,
                  backgroundColor: wishlisted
                    ? "var(--au-gold-light)"
                    : "transparent",
                }}
                aria-label="Wunschliste"
              >
                <Heart
                  className="h-4 w-4"
                  fill={wishlisted ? "var(--au-gold)" : "none"}
                  style={{
                    color: wishlisted ? "var(--au-gold)" : "var(--au-muted)",
                  }}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuickViewModal;
