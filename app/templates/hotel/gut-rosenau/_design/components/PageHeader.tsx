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
    <section className="relative" style={{ minHeight: "48vh" }}>
      <Media
        src={image}
        alt={title}
        gradient={gradient}
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
        priority
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(42,37,32,0.30) 0%, rgba(42,37,32,0.58) 100%)" }}
      />
      <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-6 pb-14 pt-36 lg:px-10">
        <span className="ro-eyebrow" style={{ color: "#F2EADD" }}>{eyebrow}</span>
        <h1 className="mt-4 text-4xl leading-tight sm:text-6xl" style={{ fontFamily: "var(--ro-font-display)", color: "#FBF8F2", textShadow: "0 2px 26px rgba(0,0,0,0.25)" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-lg leading-relaxed" style={{ fontFamily: "var(--ro-font-sans)", color: "rgba(251,248,242,0.88)", fontWeight: 300 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
