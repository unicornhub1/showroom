'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Dumbbell, Flame, Swords, Zap, Activity, Leaf, Clock } from 'lucide-react';
import { BicepsFlexed, HeartPulse } from 'lucide-react';
import {
  courses,
  weeklySchedule,
  difficultyLabels,
  difficultyColors,
  type Difficulty,
} from '../_design/data';

const BASE = '/templates/sport/peak';

/* ---- CourseIcon ---- */
function CourseIcon({ name, className = 'h-9 w-9' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    dumbbell: <Dumbbell className={className} />,
    flame: <Flame className={className} />,
    'biceps-flexed': <BicepsFlexed className={className} />,
    swords: <Swords className={className} />,
    'heart-pulse': <HeartPulse className={className} />,
    zap: <Zap className={className} />,
    activity: <Activity className={className} />,
    leaf: <Leaf className={className} />,
  };
  return <>{icons[name] || null}</>;
}

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

/* ---- Difficulty Badge ---- */
function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const color = difficultyColors[difficulty];
  const label = difficultyLabels[difficulty];
  const bars = difficulty === 'anfaenger' ? 1 : difficulty === 'fortgeschritten' ? 2 : 3;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            style={{
              width: '4px',
              height: `${8 + level * 4}px`,
              backgroundColor: level <= bars ? color : 'var(--pk-steel)',
              borderRadius: '1px',
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontFamily: 'var(--pk-font-body)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: color,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}

const dayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export default function KursePage() {
  const [filter, setFilter] = useState<Difficulty | 'alle'>('alle');

  const filtered = filter === 'alle' ? courses : courses.filter((c) => c.difficulty === filter);

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
        <div
          className="pk-diagonal-lines"
          style={{ position: 'absolute', inset: 0, opacity: 0.4 }}
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
              Kursangebot
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
              UNSERE<br />
              <span style={{ color: 'var(--pk-accent)' }}>KURSE.</span>
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
              Von Functional Training bis Yoga — über 45 Kurse pro Woche
              für jedes Fitness-Level. Finde den Kurs, der zu dir passt.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---- Filter ---- */}
      <section style={{ padding: '0 24px 60px', backgroundColor: 'var(--pk-bg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {(['alle', 'anfaenger', 'fortgeschritten', 'profi'] as const).map((f) => {
                const isActive = filter === f;
                const label = f === 'alle' ? 'Alle' : difficultyLabels[f as Difficulty];
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={!isActive ? 'hover:border-[var(--pk-accent)] hover:text-[var(--pk-accent)] transition-all duration-200' : ''}
                    style={{
                      fontFamily: 'var(--pk-font-body)',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '10px 24px',
                      backgroundColor: isActive ? 'var(--pk-accent)' : 'transparent',
                      border: isActive ? '2px solid var(--pk-accent)' : '2px solid var(--pk-steel)',
                      color: isActive ? '#FFFFFF' : 'var(--pk-muted)',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- Course Cards ---- */}
      <section style={{ padding: '0 24px 120px', backgroundColor: 'var(--pk-bg)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map((course, i) => (
              <FadeIn key={course.id} delay={i * 0.07}>
                <div
                  className="hover:translate-y-[-4px] hover:shadow-[0_0_40px_rgba(255,69,0,0.12)] transition-all duration-300"
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
                  {/* Gradient Header */}
                  <div
                    style={{
                      height: '6px',
                      background: course.gradient,
                    }}
                  />

                  <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Top row: Icon + Difficulty */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ color: 'var(--pk-accent)' }}><CourseIcon name={course.icon} className="h-9 w-9" /></span>
                      <DifficultyBadge difficulty={course.difficulty} />
                    </div>

                    {/* Name */}
                    <h3
                      style={{
                        fontFamily: 'var(--pk-font-display)',
                        fontSize: '24px',
                        color: 'var(--pk-text)',
                        margin: '0 0 12px 0',
                        lineHeight: 1.2,
                      }}
                    >
                      {course.name}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '14px',
                        lineHeight: 1.7,
                        color: 'var(--pk-muted)',
                        margin: '0 0 20px 0',
                        flex: 1,
                      }}
                    >
                      {course.description}
                    </p>

                    {/* Meta row */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--pk-steel)',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: 'var(--pk-accent)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Clock className="h-3 w-3" style={{ display: 'inline', verticalAlign: 'middle' }} /> {course.duration} Min
                      </span>
                      <span style={{ width: '1px', height: '14px', backgroundColor: 'var(--pk-steel)' }} />
                      <span
                        style={{
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '12px',
                          color: 'var(--pk-muted)',
                        }}
                      >
                        mit {course.trainer}
                      </span>
                    </div>

                    {/* Schedule tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                      {course.schedule.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontFamily: 'var(--pk-font-body)',
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            backgroundColor: 'var(--pk-accent-dim)',
                            color: 'var(--pk-accent)',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 24px',
                fontFamily: 'var(--pk-font-body)',
                fontSize: '16px',
                color: 'var(--pk-muted)',
              }}
            >
              Keine Kurse für dieses Level gefunden.
            </div>
          )}
        </div>
      </section>

      {/* ---- Weekly Schedule ---- */}
      <section
        style={{
          padding: '120px 24px',
          backgroundColor: 'var(--pk-surface)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="pk-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
                Wochenplan
              </div>
              <h2
                style={{
                  fontFamily: 'var(--pk-font-display)',
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  lineHeight: 1,
                  color: 'var(--pk-text)',
                  margin: 0,
                }}
              >
                DEIN <span style={{ color: 'var(--pk-accent)' }}>PLAN.</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ overflowX: 'auto' }} className="pk-scrollbar">
              <table
                style={{
                  width: '100%',
                  minWidth: '800px',
                  borderCollapse: 'collapse',
                  fontFamily: 'var(--pk-font-body)',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '16px 12px',
                        textAlign: 'left',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--pk-accent)',
                        borderBottom: '2px solid var(--pk-accent)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Uhrzeit
                    </th>
                    {dayNames.map((day) => (
                      <th
                        key={day}
                        style={{
                          padding: '16px 12px',
                          textAlign: 'center',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--pk-text)',
                          borderBottom: '2px solid var(--pk-steel)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((row) => (
                    <tr key={row.time}>
                      <td
                        style={{
                          padding: '14px 12px',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--pk-text)',
                          borderBottom: '1px solid var(--pk-steel)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.time}
                      </td>
                      {dayKeys.map((dayKey) => {
                        const value = row[dayKey];
                        return (
                          <td
                            key={dayKey}
                            style={{
                              padding: '10px 8px',
                              textAlign: 'center',
                              borderBottom: '1px solid var(--pk-steel)',
                            }}
                          >
                            {value ? (
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '6px 14px',
                                  backgroundColor: 'var(--pk-accent-dim)',
                                  color: 'var(--pk-accent)',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  letterSpacing: '0.03em',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {value}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--pk-steel)', fontSize: '12px' }}>—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section
        style={{
          padding: '80px 24px',
          backgroundColor: 'var(--pk-bg)',
          textAlign: 'center',
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontFamily: 'var(--pk-font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--pk-text)',
              margin: '0 0 24px 0',
            }}
          >
            BEREIT FÜR DEIN <span style={{ color: 'var(--pk-accent)' }}>WORKOUT?</span>
          </h2>
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
            Probetraining vereinbaren
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
