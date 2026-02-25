"use client";

import { Leaf } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  label,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {/* Botanical decorative element */}
      {align === "center" && (
        <div className="mb-4 flex items-center justify-center gap-3">
          <div
            className="h-px w-8"
            style={{ backgroundColor: "var(--jd-sage)", opacity: 0.4 }}
          />
          <Leaf
            size={16}
            style={{ color: "var(--jd-sage)", opacity: 0.6 }}
          />
          <div
            className="h-px w-8"
            style={{ backgroundColor: "var(--jd-sage)", opacity: 0.4 }}
          />
        </div>
      )}

      {/* Sub-brand label */}
      {label && (
        <p
          className="mb-3 text-[10px] tracking-[0.25em] uppercase"
          style={{
            fontFamily: "var(--jd-font-sans)",
            color: "var(--jd-sage)",
          }}
        >
          {label}
        </p>
      )}

      <h2
        className="text-3xl tracking-wide sm:text-4xl"
        style={{
          fontFamily: "var(--jd-font-serif)",
          color: "var(--jd-charcoal)",
          fontWeight: 400,
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-3 text-sm tracking-[0.05em]"
          style={{
            fontFamily: "var(--jd-font-sans)",
            color: "var(--jd-charcoal)",
            opacity: 0.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
