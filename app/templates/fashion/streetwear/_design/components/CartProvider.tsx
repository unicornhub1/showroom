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

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  gradient: string;
  image?: string;
  quantity: number;
}

export interface AddItemInput {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  gradient: string;
  image?: string;
  quantity?: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (input: AddItemInput) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ── Storage key ───────────────────────────────────────────────────────── */
const STORAGE_KEY = "vltg-cart";

/* ── Toast notification ────────────────────────────────────────────────── */

interface ToastData {
  id: number;
  productName: string;
}

function Toast({
  productName,
  onDismiss,
}: {
  productName: string;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className="kr-slide-in pointer-events-auto flex items-stretch overflow-hidden"
      style={{
        backgroundColor: "var(--kr-dark)",
        border: "1px solid var(--kr-charcoal)",
        boxShadow: "4px 4px 0px var(--kr-neon)",
        maxWidth: 360,
      }}
    >
      {/* Neon accent bar */}
      <div
        className="w-1 shrink-0"
        style={{ backgroundColor: "var(--kr-neon)" }}
      />

      <div className="px-4 py-3">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{
            fontFamily: "var(--kr-font-mono)",
            color: "var(--kr-neon)",
          }}
        >
          + Hinzugefügt
        </p>
        <p
          className="mt-1 text-sm"
          style={{
            fontFamily: "var(--kr-font-body)",
            color: "var(--kr-text)",
          }}
        >
          {productName} liegt im Warenkorb
        </p>
      </div>
    </div>
  );
}

/* ── Provider ──────────────────────────────────────────────────────────── */

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /* Hydrate from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  /* Persist to localStorage */
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  /* Add item */
  const addItem = useCallback((input: AddItemInput) => {
    const qty = input.quantity ?? 1;

    setItems((prev) => {
      const idx = prev.findIndex(
        (i) =>
          i.productId === input.productId &&
          i.size === input.size &&
          i.color === input.color
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [
        ...prev,
        {
          productId: input.productId,
          name: input.name,
          price: input.price,
          size: input.size,
          color: input.color,
          gradient: input.gradient,
          image: input.image,
          quantity: qty,
        },
      ];
    });

    /* Show toast */
    const toastId = Date.now();
    setToasts((prev) => [
      ...prev,
      { id: toastId, productName: input.name },
    ]);
  }, []);

  /* Remove item */
  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.productId === productId &&
              i.size === size &&
              i.color === color
            )
        )
      );
    },
    []
  );

  /* Update quantity */
  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size && i.color === color
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  /* Computed values */
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      total,
      itemCount,
      isCartOpen,
      setIsCartOpen,
    }),
    [items, addItem, removeItem, updateQuantity, total, itemCount, isCartOpen]
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Toast container */}
      <div className="pointer-events-none fixed right-6 top-28 z-[60] flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            productName={toast.productName}
            onDismiss={() => dismissToast(toast.id)}
          />
        ))}
      </div>
    </CartContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────────────────────── */

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
