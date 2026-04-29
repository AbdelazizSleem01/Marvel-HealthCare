"use client";

import { RiRefreshLine, RiBuildingLine, RiEyeLine, RiStarLine, RiAddLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { Company } from "@/stores/adminStore";

interface CompaniesTabProps {
  companies: Company[];
  isLoading: boolean;
  onRefresh: () => void;
  onAdd: () => void;
  onEdit: (company: Company) => void;
  onDelete: (id: string, name: string) => void;
}

export function CompaniesTab({ companies, isLoading, onRefresh, onAdd, onEdit, onDelete }: CompaniesTabProps) {
  const stats = [
    { label: "Total Companies", value: companies.length, icon: RiBuildingLine, color: "from-primary-500 to-secondary-500" },
    { label: "Active", value: companies.filter((c) => c.isActive).length, icon: RiEyeLine, color: "from-green-500 to-emerald-500" },
    { label: "Main Company", value: companies.filter((c) => c.isMain).length, icon: RiStarLine, color: "from-amber-500 to-orange-500" },
    { label: "Orbit Companies", value: companies.filter((c) => !c.isMain).length, icon: RiBuildingLine, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-text-dark">Marvel Group Companies</h2>
          <p className="text-sm text-muted-dark mt-1">Manage Marvel Group and Orbit companies</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-dark border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-all"
          >
            <RiRefreshLine size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all"
          >
            <RiAddLine size={18} />
            Add Company
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-dark rounded-2xl p-5 border border-border-dark">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="text-white" size={20} />
            </div>
            <div className="font-display font-bold text-2xl text-text-dark">{stat.value}</div>
            <div className="text-sm text-muted-dark">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Companies List */}
      {isLoading ? (
        <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
          <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
          Loading companies...
        </div>
      ) : companies.length === 0 ? (
        <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
          <RiBuildingLine size={48} className="mx-auto mb-4 opacity-30" />
          <p>No companies yet. Add your first company to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {companies.map((company) => (
            <div
              key={company._id}
              className="glass-dark rounded-2xl p-5 border border-border-dark hover:border-primary-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-14 h-14 rounded-xl object-cover bg-white"
                  />
                ) : (
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-xl`}
                  >
                    {company.icon || company.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-text-dark truncate">{company.name}</h3>
                    {company.isMain && (
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                        Main
                      </span>
                    )}
                    {!company.isActive && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-dark truncate">{company.tagline}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-dark">
                    <span>
                      {company.country} ({company.flag})
                    </span>
                    <span>·</span>
                    <span>Est. {company.year}</span>
                    <span>·</span>
                    <span>{company.focusAreas?.length || 0} Focus Areas</span>
                    <span>·</span>
                    <span>{company.gallery?.length || 0} Gallery</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(company)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-primary-400 transition-all"
                    title="Edit"
                  >
                    <RiEditLine size={18} />
                  </button>
                  <button
                    onClick={() => company._id && onDelete(company._id, company.name)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-red-400 transition-all"
                    title="Delete"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
