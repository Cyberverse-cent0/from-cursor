"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Microscope, BookOpen, Award, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { FloatingParticles } from "./floating-particles";
import { GradientOrb } from "./gradient-orb";
import { AnimatedStat } from "@/components/home/animated-stat";

const heroStats = [
  { value: 12, suffix: "", label: "Active Projects", icon: Microscope, color: "from-emerald-400 to-teal-500" },
  { value: 28, suffix: "", label: "Publications", icon: BookOpen, color: "from-blue-400 to-indigo-500" },
  { value: 15, suffix: "", label: "Awards", icon: Award, color: "from-amber-400 to-orange-500" },
  { value: 275, suffix: "k+", label: "Total Funding", icon: Sparkles, color: "from-purple-400 to-pink-500" },
];

export function ResearchHubHeroV2() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStat, setActiveStat] = useState<number | null>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Dynamic mouse-following background */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.25) 0%, transparent 50%)`,
        }}
      />

      {/* Animated gradient orbs */}
      <GradientOrb size={300} color="#8b5cf6, #a855f7" position={{ x: "10%", y: "10%" }} delay={0} />
      <GradientOrb size={250} color="#10b981, #14b8a6" position={{ x: "80%", y: "20%" }} delay={2000} />
      <GradientOrb size={280} color="#3b82f6, #6366f1" position={{ x: "60%", y: "70%" }} delay={4000} />
      <GradientOrb size={200} color="#f59e0b, #f97316" position={{ x: "20%", y: "60%" }} delay={3000} />

      {/* Floating particles */}
      <FloatingParticles count={25} colors={["bg-purple-400", "bg-emerald-400", "bg-blue-400", "bg-amber-400"]} />

      {/* Content Container */}
      <div className="relative z-10 container-shell py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm font-medium transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Zap className="w-4 h-4 animate-pulse" />
              Human Development, Indigenous Knowledge & Flourishing Lab
            </div>

            {/* Headline */}
            <h1
              className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                Research Hub
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-xl md:text-2xl text-purple-200 max-w-2xl leading-relaxed font-light transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Exploring culturally grounded psychology for African wellbeing through rigorous research and community engagement
            </p>

            {/* Quote */}
            <blockquote
              className={`border-l-4 border-purple-500 pl-6 transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-lg text-purple-300 italic">
                "Decolonizing knowledge. Building resilience. Bridging academia and community."
              </p>
            </blockquote>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 text-white border-0 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-500 group relative overflow-hidden"
              >
                <Link href="/research-hub/projects" className="flex items-center">
                  <span className="relative z-10 flex items-center">
                    Explore Projects
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-purple-500/50 text-purple-200 hover:bg-purple-500/20 hover:border-purple-400 px-8 py-6 text-lg font-semibold backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/research-hub/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div
            className={`relative transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Main visual card */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 rounded-3xl opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-purple-900/80 to-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
                {/* Brain icon header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Research Focus Areas</h3>
                    <p className="text-purple-300 text-sm">Core pillars of our work</p>
                  </div>
                </div>

                {/* Research areas grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Cultural Psychology", color: "from-purple-500 to-violet-600", percent: "35%" },
                    { name: "Developmental", color: "from-emerald-500 to-teal-600", percent: "25%" },
                    { name: "Clinical", color: "from-blue-500 to-indigo-600", percent: "20%" },
                    { name: "Personality", color: "from-amber-500 to-orange-600", percent: "15%" },
                  ].map((area, i) => (
                    <div
                      key={area.name}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group/card cursor-pointer"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${area.color} mb-2`} />
                      <div className="text-white font-medium text-sm">{area.name}</div>
                      <div className="text-purple-300 text-xs">{area.percent}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {heroStats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = activeStat === index;

            return (
              <div
                key={stat.label}
                className={`group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-500 cursor-pointer overflow-hidden ${
                  isActive ? "scale-105 shadow-2xl shadow-purple-500/20" : "hover:scale-102"
                }`}
                onMouseEnter={() => setActiveStat(index)}
                onMouseLeave={() => setActiveStat(null)}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg transition-all duration-500 ${
                      isActive ? "scale-125 rotate-6" : "group-hover:scale-110"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Value */}
                <div className="text-center">
                  <div
                    className={`font-display text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent transition-all duration-300 ${
                      isActive ? "scale-110" : ""
                    }`}
                  >
                    <AnimatedStat value={stat.value} suffix={stat.suffix} delay={800 + index * 200} />
                  </div>
                  <div className="text-purple-300 text-sm mt-1">{stat.label}</div>
                </div>

                {/* Sparkle on hover */}
                {isActive && <Sparkles className="absolute top-2 right-2 w-4 h-4 text-yellow-400 animate-pulse" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-400">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-purple-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
