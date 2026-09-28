"use client";

import { useEffect, useState } from "react";

/* Seitenregister für lange Seiten: markiert den Abschnitt, der gerade gelesen wird. */
export default function SectionIndex({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav aria-label="Auf dieser Seite" className="ew-index">
      <p className="ew-sans mb-3 text-[0.8rem]" style={{ color: "var(--ew-stein)" }}>
        Auf dieser Seite
      </p>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} data-active={current === it.id}>
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
