import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TemplatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{ colorScheme: "light" }}
      className="relative min-h-screen bg-white text-zinc-900"
    >
      {children}

      {/* Floating back button */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-lg backdrop-blur-sm transition-all hover:border-violet-300 hover:text-violet-600 hover:shadow-xl"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Zur&uuml;ck zum Showroom</span>
      </Link>
    </div>
  );
}
