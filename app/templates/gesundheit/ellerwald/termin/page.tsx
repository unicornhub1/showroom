import Link from "next/link";
import { BASE, CONTACT, FAQ, FEES, formatPrice } from "../_design/data";
import Booking from "../_design/components/Booking";
import DropMark from "../_design/components/DropMark";

export default function Termin() {
  return (
    <>
      <header className="ew-wrap pb-12 pt-12 lg:pb-16 lg:pt-20">
        <p className="ew-sans text-[0.9rem]" style={{ color: "var(--ew-stein)" }}>
          <Link href={BASE} className="hover:underline">
            Start
          </Link>{" "}
          / Termin & Kontakt
        </p>
        <h1 className="ew-display mt-6 text-[clamp(2.6rem,5.8vw,5.4rem)]">Termin vereinbaren</h1>
        <p className="ew-lead mt-6 max-w-xl">
          Wählen Sie Ihr Anliegen und eine freie Zeit. Sie erhalten sofort eine Bestätigung per E-Mail.
        </p>
      </header>

      <section className="ew-wrap grid gap-14 pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-32">
        <div className="rounded-[3px] p-6 sm:p-10 lg:col-span-7" style={{ background: "var(--ew-leinen)" }}>
          <Booking />
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <h2 className="ew-h3">Lieber telefonisch?</h2>
            <p className="ew-body mt-3 text-[1.02rem]">Das Praxisteam ist zu den Sprechzeiten für Sie da.</p>
            <a href={CONTACT.phoneHref} className="ew-serif mt-5 block text-[1.7rem] font-light" style={{ color: "var(--ew-krapp)" }}>
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="ew-link mt-2 inline-block">
              {CONTACT.email}
            </a>

            <dl className="ew-sans mt-10 space-y-5 text-[0.95rem]">
              <div className="border-t pt-4" style={{ borderColor: "var(--ew-linie)" }}>
                <dt style={{ color: "var(--ew-stein)" }}>Adresse</dt>
                <dd className="mt-1">
                  {CONTACT.street}, {CONTACT.city}
                  <br />
                  Hinterhaus, Erdgeschoss
                </dd>
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--ew-linie)" }}>
                <dt style={{ color: "var(--ew-stein)" }}>Sprechzeiten</dt>
                {CONTACT.hours.map((h) => (
                  <dd key={h.days} className="mt-1 flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </dd>
                ))}
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--ew-linie)" }}>
                <dt style={{ color: "var(--ew-stein)" }}>Anfahrt</dt>
                <dd className="mt-1">U-Bahn in zwei Minuten zu Fuß, Parkplätze in der Nebenstraße</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--ew-rose)" }}>
        <div className="ew-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="ew-h2">Kosten</h2>
            <p className="ew-body mt-6">
              Abrechnung nach der Gebührenordnung für Ärzte (GOÄ). Private Krankenversicherungen erstatten die Kosten in der
              Regel. Gesetzlich Versicherte sind als Selbstzahlerinnen willkommen.
            </p>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {FEES.map((f) => (
              <li key={f.item} className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-t py-5" style={{ borderColor: "var(--ew-linie)" }}>
                <span>
                  <span className="ew-serif block text-[1.25rem] leading-snug">{f.item}</span>
                  <span className="ew-meta">{f.duration}</span>
                </span>
                <span className="ew-serif whitespace-nowrap text-[1.25rem] tabular-nums">ab {formatPrice(f.from)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="ew-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="ew-h2">Häufige Fragen</h2>
            <p className="ew-sans mt-6 flex items-center gap-3 text-[0.92rem]" style={{ color: "var(--ew-pflaume-2)" }}>
              <DropMark size={11} />
              Ihre Frage ist nicht dabei? Rufen Sie gern an.
            </p>
          </div>
          <div className="ew-faq lg:col-span-7 lg:col-start-6">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="ew-plus" aria-hidden="true" />
                </summary>
                <p className="ew-body max-w-2xl pb-6">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
