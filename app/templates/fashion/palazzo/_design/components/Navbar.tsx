"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { formatPrice } from "../data";

const BASE = "/templates/fashion/palazzo";

const NAV_LINKS = [
  { label: "Kollektionen", href: `${BASE}/collections` },
  { label: "Produkte", href: `${BASE}/products` },
  { label: "Lookbook", href: `${BASE}/lookbook` },
  { label: "Über Uns", href: `${BASE}/about` },
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
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? "auto" : "none",
        }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-md flex-col shadow-2xl transition-transform duration-400 ease-out"
        style={{
          backgroundColor: "var(--pz-black)",
          transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: "var(--pz-charcoal)" }}>
          <h2
            className="text-sm font-normal uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-gold)" }}
          >
            Ihre Tasche ({itemCount})
          </h2>
          <button onClick={() => setIsCartOpen(false)} aria-label="Schließen">
            <X className="h-5 w-5" style={{ color: "var(--pz-ivory)" }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <ShoppingBag className="mb-4 h-10 w-10" style={{ color: "var(--pz-charcoal)" }} />
              <p
                className="text-sm font-light"
                style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-warm-gray)" }}
              >
                Ihre Tasche ist leer
              </p>
              <button
                onClick={() => { setIsCartOpen(false); router.push(`${BASE}/products`); }}
                className="mt-4 text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-gold)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Weiter Einkaufen
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 border-b pb-5"
                  style={{ borderColor: "var(--pz-charcoal)" }}
                >
                  {/* Product image with gradient fallback */}
                  <div
                    className="h-24 w-20 shrink-0 relative"
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
                        className="text-sm font-normal leading-snug"
                        style={{ fontFamily: "var(--pz-font-serif)", color: "var(--pz-ivory)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="mt-1 text-xs font-light"
                        style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-warm-gray)" }}
                      >
                        {item.size} / {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center border transition-colors hover:bg-[var(--pz-charcoal)]"
                          style={{ borderColor: "var(--pz-charcoal)" }}
                        >
                          <Minus className="h-3 w-3" style={{ color: "var(--pz-ivory)" }} />
                        </button>
                        <span
                          className="w-6 text-center text-xs"
                          style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-ivory)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center border transition-colors hover:bg-[var(--pz-charcoal)]"
                          style={{ borderColor: "var(--pz-charcoal)" }}
                        >
                          <Plus className="h-3 w-3" style={{ color: "var(--pz-ivory)" }} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className="text-sm font-light"
                          style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-ivory)" }}
                        >
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          aria-label="Artikel entfernen"
                          className="transition-opacity hover:opacity-60"
                        >
                          <Trash2 className="h-3.5 w-3.5" style={{ color: "var(--pz-warm-gray)" }} />
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
          <div className="border-t px-6 py-5" style={{ borderColor: "var(--pz-charcoal)" }}>
            <div className="mb-4 flex items-center justify-between">
              <span
                className="text-xs uppercase tracking-[0.15em]"
                style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-warm-gray)" }}
              >
                Zwischensumme
              </span>
              <span
                className="text-base font-normal"
                style={{ fontFamily: "var(--pz-font-sans)", color: "var(--pz-ivory)" }}
              >
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={() => { setIsCartOpen(false); router.push(`${BASE}/cart`); }}
              className="w-full py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--pz-font-sans)",
                backgroundColor: "var(--pz-gold)",
                color: "var(--pz-black)",
              }}
            >
              Zur Kasse
            </button>

            <button
              onClick={() => { setIsCartOpen(false); router.push(`${BASE}/products`); }}
              className="mt-3 w-full py-2 text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-gold)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Weiter Einkaufen
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
  const router = useRouter();

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
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: "var(--pz-black)",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Top announcement bar */}
        <div
          className="relative flex items-center justify-center py-2"
          style={{ backgroundColor: "var(--pz-charcoal)" }}
        >
          <p
            className="text-[10px] font-normal uppercase tracking-[0.15em] sm:tracking-[0.2em] sm:text-xs"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-gold)",
            }}
          >
            <span className="sm:hidden">Gratis Versand ab 500&nbsp;&euro;</span>
            <span className="hidden sm:inline">Kostenloser Versand &amp; Retoure ab einem Bestellwert von 500&nbsp;&euro;</span>
          </p>
        </div>

        {/* Main navigation row */}
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Left: Desktop nav links */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs font-normal uppercase tracking-[0.15em] transition-colors duration-300"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-ivory)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--pz-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--pz-ivory)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu
              className="h-5 w-5"
              style={{ color: "var(--pz-ivory)" }}
            />
          </button>

          {/* Center: Logo */}
          <Link
            href={BASE}
            className="absolute left-1/2 -translate-x-1/2 transition-colors duration-300 text-[15px] tracking-[0.12em] sm:text-xl sm:tracking-[0.18em] md:text-2xl"
            style={{
              fontFamily: "var(--pz-font-serif)",
              color: "var(--pz-gold)",
              whiteSpace: "nowrap",
            }}
          >
            PALAZZO
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              aria-label="Suche"
              className="hidden transition-colors duration-300 sm:block"
              style={{ color: "var(--pz-ivory)" }}
              onClick={() => router.push(`${BASE}/products`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--pz-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--pz-ivory)";
              }}
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              aria-label="Wunschliste"
              className="relative transition-colors duration-300"
              style={{ color: "var(--pz-ivory)" }}
              onClick={() => router.push(`${BASE}/wishlist`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--pz-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--pz-ivory)";
              }}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-medium"
                  style={{
                    fontFamily: "var(--pz-font-sans)",
                    backgroundColor: "var(--pz-burgundy)",
                    color: "var(--pz-ivory)",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              aria-label="Warenkorb"
              className="relative transition-colors duration-300"
              style={{ color: "var(--pz-ivory)" }}
              onClick={() => setIsCartOpen(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--pz-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--pz-ivory)";
              }}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-medium"
                  style={{
                    fontFamily: "var(--pz-font-sans)",
                    backgroundColor: "var(--pz-gold)",
                    color: "var(--pz-black)",
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart drawer */}
      <CartDrawer />

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div
            className="absolute bottom-0 left-0 top-0 w-72 p-8 shadow-xl"
            style={{ backgroundColor: "var(--pz-black)" }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="mb-10"
              aria-label="Menü schließen"
            >
              <X className="h-5 w-5" style={{ color: "var(--pz-ivory)" }} />
            </button>

            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-normal uppercase tracking-[0.15em] transition-colors duration-300"
                  style={{
                    fontFamily: "var(--pz-font-serif)",
                    color: "var(--pz-ivory)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Gold divider */}
            <div
              className="my-8 h-px"
              style={{ backgroundColor: "var(--pz-gold)" }}
            />

            <p
              className="text-xs font-light tracking-wide"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
              }}
            >
              Kostenloser Versand ab 500&nbsp;&euro; Bestellwert
            </p>
          </div>
        </div>
      )}
    </>
  );
}
