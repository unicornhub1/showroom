'use client';

import { useRef, useState, useEffect } from 'react';
import { Check, MapPin, Cog } from 'lucide-react';
import { contactInfo, openingHoursWerkstatt, openingHoursBuero } from '../_design/data';

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

/* ── Kontakt Page ─────────────────────────────────────────────── */

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    anliegen: 'anfrage',
    name: '',
    email: '',
    telefon: '',
    nachricht: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyles: React.CSSProperties = {
    fontFamily: 'var(--wb-font-body)',
    fontSize: '0.95rem',
    color: 'var(--wb-text)',
    backgroundColor: 'var(--wb-bg)',
    border: '1.5px solid var(--wb-divider)',
    borderRadius: '4px',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: 'var(--wb-font-body)',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--wb-text)',
    display: 'block',
    marginBottom: '6px',
  };

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
            top: '20%',
            right: '8%',
            width: '180px',
            height: '180px',
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
              Sprechen Sie mit uns
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
              Kontakt
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
              Ob Anfrage, Beratung oder einfach nur ein Gespräch über Ihr Projekt —
              wir sind für Sie da.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 24px', backgroundColor: 'var(--wb-bg)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '64px',
          }}
          className="max-lg:grid-cols-1"
        >
          {/* Contact Form */}
          <FadeIn>
            <div
              style={{
                backgroundColor: 'var(--wb-surface)',
                borderRadius: '8px',
                padding: '40px',
                boxShadow: '0 4px 24px rgba(61, 43, 31, 0.06)',
              }}
            >
              {submitted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--wb-accent), var(--wb-forge))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: '#fff',
                    }}
                  >
                    <Check className="h-7 w-7" />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--wb-font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--wb-dark)',
                      marginBottom: '12px',
                    }}
                  >
                    Vielen Dank für Ihre Nachricht!
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '1rem',
                      color: 'var(--wb-muted)',
                      lineHeight: 1.7,
                    }}
                  >
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                    Für dringende Anfragen erreichen Sie uns unter {contactInfo.phone}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ anliegen: 'anfrage', name: '', email: '', telefon: '', nachricht: '' });
                    }}
                    style={{
                      marginTop: '24px',
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'var(--wb-accent)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      textDecoration: 'underline',
                    }}
                  >
                    Neue Nachricht senden
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    style={{
                      fontFamily: 'var(--wb-font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--wb-dark)',
                      marginBottom: '8px',
                    }}
                  >
                    Nachricht senden
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--wb-muted)',
                      marginBottom: '32px',
                    }}
                  >
                    Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Anliegen */}
                    <div>
                      <label style={labelStyles}>Anliegen</label>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                          { value: 'anfrage', label: 'Anfrage' },
                          { value: 'beratung', label: 'Beratung' },
                          { value: 'reparatur', label: 'Reparatur' },
                          { value: 'sonstiges', label: 'Sonstiges' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, anliegen: option.value })}
                            style={{
                              fontFamily: 'var(--wb-font-body)',
                              fontSize: '0.85rem',
                              fontWeight: formData.anliegen === option.value ? 600 : 400,
                              color: formData.anliegen === option.value ? '#fff' : 'var(--wb-text)',
                              backgroundColor:
                                formData.anliegen === option.value ? 'var(--wb-accent)' : 'var(--wb-bg)',
                              border: `1.5px solid ${
                                formData.anliegen === option.value ? 'var(--wb-accent)' : 'var(--wb-divider)'
                              }`,
                              padding: '8px 18px',
                              borderRadius: '4px',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email row */}
                    <div
                      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
                      className="max-sm:grid-cols-1"
                    >
                      <div>
                        <label style={labelStyles}>Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ihr vollständiger Name"
                          style={inputStyles}
                          className="focus:border-[var(--wb-accent)]"
                        />
                      </div>
                      <div>
                        <label style={labelStyles}>E-Mail *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ihre@email.de"
                          style={inputStyles}
                          className="focus:border-[var(--wb-accent)]"
                        />
                      </div>
                    </div>

                    {/* Telefon */}
                    <div>
                      <label style={labelStyles}>Telefon</label>
                      <input
                        type="tel"
                        value={formData.telefon}
                        onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                        placeholder="Für Rückfragen (optional)"
                        style={inputStyles}
                        className="focus:border-[var(--wb-accent)]"
                      />
                    </div>

                    {/* Nachricht */}
                    <div>
                      <label style={labelStyles}>Projektbeschreibung *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.nachricht}
                        onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })}
                        placeholder="Erzählen Sie uns von Ihrem Projekt, Ihren Wünschen und Vorstellungen..."
                        style={{
                          ...inputStyles,
                          resize: 'vertical',
                          minHeight: '120px',
                        }}
                        className="focus:border-[var(--wb-accent)]"
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#fff',
                        backgroundColor: 'var(--wb-accent)',
                        border: 'none',
                        padding: '14px 32px',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease',
                        alignSelf: 'flex-start',
                      }}
                      className="hover:bg-[var(--wb-accent-hover)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Nachricht senden &rarr;
                    </button>
                  </form>
                </>
              )}
            </div>
          </FadeIn>

          {/* Right Column: Contact Info */}
          <div>
            {/* Contact Details */}
            <FadeIn delay={0.1}>
              <div
                style={{
                  backgroundColor: 'var(--wb-surface)',
                  borderRadius: '8px',
                  padding: '32px',
                  marginBottom: '24px',
                  boxShadow: '0 4px 24px rgba(61, 43, 31, 0.06)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--wb-font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--wb-dark)',
                    marginBottom: '20px',
                  }}
                >
                  Kontaktdaten
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--wb-accent)',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      Adresse
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.95rem',
                        color: 'var(--wb-text)',
                        lineHeight: 1.6,
                      }}
                    >
                      {contactInfo.company}<br />
                      {contactInfo.street}<br />
                      {contactInfo.city}
                    </p>
                  </div>

                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'var(--wb-divider)',
                    }}
                  />

                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--wb-accent)',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      Telefon
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--wb-font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--wb-dark)',
                      }}
                    >
                      {contactInfo.phone}
                    </p>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--wb-accent)',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      E-Mail
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.95rem',
                        color: 'var(--wb-text)',
                      }}
                    >
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Opening Hours */}
            <FadeIn delay={0.2}>
              <div
                style={{
                  backgroundColor: 'var(--wb-surface)',
                  borderRadius: '8px',
                  padding: '32px',
                  marginBottom: '24px',
                  boxShadow: '0 4px 24px rgba(61, 43, 31, 0.06)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--wb-font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'var(--wb-dark)',
                    marginBottom: '20px',
                  }}
                >
                  Öffnungszeiten
                </h3>

                {/* Werkstatt */}
                <div style={{ marginBottom: '20px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--wb-accent)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Werkstatt
                  </span>
                  {openingHoursWerkstatt.map((oh) => (
                    <div
                      key={oh.label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '4px 0',
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.9rem',
                      }}
                    >
                      <span style={{ color: 'var(--wb-muted)' }}>{oh.label}</span>
                      <span style={{ color: 'var(--wb-text)', fontWeight: 500 }}>{oh.hours}</span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'var(--wb-divider)',
                    margin: '16px 0',
                  }}
                />

                {/* Büro */}
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--wb-font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--wb-accent)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Büro & Beratung
                  </span>
                  {openingHoursBuero.map((oh) => (
                    <div
                      key={oh.label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '4px 0',
                        fontFamily: 'var(--wb-font-body)',
                        fontSize: '0.9rem',
                      }}
                    >
                      <span style={{ color: 'var(--wb-muted)' }}>{oh.label}</span>
                      <span style={{ color: 'var(--wb-text)', fontWeight: 500 }}>{oh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Map Placeholder */}
            <FadeIn delay={0.3}>
              <div
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '200px',
                  background: 'linear-gradient(145deg, #D4C9BC, #EDE5DA, #D4C9BC)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '8px',
                  border: '1px solid var(--wb-divider)',
                }}
              >
                <span style={{ opacity: 0.3 }}><MapPin className="h-8 w-8" /></span>
                <span
                  style={{
                    fontFamily: 'var(--wb-font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--wb-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Karte &middot; Berlin
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Werkstatt besuchen ────────────────────────────────── */}
      <section
        style={{
          padding: '80px 24px',
          backgroundColor: 'var(--wb-card)',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
          className="max-md:grid-cols-1"
        >
          <FadeIn>
            <div>
              <span
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--wb-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '2px',
                    background: 'var(--wb-accent)',
                    display: 'inline-block',
                  }}
                />
                Vor Ort
              </span>

              <h2
                style={{
                  fontFamily: 'var(--wb-font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  color: 'var(--wb-dark)',
                  marginTop: '12px',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}
              >
                Besuchen Sie unsere Werkstatt & Ausstellung
              </h2>

              <p
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '1rem',
                  color: 'var(--wb-muted)',
                  lineHeight: 1.8,
                  marginBottom: '12px',
                }}
              >
                In unserem Showroom können Sie Materialien anfassen, Oberflächen vergleichen und
                sich von realisierten Projekten inspirieren lassen. Ein Besuch sagt mehr als
                tausend Bilder.
              </p>

              <p
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--wb-muted)',
                  lineHeight: 1.7,
                }}
              >
                <strong style={{ color: 'var(--wb-text)' }}>Anfahrt:</strong> Kostenlose Parkplätze direkt
                vor der Werkstatt verfügbar.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              style={{
                background: 'linear-gradient(145deg, #3D2B1F, #5A6672, #8A7B6E)',
                borderRadius: '6px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
              }}
            >
              <span style={{ opacity: 0.2, color: '#fff' }}><Cog className="h-12 w-12" /></span>
              <span
                style={{
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 500,
                }}
              >
                Showroom & Werkstatt
              </span>
              {/* Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '6px 14px',
                  backgroundColor: 'var(--wb-accent)',
                  borderRadius: '3px',
                  fontFamily: 'var(--wb-font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: '#fff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                800m² Fläche
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
