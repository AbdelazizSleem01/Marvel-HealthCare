"use client";

import { RiRefreshLine, RiDeleteBinLine } from "react-icons/ri";
import { Lead, statusStyles } from "./types";

interface LeadsTabProps {
  leads: Lead[];
  loading: boolean;
  onRefresh: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export function LeadsTab({ leads, loading, onRefresh, onUpdateStatus, onDelete }: LeadsTabProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display font-bold text-2xl text-text-dark">Leads & Inquiries</h2>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-dark border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-all"
        >
          <RiRefreshLine size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {leads.length === 0 ? (
        <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
          {loading ? "Loading leads..." : "No leads yet. They will appear here when someone submits the contact form."}
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div key={lead._id} className="glass-dark rounded-2xl p-6 border border-border-dark">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-text-dark">{lead.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${statusStyles[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-dark">
                    {lead.email} {lead.company ? `· ${lead.company}` : ""}{" "}
                    {lead.country ? `· ${lead.country}` : ""}
                  </div>
                  {lead.service && (
                    <div className="text-xs text-primary-400 mt-1">Service: {lead.service}</div>
                  )}
                </div>
                <div className="text-xs text-muted-dark">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </div>
              </div>

              <p className="text-sm text-muted-dark bg-white/5 rounded-xl p-4 mb-4 leading-relaxed">
                {lead.message}
              </p>

              <div className="flex flex-wrap gap-2">
                {["new", "contacted", "closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => onUpdateStatus(lead._id, s)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all capitalize ${
                      lead.status === s
                        ? statusStyles[s]
                        : "border-border-dark text-muted-dark hover:border-primary-500/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => onDelete(lead._id)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all ml-auto"
                >
                  <RiDeleteBinLine size={14} className="inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
