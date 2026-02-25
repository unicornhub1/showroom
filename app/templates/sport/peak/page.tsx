'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Dumbbell, Flame, Swords, Zap, Activity, Leaf, MapPin, Phone, Clock, Check } from 'lucide-react';
import { BicepsFlexed, HeartPulse } from 'lucide-react';
import { courses, trainers, membershipTiers, openingHours, contactInfo, formatPrice } from './_design/data';

/* ============================================
   CourseIcon — Maps icon identifier to Lucide component
   ============================================ */
function CourseIcon({ name, className = 'h-10 w-10' }: { name: string; className?: string }) {
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

const BASE = '/templates/sport/peak';

/* ============================================
   FadeIn — IntersectionObserver scroll reveal
   ============================================ */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

/* ============================================
   Homepage
   ============================================ */
export default function PRSMHomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const previewCourses = courses.slice(0, 4);
  const featuredTrainer = trainers[0];

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* ============================================
          SECTION 1: Explosive Hero
          ============================================ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          marginTop: '-80px',
          paddingTop: '80px',
        }}
      >
        {/* Background with diagonal split */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          {/* Dark base */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--pk-bg)' }} />

          {/* Diagonal accent zone */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '55%',
              height: '100%',
              background: 'linear-gradient(135deg, transparent 0%, var(--pk-accent-dim) 40%, rgba(255,69,0,0.08) 100%)',
              clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />

          {/* Grid pattern overlay */}
          <div
            className="pk-grid-pattern"
            style={{ position: 'absolute', inset: 0, opacity: 0.6 }}
          />

          {/* Large geometric accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-5%',
              width: '500px',
              height: '500px',
              border: '2px solid var(--pk-accent)',
              opacity: 0.1,
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '15%',
              width: '200px',
              height: '200px',
              border: '1px solid var(--pk-accent)',
              opacity: 0.08,
              transform: 'rotate(15deg)',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '80px 24px',
            width: '100%',
          }}
        >
          {/* Stacked giant text */}
          <div style={{ position: 'relative' }}>
            {/* Background giant "PRSM" text - decorative */}
            <div
              style={{
                fontFamily: 'var(--pk-font-display)',
                fontSize: 'clamp(120px, 20vw, 300px)',
                lineHeight: 0.85,
                color: 'transparent',
                WebkitTextStroke: '2px var(--pk-steel)',
                position: 'absolute',
                top: '-40px',
                left: '-20px',
                opacity: heroLoaded ? 0.3 : 0,
                transform: heroLoaded ? 'none' : 'translateX(-50px)',
                transition: 'opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              PRSM
            </div>

            {/* Sub-label */}
            <div
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--pk-accent)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '2px',
                  backgroundColor: 'var(--pk-accent)',
                }}
              />
              Premium Fitness Studio
            </div>

            {/* Main heading — staggered word reveal */}
            <h1 style={{ margin: 0, padding: 0 }}>
              {['KEIN', 'LIMIT.'].map((word, i) => (
                <span
                  key={word}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--pk-font-display)',
                    fontSize: 'clamp(48px, 10vw, 120px)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: 'var(--pk-text)',
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? 'none' : 'translateY(60px) skewY(3deg)',
                    transition: `opacity 0.8s ease ${0.5 + i * 0.15}s, transform 0.8s ease ${0.5 + i * 0.15}s`,
                  }}
                >
                  {word}
                </span>
              ))}
              {['KEIN', 'AUFGEBEN.'].map((word, i) => (
                <span
                  key={`b-${word}`}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--pk-font-display)',
                    fontSize: 'clamp(48px, 10vw, 120px)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: i === 1 ? 'var(--pk-accent)' : 'var(--pk-text)',
                    opacity: heroLoaded ? 1 : 0,
                    transform: heroLoaded ? 'none' : 'translateY(60px) skewY(3deg)',
                    transition: `opacity 0.8s ease ${0.8 + i * 0.15}s, transform 0.8s ease ${0.8 + i * 0.15}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'var(--pk-muted)',
                maxWidth: '480px',
                marginTop: '32px',
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 1.1s, transform 0.7s ease 1.1s',
              }}
            >
              Functional Training, HIIT, Kraft und mehr.
              Dein Körper. Dein Wille. Dein Studio in Berlin.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '40px',
                flexWrap: 'wrap',
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 1.3s, transform 0.7s ease 1.3s',
              }}
            >
              <Link
                href={`${BASE}/mitgliedschaft`}
                className="hover:scale-105 hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] transition-all duration-300"
                style={{
                  fontFamily: 'var(--pk-font-body)',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '16px 40px',
                  backgroundColor: 'var(--pk-accent)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  display: 'inline-block',
                  clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
                }}
              >
                Jetzt Starten
              </Link>
              <Link
                href={`${BASE}/kurse`}
                className="hover:border-[var(--pk-accent)] hover:text-[var(--pk-accent)] transition-all duration-300"
                style={{
                  fontFamily: 'var(--pk-font-body)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '16px 40px',
                  border: '2px solid var(--pk-steel)',
                  color: 'var(--pk-text)',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Kurse entdecken
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: heroLoaded ? 0.5 : 0,
            transition: 'opacity 1s ease 1.5s',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--pk-font-body)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--pk-muted)',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--pk-accent), transparent)',
              animation: 'pk-fade-up 1.5s ease infinite',
            }}
          />
        </div>
      </section>

      {/* ============================================
          SECTION 2: Stats Bar
          ============================================ */}
      <section
        style={{
          position: 'relative',
          backgroundColor: 'var(--pk-surface)',
          borderTop: '1px solid var(--pk-steel)',
          borderBottom: '1px solid var(--pk-steel)',
          overflow: 'hidden',
        }}
      >
        {/* Red accent line running through */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, var(--pk-accent) 20%, var(--pk-accent) 80%, transparent 100%)',
            opacity: 0.2,
          }}
        />

        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '48px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
          }}
        >
          {[
            { number: '500+', label: 'Mitglieder' },
            { number: '12', label: 'Trainer' },
            { number: '45+', label: 'Kurse pro Woche' },
            { number: '6', label: 'Tage die Woche' },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div
                  style={{
                    fontFamily: 'var(--pk-font-display)',
                    fontSize: 'clamp(40px, 6vw, 64px)',
                    lineHeight: 1,
                    color: 'var(--pk-text)',
                    marginBottom: '8px',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--pk-accent)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================
          SECTION 3: Kurse Preview
          ============================================ */}
      <section
        style={{
          position: 'relative',
          padding: '120px 24px',
          backgroundColor: 'var(--pk-bg)',
        }}
      >
        {/* Diagonal lines background */}
        <div
          className="pk-diagonal-lines"
          style={{ position: 'absolute', inset: 0, opacity: 0.5 }}
        />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <FadeIn>
            <div style={{ marginBottom: '64px' }}>
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
                Unser Angebot
              </div>
              <h2
                style={{
                  fontFamily: 'var(--pk-font-display)',
                  fontSize: 'clamp(36px, 6vw, 72px)',
                  lineHeight: 1,
                  color: 'var(--pk-text)',
                  margin: 0,
                }}
              >
                FINDE DEINEN
                <br />
                <span style={{ color: 'var(--pk-accent)' }}>KURS.</span>
              </h2>
            </div>
          </FadeIn>

          {/* Course Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {previewCourses.map((course, i) => (
              <FadeIn key={course.id} delay={i * 0.1}>
                <div
                  className="group hover:translate-y-[-4px] hover:shadow-[0_0_40px_rgba(255,69,0,0.15)] transition-all duration-400"
                  style={{
                    position: 'relative',
                    backgroundColor: 'var(--pk-card)',
                    border: '1px solid var(--pk-steel)',
                    padding: '32px',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Diagonal accent stripe */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '80px',
                      height: '80px',
                      background: course.gradient,
                      clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                      opacity: 0.8,
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      marginBottom: '20px',
                      color: 'var(--pk-accent)',
                    }}
                  >
                    <CourseIcon name={course.icon} className="h-10 w-10" />
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: 'var(--pk-font-display)',
                      fontSize: '22px',
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
                      lineHeight: 1.6,
                      color: 'var(--pk-muted)',
                      margin: '0 0 20px 0',
                      flex: 1,
                    }}
                  >
                    {course.description.slice(0, 120)}...
                  </p>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--pk-accent)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {course.duration} Min
                    </span>
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--pk-steel)',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '12px',
                        color: 'var(--pk-muted)',
                      }}
                    >
                      {course.trainer}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Link to all courses */}
          <FadeIn delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Link
                href={`${BASE}/kurse`}
                className="hover:text-[var(--pk-accent)] hover:border-[var(--pk-accent)] transition-all duration-300"
                style={{
                  fontFamily: 'var(--pk-font-body)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '14px 36px',
                  border: '2px solid var(--pk-steel)',
                  color: 'var(--pk-text)',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Alle Kurse ansehen →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          SECTION 4: Trainer Spotlight
          ============================================ */}
      <section
        style={{
          position: 'relative',
          padding: '120px 24px',
          backgroundColor: 'var(--pk-surface)',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Gradient Image Placeholder */}
            <FadeIn>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  maxHeight: '600px',
                  background: featuredTrainer.gradient,
                  overflow: 'hidden',
                }}
              >
                {/* Geometric overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 5px)',
                  }}
                />
                {/* Large number */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    fontFamily: 'var(--pk-font-display)',
                    fontSize: '120px',
                    lineHeight: 1,
                    color: 'rgba(255,255,255,0.1)',
                  }}
                >
                  01
                </div>
              </div>
            </FadeIn>

            {/* Trainer Info */}
            <div>
              <FadeIn delay={0.15}>
                <div
                  style={{
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'var(--pk-accent)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ display: 'inline-block', width: '40px', height: '2px', backgroundColor: 'var(--pk-accent)' }} />
                  Head Trainer
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <h2
                  style={{
                    fontFamily: 'var(--pk-font-display)',
                    fontSize: 'clamp(40px, 6vw, 72px)',
                    lineHeight: 1,
                    color: 'var(--pk-text)',
                    margin: '0 0 24px 0',
                  }}
                >
                  {featuredTrainer.name.split(' ').map((word, i) => (
                    <span key={i} style={{ display: 'block' }}>
                      {word}
                    </span>
                  ))}
                </h2>
              </FadeIn>

              <FadeIn delay={0.35}>
                <p
                  style={{
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--pk-accent)',
                    letterSpacing: '0.05em',
                    margin: '0 0 24px 0',
                  }}
                >
                  {featuredTrainer.specialty} — {featuredTrainer.experience}
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <blockquote
                  style={{
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '20px',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                    color: 'var(--pk-text)',
                    margin: '0 0 32px 0',
                    paddingLeft: '24px',
                    borderLeft: '3px solid var(--pk-accent)',
                  }}
                >
                  &ldquo;{featuredTrainer.quote}&rdquo;
                </blockquote>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  {featuredTrainer.certifications.map((cert) => (
                    <span
                      key={cert}
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        padding: '6px 14px',
                        backgroundColor: 'var(--pk-accent-dim)',
                        color: 'var(--pk-accent)',
                        border: '1px solid rgba(255,69,0,0.2)',
                      }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.55}>
                <Link
                  href={`${BASE}/team`}
                  className="hover:text-[var(--pk-accent)] hover:border-[var(--pk-accent)] transition-all duration-300"
                  style={{
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '14px 36px',
                    border: '2px solid var(--pk-steel)',
                    color: 'var(--pk-text)',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  Das ganze Team →
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: Mitgliedschaft CTA
          ============================================ */}
      <section
        style={{
          position: 'relative',
          padding: '120px 24px',
          backgroundColor: 'var(--pk-bg)',
          overflow: 'hidden',
        }}
      >
        {/* Background accent glow */}
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

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div
                style={{
                  fontFamily: 'var(--pk-font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--pk-accent)',
                  marginBottom: '12px',
                }}
              >
                Mitgliedschaft
              </div>
              <h2
                style={{
                  fontFamily: 'var(--pk-font-display)',
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  lineHeight: 1.1,
                  color: 'var(--pk-text)',
                  margin: 0,
                }}
              >
                WÄHLE DEIN<br />
                <span style={{ color: 'var(--pk-accent)' }}>LEVEL.</span>
              </h2>
            </div>
          </FadeIn>

          {/* Pricing Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            {membershipTiers.map((tier, i) => (
              <FadeIn key={tier.id} delay={i * 0.12}>
                <div
                  className="hover:translate-y-[-4px] transition-all duration-300"
                  style={{
                    position: 'relative',
                    backgroundColor: 'var(--pk-card)',
                    border: tier.highlighted ? '2px solid var(--pk-accent)' : '1px solid var(--pk-steel)',
                    padding: '40px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  {/* Popular badge */}
                  {tier.highlighted && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '-32px',
                        backgroundColor: 'var(--pk-accent)',
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '6px 40px',
                        transform: 'rotate(45deg)',
                        color: '#FFFFFF',
                      }}
                    >
                      Beliebt
                    </div>
                  )}

                  {/* Tier Name */}
                  <div
                    style={{
                      fontFamily: 'var(--pk-font-body)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: tier.highlighted ? 'var(--pk-accent)' : 'var(--pk-muted)',
                      marginBottom: '16px',
                    }}
                  >
                    {tier.name}
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--pk-font-display)',
                        fontSize: '56px',
                        lineHeight: 1,
                        color: 'var(--pk-text)',
                      }}
                    >
                      {formatPrice(tier.price)}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '14px',
                        color: 'var(--pk-muted)',
                      }}
                    >
                      / {tier.period}
                    </span>
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

                  {/* Top 3 features */}
                  <div style={{ flex: 1, marginBottom: '24px' }}>
                    {tier.features.slice(0, 3).map((f) => (
                      <div
                        key={f}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 0',
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '14px',
                          color: 'var(--pk-text)',
                          borderBottom: '1px solid var(--pk-steel)',
                        }}
                      >
                        <Check className="h-4 w-4" style={{ color: 'var(--pk-accent)', flexShrink: 0 }} />
                        {f}
                      </div>
                    ))}
                    {tier.features.length > 3 && (
                      <p
                        style={{
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '12px',
                          color: 'var(--pk-muted)',
                          marginTop: '8px',
                        }}
                      >
                        + {tier.features.length - 3} weitere Vorteile
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`${BASE}/mitgliedschaft`}
                    className={
                      tier.highlighted
                        ? 'hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] transition-all duration-300'
                        : 'hover:border-[var(--pk-accent)] hover:text-[var(--pk-accent)] transition-all duration-300'
                    }
                    style={{
                      fontFamily: 'var(--pk-font-body)',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      padding: '14px 24px',
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

          {/* Big CTA */}
          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <Link
                href={`${BASE}/mitgliedschaft`}
                className="hover:scale-110 hover:shadow-[0_0_60px_rgba(255,69,0,0.5)] transition-all duration-400"
                style={{
                  fontFamily: 'var(--pk-font-display)',
                  fontSize: 'clamp(18px, 3vw, 28px)',
                  padding: '20px 60px',
                  backgroundColor: 'var(--pk-accent)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  display: 'inline-block',
                  clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)',
                  animation: 'pk-pulse-red 3s ease infinite',
                }}
              >
                STARTE JETZT
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          SECTION 6: Marquee Banner
          ============================================ */}
      <section
        style={{
          backgroundColor: 'var(--pk-accent)',
          padding: '20px 0',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            animation: 'pk-marquee 20s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} style={{ display: 'flex', flexShrink: 0 }}>
              {['STÄRKE', 'AUSDAUER', 'DISZIPLIN', 'GEMEINSCHAFT', 'WACHSTUM', 'POWER', 'FOKUS', 'ENERGIE'].map((word) => (
                <span
                  key={`${setIdx}-${word}`}
                  style={{
                    fontFamily: 'var(--pk-font-display)',
                    fontSize: 'clamp(24px, 4vw, 40px)',
                    color: '#FFFFFF',
                    padding: '0 32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '32px',
                  }}
                >
                  {word}
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'rgba(255,255,255,0.4)',
                      transform: 'rotate(45deg)',
                    }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          SECTION 7: Contact / Location Teaser
          ============================================ */}
      <section
        style={{
          position: 'relative',
          padding: '120px 24px',
          backgroundColor: 'var(--pk-surface)',
          overflow: 'hidden',
        }}
      >
        <div
          className="pk-grid-pattern"
          style={{ position: 'absolute', inset: 0, opacity: 0.4 }}
        />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Info */}
            <div>
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
                  Standort
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2
                  style={{
                    fontFamily: 'var(--pk-font-display)',
                    fontSize: 'clamp(36px, 5vw, 56px)',
                    lineHeight: 1.1,
                    color: 'var(--pk-text)',
                    margin: '0 0 32px 0',
                  }}
                >
                  KOMM<br />
                  <span style={{ color: 'var(--pk-accent)' }}>VORBEI.</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Address */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--pk-accent-dim)',
                        border: '1px solid rgba(255,69,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MapPin className="h-5 w-5" style={{ color: 'var(--pk-accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--pk-text)', marginBottom: '4px' }}>
                        Adresse
                      </div>
                      <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-muted)', lineHeight: 1.6 }}>
                        {contactInfo.address}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--pk-accent-dim)',
                        border: '1px solid rgba(255,69,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Phone className="h-5 w-5" style={{ color: 'var(--pk-accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--pk-text)', marginBottom: '4px' }}>
                        Telefon
                      </div>
                      <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-muted)' }}>
                        {contactInfo.phone}
                      </div>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--pk-accent-dim)',
                        border: '1px solid rgba(255,69,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Clock className="h-5 w-5" style={{ color: 'var(--pk-accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--pk-text)', marginBottom: '8px' }}>
                        Öffnungszeiten
                      </div>
                      {openingHours.map((h) => (
                        <div
                          key={h.day}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontFamily: 'var(--pk-font-body)',
                            fontSize: '14px',
                            gap: '24px',
                            padding: '4px 0',
                          }}
                        >
                          <span style={{ color: 'var(--pk-muted)' }}>{h.day}</span>
                          <span style={{ color: 'var(--pk-text)', fontWeight: 500 }}>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Map Placeholder */}
            <FadeIn delay={0.2}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  backgroundColor: 'var(--pk-card)',
                  border: '1px solid var(--pk-steel)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Fake map grid */}
                <div
                  className="pk-grid-pattern"
                  style={{ position: 'absolute', inset: 0, opacity: 0.8 }}
                />

                {/* Location pin */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ marginBottom: '12px', color: 'var(--pk-accent)' }}><MapPin className="h-12 w-12" /></div>
                  <div
                    style={{
                      fontFamily: 'var(--pk-font-display)',
                      fontSize: '20px',
                      color: 'var(--pk-text)',
                      marginBottom: '4px',
                    }}
                  >
                    PRSM Athletics
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--pk-font-body)',
                      fontSize: '13px',
                      color: 'var(--pk-muted)',
                    }}
                  >
                    Berlin Mitte
                  </div>
                </div>

                {/* Pulse ring around pin */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120px',
                    height: '120px',
                    border: '2px solid var(--pk-accent)',
                    borderRadius: '50%',
                    opacity: 0.2,
                    animation: 'pk-pulse-red 3s ease infinite',
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
