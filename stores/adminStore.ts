import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Types
export interface FocusArea {
  icon: string;
  label: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

export interface Company {
  _id?: string;
  name: string;
  slug: string;
  tagline: string;
  year: string;
  country: string;
  flag: string;
  description: string;
  color: string;
  icon?: string;
  logo?: string;
  isMain: boolean;
  isActive: boolean;
  focusAreas: FocusArea[];
  gallery: GalleryImage[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface AdminState {
  // Companies
  companies: Company[];
  selectedCompany: Company | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCompanies: (companies: Company[]) => void;
  setSelectedCompany: (company: Company | null) => void;
  addCompany: (company: Company) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Fetch
  fetchCompanies: () => Promise<void>;
  createCompany: (data: Omit<Company, "_id">) => Promise<void>;
  editCompany: (id: string, data: Partial<Company>) => Promise<void>;
  removeCompany: (id: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>()(
  devtools(
    (set, get) => ({
      // Initial State
      companies: [],
      selectedCompany: null,
      isLoading: false,
      error: null,

      // Sync Actions
      setCompanies: (companies) => set({ companies }),
      setSelectedCompany: (company) => set({ selectedCompany: company }),
      addCompany: (company) =>
        set((state) => ({ companies: [...state.companies, company] })),
      updateCompany: (id, data) =>
        set((state) => ({
          companies: state.companies.map((c) =>
            c._id === id ? { ...c, ...data } : c
          ),
        })),
      deleteCompany: (id) =>
        set((state) => ({
          companies: state.companies.filter((c) => c._id !== id),
        })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      // Async Actions
      fetchCompanies: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/companies");
          if (!response.ok) throw new Error("Failed to fetch companies");
          const data = await response.json();
          set({ companies: data.companies, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      createCompany: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/companies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!response.ok) throw new Error("Failed to create company");
          const newCompany = await response.json();
          set((state) => ({
            companies: [...state.companies, newCompany.company],
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      editCompany: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`/api/companies/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!response.ok) throw new Error("Failed to update company");
          const updatedCompany = await response.json();
          set((state) => ({
            companies: state.companies.map((c) =>
              c._id === id ? updatedCompany.company : c
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      removeCompany: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`/api/companies/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to delete company");
          set((state) => ({
            companies: state.companies.filter((c) => c._id !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },
    }),
    { name: "AdminStore" }
  )
);
