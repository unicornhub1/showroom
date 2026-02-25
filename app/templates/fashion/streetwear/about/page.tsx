"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BASE = "/templates/fashion/streetwear";

/* ── Fade-in wrapper ─────────────────────────────────────────────────── */

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── About Page ────────────────────────────────────────────────────────── */

export default function AboutPage() {
  const values = [
    {
      number: "01",
      title: "Keine Kompromisse",
      text: "Jedes Material wird handverlesen. Jede Naht wird geprüft. Wir akzeptieren nur das Beste — oder wir fangen von vorne an.",
    },
    {
      number: "02",
      title: "Limitiert by Design",
      text: "Massenproduktion ist nicht unser Ding. Wir produzieren in kleinen Chargen, damit jedes Stück etwas Besonderes bleibt.",
    },
    {
      number: "03",
      title: "Straße als Inspiration",
      text: "Unsere Designs entstehen nicht im Elfenbeinturm. Sie kommen von der Straße, aus der Kultur, aus dem echten Leben.",
    },
    {
      number: "04",
      title: "Community First",
      text: "KRSN ist mehr als eine Marke. Es ist eine Gemeinschaft von Leuten, die wissen, was sie wollen — und sich nicht mit weniger zufriedengeben.",
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--kr-black)" }}
    >
      {/* Hero */}
      <section
        className="relative flex min-h-[70vh] items-center overflow-hidden"
        style={{ backgroundColor: "var(--kr-dark)" }}
      >
        {/* Background glow */}
        <div
          className="absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full blur-[200px] opacity-15"
          style={{ backgroundColor: "var(--kr-neon)" }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.04 }}
        >
          <div
            className="absolute left-1/3 top-0 bottom-0 w-px"
            style={{ backgroundColor: "var(--kr-text)" }}
          />
          <div
            className="absolute left-2/3 top-0 bottom-0 w-px"
            style={{ backgroundColor: "var(--kr-text)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
          {/* Breadcrumb */}
          <nav className="mb-12">
            <ol
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-muted)",
              }}
            >
              <li>
                <Link
                  href={BASE}
                  className="transition-colors duration-200 hover:text-[var(--kr-neon)]"
                >
                  Home
                </Link>
              </li>
              <li style={{ color: "var(--kr-charcoal)" }}>/</li>
              <li style={{ color: "var(--kr-text)" }}>Über KRSN</li>
            </ol>
          </nav>

          <FadeIn>
            <p
              className="mb-4 text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-neon)",
              }}
            >
              [Über uns]
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <h1
              className="mb-8 text-7xl uppercase leading-[0.85] md:text-8xl lg:text-9xl"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
                textShadow: "4px 4px 0px rgba(205, 255, 0, 0.1)",
              }}
            >
              Wir sind
              <br />
              KRSN
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <p
              className="max-w-xl text-lg leading-relaxed"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Gegründet 2024 mit einer einfachen Idee: Streetwear, die keine
              Kompromisse kennt. Wir designen für die, die ihren eigenen Weg
              gehen.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: "var(--kr-black)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <FadeIn>
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--kr-font-mono)",
                  color: "var(--kr-neon)",
                }}
              >
                [Mission]
              </p>
              <h2
                className="text-5xl uppercase leading-[0.9] md:text-6xl"
                style={{
                  fontFamily: "var(--kr-font-heading)",
                  color: "var(--kr-text)",
                }}
              >
                Mode ist
                <br />
                Haltung
              </h2>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="flex flex-col gap-6">
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    color: "var(--kr-muted)",
                  }}
                >
                  KRSN wurde aus der Überzeugung geboren, dass Streetwear mehr
                  sein kann als Fast Fashion in schwarz. Wir glauben an
                  durchdachtes Design, ehrliche Materialien und Stücke, die man
                  nicht nach einer Saison aussortiert.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    color: "var(--kr-muted)",
                  }}
                >
                  Jede Kollektion wird in kleinen Stückzahlen produziert.
                  Nicht weil es trendy ist, sondern weil wir an jedes einzelne
                  Teil den gleichen Anspruch stellen. Vom ersten Entwurf bis zum
                  fertigen Produkt.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--kr-font-body)",
                    color: "var(--kr-muted)",
                  }}
                >
                  Unsere Community ist unser Kompass. Die Rückmeldungen,
                  die Energie, der gemeinsame Anspruch an Qualität — das
                  treibt uns an, immer besser zu werden.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: "var(--kr-dark)" }}
      >
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.3em]"
              style={{
                fontFamily: "var(--kr-font-mono)",
                color: "var(--kr-neon)",
              }}
            >
              [Werte]
            </p>
            <h2
              className="mb-16 text-5xl uppercase leading-[0.9] md:text-6xl"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              Woran wir glauben
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            {values.map((value, i) => (
              <FadeIn key={value.number} delay={100 + i * 100}>
                <div
                  className="p-8 md:p-10"
                  style={{
                    border: "1px solid var(--kr-charcoal)",
                    marginTop: "-1px",
                    marginLeft: i % 2 !== 0 ? "-1px" : "0",
                  }}
                >
                  <span
                    className="mb-4 block text-3xl"
                    style={{
                      fontFamily: "var(--kr-font-mono)",
                      color: "var(--kr-neon)",
                      opacity: 0.5,
                    }}
                  >
                    {value.number}
                  </span>
                  <h3
                    className="mb-3 text-2xl uppercase"
                    style={{
                      fontFamily: "var(--kr-font-heading)",
                      color: "var(--kr-text)",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--kr-font-body)",
                      color: "var(--kr-muted)",
                    }}
                  >
                    {value.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden px-6 py-24 md:py-32"
        style={{ backgroundColor: "var(--kr-black)" }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] opacity-10"
          style={{ backgroundColor: "var(--kr-neon)" }}
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2
              className="mb-6 text-5xl uppercase leading-[0.9] md:text-6xl"
              style={{
                fontFamily: "var(--kr-font-heading)",
                color: "var(--kr-text)",
              }}
            >
              Bereit für KRSN?
            </h2>
          </FadeIn>

          <FadeIn delay={200}>
            <p
              className="mb-10 text-base"
              style={{
                fontFamily: "var(--kr-font-body)",
                color: "var(--kr-muted)",
              }}
            >
              Entdecke unsere aktuelle Kollektion und finde deinen Style.
            </p>
          </FadeIn>

          <FadeIn delay={400}>
            <Link
              href={`${BASE}/products`}
              className="inline-flex items-center gap-3 px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300"
              style={{
                fontFamily: "var(--kr-font-body)",
                backgroundColor: "var(--kr-neon)",
                color: "var(--kr-black)",
                boxShadow: "4px 4px 0px var(--kr-charcoal)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow =
                  "6px 6px 0px var(--kr-neon)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow =
                  "4px 4px 0px var(--kr-charcoal)";
              }}
            >
              Zum Shop
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
