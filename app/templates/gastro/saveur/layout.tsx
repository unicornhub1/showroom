import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────────────── */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-karla",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "SAVEUR | Restaurant & Fine Dining",
  description:
    "Kulinarische Exzellenz in warmem Ambiente. Gehobene K\u00FCche mit Leidenschaft und Handwerk.",
};

/* ── Layout ────────────────────────────────────────────────────────────── */

export default function SaveurLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${fraunces.variable} ${karla.variable}`}
      style={
        {
          "--sv-font-display":
            'var(--font-fraunces), "Georgia", serif',
          "--sv-font-body":
            'var(--font-karla), "Helvetica Neue", sans-serif',
          backgroundColor: "var(--sv-bg)",
          color: "var(--sv-text)",
          fontFamily: "var(--sv-font-body)",
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
