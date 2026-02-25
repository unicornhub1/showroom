'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { TreePine, Home, Wrench, DoorOpen, Leaf, Layers, Cog, Diamond } from 'lucide-react';
import { services, projects, contactInfo } from './_design/data';

const BASE = '/templates/handwerk/werkbank';

/* ── ServiceIcon — Maps icon identifier to Lucide component ── */
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

/* ── FadeIn Component ────────────────────────────────────────── */

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

/* ── Homepage ────────────────────────────────────────────────── */

export default function WerkbankHome() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          1. WORKSHOP HERO
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="wb-wood-texture"
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(160deg, #F5EDE3 0%, #EDE5DA 30%, #D4C9BC 60%, #EDE5DA 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative geometric elements */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '8%',
            width: '340px',
            height: '340px',
            border: '2px solid var(--wb-forge)',
            borderRadius: '50%',
            opacity: 0.12,
            animation: 'wb-rotate-slow 60s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '12%',
            width: '240px',
            height: '240px',
            border: '1px solid var(--wb-accent)',
            opacity: 0.1,
            transform: 'rotate(45deg)',
            animation: 'wb-counter-spin 45s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '5%',
            width: '180px',
            height: '260px',
            background: 'linear-gradient(145deg, rgba(139, 94, 60, 0.06), rgba(212, 165, 116, 0.08))',
            borderRadius: '4px',
            border: '1px solid rgba(212, 165, 116, 0.12)',
          }}
        />
        {/* Decorative cross pattern top-left */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '5%',
            width: '60px',
            height: '1px',
            backgroundColor: 'var(--wb-accent)',
            opacity: 0.2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 'calc(20% - 30px)',
            left: 'calc(5% + 29px)',
            width: '1px',
            height: '60px',
            backgroundColor: 'var(--wb-accent)',
            opacity: 0.2,
          }}
        />

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '80px 24px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
          className="max-lg:grid-cols-1"
        >
          {/* Left: Text */}
          <div>
            <FadeIn>
              <div
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--wb-accent)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    width: '40px',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--wb-accent), var(--wb-forge))',
                    display: 'inline-block',
                  }}
                />
                Schreinerei & Meisterbetrieb
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(3.2rem, 7vw, 6rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                }}
              >
                WERK
                <br />
                <span
                  style={{
                    color: 'var(--wb-accent)',
                    position: 'relative',
                  }}
                >
                  BANK
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '100%',
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--wb-accent), var(--wb-forge), transparent)',
                      borderRadius: '2px',
                    }}
                  />
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  fontWeight: 400,
                  color: 'var(--wb-muted)',
                  marginTop: '24px',
                  marginBottom: '12px',
                  letterSpacing: '0.01em',
                  lineHeight: 1.5,
                }}
              >
                Meisterarbeit seit 1987
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '1.05rem',
                  fontWeight: 300,
                  color: 'var(--wb-muted)',
                  lineHeight: 1.75,
                  maxWidth: '460px',
                  marginBottom: '40px',
                }}
              >
                Individuelle Möbel, feiner Innenausbau und behutsame Restaurierung.
                Aus unserer Werkstatt in Stuttgart — für Menschen, die das Besondere suchen.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link
                  href={`${BASE}/projekte`}
                  style={{
                    fontFamily: 'var(--wb-font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#fff',
                    backgroundColor: 'var(--wb-accent)',
                    textDecoration: 'none',
                    padding: '14px 32px',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease',
                  }}
                  className="hover:bg-[var(--wb-accent-hover)] hover:scale-[1.02]"
                >
                  Unsere Projekte
                  <span style={{ fontSize: '1.1rem' }}>&rarr;</span>
                </Link>
                <Link
                  href={`${BASE}/kontakt`}
                  style={{
                    fontFamily: 'var(--wb-font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--wb-dark)',
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    padding: '14px 32px',
                    borderRadius: '4px',
                    border: '1.5px solid var(--wb-dark)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                  }}
                  className="hover:bg-[var(--wb-dark)] hover:text-[var(--wb-bg)]"
                >
                  Kontakt aufnehmen
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right: Decorative workshop composition */}
          <FadeIn delay={0.3} className="max-lg:hidden">
            <div style={{ position: 'relative', height: '520px' }}>
              {/* Main "image" placeholder */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '85%',
                  height: '380px',
                  background: 'linear-gradient(145deg, #8B5E3C, #D4A574, #EDE5DA)',
                  borderRadius: '6px',
                  boxShadow: '0 20px 60px rgba(61, 43, 31, 0.15)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <span style={{ opacity: 0.3 }}><Cog className="h-12 w-12" /></span>
                  <span
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 500,
                    }}
                  >
                    Werkstatt
                  </span>
                </div>
              </div>

              {/* Overlapping smaller card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '55%',
                  height: '220px',
                  background: 'linear-gradient(145deg, #3D2B1F, #5A6672, #8A7B6E)',
                  borderRadius: '6px',
                  boxShadow: '0 16px 48px rgba(61, 43, 31, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <span style={{ opacity: 0.3 }}><Diamond className="h-10 w-10" /></span>
                <span
                  style={{
                    fontFamily: 'var(--wb-font-body)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 500,
                  }}
                >
                  Detail
                </span>
              </div>

              {/* Accent strip */}
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '-20px',
                  width: '6px',
                  height: '120px',
                  background: 'linear-gradient(180deg, var(--wb-accent), var(--wb-forge))',
                  borderRadius: '3px',
                }}
              />

              {/* Small decorative badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '40px',
                  padding: '8px 16px',
                  backgroundColor: 'var(--wb-accent)',
                  borderRadius: '3px',
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Seit 1987
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            animation: 'wb-float 3s ease-in-out infinite',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--wb-font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--wb-muted)',
            }}
          >
            Entdecken
          </span>
          <span
            style={{
              width: '1px',
              height: '30px',
              backgroundColor: 'var(--wb-muted)',
              opacity: 0.4,
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. CRAFT PHILOSOPHY BAND
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: 'var(--wb-dark)',
          padding: '80px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        <FadeIn>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            {/* Top decorative line */}
            <div
              style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--wb-forge), transparent)',
                margin: '0 auto 40px',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 400,
                color: '#F5EDE3',
                lineHeight: 1.75,
                fontStyle: 'italic',
                letterSpacing: '0.01em',
              }}
            >
              &bdquo;Qualität ist kein Zufall. Sie entsteht durch Hingabe, Erfahrung und den Anspruch,
              jeden Tag besser zu werden.&ldquo;
            </p>

            <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <span
                style={{
                  width: '24px',
                  height: '1px',
                  backgroundColor: 'var(--wb-forge)',
                  opacity: 0.5,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--wb-forge)',
                  fontWeight: 500,
                }}
              >
                Heinrich Weller, Gründer
              </span>
              <span
                style={{
                  width: '24px',
                  height: '1px',
                  backgroundColor: 'var(--wb-forge)',
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Bottom decorative line */}
            <div
              style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--wb-forge), transparent)',
                margin: '40px auto 0',
              }}
            />
          </div>
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. LEISTUNGEN PREVIEW
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--wb-bg)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--wb-accent)',
                }}
              >
                Was wir tun
              </span>
              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  marginTop: '12px',
                  letterSpacing: '-0.01em',
                }}
              >
                Unsere Leistungen
              </h2>
              <div
                style={{
                  width: '50px',
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--wb-accent), var(--wb-forge))',
                  margin: '16px auto 0',
                  borderRadius: '2px',
                }}
              />
            </div>
          </FadeIn>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {services.slice(0, 4).map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.1}>
                <div
                  style={{
                    backgroundColor: 'var(--wb-card)',
                    borderRadius: '6px',
                    padding: '36px 28px',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                    borderLeft: '3px solid transparent',
                  }}
                  className="hover:scale-[1.02] hover:shadow-lg hover:border-l-[var(--wb-accent)]"
                >
                  {/* Subtle gradient overlay at top */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: service.gradient,
                      opacity: 0.6,
                    }}
                  />

                  <span style={{ display: 'block', marginBottom: '16px', color: 'var(--wb-accent)' }}>
                    <ServiceIcon name={service.icon} className="h-8 w-8" />
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--wb-font-display)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: 'var(--wb-dark)',
                      marginBottom: '12px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {service.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--wb-muted)',
                      lineHeight: 1.7,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Link
                href={`${BASE}/leistungen`}
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--wb-accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 0',
                  borderBottom: '2px solid var(--wb-accent)',
                  transition: 'all 0.3s ease',
                }}
                className="hover:gap-[14px]"
              >
                Alle Leistungen ansehen
                <span style={{ fontSize: '1.1rem' }}>&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. PROJEKTE SHOWCASE
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--wb-surface)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ marginBottom: '64px' }}>
              <span
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--wb-accent)',
                }}
              >
                Portfolio
              </span>
              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  marginTop: '12px',
                  letterSpacing: '-0.01em',
                }}
              >
                Ausgewählte Projekte
              </h2>
              <div
                style={{
                  width: '50px',
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--wb-accent), var(--wb-forge))',
                  marginTop: '16px',
                  borderRadius: '2px',
                }}
              />
            </div>
          </FadeIn>

          {/* Asymmetric project grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gridTemplateRows: 'auto auto',
              gap: '24px',
            }}
            className="max-md:grid-cols-1"
          >
            {/* Large featured project */}
            <FadeIn>
              <Link
                href={`${BASE}/projekte`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  gridRow: '1 / 3',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'transform 0.4s ease',
                }}
                className="hover:scale-[1.01] group"
              >
                <div
                  style={{
                    background: projects[0].gradient,
                    height: '100%',
                    minHeight: '500px',
                    position: 'relative',
                  }}
                  className="max-md:min-h-[350px]"
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '32px',
                      background: 'linear-gradient(transparent, rgba(61, 43, 31, 0.85))',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--wb-forge)',
                        backgroundColor: 'rgba(61, 43, 31, 0.6)',
                        padding: '4px 12px',
                        borderRadius: '3px',
                        display: 'inline-block',
                        marginBottom: '12px',
                      }}
                    >
                      Innenausbau
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--wb-font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#F5EDE3',
                        marginBottom: '8px',
                      }}
                    >
                      {projects[0].title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.85rem',
                        color: 'rgba(245, 237, 227, 0.7)',
                        lineHeight: 1.6,
                        maxWidth: '400px',
                      }}
                    >
                      {projects[0].description}
                    </p>
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
              </Link>
            </FadeIn>

            {/* Two smaller projects */}
            {projects.slice(1, 3).map((project, i) => (
              <FadeIn key={project.id} delay={(i + 1) * 0.15}>
                <Link
                  href={`${BASE}/projekte`}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.4s ease',
                  }}
                  className="hover:scale-[1.02] group"
                >
                  <div
                    style={{
                      background: project.gradient,
                      height: '240px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '24px',
                        background: 'linear-gradient(transparent, rgba(61, 43, 31, 0.8))',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--wb-font-display)',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: '#F5EDE3',
                          marginBottom: '4px',
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--wb-font-body)',
                          fontSize: '0.8rem',
                          color: 'rgba(245, 237, 227, 0.6)',
                        }}
                      >
                        {project.location}
                      </p>
                    </div>
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
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Link
                href={`${BASE}/projekte`}
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--wb-accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 0',
                  borderBottom: '2px solid var(--wb-accent)',
                  transition: 'all 0.3s ease',
                }}
                className="hover:gap-[14px]"
              >
                Alle Projekte entdecken
                <span style={{ fontSize: '1.1rem' }}>&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. ZAHLEN & FAKTEN
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--wb-card)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                fontWeight: 700,
                color: 'var(--wb-dark)',
                textAlign: 'center',
                marginBottom: '56px',
                letterSpacing: '-0.01em',
              }}
            >
              Zahlen, die für uns sprechen
            </h2>
          </FadeIn>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '32px',
            }}
            className="max-md:grid-cols-2 max-sm:grid-cols-1"
          >
            {[
              { number: '37', label: 'Jahre Erfahrung', suffix: '' },
              { number: '500', label: 'Realisierte Projekte', suffix: '+' },
              { number: '12', label: 'Mitarbeiter', suffix: '' },
              { number: '100', label: 'Meisterbetrieb', suffix: '%' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '36px 20px',
                    backgroundColor: 'var(--wb-surface)',
                    borderRadius: '6px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--wb-accent), var(--wb-forge))',
                      borderRadius: '0 0 3px 3px',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--wb-font-display)',
                      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      fontWeight: 700,
                      color: 'var(--wb-accent)',
                      lineHeight: 1,
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {stat.number}
                    <span style={{ fontSize: '0.6em', color: 'var(--wb-forge)' }}>
                      {stat.suffix}
                    </span>
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'var(--wb-muted)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. PROCESS SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--wb-bg)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--wb-accent)',
                }}
              >
                Unser Prozess
              </span>
              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  marginTop: '12px',
                  letterSpacing: '-0.01em',
                }}
              >
                Vom Entwurf zur Meisterarbeit
              </h2>
              <div
                style={{
                  width: '50px',
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--wb-accent), var(--wb-forge))',
                  margin: '16px auto 0',
                  borderRadius: '2px',
                }}
              />
            </div>
          </FadeIn>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0',
              position: 'relative',
            }}
            className="max-md:grid-cols-2 max-sm:grid-cols-1 max-md:gap-y-[48px]"
          >
            {/* Connecting line (desktop) */}
            <div
              style={{
                position: 'absolute',
                top: '32px',
                left: '12.5%',
                right: '12.5%',
                height: '2px',
                background: 'linear-gradient(90deg, var(--wb-divider), var(--wb-accent), var(--wb-forge), var(--wb-divider))',
              }}
              className="max-sm:hidden"
            />

            {[
              {
                step: '01',
                title: 'Beratung & Planung',
                description: 'Persönliches Gespräch, Aufmaß vor Ort und Entwicklung des Konzepts. Wir hören zu und verstehen.',
              },
              {
                step: '02',
                title: 'Entwurf & Design',
                description: '3D-Visualisierung, Materialauswahl und detaillierte Planung bis ins letzte Detail.',
              },
              {
                step: '03',
                title: 'Fertigung',
                description: 'Präzise Handarbeit in unserer Werkstatt. Jedes Stück entsteht mit Sorgfalt und Meisterhand.',
              },
              {
                step: '04',
                title: 'Montage & Übergabe',
                description: 'Fachgerechte Montage vor Ort und gründliche Endkontrolle. Erst wenn Sie zufrieden sind, sind wir es.',
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '0 20px',
                    position: 'relative',
                  }}
                >
                  {/* Number circle */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--wb-accent), var(--wb-leather))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      position: 'relative',
                      zIndex: 2,
                      boxShadow: '0 4px 16px rgba(196, 92, 59, 0.25)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--wb-font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#fff',
                      }}
                    >
                      {item.step}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--wb-font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--wb-dark)',
                      marginBottom: '10px',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--wb-muted)',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. CONTACT CTA
      ═══════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: '100px 24px',
          background: 'linear-gradient(160deg, var(--wb-dark) 0%, #2C1E14 60%, #4A3525 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-5%',
            width: '300px',
            height: '300px',
            border: '1px solid rgba(212, 165, 116, 0.08)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-3%',
            width: '200px',
            height: '200px',
            border: '1px solid rgba(196, 92, 59, 0.06)',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
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
              }}
            >
              Sprechen wir darüber
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: 700,
                color: '#F5EDE3',
                marginTop: '16px',
                marginBottom: '20px',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Ihr Projekt beginnt mit einem Gespräch
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '1.05rem',
                color: 'rgba(245, 237, 227, 0.7)',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '550px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Erzählen Sie uns von Ihrer Idee. Ob kleines Möbelstück oder großer Innenausbau —
              wir freuen uns auf Ihr Projekt.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 600,
                color: 'var(--wb-forge)',
                marginBottom: '32px',
                letterSpacing: '0.02em',
              }}
            >
              {contactInfo.phone}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href={`${BASE}/kontakt`}
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: 'var(--wb-accent)',
                  textDecoration: 'none',
                  padding: '16px 36px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                }}
                className="hover:bg-[var(--wb-accent-hover)] hover:scale-[1.02]"
              >
                Kostenlos beraten lassen
                <span style={{ fontSize: '1.1rem' }}>&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
