import Image from "next/image";
import Link from "next/link";
import { BASE, IMAGES, METHODS, PHASES } from "../_design/data";
import DropMark from "../_design/components/DropMark";
import SectionIndex from "../_design/components/SectionIndex";

const INDEX = [...PHASES.map((p) => ({ id: p.id, label: p.title })), { id: "methoden", label: "Methoden" }];

export default function Schwerpunkte() {
  return (
    <>
      <header className="ew-wrap pb-16 pt-12 lg:pb-24 lg:pt-20">
        <p className="ew-sans text-[0.9rem]" style={{ color: "var(--ew-stein)" }}>
          <Link href={BASE} className="hover:underline">
            Start
          </Link>{" "}
          / Schwerpunkte
        </p>
        <h1 className="ew-display mt-6 max-w-5xl text-[clamp(2.6rem,5.6vw,5.2rem)]">
          Fünf Lebensphasen, eine Ärztin, die sie alle kennt.
        </h1>
        <p className="ew-lead mt-8 max-w-2xl">
          Viele Beschwerden lassen sich nur verstehen, wenn man weiß, in welcher Phase Ihres Lebens Sie gerade stehen. Hier
          finden Sie, womit Frauen zu mir kommen und was ich anbiete.
        </p>
      </header>

      <div className="ew-wrap grid gap-10 pb-24 lg:grid-cols-12 lg:pb-32">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            <SectionIndex items={INDEX} />
            <Link href={`${BASE}/termin`} className="ew-btn mt-10 min-h-[46px] px-5">
              Termin vereinbaren
            </Link>
          </div>
        </aside>

        <div className="lg:col-span-9">
          {PHASES.map((p, i) => (
            <section
              key={p.id}
              id={p.id}
              className="scroll-mt-24 border-t py-16 first:border-t-0 first:pt-0 lg:py-24"
              style={{ borderColor: "var(--ew-linie)" }}
            >
              <div className="grid gap-10 md:grid-cols-9 md:gap-10">
                <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]" style={{ background: p.gradient }}>
                    <Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" />
                  </div>
                </div>
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="ew-sans text-[0.88rem]" style={{ color: "var(--ew-krapp)" }}>
                    {p.hint}
                  </p>
                  <h2 className="ew-h2 mt-3">{p.title}</h2>
                  <p className="ew-body mt-6">{p.lead}</p>

                  <div className="mt-10 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="ew-sans text-[0.9rem] font-medium">Worum es oft geht</h3>
                      <ul className="ew-serif mt-3 space-y-2 text-[1.06rem] leading-snug" style={{ color: "var(--ew-pflaume-2)" }}>
                        {p.topics.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="ew-sans text-[0.9rem] font-medium">Was ich anbiete</h3>
                      <ul className="ew-serif mt-3 space-y-2 text-[1.06rem] leading-snug" style={{ color: "var(--ew-pflaume-2)" }}>
                        {p.offers.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="ew-serif mt-10 flex gap-3 border-l pl-5 text-[1.05rem] italic leading-relaxed" style={{ borderColor: "var(--ew-mantel)", color: "var(--ew-pflaume)" }}>
                    {p.note}
                  </p>

                  <Link href={`${BASE}/termin`} className="ew-link mt-8 inline-block">
                    Termin zu diesem Thema
                  </Link>
                </div>
              </div>
            </section>
          ))}

          <section id="methoden" className="scroll-mt-24 border-t pt-16 lg:pt-24" style={{ borderColor: "var(--ew-linie)" }}>
            <div className="grid gap-10 md:grid-cols-9">
              <div className="md:col-span-5">
                <p className="ew-sans text-[0.88rem]" style={{ color: "var(--ew-krapp)" }}>
                  Methoden
                </p>
                <h2 className="ew-h2 mt-3">Was ich wann einsetze</h2>
                <p className="ew-body mt-6">
                  Ich beginne mit der Diagnose und entscheide danach über die Mittel. Oft ergänzen sich beide Seiten, manchmal
                  reicht eine.
                </p>
              </div>
              <div className="relative aspect-[3/2] overflow-hidden rounded-[2px] md:col-span-4 md:aspect-auto" style={{ background: "#C8B79A" }}>
                <Image src={IMAGES.herbs} alt="Hände halten ein Glas mit getrockneten Heilkräutern" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
              </div>
            </div>

            <div className="mt-14 grid gap-12 md:grid-cols-2">
              {(["schulmedizin", "naturheilkunde"] as const).map((side) => (
                <div key={side}>
                  <h3 className="ew-serif flex items-center gap-3 text-[1.6rem]">
                    <DropMark size={11} color={side === "schulmedizin" ? "var(--ew-krapp)" : "var(--ew-mantel)"} />
                    {side === "schulmedizin" ? "Schulmedizin" : "Naturheilkunde"}
                  </h3>
                  <dl className="mt-6">
                    {METHODS[side].map((m) => (
                      <div key={m.name} className="border-t py-5" style={{ borderColor: "var(--ew-linie)" }}>
                        <dt className="ew-serif text-[1.2rem]">{m.name}</dt>
                        <dd className="ew-body mt-1 text-[1rem]">{m.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="py-20 lg:py-28" style={{ background: "var(--ew-rose)" }}>
        <div className="ew-wrap flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="ew-h2 max-w-2xl">Nicht sicher, wohin Ihr Anliegen gehört? Das klären wir im Erstgespräch.</h2>
          <Link href={`${BASE}/termin`} className="ew-btn flex-none">
            Erstgespräch vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
