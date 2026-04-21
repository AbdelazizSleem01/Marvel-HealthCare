"use client";

import { useState } from "react";
import { detailedServices } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  RiGraduationCapLine,
  RiFileTextLine,
  RiComputerLine,
  RiPaletteLine,
  RiTeamLine,
  RiCodeBoxLine,
  RiMovieLine,
  RiCalendarEventLine,
  RiArrowRightLine,
  RiCheckLine,
} from "react-icons/ri";

const iconMap: Record<string, React.ElementType> = {
  RiGraduationCapLine,
  RiFileTextLine,
  RiComputerLine,
  RiPaletteLine,
  RiTeamLine,
  RiCodeBoxLine,
  RiMovieLine,
  RiCalendarEventLine,
};

export default function DetailedServicesSection() {
  const [activeService, setActiveService] = useState(detailedServices[0].id);

  const current = detailedServices.find((s) => s.id === activeService)!;
  const IconComponent = iconMap[current.icon] || RiGraduationCapLine;

  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="What We Do"
          title="Comprehensive Services"
          description="Deep expertise across the full spectrum of medical education and healthcare communication."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-16">
          {/* Category Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {detailedServices.map((service) => {
              const Icon = iconMap[service.icon] || RiGraduationCapLine;
              const isActive = service.id === activeService;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? "bg-primary-500/10 border border-primary-500/30"
                      : "glass-light dark:glass-dark border border-border-light dark:border-border-dark hover:border-primary-500/20"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shrink-0`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-semibold ${
                        isActive ? "text-text-light dark:text-text-dark" : "text-muted-light dark:text-muted-dark"
                      }`}
                    >
                      {service.name}
                    </h4>
                  </div>
                  <RiArrowRightLine
                    className={`shrink-0 transition-transform duration-300 ${
                      isActive
                        ? "text-primary-500 dark:text-primary-400 translate-x-0"
                        : "text-muted-light dark:text-muted-dark -translate-x-2 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Sub-services Grid */}
          <div className="lg:col-span-8">
            <div className="glass-light dark:glass-dark rounded-2xl p-6 md:p-8 border border-border-light dark:border-border-dark h-full">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <IconComponent size={26} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-text-light dark:text-text-dark">
                    {current.name}
                  </h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    {current.subServices.length} specialized services
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.subServices.map((sub, i) => (
                  <div
                    key={sub.name}
                    className="group p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark/50 hover:border-primary-500/30 transition-all duration-300"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <RiCheckLine className="text-secondary-500" size={14} />
                      </div>
                      <div>
                        <h5 className="font-medium text-text-light dark:text-text-dark text-sm mb-1 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                          {sub.name}
                        </h5>
                        {sub.description && (
                          <p className="text-xs text-muted-light dark:text-muted-dark leading-relaxed">
                            {sub.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
