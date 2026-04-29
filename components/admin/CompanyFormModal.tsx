"use client";

import { useState } from "react";
import {
  RiCloseLine,
  RiAddLine,
  RiDeleteBinLine,
  RiImageLine,
  RiBuildingLine,
  RiFileTextLine,
  RiGlobalLine,
  RiPaletteLine,
  RiCheckboxCircleLine,
  RiImageAddLine,
  RiStackLine,
  RiListOrdered,
  RiBriefcaseLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLink,
  RiUploadCloudLine,
  RiPictureInPictureLine,
  RiFlagLine,
} from "react-icons/ri";
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

  const sectionCls = "space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-border-dark";
  const sectionHeaderCls = "flex items-center gap-2 text-sm font-semibold text-text-dark mb-4";
  const labelCls = "text-xs text-muted-dark uppercase tracking-wider mb-2 block flex items-center gap-1.5";

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
            {/* Company Identity Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <RiBuildingLine className="text-primary-400" size={18} />
                </div>
                Company Identity
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>
                    <RiBriefcaseLine size={14} />
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
                  <label className={labelCls}>
                    <RiLink size={14} />
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
                <div className="sm:col-span-2">
                  <label className={labelCls}>
                    <RiFileTextLine size={14} />
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
                <div className="sm:col-span-2">
                  <label className={labelCls}>
                    <RiFileTextLine size={14} />
                    Description *
                  </label>
                  <textarea
                    className={`${inputCls} min-h-[100px] resize-none`}
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what this company does..."
                  />
                </div>
              </div>
            </div>

            {/* Location & Year Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                  <RiGlobalLine className="text-secondary-400" size={18} />
                </div>
                Location & Establishment
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>
                    <RiBuildingLine size={14} />
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
                  <label className={labelCls}>
                    <RiFlagLine size={14} />
                    Flag Code *
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
                <div>
                  <label className={labelCls}>
                    <RiListOrdered size={14} />
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
              </div>
            </div>

            {/* Branding Section with Logo Preview */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <RiPaletteLine className="text-purple-400" size={18} />
                </div>
                Branding & Visual Identity
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Logo Preview Card */}
                <div className="lg:col-span-1">
                  <label className={labelCls}>
                    <RiImageLine size={14} />
                    Logo Preview
                  </label>
                  <div className="aspect-square rounded-xl bg-white/5 border border-border-dark overflow-hidden flex items-center justify-center relative group">
                    {formData.logo ? (
                      <img
                        src={formData.logo}
                        alt="Company Logo"
                        className="w-full h-full object-contain p-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${formData.color || "from-primary-500 to-secondary-400"} flex items-center justify-center mx-auto mb-2`}>
                          <span className="text-white text-2xl font-bold">
                            {formData.icon || formData.name?.charAt(0) || "?"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-dark">No logo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className={labelCls}>
                      <RiUploadCloudLine size={14} />
                      Logo URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className={inputCls}
                        value={formData.logo || ""}
                        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                        placeholder="https://example.com/logo.png"
                      />
                      {formData.logo && (
                        <button
                          onClick={() => setFormData({ ...formData, logo: "" })}
                          className="px-3 py-2 rounded-xl border border-border-dark text-muted-dark hover:text-red-400 hover:border-red-500/30 transition-all"
                        >
                          <RiDeleteBinLine size={18} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-dark mt-1">Paste an image URL to see preview</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>
                        <RiPaletteLine size={14} />
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
                      <label className={labelCls}>
                        <RiBuildingLine size={14} />
                        Icon (emoji/text)
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
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <RiCheckboxCircleLine className="text-green-400" size={18} />
                </div>
                Company Status
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.isMain || false}
                    onChange={(e) => setFormData({ ...formData, isMain: e.target.checked })}
                    className="w-5 h-5 rounded border-border-dark bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-dark block">Main Company</span>
                    <span className="text-xs text-muted-dark">Marvel Group headquarters</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all">
                  <input
                    type="checkbox"
                    checked={formData.isActive !== false}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-border-dark bg-white/5 text-primary-500 focus:ring-primary-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-dark block">Active</span>
                    <span className="text-xs text-muted-dark">Visible to public</span>
                  </div>
                </label>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border-dark">
                  <RiListOrdered size={18} className="text-muted-dark" />
                  <div>
                    <label className="text-sm font-medium text-text-dark block">Display Order</label>
                    <input
                      type="number"
                      className="w-20 bg-transparent text-sm text-text-dark focus:outline-none"
                      value={formData.order || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                      }
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <RiStackLine className="text-amber-400" size={18} />
                </div>
                Focus Areas
                <span className="ml-auto text-xs text-muted-dark font-normal">
                  {formData.focusAreas?.length || 0} areas
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-dark">Add key focus areas with icons and descriptions</p>
                <button
                  onClick={addFocusArea}
                  className="text-xs flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 hover:bg-primary-500/20 hover:border-primary-500/40 transition-all"
                >
                  <RiAddLine size={16} /> Add Focus Area
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

            {/* Gallery Section */}
            <div className={sectionCls}>
              <div className={sectionHeaderCls}>
                <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <RiImageAddLine className="text-pink-400" size={18} />
                </div>
                Work Gallery
                <span className="ml-auto text-xs text-muted-dark font-normal">
                  {formData.gallery?.length || 0} images
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-dark">Add showcase images with titles and categories</p>
                <button
                  onClick={addGalleryImage}
                  className="text-xs flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20 hover:border-pink-500/40 transition-all"
                >
                  <RiAddLine size={16} /> Add Image
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.gallery || []).map((img, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/30 transition-all group"
                  >
                    {/* Image Preview */}
                    <div className="aspect-video rounded-lg bg-black/20 mb-3 overflow-hidden relative">
                      {img.src ? (
                        <img
                          src={img.src}
                          alt={img.title || "Gallery image"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-dark">
                          <RiPictureInPictureLine size={32} className="mb-2 opacity-50" />
                          <span className="text-xs">Paste image URL to preview</span>
                        </div>
                      )}
                    </div>

                    {/* Inputs */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <RiLink size={14} className="text-muted-dark" />
                        <input
                          type="text"
                          className="flex-1 bg-transparent text-sm text-text-dark focus:outline-none placeholder:text-muted-dark"
                          placeholder="Image URL"
                          value={img.src}
                          onChange={(e) => updateGalleryImage(index, "src", e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <RiFileTextLine size={14} className="text-muted-dark" />
                        <input
                          type="text"
                          className="flex-1 bg-transparent text-sm text-text-dark focus:outline-none placeholder:text-muted-dark"
                          placeholder="Title"
                          value={img.title}
                          onChange={(e) => updateGalleryImage(index, "title", e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <RiPaletteLine size={14} className="text-muted-dark" />
                        <input
                          type="text"
                          className="flex-1 bg-transparent text-sm text-text-dark focus:outline-none placeholder:text-muted-dark"
                          placeholder="Category"
                          value={img.category}
                          onChange={(e) => updateGalleryImage(index, "category", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeGalleryImage(index)}
                      className="mt-3 w-full py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all text-xs flex items-center justify-center gap-1"
                    >
                      <RiDeleteBinLine size={14} /> Remove Image
                    </button>
                  </div>
                ))}
                {(formData.gallery || []).length === 0 && (
                  <div className="md:col-span-2 p-8 rounded-xl bg-white/5 border border-border-dark border-dashed text-center">
                    <RiImageAddLine size={48} className="mx-auto mb-3 text-muted-dark opacity-30" />
                    <p className="text-sm text-muted-dark">No gallery images added yet</p>
                    <p className="text-xs text-muted-dark mt-1">Add images to showcase the company&apos;s work</p>
                  </div>
                )}
              </div>
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
