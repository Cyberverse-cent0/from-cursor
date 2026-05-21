import Link from "next/link";

import { EnhancedHeroSection } from "@/components/research-hub/enhanced-hero-section";
import { EnhancedStatsSection } from "@/components/research-hub/enhanced-stats-section";
import { FilterableProjectGrid } from "@/components/research-hub/filterable-project-grid";
import { AwardsGrid } from "@/components/research-hub/awards-grid";
import { BlogSection } from "@/components/research-hub/blog-section";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata(
  "Research Hub — Dr. Stephen Asatsa",
  "Publications, projects, awards, and research themes.",
  "/research-hub",
);

export default function ResearchHubPage() {
  return (
    <div className="pb-16">
      <EnhancedHeroSection />
      <EnhancedStatsSection />
      <FilterableProjectGrid />
      <AwardsGrid />
      <BlogSection />
      <section className="section-space">
        <div className="container-shell flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-muted/30 p-8">
          <div>
            <h2 className="font-display text-2xl font-semibold">Member sign-in</h2>
            <p className="mt-2 text-muted-foreground">
              Access saved items and messaging with a Google account.
            </p>
          </div>
          <Button asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
