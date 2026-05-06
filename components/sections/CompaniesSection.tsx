
"use client";

import { useState, useEffect, useRef } from "react";
import { segmentedClients, bigNumbers } from "@/data";
import {
  RiCloseLine, RiArrowRightLine, RiMailLine, RiSettings4Line, RiServiceLine,
  RiStarLine, RiStackLine, RiGraduationCapLine, RiFileTextLine, RiComputerLine,
  RiPaletteLine, RiUserSettingsLine, RiCodeBoxLine, RiCheckLine,
  RiVideoLine, RiCalendarEventLine, RiBuildingLine, RiGlobalLine, RiBriefcaseLine,
  RiAwardLine, RiShieldCheckLine, RiTeamLine, RiDoubleQuotesL, RiStarFill,
  RiWhatsappLine, RiMessage3Line, RiSendPlaneLine, RiHeartPulseLine, RiMicroscopeLine,
  RiBrainLine, RiEyeLine, RiCapsuleLine, RiWomenLine, RiStethoscopeLine, RiVirusLine,
  RiUserHeartLine, RiFirstAidKitLine, RiHospitalLine, RiHealthBookLine, RiArrowUpSLine,
  RiSunLine, RiMoonLine,
  RiArrowLeftLine, RiArrowRightSLine, RiArrowLeftSLine,
  RiGroupLine,
  RiImageLine, RiLinkedinBoxLine, RiBookReadLine, RiLightbulbFlashLine,
  RiShapesLine, RiSettings3Line, RiDatabase2Line, RiFlashlightLine, RiArticleLine,
  RiBookOpenLine, RiMessage2Line,
  // Additional social media icons
  RiFacebookBoxLine, RiYoutubeLine, RiTwitterXLine, RiInstagramLine,
  RiSnapchatLine, RiTelegramLine, RiBarChartBoxLine, RiShareLine
} from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import ReactCountryFlag from "react-country-flag";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Company, SegmentedClient } from "@/types";
import ChatWidget from "@/components/ui/ChatWidget";

const SPRING_CONFIG = { type: "spring" as const, damping: 30, stiffness: 260 };

// ─── CONFIGURABLE TOOLBAR ───
// Set 'visible: false' to hide any button, edit 'label' to change name
const TOOLBAR_ITEMS = [
  { id: "services", label: "Services", icon: RiSettings4Line, color: "primary", visible: true },
  { id: "products", label: "Products", icon: RiBriefcaseLine, color: "primary", visible: true },
  { id: "expertise", label: "Expertise", icon: RiHeartPulseLine, color: "primary", visible: true },
  { id: "accreds", label: "Accreds", icon: RiAwardLine, color: "primary", visible: true },
  { id: "reviews", label: "Reviews", icon: RiTeamLine, color: "primary", visible: true },
  { id: "people", label: "People", icon: RiGroupLine, color: "primary", visible: true },
  { id: "gallery", label: "Gallery", icon: RiImageLine, color: "primary", visible: true },
  { id: "theme", label: "Theme", icon: null, color: "primary", visible: true },
  { id: "contact", label: "Contact", icon: RiMailLine, color: "primary", visible: true },
];

// ─── CONFIGURABLE SERVICES ───
// Add, edit, or delete services and their bullet points here
const SERVICES_DATA = [
  { 
    id: "cme", 
    icon: "RiGraduationCapLine", 
    title: "CME", 
    visible: true,
    services: [
      { name: "Curriculum Design", desc: "Comprehensive CME program structuring" },
      { name: "Content Development", desc: "Medical education content creation" },
      { name: "Slide Decks", desc: "Professional presentation materials" },
      { name: "Gamification", desc: "Case studies, patient profiles, interactivity" },
      { name: "Speakers", desc: "Expert faculty management" },
      { name: "Accreditation", desc: "CPD, DHA, SCFHS certificates" },
      { name: "Endorsed Materials", desc: "Officially recognized content" },
    ] 
  },
  { 
    id: "research", 
    icon: "RiFileTextLine", 
    title: "Research", 
    visible: true,
    services: [
      { name: "Study Design", desc: "Clinical and observational research" },
      { name: "Data Analysis", desc: "Statistical and qualitative analysis" },
      { name: "Manuscript Writing", desc: "Peer-reviewed publication support" },
      { name: "Literature Review", desc: "Comprehensive evidence synthesis" },
      { name: "Abstracts & Posters", desc: "Conference submission support" },
    ] 
  },
  { 
    id: "elearning", 
    icon: "RiComputerLine", 
    title: "eLearning", 
    visible: true,
    services: [
      { name: "LMS Development", desc: "Learning management systems" },
      { name: "Interactive Modules", desc: "Engaging digital content" },
      { name: "VR Training", desc: "Virtual reality medical simulations" },
      { name: "Mobile Apps", desc: "Healthcare education apps" },
      { name: "Assessment Tools", desc: "Online testing & certification" },
    ] 
  },
  { 
    id: "artwork", 
    icon: "RiPaletteLine", 
    title: "Marketing", 
    visible: true,
    services: [
      { name: "Brand Identity", desc: "Logo and visual system design" },
      { name: "Marketing Campaigns", desc: "Multi-channel promotion strategies" },
      { name: "Medical Illustration", desc: "Anatomical and scientific art" },
      { name: "Video Production", desc: "Educational and promotional videos" },
      { name: "Social Media", desc: "Digital marketing management" },
    ] 
  },
  { 
    id: "training", 
    icon: "RiUserSettingsLine", 
    title: "Training", 
    visible: true,
    services: [
      { name: "Workshops", desc: "Hands-on skill development" },
      { name: "Certification Programs", desc: "Professional credentials" },
      { name: "On-site Training", desc: "In-person education delivery" },
      { name: "Train-the-Trainer", desc: "Faculty development programs" },
    ] 
  },
  { 
    id: "it", 
    icon: "RiCodeBoxLine", 
    title: "IT", 
    visible: true,
    services: [
      { name: "Custom Software", desc: "Bespoke healthcare applications" },
      { name: "CRM Systems", desc: "Customer relationship platforms" },
      { name: "Data Analytics", desc: "Healthcare intelligence dashboards" },
      { name: "AI Integration", desc: "Machine learning solutions" },
    ] 
  },
  { 
    id: "visuals", 
    icon: "RiVideoLine", 
    title: "Visuals", 
    visible: true,
    services: [
      { name: "3D Medical Animation", desc: "Complex medical concepts visualization" },
      { name: "VR Training", desc: "Virtual reality medical simulations" },
      { name: "Video Production", desc: "Professional healthcare videos" },
      { name: "Interactive Media", desc: "Engaging digital experiences" },
      { name: "Motion Graphics", desc: "Animated medical illustrations" },
    ] 
  },
  { 
    id: "events", 
    icon: "RiCalendarEventLine", 
    title: "Events", 
    visible: true,
    services: [
      { name: "Conference Planning", desc: "Full-service medical conferences" },
      { name: "Virtual Events", desc: "Online webinars & summits" },
      { name: "Hybrid Events", desc: "In-person + digital combined" },
      { name: "Exhibition Booths", desc: "Trade show presence design" },
      { name: "Speaker Management", desc: "Keynote & panel coordination" },
    ] 
  },
];

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

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return count;
}

const StatValue = ({ value, suffix }: { value: number; suffix: string }) => {
  const count = useCountUp(value);
  return (
    <>
      {count}
      {suffix}
    </>
  );
};

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
        { angle: -90, distance: 125 },
        { angle: -30, distance: 125 },
        { angle: 30, distance: 125 },
        { angle: 90, distance: 125 },
        { angle: 150, distance: 125 },
        { angle: -150, distance: 125 },
      ],
      ringSize1: 250,
      ringSize2: 280,
      glowSize: 200,
      centerSize: 100,
      nodeSize: 54,
      logoSize: 52,
    };
  }
  if (bp === "tablet") {
    return {
      positions: [
        { angle: -90, distance: 155 },
        { angle: -30, distance: 155 },
        { angle: 30, distance: 155 },
        { angle: 90, distance: 155 },
        { angle: 150, distance: 155 },
        { angle: -150, distance: 155 },
      ],
      ringSize1: 300,
      ringSize2: 330,
      glowSize: 250,
      centerSize: 100,
      nodeSize: 52,
      logoSize: 55,
    };
  }
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
    ringSize2: 300,
    glowSize: 220,
    centerSize: 110,
    nodeSize: 54,
    logoSize: 60,
  };
}

export default function CompaniesSection() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Fetch companies from API
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Fetch companies from API
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies');
        const data = await response.json();
        if (data.success) {
          setCompanies(data.companies);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoadingCompanies(false);
      }
    };
    
    fetchCompanies();
  }, []);
  const isTablet = bp === "tablet";

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedClient, setSelectedClient] = useState<SegmentedClient | null>(null);
  const [showServices, setShowServices] = useState(false);
  const [showAccreditations, setShowAccreditations] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showExpertise, setShowExpertise] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [activeTab, setActiveTab] = useState<"comprehensive" | "featured" | "products">("comprehensive");
  const [selectedCountry, setSelectedCountry] = useState<(typeof COUNTRIES)[0] | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [activeClientTab, setActiveClientTab] = useState<"all" | "pharma" | "vendors" | "societies">("all");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [hoveredOrbit, setHoveredOrbit] = useState<string | null>(null);
  const [showMobileNetwork, setShowMobileNetwork] = useState(false);
  const [showMobileLeft, setShowMobileLeft] = useState(false);
  const [showMobileRight, setShowMobileRight] = useState(false);
  
  const [scrollSpeed, setScrollSpeed] = useState(1); 
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Stats cycling logic
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % bigNumbers.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  
  // Orbit expansion state - true when in center (expanded), false when moved left (compact)
  const [orbitExpanded, setOrbitExpanded] = useState(true);

  const BASE_DURATION = 60;
  
  // Compute if any info panel is currently shown
  const isInfoPanelShown = selectedCompany || selectedClient || selectedCountry || showServices || showExpertise || showAccreditations || showTestimonials || showChat || showPeople || showGallery;

  const resetDesktopStates = () => {
    setSelectedCompany(null);
    setSelectedClient(null);
    setSelectedCountry(null);
    setShowServices(false);
    setShowExpertise(false);
    setShowAccreditations(false);
    setShowTestimonials(false);
    setShowChat(false);
    setShowPeople(false);
    setShowGallery(false);
    setOrbitExpanded(true); // Return orbit to center when closing panels
  };

  const handleStateChange = (setter: (val: any) => void, val: any) => {
    if (!isMobile) resetDesktopStates();
    setter(val);
    setOrbitExpanded(false); // Collapse orbit to left when opening any panel
  };

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
      setShowRightPanel(false);
    } else {
      setShowRightPanel(true);
    }
  }, [isMobile]);


  return (
    <section
      ref={containerRef}
      className={`${isMobile ? "min-h-[90vh] pt-36 overflow-x-hidden" : "h-screen overflow-hidden"} bg-bg-light dark:bg-bg-dark relative flex items-center justify-center`}
    >
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0 pointer-events-none w-full ">
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
      <motion.div layout className={`relative z-50 w-full max-w-7xl mx-auto px-2 sm:px-4 flex ${isMobile ? "flex-col items-center" : "items-center justify-start gap-4 lg:gap-8"}`}>

        {/* ─── Desktop/Tablet: Top Toolbar ─── */}
        {!isMobile && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="fixed top-3 left-28 right-4 z-40 px-2 pointer-events-none"
          >
            <div className="max-w-lg xl:max-w-3xl mx-auto w-full pointer-events-auto">
              <div className="rounded-xl glass-light dark:glass-dark border border-border-light dark:border-border-dark/50 shadow-xl overflow-hidden backdrop-blur-xl">
                <div className="flex items-center justify-between py-1 px-0.5">
                  {TOOLBAR_ITEMS.filter((item) => item.visible).map((item, idx) => {
                    const isSecondary = item.color === "secondary";
                    const active = 
                      (item.id === "services" && showServices) ||
                      (item.id === "expertise" && showExpertise) ||
                      (item.id === "accreds" && showAccreditations) ||
                      (item.id === "reviews" && showTestimonials) ||
                      (item.id === "people" && showPeople) ||
                      (item.id === "gallery" && showGallery);
                    
                    // Dynamic icon for theme
                    const Icon = item.id === "theme" 
                      ? (mounted ? (theme === "dark" ? RiSunLine : RiMoonLine) : RiSunLine)
                      : item.icon;
                    
                    const handleClick = () => {
                      if (item.id === "services") handleStateChange(setShowServices, true);
                      else if (item.id === "expertise") handleStateChange(setShowExpertise, true);
                      else if (item.id === "accreds") handleStateChange(setShowAccreditations, true);
                      else if (item.id === "reviews") handleStateChange(setShowTestimonials, true);
                      else if (item.id === "people") handleStateChange(setShowPeople, true);
                      else if (item.id === "gallery") handleStateChange(setShowGallery, true);
                      else if (item.id === "theme") setTheme(theme === "dark" ? "light" : "dark");
                    };

                    const content = (
                      <>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.92 }}
                          className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center border transition-all ${active
                            ? "bg-primary-500 text-white border-primary-400 shadow-[0_0_12px_rgba(18,122,138,0.4)]"
                            : `bg-gradient-to-br ${isSecondary ? "from-secondary-500/20 to-secondary-600/20 text-secondary-500" : "from-primary-500/20 to-secondary-500/20 text-primary-500"} border-border-light dark:border-white/5 group-hover:border-primary-500/30`
                            }`}
                        >
                          {Icon && <Icon size={15} />}
                        </motion.div>
                        <span className={`whitespace-nowrap text-[8px] font-bold uppercase tracking-wide transition-all ${active ? "text-primary-500 opacity-100" : "text-text-light dark:text-text-dark opacity-80 group-hover:opacity-100 group-hover:text-primary-500"
                          }`}>
                          {item.label}
                        </span>
                      </>
                    );

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.04 }}
                        className="flex-1 min-w-0"
                      >
                        {item.id === "contact" || item.id === "products" ? (
                          <Link
                            href={`/${item.id}`}
                            className="group flex flex-col items-center gap-1 py-0.5 px-0.5 hover:bg-primary-500/5 dark:hover:bg-white/5 rounded-lg transition-all duration-300"
                          >
                            {content}
                          </Link>
                        ) : (
                          <button
                            onClick={handleClick}
                            className="group flex flex-col items-center gap-1 py-0.5 px-0.5 hover:bg-primary-500/5 dark:hover:bg-white/5 rounded-lg transition-all duration-300 w-full"
                          >
                            {content}
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}




        {/* ─── Desktop/Tablet: Flags Bar (Fixed, similar style to toolbar) ─── */}
        {!isMobile && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            className="fixed top-4 left-2 lg:left-4 z-40 pointer-events-auto "
          >
            <div className="rounded-xl p-2 glass-light dark:glass-dark border border-border-light dark:border-border-dark/50 shadow-xl backdrop-blur-xl flex items-center gap-1.5 lg:gap-2">
              {COUNTRIES.map((country, idx) => (
                <motion.button
                  key={country.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: [0, -4, 0] }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.25 },
                    opacity: { duration: 0.5, delay: idx * 0.12 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStateChange(setSelectedCountry, country)}
                  className="group relative flex items-center gap-1.5 px-1.5 py-1 rounded-lg bg-white/50 dark:bg-white/10 border border-white/20 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-primary-500/40 transition-all duration-300"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-8 rounded overflow-hidden shadow-lg">
                    <ReactCountryFlag countryCode={country.flag} svg style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <span className="text-[10px] font-semibold text-text-light dark:text-text-dark group-hover:text-primary-500 transition-colors">
                    {country.flag}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Center Orbital ─── */}
        <motion.div
          layout
          initial={false}
          animate={!isMobile ? {
            x: orbitExpanded ? 420 : -50,
            scale: orbitExpanded ? 1.25 : 0.95,
          } : { x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`relative flex items-center justify-center pointer-events-auto ${isMobile ? "w-full min-h-[60vh]" : "w-[400px] min-h-[80vh] mt-12"}`}
        >
          {/* Mobile flags row only */}
          {isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 z-30 -top-28">
              <div className="flex items-center justify-center gap-6">
                {COUNTRIES.map((country, idx) => (
                  <motion.button
                    key={country.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: [0, -6, 0] }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.25 },
                      opacity: { duration: 0.5, delay: idx * 0.12 },
                    }}
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setSelectedCountry(country)}
                    className="group relative flex items-center justify-center transition-all duration-300"
                  >
                    <div className="w-12 h-9 rounded-lg overflow-hidden shadow-lg border-2 border-transparent group-hover:border-primary-500/60 transition-all duration-300 relative z-10">
                      <ReactCountryFlag countryCode={country.flag} svg style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-primary-500/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Orbital layout */}
          <div
            className={`relative z-[100] flex items-center justify-center pointer-events-auto ${isMobile ? "w-full h-[340px] -mt-44" : isTablet ? "w-full h-[400px] -mt-8" : "w-full h-[500px] -mt-12"}`}
            onMouseEnter={() => !isMobile && setIsHovering(true)}
            onMouseLeave={() => !isMobile && setIsHovering(false)}
          >
            {/* Outer dashed ring */}
            <div
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
            >
              <div style={{ width: orbitConfig.ringSize1, height: orbitConfig.ringSize1 }} className="border-2 border-dashed border-primary-500/40 rounded-full" />
            </div>

            {/* Second counter ring */}
            <div
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ transform: `translate(-50%, -50%) rotate(${-rotation * 0.6}deg)` }}
            >
              <div style={{ width: orbitConfig.ringSize2, height: orbitConfig.ringSize2 }} className="border border-secondary-500/35 rounded-full" />
            </div>

            {/* Inner glow ring */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
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

            {/* Central Marvel Logo - Clickable to show About Marvel */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 cursor-pointer group"
              style={{
                x: isMobile ? -(orbitConfig.centerSize / 2) : centerX,
                y: isMobile ? -(orbitConfig.centerSize / 2) : centerY,
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (!isMobile) {
                  // Find main company (Marvel Group) from API data
                  const mainCompany = companies.find((c: any) => c.isMain === true);
                  if (mainCompany) {
                    handleStateChange(setSelectedCompany, mainCompany);
                  } else if (companies.length > 0) {
                    // Fallback to first company if no main company found
                    handleStateChange(setSelectedCompany, companies[0]);
                  }
                }
              }}
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

            {/* Loading State */}
            {loadingCompanies && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                  <span className="text-xs text-muted-dark">Loading companies...</span>
                </div>
              </div>
            )}

            {/* Company Orbitals - Exclude main company */}
            {!loadingCompanies && companies.filter((c: any) => !c.isMain).map((company, index) => {
              const position = orbitConfig.positions[index];
              if (!position) return null;
              const angleRad = ((position.angle + rotation * 0.22) * Math.PI) / 180;
              const x = Math.cos(angleRad) * position.distance;
              const y = Math.sin(angleRad) * position.distance;
              const isHovered = hoveredOrbit === company.id;
              const isActive = selectedCompany?.id === company.id;
              const half = orbitConfig.nodeSize / 2;

              return (
                <div
                  key={company.id}
                  className={`absolute left-1/2 top-1/2 mt-4 transition-all duration-300 ${isHovered ? "z-[9999]" : "z-20"}`}
                  style={{
                    width: orbitConfig.nodeSize,
                    height: orbitConfig.nodeSize,
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                >
                  <div
                    className="relative w-full h-full cursor-pointer"
                    style={{ top: isMobile ? -8 : -16 }}
                    onMouseEnter={() => setHoveredOrbit(company.id)}
                    onMouseLeave={() => setHoveredOrbit(null)}
                    onClick={() => handleStateChange(setSelectedCompany, company)}
                  >
                    <motion.div
                      animate={(isHovered || isActive) ? { opacity: 0.6, scale: 1.2 } : { opacity: 0, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`absolute inset-0 bg-gradient-to-br ${company.color} rounded-full blur-xl`}
                    />
                    <motion.div
                      whileHover={{ scale: 1.18 }}
                      whileTap={{ scale: 0.92 }}
                      style={{ width: orbitConfig.nodeSize, height: orbitConfig.nodeSize }}
                      className={`relative rounded-full bg-white border-2 ${(isHovered || isActive) ? "border-primary-500 shadow-[0_0_15px_rgba(18,122,138,0.5)]" : "border-transparent"} flex items-center justify-center shadow-lg transition-all duration-300`}
                    >
                      {company.logo ? (
                        <Image src={company.logo} alt={company.name} width={isMobile ? 26 : 40} height={isMobile ? 26 : 40} className="object-contain w-auto h-auto rounded-full" />
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
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="absolute left-1/2 -translate-x-1/2 -top-16 pointer-events-none z-[9999]"
                          >
                            <div className="bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl border border-primary-500/30 whitespace-nowrap">
                              <span className="text-sm font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">{company.name}</span>
                              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-surface-light dark:bg-surface-dark rotate-45 border-r border-b border-primary-500/30" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Animated Stats - Under the Orbit */}
            <div className={`absolute ${isMobile ? "-bottom-20" : "bottom-0"} left-1/2 -translate-x-1/2 w-full text-center z-30`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStatIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent font-display">
                    <StatValue value={bigNumbers[currentStatIndex].value} suffix={bigNumbers[currentStatIndex].suffix} />
                  </div>
                  <p className="text-muted-light dark:text-muted-dark text-[10px] md:text-xs font-bold mt-1 uppercase tracking-[0.2em]">
                    {bigNumbers[currentStatIndex].label}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="flex justify-center gap-1.5 mt-3">
                {bigNumbers.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${i === currentStatIndex ? "w-6 bg-primary-500" : "w-1.5 bg-primary-500/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Dynamic Content Box (Desktop Replacement) ─── */}
        {!isMobile && (
          <DynamicContentBox
            selectedClient={selectedClient}
            selectedCompany={selectedCompany}
            selectedCountry={selectedCountry}
            showServices={showServices}
            showExpertise={showExpertise}
            showAccreditations={showAccreditations}
            showTestimonials={showTestimonials}
            showChat={showChat}
            showPeople={showPeople}
            showGallery={showGallery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeTestimonial={activeTestimonial}
            setActiveTestimonial={setActiveTestimonial}
            setSelectedClient={setSelectedClient}
            setSelectedCompany={setSelectedCompany}
            setSelectedCountry={setSelectedCountry}
            setShowServices={setShowServices}
            setShowExpertise={setShowExpertise}
            setShowAccreditations={setShowAccreditations}
            setShowTestimonials={setShowTestimonials}
            setShowChat={setShowChat}
            setShowPeople={setShowPeople}
            setShowGallery={setShowGallery}
            resetDesktopStates={resetDesktopStates}
          />
        )}

        {/* ─── Mobile: Buttons & Panels BELOW Orbital ─── */}
        {isMobile && (
          <div className="w-full flex flex-col items-center px-4 mt-12">
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
                        { id: "expertise", onClick: () => setShowExpertise(true), icon: RiHeartPulseLine, label: "Therapeutic Areas" },
                        { id: "accreds", onClick: () => setShowAccreditations(true), icon: RiAwardLine, label: "Accreds" },
                        { id: "reviews", onClick: () => setShowTestimonials(true), icon: RiTeamLine, label: "Reviews" },
                        { id: "gallery", onClick: () => setShowGallery(true), icon: RiImageLine, label: "Work Gallery" },
                        { id: "chat", onClick: () => setShowChat(true), icon: RiMessage3Line, label: "Chat" },
                        { id: "contact", href: "/contact", icon: RiMailLine, label: "Contact" },
                      ].map((item) => (
                        item.href ? (
                          <Link key={item.id} href={item.href} onClick={() => setShowMobileLeft(false)} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${(item as any).color === "secondary" ? "from-secondary-500/20 to-secondary-600/20" : "from-primary-500/20 to-secondary-500/20"} flex items-center justify-center`}>
                              <item.icon size={18} className={`${(item as any).color === "secondary" ? "text-secondary-500" : "text-primary-500"}`} />
                            </div>
                            <span className="text-[9px] font-medium text-text-light dark:text-text-dark text-center leading-tight">{item.label}</span>
                          </Link>
                        ) : (
                          <button key={item.id} onClick={() => { handleStateChange(item.onClick as any, true); setShowMobileLeft(false); }} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
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
                        { id: "pharma", label: "Pharma ", icon: RiBriefcaseLine },
                        { id: "vendors", label: "Tech", icon: RiComputerLine },
                        { id: "societies", label: "Medical", icon: RiBuildingLine },
                      ].map((tab) => (
                        <button key={tab.id} onClick={() => setActiveClientTab(tab.id as any)} className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg text-[10px] font-medium transition-all ${activeClientTab === tab.id ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm" : "text-muted-light dark:text-muted-dark"}`}>
                          <tab.icon size={11} /> {tab.label}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                      <div className="contents">
                        {(() => {
                          const list = activeClientTab === "all"
                            ? [...segmentedClients.pharma, ...segmentedClients.vendors, ...segmentedClients.societies]
                            : segmentedClients[activeClientTab];
                          return list?.slice(0, 5).map((client: any, idx: number) => (
                            <motion.button key={client.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => { handleStateChange(setSelectedClient, client); setShowMobileRight(false); }} className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark active:border-primary-500/40 transition-all text-left">
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
                          ));
                        })()}
                      </div>
                    </div>
                    <p className="text-[10px] text-center text-muted-light dark:text-muted-dark mt-2 pt-2 border-t border-border-light dark:border-border-dark">
                      {activeClientTab === "all"
                        ? (segmentedClients.pharma.length + segmentedClients.vendors.length + segmentedClients.societies.length)
                        : (segmentedClients[activeClientTab]?.length || 0)}{" "}
                      {activeClientTab === "all" ? "Total Partners" : activeClientTab === "pharma" ? "Pharma Partners" : activeClientTab === "vendors" ? "Tech Vendors" : "Medical Societies"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Right Panel toggle (desktop/tablet only) */}
        {!isMobile && (
          <AnimatePresence mode="wait">
            {!showRightPanel && (
              <motion.button
                key="right-toggle"
                initial={{ opacity: 0, x: 24, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.8 }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setShowRightPanel(true)}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-light dark:glass-dark border border-border-light dark:border-border-dark shadow-2xl flex items-center justify-center hover:bg-surface-light dark:hover:bg-surface-dark transition-all group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-secondary-500/20 blur-md rounded-full group-hover:bg-secondary-500/40 transition-all" />
                  <RiGlobalLine size={24} className="text-secondary-500 relative z-10" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        )}

        {/* ─── Right Panel (Desktop/Tablet) ─── */}
        {!isMobile && (
          <AnimatePresence>
            {showRightPanel && (
              <motion.div
                layout
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 80 }}
                transition={SPRING_CONFIG}
                className="fixed right-4 top-[5%] -translate-y-1/2 z-40 flex items-center h-[80vh] rounded-2xl overflow-visible gap-2"
              >
                {/* Vertical Tabs Sidebar - with overflow visible */}
                <div className="flex flex-col gap-1 p-1.5 glass-light dark:glass-dark border border-border-light/50 dark:border-border-dark/50 rounded-xl shadow-xl z-10 relative h-fit overflow-visible min-w-[44px]">
                  {[
                    { id: "all", line1: "All", line2: "Partners", count: 95, icon: RiGlobalLine },
                    { id: "pharma", line1: "Pharma", line2: "Companies", count: 46, icon: RiBriefcaseLine },
                    { id: "vendors", line1: "Tech", line2: "Vendors", count: 18, icon: RiComputerLine },
                    { id: "societies", line1: "Medical", line2: "Societies", count: 31, icon: RiBuildingLine },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveClientTab(tab.id as any)}
                      whileHover={{ x: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center gap-1 py-2 px-1.5 rounded-lg transition-all duration-300 ${activeClientTab === tab.id ? "bg-gradient-to-b from-primary-500 to-secondary-500 text-white shadow-lg" : "text-muted-light dark:text-muted-dark hover:text-primary-500"}`}
                    >
                      <tab.icon size={16} />
                      <div className="flex flex-col items-center gap-0 leading-tight">
                        <span className="text-[9px] font-bold leading-none">
                          {tab.line1}
                        </span>
                        <span className="text-[9px] font-bold leading-none">
                          {tab.line2}
                        </span>
                        <span className={`text-[9px] font-bold mt-0.5 ${activeClientTab === tab.id ? 'text-white' : 'text-primary-500'}`}>
                          {tab.count}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Client Logos List - Smooth CSS Auto Scrolling */}
                <div
                  className="w-16 lg:w-20 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-2xl border border-border-light/50 dark:border-border-dark/50 rounded-2xl flex flex-col items-center h-[70vh] overflow-hidden relative shadow-lg"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Speed Controls - Fixed at Top */}
                  <div className="flex items-center gap-1 py-2 px-1 border-b border-border-light/50 dark:border-border-dark/50 w-full justify-center bg-surface-light dark:bg-surface-dark z-10 shrink-0">
                    <motion.button
                      onClick={() => setScrollSpeed((s) => Math.max(s - 0.5, 0.5))}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-5 h-5 rounded bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all"
                      title="Slower"
                    >
                      <span className="text-[10px] font-bold">−</span>
                    </motion.button>
                    <div className="text-[8px] font-bold text-primary-500 w-6 text-center">
                      {scrollSpeed.toFixed(1)}x
                    </div>
                    <motion.button
                      onClick={() => setScrollSpeed((s) => Math.min(s + 0.5, 3))}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-5 h-5 rounded bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm flex items-center justify-center hover:bg-secondary-500 hover:text-white transition-all"
                      title="Faster"
                    >
                      <span className="text-[10px] font-bold">+</span>
                    </motion.button>
                  </div>
                  
                  {/* Scrolling Container - Fixed height with overflow */}
                  <div className="flex-1 overflow-hidden relative w-full">
                    <div 
                      ref={scrollRef}
                      className="flex flex-col gap-3 items-center py-4 animate-scroll-up"
                      style={{ 
                        animationDuration: `${BASE_DURATION / scrollSpeed}s`,
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                        animationPlayState: isPaused ? 'paused' : 'running',
                        minHeight: 'fit-content',
                      }}
                    >
                      <div className="contents">
                        {(() => {
                          const originalList = activeClientTab === "all"
                            ? [...segmentedClients.pharma, ...segmentedClients.vendors, ...segmentedClients.societies]
                            : segmentedClients[activeClientTab];
                          const list = [...originalList, ...originalList];

                          return list?.map((client, idx) => (
                          <motion.button
                            key={`${client.id}-${idx}`}
                            whileHover={{ scale: 1.12, x: -3 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleStateChange(setSelectedClient, client)}
                            className="group relative flex items-center justify-center shrink-0 w-10 h-10 lg:w-12 lg:h-12"
                          >
                            <div className="w-full h-full rounded-xl bg-white dark:bg-white flex items-center justify-center overflow-hidden shadow-sm border border-border-light/50 dark:border-border-dark/20 group-hover:border-primary-500/50 transition-all">
                              {client.logo ? (
                                <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-1.5" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-[10px] font-bold">
                                  {client.name.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>

                            {/* Hover Tooltip */}
                            <div className="absolute right-full mr-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-50">
                              <div className="bg-surface-light dark:bg-surface-dark px-3 py-2 rounded-xl shadow-2xl border border-border-light dark:border-border-dark whitespace-nowrap">
                                <div className="font-bold text-sm text-text-light dark:text-text-dark">{client.name}</div>
                                <div className="text-[10px] text-muted-light dark:text-muted-dark flex items-center gap-1 mt-0.5">
                                  <ReactCountryFlag countryCode={client.flag} svg className="!w-3 !h-2.5" /> {client.country}
                                </div>
                                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-surface-light dark:bg-surface-dark rotate-45 border-r border-t border-border-light dark:border-border-dark" />
                              </div>
                            </div>
                          </motion.button>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              <div className="flex items-center justify-center pb-2">
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
                  <div className="contents">
                    {(() => {
                      const list = activeClientTab === "all"
                        ? [...segmentedClients.pharma, ...segmentedClients.vendors, ...segmentedClients.societies]
                        : segmentedClients[activeClientTab];
                      return list?.map((client: any, idx: number) => (

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
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Modals (Mobile Only) ─── */}
      {isMobile && (
        <AnimatePresence>
          {selectedCompany && <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
          {selectedClient && <ClientWorkPopup client={selectedClient} onClose={() => setSelectedClient(null)} />}
          {selectedCountry && <CountryModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />}
          {showServices && <ServicesModal activeTab={activeTab} setActiveTab={setActiveTab} onClose={() => setShowServices(false)} />}
          {showAccreditations && <AccreditationsModal onClose={() => setShowAccreditations(false)} />}
          {showTestimonials && <TestimonialsModal activeTestimonial={activeTestimonial} setActiveTestimonial={setActiveTestimonial} onClose={() => setShowTestimonials(false)} />}
          {showChat && <ChatModal onClose={() => setShowChat(false)} />}
          {showExpertise && <ExpertiseModal onClose={() => setShowExpertise(false)} />}
          {showGallery && <GalleryModal currentIndex={currentImageIndex} setCurrentIndex={setCurrentImageIndex} onClose={() => setShowGallery(false)} />}
        </AnimatePresence>
      )}

      {/* ─── Task 10: Floating Chat Widget ─── */}
      {!isMobile && (
        <ChatWidget externalOpen={showChat} />
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// Shared animated modal wrapper — full screen on mobile
// ─────────────────────────────────────────────
function ModalBackdrop({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
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

  // ─── CONFIGURABLE PRODUCTS ───
  // Similar to featuredServices with link button and notes support
  const PRODUCTS_DATA = [
    { 
      id: "tebzone", 
      icon: RiStackLine, 
      title: "TebZone", 
      badge: "LIVE", 
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-primary-500 to-secondary-400",
      description: "Healthcare marketplace connecting patients and suppliers.", 
      notes: "Seamless ordering experience with real-time inventory tracking.",
      features: [
        { name: "Medicine Marketplace", desc: "Wide range of healthcare products" },
        { name: "Prescription Upload", desc: "Easy prescription management" },
        { name: "Real-time Tracking", desc: "Track orders live" },
        { name: "Secure Payments", desc: "Encrypted transactions" }
      ],
      link: { label: "Visit TebZone", url: "https://tebzone.com", visible: true }
    },
    { 
      id: "medadd", 
      icon: RiComputerLine, 
      title: "Med-ADD", 
      badge: "LIVE", 
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-secondary-400 to-primary-500",
      description: "Pharmaceutical sales force training with adaptive AI.", 
      notes: "AI-powered role-play scenarios for effective training.",
      features: [
        { name: "AI Role-play", desc: "Interactive training scenarios" },
        { name: "Performance Analytics", desc: "Track training progress" },
        { name: "Compliance Tracking", desc: "Ensure regulatory compliance" },
        { name: "Interactive Modules", desc: "Engaging learning content" }
      ],
      link: { label: "Explore Med-ADD", url: "#", visible: true }
    },
    { 
      id: "medvi", 
      icon: RiVideoLine, 
      title: "Med-Vi", 
      badge: "LIVE", 
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-primary-500 to-secondary-400",
      description: "Medical education and HCP engagement platform.", 
      notes: "CPD-accredited content with immersive VR experiences.",
      features: [
        { name: "CPD-Accredited", desc: "Earn continuing education credits" },
        { name: "Interactive Cases", desc: "Real-world medical scenarios" },
        { name: "HCP Analytics", desc: "Engagement insights" },
        { name: "VR Simulations", desc: "Immersive training" }
      ],
      link: { label: "Learn More", url: "#", visible: true }
    },
    { 
      id: "medlab", 
      icon: RiMicroscopeLine, 
      title: "Med-Lab", 
      badge: "Coming Soon", 
      badgeColor: "bg-orange-500/10 text-orange-500",
      color: "from-secondary-400 to-primary-500",
      description: "Next-gen laboratory information management system.", 
      notes: "Launching Q3 2025 - Join our early access program.",
      features: [
        { name: "Sample Tracking", desc: "End-to-end sample management" },
        { name: "QC Management", desc: "Quality control workflows" },
        { name: "Reports Dashboard", desc: "Analytics & insights" },
        { name: "LIMS Integration", desc: "Connect with existing systems" }
      ],
      link: { label: "Join Waitlist", url: "#", visible: true }
    },
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
                              {service.services.map((item: any, i: number) => (
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
                  {PRODUCTS_DATA.filter((p: any) => p.visible !== false).map((product: any, i: number) => (
                    <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }} className="p-4 md:p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-3 md:top-4 right-3 md:right-4">
                        <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1 ${product.badgeColor}`}>
                          {product.badge === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                          {product.badge}
                        </span>
                      </div>
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white font-bold text-sm md:text-lg mb-3 md:mb-4`}>
                        <product.icon size={20} />
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-text-light dark:text-text-dark mb-1">{product.title}</h3>
                      <p className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark mb-2 md:mb-3 leading-relaxed">{product.description}</p>
                      {product.notes && (
                        <p className="text-[10px] md:text-xs text-primary-500 italic mb-2 md:mb-3">{product.notes}</p>
                      )}
                      <ul className="space-y-1.5 md:space-y-2">
                        {product.features.map((f: any, fi: number) => (
                          <li key={fi} className="flex items-center gap-2 text-xs md:text-sm text-muted-light dark:text-muted-dark"><RiCheckLine className="text-secondary-500 shrink-0" size={12} /> {f.name}</li>
                        ))}
                      </ul>
                      {product.link?.visible && (
                        <a href={product.link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-[10px] font-bold hover:opacity-90 transition-opacity">
                          {product.link.label} <RiArrowRightLine size={10} />
                        </a>
                      )}
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
// Company Modal - Shows Real Data from API
// ─────────────────────────────────────────────
function CompanyModal({ company, onClose }: { company: any; onClose: () => void }) {
  // Get icon component from iconComponents map
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      RiStarLine, RiPaletteLine, RiVideoLine, RiImageLine, RiGlobalLine,
      RiGraduationCapLine, RiBookReadLine, RiLightbulbFlashLine, RiAwardLine, RiTeamLine,
      RiEyeLine, RiShapesLine, RiHospitalLine, RiUserHeartLine, RiBrainLine,
      RiSettings3Line, RiDatabase2Line, RiFlashlightLine, RiArticleLine,
      RiShieldCheckLine, RiFileTextLine, RiBookOpenLine, RiBriefcaseLine,
      RiMessage2Line, RiBuildingLine, RiMailLine, RiLinkedinBoxLine,
    };
    return iconMap[iconName] || RiStarLine;
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full md:max-w-2xl glass-light dark:glass-dark rounded-3xl border border-border-light dark:border-border-dark shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`h-24 md:h-32 bg-gradient-to-r ${company.color} relative`}>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
            <RiCloseLine size={18} />
          </motion.button>
          <div className="absolute -bottom-4 md:-bottom-6 left-4 md:left-6 w-8 h-6 md:w-10 md:h-7 rounded overflow-hidden shadow-md">
            <ReactCountryFlag countryCode={company.flag} svg style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <div className="p-4 md:p-8 pt-8 md:pt-12">
          {/* Company Header */}
          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
            {company.logo ? (
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-lg overflow-hidden p-2 md:p-3 shrink-0">
                <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className={`w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg shrink-0`}>
                {company.name?.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl md:text-3xl font-bold text-text-light dark:text-text-dark">{company.name}</h3>
              <p className={`text-xs md:text-sm font-semibold uppercase tracking-wider bg-gradient-to-r ${company.color} bg-clip-text text-transparent mb-1`}>{company.tagline}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] md:text-xs font-mono text-muted-light dark:text-muted-dark bg-black/5 dark:bg-white/5 px-2 md:px-3 py-0.5 rounded-full">Est. {company.year}</span>
                <span className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">{company.country}</span>
                {company.isMain && (
                  <span className="text-[10px] md:text-xs bg-primary-500/20 text-primary-500 px-2 py-0.5 rounded-full font-medium">Main Company</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-light dark:text-muted-dark leading-relaxed mb-5 md:mb-6">{company.description}</p>

          {/* Legacy Stats (if no customStats) */}
          {company.stats && (!company.customStats || company.customStats.length === 0) && (
            <div className="mb-5 md:mb-6">
              <h4 className="text-xs md:text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">Overview</h4>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <div className="glass-light dark:glass-dark rounded-xl p-3 border border-border-light dark:border-border-dark">
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">{company.stats.employees || 0}</div>
                  <div className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">Employees</div>
                </div>
                <div className="glass-light dark:glass-dark rounded-xl p-3 border border-border-light dark:border-border-dark">
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">{company.stats.projects || 0}</div>
                  <div className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">Projects</div>
                </div>
                <div className="glass-light dark:glass-dark rounded-xl p-3 border border-border-light dark:border-border-dark">
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">{company.stats.clients || 0}</div>
                  <div className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">Clients</div>
                </div>
              </div>
            </div>
          )}

          {/* Custom Statistics */}
          {company.customStats && company.customStats.length > 0 && (
            <div className="mb-5 md:mb-6">
              <h4 className="text-xs md:text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">Key Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {company.customStats.map((stat: any) => (
                  <div key={stat.id} className="glass-light dark:glass-dark rounded-xl p-3 border border-border-light dark:border-border-dark">
                    <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Focus Areas */}
          {company.focusAreas && company.focusAreas.length > 0 && (
            <div className="mb-5 md:mb-6">
              <h4 className="text-xs md:text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">Focus Areas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {company.focusAreas.map((area: any, idx: number) => {
                  const IconComp = getIconComponent(area.icon);
                  return (
                    <div key={idx} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-border-light dark:border-border-dark">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br ${company.color} flex items-center justify-center shrink-0`}>
                        <IconComp className="text-white" size={16} />
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-semibold text-text-light dark:text-text-dark">{area.label}</div>
                        <div className="text-[10px] md:text-xs text-muted-light dark:text-muted-dark">{area.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gallery */}
          {company.gallery && company.gallery.length > 0 && (
            <div className="mb-5 md:mb-6">
              <h4 className="text-xs md:text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">
                Gallery ({company.gallery.length} {company.gallery.length === 1 ? 'image' : 'images'})
              </h4>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {company.gallery.map((img: any, idx: number) => (
                  <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-white/50 dark:bg-white/5 border border-border-light dark:border-border-dark">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    {(img.title || img.category) && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {img.title && <div className="text-[10px] text-white font-medium truncate">{img.title}</div>}
                        {img.category && <div className="text-[9px] text-white/70">{img.category}</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {company.employees && company.employees.length > 0 && (
            <div className="mb-5 md:mb-6">
              <h4 className="text-xs md:text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">Team ({company.employees.length})</h4>
              <div className="flex flex-wrap gap-2">
                {company.employees.map((emp: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 dark:bg-white/5 border border-border-light dark:border-border-dark">
                    {emp.image ? (
                      <img src={emp.image} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold">
                        {emp.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-medium text-text-light dark:text-text-dark">{emp.name}</div>
                      <div className="text-[10px] text-muted-light dark:text-muted-dark">{emp.position}</div>
                      {emp.department && (
                        <div className="text-[9px] text-primary-500">{emp.department}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media */}
          {company.socialMedia && Object.keys(company.socialMedia).length > 0 && (
            <div className="mb-5 md:mb-6">
              <h4 className="text-xs md:text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">Connect</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  company.socialMedia.linkedin && { key: 'linkedin', href: company.socialMedia.linkedin, icon: RiLinkedinBoxLine, color: 'bg-[#0077b5]/10 border-[#0077b5]/20 text-[#0077b5] hover:bg-[#0077b5]/20' },
                  company.socialMedia.whatsapp && { key: 'whatsapp', href: `https://wa.me/${company.socialMedia.whatsapp}`, icon: RiWhatsappLine, color: 'bg-[#25d366]/10 border-[#25d366]/20 text-[#25d366] hover:bg-[#25d366]/20', isExternal: true },
                  company.socialMedia.email && { key: 'email', href: `mailto:${company.socialMedia.email}`, icon: RiMailLine, color: 'bg-primary-500/10 border-primary-500/20 text-primary-500 hover:bg-primary-500/20' },
                  company.socialMedia.facebook && { key: 'facebook', href: company.socialMedia.facebook, icon: RiFacebookBoxLine, color: 'bg-[#1877f2]/10 border-[#1877f2]/20 text-[#1877f2] hover:bg-[#1877f2]/20' },
                  company.socialMedia.youtube && { key: 'youtube', href: company.socialMedia.youtube, icon: RiYoutubeLine, color: 'bg-[#ff0000]/10 border-[#ff0000]/20 text-[#ff0000] hover:bg-[#ff0000]/20' },
                  company.socialMedia.x && { key: 'x', href: company.socialMedia.x, icon: RiTwitterXLine, color: 'bg-black/10 dark:bg-white/10 border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20' },
                  company.socialMedia.instagram && { key: 'instagram', href: company.socialMedia.instagram, icon: RiInstagramLine, color: 'bg-gradient-to-br from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10 border-[#fd1d1d]/20 text-[#e4405f] hover:from-[#833ab4]/20 hover:via-[#fd1d1d]/20 hover:to-[#fcb045]/20' },
                  company.socialMedia.telegram && { key: 'telegram', href: company.socialMedia.telegram, icon: RiTelegramLine, color: 'bg-[#0088cc]/10 border-[#0088cc]/20 text-[#0088cc] hover:bg-[#0088cc]/20' },
                ].filter(Boolean).map((social: any) => (
                  <a 
                    key={social.key}
                    href={social.href} 
                    target={social.isExternal !== false ? "_blank" : undefined} 
                    rel={social.isExternal !== false ? "noopener noreferrer" : undefined}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all ${social.color}`}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 pt-2 border-t border-border-light dark:border-border-dark">
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

// ─────────────────────────────────────────────
// Dynamic Content Box (Desktop Center-Right Panel)
// ─────────────────────────────────────────────
function DynamicContentBox({
  selectedClient, selectedCompany, selectedCountry,
  showServices, showExpertise, showAccreditations, showTestimonials, showChat, showPeople, showGallery,
  activeTab, setActiveTab, activeTestimonial, setActiveTestimonial,
  setSelectedClient, setSelectedCompany, setSelectedCountry,
  setShowServices, setShowExpertise, setShowAccreditations, setShowTestimonials, setShowChat, setShowPeople, setShowGallery,
  resetDesktopStates
}: any) {
  // Check if any panel is currently shown
  const hasContent = selectedClient || selectedCompany || selectedCountry || showServices || showExpertise || showAccreditations || showTestimonials || showChat || showPeople || showGallery;
  
  return (
    <div className={`flex-1 min-w-[600px] max-w-3xl z-20 h-[70vh] flex flex-col mt-16 -ml-24 ${hasContent ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <AnimatePresence mode="wait">
        {(() => {
          const handleClose = () => {
            resetDesktopStates(); // This will expand orbit back to center
          };
          
          if (selectedClient) return <ClientInfoView key="client" client={selectedClient} onClose={handleClose} />;
          if (selectedCompany) return <CompanyInfoView key="company" company={selectedCompany} onClose={handleClose} />;
          if (selectedCountry) return <CountryInfoView key="country" country={selectedCountry} onClose={handleClose} />;
          if (showServices) return <ServicesInfoView key="services" activeTab={activeTab} setActiveTab={setActiveTab} onClose={handleClose} />;
          if (showExpertise) return <ExpertiseInfoView key="expertise" onClose={handleClose} />;
          if (showAccreditations) return <AccreditationsInfoView key="accreds" onClose={handleClose} />;
          if (showTestimonials) return <TestimonialsInfoView key="reviews" activeTestimonial={activeTestimonial} setActiveTestimonial={setActiveTestimonial} onClose={handleClose} />;
          if (showPeople) return <PeopleBehindView key="people" onClose={handleClose} />;
          if (showChat) return <ChatInfoView key="chat" onClose={handleClose} />;
          if (showGallery) return <GalleryInfoView key="gallery" onClose={handleClose} />;

          return null; // Empty when no panel selected - orbit stays in center
        })()}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// Unified Desktop Views (Dashboard Style)
// ─────────────────────────────────────────────

function BoxWrapper({ children, onClose, title, subtitle, icon: Icon, color = "from-primary-500 to-secondary-500", gradientHeader = false, location, countryFlag = "EG", year = "2015" }: { children: React.ReactNode, onClose?: () => void, title: string, subtitle?: string, icon?: any, color?: string, gradientHeader?: boolean, location?: string, countryFlag?: string, year?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.98 }}
      className="flex-1 flex flex-col glass-light dark:glass-dark rounded-3xl border border-border-light/30 dark:border-border-dark/30 shadow-2xl overflow-hidden backdrop-blur-2xl"
    >
      {gradientHeader ? (
        <div className={`relative bg-gradient-to-r ${color} p-5 overflow-hidden`}>
          {/* World Map Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(1px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              {Icon && (
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl p-2 shrink-0">
                  {typeof Icon === 'string' ? (
                    <Image src={Icon} alt={title} height={48} width={48} className="w-full h-full object-contain" />
                  ) : (
                    <Icon size={32} className="text-primary-500" />
                  )}
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                {subtitle && <p className="text-sm text-white/90 font-medium">{subtitle}</p>}
                {location && (
                  <div className="flex items-center gap-1.5 mt-1 text-white/90 text-xs">
                    <ReactCountryFlag countryCode={countryFlag} svg className="!w-4 !h-3 rounded-sm shadow-sm" />
                    <span>· Est. {year}</span>
                  </div>
                )}
              </div>
            </div>
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-sm"
              >
                <RiCloseLine size={20} />
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-5 border-b border-border-light/20 dark:border-border-dark/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {Icon && (
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg overflow-hidden ${typeof Icon === 'string' ? 'p-2' : ''}`}>
                {typeof Icon === 'string' ? (
                  <Image src={Icon} alt={title} height={40} width={40} className="w-full h-full object-contain" />
                ) : (
                  <Icon size={24} />
                )}
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark">{title}</h3>
              {subtitle && <p className="text-sm text-muted-light dark:text-muted-dark">{subtitle}</p>}
            </div>
          </div>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-surface-light dark:bg-surface-dark flex items-center justify-center text-muted-light dark:text-muted-dark hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <RiCloseLine size={20} />
            </motion.button>
          )}
        </div>
      )}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {children}
      </div>
    </motion.div>
  );
}

function AboutMarvelView({ onClose }: { onClose: () => void }) {
  const timeline = [
    { year: "2013", event: "Founded in Cairo & UAE." },
    { year: "2019", event: "Med-ADD launched in KSA." },
    { year: "2021", event: "50+ Pharma clients reached." },
    { year: "2023", event: "100+ Brands milestone." },
    { year: "2025", event: "AI-driven medical comms era." },
  ];

  return (
    <BoxWrapper
      title="Marvel Group"
      subtitle="Where Medicine Meets Mastery"
      icon="/Logo.png"
      color="from-primary-500 to-secondary-500"
      gradientHeader={true}
      location="Egypt / UAE / KSA - Est. 2013"
      countryFlag="EG"
      year="2013"
      onClose={onClose}
    >
      <div className="space-y-8">
        <p className="text-lg text-text-light dark:text-text-dark leading-relaxed font-medium">
          Marvel Group is the MENA region's most trusted <span className="text-primary-500">med-tech ecosystem</span>, powering healthcare innovation since 2013.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10">
            <div className="text-2xl font-bold text-primary-500">500+</div>
            <div className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider mt-1">Projects Delivered</div>
          </div>
          <div className="p-4 rounded-2xl bg-secondary-500/5 border border-secondary-500/10">
            <div className="text-2xl font-bold text-secondary-500">100+</div>
            <div className="text-xs text-muted-light dark:text-muted-dark uppercase tracking-wider mt-1">Global Brands</div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-muted-light dark:text-muted-dark uppercase tracking-widest mb-4 flex items-center gap-2">
            <RiStackLine size={14} className="text-primary-500" /> Our Evolution
          </h4>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light/50 flex items-center justify-center text-[10px] font-bold text-primary-500 shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  {item.year.slice(2)}
                </div>
                <div className="text-sm text-text-light dark:text-text-dark pt-1.5">{item.event}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-light dark:glass-dark border border-primary-500/20">
          <p className="text-sm italic text-muted-light dark:text-muted-dark leading-relaxed">
            "Our mission is to elevate healthcare communication across MENA — combining clinical expertise and cutting-edge technology."
          </p>
        </div>
      </div>
    </BoxWrapper>
  );
}

function ClientInfoView({ client, onClose }: { client: SegmentedClient, onClose: () => void }) {
  const categoryColors: Record<string, string> = { pharma: "from-primary-500 to-secondary-500", vendor: "from-secondary-500 to-primary-500", society: "from-primary-400 to-secondary-400" };
  const color = categoryColors[client.category] || categoryColors.pharma;

  return (
    <BoxWrapper title={client.name} subtitle={`${client.country} Partner`} onClose={onClose} color={color}>
      <div className="flex items-center gap-6 mb-6 p-4 rounded-2xl bg-white shadow-inner border border-border-light/50">
        <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center overflow-hidden p-2 shrink-0">
          {client.logo ? <Image src={client.logo} alt={client.name} width={80} height={80} className="w-full h-full object-contain" /> : <div className={`w-full h-full rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl font-bold`}>{client.name.slice(0, 2).toUpperCase()}</div>}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ReactCountryFlag countryCode={client.flag} svg className="!w-4 !h-3" />
            <span className="text-sm font-medium text-muted-light dark:text-muted-dark">{client.country}</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-[10px] font-bold uppercase tracking-wider inline-block">{client.category}</div>
        </div>
      </div>

      <h4 className="text-xs font-bold text-muted-light dark:text-muted-dark uppercase tracking-widest mb-4">Strategic Work</h4>
      <div className="grid grid-cols-1 gap-4">
        {[
          { title: "Brand Strategy", desc: "Comprehensive brand positioning and market entry.", year: "2024", type: "Strategy" },
          { title: "Medical Education", desc: "CME-accredited specialist training programs.", year: "2023", type: "Education" },
          { title: "Digital Platform", desc: "Interactive portal for HCP engagement.", year: "2023", type: "Digital" }
        ].map((work, i) => (
          <div key={i} className="group p-4 rounded-2xl bg-surface-light/40 dark:bg-surface-dark/40 border border-border-light/50 dark:border-white/10 hover:border-primary-500/40 transition-all">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-[10px] shrink-0 opacity-80 group-hover:opacity-100`}>
                {work.type.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-primary-500">{work.year}</span>
                  <span className="text-[10px] font-medium text-muted-light dark:text-muted-dark">{work.type}</span>
                </div>
                <h5 className="font-bold text-sm text-text-light dark:text-text-dark">{work.title}</h5>
                <p className="text-xs text-muted-light dark:text-muted-dark mt-1 leading-relaxed">{work.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BoxWrapper>
  );
}

function CompanyInfoView({ company, onClose }: { company: any, onClose: () => void }) {
  // Get icon component from iconComponents map
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      RiStarLine, RiPaletteLine, RiVideoLine, RiImageLine, RiGlobalLine,
      RiGraduationCapLine, RiBookReadLine, RiLightbulbFlashLine, RiAwardLine, RiTeamLine,
      RiEyeLine, RiShapesLine, RiHospitalLine, RiUserHeartLine, RiBrainLine,
      RiSettings3Line, RiDatabase2Line, RiFlashlightLine, RiArticleLine,
      RiShieldCheckLine, RiFileTextLine, RiBookOpenLine, RiBriefcaseLine,
      RiMessage2Line, RiBuildingLine, RiMailLine, RiLinkedinBoxLine,
      RiComputerLine, RiCodeBoxLine, RiStackLine, RiUserSettingsLine,
      RiMicroscopeLine, RiHeartPulseLine, RiHealthBookLine, RiCheckLine,
      RiWhatsappLine, RiFacebookBoxLine, RiYoutubeLine, RiTwitterXLine,
      RiInstagramLine, RiTelegramLine
    };
    return iconMap[iconName] || RiStarLine;
  };

  const locationText = `${company.country} · Est. ${company.year}`;
  return (
    <BoxWrapper
      title={company.name}
      subtitle={company.tagline}
      onClose={onClose}
      color={company.color}
      gradientHeader={true}
      icon={company.logo || company.icon}
      location={locationText}
      countryFlag={company.flag}
      year={company.year}
    >

      <p className="text-sm text-text-light dark:text-text-dark leading-relaxed mb-6">
        {company.description || "Leading the healthcare industry with innovative solutions and medical excellence."}
      </p>

      {/* Focus Areas from API */}
      {company.focusAreas && company.focusAreas.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest">Key Focus Areas</h4>
          <div className="flex gap-3 overflow-x-auto pb-1 custom-scrollbar">
            {company.focusAreas.map((area: any, idx: number) => {
              const IconComp = getIconComponent(area.icon);
              return (
                <motion.div
                  key={area.label || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-col items-center gap-2 p-3 min-w-[85px] rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10 hover:border-primary-500/30 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center group-hover:opacity-90 transition-all shadow-sm`}>
                    <IconComp size={22} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-text-light dark:text-text-dark text-center leading-tight">
                    {area.label}
                  </span>
                  <span className="text-[9px] text-muted-light dark:text-muted-dark text-center leading-tight">
                    {area.description}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Gallery from API */}
      {company.gallery && company.gallery.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest flex items-center gap-2">
              <RiImageLine size={14} /> Work Gallery
              <span className="px-1.5 py-0.5 rounded-full bg-primary-500/10 text-primary-500 text-[10px] font-bold">{company.gallery.length}</span>
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {company.gallery.slice(0, 4).map((img: any, idx: number) => (
              <motion.div
                key={img.src || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
              >
                <img 
                  src={img.src} 
                  alt={img.title || 'Gallery image'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[8px] font-bold text-white uppercase tracking-wider">
                    {img.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <h5 className="text-white font-bold text-[11px] leading-tight line-clamp-2 drop-shadow-lg">
                    {img.title}
                  </h5>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Statistics */}
      {company.customStats && company.customStats.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <RiBarChartBoxLine size={14} /> Key Statistics
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {company.customStats.map((stat: any, idx: number) => (
              <motion.div 
                key={stat.id} 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="relative flex-1 min-w-[calc(25%-0.75rem)] p-3 rounded-2xl bg-gradient-to-br from-surface-light to-surface-light/50 dark:from-surface-dark dark:to-surface-dark/50 border border-border-light/50 dark:border-white/10 overflow-hidden group hover:border-primary-500/30 transition-all text-center"
              >
                <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-bl-full" />
                <div className="relative">
                  <div className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent leading-tight">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-[10px] text-muted-light dark:text-muted-dark mt-0.5 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members */}
      {company.employees && company.employees.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <RiTeamLine size={14} /> Team
            <span className="px-1.5 py-0.5 rounded-full bg-primary-500/10 text-primary-500 text-[10px] font-bold">{company.employees.length}</span>
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {company.employees.map((emp: any, idx: number) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex-shrink-0 w-28 flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-surface-light to-surface-light/50 dark:from-surface-dark dark:to-surface-dark/50 border border-border-light/50 dark:border-white/10 hover:border-primary-500/30 hover:shadow-lg transition-all group"
              >
                {emp.image ? (
                  <img src={emp.image} alt={emp.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary-500/20 group-hover:ring-primary-500/50 transition-all shadow-md" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary-500/20">
                    {emp.name.charAt(0)}
                  </div>
                )}
                <div className="text-center mt-2 w-full">
                  <div className="text-[11px] font-bold text-text-light dark:text-text-dark leading-tight truncate">{emp.name}</div>
                  <div className="text-[9px] text-muted-light dark:text-muted-dark truncate">{emp.position}</div>
                  {emp.department && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded-md bg-primary-500/10 text-primary-500 text-[8px] font-bold truncate max-w-full">
                      {emp.department}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Social Media */}
      {company.socialMedia && Object.keys(company.socialMedia).length > 0 && (
        <div className="mt-6">
          <h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <RiShareLine size={14} /> Connect
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {[
              company.socialMedia.linkedin && { key: 'linkedin', label: 'LinkedIn', href: company.socialMedia.linkedin, icon: RiLinkedinBoxLine, color: '#0077b5', bg: 'bg-[#0077b5]/10 border-[#0077b5]/20 hover:bg-[#0077b5] hover:text-white' },
              company.socialMedia.whatsapp && { key: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${company.socialMedia.whatsapp}`, icon: RiWhatsappLine, color: '#25d366', bg: 'bg-[#25d366]/10 border-[#25d366]/20 hover:bg-[#25d366] hover:text-white', isExternal: true },
              company.socialMedia.email && { key: 'email', label: 'Email', href: `mailto:${company.socialMedia.email}`, icon: RiMailLine, color: '#127a86', bg: 'bg-primary-500/10 border-primary-500/20 hover:bg-primary-500 hover:text-white' },
              company.socialMedia.facebook && { key: 'facebook', label: 'Facebook', href: company.socialMedia.facebook, icon: RiFacebookBoxLine, color: '#1877f2', bg: 'bg-[#1877f2]/10 border-[#1877f2]/20 hover:bg-[#1877f2] hover:text-white' },
              company.socialMedia.youtube && { key: 'youtube', label: 'YouTube', href: company.socialMedia.youtube, icon: RiYoutubeLine, color: '#ff0000', bg: 'bg-[#ff0000]/10 border-[#ff0000]/20 hover:bg-[#ff0000] hover:text-white' },
              company.socialMedia.x && { key: 'x', label: 'X', href: company.socialMedia.x, icon: RiTwitterXLine, color: '#000000', bg: 'bg-black/10 dark:bg-white/10 border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black' },
              company.socialMedia.instagram && { key: 'instagram', label: 'Instagram', href: company.socialMedia.instagram, icon: RiInstagramLine, color: '#e4405f', bg: 'bg-[#e4405f]/10 border-[#e4405f]/20 hover:bg-[#e4405f] hover:text-white' },
              company.socialMedia.telegram && { key: 'telegram', label: 'Telegram', href: company.socialMedia.telegram, icon: RiTelegramLine, color: '#0088cc', bg: 'bg-[#0088cc]/10 border-[#0088cc]/20 hover:bg-[#0088cc] hover:text-white' },
            ].filter(Boolean).map((social: any) => (
              <a 
                key={social.key}
                href={social.href} 
                target={social.isExternal !== false ? "_blank" : undefined} 
                rel={social.isExternal !== false ? "noopener noreferrer" : undefined}
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${social.bg}`}
              >
                <social.icon size={16} style={{ color: social.color }} />
                <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: social.color }}>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link href="/contact" className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-gradient-to-r ${company.color} text-white text-sm font-bold shadow-lg`}>
          Partner with {company.name} <RiArrowRightLine size={16} />
        </Link>
      </div>
    </BoxWrapper>
  );
}

function CountryInfoView({ country, onClose }: { country: any, onClose: () => void }) {
  return (
    <BoxWrapper title={country.name} subtitle={`Regional Hub: ${country.city}`} onClose={onClose} icon={RiGlobalLine}>
      <div className="relative h-40 rounded-2xl overflow-hidden mb-6 group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-16 rounded-xl overflow-hidden shadow-2xl border-4 border-white/50">
            <ReactCountryFlag countryCode={country.flag} svg style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>

      <h4 className="text-sm font-bold text-text-light dark:text-text-dark mb-3">About our presence</h4>
      <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-6">
        {country.description}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {Object.entries(country.stats).map(([label, val]: any) => (
          <div key={label} className="text-center p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10">
            <div className="text-lg font-bold text-primary-500">{val}</div>
            <div className="text-[9px] text-muted-light dark:text-muted-dark uppercase font-bold tracking-tighter">{label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-muted-light dark:text-muted-dark uppercase tracking-widest">Active Entities</h4>
        <div className="flex flex-wrap gap-2">
          {country.companies.map((c: string) => (
            <span key={c} className="px-3 py-1.5 rounded-lg bg-primary-500/5 border border-border-light/50 dark:border-white/10 text-xs font-medium text-text-light dark:text-text-dark">{c}</span>
          ))}
        </div>
      </div>
    </BoxWrapper>
  );
}

function ServicesInfoView({ activeTab, setActiveTab, onClose }: { activeTab: "comprehensive" | "featured" | "products", setActiveTab: (t: any) => void, onClose: () => void }) {
  const [selectedService, setSelectedService] = useState("cme");

  useEffect(() => {
    if (activeTab === "comprehensive") setSelectedService("cme");
    else if (activeTab === "featured") setSelectedService("accreditation");
  }, [activeTab]);

  // Icon mapping from SERVICES_DATA icon strings to actual components
  const iconMap: Record<string, any> = {
    RiGraduationCapLine,
    RiFileTextLine,
    RiComputerLine,
    RiPaletteLine,
    RiUserSettingsLine,
    RiCodeBoxLine,
    RiVideoLine,
    RiCalendarEventLine,
  };

  // Convert SERVICES_DATA to component-compatible format
  const comprehensiveServices = SERVICES_DATA
    .filter((s: any) => s.visible)
    .map((s: any) => ({
      id: s.id,
      icon: iconMap[s.icon] || RiCheckLine,
      title: s.title,
      services: s.services,
    }));

  const featuredServices = [
    { id: "accreditation", icon: RiStarLine, title: "Accreditation", badge: "Certified", color: "from-primary-500 to-secondary-400", description: "Comprehensive accreditation programs recognized worldwide", features: [{ name: "CPD-UK", desc: "UK Continuous Professional Development" }, { name: "DHA Approved", desc: "Dubai Health Authority accredited" }, { name: "SCFHS Certified", desc: "Saudi Commission for Health Specialties" }, { name: "RCSEd Endorsed", desc: "Royal College of Surgeons of Edinburgh" }, { name: "CME Credits", desc: "Continuing Medical Education credits" }, { name: "Global Recognition", desc: "Internationally accepted certificates" }] },
    { id: "standalone", icon: RiStackLine, title: "Standalone", badge: "Flexible", color: "from-secondary-400 to-primary-500", description: "Flexible solutions that integrate seamlessly", features: [{ name: "Modular Design", desc: "Pick and choose what you need" }, { name: "Easy Integration", desc: "Works with existing workflows" }, { name: "Scalable", desc: "Grows with your organization" }, { name: "Customizable", desc: "Tailored to your requirements" }, { name: "Quick Deployment", desc: "Fast implementation timeline" }, { name: "Cost Effective", desc: "Pay for what you use" }] },
    { id: "digital", icon: RiComputerLine, title: "Digital", badge: "Innovative", color: "from-primary-500 to-secondary-400", description: "Cutting-edge AI-driven platforms", features: [{ name: "AI Integration", desc: "Machine learning powered tools" }, { name: "Automation", desc: "Streamlined workflows" }, { name: "Analytics Dashboard", desc: "Real-time data insights" }, { name: "Cloud Based", desc: "Secure cloud infrastructure" }, { name: "Mobile Ready", desc: "Works on all devices" }, { name: "API Access", desc: "Connect with other systems" }] },
  ];

  // ─── CONFIGURABLE PRODUCTS ───
  // Similar to featuredServices with link button and notes support
  const PRODUCTS_DATA = [
    { 
      id: "tebzone", 
      icon: RiStackLine, 
      title: "TebZone", 
      badge: "LIVE", 
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-primary-500 to-secondary-400",
      description: "Healthcare marketplace connecting patients and suppliers.", 
      notes: "Seamless ordering experience with real-time inventory tracking.",
      features: [
        { name: "Medicine Marketplace", desc: "Wide range of healthcare products" },
        { name: "Prescription Upload", desc: "Easy prescription management" },
        { name: "Real-time Tracking", desc: "Track orders live" },
        { name: "Secure Payments", desc: "Encrypted transactions" }
      ],
      link: { label: "Visit TebZone", url: "https://tebzone.com", visible: true }
    },
    { 
      id: "medadd", 
      icon: RiComputerLine, 
      title: "Med-ADD", 
      badge: "LIVE", 
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-secondary-400 to-primary-500",
      description: "Pharmaceutical sales force training with adaptive AI.", 
      notes: "AI-powered role-play scenarios for effective training.",
      features: [
        { name: "AI Role-play", desc: "Interactive training scenarios" },
        { name: "Performance Analytics", desc: "Track training progress" },
        { name: "Compliance Tracking", desc: "Ensure regulatory compliance" },
        { name: "Interactive Modules", desc: "Engaging learning content" }
      ],
      link: { label: "Explore Med-ADD", url: "#", visible: true }
    },
    { 
      id: "medvi", 
      icon: RiVideoLine, 
      title: "Med-Vi", 
      badge: "LIVE", 
      badgeColor: "bg-green-500/10 text-green-500",
      color: "from-primary-500 to-secondary-400",
      description: "Medical education and HCP engagement platform.", 
      notes: "CPD-accredited content with immersive VR experiences.",
      features: [
        { name: "CPD-Accredited", desc: "Earn continuing education credits" },
        { name: "Interactive Cases", desc: "Real-world medical scenarios" },
        { name: "HCP Analytics", desc: "Engagement insights" },
        { name: "VR Simulations", desc: "Immersive training" }
      ],
      link: { label: "Learn More", url: "#", visible: true }
    },
    { 
      id: "medlab", 
      icon: RiMicroscopeLine, 
      title: "Med-Lab", 
      badge: "Coming Soon", 
      badgeColor: "bg-orange-500/10 text-orange-500",
      color: "from-secondary-400 to-primary-500",
      description: "Next-gen laboratory information management system.", 
      notes: "Launching Q3 2025 - Join our early access program.",
      features: [
        { name: "Sample Tracking", desc: "End-to-end sample management" },
        { name: "QC Management", desc: "Quality control workflows" },
        { name: "Reports Dashboard", desc: "Analytics & insights" },
        { name: "LIMS Integration", desc: "Connect with existing systems" }
      ],
      link: { label: "Join Waitlist", url: "#", visible: true }
    },
  ];

  const tabs = [
    { id: "comprehensive", label: "Services", icon: RiServiceLine },
    { id: "featured", label: "Featured", icon: RiStarLine },
    { id: "products", label: "Products", icon: RiStackLine },
  ];

  return (
    <BoxWrapper title="Services & Products" subtitle="Expert Solutions" onClose={onClose} icon={RiSettings4Line}>
      <div className="flex gap-2 mb-6 p-1 bg-surface-light/80 dark:bg-surface-dark/40 rounded-2xl border border-border-light/50 dark:border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg" : "text-muted-light dark:text-muted-dark hover:bg-primary-500/5"}`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === "comprehensive" && (
            <motion.div key="comprehensive" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
              <div className="grid grid-cols-4 gap-2">
                {comprehensiveServices.map((service) => (
                  <button key={service.id} onClick={() => setSelectedService(service.id)} className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${selectedService === service.id ? "bg-primary-500/10 border border-primary-500/20" : "bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10 hover:border-primary-500/10"}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedService === service.id ? "bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md" : "bg-black/5 dark:bg-white/5 text-muted-light dark:text-muted-dark"}`}><service.icon size={18} /></div>
                    <span className={`text-[10px] font-bold ${selectedService === service.id ? "text-primary-500" : "text-text-light dark:text-text-dark"}`}>{service.title}</span>
                  </button>
                ))}
              </div>

              {(() => {
                const service = comprehensiveServices.find(s => s.id === selectedService);
                if (!service) return null;
                return (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-primary-500/5 border border-primary-500/10">
                    {service.services.map((item: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/50 dark:border-white/5">
                        <RiCheckLine className="text-primary-500 shrink-0 mt-0.5" size={14} />
                        <div><h5 className="font-bold text-xs text-text-light dark:text-text-dark">{item.name}</h5><p className="text-[10px] text-muted-light dark:text-muted-dark mt-0.5 leading-relaxed">{item.desc}</p></div>
                      </div>
                    ))}
                  </motion.div>
                );
              })()}
            </motion.div>
          )}

          {activeTab === "featured" && (
            <motion.div key="featured" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              {featuredServices.map((service, i) => (
                <div key={service.id} className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10 hover:border-secondary-500/30 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg`}><service.icon size={22} /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-text-light dark:text-text-dark">{service.title}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-500/10 text-secondary-500 text-[9px] font-bold uppercase tracking-wider">{service.badge}</span>
                      </div>
                      <p className="text-xs text-muted-light dark:text-muted-dark mt-0.5">{service.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 p-2 rounded-lg bg-black/5 dark:bg-white/5">
                        <RiStarFill className="text-secondary-500 shrink-0" size={10} />
                        <span className="text-[10px] font-medium text-text-light dark:text-text-dark">{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div key="products" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              {PRODUCTS_DATA.filter((p: any) => p.visible !== false).map((p: any, idx: number) => (
                <motion.div 
                  key={p.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10 hover:border-primary-500/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <p.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-text-light dark:text-text-dark">{p.title}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${p.badgeColor}`}>{p.badge}</span>
                      </div>
                      <p className="text-[11px] text-muted-light dark:text-muted-dark mb-2">{p.description}</p>
                      {p.notes && (
                        <p className="text-[10px] text-primary-500 italic mb-2">{p.notes}</p>
                      )}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {p.features.map((f: any, k: number) => (
                          <div key={k} className="flex items-center gap-2 p-1.5 rounded-lg bg-black/5 dark:bg-white/5">
                            <RiCheckLine className="text-primary-500 shrink-0" size={10} />
                            <span className="text-[9px] font-medium text-text-light dark:text-text-dark truncate">{f.name}</span>
                          </div>
                        ))}
                      </div>
                      {p.link?.visible && (
                        <a 
                          href={p.link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-[10px] font-bold hover:opacity-90 transition-opacity"
                        >
                          {p.link.label} <RiArrowRightLine size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BoxWrapper>
  );
}

function ExpertiseInfoView({ onClose }: { onClose: () => void }) {
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
    <BoxWrapper title="Medical Expertise" subtitle="Therapeutic Mastery" onClose={onClose} icon={RiHeartPulseLine}>
      <div className="grid grid-cols-2 gap-4">
        {therapeuticAreas.map((area, i) => (
          <motion.div key={area.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="group p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10 hover:border-primary-500/30 transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-3 text-white shadow-lg`}>
              <area.icon size={20} />
            </div>
            <h4 className="font-bold text-sm text-text-light dark:text-text-dark mb-1">{area.name}</h4>
            <p className="text-[10px] text-muted-light dark:text-muted-dark leading-relaxed">{area.desc}</p>
          </motion.div>
        ))}
      </div>
    </BoxWrapper>
  );
}

function AccreditationsInfoView({ onClose }: { onClose: () => void }) {
  const accreditations = [
    { shortName: "CPD-UK", fullName: "Continuous Professional Development", country: "United Kingdom", logo: null, color: "from-primary-500 to-primary-600", description: "World-recognized standard for professional learning and development." },
    { shortName: "SCFHS", fullName: "Saudi Commission for Health Specialties", country: "Saudi Arabia", logo: null, color: "from-green-500 to-green-600", description: "Official healthcare regulatory authority in the Kingdom of Saudi Arabia." },
    { shortName: "RCSEd", fullName: "Royal College of Surgeons of Edinburgh", country: "United Kingdom", logo: null, color: "from-blue-600 to-blue-700", description: "One of the oldest and most prestigious medical organizations globally." },
    { shortName: "DHA", fullName: "Dubai Health Authority", country: "UAE", logo: null, color: "from-secondary-500 to-secondary-600", description: "Regulating the healthcare sector in the Emirate of Dubai." },
  ];

  return (
    <BoxWrapper title="Global Recognition" subtitle="Our Accreditations" onClose={onClose} icon={RiAwardLine}>
      <div className="space-y-4">
        {accreditations.map((acc, i) => (
          <motion.div key={acc.shortName} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-5 p-5 rounded-3xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10 hover:border-primary-500/30 transition-all">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${acc.color} flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shrink-0`}>
              {acc.shortName.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-base text-text-light dark:text-text-dark">{acc.shortName}</h4>
                <span className="text-[10px] font-medium text-muted-light dark:text-muted-dark px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded-full">{acc.country}</span>
              </div>
              <p className="text-xs font-medium text-primary-500 mb-2">{acc.fullName}</p>
              <p className="text-[11px] text-muted-light dark:text-muted-dark leading-relaxed">{acc.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </BoxWrapper>
  );
}

function TestimonialsInfoView({ activeTestimonial, setActiveTestimonial, onClose }: { activeTestimonial: number, setActiveTestimonial: (i: number) => void, onClose: () => void }) {
  const testimonials = [
    { name: "Dr. Sarah Johnson", role: "Medical Director", company: "Global Pharma Corp", image: "https://i.pravatar.cc/150?u=sarah", text: "Marvel Group has been instrumental in our medical education strategy. Their attention to clinical detail and creative delivery is unmatched in the MENA region.", rating: 5 },
    { name: "Ahmed Mansour", role: "Marketing Lead", company: "BioHealth Solutions", image: "https://i.pravatar.cc/150?u=ahmed", text: "The TebZone platform revolutionized how we connect with patients and providers. Their technical expertise is truly cutting-edge.", rating: 5 },
    { name: "Prof. Elena Rossi", role: "Scientific Advisory Board", company: "Medical Society of Europe", image: "https://i.pravatar.cc/150?u=elena", text: "Working with Marvel on our CME programs ensured high engagement and perfect accreditation compliance. A true partner in education.", rating: 5 },
  ];
  const t = testimonials[activeTestimonial] || testimonials[0];

  return (
    <BoxWrapper title="Success Stories" subtitle="What Partners Say" onClose={onClose} icon={RiTeamLine}>
      <div className="flex flex-col h-full min-h-[450px]">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full" />
              <div className="relative w-full h-full rounded-full border-4 border-white dark:border-surface-dark shadow-2xl overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <RiDoubleQuotesL className="text-primary-500/20 mx-auto mb-4" size={40} />

            <p className="text-base md:text-lg text-text-light dark:text-text-dark italic leading-relaxed mb-6 max-w-lg">
              "{t.text}"
            </p>

            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <RiStarFill key={i} className="text-secondary-500" size={16} />)}
            </div>

            <h4 className="font-bold text-lg text-text-light dark:text-text-dark">{t.name}</h4>
            <p className="text-sm text-primary-500 font-medium">{t.role} · {t.company}</p>
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="pt-8 pb-4 flex items-center justify-center gap-8">
          <button
            onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10 flex items-center justify-center text-muted-light dark:text-muted-dark hover:bg-primary-500/10 hover:text-primary-500 transition-all shadow-sm"
          >
            <RiArrowLeftLine size={20} />
          </button>

          <div className="flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-500 ${activeTestimonial === i ? "w-10 bg-gradient-to-r from-primary-500 to-secondary-500 shadow-glow-primary" : "w-3 bg-muted-light dark:bg-muted-dark hover:bg-primary-500/30"}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
            className="w-10 h-10 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light/50 dark:border-white/10 flex items-center justify-center text-muted-light dark:text-muted-dark hover:bg-primary-500/10 hover:text-primary-500 transition-all shadow-sm"
          >
            <RiArrowRightLine size={20} />
          </button>
        </div>
      </div>
    </BoxWrapper>
  );
}

function PeopleBehindView({ onClose }: { onClose: () => void }) {
  const categories = ["Medical", "Administrative", "IT", "Creative"];
  const [activeCat, setActiveCat] = useState("Medical");

  const team = [
    { name: "Dr. Sarah Ahmed", role: "Medical Director", cat: "Medical", img: "https://i.pravatar.cc/150?u=sarah1" },
    { name: "Dr. Khaled Omar", role: "Clinical Consultant", cat: "Medical", img: "https://i.pravatar.cc/150?u=khaled" },
    { name: "Eng. Youssef Ali", role: "Tech Lead", cat: "IT", img: "https://i.pravatar.cc/150?u=youssef" },
    { name: "Nour El-Din", role: "Creative Director", cat: "Creative", img: "https://i.pravatar.cc/150?u=nour" },
    { name: "Mai Mahmoud", role: "Operations Manager", cat: "Administrative", img: "https://i.pravatar.cc/150?u=mai" },
    { name: "Dr. Laila Hassan", role: "Medical Content Specialist", cat: "Medical", img: "https://i.pravatar.cc/150?u=laila" },
    { name: "Ziad Tarek", role: "Systems Admin", cat: "IT", img: "https://i.pravatar.cc/150?u=ziad" },
  ];

  const filteredTeam = team.filter(p => p.cat === activeCat);

  return (
    <BoxWrapper title="The Force Behind" subtitle="Our Talented Team" onClose={onClose} icon={RiGroupLine}>
      <div className="flex flex-col h-full">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-8  pb-2 custom-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeCat === cat
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                : "bg-surface-light/80 dark:bg-surface-dark/80 text-text-light/70 dark:text-text-dark/70 border border-border-light/50 dark:border-white/10 hover:bg-primary-500/10 hover:text-primary-500 transition-all"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredTeam.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ delay: i * 0.05 }}
                className="group p-4 rounded-2xl bg-surface-light/40 dark:bg-surface-dark/40 border border-border-light/50 dark:border-white/10 hover:border-primary-500/30 transition-all text-center"
              >
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-full h-full rounded-full border-2 border-primary-500/20 group-hover:border-primary-500 transition-all overflow-hidden">
                    <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                </div>
                <h5 className="font-bold text-[13px] text-text-light dark:text-text-dark leading-tight">{person.name}</h5>
                <p className="text-[9px] text-primary-500 font-bold uppercase tracking-wider mt-1">{person.role}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </BoxWrapper>
  );
}

// ─────────────────────────────────────────────
// Gallery Images Data
// ─────────────────────────────────────────────
const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", title: "Medical Conference 2024", category: "Events" },
  { id: 2, src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80", title: "Healthcare Innovation", category: "Projects" },
  { id: 3, src: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80", title: "Pharma Partnership", category: "Partnerships" },
  { id: 4, src: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80", title: "Medical Research", category: "Research" },
  { id: 5, src: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80", title: "Team Workshop", category: "Team" },
  { id: 6, src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", title: "Product Launch", category: "Events" },
    { id: 7, src: "https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800&q=80", title: "Lab Research", category: "Research" },
    { id: 8, src: "https://images.unsplash.com/photo-1578496480157-3d14f496689b?w=800&q=80", title: "Medical Society", category: "Partnerships" },
];

// ─────────────────────────────────────────────
// Gallery Info View — Desktop Dynamic Box
// ─────────────────────────────────────────────
function GalleryInfoView({ onClose }: { onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <BoxWrapper title="Work Gallery" subtitle="Our Projects & Events" onClose={onClose} icon={RiImageLine}>
      <div className="flex flex-col h-[450px]">
        {/* Main Image */}
        <div className="flex-1 relative flex items-center justify-center bg-surface-light/50 dark:bg-surface-dark/50 rounded-2xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIdx}
              src={galleryImages[currentIdx].src}
              alt={galleryImages[currentIdx].title}
              custom={direction}
              initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 z-10 w-8 h-8 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all border border-border-light/50 dark:border-white/10"
          >
            <RiArrowLeftSLine size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 z-10 w-8 h-8 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all border border-border-light/50 dark:border-white/10"
          >
            <RiArrowRightSLine size={20} />
          </button>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h4 className="text-white font-bold">{galleryImages[currentIdx].title}</h4>
            <span className="text-primary-300 text-xs">{galleryImages[currentIdx].category}</span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2 px-1">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => {
                setDirection(idx > currentIdx ? 1 : -1);
                setCurrentIdx(idx);
              }}
              className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all ${
                idx === currentIdx
                  ? "ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-surface-dark"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="mt-2 text-center text-xs text-muted-light dark:text-muted-dark">
          {currentIdx + 1} / {galleryImages.length}
        </div>
      </div>
    </BoxWrapper>
  );
}

function ChatInfoView({ onClose }: { onClose: () => void }) {
  return (
    <BoxWrapper title="AI Support" subtitle="Always Online" onClose={onClose} icon={RiMessage3Line}>
      <div className="h-[450px]">
        <ChatWidget inline={true} />
      </div>
    </BoxWrapper>
  );
}

// ─────────────────────────────────────────────
// Gallery Modal — Image Carousel (Mobile)
// ─────────────────────────────────────────────

function GalleryModal({ currentIndex, setCurrentIndex, onClose }: { 
  currentIndex: number; 
  setCurrentIndex: (idx: number) => void; 
  onClose: () => void; 
}) {
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((currentIndex + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <BoxWrapper title="Work Gallery" subtitle="Our Projects & Events" onClose={onClose} icon={RiImageLine}>
        <div className="flex flex-col h-[500px]">
          {/* Main Image Display */}
          <div className="flex-1 relative flex items-center justify-center bg-surface-light/50 dark:bg-surface-dark/50 rounded-2xl overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].title}
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 z-10 w-10 h-10 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all border border-border-light/50 dark:border-white/10"
            >
              <RiArrowLeftSLine size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 z-10 w-10 h-10 rounded-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all border border-border-light/50 dark:border-white/10"
            >
              <RiArrowRightSLine size={24} />
            </button>

            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h4 className="text-white font-bold text-lg">{galleryImages[currentIndex].title}</h4>
              <span className="text-primary-300 text-sm">{galleryImages[currentIndex].category}</span>
            </div>
          </div>

          {/* Thumbnails Strip */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 px-1">
            {galleryImages.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all ${
                  idx === currentIndex 
                    ? "ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-surface-dark" 
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="mt-3 text-center text-sm text-muted-light dark:text-muted-dark">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>
      </BoxWrapper>
    </ModalBackdrop>
  );
}
