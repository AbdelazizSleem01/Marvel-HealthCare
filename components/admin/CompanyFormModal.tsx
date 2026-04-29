"use client";

import { useState } from "react";
import { RiCloseLine, RiAddLine, RiDeleteBinLine, RiImageLine } from "react-icons/ri";
import { Company, FocusArea, GalleryImage } from "@/stores/adminStore";
import { IconPicker } from "./IconPicker";
import { iconComponents } from "./iconData";

interface CompanyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  editingCompany: Company | null;
  formData: Partial<Company>;
  setFormData: (data: Partial<Company>) => void;
  isLoading: boolean;
}

export function CompanyFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingCompany,
  formData,
  setFormData,
  isLoading,
}: CompanyFormModalProps) {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedFocusAreaIndex, setSelectedFocusAreaIndex] = useState<number | null>(null);

  const inputCls =
    "w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all";

  const addFocusArea = () => {
    setFormData({
      ...formData,
      focusAreas: [...(formData.focusAreas || []), { icon: "", label: "", description: "" }],
    });
  };

  const updateFocusArea = (index: number, field: keyof FocusArea, value: string) => {
    const updated = [...(formData.focusAreas || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, focusAreas: updated });
  };

  const removeFocusArea = (index: number) => {
    const updated = (formData.focusAreas || []).filter((_, i) => i !== index);
    setFormData({ ...formData, focusAreas: updated });
  };

  const addGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: [...(formData.gallery || []), { src: "", title: "", category: "" }],
    });
  };

  const updateGalleryImage = (index: number, field: keyof GalleryImage, value: string) => {
    const updated = [...(formData.gallery || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, gallery: updated });
  };

  const removeGalleryImage = (index: number) => {
    const updated = (formData.gallery || []).filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: updated });
  };

  const openIconPicker = (index: number) => {
    setSelectedFocusAreaIndex(index);
    setShowIconPicker(true);
  };

  const selectIcon = (iconName: string) => {
    if (selectedFocusAreaIndex !== null) {
      updateFocusArea(selectedFocusAreaIndex, "icon", iconName);
    }
    setShowIconPicker(false);
    setSelectedFocusAreaIndex(null);
  };

  const isValid =
    formData.name &&
    formData.slug &&
    formData.tagline &&
    formData.year &&
    formData.country &&
    formData.flag &&
    formData.description;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="glass-dark rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-auto border border-border-dark">
          {/* Header */}
          <div className="sticky top-0 glass-dark border-b border-border-dark p-6 flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-text-dark">
              {editingCompany ? "Edit Company" : "Add New Company"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
            >
              <RiCloseLine size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Company Name *
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Marvel Group"
                />
              </div>
              <div>
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Slug * (unique identifier)
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.slug || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  placeholder="e.g., marvel-group"
                />
              </div>
              <div>
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Tagline *
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.tagline || ""}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g., Where Medicine Meets Mastery"
                />
              </div>
              <div>
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Year Established *
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.year || ""}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g., 2013"
                />
              </div>
              <div>
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Country *
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.country || ""}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g., Egypt"
                />
              </div>
              <div>
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Country Flag Code *
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.flag || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, flag: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g., EG, AE, SA"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                Description *
              </label>
              <textarea
                className={`${inputCls} min-h-[100px] resize-none`}
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Company description..."
              />
            </div>

            {/* Color & Logo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Gradient Color
                </label>
                <select
                  className={inputCls}
                  value={formData.color || "from-primary-500 to-secondary-400"}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
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
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Logo URL
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.logo || ""}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="/images/logo.png"
                />
              </div>
              <div>
                <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                  Icon (emoji or text)
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={formData.icon || ""}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="✦ or M"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isMain || false}
                  onChange={(e) => setFormData({ ...formData, isMain: e.target.checked })}
                  className="w-4 h-4 rounded border-border-dark bg-white/5 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-text-dark">Main Company (Marvel Group)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-border-dark bg-white/5 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-text-dark">Active</span>
              </label>
            </div>

            {/* Focus Areas */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-muted-dark uppercase tracking-wider">
                  Focus Areas
                </label>
                <button
                  onClick={addFocusArea}
                  className="text-xs flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-all"
                >
                  <RiAddLine size={14} /> Add Focus Area
                </button>
              </div>
              <div className="space-y-3">
                {(formData.focusAreas || []).map((area, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-border-dark"
                  >
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
                        onChange={(e) => updateFocusArea(index, "label", e.target.value)}
                      />
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="Short description"
                        value={area.description}
                        onChange={(e) => updateFocusArea(index, "description", e.target.value)}
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
                {(formData.focusAreas || []).length === 0 && (
                  <p className="text-sm text-muted-dark italic">No focus areas added yet.</p>
                )}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-muted-dark uppercase tracking-wider">
                  Work Gallery
                </label>
                <button
                  onClick={addGalleryImage}
                  className="text-xs flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-all"
                >
                  <RiAddLine size={14} /> Add Image
                </button>
              </div>
              <div className="space-y-3">
                {(formData.gallery || []).map((img, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-border-dark"
                  >
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="Image URL"
                        value={img.src}
                        onChange={(e) => updateGalleryImage(index, "src", e.target.value)}
                      />
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="Title"
                        value={img.title}
                        onChange={(e) => updateGalleryImage(index, "title", e.target.value)}
                      />
                      <input
                        type="text"
                        className={inputCls}
                        placeholder="Category"
                        value={img.category}
                        onChange={(e) => updateGalleryImage(index, "category", e.target.value)}
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
                {(formData.gallery || []).length === 0 && (
                  <p className="text-sm text-muted-dark italic">No gallery images added yet.</p>
                )}
              </div>
            </div>

            {/* Order */}
            <div>
              <label className="text-xs text-muted-dark uppercase tracking-wider mb-2 block">
                Display Order
              </label>
              <input
                type="number"
                className={inputCls}
                value={formData.order || 0}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
                placeholder="0"
                min="0"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-dark">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-border-dark text-muted-dark hover:text-text-dark transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!isValid || isLoading}
                className="px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all"
              >
                {isLoading
                  ? "Loading..."
                  : editingCompany
                  ? "Update Company"
                  : "Create Company"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Picker */}
      <IconPicker
        isOpen={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        onSelect={selectIcon}
      />
    </>
  );
}
