"use client";

import { useState } from "react";
import Link from "next/link";
import { products, getSaleProducts, formatPrice } from "../_design/data";
import type { Product } from "../_design/data";
import ProductCard from "../_design/components/ProductCard";
import HeroBanner from "../_design/components/HeroBanner";

/* ── Categories ───────────────────────────────────────────────────────── */

const categories = [
  { label: "Alle", value: "all" },
  { label: "Jacken", value: "jackets" },
  { label: "Hemden", value: "shirts" },
  { label: "Kleider", value: "dresses" },
  { label: "Hosen", value: "pants" },
  { label: "Schuhe", value: "shoes" },
  { label: "Accessoires", value: "accessories" },
];

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function SalePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const saleProducts = getSaleProducts();
  const filteredSale =
    activeCategory === "all"
      ? saleProducts
      : saleProducts.filter((p) => p.category === activeCategory);

  /* Non-sale products for "You might also like" */
  const recommendations = products
    .filter((p) => !p.isSale)
    .slice(0, 4);

  return (
    <main style={{ backgroundColor: "var(--el-offwhite)" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: "55vh",
          background:
            "linear-gradient(160deg, #C17C74 0%, #D4A49E 30%, #F5F0E8 60%, #E8E3DA 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0.4) 100%)",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <div
            className="mx-auto mb-8 h-px w-20"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <p
            className="mb-4 text-xs tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gold)",
            }}
          >
            Nur für kurze Zeit
          </p>
          <h1
            className="text-5xl font-light leading-tight tracking-wide sm:text-6xl md:text-7xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-offwhite)",
            }}
          >
            EXKLUSIVER SALE
          </h1>
          <p
            className="mx-auto mt-6 max-w-md text-base font-light tracking-wide"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-light)",
            }}
          >
            Bis zu 40% Rabatt auf ausgewählte Stücke
          </p>
          <div
            className="mx-auto mt-8 h-px w-20"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
        </div>
      </section>

      {/* ── Filter pills ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:px-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className="px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300"
              style={{
                fontFamily: "var(--el-font-sans)",
                backgroundColor:
                  activeCategory === cat.value
                    ? "var(--el-navy)"
                    : "transparent",
                color:
                  activeCategory === cat.value
                    ? "var(--el-cream)"
                    : "var(--el-navy)",
                border:
                  activeCategory === cat.value
                    ? "1px solid var(--el-navy)"
                    : "1px solid var(--el-light)",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.value) {
                  e.currentTarget.style.borderColor = "var(--el-navy)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.value) {
                  e.currentTarget.style.borderColor = "var(--el-light)";
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Sale grid ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
        {filteredSale.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSale.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p
              className="text-lg font-light"
              style={{
                fontFamily: "var(--el-font-serif)",
                color: "var(--el-gray)",
              }}
            >
              Keine Sale-Artikel in dieser Kategorie
            </p>
          </div>
        )}
      </section>

      {/* ── Gold divider ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-center pb-24">
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="mx-4 h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
      </div>

      {/* ── You might also like ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
        <div className="mb-12 text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <h2
            className="text-3xl font-light tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Das könnte Ihnen auch gefallen
          </h2>
          <p
            className="mt-3 text-sm tracking-[0.1em] uppercase"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gray)",
            }}
          >
            Unsere Favoriten zum Originalpreis
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/templates/fashion/elegance/products"
            className="inline-block border px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
            style={{
              fontFamily: "var(--el-font-sans)",
              borderColor: "var(--el-navy)",
              color: "var(--el-navy)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--el-navy)";
              e.currentTarget.style.color = "var(--el-cream)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--el-navy)";
            }}
          >
            Mehr entdecken
          </Link>
        </div>
      </section>
    </main>
  );
}
