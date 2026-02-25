'use client';

import { useRef, useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Camera, Check } from 'lucide-react';
import { openingHours, contactInfo } from '../_design/data';

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

/* ---- Input style helper ---- */
const inputBase: React.CSSProperties = {
  fontFamily: 'var(--pk-font-body)',
  fontSize: '15px',
  fontWeight: 400,
  color: 'var(--pk-text)',
  backgroundColor: 'var(--pk-surface)',
  border: '1px solid var(--pk-steel)',
  padding: '14px 16px',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s ease',
};

export default function KontaktPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Kontakt
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
              KOMM<br />
              <span style={{ color: 'var(--pk-accent)' }}>VORBEI.</span>
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
              Du hast Fragen, willst ein Probetraining vereinbaren oder
              direkt loslegen? Schreib uns oder komm einfach vorbei.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---- Main Content Grid ---- */}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* ---- Contact Form ---- */}
            <FadeIn>
              <div
                style={{
                  backgroundColor: 'var(--pk-card)',
                  border: '1px solid var(--pk-steel)',
                  padding: '40px 36px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent line top */}
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

                <h2
                  style={{
                    fontFamily: 'var(--pk-font-display)',
                    fontSize: '28px',
                    color: 'var(--pk-text)',
                    margin: '0 0 8px 0',
                  }}
                >
                  Nachricht senden
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--pk-font-body)',
                    fontSize: '14px',
                    color: 'var(--pk-muted)',
                    margin: '0 0 32px 0',
                  }}
                >
                  Wir melden uns innerhalb von 24 Stunden zurück.
                </p>

                {submitted ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '48px 24px',
                    }}
                  >
                    <div style={{ marginBottom: '16px', color: 'var(--pk-accent)' }}><Check className="h-12 w-12 mx-auto" /></div>
                    <h3
                      style={{
                        fontFamily: 'var(--pk-font-display)',
                        fontSize: '24px',
                        color: 'var(--pk-accent)',
                        marginBottom: '8px',
                      }}
                    >
                      Nachricht gesendet!
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '14px',
                        color: 'var(--pk-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      Vielen Dank für deine Nachricht. Wir melden uns
                      schnellstmöglich bei dir.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Name */}
                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--pk-muted)',
                          marginBottom: '8px',
                          display: 'block',
                        }}
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="Dein Name"
                        className="focus:border-[var(--pk-accent)]"
                        style={inputBase}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--pk-muted)',
                          marginBottom: '8px',
                          display: 'block',
                        }}
                      >
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="deine@email.de"
                        className="focus:border-[var(--pk-accent)]"
                        style={inputBase}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--pk-muted)',
                          marginBottom: '8px',
                          display: 'block',
                        }}
                      >
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+49 ..."
                        className="focus:border-[var(--pk-accent)]"
                        style={inputBase}
                      />
                    </div>

                    {/* Reason dropdown */}
                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--pk-muted)',
                          marginBottom: '8px',
                          display: 'block',
                        }}
                      >
                        Grund *
                      </label>
                      <select
                        name="reason"
                        value={formState.reason}
                        onChange={handleChange}
                        required
                        className="focus:border-[var(--pk-accent)]"
                        style={{
                          ...inputBase,
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B6B6B' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 16px center',
                          paddingRight: '40px',
                        }}
                      >
                        <option value="" style={{ backgroundColor: 'var(--pk-surface)', color: 'var(--pk-muted)' }}>
                          Bitte wählen...
                        </option>
                        <option value="probetraining" style={{ backgroundColor: 'var(--pk-surface)' }}>
                          Probetraining
                        </option>
                        <option value="mitgliedschaft" style={{ backgroundColor: 'var(--pk-surface)' }}>
                          Mitgliedschaft
                        </option>
                        <option value="allgemein" style={{ backgroundColor: 'var(--pk-surface)' }}>
                          Allgemeine Anfrage
                        </option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        style={{
                          fontFamily: 'var(--pk-font-body)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--pk-muted)',
                          marginBottom: '8px',
                          display: 'block',
                        }}
                      >
                        Nachricht *
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Deine Nachricht an uns..."
                        className="focus:border-[var(--pk-accent)]"
                        style={{
                          ...inputBase,
                          resize: 'vertical',
                          minHeight: '120px',
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] transition-all duration-300"
                      style={{
                        fontFamily: 'var(--pk-font-body)',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        padding: '16px 32px',
                        backgroundColor: 'var(--pk-accent)',
                        color: '#FFFFFF',
                        border: 'none',
                        clipPath: 'polygon(0 0, 100% 0, 97% 100%, 3% 100%)',
                        marginTop: '8px',
                      }}
                    >
                      Nachricht senden
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* ---- Right Side: Info ---- */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Contact Info Cards */}
              <FadeIn delay={0.1}>
                <div
                  style={{
                    backgroundColor: 'var(--pk-card)',
                    border: '1px solid var(--pk-steel)',
                    padding: '32px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--pk-font-display)',
                      fontSize: '20px',
                      color: 'var(--pk-text)',
                      margin: '0 0 20px 0',
                    }}
                  >
                    Kontaktdaten
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Address */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: 'var(--pk-accent-dim)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <MapPin className="h-4 w-4" style={{ color: 'var(--pk-accent)' }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-text)', fontWeight: 500 }}>
                          {contactInfo.address}
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: 'var(--pk-accent-dim)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Phone className="h-4 w-4" style={{ color: 'var(--pk-accent)' }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-text)', fontWeight: 500 }}>
                          {contactInfo.phone}
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: 'var(--pk-accent-dim)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Mail className="h-4 w-4" style={{ color: 'var(--pk-accent)' }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-accent)', fontWeight: 500 }}>
                          {contactInfo.email}
                        </div>
                      </div>
                    </div>

                    {/* Instagram */}
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: 'var(--pk-accent-dim)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Camera className="h-4 w-4" style={{ color: 'var(--pk-accent)' }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--pk-font-body)', fontSize: '14px', color: 'var(--pk-muted)', fontWeight: 500 }}>
                          {contactInfo.instagram}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Opening Hours */}
              <FadeIn delay={0.2}>
                <div
                  style={{
                    backgroundColor: 'var(--pk-card)',
                    border: '1px solid var(--pk-steel)',
                    padding: '32px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--pk-font-display)',
                      fontSize: '20px',
                      color: 'var(--pk-text)',
                      margin: '0 0 20px 0',
                    }}
                  >
                    Öffnungszeiten
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {openingHours.map((h) => (
                      <div
                        key={h.day}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: '1px solid var(--pk-steel)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--pk-font-body)',
                            fontSize: '14px',
                            color: 'var(--pk-muted)',
                          }}
                        >
                          {h.day}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--pk-font-display)',
                            fontSize: '16px',
                            color: 'var(--pk-text)',
                          }}
                        >
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Map Placeholder */}
              <FadeIn delay={0.3}>
                <div
                  style={{
                    position: 'relative',
                    height: '250px',
                    backgroundColor: 'var(--pk-card)',
                    border: '1px solid var(--pk-steel)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    className="pk-grid-pattern"
                    style={{ position: 'absolute', inset: 0, opacity: 0.8 }}
                  />
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ marginBottom: '8px', color: 'var(--pk-accent)' }}><MapPin className="h-10 w-10 mx-auto" /></div>
                    <div
                      style={{
                        fontFamily: 'var(--pk-font-display)',
                        fontSize: '18px',
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
                      Berlin Mitte — Musterstraße 1
                    </div>
                  </div>
                  {/* Pulse ring */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100px',
                      height: '100px',
                      border: '2px solid var(--pk-accent)',
                      borderRadius: '50%',
                      opacity: 0.15,
                      animation: 'pk-pulse-red 3s ease infinite',
                    }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Motivational CTA ---- */}
      <section
        style={{
          padding: '100px 24px',
          backgroundColor: 'var(--pk-surface)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, transparent 30%, var(--pk-accent-dim) 100%)',
            opacity: 0.5,
          }}
        />

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: 'var(--pk-font-display)',
                fontSize: 'clamp(36px, 6vw, 72px)',
                lineHeight: 1,
                color: 'var(--pk-text)',
                margin: '0 0 24px 0',
              }}
            >
              DER ERSTE SCHRITT
              <br />
              <span style={{ color: 'var(--pk-accent)' }}>ZÄHLT.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                fontFamily: 'var(--pk-font-body)',
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'var(--pk-muted)',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              Du musst nicht perfekt sein, um anzufangen.
              Aber du musst anfangen, um besser zu werden.
              Wir sehen uns im Studio.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
