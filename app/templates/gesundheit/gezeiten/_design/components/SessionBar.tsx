import { SESSION } from "../data";

/* Die erste Behandlung als maßstäbliche Zeitleiste: Breite (Desktop) bzw.
   Höhe (mobil) jedes Abschnitts entspricht seiner Dauer in Minuten. */

/* Die Sektion liegt auf Kalk, daher beginnt die Skala bei Salbei:
   hell → kräftiger → Behandlung am dunkelsten → warmes Ausklingen. */
const TONES = [
  { bg: "#C6CDB6", fg: "var(--gz-moos)" },
  { bg: "#A3AD82", fg: "var(--gz-moos)" },
  { bg: "var(--gz-moos)", fg: "var(--gz-kalk)" },
  { bg: "#D6BD9F", fg: "var(--gz-moos)" },
];

const total = SESSION.reduce((s, x) => s + x.minutes, 0);
const rows = SESSION.map((s, i) => {
  const from = SESSION.slice(0, i).reduce((sum, x) => sum + x.minutes, 0);
  return { ...s, from, to: from + s.minutes, tone: TONES[i % TONES.length] };
});

export default function SessionBar() {
  return (
    <div>
      {/* Desktop: horizontal, proportional */}
      <div className="hidden lg:block">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: rows.map((r) => `${r.minutes}fr`).join(" ") }}
        >
          {rows.map((r) => (
            <div key={r.title} className="gz-session__seg flex min-h-[168px] flex-col justify-between" style={{ background: r.tone.bg, color: r.tone.fg }}>
              <span className="gz-sans text-[0.82rem] font-semibold tabular-nums opacity-80">
                Minute {r.from} bis {r.to}
              </span>
              <span className="gz-serif text-[1.55rem] leading-[1.08] tracking-[-0.015em]">{r.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-1" style={{ gridTemplateColumns: rows.map((r) => `${r.minutes}fr`).join(" ") }}>
          {rows.map((r) => (
            <p key={r.title} className="gz-body pr-6 text-[0.98rem]">
              {r.text}
            </p>
          ))}
        </div>
      </div>

      {/* Mobil: vertikal, Höhe nach Minuten */}
      <ol className="lg:hidden">
        {rows.map((r) => (
          <li key={r.title} className="grid grid-cols-[64px_1fr] gap-5">
            <div
              className="gz-sans flex items-start justify-center rounded-[14px] pt-3 text-[0.78rem] font-semibold tabular-nums"
              style={{ background: r.tone.bg, color: r.tone.fg, minHeight: `${Math.max(88, r.minutes * 7)}px`, marginBottom: 4 }}
            >
              {r.minutes}′
            </div>
            <div className="pb-6 pt-2">
              <p className="gz-meta tabular-nums">
                Minute {r.from} bis {r.to}
              </p>
              <h3 className="gz-serif mt-1 text-[1.45rem] leading-tight">{r.title}</h3>
              <p className="gz-body mt-2 text-[0.98rem]">{r.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="gz-meta mt-6">Insgesamt {total} Minuten. Folgebehandlungen dauern 50 Minuten.</p>
    </div>
  );
}
