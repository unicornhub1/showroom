"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Ruler } from "lucide-react";

const BASE = "/templates/fashion/jardin";

/* ── Types ────────────────────────────────────────────────────────────── */

type Category = "women" | "men" | "shoes";

interface SizeRow {
  size: string;
  bustChest: string;
  bustChestIn: string;
  waist: string;
  waistIn: string;
  hips: string;
  hipsIn: string;
}

interface ShoeRow {
  size: string;
  eu: string;
  uk: string;
  usCm: string;
}

/* ── Data ─────────────────────────────────────────────────────────────── */

const womenSizes: SizeRow[] = [
  { size: "XS", bustChest: "80-84", bustChestIn: "31.5-33", waist: "62-66", waistIn: "24.5-26", hips: "88-92", hipsIn: "34.5-36" },
  { size: "S", bustChest: "84-88", bustChestIn: "33-34.5", waist: "66-70", waistIn: "26-27.5", hips: "92-96", hipsIn: "36-38" },
  { size: "M", bustChest: "88-92", bustChestIn: "34.5-36", waist: "70-74", waistIn: "27.5-29", hips: "96-100", hipsIn: "38-39.5" },
  { size: "L", bustChest: "92-96", bustChestIn: "36-38", waist: "74-78", waistIn: "29-30.5", hips: "100-104", hipsIn: "39.5-41" },
  { size: "XL", bustChest: "96-102", bustChestIn: "38-40", waist: "78-84", waistIn: "30.5-33", hips: "104-110", hipsIn: "41-43.5" },
];

const menSizes: SizeRow[] = [
  { size: "S", bustChest: "90-96", bustChestIn: "35.5-38", waist: "76-82", waistIn: "30-32", hips: "94-98", hipsIn: "37-38.5" },
  { size: "M", bustChest: "96-102", bustChestIn: "38-40", waist: "82-88", waistIn: "32-34.5", hips: "98-102", hipsIn: "38.5-40" },
  { size: "L", bustChest: "102-108", bustChestIn: "40-42.5", waist: "88-94", waistIn: "34.5-37", hips: "102-106", hipsIn: "40-41.5" },
  { size: "XL", bustChest: "108-114", bustChestIn: "42.5-45", waist: "94-100", waistIn: "37-39.5", hips: "106-112", hipsIn: "41.5-44" },
];

const shoeSizes: ShoeRow[] = [
  { size: "36", eu: "36", uk: "3", usCm: "22.5" },
  { size: "37", eu: "37", uk: "4", usCm: "23.5" },
  { size: "38", eu: "38", uk: "5", usCm: "24" },
  { size: "39", eu: "39", uk: "6", usCm: "24.5" },
  { size: "40", eu: "40", uk: "6.5", usCm: "25.5" },
  { size: "41", eu: "41", uk: "7.5", usCm: "26" },
  { size: "42", eu: "42", uk: "8", usCm: "26.5" },
];

const tabs: { label: string; value: Category }[] = [
  { label: "Damenbekleidung", value: "women" },
  { label: "Herrenbekleidung", value: "men" },
  { label: "Schuhe", value: "shoes" },
];

/* ── Size Guide Page ──────────────────────────────────────────────────── */

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<Category>("women");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Simple size recommendation based on measurements
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");

  function getRecommendation(): string | null {
    const bustNum = parseFloat(bust);
    const waistNum = parseFloat(waist);
    if (isNaN(bustNum) || isNaN(waistNum)) return null;

    const sizes = activeTab === "women" ? womenSizes : activeTab === "men" ? menSizes : [];
    for (const row of sizes) {
      const [bustMin, bustMax] = row.bustChest.split("-").map(Number);
      const [waistMin, waistMax] = row.waist.split("-").map(Number);
      if (bustNum >= bustMin && bustNum <= bustMax && waistNum >= waistMin && waistNum <= waistMax) {
        return row.size;
      }
    }
    return null;
  }

  const recommendation = getRecommendation();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--jd-offwhite)" }}
    >
      {/* Page header */}
      <section className="px-6 pt-16 pb-4 md:px-12 md:pt-24 md:pb-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: "var(--jd-sage)", opacity: 0.4 }} />
            <Ruler size={16} style={{ color: "var(--jd-sage)", opacity: 0.6 }} />
            <div className="h-px w-8" style={{ backgroundColor: "var(--jd-sage)", opacity: 0.4 }} />
          </div>
          <h1
            className="text-4xl tracking-wide sm:text-5xl"
            style={{
              fontFamily: "var(--jd-font-serif)",
              color: "var(--jd-charcoal)",
              fontWeight: 400,
            }}
          >
            Größentabelle
          </h1>
          <p
            className="mt-3 text-sm"
            style={{
              fontFamily: "var(--jd-font-sans)",
              color: "var(--jd-charcoal)",
              opacity: 0.6,
            }}
          >
            Finden Sie Ihre perfekte Passform
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-8 md:px-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300"
              style={{
                fontFamily: "var(--jd-font-sans)",
                backgroundColor:
                  activeTab === tab.value ? "var(--jd-sage)" : "transparent",
                color:
                  activeTab === tab.value ? "var(--jd-offwhite)" : "var(--jd-charcoal)",
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
      </section>

      {/* Size chart */}
      <section className="mx-auto max-w-4xl px-6 pb-20 md:px-12">
        <div className="overflow-x-auto rounded-xl">
          {activeTab !== "shoes" ? (
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  {["Größe", "Brust (cm)", "Brust (Zoll)", "Taille (cm)", "Taille (Zoll)", "Hüfte (cm)", "Hüfte (Zoll)"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-[0.08em]"
                        style={{
                          fontFamily: "var(--jd-font-sans)",
                          backgroundColor: "var(--jd-sage)",
                          color: "var(--jd-offwhite)",
                        }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {(activeTab === "women" ? womenSizes : menSizes).map(
                  (row, index) => (
                    <tr
                      key={row.size}
                      className="transition-colors duration-200"
                      style={{
                        backgroundColor:
                          selectedSize === row.size
                            ? "var(--jd-sage-light)"
                            : index % 2 === 0
                              ? "var(--jd-cream)"
                              : "var(--jd-offwhite)",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedSize(row.size)}
                    >
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        style={{
                          fontFamily: "var(--jd-font-sans)",
                          color: "var(--jd-charcoal)",
                        }}
                      >
                        {row.size}
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-charcoal)", opacity: 0.8 }}>
                        {row.bustChest}
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-sand)" }}>
                        {row.bustChestIn}
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-charcoal)", opacity: 0.8 }}>
                        {row.waist}
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-sand)" }}>
                        {row.waistIn}
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-charcoal)", opacity: 0.8 }}>
                        {row.hips}
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-sand)" }}>
                        {row.hipsIn}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full min-w-[400px] border-collapse">
              <thead>
                <tr>
                  {["EU", "UK", "Fußlänge (cm)"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-[0.08em]"
                      style={{
                        fontFamily: "var(--jd-font-sans)",
                        backgroundColor: "var(--jd-sage)",
                        color: "var(--jd-offwhite)",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shoeSizes.map((row, index) => (
                  <tr
                    key={row.size}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "var(--jd-cream)" : "var(--jd-offwhite)",
                    }}
                  >
                    <td className="px-4 py-3 text-sm font-medium" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-charcoal)" }}>
                      {row.eu}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-charcoal)", opacity: 0.8 }}>
                      {row.uk}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ fontFamily: "var(--jd-font-sans)", color: "var(--jd-charcoal)", opacity: 0.8 }}>
                      {row.usCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Size Recommendation Tool */}
      {activeTab !== "shoes" && (
        <section className="mx-auto max-w-xl px-6 pb-20 md:px-12">
          <div
            className="rounded-2xl px-8 py-8 md:px-12"
            style={{
              backgroundColor: "var(--jd-sage-light)",
              borderTop: "2px solid var(--jd-sage)",
            }}
          >
            <h3
              className="mb-2 text-xl tracking-wide text-center"
              style={{
                fontFamily: "var(--jd-font-serif)",
                color: "var(--jd-charcoal)",
                fontWeight: 400,
              }}
            >
              Größenempfehlung
            </h3>
            <p
              className="mb-6 text-sm text-center"
              style={{
                fontFamily: "var(--jd-font-sans)",
                color: "var(--jd-charcoal)",
                opacity: 0.6,
              }}
            >
              Geben Sie Ihre Maße ein für eine persönliche Empfehlung
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  className="block text-xs uppercase tracking-wider mb-2"
                  style={{
                    fontFamily: "var(--jd-font-sans)",
                    color: "var(--jd-charcoal)",
                  }}
                >
                  Brust (cm)
                </label>
                <input
                  type="number"
                  value={bust}
                  onChange={(e) => setBust(e.target.value)}
                  placeholder="z.B. 88"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors"
                  style={{
                    fontFamily: "var(--jd-font-sans)",
                    backgroundColor: "var(--jd-offwhite)",
                    borderColor: "var(--jd-light)",
                    color: "var(--jd-charcoal)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--jd-sage)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--jd-light)"; }}
                />
              </div>
              <div>
                <label
                  className="block text-xs uppercase tracking-wider mb-2"
                  style={{
                    fontFamily: "var(--jd-font-sans)",
                    color: "var(--jd-charcoal)",
                  }}
                >
                  Taille (cm)
                </label>
                <input
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="z.B. 72"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors"
                  style={{
                    fontFamily: "var(--jd-font-sans)",
                    backgroundColor: "var(--jd-offwhite)",
                    borderColor: "var(--jd-light)",
                    color: "var(--jd-charcoal)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--jd-sage)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--jd-light)"; }}
                />
              </div>
            </div>

            {recommendation && (
              <div
                className="rounded-lg px-4 py-3 text-center"
                style={{ backgroundColor: "var(--jd-offwhite)" }}
              >
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--jd-font-sans)",
                    color: "var(--jd-charcoal)",
                  }}
                >
                  Empfohlene Größe:{" "}
                  <span
                    className="font-medium"
                    style={{ color: "var(--jd-sage)" }}
                  >
                    {recommendation}
                  </span>
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How to Measure */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: "var(--jd-sage)", opacity: 0.4 }} />
            <Leaf size={16} style={{ color: "var(--jd-sage)", opacity: 0.6 }} />
            <div className="h-px w-8" style={{ backgroundColor: "var(--jd-sage)", opacity: 0.4 }} />
          </div>
          <h2
            className="text-3xl tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--jd-font-serif)",
              color: "var(--jd-charcoal)",
              fontWeight: 400,
            }}
          >
            Richtig Maßnehmen
          </h2>
          <p
            className="mt-3 text-sm"
            style={{
              fontFamily: "var(--jd-font-sans)",
              color: "var(--jd-charcoal)",
              opacity: 0.6,
            }}
          >
            Drei einfache Schritte für die perfekte Passform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {[
            {
              step: 1,
              title: "Brust",
              description:
                "Legen Sie das Maßband um die breiteste Stelle Ihrer Brust. Halten Sie das Band waagerecht und anliegend, aber nicht zu straff.",
              gradient: "linear-gradient(135deg, #E8EDE5 0%, #7A8B6F 50%, #D4C5B2 100%)",
            },
            {
              step: 2,
              title: "Taille",
              description:
                "Messen Sie an der schmalsten Stelle Ihrer natürlichen Taille, in der Regel knapp über dem Bauchnabel.",
              gradient: "linear-gradient(135deg, #D4C5B2 0%, #C17C5F 50%, #C4A08A 100%)",
            },
            {
              step: 3,
              title: "Hüfte",
              description:
                "Stellen Sie sich mit geschlossenen Füßen hin und messen Sie um die breiteste Stelle Ihrer Hüfte.",
              gradient: "linear-gradient(135deg, #C4A08A 0%, #7A8B6F 50%, #E8EDE5 100%)",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div
                className="mx-auto mb-8 h-40 w-full rounded-xl overflow-hidden"
                style={{ background: item.gradient }}
              />

              <div
                className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--jd-sage)" }}
              >
                <span
                  className="text-sm font-medium"
                  style={{
                    fontFamily: "var(--jd-font-sans)",
                    color: "var(--jd-offwhite)",
                  }}
                >
                  {item.step}
                </span>
              </div>

              <h3
                className="mb-3 text-xl tracking-wide"
                style={{
                  fontFamily: "var(--jd-font-serif)",
                  color: "var(--jd-charcoal)",
                  fontWeight: 400,
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--jd-font-sans)",
                  color: "var(--jd-charcoal)",
                  opacity: 0.7,
                  lineHeight: 1.8,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Help box */}
      <section className="mx-auto max-w-3xl px-6 pb-16 md:px-12">
        <div
          className="rounded-2xl px-8 py-8 text-center md:px-12"
          style={{
            backgroundColor: "var(--jd-cream)",
            borderTop: "2px solid var(--jd-sage)",
          }}
        >
          <h3
            className="mb-3 text-xl tracking-wide"
            style={{
              fontFamily: "var(--jd-font-serif)",
              color: "var(--jd-charcoal)",
              fontWeight: 400,
            }}
          >
            Unsicher bei Ihrer Größe?
          </h3>
          <p
            className="mb-6 text-sm"
            style={{
              fontFamily: "var(--jd-font-sans)",
              color: "var(--jd-charcoal)",
              opacity: 0.6,
            }}
          >
            Unser Team hilft Ihnen gerne, die perfekte Passform zu finden.
          </p>
          <Link
            href={`${BASE}/about`}
            className="inline-block rounded-lg border px-10 py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300"
            style={{
              fontFamily: "var(--jd-font-sans)",
              borderColor: "var(--jd-sage)",
              color: "var(--jd-sage)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--jd-sage)";
              e.currentTarget.style.color = "var(--jd-offwhite)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--jd-sage)";
            }}
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>

      {/* Back to products */}
      <section className="pb-32 text-center">
        <Link
          href={`${BASE}/products`}
          className="inline-block rounded-lg border px-12 py-4 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300"
          style={{
            fontFamily: "var(--jd-font-sans)",
            borderColor: "var(--jd-sage)",
            color: "var(--jd-sage)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--jd-sage)";
            e.currentTarget.style.color = "var(--jd-offwhite)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--jd-sage)";
          }}
        >
          Produkte durchstöbern
        </Link>
      </section>
    </main>
  );
}
