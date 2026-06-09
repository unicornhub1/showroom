import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts: Serif-Display (Geschichte) + moderne Sans (Moderne) ─────────── */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GUT ROSENAU | Landgut · Hotel · Restaurant · Hochzeiten",
  description:
    "Historisches Landgut, modern interpretiert: Boutique-Hotel, Farm-to-table-Restaurant und stilvolle Hochzeiten in Scheune und Rosengarten.",
};

export default function GutRosenauLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${cormorant.variable} ${jost.variable}`}
      style={
        {
          "--ro-font-display": 'var(--font-cormorant), "Georgia", serif',
          "--ro-font-sans": 'var(--font-jost), "Helvetica Neue", sans-serif',
          backgroundColor: "var(--ro-bg)",
          color: "var(--ro-text)",
          fontFamily: "var(--ro-font-sans)",
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
