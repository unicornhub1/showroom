"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import type { Product } from "../data";
import { formatPrice } from "../data";
import { useWishlist } from "./WishlistProvider";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative">
      <Link
        href={`/templates/fashion/streetwear/products/${product.id}`}
        className="block"
      >
        {/* Image area */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "3/4",
            border: "1px solid var(--kr-charcoal)",
          }}
        >
          {/* Product gradient background */}
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
            style={{ background: product.gradient }}
          >
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            )}
          </div>

          {/* Hover overlay with glitch line effect */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(205,255,0,0.03) 2px, rgba(205,255,0,0.03) 4px)",
            }}
          />

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

          {/* Bottom hover actions bar */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.9)" }}
          >
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="flex flex-1 items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-200"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-text)",
                  borderRight: "1px solid var(--kr-charcoal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--kr-neon)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--kr-text)";
                }}
              >
                <Eye size={12} />
                Schnellansicht
              </button>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="pt-3">
          {/* Category tag */}
          <p
            className="mb-1 text-[9px] uppercase tracking-[0.2em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-muted)",
            }}
          >
            {product.category}
          </p>

          <h3
            className="text-sm font-medium leading-tight tracking-wide"
            style={{
              fontFamily: "var(--kr-font-body)",
              color: "var(--kr-text)",
            }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-1.5 flex items-center gap-2">
            {product.isSale && product.originalPrice ? (
              <>
                <span
                  className="text-xs line-through"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-muted)",
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-red)",
                  }}
                >
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-text)",
                }}
              >
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Color dots */}
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="block h-3 w-3 rounded-full"
                style={{
                  backgroundColor: color.hex,
                  border:
                    color.hex === "#0A0A0A" || color.hex === "#000000"
                      ? "1px solid var(--kr-charcoal)"
                      : "1px solid rgba(255,255,255,0.15)",
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </Link>

      {/* Wishlist button (top right, always visible) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center transition-all duration-200"
        style={{
          backgroundColor: wishlisted ? "var(--kr-neon)" : "rgba(10, 10, 10, 0.6)",
          border: wishlisted ? "none" : "1px solid var(--kr-charcoal)",
        }}
        aria-label={wishlisted ? "Von Wunschliste entfernen" : "Zur Wunschliste"}
      >
        <Heart
          size={14}
          fill={wishlisted ? "var(--kr-black)" : "none"}
          style={{
            color: wishlisted ? "var(--kr-black)" : "var(--kr-text)",
          }}
        />
      </button>
    </div>
  );
}

export default ProductCard;
