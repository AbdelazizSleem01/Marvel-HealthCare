"use client";

import { useState } from "react";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import { iconComponents, availableIcons, IconDef } from "./iconData";

interface IconPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
}

export function IconPicker({ isOpen, onClose, onSelect }: IconPickerProps) {
  const [iconSearch, setIconSearch] = useState("");

  const inputCls =
    "w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 transition-all";

  const filteredIcons: IconDef[] = iconSearch
    ? availableIcons.filter(
        (icon: IconDef) =>
          icon.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
          icon.category.toLowerCase().includes(iconSearch.toLowerCase())
      )
    : availableIcons;

  const handleSelect = (iconName: string) => {
    onSelect(iconName);
    setIconSearch("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-dark rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-border-dark">
        {/* Header */}
        <div className="sticky top-0 glass-dark border-b border-border-dark p-5 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-text-dark">Select Icon</h3>
            <p className="text-xs text-muted-dark mt-0.5">{filteredIcons.length} icons available</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-muted-dark hover:text-text-dark transition-all"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border-dark">
          <div className="relative">
            <RiSearchLine
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-dark"
              size={18}
            />
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
            {[
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
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setIconSearch(cat === "All" ? "" : cat)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                  iconSearch === cat || (cat === "All" && !iconSearch)
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
                  <span className="text-[9px] text-muted-dark text-center truncate w-full">
                    {icon.name.replace("Ri", "").replace("Line", "")}
                  </span>
                </button>
              );
            })}
          </div>
          {filteredIcons.length === 0 && (
            <div className="text-center py-8 text-muted-dark">
              <RiSearchLine size={32} className="mx-auto mb-2 opacity-30" />
              <p>No icons found matching &quot;{iconSearch}&quot;</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 glass-dark border-t border-border-dark p-4 flex items-center justify-between">
          <span className="text-xs text-muted-dark">Click an icon to select it</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
