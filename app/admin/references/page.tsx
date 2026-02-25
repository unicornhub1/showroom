'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import ReferenceForm from '@/components/admin/ReferenceForm';
import ReferenceList from '@/components/admin/ReferenceList';

type Reference = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  branch: string;
  type: string;
  is_visible: boolean;
};

export default function AdminReferencesPage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editRef, setEditRef] = useState<Reference | null>(null);

  const fetchReferences = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/references');
      if (res.ok) {
        const data = await res.json();
        setReferences(Array.isArray(data) ? data : []);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReferences();
  }, [fetchReferences]);

  function handleCreate() {
    setEditRef(null);
    setShowForm(true);
  }

  function handleEdit(ref: Reference) {
    setEditRef(ref);
    setShowForm(true);
  }

  function handleSave() {
    setShowForm(false);
    setEditRef(null);
    fetchReferences();
  }

  function handleCancel() {
    setShowForm(false);
    setEditRef(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-showroom-text">Referenzen verwalten</h1>
        {!showForm && (
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 bg-showroom-accent hover:bg-showroom-accent-hover text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Neue Referenz hinzufuegen
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <ReferenceForm
            onSave={handleSave}
            onCancel={handleCancel}
            editRef={editRef}
          />
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-showroom-border rounded-xl overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-showroom-bg" />
              <div className="p-4">
                <div className="h-4 w-32 bg-showroom-bg rounded mb-2" />
                <div className="h-3 w-48 bg-showroom-bg rounded mb-3" />
                <div className="h-3 w-24 bg-showroom-bg rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ReferenceList
          references={references}
          onEdit={handleEdit}
          onRefresh={fetchReferences}
        />
      )}
    </div>
  );
}
