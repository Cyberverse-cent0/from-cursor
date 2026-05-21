"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ExternalLink, 
  Calendar, 
  Users, 
  TrendingUp, 
  Award,
  Brain,
  Globe,
  Heart,
  Sparkles
} from "lucide-react";
import publicationsData from "@/lib/content/publications.json";

const cardSizes = [
  "col-span-2 row-span-2", // Large featured card
  "col-span-1 row-span-1", // Small card
  "col-span-2 row-span-1", // Wide card
  "col-span-1 row-span-2", // Tall card
  "col-span-1 row-span-1", // Small card
];

const cardColors = [
  "from-purple-500 to-violet-600",
  "from-emerald-500 to-teal-600", 
  "from-blue-500 to-indigo-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600"
];

const cardBgColors = [
  "bg-purple-50 hover:bg-purple-100",
  "bg-emerald-50 hover:bg-emerald-100",
  "bg-blue-50 hover:bg-blue-100", 
  "bg-amber-50 hover:bg-amber-100",
  "bg-rose-50 hover:bg-rose-100"
];

export function MasonryResearch() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

    const element = document.getElementById('masonry-research');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const featuredPublications = publicationsData.publications.slice(0, 5);

  return (
    <section id="masonry-research" className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
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
            <BookOpen className="w-4 h-4" />
            Research Publications
          </div>
          <h2 className="font-display text-5xl mb-6 bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent font-bold leading-tight">
            Latest Research Impact
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
            Groundbreaking research published in leading international journals with global impact
          </p>
        </div>

        {/* Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-6 mb-16">
          {featuredPublications.map((pub, index) => {
            const sizeClass = cardSizes[index % cardSizes.length];
            const colorClass = cardColors[index % cardColors.length];
            const bgClass = cardBgColors[index % cardBgColors.length];
            const isHovered = hoveredCard === index;
            const isFeatured = index === 0;
            
            return (
              <div
                key={pub.id}
                className={`${sizeClass} ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card 
                  className={`relative h-full p-6 transition-all duration-700 cursor-pointer border-2 ${
                    isHovered 
                      ? 'border-purple-500 shadow-2xl scale-105' 
                      : 'border-transparent hover:border-gray-200 hover:shadow-xl'
                  } ${bgClass} overflow-hidden`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Glow effect */}
                  {isHovered && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-10 rounded-lg pointer-events-none`} />
                  )}
                  
                  {/* Featured badge for first card */}
                  {isFeatured && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-semibold">
                        <Award className="w-3 h-3" />
                        Featured
                      </div>
                    </div>
                  )}
                  
                  <div className="h-full flex flex-col justify-between space-y-4">
                    {/* Header */}
                    <div className="space-y-3">
                      {/* Journal and Year */}
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`bg-gradient-to-r ${colorClass} text-white border-0 text-xs`}
                        >
                          {pub.year}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{pub.journal}</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className={`font-bold ${isFeatured ? 'text-xl' : 'text-lg'} text-slate-900 leading-tight line-clamp-3`}>
                        {pub.title}
                      </h3>
                      
                      {/* Authors (truncated) */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {pub.authors.split(',').slice(0, 2).join(', ')}
                        {pub.authors.split(',').length > 2 && ' et al.'}
                      </p>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      {/* Abstract */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {pub.abstract}
                      </p>
                      
                      {/* Metrics */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-emerald-600" />
                            <span className="text-muted-foreground">{pub.citations} citations</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-blue-600" />
                            <span className="text-muted-foreground">{pub.collaborators?.length || 0} authors</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {pub.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-xs ${isHovered ? `text-transparent bg-gradient-to-r ${colorClass} bg-clip-text` : 'text-slate-600'}`}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Read More
                      </Button>
                      
                      {/* Sparkle effect on hover */}
                      {isHovered && (
                        <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
                      )}
                    </div>
                  </div>
                  
                  {/* Floating particles */}
                  {isHovered && (
                    <>
                      <div className={`absolute top-3 right-3 w-2 h-2 bg-gradient-to-r ${colorClass} rounded-full animate-pulse`} />
                      <div className={`absolute bottom-3 left-3 w-1.5 h-1.5 bg-gradient-to-r ${colorClass} rounded-full animate-pulse animation-delay-200`} />
                    </>
                  )}
                </Card>
              </div>
            );
          })}
        </div>

        {/* Organic Flow Section - Research Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Research Focus Areas
          </h3>
          
          {/* Organic Flow Layout */}
          <div className="relative h-96">
            {/* Central hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
            
            {/* Orbiting research areas */}
            <div className="absolute top-8 left-1/4 transform -translate-x-1/2">
              <div className="p-4 bg-purple-100 rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <h4 className="font-bold text-purple-900">Cultural Psychology</h4>
                <p className="text-sm text-purple-700">35% of research</p>
              </div>
            </div>
            
            <div className="absolute top-20 right-1/4 transform translate-x-1/2">
              <div className="p-4 bg-emerald-100 rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <h4 className="font-bold text-emerald-900">Developmental Psychology</h4>
                <p className="text-sm text-emerald-700">25% of research</p>
              </div>
            </div>
            
            <div className="absolute bottom-20 left-1/3">
              <div className="p-4 bg-blue-100 rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <h4 className="font-bold text-blue-900">Clinical Psychology</h4>
                <p className="text-sm text-blue-700">20% of research</p>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-1/3">
              <div className="p-4 bg-amber-100 rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <h4 className="font-bold text-amber-900">Personality Psychology</h4>
                <p className="text-sm text-amber-700">15% of research</p>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-8">
              <div className="p-3 bg-rose-100 rounded-xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <h4 className="font-bold text-rose-900 text-sm">Cultural Evolution</h4>
                <p className="text-xs text-rose-700">5% of research</p>
              </div>
            </div>
            
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#9333ea" strokeWidth="2" opacity="0.3" />
              <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="#10b981" strokeWidth="2" opacity="0.3" />
              <line x1="50%" y1="50%" x2="33%" y2="80%" stroke="#3b82f6" strokeWidth="2" opacity="0.3" />
              <line x1="50%" y1="50%" x2="67%" y2="85%" stroke="#f59e0b" strokeWidth="2" opacity="0.3" />
              <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#f43f5e" strokeWidth="2" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Staggered Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">6</h3>
            <p className="text-muted-foreground">Countries represented in research</p>
          </div>
          
          <div className="text-center space-y-4 transform translate-y-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">15+</h3>
            <p className="text-muted-foreground">International collaborators</p>
          </div>
          
          <div className="text-center space-y-4 transform translate-y-16">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">91</h3>
            <p className="text-muted-foreground">Total research citations</p>
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
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
