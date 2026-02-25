'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Link as LinkIcon,
  Layout,
  Globe,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Links', href: '/admin/links', icon: LinkIcon },
  { label: 'Templates', href: '/admin/templates', icon: Layout },
  { label: 'Referenzen', href: '/admin/references', icon: Globe },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-admin-surface border-r border-admin-border flex flex-col z-50">
      {/* Branding */}
      <div className="px-6 py-6 border-b border-admin-border">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-wider text-admin-text">
            UNICORN FACTORY
          </span>
          <span className="text-[10px] font-semibold bg-admin-accent/20 text-admin-accent-soft px-2 py-0.5 rounded-full uppercase tracking-wide">
            Admin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-admin-accent/15 text-admin-accent-soft'
                  : 'text-admin-muted hover:text-admin-text hover:bg-admin-elevated'
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Showroom Link */}
      <div className="px-3 pb-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-admin-accent-soft hover:bg-admin-accent/15 transition-colors w-full"
        >
          <ExternalLink className="h-4.5 w-4.5 shrink-0" />
          Showroom öffnen
        </a>
      </div>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-admin-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-admin-muted hover:text-red-400 hover:bg-admin-elevated transition-colors w-full cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Abmelden
        </button>
      </div>
    </aside>
  );
}
