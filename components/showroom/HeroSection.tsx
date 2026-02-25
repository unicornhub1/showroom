export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-12 md:pt-44 md:pb-20">
      {/* Subtle glow behind heading */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(45,97,240,0.06) 0%, rgba(166,211,15,0.03) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl text-center">
        {/* Subtitle */}
        <p
          className="animate-fade-in-up relative mb-5 text-[11px] font-semibold tracking-[0.4em] uppercase"
          style={{ color: "#2D61F0" }}
        >
          Template Showroom
        </p>

        {/* Main heading */}
        <h1
          className="animate-fade-in-up-delay-1 relative text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          style={{
            color: "#020B60",
            lineHeight: 1.05,
          }}
        >
          <span className="block">Unsere</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #2D61F0 0%, #A6D30F 60%, #FFA2E1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Templates
          </span>
        </h1>

        {/* Description */}
        <p
          className="animate-fade-in-up-delay-2 relative mx-auto mt-7 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: "#6B7294" }}
        >
          Handgefertigte Website-Templates und Designs.
          <br className="hidden md:block" />
          Klicken Sie auf ein Template, um einzutauchen.
        </p>

        {/* Decorative line */}
        <div className="animate-fade-in-up-delay-3 relative mx-auto mt-10 flex items-center justify-center gap-3">
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(45,97,240,0.3))" }} />
          <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: "#A6D30F" }} />
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, rgba(45,97,240,0.3), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
