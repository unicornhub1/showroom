import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Manrope } from "next/font/google";
import Navbar from "./_design/components/Navbar";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts: Grotesk-Display + Mono-Labels + Sans-Body ──────────────────────
   Minimalistischer Architektur-/Designstudio-Look. */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPEICHER No.7 | Speicher · Hotel · Bar · Restaurant",
  description:
    "Ein historischer Hafen-Speicher von 1911, loftig-modern umgebaut: Design-Hotel, Open-Kitchen-Restaurant und eine Bar mit Hafenblick. Hell und luftig mit Backstein-Akzenten am Wasser.",
};

export default function SpeicherNo7Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${manrope.variable}`}
      style={
        {
          "--sp-font-display": 'var(--font-space-grotesk), "Helvetica Neue", sans-serif',
          "--sp-font-mono": 'var(--font-space-mono), "Courier New", monospace',
          "--sp-font-sans": 'var(--font-manrope), "Helvetica Neue", sans-serif',
          backgroundColor: "var(--sp-bg)",
          color: "var(--sp-text)",
          fontFamily: "var(--sp-font-sans)",
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
