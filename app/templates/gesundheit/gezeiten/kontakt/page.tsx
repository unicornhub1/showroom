import { Suspense } from "react";
import Link from "next/link";
import { BASE, CONTACT } from "../_design/data";
import RequestForm from "../_design/components/RequestForm";
import TideLines from "../_design/components/TideLines";

/* Abstrakte Lageskizze statt eingebetteter Karte (keine Drittanbieter, DSGVO). */
function MapSketch() {
  return (
    <svg viewBox="0 0 400 260" className="h-auto w-full" role="img" aria-label={`Lageskizze: ${CONTACT.street}, nahe U-Bahn und Park`}>
      <rect width="400" height="260" rx="22" fill="var(--gz-salbei)" />
      <path d="M-10 70 C120 60 220 90 410 60" stroke="var(--gz-kalk)" strokeWidth="18" fill="none" />
      <path d="M130 -10 C140 90 120 170 150 270" stroke="var(--gz-kalk)" strokeWidth="14" fill="none" />
      <path d="M-10 190 C140 200 260 170 410 200" stroke="var(--gz-kalk)" strokeWidth="10" fill="none" />
      <path d="M300 -10 L280 270" stroke="var(--gz-kalk)" strokeWidth="8" fill="none" />
      <ellipse cx="330" cy="125" rx="46" ry="30" fill="var(--gz-flechte)" opacity="0.55" />
      <text x="330" y="129" textAnchor="middle" fontSize="11" fill="var(--gz-moos)" fontFamily="var(--gz-font-sans)">
        Park
      </text>
      <g transform="translate(118 58)">
        <rect x="-11" y="-11" width="22" height="22" rx="5" fill="var(--gz-moos)" />
        <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--gz-kalk)" fontFamily="var(--gz-font-sans)">
          U
        </text>
      </g>
      <g transform="translate(212 128)">
        <circle r="26" fill="var(--gz-lehm)" opacity="0.18" />
        <circle r="9" fill="var(--gz-lehm)" />
        <circle r="3.5" fill="var(--gz-kalk)" />
      </g>
      <text x="212" y="170" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--gz-moos)" fontFamily="var(--gz-font-sans)">
        {CONTACT.street}
      </text>
    </svg>
  );
}

export default function Kontakt() {
  return (
    <>
      <header className="gz-wrap pb-12 pt-10 lg:pb-16 lg:pt-16">
        <p className="gz-sans text-[0.9rem]" style={{ color: "var(--gz-schiefer)" }}>
          <Link href={BASE} className="hover:underline">
            Start
          </Link>{" "}
          / Kontakt
        </p>
        <h1 className="gz-display mt-6 max-w-5xl text-[clamp(3rem,7.5vw,7.2rem)]">Termin anfragen</h1>
        <p className="gz-lead mt-6 max-w-xl">
          Erzähl mir kurz, worum es geht und wann es dir passt. Ich melde mich innerhalb eines Werktags mit Terminvorschlägen.
        </p>
      </header>

      <section className="gz-wrap grid gap-14 pb-24 lg:grid-cols-12 lg:gap-8 lg:pb-32">
        <div className="rounded-[28px] p-6 sm:p-10 lg:col-span-7" style={{ background: "var(--gz-salbei)" }}>
          <Suspense fallback={<div className="h-[640px]" aria-hidden="true" />}>
            <RequestForm />
          </Suspense>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <h2 className="gz-h3">Lieber anrufen?</h2>
            <a href={CONTACT.phoneHref} className="gz-serif mt-4 block text-[1.8rem] tracking-[-0.02em]">
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="gz-link mt-2 inline-block">
              {CONTACT.email}
            </a>
            <p className="gz-meta mt-3">Während einer Behandlung gehe ich nicht ans Telefon. Sprich mir gern auf die Mailbox.</p>

            <div className="mt-10">
              <MapSketch />
            </div>
            <dl className="gz-sans mt-6 space-y-4 text-[0.95rem]">
              <div className="border-t pt-4" style={{ borderColor: "var(--gz-linie)" }}>
                <dt className="font-semibold">Adresse</dt>
                <dd className="mt-1" style={{ color: "var(--gz-moos-2)" }}>
                  {CONTACT.street}, {CONTACT.city}, 1. Stock
                </dd>
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--gz-linie)" }}>
                <dt className="font-semibold">Termine</dt>
                {CONTACT.hours.map((h) => (
                  <dd key={h.days} className="mt-1 flex justify-between gap-4" style={{ color: "var(--gz-moos-2)" }}>
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </dd>
                ))}
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--gz-linie)" }}>
                <dt className="font-semibold">Anfahrt</dt>
                <dd className="mt-1" style={{ color: "var(--gz-moos-2)" }}>
                  U-Bahn drei Minuten zu Fuß. Kinderwagen passt in den Aufzug.
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <TideLines className="h-[90px] w-full lg:h-[130px]" lines={7} />
    </>
  );
}
