'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { teamMembers } from '../_design/data'

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

/* ── Timeline Item ───────────────────────────────────────────────────── */

function TimelineItem({
  year,
  title,
  description,
  index,
}: {
  year: string
  title: string
  description: string
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <FadeIn delay={0.15 * index}>
      <div className="relative flex items-start gap-6 sm:gap-8 pb-12 last:pb-0">
        {/* Year badge */}
        <div className="shrink-0 w-16 sm:w-20 text-right pt-0.5">
          <span
            className="text-lg sm:text-xl"
            style={{
              fontFamily: 'var(--sv-font-display)',
              color: 'var(--sv-gold)',
              fontWeight: 400,
            }}
          >
            {year}
          </span>
        </div>

        {/* Vertical line + dot */}
        <div className="relative flex flex-col items-center shrink-0">
          <div
            className="h-3 w-3 rounded-full border-2 mt-1.5"
            style={{
              borderColor: 'var(--sv-accent)',
              backgroundColor: 'var(--sv-bg)',
            }}
          />
          <div
            className="w-px flex-1 mt-2"
            style={{ backgroundColor: 'var(--sv-border-strong)' }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <h3
            className="text-lg sm:text-xl mb-2"
            style={{
              fontFamily: 'var(--sv-font-display)',
              color: 'var(--sv-text)',
              fontWeight: 400,
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: 'var(--sv-font-body)',
              color: 'var(--sv-muted)',
              fontWeight: 300,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

/* ── Team Card ───────────────────────────────────────────────────────── */

function TeamCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0]
  index: number
}) {
  return (
    <FadeIn delay={0.15 * index}>
      <div className="group">
        {/* Avatar gradient placeholder with initials */}
        <div
          className="relative h-[300px] sm:h-[360px] mb-5 overflow-hidden border transition-all duration-500 group-hover:border-[var(--sv-accent)]"
          style={{
            borderColor: 'var(--sv-border)',
            background: member.gradient,
          }}
        >
          {/* Initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-5xl sm:text-6xl select-none"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
                opacity: 0.6,
              }}
            >
              {member.initials}
            </span>
          </div>

          {/* Decorative corner */}
          <div
            className="absolute bottom-3 right-3 h-6 w-6 border-b border-r transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ borderColor: 'var(--sv-accent)' }}
          />
        </div>

        {/* Info */}
        <h3
          className="text-xl mb-1"
          style={{
            fontFamily: 'var(--sv-font-display)',
            color: 'var(--sv-text)',
            fontWeight: 400,
          }}
        >
          {member.name}
        </h3>
        <p
          className="text-[10px] uppercase tracking-[0.25em] mb-3"
          style={{
            fontFamily: 'var(--sv-font-body)',
            color: 'var(--sv-accent)',
          }}
        >
          {member.role}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: 'var(--sv-font-body)',
            color: 'var(--sv-muted)',
            fontWeight: 300,
          }}
        >
          {member.bio}
        </p>
      </div>
    </FadeIn>
  )
}

/* ── Ueber Uns Page ──────────────────────────────────────────────────── */

export default function UeberUnsPage() {
  const timelineData = [
    {
      year: '2015',
      title: 'Die Idee',
      description:
        'Jean-Marc Dubois kehrt nach Stationen bei Alain Ducasse und im Noma nach Berlin zur\u00FCck \u2014 mit der Vision eines Restaurants, das franz\u00F6sische Haute Cuisine mit der kreativen Energie Berlins verbindet.',
    },
    {
      year: '2017',
      title: 'Der Raum',
      description:
        'In einem historischen Geb\u00E4ude in Berlin-Mitte findet Jean-Marc den perfekten Ort: hohe Decken, warmes Holz und die Seele einer vergangenen Epoche, bereit f\u00FCr ein neues Kapitel.',
    },
    {
      year: '2019',
      title: 'Er\u00F6ffnung',
      description:
        'SAVEUR \u00F6ffnet seine T\u00FCren. Vom ersten Abend an verbindet sich erstklassige K\u00FCche mit einem Ambiente, das zum Verweilen einl\u00E4dt. Die Berliner Gastro-Szene nimmt Notiz.',
    },
    {
      year: '2021',
      title: 'Anerkennung',
      description:
        'Der erste Michelin-Stern. SAVEUR wird als eines der besten Restaurants Berlins gef\u00FChrt. Das Team w\u00E4chst, die Vision bleibt.',
    },
    {
      year: '2024',
      title: 'Chef\u2019s Table',
      description:
        'Er\u00F6ffnung des intimen Chef\u2019s Table Bereichs f\u00FCr bis zu 8 G\u00E4ste \u2014 ein exklusives Erlebnis direkt am Herd, mit pers\u00F6nlicher Men\u00FC-Begleitung durch den K\u00FCchenchef.',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Atmospheric gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(107,45,62,0.12) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(200,149,108,0.08) 0%, transparent 50%)',
          }}
        />

        {/* Huge decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <p
            className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] whitespace-nowrap"
            style={{
              fontFamily: 'var(--sv-font-display)',
              color: 'var(--sv-text)',
              opacity: 0.02,
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            SAVEUR
          </p>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="h-px w-12"
                style={{ backgroundColor: 'var(--sv-accent)' }}
              />
              <span
                className="text-[10px] tracking-[0.5em] uppercase"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-accent)',
                }}
              >
                Unsere Geschichte
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              Aus Leidenschaft
              <br />
              <span style={{ color: 'var(--sv-accent)' }}>geboren</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p
              className="text-lg sm:text-xl max-w-2xl leading-relaxed"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
              }}
            >
              SAVEUR ist mehr als ein Restaurant &mdash; es ist die Verwirklichung
              eines Traums: Ein Ort, an dem kulinarische Handwerkskunst auf
              herzliche Gastfreundschaft trifft.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Chef Story */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--sv-surface)' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Chef portrait placeholder */}
            <FadeIn>
              <div
                className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden border"
                style={{
                  borderColor: 'var(--sv-border)',
                  background: 'linear-gradient(135deg, #1A1412 0%, #C8956C 50%, #D4AF37 100%)',
                }}
              >
                {/* Initials overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-8xl select-none"
                    style={{
                      fontFamily: 'var(--sv-font-display)',
                      color: 'var(--sv-text)',
                      fontWeight: 300,
                      opacity: 0.4,
                    }}
                  >
                    JD
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1" style={{ backgroundColor: 'var(--sv-accent)', opacity: 0.5 }} />
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase whitespace-nowrap"
                      style={{
                        fontFamily: 'var(--sv-font-body)',
                        color: 'var(--sv-text)',
                        opacity: 0.7,
                      }}
                    >
                      Jean-Marc Dubois
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: Story text */}
            <div>
              <FadeIn delay={0.15}>
                <span
                  className="text-[10px] tracking-[0.5em] uppercase block mb-4"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-accent)',
                  }}
                >
                  Der K&uuml;chenchef
                </span>
              </FadeIn>

              <FadeIn delay={0.25}>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl mb-8"
                  style={{
                    fontFamily: 'var(--sv-font-display)',
                    color: 'var(--sv-text)',
                    fontWeight: 300,
                    lineHeight: 1.2,
                  }}
                >
                  Jean-Marc Dubois
                </h2>
              </FadeIn>

              <FadeIn delay={0.35}>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-muted)',
                    fontWeight: 300,
                  }}
                >
                  Geboren im Elsass, aufgewachsen zwischen zwei Kulturen, fand
                  Jean-Marc seine Berufung fr&uuml;h: die Sprache des Geschmacks.
                  Nach seiner Ausbildung in Lyon f&uuml;hrte ihn sein Weg in die
                  K&uuml;chen von Alain Ducasse in Paris und ins Noma nach Kopenhagen.
                </p>
              </FadeIn>

              <FadeIn delay={0.45}>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-muted)',
                    fontWeight: 300,
                  }}
                >
                  Jede Station pr&auml;gte seine K&uuml;chenphilosophie: Respekt vor dem
                  Produkt, Mut zur Einfachheit und die &Uuml;berzeugung, dass
                  wahre Kulinarik Emotionen wecken muss.
                </p>
              </FadeIn>

              <FadeIn delay={0.55}>
                <p
                  className="text-base leading-relaxed mb-10"
                  style={{
                    fontFamily: 'var(--sv-font-body)',
                    color: 'var(--sv-muted)',
                    fontWeight: 300,
                  }}
                >
                  2019 verwirklichte er seinen Traum und er&ouml;ffnete SAVEUR in
                  Berlin-Mitte &mdash; ein Restaurant, das franz&ouml;sische Finesse
                  mit Berliner Freigeist verbindet.
                </p>
              </FadeIn>

              <FadeIn delay={0.65}>
                <blockquote
                  className="border-l-2 pl-6 py-2"
                  style={{ borderColor: 'var(--sv-accent)' }}
                >
                  <p
                    className="text-lg italic"
                    style={{
                      fontFamily: 'var(--sv-font-display)',
                      color: 'var(--sv-text)',
                      fontWeight: 300,
                    }}
                  >
                    &bdquo;Kochen ist f&uuml;r mich die ehrlichste Form der
                    Kommunikation.&ldquo;
                  </p>
                </blockquote>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(107,45,62,0.08) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16" style={{ backgroundColor: 'var(--sv-gold)' }} />
              <div className="h-2 w-2 rotate-45" style={{ backgroundColor: 'var(--sv-gold)' }} />
              <div className="h-px w-16" style={{ backgroundColor: 'var(--sv-gold)' }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <span
              className="text-[10px] tracking-[0.5em] uppercase block mb-6"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-accent)',
              }}
            >
              Philosophie
            </span>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl mb-8"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
                lineHeight: 1.3,
              }}
            >
              Saisonal. Regional. Emotional.
            </h2>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p
              className="text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
              }}
            >
              Unsere K&uuml;che basiert auf drei S&auml;ulen: die besten saisonalen Produkte,
              gewachsene Beziehungen zu regionalen Erzeugern und die emotionale
              Verbindung, die ein perfektes Gericht schaffen kann.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
              }}
            >
              Wir arbeiten t&auml;glich mit dem, was die Natur uns schenkt, und
              verwandeln es in Gerichte, die Geschichten erz&auml;hlen. Jeder
              Teller ist eine Hommage an das Handwerk und an die Menschen,
              die es m&ouml;glich machen.
            </p>
          </FadeIn>
        </div>

        {/* Three philosophy columns */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 sm:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            {[
              {
                title: 'Produkt',
                text: 'Wir beziehen direkt von kleinen Bauern und Fischern. Jede Zutat hat einen Namen, einen Ort und eine Geschichte.',
              },
              {
                title: 'Handwerk',
                text: 'Klassische Techniken, verfeinert durch moderne Erkenntnisse. Unsere K\u00FCche ist ein st\u00E4ndiges Streben nach Perfektion.',
              },
              {
                title: 'Erlebnis',
                text: 'Vom ersten Gru\u00DF aus der K\u00FCche bis zum letzten Petit Four \u2014 jedes Detail ist durchdacht, um Freude zu schenken.',
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={0.15 * i}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-6" style={{ backgroundColor: 'var(--sv-accent)', opacity: 0.4 }} />
                    <h3
                      className="text-xl"
                      style={{
                        fontFamily: 'var(--sv-font-display)',
                        color: 'var(--sv-text)',
                        fontWeight: 400,
                      }}
                    >
                      {item.title}
                    </h3>
                    <div className="h-px w-6" style={{ backgroundColor: 'var(--sv-accent)', opacity: 0.4 }} />
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: 'var(--sv-font-body)',
                      color: 'var(--sv-muted)',
                      fontWeight: 300,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{ backgroundColor: 'var(--sv-surface)' }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span
                className="text-[10px] tracking-[0.5em] uppercase block mb-4"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-accent)',
                }}
              >
                Unsere Reise
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: 'var(--sv-font-display)',
                  color: 'var(--sv-text)',
                  fontWeight: 300,
                }}
              >
                Meilensteine
              </h2>
            </div>
          </FadeIn>

          {timelineData.map((item, i) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              title={item.title}
              description={item.description}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, rgba(200,149,108,0.06) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <span
                className="text-[10px] tracking-[0.5em] uppercase block mb-4"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-accent)',
                }}
              >
                Die Menschen dahinter
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: 'var(--sv-font-display)',
                  color: 'var(--sv-text)',
                  fontWeight: 300,
                }}
              >
                Unser Team
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ backgroundColor: 'var(--sv-surface)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(107,45,62,0.1) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <FadeIn>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl mb-6"
              style={{
                fontFamily: 'var(--sv-font-display)',
                color: 'var(--sv-text)',
                fontWeight: 300,
              }}
            >
              Lernen Sie uns kennen
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p
              className="text-base sm:text-lg leading-relaxed mb-10"
              style={{
                fontFamily: 'var(--sv-font-body)',
                color: 'var(--sv-muted)',
                fontWeight: 300,
              }}
            >
              Erleben Sie SAVEUR pers&ouml;nlich &mdash; wir freuen uns auf Ihren Besuch.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`${BASE}/reservierung`}
                className="border-2 px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] transition-all duration-500 hover:bg-[var(--sv-accent)] hover:text-[var(--sv-bg)] hover:border-[var(--sv-accent)]"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-accent)',
                  borderColor: 'var(--sv-accent)',
                }}
              >
                Tisch reservieren
              </Link>
              <Link
                href={`${BASE}/galerie`}
                className="text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-[var(--sv-accent)]"
                style={{
                  fontFamily: 'var(--sv-font-body)',
                  color: 'var(--sv-muted)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                Galerie ansehen
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
