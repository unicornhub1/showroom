'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { trainers } from '../_design/data';

const BASE = '/templates/sport/peak';

/* ---- FadeIn ---- */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* ---- Hero ---- */}
      <section
        style={{
          position: 'relative',
          padding: '80px 24px 60px',
          backgroundColor: 'var(--pk-bg)',
          overflow: 'hidden',
        }}
      >
        <div className="pk-diagonal-lines" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <div
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--pk-accent)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ display: 'inline-block', width: '40px', height: '2px', backgroundColor: 'var(--pk-accent)' }} />
              Unser Team
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              style={{
                fontFamily: 'var(--pk-font-display)',
                fontSize: 'clamp(48px, 8vw, 96px)',
                lineHeight: 1,
                color: 'var(--pk-text)',
                margin: '0 0 24px 0',
              }}
            >
              DIE<br />
              <span style={{ color: 'var(--pk-accent)' }}>TRAINER.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'var(--pk-muted)',
                maxWidth: '560px',
              }}
            >
              Zertifizierte Profis mit Leidenschaft. Unser Team bringt dich
              an dein Ziel — egal ob Anfänger oder Wettkampfathlet.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---- Trainer Grid ---- */}
      <section
        style={{
          padding: '60px 24px 120px',
          backgroundColor: 'var(--pk-bg)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '32px',
            }}
          >
            {trainers.map((trainer, i) => (
              <FadeIn key={trainer.id} delay={i * 0.08}>
                <div
                  className="hover:translate-y-[-6px] hover:shadow-[0_0_50px_rgba(255,69,0,0.15)] transition-all duration-400"
                  style={{
                    position: 'relative',
                    backgroundColor: 'var(--pk-card)',
                    border: '1px solid var(--pk-steel)',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Gradient "Photo" area */}
                  <div
                    style={{
                      position: 'relative',
                      height: '280px',
                      background: trainer.gradient,
                      overflow: 'hidden',
                    }}
                  >
                    {/* Scan lines overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
                      }}
                    />

                    {/* Number overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-10px',
                        right: '16px',
                        fontFamily: 'var(--pk-font-display)',
                        fontSize: '100px',
                        lineHeight: 1,
                        color: 'rgba(255,255,255,0.08)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Diagonal accent stripe */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60px',
                        background: 'linear-gradient(to top, var(--pk-card) 0%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Name — overlapping the gradient */}
                    <h3
                      style={{
                        fontFamily: 'var(--pk-font-display)',
                        fontSize: '28px',
                        color: 'var(--pk-text)',
                        margin: '-48px 0 12px 0',
                        position: 'relative',
                        zIndex: 2,
                        lineHeight: 1.2,
                      }}
                    >
                      {trainer.name}
                    </h3>

                    {/* Specialty */}
                    <p
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--pk-accent)',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {trainer.specialty}
                    </p>

                    {/* Experience */}
                    <p
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '13px',
                        color: 'var(--pk-muted)',
                        margin: '0 0 16px 0',
                      }}
                    >
                      {trainer.experience}
                    </p>

                    {/* Quote */}
                    <blockquote
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '14px',
                        fontWeight: 300,
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                        color: 'var(--pk-text)',
                        margin: '0 0 20px 0',
                        padding: '16px',
                        backgroundColor: 'var(--pk-surface)',
                        borderLeft: '3px solid var(--pk-accent)',
                        flex: 1,
                      }}
                    >
                      &ldquo;{trainer.quote}&rdquo;
                    </blockquote>

                    {/* Certifications */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {trainer.certifications.map((cert) => (
                        <span
                          key={cert}
                          style={{
                            fontFamily: 'var(--pk-font-body)',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            padding: '5px 12px',
                            backgroundColor: 'var(--pk-accent-dim)',
                            color: 'var(--pk-accent)',
                            border: '1px solid rgba(255,69,0,0.15)',
                          }}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Join the team CTA ---- */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--pk-surface)',
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
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, var(--pk-accent-dim) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: 'var(--pk-font-display)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                lineHeight: 1.1,
                color: 'var(--pk-text)',
                margin: '0 0 20px 0',
              }}
            >
              TRAINIERE MIT DEN <span style={{ color: 'var(--pk-accent)' }}>BESTEN.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '16px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'var(--pk-muted)',
                maxWidth: '500px',
                margin: '0 auto 32px',
              }}
            >
              Vereinbare ein kostenloses Probetraining und lerne unser Team
              persönlich kennen. Wir freuen uns auf dich.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href={`${BASE}/kontakt`}
              className="hover:scale-105 hover:shadow-[0_0_40px_rgba(255,69,0,0.4)] transition-all duration-300"
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '16px 48px',
                backgroundColor: 'var(--pk-accent)',
                color: '#FFFFFF',
                textDecoration: 'none',
                display: 'inline-block',
                clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)',
              }}
            >
              Probetraining buchen
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
