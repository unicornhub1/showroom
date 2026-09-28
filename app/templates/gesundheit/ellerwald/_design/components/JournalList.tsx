"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { JOURNAL } from "../data";

/* Journal als Liste. Auf Geräten mit Maus folgt ein Vorschaubild dem Zeiger;
   auf Touch-Geräten steht das Bild klein in der Zeile. */
export default function JournalList() {
  const box = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null);

  const track = (i: number) => (e: React.MouseEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setHover({ i, x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div ref={box} className="relative" onMouseLeave={() => setHover(null)}>
      <ul>
        {JOURNAL.map((a, i) => (
          <li key={a.title}>
            <Link href={a.href} className="ew-journal-row" onMouseMove={track(i)}>
              <span className="flex min-w-0 items-center gap-5">
                <span className="relative h-16 w-16 flex-none overflow-hidden rounded-[2px] lg:hidden">
                  <Image src={a.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="ew-serif text-[1.3rem] leading-snug sm:text-[1.6rem] lg:text-[1.95rem] lg:font-light">
                  {a.title}
                </span>
              </span>
              <span className="ew-meta hidden whitespace-nowrap text-right sm:block">
                {a.topic}
                <br />
                {a.minutes} Minuten Lesezeit
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="ew-float-img hidden lg:block"
        data-visible={hover !== null}
        style={{ left: hover?.x ?? 0, top: hover?.y ?? 0 }}
      >
        {JOURNAL.map((a, i) => (
          <Image
            key={a.image}
            src={a.image}
            alt=""
            fill
            sizes="300px"
            className="object-cover transition-opacity duration-300"
            style={{ opacity: hover?.i === i ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
