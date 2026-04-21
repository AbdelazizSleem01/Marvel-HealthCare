"use client";
import Link from "next/link";
import { products } from "@/data";
import SectionTitle from "@/components/ui/SectionTitle";
import { RiArrowRightLine, RiCheckLine, RiSparklingLine } from "react-icons/ri";

const statusConfig: Record<string, { style: string; icon: React.ReactNode; label: string }> = {
  live: {
    style: "bg-secondary-500/20 text-secondary-400 border-secondary-500/40",
    icon: <RiSparklingLine size={12} />,
    label: "Live",
  },
  beta: {
    style: "bg-primary-500/20 text-primary-400 border-primary-500/40",
    icon: null,
    label: "Beta",
  },
  "coming-soon": {
    style: "bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark border-border-light dark:border-border-dark",
    icon: null,
    label: "Coming Soon",
  },
};

export default function ProductsSection() {
  return (
    <section className="section-padding bg-bg-light dark:bg-bg-dark relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          tag="Our Products"
          title="Built for Healthcare."
          description="Proprietary technology platforms engineered for pharmaceutical companies, medical education, and HCP engagement."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {products.map((product, i) => {
            const status = statusConfig[product.status];
            return (
              <div
                key={product.name}
                className="group glass-light dark:glass-dark rounded-2xl p-7 hover-lift border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-500 relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Animated gradient background */}
                <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-700`} />

                {/* Left accent border */}
                <div className={`absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b ${product.color} rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Status */}
                <div className="flex items-start justify-between mb-6 relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white font-display font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                    {product.name.charAt(0)}
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border uppercase tracking-wider ${status.style}`}>
                    {status.icon}
                    {status.label}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-text-light dark:text-text-dark mb-1 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className={`text-sm font-semibold bg-gradient-to-r ${product.color} bg-clip-text text-transparent mb-4`}>
                  {product.tagline}
                </p>
                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-6">{product.description}</p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {product.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-muted-light dark:text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">
                      <div className="w-5 h-5 rounded-full bg-secondary-500/20 flex items-center justify-center shrink-0">
                        <RiCheckLine className="text-secondary-500" size={12} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors group/link"
                >
                  Learn More
                  <div className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center group-hover/link:bg-primary-500/20 transition-colors">
                    <RiArrowRightLine className="group-hover/link:translate-x-0.5 transition-transform" size={14} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-secondary-500/50 hover:bg-secondary-500/5 font-medium transition-all duration-300 text-sm group"
          >
            View All Products
            <RiArrowRightLine size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
