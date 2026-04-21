"use client";
import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { RiBuildingLine, RiServerLine, RiTeamLine } from "react-icons/ri";
import ReactCountryFlag from "react-country-flag";

const partnerCategories = [
  {
    id: "pharma",
    label: "Pharma Companies",
    count: "100+",
    icon: RiBuildingLine,
    partners: [
      { name: "Novartis", country: "CH" },
      { name: "Pfizer", country: "US" },
      { name: "AstraZeneca", country: "GB" },
      { name: "Sanofi", country: "FR" },
      { name: "Roche", country: "CH" },
      { name: "GSK", country: "GB" },
      { name: "Bayer", country: "DE" },
      { name: "MSD", country: "US" },
      { name: "Abbott", country: "US" },
      { name: "Boehringer Ingelheim", country: "DE" },
      { name: "Eli Lilly", country: "US" },
      { name: "Johnson & Johnson", country: "US" },
      { name: "Servier", country: "FR" },
      { name: "Hikma", country: "JO" },
      { name: "EIPICO", country: "EG" },
      { name: "Amriya", country: "EG" },
      { name: "Marcyrl", country: "EG" },
      { name: "Eva Pharma", country: "EG" },
      { name: "Iqvia", country: "US" },
      { name: "Pharmazone", country: "EG" }
    ],
  },
  {
    id: "vendors",
    label: "Vendors & Suppliers",
    count: "20+",
    icon: RiServerLine,
    partners: [
      { name: "AWS", country: "US" },
      { name: "Adobe", country: "US" },
      { name: "Salesforce", country: "US" },
      { name: "Veeva", country: "US" },
      { name: "Zoom", country: "US" },
      { name: "Microsoft", country: "US" },
      { name: "HubSpot", country: "US" },
      { name: "Mailchimp", country: "US" },
      { name: "Google Cloud", country: "US" },
      { name: "Figma", country: "US" },
      { name: "Canva Enterprise", country: "AU" },
      { name: "Articulate", country: "US" },
      { name: "LearnDash", country: "US" },
      { name: "Docebo", country: "IT" }
    ],
  },
  {
    id: "societies",
    label: "Medical Societies",
    count: "30+",
    icon: RiTeamLine,
    partners: [
      { name: "ESC", country: "EU" },
      { name: "ADA", country: "US" },
      { name: "ASH", country: "US" },
      { name: "ESMO", country: "EU" },
      { name: "EULAR", country: "EU" },
      { name: "ERS", country: "EU" },
      { name: "Egyptian Cardiology Society", country: "EG" },
      { name: "Saudi Heart Association", country: "SA" },
      { name: "UAE Medical Association", country: "AE" },
      { name: "AACE", country: "US" },
      { name: "ACS", country: "US" },
      { name: "ASCO", country: "US" },
      { name: "ISN", country: "FR" },
      { name: "EAN", country: "EU" },
      { name: "ESCRS", country: "EU" }
    ],
  },
];

export default function PartnersSection() {
  const [active, setActive] = useState("pharma");
  const current = partnerCategories.find((c) => c.id === active)!;

  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Our Network"
          title="Trusted by Industry Leaders"
          description="A vast network of pharmaceutical companies, technology vendors, and medical societies across the globe."
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-12">
          {partnerCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat.id
                    ? "bg-primary-500 text-white shadow-glow-primary"
                    : "glass-light dark:glass-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark border border-border-light dark:border-border-dark"
                }`}
              >
                <IconComponent size={18} />
                {cat.label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${active === cat.id ? "bg-white/20" : "bg-white/5"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {current.partners.map((partner, i) => (
            <div
              key={partner.name}
              className="group glass-light dark:glass-dark rounded-xl px-4 py-3 flex items-center gap-2 hover:border-primary-500/40 border border-border-light dark:border-border-dark hover-lift cursor-default"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-6 h-6 rounded-md shrink-0 shadow-sm">
                <ReactCountryFlag
                  countryCode={partner.country}
                  svg
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span className="text-sm text-muted-light dark:text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark transition-colors font-medium truncate">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-12 overflow-hidden py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...current.partners, ...current.partners].map((partner, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-6 text-muted-light/40 dark:text-muted-dark/40 text-sm font-medium">
                <span className="w-5 h-5 rounded-sm overflow-hidden opacity-60">
                  <ReactCountryFlag
                    countryCode={partner.country}
                    svg
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </span>
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
