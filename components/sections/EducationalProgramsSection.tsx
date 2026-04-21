"use client";

import { educationalPrograms } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  RiToolsLine,
  RiVideoLine,
  RiMailLine,
  RiUserFollowLine,
  RiBriefcaseLine,
  RiCheckLine,
} from "react-icons/ri";

const iconMap: Record<string, React.ElementType> = {
  RiToolsLine,
  RiVideoLine,
  RiMailLine,
  RiUserFollowLine,
  RiBriefcaseLine,
};

export default function EducationalProgramsSection() {
  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Learning Formats"
          title="Educational Programs"
          description="Multiple formats to deliver medical education that fits every learning style and schedule."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {educationalPrograms.map((program, i) => {
            const IconComponent = iconMap[program.icon] || RiToolsLine;

            return (
              <div
                key={program.id}
                className="group glass-light dark:glass-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover:border-primary-500/40 transition-all duration-500"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mb-5">
                  <IconComponent size={26} />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-text-light dark:text-text-dark mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {program.name}
                </h3>
                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-5">
                  {program.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {program.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-muted-light dark:text-muted-dark"
                    >
                      <div className="w-5 h-5 rounded-full bg-secondary-500/20 flex items-center justify-center shrink-0">
                        <RiCheckLine className="text-secondary-500" size={12} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent */}
                <div className="mt-6 pt-4 border-t border-border-light/50 dark:border-border-dark/50">
                  <div className="flex items-center gap-2 text-xs text-primary-500 dark:text-primary-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                    <span>CME Accredited</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
