"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Minus, Plus, ShoppingBag, Trash2, X, Heart } from "lucide-react";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { formatPrice } from "../data";

const BASE = "/templates/fashion/streetwear";

const NAV_LINKS = [
  { label: "Shop", href: `${BASE}/products` },
  { label: "Drops", href: `${BASE}/products?collection=drops` },
  { label: "Kollektionen", href: `${BASE}/collections` },
  { label: "Sale", href: `${BASE}/products?collection=sale` },
  { label: "Größenguide", href: `${BASE}/size-guide` },
];

/* ── Cart Drawer (slide-out sidebar) ──────────────────────────────────── */

function CartDrawer() {
  const { items, removeItem, updateQuantity, total, itemCount, isCartOpen, setIsCartOpen } =
    useCart();
  const router = useRouter();

  /* Lock body scroll when open */
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? "auto" : "none",
        }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-md flex-col transition-transform duration-400 ease-out"
        style={{
          backgroundColor: "var(--kr-dark)",
          borderLeft: "1px solid var(--kr-charcoal)",
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid var(--kr-charcoal)" }}
        >
          <h2
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              fontFamily: "var(--kr-font-mono)",
              color: "var(--kr-neon)",
            }}
          >
            Warenkorb ({itemCount})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Warenkorb schließen"
            className="flex h-8 w-8 items-center justify-center transition-colors duration-200"
            style={{
              border: "1px solid var(--kr-charcoal)",
              color: "var(--kr-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--kr-neon)";
              e.currentTarget.style.color = "var(--kr-neon)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--kr-charcoal)";
              e.currentTarget.style.color = "var(--kr-text)";
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 kr-scrollbar">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <ShoppingBag
                className="mb-4 h-10 w-10"
                style={{ color: "var(--kr-charcoal)" }}
              />
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--kr-font-body)",
                  color: "var(--kr-muted)",
                }}
              >
                Dein Warenkorb ist leer
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push(`${BASE}/products`);
                }}
                className="mt-4 text-xs uppercase tracking-[0.2em] transition-colors duration-200"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-neon)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Jetzt Shoppen
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 pb-4"
                  style={{ borderBottom: "1px solid var(--kr-charcoal)" }}
                >
                  {/* Product gradient thumbnail */}
                  <div
                    className="relative h-20 w-16 shrink-0 overflow-hidden"
                    style={{
                      background: item.gradient,
                      border: "1px solid var(--kr-charcoal)",
                    }}
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p
                        className="text-sm font-medium leading-snug"
                        style={{
                          fontFamily: "var(--kr-font-body)",
                          color: "var(--kr-text)",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="mt-1 text-[10px] uppercase tracking-wider"
                        style={{
                          fontFamily: "var(--kr-font-mono)",
                          color: "var(--kr-muted)",
                        }}
                      >
                        {item.size} / {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center transition-colors duration-200"
                          style={{
                            border: "1px solid var(--kr-charcoal)",
                            color: "var(--kr-text)",
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span
                          className="flex h-7 w-8 items-center justify-center text-xs"
                          style={{
                            fontFamily: "var(--kr-font-mono)",
                            color: "var(--kr-text)",
                            borderTop: "1px solid var(--kr-charcoal)",
                            borderBottom: "1px solid var(--kr-charcoal)",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center transition-colors duration-200"
                          style={{
                            border: "1px solid var(--kr-charcoal)",
                            color: "var(--kr-text)",
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className="text-sm font-bold"
                          style={{
                            fontFamily: "var(--kr-font-mono)",
                            color: "var(--kr-text)",
                          }}
                        >
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size, item.color)
                          }
                          aria-label="Artikel entfernen"
                          className="transition-colors duration-200"
                          style={{ color: "var(--kr-muted)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--kr-red)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--kr-muted)";
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with total + checkout */}
        {items.length > 0 && (
          <div
            className="px-6 py-5"
            style={{ borderTop: "1px solid var(--kr-charcoal)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span
                className="text-[10px] uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-muted)",
                }}
              >
                Zwischensumme
              </span>
              <span
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-text)",
                }}
              >
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                router.push(`${BASE}/cart`);
              }}
              className="w-full py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                fontFamily: "var(--kr-font-body)",
                backgroundColor: "var(--kr-neon)",
                color: "var(--kr-black)",
                boxShadow: "4px 4px 0px var(--kr-charcoal)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "6px 6px 0px var(--kr-neon)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow =
                  "4px 4px 0px var(--kr-charcoal)";
              }}
            >
              Zur Kasse
            </button>

            <button
              onClick={() => {
                setIsCartOpen(false);
                router.push(`${BASE}/products`);
              }}
              className="mt-3 w-full py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-200"
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
              Weiter Shoppen
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Navbar ────────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? "rgba(10, 10, 10, 0.95)"
            : "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid var(--kr-charcoal)"
            : "1px solid transparent",
        }}
      >
        {/* Top ticker bar */}
        <div
          className="overflow-hidden py-1.5"
          style={{ backgroundColor: "var(--kr-neon)" }}
        >
          <div className="kr-marquee flex whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="mx-8 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-black)",
                }}
              >
                KOSTENLOSER VERSAND AB 150 EUR — NEUE DROPS JEDEN FREITAG —
                KRSN SS26 —
              </span>
            ))}
          </div>
        </div>

        {/* Main navigation row */}
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
          {/* Left: Logo */}
          <Link
            href={BASE}
            className="kr-glitch text-2xl uppercase tracking-[0.1em] transition-colors duration-200 sm:text-3xl"
            style={{
              fontFamily: "var(--kr-font-heading)",
              color: "var(--kr-text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--kr-neon)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--kr-text)";
            }}
          >
            KRSN
          </Link>

          {/* Center: Desktop nav links */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="relative text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200"
                style={{
                  fontFamily: "var(--kr-font-body)",
                  color: "var(--kr-text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--kr-neon)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--kr-text)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              href={`${BASE}/wishlist`}
              className="relative hidden transition-colors duration-200 sm:flex"
              style={{ color: "var(--kr-text)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--kr-neon)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--kr-text)";
              }}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center text-[9px] font-bold"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    backgroundColor: "var(--kr-neon)",
                    color: "var(--kr-black)",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              aria-label="Warenkorb"
              className="relative transition-colors duration-200"
              style={{ color: "var(--kr-text)" }}
              onClick={() => setIsCartOpen(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--kr-neon)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--kr-text)";
              }}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center text-[9px] font-bold"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    backgroundColor: "var(--kr-neon)",
                    color: "var(--kr-black)",
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="flex items-center justify-center lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" style={{ color: "var(--kr-text)" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Cart drawer */}
      <CartDrawer />

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div
            className="absolute bottom-0 left-0 top-0 w-80 p-8"
            style={{
              backgroundColor: "var(--kr-black)",
              borderRight: "1px solid var(--kr-charcoal)",
            }}
          >
            <div className="flex items-center justify-between mb-10">
              <span
                className="text-2xl uppercase tracking-[0.1em]"
                style={{
                  fontFamily: "var(--kr-font-heading)",
                  color: "var(--kr-neon)",
                }}
              >
                KRSN
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Menü schließen"
                className="flex h-8 w-8 items-center justify-center"
                style={{
                  border: "1px solid var(--kr-charcoal)",
                  color: "var(--kr-text)",
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl uppercase tracking-[0.1em] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--kr-font-heading)",
                    color: "var(--kr-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--kr-neon)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--kr-text)";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div
              className="my-8 h-px"
              style={{ backgroundColor: "var(--kr-charcoal)" }}
            />

            <Link
              href={`${BASE}/about`}
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-[0.15em] transition-colors duration-200"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-muted)",
              }}
            >
              Über KRSN
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
