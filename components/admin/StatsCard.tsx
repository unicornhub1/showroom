'use client';

import type { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  loading?: boolean;
}

export default function StatsCard({ icon, label, value, loading }: StatsCardProps) {
  return (
    <div className="bg-white border border-showroom-border rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-showroom-accent/10 text-showroom-accent">
          {icon}
        </div>
        <span className="text-sm text-showroom-muted font-medium">{label}</span>
      </div>
      {loading ? (
        <div className="h-8 w-16 bg-showroom-bg rounded animate-pulse" />
      ) : (
        <p className="text-3xl font-bold text-showroom-text">{value}</p>
      )}
    </div>
  );
}
