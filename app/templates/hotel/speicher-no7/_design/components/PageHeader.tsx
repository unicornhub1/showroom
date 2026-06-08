import Media from "./Media";

export default function PageHeader({
  image,
  gradient,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  gradient: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative" style={{ minHeight: "52vh" }}>
      <Media
        src={image}
        alt={title}
        gradient={gradient}
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
        priority
      />
      {/* Leichter, gleichmäßiger Scrim statt schwerem Verlauf */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(27,26,24,0.42)" }} />
      <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-[1320px] flex-col justify-end px-6 pb-16 pt-40 lg:px-10">
        <span className="sp-eyebrow" style={{ color: "rgba(244,242,237,0.78)" }}>
          {eyebrow}
        </span>
        <div className="mt-5 h-px w-16" style={{ backgroundColor: "rgba(244,242,237,0.45)" }} />
        <h1
          className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--sp-font-display)", color: "#F7F5F1" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ fontFamily: "var(--sp-font-sans)", color: "rgba(247,245,241,0.85)", fontWeight: 300 }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
