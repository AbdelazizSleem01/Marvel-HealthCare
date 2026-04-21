"use client";
import { useState } from "react";
import Link from "next/link";
import { projectCategories } from "@/data";
import { RiArrowRightLine, RiExternalLinkLine, RiPlayCircleLine, RiImageLine, RiFolderVideoLine } from "react-icons/ri";
import SectionTitle from "@/components/ui/SectionTitle";

const sampleProjects = [
  { id: 1, title: "Diabetes Management Campaign", category: "medical", type: "image", client: "Novo Nordisk", year: "2024", tags: ["Campaign", "Digital"], color: "from-primary-600 to-primary-400" },
  { id: 2, title: "HCP Engagement Platform Video", category: "video", type: "video", client: "AstraZeneca", year: "2024", tags: ["Video", "Digital"], color: "from-secondary-600 to-secondary-400" },
  { id: 3, title: "Cardiometabolic eLearning Module", category: "elearning", type: "image", client: "Bayer", year: "2023", tags: ["eLearning", "SCORM"], color: "from-primary-500 to-secondary-500" },
  { id: 4, title: "Oncology Brand Identity", category: "artwork", type: "image", client: "Roche", year: "2024", tags: ["Branding", "Design"], color: "from-secondary-500 to-primary-500" },
  { id: 5, title: "AI Medical Rep Training", category: "ai", type: "link", client: "Pfizer", year: "2024", tags: ["AI", "Training"], color: "from-primary-400 to-secondary-400" },
  { id: 6, title: "Social Media Campaign — Cardiology", category: "social", type: "image", client: "Servier", year: "2024", tags: ["Social", "Cardiology"], color: "from-secondary-400 to-primary-400" },
];

export default function WorkPreviewSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? sampleProjects
    : sampleProjects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle
            tag="Previous Work"
            title="Work That Speaks."
            centered={false}
          />
          <Link
            href="/work"
            className="group flex items-center gap-2 text-sm font-semibold text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors shrink-0 px-4 py-2 rounded-xl hover:bg-primary-500/5"
          >
            View All Work
            <div className="w-7 h-7 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
              <RiArrowRightLine size={14} />
            </div>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-primary-500 text-white shadow-glow-primary"
                : "glass-light dark:glass-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark border border-border-light dark:border-border-dark hover:border-primary-500/30"
            }`}
          >
            All Works
          </button>
          {projectCategories.slice(1, 7).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary-500 text-white shadow-glow-primary"
                  : "glass-light dark:glass-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark border border-border-light dark:border-border-dark hover:border-primary-500/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="group glass-light dark:glass-dark rounded-2xl overflow-hidden hover-lift border border-border-light dark:border-border-dark hover:border-primary-500/40 transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Thumbnail */}
              <div className={`relative h-52 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Animated gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Center icon */}
                <div className="relative z-10">
                  <span className="text-white/90 font-display font-bold text-6xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">M</span>
                </div>

                {/* Type indicator */}
                <div className="absolute top-4 left-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    {project.type === "video" ? (
                      <RiFolderVideoLine className="text-white" size={16} />
                    ) : project.type === "link" ? (
                      <RiExternalLinkLine className="text-white" size={16} />
                    ) : (
                      <RiImageLine className="text-white" size={16} />
                    )}
                  </div>
                </div>

                {/* Play button for videos */}
                {project.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                      <RiPlayCircleLine className="text-white" size={32} />
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="p-6 relative">
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display font-semibold text-text-light dark:text-text-dark text-base leading-snug group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">{project.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-light dark:text-muted-dark mb-4">
                  <span className="text-secondary-500 font-medium">{project.client}</span>
                  <span className="text-muted-light/30 dark:text-muted-dark/30">·</span>
                  <span>{project.year}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark border border-border-light/50 dark:border-border-dark/50 group-hover:border-primary-500/20 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
