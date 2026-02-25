"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { formatPrice } from "../data";

const BASE = "/templates/fashion/jewelry";

const NAV_LINKS = [
  { label: "Kollektionen", href: `${BASE}/collections` },
  { label: "Schmuck", href: `${BASE}/products` },
  { label: "Über uns", href: `${BASE}/about` },
];

/* ── Cart Drawer (slide-out sidebar) ──────────────────────────────────── */

function CartDrawer() {
  const { items, removeItem, updateQuantity, total, itemCount, isCartOpen, setIsCartOpen } = useCart();
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
      {/* Backdrop — light, not dark */}
      <div
        className="fixed inset-0 z-[70] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(250,250,248,0.88)",
          backdropFilter: "blur(2px)",
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? "auto" : "none",
        }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-md flex-col transition-transform duration-500 ease-out"
        style={{
          backgroundColor: "var(--au-white)",
          borderLeft: "0.5px solid var(--au-line)",
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-6"
          style={{ borderBottom: "0.5px solid var(--au-line)" }}
        >
          <h2
            className="text-[11px] uppercase tracking-[0.25em]"
            style={{
              fontFamily: "var(--au-font-sans)",
              color: "var(--au-black)",
              fontWeight: 400,
            }}
          >
            Warenkorb ({itemCount})
          </h2>
          <button onClick={() => setIsCartOpen(false)} aria-label="Schließen">
            <X className="h-4 w-4" style={{ color: "var(--au-charcoal)" }} strokeWidth={1} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <ShoppingBag
                className="mb-4 h-8 w-8"
                style={{ color: "var(--au-line)" }}
                strokeWidth={1}
              />
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--au-font-serif)",
                  color: "var(--au-muted)",
                  fontStyle: "italic",
                }}
              >
                Ihr Warenkorb ist leer
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push(`${BASE}/products`);
                }}
                className="mt-5 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-gold)",
                }}
              >
                Schmuck entdecken
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 pb-6"
                  style={{ borderBottom: "0.5px solid var(--au-line)" }}
                >
                  {/* Product image with gradient fallback (circular for jewelry) */}
                  <div
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full"
                    style={{ background: item.gradient }}
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p
                        className="text-sm leading-snug"
                        style={{
                          fontFamily: "var(--au-font-serif)",
                          color: "var(--au-black)",
                          fontWeight: 300,
                          fontStyle: "italic",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="mt-1 text-[11px]"
                        style={{
                          fontFamily: "var(--au-font-sans)",
                          color: "var(--au-muted)",
                          fontWeight: 300,
                        }}
                      >
                        {item.size} / {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                          }
                          className="flex h-6 w-6 items-center justify-center transition-colors hover:bg-[var(--au-cream)]"
                          style={{ border: "0.5px solid var(--au-line)" }}
                        >
                          <Minus className="h-2.5 w-2.5" style={{ color: "var(--au-charcoal)" }} />
                        </button>
                        <span
                          className="w-5 text-center text-xs"
                          style={{
                            fontFamily: "var(--au-font-sans)",
                            color: "var(--au-black)",
                            fontWeight: 300,
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                          }
                          className="flex h-6 w-6 items-center justify-center transition-colors hover:bg-[var(--au-cream)]"
                          style={{ border: "0.5px solid var(--au-line)" }}
                        >
                          <Plus className="h-2.5 w-2.5" style={{ color: "var(--au-charcoal)" }} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "var(--au-font-sans)",
                            color: "var(--au-black)",
                            fontWeight: 300,
                          }}
                        >
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          aria-label="Entfernen"
                          className="transition-opacity hover:opacity-60"
                        >
                          <Trash2
                            className="h-3 w-3"
                            style={{ color: "var(--au-muted)" }}
                            strokeWidth={1.5}
                          />
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
          <div className="px-7 py-6" style={{ borderTop: "0.5px solid var(--au-line)" }}>
            <div className="mb-5 flex items-center justify-between">
              <span
                className="text-[10px] uppercase tracking-[0.2em]"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-muted)",
                }}
              >
                Zwischensumme
              </span>
              <span
                className="text-base"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-black)",
                  fontWeight: 300,
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
              className="w-full py-3.5 text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--au-font-sans)",
                backgroundColor: "var(--au-black)",
                color: "var(--au-white)",
                fontWeight: 400,
              }}
            >
              Zur Kasse
            </button>

            <button
              onClick={() => {
                setIsCartOpen(false);
                router.push(`${BASE}/products`);
              }}
              className="mt-3 w-full py-2 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-gold)",
              }}
            >
              Weiter stöbern
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
      setScrolled(window.scrollY > 30);
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
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "var(--au-white)" : "transparent",
          borderBottom: scrolled ? "0.5px solid var(--au-line)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-5 lg:px-8">
          {/* Top row: Icons left, Logo center, Icons right */}
          <div className="flex w-full items-center justify-between">
            {/* Left: Mobile hamburger / desktop spacer */}
            <div className="flex w-20 items-center">
              <button
                className="flex items-center justify-center md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Menü öffnen"
              >
                <Menu
                  className="h-4 w-4"
                  style={{ color: "var(--au-black)" }}
                  strokeWidth={1}
                />
              </button>
            </div>

            {/* Center: Logo */}
            <Link
              href={BASE}
              className="text-center text-2xl tracking-[0.15em] transition-colors duration-300 sm:text-3xl"
              style={{
                fontFamily: "var(--au-font-serif)",
                color: "var(--au-black)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              AURUM
            </Link>

            {/* Right: Icons */}
            <div className="flex w-20 items-center justify-end gap-4">
              {/* Wishlist */}
              <Link
                href={`${BASE}/wishlist`}
                className="relative transition-opacity duration-300 hover:opacity-60"
                aria-label="Wunschliste"
              >
                <Heart
                  className="h-4 w-4"
                  style={{ color: "var(--au-black)" }}
                  strokeWidth={1}
                />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px]"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      backgroundColor: "var(--au-gold)",
                      color: "var(--au-white)",
                      fontWeight: 400,
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                aria-label="Warenkorb"
                className="relative transition-opacity duration-300 hover:opacity-60"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag
                  className="h-4 w-4"
                  style={{ color: "var(--au-black)" }}
                  strokeWidth={1}
                />
                {itemCount > 0 && (
                  <span
                    className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px]"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      backgroundColor: "var(--au-gold)",
                      color: "var(--au-white)",
                      fontWeight: 400,
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Gold separator line */}
          <div
            className="mt-4 hidden h-px w-16 md:block"
            style={{ backgroundColor: "var(--au-gold)", opacity: 0.5 }}
          />

          {/* Desktop nav below logo */}
          <nav className="mt-3 hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="au-hover-underline text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-charcoal)",
                  fontWeight: 300,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--au-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--au-charcoal)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Cart drawer */}
      <CartDrawer />

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(250,250,248,0.92)" }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div
            className="absolute bottom-0 left-0 top-0 w-72 p-10"
            style={{
              backgroundColor: "var(--au-white)",
              borderRight: "0.5px solid var(--au-line)",
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="mb-12"
              aria-label="Menü schließen"
            >
              <X className="h-4 w-4" style={{ color: "var(--au-charcoal)" }} strokeWidth={1} />
            </button>

            {/* Logo */}
            <p
              className="mb-10 text-xl tracking-[0.15em]"
              style={{
                fontFamily: "var(--au-font-serif)",
                color: "var(--au-black)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              AURUM
            </p>

            <nav className="flex flex-col gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
                  style={{
                    fontFamily: "var(--au-font-sans)",
                    color: "var(--au-charcoal)",
                    fontWeight: 300,
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`${BASE}/ring-size-guide`}
                onClick={() => setMobileOpen(false)}
                className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-charcoal)",
                  fontWeight: 300,
                }}
              >
                Ringgrößen
              </Link>
            </nav>

            {/* Gold divider */}
            <div
              className="my-10 h-px w-10"
              style={{ backgroundColor: "var(--au-gold)" }}
            />

            <p
              className="text-xs"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-muted)",
                fontWeight: 300,
              }}
            >
              Kostenloser Versand ab 300&nbsp;&euro;
            </p>
          </div>
        </div>
      )}
    </>
  );
}
