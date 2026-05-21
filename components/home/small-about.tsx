"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Heart, 
  Users, 
  BookOpen, 
  Award, 
  Globe,
  Sparkles,
  Star
} from "lucide-react";

export function SmallAbout() {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      id="small-about" 
      className="py-16 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Background with opacity effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:2000ms]" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse [animation-delay:4000ms]" />
      </div>

      <div className="container-shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Meet Dr. Stephen Asatsa
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl mb-6 bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent font-bold leading-tight">
              A Leader in Psychology & Research
            </h2>
            
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Dr. Stephen Asatsa is a Counseling Psychologist and Head of the Department of Psychology at the Catholic University of Eastern Africa. With a PhD in Counseling Psychology, his research specializes in Trauma, Thanatology, and African Psychology. He is the founder of BeautifulMind Consultants and JENGA Psychosocial Network, dedicated to advancing mental health care through evidence-based practices and culturally grounded scholarship.
            </p>
            
            <p className="text-slate-600 leading-relaxed mb-8">
              As an HRAF Global Scholar, he leads groundbreaking research on traditional Luhya mourning rituals, funded by the Templeton Foundation. His work spans across 15 countries, with 91 research citations and 10+ peer-reviewed publications, shaping healthier futures for individuals and institutions worldwide.
            </p>
            
            {/* Key highlights */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">HRAF Global Scholar</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">15+ Countries</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">91 Citations</span>
              </div>
            </div>
          </div>

          {/* Doctor Images Section - Fixed */}
          <div 
            className={`transition-all duration-1000 ease-out delay-300 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main doctor image container - Fixed opacity */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Placeholder for doctor image */}
                <div className="w-full h-96 bg-gradient-to-br from-purple-600 via-emerald-600 to-blue-600 flex items-center justify-center relative">
                  <div className="text-center text-white p-8 relative z-10">
                    <Brain className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-xl font-semibold">Dr. Stephen Asatsa</p>
                    <p className="text-sm opacity-90">Counseling Psychologist</p>
                  </div>
                  
                  {/* Subtle bottom gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating cards - Simplified animations */}
              <div 
                className={`absolute -top-4 -right-4 w-24 h-24 rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-all duration-700 delay-500 ${
                  isInView ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>

              <div 
                className={`absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-all duration-700 delay-700 ${
                  isInView ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Decorative elements */}
              <div 
                className={`absolute top-1/2 -right-8 w-12 h-12 rounded-full bg-purple-500/30 backdrop-blur-sm transition-all duration-1000 delay-500 ${
                  isInView ? 'opacity-50 scale-100' : 'opacity-0 scale-50'
                }`}
              />
              
              <div 
                className={`absolute bottom-1/4 -left-8 w-8 h-8 rounded-full bg-emerald-500/30 backdrop-blur-sm transition-all duration-1000 delay-700 ${
                  isInView ? 'opacity-40 scale-100' : 'opacity-0 scale-50'
                }`}
              />

              {/* Sparkle effects */}
              {isInView && (
                <>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-pulse" />
                  <Star className="absolute -bottom-2 -left-2 w-5 h-5 text-amber-500 animate-bounce" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
