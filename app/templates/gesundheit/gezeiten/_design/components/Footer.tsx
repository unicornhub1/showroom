import Link from "next/link";
import { BASE, BRAND, CONTACT, NAV } from "../data";
import Wave from "./Wave";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--gz-moos-tief)", color: "rgba(243,243,238,0.7)" }}>
      <div className="gz-wrap pb-12 pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={BASE} className="inline-flex items-center gap-3" style={{ color: "var(--gz-kalk)" }}>
              <Wave className="h-[20px] w-[34px]" />
              <span className="gz-serif text-[1.9rem] tracking-[-0.02em]">{BRAND.name}</span>
            </Link>
            <p className="gz-sans mt-5 max-w-sm text-[0.98rem] leading-relaxed">
              {BRAND.practice} in Berlin-Mitte. {BRAND.person}, {BRAND.role}.
            </p>
          </div>

          <div className="gz-sans grid gap-10 text-[0.92rem] leading-relaxed sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="font-semibold" style={{ color: "var(--gz-kalk)" }}>
                Praxis
              </p>
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
              <p className="font-semibold" style={{ color: "var(--gz-kalk)" }}>
                Termine
              </p>
              <dl className="mt-3 space-y-2">
                {CONTACT.hours.map((h) => (
                  <div key={h.days}>
                    <dt>{h.days}</dt>
                    <dd style={{ color: "var(--gz-kalk)" }}>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="font-semibold" style={{ color: "var(--gz-kalk)" }}>
                Seiten
              </p>
              <ul className="mt-3 space-y-2">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-white">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>Instagram {CONTACT.instagram}</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="gz-sans mt-16 flex flex-col gap-3 border-t pt-6 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--gz-linie-hell)" }}
        >
          <p>&copy; 2025 Unicorn Factory · {BRAND.showroom} (Designvorlage)</p>
          <p className="flex gap-6">
            <Link href={`${BASE}/kontakt`} className="hover:text-white">
              Impressum
            </Link>
            <Link href={`${BASE}/kontakt`} className="hover:text-white">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
