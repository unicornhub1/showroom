import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { CartProvider } from "./_design/components/CartProvider";
import { WishlistProvider } from "./_design/components/WishlistProvider";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "AURUM | Feiner Schmuck",
  description:
    "Zeitloser feiner Schmuck — handgefertigt mit Hingabe. Ringe, Ketten, Ohrringe und Armbänder aus edlen Materialien.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function JewelryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${cormorant.variable} ${outfit.variable}`}
      style={{
        '--au-font-serif': 'var(--font-cormorant-garamond), Georgia, serif',
        '--au-font-sans': 'var(--font-outfit), "Helvetica Neue", sans-serif',
        backgroundColor: "var(--au-white)",
        color: "var(--au-black)",
        fontFamily: "var(--au-font-sans)",
        minHeight: "100vh",
      } as React.CSSProperties}
    >
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <main className="pt-[120px] md:pt-[140px]">{children}</main>
          <Footer />
        </WishlistProvider>
      </CartProvider>
    </div>
  );
}
