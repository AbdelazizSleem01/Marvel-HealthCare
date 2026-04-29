"use client";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { RiDashboardLine, RiMailLine, RiProjectorLine, RiUserStarLine, RiLogoutBoxLine, RiRefreshLine, RiBuildingLine, RiAddLine, RiEditLine, RiDeleteBinLine, RiImageLine, RiEyeLine, RiStarLine, RiCloseLine, RiSearchLine, RiPhoneLine, RiCalendarLine, RiTimeLine, RiUserLine, RiFilterLine, RiSortAsc, RiDownloadLine, RiUploadLine, RiShareLine, RiLinksLine, RiExternalLinkLine, RiSubtractLine, RiErrorWarningLine, RiInformationLine, RiQuestionLine, RiFireLine, RiLeafLine, RiCloudLine, RiRainyLine, RiSnowyLine, RiWindyLine, RiFoggyLine, RiHazeLine, RiDrizzleLine, RiShowersLine, RiFileTextLine, RiArticleLine, RiBookLine, RiBriefcaseLine, RiCalendarCheckLine, RiChat1Line, RiCheckLine, RiCheckboxCircleLine, RiCustomerServiceLine, RiDatabaseLine, RiDeviceLine, RiDiscussLine, RiFlagLine, RiFlashlightLine, RiFoldersLine, RiGalleryLine, RiGlobalLine, RiGovernmentLine, RiHandHeartLine, RiHealthBookLine, RiHeartLine, RiHomeLine, RiHospitalLine, RiInfinityLine, RiInputMethodLine, RiLightbulbLine, RiMapPinLine, RiMapPinUserLine, RiPulseLine, RiRestaurantLine, RiRocketLine, RiSafeLine, RiServerLine, RiServiceLine, RiSettings3Line, RiShieldLine, RiShoppingBagLine, RiShoppingCartLine, RiSuitcaseLine, RiTimerLine, RiTrophyLine, RiTruckLine, RiUser2Line, RiUser3Line, RiUserAddLine, RiUserCommunityLine, RiUserFollowLine, RiUserHeartLine, RiUserLocationLine, RiUserReceivedLine, RiUserSearchLine, RiUserSettingsLine, RiUserSharedLine, RiUserSmileLine, RiVideoLine, RiVipCrownLine, RiWalletLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useAdminStore, Company, FocusArea, GalleryImage } from "@/stores/adminStore";

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
    if (authed) {
      fetchLeads();
      fetchCompanies();
    }
  }, [authed]);

  // Company Form State
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [companyForm, setCompanyForm] = useState<Partial<Company>>({
    name: "",
    slug: "",
    tagline: "",
    year: "",
    country: "",
    flag: "",
    description: "",
    color: "from-primary-500 to-secondary-400",
    icon: "",
    logo: "",
    isMain: false,
    isActive: true,
    focusAreas: [],
    gallery: [],
    order: 0,
  });

  const resetCompanyForm = () => {
    setCompanyForm({
      name: "",
      slug: "",
      tagline: "",
      year: "",
      country: "",
      flag: "",
      description: "",
      color: "from-primary-500 to-secondary-400",
      icon: "",
      logo: "",
      isMain: false,
      isActive: true,
      focusAreas: [],
      gallery: [],
      order: 0,
    });
    setEditingCompany(null);
  };

  const handleCreateCompany = async () => {
    try {
      await createCompany(companyForm as Omit<Company, "_id">);
      Swal.fire({
        icon: "success",
        title: "Created!",
        text: "Company has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowCompanyForm(false);
      resetCompanyForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message || "Failed to create company",
      });
    }
  };

  const handleUpdateCompany = async () => {
    if (!editingCompany?._id) return;
    try {
      await editCompany(editingCompany._id, companyForm);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Company has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      setShowCompanyForm(false);
      resetCompanyForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message || "Failed to update company",
      });
    }
  };

  const handleDeleteCompany = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${name}"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await removeCompany(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Company has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: (error as Error).message || "Failed to delete company",
        });
      }
    }
  };

  const openEditCompany = (company: Company) => {
    setEditingCompany(company);
    setCompanyForm({ ...company });
    setShowCompanyForm(true);
  };

  const addFocusArea = () => {
    setCompanyForm(prev => ({
      ...prev,
      focusAreas: [...(prev.focusAreas || []), { icon: "", label: "", description: "" }]
    }));
  };

  const updateFocusArea = (index: number, field: keyof FocusArea, value: string) => {
    const updated = [...(companyForm.focusAreas || [])];
    updated[index] = { ...updated[index], [field]: value };
    setCompanyForm(prev => ({ ...prev, focusAreas: updated }));
  };

  const removeFocusArea = (index: number) => {
    const updated = (companyForm.focusAreas || []).filter((_, i) => i !== index);
    setCompanyForm(prev => ({ ...prev, focusAreas: updated }));
  };

  const addGalleryImage = () => {
    setCompanyForm(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), { src: "", title: "", category: "" }]
    }));
  };

  const updateGalleryImage = (index: number, field: keyof GalleryImage, value: string) => {
    const updated = [...(companyForm.gallery || [])];
    updated[index] = { ...updated[index], [field]: value };
    setCompanyForm(prev => ({ ...prev, gallery: updated }));
  };

  const removeGalleryImage = (index: number) => {
    const updated = (companyForm.gallery || []).filter((_, i) => i !== index);
    setCompanyForm(prev => ({ ...prev, gallery: updated }));
  };

  // Icon Picker State & Functions
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedFocusAreaIndex, setSelectedFocusAreaIndex] = useState<number | null>(null);
  const [iconSearch, setIconSearch] = useState("");

  // Icon Components Map - All verified existing icons
  const iconComponents: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    RiFileTextLine: RiFileTextLine,
    RiArticleLine: RiArticleLine,
    RiBookLine: RiBookLine,
    RiImageLine: RiImageLine,
    RiGalleryLine: RiGalleryLine,
    RiVideoLine: RiVideoLine,
    RiGlobalLine: RiGlobalLine,
    RiUserSettingsLine: RiUserSettingsLine,
    RiStarLine: RiStarLine,
    RiTrophyLine: RiTrophyLine,
    RiVipCrownLine: RiVipCrownLine,
    RiHeartLine: RiHeartLine,
    RiPulseLine: RiPulseLine,
    RiHealthBookLine: RiHealthBookLine,
    RiHandHeartLine: RiHandHeartLine,
    RiCheckLine: RiCheckLine,
    RiCheckboxCircleLine: RiCheckboxCircleLine,
    RiBriefcaseLine: RiBriefcaseLine,
    RiSuitcaseLine: RiSuitcaseLine,
    RiBuildingLine: RiBuildingLine,
    RiHospitalLine: RiHospitalLine,
    RiHomeLine: RiHomeLine,
    RiEyeLine: RiEyeLine,
    RiChat1Line: RiChat1Line,
    RiDiscussLine: RiDiscussLine,
    RiCustomerServiceLine: RiCustomerServiceLine,
    RiMailLine: RiMailLine,
    RiPhoneLine: RiPhoneLine,
    RiMapPinLine: RiMapPinLine,
    RiMapPinUserLine: RiMapPinUserLine,
    RiCalendarLine: RiCalendarLine,
    RiCalendarCheckLine: RiCalendarCheckLine,
    RiTimerLine: RiTimerLine,
    RiTimeLine: RiTimeLine,
    RiSettings3Line: RiSettings3Line,
    RiDashboardLine: RiDashboardLine,
    RiUserLine: RiUserLine,
    RiUser2Line: RiUser2Line,
    RiUser3Line: RiUser3Line,
    RiUserAddLine: RiUserAddLine,
    RiUserFollowLine: RiUserFollowLine,
    RiUserHeartLine: RiUserHeartLine,
    RiUserLocationLine: RiUserLocationLine,
    RiUserSearchLine: RiUserSearchLine,
    RiUserSmileLine: RiUserSmileLine,
    RiUserCommunityLine: RiUserCommunityLine,
    RiSearchLine: RiSearchLine,
    RiFilterLine: RiFilterLine,
    RiSortAsc: RiSortAsc,
    RiDownloadLine: RiDownloadLine,
    RiUploadLine: RiUploadLine,
    RiShareLine: RiShareLine,
    RiLinksLine: RiLinksLine,
    RiExternalLinkLine: RiExternalLinkLine,
    RiAddLine: RiAddLine,
    RiSubtractLine: RiSubtractLine,
    RiCloseLine: RiCloseLine,
    RiErrorWarningLine: RiErrorWarningLine,
    RiInformationLine: RiInformationLine,
    RiQuestionLine: RiQuestionLine,
    RiLightbulbLine: RiLightbulbLine,
    RiFlashlightLine: RiFlashlightLine,
    RiFireLine: RiFireLine,
    RiRocketLine: RiRocketLine,
    RiLeafLine: RiLeafLine,
    RiCloudLine: RiCloudLine,
    RiRainyLine: RiRainyLine,
    RiSnowyLine: RiSnowyLine,
    RiWindyLine: RiWindyLine,
    RiFoggyLine: RiFoggyLine,
    RiHazeLine: RiHazeLine,
    RiDrizzleLine: RiDrizzleLine,
    RiShowersLine: RiShowersLine,
    RiDatabaseLine: RiDatabaseLine,
    RiServerLine: RiServerLine,
    RiDeviceLine: RiDeviceLine,
    RiFlagLine: RiFlagLine,
    RiFoldersLine: RiFoldersLine,
    RiGovernmentLine: RiGovernmentLine,
    RiInfinityLine: RiInfinityLine,
    RiInputMethodLine: RiInputMethodLine,
    RiRestaurantLine: RiRestaurantLine,
    RiSafeLine: RiSafeLine,
    RiServiceLine: RiServiceLine,
    RiShieldLine: RiShieldLine,
    RiShoppingBagLine: RiShoppingBagLine,
    RiShoppingCartLine: RiShoppingCartLine,
    RiTruckLine: RiTruckLine,
    RiUserReceivedLine: RiUserReceivedLine,
    RiUserSharedLine: RiUserSharedLine,
    RiWalletLine: RiWalletLine,
  };

  // Available Icons List (Ri icons) - All verified existing
  const availableIcons = [
    { name: "RiFileTextLine", category: "Document" },
    { name: "RiArticleLine", category: "Document" },
    { name: "RiBookLine", category: "Education" },
    { name: "RiImageLine", category: "Media" },
    { name: "RiGalleryLine", category: "Media" },
    { name: "RiVideoLine", category: "Media" },
    { name: "RiGlobalLine", category: "World" },
    { name: "RiUserSettingsLine", category: "User" },
    { name: "RiStarLine", category: "Star" },
    { name: "RiTrophyLine", category: "Award" },
    { name: "RiVipCrownLine", category: "VIP" },
    { name: "RiHeartLine", category: "Health" },
    { name: "RiPulseLine", category: "Health" },
    { name: "RiHealthBookLine", category: "Health" },
    { name: "RiHandHeartLine", category: "Health" },
    { name: "RiCheckLine", category: "Check" },
    { name: "RiCheckboxCircleLine", category: "Check" },
    { name: "RiBriefcaseLine", category: "Business" },
    { name: "RiSuitcaseLine", category: "Business" },
    { name: "RiBuildingLine", category: "Building" },
    { name: "RiHospitalLine", category: "Hospital" },
    { name: "RiHomeLine", category: "Home" },
    { name: "RiEyeLine", category: "Vision" },
    { name: "RiChat1Line", category: "Chat" },
    { name: "RiDiscussLine", category: "Chat" },
    { name: "RiCustomerServiceLine", category: "Support" },
    { name: "RiMailLine", category: "Email" },
    { name: "RiPhoneLine", category: "Phone" },
    { name: "RiMapPinLine", category: "Location" },
    { name: "RiMapPinUserLine", category: "Location" },
    { name: "RiCalendarLine", category: "Calendar" },
    { name: "RiCalendarCheckLine", category: "Calendar" },
    { name: "RiTimerLine", category: "Time" },
    { name: "RiTimeLine", category: "Time" },
    { name: "RiSettings3Line", category: "Settings" },
    { name: "RiDashboardLine", category: "Dashboard" },
    { name: "RiUserLine", category: "User" },
    { name: "RiUser2Line", category: "User" },
    { name: "RiUser3Line", category: "User" },
    { name: "RiUserAddLine", category: "User" },
    { name: "RiUserFollowLine", category: "User" },
    { name: "RiUserHeartLine", category: "User" },
    { name: "RiUserLocationLine", category: "User" },
    { name: "RiUserSearchLine", category: "User" },
    { name: "RiUserSettingsLine", category: "User" },
    { name: "RiUserSmileLine", category: "User" },
    { name: "RiUserCommunityLine", category: "Group" },
    { name: "RiSearchLine", category: "Search" },
    { name: "RiFilterLine", category: "Filter" },
    { name: "RiSortAsc", category: "Sort" },
    { name: "RiDownloadLine", category: "Download" },
    { name: "RiUploadLine", category: "Upload" },
    { name: "RiShareLine", category: "Share" },
    { name: "RiLinksLine", category: "Link" },
    { name: "RiExternalLinkLine", category: "External" },
    { name: "RiAddLine", category: "Add" },
    { name: "RiSubtractLine", category: "Minus" },
    { name: "RiCloseLine", category: "Close" },
    { name: "RiErrorWarningLine", category: "Warning" },
    { name: "RiInformationLine", category: "Info" },
    { name: "RiQuestionLine", category: "Question" },
    { name: "RiLightbulbLine", category: "Idea" },
    { name: "RiFlashlightLine", category: "Flash" },
    { name: "RiFireLine", category: "Fire" },
    { name: "RiRocketLine", category: "Rocket" },
    { name: "RiLeafLine", category: "Nature" },
    { name: "RiCloudLine", category: "Cloud" },
    { name: "RiRainyLine", category: "Rain" },
    { name: "RiSnowyLine", category: "Snow" },
    { name: "RiWindyLine", category: "Wind" },
    { name: "RiFoggyLine", category: "Fog" },
    { name: "RiHazeLine", category: "Haze" },
    { name: "RiDrizzleLine", category: "Rain" },
    { name: "RiShowersLine", category: "Rain" },
    { name: "RiDatabaseLine", category: "Database" },
    { name: "RiServerLine", category: "Server" },
    { name: "RiDeviceLine", category: "Device" },
    { name: "RiFlagLine", category: "Flag" },
    { name: "RiFoldersLine", category: "Folders" },
    { name: "RiGovernmentLine", category: "Government" },
    { name: "RiInfinityLine", category: "Infinity" },
    { name: "RiInputMethodLine", category: "Input" },
    { name: "RiRestaurantLine", category: "Restaurant" },
    { name: "RiSafeLine", category: "Safe" },
    { name: "RiServiceLine", category: "Service" },
    { name: "RiShieldLine", category: "Shield" },
    { name: "RiShoppingBagLine", category: "Shopping" },
    { name: "RiShoppingCartLine", category: "Shopping" },
    { name: "RiTruckLine", category: "Truck" },
    { name: "RiUserReceivedLine", category: "User" },
    { name: "RiUserSharedLine", category: "User" },
    { name: "RiWalletLine", category: "Wallet" },
  ];

  const openIconPicker = (index: number) => {
    setSelectedFocusAreaIndex(index);
    setShowIconPicker(true);
    setIconSearch("");
  };

  const selectIcon = (iconName: string) => {
    if (selectedFocusAreaIndex !== null) {
      updateFocusArea(selectedFocusAreaIndex, 'icon', iconName);
    }
    setShowIconPicker(false);
    setSelectedFocusAreaIndex(null);
    setIconSearch("");
  };

  const filteredIcons = iconSearch
    ? availableIcons.filter(
        (icon) =>
          icon.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
          icon.category.toLowerCase().includes(iconSearch.toLowerCase())
      )
    : availableIcons;

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

  const { 
    companies, 
    isLoading, 
    fetchCompanies, 
    createCompany, 
    editCompany, 
    removeCompany,
    setSelectedCompany,
    selectedCompany 
  } = useAdminStore();

  const navItems = [
    { id: "leads", label: "Leads", icon: RiMailLine, count: leads.filter((l) => l.status === "new").length },
    { id: "companies", label: "Companies", icon: RiBuildingLine, count: companies.length },
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

        {activeTab === "companies" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-bold text-2xl text-text-dark">Marvel Group Companies</h2>
                <p className="text-sm text-muted-dark mt-1">Manage Marvel Group and Orbit companies</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchCompanies}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-dark border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-all"
                >
                  <RiRefreshLine size={16} className={isLoading ? "animate-spin" : ""} />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    resetCompanyForm();
                    setShowCompanyForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all"
                >
                  <RiAddLine size={18} />
                  Add Company
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Companies", value: companies.length, icon: RiBuildingLine, color: "from-primary-500 to-secondary-500" },
                { label: "Active", value: companies.filter(c => c.isActive).length, icon: RiEyeLine, color: "from-green-500 to-emerald-500" },
                { label: "Main Company", value: companies.filter(c => c.isMain).length, icon: RiStarLine, color: "from-amber-500 to-orange-500" },
                { label: "Orbit Companies", value: companies.filter(c => !c.isMain).length, icon: RiBuildingLine, color: "from-purple-500 to-pink-500" },
              ].map((stat) => (
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
                  <div key={company._id} className="glass-dark rounded-2xl p-5 border border-border-dark hover:border-primary-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} className="w-14 h-14 rounded-xl object-cover bg-white" />
                      ) : (
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-bold text-xl`}>
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
                          <span>{company.country} ({company.flag})</span>
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
                          onClick={() => openEditCompany(company)}
                          className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-primary-400 transition-all"
                          title="Edit"
                        >
                          <RiEditLine size={18} />
                        </button>
                        <button
                          onClick={() => company._id && handleDeleteCompany(company._id, company.name)}
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

            {/* Company Form Modal */}
            {showCompanyForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="glass-dark rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-auto border border-border-dark">
                  <div className="sticky top-0 glass-dark border-b border-border-dark p-6 flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl text-text-dark">
                      {editingCompany ? "Edit Company" : "Add New Company"}
                    </h3>
                    <button
                      onClick={() => setShowCompanyForm(false)}
                      className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
                    >
                      <RiCloseLine size={24} />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Company Name *</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={companyForm.name}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Marvel Group"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Slug * (unique identifier)</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={companyForm.slug}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                          placeholder="e.g., marvel-group"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Tagline *</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={companyForm.tagline}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, tagline: e.target.value }))}
                          placeholder="e.g., Where Medicine Meets Mastery"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Year Established *</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={companyForm.year}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, year: e.target.value }))}
                          placeholder="e.g., 2013"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Country *</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={companyForm.country}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, country: e.target.value }))}
                          placeholder="e.g., Egypt"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Country Flag Code *</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={companyForm.flag}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, flag: e.target.value.toUpperCase() }))}
                          placeholder="e.g., EG, AE, SA"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Description *</label>
                      <textarea
                        className={`${inputCls} min-h-[100px] resize-none`}
                        value={companyForm.description}
                        onChange={(e) => setCompanyForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Company description..."
                      />
                    </div>

                    {/* Color & Logo */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Gradient Color</label>
                        <select
                          className={inputCls}
                          value={companyForm.color}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, color: e.target.value }))}
                        >
                          <option value="from-primary-500 to-secondary-400">Primary → Secondary</option>
                          <option value="from-primary-500 to-primary-600">Primary Dark</option>
                          <option value="from-secondary-400 to-secondary-600">Secondary</option>
                          <option value="from-blue-500 to-cyan-500">Blue → Cyan</option>
                          <option value="from-purple-500 to-pink-500">Purple → Pink</option>
                          <option value="from-green-500 to-emerald-500">Green → Emerald</option>
                          <option value="from-amber-500 to-orange-500">Amber → Orange</option>
                          <option value="from-red-500 to-rose-500">Red → Rose</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Logo URL</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={companyForm.logo}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, logo: e.target.value }))}
                          placeholder="/images/logo.png"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Icon (emoji or text)</label>
                        <input
                          type="text"
                          className={inputCls}
                          value={companyForm.icon}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, icon: e.target.value }))}
                          placeholder="✦ or M"
                        />
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={companyForm.isMain}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, isMain: e.target.checked }))}
                          className="w-4 h-4 rounded border-border-dark bg-white/5 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-sm text-text-dark">Main Company (Marvel Group)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={companyForm.isActive}
                          onChange={(e) => setCompanyForm(prev => ({ ...prev, isActive: e.target.checked }))}
                          className="w-4 h-4 rounded border-border-dark bg-white/5 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-sm text-text-dark">Active</span>
                      </label>
                    </div>

                    {/* Focus Areas */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs text-muted-dark uppercase tracking-wider">Focus Areas</label>
                        <button
                          onClick={addFocusArea}
                          className="text-xs flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-all"
                        >
                          <RiAddLine size={14} /> Add Focus Area
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(companyForm.focusAreas || []).map((area, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-border-dark">
                            <div className="grid grid-cols-[auto_1fr_1fr] gap-2 flex-1">
                              {/* Icon Picker Button */}
                              <button
                                onClick={() => openIconPicker(index)}
                                className="w-12 h-12 rounded-xl bg-white/10 border border-border-dark hover:border-primary-500/50 flex items-center justify-center transition-all"
                                title="Click to select icon"
                              >
                                {area.icon && iconComponents[area.icon] ? (
                                  (() => {
                                    const IconComp = iconComponents[area.icon];
                                    return <IconComp size={22} className="text-primary-400" />;
                                  })()
                                ) : (
                                  <RiImageLine size={20} className="text-muted-dark" />
                                )}
                              </button>
                              <input
                                type="text"
                                className={inputCls}
                                placeholder="Icon name (e.g., RiFileTextLine)"
                                value={area.icon}
                                readOnly
                                onClick={() => openIconPicker(index)}
                              />
                              <input
                                type="text"
                                className={inputCls}
                                placeholder="Label"
                                value={area.label}
                                onChange={(e) => updateFocusArea(index, 'label', e.target.value)}
                              />
                              <input
                                type="text"
                                className={inputCls}
                                placeholder="Short description"
                                value={area.description}
                                onChange={(e) => updateFocusArea(index, 'description', e.target.value)}
                              />
                            </div>
                            <button
                              onClick={() => removeFocusArea(index)}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-muted-dark hover:text-red-400 transition-all"
                            >
                              <RiDeleteBinLine size={16} />
                            </button>
                          </div>
                        ))}
                        {(companyForm.focusAreas || []).length === 0 && (
                          <p className="text-sm text-muted-dark italic">No focus areas added yet.</p>
                        )}
                      </div>
                    </div>

                    {/* Gallery */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs text-muted-dark uppercase tracking-wider">Work Gallery</label>
                        <button
                          onClick={addGalleryImage}
                          className="text-xs flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-all"
                        >
                          <RiAddLine size={14} /> Add Image
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(companyForm.gallery || []).map((img, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-border-dark">
                            <div className="grid grid-cols-3 gap-2 flex-1">
                              <input
                                type="text"
                                className={inputCls}
                                placeholder="Image URL"
                                value={img.src}
                                onChange={(e) => updateGalleryImage(index, 'src', e.target.value)}
                              />
                              <input
                                type="text"
                                className={inputCls}
                                placeholder="Title"
                                value={img.title}
                                onChange={(e) => updateGalleryImage(index, 'title', e.target.value)}
                              />
                              <input
                                type="text"
                                className={inputCls}
                                placeholder="Category"
                                value={img.category}
                                onChange={(e) => updateGalleryImage(index, 'category', e.target.value)}
                              />
                            </div>
                            <button
                              onClick={() => removeGalleryImage(index)}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-muted-dark hover:text-red-400 transition-all"
                            >
                              <RiDeleteBinLine size={16} />
                            </button>
                          </div>
                        ))}
                        {(companyForm.gallery || []).length === 0 && (
                          <p className="text-sm text-muted-dark italic">No gallery images added yet.</p>
                        )}
                      </div>
                    </div>

                    {/* Order */}
                    <div>
                      <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">Display Order</label>
                      <input
                        type="number"
                        className={inputCls}
                        value={companyForm.order}
                        onChange={(e) => setCompanyForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-dark">
                      <button
                        onClick={() => setShowCompanyForm(false)}
                        className="px-6 py-2.5 rounded-xl border border-border-dark text-muted-dark hover:text-text-dark transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={editingCompany ? handleUpdateCompany : handleCreateCompany}
                        disabled={!companyForm.name || !companyForm.slug || !companyForm.tagline || !companyForm.year || !companyForm.country || !companyForm.flag || !companyForm.description}
                        className="px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all"
                      >
                        {editingCompany ? "Update Company" : "Create Company"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Icon Picker Modal */}
            {showIconPicker && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <div className="glass-dark rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-border-dark">
                  <div className="sticky top-0 glass-dark border-b border-border-dark p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-text-dark">Select Icon</h3>
                      <p className="text-xs text-muted-dark mt-0.5">{filteredIcons.length} icons available</p>
                    </div>
                    <button
                      onClick={() => setShowIconPicker(false)}
                      className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
                    >
                      <RiCloseLine size={24} />
                    </button>
                  </div>

                  {/* Search */}
                  <div className="p-4 border-b border-border-dark">
                    <div className="relative">
                      <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-dark" size={18} />
                      <input
                        type="text"
                        className={`${inputCls} pl-10`}
                        placeholder="Search icons by name or category..."
                        value={iconSearch}
                        onChange={(e) => setIconSearch(e.target.value)}
                      />
                    </div>
                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["All", "Document", "Science", "Tech", "Design", "Education", "Media", "Health", "Medical", "Business", "Chart", "Arrow"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setIconSearch(cat === "All" ? "" : cat)}
                          className={`text-xs px-3 py-1 rounded-full border transition-all ${
                            (iconSearch === cat || (cat === "All" && !iconSearch))
                              ? "bg-primary-500/20 border-primary-500/50 text-primary-400"
                              : "border-border-dark text-muted-dark hover:border-primary-500/30"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Icons Grid */}
                  <div className="p-4 overflow-y-auto max-h-[50vh] custom-scrollbar">
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                      {filteredIcons.map((icon) => {
                        const IconComponent = iconComponents[icon.name];
                        return (
                          <button
                            key={icon.name}
                            onClick={() => selectIcon(icon.name)}
                            className="group flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                            title={`${icon.name} (${icon.category})`}
                          >
                            <span className="text-lg text-text-dark group-hover:text-primary-400 transition-colors">
                              {IconComponent ? <IconComponent size={20} /> : <span>?</span>}
                            </span>
                            <span className="text-[9px] text-muted-dark text-center truncate w-full">
                              {icon.name.replace('Ri', '').replace('Line', '')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {filteredIcons.length === 0 && (
                      <div className="text-center py-8 text-muted-dark">
                        <RiSearchLine size={32} className="mx-auto mb-2 opacity-30" />
                        <p>No icons found matching "{iconSearch}"</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="sticky bottom-0 glass-dark border-t border-border-dark p-4 flex items-center justify-between">
                    <span className="text-xs text-muted-dark">
                      Click an icon to select it
                    </span>
                    <button
                      onClick={() => setShowIconPicker(false)}
                      className="px-4 py-2 rounded-xl border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
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
