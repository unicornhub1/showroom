'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import LinkForm from '@/components/admin/LinkForm';
import LinkList from '@/components/admin/LinkList';

type ShareLink = {
  id: string;
  name: string;
  filters: { branches?: string[]; types?: string[] };
  allowed_templates?: string[];
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  urlToken?: string;
};

export default function AdminLinksPage() {
  const [links, setLinks] = useState<ShareLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editLink, setEditLink] = useState<ShareLink | null>(null);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/links');
      if (res.ok) {
        const data = await res.json();
        setLinks(Array.isArray(data) ? data : []);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  function handleCreate() {
    setEditLink(null);
    setShowForm(true);
  }

  function handleEdit(link: ShareLink) {
    setEditLink(link);
    setShowForm(true);
  }

  function handleSave(saved: ShareLink) {
    setShowForm(false);
    if (editLink) {
      // Update existing link in place
      setLinks((prev) => prev.map((l) => l.id === saved.id ? saved : l));
    } else {
      // Prepend newly created link
      setLinks((prev) => [saved, ...prev]);
    }
    setEditLink(null);
  }

  function handleUpdate(updated: ShareLink) {
    setLinks((prev) => prev.map((l) => l.id === updated.id ? updated : l));
  }

  function handleDelete(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function handleCancel() {
    setShowForm(false);
    setEditLink(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-showroom-text">Share-Links verwalten</h1>
        {!showForm && (
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 bg-showroom-accent hover:bg-showroom-accent-hover text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Neuen Link erstellen
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <LinkForm
            onSave={handleSave}
            onCancel={handleCancel}
            editLink={editLink}
          />
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-showroom-border rounded-xl p-5 animate-pulse"
            >
              <div className="h-4 w-48 bg-showroom-bg rounded mb-3" />
              <div className="h-3 w-32 bg-showroom-bg rounded mb-2" />
              <div className="h-3 w-24 bg-showroom-bg rounded" />
            </div>
          ))}
        </div>
      ) : (
        <LinkList links={links} onEdit={handleEdit} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </div>
  );
}
