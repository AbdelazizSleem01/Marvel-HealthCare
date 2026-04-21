"use client";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { RiDashboardLine, RiMailLine, RiProjectorLine, RiUserStarLine, RiLogoutBoxLine, RiRefreshLine } from "react-icons/ri";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "marvel2025";

type Lead = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  country?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  new: "bg-primary-500/20 text-primary-400 border-primary-500/40",
  contacted: "bg-amber-500/20 text-amber-400 border-amber-500/40",
  closed: "bg-secondary-500/20 text-secondary-400 border-secondary-500/40",
};

function AdminDashboard() {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";

  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const result = await signIn("credentials", {
      password,
      redirect: false,
    });
    if (result?.error) {
      setAuthError("Invalid password. Please try again.");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch {
      console.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchLeads();
  };

  useEffect(() => {
    if (authed) fetchLeads();
  }, [authed]);

  const inputCls = "w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all";

  if (!authed) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
        <div className="glass-dark rounded-3xl p-10 w-full max-w-md border border-border-dark">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-display font-bold text-xl">M</span>
            </div>
            <h1 className="font-display font-bold text-2xl text-text-dark">Admin Dashboard</h1>
            <p className="text-muted-dark text-sm mt-1">Marvel Group CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Password</label>
              <input
                type="password"
                className={inputCls}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {authError && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {authError}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "leads", label: "Leads", icon: RiMailLine, count: leads.filter((l) => l.status === "new").length },
    { id: "overview", label: "Overview", icon: RiDashboardLine, count: null },
  ];

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
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                ? "bg-primary-500/20 text-primary-400"
                : "text-muted-dark hover:text-text-dark hover:bg-white/5"
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {item.count !== null && item.count > 0 && (
                <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">{item.count}</span>
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
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === "overview" && (
          <div>
            <h2 className="font-display font-bold text-2xl text-text-dark mb-8">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { label: "Total Leads", value: leads.length, icon: RiMailLine, color: "from-primary-500 to-secondary-500" },
                { label: "New Leads", value: leads.filter((l) => l.status === "new").length, icon: RiMailLine, color: "from-blue-500 to-cyan-500" },
                { label: "Closed", value: leads.filter((l) => l.status === "closed").length, icon: RiUserStarLine, color: "from-secondary-500 to-teal-500" },
              ].map((stat) => (
                <div key={stat.label} className="glass-dark rounded-2xl p-6 border border-border-dark">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                  <div className="font-display font-bold text-3xl text-text-dark">{stat.value}</div>
                  <div className="text-sm text-muted-dark">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-2xl text-text-dark">Leads & Inquiries</h2>
              <button
                onClick={fetchLeads}
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
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusStyles[lead.status]}`}>
                            {lead.status}
                          </span>
                        </div>
                        <div className="text-sm text-muted-dark">{lead.email} {lead.company ? `· ${lead.company}` : ""} {lead.country ? `· ${lead.country}` : ""}</div>
                        {lead.service && <div className="text-xs text-primary-400 mt-1">Service: {lead.service}</div>}
                      </div>
                      <div className="text-xs text-muted-dark">{new Date(lead.createdAt).toLocaleDateString()}</div>
                    </div>

                    <p className="text-sm text-muted-dark bg-white/5 rounded-xl p-4 mb-4 leading-relaxed">{lead.message}</p>

                    <div className="flex flex-wrap gap-2">
                      {["new", "contacted", "closed"].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateLeadStatus(lead._id, s)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all capitalize ${lead.status === s
                            ? statusStyles[s]
                            : "border-border-dark text-muted-dark hover:border-primary-500/40"
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                      <button
                        onClick={() => deleteLead(lead._id)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all ml-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <SessionProvider>
      <AdminDashboard />
    </SessionProvider>
  );
}
