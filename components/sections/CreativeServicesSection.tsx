"use client";

import { useState } from "react";
import { creativeLetters } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiDraftLine,
  RiFileTextLine,
  RiAwardLine,
  RiBookLine,
  RiTeamLine,
  RiArticleLine,
  RiComputerLine,
  RiDatabaseLine,
  RiRefreshLine,
  RiPaletteLine,
  RiPrinterLine,
  RiBox3Line,
  RiPresentationLine,
  RiVideoLine,
  RiUserStarLine,
  RiSmartphoneLine,
  RiCustomerServiceLine,
  RiBarChartLine,
  RiMovieLine,
  RiGlassesLine,
  RiBrushLine,
  RiLiveLine,
  RiStackLine,
  RiSurveyLine,
} from "react-icons/ri";

const iconMap: Record<string, React.ElementType> = {
  RiDraftLine,
  RiFileTextLine,
  RiAwardLine,
  RiBookLine,
  RiTeamLine,
  RiArticleLine,
  RiComputerLine,
  RiDatabaseLine,
  RiRefreshLine,
  RiPaletteLine,
  RiPrinterLine,
  RiBox3Line,
  RiPresentationLine,
  RiVideoLine,
  RiUserStarLine,
  RiSmartphoneLine,
  RiCustomerServiceLine,
  RiBarChartLine,
  RiMovieLine,
  RiGlassesLine,
  RiBrushLine,
  RiLiveLine,
  RiStackLine,
  RiSurveyLine,
};

export default function CreativeServicesSection() {
  const [activeLetter, setActiveLetter] = useState(0);

  const current = creativeLetters[activeLetter];

  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Our Approach"
          title="CREATIVE"
          description="Each letter represents a core capability that drives our healthcare innovation."
        />

        {/* Letters Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-12 mb-12">
          {creativeLetters.map((item, index) => (
            <button
              key={`${item.letter}-${index}`}
              onClick={() => setActiveLetter(index)}
              className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl font-display font-bold text-2xl md:text-3xl transition-all duration-300 ${
                index === activeLetter
                  ? "bg-primary-500 text-white shadow-glow-primary scale-110"
                  : "glass-light dark:glass-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark border border-border-light dark:border-border-dark hover:border-primary-500/30"
              }`}
            >
              {item.letter}
              {index === activeLetter && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-2 left-7 -translate-x-1/2 w-2 h-2 bg-secondary-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLetter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-light dark:glass-dark rounded-3xl p-8 md:p-12 border border-border-light dark:border-border-dark relative overflow-hidden">
              {/* Background gradient */}
              <div
                className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${current.color} opacity-5 rounded-full blur-3xl`}
              />

              {/* Letter Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center text-white font-display font-bold text-3xl shadow-lg`}
                >
                  {current.letter}
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-text-light dark:text-text-dark">
                    {current.category}
                  </h3>
                  <p className="text-sm text-primary-500 dark:text-primary-400">
                    {current.description}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {current.services.map((service, i) => {
                  const IconComponent = iconMap[service.icon] || RiAwardLine;
                  return (
                    <div
                      key={service.name}
                      className="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark/50 text-center group hover:border-primary-500/30 transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${current.color} flex items-center justify-center text-white shadow-md mx-auto mb-3 group-hover:shadow-lg transition-shadow`}
                      >
                        <IconComponent size={20} />
                      </div>
                      <span className="text-sm text-muted-light dark:text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">
                        {service.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
