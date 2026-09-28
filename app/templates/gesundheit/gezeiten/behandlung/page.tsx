import Image from "next/image";
import Link from "next/link";
import { BASE, FAQ, OFFERS, PRICES, formatPrice } from "../_design/data";
import TideLines from "../_design/components/TideLines";

export default function Behandlung() {
  return (
    <>
      <header className="gz-wrap pb-14 pt-10 lg:pb-20 lg:pt-16">
        <p className="gz-sans text-[0.9rem]" style={{ color: "var(--gz-schiefer)" }}>
          <Link href={BASE} className="hover:underline">
            Start
          </Link>{" "}
          / Behandlung
        </p>
        <h1 className="gz-display mt-6 max-w-5xl text-[clamp(3rem,7.5vw,7.2rem)]">Was ich für dich tun kann</h1>
        <nav aria-label="Auf dieser Seite" className="mt-10 flex flex-wrap gap-2">
          {[...OFFERS.map((o) => ({ id: o.id, label: o.title })), { id: "preise", label: "Preise" }, { id: "fragen", label: "Fragen" }].map((l) => (
            <a key={l.id} href={`#${l.id}`} className="gz-chip">
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      {OFFERS.map((o, i) => (
        <section
          key={o.id}
          id={o.id}
          className="scroll-mt-20 py-16 lg:py-24"
          style={{ background: i % 2 === 0 ? "var(--gz-kalk)" : "transparent" }}
        >
          <div className="gz-wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-[26px] lg:col-span-6 ${i % 2 === 1 ? "lg:order-2 lg:col-start-7" : ""}`} style={{ background: o.gradient }}>
              <Image src={o.image} alt={o.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : "lg:col-start-8"}`}>
              <h2 className="gz-h2">{o.title}</h2>
              <p className="gz-lead mt-6">{o.text}</p>
              <h3 className="gz-sans mt-9 text-[0.9rem] font-semibold">Hilfreich zum Beispiel bei</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {o.helps.map((h) => (
                  <li key={h} className="gz-sans rounded-full px-3.5 py-1.5 text-[0.9rem]" style={{ background: i % 2 === 0 ? "var(--gz-nebel)" : "var(--gz-kalk)" }}>
                    {h}
                  </li>
                ))}
              </ul>
              <Link href={`${BASE}/kontakt`} className="gz-link mt-9 inline-block">
                Termin anfragen
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section id="preise" className="scroll-mt-20 py-20 lg:py-28">
        <div className="gz-wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="gz-h2">Preise</h2>
            <p className="gz-body mt-6">
              Du bekommst nach jeder Behandlung eine Rechnung nach dem Gebührenverzeichnis für Heilpraktiker (GebüH). Die kannst du
              bei deiner Krankenkasse oder Zusatzversicherung einreichen.
            </p>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {PRICES.map((p) => (
              <li key={p.item} className="gz-price">
                <span className="flex flex-col">
                  <span className="gz-serif text-[1.4rem] leading-tight">{p.item}</span>
                  <span className="gz-meta mt-1">{p.note}</span>
                </span>
                <span className="gz-price__leader" aria-hidden="true" />
                <span className="gz-serif text-[1.4rem] tabular-nums">{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TideLines className="h-[90px] w-full lg:h-[130px]" lines={7} />

      <section id="fragen" className="scroll-mt-20 py-20 lg:py-28">
        <div className="gz-wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="gz-h2">Häufige Fragen</h2>
            <p className="gz-body mt-6">Etwas nicht dabei? Ruf mich an oder schreib mir.</p>
          </div>
          <div className="gz-faq lg:col-span-7 lg:col-start-6">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="gz-chev" aria-hidden="true">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M1 1.5l5 5 5-5" />
                    </svg>
                  </span>
                </summary>
                <p className="gz-body max-w-2xl pb-7">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
