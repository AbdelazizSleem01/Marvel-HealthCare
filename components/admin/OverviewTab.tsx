"use client";

import { RiMailLine, RiUserStarLine, RiDashboardLine, RiBuildingLine } from "react-icons/ri";
import { Lead } from "./types";
import { Company } from "@/stores/adminStore";

interface OverviewTabProps {
  leads: Lead[];
  companies: Company[];
}

export function OverviewTab({ leads, companies }: OverviewTabProps) {
  const stats = [
    {
      label: "Total Leads",
      value: leads.length,
      icon: RiMailLine,
      color: "from-primary-500 to-secondary-500",
    },
    {
      label: "New Leads",
      value: leads.filter((l) => l.status === "new").length,
      icon: RiMailLine,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Closed",
      value: leads.filter((l) => l.status === "closed").length,
      icon: RiUserStarLine,
      color: "from-secondary-500 to-teal-500",
    },
    {
      label: "Companies",
      value: companies.length,
      icon: RiBuildingLine,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div>
      <h2 className="font-display font-bold text-2xl text-text-dark mb-8">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-dark rounded-2xl p-6 border border-border-dark">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
            >
              <stat.icon className="text-white" size={20} />
            </div>
            <div className="font-display font-bold text-3xl text-text-dark">{stat.value}</div>
            <div className="text-sm text-muted-dark">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
