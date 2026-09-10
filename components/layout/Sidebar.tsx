"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, HeartPulse, Search, X } from "lucide-react";
import { SIDEBAR_NAV } from "@/lib/data/sidebarNav";

const COLLAPSE_STORAGE_KEY = "hms.sidebar.collapsed";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");

  // Restore the user's last collapse preference after mount (avoids SSR/client mismatch).
  useEffect(() => {
    const stored = window.localStorage.getItem(COLLAPSE_STORAGE_KEY);
    // Reads a persisted user preference once on mount; not a state-sync loop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "1") setCollapsed(true);
    setMounted(true);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(COLLAPSE_STORAGE_KEY, next ? "1" : "0");
      return next;
    });
    // Collapsing hides the search box, so any in-progress filter no longer applies.
    setQuery("");
  };

  // Filter sections/items by the typed menu query. A section only shows if it still has matches.
  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SIDEBAR_NAV;
    return SIDEBAR_NAV.map((section) => ({
      ...section,
      items: section.items.filter((item) => item.label.toLowerCase().includes(q)),
    })).filter((section) => section.items.length > 0);
  }, [query]);

  const hasResults = filteredSections.length > 0;

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-[width] duration-200 ${
        collapsed ? "w-[68px]" : "w-64"
      } ${mounted ? "" : "invisible"}`}
    >
      {/* Logo / brand */}
      <div className="flex items-center gap-2 border-b border-slate-800 px-3 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white">
          <HeartPulse size={18} />
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Medonext Healthcare</p>
            <p className="truncate text-[10px] uppercase tracking-wide text-slate-500">Enterprise HMS v8.4</p>
          </div>
        )}
      </div>

      {/* Menu search */}
      {!collapsed && (
        <div className="px-3 pt-4">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Search Menu</p>
          <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-2.5 py-2 focus-within:border-emerald-600">
            <Search size={14} className="shrink-0 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules, e.g. billing…"
              className="w-full bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-600"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 text-slate-500 hover:text-slate-300"
                aria-label="Clear menu search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-5">
        {!hasResults && (
          <p className="px-3 text-xs text-slate-500">No menu items match &ldquo;{query}&rdquo;.</p>
        )}
        {filteredSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">{section.title}</p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-emerald-500 text-white font-medium"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      <Icon size={16} className="shrink-0" />
                      {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                      {!collapsed && item.badge && (
                        <span
                          className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                            isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-slate-800 p-2">
        <button
          type="button"
          onClick={toggleCollapsed}
          className="flex w-full items-center justify-center gap-2 rounded-md px-2.5 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          {collapsed ? <ChevronsRight size={16} /> : (
            <>
              <ChevronsLeft size={16} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
