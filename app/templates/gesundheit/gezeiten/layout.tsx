import type { Metadata } from "next";
import { Hedvig_Letters_Serif, Figtree } from "next/font/google";
import Header from "./_design/components/Header";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts: Hedvig Letters Serif (ruhig, skandinavisch) + Figtree (freundlich, klar) ── */

const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-hedvig",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gezeiten | Osteopathie & Naturheilkunde in Berlin-Mitte",
  description:
    "Osteopathie und Naturheilkunde für Erwachsene, Babys und Kinder. Sanfte Behandlung bei Rücken, Kiefer, Kopfschmerzen, nach der Geburt und bei Erschöpfung.",
};

export default function GezeitenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`gz-root ${hedvig.variable} ${figtree.variable}`}
      style={
        {
          "--gz-font-serif": 'var(--font-hedvig), "Iowan Old Style", Georgia, serif',
          "--gz-font-sans": 'var(--font-figtree), "Helvetica Neue", Arial, sans-serif',
          backgroundColor: "var(--gz-nebel)",
          color: "var(--gz-moos)",
          fontFamily: "var(--gz-font-sans)",
          minHeight: "100vh",
        } as React.CSSProperties
      }
    >
      <a href="#inhalt" className="gz-skip">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt">{children}</main>
      <Footer />
    </div>
  );
}
