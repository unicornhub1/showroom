"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "../data";
import { formatPrice } from "../data";
import { useWishlist } from "./WishlistProvider";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative">
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {/* Link covers image for navigation to product detail */}
        <Link
          href={`/templates/fashion/elegance/products/${product.id}`}
          className="absolute inset-0 z-[1]"
          aria-label={product.name}
        />

        {/* Product image with gradient fallback */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
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

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-400 group-hover:bg-black/20 pointer-events-none" />

        {/* Quick view button - slides up from bottom on hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-0 left-0 right-0 z-[2] flex items-center justify-center py-3.5 translate-y-full opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
            style={{
              fontFamily: "var(--el-font-sans)",
              backgroundColor: "rgba(4, 30, 60, 0.9)",
              color: "var(--el-offwhite)",
            }}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
              Schnellansicht
            </span>
          </button>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2 z-[3] pointer-events-none">
          {product.isNew && (
            <span
              className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--el-font-sans)",
                backgroundColor: "var(--el-gold)",
                color: "var(--el-offwhite)",
              }}
            >
              Neu
            </span>
          )}
          {product.isSale && (
            <span
              className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--el-font-sans)",
                backgroundColor: "var(--el-rose)",
                color: "var(--el-offwhite)",
              }}
            >
              Sale
            </span>
          )}
        </div>
      </div>

      {/* Wishlist heart button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
        style={{
          backgroundColor: inWishlist
            ? "var(--el-offwhite)"
            : "rgba(255,255,255,0)",
          opacity: inWishlist ? 1 : undefined,
        }}
        title={inWishlist ? "Von Wunschliste entfernen" : "Zur Wunschliste"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={inWishlist ? "var(--el-rose)" : "none"}
          stroke={inWishlist ? "var(--el-rose)" : "var(--el-offwhite)"}
          strokeWidth="1.5"
          className={`transition-all duration-300 ${
            inWishlist ? "" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Product info */}
      <div className="pt-4">
        <Link href={`/templates/fashion/elegance/products/${product.id}`}>
          <h3
            className="text-lg font-normal tracking-wide leading-snug"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-black)",
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          {product.isSale && product.originalPrice ? (
            <>
              <span
                className="text-sm font-light line-through"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
                }}
              >
                {formatPrice(product.originalPrice)}
              </span>
              <span
                className="text-sm font-normal"
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
              className="text-sm font-light"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-black)",
              }}
            >
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Color dots */}
        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.map((color) => (
            <span
              key={color.name}
              className="block h-3 w-3 rounded-full border"
              style={{
                backgroundColor: color.hex,
                borderColor: "var(--el-light)",
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
