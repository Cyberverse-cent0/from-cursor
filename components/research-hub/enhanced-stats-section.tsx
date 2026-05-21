"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { AnimatedStat } from "@/components/home/animated-stat";
import {
  Target,
  FileText,
  Trophy,
  Users,
  Globe,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const researchStats = [
  {
    value: 12,
    suffix: "",
    label: "Active Projects",
    description: "Currently ongoing research initiatives",
    icon: Target,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bgColor: "from-emerald-50 to-teal-50",
  },
  {
    value: 28,
    suffix: "",
    label: "Publications",
    description: "Peer-reviewed articles and papers",
    icon: FileText,
    color: "from-blue-500 via-indigo-500 to-violet-500",
    bgColor: "from-blue-50 to-indigo-50",
  },
  {
    value: 15,
    suffix: "",
    label: "Awards & Grants",
    description: "Recognition and funding received",
    icon: Trophy,
    color: "from-amber-500 via-orange-500 to-red-500",
    bgColor: "from-amber-50 to-orange-50",
  },
  {
    value: 25,
    suffix: "",
    label: "Collaborators",
    description: "Global research network",
    icon: Users,
    color: "from-purple-500 via-violet-500 to-pink-500",
    bgColor: "from-purple-50 to-violet-50",
  },
];

const impactMetrics = [
  { value: 91, suffix: "", label: "Citations", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
  { value: 15, suffix: "+", label: "Countries", icon: Globe, color: "from-blue-500 to-indigo-500" },
  { value: 3, suffix: "", label: "Major Grants", icon: Award, color: "from-amber-500 to-orange-500" },
  { value: 50, suffix: "+", label: "Total Papers", icon: BookOpen, color: "from-purple-500 to-pink-500" },
];

export function EnhancedStatsSection() {
  const [isInView, setIsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredImpact, setHoveredImpact] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("enhanced-stats");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="enhanced-stats"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse dark:bg-purple-900/30 dark:opacity-30" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000 dark:bg-emerald-900/30 dark:opacity-30" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000 dark:bg-amber-900/30 dark:opacity-30" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-3000 dark:bg-blue-900/30 dark:opacity-25" />

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, #10b981 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      <div className="container-shell relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 text-sm font-medium mb-6 transition-all duration-700 dark:from-purple-900/50 dark:to-emerald-900/50 dark:text-purple-300 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Zap className="w-4 h-4" />
            Research Impact
          </div>
          <h2
            className={`font-display text-5xl mb-4 bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent font-bold leading-tight transition-all duration-700 delay-100 dark:from-purple-400 dark:via-emerald-400 dark:to-blue-400 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            By The Numbers
          </h2>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed transition-all duration-700 delay-200 dark:text-muted-foreground ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Measurable impact through rigorous research and global collaboration
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {researchStats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredCard === index;

            return (
              <Card
                key={stat.label}
                className={`group relative p-8 transition-all duration-500 cursor-pointer border-2 overflow-hidden ${
                  isHovered
                    ? "border-transparent shadow-2xl scale-105"
                    : "border-slate-200/60 hover:border-slate-300/80 hover:shadow-xl hover:scale-[1.02] dark:border-border/40 dark:hover:border-border/60"
                } ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient background overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-60"
                  } dark:opacity-30 dark:group-hover:opacity-50`}
                />

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 transition-opacity duration-500 rounded-lg ${
                    isHovered ? "opacity-10" : ""
                  } dark:opacity-5 dark:group-hover:opacity-20`}
                />

                {/* Shine effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ${
                    isHovered ? "translate-x-full" : "-translate-x-full"
                  }`}
                  style={{ animation: isHovered ? "shimmer 2s infinite" : "none" }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-xl transition-all duration-500 relative ${
                        isHovered ? "scale-125 rotate-6" : "group-hover:scale-110"
                      }`}
                    >
                      <Icon className="h-8 w-8 relative z-10" />
                      {/* Icon glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-50 blur-lg transition-opacity duration-300 ${
                          isHovered ? "opacity-75" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-center mb-2">
                    <div
                      className={`font-display text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent transition-all duration-500 ${
                        isHovered ? "scale-110" : ""
                      }`}
                    >
                      <AnimatedStat value={stat.value} suffix={stat.suffix} delay={index * 200} />
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-800 mb-1 dark:text-foreground">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>

                {/* Sparkle effects */}
                <Sparkles
                  className={`absolute -top-2 -right-2 h-5 w-5 text-yellow-500 transition-all duration-500 ${
                    isHovered ? "opacity-100 animate-spin" : "opacity-0"
                  }`}
                />
                <Star
                  className={`absolute -bottom-2 -left-2 h-4 w-4 text-yellow-400 transition-all duration-700 delay-200 ${
                    isHovered ? "opacity-100 animate-pulse" : "opacity-0"
                  }`}
                />

                {/* Floating particles on hover */}
                {isHovered && (
                  <>
                    <div
                      className={`absolute top-3 right-3 w-2 h-2 bg-gradient-to-r ${stat.color} rounded-full animate-pulse`}
                    />
                    <div
                      className={`absolute bottom-3 left-3 w-1.5 h-1.5 bg-gradient-to-r ${stat.color} rounded-full animate-pulse animation-delay-200`}
                    />
                  </>
                )}
              </Card>
            );
          })}
        </div>

        {/* Impact Metrics Row */}
        <div
          className={`transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-foreground">Global Impact Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const isHovered = hoveredImpact === index;

              return (
                <div
                  key={metric.label}
                  className={`group p-6 rounded-2xl bg-white/80 border border-slate-200/60 hover:border-purple-500/30 transition-all duration-300 cursor-pointer text-center dark:bg-card/80 dark:border-border/40 dark:hover:border-purple-500/50 ${
                    isHovered ? "shadow-xl scale-105" : "hover:shadow-lg"
                  }`}
                  onMouseEnter={() => setHoveredImpact(index)}
                  onMouseLeave={() => setHoveredImpact(null)}
                >
                  <div className="flex justify-center mb-3">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-r ${metric.color} text-white shadow-md transition-all duration-300 ${
                        isHovered ? "scale-110" : ""
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div
                    className={`font-display text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                  >
                    <AnimatedStat value={metric.value} suffix={metric.suffix} delay={600 + index * 100} />
                  </div>
                  <div className="text-sm text-slate-600 mt-1 dark:text-muted-foreground">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credibility indicators */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 shadow-lg dark:from-card dark:to-muted dark:border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700 dark:text-foreground">Verified Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-1000" />
              <span className="text-sm font-medium text-slate-700 dark:text-foreground">Global Reach</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse animation-delay-2000" />
              <span className="text-sm font-medium text-slate-700 dark:text-foreground">Peer Reviewed</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        .animation-delay-3000 {
          animation-delay: 3000ms;
        }
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </section>
  );
}
