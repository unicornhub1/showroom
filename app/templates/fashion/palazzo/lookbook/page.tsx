"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products } from "../_design/data";
import ProductCard from "../_design/components/ProductCard";

/* ── Fade-in on scroll ───────────────────────────────────────────────── */

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
        style={{ backgroundColor: "var(--pz-gold)" }}
      />
      <div
        className="mx-4 h-1.5 w-1.5 rotate-45"
        style={{ backgroundColor: "var(--pz-gold)" }}
      />
      <div
        className="h-px w-8"
        style={{ backgroundColor: "var(--pz-gold)" }}
      />
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function LookbookPage() {
  const editPicks = products.slice(0, 4);

  return (
    <main style={{ backgroundColor: "var(--pz-black)" }}>
      {/* Hero */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{
          height: "85vh",
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #2A2A2A 20%, #C9A55C 50%, #6B2D3E 80%, #0A0A0A 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.55) 100%)",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <div
            className="mx-auto mb-8 h-px w-20"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <p
            className="mb-4 text-xs tracking-[0.25em] uppercase"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-gold)",
            }}
          >
            Herbst / Winter 2026
          </p>
          <h1
            className="text-6xl font-normal leading-none tracking-wide sm:text-7xl md:text-8xl lg:text-9xl"
            style={{
              fontFamily: "var(--pz-font-serif)",
              color: "var(--pz-ivory)",
            }}
          >
            IL LOOKBOOK
          </h1>
          <p
            className="mx-auto mt-8 max-w-md text-base font-light tracking-wide"
            style={{
              fontFamily: "var(--pz-font-sans)",
              color: "var(--pz-warm-gray)",
            }}
          >
            Eine visuelle Reise durch die dramatischsten Silhouetten der Saison
          </p>
          <div
            className="mx-auto mt-8 h-px w-20"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
        </div>
      </section>

      <GoldDivider />

      {/* Section 1: Full-width editorial */}
      <FadeSection>
        <section className="px-6 md:px-12 lg:px-24">
          <div
            className="relative w-full overflow-hidden"
            style={{
              height: "70vh",
              background:
                "linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 20%, #C9A55C 50%, #6B2D3E 80%, #0A0A0A 100%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.15) 60%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6">
              <p
                className="mb-3 text-xs tracking-[0.25em] uppercase"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-gold)",
                }}
              >
                Editoriale
              </p>
              <h2
                className="max-w-2xl text-center text-4xl font-normal leading-snug tracking-wide sm:text-5xl md:text-6xl"
                style={{
                  fontFamily: "var(--pz-font-serif)",
                  color: "var(--pz-ivory)",
                }}
              >
                Die Kunst der dunklen Opulenz
              </h2>
              <div
                className="mt-8 h-px w-16"
                style={{ backgroundColor: "var(--pz-gold)" }}
              />
            </div>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* Section 2: Two-column split */}
      <FadeSection>
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: "3/4",
                background:
                  "linear-gradient(170deg, #6B2D3E 0%, #C17C74 30%, #C9A55C 60%, #0A0A0A 100%)",
              }}
            />

            <div className="max-w-lg py-8">
              <div
                className="mb-8 h-px w-12"
                style={{ backgroundColor: "var(--pz-gold)" }}
              />
              <p
                className="mb-3 text-xs tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-gold)",
                }}
              >
                La Visione
              </p>
              <h3
                className="mb-6 text-3xl font-normal leading-snug tracking-wide sm:text-4xl"
                style={{
                  fontFamily: "var(--pz-font-serif)",
                  color: "var(--pz-ivory)",
                }}
              >
                Eine Saison dramatischer Eleganz
              </h3>
              <p
                className="mb-6 text-base font-light leading-relaxed"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-warm-gray)",
                  lineHeight: 1.85,
                }}
              >
                Diese Saison ließen wir uns von den nächtlichen Palästen Venedigs
                und den goldenen Salons von Florenz inspirieren. Jedes Stück der Kollektion
                ist ein Statement -- Kleidung, die Geschichten erzählt, die Eindruck
                hinterlässt, die unvergesslich ist.
              </p>
              <p
                className="text-base font-light leading-relaxed"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-warm-gray)",
                  lineHeight: 1.85,
                }}
              >
                Wir glauben, dass wahrer Luxus nicht Zurückhaltung ist, sondern bewusste
                Opulenz. Es ist das Gewicht von Seide auf der Haut, der Glanz von antikem
                Gold im Kerzenlicht, die makellose Linie eines Schnittes, der Jahrhunderte
                der Tradition ehrt.
              </p>
            </div>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* Section 3: Staggered grid */}
      <FadeSection>
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-16">
            <p
              className="mb-3 text-xs tracking-[0.25em] uppercase"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-gold)",
              }}
            >
              La Selezione
            </p>
            <h3
              className="text-3xl font-normal tracking-wide sm:text-4xl"
              style={{
                fontFamily: "var(--pz-font-serif)",
                color: "var(--pz-ivory)",
              }}
            >
              Momente in Schwarz und Gold
            </h3>
          </div>

          <div className="relative grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-7 md:row-span-2">
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "4/5",
                  background:
                    "linear-gradient(145deg, #0A0A0A 0%, #2A2A2A 35%, #C9A55C 75%, #FFFEF7 100%)",
                }}
              />
            </div>

            <div className="col-span-12 md:col-span-5 md:mt-16">
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "1/1",
                  background:
                    "linear-gradient(160deg, #0A0A0A 0%, #C9A55C 40%, #B8956A 100%)",
                }}
              />
            </div>

            <div className="col-span-12 md:col-span-5 md:-mt-12">
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background:
                    "radial-gradient(ellipse at 30% 40%, #6B2D3E 0%, #C17C74 35%, #C9A55C 70%, #0A0A0A 100%)",
                }}
              />
            </div>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* Section 4: Pull quote */}
      <FadeSection>
        <section
          className="relative flex w-full items-center justify-center overflow-hidden"
          style={{
            minHeight: "60vh",
            background:
              "linear-gradient(180deg, #0A0A0A 0%, #2A2A2A 40%, #0A0A0A 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, #C9A55C 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-8 py-24 text-center">
            <div
              className="mx-auto mb-10 h-px w-20"
              style={{ backgroundColor: "var(--pz-gold)" }}
            />
            <blockquote
              className="text-3xl font-normal italic leading-relaxed tracking-wide sm:text-4xl md:text-5xl"
              style={{
                fontFamily: "var(--pz-font-serif)",
                color: "var(--pz-ivory)",
              }}
            >
              &ldquo;Luxus ist nicht das Gegenteil von Armut, sondern das Gegenteil von Vulgarität.&rdquo;
            </blockquote>
            <div
              className="mx-auto mt-10 h-px w-20"
              style={{ backgroundColor: "var(--pz-gold)" }}
            />
            <p
              className="mt-8 text-xs tracking-[0.25em] uppercase"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-gold)",
              }}
            >
              Coco Chanel
            </p>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* Section 5: Two-column reverse */}
      <FadeSection>
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className="order-2 max-w-lg py-8 md:order-1">
              <div
                className="mb-8 h-px w-12"
                style={{ backgroundColor: "var(--pz-gold)" }}
              />
              <p
                className="mb-3 text-xs tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-gold)",
                }}
              >
                L'Artigianato
              </p>
              <h3
                className="mb-6 text-3xl font-normal leading-snug tracking-wide sm:text-4xl"
                style={{
                  fontFamily: "var(--pz-font-serif)",
                  color: "var(--pz-ivory)",
                }}
              >
                Von Meisterhand gefertigt
              </h3>
              <p
                className="mb-6 text-base font-light leading-relaxed"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-warm-gray)",
                  lineHeight: 1.85,
                }}
              >
                Jedes Kleidungsstück ist das Ergebnis von Hunderten Stunden
                geschickter Handarbeit in den Werkstätten Italiens. Vom ersten
                Zuschnitt bis zur letzten vergoldeten Naht spiegelt jeder Schritt
                ein kompromissloses Streben nach Perfektion wider.
              </p>
              <p
                className="text-base font-light leading-relaxed"
                style={{
                  fontFamily: "var(--pz-font-sans)",
                  color: "var(--pz-warm-gray)",
                  lineHeight: 1.85,
                }}
              >
                Wir verwenden ausschließlich die edelsten Materialien -- toskanisches
                Leder, Como-Seide, mongolisches Kaschmir -- und arbeiten eng mit
                unseren Manufaktur-Partnern zusammen, um sicherzustellen, dass jeder
                Faden unseren höchsten Ansprüchen genügt.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <div
                className="w-full overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background:
                    "linear-gradient(155deg, #0A0A0A 0%, #C9A55C 30%, #B8956A 60%, #6B2D3E 100%)",
                }}
              />
            </div>
          </div>
        </section>
      </FadeSection>

      <GoldDivider />

      {/* Section 6: Shop the Edit */}
      <FadeSection>
        <section className="mx-auto max-w-7xl px-6 pb-32 md:px-12">
          <div className="mb-16 text-center">
            <div
              className="mx-auto mb-6 h-px w-16"
              style={{ backgroundColor: "var(--pz-gold)" }}
            />
            <h2
              className="text-3xl font-normal tracking-wide sm:text-4xl"
              style={{
                fontFamily: "var(--pz-font-serif)",
                color: "var(--pz-ivory)",
              }}
            >
              Look entdecken
            </h2>
            <p
              className="mt-3 text-sm tracking-[0.1em] uppercase"
              style={{
                fontFamily: "var(--pz-font-sans)",
                color: "var(--pz-warm-gray)",
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
              href="/templates/fashion/palazzo/products"
              className="inline-block border px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
              style={{
                fontFamily: "var(--pz-font-sans)",
                borderColor: "var(--pz-gold)",
                color: "var(--pz-gold)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--pz-gold)";
                e.currentTarget.style.color = "var(--pz-black)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--pz-gold)";
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
