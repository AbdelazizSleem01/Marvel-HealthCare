import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import InNumbersSection from "@/components/sections/InNumbersSection";
import CreativeServicesSection from "@/components/sections/CreativeServicesSection";
import DetailedServicesSection from "@/components/sections/DetailedServicesSection";
import FeaturedServicesSection from "@/components/sections/FeaturedServicesSection";
import MarketChallengesSection from "@/components/sections/MarketChallengesSection";
import InternalToolsSection from "@/components/sections/InternalToolsSection";
import EducationalProgramsSection from "@/components/sections/EducationalProgramsSection";
import SegmentedClientsSection from "@/components/sections/SegmentedClientsSection";
import CompaniesSection from "@/components/sections/CompaniesSection";
import BranchesSection from "@/components/sections/BranchesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import AccreditationsSection from "@/components/sections/AccreditationsSection";
import WorkPreviewSection from "@/components/sections/WorkPreviewSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TherapeuticAreasSection from "@/components/sections/TherapeuticAreasSection";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <InNumbersSection />
        <CreativeServicesSection />
        <DetailedServicesSection />
        <FeaturedServicesSection />
        <MarketChallengesSection />
        <InternalToolsSection />
        <EducationalProgramsSection />
        <SegmentedClientsSection />
        <CompaniesSection />
        <BranchesSection />
        <PartnersSection />
        <AccreditationsSection />
        <WorkPreviewSection />
        <ProductsSection />
        <TestimonialsSection />
        <TherapeuticAreasSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
