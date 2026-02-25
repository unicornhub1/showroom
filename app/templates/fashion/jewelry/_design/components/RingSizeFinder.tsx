"use client";

import { useState, useCallback } from "react";

/* ── Ring Size Data ────────────────────────────────────────────────────── */

const RING_SIZES = [
  { eu: 48, us: 4.5, uk: "I", mm: 15.3 },
  { eu: 49, us: 5.0, uk: "J", mm: 15.6 },
  { eu: 50, us: 5.5, uk: "K", mm: 15.9 },
  { eu: 51, us: 5.75, uk: "L", mm: 16.2 },
  { eu: 52, us: 6.0, uk: "L½", mm: 16.5 },
  { eu: 53, us: 6.5, uk: "M½", mm: 16.8 },
  { eu: 54, us: 7.0, uk: "N", mm: 17.2 },
  { eu: 55, us: 7.25, uk: "O", mm: 17.5 },
  { eu: 56, us: 7.5, uk: "O½", mm: 17.8 },
  { eu: 57, us: 8.0, uk: "P½", mm: 18.1 },
  { eu: 58, us: 8.5, uk: "Q", mm: 18.5 },
  { eu: 59, us: 8.75, uk: "R", mm: 18.8 },
  { eu: 60, us: 9.0, uk: "R½", mm: 19.1 },
  { eu: 62, us: 10.0, uk: "T½", mm: 19.7 },
];

export function RingSizeFinder() {
  const [diameter, setDiameter] = useState(17.0);

  const closestSize = RING_SIZES.reduce((prev, curr) =>
    Math.abs(curr.mm - diameter) < Math.abs(prev.mm - diameter) ? curr : prev
  );

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDiameter(parseFloat(e.target.value));
  }, []);

  /* Convert mm to px for circle display (roughly 3.78 px per mm at 96dpi) */
  const circlePx = diameter * 3.78;

  return (
    <div>
      {/* Interactive circle sizer */}
      <div className="mb-10">
        <p
          className="mb-6 text-[10px] uppercase tracking-[0.25em]"
          style={{
            fontFamily: "var(--au-font-sans)",
            color: "var(--au-muted)",
            fontWeight: 400,
          }}
        >
          Legen Sie Ihren Ring auf den Kreis und passen Sie die Größe an
        </p>

        {/* Circle display */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="relative flex items-center justify-center"
            style={{ height: 120, width: 120 }}
          >
            <div
              className="rounded-full transition-all duration-200"
              style={{
                width: circlePx,
                height: circlePx,
                border: "1.5px solid var(--au-gold)",
                boxShadow: "0 0 20px rgba(201,169,110,0.15)",
              }}
            />
          </div>

          {/* Slider */}
          <div className="w-full max-w-xs">
            <input
              type="range"
              min="15.0"
              max="20.0"
              step="0.1"
              value={diameter}
              onChange={handleSlider}
              className="au-range-slider w-full"
              style={{
                accentColor: "var(--au-gold)",
              }}
            />
            <div className="mt-2 flex justify-between">
              <span
                className="text-[10px]"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-muted)",
                }}
              >
                15 mm
              </span>
              <span
                className="text-[10px]"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-muted)",
                }}
              >
                20 mm
              </span>
            </div>
          </div>

          {/* Result */}
          <div
            className="px-8 py-5 text-center"
            style={{
              backgroundColor: "var(--au-gold-light)",
              border: "0.5px solid var(--au-gold)",
            }}
          >
            <p
              className="mb-1 text-[10px] uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-gold)",
              }}
            >
              Ihre Ringgröße
            </p>
            <p
              className="text-3xl"
              style={{
                fontFamily: "var(--au-font-serif)",
                color: "var(--au-black)",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              EU {closestSize.eu}
            </p>
            <p
              className="mt-1 text-xs"
              style={{
                fontFamily: "var(--au-font-sans)",
                color: "var(--au-charcoal)",
                fontWeight: 300,
              }}
            >
              US {closestSize.us} / UK {closestSize.uk} / {closestSize.mm} mm
            </p>
          </div>
        </div>
      </div>

      {/* Reference Table */}
      <div className="mb-10">
        <h3
          className="mb-5 text-lg"
          style={{
            fontFamily: "var(--au-font-serif)",
            color: "var(--au-black)",
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          Größentabelle
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr
                style={{
                  borderBottom: "0.5px solid var(--au-line)",
                }}
              >
                {["EU", "US", "UK", "Durchmesser"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.2em]"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color: "var(--au-muted)",
                      fontWeight: 400,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RING_SIZES.map((size) => (
                <tr
                  key={size.eu}
                  style={{
                    borderBottom: "0.5px solid var(--au-line)",
                    backgroundColor:
                      closestSize.eu === size.eu
                        ? "var(--au-gold-light)"
                        : "transparent",
                  }}
                >
                  <td
                    className="px-4 py-2.5 text-sm"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color:
                        closestSize.eu === size.eu
                          ? "var(--au-gold)"
                          : "var(--au-black)",
                      fontWeight: closestSize.eu === size.eu ? 500 : 300,
                    }}
                  >
                    {size.eu}
                  </td>
                  <td
                    className="px-4 py-2.5 text-sm"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color: "var(--au-charcoal)",
                      fontWeight: 300,
                    }}
                  >
                    {size.us}
                  </td>
                  <td
                    className="px-4 py-2.5 text-sm"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color: "var(--au-charcoal)",
                      fontWeight: 300,
                    }}
                  >
                    {size.uk}
                  </td>
                  <td
                    className="px-4 py-2.5 text-sm"
                    style={{
                      fontFamily: "var(--au-font-sans)",
                      color: "var(--au-charcoal)",
                      fontWeight: 300,
                    }}
                  >
                    {size.mm} mm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div>
        <h3
          className="mb-4 text-lg"
          style={{
            fontFamily: "var(--au-font-serif)",
            color: "var(--au-black)",
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          Tipps zum Messen
        </h3>
        <ul className="space-y-3">
          {[
            "Messen Sie am Ende des Tages, wenn Ihre Finger am größten sind.",
            "Vermeiden Sie das Messen bei Kälte — Finger ziehen sich zusammen.",
            "Messen Sie den Finger, an dem Sie den Ring tragen möchten.",
            "Bei Unsicherheit zwischen zwei Größen wählen Sie die größere.",
            "Breite Ringe (>6mm) sollten eine halbe Größe größer gewählt werden.",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1 block h-1 w-1 shrink-0 rotate-45"
                style={{ backgroundColor: "var(--au-gold)" }}
              />
              <span
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--au-font-sans)",
                  color: "var(--au-charcoal)",
                  fontWeight: 300,
                }}
              >
                {tip}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Custom slider styles */}
      <style>{`
        .au-range-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 1px;
          background: var(--au-line);
          outline: none;
        }
        .au-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--au-gold);
          cursor: pointer;
          border: 2px solid var(--au-white);
          box-shadow: 0 0 4px rgba(201,169,110,0.3);
        }
        .au-range-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--au-gold);
          cursor: pointer;
          border: 2px solid var(--au-white);
          box-shadow: 0 0 4px rgba(201,169,110,0.3);
        }
      `}</style>
    </div>
  );
}

export default RingSizeFinder;
