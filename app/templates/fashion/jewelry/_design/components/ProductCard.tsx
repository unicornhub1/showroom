"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "../data";
import { formatPrice } from "../data";
import { useWishlist } from "./WishlistProvider";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative">
      <Link
        href={`/templates/fashion/jewelry/products/${product.id}`}
        className="block"
      >
        {/* Image area — 1:1 square with radial gradient for jewelry centering */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "1/1" }}
        >
          {/* Product gradient background */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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

          {/* Decorative circle frame — jewelry in a subtle ring */}
          <div
            className="absolute inset-[12%] rounded-full"
            style={{
              border: "0.5px solid var(--au-line)",
              opacity: 0.5,
            }}
          />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-col gap-1.5">
            {product.isNew && (
              <span
                className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  backgroundColor: "var(--au-white)",
                  color: "var(--au-gold)",
                  border: "0.5px solid var(--au-gold)",
                  fontWeight: 400,
                }}
              >
                Neu
              </span>
            )}
            {product.isSale && (
              <span
                className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  backgroundColor: "var(--au-rose)",
                  color: "var(--au-white)",
                  fontWeight: 400,
                }}
              >
                Sale
              </span>
            )}
          </div>

          {/* Schnellansicht text — appears on hover */}
          <div className="absolute inset-0 flex items-end justify-center pb-6">
            <span
              className="translate-y-2 text-[10px] uppercase tracking-[0.2em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-charcoal)",
                fontWeight: 400,
              }}
            >
              Schnellansicht
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="pt-5">
          {/* Product name with gold underline on hover */}
          <h3
            className="au-hover-underline text-lg leading-snug tracking-wide"
            style={{
              fontFamily: "var(--au-font-serif)",
              color: "var(--au-black)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2.5">
            {product.isSale && product.originalPrice ? (
              <>
                <span
                  className="text-sm line-through"
                  style={{
                    fontFamily: "var(--au-font-sans)",
                    color: "var(--au-muted)",
                    fontWeight: 300,
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "var(--au-font-sans)",
                    color: "var(--au-rose)",
                    fontWeight: 400,
                  }}
                >
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-charcoal)",
                  fontWeight: 300,
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
                className="block h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: color.hex,
                  border: "0.5px solid var(--au-line)",
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </Link>

      {/* Wishlist heart icon — top right, appears on hover */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-400 group-hover:opacity-100"
        style={{
          backgroundColor: wishlisted
            ? "var(--au-gold)"
            : "rgba(250,250,248,0.85)",
        }}
        aria-label={wishlisted ? "Von Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
      >
        <Heart
          className="h-3.5 w-3.5"
          fill={wishlisted ? "var(--au-white)" : "none"}
          style={{
            color: wishlisted ? "var(--au-white)" : "var(--au-charcoal)",
          }}
          strokeWidth={1.5}
        />
      </button>
    </div>
  );
}

export default ProductCard;
