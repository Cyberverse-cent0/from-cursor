import type { Metadata } from "next";

import "@/app/globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  siteConfig.name,
  siteConfig.description,
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
