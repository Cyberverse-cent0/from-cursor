"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Heart, 
  Users, 
  Building, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Leaf
} from "lucide-react";

const careApproaches = [
  {
    title: "Evidence-Based Therapy",
    description: "Clinically proven therapeutic approaches with documented outcomes and measurable results",
    icon: Brain,
    color: "from-slate-700 to-slate-900",
    accent: "bg-slate-100",
    outcomes: ["85% success rate", "Reduced anxiety by 60%", "Improved coping skills"]
  },
  {
    title: "Culturally Grounded Care",
    description: "Integrating traditional wisdom with modern psychology for culturally sensitive treatment",
    icon: Heart,
    color: "from-stone-700 to-stone-900",
    accent: "bg-stone-100",
    outcomes: ["92% client satisfaction", "Cultural validation", "Sustainable healing"]
  },
  {
    title: "Institutional Partnerships",
    description: "Collaborating with healthcare and educational institutions for integrated care systems",
    icon: Building,
    color: "from-zinc-700 to-zinc-900",
    accent: "bg-zinc-100",
    outcomes: ["15+ partner institutions", "Resource optimization", "Enhanced coordination"]
  }
];

const institutions = [
  {
    name: "Catholic University of Eastern Africa",
    role: "Department Head - Psychology",
    icon: Building,
    initials: "CUEA"
  },
  {
    name: "BeautifulMind Consultants",
    role: "Co-founder & Clinical Director",
    icon: Heart,
    initials: "BMC"
  },
  {
    name: "JENGA Psychosocial Network",
    role: "Founder & Director",
    icon: Users,
    initials: "JENGA"
  }
];

export function ProfessionalCare() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="professional-care" 
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Sophisticated background with subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-stone-50">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(slate-900 1px, transparent 1px), linear-gradient(90deg, slate-900 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Soft gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-stone-200/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-slate-200/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-shell relative z-10">
        {/* Elegant Header with refined typography */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Subtle eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-stone-400 to-transparent" />
            <span className="text-stone-500 text-sm tracking-[0.2em] uppercase font-medium">
              Clinical Excellence
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-stone-400 to-transparent" />
          </div>
          
          {/* Main heading with elegant styling */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-slate-900 font-light leading-[1.1]">
            <span className="font-normal">Evidence-Based</span>{" "}
            <span className="italic font-extralight text-stone-600">Psychological</span>{" "}
            <span className="font-normal">Care</span>
          </h2>
          
          {/* Refined subheading */}
          <p className="text-stone-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Culturally grounded scholarship for people and institutions shaping healthier futures
          </p>
        </div>

        {/* Care Approaches - Elegant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {careApproaches.map((care, index) => {
            const Icon = care.icon;
            
            return (
              <div 
                key={care.title}
                className={`transition-all duration-700 delay-${index * 150} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="group h-full bg-white/80 backdrop-blur-sm border border-stone-200/60 hover:border-stone-300/80 transition-all duration-500 hover:shadow-xl hover:shadow-stone-900/5 overflow-hidden">
                  {/* Subtle top accent line */}
                  <div className={`h-1 bg-gradient-to-r ${care.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="p-8 space-y-6">
                    {/* Refined icon treatment */}
                    <div className="flex items-center gap-4">
                      <div className={`p-3 ${care.accent} rounded-2xl transition-all duration-500 group-hover:scale-110`}>
                        <Icon className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-stone-200 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                        {care.title}
                      </h3>
                      <p className="text-stone-600 leading-relaxed font-light">
                        {care.description}
                      </p>
                      
                      {/* Elegant outcomes */}
                      <div className="pt-4 space-y-3">
                        {care.outcomes.map((outcome, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-3 text-sm text-stone-700 group/item hover:text-slate-900 transition-colors"
                          >
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-stone-700" strokeWidth={2} />
                            </div>
                            <span className="font-light">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Institutional Partnerships - Horizontal Layout */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <span className="text-stone-400 text-sm tracking-[0.15em] uppercase">Trusted Partnerships</span>
          </div>
          
          {/* Elegant horizontal institution cards */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
            {institutions.map((institution, index) => (
              <div 
                key={institution.name}
                className="flex-1 max-w-sm"
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <Card className="group h-full p-6 bg-gradient-to-br from-white to-stone-50/50 border border-stone-200/60 hover:border-stone-300/80 transition-all duration-500 hover:shadow-lg hover:shadow-stone-900/5">
                  <div className="flex items-center gap-4">
                    {/* Initials badge */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-stone-800 to-slate-900 text-white flex items-center justify-center font-medium text-sm tracking-tight shadow-lg shadow-stone-900/20 group-hover:shadow-xl group-hover:shadow-stone-900/30 transition-all duration-500">
                      {institution.initials}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-medium text-slate-900 leading-tight mb-1 truncate">
                        {institution.name}
                      </h4>
                      <p className="text-sm text-stone-500 font-light">
                        {institution.role}
                      </p>
                    </div>
                    
                    {/* Subtle arrow indicator */}
                    <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-stone-500 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Refined CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button 
            size="lg"
            className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base font-light tracking-wide transition-all duration-500 hover:shadow-xl hover:shadow-slate-900/20 rounded-full"
          >
            <span>Explore Our Approach</span>
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}
