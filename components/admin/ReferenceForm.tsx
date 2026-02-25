'use client';

import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';

type Reference = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  branch: string;
  type: string;
  is_visible: boolean;
};

const BRANCHES = [
  { key: 'fashion', label: 'Fashion & Bekleidung' },
  { key: 'gastro', label: 'Gastronomie' },
  { key: 'sport', label: 'Sport & Fitness' },
  { key: 'hotel', label: 'Hotel & Tourismus' },
  { key: 'immobilien', label: 'Immobilien' },
  { key: 'gesundheit', label: 'Gesundheit' },
  { key: 'handwerk', label: 'Handwerk & Dienstleistung' },
];

const TYPES = [
  { key: 'shop', label: 'Online-Shop' },
  { key: 'website', label: 'Unternehmenswebsite' },
  { key: 'landing', label: 'Landing Page' },
  { key: 'feature', label: 'Feature / Tool' },
];

interface ReferenceFormProps {
  onSave: (ref?: Reference) => void;
  onCancel: () => void;
  editRef?: Reference | null;
}

export default function ReferenceForm({ onSave, onCancel, editRef }: ReferenceFormProps) {
  const [title, setTitle] = useState(editRef?.title || '');
  const [url, setUrl] = useState(editRef?.url || '');
  const [thumbnail, setThumbnail] = useState(editRef?.thumbnail || '');
  const [branch, setBranch] = useState(editRef?.branch || BRANCHES[0].key);
  const [type, setType] = useState(editRef?.type || TYPES[0].key);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = { title, url, thumbnail, branch, type };

    try {
      const endpoint = editRef
        ? `/api/admin/references/${editRef.id}`
        : '/api/admin/references';
      const method = editRef ? 'PATCH' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Fehler beim Speichern');
      }

      const saved = await res.json();
      onSave(editRef ? undefined : saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-showroom-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-showroom-text">
          {editRef ? 'Referenz bearbeiten' : 'Neue Referenz hinzufügen'}
        </h3>
        <button
          onClick={onCancel}
          className="text-showroom-muted hover:text-showroom-text transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="ref-title" className="block text-sm font-medium text-showroom-muted mb-1.5">
            Titel
          </label>
          <input
            id="ref-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. Fashion Store XY"
            className="w-full bg-showroom-bg border border-showroom-border text-showroom-text placeholder-showroom-muted/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-showroom-accent focus:border-transparent transition-all"
          />
        </div>

        {/* URL */}
        <div>
          <label htmlFor="ref-url" className="block text-sm font-medium text-showroom-muted mb-1.5">
            URL
          </label>
          <input
            id="ref-url"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full bg-showroom-bg border border-showroom-border text-showroom-text placeholder-showroom-muted/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-showroom-accent focus:border-transparent transition-all"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label htmlFor="ref-thumb" className="block text-sm font-medium text-showroom-muted mb-1.5">
            Thumbnail URL
          </label>
          <input
            id="ref-thumb"
            type="url"
            required
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://example.com/thumb.jpg"
            className="w-full bg-showroom-bg border border-showroom-border text-showroom-text placeholder-showroom-muted/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-showroom-accent focus:border-transparent transition-all"
          />
        </div>

        {/* Branch + Type row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ref-branch" className="block text-sm font-medium text-showroom-muted mb-1.5">
              Branche
            </label>
            <select
              id="ref-branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full bg-showroom-bg border border-showroom-border text-showroom-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-showroom-accent focus:border-transparent transition-all appearance-none"
            >
              {BRANCHES.map((b) => (
                <option key={b.key} value={b.key}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ref-type" className="block text-sm font-medium text-showroom-muted mb-1.5">
              Typ
            </label>
            <select
              id="ref-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-showroom-bg border border-showroom-border text-showroom-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-showroom-accent focus:border-transparent transition-all appearance-none"
            >
              {TYPES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-showroom-accent hover:bg-showroom-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg px-5 py-2.5 text-sm transition-colors cursor-pointer"
          >
            {saving ? 'Wird gespeichert...' : editRef ? 'Aktualisieren' : 'Hinzufuegen'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-showroom-bg hover:bg-showroom-border/50 text-showroom-muted font-medium rounded-lg px-5 py-2.5 text-sm transition-colors cursor-pointer"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
