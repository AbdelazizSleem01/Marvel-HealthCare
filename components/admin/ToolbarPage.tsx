"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiAddLine,
  RiCloseLine,
  RiDeleteBinLine,
  RiDragMove2Line,
  RiEditLine,
  RiEyeLine,
  RiEyeOffLine,
  RiSaveLine,
  RiRefreshLine,
  RiBuildingLine,
  RiPaletteLine,
  RiCheckboxCircleLine,
  RiFileTextLine,
  RiImageLine,
  RiLink,
  RiListOrdered,
} from "react-icons/ri";
import Swal from "sweetalert2";
import { IconPicker } from "./IconPicker";
import { iconComponents } from "./iconData";

const inputCls = "w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all";
const sectionCls = "space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-border-dark";
const sectionHeaderCls = "flex items-center gap-2 text-sm font-semibold text-text-dark mb-4";
const labelCls = "text-xs text-muted-dark uppercase tracking-wider mb-2 block flex items-center gap-1.5";

interface ToolbarItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  visible: boolean;
  order: number;
}

export default function ToolbarPage() {
  const [toolbarItems, setToolbarItems] = useState<ToolbarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ToolbarItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    fetchToolbarItems();
  }, []);

  const fetchToolbarItems = async () => {
    try {
      const response = await fetch("/api/toolbar");
      const data = await response.json();
      if (data.items) {
        setToolbarItems(data.items.sort((a: ToolbarItem, b: ToolbarItem) => a.order - b.order));
      }
    } catch (error) {
      console.error("Error fetching toolbar items:", error);
      Swal.fire("Error", "Failed to fetch toolbar items", "error");
    } finally {
      setLoading(false);
    }
  };

  const saveToolbarItem = async (item: ToolbarItem) => {
    try {
      const response = await fetch("/api/toolbar", {
        method: item.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire(
          "Success",
          item.id ? "Toolbar item updated successfully" : "Toolbar item created successfully",
          "success"
        );
        fetchToolbarItems();
        setEditingItem(null);
        setIsCreating(false);
      } else {
        Swal.fire("Error", data.error || "Failed to save toolbar item", "error");
      }
    } catch (error) {
      console.error("Error saving toolbar item:", error);
      Swal.fire("Error", "Failed to save toolbar item", "error");
    }
  };

  const deleteToolbarItem = async (id: string) => {
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
        const response = await fetch(`/api/toolbar?id=${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          Swal.fire("Deleted!", "Toolbar item has been deleted.", "success");
          fetchToolbarItems();
        } else {
          Swal.fire("Error", "Failed to delete toolbar item", "error");
        }
      } catch (error) {
        console.error("Error deleting toolbar item:", error);
        Swal.fire("Error", "Failed to delete toolbar item", "error");
      }
    }
  };

  const toggleVisibility = async (item: ToolbarItem) => {
    try {
      const response = await fetch("/api/toolbar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, visible: !item.visible }),
      });
      
      if (response.ok) {
        fetchToolbarItems();
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const moveItem = async (item: ToolbarItem, direction: "up" | "down") => {
    const currentIndex = toolbarItems.findIndex(i => i.id === item.id);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= toolbarItems.length) return;
    
    const newItems = [...toolbarItems];
    [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];
    
    try {
      const response = await fetch("/api/toolbar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: newItems.map((item, index) => ({ ...item, order: index }))
        }),
      });
      
      if (response.ok) {
        setToolbarItems(newItems);
      }
    } catch (error) {
      console.error("Error reordering toolbar:", error);
    }
  };

  const handleDragStart = (e: any, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: any, targetItem: ToolbarItem) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetItem.id) return;

    const newItems = [...toolbarItems];
    const draggedIndex = newItems.findIndex(i => i.id === draggedItem);
    const targetIndex = newItems.findIndex(i => i.id === targetItem.id);
    
    const [draggedObj] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedObj);
    
    try {
      const response = await fetch("/api/toolbar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: newItems.map((item, index) => ({ ...item, order: index }))
        }),
      });
      
      if (response.ok) {
        setToolbarItems(newItems);
      }
    } catch (error) {
      console.error("Error reordering toolbar:", error);
    }
    
    setDraggedItem(null);
  };

// Glass card style matching CompaniesTab
const glassCardCls = "glass-dark rounded-2xl p-5 border border-border-dark hover:border-primary-500/30 transition-all";
const glassSectionCls = "glass-dark rounded-2xl p-5 border border-border-dark";

  if (loading) {
    return (
      <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
        Loading toolbar items...
      </div>
    );
  }

  const totalItems = toolbarItems.length;
  const visibleItems = toolbarItems.filter(item => item.visible).length;
  const hiddenItems = totalItems - visibleItems;

  const stats = [
    { label: "Total Items", value: totalItems, icon: RiDragMove2Line, color: "from-primary-500 to-secondary-500" },
    { label: "Visible", value: visibleItems, icon: RiEyeLine, color: "from-green-500 to-emerald-500" },
    { label: "Hidden", value: hiddenItems, icon: RiEyeOffLine, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-text-dark">Toolbar Management</h2>
          <p className="text-sm text-muted-dark mt-1">Customize and manage your navigation toolbar</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchToolbarItems()}
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
            Add Item
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

      {/* Toolbar Items List */}
      {toolbarItems.length === 0 ? (
        <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
          <RiDragMove2Line size={48} className="mx-auto mb-4 opacity-30" />
          <p>No toolbar items yet. Add your first item to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {toolbarItems.map((item) => (
            <div
              key={item.id}
              className={glassCardCls}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white`}>
                  {item.icon && iconComponents[item.icon] ? (
                    (() => {
                      const IconComp = iconComponents[item.icon];
                      return <IconComp size={28} className="text-white" />;
                    })()
                  ) : (
                    <RiDragMove2Line size={28} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-text-dark truncate">{item.label}</h3>
                    {item.visible ? (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                        Visible
                      </span>
                    ) : (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-dark">Order: {item.order} • {item.color}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleVisibility(item)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-primary-400 transition-all"
                    title={item.visible ? "Hide" : "Show"}
                  >
                    {item.visible ? <RiEyeLine size={18} /> : <RiEyeOffLine size={18} />}
                  </button>
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-primary-400 transition-all"
                    title="Edit"
                  >
                    <RiEditLine size={18} />
                  </button>
                  <button
                    onClick={() => deleteToolbarItem(item.id)}
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
          {(isCreating || editingItem) && (
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
                className="bg-bg-dark rounded-3xl w-full max-w-4xl max-h-[90vh] border border-border-dark flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex-none bg-bg-dark border-b border-border-dark p-6 flex items-center justify-between z-10 rounded-t-3xl">
                  <h2 className="font-display font-bold text-xl text-text-dark">
                    {isCreating ? "Create New Toolbar Item" : "Edit Toolbar Item"}
                  </h2>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setEditingItem(null);
                    }}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
                    title="Close"
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border-dark scrollbar-track-transparent hover:scrollbar-thumb-primary-500/30 p-6">
                  <ToolbarForm
                    item={editingItem}
                    onSave={saveToolbarItem}
                    onCancel={() => {
                      setIsCreating(false);
                      setEditingItem(null);
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

function ToolbarForm({
  item,
  onSave,
  onCancel,
}: {
  item: ToolbarItem | null;
  onSave: (item: ToolbarItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ToolbarItem>(
    item || {
      id: "",
      label: "",
      icon: "RiServiceLine",
      color: "primary",
      visible: true,
      order: 0,
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
      id: item?.id || Date.now().toString(),
      order: item?.order || 0,
    });
  };

  // Gradient colors like Companies form
  const gradientColors = [
    { value: "from-blue-500 to-blue-600", from: "#3b82f6", to: "#2563eb", label: "Blue" },
    { value: "from-purple-500 to-purple-600", from: "#a855f7", to: "#9333ea", label: "Purple" },
    { value: "from-green-500 to-emerald-600", from: "#22c55e", to: "#059669", label: "Green" },
    { value: "from-orange-500 to-red-600", from: "#f97316", to: "#dc2626", label: "Orange-Red" },
    { value: "from-pink-500 to-rose-600", from: "#ec4899", to: "#e11d48", label: "Pink" },
    { value: "from-cyan-500 to-blue-600", from: "#06b6d4", to: "#2563eb", label: "Cyan" },
    { value: "from-amber-500 to-orange-600", from: "#f59e0b", to: "#ea580c", label: "Amber" },
    { value: "from-indigo-500 to-purple-600", from: "#6366f1", to: "#9333ea", label: "Indigo" },
  ];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Toolbar Identity Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <RiBuildingLine className="text-primary-400" size={18} />
            </div>
            Toolbar Item Identity
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <RiFileTextLine size={14} />
                Button Label *
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className={inputCls}
                placeholder="e.g., Services, Products, About"
                required
              />
            </div>

            <div>
              <label className={labelCls}>
                <RiListOrdered size={14} />
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className={inputCls}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Icon & Color Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <RiPaletteLine className="text-purple-400" size={18} />
            </div>
            Icon & Color Theme
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Icon Picker */}
            <div>
              <label className={labelCls}>
                <RiImageLine size={14} />
                Toolbar Icon
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

            {/* Color Theme */}
            <div>
              <label className={labelCls}>
                <RiPaletteLine size={14} />
                Color Theme
              </label>
              <div className="flex flex-wrap gap-2">
                {gradientColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.label.toLowerCase().split('-')[0] })}
                    className={`group relative w-12 h-12 rounded-xl border-2 transition-all overflow-hidden ${formData.color === color.label.toLowerCase().split('-')[0]
                        ? "border-white ring-2 ring-primary-500"
                        : "border-transparent hover:border-white/50"
                      }`}
                    title={color.label}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                      }}
                    />
                    {formData.color === color.label.toLowerCase().split('-')[0] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <RiCheckboxCircleLine className="text-white drop-shadow-lg" size={20} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <RiCheckboxCircleLine className="text-green-400" size={18} />
            </div>
            Toolbar Item Status
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
                  {formData.visible ? "Visible in Navigation" : "Hidden from Navigation"}
                </span>
                <span className="text-xs text-muted-dark">
                  {formData.visible ? "Button will be displayed" : "Button will be hidden"}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border-dark">
          <div className="text-sm text-muted-dark">
            {item ? "Editing toolbar item" : "Creating new toolbar item"}
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
              {item ? "Update Item" : "Create Item"}
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
