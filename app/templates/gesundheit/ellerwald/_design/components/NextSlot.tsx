"use client";

import { useSyncExternalStore } from "react";

/* Nächster freier Termin: wird im Browser aus dem heutigen Datum berechnet,
   damit die Vorlage nie ein veraltetes Datum zeigt. */

const TIMES = ["10:30", "11:15", "14:40", "16:00"];
const noopSubscribe = () => () => {};

function nextSlotLabel(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  while (d.getDay() === 0) d.setDate(d.getDate() + 1);
  const time = d.getDay() === 6 ? "11:15" : TIMES[d.getDate() % TIMES.length];
  const day = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
  return `${day}, ${time} Uhr`;
}

export default function NextSlot({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const label = useSyncExternalStore(noopSubscribe, nextSlotLabel, () => null);

  return (
    <p
      className={`ew-sans flex items-center gap-3 text-[0.9rem] leading-snug ${className}`}
      style={{ color: light ? "rgba(251,247,243,0.78)" : "var(--ew-pflaume-2)" }}
    >
      <span className="ew-live-dot" aria-hidden="true" />
      <span>
        Nächster freier Termin:{" "}
        <span style={{ color: light ? "var(--ew-leinen)" : "var(--ew-pflaume)" }}>
          {label ?? "diese Woche"}
        </span>
      </span>
    </p>
  );
}
