import type { Metadata } from 'next';
import { Libre_Baskerville, Source_Sans_3 } from 'next/font/google';
import { Navbar } from './_design/components/Navbar';
import { Footer } from './_design/components/Footer';
import './_design/tokens.css';

const serif = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

const sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THORNFIELD — Fine Scotch Whiskey',
  description: 'Traditionelle Whiskey-Destillerie seit 1928.',
};

export default function ThornfieldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${serif.variable} ${sans.variable}`}
      style={
        {
          '--tf-font-serif': 'var(--font-libre-baskerville), Georgia, serif',
          '--tf-font-sans': 'var(--font-source-sans), "Helvetica Neue", sans-serif',
          backgroundColor: 'var(--tf-bg)',
          color: 'var(--tf-cream)',
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
