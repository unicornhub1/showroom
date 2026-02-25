"use client";

import { useState } from "react";
import Link from "next/link";

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
  { size: "XXL", bustChest: "102-108", bustChestIn: "40-42.5", waist: "84-90", waistIn: "33-35.5", hips: "110-116", hipsIn: "43.5-45.5" },
];

const menSizes: SizeRow[] = [
  { size: "XS", bustChest: "86-90", bustChestIn: "34-35.5", waist: "72-76", waistIn: "28.5-30", hips: "90-94", hipsIn: "35.5-37" },
  { size: "S", bustChest: "90-96", bustChestIn: "35.5-38", waist: "76-82", waistIn: "30-32", hips: "94-98", hipsIn: "37-38.5" },
  { size: "M", bustChest: "96-102", bustChestIn: "38-40", waist: "82-88", waistIn: "32-34.5", hips: "98-102", hipsIn: "38.5-40" },
  { size: "L", bustChest: "102-108", bustChestIn: "40-42.5", waist: "88-94", waistIn: "34.5-37", hips: "102-106", hipsIn: "40-41.5" },
  { size: "XL", bustChest: "108-114", bustChestIn: "42.5-45", waist: "94-100", waistIn: "37-39.5", hips: "106-112", hipsIn: "41.5-44" },
  { size: "XXL", bustChest: "114-120", bustChestIn: "45-47", waist: "100-106", waistIn: "39.5-41.5", hips: "112-118", hipsIn: "44-46.5" },
];

const shoeSizes: ShoeRow[] = [
  { size: "36", eu: "36", uk: "3", usCm: "22.5" },
  { size: "37", eu: "37", uk: "4", usCm: "23.5" },
  { size: "38", eu: "38", uk: "5", usCm: "24" },
  { size: "39", eu: "39", uk: "6", usCm: "24.5" },
  { size: "40", eu: "40", uk: "6.5", usCm: "25.5" },
  { size: "41", eu: "41", uk: "7.5", usCm: "26" },
  { size: "42", eu: "42", uk: "8", usCm: "26.5" },
  { size: "43", eu: "43", uk: "9", usCm: "27.5" },
  { size: "44", eu: "44", uk: "9.5", usCm: "28" },
  { size: "45", eu: "45", uk: "10.5", usCm: "29" },
];

const tabs: { label: string; value: Category }[] = [
  { label: "Damenbekleidung", value: "women" },
  { label: "Herrenbekleidung", value: "men" },
  { label: "Schuhe", value: "shoes" },
];

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<Category>("women");

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--el-offwhite)" }}
    >
      {/* ── Page header ──────────────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-4 md:px-12 md:pt-24 md:pb-8">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <h1
            className="text-4xl font-light tracking-wide sm:text-5xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Größentabelle
          </h1>
          <p
            className="mt-3 text-sm tracking-[0.1em] uppercase"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gray)",
            }}
          >
            Finden Sie Ihre perfekte Passform
          </p>
        </div>
      </section>

      {/* ── Category tabs ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-8 md:px-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300"
              style={{
                fontFamily: "var(--el-font-sans)",
                backgroundColor:
                  activeTab === tab.value
                    ? "var(--el-gold)"
                    : "transparent",
                color:
                  activeTab === tab.value
                    ? "var(--el-offwhite)"
                    : "var(--el-navy)",
                border:
                  activeTab === tab.value
                    ? "1px solid var(--el-gold)"
                    : "1px solid var(--el-light)",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.value) {
                  e.currentTarget.style.borderColor = "var(--el-gold)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.value) {
                  e.currentTarget.style.borderColor = "var(--el-light)";
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Size chart ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-20 md:px-12">
        <div className="overflow-x-auto">
          {activeTab !== "shoes" ? (
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  {["Größe", "Brust (cm)", "Brust (Zoll)", "Taille (cm)", "Taille (Zoll)", "Hüfte (cm)", "Hüfte (Zoll)"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-[0.12em]"
                        style={{
                          fontFamily: "var(--el-font-sans)",
                          backgroundColor: "var(--el-gold)",
                          color: "var(--el-offwhite)",
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
                      style={{
                        backgroundColor:
                          index % 2 === 0
                            ? "var(--el-cream)"
                            : "var(--el-offwhite)",
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm font-medium"
                        style={{
                          fontFamily: "var(--el-font-sans)",
                          color: "var(--el-navy)",
                        }}
                      >
                        {row.size}
                      </td>
                      <td
                        className="px-4 py-3 text-sm font-light"
                        style={{
                          fontFamily: "var(--el-font-sans)",
                          color: "var(--el-black)",
                        }}
                      >
                        {row.bustChest}
                      </td>
                      <td
                        className="px-4 py-3 text-sm font-light"
                        style={{
                          fontFamily: "var(--el-font-sans)",
                          color: "var(--el-gray)",
                        }}
                      >
                        {row.bustChestIn}
                      </td>
                      <td
                        className="px-4 py-3 text-sm font-light"
                        style={{
                          fontFamily: "var(--el-font-sans)",
                          color: "var(--el-black)",
                        }}
                      >
                        {row.waist}
                      </td>
                      <td
                        className="px-4 py-3 text-sm font-light"
                        style={{
                          fontFamily: "var(--el-font-sans)",
                          color: "var(--el-gray)",
                        }}
                      >
                        {row.waistIn}
                      </td>
                      <td
                        className="px-4 py-3 text-sm font-light"
                        style={{
                          fontFamily: "var(--el-font-sans)",
                          color: "var(--el-black)",
                        }}
                      >
                        {row.hips}
                      </td>
                      <td
                        className="px-4 py-3 text-sm font-light"
                        style={{
                          fontFamily: "var(--el-font-sans)",
                          color: "var(--el-gray)",
                        }}
                      >
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
                      className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-[0.12em]"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        backgroundColor: "var(--el-gold)",
                        color: "var(--el-offwhite)",
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
                        index % 2 === 0
                          ? "var(--el-cream)"
                          : "var(--el-offwhite)",
                    }}
                  >
                    <td
                      className="px-4 py-3 text-sm font-medium"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        color: "var(--el-navy)",
                      }}
                    >
                      {row.eu}
                    </td>
                    <td
                      className="px-4 py-3 text-sm font-light"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        color: "var(--el-black)",
                      }}
                    >
                      {row.uk}
                    </td>
                    <td
                      className="px-4 py-3 text-sm font-light"
                      style={{
                        fontFamily: "var(--el-font-sans)",
                        color: "var(--el-black)",
                      }}
                    >
                      {row.usCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-center">
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="mx-4 h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
      </div>

      {/* ── How to Measure ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 text-center">
          <div
            className="mx-auto mb-6 h-px w-16"
            style={{ backgroundColor: "var(--el-gold)" }}
          />
          <h2
            className="text-3xl font-light tracking-wide sm:text-4xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Richtig Maßnehmen
          </h2>
          <p
            className="mt-3 text-sm tracking-[0.1em] uppercase"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gray)",
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
                "Legen Sie das Maßband um die breiteste Stelle Ihrer Brust. Halten Sie das Band waagerecht und anliegend, aber nicht zu straff. Atmen Sie normal und notieren Sie das Maß.",
              gradient:
                "linear-gradient(135deg, #F5F0E8 0%, #E8E3DA 40%, #C4A265 100%)",
            },
            {
              step: 2,
              title: "Taille",
              description:
                "Messen Sie an der schmalsten Stelle Ihrer natürlichen Taille, in der Regel knapp über dem Bauchnabel. Ziehen Sie das Band nicht zu straff -- es sollte bequem an Ihrer Haut anliegen.",
              gradient:
                "linear-gradient(135deg, #E8E3DA 0%, #C17C74 50%, #D4A49E 100%)",
            },
            {
              step: 3,
              title: "Hüfte",
              description:
                "Stellen Sie sich mit geschlossenen Füßen hin und messen Sie um die breiteste Stelle Ihrer Hüfte, etwa 20 cm unterhalb Ihrer natürlichen Taille. Halten Sie das Maßband parallel zum Boden.",
              gradient:
                "linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 40%, #C4A265 100%)",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              {/* Gradient illustration placeholder */}
              <div
                className="mx-auto mb-8 h-40 w-full overflow-hidden"
                style={{ background: item.gradient }}
              />

              {/* Step number */}
              <div
                className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--el-gold)" }}
              >
                <span
                  className="text-sm font-medium"
                  style={{
                    fontFamily: "var(--el-font-sans)",
                    color: "var(--el-offwhite)",
                  }}
                >
                  {item.step}
                </span>
              </div>

              <h3
                className="mb-3 text-xl font-light tracking-wide"
                style={{
                  fontFamily: "var(--el-font-serif)",
                  color: "var(--el-navy)",
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm font-light leading-relaxed"
                style={{
                  fontFamily: "var(--el-font-sans)",
                  color: "var(--el-gray)",
                  lineHeight: 1.8,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tip box ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 pb-16 md:px-12">
        <div
          className="px-8 py-8 text-center md:px-12"
          style={{
            backgroundColor: "var(--el-cream)",
            borderTop: "2px solid var(--el-gold)",
          }}
        >
          <h3
            className="mb-3 text-xl font-light tracking-wide"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-navy)",
            }}
          >
            Unsicher bei Ihrer Größe?
          </h3>
          <p
            className="mb-6 text-sm font-light"
            style={{
              fontFamily: "var(--el-font-sans)",
              color: "var(--el-gray)",
            }}
          >
            Unser Team hilft Ihnen gerne, die perfekte Passform zu finden.
            Kontaktieren Sie uns für eine persönliche Beratung.
          </p>
          <Link
            href="/templates/fashion/elegance/about"
            className="inline-block border px-10 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
            style={{
              fontFamily: "var(--el-font-sans)",
              borderColor: "var(--el-navy)",
              color: "var(--el-navy)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--el-navy)";
              e.currentTarget.style.color = "var(--el-cream)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--el-navy)";
            }}
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>

      {/* ── Gold divider ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-center pb-16">
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="mx-4 h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
        <div
          className="h-px w-8"
          style={{ backgroundColor: "var(--el-gold)" }}
        />
      </div>

      {/* ── Back to products ─────────────────────────────────────────── */}
      <section className="pb-32 text-center">
        <Link
          href="/templates/fashion/elegance/products"
          className="inline-block border px-12 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
          style={{
            fontFamily: "var(--el-font-sans)",
            borderColor: "var(--el-navy)",
            color: "var(--el-navy)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--el-navy)";
            e.currentTarget.style.color = "var(--el-cream)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--el-navy)";
          }}
        >
          Produkte durchstöbern
        </Link>
      </section>
    </main>
  );
}
