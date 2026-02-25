'use client';

import { useState } from 'react';
import { Copy, Check, Pencil, Trash2, ExternalLink, Eye, MousePointerClick } from 'lucide-react';

type TemplateClick = {
  template_slug: string;
  click_count: number;
};

type ShareLink = {
  id: string;
  name: string;
  filters: { branches?: string[]; types?: string[] };
  allowed_templates?: string[];
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  view_count?: number;
  last_viewed_at?: string | null;
  template_clicks?: TemplateClick[];
};

const BRANCH_LABELS: Record<string, string> = {
  fashion: 'Fashion',
  gastro: 'Gastro',
  sport: 'Sport',
  hotel: 'Hotel',
  immobilien: 'Immobilien',
  gesundheit: 'Gesundheit',
  handwerk: 'Handwerk',
};

const TYPE_LABELS: Record<string, string> = {
  shop: 'Shop',
  website: 'Website',
  landing: 'Landing',
  feature: 'Feature',
};

interface LinkListProps {
  links: ShareLink[];
  onEdit: (link: ShareLink) => void;
  onRefresh: () => void;
}

export default function LinkList({ links, onEdit, onRefresh }: LinkListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function copyLink(id: string) {
    const url = `${window.location.origin}/s/${id}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function toggleActive(link: ShareLink) {
    setTogglingId(link.id);
    try {
      await fetch(`/api/admin/links/${link.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !link.is_active }),
      });
      onRefresh();
    } finally {
      setTogglingId(null);
    }
  }

  async function deleteLink(id: string) {
    if (!confirm('Diesen Link wirklich loeschen?')) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/links/${id}`, { method: 'DELETE' });
      onRefresh();
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function formatDateTime(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function slugLabel(slug: string) {
    const parts = slug.split('/');
    const name = parts[parts.length - 1];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  if (links.length === 0) {
    return (
      <div className="bg-white border border-showroom-border rounded-xl p-8 text-center">
        <p className="text-showroom-muted">Noch keine Share-Links vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link) => {
        const totalClicks = (link.template_clicks || []).reduce(
          (sum, c) => sum + c.click_count,
          0
        );

        return (
          <div
            key={link.id}
            className="bg-white border border-showroom-border rounded-xl p-5"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-sm font-semibold text-showroom-text truncate">
                    {link.name}
                  </h3>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                      link.is_active
                        ? 'bg-[#A6D30F]/15 text-[#7BA000]'
                        : 'bg-showroom-bg text-showroom-muted'
                    }`}
                  >
                    {link.is_active ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {link.filters?.branches?.map((b) => (
                    <span
                      key={b}
                      className="text-[11px] bg-showroom-accent/10 text-showroom-accent px-2 py-0.5 rounded-md"
                    >
                      {BRANCH_LABELS[b] || b}
                    </span>
                  ))}
                  {link.filters?.types?.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] bg-showroom-bg text-showroom-muted px-2 py-0.5 rounded-md"
                    >
                      {TYPE_LABELS[t] || t}
                    </span>
                  ))}
                  {(!link.filters?.branches?.length && !link.filters?.types?.length) && (
                    <span className="text-[11px] text-showroom-muted">Alle Templates</span>
                  )}
                </div>

                {/* Analytics row */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs text-showroom-muted">
                    <Eye className="h-3.5 w-3.5" />
                    {link.view_count ?? 0} Aufrufe
                  </span>

                  {totalClicks > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-showroom-muted">
                      <MousePointerClick className="h-3.5 w-3.5" />
                      {totalClicks} Klicks
                    </span>
                  )}

                  {link.last_viewed_at && (
                    <span className="text-xs text-showroom-muted">
                      Zuletzt: {formatDateTime(link.last_viewed_at)}
                    </span>
                  )}
                </div>

                {/* Template click badges */}
                {link.template_clicks && link.template_clicks.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {link.template_clicks.map((tc) => (
                      <span
                        key={tc.template_slug}
                        className="text-[11px] bg-showroom-accent/10 text-showroom-accent px-2 py-0.5 rounded-md"
                      >
                        {slugLabel(tc.template_slug)} ({tc.click_count})
                      </span>
                    ))}
                  </div>
                )}

                {/* Dates */}
                <div className="flex items-center gap-4 text-xs text-showroom-muted">
                  <span>Erstellt: {formatDate(link.created_at)}</span>
                  <span>
                    Ablauf:{' '}
                    {link.expires_at ? formatDate(link.expires_at) : 'Kein Ablauf'}
                  </span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Toggle */}
                <button
                  onClick={() => toggleActive(link)}
                  disabled={togglingId === link.id}
                  title={link.is_active ? 'Deaktivieren' : 'Aktivieren'}
                  className={`relative w-10 h-5.5 rounded-full transition-colors cursor-pointer ${
                    link.is_active ? 'bg-[#A6D30F]' : 'bg-showroom-border'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition-transform shadow-sm ${
                      link.is_active ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>

                {/* Copy */}
                <button
                  onClick={() => copyLink(link.id)}
                  title="Link kopieren"
                  className="p-2 text-showroom-muted hover:text-showroom-text hover:bg-showroom-bg rounded-lg transition-colors cursor-pointer"
                >
                  {copiedId === link.id ? (
                    <Check className="h-4 w-4 text-[#A6D30F]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

                {/* Open */}
                <a
                  href={`/s/${link.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Link oeffnen"
                  className="p-2 text-showroom-muted hover:text-showroom-text hover:bg-showroom-bg rounded-lg transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>

                {/* Edit */}
                <button
                  onClick={() => onEdit(link)}
                  title="Bearbeiten"
                  className="p-2 text-showroom-muted hover:text-showroom-text hover:bg-showroom-bg rounded-lg transition-colors cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteLink(link.id)}
                  disabled={deletingId === link.id}
                  title="Loeschen"
                  className="p-2 text-showroom-muted hover:text-red-500 hover:bg-showroom-bg rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
