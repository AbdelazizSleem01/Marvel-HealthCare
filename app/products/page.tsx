"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";
import SectionTitle from "@/components/ui/SectionTitle";
import { products } from "@/data";
import { RiCheckLine, RiArrowRightLine, RiWhatsappLine } from "react-icons/ri";
import Link from "next/link";

const statusConfig: Record<string, { label: string; cls: string }> = {
  live: { label: "Live", cls: "bg-secondary-500/20 text-secondary-400 border-secondary-500/40" },
  beta: { label: "Beta", cls: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
  "coming-soon": { label: "Coming Soon", cls: "bg-black/5 dark:bg-white/5 text-muted-light dark:text-muted-dark border-border-light dark:border-border-dark" },
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light dark:bg-bg-dark pt-24">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-primary-500/10 rounded-full blur-3xl" />
          </div>
          <div className="container-custom relative z-10">
            <SectionTitle
              tag="Our Products"
              title="Proprietary Technology for Healthcare."
              description="Purpose-built platforms engineered for pharmaceutical companies, medical educators, and healthcare communicators. No off-the-shelf compromises."
            />
          </div>
        </section>

        {/* Products */}
        <section className="pb-24">
          <div className="container-custom space-y-8">
            {products.map((product, i) => {
              const status = statusConfig[product.status];
              return (
                <div
                  key={product.name}
                  className={`glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark overflow-hidden grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                >
                  {/* Content */}
                  <div className={`p-10 ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg`}>
                        {product.name.charAt(0)}
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full border uppercase tracking-wider ${status.cls}`}>
                        {status.label}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-4xl text-text-light dark:text-text-dark mb-2">{product.name}</h2>
                    <p className={`text-lg font-medium bg-gradient-to-r ${product.color} bg-clip-text text-transparent mb-4`}>
                      {product.tagline}
                    </p>
                    <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-8">{product.description}</p>

                    <ul className="space-y-3 mb-8">
                      {product.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-sm text-text-light dark:text-text-dark">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${product.color} flex items-center justify-center shrink-0`}>
                            <RiCheckLine className="text-white" size={14} />
                          </div>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-4">
                      <Link
                        href="/contact"
                        className="group flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-all text-sm"
                      >
                        Request Demo
                        <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href="https://wa.me/201000000000"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-green-500/50 text-sm font-medium transition-all"
                      >
                        <RiWhatsappLine className="text-green-500" size={18} />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`relative min-h-64 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="relative text-center">
                      <div className="font-display font-bold text-8xl text-white/20 mb-2">{product.name}</div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="text-white text-sm font-medium">{status.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
