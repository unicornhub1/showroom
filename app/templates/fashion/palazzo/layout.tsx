import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "./_design/components/CartProvider";
import { WishlistProvider } from "./_design/components/WishlistProvider";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "PALAZZO | Italienische Luxusmode",
  description:
    "Dunkel. Dramatisch. Opulent. Italienische Luxusmode mit kompromissloser Handwerkskunst und zeitloser Eleganz.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function PalazzoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${dmSerif.variable} ${plusJakarta.variable}`}
      style={{
        '--pz-font-serif': 'var(--font-dm-serif-display), Georgia, serif',
        '--pz-font-sans': 'var(--font-plus-jakarta-sans), "Helvetica Neue", sans-serif',
        backgroundColor: "var(--pz-black)",
        color: "var(--pz-ivory)",
        fontFamily: "var(--pz-font-sans)",
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
