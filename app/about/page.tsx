"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";
import SectionTitle from "@/components/ui/SectionTitle";
import { companies, branches, accreditations, therapeuticAreas } from "@/data";
import { RiShieldCheckLine, RiTeamLine, RiGlobalLine, RiLightbulbLine } from "react-icons/ri";

const values = [
  { icon: RiShieldCheckLine, title: "Clinical Integrity", desc: "Every piece of content meets the highest scientific and medical accuracy standards.", color: "text-primary-400" },
  { icon: RiLightbulbLine, title: "Creative Excellence", desc: "We push creative boundaries while maintaining the sophistication healthcare deserves.", color: "text-secondary-400" },
  { icon: RiGlobalLine, title: "Global Mindset", desc: "Regional roots, global standards. We think globally and execute locally.", color: "text-accent" },
  { icon: RiTeamLine, title: "Partnership First", desc: "We embed ourselves in our clients' success, acting as strategic partners, not vendors.", color: "text-violet-400" },
];

const timeline = [
  { year: "2015", event: "Marvel Group founded in Cairo, Egypt. Bait Alebdaa established in UAE." },
  { year: "2018", event: "Meduscript launched, specializing in pharmaceutical medical writing." },
  { year: "2019", event: "Med-ADD launched in KSA. SCFHS accreditation obtained." },
  { year: "2020", event: "CPD-UK and DHA accreditations secured. Remote delivery capability launched." },
  { year: "2021", event: "RCSEd partnership established. 50+ pharma clients milestone." },
  { year: "2022", event: "TebZone digital health platform launched. AI division established." },
  { year: "2023", event: "100+ pharma clients. AREEP and MAHER products go live." },
  { year: "2024", event: "WaselMail and DynaSync launched. 500+ projects delivered." },
  { year: "2025", event: "Med-Vi launched. Expansion into AI-driven medical communication." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light dark:bg-bg-dark pt-24">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl -translate-y-1/2" />
          </div>
          <div className="container-custom relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light dark:glass-dark border border-primary-500/30 text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-widest mb-8">
              About Marvel Group
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-text-light dark:text-text-dark leading-tight mb-6">
              Where Medicine Meets <span className="gradient-text">Mastery.</span>
            </h1>
            <p className="text-muted-light dark:text-muted-dark text-xl max-w-2xl mx-auto leading-relaxed">
              Marvel Group is the MENA region's most trusted medical-tech creative & technology group — a multi-company ecosystem powering healthcare innovation since 2015.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="pb-24">
          <div className="container-custom">
            <div className="glass-light dark:glass-dark rounded-3xl p-10 md:p-16 border border-border-light dark:border-border-dark text-center max-w-4xl mx-auto mb-20">
              <p className="font-display text-2xl md:text-3xl text-text-light dark:text-text-dark leading-relaxed">
                "Our mission is to <span className="gradient-text font-bold">elevate healthcare communication</span> across the MENA region — combining clinical expertise, creative intelligence, and cutting-edge technology to drive better outcomes for patients and healthcare systems."
              </p>
              <div className="mt-8 text-muted-light dark:text-muted-dark text-sm">— Marvel Group Leadership</div>
            </div>

            {/* Values */}
            <SectionTitle tag="Our Values" title="Principles That Drive Us" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-24">
              {values.map((val) => (
                <div key={val.title} className="glass-light dark:glass-dark rounded-2xl p-6 border border-border-light dark:border-border-dark hover-lift">
                  <val.icon className={`${val.color.replace('text-primary-400', 'text-primary-500 dark:text-primary-400').replace('text-secondary-400', 'text-secondary-500 dark:text-secondary-400')} mb-4`} size={32} />
                  <h3 className="font-display font-bold text-lg text-text-light dark:text-text-dark mb-2">{val.title}</h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <SectionTitle tag="Our Journey" title="A Decade of Growth" />
            <div className="mt-12 max-w-3xl mx-auto mb-24">
              <div className="relative">
                {/* Line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-secondary-500 to-transparent" />

                <div className="space-y-8">
                  {timeline.map((item, i) => (
                    <div key={item.year} className="flex gap-6 items-start">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-display font-bold text-xs shrink-0 shadow-glow-primary">
                        {item.year.slice(2)}
                      </div>
                      <div className="glass-light dark:glass-dark rounded-xl p-4 flex-1 border border-border-light dark:border-border-dark">
                        <div className="text-primary-500 dark:text-primary-400 font-mono text-xs mb-1">{item.year}</div>
                        <div className="text-text-light dark:text-text-dark text-sm leading-relaxed">{item.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Companies overview */}
            <SectionTitle tag="The Group" title="Our Companies" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 mb-24">
              {companies.map((c) => (
                <div key={c.id} className="glass-light dark:glass-dark rounded-xl p-5 border border-border-light dark:border-border-dark flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold shrink-0`}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-text-light dark:text-text-dark text-sm">{c.name}</div>
                    <div className="text-xs text-muted-light dark:text-muted-dark">{c.country} · {c.year}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Accreditations */}
            <SectionTitle tag="Recognition" title="Our Accreditations" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {accreditations.map((acc) => (
                <div key={acc.shortName} className="glass-light dark:glass-dark rounded-xl p-6 border border-border-light dark:border-border-dark text-center">
                  <div className={`text-2xl font-display font-bold bg-gradient-to-r ${acc.color} bg-clip-text text-transparent mb-1`}>
                    {acc.shortName}
                  </div>
                  <div className="text-xs text-muted-light dark:text-muted-dark">{acc.country}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
