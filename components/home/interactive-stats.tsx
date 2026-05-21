"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Globe, 
  Award, 
  Heart,
  Brain,
  Target,
  Zap,
  Sparkles,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

const interactiveStats = [
  {
    title: "Research Impact",
    value: 91,
    suffix: "citations",
    icon: Brain,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    trend: "+23%",
    description: "Total research citations across all publications"
  },
  {
    title: "Global Reach",
    value: 15,
    suffix: "countries",
    icon: Globe,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    trend: "+5",
    description: "Countries with collaborative research partnerships"
  },
  {
    title: "Publications",
    value: 10,
    suffix: "papers",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    trend: "+4",
    description: "Peer-reviewed publications in 2024-2025"
  },
  {
    title: "Research Grants",
    value: 3,
    suffix: "major",
    icon: Award,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    trend: "+2",
    description: "Major research grants and funding awards"
  }
];

const researchAreas = [
  { name: "Cultural Psychology", value: 35, color: "from-purple-500 to-violet-600" },
  { name: "Developmental Psychology", value: 25, color: "from-emerald-500 to-teal-600" },
  { name: "Clinical Psychology", value: 20, color: "from-blue-500 to-indigo-600" },
  { name: "Personality Psychology", value: 15, color: "from-amber-500 to-orange-600" },
  { name: "Cultural Evolution", value: 5, color: "from-rose-500 to-pink-600" }
];

const collaborationMetrics = [
  { year: "2020", publications: 2, collaborations: 5 },
  { year: "2021", publications: 3, collaborations: 8 },
  { year: "2022", publications: 4, collaborations: 12 },
  { year: "2023", publications: 6, collaborations: 15 },
  { year: "2024", publications: 8, collaborations: 20 },
  { year: "2025", publications: 10, collaborations: 25 }
];

export function InteractiveStats() {
  const [activeStat, setActiveStat] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(
    interactiveStats.map(() => 0)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('interactive-stats');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = interactiveStats.map(stat => stat.value / steps);
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedValues(interactiveStats.map(stat => stat.value));
        } else {
          setAnimatedValues(prev => 
            prev.map((val, idx) => Math.min(val + increment[idx], interactiveStats[idx].value))
          );
        }
      }, duration / steps);
    }
  }, [isInView]);

  return (
    <section id="interactive-stats" className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000" />
      </div>

      <div className="container-shell relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            Interactive Analytics
          </div>
          <h2 className="font-display text-5xl mb-6 bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent font-bold leading-tight">
            Research Impact Dashboard
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
            Real-time visualization of research impact, collaborations, and academic contributions
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {interactiveStats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = activeStat === index;
            
            return (
              <Card
                key={index}
                className={`relative p-6 transition-all duration-500 cursor-pointer border-2 ${
                  isActive 
                    ? 'border-purple-500 shadow-2xl scale-105' 
                    : 'border-transparent hover:border-gray-200 hover:shadow-lg'
                } ${stat.bgColor}`}
                onMouseEnter={() => setActiveStat(index)}
                onMouseLeave={() => setActiveStat(-1)}
              >
                {/* Glow effect */}
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 rounded-lg pointer-events-none`} />
                )}
                
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{stat.trend}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Value */}
                  <div>
                    <div className={`font-display text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {Math.round(animatedValues[index])}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.suffix}</div>
                  </div>
                  
                  {/* Title and description */}
                  <div>
                    <h3 className="font-semibold text-slate-900">{stat.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                </div>
                
                {/* Sparkle effect */}
                {isActive && (
                  <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-500 animate-pulse" />
                )}
              </Card>
            );
          })}
        </div>

        {/* Research Areas Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-slate-900">Research Focus Areas</h3>
            </div>
            
            <div className="space-y-4">
              {researchAreas.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">{area.name}</span>
                    <span className="text-sm text-muted-foreground">{area.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${area.color} transition-all duration-1000`}
                      style={{ 
                        width: isInView ? `${area.value}%` : '0%',
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-900">Growth Timeline</h3>
            </div>
            
            <div className="space-y-4">
              {collaborationMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-slate-600">{metric.year}</div>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ 
                          width: isInView ? `${(metric.publications / 10) * 100}%` : '0%',
                          animationDelay: `${index * 150}ms`
                        }}
                      >
                        <span className="text-xs text-white font-medium">{metric.publications}</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ 
                          width: isInView ? `${(metric.collaborations / 25) * 100}%` : '0%',
                          animationDelay: `${index * 150}ms`
                        }}
                      >
                        <span className="text-xs text-white font-medium">{metric.collaborations}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded" />
                  <span>Publications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded" />
                  <span>Collaborations</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievement Badges */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-lg">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-slate-900">Research Excellence</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-slate-900">Global Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600" />
              <span className="font-semibold text-slate-900">Community Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
