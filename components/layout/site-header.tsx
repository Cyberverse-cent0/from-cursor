"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content/site-content";
import { SiteSidebar } from "./site-sidebar";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/research-hub", label: "Research Hub" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container-shell flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/branding/logo.png"
              alt="Dr. Stephen Asatsa"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-display text-lg font-semibold text-foreground">
              Dr. Stephen Asatsa
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-sm font-medium text-foreground"
                    : "text-sm font-medium text-muted-foreground hover:text-foreground"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
              <a
                href={siteContent.contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book consultation
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <SiteSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={pathname ?? "/"}
      />
    </>
  );
}
