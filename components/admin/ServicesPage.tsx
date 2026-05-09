"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiSaveLine,
  RiCloseLine,
  RiEyeLine,
  RiEyeOffLine,
  RiRefreshLine,
  RiServiceLine,
  RiDragMove2Line,
  RiBuildingLine,
  RiPaletteLine,
  RiCheckboxCircleLine,
  RiFileTextLine,
  RiImageLine,
} from "react-icons/ri";
import Swal from "sweetalert2";
import { IconPicker } from "./IconPicker";
import { iconComponents } from "./iconData";

// Glass card style matching CompaniesTab
const glassCardCls = "glass-dark rounded-2xl p-5 border border-border-dark hover:border-primary-500/30 transition-all";
const glassSectionCls = "glass-dark rounded-2xl p-5 border border-border-dark";

// Form styling matching CompanyFormModal
const inputCls = "w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all";
const sectionCls = "space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-border-dark";
const sectionHeaderCls = "flex items-center gap-2 text-sm font-semibold text-text-dark mb-4";
const labelCls = "text-xs text-muted-dark uppercase tracking-wider mb-2 block flex items-center gap-1.5";

interface Service {
  id: string;
  title: string;
  icon: string;
  visible: boolean;
  services: { name: string; desc: string }[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      if (data.services) {
        setServices(data.services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      Swal.fire("Error", "Failed to fetch services", "error");
    } finally {
      setLoading(false);
    }
  };

  const saveService = async (service: Service) => {
    try {
      const response = await fetch("/api/services", {
        method: service.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire(
          "Success",
          service.id ? "Service updated successfully" : "Service created successfully",
          "success"
        );
        fetchServices();
        setEditingService(null);
        setIsCreating(false);
      } else {
        Swal.fire("Error", data.error || "Failed to save service", "error");
      }
    } catch (error) {
      console.error("Error saving service:", error);
      Swal.fire("Error", "Failed to save service", "error");
    }
  };

  const deleteService = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/services?id=${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          Swal.fire("Deleted!", "Service has been deleted.", "success");
          fetchServices();
        } else {
          Swal.fire("Error", "Failed to delete service", "error");
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        Swal.fire("Error", "Failed to delete service", "error");
      }
    }
  };

  const toggleVisibility = async (service: Service) => {
    try {
      const response = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...service, visible: !service.visible }),
      });
      
      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const handleDragStart = (e: any, serviceId: string) => {
    setDraggedItem(serviceId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: any, targetService: Service) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetService.id) return;

    const newServices = [...services];
    const draggedIndex = newServices.findIndex(s => s.id === draggedItem);
    const targetIndex = newServices.findIndex(s => s.id === targetService.id);
    
    newServices.splice(draggedIndex, 1);
    newServices.splice(targetIndex, 0, newServices[draggedIndex]);
    
    setServices(newServices);
    setDraggedItem(null);
  };

  if (loading) {
    return (
      <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
        Loading services...
      </div>
    );
  }

  const totalItems = services.length;
  const visibleItems = services.filter((s) => s.visible).length;
  const hiddenItems = totalItems - visibleItems;
  const totalServiceCount = services.reduce((acc, s) => acc + (s.services?.length || 0), 0);

  const stats = [
    { label: "Total Categories", value: totalItems, icon: RiServiceLine, color: "from-primary-500 to-secondary-500" },
    { label: "Visible", value: visibleItems, icon: RiEyeLine, color: "from-green-500 to-emerald-500" },
    { label: "Hidden", value: hiddenItems, icon: RiEyeOffLine, color: "from-orange-500 to-red-500" },
    { label: "Total Items", value: totalServiceCount, icon: RiDragMove2Line, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-text-dark">Marvel Group Services</h2>
          <p className="text-sm text-muted-dark mt-1">Manage service categories and their items</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchServices()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-dark border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-all"
          >
            <RiRefreshLine size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all"
          >
            <RiAddLine size={18} />
            Add Service
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={glassSectionCls}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="text-white" size={20} />
            </div>
            <div className="font-display font-bold text-2xl text-text-dark">{stat.value}</div>
            <div className="text-sm text-muted-dark">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Services List */}
      {services.length === 0 ? (
        <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
          <RiServiceLine size={48} className="mx-auto mb-4 opacity-30" />
          <p>No services yet. Add your first service to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={glassCardCls}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white`}>
                  {service.icon && iconComponents[service.icon] ? (
                    (() => {
                      const IconComp = iconComponents[service.icon];
                      return <IconComp size={28} className="text-white" />;
                    })()
                  ) : (
                    <RiServiceLine size={28} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-text-dark truncate">{service.title}</h3>
                    {service.visible ? (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                        Visible
                      </span>
                    ) : (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-dark">{service.services?.length || 0} service items</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleVisibility(service)}
                    className={`p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-primary-400 transition-all`}
                    title={service.visible ? "Hide" : "Show"}
                  >
                    {service.visible ? <RiEyeLine size={18} /> : <RiEyeOffLine size={18} />}
                  </button>
                  <button
                    onClick={() => setEditingService(service)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-primary-400 transition-all"
                    title="Edit"
                  >
                    <RiEditLine size={18} />
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
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

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(isCreating || editingService) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-dark rounded-3xl w-full max-w-2xl max-h-[90vh] border border-border-dark flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-none bg-bg-dark border-b border-border-dark p-6 flex items-center justify-between z-10 rounded-t-3xl">
                <h3 className="font-display font-bold text-xl text-text-dark">
                  {isCreating ? "Add New Service" : "Edit Service"}
                </h3>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingService(null);
                  }}
                  className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
                  title="Close"
                >
                  <RiCloseLine size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border-dark scrollbar-track-transparent hover:scrollbar-thumb-primary-500/30 p-6">
                <ServiceForm
                  service={editingService}
                  onSave={saveService}
                  onCancel={() => {
                    setIsCreating(false);
                    setEditingService(null);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service: Service | null;
  onSave: (service: Service) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Service>(
    service || {
      id: "",
      title: "",
      icon: "RiServiceLine",
      visible: true,
      services: [{ name: "", desc: "" }],
    }
  );

  const [showIconPicker, setShowIconPicker] = useState(false);

  const handleSelectIcon = (iconName: string) => {
    setFormData({ ...formData, icon: iconName });
    setShowIconPicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: service?.id || Date.now().toString(),
    });
  };

  const addServiceItem = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: "", desc: "" }],
    });
  };

  const removeServiceItem = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  const updateServiceItem = (index: number, field: "name" | "desc", value: string) => {
    setFormData({
      ...formData,
      services: formData.services.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Identity Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <RiBuildingLine className="text-primary-400" size={18} />
            </div>
            Service Identity
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <RiFileTextLine size={14} />
                Service Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputCls}
                placeholder="e.g., Healthcare Services"
                required
              />
            </div>

            {/* Icon Picker */}
            <div>
              <label className={labelCls}>
                <RiImageLine size={14} />
                Service Icon
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowIconPicker(true)}
                  className="w-11 h-11 rounded-xl bg-white/10 border border-border-dark hover:border-primary-500/50 flex items-center justify-center transition-all"
                  title="Click to select icon"
                >
                  {formData.icon && iconComponents[formData.icon] ? (
                    (() => {
                      const IconComp = iconComponents[formData.icon];
                      return <IconComp size={28} className="text-primary-400" />;
                    })()
                  ) : (
                    <span className="text-2xl">✦</span>
                  )}
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    className={inputCls}
                    value={formData.icon}
                    readOnly
                    onClick={() => setShowIconPicker(true)}
                    placeholder="Click to select an icon"
                  />
                </div>
                {formData.icon && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: "" })}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-muted-dark hover:text-red-400 transition-all"
                    title="Clear icon"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-dark mt-1">Click the icon to browse all available icons</p>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <RiCheckboxCircleLine className="text-green-400" size={18} />
            </div>
            Service Status
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Visibility Toggle */}
            <label className={`relative flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all ${
              formData.visible
                ? "bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-green-500/50"
                : "bg-white/5 border-border-dark hover:border-red-500/30"
            }`}>
              <input
                type="checkbox"
                checked={formData.visible}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                formData.visible ? "bg-green-500/20" : "bg-red-500/10"
              }`}>
                {formData.visible ? (
                  <RiEyeLine className="text-green-400" size={24} />
                ) : (
                  <RiEyeOffLine className="text-red-400" size={24} />
                )}
              </div>
              <div className="flex-1">
                <span className={`text-sm font-semibold block ${formData.visible ? "text-green-400" : "text-text-dark"}`}>
                  {formData.visible ? "Visible" : "Hidden"}
                </span>
                <span className="text-xs text-muted-dark">
                  {formData.visible ? "Shown on website" : "Hidden from users"}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Service Items Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <RiServiceLine className="text-amber-400" size={18} />
            </div>
            Service Items
            <span className="ml-auto text-xs text-muted-dark font-normal">
              {formData.services?.length || 0} items
            </span>
          </div>

          
          <div className="space-y-3">
            {formData.services.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5 border border-border-dark">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateServiceItem(index, "name", e.target.value)}
                    placeholder="Service name"
                    className={inputCls}
                    required

                  />
                  <div className="flex gap-2">
                    <textarea
                      value={item.desc}
                      onChange={(e) => updateServiceItem(index, "desc", e.target.value)}
                      placeholder="Description"
                      className={`${inputCls} flex-1`}
                      required
                    />
                    {formData.services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeServiceItem(index)}
                        className="p-3 rounded-lg hover:bg-red-500/10 text-muted-dark hover:text-red-400 transition-all"
                        title="Remove item"
                      >
                        <RiDeleteBinLine size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {formData.services.length === 0 && (
              <p className="text-sm text-muted-dark italic">No service items added yet.</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-dark">Add service items with name and description</p>
            <button
              type="button"
              onClick={addServiceItem}
              className="text-xs flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 hover:bg-primary-500/20 hover:border-primary-500/40 transition-all"
            >
              <RiAddLine size={16} /> Add Item
            </button>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border-dark">
          <div className="text-sm text-muted-dark">
            {service ? "Editing existing service" : "Creating new service"}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-border-dark text-text-dark rounded-lg hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
            >
              <RiSaveLine size={16} />
              {service ? "Update Service" : "Create Service"}
            </button>
          </div>
        </div>
      </form>

      <IconPicker
        isOpen={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        onSelect={handleSelectIcon}
      />
    </div>
  );
}
