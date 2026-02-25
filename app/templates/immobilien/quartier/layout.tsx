import type { Metadata } from "next";
import { Syne, Figtree } from "next/font/google";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "QUARTIER | Immobilien neu gedacht",
  description:
    "Premium Immobilienvermittlung. Kauf, Verkauf und Beratung auf höchstem Niveau.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function QuartierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${syne.variable} ${figtree.variable}`}
      style={
        {
          "--qt-font-display":
            'var(--font-syne), "Helvetica Neue", sans-serif',
          "--qt-font-body":
            'var(--font-figtree), "Helvetica Neue", sans-serif',
          backgroundColor: "var(--qt-bg)",
          color: "var(--qt-text)",
          fontFamily: "var(--qt-font-body)",
          minHeight: "100vh",
        } as React.CSSProperties
      }
    >
      <Navbar />
      <main className="pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
