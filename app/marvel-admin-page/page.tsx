"use client";

import { useState, useEffect } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { RiDashboardLine, RiMailLine, RiBuildingLine, RiSettingsLine } from "react-icons/ri";
import Swal from "sweetalert2";
import {
  AdminLayout,
  LoginForm,
  LeadsTab,
  CompaniesTab,
  CompanyFormModal,
  OverviewTab,
  SettingsTab,
} from "@/components/admin";
import { useAdminStore, Company, FocusArea, GalleryImage } from "@/stores/adminStore";
import { Lead, statusStyles } from "@/components/admin";

function AdminDashboard() {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";

  const [activeTab, setActiveTab] = useState("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

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
    setCompanyForm((prev) => ({ ...prev, gallery: updated }));
  };

  const removeGalleryImage = (index: number) => {
    const updated = (companyForm.gallery || []).filter((_, i) => i !== index);
    setCompanyForm((prev) => ({ ...prev, gallery: updated }));
  };

  const {
    companies,
    isLoading,
    fetchCompanies,
    createCompany,
    editCompany,
    removeCompany,
  } = useAdminStore();

  const handleAddCompany = () => {
    setEditingCompany(null);
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
    setShowCompanyForm(true);
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setCompanyForm({ ...company });
    setShowCompanyForm(true);
  };

  const handleFormSubmit = async () => {
    if (editingCompany) {
      await handleUpdateCompany();
    } else {
      await handleCreateCompany();
    }
  };

  const navItems = [
    {
      id: "leads",
      label: "Leads",
      icon: RiMailLine,
      count: leads.filter((l) => l.status === "new").length,
    },
    {
      id: "companies",
      label: "Companies",
      icon: RiBuildingLine,
      count: companies.length,
    },
    { id: "overview", label: "Overview", icon: RiDashboardLine, count: null },
    { id: "settings", label: "Settings", icon: RiSettingsLine, count: null },
  ];

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} navItems={navItems}>
      {activeTab === "overview" && <OverviewTab leads={leads} companies={companies} />}

      {activeTab === "leads" && (
        <LeadsTab
          leads={leads}
          loading={loading}
          onRefresh={fetchLeads}
          onUpdateStatus={updateLeadStatus}
          onDelete={deleteLead}
        />
      )}

      {activeTab === "companies" && (
        <CompaniesTab
          companies={companies}
          isLoading={isLoading}
          onRefresh={fetchCompanies}
          onAdd={handleAddCompany}
          onEdit={handleEditCompany}
          onDelete={removeCompany}
        />
      )}

      {activeTab === "settings" && <SettingsTab />}

      <CompanyFormModal
        isOpen={showCompanyForm}
        onClose={() => setShowCompanyForm(false)}
        onSubmit={handleFormSubmit}
        editingCompany={editingCompany}
        formData={companyForm}
        setFormData={setCompanyForm}
        isLoading={isLoading}
      />
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <SessionProvider>
      <AdminDashboard />
    </SessionProvider>
  );
}
