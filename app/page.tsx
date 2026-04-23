import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InNumbersSection from "@/components/sections/InNumbersSection";
import CreativeServicesSection from "@/components/sections/CreativeServicesSection";
import EducationalProgramsSection from "@/components/sections/EducationalProgramsSection";
import TherapeuticAreasSection from "@/components/sections/TherapeuticAreasSection";
import CTASection from "@/components/sections/CTASection";
import CompaniesSection from "@/components/sections/CompaniesSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>        
        <CompaniesSection/>
        <InNumbersSection />
        <CreativeServicesSection />
        <EducationalProgramsSection />
        <TherapeuticAreasSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
