import Link from "next/link";
import { BASE, BRAND, CONTACT, NAV } from "../data";
import DropMark from "./DropMark";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--ew-pflaume-tief)", color: "rgba(251,247,243,0.72)" }}>
      <div className="ew-wrap pb-12 pt-20 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={BASE} className="inline-flex items-center gap-3">
              <DropMark size={20} color="var(--ew-leinen)" />
              <span className="ew-serif text-[1.6rem]" style={{ color: "var(--ew-leinen)" }}>
                {BRAND.title}
              </span>
            </Link>
            <p className="ew-serif mt-5 max-w-sm text-[1.08rem] leading-relaxed">
              {BRAND.role}. Privatpraxis, Selbstzahlerinnen willkommen.
            </p>
          </div>

          <div className="ew-sans grid gap-10 text-[0.92rem] leading-relaxed sm:grid-cols-3 lg:col-span-7">
            <div>
              <p style={{ color: "var(--ew-leinen)" }}>Praxis</p>
              <p className="mt-3">
                {CONTACT.street}
                <br />
                {CONTACT.city}
              </p>
              <p className="mt-3">
                <a href={CONTACT.phoneHref} className="hover:text-white">
                  {CONTACT.phone}
                </a>
                <br />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                  {CONTACT.email}
                </a>
              </p>
            </div>
            <div>
              <p style={{ color: "var(--ew-leinen)" }}>Sprechzeiten</p>
              <dl className="mt-3 space-y-2">
                {CONTACT.hours.map((h) => (
                  <div key={h.days}>
                    <dt>{h.days}</dt>
                    <dd style={{ color: "var(--ew-leinen)" }}>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p style={{ color: "var(--ew-leinen)" }}>Seiten</p>
              <ul className="mt-3 space-y-2">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <span>Instagram {CONTACT.instagram}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="ew-serif mt-20 select-none whitespace-nowrap text-[clamp(3.2rem,11.5vw,10.5rem)] font-light leading-[0.9] tracking-[-0.035em]"
          style={{ color: "rgba(251,247,243,0.08)" }}
        >
          Svea Ellerwald
        </p>

        <div
          className="ew-sans mt-10 flex flex-col gap-3 border-t pt-6 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--ew-linie-hell)" }}
        >
          <p>&copy; 2025 Unicorn Factory · {BRAND.showroom} (Designvorlage)</p>
          <p className="flex gap-6">
            <Link href={`${BASE}/termin`} className="hover:text-white">
              Impressum
            </Link>
            <Link href={`${BASE}/termin`} className="hover:text-white">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
