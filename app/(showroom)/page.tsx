import { Suspense } from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import {
  getTemplatesByFilter,
  getAllBranches,
  getAllTypes,
  BRANCH_LABELS,
  TYPE_LABELS,
} from "@/lib/templates";
import { getAllTemplateVisibilityEC, getVisibleReferencesEC } from "@/lib/edge-store";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { Header } from "@/components/showroom/Header";
import { Footer } from "@/components/showroom/Footer";
import { HeroSection } from "@/components/showroom/HeroSection";
import { FilterBar } from "@/components/showroom/FilterBar";
import { TemplateCard } from "@/components/showroom/TemplateCard";
import { ReferenceCard } from "@/components/showroom/ReferenceCard";

interface PageProps {
  searchParams: Promise<{ branch?: string; type?: string }>;
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return new TextEncoder().encode(secret);
}

async function getAllowedSlugs(): Promise<string[] | null> {
  const cookieStore = await cookies();

  // Admin sees everything
  const adminToken = cookieStore.get(COOKIE_NAME)?.value;
  if (adminToken) {
    const payload = await verifyToken(adminToken);
    if (payload) return null; // null = no restriction
  }

  // Share-session: only allowed slugs
  const shareSession = cookieStore.get("share-session")?.value;
  if (shareSession) {
    try {
      const { payload } = await jwtVerify(shareSession, getJwtSecret());
      return payload.slugs as string[];
    } catch {
      return [];
    }
  }

  return [];
}

export default async function ShowroomPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const branch = params.branch || undefined;
  const type = params.type || undefined;

  const allowedSlugs = await getAllowedSlugs();
  const isAdmin = allowedSlugs === null;

  let allTemplates = getTemplatesByFilter(branch, type);
  const visibilityMap = await getAllTemplateVisibilityEC();
  let templates = allTemplates.filter((t) =>
    visibilityMap[t.slug] !== false
  );

  // Filter by allowed slugs (null = admin, show all)
  if (allowedSlugs !== null) {
    templates = templates.filter((t) => allowedSlugs.includes(t.slug));
  }

  const references = await getVisibleReferencesEC(branch, type);
  const branches = getAllBranches();
  const types = getAllTypes();

  return (
    <>
      <Header />
      {isAdmin && (
        <a
          href="/admin"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-showroom-text px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-showroom-text/80 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Admin
        </a>
      )}
      <main className="min-h-screen">
        <HeroSection />

        <Suspense>
          <FilterBar
            branches={branches}
            types={types}
            branchLabels={BRANCH_LABELS}
            typeLabels={TYPE_LABELS}
          />
        </Suspense>

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
                Keine Templates gefunden.
              </p>
              <p className="mt-2 text-sm text-showroom-muted/70">
                Versuchen Sie eine andere Filterkombination.
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
