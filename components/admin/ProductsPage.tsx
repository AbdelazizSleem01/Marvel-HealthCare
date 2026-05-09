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
  RiStackLine,
  RiDragMove2Line,
  RiBuildingLine,
  RiPaletteLine,
  RiCheckboxCircleLine,
  RiFileTextLine,
  RiImageLine,
  RiLink,
  RiGlobalLine,
  RiCheckLine,
  RiCheckboxBlankCircleLine,
  RiCloseCircleLine,
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

interface Product {
  id: string;
  title: string;
  icon: string;
  badge: string;
  badgeColor: string;
  color: string;
  description: string;
  notes: string;
  features: { name: string; desc: string }[];
  link: { label: string; url: string; visible: boolean };
  visible: boolean;
  showInToolbar?: boolean;
  toolbarId?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/site-products");
      const data = await response.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire("Error", "Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (product: Product) => {
    try {
      const response = await fetch("/api/site-products", {
        method: product.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire(
          "Success",
          product.id ? "Product updated successfully" : "Product created successfully",
          "success"
        );
        fetchProducts();
        setEditingProduct(null);
        setIsCreating(false);
      } else {
        Swal.fire("Error", data.error || "Failed to save product", "error");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      Swal.fire("Error", "Failed to save product", "error");
    }
  };

  const deleteProduct = async (id: string) => {
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
        const response = await fetch(`/api/site-products?id=${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          fetchProducts();
        } else {
          Swal.fire("Error", "Failed to delete product", "error");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  const toggleVisibility = async (product: Product) => {
    try {
      const response = await fetch("/api/site-products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, visible: !product.visible }),
      });
      
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const handleDragStart = (e: React.DragEvent, productId: string) => {
    setDraggedItem(productId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, targetProduct: Product) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetProduct.id) return;

    const newProducts = [...products];
    const draggedIndex = newProducts.findIndex(p => p.id === draggedItem);
    const targetIndex = newProducts.findIndex(p => p.id === targetProduct.id);
    
    const [draggedProduct] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, draggedProduct);
    
    setProducts(newProducts);
    setDraggedItem(null);
  };

  if (loading) {
    return (
      <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
        Loading products...
      </div>
    );
  }

  const totalItems = products.length;
  const visibleItems = products.filter((p) => p.visible).length;
  const hiddenItems = totalItems - visibleItems;
  const totalFeatures = products.reduce((acc, p) => acc + (p.features?.length || 0), 0);

  const stats = [
    { label: "Total Products", value: totalItems, icon: RiStackLine, color: "from-primary-500 to-secondary-500" },
    { label: "Visible", value: visibleItems, icon: RiEyeLine, color: "from-green-500 to-emerald-500" },
    { label: "Hidden", value: hiddenItems, icon: RiEyeOffLine, color: "from-orange-500 to-red-500" },
    { label: "Total Features", value: totalFeatures, icon: RiDragMove2Line, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-text-dark">Products Management</h2>
          <p className="text-sm text-muted-dark mt-1">Manage your healthcare products and offerings</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchProducts()}
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
            Add Product
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

      {/* Products List */}
      {products.length === 0 ? (
        <div className="glass-dark rounded-2xl p-12 border border-border-dark text-center text-muted-dark">
          <RiStackLine size={48} className="mx-auto mb-4 opacity-30" />
          <p>No products yet. Add your first product to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={glassCardCls}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color || "from-primary-500 to-secondary-500"} flex items-center justify-center text-white`}>
                  {product.icon && iconComponents[product.icon] ? (
                    (() => {
                      const IconComp = iconComponents[product.icon];
                      return <IconComp size={28} className="text-white" />;
                    })()
                  ) : (
                    <RiStackLine size={28} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-text-dark truncate">{product.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${product.visible ? "bg-green-500/15 border-green-500/30 text-green-400" : "bg-red-500/15 border-red-500/30 text-red-400"}`}>
                      {product.visible ? "Visible" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-dark">
                    {product.features?.length || 0} features • {product.badge}
                    {product.showInToolbar && (
                      <span className="ml-2 text-xs text-primary-400">• In Toolbar</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleVisibility(product)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-primary-400 transition-all"
                    title={product.visible ? "Hide" : "Show"}
                  >
                    {product.visible ? <RiEyeLine size={18} /> : <RiEyeOffLine size={18} />}
                  </button>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-primary-400 transition-all"
                    title="Edit"
                  >
                    <RiEditLine size={18} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
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
          {(isCreating || editingProduct) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => {
                setIsCreating(false);
                setEditingProduct(null);
              }}
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
                    {isCreating ? "Create New Product" : "Edit Product"}
                  </h2>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProduct(null);
                    }}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
                    title="Close"
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border-dark scrollbar-track-transparent hover:scrollbar-thumb-primary-500/30 p-6">
                  <ProductForm
                    product={editingProduct}
                    onSave={saveProduct}
                    onCancel={() => {
                      setIsCreating(false);
                      setEditingProduct(null);
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

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: "",
      title: "",
      icon: "RiStackLine",
      badge: "LIVE",
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-primary-500 to-secondary-400",
      description: "",
      notes: "",
      features: [{ name: "", desc: "" }],
      link: { label: "", url: "", visible: true },
      visible: true,
      showInToolbar: false,
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
      id: product?.id || Date.now().toString(),
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { name: "", desc: "" }],
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, field: "name" | "desc", value: string) => {
    setFormData({
      ...formData,
      features: formData.features.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      ),
    });
  };

  // Gradient colors like Companies form
  const gradientColors = [
    { value: "from-primary-500 to-secondary-400", from: "#127A8A", to: "#E1B15E", label: "Primary" },
    { value: "from-primary-500 to-primary-600", from: "#127A8A", to: "#0d5c6b", label: "Teal Dark" },
    { value: "from-secondary-400 to-secondary-600", from: "#E1B15E", to: "#c99a4e", label: "Gold" },
    { value: "from-blue-500 to-cyan-500", from: "#3b82f6", to: "#06b6d4", label: "Cyan" },
    { value: "from-purple-500 to-pink-500", from: "#a855f7", to: "#ec4899", label: "Pink" },
    { value: "from-green-500 to-emerald-500", from: "#22c55e", to: "#10b981", label: "Green" },
    { value: "from-amber-500 to-orange-500", from: "#f59e0b", to: "#f97316", label: "Orange" },
    { value: "from-red-500 to-rose-500", from: "#ef4444", to: "#f43f5e", label: "Red" },
  ];

  // Badge colors
  const badgeColors = [
    { value: "bg-green-500/10 text-green-500 border-green-500/30", label: "Green", bg: "#22c55e" },
    { value: "bg-blue-500/10 text-blue-500 border-blue-500/30", label: "Blue", bg: "#3b82f6" },
    { value: "bg-orange-500/10 text-orange-500 border-orange-500/30", label: "Orange", bg: "#f97316" },
    { value: "bg-purple-500/10 text-purple-500 border-purple-500/30", label: "Purple", bg: "#a855f7" },
    { value: "bg-red-500/10 text-red-500 border-red-500/30", label: "Red", bg: "#ef4444" },
    { value: "bg-amber-500/10 text-amber-500 border-amber-500/30", label: "Amber", bg: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Identity Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <RiBuildingLine className="text-primary-400" size={18} />
            </div>
            Product Identity
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <RiFileTextLine size={14} />
                Product Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputCls}
                placeholder="e.g., Medical Equipment"
                required
              />
            </div>

            {/* Icon Picker */}
            <div>
              <label className={labelCls}>
                <RiImageLine size={14} />
                Product Icon
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

        {/* Badge & Color Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <RiPaletteLine className="text-purple-400" size={18} />
            </div>
            Badge & Color Theme
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>
                <RiCheckLine size={14} />
                Badge Text *
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className={inputCls}
                placeholder="e.g., LIVE, BETA, NEW"
                required
              />
            </div>

            <div>
              <label className={labelCls}>
                <RiPaletteLine size={14} />
                Badge Color
              </label>
              <div className="flex flex-wrap gap-2">
                {badgeColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, badgeColor: color.value })}
                    className={`group relative w-10 h-10 rounded-xl border-2 transition-all overflow-hidden ${formData.badgeColor === color.value
                        ? "border-white ring-2 ring-primary-500"
                        : "border-transparent hover:border-white/50"
                      }`}
                    title={color.label}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: color.bg }}
                    />
                    {formData.badgeColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <RiCheckLine className="text-white drop-shadow-lg" size={16} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelCls}>
                <RiPaletteLine size={14} />
                Gradient Color Theme
              </label>
              <div className="flex flex-wrap gap-2">
                {gradientColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    className={`group relative w-12 h-12 rounded-xl border-2 transition-all overflow-hidden ${formData.color === color.value
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
                    {formData.color === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <RiCheckLine className="text-white drop-shadow-lg" size={20} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center">
              <RiFileTextLine className="text-secondary-400" size={18} />
            </div>
            Description & Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <RiFileTextLine size={14} />
                Product Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`${inputCls} min-h-[100px] resize-none`}
                placeholder="Describe your product in detail..."
                required
              />
            </div>

            <div>
              <label className={labelCls}>
                <RiFileTextLine size={14} />
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={`${inputCls} min-h-[100px] resize-none`}
                placeholder="Any extra information..."
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <RiStackLine className="text-amber-400" size={18} />
            </div>
            Product Features
            <span className="ml-auto text-xs text-muted-dark font-normal">
              {formData.features?.length || 0} features
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-dark">Add key features of your product</p>
            <button
              type="button"
              onClick={addFeature}
              className="text-xs flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 hover:bg-primary-500/20 hover:border-primary-500/40 transition-all"
            >
              <RiAddLine size={16} /> Add Feature
            </button>
          </div>

          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5 border border-border-dark">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={feature.name}
                    onChange={(e) => updateFeature(index, "name", e.target.value)}
                    placeholder="Feature name"
                    className={inputCls}
                    required
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={feature.desc}
                      onChange={(e) => updateFeature(index, "desc", e.target.value)}
                      placeholder="Feature description"
                      className={`${inputCls} flex-1`}
                      required
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-3 rounded-lg hover:bg-red-500/10 text-muted-dark hover:text-red-400 transition-all"
                        title="Remove feature"
                      >
                        <RiDeleteBinLine size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link Section */}
        <div className={sectionCls}>
          <div className={sectionHeaderCls}>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <RiLink className="text-blue-400" size={18} />
            </div>
            Link Settings
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>
                <RiFileTextLine size={14} />
                Link Label
              </label>
              <input
                type="text"
                value={formData.link.label}
                onChange={(e) => setFormData({ ...formData, link: { ...formData.link, label: e.target.value } })}
                className={inputCls}
                placeholder="e.g., Learn More"
              />
            </div>

            <div>
              <label className={labelCls}>
                <RiGlobalLine size={14} />
                Link URL
              </label>
              <input
                type="url"
                value={formData.link.url}
                onChange={(e) => setFormData({ ...formData, link: { ...formData.link, url: e.target.value } })}
                className={inputCls}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className={labelCls}>
                <RiEyeLine size={14} />
                Link Visibility
              </label>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="linkVisible"
                    checked={formData.link.visible === true}
                    onChange={() => setFormData({ ...formData, link: { ...formData.link, visible: true } })}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm text-text-dark">Visible</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="linkVisible"
                    checked={formData.link.visible === false}
                    onChange={() => setFormData({ ...formData, link: { ...formData.link, visible: false } })}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-sm text-text-dark">Hidden</span>
                </label>
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
            Product Status
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
                  {formData.visible ? "Visible on Website" : "Hidden from Website"}
                </span>
                <span className="text-xs text-muted-dark">
                  {formData.visible ? "Product will be displayed" : "Product will be hidden"}
                </span>
              </div>
            </label>

            {/* Show in Toolbar Toggle */}
            <label className={`relative flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all ${
              formData.showInToolbar
                ? "bg-gradient-to-br from-primary-500/20 to-secondary-500/10 border-primary-500/50"
                : "bg-white/5 border-border-dark hover:border-primary-500/30"
            }`}>
              <input
                type="checkbox"
                checked={formData.showInToolbar || false}
                onChange={(e) => setFormData({ ...formData, showInToolbar: e.target.checked })}
                className="sr-only"
              />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                formData.showInToolbar ? "bg-primary-500/20" : "bg-muted-dark/10"
              }`}>
                <RiLink className={formData.showInToolbar ? "text-primary-400" : "text-muted-dark"} size={24} />
              </div>
              <div className="flex-1">
                <span className={`text-sm font-semibold block ${formData.showInToolbar ? "text-primary-400" : "text-text-dark"}`}>
                  {formData.showInToolbar ? "In Toolbar" : "Not in Toolbar"}
                </span>
                <span className="text-xs text-muted-dark">
                  {formData.showInToolbar ? "Linked to navigation" : "Add to top navigation"}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border-dark">
          <div className="text-sm text-muted-dark">
            {product ? "Editing existing product" : "Creating new product"}
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
              {product ? "Update Product" : "Create Product"}
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