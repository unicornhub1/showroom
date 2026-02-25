import Link from "next/link";
import { jwtVerify } from "jose";
import { getShareLink } from "@/lib/db";
import { getAllTemplateVisibilityEC, getVisibleReferencesEC } from "@/lib/edge-store";
import { TEMPLATES } from "@/lib/templates";
import type { Template } from "@/lib/templates";
import { Header } from "@/components/showroom/Header";
import { Footer } from "@/components/showroom/Footer";
import { TemplateCard } from "@/components/showroom/TemplateCard";
import { ReferenceCard } from "@/components/showroom/ReferenceCard";
import { SharePageTracker } from "@/components/showroom/SharePageTracker";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ token: string }>;
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return new TextEncoder().encode(secret);
}

export default async function TokenShowroomPage({ params }: PageProps) {
  const { token } = await params;

  // Try JWT decode first (self-contained, no DB lookup needed)
  let resolvedSlugs: string[] | null = null;
  let linkName = '';
  let firstBranch: string | undefined;
  let firstType: string | undefined;

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    resolvedSlugs = payload.slugs as string[];
    linkName = (payload.name as string) || '';
  } catch {
    // Fallback: legacy DB lookup for old-style plain-ID tokens
    const shareLink = getShareLink(token);

    // Invalid or inactive link
    if (!shareLink || !shareLink.is_active) {
      return (
        <>
          <Header minimal />
          <main className="flex min-h-screen items-center justify-center px-6">
            <div className="text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-showroom-accent" />
              <h1 className="text-2xl font-bold text-showroom-text">
                Link ungültig
              </h1>
              <p className="mt-4 text-showroom-muted">
                Dieser Link ist ungültig oder abgelaufen.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-showroom-border bg-showroom-surface px-5 py-2.5 text-sm font-medium text-showroom-text transition-all hover:border-showroom-accent/50 hover:text-showroom-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Zum Showroom
              </Link>
            </div>
          </main>
          <Footer />
        </>
      );
    }

    // Check expiry
    if (shareLink.expires_at) {
      const expiresAt = new Date(shareLink.expires_at);
      if (expiresAt < new Date()) {
        return (
          <>
            <Header minimal />
            <main className="flex min-h-screen items-center justify-center px-6">
              <div className="text-center">
                <div className="mx-auto mb-6 h-px w-12 bg-showroom-accent" />
                <h1 className="text-2xl font-bold text-showroom-text">
                  Link abgelaufen
                </h1>
                <p className="mt-4 text-showroom-muted">
                  Dieser Link ist ungültig oder abgelaufen.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-showroom-border bg-showroom-surface px-5 py-2.5 text-sm font-medium text-showroom-text transition-all hover:border-showroom-accent/50 hover:text-showroom-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zum Showroom
                </Link>
              </div>
            </main>
            <Footer />
          </>
        );
      }
    }

    // Resolve slugs from shareLink
    if (shareLink.allowed_templates && shareLink.allowed_templates.length > 0) {
      resolvedSlugs = shareLink.allowed_templates;
    } else {
      const filterBranches = shareLink.filters.branches || [];
      const filterTypes = shareLink.filters.types || [];
      if (filterBranches.length === 0 && filterTypes.length === 0) {
        resolvedSlugs = TEMPLATES.map((t) => t.slug);
      } else {
        resolvedSlugs = TEMPLATES.filter((t) => {
          const bm = filterBranches.length === 0 || filterBranches.includes(t.branch);
          const tm = filterTypes.length === 0 || filterTypes.includes(t.type);
          return bm && tm;
        }).map((t) => t.slug);
      }
      firstBranch = shareLink.filters.branches?.[0];
      firstType = shareLink.filters.types?.[0];
    }

    linkName = shareLink.name;
  }

  // Filter templates by resolved slugs and visibility
  const visibilityMap = await getAllTemplateVisibilityEC();
  let templates: Template[] = TEMPLATES.filter((t) =>
    resolvedSlugs!.includes(t.slug)
  ).filter((t) => visibilityMap[t.slug] !== false);

  const allowedSlugs = templates.map((t) => t.slug);

  // Get matching references
  const references = await getVisibleReferencesEC(firstBranch, firstType);

  return (
    <>
      <Header minimal />
      <SharePageTracker token={token} templateSlugs={allowedSlugs} />
      <main className="min-h-screen">
        {/* Compact hero for token pages */}
        <section className="px-6 pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-in-up mx-auto mb-6 h-px w-12 bg-showroom-accent" />
            <h1 className="animate-fade-in-up-delay-1 text-3xl font-bold tracking-tight text-showroom-text md:text-5xl">
              Ausgewählte Templates
            </h1>
            {linkName && (
              <p className="animate-fade-in-up-delay-2 mt-4 text-showroom-muted">
                {linkName}
              </p>
            )}
          </div>
        </section>

        {/* Template Grid */}
        <section className="mx-auto max-w-7xl px-6 py-8">
          {templates.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template, index) => (
                <TemplateCard
                  key={template.slug}
                  template={template}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24">
              <p className="text-lg text-showroom-muted">
                Keine Templates verfügbar.
              </p>
            </div>
          )}
        </section>

        {/* References Section */}
        {references.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pt-8 pb-16">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-showroom-border/50" />
              <h2 className="text-sm font-semibold tracking-wider text-showroom-muted uppercase">
                Ausgewählte Referenzen
              </h2>
              <div className="h-px flex-1 bg-showroom-border/50" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {references.map((ref) => (
                <ReferenceCard key={ref.id} reference={ref} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
