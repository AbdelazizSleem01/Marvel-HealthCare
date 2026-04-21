"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";
import { RiSendPlaneLine, RiMapPin2Line, RiMailLine, RiPhoneLine, RiWhatsappLine, RiArrowDownSLine } from "react-icons/ri";
import ReactCountryFlag from "react-country-flag";

const services = [
  "Medical Education & CME",
  "Creative Design & Branding",
  "Video Production",
  "eLearning & SCORM",
  "Social Media Management",
  "AI & Automation",
  "Digital Products",
  "Other",
];

const countries = [
  { name: "Egypt", code: "EG" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "UAE", code: "AE" },
  { name: "Kuwait", code: "KW" },
  { name: "Qatar", code: "QA" },
  { name: "Bahrain", code: "BH" },
  { name: "Oman", code: "OM" },
  { name: "Jordan", code: "JO" },
  { name: "Lebanon", code: "LB" },
  { name: "Other", code: "" },
];

// Custom Country Dropdown Component
interface Country {
  name: string;
  code: string;
}

function CountryDropdown({ 
  countries, 
  value, 
  onChange 
}: { 
  countries: Country[]; 
  value: string; 
  onChange: (country: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selected = countries.find(c => c.name === value);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-sm text-text-light dark:text-text-dark focus:outline-none focus:border-primary-500/60 focus:bg-primary-500/5 transition-all duration-200 flex items-center justify-between"
      >
        <span className={selected ? "text-text-light dark:text-text-dark" : "text-muted-light dark:text-muted-dark"}>
          {selected ? (
            <span className="flex items-center gap-2">
              {selected.code && (
                <span className="w-6 h-4 rounded overflow-hidden flex-shrink-0">
                  <ReactCountryFlag countryCode={selected.code} svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </span>
              )}
              {selected.name}
            </span>
          ) : (
            "Select country"
          )}
        </span>
        <RiArrowDownSLine className={`text-muted-light dark:text-muted-dark transition-transform ${isOpen ? "rotate-180" : ""}`} size={18} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 glass-light dark:glass-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
          <button
            type="button"
            onClick={() => { onChange(""); setIsOpen(false); }}
            className="w-full px-4 py-2.5 text-left text-sm text-muted-light dark:text-muted-dark hover:bg-primary-500/10 hover:text-text-light dark:hover:text-text-dark transition-colors"
          >
            Select country
          </button>
          {countries.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => { onChange(c.name); setIsOpen(false); }}
              className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-colors ${
                value === c.name ? "bg-primary-500/20 text-text-light dark:text-text-dark" : "text-text-light dark:text-text-dark hover:bg-primary-500/10"
              }`}
            >
              {c.code && (
                <span className="w-6 h-4 rounded overflow-hidden flex-shrink-0">
                  <ReactCountryFlag countryCode={c.code} svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </span>
              )}
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", country: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", company: "", country: "", service: "", message: "" });
      } else {
        setError("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-black/5 dark:bg-white/5 border border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-sm text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus:border-primary-500/60 focus:bg-primary-500/5 transition-all duration-200";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-light dark:bg-bg-dark pt-24">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          </div>
          <div className="container-custom relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light dark:glass-dark border border-primary-500/30 text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-widest mb-8">
              Let's Talk
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-text-light dark:text-text-dark leading-tight mb-6">
              Start a <span className="gradient-text">Conversation.</span>
            </h1>
            <p className="text-muted-light dark:text-muted-dark text-xl max-w-xl mx-auto">
              Tell us about your project and our team will get back to you within 24 hours.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-5">
                {[
                  { icon: RiMapPin2Line, label: "Headquarters", value: "New Cairo, Egypt", color: "text-primary-500 dark:text-primary-400" },
                  { icon: RiMailLine, label: "Email", value: "hello@marvelgroup.co", color: "text-secondary-500 dark:text-secondary-400" },
                  { icon: RiPhoneLine, label: "Phone", value: "+20 100 000 0000", color: "text-primary-600 dark:text-accent" },
                  { icon: RiWhatsappLine, label: "WhatsApp", value: "+20 100 000 0000", color: "text-green-500 dark:text-green-400" },
                ].map((item) => (
                  <div key={item.label} className="glass-light dark:glass-dark rounded-2xl p-5 border border-border-light dark:border-border-dark flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                      <item.icon className={item.color} size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-light dark:text-muted-dark mb-0.5">{item.label}</div>
                      <div className="text-sm text-text-light dark:text-text-dark font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}

                {/* Offices */}
                <div className="glass-light dark:glass-dark rounded-2xl p-5 border border-border-light dark:border-border-dark">
                  <div className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-widest mb-4">Our Offices</div>
                  {[
                    { code: "EG", country: "Egypt", city: "Cairo (HQ)" },
                    { code: "SA", country: "Saudi Arabia", city: "Riyadh" },
                    { code: "AE", country: "UAE", city: "Dubai" },
                  ].map((o) => (
                    <div key={o.country} className="flex items-center gap-3 py-2 border-b border-border-light dark:border-border-dark last:border-0">
                      <div className="w-8 h-6 rounded overflow-hidden shadow-sm">
                        <ReactCountryFlag countryCode={o.code} svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div className="text-sm text-text-light dark:text-text-dark font-medium">{o.country}</div>
                        <div className="text-xs text-muted-light dark:text-muted-dark">{o.city}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {success ? (
                  <div className="glass-light dark:glass-dark rounded-3xl p-12 border border-secondary-500/30 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center text-white text-3xl">
                      ✓
                    </div>
                    <h3 className="font-display font-bold text-2xl text-text-light dark:text-text-dark">Message Received!</h3>
                    <p className="text-muted-light dark:text-muted-dark max-w-sm">
                      Thank you for reaching out. Our team will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-primary-500/50 text-sm transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-light dark:glass-dark rounded-3xl p-8 md:p-10 border border-border-light dark:border-border-dark space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider mb-2 block">Full Name *</label>
                        <input required className={inputCls} placeholder="Dr. Ahmed Hassan" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider mb-2 block">Email Address *</label>
                        <input required type="email" className={inputCls} placeholder="ahmed@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider mb-2 block">Company</label>
                        <input className={inputCls} placeholder="Novartis MENA" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider mb-2 block">Country</label>
                        <CountryDropdown 
                          countries={countries} 
                          value={form.country} 
                          onChange={(country) => setForm({ ...form, country })} 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider mb-2 block">Service Needed</label>
                      <select className={`${inputCls} cursor-pointer`} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                        <option value="">Select a service</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider mb-2 block">Message *</label>
                      <textarea
                        required
                        rows={5}
                        className={`${inputCls} resize-none`}
                        placeholder="Tell us about your project, goals, and timeline..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    {error && (
                      <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 shadow-glow-primary hover:shadow-none"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message
                          <RiSendPlaneLine size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
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
