"use client";
import Link from "next/link";
import { RiArrowRightLine, RiWhatsappLine } from "react-icons/ri";

export default function CTASection() {
  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary-500/15 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light dark:glass-dark border border-primary-500/30 text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full animate-pulse" />
            Ready to Elevate Your Brand?
          </div>

          <h2 className="font-display font-bold text-4xl md:text-6xl text-text-light dark:text-text-dark leading-tight mb-6">
            Let's Build Something <span className="gradient-text">Extraordinary.</span>
          </h2>

          <p className="text-muted-light dark:text-muted-dark text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Partner with Marvel Group to transform your healthcare brand. From medical education to AI-powered solutions — we deliver results that matter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-glow-primary hover:shadow-none text-sm"
            >
              Start a Conversation
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-secondary-500/50 hover:bg-secondary-500/5 font-medium transition-all duration-300 text-sm"
            >
              <RiWhatsappLine className="text-secondary-500" size={20} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-8 border-t border-border-light dark:border-border-dark">
            {["CPD-UK Accredited", "DHA Certified", "SCFHS Partner", "RCSEd Affiliated"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-xs text-muted-light dark:text-muted-dark">
                <svg className="w-4 h-4 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
