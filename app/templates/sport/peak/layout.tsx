import type { Metadata } from 'next';
import { Archivo_Black, Work_Sans } from 'next/font/google';
import Navbar from './_design/components/Navbar';
import Footer from './_design/components/Footer';
import './_design/tokens.css';

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-archivo-black',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PRSM Athletics | Fitness Studio',
  description:
    'Dein Premium Fitness Studio. Functional Training, HIIT, Kraft und mehr. Kein Limit.',
};

export default function PRSMLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${archivoBlack.variable} ${workSans.variable}`}
      style={
        {
          '--pk-font-display':
            'var(--font-archivo-black), "Impact", sans-serif',
          '--pk-font-body':
            'var(--font-work-sans), "Helvetica Neue", sans-serif',
          backgroundColor: 'var(--pk-bg)',
          color: 'var(--pk-text)',
          fontFamily: 'var(--pk-font-body)',
          minHeight: '100vh',
        } as React.CSSProperties
      }
    >
      <Navbar />
      <main className="pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
