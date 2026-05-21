"use client";

import { siteContent } from "@/lib/content/site-content";
import { Card } from "@/components/ui/card";
import { Brain, Users, BookOpen, GraduationCap, Building, Calendar, ArrowRight, Sparkles, Zap, Star, Heart, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const serviceIcons = [Brain, Users, BookOpen, GraduationCap, Building, Calendar];

const iconMap: Record<string, any> = {
  Brain,
  Users,
  BookOpen,
  GraduationCap,
  Building,
  Calendar,
  Heart
};

const serviceColors = [
  "from-purple-500 to-violet-600",
  "from-emerald-500 to-teal-600", 
  "from-blue-500 to-cyan-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-indigo-500 to-purple-600"
];

const serviceBgColors = [
  "bg-purple-50 hover:bg-purple-100",
  "bg-emerald-50 hover:bg-emerald-100",
  "bg-blue-50 hover:bg-blue-100",
  "bg-amber-50 hover:bg-amber-100",
  "bg-rose-50 hover:bg-rose-100",
  "bg-indigo-50 hover:bg-indigo-100"
];

export function InteractiveServicesSection() {
  const [services, setServices] = useState<Array<{ title: string; description: string; bullets: string[]; icon?: string; link?: string }>>(siteContent.services);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => {
        if (data.services && data.services.length > 0) {
          setServices(data.services.map((s: any) => ({
            title: s.title,
            description: s.description,
            bullets: s.bullets ? JSON.parse(s.bullets) : [],
            icon: s.icon || 'Brain',
            link: s.link || '/services'
          })) as Array<{ title: string; description: string; bullets: string[]; icon?: string; link?: string }>);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container-shell">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000" />
      </div>
      
      <div className="container-shell relative z-10">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent font-bold">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprehensive psychological care, research leadership, and professional development services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon || 'Heart'] || serviceIcons[index] || Heart;
            const colorClass = serviceColors[index % serviceColors.length];
            const bgClass = serviceBgColors[index % serviceBgColors.length];
            const isHovered = hoveredIndex === index;

            return (
              <div 
                key={service.title} 
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card className={`relative h-full border border-white/50 p-6 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl cursor-pointer ${bgClass} backdrop-blur-sm overflow-hidden`}>
                  {/* Enhanced glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                  
                  {/* Floating particles */}
                  <div className={`absolute top-2 right-2 w-2 h-2 bg-gradient-to-r ${colorClass} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:animate-pulse`} />
                  <div className={`absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-r ${colorClass} rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 group-hover:animate-pulse animation-delay-200`} />
                  
                  <div className="mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${colorClass} text-white shadow-lg transition-all duration-500 ${isHovered ? 'scale-125 rotate-6 shadow-2xl' : ''} relative`}>
                      <Icon className="w-6 h-6 relative z-10" />
                      {/* Icon glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} rounded-xl opacity-50 blur-md transition-opacity duration-300 ${isHovered ? 'opacity-75' : 'opacity-0'}`} />
                    </div>
                  </div>

                  <h3 className={`font-display text-xl mb-3 transition-all duration-500 ${isHovered ? 'text-transparent bg-gradient-to-r ' + colorClass + ' bg-clip-text scale-105' : 'text-slate-900'}`}>
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed transition-all duration-500 group-hover:text-slate-700">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {service.bullets.slice(0, 3).map((bullet: string, bulletIndex: number) => (
                      <li 
                        key={bullet} 
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-all duration-500 group-hover:text-slate-600"
                        style={{ 
                          animationDelay: isHovered ? `${bulletIndex * 150}ms` : '0ms',
                          animation: isHovered ? `slideInRight 0.5s ease-out ${bulletIndex * 150}ms both` : 'none',
                          transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                          opacity: isHovered ? 1 : 0.8
                        }}
                      >
                        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isHovered ? 'bg-gradient-to-r ' + colorClass + ' scale-200 shadow-lg' : 'bg-accent/60'}`} />
                        <span className={isHovered ? 'font-medium' : ''}>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced Learn more link */}
                  <div className="flex items-center justify-between mt-auto">
                    <a 
                      href={service.link || "/services"}
                      className={`text-sm font-medium transition-all duration-500 ${isHovered ? 'text-transparent bg-gradient-to-r ' + colorClass + ' bg-clip-text font-semibold' : 'text-slate-500'} hover:underline flex items-center gap-1`}
                    >
                      {isHovered && <Zap className="w-3 h-3" />}
                      Learn more
                    </a>
                    <ArrowRight className={`w-4 h-4 transition-all duration-500 ${isHovered ? 'translate-x-3 text-transparent bg-gradient-to-r ' + colorClass + ' bg-clip-text scale-125' : 'text-slate-400'}`} />
                  </div>

                  {/* Enhanced sparkle effects */}
                  <Sparkles className={`absolute -top-2 -right-2 h-4 w-4 text-yellow-500 transition-all duration-500 ${isHovered ? 'opacity-100 animate-spin' : 'opacity-0'}`} />
                  <Star className={`absolute -bottom-2 -left-2 h-3 w-3 text-yellow-400 transition-all duration-700 ${isHovered ? 'opacity-100 animate-pulse animation-delay-300' : 'opacity-0'}`} />
                  
                  {/* Card shine effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 ${isHovered ? 'opacity-100 translate-x-full' : 'opacity-0 -translate-x-full'}`} 
                       style={{ 
                         animation: isHovered ? 'shine 2s infinite' : 'none'
                       }} />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Enhanced call-to-action */}
        <div className="mt-16 text-center">
          <div className="relative inline-block group">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <a 
              href="/contact"
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white rounded-full border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{ 
                     animation: 'shimmer 2s infinite'
                   }} />
              
              <span className="relative z-10 font-semibold text-lg">Need a custom solution?</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-2" />
              
              {/* Floating particles */}
              <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
              <div className="absolute bottom-2 right-6 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse animation-delay-1000" />
            </a>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground animate-fade-in animation-delay-300">
            Let's discuss how we can work together to achieve your goals
          </p>
        </div>
      </div>

      <style jsx>{`
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
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
