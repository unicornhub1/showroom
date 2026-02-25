import Link from "next/link";
import { LogIn } from "lucide-react";

export default function BlockedPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "#F8F9FC" }}
    >
      <div className="text-center">
        <div
          className="mx-auto mb-6 h-px w-12"
          style={{ background: "#2D61F0" }}
        />
        <h1
          className="text-2xl font-bold"
          style={{ color: "#020B60" }}
        >
          Zugang eingeschr&auml;nkt
        </h1>
        <p
          className="mt-4 text-sm"
          style={{ color: "#6B7294" }}
        >
          Bitte verwenden Sie einen g&uuml;ltigen Share-Link, um den Showroom zu besuchen.
        </p>
        <Link
          href="/admin/login"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:opacity-80"
          style={{ background: "#020B60", color: "#FFFFFF" }}
        >
          <LogIn className="h-4 w-4" />
          Admin Login
        </Link>
      </div>
    </div>
  );
}
