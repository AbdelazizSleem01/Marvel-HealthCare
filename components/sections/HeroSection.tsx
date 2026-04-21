"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RiArrowRightLine, RiPlayCircleLine, RiArrowDownLine } from "react-icons/ri";
import { stats } from "@/data";
import ReactCountryFlag from "react-country-flag";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-3xl md:text-4xl gradient-text">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm text-muted-light dark:text-muted-dark mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen mt-10 flex items-center justify-center overflow-hidden bg-bg-light dark:bg-bg-dark">
      {/* Animated mesh background */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -15}px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-100/50 dark:bg-primary-900/10 rounded-full blur-3xl" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 hero-grid opacity-20 dark:opacity-30" />

      {/* Floating orbs */}
      <div className="absolute top-24 right-1/4 w-4 h-4 bg-secondary-500/30 rounded-full animate-float shadow-glow-secondary" style={{ animationDelay: "0s" }} />
      <div className="absolute top-1/3 left-20 w-3 h-3 bg-primary-400/30 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-1/3 right-20 w-5 h-5 bg-accent/60 rounded-full animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-24 left-1/3 w-3 h-3 bg-secondary-400/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 container-custom pt-24 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Countries Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-light dark:glass-dark border border-primary-500/30 text-sm font-medium mb-8">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg shrink-0 shadow-sm">
                <ReactCountryFlag
                  countryCode="EG"
                  svg
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span className="text-primary-500 dark:text-primary-400">Egypt</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-muted-light/50 dark:bg-muted-dark/50" />
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-sm shrink-0 shadow-sm">
                <ReactCountryFlag
                  countryCode="AE"
                  svg
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span className="text-primary-500 dark:text-primary-400">UAE</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-muted-light/50 dark:bg-muted-dark/50" />
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-sm shrink-0 shadow-sm">
                <ReactCountryFlag
                  countryCode="SA"
                  svg
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span className="text-primary-500 dark:text-primary-400">Saudi</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-bold mb-6">
            <span className="block text-4xl md:text-6xl lg:text-7xl text-text-light dark:text-text-dark mb-2">
              Powering
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl gradient-text mb-2">
              Healthcare
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-text-light dark:text-text-dark">
              Innovation
            </span>
          </h1>

          {/* Description */}
          <p className="text-muted-light dark:text-muted-dark text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The MENA region&apos;s premier medical-tech creative & technology group — 
            where <span className="text-secondary-500 dark:text-secondary-400">clinical precision</span> meets <span className="text-primary-500 dark:text-primary-400">creative excellence</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/work"
              className="group flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-glow-primary hover:shadow-none text-sm md:text-base"
            >
              Explore Our Work
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl border border-border-light text-text-light dark:text-text-dark border-secondary-500/50 bg-secondary-500/5 font-medium transition-all duration-300 text-sm md:text-base"
            >
              <RiPlayCircleLine className="text-secondary-500 dark:text-secondary-400" size={20} />
              Start a Project
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-border-light/50 dark:border-border-dark/50">
            {stats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-light via-bg-light/80 to-transparent dark:from-bg-dark dark:via-bg-dark/80 dark:to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-light/60 dark:text-muted-dark/60 animate-bounce">
        <RiArrowDownLine size={20} className="text-primary-500 dark:text-primary-400" />
      </div>
    </section>
  );
}
