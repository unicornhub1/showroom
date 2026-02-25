"use client";

import Link from "next/link";
import Image from "next/image";

interface HeroBannerProps {
  gradient?: string;
  image?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  height?: string;
  kenBurns?: boolean;
}

const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #041E3C 0%, #0A3260 40%, #B8A070 100%)";

export function HeroBanner({
  gradient = DEFAULT_GRADIENT,
  image,
  title,
  subtitle,
  cta,
  height = "70vh",
  kenBurns = false,
}: HeroBannerProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      {/* Background image or gradient with optional ken-burns */}
      <div
        className={`absolute inset-0 ${kenBurns ? "el-ken-burns" : ""}`}
        style={{ background: gradient }}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.5) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative flex h-full items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          {/* Gold accent line */}
          <div
            className="mx-auto mb-8 h-px w-20"
            style={{ backgroundColor: "var(--el-gold)" }}
          />

          <h1
            className="text-4xl font-light leading-tight tracking-wide sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--el-font-serif)",
              color: "var(--el-offwhite)",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="mx-auto mt-6 max-w-xl text-base tracking-[0.08em] sm:text-lg"
              style={{
                fontFamily: "var(--el-font-sans)",
                color: "var(--el-light)",
                fontWeight: 300,
              }}
            >
              {subtitle}
            </p>
          )}

          {cta && (
            <Link
              href={cta.href}
              className="mt-10 inline-block px-10 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-400"
              style={{
                fontFamily: "var(--el-font-sans)",
                backgroundColor: "var(--el-navy)",
                color: "var(--el-cream)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--el-gold)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--el-offwhite)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.backgroundColor = "var(--el-navy)";
                e.currentTarget.style.color = "var(--el-cream)";
              }}
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
