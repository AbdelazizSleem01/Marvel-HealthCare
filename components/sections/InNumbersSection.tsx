"use client";

import { useEffect, useRef, useState } from "react";
import { bigNumbers } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import { RiBarChartLine } from "react-icons/ri";

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

function NumberCard({
  value,
  suffix,
  label,
  color,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
  index: number;
}) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2500, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative glass-light dark:glass-dark rounded-2xl p-5 text-center border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon indicator */}
      <div className="flex justify-center mb-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} opacity-80 flex items-center justify-center group-hover:opacity-40 transition-opacity`}>
          <RiBarChartLine className="text-white" size={14} />
        </div>
      </div>

      {/* Number - smaller and cleaner */}
      <div className="relative mb-2">
        <span className="font-display font-bold text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
          {count}{suffix}
        </span>
      </div>

      {/* Label - improved typography */}
      <p className="text-muted-light dark:text-muted-dark whitespace-nowrap text-xs md:text-sm font-medium text-center leading-tight ">{label}</p>

      {/* Subtle bottom line */}
      <div
        className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full`}
      />
    </div>
  );
}

export default function InNumbersSection() {
  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Our Impact"
          title="In Numbers"
          description="Quantifiable results that demonstrate our scale and expertise across the MENA region."
        />

        {/* Compact grid with better spacing */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mt-12 max-w-7xl mx-auto text-center">
          {bigNumbers.map((stat, i) => (
            <NumberCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              color={stat.color || "from-primary-500 to-secondary-500"}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
