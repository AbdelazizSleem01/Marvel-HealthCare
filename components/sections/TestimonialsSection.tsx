"use client";
import { useState, useEffect, useRef } from "react";
import { testimonials } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import { RiStarFill, RiArrowLeftSLine, RiArrowRightSLine, RiDoubleQuotesL } from "react-icons/ri";

const countryFlags: Record<string, string> = {
  "UAE": "🇦🇪",
  "KSA": "🇸🇦",
  "Egypt": "🇪🇬",
};

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6000);
  };

  const current = testimonials[active];

  return (
    <section className="section-padding bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Testimonials"
          title="What Our Clients Say"
          description="Trusted by 100+ pharmaceutical brands across MENA."
        />

        <div className="mt-16 max-w-3xl mx-auto">
          {/* Main testimonial */}
          <div className="relative glass-light dark:glass-dark rounded-3xl p-8 md:p-12 border border-border-light dark:border-border-dark overflow-hidden group">
            {/* Background gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 opacity-50" />

            {/* Quote icon */}
            <div className="absolute top-6 right-8 w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center">
              <RiDoubleQuotesL className="text-primary-500/30" size={32} />
            </div>

            {/* Stars */}
            <div className="flex gap-1.5 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-secondary-500/20 flex items-center justify-center">
                  <RiStarFill className="text-secondary-400" size={14} />
                </div>
              ))}
            </div>

            {/* Review */}
            <p className="text-text-light dark:text-text-dark text-lg md:text-xl leading-relaxed mb-8 relative z-10">
              &ldquo;{current.review}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-display font-bold text-xl shadow-lg">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-semibold text-text-light dark:text-text-dark text-lg">{current.name}</div>
                  <div className="text-sm text-muted-light dark:text-muted-dark">{current.title}</div>
                  <div className="text-xs text-secondary-500 dark:text-secondary-400 mt-0.5">{current.company}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{countryFlags[current.country as keyof typeof countryFlags] || "🇪🇬"}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); resetInterval(); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-gradient-to-r from-primary-500 to-secondary-500"
                      : "w-2 bg-border-light dark:bg-border-dark hover:bg-muted-light dark:hover:bg-muted-dark"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { prev(); resetInterval(); }}
                className="w-11 h-11 rounded-xl glass-light dark:glass-dark border border-border-light dark:border-border-dark flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:border-primary-500/40 hover:bg-primary-500/5 transition-all"
              >
                <RiArrowLeftSLine size={22} />
              </button>
              <button
                onClick={() => { next(); resetInterval(); }}
                className="w-11 h-11 rounded-xl glass-light dark:glass-dark border border-border-light dark:border-border-dark flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:border-primary-500/40 hover:bg-primary-500/5 transition-all"
              >
                <RiArrowRightSLine size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
