import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import { CartProvider } from "./_design/components/CartProvider";
import { WishlistProvider } from "./_design/components/WishlistProvider";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "KRSN | Streetwear & Sneakers",
  description:
    "Streetwear ohne Kompromisse. Limitierte Drops, Premium Sneakers und urbane Essentials.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function StreetWearLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      style={{
        "--kr-font-heading": 'var(--font-bebas-neue), "Impact", sans-serif',
        "--kr-font-body": 'var(--font-dm-sans), "Helvetica Neue", sans-serif',
        "--kr-font-mono":
          'var(--font-jetbrains-mono), "Courier New", monospace',
        backgroundColor: "var(--kr-black)",
        color: "var(--kr-text)",
        fontFamily: "var(--kr-font-body)",
        minHeight: "100vh",
      } as React.CSSProperties}
    >
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <main className="pt-[88px]">{children}</main>
          <Footer />
        </WishlistProvider>
      </CartProvider>
    </div>
  );
}
