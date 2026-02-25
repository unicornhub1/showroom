import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import { CartProvider } from "./_design/components/CartProvider";
import { WishlistProvider } from "./_design/components/WishlistProvider";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-raleway",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Maison Élégance | Luxusmode",
  description:
    "Zeitlose Luxusmode — kuratierte Kollektionen makellos gefertigter Kleidung und Accessoires.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function EleganceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${playfair.variable} ${raleway.variable}`}
      style={{
        '--el-font-serif': 'var(--font-playfair-display), Georgia, serif',
        '--el-font-sans': 'var(--font-raleway), "Helvetica Neue", sans-serif',
        backgroundColor: "var(--el-cream)",
        color: "var(--el-black)",
        fontFamily: "var(--el-font-sans)",
        minHeight: "100vh",
      } as React.CSSProperties}
    >
      <WishlistProvider>
        <CartProvider>
          <Navbar />
          <main className="pt-[92px]">{children}</main>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </div>
  );
}
