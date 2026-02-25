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
      className={`mb-14 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {/* Decorative gold line + diamond */}
      {align === "center" && (
        <div className="mb-8 flex items-center justify-center">
          <div
            className="h-px w-10"
            style={{ backgroundColor: "var(--au-gold)" }}
          />
          <div
            className="mx-3 h-1 w-1 rotate-45"
            style={{ backgroundColor: "var(--au-gold)" }}
          />
          <div
            className="h-px w-10"
            style={{ backgroundColor: "var(--au-gold)" }}
          />
        </div>
      )}

      {/* Label */}
      {label && (
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.3em]"
          style={{
            fontFamily: "var(--au-font-sans)",
            color: "var(--au-muted)",
            fontWeight: 400,
          }}
        >
          {label}
        </p>
      )}

      <h2
        className="text-3xl font-light tracking-wide sm:text-4xl"
        style={{
          fontFamily: "var(--au-font-serif)",
          color: "var(--au-black)",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-3 text-sm tracking-[0.05em]"
          style={{
            fontFamily: "var(--au-font-sans)",
            color: "var(--au-muted)",
            fontWeight: 300,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
