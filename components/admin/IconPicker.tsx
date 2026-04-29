"use client";

import { useState } from "react";
import { 
  RiCloseLine, 
  RiSearchLine, 
  RiFilterLine,
  RiArrowDownSLine,
  RiCheckLine
} from "react-icons/ri";
import { iconComponents, availableIcons, IconDef } from "./iconData";

interface IconPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
}

export function IconPicker({ isOpen, onClose, onSelect }: IconPickerProps) {
  const [iconSearch, setIconSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const inputCls =
    "w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all";

  const categories = [
    "All",
    "Document",
    "Education",
    "Media",
    "Health",
    "User",
    "Business",
    "Chat",
    "Location",
    "Time",
    "Nature",
    "Shopping",
    "Weather",
    "Settings",
    "Social",
  ];

  const filteredIcons: IconDef[] = availableIcons.filter((icon: IconDef) => {
    const matchesSearch = iconSearch
      ? icon.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
        icon.category.toLowerCase().includes(iconSearch.toLowerCase())
      : true;
    
    const matchesCategory =
      selectedCategory === "All" || icon.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (iconName: string) => {
    onSelect(iconName);
    setIconSearch("");
    setSelectedCategory("All");
    setIsFilterOpen(false);
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setIconSearch("");
    setIsFilterOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-dark rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-border-dark flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 sticky top-0 glass-dark border-b border-border-dark p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-text-dark">
                Select Icon
              </h3>
              <p className="text-xs text-muted-dark mt-0.5">
                {filteredIcons.length} icons available
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
            >
              <RiCloseLine size={24} />
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex-shrink-0 p-4 border-b border-border-dark space-y-3">
          {/* Search Input with Filter Button */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <RiSearchLine
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-dark"
                size={18}
              />
              <input
                type="text"
                className={`${inputCls} pl-10`}
                placeholder="Search icons..."
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-4 rounded-xl border transition-all flex items-center gap-2 ${
                selectedCategory !== "All" || isFilterOpen
                  ? "bg-primary-500/20 border-primary-500/50 text-primary-400"
                  : "border-border-dark text-muted-dark hover:border-primary-500/30"
              }`}
            >
              <RiFilterLine size={18} />
              <span className="text-sm hidden sm:inline">
                {selectedCategory !== "All" ? selectedCategory : "Filter"}
              </span>
              <RiArrowDownSLine 
                size={18} 
                className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Active Filter Badge */}
          {selectedCategory !== "All" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-dark">Active filter:</span>
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-xs px-2 py-1 rounded-full bg-primary-500/20 border border-primary-500/50 text-primary-400 flex items-center gap-1"
              >
                {selectedCategory}
                <RiCloseLine size={14} />
              </button>
            </div>
          )}

          {/* Dropdown Categories */}
          {isFilterOpen && (
            <div className="absolute z-20 mt-2 w-full max-w-sm bg-bg-dark rounded-xl border border-border-dark overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 max-h-64 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`text-sm px-3 py-2 rounded-lg transition-all flex items-center justify-between group ${
                        selectedCategory === cat
                          ? "bg-primary-500/20 text-primary-400"
                          : "text-text-dark hover:bg-white/5"
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <RiCheckLine size={16} className="text-primary-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Icons Grid */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 auto-rows-min">
              {filteredIcons.map((icon: IconDef) => {
                const IconComponent = iconComponents[icon.name];
                return (
                  <button
                    key={icon.name}
                    onClick={() => handleSelect(icon.name)}
                    className="group flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 border border-border-dark hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                    title={`${icon.name} (${icon.category})`}
                  >
                    <span className="text-lg text-text-dark group-hover:text-primary-400 transition-colors">
                      {IconComponent ? <IconComponent size={20} /> : <span>?</span>}
                    </span>
                    <span className="text-[9px] text-muted-dark text-center truncate w-full px-0.5">
                      {icon.name.replace("Ri", "").replace("Line", "")}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center text-muted-dark">
              <RiSearchLine size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No icons found matching &quot;{iconSearch}&quot;</p>
              <button
                onClick={() => {
                  setIconSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-3 text-xs text-primary-400 hover:text-primary-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}