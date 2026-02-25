'use client';

import { useEffect, useState } from 'react';
import { Layout, Link as LinkIcon, Globe, GitBranch } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    templates: 0,
    links: 0,
    references: 0,
    branches: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [templatesRes, linksRes, referencesRes] = await Promise.all([
          fetch('/api/admin/templates'),
          fetch('/api/admin/links'),
          fetch('/api/admin/references'),
        ]);

        const templates = templatesRes.ok ? await templatesRes.json() : [];
        const links = linksRes.ok ? await linksRes.json() : [];
        const references = referencesRes.ok ? await referencesRes.json() : [];

        const activeTemplates = Array.isArray(templates)
          ? templates.filter((t: { is_visible?: boolean }) => t.is_visible !== false).length
          : 0;
        const activeLinks = Array.isArray(links)
          ? links.filter((l: { is_active?: boolean }) => l.is_active).length
          : 0;
        const refCount = Array.isArray(references) ? references.length : 0;
        const uniqueBranches = Array.isArray(templates)
          ? new Set(templates.map((t: { branch?: string }) => t.branch)).size
          : 0;

        setStats({
          templates: activeTemplates,
          links: activeLinks,
          references: refCount,
          branches: uniqueBranches,
        });
      } catch {
        // Stats will remain at 0
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-showroom-text mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<Layout className="h-5 w-5" />}
          label="Aktive Templates"
          value={stats.templates}
          loading={loading}
        />
        <StatsCard
          icon={<LinkIcon className="h-5 w-5" />}
          label="Aktive Links"
          value={stats.links}
          loading={loading}
        />
        <StatsCard
          icon={<Globe className="h-5 w-5" />}
          label="Referenzen"
          value={stats.references}
          loading={loading}
        />
        <StatsCard
          icon={<GitBranch className="h-5 w-5" />}
          label="Branchen"
          value={stats.branches}
          loading={loading}
        />
      </div>
    </div>
  );
}
