import type { Metadata } from "next";
import { Bitter, Fira_Sans } from "next/font/google";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts ─────────────────────────────────────────────────────── */

const bitter = Bitter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bitter",
  display: "swap",
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fira-sans",
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "WERKBANK | Meisterbetrieb für Holz & Innenausbau",
  description:
    "Schreinerei & Meisterbetrieb. Individuelle Möbel, Innenausbau und Restaurierung in höchster Qualität.",
};

/* ── Layout ────────────────────────────────────────────────────── */

export default function WerkbankLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${bitter.variable} ${firaSans.variable}`}
      style={
        {
          "--wb-font-display":
            'var(--font-bitter), "Rockwell", serif',
          "--wb-font-body":
            'var(--font-fira-sans), "Helvetica Neue", sans-serif',
          backgroundColor: "var(--wb-bg)",
          color: "var(--wb-text)",
          fontFamily: "var(--wb-font-body)",
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
