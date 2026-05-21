"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Building, 
  BookOpen, 
  GraduationCap,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Brain,
  Users,
  Target
} from "lucide-react";
import { siteContent } from "@/lib/content/site-content";

const serviceIcons = {
  "Heart": Heart,
  "Building": Building,
  "BookOpen": BookOpen,
  "GraduationCap": GraduationCap,
  "Brain": Brain,
  "Users": Users,
  "Target": Target
};

const serviceColors = [
  "from-rose-500 via-pink-500 to-purple-600",
  "from-emerald-500 via-teal-500 to-blue-600", 
  "from-blue-500 via-indigo-600 to-purple-600",
  "from-amber-500 via-orange-500 to-red-600"
];

const serviceBgColors = [
  "bg-gradient-to-br from-rose-50 to-purple-50",
  "bg-gradient-to-br from-emerald-50 to-blue-50",
  "bg-gradient-to-br from-blue-50 to-purple-50",
  "bg-gradient-to-br from-amber-50 to-red-50"
];

export function StaggeredServices() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
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

    const element = document.getElementById('staggered-services');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const services = siteContent.services;

  return (
    <section id="staggered-services" className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000" />
      </div>

      <div className="container-shell relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-emerald-100 text-rose-700 text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Professional Services
          </div>
          <h2 className="font-display text-5xl mb-6 bg-gradient-to-r from-rose-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent font-bold leading-tight">
            Expert Psychological Services
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
            Comprehensive psychological care, research leadership, and professional development services
          </p>
        </div>

        {/* Staggered Layout */}
        <div className="relative space-y-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Heart;
            const colorClass = serviceColors[index % serviceColors.length];
            const bgClass = serviceBgColors[index % serviceBgColors.length];
            const isHovered = hoveredService === index;
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={service.title}
                className={`relative ${isInView ? 'animate-slide-in' : 'opacity-0'}`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  transform: isLeft ? 'translateX(-50px)' : 'translateX(50px)'
                }}
              >
                <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full max-w-2xl ${isLeft ? 'order-2' : 'order-1'}`}>
                    <Card 
                      className={`relative p-8 transition-all duration-700 cursor-pointer border-2 ${
                        isHovered 
                          ? 'border-rose-500 shadow-2xl scale-105' 
                          : 'border-transparent hover:border-gray-200 hover:shadow-xl'
                      } ${bgClass} overflow-hidden`}
                      onMouseEnter={() => setHoveredService(index)}
                      onMouseLeave={() => setHoveredService(null)}
                    >
                      {/* Glow effect */}
                      {isHovered && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-10 rounded-lg pointer-events-none`} />
                      )}
                      
                      <div className="flex items-start gap-6">
                        {/* Icon with enhanced effects */}
                        <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-r ${colorClass} text-white shadow-xl transition-all duration-500 ${
                          isHovered ? 'scale-125 rotate-6' : ''
                        } relative`}>
                          <Icon className="w-8 h-8 relative z-10" />
                          {/* Icon glow */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} rounded-2xl opacity-50 blur-lg transition-opacity duration-300 ${
                            isHovered ? 'opacity-75' : 'opacity-0'
                          }`} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          {/* Title */}
                          <h3 className={`font-bold text-2xl transition-all duration-500 ${
                            isHovered 
                              ? 'text-transparent bg-gradient-to-r ' + colorClass + ' bg-clip-text' 
                              : 'text-slate-900'
                          }`}>
                            {service.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {service.description}
                          </p>
                          
                          {/* Bullets with staggered animation */}
                          <div className="space-y-3">
                            {service.bullets.map((bullet, bulletIndex) => (
                              <div 
                                key={bullet}
                                className="flex items-center gap-3 text-slate-700 transition-all duration-500"
                                style={{
                                  animationDelay: isHovered ? `${bulletIndex * 100}ms` : '0ms',
                                  animation: isHovered ? `slideInRight 0.5s ease-out ${bulletIndex * 100}ms both` : 'none',
                                  transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
                                  opacity: isHovered ? 1 : 0.8
                                }}
                              >
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClass} ${
                                  isHovered ? 'scale-150' : ''
                                } transition-all duration-300`} />
                                <span className={isHovered ? 'font-medium' : ''}>{bullet}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* CTA */}
                          <div className="flex items-center justify-between pt-4">
                            <Button
                              variant="ghost"
                              className={`text-sm font-medium transition-all duration-500 ${
                                isHovered 
                                  ? 'text-transparent bg-gradient-to-r ' + colorClass + ' bg-clip-text' 
                                  : 'text-slate-600'
                              }`}
                            >
                              {isHovered && <Zap className="w-4 h-4 mr-2" />}
                              Learn more
                              <ArrowRight className={`w-4 h-4 ml-2 transition-all duration-300 ${
                                isHovered ? 'translate-x-2' : ''
                              }`} />
                            </Button>
                            
                            {/* Sparkle effect */}
                            {isHovered && (
                              <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating particles */}
                      {isHovered && (
                        <>
                          <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${colorClass} rounded-full animate-pulse`} />
                          <div className={`absolute bottom-4 left-4 w-1.5 h-1.5 bg-gradient-to-r ${colorClass} rounded-full animate-pulse animation-delay-200`} />
                        </>
                      )}
                      
                      {/* Card shine effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ${
                        isHovered ? 'opacity-100 translate-x-full' : 'opacity-0 -translate-x-full'
                      }`} 
                           style={{ 
                             animation: isHovered ? 'shine 2s infinite' : 'none'
                           }} />
                    </Card>
                  </div>
                  
                  {/* Decorative element */}
                  <div className={`w-32 h-32 ${isLeft ? 'order-1 mr-8' : 'order-2 ml-8'} flex-shrink-0`}>
                    <div className={`w-full h-full rounded-full bg-gradient-to-r ${colorClass} opacity-10 animate-pulse`} />
                    <div className={`absolute inset-4 rounded-full bg-gradient-to-r ${colorClass} opacity-20 animate-pulse animation-delay-1000`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hexagonal Feature Display */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-rose-600 to-emerald-600 bg-clip-text text-transparent">
            Service Excellence
          </h3>
          
          <div className="flex justify-center items-center space-x-8">
            {/* Hexagon shapes */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-pink-600 clip-hexagon flex items-center justify-center text-white shadow-lg">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium mt-2">Clinical Care</p>
            </div>
            
            <div className="relative transform translate-y-8">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 clip-hexagon flex items-center justify-center text-white shadow-lg">
                <Building className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium mt-2">Consulting</p>
            </div>
            
            <div className="relative transform translate-y-4">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 clip-hexagon flex items-center justify-center text-white shadow-lg">
                <BookOpen className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium mt-2">Research</p>
            </div>
            
            <div className="relative transform translate-y-12">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-600 clip-hexagon flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium mt-2">Education</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(50px) translateX(var(--transform-x, 0));
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }
        .clip-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
