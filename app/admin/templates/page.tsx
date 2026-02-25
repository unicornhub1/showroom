'use client';

import { useEffect, useState, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const BRANCH_LABELS: Record<string, string> = {
  fashion: 'Fashion & Bekleidung',
  beauty: 'Beauty & Kosmetik',
  sport: 'Sport & Fitness',
  gastro: 'Gastronomie',
};

const TYPE_LABELS: Record<string, string> = {
  shop: 'Online-Shop',
  website: 'Unternehmenswebsite',
  landing: 'Landing Page',
  feature: 'Feature / Tool',
};

interface TemplateEntry {
  slug: string;
  name: string;
  branch: string;
  type: string;
  is_visible: boolean;
}

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<TemplateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/templates');
      if (res.ok) {
        const data = await res.json();
        setTemplates(Array.isArray(data) ? data : []);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  async function toggleVisibility(slug: string, currentVisibility: boolean) {
    setTogglingSlug(slug);
    try {
      const res = await fetch('/api/admin/templates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, is_visible: !currentVisibility }),
      });
      if (res.ok) {
        setTemplates((prev) =>
          prev.map((t) =>
            t.slug === slug ? { ...t, is_visible: !currentVisibility } : t
          )
        );
      }
    } finally {
      setTogglingSlug(null);
    }
  }

  const grouped = templates.reduce<Record<string, TemplateEntry[]>>((acc, t) => {
    if (!acc[t.branch]) acc[t.branch] = [];
    acc[t.branch].push(t);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-showroom-text">Template-Sichtbarkeit</h1>
        <p className="text-sm text-showroom-muted mt-1">
          Steuern Sie, welche Templates im Showroom angezeigt werden.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="h-5 w-40 bg-showroom-border rounded mb-3 animate-pulse" />
              <div className="space-y-2">
                {[1, 2].map((j) => (
                  <div
                    key={j}
                    className="bg-white border border-showroom-border rounded-xl p-4 animate-pulse"
                  >
                    <div className="h-4 w-48 bg-showroom-bg rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([branch, branchTemplates]) => (
            <div key={branch}>
              <h2 className="text-sm font-semibold text-showroom-muted uppercase tracking-wider mb-3">
                {BRANCH_LABELS[branch] || branch}
              </h2>
              <div className="space-y-2">
                {branchTemplates.map((template) => (
                  <div
                    key={template.slug}
                    className="bg-white border border-showroom-border rounded-xl px-5 py-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm font-medium text-showroom-text">
                        {template.name}
                      </span>
                      <span className="text-[11px] bg-showroom-accent/10 text-showroom-accent px-2 py-0.5 rounded-md shrink-0">
                        {BRANCH_LABELS[template.branch] || template.branch}
                      </span>
                      <span className="text-[11px] bg-showroom-bg text-showroom-muted px-2 py-0.5 rounded-md shrink-0">
                        {TYPE_LABELS[template.type] || template.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs">
                        {template.is_visible ? (
                          <span className="flex items-center gap-1 text-[#A6D30F]">
                            <Eye className="h-3.5 w-3.5" />
                            Sichtbar
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-showroom-muted">
                            <EyeOff className="h-3.5 w-3.5" />
                            Versteckt
                          </span>
                        )}
                      </span>

                      <button
                        onClick={() =>
                          toggleVisibility(template.slug, template.is_visible)
                        }
                        disabled={togglingSlug === template.slug}
                        className={`relative w-10 h-5.5 rounded-full transition-colors cursor-pointer ${
                          template.is_visible ? 'bg-[#A6D30F]' : 'bg-showroom-border'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition-transform shadow-sm ${
                            template.is_visible ? 'left-[22px]' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
