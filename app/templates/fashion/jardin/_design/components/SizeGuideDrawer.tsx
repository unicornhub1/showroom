"use client";

import { useEffect, useState } from "react";
import { X, Ruler } from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────── */

type Category = "women" | "men" | "shoes";

interface SizeRow {
  size: string;
  bust: string;
  waist: string;
  hips: string;
}

interface ShoeRow {
  eu: string;
  uk: string;
  cm: string;
}

/* ── Data ─────────────────────────────────────────────────────────────── */

const womenSizes: SizeRow[] = [
  { size: "XS", bust: "80-84", waist: "62-66", hips: "88-92" },
  { size: "S", bust: "84-88", waist: "66-70", hips: "92-96" },
  { size: "M", bust: "88-92", waist: "70-74", hips: "96-100" },
  { size: "L", bust: "92-96", waist: "74-78", hips: "100-104" },
  { size: "XL", bust: "96-102", waist: "78-84", hips: "104-110" },
];

const menSizes: SizeRow[] = [
  { size: "S", bust: "90-96", waist: "76-82", hips: "94-98" },
  { size: "M", bust: "96-102", waist: "82-88", hips: "98-102" },
  { size: "L", bust: "102-108", waist: "88-94", hips: "102-106" },
  { size: "XL", bust: "108-114", waist: "94-100", hips: "106-112" },
  { size: "XXL", bust: "114-120", waist: "100-106", hips: "112-118" },
];

const shoeSizes: ShoeRow[] = [
  { eu: "36", uk: "3", cm: "22,5" },
  { eu: "37", uk: "4", cm: "23,5" },
  { eu: "38", uk: "5", cm: "24" },
  { eu: "39", uk: "6", cm: "24,5" },
  { eu: "40", uk: "6,5", cm: "25,5" },
  { eu: "41", uk: "7,5", cm: "26" },
  { eu: "42", uk: "8", cm: "26,5" },
];

const tabs: { label: string; value: Category }[] = [
  { label: "Damen", value: "women" },
  { label: "Herren", value: "men" },
  { label: "Schuhe", value: "shoes" },
];

const measureGuide = [
  {
    title: "Brust",
    desc: "Maßband um die breiteste Stelle der Brust legen. Waagerecht halten, anliegend aber nicht straff.",
  },
  {
    title: "Taille",
    desc: "An der schmalsten Stelle messen, knapp über dem Bauchnabel. Das Band sollte bequem anliegen.",
  },
  {
    title: "Hüfte",
    desc: "Um die breiteste Stelle der Hüfte messen, ca. 20 cm unterhalb der Taille. Band parallel zum Boden.",
  },
];

/* ── Component ────────────────────────────────────────────────────────── */

interface SizeGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productSizes?: string[];
  onSelectSize?: (size: string) => void;
}

export function SizeGuideDrawer({
  isOpen,
  onClose,
  productSizes,
  onSelectSize,
}: SizeGuideDrawerProps) {
  const [activeTab, setActiveTab] = useState<Category>("women");
  const [highlightedSize, setHighlightedSize] = useState<string | null>(null);

  /* Lock body scroll */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleSizeClick(size: string) {
    if (productSizes?.includes(size) && onSelectSize) {
      onSelectSize(size);
      onClose();
    }
  }

  const cellStyle = {
    fontFamily: "var(--jd-font-sans)",
    color: "var(--jd-charcoal)",
    fontWeight: 300 as const,
  };

  const headerStyle = {
    fontFamily: "var(--jd-font-sans)",
    color: "var(--jd-offwhite)",
    fontWeight: 500 as const,
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(61,61,61,0.2)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-lg flex-col shadow-2xl transition-transform duration-500 ease-out"
        style={{
          backgroundColor: "var(--jd-offwhite)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6"
          style={{ borderBottom: "1px solid var(--jd-light)" }}
        >
          <div className="flex items-center gap-3">
            <Ruler
              size={18}
              style={{ color: "var(--jd-sage)" }}
            />
            <h2
              className="text-sm uppercase tracking-[0.15em]"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
              }}
            >
              Größentabelle
            </h2>
          </div>
          <button onClick={onClose} aria-label="Schließen">
            <X className="h-5 w-5" style={{ color: "var(--jd-charcoal)" }} />
          </button>
        </div>

        {/* Content (scrollable) */}
        <div className="flex-1 overflow-y-auto">
          {/* Category tabs */}
          <div className="flex px-8 pt-6 pb-2 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="flex-1 rounded-lg py-2.5 text-[11px] uppercase tracking-[0.1em] transition-all duration-300"
                style={{
                  fontFamily: "var(--jd-font-sans)",
                  backgroundColor:
                    activeTab === tab.value
                      ? "var(--jd-sage)"
                      : "transparent",
                  color:
                    activeTab === tab.value
                      ? "var(--jd-offwhite)"
                      : "var(--jd-charcoal)",
                  border:
                    activeTab === tab.value
                      ? "1px solid var(--jd-sage)"
                      : "1px solid var(--jd-light)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Size table */}
          <div className="px-8 pt-4 pb-6">
            {activeTab !== "shoes" ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["Größe", "Brust", "Taille", "Hüfte"].map((h) => (
                      <th
                        key={h}
                        className="rounded-t-lg px-3 py-2.5 text-left text-[10px] uppercase tracking-[0.1em]"
                        style={{
                          ...headerStyle,
                          backgroundColor: "var(--jd-sage)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "women" ? womenSizes : menSizes).map(
                    (row, i) => {
                      const isAvailable = productSizes?.includes(row.size);
                      const isHighlighted = highlightedSize === row.size;
                      return (
                        <tr
                          key={row.size}
                          className="transition-colors duration-200"
                          style={{
                            backgroundColor: isHighlighted
                              ? "var(--jd-sage)"
                              : i % 2 === 0
                                ? "var(--jd-cream)"
                                : "var(--jd-offwhite)",
                            cursor: isAvailable ? "pointer" : "default",
                          }}
                          onMouseEnter={() =>
                            isAvailable && setHighlightedSize(row.size)
                          }
                          onMouseLeave={() => setHighlightedSize(null)}
                          onClick={() => handleSizeClick(row.size)}
                        >
                          <td
                            className="px-3 py-2.5 text-xs"
                            style={{
                              ...cellStyle,
                              fontWeight: 500,
                              color: isHighlighted
                                ? "var(--jd-offwhite)"
                                : isAvailable
                                  ? "var(--jd-charcoal)"
                                  : "var(--jd-sand)",
                            }}
                          >
                            {row.size}
                            {isAvailable && (
                              <span
                                className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full"
                                style={{
                                  backgroundColor: isHighlighted
                                    ? "var(--jd-offwhite)"
                                    : "var(--jd-sage)",
                                }}
                              />
                            )}
                          </td>
                          <td
                            className="px-3 py-2.5 text-xs"
                            style={{
                              ...cellStyle,
                              color: isHighlighted
                                ? "var(--jd-offwhite)"
                                : undefined,
                            }}
                          >
                            {row.bust}
                          </td>
                          <td
                            className="px-3 py-2.5 text-xs"
                            style={{
                              ...cellStyle,
                              color: isHighlighted
                                ? "var(--jd-offwhite)"
                                : undefined,
                            }}
                          >
                            {row.waist}
                          </td>
                          <td
                            className="px-3 py-2.5 text-xs"
                            style={{
                              ...cellStyle,
                              color: isHighlighted
                                ? "var(--jd-offwhite)"
                                : undefined,
                            }}
                          >
                            {row.hips}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["EU", "UK", "Fußlänge (cm)"].map((h) => (
                      <th
                        key={h}
                        className="rounded-t-lg px-3 py-2.5 text-left text-[10px] uppercase tracking-[0.1em]"
                        style={{
                          ...headerStyle,
                          backgroundColor: "var(--jd-sage)",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shoeSizes.map((row, i) => {
                    const isAvailable = productSizes?.includes(row.eu);
                    const isHighlighted = highlightedSize === row.eu;
                    return (
                      <tr
                        key={row.eu}
                        className="transition-colors duration-200"
                        style={{
                          backgroundColor: isHighlighted
                            ? "var(--jd-sage)"
                            : i % 2 === 0
                              ? "var(--jd-cream)"
                              : "var(--jd-offwhite)",
                          cursor: isAvailable ? "pointer" : "default",
                        }}
                        onMouseEnter={() =>
                          isAvailable && setHighlightedSize(row.eu)
                        }
                        onMouseLeave={() => setHighlightedSize(null)}
                        onClick={() =>
                          isAvailable && handleSizeClick(row.eu)
                        }
                      >
                        <td
                          className="px-3 py-2.5 text-xs"
                          style={{
                            ...cellStyle,
                            fontWeight: 500,
                            color: isHighlighted
                              ? "var(--jd-offwhite)"
                              : isAvailable
                                ? "var(--jd-charcoal)"
                                : "var(--jd-sand)",
                          }}
                        >
                          {row.eu}
                          {isAvailable && (
                            <span
                              className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full"
                              style={{
                                backgroundColor: isHighlighted
                                  ? "var(--jd-offwhite)"
                                  : "var(--jd-sage)",
                              }}
                            />
                          )}
                        </td>
                        <td
                          className="px-3 py-2.5 text-xs"
                          style={{
                            ...cellStyle,
                            color: isHighlighted
                              ? "var(--jd-offwhite)"
                              : undefined,
                          }}
                        >
                          {row.uk}
                        </td>
                        <td
                          className="px-3 py-2.5 text-xs"
                          style={{
                            ...cellStyle,
                            color: isHighlighted
                              ? "var(--jd-offwhite)"
                              : undefined,
                          }}
                        >
                          {row.cm}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {productSizes && (
              <p
                className="mt-3 text-[10px] tracking-wider"
                style={{
                  fontFamily: "var(--jd-font-sans)",
                  color: "var(--jd-sand)",
                }}
              >
                Verfügbare Größen sind markiert -- klicken zum Auswählen
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center px-8">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "var(--jd-sage)", opacity: 0.2 }}
            />
          </div>

          {/* How to measure */}
          <div className="px-8 py-8">
            <h3
              className="text-xs uppercase tracking-[0.15em] mb-6"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
              }}
            >
              Richtig Maßnehmen
            </h3>

            <div className="flex flex-col gap-5">
              {measureGuide.map((item, i) => (
                <div key={item.title} className="flex gap-4">
                  {/* Step indicator */}
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "var(--jd-sage)" }}
                  >
                    <span
                      className="text-[10px]"
                      style={{
                        fontFamily: "var(--jd-font-sans)",
                        color: "var(--jd-offwhite)",
                        fontWeight: 500,
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{
                        fontFamily: "var(--jd-font-sans)",
                        color: "var(--jd-charcoal)",
                        fontWeight: 500,
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        fontFamily: "var(--jd-font-sans)",
                        color: "var(--jd-charcoal)",
                        fontWeight: 300,
                        opacity: 0.7,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help box */}
          <div className="px-8 pb-8">
            <div
              className="rounded-xl px-6 py-5 text-center"
              style={{
                backgroundColor: "var(--jd-sage-light)",
                borderTop: "2px solid var(--jd-sage)",
              }}
            >
              <p
                className="text-xs mb-1"
                style={{
                  fontFamily: "var(--jd-font-serif)",
                  color: "var(--jd-charcoal)",
                }}
              >
                Unsicher bei Ihrer Größe?
              </p>
              <p
                className="text-[11px]"
                style={{
                  fontFamily: "var(--jd-font-sans)",
                  color: "var(--jd-charcoal)",
                  fontWeight: 300,
                  opacity: 0.7,
                }}
              >
                Unser Team berät Sie gerne persönlich.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
