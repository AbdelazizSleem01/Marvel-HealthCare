"use client";

import { marketChallenges } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  RiUserAddLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiLineChartLine,
  RiArrowRightLine,
  RiCheckLine,
} from "react-icons/ri";

const iconMap: Record<string, React.ElementType> = {
  RiUserAddLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiLineChartLine,
};

export default function MarketChallengesSection() {
  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Problem Solvers"
          title="Market Challenges & Solutions"
          description="We understand your challenges and have built solutions that deliver measurable results."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          {marketChallenges.map((challenge, i) => {
            const IconComponent = iconMap[challenge.icon] || RiUserAddLine;

            return (
              <div
                key={challenge.id}
                className="group glass-light dark:glass-dark rounded-2xl p-6 md:p-8 border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-500"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                    <IconComponent size={26} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Challenge */}
                    <div className="mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary-500 dark:text-secondary-400 mb-1 block">
                        Challenge
                      </span>
                      <h3 className="font-display font-bold text-xl text-text-light dark:text-text-dark">
                        {challenge.challenge}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-500/50 to-secondary-500/50" />
                      <RiArrowRightLine className="text-primary-500 dark:text-primary-400" size={20} />
                      <div className="h-px flex-1 bg-gradient-to-r from-secondary-500/50 to-primary-500/50" />
                    </div>

                    {/* Solution */}
                    <div className="mb-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary-500 dark:text-primary-400 mb-1 block">
                        Solution
                      </span>
                      <p className="text-muted-light dark:text-muted-dark leading-relaxed">
                        {challenge.solution}
                      </p>
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2">
                      {challenge.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-border-dark/50 text-muted-light dark:text-muted-dark"
                        >
                          <RiCheckLine size={12} className="text-secondary-500" />
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
