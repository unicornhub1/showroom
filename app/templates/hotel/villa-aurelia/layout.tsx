import type { Metadata } from "next";
import { Playfair_Display, Mulish } from "next/font/google";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts: Serif-Display (Geschichte) + moderne Sans (Moderne) ─────────── */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VILLA AURELIA | Stadtvilla · Hotel · Restaurant · Events",
  description:
    "Eine Gründerzeit-Stadtvilla von 1897, behutsam modernisiert: Design-Boutique-Hotel, Fine-Dining-Restaurant und festliche Event- und Hochzeitssäle.",
};

export default function VillaAureliaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${playfair.variable} ${mulish.variable}`}
      style={
        {
          "--va-font-display": 'var(--font-playfair), "Georgia", serif',
          "--va-font-sans": 'var(--font-mulish), "Helvetica Neue", sans-serif',
          backgroundColor: "var(--va-bg)",
          color: "var(--va-text)",
          fontFamily: "var(--va-font-sans)",
          minHeight: "100vh",
        } as React.CSSProperties
      }
    >
      <Navbar />
      <main className="pt-[68px]">{children}</main>
      <Footer />
    </div>
  );
}
