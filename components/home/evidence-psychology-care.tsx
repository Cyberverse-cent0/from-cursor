"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Brain, 
  Users, 
  Building, 
  Award, 
  TrendingUp,
  Sparkles,
  Target,
  Globe,
  BookOpen,
  Shield,
  Lightbulb,
  Activity,
  CheckCircle,
  Star
} from "lucide-react";

const evidenceBasedCare = [
  {
    title: "Evidence-Based Therapy",
    description: "Clinically proven therapeutic approaches with documented outcomes",
    icon: Brain,
    evidence: "85% success rate",
    approach: "Cognitive Behavioral Therapy",
    cultural: "Adapted for African contexts",
    outcomes: ["Reduced anxiety by 60%", "Improved coping skills", "Enhanced quality of life"]
  },
  {
    title: "Culturally Grounded Care",
    description: "Integrating traditional wisdom with modern psychology",
    icon: Heart,
    evidence: "92% client satisfaction",
    approach: "Community-based interventions",
    cultural: "Luhya mourning rituals integration",
    outcomes: ["Cultural validation", "Community acceptance", "Sustainable healing"]
  },
  {
    title: "Institutional Partnerships",
    description: "Collaborating with healthcare and educational institutions",
    icon: Building,
    evidence: "15+ partner institutions",
    approach: "Integrated care systems",
    cultural: "Multi-disciplinary collaboration",
    outcomes: ["Improved access", "Resource optimization", "Enhanced care coordination"]
  }
];

const institutions = [
  {
    name: "Catholic University of Eastern Africa",
    role: "Department Head - Psychology",
    impact: "Leading research and curriculum development",
    image: "university"
  },
  {
    name: "BeautifulMind Consultants",
    role: "Co-founder & Clinical Director",
    impact: "Mental health social enterprise",
    image: "clinic"
  },
  {
    name: "JENGA Psychosocial Network",
    role: "Founder & Director",
    impact: "Community-based mental health services",
    image: "community"
  }
];

export function EvidencePsychologyCare() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('evidence-psychology-care');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="evidence-psychology-care" className="relative min-h-screen overflow-hidden">
      {/* Multi-layer furniture background */}
      <div className="absolute inset-0">
        {/* Base layer - Furniture pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='furniture' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect x='20' y='20' width='15' height='40' fill='%23f3e8ff' opacity='0.3'/%3E%3Crect x='60' y='30' width='20' height='25' fill='%23e8f5e8' opacity='0.3'/%3E%3Ccircle cx='85' cy='25' r='8' fill='%23f0e6ff' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23furniture)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
        
        {/* Middle layer - Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-orange-50/30 to-rose-50/20" />
        
        {/* Top layer - Parallax furniture elements */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute top-20 left-10 w-32 h-24 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-lg shadow-xl transform rotate-12" />
          <div className="absolute top-40 right-20 w-28 h-20 bg-gradient-to-br from-rose-200/40 to-pink-200/40 rounded-lg shadow-xl transform -rotate-6" />
          <div className="absolute bottom-32 left-1/4 w-36 h-16 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-lg shadow-xl transform rotate-3" />
        </div>
        
        {/* Dynamic overlay based on scroll */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/10 to-purple-900/30 transition-all duration-1000"
          style={{
            opacity: Math.min(scrollY / 500, 0.3)
          }}
        />
      </div>

      <div className="relative z-10 container-shell py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-rose-600/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
            <Shield className="w-5 h-5" />
            Evidence-Based Psychological Care
          </div>
          <h2 className="font-display text-5xl md:text-6xl mb-6 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 bg-clip-text text-transparent font-bold leading-tight">
            Culturally Grounded Scholarship
          </h2>
          <p className="text-slate-700 max-w-3xl mx-auto text-xl leading-relaxed">
            Integrating evidence-based practices with cultural wisdom to shape healthier futures for individuals and institutions
          </p>
        </div>

        {/* Evidence-Based Care Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {evidenceBasedCare.map((care, index) => {
            const Icon = care.icon;
            const isActive = activeCard === index;
            
            return (
              <div
                key={care.title}
                className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Card 
                  className={`relative p-8 transition-all duration-1000 cursor-pointer border-2 ${
                    isActive 
                      ? 'border-purple-500 shadow-2xl scale-105' 
                      : 'border-transparent hover:border-purple-300 hover:shadow-xl hover:scale-102'
                  } bg-white/90 backdrop-blur-md overflow-hidden`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Opacity layer effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-rose-500/10 rounded-lg transition-opacity duration-1000 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  <div className="relative z-10 space-y-6">
                    {/* Icon with glow */}
                    <div className="flex justify-center">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-rose-500 text-white shadow-2xl transition-all duration-700 ${
                        isActive ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                      }`}>
                        <Icon className="w-10 h-10" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-slate-900">{care.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{care.description}</p>
                      
                      {/* Evidence badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        {care.evidence}
                      </div>
                      
                      {/* Approach */}
                      <div className="space-y-2">
                        <p className="text-sm text-slate-700 font-medium">Approach:</p>
                        <p className="text-sm text-purple-600 font-semibold">{care.approach}</p>
                      </div>
                      
                      {/* Cultural integration */}
                      <div className="space-y-2">
                        <p className="text-sm text-slate-700 font-medium">Cultural Adaptation:</p>
                        <p className="text-sm text-rose-600 font-semibold">{care.cultural}</p>
                      </div>
                      
                      {/* Outcomes */}
                      {isActive && (
                        <div className="space-y-2 animate-fade-in">
                          <p className="text-sm text-slate-700 font-medium">Key Outcomes:</p>
                          {care.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-emerald-600">
                              <Star className="w-3 h-3" />
                              {outcome}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Institutional Partnerships */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent mb-4">
              Institutional Partnerships
            </h3>
            <p className="text-slate-700 text-lg max-w-2xl mx-auto">
              Collaborating with leading institutions to advance psychological care and education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {institutions.map((institution, index) => (
              <div
                key={institution.name}
                className={`${isInView ? 'animate-slide-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <Card className="p-6 bg-white/80 backdrop-blur-md border border-purple-200 hover:border-purple-400 transition-all duration-700 hover:shadow-xl hover:scale-105">
                  <div className="space-y-4">
                    {/* Institution icon */}
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shadow-xl">
                        {institution.image === 'university' && <Building className="w-8 h-8" />}
                        {institution.image === 'clinic' && <Heart className="w-8 h-8" />}
                        {institution.image === 'community' && <Users className="w-8 h-8" />}
                      </div>
                    </div>
                    
                    {/* Institution details */}
                    <div className="text-center space-y-2">
                      <h4 className="text-lg font-bold text-slate-900">{institution.name}</h4>
                      <p className="text-sm text-purple-600 font-semibold">{institution.role}</p>
                      <p className="text-sm text-slate-600">{institution.impact}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Healthier Futures CTA */}
        <div className="text-center">
          <div className="relative inline-block group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
            
            <Button
              size="lg"
              className="relative px-12 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 text-white border-0 rounded-full shadow-2xl transition-all duration-1000 group-hover:scale-110 group-hover:shadow-purple-500/50 group-hover:shadow-3xl overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <span className="relative z-10 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 group-hover:animate-pulse" />
                Shape Healthier Futures
                <Target className="w-6 h-6 group-hover:animate-bounce" />
              </span>
            </Button>
          </div>
          
          <p className="mt-6 text-slate-700 text-lg animate-pulse">
            Together, we're building a foundation for evidence-based, culturally responsive psychological care
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
