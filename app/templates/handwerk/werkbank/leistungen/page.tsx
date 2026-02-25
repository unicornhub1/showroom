'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { TreePine, Home, Wrench, DoorOpen, Leaf, Layers } from 'lucide-react';
import { services } from '../_design/data';

const BASE = '/templates/handwerk/werkbank';

/* ── ServiceIcon ─────────────────────────────────────────────── */
function ServiceIcon({ name, className = 'h-8 w-8' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    'tree-pine': <TreePine className={className} />,
    home: <Home className={className} />,
    wrench: <Wrench className={className} />,
    'door-open': <DoorOpen className={className} />,
    leaf: <Leaf className={className} />,
    stairs: <Layers className={className} />,
  };
  return <>{icons[name] || null}</>;
}

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

/* ── Leistungen Page ──────────────────────────────────────────── */

export default function LeistungenPage() {
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
            top: '10%',
            right: '5%',
            width: '200px',
            height: '200px',
            border: '1px solid rgba(212, 165, 116, 0.06)',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}
        >
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
              Was wir tun
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
              Unsere Leistungen
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
              Vom Einzelmöbel bis zum kompletten Innenausbau — sechs Bereiche,
              eine Leidenschaft: Holz in Perfektion.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '80px 24px', backgroundColor: 'var(--wb-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {services.map((service, i) => {
            const isEven = i % 2 === 0;

            return (
              <FadeIn key={service.id}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isEven ? '1fr 1.1fr' : '1.1fr 1fr',
                    gap: '48px',
                    alignItems: 'center',
                    padding: '56px 0',
                    borderBottom: i < services.length - 1 ? '1px solid var(--wb-divider)' : 'none',
                  }}
                  className="max-md:grid-cols-1"
                >
                  {/* Gradient placeholder */}
                  <div
                    style={{
                      order: isEven ? 0 : 1,
                      background: service.gradient,
                      borderRadius: '6px',
                      height: '320px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    className="max-md:order-none"
                  >
                    <span
                      style={{
                        opacity: 0.25,
                        color: 'var(--wb-accent)',
                      }}
                    >
                      <ServiceIcon name={service.icon} className="h-16 w-16" />
                    </span>
                    {/* Subtle overlay pattern */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.02) 30px, rgba(255,255,255,0.02) 31px)',
                      }}
                    />
                  </div>

                  {/* Text content */}
                  <div
                    style={{
                      order: isEven ? 1 : 0,
                    }}
                    className="max-md:order-none"
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        marginBottom: '16px',
                      }}
                    >
                      <span style={{ color: 'var(--wb-accent)' }}><ServiceIcon name={service.icon} className="h-6 w-6" /></span>
                      <h2
                        style={{
                          fontFamily: 'var(--wb-font-display)',
                          fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                          fontWeight: 700,
                          color: 'var(--wb-dark)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {service.name}
                      </h2>
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '1rem',
                        color: 'var(--wb-muted)',
                        lineHeight: 1.75,
                        marginBottom: '24px',
                      }}
                    >
                      {service.description}
                    </p>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px 16px',
                      }}
                      className="max-sm:grid-cols-1"
                    >
                      {service.details.map((detail) => (
                        <div
                          key={detail}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontFamily: 'var(--wb-font-body)',
                            fontSize: '0.85rem',
                            color: 'var(--wb-text)',
                            lineHeight: 1.5,
                            padding: '4px 0',
                          }}
                        >
                          <span
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--wb-accent)',
                              flexShrink: 0,
                              marginTop: '7px',
                            }}
                          />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
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
              Sie haben ein Projekt im Kopf?
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
              Lassen Sie uns gemeinsam herausfinden, wie wir Ihre Idee verwirklichen können.
              Das erste Gespräch ist selbstverständlich kostenlos.
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
              Jetzt Kontakt aufnehmen
              <span>&rarr;</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
