"use client";

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
      {/* Decorative gold line */}
      {align === "center" && (
        <div className="flex items-center justify-center mb-6">
          <div
            className="h-px w-10"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45 mx-3"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
          <div
            className="h-px w-10"
            style={{ backgroundColor: "var(--pz-gold)" }}
          />
        </div>
      )}

      {/* Sub-brand label */}
      {label && (
        <p
          className="mb-4 text-[10px] tracking-[0.35em] uppercase"
          style={{
            fontFamily: "var(--pz-font-sans)",
            color: "var(--pz-gold)",
          }}
        >
          {label}
        </p>
      )}

      <h2
        className="text-3xl font-normal tracking-wide sm:text-4xl"
        style={{
          fontFamily: "var(--pz-font-serif)",
          color: "var(--pz-ivory)",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-3 text-sm tracking-[0.1em] uppercase"
          style={{
            fontFamily: "var(--pz-font-sans)",
            color: "var(--pz-warm-gray)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
