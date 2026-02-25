import type { Metadata } from "next";
import { Tenor_Sans, EB_Garamond } from "next/font/google";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tenor-sans",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-eb-garamond",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "HAVEN | Boutique Hotel & Spa",
  description:
    "Exklusives Boutique-Hotel mit Spa, Gourmet-Restaurant und Naturerlebnis. Wo die Zeit still steht.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function HavenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${tenorSans.variable} ${ebGaramond.variable}`}
      style={
        {
          "--hv-font-display":
            'var(--font-tenor-sans), "Helvetica Neue", sans-serif',
          "--hv-font-body": 'var(--font-eb-garamond), "Georgia", serif',
          backgroundColor: "var(--hv-bg)",
          color: "var(--hv-text)",
          fontFamily: "var(--hv-font-body)",
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
