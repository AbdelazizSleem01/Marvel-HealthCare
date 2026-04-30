import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import connectDB from "@/lib/mongodb";
import { Company } from "@/models";

const companiesData = [
  // Main Company - Marvel Group
  {
    id: "marvel-group",
    name: "Marvel Group",
    slug: "marvel-group",
    tagline: "Where Medicine Meets Mastery",
    year: "2015",
    country: "Egypt / UAE / KSA",
    flag: "EG",
    description: "Marvel Group is the MENA region's most trusted med-tech ecosystem, powering healthcare innovation since 2015. We are a full-service healthcare solutions provider combining medical education, creative communication, digital platforms, and cutting-edge technology to transform patient care across the region.",
    color: "from-primary-500 to-secondary-400",
    icon: "M",
    logo: "/Logo.png",
    isMain: true,
    isActive: true,
    order: 0,
    focusAreas: [
      { icon: "RiGlobalLine", label: "Healthcare Ecosystem", description: "Integrated healthcare solutions across MENA region" },
      { icon: "RiGraduationCapLine", label: "Medical Education", description: "CME programs and professional development" },
      { icon: "RiPaletteLine", label: "Creative Communication", description: "Healthcare marketing and brand development" },
      { icon: "RiComputerLine", label: "Digital Platforms", description: "Health-tech solutions and e-commerce" },
      { icon: "RiVideoLine", label: "Medical Visualization", description: "3D animation and AR/VR medical content" },
      { icon: "RiMicroscopeLine", label: "Innovation Lab", description: "R&D and medical technology incubation" },
    ],
    gallery: [
      { src: "/Logo.png", title: "Marvel Group HQ", category: "Office" },
      { src: "/marvel-images/Bait.png", title: "Creative Studio", category: "Studio" },
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/company/marvel-group",
      email: "info@marvel-group.com",
      whatsapp: "+20123456789",
    },
    customStats: [
      { id: "stat-1", label: "Years Experience", value: 10, suffix: "+" },
      { id: "stat-2", label: "Team Members", value: 200, suffix: "+" },
      { id: "stat-3", label: "Projects Delivered", value: 500, suffix: "+" },
      { id: "stat-4", label: "Client Partners", value: 150, suffix: "+" },
    ],
    employees: [
      { name: "Dr. Amr", position: "CEO & Founder", department: "Leadership" },
      { name: "Sarah", position: "COO", department: "Operations" },
      { name: "Michael", position: "CTO", department: "Technology" },
    ],
  },
  {
    id: "bait-alebdaa",
    name: "Bait Alebdaa",
    slug: "bait-alebdaa",
    tagline: "Creative Excellence in Healthcare Communication",
    year: "2018",
    country: "United Arab Emirates",
    flag: "AE",
    description: "Bait Alebdaa is the creative powerhouse of Marvel Group, delivering award-winning healthcare communication solutions across the MENA region. We combine strategic thinking with creative excellence to transform complex medical concepts into compelling narratives that resonate with healthcare professionals and patients alike.",
    color: "from-primary-500 to-secondary-400",
    icon: "RiStarLine",
    logo: "/marvel-images/Bait.png",
    isMain: false,
    isActive: true,
    order: 1,
    focusAreas: [
      { icon: "RiPaletteLine", label: "Creative Strategy", description: "Brand development and visual identity systems for healthcare organizations" },
      { icon: "RiVideoLine", label: "Video Production", description: "High-end medical animation and video content production" },
      { icon: "RiImageLine", label: "Medical Photography", description: "Professional medical and healthcare photography services" },
      { icon: "RiGlobalLine", label: "Digital Marketing", description: "Multi-channel digital campaigns targeting HCPs and patients" },
    ],
    gallery: [
      { src: "/marvel-images/Bait.png", title: "Brand Identity", category: "Branding" },
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/company/baitalebdaa",
      email: "creative@baitalebdaa.com",
    },
    customStats: [
      { id: "stat-1", label: "Creative Campaigns", value: 250, suffix: "+" },
      { id: "stat-2", label: "Awards Won", value: 15, suffix: "" },
      { id: "stat-3", label: "Happy Clients", value: 80, suffix: "+" },
      { id: "stat-4", label: "Team Members", value: 45, suffix: "" },
    ],
    employees: [
      { name: "Ahmed Hassan", position: "Creative Director", department: "Creative" },
      { name: "Sara Mohammed", position: "Art Director", department: "Design" },
      { name: "Khaled Omar", position: "Video Producer", department: "Production" },
    ],
  },
  {
    id: "tebzone",
    name: "TebZone",
    slug: "tebzone",
    tagline: "Digital Health Platform Connecting Medical Professionals",
    year: "2020",
    country: "Egypt",
    flag: "EG",
    description: "TebZone is Egypt's leading digital health platform, connecting medical professionals with innovative solutions, educational resources, and career opportunities. Our platform serves as a comprehensive ecosystem for healthcare practitioners seeking to enhance their knowledge and expand their professional network.",
    color: "from-blue-500 to-cyan-500",
    icon: "RiGlobalLine",
    logo: "/marvel-images/TebZone.png",
    isMain: false,
    isActive: true,
    order: 2,
    focusAreas: [
      { icon: "RiGlobalLine", label: "Digital Platform", description: "Comprehensive online platform for medical professionals" },
      { icon: "RiBookReadLine", label: "Medical Education", description: "Online courses and CME programs for doctors" },
      { icon: "RiMessage2Line", label: "Professional Network", description: "Connect with peers and industry experts" },
      { icon: "RiBriefcaseLine", label: "Career Services", description: "Job portal and career development resources" },
    ],
    gallery: [
      { src: "/marvel-images/TebZone.png", title: "Platform Interface", category: "Product" },
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/company/tebzone",
      email: "info@tebzone.com",
    },
    customStats: [
      { id: "stat-1", label: "Registered Doctors", value: 25000, suffix: "+" },
      { id: "stat-2", label: "Courses Available", value: 150, suffix: "+" },
      { id: "stat-3", label: "Monthly Active Users", value: 8000, suffix: "" },
      { id: "stat-4", label: "Partner Hospitals", value: 120, suffix: "+" },
    ],
    employees: [
      { name: "Dr. Mostafa Ali", position: "Medical Director", department: "Medical" },
      { name: "Nour El-Din", position: "Platform Manager", department: "Operations" },
      { name: "Laila Khaled", position: "Content Lead", department: "Content" },
    ],
  },
  {
    id: "med-add",
    name: "Med-ADD",
    slug: "med-add",
    tagline: "AI-Powered Medical Education & Professional Development",
    year: "2021",
    country: "Saudi Arabia",
    flag: "SA",
    description: "Med-ADD delivers accredited medical education and professional development solutions powered by artificial intelligence and cutting-edge learning technologies. We partner with leading medical institutions to provide CPD-certified programs that meet the highest international standards.",
    color: "from-green-500 to-emerald-500",
    icon: "RiGraduationCapLine",
    logo: "/marvel-images/MED ADD.png",
    isMain: false,
    isActive: true,
    order: 3,
    focusAreas: [
      { icon: "RiBookReadLine", label: "CPD Programs", description: "Accredited continuing professional development" },
      { icon: "RiLightbulbFlashLine", label: "AI Learning", description: "AI-powered personalized learning experiences" },
      { icon: "RiAwardLine", label: "Certification", description: "Internationally recognized certifications" },
      { icon: "RiTeamLine", label: "Workshops", description: "Hands-on workshops and training sessions" },
    ],
    gallery: [
      { src: "/marvel-images/MED ADD.png", title: "Learning Platform", category: "Platform" },
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/company/medadd",
      email: "education@medadd.sa",
    },
    customStats: [
      { id: "stat-1", label: "CPD Hours Delivered", value: 50000, suffix: "+" },
      { id: "stat-2", label: "Accredited Programs", value: 85, suffix: "" },
      { id: "stat-3", label: "Healthcare Professionals", value: 12000, suffix: "+" },
      { id: "stat-4", label: "Partner Institutions", value: 45, suffix: "" },
    ],
    employees: [
      { name: "Dr. Abdullah Saeed", position: "Education Director", department: "Medical" },
      { name: "Fatima Al-Rashid", position: "Program Manager", department: "Programs" },
      { name: "Omar Khalid", position: "AI Specialist", department: "Technology" },
    ],
  },
  {
    id: "med-vi",
    name: "Med-Vi",
    slug: "med-vi",
    tagline: "AI-Driven Medical Visualization & AR Solutions",
    year: "2023",
    country: "Egypt",
    flag: "EG",
    description: "Med-Vi pioneers AI-driven medical visualization and augmented reality solutions for next-generation clinical communication. We transform complex medical data into immersive visual experiences that enhance medical education, patient communication, and surgical planning.",
    color: "from-purple-500 to-pink-500",
    icon: "RiEyeLine",
    logo: "/med-visual.jpg",
    isMain: false,
    isActive: true,
    order: 4,
    focusAreas: [
      { icon: "RiShapesLine", label: "3D Medical Models", description: "Accurate anatomical 3D visualization" },
      { icon: "RiEyeLine", label: "AR Applications", description: "Augmented reality for medical training" },
      { icon: "RiHospitalLine", label: "Surgical Planning", description: "Preoperative visualization tools" },
      { icon: "RiUserHeartLine", label: "Patient Education", description: "Visual patient communication tools" },
    ],
    gallery: [
      { src: "/med-visual.jpg", title: "3D Heart Model", category: "3D Modeling" },
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/company/medvi",
      email: "info@med-vi.com",
    },
    customStats: [
      { id: "stat-1", label: "3D Models Created", value: 500, suffix: "+" },
      { id: "stat-2", label: "AR Applications", value: 25, suffix: "" },
      { id: "stat-3", label: "Surgeries Supported", value: 150, suffix: "+" },
      { id: "stat-4", label: "Research Papers", value: 12, suffix: "" },
    ],
    employees: [
      { name: "Dr. Karim Fathi", position: "Medical Visualization Lead", department: "Medical" },
      { name: "Tamer Hosny", position: "3D Artist", department: "Design" },
      { name: "Yasmin Adel", position: "AR Developer", department: "Technology" },
    ],
  },
  {
    id: "med-lab",
    name: "Med-Lab",
    slug: "med-lab",
    tagline: "Innovation Lab & R&D Powerhouse",
    year: "2024",
    country: "Egypt",
    flag: "EG",
    description: "Med-Lab is the dedicated R&D and innovation laboratory of Marvel Group, incubating breakthrough technologies for the future of healthcare. We explore emerging technologies, prototype innovative solutions, and develop proof-of-concepts that shape the next generation of medical care.",
    color: "from-amber-500 to-orange-500",
    icon: "RiLightbulbFlashLine",
    logo: "/med-lab.jpg",
    isMain: false,
    isActive: true,
    order: 5,
    focusAreas: [
      { icon: "RiBrainLine", label: "AI Research", description: "Machine learning for healthcare applications" },
      { icon: "RiSettings3Line", label: "Robotics", description: "Medical robotics and automation" },
      { icon: "RiDatabase2Line", label: "Health Tech", description: "Blockchain for medical records" },
      { icon: "RiFlashlightLine", label: "Prototyping", description: "Rapid prototyping and testing" },
    ],
    gallery: [
      { src: "/med-lab.jpg", title: "Innovation Lab", category: "Lab" },
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/company/medlab",
      email: "research@med-lab.com",
    },
    customStats: [
      { id: "stat-1", label: "Projects in Pipeline", value: 18, suffix: "" },
      { id: "stat-2", label: "Patents Filed", value: 8, suffix: "" },
      { id: "stat-3", label: "Research Partners", value: 12, suffix: "" },
      { id: "stat-4", label: "Innovation Awards", value: 5, suffix: "" },
    ],
    employees: [
      { name: "Dr. Hani Moustafa", position: "R&D Director", department: "Research" },
      { name: "Mona El-Sayed", position: "AI Researcher", department: "AI" },
      { name: "Amr Diab", position: "Robotics Engineer", department: "Engineering" },
    ],
  },
  {
    id: "meduscript",
    name: "Meduscript",
    slug: "meduscript",
    tagline: "Expert Medical Writing & Regulatory Documentation",
    year: "2022",
    country: "Egypt",
    flag: "EG",
    description: "Meduscript provides expert medical writing and regulatory documentation services that meet global pharmaceutical standards. Our team of experienced medical writers and regulatory specialists ensures that all documents are scientifically accurate, compliant with regulations, and tailored to target audiences.",
    color: "from-red-500 to-rose-500",
    icon: "RiFileTextLine",
    logo: "/medu-script.jpg",
    isMain: false,
    isActive: true,
    order: 6,
    focusAreas: [
      { icon: "RiArticleLine", label: "Medical Writing", description: "Scientific manuscripts and publications" },
      { icon: "RiShieldCheckLine", label: "Regulatory Affairs", description: "FDA and EMA submission documents" },
      { icon: "RiFileTextLine", label: "Clinical Reports", description: "Clinical study reports and protocols" },
      { icon: "RiBookOpenLine", label: "Patient Materials", description: "Patient education and consent forms" },
    ],
    gallery: [
      { src: "/medu-script.jpg", title: "Documentation Center", category: "Office" },
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/company/meduscript",
      email: "writing@meduscript.com",
    },
    customStats: [
      { id: "stat-1", label: "Documents Delivered", value: 300, suffix: "+" },
      { id: "stat-2", label: "Regulatory Approvals", value: 45, suffix: "" },
      { id: "stat-3", label: "Medical Writers", value: 15, suffix: "" },
      { id: "stat-4", label: "Success Rate", value: 98, suffix: "%" },
    ],
    employees: [
      { name: "Dr. Nadia Hassan", position: "Chief Medical Writer", department: "Writing" },
      { name: "Samir Kamel", position: "Regulatory Specialist", department: "Regulatory" },
      { name: "Heba Mahmoud", position: "Senior Medical Writer", department: "Writing" },
    ],
  },
];

async function seedCompanies() {
  try {
    await connectDB();
    
    // Delete existing companies
    await Company.deleteMany({});
    console.log("Deleted existing companies");
    
    // Insert new companies
    await Company.insertMany(companiesData);
    console.log("Inserted", companiesData.length, "companies");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding companies:", error);
    process.exit(1);
  }
}

seedCompanies();
