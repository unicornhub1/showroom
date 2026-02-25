"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { products, collections, type Product } from "../_design/data";
import { SectionHeading } from "../_design/components/SectionHeading";
import { ProductCard } from "../_design/components/ProductCard";
import QuickViewModal from "../_design/components/QuickViewModal";

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
      { threshold: 0.05 }
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

/* ── Constants ───────────────────────────────────────────────────────── */

const CATEGORIES = [
  "Alle",
  "Sneakers",
  "Hoodies",
  "Jacken",
  "Hosen",
  "T-Shirts",
  "Accessoires",
];
const CATEGORY_MAP: Record<string, string> = {
  Alle: "Alle",
  Sneakers: "sneakers",
  Hoodies: "hoodies",
  Jacken: "jackets",
  Hosen: "pants",
  "T-Shirts": "tshirts",
  Accessoires: "accessories",
};
const SORT_OPTIONS = [
  { value: "featured", label: "Empfohlen" },
  { value: "price-asc", label: "Preis: Aufsteigend" },
  { value: "price-desc", label: "Preis: Absteigend" },
  { value: "newest", label: "Neuheiten" },
];

/* ── Product Listing Page ────────────────────────────────────────────── */

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const collectionFilter = searchParams.get("collection");
  const categoryFilter = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(
    categoryFilter || "Alle"
  );
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  // Sync category from URL params
  useEffect(() => {
    if (categoryFilter) {
      setActiveCategory(categoryFilter);
    }
  }, [categoryFilter]);

  // Find collection metadata for display
  const activeCollection = collectionFilter
    ? collections.find((c) => c.id === collectionFilter)
    : null;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Collection filter
    if (collectionFilter) {
      result = result.filter((p) => p.collection === collectionFilter);
    }

    // Category filter
    if (activeCategory && activeCategory !== "Alle") {
      const englishCat = CATEGORY_MAP[activeCategory] || activeCategory;
      result = result.filter(
        (p) => p.category.toLowerCase() === englishCat.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [collectionFilter, activeCategory, sortBy]);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "Alle") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(
      `/templates/fashion/streetwear/products?${params.toString()}`,
      { scroll: false }
    );
  }

  function clearCollectionFilter() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("collection");
    router.push(
      `/templates/fashion/streetwear/products?${params.toString()}`,
      { scroll: false }
    );
  }

  const pageTitle = activeCollection ? activeCollection.name : "Alle Produkte";

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
                href="/templates/fashion/streetwear"
                className="transition-colors duration-200 hover:text-[var(--kr-neon)]"
              >
                Home
              </Link>
            </li>
            <li style={{ color: "var(--kr-charcoal)" }}>/</li>
            <li style={{ color: "var(--kr-text)" }}>
              {activeCollection ? (
                <>
                  <Link
                    href="/templates/fashion/streetwear/products"
                    className="transition-colors duration-200 hover:text-[var(--kr-neon)]"
                    style={{ color: "var(--kr-muted)" }}
                  >
                    Produkte
                  </Link>
                  <span className="mx-2" style={{ color: "var(--kr-charcoal)" }}>
                    /
                  </span>
                  <span>{activeCollection.name}</span>
                </>
              ) : (
                "Produkte"
              )}
            </li>
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
            {pageTitle}
          </h1>

          {activeCollection && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--kr-font-body)",
                  color: "var(--kr-muted)",
                }}
              >
                {activeCollection.description}
              </p>
              <button
                onClick={clearCollectionFilter}
                className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-colors duration-200"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-muted)",
                  border: "1px solid var(--kr-charcoal)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--kr-red)";
                  e.currentTarget.style.color = "var(--kr-red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--kr-charcoal)";
                  e.currentTarget.style.color = "var(--kr-muted)";
                }}
              >
                Filter entfernen
                <X size={10} />
              </button>
            </div>
          )}
        </div>

        {/* Filter bar + Sort */}
        <div
          className="mb-10 flex flex-col gap-6 pb-6 md:flex-row md:items-center md:justify-between"
          style={{ borderBottom: "1px solid var(--kr-charcoal)" }}
        >
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-200"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    backgroundColor: isActive
                      ? "var(--kr-neon)"
                      : "transparent",
                    color: isActive
                      ? "var(--kr-black)"
                      : "var(--kr-muted)",
                    border: isActive
                      ? "1px solid var(--kr-neon)"
                      : "1px solid var(--kr-charcoal)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.15em] transition-colors duration-200"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-text)",
                border: "1px solid var(--kr-charcoal)",
              }}
            >
              <SlidersHorizontal size={12} />
              {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <div
                className="absolute right-0 top-full z-20 mt-1 min-w-[200px] py-1"
                style={{
                  backgroundColor: "var(--kr-dark)",
                  border: "1px solid var(--kr-charcoal)",
                }}
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setSortOpen(false);
                    }}
                    className="block w-full px-4 py-2.5 text-left text-[10px] uppercase tracking-[0.15em] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--kr-font-mono)",
                      color:
                        sortBy === option.value
                          ? "var(--kr-neon)"
                          : "var(--kr-text)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--kr-charcoal)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product count */}
        <p
          className="mb-8 text-[10px] uppercase tracking-[0.15em]"
          style={{
            fontFamily: "var(--kr-font-mono)",
            color: "var(--kr-muted)",
          }}
        >
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "Produkt" : "Produkte"}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={Math.min(i * 60, 300)}>
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p
              className="mb-4 text-3xl uppercase"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              Keine Produkte gefunden
            </p>
            <p
              className="mb-8 text-sm"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Passe deine Filter an, um das Passende zu finden.
            </p>
            <button
              onClick={() => {
                setActiveCategory("Alle");
                clearCollectionFilter();
              }}
              className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-neon)",
              }}
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}
      </div>

      {/* Click-outside listener for sort dropdown */}
      {sortOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setSortOpen(false)}
        />
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  );
}
