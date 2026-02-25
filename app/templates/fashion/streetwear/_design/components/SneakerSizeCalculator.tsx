"use client";

import { useState, useMemo } from "react";

/* ── Size conversion data ──────────────────────────────────────────────── */

const SIZE_TABLE = [
  { cm: 22.5, eu: 36, us: 4, uk: 3.5 },
  { cm: 23.0, eu: 37, us: 5, uk: 4 },
  { cm: 23.5, eu: 37.5, us: 5.5, uk: 4.5 },
  { cm: 24.0, eu: 38, us: 6, uk: 5 },
  { cm: 24.5, eu: 38.5, us: 6.5, uk: 5.5 },
  { cm: 25.0, eu: 39, us: 7, uk: 6 },
  { cm: 25.5, eu: 40, us: 7.5, uk: 6.5 },
  { cm: 26.0, eu: 40.5, us: 8, uk: 7 },
  { cm: 26.5, eu: 41, us: 8.5, uk: 7.5 },
  { cm: 27.0, eu: 42, us: 9, uk: 8 },
  { cm: 27.5, eu: 42.5, us: 9.5, uk: 8.5 },
  { cm: 28.0, eu: 43, us: 10, uk: 9 },
  { cm: 28.5, eu: 44, us: 10.5, uk: 9.5 },
  { cm: 29.0, eu: 44.5, us: 11, uk: 10 },
  { cm: 29.5, eu: 45, us: 11.5, uk: 10.5 },
  { cm: 30.0, eu: 46, us: 12, uk: 11 },
  { cm: 30.5, eu: 47, us: 13, uk: 12 },
];

export default function SneakerSizeCalculator() {
  const [footLength, setFootLength] = useState("");

  const recommendation = useMemo(() => {
    const cm = parseFloat(footLength);
    if (isNaN(cm) || cm < 22 || cm > 31) return null;

    /* Find closest match */
    let closest = SIZE_TABLE[0];
    let minDiff = Math.abs(cm - SIZE_TABLE[0].cm);

    for (const entry of SIZE_TABLE) {
      const diff = Math.abs(cm - entry.cm);
      if (diff < minDiff) {
        minDiff = diff;
        closest = entry;
      }
    }

    return closest;
  }, [footLength]);

  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "var(--kr-dark)",
        border: "1px solid var(--kr-charcoal)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{
          borderBottom: "1px solid var(--kr-charcoal)",
        }}
      >
        <h3
          className="text-2xl uppercase"
          style={{
            fontFamily: "var(--kr-font-heading)",
            color: "var(--kr-text)",
          }}
        >
          Größen-Rechner
        </h3>
        <p
          className="mt-1 text-xs"
          style={{
            fontFamily: "var(--kr-font-body)",
            color: "var(--kr-muted)",
          }}
        >
          Gib deine Fußlänge in cm ein und finde deine perfekte Größe.
        </p>
      </div>

      {/* Input */}
      <div className="px-6 py-5">
        <label
          className="mb-2 block text-[10px] uppercase tracking-[0.2em]"
          style={{
            fontFamily: "var(--kr-font-mono)",
            color: "var(--kr-muted)",
          }}
        >
          Fußlänge (cm)
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            step="0.5"
            min="22"
            max="31"
            value={footLength}
            onChange={(e) => setFootLength(e.target.value)}
            placeholder="z.B. 27.0"
            className="flex-1 px-4 py-3 text-sm outline-none transition-all duration-200"
            style={{
              fontFamily: "var(--kr-font-mono)",
              backgroundColor: "var(--kr-black)",
              color: "var(--kr-text)",
              border: "1px solid var(--kr-charcoal)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--kr-neon)";
              e.currentTarget.style.boxShadow =
                "0 0 8px rgba(205, 255, 0, 0.2)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--kr-charcoal)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Result */}
        {recommendation && (
          <div
            className="mt-4 grid grid-cols-3 gap-2"
          >
            {[
              { label: "EU", value: recommendation.eu },
              { label: "US", value: recommendation.us },
              { label: "UK", value: recommendation.uk },
            ].map((item) => (
              <div
                key={item.label}
                className="py-3 text-center"
                style={{
                  backgroundColor: "var(--kr-neon-dim)",
                  border: "1px solid var(--kr-neon)",
                }}
              >
                <p
                  className="text-[9px] uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-neon)",
                  }}
                >
                  {item.label}
                </p>
                <p
                  className="mt-1 text-2xl font-bold"
                  style={{
                    fontFamily: "var(--kr-font-mono)",
                    color: "var(--kr-neon)",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reference Table */}
      <div
        className="px-6 pb-6"
      >
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.2em]"
          style={{
            fontFamily: "var(--kr-font-mono)",
            color: "var(--kr-muted)",
          }}
        >
          Referenztabelle
        </p>
        <div
          className="max-h-[240px] overflow-y-auto kr-scrollbar"
          style={{ border: "1px solid var(--kr-charcoal)" }}
        >
          <table className="w-full text-xs" style={{ fontFamily: "var(--kr-font-mono)" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--kr-charcoal)" }}>
                <th
                  className="px-3 py-2 text-left text-[9px] uppercase tracking-wider"
                  style={{ color: "var(--kr-neon)" }}
                >
                  CM
                </th>
                <th
                  className="px-3 py-2 text-left text-[9px] uppercase tracking-wider"
                  style={{ color: "var(--kr-neon)" }}
                >
                  EU
                </th>
                <th
                  className="px-3 py-2 text-left text-[9px] uppercase tracking-wider"
                  style={{ color: "var(--kr-neon)" }}
                >
                  US
                </th>
                <th
                  className="px-3 py-2 text-left text-[9px] uppercase tracking-wider"
                  style={{ color: "var(--kr-neon)" }}
                >
                  UK
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZE_TABLE.map((row, i) => {
                const isHighlighted =
                  recommendation &&
                  recommendation.cm === row.cm;
                return (
                  <tr
                    key={row.cm}
                    style={{
                      backgroundColor: isHighlighted
                        ? "var(--kr-neon-dim)"
                        : i % 2 === 0
                        ? "var(--kr-black)"
                        : "var(--kr-dark)",
                      borderLeft: isHighlighted
                        ? "2px solid var(--kr-neon)"
                        : "2px solid transparent",
                    }}
                  >
                    <td
                      className="px-3 py-2"
                      style={{
                        color: isHighlighted
                          ? "var(--kr-neon)"
                          : "var(--kr-text)",
                      }}
                    >
                      {row.cm}
                    </td>
                    <td
                      className="px-3 py-2"
                      style={{
                        color: isHighlighted
                          ? "var(--kr-neon)"
                          : "var(--kr-text)",
                      }}
                    >
                      {row.eu}
                    </td>
                    <td
                      className="px-3 py-2"
                      style={{
                        color: isHighlighted
                          ? "var(--kr-neon)"
                          : "var(--kr-text)",
                      }}
                    >
                      {row.us}
                    </td>
                    <td
                      className="px-3 py-2"
                      style={{
                        color: isHighlighted
                          ? "var(--kr-neon)"
                          : "var(--kr-text)",
                      }}
                    >
                      {row.uk}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
