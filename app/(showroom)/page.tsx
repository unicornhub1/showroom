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
import { getTemplateVisibility, getVisibleReferences } from "@/lib/db";
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

  let allTemplates = getTemplatesByFilter(branch, type);
  let templates = allTemplates.filter((t) => getTemplateVisibility(t.slug));

  // Filter by allowed slugs (null = admin, show all)
  if (allowedSlugs !== null) {
    templates = templates.filter((t) => allowedSlugs.includes(t.slug));
  }

  const references = getVisibleReferences(branch, type);
  const branches = getAllBranches();
  const types = getAllTypes();

  return (
    <>
      <Header />
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
