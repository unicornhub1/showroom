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
      {/* Monospace label */}
      {label && (
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.3em]"
          style={{
            fontFamily: "var(--kr-font-mono)",
            color: "var(--kr-neon)",
          }}
        >
          [{label}]
        </p>
      )}

      <h2
        className="text-5xl uppercase leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl"
        style={{
          fontFamily: "var(--kr-font-heading)",
          color: "var(--kr-text)",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-3 text-sm tracking-wide"
          style={{
            fontFamily: "var(--kr-font-body)",
            color: "var(--kr-muted)",
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Brutalist underline */}
      <div
        className={`mt-4 h-[2px] w-16 ${align === "center" ? "mx-auto" : ""}`}
        style={{ backgroundColor: "var(--kr-neon)" }}
      />
    </div>
  );
}

export default SectionHeading;
