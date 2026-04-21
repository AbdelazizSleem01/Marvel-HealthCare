"use client";

import { internalTools } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  RiWhatsappLine,
  RiTelegramLine,
  RiStethoscopeLine,
  RiSurveyLine,
  RiMapPinUserLine,
  RiSparklingLine,
} from "react-icons/ri";

const iconMap: Record<string, React.ElementType> = {
  RiWhatsappLine,
  RiTelegramLine,
  RiStethoscopeLine,
  RiSurveyLine,
  RiMapPinUserLine,
};

export default function InternalToolsSection() {
  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Innovation Lab"
          title="Internal Programs & Tools"
          description="Proprietary technology solutions we've built to transform healthcare operations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {internalTools.map((tool, i) => {
            const IconComponent = iconMap[tool.icon] || RiSparklingLine;

            return (
              <div
                key={tool.id}
                className="group glass-light dark:glass-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover:border-primary-500/40 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-15 rounded-full blur-2xl transition-all duration-500`}
                />

                {/* Platform Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark">
                    {tool.platform}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 mb-5`}
                >
                  <IconComponent size={26} />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-text-light dark:text-text-dark mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  {tool.description}
                </p>

                {/* Bottom accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            );
          })}
        </div>

        {/* Innovation Tag */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-light dark:glass-dark border border-primary-500/30">
            <RiSparklingLine className="text-secondary-500" size={18} />
            <span className="text-sm text-muted-light dark:text-muted-dark">
              Powered by <span className="text-primary-500 dark:text-primary-400 font-medium">AI</span> and{" "}
              <span className="text-secondary-500 dark:text-secondary-400 font-medium">Innovation</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
