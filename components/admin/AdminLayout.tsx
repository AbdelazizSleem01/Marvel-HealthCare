"use client";

import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { RiDashboardLine, RiMailLine, RiBuildingLine, RiLogoutBoxLine } from "react-icons/ri";

interface NavItem {
  id: string;
  label: string;
  icon: typeof RiDashboardLine;
  count: number | null;
}

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  navItems: NavItem[];
}

export function AdminLayout({ children, activeTab, onTabChange, navItems }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 glass-dark border-r border-border-dark p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">M</span>
          </div>
          <div>
            <div className="font-display font-bold text-sm text-text-dark">Marvel Group</div>
            <div className="text-xs text-muted-dark">Admin Panel</div>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-primary-500/20 text-primary-400"
                  : "text-muted-dark hover:text-text-dark hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {item.count !== null && item.count > 0 && (
                <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-muted-dark hover:text-red-400 hover:bg-red-500/10 transition-all mt-4"
        >
          <RiLogoutBoxLine size={16} />
          Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
