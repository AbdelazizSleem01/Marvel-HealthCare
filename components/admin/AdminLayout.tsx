"use client";

import { ReactNode, useState } from "react";
import { signOut } from "next-auth/react";
import { RiDashboardLine, RiMailLine, RiBuildingLine, RiLogoutBoxLine, RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-bg-dark flex">
      {/* Sidebar */}
      <aside
        className={`glass-dark border-r border-border-dark flex flex-col shrink-0 transition-all duration-300 ease-in-out relative ${
          sidebarOpen ? "w-64 p-6" : "w-20 p-4"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-4 p-2 rounded-lg bg-white/5 border border-border-dark text-muted-dark hover:text-text-dark hover:bg-white/10 transition-all z-50 ${
            sidebarOpen ? "right-4" : "left-1/2 -translate-x-1/2"
          }`}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <RiMenuFoldLine size={18} /> : <RiMenuUnfoldLine size={18} />}
        </button>
        <div className={`flex items-center gap-2 mb-8 mt-12 ${!sidebarOpen && "justify-center"}`}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shrink-0">
            <span className="text-white font-display font-bold text-sm">M</span>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <div className="font-display font-bold text-sm text-text-dark">Marvel Group</div>
              <div className="text-xs text-muted-dark">Admin Panel</div>
            </div>
          )}
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center rounded-xl text-sm font-medium transition-all ${
                sidebarOpen ? "justify-between px-4 py-2.5" : "justify-center px-2 py-2.5"
              } ${
                activeTab === item.id
                  ? "bg-primary-500/20 text-primary-400"
                  : "text-muted-dark hover:text-text-dark hover:bg-white/5"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <div className={`flex items-center ${sidebarOpen ? "gap-3" : ""}`}>
                <item.icon size={18} />
                {sidebarOpen && <span>{item.label}</span>}
              </div>
              {sidebarOpen && item.count !== null && item.count > 0 && (
                <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => signOut()}
          className={`flex items-center rounded-xl text-sm text-muted-dark hover:text-red-400 hover:bg-red-500/10 transition-all mt-4 ${
            sidebarOpen ? "gap-2 px-4 py-2.5" : "justify-center px-2 py-2.5"
          }`}
          title={!sidebarOpen ? "Sign Out" : undefined}
        >
          <RiLogoutBoxLine size={16} />
          {sidebarOpen && "Sign Out"}
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
