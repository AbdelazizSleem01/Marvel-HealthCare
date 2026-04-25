
"use client";

import { useState, useEffect, useRef } from "react";
import { companies, segmentedClients } from "@/data";
import {
  RiCloseLine, RiArrowRightLine, RiMailLine, RiSettings4Line, RiServiceLine,
  RiStarLine, RiStackLine, RiGraduationCapLine, RiFileTextLine, RiComputerLine,
  RiPaletteLine, RiUserSettingsLine, RiCodeBoxLine, RiArrowRightSLine, RiCheckLine,
  RiVideoLine, RiCalendarEventLine, RiBuildingLine, RiGlobalLine, RiBriefcaseLine,
  RiAwardLine, RiShieldCheckLine, RiTeamLine, RiDoubleQuotesL, RiStarFill,
  RiWhatsappLine, RiMessage3Line, RiSendPlaneLine, RiHeartPulseLine, RiMicroscopeLine,
  RiBrainLine, RiEyeLine, RiCapsuleLine, RiWomenLine, RiStethoscopeLine, RiVirusLine,
  RiUserHeartLine, RiFirstAidKitLine, RiHospitalLine, RiHealthBookLine,
  RiArrowLeftSLine, RiGlobeLine, RiMenuLine, RiArrowUpSLine
} from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Company, SegmentedClient } from "@/types";

const SPRING_CONFIG = { type: "spring" as const, damping: 30, stiffness: 260 };

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, damping: 28, stiffness: 320 } },
  exit: { opacity: 0, scale: 0.94, y: 10, transition: { duration: 0.18 } },
};

// Hook for responsive breakpoints
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768) setBp("mobile");
      else if (window.innerWidth < 1024) setBp("tablet");
      else setBp("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

function getOrbitConfig(bp: "mobile" | "tablet" | "desktop") {
  if (bp === "mobile") {
    return {
      positions: [
        { angle: -90, distance: 145 },
        { angle: -30, distance: 145 },
        { angle: 30, distance: 145 },
        { angle: 90, distance: 145 },
        { angle: 150, distance: 145 },
        { angle: -150, distance: 145 },
      ],
      ringSize1: 290,
      ringSize2: 320,
      glowSize: 220,
      centerSize: 110,
      nodeSize: 58,
      logoSize: 56,
    };
  }
  if (bp === "tablet") {
    return {
      positions: [
        { angle: -90, distance: 130 },
        { angle: -30, distance: 130 },
        { angle: 30, distance: 130 },
        { angle: 90, distance: 130 },
        { angle: 150, distance: 130 },
        { angle: -150, distance: 130 },
      ],
      ringSize1: 260,
      ringSize2: 290,
      glowSize: 220,
      centerSize: 95,
      nodeSize: 52,
      logoSize: 55,
    };
  }
  // Desktop - smaller orbital to bring companies closer to center
  return {
    positions: [
      { angle: -90, distance: 140 },
      { angle: -30, distance: 140 },
      { angle: 30, distance: 140 },
      { angle: 90, distance: 140 },
      { angle: 150, distance: 140 },
      { angle: -150, distance: 140 },
    ],
    ringSize1: 280,
    ringSize2: 310,
    glowSize: 240,
    centerSize: 110,
    nodeSize: 56,
    logoSize: 65,
  };
}

export default function CompaniesSection() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedClient, setSelectedClient] = useState<SegmentedClient | null>(null);
  const [showServices, setShowServices] = useState(false);
  const [showAccreditations, setShowAccreditations] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showExpertise, setShowExpertise] = useState(false);
  const [activeTab, setActiveTab] = useState<"comprehensive" | "featured" | "products">("comprehensive");
  const [selectedCountry, setSelectedCountry] = useState<(typeof COUNTRIES)[0] | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [activeClientTab, setActiveClientTab] = useState<"all" | "pharma" | "vendors" | "societies">("all");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [hoveredOrbit, setHoveredOrbit] = useState<string | null>(null);
  const [showMobileNetwork, setShowMobileNetwork] = useState(false);
  const [showMobileLeft, setShowMobileLeft] = useState(false);
  const [showMobileRight, setShowMobileRight] = useState(false);

  // Must be defined before useTransform calls that depend on it
  const orbitConfig = getOrbitConfig(bp);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });

  // Pre-calculate all useTransform values (must be at top level, not conditional)
  const bg1X = useTransform(springX, v => v * -2.5 - 325);
  const bg1Y = useTransform(springY, v => v * -2.5 - 325);
  const bg2X = useTransform(springX, v => v * 3.5 - 210);
  const bg2Y = useTransform(springY, v => v * 3.5 - 210);
  const bg3X = useTransform(springX, v => v * -2);
  const bg3Y = useTransform(springY, v => v * -2);
  const centerX = useTransform(springX, v => v * 0.6 - orbitConfig.centerSize / 2);
  const centerY = useTransform(springY, v => v * 0.6 - orbitConfig.centerSize / 2);

  const COUNTRIES = [
    {
      id: "egypt", name: "Egypt", flag: "EG", city: "Cairo",
      description: "The heart of Marvel Group's operations in North Africa, serving as a hub for innovation and healthcare excellence.",
      companies: ["Marvel", "Med-Vi", "Med-Lab", "Meduscript", "TebZone"],
      stats: { employees: "200+", projects: "500+", clients: "50+" },
    },
    {
      id: "ksa", name: "Saudi Arabia", flag: "SA", city: "Riyadh",
      description: "Strategic presence in the Kingdom, delivering cutting-edge medical education and healthcare solutions.",
      companies: ["Med-ADD"],
      stats: { employees: "50+", projects: "100+", clients: "20+" },
    },
    {
      id: "uae", name: "UAE", flag: "AE", city: "Dubai",
      description: "Gateway to the GCC region, providing world-class creative and medical communication services.",
      companies: ["Bait Alebdaa"],
      stats: { employees: "30+", projects: "80+", clients: "15+" },
    },
  ];

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setRotation((prev) => (prev + 0.12) % 360);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 50;
        const y = (e.clientY - rect.top - rect.height / 2) / 50;
        setMousePosition({ x, y });
        rawX.set(x);
        rawY.set(y);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY, isMobile]);

  // Auto-hide sidebars on mobile
  useEffect(() => {
    if (isMobile) {
      setShowLeftSidebar(false);
      setShowRightPanel(false);
    } else {
      setShowLeftSidebar(true);
      setShowRightPanel(true);
    }
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      className={`${isMobile ? "min-h-[85vh] pt-36" : "h-screen"} bg-bg-light dark:bg-bg-dark relative overflow-hidden flex flex-col items-center justify-center`}
    >
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[650px] md:h-[650px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(18,122,138,0.13) 0%, transparent 70%)",
            left: "50%", top: "50%",
            x: isMobile ? "-50%" : bg1X,
            y: isMobile ? "-50%" : bg1Y,
          }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] md:w-[420px] md:h-[420px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(200,160,60,0.10) 0%, transparent 70%)",
            left: "28%", top: "28%",
            x: isMobile ? 0 : bg2X,
            y: isMobile ? 0 : bg2Y,
          }}
        />
        <motion.div
          className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(18,122,138,0.08) 0%, transparent 70%)",
            right: "18%", bottom: "18%",
            x: isMobile ? 0 : bg3X,
            y: isMobile ? 0 : bg3Y,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: isMobile ? "40px 40px" : "60px 60px",
          }}
        />
        {[
          { left: "15%", top: "20%", delay: "0s", size: "w-1.5 h-1.5" },
          { left: "85%", top: "15%", delay: "0.4s", size: "w-1 h-1" },
          { left: "25%", top: "75%", delay: "0.8s", size: "w-1 h-1" },
          { left: "75%", top: "80%", delay: "1.2s", size: "w-1.5 h-1.5" },
          { left: "10%", top: "50%", delay: "1.6s", size: "w-1 h-1" },
          { left: "90%", top: "45%", delay: "2s", size: "w-1.5 h-1.5" },
          { left: "35%", top: "10%", delay: "2.4s", size: "w-1 h-1" },
          { left: "65%", top: "90%", delay: "2.8s", size: "w-1 h-1" },
          { left: "5%", top: "85%", delay: "3.2s", size: "w-1.5 h-1.5" },
          { left: "95%", top: "25%", delay: "3.6s", size: "w-1 h-1" },
        ].map((p, i) => (
          <div
            key={i}
            className={`absolute ${p.size} bg-primary-500/40 rounded-full animate-pulse`}
            style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: `${2.5 + (i % 4) * 0.5}s` }}
          />
        ))}
      </div>

      {/* ─── Main Layout ─── */}
      <motion.div layout className={`relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 flex ${isMobile ? "flex-col items-center" : "flex-row items-center gap-6 h-full py-4"}`}>

        {/* ─── Left: Orbital ─── */}
        <motion.div
          layout
          transition={SPRING_CONFIG}
          className={`relative flex items-center justify-center ${isMobile ? "min-h-[55vh] -mt-20 w-full" : "w-[45%] h-full"}`}
        >
          {/* Countries flags row - simplified without spin animation on desktop */}
          <div className={`absolute left-1/2 -translate-x-1/2 z-30 ${isMobile ? "-top-12" : "-top-6"}`}>
            <div className={`flex items-center justify-center ${isMobile ? "gap-6" : "gap-6"}`}>
              {COUNTRIES.map((country, idx) => (
                <motion.button
                  key={country.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12 }}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedCountry(country)}
                  className="group relative flex items-center justify-center transition-all duration-300"
                >
                  <div className={`${isMobile ? "w-12 h-9" : "w-11 h-8"} rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-primary-500/60 transition-all duration-300 relative z-10`}>
                    <ReactCountryFlag countryCode={country.flag} svg style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-primary-500/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Orbital layout - smaller on desktop */}
          <div
            className={`relative flex items-center justify-center ${isMobile ? "w-full h-[380px]" : "w-full h-[420px]"}`}
            onMouseEnter={() => !isMobile && setIsHovering(true)}
            onMouseLeave={() => !isMobile && setIsHovering(false)}
          >
            {/* Outer dashed ring */}
            <div
              className="absolute left-1/2 top-[48%] md:top-[45%] pointer-events-none"
              style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
            >
              <div style={{ width: orbitConfig.ringSize1, height: orbitConfig.ringSize1 }} className="border-2 border-dashed border-primary-500/40 rounded-full" />
            </div>

            {/* Second counter ring */}
            <div
              className="absolute left-1/2 top-[48%] md:top-[45%] pointer-events-none"
              style={{ transform: `translate(-50%, -50%) rotate(${-rotation * 0.6}deg)` }}
            >
              <div style={{ width: orbitConfig.ringSize2, height: orbitConfig.ringSize2 }} className="border border-secondary-500/35 rounded-full" />
            </div>

            {/* Inner glow ring */}
            <div className="absolute left-1/2 top-[48%] md:top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: orbitConfig.glowSize, height: orbitConfig.glowSize, background: "radial-gradient(circle, rgba(18,122,138,0.07) 0%, rgba(200,160,60,0.05) 60%, transparent 100%)" }}
                className="rounded-full"
              />
            </div>

            {/* Pulse ring on hover (desktop only) */}
            {!isMobile && (
              <AnimatePresence>
                {isHovering && (
                  <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="w-[460px] h-[460px] rounded-full border border-primary-500/30" />
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Central Marvel Logo */}
            <motion.div
              className="absolute left-1/2 top-[48%] md:top-[45%] z-20 cursor-pointer group"
              style={{
                x: isMobile ? -(orbitConfig.centerSize / 2) : centerX,
                y: isMobile ? -(orbitConfig.centerSize / 2) : centerY,
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500/40 to-secondary-500/40 rounded-full blur-2xl"
              />
              {/* Central comet */}
              <div className={`absolute ${isMobile ? "inset-[-12px]" : "inset-[-20px]"} pointer-events-none`}>
                <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                  <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 55%, rgba(18, 122, 138, 0.5) 100%)", maskImage: "radial-gradient(transparent 67%, black 69%)", WebkitMaskImage: "radial-gradient(transparent 67%, black 69%)" }} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className={`${isMobile ? "w-2 h-2" : "w-3 h-3"} rounded-full bg-primary-500 shadow-[0_0_18px_#127A8A,0_0_30px_#127A8A]`} />
                  </div>
                </div>
              </div>

              <div style={{ width: orbitConfig.centerSize, height: orbitConfig.centerSize }} className="relative rounded-full glass-light dark:glass-dark flex items-center justify-center border-2 border-primary-500/30 group-hover:border-primary-500/70 transition-all duration-500 shadow-2xl">
                <Image src="/Logo.png" alt="Marvel Group" width={orbitConfig.logoSize} height={orbitConfig.logoSize} className="object-contain w-auto h-auto" loading="eager" priority />
              </div>
            </motion.div>

            {/* Company Orbitals */}
            {companies.map((company, index) => {
              const position = orbitConfig.positions[index];
              if (!position) return null;
              const angleRad = ((position.angle + rotation * 0.22) * Math.PI) / 180;
              const x = Math.cos(angleRad) * position.distance;
              const y = Math.sin(angleRad) * position.distance;
              const isHovered = hoveredOrbit === company.id;
              const half = orbitConfig.nodeSize / 2;

              return (
                <div
                  key={company.id}
                  className="absolute left-1/2 top-1/2 cursor-pointer group"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    transition: "transform 0.1s linear",
                    zIndex: 10 + index,
                  }}
                  onMouseEnter={() => !isMobile && setHoveredOrbit(company.id)}
                  onMouseLeave={() => !isMobile && setHoveredOrbit(null)}
                  onClick={() => setSelectedCompany(company)}
                >
                  <div className="relative" style={{ top: isMobile ? -8 : -16 }}>
                    <motion.div
                      animate={isHovered ? { opacity: 0.5, scale: 1.2 } : { opacity: 0, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`absolute inset-0 bg-gradient-to-br ${company.color} rounded-full blur-xl`}
                    />
                    <motion.div
                      whileHover={{ scale: 1.18 }}
                      whileTap={{ scale: 0.92 }}
                      style={{ width: orbitConfig.nodeSize, height: orbitConfig.nodeSize }}
                      className={`relative rounded-full glass-light dark:glass-dark border-2 ${isHovered ? "border-primary-500/60" : "border-transparent"} flex items-center justify-center shadow-lg transition-all duration-300`}
                    >
                      {company.logo ? (
                        <Image src={company.logo} alt={company.name} width={isMobile ? 26 : 40} height={isMobile ? 26 : 40} className="object-contain w-auto h-auto" />
                      ) : (
                        <div style={{ width: isMobile ? 28 : 40, height: isMobile ? 28 : 40 }} className={`rounded-full bg-gradient-to-br ${company.color} flex items-center justify-center text-white ${isMobile ? "text-xs" : "text-base"} font-bold`}>
                          {company.icon}
                        </div>
                      )}
                    </motion.div>

                    {/* Tooltip (desktop only) */}
                    {!isMobile && (
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div initial={{ opacity: 0, y: 4, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.9 }} transition={{ duration: 0.18 }} className="absolute left-1/2 -translate-x-1/2 -top-14 pointer-events-none z-50">
                            <div className="bg-surface-light dark:bg-surface-dark px-3 py-1.5 rounded-xl shadow-xl border border-border-light dark:border-border-dark whitespace-nowrap">
                              <span className="text-sm font-semibold text-text-light dark:text-text-dark">{company.name}</span>
                              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-surface-light dark:bg-surface-dark rotate-45 border-r border-b border-border-light dark:border-border-dark" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Center: Info Box (Desktop Only) ─── */}
        {!isMobile && (
          <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING_CONFIG}
            className="w-[30%] h-full flex flex-col justify-center"
          >
            <div className="rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-xl p-6 space-y-4">
              <div className="text-center">
                <h2 className="font-display text-xl font-bold text-text-light dark:text-text-dark mb-2">Welcome to Marvel</h2>
                <p className="text-sm text-muted-light dark:text-muted-dark">Your gateway to healthcare excellence across MENA</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-surface-light dark:bg-surface-dark">
                  <p className="text-lg font-bold text-primary-500">3</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">Countries</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-light dark:bg-surface-dark">
                  <p className="text-lg font-bold text-secondary-500">6</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">Companies</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-light dark:bg-surface-dark">
                  <p className="text-lg font-bold text-primary-500">50+</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">Clients</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border-light dark:border-border-dark">
                <p className="text-xs text-muted-light dark:text-muted-dark leading-relaxed">
                  Marvel Group is a leading healthcare solutions provider with operations in Egypt, Saudi Arabia, and UAE. We specialize in medical education, creative services, and innovative health tech solutions.
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowServices(true)} className="flex-1 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  Our Services
                </button>
                <button onClick={() => setShowExpertise(true)} className="flex-1 py-2 rounded-xl border border-border-light dark:border-border-dark text-sm font-semibold text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                  Expertise
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Right: Clients Panel (Desktop Only) ─── */}
        {!isMobile && (
          <motion.div
            layout
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING_CONFIG}
            className="w-[25%] h-full flex flex-col justify-center"
          >
            <div className="rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-xl overflow-hidden h-[70vh]">
              {/* Vertical Tabs */}
              <div className="flex h-full">
                {/* Tab Labels - Vertical */}
                <div className="w-10 flex flex-col border-r border-border-light dark:border-border-dark bg-surface-light/50 dark:bg-surface-dark/50">
                  {[
                    { id: "all", label: "All" },
                    { id: "pharma", label: "Pharma" },
                    { id: "vendors", label: "Tech" },
                    { id: "societies", label: "Med" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveClientTab(tab.id === "all" ? "pharma" : tab.id as any)}
                      className={`flex-1 flex items-center justify-center py-2 text-[9px] font-medium transition-all writing-mode-vertical ${activeClientTab === tab.id || (tab.id === "all" && activeClientTab) ? "bg-gradient-to-b from-primary-500 to-secondary-500 text-white" : "text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark"}`}
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* Clients Grid - Logos Only */}
                <div className="flex-1 p-3 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {segmentedClients[activeClientTab]?.map((client, idx) => (
                      <motion.button
                        key={client.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.03 }}
                        onClick={() => setSelectedClient(client)}
                        className="group relative aspect-square rounded-xl bg-white dark:bg-white flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 p-2"
                      >
                        {client.logo ? (
                          <img src={client.logo} alt={client.name} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold">
                            {client.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        {/* Tooltip on hover */}
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                          <p className="text-white text-xs font-semibold text-center">{client.name}</p>
                          <p className="text-white/70 text-[10px] flex items-center gap-1 mt-1">
                            <ReactCountryFlag countryCode={client.flag} svg className="!w-3 !h-3" /> {client.country}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Mobile: Buttons & Panels BELOW Orbital ─── */}
        {isMobile && (
          <div className="w-full flex flex-col items-center px-4 ">
            {/* Toggle Buttons */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowMobileLeft(!showMobileLeft); setShowMobileRight(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl glass-light dark:glass-dark border shadow-lg transition-all ${showMobileLeft ? "border-primary-500/50 bg-primary-500/10" : "border-border-light dark:border-border-dark"}`}
              >
                <RiSettings4Line size={20} className="text-primary-500" />
                <span className="text-xs font-medium text-text-light dark:text-text-dark">Services</span>
                <motion.div animate={{ rotate: showMobileLeft ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <RiArrowUpSLine size={14} className="text-muted-light dark:text-muted-dark" />
                </motion.div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowMobileRight(!showMobileRight); setShowMobileLeft(false); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl glass-light dark:glass-dark border shadow-lg transition-all ${showMobileRight ? "border-secondary-500/50 bg-secondary-500/10" : "border-border-light dark:border-border-dark"}`}
              >
                <RiGlobalLine size={20} className="text-secondary-500" />
                <span className="text-xs font-medium text-text-light dark:text-text-dark">Network</span>
                <motion.div animate={{ rotate: showMobileRight ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <RiArrowUpSLine size={14} className="text-muted-light dark:text-muted-dark" />
                </motion.div>
              </motion.button>
            </div>

            {/* Left Panel (Expandable Downward) */}
            <AnimatePresence>
              {showMobileLeft && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full mt-2 overflow-hidden"
                >
                  <div className="rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-xl p-3">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-light dark:border-border-dark">
                      <span className="text-sm font-semibold text-text-light dark:text-text-dark">Services & More</span>
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowMobileLeft(false)} className="w-7 h-7 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center">
                        <RiCloseLine size={16} className="text-muted-light dark:text-muted-dark" />
                      </motion.button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: "services", onClick: () => setShowServices(true), icon: RiSettings4Line, label: "Services" },
                        { id: "expertise", onClick: () => setShowExpertise(true), icon: RiHeartPulseLine, label: "Expertise" },
                        { id: "accreds", onClick: () => setShowAccreditations(true), icon: RiAwardLine, label: "Accreds" },
                        { id: "reviews", onClick: () => setShowTestimonials(true), icon: RiTeamLine, label: "Reviews" },
                        { id: "chat", onClick: () => setShowChat(true), icon: RiMessage3Line, label: "Chat" },
                        { id: "contact", href: "/contact", icon: RiMailLine, label: "Contact" },
                        { id: "whatsapp", href: "https://wa.me/201000000000", icon: RiWhatsappLine, label: "WhatsApp", color: "secondary" },
                      ].map((item) => (
                        item.href ? (
                          <Link key={item.id} href={item.href} target={item.id === "whatsapp" ? "_blank" : undefined} onClick={() => setShowMobileLeft(false)} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color === "secondary" ? "from-secondary-500/20 to-secondary-600/20" : "from-primary-500/20 to-secondary-500/20"} flex items-center justify-center`}>
                              <item.icon size={18} className={`${item.color === "secondary" ? "text-secondary-500" : "text-primary-500"}`} />
                            </div>
                            <span className="text-[9px] font-medium text-text-light dark:text-text-dark text-center leading-tight">{item.label}</span>
                          </Link>
                        ) : (
                          <button key={item.id} onClick={() => { item.onClick?.(); setShowMobileLeft(false); }} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                              <item.icon size={18} className="text-primary-500" />
                            </div>
                            <span className="text-[9px] font-medium text-text-light dark:text-text-dark text-center leading-tight">{item.label}</span>
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right Panel (Expandable Downward) */}
            <AnimatePresence>
              {showMobileRight && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full mt-2 overflow-hidden"
                >
                  <div className="rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-xl p-3">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-light dark:border-border-dark">
                      <span className="text-sm font-semibold text-text-light dark:text-text-dark">Our Network</span>
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowMobileRight(false)} className="w-7 h-7 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center">
                        <RiCloseLine size={16} className="text-muted-light dark:text-muted-dark" />
                      </motion.button>
                    </div>
                    <div className="flex gap-1 p-1 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark mb-3">
                      {[
                        { id: "pharma", label: "Pharma", icon: RiBriefcaseLine },
                        { id: "vendors", label: "Tech", icon: RiComputerLine },
                        { id: "societies", label: "Medical", icon: RiBuildingLine },
                      ].map((tab) => (
                        <button key={tab.id} onClick={() => setActiveClientTab(tab.id as any)} className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg text-[10px] font-medium transition-all ${activeClientTab === tab.id ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm" : "text-muted-light dark:text-muted-dark"}`}>
                          <tab.icon size={11} /> {tab.label}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                      {segmentedClients[activeClientTab]?.slice(0, 5).map((client, idx) => (
                        <motion.button key={client.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => { setSelectedClient(client); setShowMobileRight(false); }} className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark active:border-primary-500/40 transition-all text-left">
                          <div className="w-9 h-9 rounded-lg bg-white dark:bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                            {client.logo ? <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-0.5" /> : <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-[10px] font-bold">{client.name.slice(0, 2).toUpperCase()}</div>}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-xs text-text-light dark:text-text-dark truncate">{client.name}</h4>
                            <p className="text-[10px] text-muted-light dark:text-muted-dark flex items-center gap-1">
                              <ReactCountryFlag countryCode={client.flag} svg className="!w-3 !h-3" /> {client.country}
                            </p>
                          </div>
                          <RiArrowRightLine size={12} className="text-muted-light dark:text-muted-dark shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-[10px] text-center text-muted-light dark:text-muted-dark mt-2 pt-2 border-t border-border-light dark:border-border-dark">
                      {segmentedClients[activeClientTab]?.length || 0} {activeClientTab === "pharma" ? "Pharma Partners" : activeClientTab === "vendors" ? "Tech Vendors" : "Medical Societies"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ─── Desktop Bottom Services Bar ─── */}
        {!isMobile && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_CONFIG}
            className="w-full max-w-5xl mx-auto shrink-0 py-4"
          >
            <div className="rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-xl overflow-hidden">
              <div className="flex items-center justify-center gap-2 lg:gap-4 px-4 py-3">
                {[
                  { id: "services", onClick: () => setShowServices(true), icon: RiSettings4Line, label: "Services" },
                  { id: "expertise", onClick: () => setShowExpertise(true), icon: RiHeartPulseLine, label: "Expertise" },
                  { id: "accreds", onClick: () => setShowAccreditations(true), icon: RiAwardLine, label: "Accreds" },
                  { id: "reviews", onClick: () => setShowTestimonials(true), icon: RiTeamLine, label: "Reviews" },
                  { id: "chat", onClick: () => setShowChat(true), icon: RiMessage3Line, label: "Chat" },
                  { id: "contact", href: "/contact", icon: RiMailLine, label: "Contact" },
                  { id: "whatsapp", href: "https://wa.me/201000000000", icon: RiWhatsappLine, label: "WhatsApp", color: "secondary" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                      {item.href ? (
                        <Link href={item.href} target={item.id === "whatsapp" ? "_blank" : undefined} className="group flex flex-col items-center gap-1.5 p-2 lg:p-3 rounded-xl hover:bg-surface-light dark:hover:bg-surface-dark border border-transparent hover:border-primary-500/20 transition-all duration-300 min-w-[70px] lg:min-w-[90px]">
                          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${item.color === "secondary" ? "from-secondary-500/20 to-secondary-600/20" : "from-primary-500/20 to-secondary-500/20"} flex items-center justify-center`}>
                            {Icon && <Icon size={20} className={`${item.color === "secondary" ? "text-secondary-500" : "text-primary-500"}`} />}
                          </motion.div>
                          <span className="text-[10px] lg:text-xs font-medium text-text-light dark:text-text-dark leading-tight">{item.label}</span>
                        </Link>
                      ) : (
                        <button onClick={item.onClick} className="group flex flex-col items-center gap-1.5 p-2 lg:p-3 rounded-xl hover:bg-surface-light dark:hover:bg-surface-dark border border-transparent hover:border-primary-500/20 transition-all duration-300 min-w-[70px] lg:min-w-[90px]">
                          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                            {Icon && <Icon size={20} className="text-primary-500" />}
                          </motion.div>
                          <span className="text-[10px] lg:text-xs font-medium text-text-light dark:text-text-dark leading-tight">{item.label}</span>
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ─── Mobile Network Drawer (Old - Keep for compatibility) ─── */}
      <AnimatePresence>
        {isMobile && showMobileNetwork && (
          <motion.div
            key="mobile-network"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMobileNetwork(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-bg-light dark:bg-bg-dark rounded-t-3xl border-t border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Drawer handle */}
              <div className="flex items-center justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-border-light dark:bg-border-dark" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 pb-3 border-b border-border-light dark:border-border-dark">
                <h3 className="font-display text-lg font-bold text-text-light dark:text-text-dark">Our Network</h3>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowMobileNetwork(false)} className="w-8 h-8 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center">
                  <RiCloseLine size={18} className="text-muted-light dark:text-muted-dark" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark mb-4">
                  {[
                    { id: "pharma", label: "Pharma", icon: RiBriefcaseLine },
                    { id: "vendors", label: "Tech", icon: RiComputerLine },
                    { id: "societies", label: "Medical", icon: RiBuildingLine },
                  ].map((tab) => (
                    <button key={tab.id} onClick={() => setActiveClientTab(tab.id as any)} className={`flex-1 flex items-center justify-center gap-1 py-2 px-1 rounded-lg text-xs font-medium transition-all ${activeClientTab === tab.id ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm" : "text-muted-light dark:text-muted-dark"}`}>
                      <tab.icon size={12} /> {tab.label}
                    </button>
                  ))}
                </div>

                {/* Client List */}
                <div className="space-y-2">
                  {segmentedClients[activeClientTab]?.map((client, idx) => (
                    <motion.button
                      key={client.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => { setSelectedClient(client); setShowMobileNetwork(false); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark active:border-primary-500/40 transition-all text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        {client.logo ? <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-1" /> : <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">{client.name.slice(0, 2).toUpperCase()}</div>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm text-text-light dark:text-text-dark truncate">{client.name}</h4>
                        <p className="text-xs text-muted-light dark:text-muted-dark flex items-center gap-1">
                          <ReactCountryFlag countryCode={client.flag} svg className="!w-3 !h-3" /> {client.country}
                        </p>
                      </div>
                      <RiArrowRightLine size={14} className="text-muted-light dark:text-muted-dark shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Chat Button (Desktop) ─── */}
      {!isMobile && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
        >
          <RiMessage3Line size={24} />
        </motion.button>
      )}

      {/* ─── Modals ─── */}
      <AnimatePresence>
        {selectedCompany && <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
        {selectedClient && <ClientWorkPopup client={selectedClient} onClose={() => setSelectedClient(null)} />}
        {selectedCountry && <CountryModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />}
        {showServices && <ServicesModal activeTab={activeTab} setActiveTab={setActiveTab} onClose={() => setShowServices(false)} />}
        {showAccreditations && <AccreditationsModal onClose={() => setShowAccreditations(false)} />}
        {showTestimonials && <TestimonialsModal activeTestimonial={activeTestimonial} setActiveTestimonial={setActiveTestimonial} onClose={() => setShowTestimonials(false)} />}
        {showChat && <ChatModal onClose={() => setShowChat(false)} />}
        {showExpertise && <ExpertiseModal onClose={() => setShowExpertise(false)} />}
      </AnimatePresence>
    </section>
  );
}

// ─────────────────────────────────────────────
// Shared animated modal wrapper — full screen on mobile
// ─────────────────────────────────────────────
function ModalBackdrop({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      key="modal-overlay"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 w-full md:flex md:items-center md:justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Country Modal
// ─────────────────────────────────────────────
function CountryModal({ country, onClose }: { country: any; onClose: () => void }) {
  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full md:max-w-lg glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
        <div className="relative h-28 md:h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-primary-500/20 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-500 transition-colors">
            <RiCloseLine size={24} />
          </button>
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 18, stiffness: 260, delay: 0.1 }} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-surface-light dark:border-surface-dark">
            <ReactCountryFlag countryCode={country.flag} svg style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </motion.div>
        </div>

        <div className="p-4 md:p-6">
          <div className="text-center mb-4 md:mb-6">
            <h3 className="font-display text-xl md:text-2xl font-bold text-text-light dark:text-text-dark">{country.name}</h3>
            <p className="text-sm text-primary-500 font-medium mt-1">{country.city}</p>
          </div>
          <p className="text-sm text-muted-light dark:text-muted-dark mb-4 md:mb-6 leading-relaxed">{country.description}</p>

          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {[
              { label: "Employees", value: country.stats.employees, color: "text-primary-500" },
              { label: "Projects", value: country.stats.projects, color: "text-secondary-500" },
              { label: "Clients", value: country.stats.clients, color: "text-primary-500" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className="text-center p-2 md:p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
                <p className={`text-base md:text-lg font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-4 md:mb-6">
            <p className="text-xs uppercase tracking-widest text-muted-light dark:text-muted-dark mb-3">Operating Companies</p>
            <div className="flex flex-wrap gap-2">
              {country.companies.map((c: string, i: number) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.07 }} className="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium bg-primary-500/10 text-primary-500 border border-primary-500/20">
                  {c}
                </motion.span>
              ))}
            </div>
          </div>

          <Link href="/contact" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:opacity-90 transition-opacity">
            Contact Us <RiArrowRightLine size={18} />
          </Link>
        </div>
      </div>
    </ModalBackdrop>
  );
}

// ─────────────────────────────────────────────
// Services Modal — responsive sidebar→tabs
// ─────────────────────────────────────────────
function ServicesModal({ activeTab, setActiveTab, onClose }: {
  activeTab: "comprehensive" | "featured" | "products";
  setActiveTab: (tab: "comprehensive" | "featured" | "products") => void;
  onClose: () => void;
}) {
  const [selectedService, setSelectedService] = useState("cme");

  useEffect(() => {
    if (activeTab === "comprehensive") setSelectedService("cme");
    else if (activeTab === "featured") setSelectedService("accreditation");
  }, [activeTab]);

  const comprehensiveServices = [
    { id: "cme", icon: RiGraduationCapLine, title: "CME", services: [{ name: "Curriculum Design", desc: "Comprehensive CME program structuring" }, { name: "Content Development", desc: "Medical education content creation" }, { name: "Slide Decks", desc: "Professional presentation materials" }, { name: "Gamification", desc: "Case studies, patient profiles, interactivity" }, { name: "Speakers", desc: "Expert faculty management" }, { name: "Accreditation", desc: "CPD, DHA, SCFHS certificates" }, { name: "Endorsed Materials", desc: "Officially recognized content" }] },
    { id: "research", icon: RiFileTextLine, title: "Research", services: [{ name: "Study Design", desc: "Clinical and observational research" }, { name: "Data Analysis", desc: "Statistical and qualitative analysis" }, { name: "Manuscript Writing", desc: "Peer-reviewed publication support" }, { name: "Literature Review", desc: "Comprehensive evidence synthesis" }, { name: "Abstracts & Posters", desc: "Conference submission support" }] },
    { id: "elearning", icon: RiComputerLine, title: "eLearning", services: [{ name: "LMS Development", desc: "Learning management systems" }, { name: "Interactive Modules", desc: "Engaging digital content" }, { name: "VR Training", desc: "Virtual reality medical simulations" }, { name: "Mobile Apps", desc: "Healthcare education apps" }, { name: "Assessment Tools", desc: "Online testing & certification" }] },
    { id: "artwork", icon: RiPaletteLine, title: "Marketing", services: [{ name: "Brand Identity", desc: "Logo and visual system design" }, { name: "Marketing Campaigns", desc: "Multi-channel promotion strategies" }, { name: "Medical Illustration", desc: "Anatomical and scientific art" }, { name: "Video Production", desc: "Educational and promotional videos" }, { name: "Social Media", desc: "Digital marketing management" }] },
    { id: "training", icon: RiUserSettingsLine, title: "Training", services: [{ name: "Workshops", desc: "Hands-on skill development" }, { name: "Certification Programs", desc: "Professional credentials" }, { name: "On-site Training", desc: "In-person education delivery" }, { name: "Train-the-Trainer", desc: "Faculty development programs" }] },
    { id: "it", icon: RiCodeBoxLine, title: "IT", services: [{ name: "Custom Software", desc: "Bespoke healthcare applications" }, { name: "CRM Systems", desc: "Customer relationship platforms" }, { name: "Data Analytics", desc: "Healthcare intelligence dashboards" }, { name: "AI Integration", desc: "Machine learning solutions" }] },
    { id: "visuals", icon: RiVideoLine, title: "Visuals", services: [{ name: "3D Medical Animation", desc: "Complex medical concepts visualization" }, { name: "VR Training", desc: "Virtual reality medical simulations" }, { name: "Video Production", desc: "Professional healthcare videos" }, { name: "Interactive Media", desc: "Engaging digital experiences" }, { name: "Motion Graphics", desc: "Animated medical illustrations" }] },
    { id: "events", icon: RiCalendarEventLine, title: "Events", services: [{ name: "Conference Planning", desc: "Full-service medical conferences" }, { name: "Virtual Events", desc: "Online webinars & summits" }, { name: "Hybrid Events", desc: "In-person + digital combined" }, { name: "Exhibition Booths", desc: "Trade show presence design" }, { name: "Speaker Management", desc: "Keynote & panel coordination" }] },
  ];

  const featuredServices = [
    { id: "accreditation", icon: RiStarLine, title: "Accreditation", badge: "Certified", color: "from-primary-500 to-secondary-400", description: "Comprehensive accreditation programs recognized worldwide", features: [{ name: "CPD-UK", desc: "UK Continuous Professional Development" }, { name: "DHA Approved", desc: "Dubai Health Authority accredited" }, { name: "SCFHS Certified", desc: "Saudi Commission for Health Specialties" }, { name: "RCSEd Endorsed", desc: "Royal College of Surgeons of Edinburgh" }, { name: "CME Credits", desc: "Continuing Medical Education credits" }, { name: "Global Recognition", desc: "Internationally accepted certificates" }] },
    { id: "standalone", icon: RiStackLine, title: "Standalone", badge: "Flexible", color: "from-secondary-400 to-primary-500", description: "Flexible solutions that integrate seamlessly", features: [{ name: "Modular Design", desc: "Pick and choose what you need" }, { name: "Easy Integration", desc: "Works with existing workflows" }, { name: "Scalable", desc: "Grows with your organization" }, { name: "Customizable", desc: "Tailored to your requirements" }, { name: "Quick Deployment", desc: "Fast implementation timeline" }, { name: "Cost Effective", desc: "Pay for what you use" }] },
    { id: "digital", icon: RiComputerLine, title: "Digital", badge: "Innovative", color: "from-primary-500 to-secondary-400", description: "Cutting-edge AI-driven platforms", features: [{ name: "AI Integration", desc: "Machine learning powered tools" }, { name: "Automation", desc: "Streamlined workflows" }, { name: "Analytics Dashboard", desc: "Real-time data insights" }, { name: "Cloud Based", desc: "Secure cloud infrastructure" }, { name: "Mobile Ready", desc: "Works on all devices" }, { name: "API Access", desc: "Connect with other systems" }] },
  ];

  const products = [
    { id: "tebzone", letter: "T", title: "TebZone", subtitle: "Healthcare E-commerce", description: "Healthcare marketplace connecting patients and suppliers.", status: "LIVE", features: ["Medicine Marketplace", "Prescription Upload", "Real-time Tracking", "Secure Payments"] },
    { id: "medadd", letter: "M", title: "Med-ADD", subtitle: "Medical Advertising", description: "Pharmaceutical sales force training with adaptive AI.", status: "LIVE", features: ["AI Role-play", "Performance Analytics", "Compliance Tracking", "Interactive Modules"] },
    { id: "medvi", letter: "V", title: "Med-Vi", subtitle: "Video & VR Training", description: "Medical education and HCP engagement platform.", status: "LIVE", features: ["CPD-Accredited", "Interactive Cases", "HCP Analytics", "VR Simulations"] },
    { id: "medlab", letter: "L", title: "Med-Lab", subtitle: "Lab Management", description: "Next-gen laboratory information management system.", status: "Coming Soon", features: ["Sample Tracking", "QC Management", "Reports Dashboard", "LIMS Integration"] },
  ];

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full md:max-w-6xl max-h-[90vh] glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border-light dark:border-border-dark shrink-0">
          <h2 className="font-display text-lg md:text-2xl font-bold text-text-light dark:text-text-dark">Services & Products</h2>
          <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-primary-500/20 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-500 transition-colors">
            <RiCloseLine size={22} />
          </motion.button>
        </div>

        {/* Main Tabs */}
        <div className="flex items-center gap-1.5 md:gap-2 p-3 md:p-4 border-b border-border-light dark:border-border-dark bg-surface-light/50 dark:bg-surface-dark/50 overflow-x-auto shrink-0">
          {[{ id: "comprehensive", label: "Services", icon: RiServiceLine }, { id: "featured", label: "Featured", icon: RiStarLine }, { id: "products", label: "Products", icon: RiStackLine }].map((tab) => (
            <motion.button key={tab.id} whileTap={{ scale: 0.96 }} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-xl font-medium whitespace-nowrap text-xs md:text-sm transition-all duration-300 ${activeTab === tab.id ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg" : "text-muted-light dark:text-muted-dark hover:bg-surface-light dark:hover:bg-surface-dark"}`}>
              <tab.icon size={16} /> {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "comprehensive" && (
              <motion.div key="comprehensive" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.22 }} className="flex flex-col p-4 md:p-6">
                <div className="text-center mb-4 md:mb-6">
                  <p className="text-xs uppercase tracking-widest text-primary-500 mb-1 md:mb-2">What We Do</p>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-text-light dark:text-text-dark">Comprehensive Services</h3>
                </div>

                {/* Service selector — horizontal scroll on mobile, sidebar on desktop */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 flex-1 overflow-hidden">
                  {/* Mobile: 3-column grid, Desktop: sidebar */}
                  <div className="md:w-56 lg:w-64 grid grid-cols-3 md:flex md:flex-col gap-2 md:overflow-x-visible md:overflow-y-auto pb-2 md:pb-0 md:pr-2 shrink-0">
                    {comprehensiveServices.map((service) => (
                      <motion.button key={service.id} whileTap={{ scale: 0.97 }} onClick={() => setSelectedService(service.id)} className={`flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-3 p-2 md:p-3 rounded-xl text-center md:text-left transition-all duration-300 ${selectedService === service.id ? "bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30" : "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-500/20"}`}>
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${selectedService === service.id ? "bg-gradient-to-br from-primary-500 to-secondary-500 text-white" : "bg-black/5 dark:bg-white/5 text-text-light dark:text-text-dark"}`}><service.icon size={16} /></div>
                        <span className={`font-medium text-[10px] md:text-sm ${selectedService === service.id ? "text-primary-500" : "text-text-light dark:text-text-dark"}`}>{service.title}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Service detail */}
                  <AnimatePresence mode="wait">
                    <motion.div key={selectedService} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex-1 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-4 md:p-6 overflow-y-auto">
                      {(() => {
                        const service = comprehensiveServices.find(s => s.id === selectedService);
                        if (!service) return null;
                        return (
                          <div>
                            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                              <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white"><service.icon size={24} /></div>
                              <div>
                                <h4 className="font-display text-lg md:text-xl font-bold text-text-light dark:text-text-dark">{service.title}</h4>
                                <p className="text-xs md:text-sm text-muted-light dark:text-muted-dark">{service.services.length} services</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                              {service.services.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary-500/5 transition-colors">
                                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 mt-0.5"><RiCheckLine className="text-primary-500" size={10} /></div>
                                  <div><h5 className="font-medium text-xs md:text-sm text-text-light dark:text-text-dark">{item.name}</h5><p className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark mt-0.5">{item.desc}</p></div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs md:text-sm text-muted-light dark:text-muted-dark">Explore our full range of solutions</p>
                  <Link href="/contact" onClick={onClose} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto justify-center">Contact Us <RiArrowRightLine size={16} /></Link>
                </div>
              </motion.div>
            )}

            {activeTab === "featured" && (
              <motion.div key="featured" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.22 }} className="flex flex-col p-4 md:p-6">
                <div className="text-center mb-4 md:mb-6">
                  <p className="text-xs uppercase tracking-widest text-secondary-500 mb-1 md:mb-2">Premium</p>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-text-light dark:text-text-dark">Featured Services</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 flex-1 overflow-hidden">
                  <div className="md:w-56 lg:w-64 grid grid-cols-3 md:flex md:flex-col gap-2 md:overflow-x-visible md:overflow-y-auto pb-2 md:pb-0 md:pr-2 shrink-0">
                    {featuredServices.map((service) => (
                      <motion.button key={service.id} whileTap={{ scale: 0.97 }} onClick={() => setSelectedService(service.id)} className={`flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-3 p-2 md:p-3 rounded-xl text-center md:text-left transition-all ${selectedService === service.id ? "bg-gradient-to-r from-secondary-500/20 to-primary-500/20 border border-secondary-500/30" : "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"}`}>
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${selectedService === service.id ? "bg-gradient-to-br from-secondary-500 to-primary-500 text-white" : "bg-black/5 dark:bg-white/5 text-text-light dark:text-text-dark"}`}><service.icon size={16} /></div>
                        <span className={`font-medium text-[10px] md:text-sm ${selectedService === service.id ? "text-secondary-500" : "text-text-light dark:text-text-dark"}`}>{service.title}</span>
                      </motion.button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={selectedService} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="flex-1 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-4 md:p-6 overflow-y-auto">
                      {(() => {
                        const service = featuredServices.find(s => s.id === selectedService);
                        if (!service) return null;
                        return (
                          <div>
                            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                              <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white`}><service.icon size={24} /></div>
                              <div>
                                <div className="flex items-center gap-2"><h4 className="font-display text-lg md:text-xl font-bold text-text-light dark:text-text-dark">{service.title}</h4><span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-secondary-500/20 text-secondary-500">{service.badge}</span></div>
                              </div>
                            </div>
                            <p className="text-xs md:text-sm text-text-light dark:text-text-dark mb-4">{service.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                              {service.features.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-xl bg-black/5 dark:bg-white/5">
                                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-secondary-500/20 flex items-center justify-center shrink-0 mt-0.5"><RiCheckLine className="text-secondary-500" size={10} /></div>
                                  <div><h5 className="font-medium text-xs md:text-sm text-text-light dark:text-text-dark">{item.name}</h5><p className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark mt-0.5">{item.desc}</p></div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs md:text-sm text-muted-light dark:text-muted-dark">Explore our full range of solutions</p>
                  <Link href="/contact" onClick={onClose} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto justify-center">Contact Us <RiArrowRightLine size={16} /></Link>
                </div>
              </motion.div>
            )}

            {activeTab === "products" && (
              <motion.div key="products" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.22 }} className="flex flex-col p-4 md:p-6">
                <div className="text-center mb-4 md:mb-8">
                  <p className="text-xs uppercase tracking-widest text-primary-500 mb-1 md:mb-2">Our Products</p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark">Built for Healthcare.</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {products.map((product, i) => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }} className="p-4 md:p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-3 md:top-4 right-3 md:right-4">
                        <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1 ${product.status === "LIVE" ? "bg-secondary-500/20 text-secondary-500 border border-secondary-500/30" : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"}`}>
                          {product.status === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />}
                          {product.status === "LIVE" ? "LIVE" : product.status}
                        </span>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm md:text-lg mb-3 md:mb-4">{product.letter}</div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-text-light dark:text-text-dark mb-1">{product.title}</h3>
                      <p className="text-[10px] md:text-xs text-primary-500 font-medium mb-2 md:mb-3">{product.subtitle}</p>
                      <p className="text-xs md:text-sm text-muted-light dark:text-muted-dark mb-3 md:mb-4 leading-relaxed">{product.description}</p>
                      <ul className="space-y-1.5 md:space-y-2">
                        {product.features.map((f, fi) => (
                          <li key={fi} className="flex items-center gap-2 text-xs md:text-sm text-muted-light dark:text-muted-dark"><RiCheckLine className="text-secondary-500 shrink-0" size={12} /> {f}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs md:text-sm text-muted-light dark:text-muted-dark">Explore our full range of solutions</p>
                  <Link href="/contact" onClick={onClose} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto justify-center">Contact Us <RiArrowRightLine size={16} /></Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ModalBackdrop>
  );
}

// ─────────────────────────────────────────────
// Client Work Popup
// ─────────────────────────────────────────────
function ClientWorkPopup({ client, onClose }: { client: SegmentedClient; onClose: () => void }) {
  const defaultWork: Record<string, { title: string; desc: string; year: string; type: string }[]> = {
    pharma: [{ title: "Brand Strategy", desc: "Comprehensive brand positioning", year: "2024", type: "Strategy" }, { title: "Medical Education", desc: "CME-accredited training programs", year: "2024", type: "Education" }, { title: "Digital Campaign", desc: "Multi-channel digital marketing", year: "2023", type: "Campaign" }, { title: "Product Launch", desc: "Integrated product launch", year: "2023", type: "Launch" }],
    vendor: [{ title: "Tech Integration", desc: "Platform integration and API", year: "2024", type: "Tech" }, { title: "Cloud Solutions", desc: "Scalable cloud infrastructure", year: "2024", type: "Cloud" }, { title: "Analytics Platform", desc: "Data analytics dashboards", year: "2023", type: "Analytics" }],
    society: [{ title: "Event Management", desc: "Virtual and hybrid conferences", year: "2024", type: "Events" }, { title: "Content Creation", desc: "Medical educational materials", year: "2024", type: "Content" }, { title: "Accreditation", desc: "CPD and CME accreditation", year: "2023", type: "Accreditation" }],
  };

  const workItems = defaultWork[client.category] || defaultWork.pharma;
  const categoryColors: Record<string, string> = { pharma: "from-primary-500 to-secondary-500", vendor: "from-secondary-500 to-primary-500", society: "from-primary-400 to-secondary-400" };
  const color = categoryColors[client.category] || categoryColors.pharma;

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full md:max-w-2xl max-h-[85vh] bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="absolute top-4 right-4 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-text-light dark:text-text-dark transition-colors">
          <RiCloseLine size={18} />
        </motion.button>

        <div className="flex-none p-4 md:p-6 pb-3 md:pb-4 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-surface-light dark:bg-surface-light border border-border-dark flex items-center justify-center overflow-hidden p-1.5 md:p-2 shrink-0">
              {client.logo ? <Image src={client.logo} alt={client.name} width={100} height={100} className="w-full h-full object-contain bg-white" /> : <div className={`w-full h-full rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-lg font-bold`}>{client.name.slice(0, 2).toUpperCase()}</div>}
            </motion.div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg md:text-xl font-bold text-text-light dark:text-text-dark truncate">{client.name}</h3>
              <p className="text-xs md:text-sm text-muted-light dark:text-muted-dark flex items-center gap-1"><ReactCountryFlag countryCode={client.flag} svg className="!w-3 !h-3 md:!w-4 md:!h-3" />{client.country}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <h4 className="text-xs md:text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
            <span className={`w-6 md:w-8 h-0.5 bg-gradient-to-r ${color}`} /> Work & Projects
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {workItems.map((work, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-3 md:p-4 rounded-xl bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light/50 dark:border-border-dark/50 hover:border-primary-500/30 transition-all">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0`}><span className="text-[10px] md:text-xs font-bold">{work.type.slice(0, 2).toUpperCase()}</span></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1"><span className="text-[10px] md:text-xs font-medium text-primary-500">{work.year}</span><span className="text-[10px] md:text-xs px-1.5 py-0.5 rounded-full bg-secondary-500/10 text-secondary-500">{work.type}</span></div>
                    <h5 className="font-semibold text-xs md:text-sm text-text-light dark:text-text-dark mb-0.5">{work.title}</h5>
                    <p className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">{work.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-none p-4 md:p-6 pt-3 md:pt-4 border-t border-border-light dark:border-border-dark">
          <Link href="/work" onClick={onClose} className={`flex items-center justify-center gap-2 w-full py-2.5 md:py-3 rounded-xl bg-gradient-to-r ${color} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}>
            <RiArrowRightLine size={16} /> View All Work
          </Link>
        </div>
      </div>
    </ModalBackdrop>
  );
}

// ─────────────────────────────────────────────
// Company Modal
// ─────────────────────────────────────────────
function CompanyModal({ company, onClose }: { company: Company; onClose: () => void }) {
  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full md:max-w-lg glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
        <div className={`h-20 md:h-24 bg-gradient-to-r ${company.color} relative`}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
            <RiCloseLine size={18} />
          </motion.button>
          <div className="absolute -bottom-3 md:-bottom-4 left-4 md:left-6 w-7 h-5 md:w-8 md:h-6 rounded overflow-hidden shadow-md">
            <ReactCountryFlag countryCode={company.flag} svg style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <div className="p-4 md:p-6 pt-6 md:pt-8">
          <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
            {company.logo ? (
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden p-1.5 md:p-2 shrink-0">
                <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg shrink-0`}>{company.icon}</div>
            )}
            <div className="min-w-0">
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-light dark:text-text-dark">{company.name}</h3>
              <p className={`text-xs md:text-sm font-semibold uppercase tracking-wider bg-gradient-to-r ${company.color} bg-clip-text text-transparent`}>{company.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <span className="text-[10px] md:text-xs font-mono text-muted-light dark:text-muted-dark bg-black/5 dark:bg-white/5 px-2 md:px-3 py-0.5 md:py-1 rounded-full">Est. {company.year}</span>
            <span className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">{company.country}</span>
          </div>

          <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-4 md:mb-6">{company.description}</p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
            <Link href="/contact" className={`flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r ${company.color} text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg`}>
              <RiMailLine size={16} /> Get in Touch <RiArrowRightLine size={14} />
            </Link>
            <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl border border-border-light dark:border-border-dark text-sm text-muted-light dark:text-muted-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
              Close
            </motion.button>
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
}

// ─────────────────────────────────────────────
// Accreditations Modal
// ─────────────────────────────────────────────
function AccreditationsModal({ onClose }: { onClose: () => void }) {
  const accreditations = [
    { shortName: "CPD-UK", country: "United Kingdom", flag: "🇬🇧", description: "Internationally recognized accreditation for professional development.", color: "from-primary-500 to-secondary-400" },
    { shortName: "DHA", country: "UAE", flag: "🇦🇪", description: "Official recognition from the Dubai Health Authority.", color: "from-primary-500 to-secondary-400" },
    { shortName: "SCFHS", country: "Saudi Arabia", flag: "🇸🇦", description: "Accredited by SCFHS for CME programs.", color: "from-primary-500 to-secondary-400" },
    { shortName: "RCSEd", country: "United Kingdom", flag: "🇬🇧", description: "Partnership ensuring surgical education meets global standards.", color: "from-primary-500 to-secondary-400" },
  ];

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full md:max-w-4xl glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        <div className="flex-none bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white"><RiAwardLine size={20} /></div>
            <div><h2 className="font-display text-lg md:text-xl font-bold text-text-light dark:text-text-dark">Accreditations</h2><p className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">Globally Recognized.</p></div>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-muted-light dark:text-muted-dark hover:bg-black/10 dark:hover:bg-white/10 transition-all"><RiCloseLine size={18} /></motion.button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {accreditations.map((acc, i) => (
              <motion.div key={acc.shortName} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }} className="glass-light dark:glass-dark rounded-2xl p-4 md:p-5 border border-border-light dark:border-border-dark hover:border-primary-500/40 transition-all">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${acc.color} flex items-center justify-center mb-3 md:mb-4 shadow-lg`}><RiShieldCheckLine className="text-white" size={20} /></div>
                <div className={`text-lg md:text-xl font-display font-bold bg-gradient-to-r ${acc.color} bg-clip-text text-transparent mb-1`}>{acc.shortName}</div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-light dark:text-muted-dark mb-2"><span>{acc.flag}</span>{acc.country}</div>
                <p className="text-xs md:text-sm text-muted-light dark:text-muted-dark leading-relaxed">{acc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
}

// ─────────────────────────────────────────────
// Testimonials Modal
// ─────────────────────────────────────────────
function TestimonialsModal({ activeTestimonial, setActiveTestimonial, onClose }: { activeTestimonial: number; setActiveTestimonial: (i: number) => void; onClose: () => void }) {
  const testimonials = [
    { name: "Dr. Sarah Al-Rashidi", title: "Medical Director", company: "Novartis Gulf", review: "Marvel Group transformed our HCP engagement strategy completely. Their creative intelligence paired with medical precision is unlike anything we've experienced.", rating: 5, country: "UAE" },
    { name: "Ahmed Khalil", title: "Brand Manager", company: "Pfizer MENA", review: "The AREEP platform revolutionized how we train our medical reps. ROI was visible within 3 months.", rating: 5, country: "Egypt" },
    { name: "Dr. Mohammed Al-Ghamdi", title: "L&D Director", company: "Saudi Pharma Group", review: "Outstanding medical education content. CPD-accredited, scientifically rigorous, and beautifully designed.", rating: 5, country: "KSA" },
  ];

  const countryFlags: Record<string, string> = { UAE: "🇦🇪", KSA: "🇸🇦", Egypt: "🇪🇬" };
  const current = testimonials[activeTestimonial];

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full md:max-w-5xl glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
        <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white"><RiTeamLine size={20} /></div>
            <div><h2 className="font-display text-lg md:text-xl font-bold text-text-light dark:text-text-dark">Client Reviews</h2><p className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">100+ pharma brands trust us.</p></div>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-muted-light dark:text-muted-dark hover:bg-black/10 dark:hover:bg-white/10 transition-all"><RiCloseLine size={18} /></motion.button>
        </div>

        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.28 }}>
              <div className="relative mb-4 md:mb-6">
                <div className="absolute -top-1 md:-top-2 -left-1 md:-left-2 w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center"><RiDoubleQuotesL className="text-primary-500/30" size={20} /></div>
                <p className="text-text-light dark:text-text-dark text-sm md:text-lg leading-relaxed relative z-10 pl-3 md:pl-4">&ldquo;{current.review}&rdquo;</p>
              </div>
              <div className="flex gap-1 mb-4 md:mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.06 }} className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary-500/20 flex items-center justify-center"><RiStarFill className="text-secondary-400" size={12} /></motion.div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-display font-bold text-lg md:text-xl shadow-lg">{current.name.charAt(0)}</div>
                  <div>
                    <div className="font-display font-semibold text-text-light dark:text-text-dark text-sm md:text-lg">{current.name}</div>
                    <div className="text-xs md:text-sm text-muted-light dark:text-muted-dark">{current.title}</div>
                    <div className="text-[10px] md:text-xs text-secondary-500 mt-0.5">{current.company}</div>
                  </div>
                </div>
                <div className="text-2xl md:text-3xl">{countryFlags[current.country] || "🇪🇬"}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            {testimonials.map((_, i) => (
              <motion.button key={i} onClick={() => setActiveTestimonial(i)} whileTap={{ scale: 0.9 }} className={`h-2 rounded-full transition-all duration-400 ${activeTestimonial === i ? "w-6 md:w-8 bg-primary-500" : "w-2 bg-primary-500/30 hover:bg-primary-500/50"}`} />
            ))}
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
}

// ─────────────────────────────────────────────
// Chat Modal
// ─────────────────────────────────────────────
function ChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "user" | "bot" }[]>([
    { id: 1, text: "Hi there! 👋 How can we help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const botResponses: Record<string, string> = {
    hello: "Hi there! 👋 Welcome to Marvel Group.",
    hi: "Hello! 👋 How can we assist you?",
    services: "We offer: Medical Creative, Digital Platforms, Medical Education, AI Solutions, and more.",
    contact: "Reach us at info@marvelgroup.com.",
    default: "Thanks! Contact us at info@marvelgroup.com for assistance.",
  };

  function getBotResponse(msg: string): string {
    const lower = msg.toLowerCase();
    for (const [key, resp] of Object.entries(botResponses)) {
      if (lower.includes(key)) return resp;
    }
    return botResponses.default;
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), text: input, sender: "user" as const };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: getBotResponse(userMsg.text), sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full md:max-w-md glass-light dark:glass-dark rounded-t-2xl md:rounded-2xl border-t md:border border-border-light dark:border-border-dark shadow-2xl overflow-hidden max-h-[90vh]">
        <div className="bg-primary-500 px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center"><RiMessage3Line size={18} className="text-white" /></div>
            <div>
              <h4 className="text-white font-semibold text-sm md:text-base">Marvel Support</h4>
              <p className="text-white/70 text-[10px] md:text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse" />Online</p>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"><RiCloseLine size={16} /></motion.button>
        </div>

        <div className="h-64 md:h-80 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3 bg-surface-light/50 dark:bg-surface-dark/50">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", damping: 20 }} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] md:max-w-[80%] px-3 md:px-4 py-2 md:py-2.5 rounded-2xl text-xs md:text-sm ${msg.sender === "user" ? "bg-primary-500 text-white rounded-br-md" : "bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark rounded-bl-md"}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark px-4 py-2.5 rounded-2xl rounded-bl-md">
                <span className="flex gap-1 items-center">
                  {[0, 0.2, 0.4].map((d, i) => <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: d, repeat: Infinity }} className="w-1.5 h-1.5 bg-muted-light dark:bg-muted-dark rounded-full inline-block" />)}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-3 md:p-4 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Type a message..." className="flex-1 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus:border-primary-500 transition-colors" />
            <motion.button onClick={handleSend} disabled={!input.trim() || isTyping} whileTap={{ scale: 0.92 }} className="w-9 h-9 md:w-10 md:h-10 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 rounded-xl flex items-center justify-center transition-colors shrink-0">
              <RiSendPlaneLine size={16} className="text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
}

// ─────────────────────────────────────────────
// Expertise Modal
// ─────────────────────────────────────────────
function ExpertiseModal({ onClose }: { onClose: () => void }) {
  const therapeuticAreas = [
    { name: "Diabetes", icon: RiStethoscopeLine, color: "from-primary-500 to-primary-400", desc: "Diabetes care & endocrine solutions" },
    { name: "Orthopedics", icon: RiFirstAidKitLine, color: "from-secondary-500 to-secondary-400", desc: "Musculoskeletal health" },
    { name: "Internal Medicine", icon: RiHospitalLine, color: "from-primary-600 to-primary-500", desc: "Primary care expertise" },
    { name: "Cardiology", icon: RiHeartPulseLine, color: "from-secondary-600 to-secondary-500", desc: "Cardiovascular health" },
    { name: "Oncology", icon: RiMicroscopeLine, color: "from-primary-500 to-primary-400", desc: "Cancer care & research" },
    { name: "Neurology", icon: RiBrainLine, color: "from-secondary-500 to-secondary-400", desc: "Brain health solutions" },
    { name: "Dermatology", icon: RiVirusLine, color: "from-primary-600 to-primary-500", desc: "Skin health conditions" },
    { name: "Ophthalmology", icon: RiEyeLine, color: "from-secondary-600 to-secondary-500", desc: "Eye care expertise" },
    { name: "Pulmonology", icon: RiHealthBookLine, color: "from-primary-500 to-primary-400", desc: "Respiratory health" },
    { name: "Gastroenterology", icon: RiCapsuleLine, color: "from-secondary-500 to-secondary-400", desc: "Digestive health" },
    { name: "Rheumatology", icon: RiUserHeartLine, color: "from-primary-600 to-primary-500", desc: "Autoimmune diseases" },
    { name: "Women's Health", icon: RiWomenLine, color: "from-secondary-600 to-secondary-500", desc: "Women's wellness" },
  ];

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="relative w-full md:max-w-5xl max-h-[85vh] bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden flex flex-col">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="absolute top-3 md:top-4 right-3 md:right-4 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-text-light dark:text-text-dark transition-colors"><RiCloseLine size={18} /></motion.button>

        <div className="flex-none p-4 md:p-6 pb-3 md:pb-4 border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white"><RiHeartPulseLine size={24} /></div>
            <div><h3 className="font-display text-lg md:text-xl font-bold text-text-light dark:text-text-dark">Expertise</h3><p className="text-xs md:text-sm text-muted-light dark:text-muted-dark">Therapeutic Areas</p></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {therapeuticAreas.map((area, i) => (
              <motion.div key={area.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="group p-3 md:p-4 rounded-xl bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light/50 dark:border-border-dark/50 hover:border-primary-500/30 transition-all">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-2 md:mb-3`}>
                  <area.icon className="text-white" size={18} />
                </div>
                <h4 className="font-semibold text-xs md:text-sm text-text-light dark:text-text-dark mb-0.5 md:mb-1">{area.name}</h4>
                <p className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark leading-relaxed">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex-none p-4 md:p-6 pt-3 md:pt-4 border-t border-border-light dark:border-border-dark">
          <Link href="/therapeutic-areas" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            <RiArrowRightLine size={16} /> Explore All Areas
          </Link>
        </div>
      </div>
    </ModalBackdrop>
  );
}
