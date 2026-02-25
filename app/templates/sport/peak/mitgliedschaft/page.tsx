'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { membershipTiers, faqs, formatPrice } from '../_design/data';

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

/* ---- FAQ Accordion Item ---- */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: '1px solid var(--pk-steel)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-[var(--pk-accent)] transition-colors duration-200"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          fontFamily: 'var(--pk-font-body)',
          fontSize: '16px',
          fontWeight: 600,
          color: open ? 'var(--pk-accent)' : 'var(--pk-text)',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span>{question}</span>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 300,
            color: 'var(--pk-accent)',
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--pk-font-body)',
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'var(--pk-muted)',
            padding: '0 0 20px 0',
            maxWidth: '700px',
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function MitgliedschaftPage() {
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

        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, var(--pk-accent-dim) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

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
              Mitgliedschaft
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
              DEIN<br />
              <span style={{ color: 'var(--pk-accent)' }}>PLAN.</span>
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
              Wähle die Mitgliedschaft, die zu dir passt.
              Kein versteckter Kosten. Keine langen Laufzeiten.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---- Pricing Cards ---- */}
      <section
        style={{
          padding: '60px 24px 120px',
          backgroundColor: 'var(--pk-bg)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            {membershipTiers.map((tier, i) => (
              <FadeIn key={tier.id} delay={i * 0.12}>
                <div
                  className="hover:translate-y-[-6px] transition-all duration-300"
                  style={{
                    position: 'relative',
                    backgroundColor: 'var(--pk-card)',
                    border: tier.highlighted ? '2px solid var(--pk-accent)' : '1px solid var(--pk-steel)',
                    padding: '48px 36px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  {/* Highlighted tag */}
                  {tier.highlighted && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        backgroundColor: 'var(--pk-accent)',
                      }}
                    />
                  )}

                  {/* Popular badge */}
                  {tier.highlighted && (
                    <div
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--pk-accent)',
                        backgroundColor: 'var(--pk-accent-dim)',
                        padding: '6px 16px',
                        display: 'inline-block',
                        alignSelf: 'flex-start',
                        marginBottom: '16px',
                        border: '1px solid rgba(255,69,0,0.2)',
                      }}
                    >
                      Beliebteste Wahl
                    </div>
                  )}

                  {/* Tier Name */}
                  <div
                    style={{
                      fontFamily: 'var(--pk-font-display)',
                      fontSize: '24px',
                      color: tier.highlighted ? 'var(--pk-accent)' : 'var(--pk-text)',
                      marginBottom: '8px',
                    }}
                  >
                    {tier.name}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--pk-font-body)',
                      fontSize: '14px',
                      color: 'var(--pk-muted)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--pk-font-display)',
                        fontSize: '64px',
                        lineHeight: 1,
                        color: 'var(--pk-text)',
                      }}
                    >
                      {formatPrice(tier.price)}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '16px',
                        color: 'var(--pk-muted)',
                      }}
                    >
                      / {tier.period}
                    </span>
                  </div>

                  {/* Features */}
                  <div style={{ flex: 1, marginBottom: '32px' }}>
                    {tier.features.map((feature) => (
                      <div
                        key={feature}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '10px 0',
                          borderBottom: '1px solid var(--pk-steel)',
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '14px',
                          color: 'var(--pk-text)',
                          lineHeight: 1.5,
                        }}
                      >
                        <Check
                          className="h-4 w-4"
                          style={{
                            color: 'var(--pk-accent)',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`${BASE}/kontakt`}
                    className={
                      tier.highlighted
                        ? 'hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] transition-all duration-300'
                        : 'hover:border-[var(--pk-accent)] hover:text-[var(--pk-accent)] transition-all duration-300'
                    }
                    style={{
                      fontFamily: 'var(--pk-font-body)',
                      fontSize: '14px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      padding: '16px 24px',
                      backgroundColor: tier.highlighted ? 'var(--pk-accent)' : 'transparent',
                      border: tier.highlighted ? 'none' : '2px solid var(--pk-steel)',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      display: 'block',
                      clipPath: tier.highlighted ? 'polygon(0 0, 100% 0, 97% 100%, 3% 100%)' : 'none',
                    }}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Feature Comparison ---- */}
      <section
        style={{
          padding: '120px 24px',
          backgroundColor: 'var(--pk-surface)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="pk-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <div style={{ marginBottom: '48px', textAlign: 'center' }}>
              <h2
                style={{
                  fontFamily: 'var(--pk-font-display)',
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  lineHeight: 1.1,
                  color: 'var(--pk-text)',
                  margin: '0 0 12px 0',
                }}
              >
                IM <span style={{ color: 'var(--pk-accent)' }}>VERGLEICH.</span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--pk-font-body)',
                  fontSize: '16px',
                  color: 'var(--pk-muted)',
                }}
              >
                Was ist in deinem Plan enthalten?
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ overflowX: 'auto' }} className="pk-scrollbar">
              <table
                style={{
                  width: '100%',
                  minWidth: '600px',
                  borderCollapse: 'collapse',
                  fontFamily: 'var(--pk-font-body)',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--pk-muted)',
                        borderBottom: '2px solid var(--pk-steel)',
                      }}
                    >
                      Feature
                    </th>
                    {membershipTiers.map((tier) => (
                      <th
                        key={tier.id}
                        style={{
                          padding: '16px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: tier.highlighted ? 'var(--pk-accent)' : 'var(--pk-text)',
                          borderBottom: tier.highlighted ? '2px solid var(--pk-accent)' : '2px solid var(--pk-steel)',
                        }}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Trainingsfläche', basic: true, pro: true, elite: true },
                    { feature: 'Gerätetraining', basic: true, pro: true, elite: true },
                    { feature: 'Umkleiden & Duschen', basic: true, pro: true, elite: true },
                    { feature: 'Trainingsplan', basic: true, pro: true, elite: true },
                    { feature: 'Gruppenkurse', basic: false, pro: true, elite: true },
                    { feature: 'Sauna & Wellness', basic: false, pro: true, elite: true },
                    { feature: 'Körperanalyse', basic: false, pro: true, elite: true },
                    { feature: 'Ernährungsberatung', basic: false, pro: true, elite: true },
                    { feature: 'Getränke-Flatrate', basic: false, pro: true, elite: true },
                    { feature: 'Personal Training', basic: false, pro: false, elite: true },
                    { feature: 'Ernährungsplan', basic: false, pro: false, elite: true },
                    { feature: 'Gästepass', basic: false, pro: false, elite: true },
                    { feature: 'Premium Locker', basic: false, pro: false, elite: true },
                    { feature: 'Member-Events', basic: false, pro: false, elite: true },
                    { feature: 'Recovery-Zone', basic: false, pro: false, elite: true },
                  ].map((row) => (
                    <tr key={row.feature}>
                      <td
                        style={{
                          padding: '14px 16px',
                          fontSize: '14px',
                          color: 'var(--pk-text)',
                          borderBottom: '1px solid var(--pk-steel)',
                        }}
                      >
                        {row.feature}
                      </td>
                      {[row.basic, row.pro, row.elite].map((val, colIdx) => (
                        <td
                          key={colIdx}
                          style={{
                            padding: '14px 16px',
                            textAlign: 'center',
                            borderBottom: '1px solid var(--pk-steel)',
                            fontSize: '16px',
                          }}
                        >
                          {val ? (
                            <Check className="h-4 w-4 mx-auto" style={{ color: 'var(--pk-accent)' }} />
                          ) : (
                            <span style={{ color: 'var(--pk-steel)' }}>—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- FAQ Section ---- */}
      <section
        style={{
          padding: '120px 24px',
          backgroundColor: 'var(--pk-bg)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ marginBottom: '48px' }}>
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
                Häufige Fragen
              </div>
              <h2
                style={{
                  fontFamily: 'var(--pk-font-display)',
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  lineHeight: 1.1,
                  color: 'var(--pk-text)',
                  margin: 0,
                }}
              >
                FAQ
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ borderTop: '1px solid var(--pk-steel)' }}>
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- Probetraining CTA ---- */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--pk-surface)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, var(--pk-accent-dim) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'pk-glow-breathe 4s ease infinite',
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
                margin: '0 0 16px 0',
              }}
            >
              NOCH <span style={{ color: 'var(--pk-accent)' }}>UNSICHER?</span>
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
                maxWidth: '480px',
                margin: '0 auto 32px',
              }}
            >
              Vereinbare ein kostenloses Probetraining und überzeuge dich
              selbst. Keine Verpflichtung, nur Motivation.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href={`${BASE}/kontakt`}
              className="hover:scale-110 hover:shadow-[0_0_60px_rgba(255,69,0,0.5)] transition-all duration-400"
              style={{
                fontFamily: 'var(--pk-font-display)',
                fontSize: 'clamp(16px, 2.5vw, 24px)',
                padding: '20px 60px',
                backgroundColor: 'var(--pk-accent)',
                color: '#FFFFFF',
                textDecoration: 'none',
                display: 'inline-block',
                clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)',
                animation: 'pk-pulse-red 3s ease infinite',
              }}
            >
              PROBETRAINING VEREINBAREN
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
