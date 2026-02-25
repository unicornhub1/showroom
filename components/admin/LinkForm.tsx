'use client';

import { useState, type FormEvent } from 'react';
import { X, Copy, Check, Layout } from 'lucide-react';
import { TEMPLATES, BRANCH_LABELS } from '@/lib/templates';

type ShareLink = {
  id: string;
  name: string;
  filters: { branches?: string[]; types?: string[] };
  allowed_templates?: string[];
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
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

interface LinkFormProps {
  onSave: () => void;
  onCancel: () => void;
  editLink?: ShareLink | null;
}

export default function LinkForm({ onSave, onCancel, editLink }: LinkFormProps) {
  const [name, setName] = useState(editLink?.name || '');
  const [mode, setMode] = useState<'filter' | 'pick'>(
    editLink?.allowed_templates && editLink.allowed_templates.length > 0 ? 'pick' : 'filter'
  );
  const [selectedBranches, setSelectedBranches] = useState<string[]>(
    editLink?.filters?.branches || []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    editLink?.filters?.types || []
  );
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(
    editLink?.allowed_templates || []
  );
  const [expiresAt, setExpiresAt] = useState(
    editLink?.expires_at ? editLink.expires_at.split('T')[0] : ''
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function toggleBranch(key: string) {
    setSelectedBranches((prev) =>
      prev.includes(key) ? prev.filter((b) => b !== key) : [...prev, key]
    );
  }

  function toggleType(key: string) {
    setSelectedTypes((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  }

  function toggleTemplate(slug: string) {
    setSelectedTemplates((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload: Record<string, unknown> = { name, expires_at: expiresAt || null };

    if (mode === 'pick') {
      payload.allowed_templates = selectedTemplates;
      payload.filters = {};
    } else {
      payload.allowed_templates = [];
      payload.filters = {
        ...(selectedBranches.length > 0 && { branches: selectedBranches }),
        ...(selectedTypes.length > 0 && { types: selectedTypes }),
      };
    }

    try {
      const url = editLink
        ? `/api/admin/links/${editLink.id}`
        : '/api/admin/links';
      const method = editLink ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Fehler beim Speichern');
      }

      if (!editLink) {
        const data = await res.json();
        const linkUrl = `${window.location.origin}/s/${data.urlToken}`;
        setCreatedLink(linkUrl);
      } else {
        onSave();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setSaving(false);
    }
  }

  async function copyLink() {
    if (!createdLink) return;
    await navigator.clipboard.writeText(createdLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Show success state after creation
  if (createdLink) {
    return (
      <div className="bg-white border border-showroom-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-showroom-text">Link erstellt</h3>
          <button
            onClick={() => {
              setCreatedLink(null);
              onSave();
            }}
            className="text-showroom-muted hover:text-showroom-text transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-showroom-muted mb-3">
          Der Share-Link wurde erfolgreich erstellt:
        </p>

        <div className="flex items-center gap-2">
          <code className="flex-1 bg-showroom-bg border border-showroom-border rounded-lg px-4 py-2.5 text-sm text-showroom-accent break-all">
            {createdLink}
          </code>
          <button
            onClick={copyLink}
            className="shrink-0 bg-showroom-accent hover:bg-showroom-accent-hover text-white rounded-lg px-3 py-2.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <button
          onClick={() => {
            setCreatedLink(null);
            onSave();
          }}
          className="mt-4 text-sm text-showroom-muted hover:text-showroom-text transition-colors cursor-pointer"
        >
          Fertig
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-showroom-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-showroom-text">
          {editLink ? 'Link bearbeiten' : 'Neuen Link erstellen'}
        </h3>
        <button
          onClick={onCancel}
          className="text-showroom-muted hover:text-showroom-text transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="link-name" className="block text-sm font-medium text-showroom-muted mb-1.5">
            Name (internes Label)
          </label>
          <input
            id="link-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Kunde XY Praesentation"
            className="w-full bg-showroom-bg border border-showroom-border text-showroom-text placeholder-showroom-muted/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-showroom-accent focus:border-transparent transition-all"
          />
        </div>

        {/* Mode toggle */}
        <div>
          <label className="block text-sm font-medium text-showroom-muted mb-2">
            Template-Auswahl
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('filter')}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                mode === 'filter'
                  ? 'bg-showroom-accent/10 border-showroom-accent/40 text-showroom-accent'
                  : 'bg-showroom-bg border-showroom-border text-showroom-muted hover:border-showroom-muted/30'
              }`}
            >
              Nach Branche/Typ filtern
            </button>
            <button
              type="button"
              onClick={() => setMode('pick')}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                mode === 'pick'
                  ? 'bg-showroom-accent/10 border-showroom-accent/40 text-showroom-accent'
                  : 'bg-showroom-bg border-showroom-border text-showroom-muted hover:border-showroom-muted/30'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Layout className="h-4 w-4" />
                Bestimmte Templates
              </span>
            </button>
          </div>
        </div>

        {mode === 'filter' ? (
          <>
            {/* Branches */}
            <div>
              <label className="block text-sm font-medium text-showroom-muted mb-2">
                Branchen
              </label>
              <div className="flex flex-wrap gap-2">
                {BRANCHES.map((branch) => (
                  <label
                    key={branch.key}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                      selectedBranches.includes(branch.key)
                        ? 'bg-showroom-accent/10 border-showroom-accent/40 text-showroom-accent'
                        : 'bg-showroom-bg border-showroom-border text-showroom-muted hover:border-showroom-muted/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedBranches.includes(branch.key)}
                      onChange={() => toggleBranch(branch.key)}
                      className="sr-only"
                    />
                    {branch.label}
                  </label>
                ))}
              </div>
              {selectedBranches.length === 0 && (
                <p className="text-xs text-showroom-muted mt-1">Keine Auswahl = alle Branchen</p>
              )}
            </div>

            {/* Types */}
            <div>
              <label className="block text-sm font-medium text-showroom-muted mb-2">
                Typen
              </label>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((type) => (
                  <label
                    key={type.key}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                      selectedTypes.includes(type.key)
                        ? 'bg-showroom-accent/10 border-showroom-accent/40 text-showroom-accent'
                        : 'bg-showroom-bg border-showroom-border text-showroom-muted hover:border-showroom-muted/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.key)}
                      onChange={() => toggleType(type.key)}
                      className="sr-only"
                    />
                    {type.label}
                  </label>
                ))}
              </div>
              {selectedTypes.length === 0 && (
                <p className="text-xs text-showroom-muted mt-1">Keine Auswahl = alle Typen</p>
              )}
            </div>
          </>
        ) : (
          /* Template Picker */
          <div>
            <label className="block text-sm font-medium text-showroom-muted mb-2">
              Templates auswählen
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TEMPLATES.map((t) => (
                <label
                  key={t.slug}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                    selectedTemplates.includes(t.slug)
                      ? 'bg-showroom-accent/10 border-showroom-accent/40'
                      : 'bg-showroom-bg border-showroom-border hover:border-showroom-muted/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTemplates.includes(t.slug)}
                    onChange={() => toggleTemplate(t.slug)}
                    className="sr-only"
                  />
                  {t.thumbnail && (
                    <img
                      src={t.thumbnail}
                      alt=""
                      className="h-10 w-14 shrink-0 rounded object-cover object-top"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate ${
                      selectedTemplates.includes(t.slug) ? 'text-showroom-accent' : 'text-showroom-text'
                    }`}>
                      {t.name}
                    </p>
                    <p className="text-xs text-showroom-muted truncate">
                      {BRANCH_LABELS[t.branch] || t.branch}
                    </p>
                  </div>
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                    selectedTemplates.includes(t.slug)
                      ? 'bg-showroom-accent border-showroom-accent'
                      : 'border-showroom-border'
                  }`}>
                    {selectedTemplates.includes(t.slug) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                </label>
              ))}
            </div>
            {selectedTemplates.length === 0 && (
              <p className="text-xs text-showroom-muted mt-2">Mindestens ein Template auswählen</p>
            )}
            {selectedTemplates.length > 0 && (
              <p className="text-xs text-showroom-accent/70 mt-2">
                {selectedTemplates.length} Template{selectedTemplates.length !== 1 ? 's' : ''} ausgewählt
              </p>
            )}
          </div>
        )}

        {/* Expiry Date */}
        <div>
          <label htmlFor="link-expires" className="block text-sm font-medium text-showroom-muted mb-1.5">
            Ablaufdatum (optional)
          </label>
          <input
            id="link-expires"
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full bg-showroom-bg border border-showroom-border text-showroom-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-showroom-accent focus:border-transparent transition-all"
          />
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
            disabled={saving || (mode === 'pick' && selectedTemplates.length === 0)}
            className="bg-showroom-accent hover:bg-showroom-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg px-5 py-2.5 text-sm transition-colors cursor-pointer"
          >
            {saving ? 'Wird gespeichert...' : editLink ? 'Aktualisieren' : 'Erstellen'}
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
