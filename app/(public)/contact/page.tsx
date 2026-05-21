import { ContactForm } from "@/components/forms/contact-form";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata(
  "Contact — Dr. Stephen Asatsa",
  "Get in touch for consultations, collaborations, and speaking engagements.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="pb-16">
      <section className="section-space border-b border-border/60">
        <div className="container-shell max-w-3xl">
          <h1 className="font-display text-4xl font-bold tracking-tight">Contact</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Reach Dr. Stephen Asatsa at{" "}
            <a className="text-primary underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
