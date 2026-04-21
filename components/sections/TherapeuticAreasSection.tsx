"use client";
import SectionTitle from "@/components/ui/SectionTitle";
import { 
  RiHeartPulseLine, 
  RiMicroscopeLine, 
  RiBrainLine, 
  RiEyeLine, 
  RiCapsuleLine,
  RiWomenLine,
  RiStethoscopeLine,
  RiVirusLine,
  RiUserHeartLine,
  RiFirstAidKitLine,
  RiHospitalLine,
  RiHealthBookLine
} from "react-icons/ri";

const therapeuticAreas = [
  { name: "Diabetes & Endocrinology", icon: RiStethoscopeLine, color: "text-primary-500 dark:text-primary-400" },
  { name: "Orthopedics", icon: RiFirstAidKitLine, color: "text-secondary-500 dark:text-secondary-400" },
  { name: "Internal Medicine", icon: RiHospitalLine, color: "text-primary-600 dark:text-primary-500" },
  { name: "Cardiology", icon: RiHeartPulseLine, color: "text-secondary-600 dark:text-secondary-500" },
  { name: "Oncology", icon: RiMicroscopeLine, color: "text-primary-500 dark:text-primary-400" },
  { name: "Neurology", icon: RiBrainLine, color: "text-secondary-500 dark:text-secondary-400" },
  { name: "Dermatology", icon: RiVirusLine, color: "text-primary-600 dark:text-primary-500" },
  { name: "Ophthalmology", icon: RiEyeLine, color: "text-secondary-600 dark:text-secondary-500" },
  { name: "Pulmonology", icon: RiHealthBookLine, color: "text-primary-500 dark:text-primary-400" },
  { name: "Gastroenterology", icon: RiCapsuleLine, color: "text-secondary-500 dark:text-secondary-400" },
  { name: "Rheumatology", icon: RiUserHeartLine, color: "text-primary-600 dark:text-primary-500" },
  { name: "Women's Health", icon: RiWomenLine, color: "text-secondary-600 dark:text-secondary-500" },
];

export default function TherapeuticAreasSection() {
  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Expertise"
          title="Therapeutic Areas"
          description="Deep clinical expertise across the full spectrum of medical specialties, ensuring scientifically accurate and impactful healthcare communication."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-14">
          {therapeuticAreas.map((area, i) => {
            const IconComponent = area.icon;
            return (
              <div
                key={area.name}
                className="group glass-light dark:glass-dark rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover-lift border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center justify-center group-hover:border-primary-500/30 transition-colors`}>
                  <IconComponent className={`text-2xl ${area.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <span className="text-xs text-muted-light dark:text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark transition-colors leading-tight">
                  {area.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
