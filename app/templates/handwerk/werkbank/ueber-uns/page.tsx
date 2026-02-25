'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Cog, Star, Leaf, Heart } from 'lucide-react';
import { teamMembers, timeline, contactInfo } from '../_design/data';

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

/* ── Über uns Page ────────────────────────────────────────────── */

export default function UeberUnsPage() {
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
            top: '15%',
            right: '10%',
            width: '160px',
            height: '160px',
            border: '1px solid rgba(212, 165, 116, 0.06)',
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
              Unsere Geschichte
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
              Über uns
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
              Ein Familienbetrieb mit Tradition und Zukunft. Seit 1987 verbinden wir
              Handwerkskunst mit moderner Präzision.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Story Section ─────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', backgroundColor: 'var(--wb-bg)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
          className="max-md:grid-cols-1"
        >
          <FadeIn>
            <div
              style={{
                background: 'linear-gradient(145deg, #8B5E3C, #D4A574, #EDE5DA)',
                borderRadius: '6px',
                height: '420px',
                position: 'relative',
                overflow: 'hidden',
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
                  gap: '12px',
                }}
              >
                <span style={{ opacity: 0.2 }}><Cog className="h-14 w-14" /></span>
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
                  Werkstatt seit 1987
                </span>
              </div>
              {/* Accent strip */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
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
                Stuttgart-Vaihingen
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  marginBottom: '20px',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                Tradition trifft auf Innovation
              </h2>

              <p
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '1rem',
                  color: 'var(--wb-muted)',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                }}
              >
                Als Heinrich Weller 1987 seine Schreinerei in einer kleinen Werkstatt in
                Stuttgart-Vaihingen gründete, hatte er eine klare Vision: Möbel und Räume zu
                schaffen, die Generationen überdauern.
              </p>

              <p
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '1rem',
                  color: 'var(--wb-muted)',
                  lineHeight: 1.8,
                  marginBottom: '16px',
                }}
              >
                Heute führt sein Sohn Markus den Betrieb in zweiter Generation — mit dem gleichen
                Anspruch an Qualität und Handwerkskunst. Unsere Werkstatt hat sich gewandelt: Von
                drei Mitarbeitern zu einem Team von zwölf, von einer kleinen Werkstatt zu einem
                modernen Betrieb mit 800 Quadratmetern.
              </p>

              <p
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '1rem',
                  color: 'var(--wb-muted)',
                  lineHeight: 1.8,
                }}
              >
                Was sich nie geändert hat: die Überzeugung, dass gutes Handwerk nicht nur ein
                Beruf, sondern eine Berufung ist.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--wb-surface)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
                Unsere Meilensteine
              </span>
              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  marginTop: '12px',
                }}
              >
                Von 1987 bis heute
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

          {/* Timeline — simple stacked layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {timeline.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <FadeIn key={event.year} delay={i * 0.1}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0',
                      position: 'relative',
                    }}
                  >
                    {/* Desktop left content area */}
                    <div
                      className="hidden md:block"
                      style={{
                        flex: 1,
                        textAlign: 'right',
                        padding: '0 24px 48px 0',
                      }}
                    >
                      {isLeft && (
                        <>
                          <h3
                            style={{
                              fontFamily: 'var(--wb-font-display)',
                              fontSize: '1.2rem',
                              fontWeight: 600,
                              color: 'var(--wb-dark)',
                              marginBottom: '8px',
                            }}
                          >
                            {event.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: 'var(--wb-font-body)',
                              fontSize: '0.9rem',
                              color: 'var(--wb-muted)',
                              lineHeight: 1.7,
                            }}
                          >
                            {event.description}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Center column — line + dot */}
                    <div
                      style={{
                        width: '48px',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                      }}
                    >
                      {/* Vertical line segment behind dot */}
                      {i > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '2px',
                            height: '100%',
                            backgroundColor: 'var(--wb-divider)',
                            zIndex: 0,
                          }}
                        />
                      )}
                      {i < timeline.length - 1 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '48px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '2px',
                            bottom: 0,
                            backgroundColor: 'var(--wb-divider)',
                            zIndex: 0,
                          }}
                        />
                      )}
                      {/* Year dot */}
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--wb-accent), var(--wb-leather))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(196, 92, 59, 0.25)',
                          position: 'relative',
                          zIndex: 2,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--wb-font-display)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#fff',
                          }}
                        >
                          {event.year}
                        </span>
                      </div>
                    </div>

                    {/* Right content area (also used for mobile) */}
                    <div
                      style={{
                        flex: 1,
                        padding: '0 0 48px 24px',
                      }}
                    >
                      {/* Mobile: always show content here */}
                      <div className="md:hidden">
                        <h3
                          style={{
                            fontFamily: 'var(--wb-font-display)',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: 'var(--wb-dark)',
                            marginBottom: '8px',
                          }}
                        >
                          {event.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--wb-font-body)',
                            fontSize: '0.9rem',
                            color: 'var(--wb-muted)',
                            lineHeight: 1.7,
                          }}
                        >
                          {event.description}
                        </p>
                      </div>
                      {/* Desktop: only show right-side items here */}
                      {!isLeft && (
                        <div className="hidden md:block">
                          <h3
                            style={{
                              fontFamily: 'var(--wb-font-display)',
                              fontSize: '1.2rem',
                              fontWeight: 600,
                              color: 'var(--wb-dark)',
                              marginBottom: '8px',
                            }}
                          >
                            {event.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: 'var(--wb-font-body)',
                              fontSize: '0.9rem',
                              color: 'var(--wb-muted)',
                              lineHeight: 1.7,
                            }}
                          >
                            {event.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team Section ──────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', backgroundColor: 'var(--wb-bg)' }}>
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
                Die Menschen dahinter
              </span>
              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  marginTop: '12px',
                }}
              >
                Unser Team
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
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
            className="max-lg:grid-cols-2 max-sm:grid-cols-1"
          >
            {teamMembers.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.08}>
                <div
                  style={{
                    backgroundColor: 'var(--wb-surface)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  }}
                  className="hover:scale-[1.02] hover:shadow-lg"
                >
                  {/* Gradient avatar placeholder */}
                  <div
                    style={{
                      background: member.gradient,
                      height: '220px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--wb-font-display)',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.25)',
                      }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <div style={{ padding: '24px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--wb-font-display)',
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        color: 'var(--wb-dark)',
                        marginBottom: '4px',
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--wb-accent)',
                        letterSpacing: '0.03em',
                        marginBottom: '12px',
                      }}
                    >
                      {member.role}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.85rem',
                        color: 'var(--wb-muted)',
                        lineHeight: 1.7,
                      }}
                    >
                      {member.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--wb-card)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
                Wofür wir stehen
              </span>
              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  marginTop: '12px',
                }}
              >
                Unsere Werte
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
              gap: '28px',
            }}
            className="max-md:grid-cols-2 max-sm:grid-cols-1"
          >
            {[
              {
                icon: <Cog className="h-6 w-6" />,
                title: 'Handwerk',
                description: 'Echte Handarbeit. Jedes Stück wird mit Sorgfalt und Meisterhand in unserer Werkstatt gefertigt.',
              },
              {
                icon: <Star className="h-6 w-6" />,
                title: 'Qualität',
                description: 'Keine Kompromisse. Wir verwenden nur ausgewählte Materialien und arbeiten mit höchster Präzision.',
              },
              {
                icon: <Leaf className="h-6 w-6" />,
                title: 'Nachhaltigkeit',
                description: 'Holz aus nachhaltiger Forstwirtschaft, langlebige Konstruktionen und regionale Wertschöpfung.',
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: 'Kundennähe',
                description: 'Persönliche Beratung und individuelle Lösungen. Wir hören zu und verstehen Ihre Wünsche.',
              },
            ].map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '36px 24px',
                    backgroundColor: 'var(--wb-surface)',
                    borderRadius: '6px',
                    transition: 'transform 0.4s ease',
                  }}
                  className="hover:scale-[1.03]"
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(196, 92, 59, 0.1), rgba(212, 165, 116, 0.15))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: 'var(--wb-accent)',
                    }}
                  >
                    {value.icon}
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
                    {value.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--wb-muted)',
                      lineHeight: 1.7,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', backgroundColor: 'var(--wb-bg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)',
                  fontWeight: 600,
                  color: 'var(--wb-dark)',
                }}
              >
                Qualifikationen & Mitgliedschaften
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              {[
                'Meisterbetrieb HWK Stuttgart',
                'Innungsmitglied Schreinerinnung',
                'Fachbetrieb für Restaurierung',
                'Nachhaltige Holzwirtschaft FSC',
                'Qualitätsverbund Holzbau',
              ].map((cert) => (
                <div
                  key={cert}
                  style={{
                    padding: '16px 28px',
                    backgroundColor: 'var(--wb-surface)',
                    borderRadius: '6px',
                    border: '1px solid var(--wb-divider)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'border-color 0.3s ease',
                  }}
                  className="hover:border-[var(--wb-accent)]"
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--wb-accent), var(--wb-forge))',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: 'var(--wb-text)',
                    }}
                  >
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(160deg, var(--wb-dark) 0%, #2C1E14 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            border: '1px solid rgba(212, 165, 116, 0.04)',
            borderRadius: '50%',
          }}
        />

        <FadeIn>
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <h2
              style={{
                fontFamily: 'var(--wb-font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#F5EDE3',
                marginBottom: '16px',
              }}
            >
              Lernen Sie uns kennen
            </h2>
            <p
              style={{
                fontFamily: 'var(--wb-font-body)',
                fontSize: '1rem',
                color: 'rgba(245, 237, 227, 0.6)',
                lineHeight: 1.7,
                marginBottom: '32px',
              }}
            >
              Besuchen Sie unsere Werkstatt in Stuttgart-Vaihingen und erleben Sie
              Handwerk hautnah. Wir freuen uns auf Sie.
            </p>
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
                  padding: '14px 32px',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                }}
                className="hover:bg-[var(--wb-accent-hover)] hover:scale-[1.02]"
              >
                Werkstatt besuchen
              </Link>
              <span
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--wb-forge)',
                  padding: '14px 0',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {contactInfo.phone}
              </span>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
