import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import Header from "./_design/components/Header";
import Footer from "./_design/components/Footer";
import "./_design/tokens.css";

/* ── Fonts: Newsreader (Serif mit optischen Größen) + Instrument Sans (Bedienung) ── */

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. med. Svea Ellerwald | Frauenmedizin in Berlin-Mitte",
  description:
    "Privatpraxis für integrative Frauenmedizin: Zyklus, Kinderwunsch, Schwangerschaft und Wechseljahre. Schulmedizin und Naturheilkunde aus einer Hand.",
};

export default function EllerwaldLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`ew-root ${newsreader.variable} ${instrument.variable}`}
      style={
        {
          "--ew-font-serif": 'var(--font-newsreader), "Iowan Old Style", Georgia, serif',
          "--ew-font-sans": 'var(--font-instrument), "Helvetica Neue", Arial, sans-serif',
          backgroundColor: "var(--ew-puder)",
          color: "var(--ew-pflaume)",
          fontFamily: "var(--ew-font-serif)",
          minHeight: "100vh",
        } as React.CSSProperties
      }
    >
      <a href="#inhalt" className="ew-skip">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt">{children}</main>
      <Footer />
    </div>
  );
}
