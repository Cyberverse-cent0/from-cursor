import Link from "next/link";

import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function AdminHomePage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Signed in as {session?.user?.email} ({session?.user?.role})
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/api/admin/dashboard", label: "API: Dashboard stats", external: true },
          { href: "/api/content", label: "API: Site content", external: true },
          { href: "/api/admin/messages", label: "API: Messages", external: true },
          { href: "/contact", label: "Contact page" },
          { href: "/research-hub", label: "Research hub" },
        ].map((item) => (
          <Card key={item.href} className="p-4">
            {item.external ? (
              <a href={item.href} className="font-medium text-primary hover:underline" target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className="font-medium text-primary hover:underline">
                {item.label}
              </Link>
            )}
          </Card>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Content is driven by JSON in <code>lib/content/</code> and optional MySQL via Prisma.
        Contact form submissions are stored in <code>data/contact-submissions.json</code> on the server.
      </p>
    </div>
  );
}
