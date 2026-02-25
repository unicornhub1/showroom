import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CartProvider } from "./_design/components/CartProvider";
import { WishlistProvider } from "./_design/components/WishlistProvider";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "JARDIN | Zeitgenössische französische Mode",
  description:
    "Zeitgenössische französische Lifestyle-Mode -- nachhaltig gefertigt, inspiriert von der Natur.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function JardinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${cormorant.variable} ${jost.variable}`}
      style={{
        '--jd-font-serif': 'var(--font-cormorant-garamond), Georgia, serif',
        '--jd-font-sans': 'var(--font-jost), "Helvetica Neue", sans-serif',
        backgroundColor: "var(--jd-cream)",
        color: "var(--jd-charcoal)",
        fontFamily: "var(--jd-font-sans)",
        minHeight: "100vh",
      } as React.CSSProperties}
    >
      <WishlistProvider>
        <CartProvider>
          <Navbar />
          <main className="pt-[88px]">{children}</main>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </div>
  );
}
