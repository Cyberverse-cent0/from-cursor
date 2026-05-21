import { GallerySection } from "@/components/sections/gallery-section";
import { SectionHeading } from "@/components/layout/section-heading";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata(
  "Gallery — Dr. Stephen Asatsa",
  "Photos from research, teaching, and professional engagements.",
  "/gallery",
);

export default function GalleryPage() {
  return (
    <div className="pb-16">
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Gallery"
            title="Moments from practice and scholarship"
            description="A visual record of conferences, community work, and academic leadership."
          />
        </div>
      </section>
      <GallerySection />
    </div>
  );
}
