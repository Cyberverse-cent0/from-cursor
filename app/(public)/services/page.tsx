import { ProcessSection } from "@/components/sections/process-section";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SectionHeading } from "@/components/layout/section-heading";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata(
  "Services — Dr. Stephen Asatsa",
  "Consultation, mentorship, and evidence-based psychological services for individuals and institutions.",
  "/services",
);

export default function ServicesPage() {
  return (
    <div className="pb-16">
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Services"
            title="Professional psychological and academic services"
            description="Support for individuals, universities, and organizations through licensed practice and scholarly leadership."
          />
        </div>
      </section>
      <ServicesOverview />
      <ProcessSection />
    </div>
  );
}
