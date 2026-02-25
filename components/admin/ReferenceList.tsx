'use client';

import { useState } from 'react';
import { Pencil, Trash2, ExternalLink, ImageOff } from 'lucide-react';

type Reference = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  branch: string;
  type: string;
  is_visible: boolean;
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

interface ReferenceListProps {
  references: Reference[];
  onEdit: (ref: Reference) => void;
  onRefresh: () => void;
}

export default function ReferenceList({ references, onEdit, onRefresh }: ReferenceListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  async function toggleVisibility(ref: Reference) {
    setTogglingId(ref.id);
    try {
      await fetch(`/api/admin/references/${ref.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_visible: !ref.is_visible }),
      });
      onRefresh();
    } finally {
      setTogglingId(null);
    }
  }

  async function deleteReference(id: number) {
    if (!confirm('Diese Referenz wirklich löschen?')) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/references/${id}`, { method: 'DELETE' });
      onRefresh();
    } finally {
      setDeletingId(null);
    }
  }

  if (references.length === 0) {
    return (
      <div className="bg-white border border-showroom-border rounded-xl p-8 text-center">
        <p className="text-showroom-muted">Noch keine Referenzen vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {references.map((ref) => (
        <div
          key={ref.id}
          className="bg-white border border-showroom-border rounded-xl overflow-hidden"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video bg-showroom-bg">
            {ref.thumbnail && !brokenImages.has(ref.id) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ref.thumbnail}
                alt={ref.title}
                className="w-full h-full object-cover"
                onError={() =>
                  setBrokenImages((prev) => new Set(prev).add(ref.id))
                }
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-showroom-border">
                <ImageOff className="h-8 w-8" />
              </div>
            )}

            {/* Visibility badge */}
            <span
              className={`absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                ref.is_visible
                  ? 'bg-[#A6D30F]/80 text-white'
                  : 'bg-white/80 text-showroom-muted'
              }`}
            >
              {ref.is_visible ? 'Sichtbar' : 'Versteckt'}
            </span>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-showroom-text mb-1 truncate">
              {ref.title}
            </h3>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-showroom-accent hover:text-showroom-accent-hover inline-flex items-center gap-1 truncate max-w-full mb-3"
            >
              {ref.url}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>

            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[11px] bg-showroom-accent/10 text-showroom-accent px-2 py-0.5 rounded-md">
                {BRANCH_LABELS[ref.branch] || ref.branch}
              </span>
              <span className="text-[11px] bg-showroom-bg text-showroom-muted px-2 py-0.5 rounded-md">
                {TYPE_LABELS[ref.type] || ref.type}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-showroom-border">
              {/* Toggle */}
              <button
                onClick={() => toggleVisibility(ref)}
                disabled={togglingId === ref.id}
                className={`relative w-10 h-5.5 rounded-full transition-colors cursor-pointer ${
                  ref.is_visible ? 'bg-[#A6D30F]' : 'bg-showroom-border'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition-transform shadow-sm ${
                    ref.is_visible ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>

              <div className="flex-1" />

              {/* Edit */}
              <button
                onClick={() => onEdit(ref)}
                title="Bearbeiten"
                className="p-2 text-showroom-muted hover:text-showroom-text hover:bg-showroom-bg rounded-lg transition-colors cursor-pointer"
              >
                <Pencil className="h-4 w-4" />
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteReference(ref.id)}
                disabled={deletingId === ref.id}
                title="Loeschen"
                className="p-2 text-showroom-muted hover:text-red-500 hover:bg-showroom-bg rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
