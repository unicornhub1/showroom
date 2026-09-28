import Image from "next/image";
import Link from "next/link";
import { BASE, BRAND, CONTACT, IMAGES, OFFERS, PRICES, formatPrice } from "./_design/data";
import BreathRing from "./_design/components/BreathRing";
import Concerns from "./_design/components/Concerns";
import SessionBar from "./_design/components/SessionBar";
import TideLines from "./_design/components/TideLines";

const HEADLINE = ["Ich", "höre", "mit", "den", "Händen", "zu."];

const MOSAIC = [
  { span: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "lg:mt-28" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "" },
  { span: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "lg:mt-28" },
];

export default function GezeitenHome() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="gz-wrap pb-16 pt-10 lg:pb-24 lg:pt-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <h1 className="gz-display lg:col-span-8">
            {HEADLINE.map((w, i) => (
              <span key={w + i}>
                <span className="gz-word" style={{ "--i": i } as React.CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </h1>
          <div className="gz-fade lg:col-span-4 lg:pb-4" style={{ "--d": "0.6s" } as React.CSSProperties}>
            <p className="gz-lead">
              Osteopathie und Naturheilkunde für Erwachsene, Babys und Kinder in Berlin-Mitte. {BRAND.person},{" "}
              {BRAND.role}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${BASE}/kontakt`} className="gz-btn">
                Termin anfragen
              </Link>
              <a href="#womit" className="gz-btn gz-btn--ghost">
                Womit kommst du?
              </a>
            </div>
          </div>
        </div>

        <div className="gz-open relative mt-10 aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/9]" style={{ background: "#8E8676" }}>
          <Image
            src={IMAGES.hero}
            alt="Hände einer Osteopathin behandeln behutsam den Nacken einer Patientin"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_50%]"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(36,44,29,0) 45%, rgba(36,44,29,0.45) 100%)" }} />
          <p
            className="gz-sans absolute bottom-5 left-5 max-w-[50%] sm:max-w-[60%] text-[0.85rem] font-medium leading-snug sm:bottom-7 sm:left-7"
            style={{ color: "rgba(243,243,238,0.92)" }}
          >
            Sanfte Techniken, keine Hektik: Eine Behandlung dauert 50 bis 75 Minuten.
          </p>
          <BreathRing className="absolute bottom-5 right-4 origin-bottom-right scale-[0.8] sm:bottom-7 sm:right-7 sm:scale-100" />
        </div>
      </section>

      {/* ── Warum Gezeiten ────────────────────────────────────────────────── */}
      <section className="pb-8 pt-12 lg:pt-20">
        <div className="gz-wrap grid gap-8 lg:grid-cols-12">
          <h2 className="gz-serif text-[1.5rem] leading-tight lg:col-span-3">Warum Gezeiten?</h2>
          <p className="gz-serif text-[clamp(1.6rem,3.1vw,2.75rem)] leading-[1.18] tracking-[-0.02em] lg:col-span-9">
            In der Osteopathie sprechen wir von Gezeiten: einem feinen, langsamen Rhythmus, der sich durch den ganzen Körper
            zieht. Gerät er ins Stocken, merkst du es oft zuerst als Schmerz, als Müdigkeit oder als Enge. Meine Arbeit ist,
            ihn wieder in Fluss zu bringen.
          </p>
        </div>
        <TideLines className="mt-14 h-[120px] w-full lg:mt-20 lg:h-[170px]" />
      </section>

      {/* ── Womit kommst du zu mir? ───────────────────────────────────────── */}
      <section id="womit" className="scroll-mt-20 py-20 lg:py-28">
        <div className="gz-wrap">
          <div className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-12 lg:items-end">
            <h2 className="gz-h2 lg:col-span-7">Womit kommst du zu mir?</h2>
            <p className="gz-body lg:col-span-4 lg:col-start-9">
              Tipp den Satz an, der sich nach dir anhört. Du siehst, was dahinterstecken kann und wie ich dabei vorgehe.
            </p>
          </div>
          <Concerns />
        </div>
      </section>

      {/* ── Die erste Behandlung ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: "var(--gz-kalk)" }}>
        <div className="gz-wrap">
          <div className="mb-12 grid gap-5 lg:mb-16 lg:grid-cols-12 lg:items-end">
            <h2 className="gz-h2 lg:col-span-7">Deine erste Behandlung, Minute für Minute.</h2>
            <p className="gz-body lg:col-span-4 lg:col-start-9">
              Damit du weißt, was dich erwartet. Die Balken sind maßstabsgetreu: Zuhören braucht genauso viel Platz wie Behandeln.
            </p>
          </div>
          <SessionBar />
        </div>
      </section>

      {/* ── Angebote ──────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="gz-wrap">
          <h2 className="gz-h2 max-w-3xl">Wobei ich dich begleite</h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
            {OFFERS.map((o, i) => (
              <Link key={o.id} href={`${BASE}/behandlung#${o.id}`} className={`group block ${MOSAIC[i].span} ${MOSAIC[i].offset}`}>
                <div className={`relative overflow-hidden rounded-[24px] ${MOSAIC[i].aspect}`} style={{ background: o.gradient }}>
                  <Image
                    src={o.image}
                    alt={o.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="gz-h3 mt-6">{o.title}</h3>
                <p className="gz-body mt-2 max-w-md">{o.short}</p>
                <span className="gz-link mt-4 inline-block">Mehr erfahren</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Über mich ─────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: "var(--gz-moos)", color: "var(--gz-kalk)" }}>
        <div className="gz-wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] lg:col-span-5" style={{ background: "#B7A596" }}>
            <Image src={IMAGES.therapist} alt={`${BRAND.person} lächelt in ihrer Praxis`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="gz-display text-[clamp(3rem,7vw,6.5rem)]">Ich bin Mara.</h2>
            <div className="gz-sans mt-8 max-w-xl space-y-5 text-[1.08rem] leading-relaxed" style={{ color: "rgba(243,243,238,0.8)" }}>
              <p>
                Bevor ich Osteopathin wurde, war ich lange Physiotherapeutin in einer Reha-Klinik. Dort habe ich gesehen, wie viel
                Zeit fehlt, um einem Körper wirklich zuzuhören.
              </p>
              <p>
                Heute nehme ich mir diese Zeit. Ich erkläre dir, was ich spüre und was ich tue, und du bestimmst mit. Kein
                Knacken, keine Versprechen, die niemand halten kann.
              </p>
            </div>
            <Link href={`${BASE}/ueber-mich`} className="gz-btn gz-btn--outline-light mt-10">
              Mehr über mich
            </Link>
          </div>
        </div>
      </section>

      {/* ── Preise ────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="gz-wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="gz-h2">Was es kostet</h2>
            <p className="gz-body mt-6">
              Viele gesetzliche Kassen erstatten Osteopathie anteilig. Private Kassen und Zusatzversicherungen übernehmen die Kosten
              meist nach dem Gebührenverzeichnis für Heilpraktiker.
            </p>
            <Link href={`${BASE}/behandlung#preise`} className="gz-link mt-6 inline-block">
              Alle Preise und Fragen zur Erstattung
            </Link>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {PRICES.slice(0, 3).map((p) => (
              <li key={p.item} className="gz-price">
                <span className="flex flex-col">
                  <span className="gz-serif text-[1.45rem] leading-tight">{p.item}</span>
                  <span className="gz-meta mt-1">{p.note}</span>
                </span>
                <span className="gz-price__leader" aria-hidden="true" />
                <span className="gz-serif text-[1.45rem] tabular-nums">{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Abschluss ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <Image src={IMAGES.sea} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, rgba(36,44,29,0.72) 0%, rgba(36,44,29,0.35) 70%)" }} />
        <div className="gz-wrap py-28 lg:py-40" style={{ color: "var(--gz-kalk)" }}>
          <h2 className="gz-display max-w-4xl text-[clamp(3rem,7.5vw,7rem)]">Magst du vorbeikommen?</h2>
          <p className="gz-sans mt-6 max-w-md text-[1.1rem] leading-relaxed" style={{ color: "rgba(243,243,238,0.82)" }}>
            Schreib mir, was dich herführt. Ich melde mich innerhalb eines Werktags mit Terminvorschlägen.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`${BASE}/kontakt`} className="gz-btn gz-btn--light">
              Termin anfragen
            </Link>
            <a href={CONTACT.phoneHref} className="gz-btn gz-btn--outline-light">
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
