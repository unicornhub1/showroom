import type { Metadata } from "next";
import { Lexend, Crimson_Pro } from "next/font/google";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-crimson-pro",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "VITA | Praxis für Gesundheit",
  description:
    "Ihre moderne Arztpraxis. Ganzheitliche Medizin mit persönlicher Betreuung.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function VitaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${lexend.variable} ${crimsonPro.variable}`}
      style={
        {
          "--vt-font-display":
            'var(--font-lexend), "Helvetica Neue", sans-serif',
          "--vt-font-body":
            'var(--font-crimson-pro), "Georgia", serif',
          backgroundColor: "var(--vt-bg)",
          color: "var(--vt-text)",
          fontFamily: "var(--vt-font-body)",
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
