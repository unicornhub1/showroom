import Image from "next/image";
import Link from "next/link";
import { BASE, BRAND, CONTACT, FEES, FIRST_VISIT, IMAGES, METHODS, formatPrice } from "./_design/data";
import DropMark from "./_design/components/DropMark";
import NextSlot from "./_design/components/NextSlot";
import LifePhases from "./_design/components/LifePhases";
import JournalList from "./_design/components/JournalList";

const HEADLINE = ["Frauenmedizin,", "die zuhört,", "bevor sie behandelt."];

export default function EllerwaldHome() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="ew-wrap pb-20 pt-10 lg:pb-32 lg:pt-16">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pb-6">
            <h1 className="ew-display">
              {HEADLINE.map((line, i) => (
                <span key={line} className="ew-line">
                  <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="ew-lead ew-fade mt-8 max-w-[34rem]" style={{ "--d": "0.55s" } as React.CSSProperties}>
              Privatpraxis für Frauenheilkunde und Naturheilverfahren in Berlin-Mitte. Für Zyklus, Kinderwunsch,
              Wechseljahre und alles, was dazwischen liegt.
            </p>
            <div className="ew-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ "--d": "0.7s" } as React.CSSProperties}>
              <Link href={`${BASE}/termin`} className="ew-btn">
                Erstgespräch vereinbaren
              </Link>
              <a href="#erster-termin" className="ew-link">
                So läuft ein erster Termin ab
              </a>
            </div>
            <div className="ew-fade mt-10" style={{ "--d": "0.85s" } as React.CSSProperties}>
              <NextSlot />
            </div>
          </div>

          <figure className="relative lg:col-span-5">
            <div className="ew-unveil relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-[2px] lg:w-full" style={{ background: "#B9A597" }}>
              <Image
                src={IMAGES.portrait}
                alt="Dr. med. Svea Ellerwald sitzt entspannt in ihrer Praxis"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 88vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <div
              className="ew-drop-in absolute -left-2 bottom-14 aspect-square w-[40%] overflow-hidden rounded-full lg:-left-16 lg:bottom-16 lg:w-[42%]"
              style={{ boxShadow: "0 0 0 10px var(--ew-puder)", background: "#7F9A5A" }}
            >
              <Image src={IMAGES.dew} alt="" fill sizes="220px" className="object-cover" />
            </div>
            <figcaption className="ew-fade ew-serif mt-4 text-right text-[0.98rem] italic" style={{ color: "var(--ew-stein)", "--d": "1.1s" } as React.CSSProperties}>
              {BRAND.title}, Fachärztin für Frauenheilkunde
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Haltung ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32" style={{ background: "var(--ew-leinen)" }}>
        <div className="ew-wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-4 lg:pt-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]" style={{ background: "#D8C7B8" }}>
              <Image src={IMAGES.tea} alt="Hände halten eine warme Tasse auf hellem Leinen" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
            <blockquote className="ew-quote" style={{ color: "var(--ew-pflaume)" }}>
              „Viele Frauen kommen zu mir, nachdem sie lange gesucht haben. Befunde ohne Befund, Ratschläge ohne Zeit. Hier
              beginnt jede Behandlung mit einem Gespräch, das so lange dauert, wie es dauern muss.“
            </blockquote>
            <p className="ew-sans mt-8 flex items-center gap-3 text-[0.92rem]" style={{ color: "var(--ew-pflaume-2)" }}>
              <DropMark size={11} />
              {BRAND.title}
            </p>
            <div className="ew-body mt-12 max-w-[36rem] space-y-5">
              <p>
                Ich bin Fachärztin für Frauenheilkunde und arbeite zugleich mit Naturheilverfahren und Akupunktur. Für das
                Erstgespräch nehme ich mir 75 Minuten. Befunde, die Sie mir vorab schicken, lese ich vorher.
              </p>
              <p>
                Und wenn etwas nicht in meine Praxis gehört, sage ich Ihnen das offen und nenne Ihnen Kolleginnen und
                Kollegen, die Ihnen besser helfen können.
              </p>
            </div>
            <Link href={`${BASE}/ueber-mich`} className="ew-link mt-10 inline-block">
              Mehr über mich
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lebensphasen ──────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32">
        <div className="ew-wrap">
          <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end">
            <h2 className="ew-h2 lg:col-span-7">Jede Lebensphase hat ihre eigenen Fragen.</h2>
            <p className="ew-body lg:col-span-4 lg:col-start-9">
              Wählen Sie, wo Sie gerade stehen. Zu jeder Phase finden Sie typische Anliegen und das, was ich Ihnen anbiete.
            </p>
          </div>
          <LifePhases />
        </div>
      </section>

      {/* ── Zwei Blickwinkel ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32" style={{ background: "var(--ew-rose)" }}>
        <div className="ew-wrap">
          <div className="max-w-3xl">
            <h2 className="ew-h2">Zwei Blickwinkel, eine Behandlung.</h2>
            <p className="ew-lead mt-6 max-w-2xl">
              Ich muss mich nicht zwischen Schulmedizin und Naturheilkunde entscheiden. Sie auch nicht. Welche Mittel wir
              wählen, hängt allein davon ab, was Ihnen hilft.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="ew-sans text-[0.9rem] font-medium" style={{ color: "var(--ew-krapp)" }}>
                Schulmedizin
              </p>
              <ul className="mt-4">
                {METHODS.schulmedizin.map((m) => (
                  <li key={m.name} className="ew-serif border-b py-4 text-[1.35rem] leading-snug lg:text-[1.6rem] lg:font-light" style={{ borderColor: "var(--ew-linie)" }}>
                    {m.name}
                  </li>
                ))}
              </ul>
            </div>
            <p
              aria-hidden="true"
              className="ew-serif select-none text-[5.5rem] font-light italic leading-none lg:text-[12rem]"
              style={{ color: "var(--ew-krapp)" }}
            >
              &amp;
            </p>
            <div>
              <p className="ew-sans text-[0.9rem] font-medium" style={{ color: "var(--ew-krapp)" }}>
                Naturheilkunde
              </p>
              <ul className="mt-4">
                {METHODS.naturheilkunde.map((m) => (
                  <li key={m.name} className="ew-serif border-b py-4 text-[1.35rem] leading-snug lg:text-[1.6rem] lg:font-light" style={{ borderColor: "var(--ew-linie)" }}>
                    {m.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href={`${BASE}/schwerpunkte#methoden`} className="ew-link mt-12 inline-block">
            Wie ich die Methoden einsetze
          </Link>
        </div>
      </section>

      {/* ── Der erste Termin ──────────────────────────────────────────────── */}
      <section id="erster-termin" className="scroll-mt-24 py-20 lg:py-32">
        <div className="ew-wrap">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 className="ew-h2 lg:col-span-6">So beginnt eine Behandlung bei mir.</h2>
            <p className="ew-body lg:col-span-4 lg:col-start-9 lg:self-end">
              Ohne Zeitdruck und mit einem klaren Plan. Sie wissen jederzeit, was als Nächstes kommt.
            </p>
          </div>

          <ol className="relative mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto" style={{ background: "var(--ew-linie)" }} />
            {FIRST_VISIT.map((s) => (
              <li key={s.title} className="relative pl-9 lg:pl-0 lg:pt-12">
                <span className="absolute left-0 top-1 lg:top-0" aria-hidden="true">
                  <DropMark size={11} />
                </span>
                <p className="ew-sans text-[0.86rem] font-medium" style={{ color: "var(--ew-krapp)" }}>
                  {s.when}
                </p>
                <h3 className="ew-serif mt-3 text-[1.45rem] leading-tight">{s.title}</h3>
                <p className="ew-body mt-3 text-[1.02rem]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Praxis ────────────────────────────────────────────────────────── */}
      <section className="pb-20 lg:pb-32">
        <div className="ew-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]" style={{ background: "#E4D6C4" }}>
              <Image src={IMAGES.roomCorner} alt="Heller Sessel in einer Ecke der Praxis mit Tageslicht" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-10 right-6 hidden aspect-[4/5] w-[30%] overflow-hidden rounded-[2px] sm:block" style={{ boxShadow: "0 0 0 10px var(--ew-puder)", background: "#EDEBE7" }}>
              <Image src={IMAGES.roomChair} alt="" fill sizes="220px" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
            <h2 className="ew-h2">Eine Praxis ohne volles Wartezimmer.</h2>
            <p className="ew-body mt-6">
              Die Praxis liegt ruhig im Hinterhaus, zwei Minuten von der U-Bahn. Termine sind so geplant, dass Sie in der
              Regel direkt ins Gespräch gehen. Es gibt Tee, Tageslicht und keine Neonröhren.
            </p>
            <Link href={`${BASE}/ueber-mich`} className="ew-link mt-8 inline-block">
              Werdegang und Praxisräume
            </Link>
          </div>
        </div>
      </section>

      {/* ── Journal ───────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32" style={{ background: "var(--ew-leinen)" }}>
        <div className="ew-wrap">
          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:items-end">
            <h2 className="ew-h2 lg:col-span-6">Aus dem Journal</h2>
            <p className="ew-body lg:col-span-4 lg:col-start-9">
              Einmal im Monat ein Beitrag zu einer Frage, die mir in der Sprechstunde oft gestellt wird.
            </p>
          </div>
          <JournalList />
        </div>
      </section>

      {/* ── Abschluss ─────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-32" style={{ background: "var(--ew-pflaume)", color: "var(--ew-leinen)" }}>
        <div className="ew-wrap grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="ew-h2">Ein erstes Gespräch.</h2>
            <p className="ew-lead mt-6 max-w-md" style={{ color: "rgba(251,247,243,0.78)" }}>
              Buchen Sie online, rund um die Uhr. Oder rufen Sie an, wir finden gemeinsam eine Zeit.
            </p>
            <div className="mt-10">
              <NextSlot light />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={`${BASE}/termin`} className="ew-btn ew-btn--light">
                Termin online vereinbaren
              </Link>
              <a href={CONTACT.phoneHref} className="ew-btn ew-btn--outline-light">
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="ew-sans grid gap-10 text-[0.95rem] sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div>
              <p className="ew-serif text-[1.3rem]">Sprechzeiten</p>
              <dl className="mt-4 space-y-3" style={{ color: "rgba(251,247,243,0.72)" }}>
                {CONTACT.hours.map((h) => (
                  <div key={h.days} className="border-t pt-3" style={{ borderColor: "var(--ew-linie-hell)" }}>
                    <dt>{h.days}</dt>
                    <dd style={{ color: "var(--ew-leinen)" }}>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="ew-serif text-[1.3rem]">Kosten</p>
              <dl className="mt-4 space-y-3" style={{ color: "rgba(251,247,243,0.72)" }}>
                {FEES.slice(0, 2).map((f) => (
                  <div key={f.item} className="border-t pt-3" style={{ borderColor: "var(--ew-linie-hell)" }}>
                    <dt>{f.item}</dt>
                    <dd style={{ color: "var(--ew-leinen)" }}>ab {formatPrice(f.from)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.84rem] leading-relaxed" style={{ color: "rgba(251,247,243,0.56)" }}>
                Abrechnung nach GOÄ. Gesetzlich Versicherte sind als Selbstzahlerinnen willkommen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
