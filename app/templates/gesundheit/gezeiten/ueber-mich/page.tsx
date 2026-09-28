import Image from "next/image";
import Link from "next/link";
import { BASE, BRAND, IMAGES, PATH } from "../_design/data";
import Wave from "../_design/components/Wave";

const PRINCIPLES = [
  {
    title: "Ich erkläre, was ich tue.",
    text: "Du musst nicht blind vertrauen. Ich sage dir, was ich spüre, und warum ich an einer Stelle arbeite, die gar nicht wehtut.",
  },
  {
    title: "Du bestimmst mit.",
    text: "Wenn dir etwas unangenehm ist, hören wir auf. Wenn du lieber sitzt als liegst, sitzt du.",
  },
  {
    title: "So wenig wie möglich.",
    text: "Ich möchte, dass du mich bald nicht mehr brauchst. Deshalb bekommst du Übungen für zu Hause und keine Dauerabos.",
  },
];

export default function UeberMich() {
  return (
    <>
      <header className="gz-wrap pb-16 pt-10 lg:pb-24 lg:pt-16">
        <p className="gz-sans text-[0.9rem]" style={{ color: "var(--gz-schiefer)" }}>
          <Link href={BASE} className="hover:underline">
            Start
          </Link>{" "}
          / Über mich
        </p>
        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="gz-display text-[clamp(3.2rem,8.5vw,8.4rem)]">Ich bin Mara.</h1>
            <p className="gz-lead mt-8 max-w-xl">
              {BRAND.person}, {BRAND.role}. Seit 2020 mit eigener Praxis in Berlin-Mitte, vorher viele Jahre Physiotherapeutin.
              Mutter von zwei Kindern, Schwimmerin bei jedem Wetter.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] lg:col-span-5" style={{ background: "#B7A596" }}>
            <Image src={IMAGES.therapist} alt={`Porträt von ${BRAND.person}`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      <section className="py-20 lg:py-28" style={{ background: "var(--gz-kalk)" }}>
        <div className="gz-wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <h2 className="gz-h2 lg:col-span-4">Wie ich arbeite</h2>
          <div className="lg:col-span-7 lg:col-start-6">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border-t py-8 first:border-t-0 first:pt-0" style={{ borderColor: "var(--gz-linie)" }}>
                <h3 className="gz-h3">{p.title}</h3>
                <p className="gz-body mt-3 max-w-xl">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="gz-wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="gz-h2">Mein Weg</h2>
            <p className="gz-body mt-6 max-w-sm">Ausbildung, Stationen und was mich bis heute weiterlernen lässt.</p>
          </div>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px" style={{ background: "var(--gz-linie)" }} />
            {PATH.map((p) => (
              <li key={p.year} className="relative grid grid-cols-[auto_1fr] gap-6 pb-8 last:pb-0">
                <span className="relative z-[1] mt-2 h-[15px] w-[15px] rounded-full border-[1.5px]" style={{ borderColor: "var(--gz-flechte)", background: "var(--gz-nebel)" }} aria-hidden="true" />
                <div>
                  <p className="gz-sans text-[0.9rem] font-semibold tabular-nums" style={{ color: "var(--gz-lehm)" }}>
                    {p.year}
                  </p>
                  <p className="gz-serif mt-1 text-[1.35rem] leading-snug">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="gz-wrap">
          <h2 className="gz-h2 max-w-2xl">Die Praxis</h2>
          <p className="gz-body mt-6 max-w-xl">
            Ein heller Raum im ersten Stock, Holzboden, eine breite Liege und eine Ecke mit Spielzeug für die Kleinen. Du kannst
            dich in Ruhe umziehen, und Tee gibt es auch.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] lg:col-span-4" style={{ background: "#C9C3B7" }}>
              <Image src={IMAGES.roomTable} alt="Behandlungsraum mit Liege und hellem Licht" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] lg:col-span-4 lg:mt-20" style={{ background: "#B9B3A6" }}>
              <Image src={IMAGES.linen} alt="Naturfarbenes Leinentuch in weichen Falten" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:col-span-2 sm:aspect-[16/9] lg:col-span-4 lg:aspect-[4/5]" style={{ background: "#4B5A33" }}>
              <Image src={IMAGES.moss} alt="Moos auf einem Stein in warmem Licht" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--gz-moos)", color: "var(--gz-kalk)" }}>
        <div className="gz-wrap flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Wave className="mb-6 h-[22px] w-[38px]" />
            <h2 className="gz-h2 max-w-2xl">Ich freue mich auf dich.</h2>
          </div>
          <Link href={`${BASE}/kontakt`} className="gz-btn gz-btn--light flex-none">
            Termin anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
