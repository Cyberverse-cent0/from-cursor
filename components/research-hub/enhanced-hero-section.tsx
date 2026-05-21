"use client";

import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { ActionButton, ActionButtonGroup } from "@/components/buttons/action-button";
import { AnimatedButtonGroup } from "@/components/ui/animated-button";
import { Target, FileText, Users, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface EnhancedHeroSectionProps {
  className?: string;
}

export function EnhancedHeroSection({ className }: EnhancedHeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`relative min-h-[60vh] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E] via-teal-700 to-emerald-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        {/* Subtle Kenyan cultural pattern overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center space-y-8 px-6 max-w-6xl mx-auto">
        {/* Main Headlines */}
        <div className={`space-y-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight dark:text-primary-foreground">
            Research Hub
          </h1>
          <h2 className="text-xl md:text-3xl text-emerald-100 max-w-4xl mx-auto leading-relaxed font-light dark:text-muted-foreground">
            Exploring culturally grounded psychology for African wellbeing
          </h2>
          <p className="text-lg text-emerald-200 max-w-3xl mx-auto italic dark:text-muted-foreground/80">
            "Decolonizing knowledge. Building resilience. Bridging academia and community."
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <AnimatedButtonGroup 
            actions={["explore-research", "book-consultation"]}
            size="lg"
            staggerDelay={0.2}
          />
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent dark:from-black/80 dark:to-transparent">
        <div className="container-shell py-8">
          <div className={`grid gap-6 md:grid-cols-4 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 dark:text-primary-foreground">12</div>
              <div className="text-emerald-200 text-sm font-medium dark:text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 dark:text-primary-foreground">28</div>
              <div className="text-emerald-200 text-sm font-medium dark:text-muted-foreground">Publications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 dark:text-primary-foreground">15</div>
              <div className="text-emerald-200 text-sm font-medium dark:text-muted-foreground">Awards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 dark:text-primary-foreground">$275k+</div>
              <div className="text-emerald-200 text-sm font-medium dark:text-muted-foreground">Total Funding</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
