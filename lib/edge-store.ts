/**
 * Persistent storage via Vercel Edge Config.
 * Used for references and template visibility — data that must survive
 * across Vercel Lambda instances.
 *
 * Reads  → @vercel/edge-config (fast, global)
 * Writes → Vercel REST API (via VERCEL_API_TOKEN + VERCEL_EDGE_CONFIG_ID)
 */

import { get } from '@vercel/edge-config';

export type Reference = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  branch: string;
  type: string;
  is_visible: boolean;
};

// ── Helpers ────────────────────────────────────────────────────────────────────

async function ecWrite(key: string, value: unknown): Promise<void> {
  const ecId = process.env.VERCEL_EDGE_CONFIG_ID;
  const apiToken = process.env.VERCEL_API_TOKEN;
  if (!ecId || !apiToken) throw new Error('VERCEL_EDGE_CONFIG_ID or VERCEL_API_TOKEN not set');

  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${ecId}/items`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ operation: 'upsert', key, value }],
      }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Edge Config write failed: ${res.status} ${text}`);
  }
}

// ── References ─────────────────────────────────────────────────────────────────

async function getRefs(): Promise<Reference[]> {
  try {
    const refs = await get<Reference[]>('references');
    return refs ?? [];
  } catch {
    return [];
  }
}

export async function getAllReferencesEC(): Promise<Reference[]> {
  return getRefs();
}

export async function getVisibleReferencesEC(
  branch?: string,
  type?: string
): Promise<Reference[]> {
  const refs = await getRefs();
  return refs.filter((r) => {
    if (!r.is_visible) return false;
    if (branch && r.branch !== branch) return false;
    if (type && r.type !== type) return false;
    return true;
  });
}

export async function createReferenceEC(
  data: Omit<Reference, 'id'>
): Promise<Reference> {
  const refs = await getRefs();
  const id = refs.length > 0 ? Math.max(...refs.map((r) => r.id)) + 1 : 1;
  const newRef: Reference = { id, ...data };
  await ecWrite('references', [...refs, newRef]);
  return newRef;
}

export async function updateReferenceEC(
  id: number,
  data: Partial<Reference>
): Promise<void> {
  const refs = await getRefs();
  const updated = refs.map((r) => (r.id === id ? { ...r, ...data } : r));
  await ecWrite('references', updated);
}

export async function deleteReferenceEC(id: number): Promise<void> {
  const refs = await getRefs();
  await ecWrite('references', refs.filter((r) => r.id !== id));
}

// ── Template Visibility ────────────────────────────────────────────────────────

async function getVisMap(): Promise<Record<string, boolean>> {
  try {
    const map = await get<Record<string, boolean>>('template_visibility');
    return map ?? {};
  } catch {
    return {};
  }
}

export async function getTemplateVisibilityEC(slug: string): Promise<boolean> {
  const map = await getVisMap();
  return map[slug] !== false; // default visible
}

export async function setTemplateVisibilityEC(
  slug: string,
  visible: boolean
): Promise<void> {
  const map = await getVisMap();
  map[slug] = visible;
  await ecWrite('template_visibility', map);
}

export async function getAllTemplateVisibilityEC(): Promise<
  Record<string, boolean>
> {
  return getVisMap();
}
