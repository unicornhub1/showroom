'use client'

import Link from 'next/link'
import { RingSizeFinder } from '../_design/components/RingSizeFinder'

const BASE = '/templates/fashion/jewelry'

export default function RingSizeGuidePage() {
  return (
    <main
      className="min-h-screen pb-24"
      style={{ backgroundColor: 'var(--au-white)' }}
    >
      <div className="mx-auto max-w-3xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-10 pt-4">
          <ol
            className="flex items-center gap-2 text-[11px] tracking-wider"
            style={{
              fontFamily: 'var(--au-font-sans)',
              color: 'var(--au-muted)',
              fontWeight: 300,
            }}
          >
            <li>
              <Link
                href={BASE}
                className="transition-colors duration-300 hover:text-[var(--au-gold)]"
              >
                Home
              </Link>
            </li>
            <li style={{ opacity: 0.4 }}>/</li>
            <li style={{ color: 'var(--au-black)' }}>Ringgrößen-Guide</li>
          </ol>
        </nav>

        {/* Page heading */}
        <div className="mb-16 text-center">
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.3em]"
            style={{
              fontFamily: 'var(--au-font-sans)',
              color: 'var(--au-gold)',
              fontWeight: 400,
            }}
          >
            AURUM
          </p>

          <h1
            className="mb-4 text-3xl md:text-4xl"
            style={{
              fontFamily: 'var(--au-font-serif)',
              color: 'var(--au-black)',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            Ringgrößen-Guide
          </h1>

          <p
            className="mx-auto max-w-md text-sm leading-relaxed"
            style={{
              fontFamily: 'var(--au-font-sans)',
              color: 'var(--au-charcoal)',
              fontWeight: 300,
            }}
          >
            Finden Sie Ihre perfekte Ringgröße mit unserem interaktiven Werkzeug.
            Legen Sie einen vorhandenen Ring auf den Bildschirm oder nutzen Sie
            unsere Größentabelle.
          </p>

          {/* Decorative divider */}
          <div className="mt-8 flex items-center justify-center">
            <div
              className="h-px w-10"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.4 }}
            />
            <div
              className="mx-3 h-1 w-1 rotate-45"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.4 }}
            />
            <div
              className="h-px w-10"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.4 }}
            />
          </div>
        </div>

        {/* Ring Size Finder Component */}
        <RingSizeFinder />

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="mb-6 flex items-center justify-center">
            <div
              className="h-px w-8"
              style={{ backgroundColor: 'var(--au-line)' }}
            />
            <div
              className="mx-3 h-1 w-1 rotate-45"
              style={{ backgroundColor: 'var(--au-gold)', opacity: 0.5 }}
            />
            <div
              className="h-px w-8"
              style={{ backgroundColor: 'var(--au-line)' }}
            />
          </div>

          <p
            className="mb-6 text-sm"
            style={{
              fontFamily: 'var(--au-font-sans)',
              color: 'var(--au-charcoal)',
              fontWeight: 300,
            }}
          >
            Bereit, Ihren Ring zu finden?
          </p>

          <Link
            href={`${BASE}/products?category=Ringe`}
            className="inline-block px-10 py-3.5 text-[10px] uppercase tracking-[0.25em] transition-opacity duration-400 hover:opacity-90"
            style={{
              fontFamily: 'var(--au-font-sans)',
              backgroundColor: 'var(--au-black)',
              color: 'var(--au-white)',
              fontWeight: 400,
            }}
          >
            Ringe entdecken
          </Link>
        </div>
      </div>
    </main>
  )
}
