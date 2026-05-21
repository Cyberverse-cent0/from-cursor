"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Zap, 
  Star, 
  Heart, 
  Brain, 
  Target, 
  TrendingUp,
  Flame,
  Rocket,
  Crown,
  Gem,
  Sun,
  Moon,
  Cloud,
  Wind
} from "lucide-react";

const impressiveStats = [
  {
    title: "Research Impact",
    value: 91,
    suffix: "citations",
    icon: Brain,
    primaryColor: "from-purple-600 via-pink-600 to-red-600",
    secondaryColor: "from-yellow-400 via-orange-500 to-red-500",
    effect: "glowing-pulse"
  },
  {
    title: "Global Reach",
    value: 15,
    suffix: "countries",
    icon: Target,
    primaryColor: "from-emerald-600 via-teal-600 to-cyan-600",
    secondaryColor: "from-blue-400 via-green-500 to-emerald-500",
    effect: "rotating-glow"
  },
  {
    title: "Publications",
    value: 10,
    suffix: "papers",
    icon: Star,
    primaryColor: "from-blue-600 via-indigo-600 to-purple-600",
    secondaryColor: "from-purple-400 via-pink-500 to-red-500",
    effect: "sparkle-burst"
  },
  {
    title: "Research Grants",
    value: 3,
    suffix: "major",
    icon: Crown,
    primaryColor: "from-amber-600 via-orange-600 to-red-600",
    secondaryColor: "from-yellow-400 via-amber-500 to-orange-500",
    effect: "crown-shine"
  }
];

export function ImpressiveInteractive() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

    const element = document.getElementById('impressive-interactive');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="impressive-interactive" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Dynamic background with mouse-following effects */}
      <div className="absolute inset-0">
        {/* Mouse-following gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
            transition: 'background 0.3s ease-out'
          }}
        />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse animation-delay-4000" />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container-shell relative z-10">
        {/* Enhanced header with dramatic effects */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm font-medium mb-6 animate-pulse">
            <Zap className="w-5 h-5" />
            Next-Level Interactive Experience
          </div>
          <h2 className="font-display text-6xl mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent font-bold leading-tight animate-pulse">
            Spectacular Visual Impact
          </h2>
          <p className="text-purple-200 max-w-3xl mx-auto text-xl leading-relaxed">
            Experience dramatic transformations and stunning visual effects that respond to your every move
          </p>
        </div>

        {/* Impressive interactive cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impressiveStats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = activeIndex === index;
            
            return (
              <div
                key={stat.title}
                className={`${isInView ? 'animate-entrance' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Card 
                  className={`relative p-8 transition-all duration-1000 cursor-pointer border-2 ${
                    isActive 
                      ? 'border-purple-500 shadow-2xl scale-110 rotate-3' 
                      : 'border-purple-500/30 hover:border-purple-500/60 hover:shadow-2xl hover:scale-105 hover:-rotate-1'
                  } bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl overflow-hidden`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Dramatic glow effect */}
                  <div className={`absolute inset-0 transition-all duration-1000 ${
                    isActive 
                      ? 'bg-gradient-to-r ' + stat.primaryColor + ' opacity-30 animate-pulse' 
                      : 'bg-gradient-to-r ' + stat.primaryColor + ' opacity-0'
                  } rounded-lg`} />
                  
                  {/* Particle burst effect */}
                  {isActive && (
                    <div className="absolute inset-0">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-60px)`,
                            animationDelay: `${i * 100}ms`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="relative z-10 space-y-6">
                    {/* Icon with dramatic effects */}
                    <div className="flex justify-center">
                      <div className={`p-6 rounded-2xl bg-gradient-to-r ${stat.primaryColor} text-white shadow-2xl transition-all duration-1000 ${
                        isActive 
                          ? 'scale-150 rotate-12 animate-spin' 
                          : 'scale-100 rotate-0'
                      } relative`}>
                        <Icon className="w-12 h-12 relative z-10" />
                        
                        {/* Icon glow */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.secondaryColor} rounded-2xl opacity-75 blur-xl animate-pulse`} />
                        
                        {/* Crown effect for grants */}
                        {stat.effect === 'crown-shine' && isActive && (
                          <Crown className="absolute -top-4 -right-4 w-6 h-6 text-yellow-400 animate-bounce" />
                        )}
                        
                        {/* Meteor effect for publications */}
                        {stat.effect === 'sparkle-burst' && isActive && (
                          <Star className="absolute -top-2 -left-2 w-4 h-4 text-yellow-300 animate-spin" />
                        )}
                        
                        {/* Lightning effect for impact */}
                        {stat.effect === 'glowing-pulse' && isActive && (
                          <Zap className="absolute -bottom-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse" />
                        )}
                        
                        {/* Target effect for reach */}
                        {stat.effect === 'rotating-glow' && isActive && (
                          <Target className="absolute -top-2 -left-2 w-4 h-4 text-emerald-400 animate-spin" />
                        )}
                      </div>
                    </div>
                    
                    {/* Dramatic value display */}
                    <div className="text-center">
                      <div className={`font-display text-6xl font-bold transition-all duration-1000 ${
                        isActive 
                          ? 'bg-gradient-to-r ' + stat.secondaryColor + ' bg-clip-text text-transparent scale-125' 
                          : 'bg-gradient-to-r ' + stat.primaryColor + ' bg-clip-text text-transparent scale-100'
                      }`}>
                        {stat.value}
                        <span className="text-2xl ml-2">{stat.suffix}</span>
                      </div>
                    </div>
                    
                    {/* Title with morphing effect */}
                    <div className="text-center">
                      <h3 className={`font-bold text-lg transition-all duration-1000 ${
                        isActive 
                          ? 'text-transparent bg-gradient-to-r ' + stat.secondaryColor + ' bg-clip-text scale-110' 
                          : 'text-purple-300 scale-100'
                      }`}>
                        {stat.title}
                      </h3>
                    </div>
                    
                    {/* Additional effects when active */}
                    {isActive && (
                      <div className="flex justify-center space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                        <Zap className="w-4 h-4 text-orange-400 animate-pulse animation-delay-200" />
                        <Star className="w-4 h-4 text-pink-400 animate-pulse animation-delay-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 ${
                    isActive ? 'opacity-100 translate-x-full' : 'opacity-0 -translate-x-full'
                  }`} 
                       style={{ 
                         animation: isActive ? 'shimmer 2s infinite' : 'none'
                       }} />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Dramatic CTA section */}
        <div className="mt-20 text-center">
          <div className="relative inline-block group">
            {/* Epic glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse" />
            
            <Button
              size="lg"
              className="relative px-12 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white border-0 rounded-full shadow-2xl transition-all duration-1000 group-hover:scale-110 group-hover:shadow-purple-500/50 group-hover:shadow-3xl overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" 
                   style={{ 
                     animation: 'shimmer 3s infinite'
                   }} />
              
              <span className="relative z-10 flex items-center gap-3">
                <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                Experience the Magic
                <Gem className="w-6 h-6 group-hover:animate-spin" />
              </span>
              
              {/* Floating particles */}
              <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100" />
              <div className="absolute bottom-2 right-4 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 animation-delay-300" />
              <div className="absolute top-1/2 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 animation-delay-600" />
            </Button>
          </div>
          
          <p className="mt-6 text-purple-300 text-lg animate-pulse">
            Hover over the cards above to witness the transformation
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes entrance {
          from {
            opacity: 0;
            transform: translateY(100px) rotateX(90deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
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
        @keyframes glowing-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.8);
          }
        }
        @keyframes rotating-glow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes sparkle-burst {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes crown-shine {
          0%, 100% {
            filter: brightness(1) hue-rotate(0deg);
          }
          50% {
            filter: brightness(1.5) hue-rotate(180deg);
          }
        }
        .animate-entrance {
          animation: entrance 1s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </section>
  );
}
