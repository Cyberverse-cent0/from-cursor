"use client";

import { AnimatedStat } from "@/components/home/animated-stat";
import { useState, useEffect } from "react";
import { TrendingUp, Award, Users, BookOpen, Sparkles, Trophy, Target, Zap, Star } from "lucide-react";

const statIcons = [Trophy, Target, Users, BookOpen];
const statColors = [
  "from-emerald-500 via-teal-500 to-blue-500",
  "from-purple-500 via-violet-600 to-indigo-600", 
  "from-amber-500 via-orange-500 to-red-500",
  "from-rose-500 via-pink-500 to-purple-500"
];
const statBgColors = [
  "bg-emerald-50 hover:bg-emerald-100",
  "bg-purple-50 hover:bg-purple-100",
  "bg-amber-50 hover:bg-amber-100", 
  "bg-rose-50 hover:bg-rose-100"
];

export function StatisticsSection() {
  const [stats, setStats] = useState<Array<{ value: number; suffix: string; label: string }>>([
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: 50, suffix: "+", label: "Publications" },
    { value: 1000, suffix: "+", label: "People Helped" },
    { value: 25, suffix: "+", label: "Research Projects" },
  ]);

  useEffect(() => {
    // Try to fetch from API, but use default values if it fails
    fetch("/api/statistics")
      .then(res => res.json())
      .then(data => {
        if (data.statistics && data.statistics.length > 0) {
          setStats(data.statistics.map((stat: any) => ({
            value: stat.value,
            suffix: stat.suffix || "+",
            label: stat.label
          })));
        }
      })
      .catch(() => {
        // Silently use default stats - no action needed
        console.log("Using default statistics values");
      });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        {/* Floating gradient orbs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-lg opacity-15 animate-bounce" />
        <div className="absolute bottom-1/3 right-10 w-28 h-28 bg-rose-100 rounded-full mix-blend-multiply filter blur-lg opacity-15 animate-pulse animation-delay-1000" />
        <div className="absolute top-1/2 left-1/6 w-20 h-20 bg-indigo-100 rounded-full mix-blend-multiply filter blur-lg opacity-15 animate-bounce animation-delay-3000" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #10b981 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-1/3 w-8 h-8 border-2 border-purple-300 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-20 right-1/3 w-6 h-6 border-2 border-emerald-300 rotate-12 animate-spin" style={{ animationDuration: '15s' }} />
        <div className="absolute top-1/2 right-20 w-10 h-10 border-2 border-amber-300 rounded-full animate-pulse" />
      </div>
      
      <div className="container-shell relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Proven Track Record
          </div>
          <h2 className="font-display text-5xl mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent font-bold leading-tight">
            Impact & Experience
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
            Years of dedicated service in psychology, research, and academic leadership with measurable results
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = statIcons[index];
            const colorClass = statColors[index];
            const bgClass = statBgColors[index];
            
            return (
              <div 
                key={index} 
                className={`group relative ${bgClass} rounded-3xl p-8 transition-all duration-700 hover:scale-[1.05] hover:shadow-2xl cursor-pointer border border-white/50 backdrop-blur-sm overflow-hidden`}
              >
                {/* Enhanced glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} rounded-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700`} />
                
                {/* Floating particles */}
                <div className={`absolute top-3 right-3 w-2 h-2 bg-gradient-to-r ${colorClass} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:animate-pulse`} />
                <div className={`absolute bottom-3 left-3 w-1.5 h-1.5 bg-gradient-to-r ${colorClass} rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 group-hover:animate-pulse animation-delay-200`} />
                
                {/* Icon with enhanced effects */}
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${colorClass} text-white shadow-xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative`}>
                    <Icon className="h-8 w-8 relative z-10" />
                    {/* Icon glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} rounded-2xl opacity-50 blur-lg transition-opacity duration-300 group-hover:opacity-75`} />
                  </div>
                </div>
                
                {/* Enhanced stat number */}
                <div className="text-center mb-3">
                  <div className={`font-display text-5xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500 leading-tight`}>
                    <AnimatedStat value={stat.value} suffix={stat.suffix} delay={index * 200} />
                  </div>
                </div>
                
                {/* Enhanced label */}
                <div className="text-center">
                  <div className="text-base font-semibold text-slate-700 group-hover:text-slate-900 transition-all duration-500 leading-tight">
                    {stat.label}
                  </div>
                </div>
                
                {/* Enhanced sparkle effects */}
                <Sparkles className={`absolute -top-3 -right-3 h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-500`} />
                <Star className={`absolute -bottom-3 -left-3 h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700 animation-delay-300`} />
                
                {/* Card shine effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ${'opacity-0 -translate-x-full group-hover:opacity-100 group-hover:translate-x-full'}`} 
                     style={{ 
                       animation: 'statShine 2s infinite'
                     }} />
              </div>
            );
          })}
        </div>
        
        {/* Additional credibility indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">Verified Results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-1000" />
              <span className="text-sm font-medium text-slate-700">Global Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse animation-delay-2000" />
              <span className="text-sm font-medium text-slate-700">Expert Leadership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
