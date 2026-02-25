export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #E2E5EF",
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <p
          className="text-sm"
          style={{ color: "#6B7294" }}
        >
          &copy; 2026 Unicorn Factory. Alle Rechte vorbehalten.
        </p>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#A6D30F" }} />
          <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "#6B7294" }}>
            Showroom
          </span>
        </div>
      </div>
    </footer>
  );
}
