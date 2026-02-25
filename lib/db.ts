import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { TEMPLATES } from '@/lib/templates';

export type ShareLink = {
  id: string;
  name: string;
  filters: {
    branches?: string[];
    types?: string[];
  };
  allowed_templates?: string[];
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
};

export type Reference = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  branch: string;
  type: string;
  is_visible: boolean;
};

// ── Singleton with globalThis for hot-reload survival ──────────────────────────

const globalForDb = globalThis as unknown as {
  __showroom_db?: Database.Database;
};

function getDb(): Database.Database {
  if (globalForDb.__showroom_db) {
    return globalForDb.__showroom_db;
  }

  // On Vercel the code directory is read-only — use /tmp instead
  const dbDir = process.env.VERCEL === '1'
    ? '/tmp'
    : path.join(process.cwd(), 'data');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, 'showroom.db');
  const db = new Database(dbPath);

  // Enable WAL mode and foreign keys
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS share_links (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      filters TEXT NOT NULL DEFAULT '{}',
      allowed_templates TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at TEXT,
      is_active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS references_ (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      thumbnail TEXT NOT NULL DEFAULT '',
      branch TEXT NOT NULL,
      type TEXT NOT NULL,
      is_visible INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS template_visibility (
      slug TEXT PRIMARY KEY,
      is_visible INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS link_visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      link_id TEXT NOT NULL REFERENCES share_links(id) ON DELETE CASCADE,
      visited_at TEXT NOT NULL DEFAULT (datetime('now')),
      user_agent TEXT,
      referrer TEXT
    );

    CREATE TABLE IF NOT EXISTS template_clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      link_id TEXT NOT NULL REFERENCES share_links(id) ON DELETE CASCADE,
      template_slug TEXT NOT NULL,
      clicked_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  globalForDb.__showroom_db = db;
  return db;
}

export const db = getDb();

// ── Share Link helpers ─────────────────────────────────────────────────────────

function rowToShareLink(row: Record<string, unknown>): ShareLink {
  return {
    id: row.id as string,
    name: row.name as string,
    filters: JSON.parse((row.filters as string) || '{}'),
    allowed_templates: row.allowed_templates
      ? JSON.parse(row.allowed_templates as string)
      : undefined,
    created_at: row.created_at as string,
    expires_at: (row.expires_at as string) || null,
    is_active: Boolean(row.is_active),
  };
}

export function getShareLink(id: string): ShareLink | null {
  const row = db
    .prepare('SELECT * FROM share_links WHERE id = ?')
    .get(id) as Record<string, unknown> | undefined;
  if (!row) return null;
  return rowToShareLink(row);
}

export function getAllShareLinks(): ShareLink[] {
  const rows = db
    .prepare('SELECT * FROM share_links ORDER BY created_at DESC')
    .all() as Record<string, unknown>[];
  return rows.map(rowToShareLink);
}

export function createShareLink(
  data: Omit<ShareLink, 'created_at'>
): ShareLink {
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO share_links (id, name, filters, allowed_templates, created_at, expires_at, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    data.id,
    data.name,
    JSON.stringify(data.filters || {}),
    data.allowed_templates ? JSON.stringify(data.allowed_templates) : null,
    now,
    data.expires_at || null,
    data.is_active ? 1 : 0
  );
  return getShareLink(data.id)!;
}

export function updateShareLink(
  id: string,
  data: Partial<ShareLink>
): void {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.name !== undefined) {
    fields.push('name = ?');
    values.push(data.name);
  }
  if (data.filters !== undefined) {
    fields.push('filters = ?');
    values.push(JSON.stringify(data.filters));
  }
  if (data.allowed_templates !== undefined) {
    fields.push('allowed_templates = ?');
    values.push(
      data.allowed_templates ? JSON.stringify(data.allowed_templates) : null
    );
  }
  if (data.expires_at !== undefined) {
    fields.push('expires_at = ?');
    values.push(data.expires_at);
  }
  if (data.is_active !== undefined) {
    fields.push('is_active = ?');
    values.push(data.is_active ? 1 : 0);
  }

  if (fields.length === 0) return;

  values.push(id);
  db.prepare(`UPDATE share_links SET ${fields.join(', ')} WHERE id = ?`).run(
    ...values
  );
}

export function deleteShareLink(id: string): void {
  db.prepare('DELETE FROM share_links WHERE id = ?').run(id);
}

// ── Reference helpers ──────────────────────────────────────────────────────────

function rowToReference(row: Record<string, unknown>): Reference {
  return {
    id: row.id as number,
    title: row.title as string,
    url: row.url as string,
    thumbnail: row.thumbnail as string,
    branch: row.branch as string,
    type: row.type as string,
    is_visible: Boolean(row.is_visible),
  };
}

export function getAllReferences(): Reference[] {
  const rows = db
    .prepare('SELECT * FROM references_ ORDER BY id DESC')
    .all() as Record<string, unknown>[];
  return rows.map(rowToReference);
}

export function getVisibleReferences(
  branch?: string,
  type?: string
): Reference[] {
  let sql = 'SELECT * FROM references_ WHERE is_visible = 1';
  const params: unknown[] = [];

  if (branch) {
    sql += ' AND branch = ?';
    params.push(branch);
  }
  if (type) {
    sql += ' AND type = ?';
    params.push(type);
  }

  sql += ' ORDER BY id DESC';

  const rows = db.prepare(sql).all(...params) as Record<string, unknown>[];
  return rows.map(rowToReference);
}

export function createReference(data: Omit<Reference, 'id'>): Reference {
  const result = db
    .prepare(
      `INSERT INTO references_ (title, url, thumbnail, branch, type, is_visible)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(
      data.title,
      data.url,
      data.thumbnail || '',
      data.branch,
      data.type,
      data.is_visible ? 1 : 0
    );
  return {
    id: result.lastInsertRowid as number,
    ...data,
  };
}

export function updateReference(
  id: number,
  data: Partial<Reference>
): void {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.title !== undefined) {
    fields.push('title = ?');
    values.push(data.title);
  }
  if (data.url !== undefined) {
    fields.push('url = ?');
    values.push(data.url);
  }
  if (data.thumbnail !== undefined) {
    fields.push('thumbnail = ?');
    values.push(data.thumbnail);
  }
  if (data.branch !== undefined) {
    fields.push('branch = ?');
    values.push(data.branch);
  }
  if (data.type !== undefined) {
    fields.push('type = ?');
    values.push(data.type);
  }
  if (data.is_visible !== undefined) {
    fields.push('is_visible = ?');
    values.push(data.is_visible ? 1 : 0);
  }

  if (fields.length === 0) return;

  values.push(id);
  db.prepare(`UPDATE references_ SET ${fields.join(', ')} WHERE id = ?`).run(
    ...values
  );
}

export function deleteReference(id: number): void {
  db.prepare('DELETE FROM references_ WHERE id = ?').run(id);
}

// ── Template Visibility helpers ────────────────────────────────────────────────

export function getTemplateVisibility(slug: string): boolean {
  const row = db
    .prepare('SELECT is_visible FROM template_visibility WHERE slug = ?')
    .get(slug) as { is_visible: number } | undefined;
  // Default to visible if no entry exists
  if (!row) return true;
  return Boolean(row.is_visible);
}

export function setTemplateVisibility(
  slug: string,
  visible: boolean
): void {
  db.prepare(
    `INSERT INTO template_visibility (slug, is_visible) VALUES (?, ?)
     ON CONFLICT(slug) DO UPDATE SET is_visible = excluded.is_visible`
  ).run(slug, visible ? 1 : 0);
}

export function getAllTemplateVisibility(): Record<string, boolean> {
  const rows = db
    .prepare('SELECT slug, is_visible FROM template_visibility')
    .all() as { slug: string; is_visible: number }[];
  const result: Record<string, boolean> = {};
  for (const row of rows) {
    result[row.slug] = Boolean(row.is_visible);
  }
  return result;
}

// ── Share-Link Access Control ────────────────────────────────────────────────

export function getShareLinkAllowedSlugs(token: string): string[] | null {
  const link = getShareLink(token);
  if (!link || !link.is_active) return null;

  // Check expiry
  if (link.expires_at && new Date(link.expires_at) < new Date()) return null;

  if (link.allowed_templates && link.allowed_templates.length > 0) {
    return link.allowed_templates;
  }

  // Filter-based: resolve to slugs dynamically
  const filterBranches = link.filters.branches || [];
  const filterTypes = link.filters.types || [];

  if (filterBranches.length === 0 && filterTypes.length === 0) {
    return TEMPLATES.map((t) => t.slug);
  }

  return TEMPLATES.filter((t) => {
    const branchMatch =
      filterBranches.length === 0 || filterBranches.includes(t.branch);
    const typeMatch =
      filterTypes.length === 0 || filterTypes.includes(t.type);
    return branchMatch && typeMatch;
  }).map((t) => t.slug);
}

// ── Visit / Click Tracking ───────────────────────────────────────────────────

export type LinkStats = {
  view_count: number;
  last_viewed_at: string | null;
  template_clicks: { template_slug: string; click_count: number }[];
};

export function recordLinkVisit(
  linkId: string,
  userAgent?: string,
  referrer?: string
): void {
  db.prepare(
    'INSERT INTO link_visits (link_id, user_agent, referrer) VALUES (?, ?, ?)'
  ).run(linkId, userAgent || null, referrer || null);
}

export function recordTemplateClick(
  linkId: string,
  templateSlug: string
): void {
  db.prepare(
    'INSERT INTO template_clicks (link_id, template_slug) VALUES (?, ?)'
  ).run(linkId, templateSlug);
}

export function getLinkStats(linkId: string): LinkStats {
  const visitRow = db
    .prepare(
      `SELECT COUNT(*) as view_count, MAX(visited_at) as last_viewed_at
       FROM link_visits WHERE link_id = ?`
    )
    .get(linkId) as { view_count: number; last_viewed_at: string | null };

  const clickRows = db
    .prepare(
      `SELECT template_slug, COUNT(*) as click_count
       FROM template_clicks WHERE link_id = ?
       GROUP BY template_slug ORDER BY click_count DESC`
    )
    .all(linkId) as { template_slug: string; click_count: number }[];

  return {
    view_count: visitRow.view_count,
    last_viewed_at: visitRow.last_viewed_at,
    template_clicks: clickRows,
  };
}

export function getAllLinkStats(): Record<string, LinkStats> {
  const links = getAllShareLinks();
  const result: Record<string, LinkStats> = {};
  for (const link of links) {
    result[link.id] = getLinkStats(link.id);
  }
  return result;
}
