import { AboutPreview } from "@/components/sections/about-preview";
import { CollaboratorsSection } from "@/components/sections/collaborators-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { ProfessionalAffiliations } from "@/components/sections/professional-affiliations";
import { ResearchHighlight } from "@/components/sections/research-highlight";
import { ResultsMetrics } from "@/components/sections/results-metrics";
import { ServicesOverview } from "@/components/sections/services-overview";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ResultsMetrics />
      <AboutPreview />
      <ServicesOverview />
      <ResearchHighlight />
      <ProfessionalAffiliations />
      <GallerySection />
      <TestimonialsCarousel />
      <CollaboratorsSection />
      <NewsletterSection />
    </>
  );
}
