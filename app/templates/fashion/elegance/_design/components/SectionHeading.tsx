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
      {/* Sub-brand label (like RL's "POLO RALPH LAUREN") */}
      {label && (
        <p
          className="mb-4 text-[10px] tracking-[0.35em] uppercase"
          style={{
            fontFamily: "var(--el-font-sans)",
            color: "var(--el-gold)",
          }}
        >
          {label}
        </p>
      )}

      <h2
        className="text-3xl font-light tracking-wide sm:text-4xl"
        style={{
          fontFamily: "var(--el-font-serif)",
          color: "var(--el-navy)",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-3 text-sm tracking-[0.1em] uppercase"
          style={{
            fontFamily: "var(--el-font-sans)",
            color: "var(--el-gray)",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
