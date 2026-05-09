import mongoose from "mongoose";
import { Service, Toolbar, SiteProduct } from "../models";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in environment");
  process.exit(1);
}

// Default services data
const defaultServices = [
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
    ],
    order: 0,
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
    ],
    order: 1,
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
    ],
    order: 2,
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
    ],
    order: 3,
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
    ],
    order: 4,
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
    ],
    order: 5,
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
    ],
    order: 6,
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
    ],
    order: 7,
  },
];

// Default toolbar data
const defaultToolbar = [
  { id: "services", label: "Services", icon: "RiSettings4Line", color: "primary", visible: true, order: 0 },
  { id: "products", label: "Products", icon: "RiBriefcaseLine", color: "primary", visible: true, order: 1 },
  { id: "expertise", label: "Expertise", icon: "RiHeartPulseLine", color: "primary", visible: true, order: 2 },
  { id: "accreds", label: "Accreds", icon: "RiAwardLine", color: "primary", visible: true, order: 3 },
  { id: "reviews", label: "Reviews", icon: "RiTeamLine", color: "primary", visible: true, order: 4 },
  { id: "people", label: "People", icon: "RiGroupLine", color: "primary", visible: true, order: 5 },
  { id: "gallery", label: "Gallery", icon: "RiImageLine", color: "primary", visible: true, order: 6 },
  { id: "theme", label: "Theme", icon: "RiSunLine", color: "primary", visible: true, order: 7 },
  { id: "contact", label: "Contact", icon: "RiMailLine", color: "primary", visible: true, order: 8 },
];

// Default products data
const defaultProducts = [
  {
    id: "tebzone",
    icon: "RiStackLine",
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
      { name: "Secure Payments", desc: "Encrypted transactions" },
    ],
    link: { label: "Visit TebZone", url: "https://tebzone.com", visible: true },
    visible: true,
    order: 0,
  },
  {
    id: "medadd",
    icon: "RiComputerLine",
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
      { name: "Interactive Modules", desc: "Engaging learning content" },
    ],
    link: { label: "Explore Med-ADD", url: "#", visible: true },
    visible: true,
    order: 1,
  },
  {
    id: "medvi",
    icon: "RiVideoLine",
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
      { name: "VR Simulations", desc: "Immersive training" },
    ],
    link: { label: "Learn More", url: "#", visible: true },
    visible: true,
    order: 2,
  },
  {
    id: "medlab",
    icon: "RiMicroscopeLine",
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
      { name: "LIMS Integration", desc: "Connect with existing systems" },
    ],
    link: { label: "Join Waitlist", url: "#", visible: true },
    visible: true,
    order: 3,
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected!");

    // Clear existing data
    console.log("Clearing existing site config...");
    await Service.deleteMany({});
    await Toolbar.deleteMany({});
    await SiteProduct.deleteMany({});
    console.log("Cleared!");

    // Insert services
    console.log("Inserting services...");
    await Service.insertMany(defaultServices);
    console.log(`✓ Inserted ${defaultServices.length} services`);

    // Insert toolbar
    console.log("Inserting toolbar items...");
    await Toolbar.insertMany(defaultToolbar);
    console.log(`✓ Inserted ${defaultToolbar.length} toolbar items`);

    // Insert products
    console.log("Inserting products...");
    await SiteProduct.insertMany(defaultProducts);
    console.log(`✓ Inserted ${defaultProducts.length} products`);

    console.log("\n✅ Seed completed successfully!");
    console.log("\nSummary:");
    console.log(`- Services: ${defaultServices.length}`);
    console.log(`- Toolbar items: ${defaultToolbar.length}`);
    console.log(`- Products: ${defaultProducts.length}`);

  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

seed();
