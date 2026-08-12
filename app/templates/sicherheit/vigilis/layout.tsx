import type { Metadata } from 'next';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import { Navbar } from './_design/components/Navbar';
import { Footer } from './_design/components/Footer';
import './_design/tokens.css';

const display = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VIGILIS — Objektschutz & Sicherheitsdienste',
  description:
    'Objektschutz, Streifendienst und Alarmverfolgung für Gewerbeobjekte. Preis in zwei Minuten online kalkulieren.',
};

export default function VigilisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      style={
        {
          '--vg-font-display': 'var(--font-archivo), "Helvetica Neue", sans-serif',
          '--vg-font-body': 'var(--font-inter), "Helvetica Neue", sans-serif',
          '--vg-font-mono': 'var(--font-jetbrains), "SF Mono", monospace',
          backgroundColor: 'var(--vg-bg)',
          color: 'var(--vg-text)',
          fontFamily: 'var(--font-inter), sans-serif',
          minHeight: '100vh',
        } as React.CSSProperties
      }
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
