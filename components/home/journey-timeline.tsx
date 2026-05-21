"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Award, 
  Users, 
  BookOpen, 
  Globe, 
  Heart, 
  Brain, 
  Target,
  TrendingUp,
  Sparkles,
  Zap,
  ChevronRight
} from "lucide-react";

const journeyMilestones = [
  {
    year: "2008-2018",
    title: "Academic Foundation",
    description: "Built strong educational foundation with advanced degrees in Counseling Psychology",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    achievements: [
      "PhD in Counseling Psychology",
      "Master's in Counseling Psychology", 
      "Bachelor's in Education"
    ],
    status: "completed"
  },
  {
    year: "2018-2020",
    title: "Professional Practice",
    description: "Established clinical practice and founded BeautifulMind Consultants",
    icon: Heart,
    color: "from-rose-500 to-pink-600", 
    achievements: [
      "Licensed Psychologist",
      "BeautifulMind Consultants Co-founder",
      "Clinical Practice Established"
    ],
    status: "completed"
  },
  {
    year: "2020-2023",
    title: "Research Excellence",
    description: "Led major research projects and gained international recognition",
    icon: Brain,
    color: "from-purple-500 to-violet-600",
    achievements: [
      "HRAF Global Scholar",
      "Templeton Foundation Grant",
      "Multiple Publications"
    ],
    status: "completed"
  },
  {
    year: "2023-Present",
    title: "Global Leadership",
    description: "Serving on international councils and leading cross-cultural research",
    icon: Globe,
    color: "from-emerald-500 to-teal-600",
    achievements: [
      "SRCD Governing Council",
      "Africa Long Life Study",
      "ERC Consolidator Grant 2025"
    ],
    status: "current"
  }
];

export function JourneyTimeline() {
  const [activeMilestone, setActiveMilestone] = useState(0);
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

    const element = document.getElementById('journey-timeline');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey-timeline" className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-20" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-20 animation-delay-1000" />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-20 animation-delay-2000" />
      </div>

      <div className="container-shell relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Professional Journey
          </div>
          <h2 className="font-display text-5xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent font-bold leading-tight">
            A Decade of Excellence
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
            From academic foundation to global leadership, a journey marked by continuous growth and impact
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-emerald-200 rounded-full" />
          
          {/* Timeline dots */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full -top-2" />
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-purple-500 rounded-full top-1/3" />
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-rose-500 rounded-full top-2/3" />
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-emerald-500 rounded-full -bottom-2" />

          {/* Milestones */}
          <div className="space-y-12">
            {journeyMilestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isLeft = index % 2 === 0;
              const isActive = activeMilestone === index;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card 
                      className={`p-6 transition-all duration-500 cursor-pointer border-2 ${
                        isActive 
                          ? `border-${milestone.color.split(' ')[1]} shadow-2xl scale-105` 
                          : 'border-transparent hover:border-gray-200 hover:shadow-lg'
                      }`}
                      onMouseEnter={() => setActiveMilestone(index)}
                      onMouseLeave={() => setActiveMilestone(-1)}
                    >
                      {/* Year badge */}
                      <div className="mb-4">
                        <Badge 
                          variant="outline" 
                          className={`bg-gradient-to-r ${milestone.color} text-white border-0 font-semibold`}
                        >
                          {milestone.year}
                        </Badge>
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-gradient-to-r ${milestone.color} text-white shadow-lg`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold text-xl text-slate-900">{milestone.title}</h3>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                        
                        {/* Achievements */}
                        <div className="space-y-2">
                          {milestone.achievements.map((achievement, achIndex) => (
                            <div 
                              key={achIndex}
                              className="flex items-center gap-2 text-sm text-slate-600"
                              style={{
                                animationDelay: isActive ? `${achIndex * 100}ms` : '0ms',
                                animation: isActive ? 'slideInLeft 0.5s ease-out forwards' : 'none',
                                opacity: isActive ? 1 : 0.8,
                                transform: isActive ? 'translateX(0)' : isLeft ? 'translateX(-10px)' : 'translateX(10px)'
                              }}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${milestone.color}`} />
                              {achievement}
                            </div>
                          ))}
                        </div>
                        
                        {/* Status indicator */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              milestone.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'
                            }`} />
                            <span className="text-xs font-medium text-slate-500">
                              {milestone.status === 'completed' ? 'Completed' : 'In Progress'}
                            </span>
                          </div>
                          
                          {milestone.status === 'current' && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Sparkles className="w-4 h-4 animate-pulse" />
                              <span className="text-xs font-medium">Current</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Hover effects */}
                      {isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${milestone.color} opacity-5 rounded-lg pointer-events-none`} />
                      )}
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">75% Complete</span>
            </div>
            <div className="text-sm text-muted-foreground">Journey to Global Excellence</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
