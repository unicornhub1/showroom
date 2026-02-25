"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Luxury curtain-reveal page transition for Maison Élégance.
 *
 * On route change:
 * 1. Two navy panels slide in from left/right, meeting in the center
 * 2. A gold "É" monogramm appears with a subtle pulse
 * 3. A fine gold line sweeps horizontally through the monogram
 * 4. Panels slide apart revealing the new page
 */

export function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "closing" | "holding" | "opening">("idle");
  const prevPath = useRef(pathname);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    timeouts.current.push(setTimeout(fn, ms));
  };

  useEffect(() => {
    // Skip on initial mount
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    clearTimers();
    setPhase("closing");

    schedule(() => setPhase("holding"), 500);   // panels fully closed
    schedule(() => setPhase("opening"), 900);   // hold with monogram
    schedule(() => setPhase("idle"), 1400);      // panels fully open, cleanup

    return clearTimers;
  }, [pathname]);

  if (phase === "idle") return null;

  const closed = phase === "closing" || phase === "holding";
  const holding = phase === "holding";

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      {/* Left curtain panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "var(--el-navy)",
          transform: closed ? "translateX(0)" : phase === "opening" ? "translateX(-100%)" : "translateX(-100%)",
          transition:
            phase === "closing"
              ? "transform 0.5s cubic-bezier(0.7, 0, 0.3, 1)"
              : phase === "opening"
                ? "transform 0.5s cubic-bezier(0.7, 0, 0.3, 1)"
                : "none",
        }}
      >
        {/* Inner gold edge line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "1px",
            height: "100%",
            background: "linear-gradient(180deg, transparent 10%, var(--el-gold) 50%, transparent 90%)",
            opacity: closed ? 0.6 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Right curtain panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "var(--el-navy)",
          transform: closed ? "translateX(0)" : phase === "opening" ? "translateX(100%)" : "translateX(100%)",
          transition:
            phase === "closing"
              ? "transform 0.5s cubic-bezier(0.7, 0, 0.3, 1)"
              : phase === "opening"
                ? "transform 0.5s cubic-bezier(0.7, 0, 0.3, 1)"
                : "none",
        }}
      >
        {/* Inner gold edge line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1px",
            height: "100%",
            background: "linear-gradient(180deg, transparent 10%, var(--el-gold) 50%, transparent 90%)",
            opacity: closed ? 0.6 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Center monogram + sweep line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          opacity: holding ? 1 : 0,
          transition: holding ? "opacity 0.25s ease" : "opacity 0.2s ease",
          pointerEvents: "none",
        }}
      >
        {/* Gold monogram "É" */}
        <span
          style={{
            fontFamily: "var(--el-font-serif)",
            fontSize: "48px",
            fontWeight: 400,
            color: "var(--el-gold)",
            letterSpacing: "0.05em",
            animation: holding ? "el-monogram-pulse 1s ease-in-out infinite" : "none",
            textShadow: "0 0 30px rgba(184, 160, 112, 0.3)",
          }}
        >
          &Eacute;
        </span>

        {/* Horizontal sweep line */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--el-gold)",
            opacity: 0.5,
            animation: holding ? "el-line-sweep 0.8s ease-out forwards" : "none",
            transformOrigin: "center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
