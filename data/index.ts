import { Company, Branch, Accreditation, TherapeuticArea, Product, Testimonial, SegmentedClients } from "@/types";



export const branches: Branch[] = [
  {
    country: "Egypt",
    city: "Cairo",
    flag: "EG",
    companyName: "Marvel",
    address: "New Cairo, Cairo Governorate",
    established: "2015",
    phone: "+20 100 000 0000",
  },
  {
    country: "Saudi Arabia",
    city: "Riyadh",
    flag: "SA",
    companyName: "Med-Add",
    address: "King Fahd Road, Riyadh",
    established: "2019",
    phone: "+966 50 000 0000",
  },
  {
    country: "UAE",
    city: "Dubai",
    flag: "AE",
    companyName: "Bait Al Ebdaa",
    address: "Business Bay, Dubai",
    established: "2015",
    phone: "+971 50 000 0000",
  },
];

export const accreditations: Accreditation[] = [
  {
    name: "Continuing Professional Development — UK",
    shortName: "CPD-UK",
    country: "United Kingdom",
    flag: "🇬🇧",
    description: "Internationally recognized accreditation for continuing professional development programs, ensuring the highest standards of educational excellence in medical training.",
    color: "from-primary-500 to-secondary-400",
  },
  {
    name: "Dubai Health Authority",
    shortName: "DHA",
    country: "UAE",
    flag: "🇦🇪",
    description: "Official recognition from the Dubai Health Authority, validating our medical education programs for healthcare professionals in the UAE.",
    color: "from-primary-500 to-secondary-400",
  },
  {
    name: "Saudi Commission for Health Specialties",
    shortName: "SCFHS",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    description: "Accredited by SCFHS, enabling healthcare professionals in Saudi Arabia to earn CME credits through our certified programs.",
    color: "from-primary-500 to-secondary-400",
  },
  {
    name: "Royal College of Surgeons of Edinburgh",
    shortName: "RCSEd",
    country: "United Kingdom",
    flag: "🇬🇧",
    description: "Partnership with one of the world's oldest surgical colleges, ensuring surgical education meets the highest global standards.",
    color: "from-primary-500 to-secondary-400",
  },
];

export const therapeuticAreas: TherapeuticArea[] = [
  { name: "Diabetes & Endocrinology", icon: "🩺", color: "text-primary-400" },
  { name: "Orthopedics", icon: "🦴", color: "text-secondary-400" },
  { name: "Internal Medicine", icon: "🫀", color: "text-primary-500" },
  { name: "Cardiology", icon: "❤️", color: "text-secondary-500" },
  { name: "Oncology", icon: "🔬", color: "text-primary-400" },
  { name: "Neurology", icon: "🧠", color: "text-secondary-400" },
  { name: "Dermatology", icon: "✨", color: "text-primary-500" },
  { name: "Ophthalmology", icon: "👁️", color: "text-secondary-500" },
  { name: "Pulmonology", icon: "🫁", color: "text-primary-400" },
  { name: "Gastroenterology", icon: "💊", color: "text-secondary-400" },
  { name: "Rheumatology", icon: "🦾", color: "text-primary-500" },
  { name: "Women's Health", icon: "🌸", color: "text-secondary-500" },
];

export const products: Product[] = [
  {
    name: "AREEP",
    tagline: "AI-Powered Medical Rep Training",
    description: "Revolutionize pharmaceutical sales force training with adaptive AI simulations, real-world scenario modeling, and performance analytics that drive measurable results.",
    features: ["AI Role-play Simulations", "Performance Analytics", "Compliance Tracking", "Multi-language Support"],
    color: "from-primary-500 to-secondary-400",
    status: "live",
  },
  {
    name: "MAHER",
    tagline: "Medical Assessment & HCP Engagement",
    description: "A comprehensive platform for medical education, HCP engagement, and knowledge assessment with CPD-accredited modules and interactive case studies.",
    features: ["CPD-Accredited Modules", "Interactive Cases", "HCP Analytics", "Certificate Generation"],
    color: "from-primary-500 to-secondary-400",
    status: "live",
  },
  {
    name: "DynaSync",
    tagline: "Dynamic Content Management",
    description: "Intelligent omni-channel content management system for pharma brands, enabling personalized HCP engagement across digital and physical touchpoints.",
    features: ["Omni-channel CMS", "Personalization Engine", "Regulatory Compliance", "Real-time Analytics"],
    color: "from-primary-500 to-secondary-400",
    status: "beta",
  },
  {
    name: "WaselMail",
    tagline: "Healthcare Communication Platform",
    description: "Specialized email and communication platform built exclusively for healthcare communications with medical-grade compliance, automation, and HCP segmentation.",
    features: ["Healthcare Compliance", "Smart Segmentation", "Automation Flows", "Delivery Analytics"],
    color: "from-primary-500 to-secondary-400",
    status: "live",
  },
];

export const testimonials: Testimonial[] = [
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

export const projectCategories = [
  { id: "all", label: "All Work" },
  { id: "medical", label: "Medical" },
  { id: "video", label: "Videos" },
  { id: "social", label: "Social Media" },
  { id: "artwork", label: "Artwork & Concepts" },
  { id: "elearning", label: "eLearning & SCORM" },
  { id: "activities", label: "Online Activities" },
  { id: "ai", label: "AI & Automation" },
];

export const stats = [
  { value: 100, suffix: "+", label: "Pharma Clients" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Countries" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ============================================================================
// NEW SECTIONS DATA
// ============================================================================

// 1. IN NUMBERS - Big Statistics
export const bigNumbers = [
  { value: 60, suffix: "k+", label: "Candidates & Trainees", color: "from-primary-500 to-secondary-400" },
  { value: 1, suffix: "k+", label: "Employees", color: "from-primary-500 to-secondary-400" },
  { value: 150, suffix: "+", label: "Projects Delivered", color: "from-primary-500 to-secondary-400" },
  { value: 90, suffix: "+", label: "Advisory Boards", color: "from-primary-500 to-secondary-400" },
  { value: 12, suffix: "+", label: "Years Experience", color: "from-primary-500 to-secondary-400" },
  { value: 30, suffix: "+", label: "Active Clients", color: "from-primary-500 to-secondary-400" },
];

// 2. DETAILED SERVICES BREAKDOWN
export const detailedServices = [
  {
    id: "cme",
    name: "CME",
    icon: "RiGraduationCapLine",
    color: "from-primary-500 to-secondary-400",
    subServices: [
      { name: "Curriculum Design", description: "Comprehensive CME program structuring" },
      { name: "Content Development", description: "Medical education content creation" },
      { name: "Slide Decks", description: "Professional presentation materials" },
      { name: "Gamification", description: "Case studies, patient profiles, interactivity" },
      { name: "Speakers", description: "Expert faculty management" },
      { name: "Accreditation", description: "CPD, DHA, SCFHS certificates" },
      { name: "Endorsed Materials", description: "Officially recognized content" },
    ],
  },
  {
    id: "research",
    name: "Research & Writing",
    icon: "RiFileTextLine",
    color: "from-primary-500 to-secondary-400",
    subServices: [
      { name: "Advisory Boards", description: "KOL engagement and management" },
      { name: "Manuscripts", description: "Scientific publication writing" },
      { name: "PMS Protocols", description: "Post-marketing surveillance" },
      { name: "CRF Writing", description: "Case report form design" },
      { name: "Statistics", description: "Data analysis and reporting" },
      { name: "Translation", description: "Medical content localization" },
      { name: "Publishing", description: "Journal submission support" },
    ],
  },
  {
    id: "elearning",
    name: "eLearning",
    icon: "RiLaptopLine",
    color: "from-primary-500 to-secondary-400",
    subServices: [
      { name: "LMS Integration", description: "Learning management systems" },
      { name: "SCORM Packages", description: "Standard compliant modules" },
      { name: "xAPI Packages", description: "Advanced tracking capabilities" },
      { name: "Interactive Modules", description: "Engaging digital content" },
      { name: "Assessments", description: "Quizzes and evaluations" },
      { name: "Certificates", description: "Automated certification" },
    ],
  },
  {
    id: "artwork",
    name: "Artwork & Marketing",
    icon: "RiPaletteLine",
    color: "from-primary-500 to-secondary-400",
    subServices: [
      { name: "Brand Identity", description: "Visual branding systems" },
      { name: "Print Materials", description: "Brochures, leaflets, posters" },
      { name: "Digital Assets", description: "Social media, banners, ads" },
      { name: "3D Medical Illustrations", description: "Anatomical visualizations" },
      { name: "Infographics", description: "Data visualization" },
      { name: "Packaging", description: "Product packaging design" },
    ],
  },
  {
    id: "training",
    name: "Training",
    icon: "RiTeamLine",
    color: "from-primary-500 to-secondary-400",
    subServices: [
      { name: "Workshops", description: "Hands-on training sessions" },
      { name: "Webinars", description: "Virtual educational events" },
      { name: "TOT Programs", description: "Training of trainers" },
      { name: "Rep Training", description: "Medical representative packages" },
      { name: "Role Play", description: "Interactive scenarios" },
      { name: "Certification", description: "Competency validation" },
    ],
  },
  {
    id: "it",
    name: "IT Solutions",
    icon: "RiCodeBoxLine",
    color: "from-primary-500 to-secondary-400",
    subServices: [
      { name: "Web Development", description: "Custom websites and portals" },
      { name: "Mobile Apps", description: "iOS and Android applications" },
      { name: "CRM Systems", description: "Customer relationship management" },
      { name: "Analytics", description: "Data dashboards and insights" },
      { name: "Cloud Solutions", description: "Scalable infrastructure" },
      { name: "API Integration", description: "System connectivity" },
    ],
  },
  {
    id: "visuals",
    name: "Visuals, Videos & VR",
    icon: "RiMovieLine",
    color: "from-primary-500 to-secondary-400",
    subServices: [
      { name: "Video Production", description: "Corporate and medical videos" },
      { name: "Animation", description: "2D/3D medical animations" },
      { name: "VR Training", description: "Immersive simulations" },
      { name: "Motion Graphics", description: "Dynamic visual content" },
      { name: "Live Streaming", description: "Virtual event production" },
      { name: "Interactive Video", description: "Clickable video experiences" },
    ],
  },
  {
    id: "events",
    name: "Event Management",
    icon: "RiCalendarEventLine",
    color: "from-primary-500 to-secondary-400",
    subServices: [
      { name: "Virtual Events", description: "Online conferences and summits" },
      { name: "Hybrid Events", description: "Blended physical-digital events" },
      { name: "Live Polling", description: "Real-time audience engagement" },
      { name: "Registration", description: "Attendee management" },
      { name: "Booth Design", description: "Exhibition stands" },
      { name: "Event Tech", description: "AV and digital solutions" },
    ],
  },
];

// 3. CREATIVE LETTER NAVIGATION
export const creativeLetters = [
  {
    letter: "C",
    category: "CME & Education",
    description: "Continuing Medical Education programs with global accreditation",
    services: [
      { name: "Curriculum Design", icon: "RiDraftLine" },
      { name: "Content Development", icon: "RiFileTextLine" },
      { name: "Accreditation", icon: "RiAwardLine" }
    ],
    color: "from-primary-500 to-secondary-400",
  },
  {
    letter: "R",
    category: "Research & Writing",
    description: "Scientific research support and medical writing services",
    services: [
      { name: "Manuscripts", icon: "RiBookLine" },
      { name: "Advisory Boards", icon: "RiTeamLine" },
      { name: "Publishing", icon: "RiArticleLine" }
    ],
    color: "from-primary-500 to-secondary-400",
  },
  {
    letter: "E",
    category: "eLearning",
    description: "Digital learning solutions for healthcare professionals",
    services: [
      { name: "LMS", icon: "RiLaptopLine" },
      { name: "SCORM", icon: "RiDatabaseLine" },
      { name: "Interactive Modules", icon: "RiRefreshLine" }
    ],
    color: "from-primary-500 to-secondary-400",
  },
  {
    letter: "A",
    category: "Artwork & Marketing",
    description: "Creative medical marketing and visual communication",
    services: [
      { name: "Brand Identity", icon: "RiPaletteLine" },
      { name: "Print & Digital", icon: "RiPrinterLine" },
      { name: "3D Illustrations", icon: "RiBox3Line" }
    ],
    color: "from-primary-500 to-secondary-400",
  },
  {
    letter: "T",
    category: "Training",
    description: "Comprehensive healthcare professional training programs",
    services: [
      { name: "Workshops", icon: "RiPresentationLine" },
      { name: "Webinars", icon: "RiVideoLine" },
      { name: "TOT Programs", icon: "RiUserStarLine" }
    ],
    color: "from-primary-500 to-secondary-400",
  },
  {
    letter: "I",
    category: "IT Solutions",
    description: "Technology infrastructure and digital platforms",
    services: [
      { name: "Web & Mobile", icon: "RiSmartphoneLine" },
      { name: "CRM", icon: "RiCustomerServiceLine" },
      { name: "Analytics", icon: "RiBarChartLine" }
    ],
    color: "from-primary-500 to-secondary-400",
  },
  {
    letter: "V",
    category: "Visuals & Video",
    description: "Multimedia production including VR and interactive content",
    services: [
      { name: "Video Production", icon: "RiMovieLine" },
      { name: "VR Training", icon: "RiGlassesLine" },
      { name: "Animation", icon: "RiBrushLine" }
    ],
    color: "from-primary-500 to-secondary-400",
  },
  {
    letter: "E",
    category: "Event Management",
    description: "End-to-end healthcare event solutions",
    services: [
      { name: "Virtual Events", icon: "RiLiveLine" },
      { name: "Hybrid Events", icon: "RiStackLine" },
      { name: "Live Polling", icon: "RiSurveyLine" }
    ],
    color: "from-primary-500 to-secondary-400",
  },
];

// 4. FEATURED SERVICES (Premium)
export const featuredServices = [
  {
    id: "accreditation",
    name: "Accreditation Services",
    description: "CPD-UK, DHA, SCFHS, and RCSEd accredited programs with seamless certification workflow",
    icon: "RiAwardLine",
    color: "from-primary-500 to-secondary-400",
    badge: "Certified",
  },
  {
    id: "standalone",
    name: "Standalone Services",
    description: "Modular solutions that integrate with existing systems without disruption",
    icon: "RiPuzzleLine",
    color: "from-primary-500 to-secondary-400",
    badge: "Flexible",
  },
  {
    id: "concepts",
    name: "Concepts & DA",
    description: "Detailing aids and creative concepts that drive HCP engagement",
    icon: "RiLightbulbLine",
    color: "from-primary-500 to-secondary-400",
    badge: "Creative",
  },
  {
    id: "pms",
    name: "Post-Marketing Surveillance",
    description: "Comprehensive PMS protocols, CRF design, and safety monitoring",
    icon: "RiShieldCheckLine",
    color: "from-primary-500 to-secondary-400",
    badge: "Compliant",
  },
  {
    id: "digital",
    name: "Digital Solutions",
    description: "AI-driven platforms, chatbots, and automated healthcare workflows",
    icon: "RiCpuLine",
    color: "from-primary-500 to-secondary-400",
    badge: "AI-Powered",
  },
  {
    id: "advisory",
    name: "Advisory Board Services",
    description: "KOL management, strategic insights, and expert engagement programs",
    icon: "RiUserStarLine",
    color: "from-primary-500 to-secondary-400",
    badge: "Elite",
  },
];

// 5. MARKET CHALLENGES & SOLUTIONS
export const marketChallenges = [
  {
    id: "hcp-activation",
    challenge: "HCP Activation",
    solution: "Engage healthcare professionals with interactive digital platforms",
    tools: ["AI Chatbots", "WhatsApp Campaigns", "VR Education"],
    icon: "RiUserAddLine",
  },
  {
    id: "geographic",
    challenge: "Geographic Limitations",
    solution: "Reach remote HCPs through virtual and hybrid event solutions",
    tools: ["Virtual Events", "Live Streaming", "eLearning LMS"],
    icon: "RiMapPinLine",
  },
  {
    id: "cost",
    challenge: "Cost Effectiveness",
    solution: "Reduce costs while maintaining quality through digital transformation",
    tools: ["Automated Workflows", "Digital Assets", "SCORM Modules"],
    icon: "RiMoneyDollarCircleLine",
  },
  {
    id: "time",
    challenge: "Time Restrictions",
    solution: "Flexible, on-demand learning and micro-learning formats",
    tools: ["Mobile Learning", "Micro-modules", "Self-paced Courses"],
    icon: "RiTimeLine",
  },
  {
    id: "rep-performance",
    challenge: "Rep Performance",
    solution: "AI-powered training and real-time performance tracking",
    tools: ["Rep Assistant", "AI Coaching", "Visit Tracking"],
    icon: "RiLineChartLine",
  },
];

// 6. INTERNAL PROGRAMS & TOOLS
export const internalTools = [
  {
    id: "rep-assistant",
    name: "Rep Assistant",
    description: "AI-powered WhatsApp bot for medical representatives with instant knowledge access",
    icon: "RiWhatsappLine",
    color: "from-primary-500 to-secondary-400",
    platform: "WhatsApp",
  },
  {
    id: "repbot",
    name: "RepBot",
    description: "Telegram bot for streamlined rep communication and resource sharing",
    icon: "RiTelegramLine",
    color: "from-primary-500 to-secondary-400",
    platform: "Telegram",
  },
  {
    id: "visit-tracker",
    name: "Visit Tracking System",
    description: "Real-time medical rep visit monitoring with GPS and reporting",
    icon: "RiMapPinUserLine",
    color: "from-primary-500 to-secondary-400",
    platform: "Web & Mobile",
  },
  {
    id: "cds",
    name: "Clinical Decision Support",
    description: "AI-driven CDS system for evidence-based clinical recommendations",
    icon: "RiStethoscopeLine",
    color: "from-primary-500 to-secondary-400",
    platform: "Web Platform",
  },
  {
    id: "live-voting",
    name: "Live Voting System",
    description: "Interactive polling and Q&A for events and advisory boards",
    icon: "RiSurveyLine",
    color: "from-primary-500 to-secondary-400",
    platform: "Event Tech",
  },
];

// 7. EDUCATIONAL PROGRAMS
export const educationalPrograms = [
  {
    id: "workshops",
    name: "Hands-on Workshops",
    description: "Practical, interactive training sessions with expert facilitators",
    icon: "RiToolsLine",
    features: ["Small Groups", "Expert Trainers", "Practical Exercises", "Certification"],
  },
  {
    id: "webinars",
    name: "Virtual Webinars",
    description: "Live and on-demand educational sessions with global reach",
    icon: "RiVideoLine",
    features: ["Live Streaming", "Q&A Sessions", "Recordings", "CME Credits"],
  },
  {
    id: "newsletters",
    name: "Medical Newsletters",
    description: "Curated medical content delivered to HCPs regularly",
    icon: "RiMailLine",
    features: ["Weekly Updates", "Clinical Insights", "Drug Updates", "Mobile Friendly"],
  },
  {
    id: "tot",
    name: "Training of Trainers",
    description: "Certification program for internal trainers and educators",
    icon: "RiUserFollowLine",
    features: ["Train-the-Trainer", "Leadership Skills", "Assessment Tools", "TOT Certificate"],
  },
  {
    id: "rep-packages",
    name: "Medical Rep Training",
    description: "Comprehensive training packages for pharmaceutical sales teams",
    icon: "RiBriefcaseLine",
    features: ["Product Knowledge", "Selling Skills", "Role Play", "Assessment"],
  },
];

// 8. SEGMENTED CLIENTS (Advanced Client List)
const pharmaClients = [
    { id: "1", name: "Novartis", country: "Switzerland", flag: "CH", category: "pharma" as const, logo: "/marvel-images/Novo.png" },
    { id: "2", name: "Pfizer", country: "USA", flag: "US", category: "pharma" as const, logo: "/marvel-images/Pfizer-Logo.png" },
    { id: "3", name: "AstraZeneca", country: "UK", flag: "GB", category: "pharma" as const, logo: "/marvel-images/Astra Zeneca.png" },
    { id: "4", name: "Sanofi", country: "France", flag: "FR", category: "pharma" as const, logo: "/marvel-images/sanofi.jfif" },
    { id: "5", name: "Roche", country: "Switzerland", flag: "CH", category: "pharma" as const, logo: "/marvel-images/Roche.png" },
    { id: "6", name: "GSK", country: "UK", flag: "GB", category: "pharma" as const, logo: "/marvel-images/GSK.png" },
    { id: "7", name: "Bayer", country: "Germany", flag: "DE", category: "pharma" as const, logo: "/marvel-images/Bayer.png" },
    { id: "8", name: "MSD", country: "USA", flag: "US", category: "pharma" as const },
    { id: "9", name: "EIPICO", country: "Egypt", flag: "EG", category: "pharma" as const, logo: "/marvel-images/Eipico.png" },
    { id: "10", name: "Marcyrl", country: "Egypt", flag: "EG", category: "pharma" as const, logo: "/marvel-images/Marcyrl.svg" },
    { id: "11", name: "Hikma", country: "Jordan", flag: "JO", category: "pharma" as const, logo: "/marvel-images/hikma.png" },
    { id: "p12", name: "Johnson & Johnson", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p13", name: "Abbott", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p14", name: "Eli Lilly", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p15", name: "Merck", country: "Germany", flag: "DE", category: "pharma" as const },
    { id: "p16", name: "Novartis", country: "Switzerland", flag: "CH", category: "pharma" as const },
    { id: "p17", name: "Amgen", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p18", name: "Biogen", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p19", name: "Bristol Myers", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p20", name: "Celgene", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p21", name: "Genentech", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p22", name: "Teva", country: "Israel", flag: "IL", category: "pharma" as const },
    { id: "p23", name: "Mylan", country: "USA", flag: "US", category: "pharma" as const },
    { id: "p24", name: "Allergan", country: "Ireland", flag: "IE", category: "pharma" as const },
    { id: "p25", name: "Takeda", country: "Japan", flag: "JP", category: "pharma" as const },
    { id: "p26", name: "Novo Nordisk", country: "Denmark", flag: "DK", category: "pharma" as const },
    { id: "p27", name: "Sanofi Pasteur", country: "France", flag: "FR", category: "pharma" as const },
    { id: "p28", name: "Boehringer", country: "Germany", flag: "DE", category: "pharma" as const },
    { id: "p29", name: "Daiichi Sankyo", country: "Japan", flag: "JP", category: "pharma" as const },
    { id: "p30", name: "Astellas", country: "Japan", flag: "JP", category: "pharma" as const },
    { id: "p31", name: "Otsuka", country: "Japan", flag: "JP", category: "pharma" as const },
    { id: "p32", name: "Menarini", country: "Italy", flag: "IT", category: "pharma" as const },
    { id: "p33", name: "Servier", country: "France", flag: "FR", category: "pharma" as const },
    { id: "p34", name: "Ipsen", country: "France", flag: "FR", category: "pharma" as const },
    { id: "p35", name: "LEO Pharma", country: "Denmark", flag: "DK", category: "pharma" as const },
    { id: "p36", name: "Lundbeck", country: "Denmark", flag: "DK", category: "pharma" as const },
    { id: "p37", name: "Grifols", country: "Spain", flag: "ES", category: "pharma" as const },
    { id: "p38", name: "Ferring", country: "Switzerland", flag: "CH", category: "pharma" as const },
    { id: "p39", name: "UCB", country: "Belgium", flag: "BE", category: "pharma" as const },
    { id: "p40", name: "Mundipharma", country: "UK", flag: "GB", category: "pharma" as const },
    { id: "p41", name: "Chiesi", country: "Italy", flag: "IT", category: "pharma" as const },
    { id: "p42", name: "Stada", country: "Germany", flag: "DE", category: "pharma" as const },
    { id: "p43", name: "Ratiopharm", country: "Germany", flag: "DE", category: "pharma" as const },
    { id: "p44", name: "Sandoz", country: "Switzerland", flag: "CH", category: "pharma" as const },
    { id: "p45", name: "Hexal", country: "Germany", flag: "DE", category: "pharma" as const },
    { id: "p46", name: "Accord", country: "UK", flag: "GB", category: "pharma" as const },
  ];

const vendorClients = [
    { id: "12", name: "AWS", country: "USA", flag: "US", category: "vendor" as const },
    { id: "13", name: "Adobe", country: "USA", flag: "US", category: "vendor" as const },
    { id: "14", name: "Salesforce", country: "USA", flag: "US", category: "vendor" as const },
    { id: "15", name: "Microsoft", country: "USA", flag: "US", category: "vendor" as const },
    { id: "16", name: "Google Cloud", country: "USA", flag: "US", category: "vendor" as const },
    { id: "17", name: "Veeva", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v1", name: "Oracle", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v2", name: "SAP", country: "Germany", flag: "DE", category: "vendor" as const },
    { id: "v3", name: "IBM", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v4", name: "Zoom", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v5", name: "Slack", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v6", name: "HubSpot", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v7", name: "Mailchimp", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v8", name: "Shopify", country: "Canada", flag: "CA", category: "vendor" as const },
    { id: "v9", name: "Stripe", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v10", name: "Twilio", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v11", name: "DocuSign", country: "USA", flag: "US", category: "vendor" as const },
    { id: "v12", name: "Workday", country: "USA", flag: "US", category: "vendor" as const },
  ];

const societyClients = [
    { id: "18", name: "ESC", country: "Europe", flag: "EU", category: "society" as const },
    { id: "19", name: "ADA", country: "USA", flag: "US", category: "society" as const },
    { id: "20", name: "ESMO", country: "Europe", flag: "EU", category: "society" as const },
    { id: "21", name: "EULAR", country: "Europe", flag: "EU", category: "society" as const },
    { id: "22", name: "Saudi Heart Association", country: "KSA", flag: "SA", category: "society" as const, logo: "/marvel-images/SHA.png" },
    { id: "23", name: "Egyptian Cardiology Society", country: "Egypt", flag: "EG", category: "society" as const, logo: "/marvel-images/EgSC.png" },
    { id: "s1", name: "AHA", country: "USA", flag: "US", category: "society" as const },
    { id: "s2", name: "ACC", country: "USA", flag: "US", category: "society" as const },
    { id: "s3", name: "WHO", country: "Global", flag: "UN", category: "society" as const },
    { id: "s4", name: "EMA", country: "Europe", flag: "EU", category: "society" as const },
    { id: "s5", name: "FDA", country: "USA", flag: "US", category: "society" as const },
    { id: "s6", name: "SFDA", country: "KSA", flag: "SA", category: "society" as const },
    { id: "s7", name: "Egyptian Diabetes Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s8", name: "Egyptian Oncology Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s9", name: "Gulf Heart Association", country: "UAE", flag: "AE", category: "society" as const },
    { id: "s10", name: "Egyptian Neurology Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s11", name: "MENA Thoracic Society", country: "UAE", flag: "AE", category: "society" as const },
    { id: "s12", name: "Egyptian Nephrology Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s13", name: "Gastroenterology Association", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s14", name: "Egyptian Orthopedic Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s15", name: "Middle East ENT Society", country: "UAE", flag: "AE", category: "society" as const },
    { id: "s16", name: "Egyptian Ophthalmology", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s17", name: "Arab Rheumatology Society", country: "UAE", flag: "AE", category: "society" as const },
    { id: "s18", name: "Egyptian Pediatrics Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s19", name: "MENA Dermatology Society", country: "UAE", flag: "AE", category: "society" as const },
    { id: "s20", name: "Egyptian Psychiatry Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s21", name: "Gulf Obstetrics Society", country: "KSA", flag: "SA", category: "society" as const },
    { id: "s22", name: "Egyptian Radiology Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s23", name: "Arab Urology Association", country: "UAE", flag: "AE", category: "society" as const },
    { id: "s24", name: "Egyptian Surgery Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s25", name: "Gulf Oncology Network", country: "KSA", flag: "SA", category: "society" as const },
    { id: "s26", name: "Egyptian Immunology Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s27", name: "MENA Hematology Society", country: "UAE", flag: "AE", category: "society" as const },
    { id: "s28", name: "Egyptian Allergy Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s29", name: "Gulf Genetics Society", country: "KSA", flag: "SA", category: "society" as const },
    { id: "s30", name: "Egyptian Endocrine Society", country: "Egypt", flag: "EG", category: "society" as const },
    { id: "s31", name: "Arab Pulmonary Society", country: "UAE", flag: "AE", category: "society" as const },
  ];

export const segmentedClients: SegmentedClients = {
  all: [...pharmaClients, ...vendorClients, ...societyClients],
  pharma: pharmaClients,
  vendors: vendorClients,
  societies: societyClients,
};
