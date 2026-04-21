"use client";

import { featuredServices } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  RiAwardLine,
  RiPuzzleLine,
  RiLightbulbLine,
  RiShieldCheckLine,
  RiCpuLine,
  RiUserStarLine,
  RiArrowRightLine,
} from "react-icons/ri";

const iconMap: Record<string, React.ElementType> = {
  RiAwardLine,
  RiPuzzleLine,
  RiLightbulbLine,
  RiShieldCheckLine,
  RiCpuLine,
  RiUserStarLine,
};

export default function FeaturedServicesSection() {
  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Premium Offerings"
          title="Featured Services"
          description="Specialized solutions that set us apart in the healthcare communication landscape."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {featuredServices.map((service, i) => {
            const IconComponent = iconMap[service.icon] || RiAwardLine;

            return (
              <div
                key={service.id}
                className="group relative glass-light dark:glass-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover:border-primary-500/40 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-700`}
                />

                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary-500/20 text-secondary-500 dark:text-secondary-400 border border-secondary-500/30">
                      {service.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mb-5`}
                >
                  <IconComponent size={26} />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-text-light dark:text-text-dark mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm text-primary-500 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>Learn more</span>
                  <RiArrowRightLine size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
