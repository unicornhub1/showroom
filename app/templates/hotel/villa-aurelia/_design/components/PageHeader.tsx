import Media from "./Media";

/* Unterseiten-Header — editorial & hochwertig: großes Hintergrundbild mit
   Vignette, zentrierte Komposition, flankierte Gold-Overline und große
   Playfair-Headline mit feiner Gold-Linie. */
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
    <section className="va-vignette relative overflow-hidden" style={{ minHeight: "62vh" }}>
      <Media
        src={image}
        alt={title}
        gradient={gradient}
        className="va-kenburns absolute inset-0 h-full w-full"
        sizes="100vw"
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,38,32,0.42) 0%, rgba(28,38,32,0.30) 45%, rgba(28,38,32,0.70) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-4xl flex-col items-center justify-center px-6 py-40 text-center lg:px-10">
        <span className="va-eyebrow va-eyebrow--center" style={{ color: "#EEE9E1" }}>
          {eyebrow}
        </span>
        <h1
          className="mt-7 text-5xl leading-[1.04] sm:text-6xl lg:text-7xl"
          style={{
            fontFamily: "var(--va-font-display)",
            color: "#FAF8F4",
            letterSpacing: "0.01em",
            textShadow: "0 2px 34px rgba(0,0,0,0.32)",
          }}
        >
          {title}
        </h1>
        <div
          className="mt-8 h-px w-20"
          style={{ background: "linear-gradient(90deg, transparent, var(--va-gold), transparent)" }}
        />
        {subtitle && (
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed"
            style={{
              fontFamily: "var(--va-font-sans)",
              color: "rgba(250,248,244,0.9)",
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
