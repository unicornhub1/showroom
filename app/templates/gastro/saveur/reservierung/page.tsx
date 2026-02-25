'use client'

import { useRef, useState, useEffect } from 'react'
import { openingHours } from '../_design/data'

const BASE = "/templates/gastro/saveur"

/* ── Scroll-triggered FadeIn ─────────────────────────────────────────── */

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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
  )
}

/* ── Form Input component ────────────────────────────────────────────── */

function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        className="block text-[10px] uppercase tracking-[0.2em] mb-2"
        style={{
          fontFamily: 'var(--sv-font-body)',
          color: 'var(--sv-accent)',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

/* ── Reservierung Page ───────────────────────────────────────────────── */

export default function ReservierungPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    wishes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--sv-font-body)',
    backgroundColor: 'transparent',
    borderColor: 'var(--sv-border-strong)',
    color: 'var(--sv-text)',
    fontWeight: 300,
  }

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 0%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(107,45,62,0.1) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="h-px w-8"
                style={{ backgroundColor: 'var(--sv-gold)' }}
              />
              <span
                className="text-[10px] tracking-[0.5em] uppercase"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-accent)',
                }}
              >
                Ihr Erlebnis beginnt hier
              </span>
              <div
                className="h-px w-8"
                style={{ backgroundColor: 'var(--sv-gold)' }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl mb-6"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
              }}
            >
              Reservierung
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              className="text-base sm:text-lg max-w-lg mx-auto"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Sichern Sie sich Ihren Tisch f&uuml;r ein unvergessliches
              kulinarisches Erlebnis.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <FadeIn>
                  <div
                    className="border p-8 sm:p-12 text-center"
                    style={{ borderColor: 'var(--sv-accent)' }}
                  >
                    <div
                      className="h-2 w-2 rotate-45 mx-auto mb-6"
                      style={{ backgroundColor: 'var(--sv-gold)' }}
                    />
                    <h2
                      className="text-3xl sm:text-4xl mb-4"
                      style={{
                        fontFamily: 'var(--sv-font-display)',
                        color: 'var(--sv-text)',
                        fontWeight: 300,
                      }}
                    >
                      Vielen Dank
                    </h2>
                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-muted)',
                        fontWeight: 300,
                      }}
                    >
                      Ihre Reservierungsanfrage wurde &uuml;bermittelt.
                      Wir best&auml;tigen Ihnen innerhalb von 24 Stunden
                      per E-Mail.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({
                          date: '',
                          time: '19:00',
                          guests: '2',
                          name: '',
                          email: '',
                          phone: '',
                          wishes: '',
                        })
                      }}
                      className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-muted)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px',
                      }}
                    >
                      Neue Reservierung
                    </button>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn>
                  <form onSubmit={handleSubmit}>
                    {/* Row 1: Date, Time, Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                      <FormField label="Datum">
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-[var(--sv-accent)]"
                          style={inputStyle}
                        />
                      </FormField>

                      <FormField label="Uhrzeit">
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-[var(--sv-accent)] appearance-none"
                          style={{
                            ...inputStyle,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C8956C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            paddingRight: '36px',
                          }}
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot} Uhr
                            </option>
                          ))}
                        </select>
                      </FormField>

                      <FormField label="G&auml;ste">
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-[var(--sv-accent)] appearance-none"
                          style={{
                            ...inputStyle,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C8956C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            paddingRight: '36px',
                          }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? 'Person' : 'Personen'}
                            </option>
                          ))}
                          <option value="9+">9+ (bitte anrufen)</option>
                        </select>
                      </FormField>
                    </div>

                    {/* Row 2: Name, Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      <FormField label="Vollst&auml;ndiger Name">
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Max Mustermann"
                          className="w-full border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-[var(--sv-accent)] placeholder:text-[var(--sv-muted)] placeholder:opacity-40"
                          style={inputStyle}
                        />
                      </FormField>

                      <FormField label="E-Mail">
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="max@beispiel.de"
                          className="w-full border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-[var(--sv-accent)] placeholder:text-[var(--sv-muted)] placeholder:opacity-40"
                          style={inputStyle}
                        />
                      </FormField>
                    </div>

                    {/* Row 3: Phone */}
                    <div className="mb-8">
                      <FormField label="Telefon">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+49 30 1234 5678"
                          className="w-full sm:w-1/2 border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-[var(--sv-accent)] placeholder:text-[var(--sv-muted)] placeholder:opacity-40"
                          style={inputStyle}
                        />
                      </FormField>
                    </div>

                    {/* Row 4: Special wishes */}
                    <div className="mb-10">
                      <FormField label="Besondere W&uuml;nsche">
                        <textarea
                          name="wishes"
                          value={formData.wishes}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Allergien, Unvertr&auml;glichkeiten, besondere Anl&auml;sse..."
                          className="w-full border px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-[var(--sv-accent)] resize-none placeholder:text-[var(--sv-muted)] placeholder:opacity-40"
                          style={inputStyle}
                        />
                      </FormField>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto border-2 px-10 py-4 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-[var(--sv-accent)] hover:text-[var(--sv-bg)] hover:border-[var(--sv-accent)]"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-accent)',
                        borderColor: 'var(--sv-accent)',
                      }}
                    >
                      Reservierung anfragen
                    </button>

                    <p
                      className="mt-4 text-xs"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-muted)',
                        opacity: 0.5,
                      }}
                    >
                      Wir best&auml;tigen Ihre Reservierung innerhalb von 24 Stunden per E-Mail.
                    </p>
                  </form>
                </FadeIn>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Opening hours */}
              <FadeIn delay={0.2}>
                <div
                  className="border p-6 sm:p-8 mb-8"
                  style={{ borderColor: 'var(--sv-border)' }}
                >
                  <h3
                    className="text-[10px] uppercase tracking-[0.3em] mb-6"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-accent)',
                    }}
                  >
                    &Ouml;ffnungszeiten
                  </h3>

                  <ul className="space-y-3">
                    {openingHours.map((item) => (
                      <li
                        key={item.day}
                        className="flex justify-between text-sm"
                        style={{
                          fontFamily: 'var(--sv-font-body)',
                          fontWeight: 300,
                          opacity: item.hours === 'Ruhetag' ? 0.4 : 1,
                        }}
                      >
                        <span style={{ color: 'var(--sv-muted)' }}>
                          {item.day}
                        </span>
                        <span
                          style={{
                            color:
                              item.hours === 'Ruhetag'
                                ? 'var(--sv-wine)'
                                : 'var(--sv-text)',
                            fontStyle:
                              item.hours === 'Ruhetag' ? 'italic' : 'normal',
                          }}
                        >
                          {item.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Contact */}
              <FadeIn delay={0.35}>
                <div
                  className="border p-6 sm:p-8 mb-8"
                  style={{ borderColor: 'var(--sv-border)' }}
                >
                  <h3
                    className="text-[10px] uppercase tracking-[0.3em] mb-6"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-accent)',
                    }}
                  >
                    Direkt erreichen
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-muted)',
                      fontWeight: 300,
                    }}
                  >
                    F&uuml;r Gruppen ab 9 Personen oder besondere
                    Anl&auml;sse kontaktieren Sie uns bitte direkt:
                  </p>
                  <p
                    className="mt-3 text-base"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-accent)',
                    }}
                  >
                    +49 30 1234 5678
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-accent)',
                    }}
                  >
                    reservierung@saveur.de
                  </p>
                </div>
              </FadeIn>

              {/* Decorative quote */}
              <FadeIn delay={0.5}>
                <div className="relative p-6 sm:p-8">
                  <span
                    className="absolute -top-4 -left-2 text-6xl leading-none select-none"
                    style={{
                      fontFamily: 'var(--sv-font-display)',
                      color: 'var(--sv-accent)',
                      opacity: 0.15,
                    }}
                  >
                    &ldquo;
                  </span>
                  <p
                    className="text-base italic leading-relaxed relative z-10"
                    style={{
                      fontFamily: 'var(--sv-font-display)',
                      color: 'var(--sv-muted)',
                      fontWeight: 300,
                    }}
                  >
                    Die sch&ouml;nsten Erinnerungen entstehen am gedeckten Tisch.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div
                      className="h-px w-6"
                      style={{ backgroundColor: 'var(--sv-gold)' }}
                    />
                    <span
                      className="text-[10px] tracking-[0.15em] uppercase"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-muted)',
                        opacity: 0.6,
                      }}
                    >
                      SAVEUR
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
