"use client";
import { useState } from "react";
import { accreditations } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import { RiCloseLine, RiShieldCheckLine, RiAwardLine, RiArrowRightLine } from "react-icons/ri";

export default function AccreditationsSection() {
  const [selected, setSelected] = useState<typeof accreditations[0] | null>(null);

  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Accreditations"
          title="Globally Recognized. Locally Trusted."
          description="Our programs and services are accredited by the world's most prestigious healthcare education bodies."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {accreditations.map((acc, i) => (
            <button
              key={acc.shortName}
              onClick={() => setSelected(acc)}
              className="group text-left glass-light dark:glass-dark rounded-2xl p-6 hover-lift border border-border-light dark:border-border-dark hover:border-primary-500/40 transition-all duration-500 relative overflow-hidden"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Hover gradient */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${acc.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-500`} />

              {/* Top accent */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${acc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Badge */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${acc.color} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                <RiShieldCheckLine className="text-white" size={28} />
              </div>

              <div className={`text-2xl font-display font-bold bg-gradient-to-r ${acc.color} bg-clip-text text-transparent mb-1`}>
                {acc.shortName}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-light dark:text-muted-dark mb-3">
                <span className="text-secondary-500">{acc.flag}</span>
                {acc.country}
              </div>
              <p className="text-xs text-muted-light dark:text-muted-dark line-clamp-2 leading-relaxed">
                {acc.description}
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary-500 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                Learn more <RiArrowRightLine size={12} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-light dark:glass-dark rounded-2xl p-8 max-w-lg w-full border border-border-light dark:border-border-dark relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selected.color} rounded-t-2xl`} />

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-border-light dark:border-border-dark hover:border-primary-500/30"
            >
              <RiCloseLine size={18} />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center shadow-xl shrink-0`}>
                <RiAwardLine className="text-white" size={32} />
              </div>
              <div>
                <div className={`text-2xl font-display font-bold bg-gradient-to-r ${selected.color} bg-clip-text text-transparent mb-1`}>
                  {selected.shortName}
                </div>
                <h3 className="text-text-light dark:text-text-dark font-semibold text-lg">{selected.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-primary-500 dark:text-primary-400 mt-1">
                  <span>{selected.flag}</span>
                  {selected.country}
                </div>
              </div>
            </div>

            <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-6">{selected.description}</p>

            <div className="pt-6 border-t border-border-light dark:border-border-dark flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-light dark:text-muted-dark">
                <RiShieldCheckLine className="text-secondary-500" size={16} />
                <span>Verified Accreditation</span>
              </div>
              <div className="text-xs text-muted-light/60 dark:text-muted-dark/60">Marvel Group</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
