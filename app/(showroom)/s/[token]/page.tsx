import Link from "next/link";
import { getShareLink, getTemplateVisibility, getVisibleReferences } from "@/lib/db";
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

export default async function TokenShowroomPage({ params }: PageProps) {
  const { token } = await params;
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
              Link ung&uuml;ltig
            </h1>
            <p className="mt-4 text-showroom-muted">
              Dieser Link ist ung&uuml;ltig oder abgelaufen.
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
                Dieser Link ist ung&uuml;ltig oder abgelaufen.
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

  // Determine which templates to show
  let templates: Template[];

  if (shareLink.allowed_templates && shareLink.allowed_templates.length > 0) {
    // Show only specifically allowed templates
    templates = TEMPLATES.filter((t) =>
      shareLink.allowed_templates!.includes(t.slug)
    );
  } else {
    // Filter by branch/type from the share link
    const filterBranches = shareLink.filters.branches || [];
    const filterTypes = shareLink.filters.types || [];

    if (filterBranches.length === 0 && filterTypes.length === 0) {
      templates = [...TEMPLATES];
    } else {
      templates = TEMPLATES.filter((t) => {
        const branchMatch =
          filterBranches.length === 0 || filterBranches.includes(t.branch);
        const typeMatch =
          filterTypes.length === 0 || filterTypes.includes(t.type);
        return branchMatch && typeMatch;
      });
    }
  }

  // Filter by visibility
  templates = templates.filter((t) => getTemplateVisibility(t.slug));

  const allowedSlugs = templates.map((t) => t.slug);

  // Get matching references
  const firstBranch = shareLink.filters.branches?.[0];
  const firstType = shareLink.filters.types?.[0];
  const references = getVisibleReferences(firstBranch, firstType);

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
              Ausgew&auml;hlte Templates
            </h1>
            {shareLink.name && (
              <p className="animate-fade-in-up-delay-2 mt-4 text-showroom-muted">
                {shareLink.name}
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
                Keine Templates verf&uuml;gbar.
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
                Ausgew&auml;hlte Referenzen
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
