"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/* ── Types ─────────────────────────────────────────────────────────────── */

interface WishlistContextValue {
  wishlistItems: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

/* ── Storage key ───────────────────────────────────────────────────────── */
const STORAGE_KEY = "vltg-wishlist";

/* ── Provider ──────────────────────────────────────────────────────────── */

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /* Hydrate from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWishlistItems(JSON.parse(stored));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  /* Persist to localStorage */
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, hydrated]);

  /* Toggle wishlist item */
  const toggleWishlist = useCallback((productId: string) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  /* Check if item is in wishlist */
  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistItems.includes(productId);
    },
    [wishlistItems]
  );

  const wishlistCount = useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

  const value = useMemo<WishlistContextValue>(
    () => ({
      wishlistItems,
      wishlistCount,
      toggleWishlist,
      isInWishlist,
    }),
    [wishlistItems, wishlistCount, toggleWishlist, isInWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────────────────────── */

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
