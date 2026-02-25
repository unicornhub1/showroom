export default function ShowroomLoading() {
  return (
    <div className="min-h-screen bg-showroom-bg">
      {/* Header skeleton */}
      <div className="fixed top-0 right-0 left-0 z-50 border-b border-showroom-border/50 bg-showroom-bg/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="h-5 w-40 rounded bg-showroom-card animate-skeleton-pulse" />
          <div className="h-8 w-24 rounded-full bg-showroom-card animate-skeleton-pulse" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="flex flex-col items-center px-6 pt-36 pb-12">
        <div className="mx-auto mb-8 h-px w-16 bg-showroom-card animate-skeleton-pulse" />
        <div className="h-12 w-80 rounded bg-showroom-card animate-skeleton-pulse" />
        <div className="mt-6 h-6 w-96 max-w-full rounded bg-showroom-card animate-skeleton-pulse" />
      </div>

      {/* Filter skeleton */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-8 w-16 rounded-full bg-showroom-card animate-skeleton-pulse" />
            <div className="h-8 w-24 rounded-full bg-showroom-card animate-skeleton-pulse" />
            <div className="h-8 w-32 rounded-full bg-showroom-card animate-skeleton-pulse" />
            <div className="h-8 w-28 rounded-full bg-showroom-card animate-skeleton-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 rounded-full bg-showroom-card animate-skeleton-pulse" />
            <div className="h-8 w-28 rounded-full bg-showroom-card animate-skeleton-pulse" />
            <div className="h-8 w-36 rounded-full bg-showroom-card animate-skeleton-pulse" />
          </div>
        </div>
      </div>

      {/* Template grid skeleton */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-showroom-border/50 bg-showroom-card">
      {/* Thumbnail area */}
      <div className="aspect-[16/10] w-full bg-showroom-surface animate-skeleton-pulse" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full bg-showroom-surface animate-skeleton-pulse" />
          <div className="h-5 w-16 rounded-full bg-showroom-surface animate-skeleton-pulse" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 rounded bg-showroom-surface animate-skeleton-pulse" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-showroom-surface animate-skeleton-pulse" />
          <div className="h-4 w-2/3 rounded bg-showroom-surface animate-skeleton-pulse" />
        </div>

        {/* CTA */}
        <div className="h-5 w-32 rounded bg-showroom-surface animate-skeleton-pulse" />
      </div>
    </div>
  );
}
