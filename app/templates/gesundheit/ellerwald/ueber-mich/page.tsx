import Image from "next/image";
import Link from "next/link";
import { BASE, BRAND, CV, IMAGES } from "../_design/data";
import DropMark from "../_design/components/DropMark";

export default function UeberMich() {
  return (
    <>
      <header className="ew-wrap pb-20 pt-12 lg:pb-28 lg:pt-20">
        <p className="ew-sans text-[0.9rem]" style={{ color: "var(--ew-stein)" }}>
          <Link href={BASE} className="hover:underline">
            Start
          </Link>{" "}
          / Über mich
        </p>
        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="ew-display text-[clamp(2.6rem,5.8vw,5.4rem)]">Ich bin Svea Ellerwald.</h1>
            <p className="ew-lead mt-8 max-w-xl">
              Frauenärztin, seit 2020 in eigener Praxis. Davor elf Jahre Klinik, zwei Kinder und die Erkenntnis, dass gute
              Medizin vor allem eines braucht: Zeit.
            </p>
            <p className="ew-sans mt-8 text-[0.92rem]" style={{ color: "var(--ew-pflaume-2)" }}>
              {BRAND.role}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]" style={{ background: "#B9A597" }}>
              <Image src={IMAGES.portrait} alt={`${BRAND.title} in ihrer Praxis`} fill priority sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover object-[50%_30%]" />
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 lg:py-28" style={{ background: "var(--ew-leinen)" }}>
        <div className="ew-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <h2 className="ew-h2 lg:col-span-4">Warum ich so arbeite</h2>
          <div className="ew-body space-y-6 text-[1.18rem] lg:col-span-7 lg:col-start-6">
            <p>
              In der Klinik habe ich gelernt, schnell die richtige Diagnose zu stellen. Was mir gefehlt hat, war die Zeit
              danach: für die Frau, die seit Jahren Schmerzen hat und von Praxis zu Praxis geschickt wird. Für die Frage, warum
              etwas so ist, wie es ist.
            </p>
            <p>
              Deshalb habe ich mich zusätzlich in Naturheilverfahren und Akupunktur ausbilden lassen. Nicht als Gegenentwurf zur
              Schulmedizin, sondern als zweites Werkzeug. Ich setze ein, was nachweislich hilft, und ich sage Ihnen ehrlich,
              wenn etwas nicht hilft.
            </p>
            <blockquote className="ew-quote my-10 border-l pl-6" style={{ borderColor: "var(--ew-krapp)", color: "var(--ew-pflaume)" }}>
              „Die beste Therapie ist die, die in Ihr Leben passt.“
            </blockquote>
            <p>
              Meine Praxis ist bewusst klein. Sie sprechen immer mit mir, und Sie bekommen meine Einschätzung schriftlich mit nach
              Hause, damit Sie in Ruhe nachlesen können, was wir besprochen haben.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="ew-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="ew-h2">Werdegang</h2>
            <p className="ew-body mt-6 max-w-sm">Ausbildung, Stationen und die Fortbildungen, die meine Arbeit prägen.</p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {CV.map((c) => (
              <li key={c.year} className="grid grid-cols-[5.5rem_1fr] gap-6 border-t py-6 sm:grid-cols-[8rem_1fr]" style={{ borderColor: "var(--ew-linie)" }}>
                <span className="ew-serif text-[1.7rem] font-light leading-none tabular-nums sm:text-[2.2rem]" style={{ color: "var(--ew-krapp)" }}>
                  {c.year}
                </span>
                <span className="ew-serif text-[1.15rem] leading-snug">{c.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 lg:pb-32">
        <div className="ew-wrap">
          <h2 className="ew-h2 max-w-2xl">Die Praxis</h2>
          <p className="ew-body mt-6 max-w-xl">
            Zwei Behandlungsräume, ein Gesprächszimmer mit Blick in den Hof und eine Teeküche, in der Sie sich vor dem Termin
            eine Tasse nehmen können.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] md:col-span-7 md:aspect-auto md:min-h-[520px]" style={{ background: "#D9C9B5" }}>
              <Image src={IMAGES.roomPlants} alt="Gesprächszimmer mit Sofa, Pflanzen und großem Fenster" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
            </div>
            <div className="grid gap-4 md:col-span-5 md:gap-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]" style={{ background: "#EDEBE7" }}>
                <Image src={IMAGES.roomChair} alt="Heller Sessel und Pflanze im Behandlungsraum" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]" style={{ background: "#E4D6C4" }}>
                <Image src={IMAGES.roomCorner} alt="Lesesessel in einer hellen Ecke" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
          <p className="ew-sans mt-8 flex items-center gap-3 text-[0.92rem]" style={{ color: "var(--ew-pflaume-2)" }}>
            <DropMark size={11} />
            Barrierearm: Erdgeschoss, Aufzug zum Hof, Parkplätze in der Nebenstraße.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--ew-pflaume)", color: "var(--ew-leinen)" }}>
        <div className="ew-wrap flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="ew-h2 max-w-2xl">Ich freue mich darauf, Sie kennenzulernen.</h2>
          <Link href={`${BASE}/termin`} className="ew-btn ew-btn--light flex-none">
            Erstgespräch vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
