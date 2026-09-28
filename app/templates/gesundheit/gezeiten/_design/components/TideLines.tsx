/* Gezeitenlinien: ruhige Sinuswellen, deren Ausschlag nach unten abnimmt.
   Werden serverseitig als Pfade berechnet, kein JavaScript im Browser. */

function wavePath(y0: number, amp: number, len: number, phase: number, width: number) {
  const pts: string[] = [];
  for (let x = 0; x <= width; x += 12) {
    const y = y0 + amp * Math.sin((x / len) * Math.PI * 2 + phase);
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

export default function TideLines({
  className = "",
  lines = 9,
  color = "var(--gz-flechte)",
}: {
  className?: string;
  lines?: number;
  color?: string;
}) {
  const width = 1440;
  const gap = 18;
  const height = lines * gap + 30;
  const paths = Array.from({ length: lines }, (_, i) => ({
    d: wavePath(18 + i * gap, 11 - i * 1.05, 360 + i * 26, i * 0.55, width),
    opacity: 0.9 - i * 0.075,
  }));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {paths.map((p, i) => (
        <path key={i} d={p.d} stroke={i === 0 ? "var(--gz-lehm)" : color} strokeWidth="1.2" opacity={p.opacity} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
