"use client";
import { companies } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import { RiArrowRightLine } from "react-icons/ri";
import ReactCountryFlag from "react-country-flag";

export default function CompaniesSection() {
  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Our Portfolio"
          title="6 Companies. One Vision."
          description="A diverse group of specialized companies, each a leader in their domain, united by a commitment to advancing healthcare in the MENA region and beyond."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {companies.map((company, i) => (
            <CompanyCard key={company.id} company={company} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyCard({ company, index }: { company: typeof companies[0]; index: number }) {
  return (
    <div
      className="group relative glass-light dark:glass-dark rounded-2xl p-6 hover-lift cursor-pointer overflow-hidden border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-500"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Animated gradient background */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-15 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150`} />

      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${company.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Top row */}
      <div className="flex items-start justify-between mb-5 relative">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
          {company.icon}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="w-8 h-6 rounded overflow-hidden shadow-sm">
            <ReactCountryFlag
              countryCode={company.flag}
              svg
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <span className="text-xs font-mono text-muted-light dark:text-muted-dark bg-black/5 dark:bg-white/5 px-2 py-1 rounded">{company.year}</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display font-bold text-xl text-text-light dark:text-text-dark mb-1 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
        {company.name}
      </h3>
      <p className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${company.color} bg-clip-text text-transparent mb-3`}>
        {company.tagline}
      </p>
      <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed line-clamp-3">{company.description}</p>

      {/* Bottom */}
      <div className="mt-6 pt-4 border-t border-border-light/50 dark:border-border-dark/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
          <span className="text-xs text-muted-light dark:text-muted-dark">{company.country}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary-500 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          Explore <RiArrowRightLine size={14} />
        </div>
      </div>
    </div>
  );
}
