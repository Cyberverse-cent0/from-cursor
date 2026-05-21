import { AboutHero } from "@/components/about/AboutHero";
import { AboutPreview } from "@/components/sections/about-preview";
import { ProfessionalAffiliations } from "@/components/sections/professional-affiliations";
import { SectionHeading } from "@/components/layout/section-heading";
import { siteContent } from "@/lib/content/site-content";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata(
  "About — Dr. Stephen Asatsa",
  "Academic leadership, licensed psychological practice, and research in decolonization and thanatology.",
  "/about",
);

const aboutStats = [
  { label: "Years in practice", value: 15, description: "Clinical and academic experience" },
  { label: "Publications", value: 25, description: "Peer-reviewed research output" },
  { label: "Students mentored", value: 50, description: "Graduate and undergraduate mentorship" },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <AboutHero portraitSrc="/assets/people/asatsa.png" stats={aboutStats} />
      <section className="section-space">
        <div className="container-shell max-w-3xl space-y-6">
          <SectionHeading
            eyebrow="Biography"
            title="Who we are"
            description={siteContent.aboutShort.replace(/<[^>]+>/g, "")}
          />
          {siteContent.aboutFull.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-muted-foreground leading-8"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </section>
      <AboutPreview />
      <ProfessionalAffiliations />
    </div>
  );
}
