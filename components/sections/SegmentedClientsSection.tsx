"use client";

import { useState } from "react";
import { segmentedClients } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import { RiBuildingLine, RiServerLine, RiTeamLine } from "react-icons/ri";
import ReactCountryFlag from "react-country-flag";

const categoryConfig = {
  pharma: { label: "Pharma Companies", icon: RiBuildingLine, key: "pharma" as const, count: segmentedClients.pharma.length },
  vendors: { label: "Vendors", icon: RiServerLine, key: "vendors" as const, count: segmentedClients.vendors.length },
  societies: { label: "Medical Societies", icon: RiTeamLine, key: "societies" as const, count: segmentedClients.societies.length },
};

type CategoryKey = keyof typeof categoryConfig;

export default function SegmentedClientsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("pharma");

  const currentClients = segmentedClients[categoryConfig[activeCategory].key];
  const config = categoryConfig[activeCategory];
  const IconComponent = config.icon;

  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Our Network"
          title="Trusted By Industry Leaders"
          description="A diverse ecosystem of pharmaceutical companies, technology vendors, and medical societies."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-10">
          {(Object.keys(categoryConfig) as CategoryKey[]).map((key) => {
            const Icon = categoryConfig[key].icon;
            const isActive = key === activeCategory;

            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary-500 text-white shadow-glow-primary"
                    : "glass-light dark:glass-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark border border-border-light dark:border-border-dark hover:border-primary-500/30"
                }`}
              >
                <Icon size={16} />
                {categoryConfig[key].label}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-white/5"
                  }`}
                >
                  {categoryConfig[key].count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clients Grid */}
        <div className="glass-light dark:glass-dark rounded-2xl p-6 md:p-8 border border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
              <IconComponent size={20} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-text-light dark:text-text-dark">
                {config.label}
              </h3>
              <p className="text-xs text-muted-light dark:text-muted-dark">
                {config.count} partners across Egypt, KSA, and globally
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentClients.map((client: typeof currentClients[0], i: number) => (
              <div
                key={client.id}
                className="group flex items-center gap-2 p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark/50 hover:border-primary-500/30 transition-all duration-300"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-6 h-6 rounded-lg shrink-0 shadow-sm">
                  <ReactCountryFlag
                    countryCode={client.flag}
                    svg
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <span className="text-sm text-muted-light dark:text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark transition-colors truncate">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-10 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...currentClients, ...currentClients].map((client, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 text-xs text-muted-light/40 dark:text-muted-dark/40"
              >
                <span className="w-5 h-5 rounded-md shrink-0 opacity-60">
                  <ReactCountryFlag
                    countryCode={client.flag}
                    svg
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </span>
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
