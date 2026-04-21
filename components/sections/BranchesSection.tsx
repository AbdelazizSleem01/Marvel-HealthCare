"use client";
import { branches } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import { RiMapPin2Line, RiPhoneLine, RiBuilding2Line } from "react-icons/ri";
import ReactCountryFlag from "react-country-flag";

export default function BranchesSection() {
  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Global Presence"
          title="Three Countries. One Standard of Excellence."
          description="Strategically positioned across the MENA region to serve the world's fastest-growing healthcare markets."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {branches.map((branch, i) => (
            <div
              key={branch.country}
              className="group relative glass-light dark:glass-dark rounded-2xl overflow-hidden hover-lift"
            >
              {/* Header */}
              <div className="relative p-8 pb-0">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-10 rounded overflow-hidden shadow-lg">
                    <ReactCountryFlag
                      countryCode={branch.flag}
                      svg
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-light dark:text-muted-dark bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                    Since {branch.established}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-text-light dark:text-text-dark">{branch.companyName}</h3>
                <p className="text-primary-500 dark:text-primary-400 font-medium mt-1">{branch.country}</p>
                <p className="text-muted-light dark:text-muted-dark text-sm mt-1">{branch.city}</p>
              </div>

              {/* Details */}
              <div className="p-8 pt-6 space-y-4">
                <div className="flex items-start gap-3 text-sm text-muted-light dark:text-muted-dark">
                  <RiMapPin2Line className="text-primary-500 dark:text-primary-400 mt-0.5 shrink-0" size={16} />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-light dark:text-muted-dark">
                  <RiPhoneLine className="text-secondary-500 dark:text-secondary-400 shrink-0" size={16} />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-light dark:text-muted-dark">
                  <RiBuilding2Line className="text-secondary-500 dark:text-secondary-400 shrink-0" size={16} />
                  <span>Full-service office</span>
                </div>
              </div>

              {/* Bottom gradient bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Animated corner */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-primary-500/20 group-hover:border-primary-500/60 rounded-bl-3xl transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mt-12 glass-light dark:glass-dark rounded-2xl p-8 flex items-center justify-center min-h-[200px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5" />
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-10 rounded overflow-hidden shadow-lg">
                  <ReactCountryFlag countryCode="EG" svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="text-xs text-text-light dark:text-text-dark font-medium">Marvel</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-10 rounded overflow-hidden shadow-lg">
                  <ReactCountryFlag countryCode="SA" svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="text-xs text-text-light dark:text-text-dark font-medium">Med-Add</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-10 rounded overflow-hidden shadow-lg">
                  <ReactCountryFlag countryCode="AE" svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span className="text-xs text-text-light dark:text-text-dark font-medium">Bait Al Ebdaa</span>
              </div>
            </div>
            <p className="text-muted-light dark:text-muted-dark text-sm">Operating across MENA region</p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-light/60 dark:text-muted-dark/60 mt-2">
              <span className="text-secondary-500">Egypt</span>
              <span>•</span>
              <span className="text-primary-500 dark:text-primary-400">Saudi Arabia</span>
              <span>•</span>
              <span className="text-secondary-500">UAE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
