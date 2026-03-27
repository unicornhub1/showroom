import type { Metadata } from 'next';
import { DM_Serif_Display, Inter } from 'next/font/google';
import { Navbar } from './_design/components/Navbar';
import { Footer } from './_design/components/Footer';
import './_design/tokens.css';

const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MERIDIAN — Feine Uhrmacherkunst',
  description: 'An- und Verkauf erlesener Zeitmesser seit 1952.',
};

export default function MeridianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${serif.variable} ${sans.variable}`}
      style={
        {
          '--mr-font-serif': 'var(--font-dm-serif), Georgia, serif',
          '--mr-font-sans': 'var(--font-inter), "Helvetica Neue", sans-serif',
          backgroundColor: 'var(--mr-bg)',
          color: 'var(--mr-text)',
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
