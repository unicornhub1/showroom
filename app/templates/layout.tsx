import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return new TextEncoder().encode(secret);
}

export default async function TemplatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determine back-link: if customer came via share link, go back there
  let backHref = "/";
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("share-session")?.value;
    if (session) {
      const { payload } = await jwtVerify(session, getJwtSecret());
      const urlToken = payload.urlToken as string | undefined;
      if (urlToken) {
        backHref = `/s/${urlToken}`;
      }
    }
  } catch {
    // No valid session or JWT error — fall back to "/"
  }

  return (
    <div
      style={{ colorScheme: "light" }}
      className="relative min-h-screen bg-white text-zinc-900"
    >
      {children}

      {/* Floating back button */}
      <Link
        href={backHref}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-lg backdrop-blur-sm transition-all hover:border-violet-300 hover:text-violet-600 hover:shadow-xl"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Zurück zum Showroom</span>
      </Link>
    </div>
  );
}
