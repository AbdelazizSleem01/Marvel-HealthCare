"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSettings4Line,
  RiBriefcaseLine,
  RiToolsLine,
  RiAddLine,
  RiDeleteBinLine,
  RiEditLine,
  RiSaveLine,
  RiCloseLine,
  RiEyeLine,
  RiEyeOffLine,
  RiDragMoveLine,
  RiArrowDownLine,
  RiArrowUpLine,
} from "react-icons/ri";
import Swal from "sweetalert2";

// Types
interface ServiceItem {
  name: string;
  desc: string;
}

interface Service {
  id: string;
  icon: string;
  title: string;
  visible: boolean;
  services: ServiceItem[];
}

interface ToolbarItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  visible: boolean;
}

interface ProductLink {
  label: string;
  url: string;
  visible: boolean;
}

interface ProductFeature {
  name: string;
  desc: string;
}

interface Product {
  id: string;
  icon: string;
  title: string;
  badge: string;
  badgeColor: string;
  color: string;
  description: string;
  notes: string;
  features: ProductFeature[];
  link: ProductLink;
}

interface SiteConfig {
  services: Service[];
  toolbar: ToolbarItem[];
  products: Product[];
}

const defaultConfig: SiteConfig = {
  services: [
    {
      id: "cme",
      icon: "RiGraduationCapLine",
      title: "CME",
      visible: true,
      services: [
        { name: "Curriculum Design", desc: "Comprehensive CME program structuring" },
        { name: "Content Development", desc: "Medical education content creation" },
        { name: "Slide Decks", desc: "Professional presentation materials" },
        { name: "Gamification", desc: "Case studies, patient profiles, interactivity" },
        { name: "Speakers", desc: "Expert faculty management" },
        { name: "Accreditation", desc: "CPD, DHA, SCFHS certificates" },
        { name: "Endorsed Materials", desc: "Officially recognized content" },
      ],
    },
    {
      id: "research",
      icon: "RiFileTextLine",
      title: "Research",
      visible: true,
      services: [
        { name: "Study Design", desc: "Clinical and observational research" },
        { name: "Data Analysis", desc: "Statistical and qualitative analysis" },
        { name: "Manuscript Writing", desc: "Peer-reviewed publication support" },
        { name: "Literature Review", desc: "Comprehensive evidence synthesis" },
        { name: "Abstracts & Posters", desc: "Conference submission support" },
      ],
    },
    {
      id: "elearning",
      icon: "RiComputerLine",
      title: "eLearning",
      visible: true,
      services: [
        { name: "LMS Development", desc: "Learning management systems" },
        { name: "Interactive Modules", desc: "Engaging digital content" },
        { name: "VR Training", desc: "Virtual reality medical simulations" },
        { name: "Mobile Apps", desc: "Healthcare education apps" },
        { name: "Assessment Tools", desc: "Online testing & certification" },
      ],
    },
    {
      id: "artwork",
      icon: "RiPaletteLine",
      title: "Marketing",
      visible: true,
      services: [
        { name: "Brand Identity", desc: "Logo and visual system design" },
        { name: "Marketing Campaigns", desc: "Multi-channel promotion strategies" },
        { name: "Medical Illustration", desc: "Anatomical and scientific art" },
        { name: "Video Production", desc: "Educational and promotional videos" },
        { name: "Social Media", desc: "Digital marketing management" },
      ],
    },
    {
      id: "training",
      icon: "RiUserSettingsLine",
      title: "Training",
      visible: true,
      services: [
        { name: "Workshops", desc: "Hands-on skill development" },
        { name: "Certification Programs", desc: "Professional credentials" },
        { name: "On-site Training", desc: "In-person education delivery" },
        { name: "Train-the-Trainer", desc: "Faculty development programs" },
      ],
    },
    {
      id: "it",
      icon: "RiCodeBoxLine",
      title: "IT",
      visible: true,
      services: [
        { name: "Custom Software", desc: "Bespoke healthcare applications" },
        { name: "CRM Systems", desc: "Customer relationship platforms" },
        { name: "Data Analytics", desc: "Healthcare intelligence dashboards" },
        { name: "AI Integration", desc: "Machine learning solutions" },
      ],
    },
    {
      id: "visuals",
      icon: "RiVideoLine",
      title: "Visuals",
      visible: true,
      services: [
        { name: "3D Medical Animation", desc: "Complex medical concepts visualization" },
        { name: "VR Training", desc: "Virtual reality medical simulations" },
        { name: "Video Production", desc: "Professional healthcare videos" },
        { name: "Interactive Media", desc: "Engaging digital experiences" },
        { name: "Motion Graphics", desc: "Animated medical illustrations" },
      ],
    },
    {
      id: "events",
      icon: "RiCalendarEventLine",
      title: "Events",
      visible: true,
      services: [
        { name: "Conference Planning", desc: "Full-service medical conferences" },
        { name: "Virtual Events", desc: "Online webinars & summits" },
        { name: "Hybrid Events", desc: "In-person + digital combined" },
        { name: "Exhibition Booths", desc: "Trade show presence design" },
        { name: "Speaker Management", desc: "Keynote & panel coordination" },
      ],
    },
  ],
  toolbar: [
    { id: "services", label: "Services", icon: "RiSettings4Line", color: "primary", visible: true },
    { id: "products", label: "Products", icon: "RiBriefcaseLine", color: "primary", visible: true },
    { id: "expertise", label: "Expertise", icon: "RiHeartPulseLine", color: "primary", visible: true },
    { id: "accreds", label: "Accreds", icon: "RiAwardLine", color: "primary", visible: true },
    { id: "reviews", label: "Reviews", icon: "RiTeamLine", color: "primary", visible: true },
    { id: "people", label: "People", icon: "RiGroupLine", color: "primary", visible: true },
    { id: "gallery", label: "Gallery", icon: "RiImageLine", color: "primary", visible: true },
    { id: "theme", label: "Theme", icon: "RiSunLine", color: "primary", visible: true },
    { id: "contact", label: "Contact", icon: "RiMailLine", color: "primary", visible: true },
  ],
  products: [
    {
      id: "tebzone",
      icon: "RiStackLine",
      title: "TebZone",
      badge: "LIVE",
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-primary-500 to-secondary-400",
      description: "Healthcare marketplace connecting patients and suppliers.",
      notes: "Seamless ordering experience with real-time inventory tracking.",
      features: [
        { name: "Medicine Marketplace", desc: "Wide range of healthcare products" },
        { name: "Prescription Upload", desc: "Easy prescription management" },
        { name: "Real-time Tracking", desc: "Track orders live" },
        { name: "Secure Payments", desc: "Encrypted transactions" },
      ],
      link: { label: "Visit TebZone", url: "https://tebzone.com", visible: true },
    },
    {
      id: "medadd",
      icon: "RiComputerLine",
      title: "Med-ADD",
      badge: "LIVE",
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-secondary-400 to-primary-500",
      description: "Pharmaceutical sales force training with adaptive AI.",
      notes: "AI-powered role-play scenarios for effective training.",
      features: [
        { name: "AI Role-play", desc: "Interactive training scenarios" },
        { name: "Performance Analytics", desc: "Track training progress" },
        { name: "Compliance Tracking", desc: "Ensure regulatory compliance" },
        { name: "Interactive Modules", desc: "Engaging learning content" },
      ],
      link: { label: "Explore Med-ADD", url: "#", visible: true },
    },
    {
      id: "medvi",
      icon: "RiVideoLine",
      title: "Med-Vi",
      badge: "LIVE",
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-primary-500 to-secondary-400",
      description: "Medical education and HCP engagement platform.",
      notes: "CPD-accredited content with immersive VR experiences.",
      features: [
        { name: "CPD-Accredited", desc: "Earn continuing education credits" },
        { name: "Interactive Cases", desc: "Real-world medical scenarios" },
        { name: "HCP Analytics", desc: "Engagement insights" },
        { name: "VR Simulations", desc: "Immersive training" },
      ],
      link: { label: "Learn More", url: "#", visible: true },
    },
    {
      id: "medlab",
      icon: "RiMicroscopeLine",
      title: "Med-Lab",
      badge: "Coming Soon",
      badgeColor: "bg-orange-500/10 text-orange-500",
      color: "from-secondary-400 to-primary-500",
      description: "Next-gen laboratory information management system.",
      notes: "Launching Q3 2025 - Join our early access program.",
      features: [
        { name: "Sample Tracking", desc: "End-to-end sample management" },
        { name: "QC Management", desc: "Quality control workflows" },
        { name: "Reports Dashboard", desc: "Analytics & insights" },
        { name: "LIMS Integration", desc: "Connect with existing systems" },
      ],
      link: { label: "Join Waitlist", url: "#", visible: true },
    },
  ],
};

// Available icons for selection
const availableIcons = [
  "RiGraduationCapLine", "RiFileTextLine", "RiComputerLine", "RiPaletteLine",
  "RiUserSettingsLine", "RiCodeBoxLine", "RiVideoLine", "RiCalendarEventLine",
  "RiSettings4Line", "RiBriefcaseLine", "RiHeartPulseLine", "RiAwardLine",
  "RiTeamLine", "RiGroupLine", "RiImageLine", "RiSunLine", "RiMoonLine",
  "RiMailLine", "RiStackLine", "RiStarLine", "RiCheckLine", "RiCloseLine",
  "RiAddLine", "RiDeleteBinLine", "RiEditLine", "RiSaveLine", "RiEyeLine",
  "RiEyeOffLine", "RiArrowRightLine", "RiArrowLeftLine", "RiArrowUpLine",
  "RiArrowDownLine", "RiMenuLine", "RiMenuFoldLine", "RiMenuUnfoldLine",
  "RiSearchLine", "RiFilterLine", "RiSortAsc", "RiSortDesc", "RiDownloadLine",
  "RiUploadLine", "RiRefreshLine", "RiLoaderLine", "RiCheckDoubleLine",
  "RiErrorWarningLine", "RiInformationLine", "RiQuestionLine", "RiAlertLine",
  "RiNotificationLine", "RiBellLine", "RiSettingsLine", "RiToolsLine",
  "RiDashboardLine", "RiHomeLine", "RiBuildingLine", "RiHospitalLine",
  "RiHotelLine", "RiStoreLine", "RiBankLine", "RiGovernmentLine",
  "RiBookLine", "RiBookOpenLine", "RiBookReadLine", "RiArticleLine",
  "RiNewspaperLine", "RiFileListLine", "RiFilePaperLine", "RiDraftLine",
  "RiFolderLine", "RiFolderOpenLine", "RiFolderAddLine", "RiFolderReduceLine",
];

// Available colors for selection
const availableColors = [
  { value: "from-primary-500 to-secondary-400", label: "Primary → Secondary" },
  { value: "from-secondary-400 to-primary-500", label: "Secondary → Primary" },
  { value: "from-primary-600 to-primary-500", label: "Primary Dark → Primary" },
  { value: "from-secondary-600 to-secondary-500", label: "Secondary Dark → Secondary" },
  { value: "from-green-500 to-green-600", label: "Green" },
  { value: "from-blue-500 to-blue-600", label: "Blue" },
  { value: "from-orange-500 to-orange-600", label: "Orange" },
];

// Available badge colors
const availableBadgeColors = [
  { value: "bg-green-500/10 text-green-500", label: "Green (Live)" },
  { value: "bg-orange-500/10 text-orange-500", label: "Orange (Coming Soon)" },
  { value: "bg-blue-500/10 text-blue-500", label: "Blue" },
  { value: "bg-purple-500/10 text-purple-500", label: "Purple" },
  { value: "bg-red-500/10 text-red-500", label: "Red" },
];

export function SettingsTab() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [activeSection, setActiveSection] = useState<"services" | "toolbar" | "products">("services");
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load config from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("siteConfig");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
      } catch {
        console.error("Failed to parse saved config");
      }
    }
  }, []);

  // Save config to localStorage
  const saveConfig = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem("siteConfig", JSON.stringify(config));
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Configuration has been saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save configuration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to defaults
  const resetToDefaults = () => {
    Swal.fire({
      title: "Reset to defaults?",
      text: "This will restore the original configuration. This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reset",
    }).then((result) => {
      if (result.isConfirmed) {
        setConfig(defaultConfig);
        localStorage.setItem("siteConfig", JSON.stringify(defaultConfig));
        Swal.fire({
          icon: "success",
          title: "Reset!",
          text: "Configuration has been reset to defaults.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Add new service
  const addService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      icon: "RiSettings4Line",
      title: "New Service",
      visible: true,
      services: [],
    };
    setConfig({ ...config, services: [...config.services, newService] });
    setEditingService(newService);
  };

  // Update service
  const updateService = (updated: Service) => {
    setConfig({
      ...config,
      services: config.services.map((s) => (s.id === updated.id ? updated : s)),
    });
    setEditingService(null);
  };

  // Delete service
  const deleteService = (id: string) => {
    Swal.fire({
      title: "Delete service?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setConfig({
          ...config,
          services: config.services.filter((s) => s.id !== id),
        });
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  // Add service item (bullet point)
  const addServiceItem = (serviceId: string) => {
    const service = config.services.find((s) => s.id === serviceId);
    if (!service) return;
    const newItem: ServiceItem = { name: "New Item", desc: "Description" };
    const updated = {
      ...service,
      services: [...service.services, newItem],
    };
    updateService(updated);
  };

  // Update service item
  const updateServiceItem = (serviceId: string, index: number, item: ServiceItem) => {
    const service = config.services.find((s) => s.id === serviceId);
    if (!service) return;
    const updatedServices = [...service.services];
    updatedServices[index] = item;
    updateService({ ...service, services: updatedServices });
  };

  // Delete service item
  const deleteServiceItem = (serviceId: string, index: number) => {
    const service = config.services.find((s) => s.id === serviceId);
    if (!service) return;
    const updatedServices = service.services.filter((_, i) => i !== index);
    updateService({ ...service, services: updatedServices });
  };

  // Toggle toolbar item visibility
  const toggleToolbarItem = (id: string) => {
    setConfig({
      ...config,
      toolbar: config.toolbar.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      ),
    });
  };

  // Update toolbar item label
  const updateToolbarLabel = (id: string, label: string) => {
    setConfig({
      ...config,
      toolbar: config.toolbar.map((item) =>
        item.id === id ? { ...item, label } : item
      ),
    });
  };

  // Add new product
  const addProduct = () => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      icon: "RiStackLine",
      title: "New Product",
      badge: "LIVE",
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-primary-500 to-secondary-400",
      description: "Product description",
      notes: "",
      features: [],
      link: { label: "Learn More", url: "#", visible: true },
    };
    setConfig({ ...config, products: [...config.products, newProduct] });
    setEditingProduct(newProduct);
  };

  // Update product
  const updateProduct = (updated: Product) => {
    setConfig({
      ...config,
      products: config.products.map((p) => (p.id === updated.id ? updated : p)),
    });
    setEditingProduct(null);
  };

  // Delete product
  const deleteProduct = (id: string) => {
    Swal.fire({
      title: "Delete product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setConfig({
          ...config,
          products: config.products.filter((p) => p.id !== id),
        });
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-dark">Site Configuration</h2>
          <p className="text-muted-dark mt-1">Manage services, toolbar, and products</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 rounded-xl border border-border-dark text-muted-dark hover:text-text-dark hover:bg-white/5 transition-all text-sm"
          >
            Reset to Defaults
          </button>
          <button
            onClick={saveConfig}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <RiSaveLine size={16} />
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-border-dark">
        {[
          { id: "services", label: "Services", icon: RiSettings4Line },
          { id: "toolbar", label: "Toolbar", icon: RiToolsLine },
          { id: "products", label: "Products", icon: RiBriefcaseLine },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === section.id
                ? "bg-primary-500/20 text-primary-400"
                : "text-muted-dark hover:text-text-dark hover:bg-white/5"
            }`}
          >
            <section.icon size={16} />
            {section.label}
          </button>
        ))}
      </div>

      {/* Services Section */}
      {activeSection === "services" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-dark">Services</h3>
            <button
              onClick={addService}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/20 text-primary-400 text-sm hover:bg-primary-500/30 transition-all"
            >
              <RiAddLine size={16} />
              Add Service
            </button>
          </div>

          <div className="grid gap-4">
            {config.services.map((service) => (
              <motion.div
                key={service.id}
                layout
                className="p-4 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all"
              >
                {editingService?.id === service.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-dark mb-1">Title</label>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) =>
                            setEditingService({ ...editingService, title: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-dark mb-1">Icon</label>
                        <select
                          value={editingService.icon}
                          onChange={(e) =>
                            setEditingService({ ...editingService, icon: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                        >
                          {availableIcons.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`visible-${service.id}`}
                        checked={editingService.visible}
                        onChange={(e) =>
                          setEditingService({ ...editingService, visible: e.target.checked })
                        }
                        className="rounded border-border-dark bg-white/5 text-primary-500"
                      />
                      <label htmlFor={`visible-${service.id}`} className="text-sm text-text-dark">
                        Visible
                      </label>
                    </div>

                    {/* Service Items */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-muted-dark">Service Items</label>
                        <button
                          onClick={() => addServiceItem(service.id)}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-muted-dark text-xs hover:bg-white/10 transition-all"
                        >
                          <RiAddLine size={12} />
                          Add Item
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editingService.services.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) =>
                                updateServiceItem(service.id, index, {
                                  ...item,
                                  name: e.target.value,
                                })
                              }
                              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                              placeholder="Item name"
                            />
                            <input
                              type="text"
                              value={item.desc}
                              onChange={(e) =>
                                updateServiceItem(service.id, index, {
                                  ...item,
                                  desc: e.target.value,
                                })
                              }
                              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                              placeholder="Description"
                            />
                            <button
                              onClick={() => deleteServiceItem(service.id, index)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                              <RiDeleteBinLine size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => updateService(editingService)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/20 text-primary-400 text-sm hover:bg-primary-500/30 transition-all"
                      >
                        <RiSaveLine size={16} />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 rounded-lg border border-border-dark text-muted-dark hover:text-text-dark hover:bg-white/5 text-sm transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center ${
                          service.visible ? "text-primary-400" : "text-muted-dark"
                        }`}
                      >
                        <span className="text-xs font-mono">{service.icon.replace("Ri", "")}</span>
                      </div>
                      <div>
                        <h4 className={`font-medium ${service.visible ? "text-text-dark" : "text-muted-dark"}`}>
                          {service.title}
                        </h4>
                        <p className="text-xs text-muted-dark">
                          {service.services.length} items • {service.visible ? "Visible" : "Hidden"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingService(service)}
                        className="p-2 rounded-lg text-muted-dark hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                      >
                        <RiEditLine size={16} />
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="p-2 rounded-lg text-muted-dark hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <RiDeleteBinLine size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar Section */}
      {activeSection === "toolbar" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-dark">Toolbar Buttons</h3>
            <p className="text-sm text-muted-dark">Click eye icon to show/hide, click name to edit</p>
          </div>

          <div className="grid gap-2">
            {config.toolbar.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center text-primary-400">
                    <span className="text-xs font-mono">{item.icon.replace("Ri", "")}</span>
                  </div>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateToolbarLabel(item.id, e.target.value)}
                    className="bg-transparent text-text-dark font-medium focus:outline-none focus:border-b focus:border-primary-500"
                  />
                </div>
                <button
                  onClick={() => toggleToolbarItem(item.id)}
                  className={`p-2 rounded-lg transition-all ${
                    item.visible
                      ? "text-primary-400 hover:bg-primary-500/10"
                      : "text-muted-dark hover:text-text-dark hover:bg-white/5"
                  }`}
                  title={item.visible ? "Hide" : "Show"}
                >
                  {item.visible ? <RiEyeLine size={18} /> : <RiEyeOffLine size={18} />}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Products Section */}
      {activeSection === "products" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-dark">Products</h3>
            <button
              onClick={addProduct}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/20 text-primary-400 text-sm hover:bg-primary-500/30 transition-all"
            >
              <RiAddLine size={16} />
              Add Product
            </button>
          </div>

          <div className="grid gap-4">
            {config.products.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="p-4 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all"
              >
                {editingProduct?.id === product.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-dark mb-1">Title</label>
                        <input
                          type="text"
                          value={editingProduct.title}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, title: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-dark mb-1">Icon</label>
                        <select
                          value={editingProduct.icon}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, icon: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                        >
                          {availableIcons.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-dark mb-1">Badge</label>
                        <input
                          type="text"
                          value={editingProduct.badge}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, badge: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-dark mb-1">Badge Color</label>
                        <select
                          value={editingProduct.badgeColor}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, badgeColor: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                        >
                          {availableBadgeColors.map((color) => (
                            <option key={color.value} value={color.value}>
                              {color.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-dark mb-1">Color</label>
                      <select
                        value={editingProduct.color}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, color: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                      >
                        {availableColors.map((color) => (
                          <option key={color.value} value={color.value}>
                            {color.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-dark mb-1">Description</label>
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, description: e.target.value })
                        }
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-muted-dark mb-1">Notes</label>
                      <textarea
                        value={editingProduct.notes}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, notes: e.target.value })
                        }
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-muted-dark">Features</label>
                        <button
                          onClick={() =>
                            setEditingProduct({
                              ...editingProduct,
                              features: [...editingProduct.features, { name: "New Feature", desc: "" }],
                            })
                          }
                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-muted-dark text-xs hover:bg-white/10 transition-all"
                        >
                          <RiAddLine size={12} />
                          Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editingProduct.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feature.name}
                              onChange={(e) => {
                                const updated = [...editingProduct.features];
                                updated[index] = { ...feature, name: e.target.value };
                                setEditingProduct({ ...editingProduct, features: updated });
                              }}
                              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                              placeholder="Feature name"
                            />
                            <input
                              type="text"
                              value={feature.desc}
                              onChange={(e) => {
                                const updated = [...editingProduct.features];
                                updated[index] = { ...feature, desc: e.target.value };
                                setEditingProduct({ ...editingProduct, features: updated });
                              }}
                              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                              placeholder="Description"
                            />
                            <button
                              onClick={() => {
                                const updated = editingProduct.features.filter((_, i) => i !== index);
                                setEditingProduct({ ...editingProduct, features: updated });
                              }}
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                              <RiDeleteBinLine size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Link */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-muted-dark mb-1">Link Label</label>
                        <input
                          type="text"
                          value={editingProduct.link.label}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              link: { ...editingProduct.link, label: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-dark mb-1">Link URL</label>
                        <input
                          type="text"
                          value={editingProduct.link.url}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              link: { ...editingProduct.link, url: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-border-dark text-text-dark text-sm focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`link-visible-${product.id}`}
                            checked={editingProduct.link.visible}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                link: { ...editingProduct.link, visible: e.target.checked },
                              })
                            }
                            className="rounded border-border-dark bg-white/5 text-primary-500"
                          />
                          <label htmlFor={`link-visible-${product.id}`} className="text-sm text-text-dark">
                            Link Visible
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => updateProduct(editingProduct)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/20 text-primary-400 text-sm hover:bg-primary-500/30 transition-all"
                      >
                        <RiSaveLine size={16} />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 rounded-lg border border-border-dark text-muted-dark hover:text-text-dark hover:bg-white/5 text-sm transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center text-primary-400">
                        <span className="text-xs font-mono">{product.icon.replace("Ri", "")}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-text-dark">{product.title}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-muted-dark">
                            {product.badge}
                          </span>
                        </div>
                        <p className="text-xs text-muted-dark">
                          {product.features.length} features • Link {product.link.visible ? "visible" : "hidden"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 rounded-lg text-muted-dark hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                      >
                        <RiEditLine size={16} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 rounded-lg text-muted-dark hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <RiDeleteBinLine size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
