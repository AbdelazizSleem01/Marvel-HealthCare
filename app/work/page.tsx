"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";
import SectionTitle from "@/components/ui/SectionTitle";
import { projectCategories } from "@/data";
import { RiPlayCircleLine, RiExternalLinkLine, RiZoomInLine, RiCloseLine } from "react-icons/ri";

const allProjects = [
  { id: 1, title: "Diabetes Care — Novo Nordisk Campaign", category: "medical", type: "image", client: "Novo Nordisk", year: "2024", tags: ["Medical", "Campaign"], color: "from-primary-500 to-secondary-400", desc: "360° HCP campaign integrating digital and field force materials for a leading diabetes medication launch." },
  { id: 2, title: "Cardiometabolic Educational Video Series", category: "video", type: "video", client: "AstraZeneca", year: "2024", tags: ["Video", "Education"], color: "from-primary-500 to-secondary-400", desc: "A 6-part animated educational video series targeting cardiologists across the MENA region." },
  { id: 3, title: "Oncology SCORM Module Suite", category: "elearning", type: "image", client: "Roche", year: "2023", tags: ["eLearning", "SCORM"], color: "from-primary-500 to-secondary-400", desc: "10-module accredited eLearning program covering oncology biomarkers and targeted therapies." },
  { id: 4, title: "Arthritis Brand Identity & Rebrand", category: "artwork", type: "image", client: "Pfizer", year: "2024", tags: ["Branding", "Design"], color: "from-primary-500 to-secondary-400", desc: "Complete brand overhaul for a major rheumatology franchise including visual identity, messaging, and touchpoints." },
  { id: 5, title: "AI Medical Rep Training — AREEP Platform", category: "ai", type: "link", client: "Multiple", year: "2024", tags: ["AI", "Training"], color: "from-primary-500 to-secondary-400", desc: "AI-powered role-play simulation platform for pharmaceutical sales force training deployed across 3 companies." },
  { id: 6, title: "Cardiology Social Media Strategy", category: "social", type: "image", client: "Servier", year: "2024", tags: ["Social", "Content"], color: "from-primary-500 to-secondary-400", desc: "12-month social media management campaign for a heart failure brand across LinkedIn and Twitter." },
  { id: 7, title: "Neurology Patient Case Online Activity", category: "activities", type: "link", client: "Biogen", year: "2023", tags: ["Interactive", "Neurology"], color: "from-primary-500 to-secondary-400", desc: "Interactive online case study platform for neurologists with CPD points integration." },
  { id: 8, title: "Respiratory Disease Awareness Campaign", category: "medical", type: "image", client: "GSK", year: "2023", tags: ["Medical", "Awareness"], color: "from-primary-500 to-secondary-400", desc: "Patient and HCP dual-targeted campaign for asthma and COPD awareness month." },
  { id: 9, title: "Surgical Techniques Video Library", category: "video", type: "video", client: "J&J", year: "2024", tags: ["Video", "Surgical"], color: "from-primary-500 to-secondary-400", desc: "Professional medical videography and post-production for a library of minimally invasive surgical techniques." },
  { id: 10, title: "Diabetes eLearning Module — MAHER", category: "elearning", type: "image", client: "Sanofi", year: "2024", tags: ["eLearning", "DHA"], color: "from-primary-500 to-secondary-400", desc: "DHA-accredited CME module on insulin management deployed through the MAHER platform." },
  { id: 11, title: "Immunology Brand Artwork Suite", category: "artwork", type: "image", client: "AbbVie", year: "2023", tags: ["Artwork", "Immunology"], color: "from-primary-500 to-secondary-400", desc: "Premium brand artwork for a major immunology launch including visual aids, booth design, and digital assets." },
  { id: 12, title: "WaselMail HCP Communication Campaign", category: "ai", type: "link", client: "Multiple", year: "2024", tags: ["Automation", "Email"], color: "from-primary-500 to-secondary-400", desc: "Automated, compliance-ready HCP email campaigns powered by the WaselMail platform with analytics dashboards." },
];

export default function WorkPage() {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<typeof allProjects[0] | null>(null);

  const filtered = active === "all" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light dark:bg-bg-dark pt-24">
        {/* Header */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          </div>
          <div className="container-custom relative z-10">
            <SectionTitle
              tag="Portfolio"
              title="Our Work Defines Us."
              description="Explore 500+ projects across medical education, creative, video, digital, and AI — delivered for the world's leading pharma brands."
            />
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="pb-24">
          <div className="container-custom">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {projectCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${active === cat.id
                      ? "bg-primary-500 text-white shadow-glow-primary"
                      : "glass-light dark:glass-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark border border-border-light dark:border-border-dark"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Masonry grid */}
            <div className="masonry-grid">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="masonry-item group glass-light dark:glass-dark rounded-2xl overflow-hidden hover-lift border border-border-light dark:border-border-dark hover:border-primary-500/30 cursor-pointer transition-all duration-300"
                  onClick={() => setSelected(project)}
                >
                  {/* Thumbnail */}
                  <div className={`relative bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden h-[220px]`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <span className="text-white/20 font-display font-bold text-7xl">M</span>
                    {project.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                          <RiPlayCircleLine className="text-white" size={28} />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <RiZoomInLine className="text-white" size={32} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-text-light dark:text-text-dark text-sm leading-snug mb-1">{project.title}</h3>
                    <p className="text-xs text-muted-light dark:text-muted-dark mb-3">{project.client} · {project.year}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />

      {/* Project Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md" onClick={() => setSelected(null)}>
          <div className="glass-light dark:glass-dark rounded-2xl border border-border-light dark:border-border-dark max-w-2xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className={`relative h-56 bg-gradient-to-br ${selected.color} flex items-center justify-center`}>
              <span className="text-white/20 font-display font-bold text-9xl">M</span>
              {selected.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <RiPlayCircleLine className="text-white" size={32} />
                  </div>
                </div>
              )}
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                <RiCloseLine size={18} />
              </button>
            </div>
            <div className="p-8">
              <h3 className="font-display font-bold text-2xl text-text-light dark:text-text-dark mb-2">{selected.title}</h3>
              <p className="text-primary-500 dark:text-primary-400 text-sm mb-4">{selected.client} · {selected.year}</p>
              <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-6">{selected.desc}</p>
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
