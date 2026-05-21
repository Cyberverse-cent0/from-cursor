"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Award, 
  Globe, 
  BookOpen, 
  TrendingUp, 
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Star
} from "lucide-react";

const journeyMilestones = [
  {
    period: "2008-2018",
    title: "Academic Foundation",
    description: "Built strong educational foundation with advanced degrees in Counseling Psychology",
    icon: GraduationCap,
    achievements: [
      "PhD in Counseling Psychology",
      "Master's in Counseling Psychology",
      "Bachelor's in Education"
    ],
    status: "completed",
    color: "from-blue-600 via-indigo-500 to-violet-600",
    accentColor: "bg-blue-500",
    glowColor: "shadow-blue-500/50",
    darkGlow: "dark:shadow-blue-400/30",
    bgGradient: "from-blue-50/80 via-indigo-50/60 to-violet-50/80 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-violet-950/40",
    borderGradient: "from-blue-400/50 via-indigo-400/50 to-violet-400/50",
    badgeGradient: "from-blue-600 to-violet-600",
    opacity: 90
  },
  {
    period: "2018-2020",
    title: "Clinical Practice",
    description: "Established clinical practice and began research in trauma and African psychology",
    icon: BookOpen,
    achievements: [
      "Licensed Clinical Psychologist",
      "Research publications",
      "Community mental health initiatives"
    ],
    status: "completed",
    color: "from-cyan-500 via-blue-500 to-indigo-600",
    glowColor: "shadow-blue-500/40",
    darkGlow: "dark:shadow-blue-400/25",
    bgGradient: "from-cyan-50/70 via-blue-50/60 to-indigo-50/70 dark:from-cyan-950/35 dark:via-blue-950/30 dark:to-indigo-950/35",
    badgeGradient: "from-cyan-500 to-indigo-600"
  },
  {
    period: "2020-2022",
    title: "Institutional Leadership",
    description: "Appointed Department Head at CUEA and founded mental health organizations",
    icon: Award,
    achievements: [
      "Department Head - Psychology",
      "Founder - BeautifulMind Consultants",
      "Founder - JENGA Psychosocial Network"
    ],
    status: "completed",
    color: "from-violet-500 via-purple-500 to-pink-600",
    glowColor: "shadow-purple-500/40",
    darkGlow: "dark:shadow-purple-400/25",
    bgGradient: "from-violet-50/70 via-purple-50/60 to-pink-50/70 dark:from-violet-950/35 dark:via-purple-950/30 dark:to-pink-950/35",
    badgeGradient: "from-violet-500 to-pink-600"
  },
  {
    period: "2022-Present",
    title: "Global Impact",
    description: "HRAF Global Scholar leading international research collaborations",
    icon: Globe,
    achievements: [
      "HRAF Global Scholar",
      "15+ countries research impact",
      "91 research citations",
      "Templeton Foundation grants"
    ],
    status: "current",
    color: "from-amber-500 via-orange-500 to-red-600",
    glowColor: "shadow-orange-500/40",
    darkGlow: "dark:shadow-orange-400/25",
    bgGradient: "from-amber-50/70 via-orange-50/60 to-red-50/70 dark:from-amber-950/35 dark:via-orange-950/30 dark:to-red-950/35",
    badgeGradient: "from-amber-500 to-red-600"
  }
];

export function EnhancedJourney() {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('enhanced-journey');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="enhanced-journey" className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Background decoration with dark mode support */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-emerald-200 dark:bg-emerald-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-15 animate-pulse animation-delay-4000" />
      </div>

      <div className="container-shell relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/60 dark:to-blue-900/60 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4" />
            Professional Journey
          </div>
          <h2 className="font-display text-5xl mb-4 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-bold leading-tight">
            A Decade of Excellence
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-xl leading-relaxed">
            From academic foundation to global leadership, a journey marked by continuous growth and impact
          </p>
        </div>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Timeline line with opacity */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500/80 via-blue-500/80 to-purple-500/80 dark:from-emerald-500/60 dark:via-blue-500/60 dark:to-purple-500/60 rounded-full transform -translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-12">
            {journeyMilestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isActive = activeMilestone === index;
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={milestone.title}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} ${
                    isInView ? 'animate-slide-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card
                      className={`p-6 transition-all duration-500 border-2 relative overflow-hidden ${
                        isActive
                          ? `border-transparent shadow-2xl scale-105 ${milestone.glowColor || 'shadow-emerald-500/50'} ${milestone.darkGlow || 'dark:shadow-emerald-400/30'}`
                          : 'border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300/80 dark:hover:border-slate-600/80 hover:shadow-xl hover:scale-[1.02]'
                      } cursor-pointer bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm`}
                      onMouseEnter={() => setActiveMilestone(index)}
                      onMouseLeave={() => setActiveMilestone(null)}
                    >
                      {/* Animated gradient background overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${milestone.bgGradient || 'from-emerald-50/60 to-blue-50/60 dark:from-emerald-950/30 dark:to-blue-950/30'} opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`} />

                      {/* Border gradient effect */}
                      {isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${milestone.borderGradient || 'from-emerald-400/50 to-blue-400/50'} opacity-20 rounded-lg`} />
                      )}

                      <div className="relative z-10 space-y-4">
                        {/* Period Badge with enhanced colors */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${milestone.badgeGradient || 'from-emerald-100 to-blue-100'} ${milestone.status === 'completed' ? 'text-blue-700 dark:text-blue-300' : 'text-amber-700 dark:text-amber-300'} text-sm font-bold shadow-sm backdrop-blur-sm`}>
                          <Calendar className="w-4 h-4" />
                          {milestone.period}
                        </div>

                        {/* Title with gradient effect */}
                        <h3 className={`text-2xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                          {milestone.title}
                        </h3>

                        {/* Description with opacity */}
                        <p className="text-slate-600/90 dark:text-slate-400/90 leading-relaxed">
                          {milestone.description}
                        </p>

                        {/* Achievements with enhanced styling */}
                        <div className={`space-y-2 transition-all duration-300 ${isActive ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'}`}>
                          {milestone.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 p-2 rounded-lg backdrop-blur-sm">
                              <div className={`p-1 rounded-full bg-gradient-to-r ${milestone.color} text-white shadow-sm`}>
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <span className="font-medium">{achievement}</span>
                            </div>
                          ))}
                        </div>

                        {/* Status Indicator with glow */}
                        <div className="flex items-center gap-2">
                          {milestone.status === 'completed' ? (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 backdrop-blur-sm">
                              <CheckCircle2 className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                              <span className="text-sm font-semibold">Completed</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 backdrop-blur-sm">
                              <Sparkles className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                              <span className="text-sm font-semibold">Current Focus</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Timeline Node with glow effect */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${milestone.color} text-white shadow-2xl transition-all duration-500 relative ${
                      isActive ? `scale-125 ${milestone.glowColor} ${milestone.darkGlow}` : 'scale-100'
                    }`}>
                      {/* Glow ring */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${milestone.color} opacity-30 blur-md transition-all duration-500 ${isActive ? 'scale-150' : 'scale-100'}`} />
                      <Icon className="w-6 h-6 relative z-10" />
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="flex-1"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary with dark mode */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "15+", label: "Years Experience", icon: Calendar, color: "from-emerald-500 to-teal-500" },
            { value: "91", label: "Research Citations", icon: BookOpen, color: "from-blue-500 to-indigo-500" },
            { value: "15+", label: "Countries Impact", icon: Globe, color: "from-purple-500 to-pink-500" },
            { value: "4", label: "Leadership Roles", icon: Award, color: "from-amber-500 to-orange-500" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`text-center p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/60 hover:border-slate-300/80 dark:hover:border-slate-600/80 hover:shadow-xl hover:shadow-${stat.color.split(' ')[1].replace('to-', '')}/20 dark:hover:shadow-${stat.color.split(' ')[1].replace('to-', '')}/10 transition-all duration-300 backdrop-blur-sm ${
                  isInView ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700"
          >
            View Complete Journey
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </section>
  );
}
