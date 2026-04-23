"use client";

import { useState, useEffect, useRef } from "react";

import { companies, segmentedClients } from "@/data";

import { RiCloseLine, RiArrowRightLine, RiMailLine, RiSettings4Line, RiServiceLine, RiStarLine, RiStackLine, RiGraduationCapLine, RiFileTextLine, RiComputerLine, RiPaletteLine, RiUserSettingsLine, RiCodeBoxLine, RiArrowRightSLine, RiCheckLine, RiVideoLine, RiCalendarEventLine, RiBuildingLine, RiGlobalLine, RiBriefcaseLine, RiAwardLine, RiShieldCheckLine, RiTeamLine, RiDoubleQuotesL, RiStarFill, RiWhatsappLine, RiMessage3Line, RiSendPlaneLine, RiHeartPulseLine, RiMicroscopeLine, RiBrainLine, RiEyeLine, RiCapsuleLine, RiWomenLine, RiStethoscopeLine, RiVirusLine, RiUserHeartLine, RiFirstAidKitLine, RiHospitalLine, RiHealthBookLine, RiArrowLeftSLine, RiGlobeLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { motion, AnimatePresence } from "framer-motion";
import type { Company, SegmentedClient } from "@/types";



const ORBIT_POSITIONS = [

  { angle: -90, distance: 200 },

  { angle: -30, distance: 200 },

  { angle: 30, distance: 200 },

  { angle: 90, distance: 200 },

  { angle: 150, distance: 200 },

  { angle: -150, distance: 200 },

];



export default function CompaniesSection() {

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [selectedClient, setSelectedClient] = useState<SegmentedClient | null>(null);

  const [showServices, setShowServices] = useState(false);

  const [showAccreditations, setShowAccreditations] = useState(false);

  const [showTestimonials, setShowTestimonials] = useState(false);

  const [showChat, setShowChat] = useState(false);

  const [showExpertise, setShowExpertise] = useState(false);

  const [activeTab, setActiveTab] = useState<"comprehensive" | "featured" | "products">("comprehensive");

  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0] | null>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState(0);

  const [activeClientTab, setActiveClientTab] = useState<"pharma" | "vendors" | "societies">("pharma");

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [showLeftSidebar, setShowLeftSidebar] = useState(true);

  const [showRightPanel, setShowRightPanel] = useState(true);



  // Countries data

  const COUNTRIES = [

    {

      id: "egypt",

      name: "Egypt",

      flag: "EG",

      city: "Cairo",

      description: "The heart of Marvel Group's operations in North Africa, serving as a hub for innovation and healthcare excellence.",

      companies: ["Marvel", "Med-Vi", "Med-Lab", "Meduscript", "TebZone"],

      stats: { employees: "200+", projects: "500+", clients: "50+" },

    },

    {

      id: "ksa",

      name: "Saudi Arabia",

      flag: "SA",

      city: "Riyadh",

      description: "Strategic presence in the Kingdom, delivering cutting-edge medical education and healthcare solutions.",

      companies: ["Med-ADD"],

      stats: { employees: "50+", projects: "100+", clients: "20+" },

    },

    {

      id: "uae",

      name: "UAE",

      flag: "AE",

      city: "Dubai",

      description: "Gateway to the GCC region, providing world-class creative and medical communication services.",

      companies: ["Bait Alebdaa"],

      stats: { employees: "30+", projects: "80+", clients: "15+" },

    },

  ];



  useEffect(() => {

    let animationId: number;

    const animate = () => {

      setRotation((prev) => (prev + 0.1) % 360);

      animationId = requestAnimationFrame(animate);

    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);

  }, []);



  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {

      if (containerRef.current) {

        const rect = containerRef.current.getBoundingClientRect();

        const x = (e.clientX - rect.left - rect.width / 2) / 50;

        const y = (e.clientY - rect.top - rect.height / 2) / 50;

        setMousePosition({ x, y });

      }

    };



    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, []);



  return (

    <section

      ref={containerRef}

      className="min-h-screen bg-bg-light dark:bg-bg-dark relative overflow-hidden flex items-center justify-center"

    >

      {/* Animated Background */}

      <div className="absolute inset-0">

        {/* Gradient orbs */}

        <div

          className="absolute w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl transition-transform duration-700"

          style={{

            left: "50%",

            top: "50%",

            transform: `translate(-50%, -50%) translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,

          }}

        />

        <div

          className="absolute w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl transition-transform duration-700"

          style={{

            left: "30%",

            top: "30%",

            transform: `translate(-50%, -50%) translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,

          }}

        />

        <div

          className="absolute w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl transition-transform duration-700"

          style={{

            right: "20%",

            bottom: "20%",

            transform: `translate(50%, 50%) translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,

          }}

        />





        {/* Floating particles - fixed positions to avoid hydration mismatch */}

        {[

          { left: "15%", top: "20%", delay: "0s" },

          { left: "85%", top: "15%", delay: "0.2s" },

          { left: "25%", top: "75%", delay: "0.4s" },

          { left: "75%", top: "80%", delay: "0.6s" },

          { left: "10%", top: "50%", delay: "0.8s" },

          { left: "90%", top: "45%", delay: "1s" },

          { left: "35%", top: "10%", delay: "1.2s" },

          { left: "65%", top: "90%", delay: "1.4s" },

          { left: "5%", top: "85%", delay: "1.6s" },

          { left: "95%", top: "25%", delay: "1.8s" },

          { left: "45%", top: "5%", delay: "2s" },

          { left: "55%", top: "95%", delay: "2.2s" },

          { left: "20%", top: "35%", delay: "2.4s" },

          { left: "80%", top: "65%", delay: "2.6s" },

          { left: "30%", top: "55%", delay: "2.8s" },

          { left: "70%", top: "40%", delay: "3s" },

          { left: "40%", top: "70%", delay: "3.2s" },

          { left: "60%", top: "30%", delay: "3.4s" },

          { left: "8%", top: "60%", delay: "3.6s" },

          { left: "92%", top: "55%", delay: "3.8s" },

        ].map((particle, i) => (

          <div

            key={i}

            className="absolute w-1 h-1 bg-primary-500/30 rounded-full animate-pulse"

            style={{

              left: particle.left,

              top: particle.top,

              animationDelay: particle.delay,

            }}

          />

        ))}

      </div>



      {/* Main Content Container - Two Column Layout */}

      <motion.div layout className="relative z-10 w-full max-w-7xl mx-auto px-4 flex gap-8">
        {/* Left Sidebar Toggle Button (when hidden) */}
        <AnimatePresence mode="wait">
          {!showLeftSidebar && (
            <motion.button
              key="left-sidebar-toggle"
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLeftSidebar(true)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-2xl flex items-center justify-center hover:bg-surface-light dark:hover:bg-surface-dark transition-all group"
              title="Show Sidebar"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500/20 blur-md rounded-full group-hover:bg-primary-500/40 transition-all" />
                <RiSettings4Line size={28} className="text-primary-500 relative z-10" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
        {/* Left Column - Sidebar Panel */}
        <AnimatePresence>
          {showLeftSidebar && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{
                layout: { type: "spring", damping: 30, stiffness: 260 },
                opacity: { duration: 0.2 },
                x: { type: "spring", damping: 30, stiffness: 260 }
              }}
              className="w-22 flex flex-col gap-4 py-8 relative"
            >
              {/* Toggle Button to Hide */}
              <button
                onClick={() => setShowLeftSidebar(false)}
                className="absolute -right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-md flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all z-50 group"
                title="Hide Sidebar"
              >
                <RiArrowLeftSLine size={18} className="group-hover:scale-110 transition-transform" />
              </button>

              <div className="rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-xl overflow-hidden">
                <div className="flex flex-col gap-1 pl-3 pt-3 pb-3 pr-1 max-h-[73vh] overflow-y-auto custom-scrollbar">
                  {[
                    { id: 'services', onClick: () => setShowServices(true), icon: RiSettings4Line, label: 'Services' },
                    { id: 'accreds', onClick: () => setShowAccreditations(true), icon: RiAwardLine, label: 'Accreds' },
                    { id: 'contact', href: '/contact', icon: RiMailLine, label: 'Contact' },
                    { id: 'reviews', onClick: () => setShowTestimonials(true), icon: RiTeamLine, label: 'Reviews' },
                    { id: 'expertise', onClick: () => setShowExpertise(true), icon: RiHeartPulseLine, label: 'Expertise' },
                    { id: 'divider', type: 'divider' },
                    { id: 'chat', onClick: () => setShowChat(true), icon: RiMessage3Line, label: 'Chat' },
                    { id: 'whatsapp', href: 'https://wa.me/201000000000', icon: RiWhatsappLine, label: 'WhatsApp', color: 'secondary' },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.3 }}
                      >
                        {item.type === 'divider' ? (
                          <div className="h-px bg-border-light dark:bg-border-dark mx-1 my-1" />
                        ) : item.href ? (
                          <Link
                            href={item.href}
                            target={item.id === 'whatsapp' ? "_blank" : undefined}
                            className="group flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark hover:border-primary-500/30 border border-transparent transition-all duration-300"
                          >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color === 'secondary' ? 'from-secondary-500/20 to-secondary-600/20' : 'from-primary-500/20 to-secondary-500/20'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              {Icon && <Icon size={20} className={`${item.color === 'secondary' ? 'text-secondary-500' : 'text-primary-500'} group-hover:text-white transition-colors`} />}
                            </div>
                            <span className="text-[9px] font-medium text-text-light dark:text-text-dark leading-tight">{item.label}</span>
                          </Link>
                        ) : (
                          <button
                            onClick={item.onClick}
                            className="group flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark hover:border-primary-500/30 border border-transparent transition-all duration-300 w-full"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              {Icon && <Icon size={20} className="text-primary-500 group-hover:text-white transition-colors" />}
                            </div>
                            <span className="text-[9px] font-medium text-text-light dark:text-text-dark leading-tight">{item.label}</span>
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>



        {/* Left Column - Orbital Knob */}

        <motion.div
          layout
          transition={{ type: "spring", damping: 30, stiffness: 260 }}
          className="flex-1 relative min-h-[80vh] flex items-center justify-center mt-14"
        >

          {/* Countries Section - Flags Only - Moved down */}

          {/* Countries Filter - Lowered to clear Navbar */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30">

            <div className="flex items-center justify-center gap-12">

              {COUNTRIES.map((country, idx) => (
                <motion.button
                  key={country.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2
                    },
                    opacity: { duration: 0.5, delay: idx * 0.1 }
                  }}
                  onClick={() => setSelectedCountry(country)}
                  className="group relative flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {/* Orbiting Particle (Comet) */}
                  <div className="absolute inset-[-10px] pointer-events-none rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                      {/* Trail (Arc) */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 60%, rgba(18, 122, 138, 0.4) 100%)',
                          maskImage: 'radial-gradient(transparent 65%, black 67%)',
                          WebkitMaskImage: 'radial-gradient(transparent 65%, black 67%)'
                        }}
                      />
                      {/* Head */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_#127A8A]" />
                      </div>
                    </div>
                  </div>

                  <div className="w-12 h-10 rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-primary-500/50 transition-all duration-300 relative z-10">
                    <ReactCountryFlag
                      countryCode={country.flag}
                      svg
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-primary-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </motion.button>
              ))}

            </div>

          </div>



          {/* Orbital Layout - Centered */}

          <div

            className="relative w-full h-[500px] mt-6 flex items-center justify-center"

            onMouseEnter={() => setIsHovering(true)}

            onMouseLeave={() => setIsHovering(false)}

          >

            {/* Rotating ring - Teal accent - Now centered with logos */}

            <div

              className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"

              style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}

            >

              <div className="w-[380px] h-[380px] border-2 border-dashed border-primary-500/50 rounded-full" />

            </div>



            {/* Second rotating ring - Gold accent */}

            <div

              className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"

              style={{ transform: `translate(-50%, -50%) rotate(${-rotation * 0.5}deg)` }}

            >

              <div className="w-[420px] h-[420px] border border-secondary-500/50 rounded-full" />

            </div>



            {/* Inner glow ring */}

            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">

              <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-br from-primary-500/5 to-secondary-500/5 blur-xl" />

            </div>



            {/* Central Marvel Logo - Centered in space */}

            <div

              className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"

              style={{

                transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(${isHovering ? 1.05 : 1})`,

                transition: "transform 0.3s ease-out",

              }}

            >

              {/* Logo glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />

              {/* Central Comet Orbit */}
              <div className="absolute inset-[-18px] pointer-events-none">
                <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                  {/* The Trail (Arc) */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 60%, rgba(18, 122, 138, 0.4) 100%)',
                      maskImage: 'radial-gradient(transparent 68%, black 70%)',
                      WebkitMaskImage: 'radial-gradient(transparent 68%, black 70%)'
                    }}
                  />
                  {/* The Head (Point) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_15px_#127A8A,0_0_25px_#127A8A]" />
                  </div>
                </div>
              </div>

              <div className="relative w-32 h-32 rounded-full glass-light dark:glass-dark flex items-center justify-center border-2 border-primary-500/30 group-hover:border-primary-500/60 transition-all duration-500 shadow-2xl">

                <Image

                  src="/Logo.png"

                  alt="Marvel Group"

                  width={70}

                  height={70}

                  className="object-contain w-auto h-auto"

                  loading="eager"

                  priority

                />

              </div>

            </div>



            {/* Company Orbitals */}

            {companies.map((company, index) => {

              const position = ORBIT_POSITIONS[index];

              const angleRad = ((position.angle + rotation * 0.2) * Math.PI) / 180;

              const x = Math.cos(angleRad) * position.distance;

              const y = Math.sin(angleRad) * position.distance;



              return (

                <div

                  key={company.id}

                  className="absolute left-1/2 top-1/2 cursor-pointer group"

                  style={{

                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,

                    transition: "transform 0.1s linear",

                    zIndex: 10 + index,

                  }}

                  onClick={() => setSelectedCompany(company)}

                >

                  {/* Connection line to center */}

                  <svg

                    className="absolute pointer-events-none"

                    style={{

                      left: "50%",

                      top: "50%",

                      width: `${Math.abs(x) + 20}px`,

                      height: `${Math.abs(y) + 20}px`,

                      transform: `translate(-50%, -50%)`,

                      opacity: 0.2,

                    }}

                  >

                    <line

                      x1="50%"

                      y1="50%"

                      x2={x > 0 ? "100%" : "0%"}

                      y2={y > 0 ? "100%" : "0%"}

                      stroke="currentColor"

                      strokeWidth="1"

                      className="text-primary-500"

                      strokeDasharray="4 4"

                    />

                  </svg>



                  {/* Company Node */}

                  <div className="relative -top-4">

                    <div className={`absolute inset-0 bg-gradient-to-br ${company.color} rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-all duration-300`} />

                    <div className={`relative w-16 h-16 rounded-full glass-light dark:glass-dark border-2 border-transparent group-hover:border-primary-500/50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl`}>

                      {company.logo ? (

                        <Image

                          src={company.logo}

                          alt={company.name}

                          width={40}

                          height={40}

                          className="object-contain w-auto h-auto"

                        />

                      ) : (

                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-base font-bold`}>

                          {company.icon}

                        </div>

                      )}

                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 -top-12 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">

                      <div className="bg-surface-light dark:bg-surface-dark px-3 py-1.5 rounded-lg shadow-lg border border-border-light dark:border-border-dark whitespace-nowrap">

                        <span className="text-sm font-semibold text-text-light dark:text-text-dark">{company.name}</span>

                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-surface-light dark:bg-surface-dark rotate-45 border-r border-b border-border-light dark:border-border-dark" />

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </motion.div>



        {/* Right Panel Toggle Button (when hidden) */}
        <AnimatePresence mode="wait">
          {!showRightPanel && (
            <motion.button
              key="right-panel-toggle"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRightPanel(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-2xl flex items-center justify-center hover:bg-surface-light dark:hover:bg-surface-dark transition-all group"
              title="Show Network Panel"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-secondary-500/20 blur-md rounded-full group-hover:bg-secondary-500/40 transition-all" />
                <RiGlobalLine size={28} className="text-secondary-500 relative z-10" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right Column - Our Network Panel */}
        <AnimatePresence>
          {showRightPanel && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{
                layout: { type: "spring", damping: 30, stiffness: 260 },
                opacity: { duration: 0.2 },
                x: { type: "spring", damping: 30, stiffness: 260 }
              }}
              className="w-64 flex flex-col gap-4 py-8 relative"
            >
              {/* Toggle Button to Hide */}
              <button
                onClick={() => setShowRightPanel(false)}
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-md flex items-center justify-center hover:bg-secondary-500 hover:text-white transition-all z-50 group"
                title="Hide Network Panel"
              >
                <RiArrowRightSLine size={18} className="group-hover:scale-110 transition-transform" />
              </button>



              <div className="rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-xl overflow-hidden">
                <div className="flex flex-col gap-4 p-4 max-h-[73vh] overflow-y-auto custom-scrollbar">
                  {/* Tabs */}
                  <div className="flex gap-1 p-1 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">

                    {[

                      { id: "pharma", label: "Pharma", icon: RiBriefcaseLine },

                      { id: "vendors", label: "Tech", icon: RiComputerLine },

                      { id: "societies", label: "Medical", icon: RiBuildingLine },

                    ].map((tab) => (

                      <button

                        key={tab.id}

                        onClick={() => setActiveClientTab(tab.id as any)}

                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg text-xs font-medium transition-all ${activeClientTab === tab.id

                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"

                          : "text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark"

                          }`}

                      >

                        <tab.icon size={12} />

                        {tab.label}

                      </button>

                    ))}

                  </div>



                  {/* Clients List */}

                  <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-2 pr-1">

                    {segmentedClients[activeClientTab]?.map((client, idx) => (

                      <motion.button

                        key={client.id}

                        initial={{ opacity: 0, x: 20 }}

                        animate={{ opacity: 1, x: 0 }}

                        transition={{ delay: idx * 0.05 + 0.3 }}

                        onClick={() => setSelectedClient(client)}

                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-300 group text-left"

                      >

                        {/* Client Logo */}

                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">

                          {client.logo ? (

                            <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-1" />

                          ) : (

                            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">

                              {client.name.slice(0, 2).toUpperCase()}

                            </div>

                          )}

                        </div>

                        {/* Client Info */}

                        <div className="min-w-0 flex-1">

                          <h4 className="font-medium text-sm text-text-light dark:text-text-dark truncate group-hover:text-primary-500 transition-colors">

                            {client.name}

                          </h4>

                          <p className="text-xs text-muted-light dark:text-muted-dark flex items-center gap-1">

                            <ReactCountryFlag countryCode={client.flag} svg className="!w-3 !h-3" />

                            {client.country}

                          </p>

                        </div>

                        <RiArrowRightLine size={14} className="text-muted-light dark:text-muted-dark group-hover:text-primary-500 transition-all duration-300 group-hover:translate-x-1" />

                      </motion.button>

                    ))}

                  </div>



                  {/* Footer Stats */}

                  <div className="pt-3 border-t border-border-light dark:border-border-dark">

                    <p className="text-xs text-center text-muted-light dark:text-muted-dark">

                      {segmentedClients[activeClientTab]?.length || 0} {activeClientTab === "pharma" ? "Pharma Partners" : activeClientTab === "vendors" ? "Tech Vendors" : "Medical Societies"}

                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>



      {/* Company Modal Popup */}

      {selectedCompany && (

        <CompanyModal

          company={selectedCompany}

          onClose={() => setSelectedCompany(null)}

        />

      )}



      {/* Client Work Popup - Information Box Style */}

      {selectedClient && (

        <ClientWorkPopup

          client={selectedClient}

          onClose={() => setSelectedClient(null)}

        />

      )}



      {/* Country Modal Popup */}

      {selectedCountry && (

        <CountryModal

          country={selectedCountry}

          onClose={() => setSelectedCountry(null)}

        />

      )}



      {/* Services Modal Popup */}

      {showServices && (

        <ServicesModal

          activeTab={activeTab}

          setActiveTab={setActiveTab}

          onClose={() => setShowServices(false)}

        />

      )}



      {/* Accreditations Modal Popup */}

      {showAccreditations && (

        <AccreditationsModal

          onClose={() => setShowAccreditations(false)}

        />

      )}



      {/* Testimonials Modal Popup */}

      {showTestimonials && (

        <TestimonialsModal

          activeTestimonial={activeTestimonial}

          setActiveTestimonial={setActiveTestimonial}

          onClose={() => setShowTestimonials(false)}

        />

      )}



      {/* Chat Modal Popup */}

      {showChat && (

        <ChatModal

          onClose={() => setShowChat(false)}

        />

      )}



      {/* Expertise Modal Popup */}

      {showExpertise && (

        <ExpertiseModal

          onClose={() => setShowExpertise(false)}

        />

      )}

    </section>

  );

}



// Country Modal Component

function CountryModal({ country, onClose }: { country: any; onClose: () => void }) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}

      <div

        className="absolute inset-0 bg-black/70 backdrop-blur-md"

        onClick={onClose}

      />



      {/* Modal Content */}

      <div className="relative w-full max-w-lg glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

        {/* Header with Flag */}

        <div className="relative h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">

          <button

            onClick={onClose}

            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-primary-500/20 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-500 transition-colors"

          >

            <RiCloseLine size={24} />

          </button>

          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-surface-light dark:border-surface-dark">

            <ReactCountryFlag

              countryCode={country.flag}

              svg

              style={{ width: "100%", height: "100%", objectFit: "cover" }}

            />

          </div>

        </div>



        {/* Content */}

        <div className="p-6">

          <div className="text-center mb-6">

            <h3 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">

              {country.name}

            </h3>

            <p className="text-sm text-primary-500 font-medium mt-1">

              {country.city}

            </p>

          </div>



          <p className="text-sm text-muted-light dark:text-muted-dark mb-6 leading-relaxed">

            {country.description}

          </p>



          {/* Stats */}

          <div className="grid grid-cols-3 gap-4 mb-6">

            <div className="text-center p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">

              <p className="text-lg font-bold text-primary-500">{country.stats.employees}</p>

              <p className="text-xs text-muted-light dark:text-muted-dark">Employees</p>

            </div>

            <div className="text-center p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">

              <p className="text-lg font-bold text-secondary-500">{country.stats.projects}</p>

              <p className="text-xs text-muted-light dark:text-muted-dark">Projects</p>

            </div>

            <div className="text-center p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">

              <p className="text-lg font-bold text-primary-500">{country.stats.clients}</p>

              <p className="text-xs text-muted-light dark:text-muted-dark">Clients</p>

            </div>

          </div>



          {/* Companies */}

          <div className="mb-6">

            <p className="text-xs uppercase tracking-widest text-muted-light dark:text-muted-dark mb-3">

              Operating Companies

            </p>

            <div className="flex flex-wrap gap-2">

              {country.companies.map((company: string, i: number) => (

                <span

                  key={i}

                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-500/10 text-primary-500 border border-primary-500/20"

                >

                  {company}

                </span>

              ))}

            </div>

          </div>



          {/* Footer */}

          <Link

            href="/contact"

            onClick={onClose}

            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:opacity-90 transition-opacity"

          >

            Contact Us

            <RiArrowRightLine size={18} />

          </Link>

        </div>

      </div>

    </div>

  );

}



// Services Modal Component

function ServicesModal({

  activeTab,

  setActiveTab,

  onClose,

}: {

  activeTab: "comprehensive" | "featured" | "products";

  setActiveTab: (tab: "comprehensive" | "featured" | "products") => void;

  onClose: () => void;

}) {

  const [selectedService, setSelectedService] = useState("cme");



  useEffect(() => {

    if (activeTab === "comprehensive") {

      setSelectedService("cme");

    } else if (activeTab === "featured") {

      setSelectedService("accreditation");

    }

  }, [activeTab]);



  const comprehensiveServices = [

    {

      id: "cme",

      icon: RiGraduationCapLine,

      title: "CME",

      subtitle: "Continuing Medical Education",

      services: [

        { name: "Curriculum Design", desc: "Comprehensive CME program structuring" },

        { name: "Content Development", desc: "Medical education content creation" },

        { name: "Slide Decks", desc: "Professional presentation materials" },

        { name: "Gamification", desc: "Case studies, patient profiles, interactivity" },

        { name: "Speakers", desc: "Expert faculty management" },

        { name: "Accreditation", desc: "CPD, DHA, SCFHS certificates" },

        { name: "Endorsed Materials", desc: "Officially recognized content" },

      ],

    },

    {

      id: "research",

      icon: RiFileTextLine,

      title: "Research & Writing",

      subtitle: "Evidence-based publications",

      services: [

        { name: "Study Design", desc: "Clinical and observational research" },

        { name: "Data Analysis", desc: "Statistical and qualitative analysis" },

        { name: "Manuscript Writing", desc: "Peer-reviewed publication support" },

        { name: "Literature Review", desc: "Comprehensive evidence synthesis" },

        { name: "Abstracts & Posters", desc: "Conference submission support" },

      ],

    },

    {

      id: "elearning",

      icon: RiComputerLine,

      title: "eLearning",

      subtitle: "Digital education platforms",

      services: [

        { name: "LMS Development", desc: "Learning management systems" },

        { name: "Interactive Modules", desc: "Engaging digital content" },

        { name: "VR Training", desc: "Virtual reality medical simulations" },

        { name: "Mobile Apps", desc: "Healthcare education apps" },

        { name: "Assessment Tools", desc: "Online testing & certification" },

      ],

    },

    {

      id: "artwork",

      icon: RiPaletteLine,

      title: "Artwork & Marketing",

      subtitle: "Creative healthcare solutions",

      services: [

        { name: "Brand Identity", desc: "Logo and visual system design" },

        { name: "Marketing Campaigns", desc: "Multi-channel promotion strategies" },

        { name: "Medical Illustration", desc: "Anatomical and scientific art" },

        { name: "Video Production", desc: "Educational and promotional videos" },

        { name: "Social Media", desc: "Digital marketing management" },

      ],

    },

    {

      id: "training",

      icon: RiUserSettingsLine,

      title: "Training",

      subtitle: "Professional development",

      services: [

        { name: "Workshops", desc: "Hands-on skill development" },

        { name: "Certification Programs", desc: "Professional credentials" },

        { name: "On-site Training", desc: "In-person education delivery" },

        { name: "Train-the-Trainer", desc: "Faculty development programs" },

      ],

    },

    {

      id: "it",

      icon: RiCodeBoxLine,

      title: "IT Solutions",

      subtitle: "Healthcare technology",

      services: [

        { name: "Custom Software", desc: "Bespoke healthcare applications" },

        { name: "CRM Systems", desc: "Customer relationship platforms" },

        { name: "Data Analytics", desc: "Healthcare intelligence dashboards" },

        { name: "AI Integration", desc: "Machine learning solutions" },

      ],

    },

    {

      id: "visuals",

      icon: RiVideoLine,

      title: "Visuals, Videos & VR",

      subtitle: "Immersive visual experiences",

      services: [

        { name: "3D Medical Animation", desc: "Complex medical concepts visualization" },

        { name: "VR Training", desc: "Virtual reality medical simulations" },

        { name: "Video Production", desc: "Professional healthcare videos" },

        { name: "Interactive Media", desc: "Engaging digital experiences" },

        { name: "Motion Graphics", desc: "Animated medical illustrations" },

        { name: "360° Tours", desc: "Virtual facility walkthroughs" },

      ],

    },

    {

      id: "events",

      icon: RiCalendarEventLine,

      title: "Event Management",

      subtitle: "Healthcare events & conferences",

      services: [

        { name: "Conference Planning", desc: "Full-service medical conferences" },

        { name: "Virtual Events", desc: "Online webinars & summits" },

        { name: "Hybrid Events", desc: "In-person + digital combined" },

        { name: "Exhibition Booths", desc: "Trade show presence design" },

        { name: "Speaker Management", desc: "Keynote & panel coordination" },

        { name: "CME Events", desc: "Accredited educational events" },

      ],

    },

  ];



  const featuredServices = [

    {

      id: "accreditation",

      icon: RiStarLine,

      title: "Accreditation Services",

      subtitle: "Globally recognized certifications",

      description: "Comprehensive accreditation programs recognized worldwide",

      badge: "Certified",

      color: "from-primary-500 to-secondary-400",

      features: [

        { name: "CPD-UK", desc: "UK Continuous Professional Development" },

        { name: "DHA Approved", desc: "Dubai Health Authority accredited" },

        { name: "SCFHS Certified", desc: "Saudi Commission for Health Specialties" },

        { name: "RCSEd Endorsed", desc: "Royal College of Surgeons of Edinburgh" },

        { name: "CME Credits", desc: "Continuing Medical Education credits" },

        { name: "Global Recognition", desc: "Internationally accepted certificates" },

      ],

    },

    {

      id: "standalone",

      icon: RiStackLine,

      title: "Standalone Services",

      subtitle: "Modular healthcare solutions",

      description: "Flexible solutions that integrate seamlessly with existing systems",

      badge: "Flexible",

      color: "from-secondary-400 to-primary-500",

      features: [

        { name: "Modular Design", desc: "Pick and choose what you need" },

        { name: "Easy Integration", desc: "Works with existing workflows" },

        { name: "Scalable", desc: "Grows with your organization" },

        { name: "Customizable", desc: "Tailored to your requirements" },

        { name: "Quick Deployment", desc: "Fast implementation timeline" },

        { name: "Cost Effective", desc: "Pay for what you use" },

      ],

    },

    {

      id: "digital",

      icon: RiComputerLine,

      title: "Digital Solutions",

      subtitle: "AI-powered healthcare tech",

      description: "Cutting-edge AI-driven platforms and automated workflows",

      badge: "Innovative",

      color: "from-primary-500 to-secondary-400",

      features: [

        { name: "AI Integration", desc: "Machine learning powered tools" },

        { name: "Automation", desc: "Streamlined workflows" },

        { name: "Analytics Dashboard", desc: "Real-time data insights" },

        { name: "Cloud Based", desc: "Secure cloud infrastructure" },

        { name: "Mobile Ready", desc: "Works on all devices" },

        { name: "API Access", desc: "Connect with other systems" },

      ],

    },

  ];



  const products = [

    {

      id: "tebzone",

      letter: "T",

      title: "TebZone",

      subtitle: "Healthcare E-commerce Platform",

      description: "A comprehensive healthcare marketplace connecting patients, pharmacies, and medical suppliers with seamless digital transactions and real-time inventory management.",

      status: "LIVE",

      features: ["Medicine Marketplace", "Prescription Upload", "Real-time Tracking", "Secure Payments"],

    },

    {

      id: "medadd",

      letter: "M",

      title: "Med-ADD",

      subtitle: "Medical Advertising & Detailing",

      description: "Revolutionize pharmaceutical sales force training with adaptive AI simulations, real-world scenario modeling, and performance analytics that drive measurable results.",

      status: "LIVE",

      features: ["AI Role-play Simulations", "Performance Analytics", "Compliance Tracking", "Interactive Modules"],

    },

    {

      id: "medvi",

      letter: "V",

      title: "Med-Vi",

      subtitle: "Video Production & VR Training",

      description: "A comprehensive platform for medical education, HCP engagement, and knowledge assessment with CPD-accredited modules and interactive case studies.",

      status: "LIVE",

      features: ["CPD-Accredited Modules", "Interactive Cases", "HCP Analytics", "VR Simulations"],

    },

    {

      id: "medlab",

      letter: "L",

      title: "Med-Lab",

      subtitle: "Laboratory Management System",

      description: "Next-generation laboratory information management system with automated workflows, quality control tracking, and regulatory compliance features.",

      status: "Coming Soon",

      features: ["Sample Tracking", "QC Management", "Reports Dashboard", "LIMS Integration"],

    },

  ];



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}

      <div

        className="absolute inset-0 bg-black/70 backdrop-blur-md"

        onClick={onClose}

      />



      {/* Modal Content */}

      <div className="relative w-full max-w-6xl max-h-[90vh] glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark">

          <h2 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">

            Our Services & Products

          </h2>

          <button

            onClick={onClose}

            className="w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-primary-500/20 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-500 transition-colors"

          >

            <RiCloseLine size={24} />

          </button>

        </div>



        {/* Tabs */}

        <div className="flex items-center gap-2 p-4 border-b border-border-light dark:border-border-dark bg-surface-light/50 dark:bg-surface-dark/50">

          {[

            { id: "comprehensive", label: "Comprehensive", icon: RiServiceLine },

            { id: "featured", label: "Featured", icon: RiStarLine },

            { id: "products", label: "Products", icon: RiStackLine },

          ].map((tab) => (

            <button

              key={tab.id}

              onClick={() => setActiveTab(tab.id as any)}

              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id

                ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"

                : "text-muted-light dark:text-muted-dark hover:bg-surface-light dark:hover:bg-surface-dark"

                }`}

            >

              <tab.icon size={18} />

              {tab.label}

            </button>

          ))}

        </div>



        {/* Content */}

        <div className="flex-1 overflow-y-auto">

          {activeTab === "comprehensive" && (

            <div className="h-full flex flex-col p-6">

              {/* Header */}

              <div className="text-center mb-6">

                <p className="text-xs uppercase tracking-widest text-primary-500 mb-2">What We Do</p>

                <h3 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">

                  Comprehensive Services

                </h3>

                <p className="text-sm text-muted-light dark:text-muted-dark mt-2">

                  Deep expertise across the full spectrum of medical education and healthcare communication

                </p>

              </div>



              {/* Two Column Layout */}

              <div className="flex-1 flex gap-4 overflow-hidden">

                {/* Left Sidebar - Service Buttons */}

                <div className="w-64 flex flex-col gap-2 overflow-y-auto pr-2">

                  {comprehensiveServices.map((service) => (

                    <button

                      key={service.id}

                      onClick={() => setSelectedService(service.id)}

                      className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 group ${selectedService === service.id

                        ? "bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30"

                        : "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-500/20"

                        }`}

                    >

                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${selectedService === service.id

                        ? "bg-gradient-to-br from-primary-500 to-secondary-500 text-white"

                        : "bg-black/5 dark:bg-white/5 text-text-light dark:text-text-dark group-hover:bg-primary-500/10"

                        }`}>

                        <service.icon size={20} />

                      </div>

                      <span className={`font-medium text-sm ${selectedService === service.id

                        ? "text-primary-500"

                        : "text-text-light dark:text-text-dark"

                        }`}>

                        {service.title}

                      </span>

                      {selectedService === service.id && (

                        <RiArrowRightSLine className="ml-auto text-primary-500" size={18} />

                      )}

                    </button>

                  ))}

                </div>



                {/* Right Content - Service Details */}

                <div className="flex-1 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 overflow-y-auto">

                  {(() => {

                    const service = comprehensiveServices.find(s => s.id === selectedService);

                    if (!service) return null;

                    return (

                      <div>

                        <div className="flex items-center gap-4 mb-6">

                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">

                            <service.icon size={28} />

                          </div>

                          <div>

                            <h4 className="font-display text-xl font-bold text-text-light dark:text-text-dark">

                              {service.title}

                            </h4>

                            <p className="text-sm text-muted-light dark:text-muted-dark">

                              {service.services.length} specialized services

                            </p>

                          </div>

                        </div>



                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                          {service.services.map((item, i) => (

                            <div

                              key={i}

                              className="flex items-start gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary-500/5 transition-colors"

                            >

                              <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 mt-0.5">

                                <RiCheckLine className="text-primary-500" size={12} />

                              </div>

                              <div>

                                <h5 className="font-medium text-sm text-text-light dark:text-text-dark">

                                  {item.name}

                                </h5>

                                <p className="text-xs text-muted-light dark:text-muted-dark mt-0.5">

                                  {item.desc}

                                </p>

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>

                    );

                  })()}

                </div>

              </div>



              {/* Footer */}

              <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">

                <div className="flex items-center justify-between">

                  <p className="text-sm text-muted-light dark:text-muted-dark">

                    Explore our complete range of healthcare solutions

                  </p>

                  <Link

                    href="/contact"

                    onClick={onClose}

                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:opacity-90 transition-opacity"

                  >

                    Contact Us

                    <RiArrowRightLine size={16} />

                  </Link>

                </div>

              </div>

            </div>

          )}



          {activeTab === "featured" && (

            <div className="h-full flex flex-col p-6">

              {/* Header */}

              <div className="text-center mb-6">

                <p className="text-xs uppercase tracking-widest text-secondary-500 mb-2">Premium Offerings</p>

                <h3 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">

                  Featured Services

                </h3>

                <p className="text-sm text-muted-light dark:text-muted-dark mt-2">

                  Premium healthcare solutions designed for maximum impact

                </p>

              </div>



              {/* Two Column Layout */}

              <div className="flex-1 flex gap-4 overflow-hidden">

                {/* Left Sidebar - Service Buttons */}

                <div className="w-64 flex flex-col gap-2 overflow-y-auto pr-2">

                  {featuredServices.map((service) => (

                    <button

                      key={service.id}

                      onClick={() => setSelectedService(service.id)}

                      className={`flex whitespace-nowrap items-center gap-3 p-2 py-3 rounded-xl text-left transition-all duration-300 group ${selectedService === service.id

                        ? "bg-gradient-to-r from-secondary-500/20 to-primary-500/20 border border-secondary-500/30"

                        : "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-secondary-500/20"

                        }`}

                    >

                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${selectedService === service.id

                        ? "bg-gradient-to-br from-secondary-500 to-primary-500 text-white"

                        : "bg-black/5 dark:bg-white/5 text-text-light dark:text-text-dark group-hover:bg-secondary-500/10"

                        }`}>

                        <service.icon size={20} />

                      </div>

                      <div className="flex-1 min-w-0">

                        <span className={`font-medium text-sm block ${selectedService === service.id

                          ? "text-secondary-500"

                          : "text-text-light dark:text-text-dark"

                          }`}>

                          {service.title}

                        </span>

                        <span className="text-xs text-muted-light dark:text-muted-dark">

                          {service.badge}

                        </span>

                      </div>

                      {selectedService === service.id && (

                        <RiArrowRightSLine className="text-secondary-500 shrink-0" size={18} />

                      )}

                    </button>

                  ))}

                </div>



                {/* Right Content - Service Details */}

                <div className="flex-1 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 overflow-y-auto">

                  {(() => {

                    const service = featuredServices.find(s => s.id === selectedService);

                    if (!service) return null;

                    return (

                      <div>

                        <div className="flex items-center gap-4 mb-6">

                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white`}>

                            <service.icon size={28} />

                          </div>

                          <div>

                            <div className="flex items-center gap-2">

                              <h4 className="font-display text-xl font-bold text-text-light dark:text-text-dark">

                                {service.title}

                              </h4>

                              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-secondary-500/20 text-secondary-500">

                                {service.badge}

                              </span>

                            </div>

                            <p className="text-sm text-muted-light dark:text-muted-dark">

                              {service.subtitle}

                            </p>

                          </div>

                        </div>



                        <p className="text-sm text-text-light dark:text-text-dark mb-4">

                          {service.description}

                        </p>



                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                          {service.features.map((item, i) => (

                            <div

                              key={i}

                              className="flex items-start gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-secondary-500/5 transition-colors"

                            >

                              <div className="w-5 h-5 rounded-full bg-secondary-500/20 flex items-center justify-center shrink-0 mt-0.5">

                                <RiCheckLine className="text-secondary-500" size={12} />

                              </div>

                              <div>

                                <h5 className="font-medium text-sm text-text-light dark:text-text-dark">

                                  {item.name}

                                </h5>

                                <p className="text-xs text-muted-light dark:text-muted-dark mt-0.5">

                                  {item.desc}

                                </p>

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>

                    );

                  })()}

                </div>

              </div>



              {/* Footer */}

              <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">

                <div className="flex items-center justify-between">

                  <p className="text-sm text-muted-light dark:text-muted-dark">

                    Explore our complete range of healthcare solutions

                  </p>

                  <Link

                    href="/contact"

                    onClick={onClose}

                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:opacity-90 transition-opacity"

                  >

                    Contact Us

                    <RiArrowRightLine size={16} />

                  </Link>

                </div>

              </div>

            </div>

          )}



          {activeTab === "products" && (

            <div className="h-full flex flex-col p-6">

              {/* Header */}

              <div className="text-center mb-8">

                <p className="text-xs uppercase tracking-widest text-primary-500 mb-2">Our Products</p>

                <h3 className="font-display text-3xl font-bold text-text-light dark:text-text-dark">

                  Built for Healthcare.

                </h3>

                <p className="text-sm text-muted-light dark:text-muted-dark max-w-2xl mx-auto mt-3">

                  Proprietary technology platforms engineered for pharmaceutical companies, medical education, and HCP engagement.

                </p>

              </div>



              {/* Products Grid */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {products.map((product) => (

                  <div

                    key={product.id}

                    className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-300 group hover-lift relative overflow-hidden"

                  >

                    {/* Status Badge */}

                    <div className="absolute top-4 right-4">

                      <span

                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${product.status === "LIVE"

                          ? "bg-secondary-500/20 text-secondary-500 border border-secondary-500/30"

                          : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"

                          }`}

                      >

                        {product.status === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />}

                        {product.status === "LIVE" ? "LIVE" : product.status}

                      </span>

                    </div>



                    {/* Product Icon */}

                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg mb-4">

                      {product.letter}

                    </div>



                    {/* Title & Subtitle */}

                    <h3 className="font-display text-xl font-bold text-text-light dark:text-text-dark mb-1">

                      {product.title}

                    </h3>

                    <p className="text-xs text-primary-500 font-medium mb-3">

                      {product.subtitle}

                    </p>



                    {/* Description */}

                    <p className="text-sm text-muted-light dark:text-muted-dark mb-4 leading-relaxed">

                      {product.description}

                    </p>



                    {/* Features */}

                    <ul className="space-y-2">

                      {product.features.map((feature, i) => (

                        <li

                          key={i}

                          className="flex items-center gap-2 text-sm text-muted-light dark:text-muted-dark"

                        >

                          <RiCheckLine className="text-secondary-500 shrink-0" size={14} />

                          {feature}

                        </li>

                      ))}

                    </ul>

                  </div>

                ))}

              </div>



              {/* Footer */}

              <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">

                <div className="flex items-center justify-between">

                  <p className="text-sm text-muted-light dark:text-muted-dark">

                    Explore our complete range of healthcare solutions

                  </p>

                  <Link

                    href="/contact"

                    onClick={onClose}

                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:opacity-90 transition-opacity"

                  >

                    Contact Us

                    <RiArrowRightLine size={16} />

                  </Link>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}



// Client Work Popup - Full Modal with Backdrop

function ClientWorkPopup({ client, onClose }: { client: SegmentedClient; onClose: () => void }) {

  // Sample work data for each specific client

  const clientWorkData: Record<string, { title: string; desc: string; year: string; type: string }[]> = {

    "Novo Nordisk": [

      { title: "Diabetes Management Campaign", desc: "Comprehensive digital campaign for diabetes awareness and patient education", year: "2024", type: "Campaign" },

      { title: "HCP Engagement Platform", desc: "Interactive platform for healthcare professionals with CME modules", year: "2024", type: "Digital" },

      { title: "Oncology Brand Strategy", desc: "Market entry strategy for new oncology portfolio", year: "2023", type: "Strategy" },

      { title: "Patient Education Videos", desc: "Video series for patient education on diabetes management", year: "2023", type: "Video" },

    ],

    "AstraZeneca": [

      { title: "Cardiometabolic eLearning", desc: "SCORM-compliant eLearning modules for cardiometabolic portfolio", year: "2024", type: "eLearning" },

      { title: "Brand Identity System", desc: "Complete brand identity and visual system for cardiology division", year: "2024", type: "Branding" },

      { title: "AI Medical Rep Training", desc: "AI-powered training platform for medical representatives", year: "2024", type: "AI/Training" },

      { title: "Social Media Campaign", desc: "Cardiology-focused social media campaign across MENA region", year: "2023", type: "Social" },

    ],

    "Bayer": [

      { title: "Women's Health Campaign", desc: "Integrated campaign for women's health awareness month", year: "2024", type: "Campaign" },

      { title: "Ophthalmology VR Training", desc: "Virtual reality training modules for ophthalmology products", year: "2023", type: "VR/Training" },

      { title: "Product Launch Event", desc: "Hybrid event for new product launch with virtual attendance", year: "2023", type: "Event" },

    ],

    "Pfizer": [

      { title: "Vaccine Education Platform", desc: "Educational platform for vaccine awareness and HCP training", year: "2024", type: "Education" },

      { title: "Rare Disease Campaign", desc: "Patient-centric campaign for rare disease awareness", year: "2024", type: "Campaign" },

      { title: "Medical Writing Services", desc: "Scientific publications and medical content development", year: "2023", type: "Content" },

    ],

    "Roche": [

      { title: "Oncology Brand Identity", desc: "Brand identity system for oncology portfolio", year: "2024", type: "Branding" },

      { title: "Diagnostic Solutions Portal", desc: "Web portal for diagnostic solutions and product information", year: "2023", type: "Digital" },

      { title: "CME-accredited Webinars", desc: "Series of CME-accredited webinars for oncologists", year: "2023", type: "Education" },

    ],

    "Sanofi": [

      { title: "Diabetes Digital Hub", desc: "Digital hub for diabetes patients with educational resources", year: "2024", type: "Digital" },

      { title: "General Medicines Campaign", desc: "Multi-channel campaign for general medicines portfolio", year: "2024", type: "Campaign" },

      { title: "Patient Support Program", desc: "Comprehensive patient support program with digital tools", year: "2023", type: "Program" },

    ],

  };



  // Default work items if client not in specific list

  const defaultWork: Record<string, { title: string; desc: string; year: string; type: string }[]> = {

    pharma: [

      { title: "Brand Strategy", desc: "Comprehensive brand positioning and market entry strategy", year: "2024", type: "Strategy" },

      { title: "Medical Education", desc: "CME-accredited training programs for HCPs", year: "2024", type: "Education" },

      { title: "Digital Campaign", desc: "Multi-channel digital marketing campaigns", year: "2023", type: "Campaign" },

      { title: "Product Launch", desc: "Integrated product launch campaign with events", year: "2023", type: "Launch" },

    ],

    vendor: [

      { title: "Tech Integration", desc: "Seamless platform integration and API development", year: "2024", type: "Tech" },

      { title: "Cloud Solutions", desc: "Scalable cloud infrastructure setup", year: "2024", type: "Cloud" },

      { title: "Analytics Platform", desc: "Advanced data analytics and reporting dashboards", year: "2023", type: "Analytics" },

      { title: "AI Solutions", desc: "AI-powered automation and optimization tools", year: "2023", type: "AI" },

    ],

    society: [

      { title: "Event Management", desc: "Virtual and hybrid conference solutions", year: "2024", type: "Events" },

      { title: "Content Creation", desc: "Medical content and educational materials", year: "2024", type: "Content" },

      { title: "Accreditation Services", desc: "CPD and CME accreditation services", year: "2023", type: "Accreditation" },

      { title: "Professional Training", desc: "Healthcare professional development programs", year: "2023", type: "Training" },

    ],

  };



  const workItems = clientWorkData[client.name] || defaultWork[client.category] || defaultWork.pharma;



  const categoryColors: Record<string, string> = {

    pharma: "from-primary-500 to-secondary-500",

    vendor: "from-secondary-500 to-primary-500",

    society: "from-primary-400 to-secondary-400",

  };

  const color = categoryColors[client.category] || categoryColors.pharma;



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop with blur */}

      <div

        className="absolute inset-0 bg-black/70 backdrop-blur-md"

        onClick={onClose}

      />



      {/* Modal Content - Larger */}

      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col">

        {/* Close button */}

        <button

          onClick={onClose}

          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-text-light dark:text-text-dark transition-colors"

        >

          <RiCloseLine size={20} />

        </button>



        {/* Header */}

        <div className="flex-none p-6 pb-4 border-b border-border-light dark:border-border-dark">

          <div className="flex items-center gap-4">

            {/* Logo */}

            <div className="w-16 h-16 rounded-2xl bg-surface-light dark:bg-surface-light border border-border-dark flex items-center justify-center overflow-hidden p-2 shrink-0">

              {client.logo ? (

                <Image
                  src={client.logo}
                  alt={client.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain bg-white" />

              ) : (

                <div className={`w-full h-full rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl font-bold`}>

                  {client.name.slice(0, 2).toUpperCase()}

                </div>

              )}

            </div>

            {/* Title */}

            <div className="min-w-0 flex-1">

              <h3 className="font-display text-xl font-bold text-text-light dark:text-text-dark">

                {client.name}

              </h3>

              <p className="text-sm text-muted-light dark:text-muted-dark flex items-center gap-1.5">

                <ReactCountryFlag countryCode={client.flag} svg className="!w-4 !h-3" />

                {client.country}

              </p>

              <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-500">

                {client.category === "pharma" ? "Pharmaceutical Partner" :

                  client.category === "vendor" ? "Technology Vendor" :

                    "Medical Society"}

              </span>

            </div>

          </div>

        </div>



        {/* Scrollable Content */}

        <div className="flex-1 overflow-y-auto p-6">

          {/* Work/Projects Section */}

          <div>

            <h4 className="text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-4 flex items-center gap-2">

              <span className={`w-8 h-0.5 bg-gradient-to-r ${color}`} />

              Previous Work & Projects

            </h4>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {workItems.map((work, i: number) => (

                <div key={i} className="group p-4 rounded-xl bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light/50 dark:border-border-dark/50 hover:border-primary-500/30 hover:bg-surface-light dark:hover:bg-surface-dark transition-all duration-300">

                  <div className="flex items-start gap-3">

                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0`}>

                      <span className="text-xs font-bold">{work.type.slice(0, 2).toUpperCase()}</span>

                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center gap-2 mb-1">

                        <span className="text-xs font-medium text-primary-500">{work.year}</span>

                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-500/10 text-secondary-500">{work.type}</span>

                      </div>

                      <h5 className="font-semibold text-sm text-text-light dark:text-text-dark mb-1">{work.title}</h5>

                      <p className="text-xs text-muted-light dark:text-muted-dark leading-relaxed">{work.desc}</p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>



          {/* Stats */}

          <div className="mt-6 grid grid-cols-3 gap-4 p-4 rounded-xl bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light/30 dark:border-border-dark/30">

            <div className="text-center">

              <div className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{workItems.length}+</div>

              <div className="text-xs text-muted-light dark:text-muted-dark mt-1">Projects</div>

            </div>

            <div className="text-center border-l border-border-light/30 dark:border-border-dark/30">

              <div className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>100%</div>

              <div className="text-xs text-muted-light dark:text-muted-dark mt-1">On Time</div>

            </div>

            <div className="text-center border-l border-border-light/30 dark:border-border-dark/30">

              <div className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>5★</div>

              <div className="text-xs text-muted-light dark:text-muted-dark mt-1">Rating</div>

            </div>

          </div>

        </div>



        {/* CTA */}

        <div className="flex-none p-6 pt-4 border-t border-border-light dark:border-border-dark bg-surface-light/30 dark:bg-surface-dark/30">

          <Link

            href="/work"

            onClick={onClose}

            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r ${color} text-white font-semibold hover:opacity-90 transition-opacity`}

          >

            <RiArrowRightLine size={18} />

            View All Work

          </Link>

        </div>

      </div>

    </div>

  );

}



// Modal Component

function CompanyModal({ company, onClose }: { company: Company; onClose: () => void }) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}

      <div

        className="absolute inset-0 bg-black/60 backdrop-blur-sm"

        onClick={onClose}

      />



      {/* Modal Content */}

      <div className="relative w-full max-w-lg glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

        {/* Header gradient */}

        <div className={`h-24 bg-gradient-to-r ${company.color} relative`}>

          <button

            onClick={onClose}

            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"

          >

            <RiCloseLine size={20} />

          </button>



          {/* Country flag */}

          <div className="absolute -bottom-4 left-6 w-8 h-6 rounded overflow-hidden shadow-md">

            <ReactCountryFlag

              countryCode={company.flag}

              svg

              style={{ width: "100%", height: "100%", objectFit: "cover" }}

            />

          </div>

        </div>



        {/* Content */}

        <div className="p-6 pt-8">

          {/* Logo & Title */}

          <div className="flex items-start gap-4 mb-4">

            {company.logo ? (

              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white flex items-center justify-center shadow-lg overflow-hidden p-2">

                <img

                  src={company.logo}

                  alt={company.name}

                  className="w-full h-full object-contain"

                />

              </div>

            ) : (

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>

                {company.icon}

              </div>

            )}

            <div>

              <h3 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">

                {company.name}

              </h3>

              <p className={`text-sm font-semibold uppercase tracking-wider bg-gradient-to-r ${company.color} bg-clip-text text-transparent`}>

                {company.tagline}

              </p>

            </div>

          </div>



          {/* Year badge */}

          <div className="flex items-center gap-2 mb-4">

            <span className="text-xs font-mono text-muted-light dark:text-muted-dark bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full">

              Est. {company.year}

            </span>

            <span className="text-xs text-muted-light dark:text-muted-dark">

              {company.country}

            </span>

          </div>



          {/* Description */}

          <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-6">

            {company.description}

          </p>



          {/* Actions */}

          <div className="flex items-center gap-3">

            <Link

              href="/contact"

              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${company.color} text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group`}

            >

              <RiMailLine size={18} />

              Get in Touch

              <RiArrowRightLine

                size={16}

                className="group-hover:translate-x-1 transition-transform"

              />

            </Link>

            <button

              onClick={onClose}

              className="px-6 py-3 rounded-xl border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"

            >

              Close

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}



function AccreditationsModal({ onClose }: { onClose: () => void }) {

  const accreditations = [

    {

      name: "Continuing Professional Development — UK",

      shortName: "CPD-UK",

      country: "United Kingdom",

      flag: "🇬🇧",

      description: "Internationally recognized accreditation for continuing professional development programs.",

      color: "from-primary-500 to-secondary-400",

    },

    {

      name: "Dubai Health Authority",

      shortName: "DHA",

      country: "UAE",

      flag: "🇦🇪",

      description: "Official recognition from the Dubai Health Authority for healthcare education.",

      color: "from-primary-500 to-secondary-400",

    },

    {

      name: "Saudi Commission for Health Specialties",

      shortName: "SCFHS",

      country: "Saudi Arabia",

      flag: "🇸🇦",

      description: "Accredited by SCFHS for CME programs in Saudi Arabia.",

      color: "from-primary-500 to-secondary-400",

    },

    {

      name: "Royal College of Surgeons of Edinburgh",

      shortName: "RCSEd",

      country: "United Kingdom",

      flag: "🇬🇧",

      description: "Partnership ensuring surgical education meets global standards.",

      color: "from-primary-500 to-secondary-400",

    },

  ];



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[80vh] flex flex-col">

        {/* Header */}

        <div className="flex-none bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark p-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">

              <RiAwardLine size={22} />

            </div>

            <div>

              <h2 className="font-display text-xl font-bold text-text-light dark:text-text-dark">Accreditations</h2>

              <p className="text-xs text-muted-light dark:text-muted-dark">Globally Recognized. Locally Trusted.</p>

            </div>

          </div>

          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-black/10 dark:hover:bg-white/10 transition-all">

            <RiCloseLine size={20} />

          </button>

        </div>



        {/* Scrollable Content */}

        <div className="flex-1 overflow-y-auto p-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {accreditations.map((acc) => (

              <div key={acc.shortName} className="glass-light dark:glass-dark rounded-2xl p-5 border border-border-light dark:border-border-dark hover:border-primary-500/40 transition-all duration-300">

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${acc.color} flex items-center justify-center mb-4 shadow-lg`}>

                  <RiShieldCheckLine className="text-white" size={24} />

                </div>

                <div className={`text-xl font-display font-bold bg-gradient-to-r ${acc.color} bg-clip-text text-transparent mb-1`}>

                  {acc.shortName}

                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-light dark:text-muted-dark mb-2">

                  <span>{acc.flag}</span>

                  {acc.country}

                </div>

                <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">

                  {acc.description}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}



// Testimonials Modal Component

function TestimonialsModal({ activeTestimonial, setActiveTestimonial, onClose }: { activeTestimonial: number; setActiveTestimonial: (i: number) => void; onClose: () => void }) {

  const testimonials = [

    {

      name: "Dr. Sarah Al-Rashidi",

      title: "Medical Director",

      company: "Novartis Gulf",

      review: "Marvel Group transformed our HCP engagement strategy completely. Their creative intelligence paired with medical precision is unlike anything we've experienced in 15 years of pharma marketing.",

      rating: 5,

      country: "UAE",

    },

    {

      name: "Ahmed Khalil",

      title: "Brand Manager",

      company: "Pfizer MENA",

      review: "The AREEP platform revolutionized how we train our medical reps. ROI was visible within 3 months. The Marvel team is truly elite.",

      rating: 5,

      country: "Egypt",

    },

    {

      name: "Dr. Mohammed Al-Ghamdi",

      title: "Learning & Development Director",

      company: "Saudi Pharma Group",

      review: "Outstanding medical education content. CPD-accredited, scientifically rigorous, and beautifully designed. Marvel Group sets the gold standard.",

      rating: 5,

      country: "KSA",

    },

  ];



  const countryFlags: Record<string, string> = { "UAE": "🇦🇪", "KSA": "🇸🇦", "Egypt": "🇪🇬" };

  const current = testimonials[activeTestimonial];



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-5xl glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

        {/* Header */}

        <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark p-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">

              <RiTeamLine size={22} />

            </div>

            <div>

              <h2 className="font-display text-xl font-bold text-text-light dark:text-text-dark">What Our Clients Say</h2>

              <p className="text-xs text-muted-light dark:text-muted-dark">Trusted by 100+ pharmaceutical brands across MENA.</p>

            </div>

          </div>

          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-black/10 dark:hover:bg-white/10 transition-all">

            <RiCloseLine size={20} />

          </button>

        </div>



        {/* Content */}

        <div className="p-8">

          {/* Quote */}

          <div className="relative mb-6">

            <div className="absolute -top-2 -left-2 w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center">

              <RiDoubleQuotesL className="text-primary-500/30" size={24} />

            </div>

            <p className="text-text-light dark:text-text-dark text-lg leading-relaxed relative z-10 pl-4">

              &ldquo;{current.review}&rdquo;

            </p>

          </div>



          {/* Stars */}

          <div className="flex gap-1.5 mb-6">

            {Array.from({ length: current.rating }).map((_, i) => (

              <div key={i} className="w-6 h-6 rounded-full bg-secondary-500/20 flex items-center justify-center">

                <RiStarFill className="text-secondary-400" size={14} />

              </div>

            ))}

          </div>



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

            <div className="text-3xl">{countryFlags[current.country] || "🇪🇬"}</div>

          </div>



          {/* Navigation Dots */}

          <div className="flex items-center justify-center gap-2 mt-8">

            {testimonials.map((_, i) => (

              <button

                key={i}

                onClick={() => setActiveTestimonial(i)}

                className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === i ? "w-6 bg-primary-500" : "w-2 bg-primary-500/30 hover:bg-primary-500/50"

                  }`}

              />

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}



// Chat Modal Component

function ChatModal({ onClose }: { onClose: () => void }) {

  const [messages, setMessages] = useState<{ id: number; text: string; sender: "user" | "bot" }[]>([

    { id: 1, text: "Hi there! 👋 How can we help you today?", sender: "bot" }

  ]);

  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);



  const botResponses: Record<string, string> = {

    "hello": "Hi there! 👋 Welcome to Marvel Group. How can I help you today?",

    "hi": "Hello! 👋 How can we assist you today?",

    "services": "We offer: Medical Creative Services, Digital Health Platforms, Medical Education, AI Solutions, and Medical Writing. Which one interests you?",

    "products": "Our products include: AREEP (AI Training), MAHER (Assessment Platform), DynaSync (CMS), and WaselMail. Want to learn more?",

    "contact": "You can reach us at info@marvelgroup.com or call our offices in Egypt, UAE, or KSA.",

    "price": "Our pricing varies based on project scope. Please contact us for a custom quote.",

    "work": "You can view our portfolio at /work. We've worked with 100+ pharma clients across MENA!",

    "default": "Thanks for your message! For detailed assistance, please contact us at info@marvelgroup.com. Our team typically responds within 24 hours."

  };



  function getBotResponse(userMessage: string): string {

    const lowerMsg = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(botResponses)) {

      if (lowerMsg.includes(key)) return response;

    }

    return botResponses.default;

  }



  const handleSend = () => {

    if (!input.trim()) return;



    const userMsg: { id: number; text: string; sender: "user" | "bot" } = { id: Date.now(), text: input, sender: "user" };

    setMessages(prev => [...prev, userMsg]);

    setInput("");

    setIsTyping(true);



    setTimeout(() => {

      const botMsg: { id: number; text: string; sender: "user" | "bot" } = { id: Date.now() + 1, text: getBotResponse(input), sender: "bot" };

      setMessages(prev => [...prev, botMsg]);

      setIsTyping(false);

    }, 1000);

  };



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md glass-light dark:glass-dark rounded-2xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

        {/* Header */}

        <div className="bg-primary-500 px-4 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">

              <RiMessage3Line size={20} className="text-white" />

            </div>

            <div>

              <h4 className="text-white font-semibold">Marvel Support</h4>

              <p className="text-white/70 text-xs flex items-center gap-1">

                <span className="w-2 h-2 rounded-full bg-green-400" />

                Online

              </p>

            </div>

          </div>

          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">

            <RiCloseLine size={18} />

          </button>

        </div>



        {/* Messages */}

        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-surface-light/50 dark:bg-surface-dark/50">

          {messages.map((msg) => (

            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>

              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === "user"

                ? "bg-primary-500 text-white rounded-br-md"

                : "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark rounded-bl-md"

                }`}>

                {msg.text}

              </div>

            </div>

          ))}

          {isTyping && (

            <div className="flex justify-start">

              <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark px-4 py-2.5 rounded-2xl rounded-bl-md text-sm text-muted-light dark:text-muted-dark">

                <span className="animate-pulse">Typing...</span>

              </div>

            </div>

          )}

        </div>



        {/* Input */}

        <div className="p-4 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">

          <div className="flex gap-2">

            <input

              type="text"

              value={input}

              onChange={(e) => setInput(e.target.value)}

              onKeyDown={(e) => e.key === "Enter" && handleSend()}

              placeholder="Type a message..."

              className="flex-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-4 py-2.5 text-sm text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus:border-primary-500 transition-colors"

            />

            <button

              onClick={handleSend}

              disabled={!input.trim() || isTyping}

              className="w-10 h-10 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"

            >

              <RiSendPlaneLine size={18} className="text-white" />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}



// Expertise Modal Component

function ExpertiseModal({ onClose }: { onClose: () => void }) {

  const therapeuticAreas = [

    { name: "Diabetes & Endocrinology", icon: RiStethoscopeLine, color: "from-primary-500 to-primary-400", desc: "Comprehensive diabetes care and endocrine disorder management solutions" },

    { name: "Orthopedics", icon: RiFirstAidKitLine, color: "from-secondary-500 to-secondary-400", desc: "Musculoskeletal health and orthopedic surgical support" },

    { name: "Internal Medicine", icon: RiHospitalLine, color: "from-primary-600 to-primary-500", desc: "General internal medicine and primary care expertise" },

    { name: "Cardiology", icon: RiHeartPulseLine, color: "from-secondary-600 to-secondary-500", desc: "Cardiovascular health and cardiac care education" },

    { name: "Oncology", icon: RiMicroscopeLine, color: "from-primary-500 to-primary-400", desc: "Cancer care, oncology research, and patient support" },

    { name: "Neurology", icon: RiBrainLine, color: "from-secondary-500 to-secondary-400", desc: "Neurological disorders and brain health solutions" },

    { name: "Dermatology", icon: RiVirusLine, color: "from-primary-600 to-primary-500", desc: "Skin health and dermatological conditions" },

    { name: "Ophthalmology", icon: RiEyeLine, color: "from-secondary-600 to-secondary-500", desc: "Eye care and vision health expertise" },

    { name: "Pulmonology", icon: RiHealthBookLine, color: "from-primary-500 to-primary-400", desc: "Respiratory health and lung disease management" },

    { name: "Gastroenterology", icon: RiCapsuleLine, color: "from-secondary-500 to-secondary-400", desc: "Digestive health and GI disorder solutions" },

    { name: "Rheumatology", icon: RiUserHeartLine, color: "from-primary-600 to-primary-500", desc: "Autoimmune and inflammatory disease expertise" },

    { name: "Women's Health", icon: RiWomenLine, color: "from-secondary-600 to-secondary-500", desc: "Comprehensive women's health and wellness" },

  ];



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop with blur */}

      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />



      {/* Modal Content */}

      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col">

        {/* Close button */}

        <button

          onClick={onClose}

          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-text-light dark:text-text-dark transition-colors"

        >

          <RiCloseLine size={20} />

        </button>



        {/* Header */}

        <div className="flex-none p-6 pb-4 border-b border-border-light dark:border-border-dark">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">

              <RiHeartPulseLine size={28} />

            </div>

            <div>

              <h3 className="font-display text-xl font-bold text-text-light dark:text-text-dark">Expertise</h3>

              <p className="text-sm text-muted-light dark:text-muted-dark">Therapeutic Areas</p>

            </div>

          </div>

          <p className="mt-3 text-sm text-muted-light dark:text-muted-dark leading-relaxed">

            Deep clinical expertise across the full spectrum of medical specialties, ensuring scientifically accurate and impactful healthcare communication.

          </p>

        </div>



        {/* Scrollable Content */}

        <div className="flex-1 overflow-y-auto p-6">

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

            {therapeuticAreas.map((area, i) => {

              const IconComponent = area.icon;

              return (

                <div

                  key={area.name}

                  className="group p-4 rounded-xl bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light/50 dark:border-border-dark/50 hover:border-primary-500/30 hover:bg-surface-light dark:hover:bg-surface-dark transition-all duration-300"

                  style={{ animationDelay: `${i * 0.05}s` }}

                >

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>

                    <IconComponent className="text-xl text-white" />

                  </div>

                  <h4 className="font-semibold text-sm text-text-light dark:text-text-dark mb-1">

                    {area.name}

                  </h4>

                  <p className="text-xs text-muted-light dark:text-muted-dark leading-relaxed">

                    {area.desc}

                  </p>

                </div>

              );

            })}

          </div>

        </div>



        {/* CTA */}

        <div className="flex-none p-6 pt-4 border-t border-border-light dark:border-border-dark bg-surface-light/30 dark:bg-surface-dark/30">

          <Link

            href="/therapeutic-areas"

            onClick={onClose}

            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:opacity-90 transition-opacity"

          >

            <RiArrowRightLine size={18} />

            Explore All Areas

          </Link>

        </div>

      </div>

    </div>

  );

}

