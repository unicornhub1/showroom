import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-showroom-bg px-6">
      <div className="text-center">
        {/* Decorative accent */}
        <div className="mx-auto mb-8 h-px w-12 bg-showroom-accent" />

        {/* 404 number */}
        <p className="text-8xl font-bold tracking-tighter text-showroom-accent/20 md:text-9xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-2xl font-bold text-showroom-text md:text-3xl">
          Seite nicht gefunden
        </h1>

        {/* Description */}
        <p className="mt-4 text-showroom-muted">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>

        {/* Back link */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-showroom-border bg-showroom-surface px-6 py-3 text-sm font-medium text-showroom-text transition-all hover:border-showroom-accent/50 hover:text-showroom-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Zur&uuml;ck zum Showroom
        </Link>

        {/* Decorative accent */}
        <div className="mx-auto mt-8 h-px w-12 bg-showroom-accent" />
      </div>
    </div>
  );
}
