import Link from "next/link";

interface HeaderProps {
  minimal?: boolean;
}

export function Header({ minimal = false }: HeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50"
      style={{
        background: "rgba(248, 249, 252, 0.75)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: "1px solid rgba(2, 11, 96, 0.06)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-70"
        >
          <span
            className="text-lg font-bold tracking-[0.15em]"
            style={{ color: "#020B60" }}
          >
            UNICORN FACTORY
          </span>
        </Link>

        {/* Right side */}
        {!minimal && (
          <div className="flex items-center gap-4">
            <span
              className="rounded-full px-5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{
                background: "#020B60",
                color: "#A6D30F",
              }}
            >
              Showroom
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
