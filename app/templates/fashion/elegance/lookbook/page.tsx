"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products } from "../_design/data";
import ProductCard from "../_design/components/ProductCard";

/* ── Fade-in on scroll hook ───────────────────────────────────────────── */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function FadeSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Gold decorative divider ──────────────────────────────────────────── */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-16 md:py-24">
      <div
        className="h-px w-8"
        style={{ backgroundColor: "var(--el-gold)" }}
      />
      <div
        className="mx-4 h-1.5 w-1.5 rotate-45"
        style={{ backgroundColor: "var(--el-gold)" }}
      />
      <div
        className="h-px w-8"
        style={{ backgroundColor: "var(--el-gold)" }}
      />
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function LookbookPage() {
  const editPicks = products.slice(0, 4);

  return (
    <main style={{ backgroundColor: "var(--el-offwhite)" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: "85vh",
          background:
            "linear-gradient(160deg, #1B2A4A 0%, #2C3E6B 30%, #C4A265 65%, #F5F0E8 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.25) 0%, rgba(26,26,26,0.45) 100%)",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <div
            className="mx-auto mb-8 h-px w-20"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <p
            className="mb-4 text-xs tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gold)",
            }}
          >
            Frühling / Sommer 2026
          </p>
          <h1
            className="text-6xl font-light leading-none tracking-wide sm:text-7xl md:text-8xl lg:text-9xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-offwhite)",
            }}
          >
            DAS LOOKBOOK
          </h1>
          <p
            className="mx-auto mt-8 max-w-md text-base font-light tracking-wide"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-light)",
            }}
          >
            Eine visuelle Reise durch die begehrtesten Silhouetten der Saison
          </p>
          <div
            className="mx-auto mt-8 h-px w-20"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
        </div>
      </section>

      <GoldDivider />

      {/* ── Section 1: Full-width editorial image ────────────────────── */}
      <FadeSection>
        <section className="px-6 md:px-12 lg:px-24">
          <div
            className="relative w-full overflow-hidden"
            style={{
              height: "70vh",
              background:
                "linear-gradient(135deg, #F5F0E8 0%, #E8E3DA 20%, #C4A265 50%, #1B2A4A 100%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0.1) 60%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6">
              <p
                className="mb-3 text-xs tracking-[0.25em] uppercase"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gold)",
                }}
              >
                Redaktionell
              </p>
              <h2
                className="max-w-2xl text-center text-4xl font-light leading-snug tracking-wide sm:text-5xl md:text-6xl"
                style={{
                  fontFamily: "var(--el-font-serif)",
                  color: "var(--el-offwhite)",
                }}
              >
                Die Kunst des zurückhaltenden Luxus
              </h2>
              <div
                className="mt-8 h-px w-16"
                style={{ backgroundColor: "var(--el-gold)" }}
              />
            </div>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* ── Section 2: Two-column split ──────────────────────────────── */}
      <FadeSection>
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            {/* Left: portrait gradient */}
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: "3/4",
                background:
                  "linear-gradient(170deg, #C17C74 0%, #D4A49E 30%, #F5F0E8 60%, #E8E3DA 100%)",
              }}
            />

            {/* Right: editorial text */}
            <div className="max-w-lg py-8">
              <div
                className="mb-8 h-px w-12"
                style={{ backgroundColor: "var(--el-gold)" }}
              />
              <p
                className="mb-3 text-xs tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gold)",
                }}
              >
                Die Vision
              </p>
              <h3
                className="mb-6 text-3xl font-light leading-snug tracking-wide sm:text-4xl"
                style={{
                  fontFamily: "var(--el-font-serif)",
                  color: "var(--el-navy)",
                }}
              >
                Eine Saison stiller Eleganz
              </h3>
              <p
                className="mb-6 text-base font-light leading-relaxed"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
                  lineHeight: 1.85,
                }}
              >
                Diese Saison ließen wir uns von den Landschaften der Mittelmeerküste
                in der goldenen Stunde und den geschichtsträchtigen Ateliers des
                alten Europas inspirieren. Jedes Stück der Kollektion ist dafür gemacht,
                gelebt und geliebt zu werden -- Kleidungsstücke, die mit Anmut altern,
                die Charakter entwickeln, die untrennbar mit Ihren Geschichten verbunden werden.
              </p>
              <p
                className="text-base font-light leading-relaxed"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
                  lineHeight: 1.85,
                }}
              >
                Wir glauben, dass wahrer Luxus nicht Lautstärke ist, sondern Resonanz.
                Es ist das Gewicht von Kaschmir auf der Haut, die Art, wie Seide das
                Licht einfängt, die makellose Linie einer perfekt geschneiderten Schulter.
                Das ist Mode für Kenner.
              </p>
            </div>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* ── Section 3: Staggered editorial grid ──────────────────────── */}
      <FadeSection>
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-16">
            <p
              className="mb-3 text-xs tracking-[0.25em] uppercase"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gold)",
              }}
            >
              Die Auswahl
            </p>
            <h3
              className="text-3xl font-light tracking-wide sm:text-4xl"
              style={{
                fontFamily: "var(--el-font-serif)",
                color: "var(--el-navy)",
              }}
            >
              Momente in Bewegung
            </h3>
          </div>

          <div className="relative grid grid-cols-12 gap-4 md:gap-6">
            {/* Large image - left */}
            <div className="col-span-12 md:col-span-7 md:row-span-2">
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "4/5",
                  background:
                    "linear-gradient(145deg, #1B2A4A 0%, #2C3E6B 35%, #C4A265 75%, #E8E3DA 100%)",
                }}
              />
            </div>

            {/* Small image - top right */}
            <div className="col-span-12 md:col-span-5 md:mt-16">
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "1/1",
                  background:
                    "linear-gradient(160deg, #F5F0E8 0%, #C4A265 40%, #8B5E3C 100%)",
                }}
              />
            </div>

            {/* Medium image - bottom right, offset */}
            <div className="col-span-12 md:col-span-5 md:-mt-12">
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background:
                    "radial-gradient(ellipse at 30% 40%, #C17C74 0%, #D4A49E 35%, #F5F0E8 70%, #E8E3DA 100%)",
                }}
              />
            </div>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* ── Section 4: Pull quote ────────────────────────────────────── */}
      <FadeSection>
        <section
          className="relative flex w-full items-center justify-center overflow-hidden"
          style={{
            minHeight: "60vh",
            background:
              "linear-gradient(180deg, #1B2A4A 0%, #2C3E6B 40%, #1B2A4A 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, #C4A265 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-8 py-24 text-center">
            <div
              className="mx-auto mb-10 h-px w-20"
              style={{ backgroundColor: "var(--el-gold)" }}
            />
            <blockquote
              className="text-3xl font-light italic leading-relaxed tracking-wide sm:text-4xl md:text-5xl"
              style={{
                fontFamily: "var(--el-font-serif)",
                color: "var(--el-offwhite)",
              }}
            >
              &ldquo;Eleganz bedeutet nicht, aufzufallen, sondern in Erinnerung
              zu bleiben.&rdquo;
            </blockquote>
            <div
              className="mx-auto mt-10 h-px w-20"
              style={{ backgroundColor: "var(--el-gold)" }}
            />
            <p
              className="mt-8 text-xs tracking-[0.25em] uppercase"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gold)",
              }}
            >
              Giorgio Armani
            </p>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* ── Section 5: Two-column reverse ────────────────────────────── */}
      <FadeSection>
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            {/* Left: text about craftsmanship */}
            <div className="order-2 max-w-lg py-8 md:order-1">
              <div
                className="mb-8 h-px w-12"
                style={{ backgroundColor: "var(--el-gold)" }}
              />
              <p
                className="mb-3 text-xs tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gold)",
                }}
              >
                Handwerkskunst
              </p>
              <h3
                className="mb-6 text-3xl font-light leading-snug tracking-wide sm:text-4xl"
                style={{
                  fontFamily: "var(--el-font-serif)",
                  color: "var(--el-navy)",
                }}
              >
                Von Hand gefertigt, mit Stolz getragen
              </h3>
              <p
                className="mb-6 text-base font-light leading-relaxed"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
                  lineHeight: 1.85,
                }}
              >
                Jedes Kleidungsstück ist das Ergebnis von Hunderten Stunden
                geschickter Handarbeit. Vom ersten Zuschnitt in unserem Berliner
                Atelier bis zur letzten handgebügelten Naht spiegelt jeder Schritt
                ein kompromissloses Streben nach Exzellenz wider.
              </p>
              <p
                className="text-base font-light leading-relaxed"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
                  lineHeight: 1.85,
                }}
              >
                Wir verwenden ausschließlich die edelsten Naturstoffe -- italienische
                Wolle, japanische Seide, belgisches Leinen -- und arbeiten eng mit
                unseren Weberei-Partnern zusammen, um sicherzustellen, dass jeder Faden
                unseren höchsten Ansprüchen genügt. Das Ergebnis ist Kleidung, die
                außergewöhnlich aussieht und sich noch besser anfühlt.
              </p>
            </div>

            {/* Right: gradient placeholder */}
            <div className="order-1 md:order-2">
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background:
                    "linear-gradient(155deg, #E8E3DA 0%, #C4A265 30%, #A88B50 60%, #8B5E3C 100%)",
                }}
              />
            </div>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* ── Section 6: Shop the Edit ─────────────────────────────────── */}
      <FadeSection>
        <section className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
          <div className="mb-16 text-center">
            <div
              className="mx-auto mb-6 h-px w-16"
              style={{ backgroundColor: "var(--el-gold)" }}
            />
            <h2
              className="text-3xl font-light tracking-wide sm:text-4xl"
              style={{
                fontFamily: "var(--el-font-serif)",
                color: "var(--el-navy)",
              }}
            >
              Look entdecken
            </h2>
            <p
              className="mt-3 text-sm tracking-[0.1em] uppercase"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-gray)",
              }}
            >
              Kuratierte Stücke aus der Kollektion
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {editPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/templates/fashion/elegance/products"
              className="inline-block border px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
              style={{
                fontFamily: "var(--el-font-sans)",
                borderColor: "var(--el-navy)",
                color: "var(--el-navy)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--el-navy)";
                e.currentTarget.style.color = "var(--el-cream)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--el-navy)";
              }}
            >
              Alle Produkte ansehen
            </Link>
          </div>
        </section>
      </FadeSection>
    </main>
  );
}
