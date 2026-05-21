"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BadgeCheck, CalendarDays, ChevronDown, Download, ExternalLink, Mail, PhoneCall, Play, Video, MessageCircle, Star, ArrowRight, Sparkles, Trophy, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/content/site-content";
import { siteConfig } from "@/lib/site";
import { useHomepageContent } from "@/hooks/use-homepage-content";

export function InteractiveHeroSection() {
  const { content: heroData, loading } = useHomepageContent('hero');
  const [isHovered, setIsHovered] = useState(false);

  const headline = heroData?.headline || siteContent.hero.headline;
  const ctaText = heroData?.cta_text || siteContent.hero.primaryCta.label;
  const ctaUrl = heroData?.cta_url || siteContent.contact.bookingUrl;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Clean neutral background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent" />
      </div>

      <div className="container-shell relative z-10 py-16 sm:py-20 lg:py-24 space-y-8 lg:space-y-10">
            {/* Headline + Image row */}
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              {/* Clean Headline - No color effects */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <h1 className="font-display text-4xl leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  {headline}
                </h1>
                {/* Simple gray line */}
                <div className="mt-6 h-0.5 w-24 bg-slate-300" />
              </div>
              
              {/* Clean Image Section */}
              <div 
                className="relative order-first lg:order-last animate-in fade-in slide-in-from-right-4 duration-700 delay-200"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative group">
                  {/* Neutral shadow */}
                  <div className="absolute -inset-3 bg-slate-200/60 rounded-2xl blur-xl transition-opacity duration-500 group-hover:opacity-80" />
                  
                  {/* Clean image container */}
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-shadow duration-500 group-hover:shadow-xl">
                    <div className="relative aspect-[3/4] lg:aspect-[4/5]">
                      <Image
                        src={heroData?.background_image_url || "/assets/people/hero.webp"}
                        alt="Dr. Stephen Asatsa"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Single neutral badge */}
                  <div className="absolute -top-2 -right-2 bg-slate-800 text-white p-2 rounded-lg shadow-md">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
                {heroData?.tagline || 'Senior Lecturer, licensed psychologist, and research leader advancing culturally grounded psychological science.'}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                Ready to partner with institutions, families, and research communities to strengthen mental health, cultural resilience, and scholarly impact.
              </p>
            </div>

            {/* Clean CTA Section */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    <span>{ctaText}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Link href="/contact">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact
                  </Link>
                </Button>
              </div>

              {/* Secondary Links */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <a href={heroData?.downloadCvUrl || '/Stephen_Asatsa-CV-2025.pdf'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
                <Link href={heroData?.researchLabUrl || '/research-hub'} className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Research Hub
                </Link>
                <Link href="/services" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">
                  <PhoneCall className="w-4 h-4" />
                  Services
                </Link>
                <a href="https://beautifulmind.cc/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  BeautifulMind
                </a>
              </div>

              {/* Professional Affiliations */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-3">Professional Affiliations</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <a href="https://www.srcd.org/about-us/who-we-are/governing-council" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">
                    SRCD Council
                  </a>
                  <a href="https://eapp.org/organization/regional-promoters/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">
                    EAPP Africa
                  </a>
                  <a href="https://issbd.org/publications-2/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">
                    ISSBD
                  </a>
                  <a href="https://loop.frontiersin.org/people/828729/editorial" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 underline decoration-slate-300 hover:decoration-slate-500 transition-colors">
                    Frontiers Editor
                  </a>
                </div>
              </div>
            </div>

      </div>

      {/* Clean scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-slate-300 to-transparent" />
        </div>
      </div>
    </section>
  );
}
