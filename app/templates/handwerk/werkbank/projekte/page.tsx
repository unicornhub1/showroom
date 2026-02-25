'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { projects, CATEGORY_LABELS, type ProjectCategory } from '../_design/data';

const BASE = '/templates/handwerk/werkbank';

/* ── FadeIn ───────────────────────────────────────────────────── */

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Projects Content ─────────────────────────────────────────── */

function ProjekteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeFilter = (searchParams.get('kategorie') as ProjectCategory | null) || null;

  const filtered = activeFilter
    ? projects.filter((p) => p.category === activeFilter)
    : projects;

  const setFilter = (cat: ProjectCategory | null) => {
    if (cat) {
      router.push(`${BASE}/projekte?kategorie=${cat}`, { scroll: false });
    } else {
      router.push(`${BASE}/projekte`, { scroll: false });
    }
  };

  const categories = Object.keys(CATEGORY_LABELS) as ProjectCategory[];

  return (
    <>
      {/* Page Header */}
      <section
        style={{
          padding: '80px 24px 60px',
          background: 'linear-gradient(160deg, var(--wb-dark) 0%, #2C1E14 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-5%',
            width: '300px',
            height: '300px',
            border: '1px solid rgba(212, 165, 116, 0.05)',
            borderRadius: '50%',
          }}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <FadeIn>
            <span
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--wb-forge)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  width: '30px',
                  height: '2px',
                  background: 'var(--wb-forge)',
                  display: 'inline-block',
                }}
              />
              Portfolio
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: '#F5EDE3',
                marginTop: '16px',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Unsere Projekte
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '1.05rem',
                color: 'rgba(245, 237, 227, 0.6)',
                marginTop: '16px',
                maxWidth: '550px',
                lineHeight: 1.7,
              }}
            >
              Jedes Projekt erzählt eine Geschichte. Entdecken Sie eine Auswahl unserer Arbeiten
              aus den Bereichen Möbelbau, Innenausbau und Restaurierung.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ padding: '60px 24px 100px', backgroundColor: 'var(--wb-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Filters */}
          <FadeIn>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '48px',
              }}
            >
              <button
                onClick={() => setFilter(null)}
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.85rem',
                  fontWeight: activeFilter === null ? 600 : 400,
                  color: activeFilter === null ? '#fff' : 'var(--wb-text)',
                  backgroundColor: activeFilter === null ? 'var(--wb-accent)' : 'var(--wb-card)',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                }}
                className={activeFilter === null ? '' : 'hover:bg-[var(--wb-card-hover)]'}
              >
                Alle
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    fontFamily: 'var(--wb-font-body)',
                    fontSize: '0.85rem',
                    fontWeight: activeFilter === cat ? 600 : 400,
                    color: activeFilter === cat ? '#fff' : 'var(--wb-text)',
                    backgroundColor: activeFilter === cat ? 'var(--wb-accent)' : 'var(--wb-card)',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                  }}
                  className={activeFilter === cat ? '' : 'hover:bg-[var(--wb-card-hover)]'}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Masonry-like grid */}
          <div
            style={{
              columns: '2',
              columnGap: '24px',
            }}
            className="max-md:columns-1"
          >
            {filtered.map((project, i) => {
              // Vary heights for masonry effect
              const heights = ['340px', '280px', '380px', '300px', '320px', '260px', '360px', '290px', '350px', '310px'];
              const height = heights[i % heights.length];

              return (
                <FadeIn key={project.id} delay={Math.min(i * 0.08, 0.5)}>
                  <div
                    style={{
                      breakInside: 'avoid',
                      marginBottom: '24px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'transform 0.4s ease',
                      cursor: 'default',
                    }}
                    className="hover:scale-[1.01] group"
                  >
                    <div
                      style={{
                        background: project.gradient,
                        height,
                        position: 'relative',
                      }}
                    >
                      {/* Content overlay at bottom */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '28px',
                          background: 'linear-gradient(transparent, rgba(61, 43, 31, 0.85))',
                        }}
                      >
                        {/* Category badge */}
                        <span
                          style={{
                            fontFamily: 'var(--wb-font-body)',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--wb-forge)',
                            backgroundColor: 'rgba(61, 43, 31, 0.6)',
                            padding: '3px 10px',
                            borderRadius: '3px',
                            display: 'inline-block',
                            marginBottom: '10px',
                          }}
                        >
                          {CATEGORY_LABELS[project.category]}
                        </span>

                        <h3
                          style={{
                            fontFamily: 'var(--wb-font-display)',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: '#F5EDE3',
                            marginBottom: '6px',
                          }}
                        >
                          {project.title}
                        </h3>

                        <p
                          style={{
                            fontFamily: 'var(--wb-font-body)',
                            fontSize: '0.82rem',
                            color: 'rgba(245, 237, 227, 0.65)',
                            lineHeight: 1.6,
                            marginBottom: '8px',
                          }}
                        >
                          {project.description}
                        </p>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--wb-font-body)',
                              fontSize: '0.75rem',
                              color: 'rgba(245, 237, 227, 0.45)',
                            }}
                          >
                            {project.location}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--wb-font-body)',
                              fontSize: '0.75rem',
                              color: 'rgba(245, 237, 227, 0.45)',
                            }}
                          >
                            {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Hover border */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          border: '3px solid transparent',
                          borderRadius: '6px',
                          transition: 'border-color 0.4s ease',
                        }}
                        className="group-hover:border-[var(--wb-accent)]"
                      />
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <FadeIn>
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 24px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--wb-font-display)',
                    fontSize: '1.3rem',
                    color: 'var(--wb-muted)',
                  }}
                >
                  Keine Projekte in dieser Kategorie gefunden.
                </p>
                <button
                  onClick={() => setFilter(null)}
                  style={{
                    marginTop: '16px',
                    fontFamily: 'var(--wb-font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--wb-accent)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textDecoration: 'underline',
                  }}
                >
                  Alle Projekte anzeigen
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 24px',
          backgroundColor: 'var(--wb-card)',
          textAlign: 'center',
        }}
      >
        <FadeIn>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--wb-dark)',
                marginBottom: '16px',
              }}
            >
              Ihr Projekt ist das nächste
            </h2>
            <p
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '1rem',
                color: 'var(--wb-muted)',
                lineHeight: 1.7,
                marginBottom: '32px',
              }}
            >
              Lassen Sie sich inspirieren und erzählen Sie uns von Ihrer Idee.
              Gemeinsam machen wir daraus Realität.
            </p>
            <Link
              href={`${BASE}/kontakt`}
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: 'var(--wb-accent)',
                textDecoration: 'none',
                padding: '14px 36px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
              }}
              className="hover:bg-[var(--wb-accent-hover)] hover:scale-[1.02]"
            >
              Projekt anfragen
              <span>&rarr;</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

/* ── Page Export (with Suspense for useSearchParams) ───────────── */

export default function ProjektePage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--wb-font-body)',
              fontSize: '0.9rem',
              color: 'var(--wb-muted)',
            }}
          >
            Projekte werden geladen...
          </span>
        </div>
      }
    >
      <ProjekteContent />
    </Suspense>
  );
}
