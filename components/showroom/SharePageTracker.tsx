'use client';

import { useEffect, useCallback } from 'react';

interface SharePageTrackerProps {
  token: string;
  templateSlugs: string[];
}

export function SharePageTracker({ token, templateSlugs }: SharePageTrackerProps) {
  // Track page visit on mount
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'visit', token }),
    }).catch(() => {});
  }, [token]);

  // Track template clicks via event delegation
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/templates/')) return;

      // Extract slug from href: /templates/fashion/streetwear → fashion/streetwear
      const parts = href.replace('/templates/', '').split('/');
      const slug = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : parts[0];

      if (templateSlugs.includes(slug)) {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'click', token, template_slug: slug }),
        }).catch(() => {});
      }
    },
    [token, templateSlugs]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [handleClick]);

  return null;
}
