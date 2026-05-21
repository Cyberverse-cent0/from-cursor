"use client";

import { useState, useEffect } from "react";
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
  Moon
} from "lucide-react";

const impressiveWords = [
  { text: "INNOVATION", color: "from-purple-400 to-pink-600", effect: "glow-pulse" },
  { text: "EXCELLENCE", color: "from-emerald-400 to-cyan-600", effect: "wave-text" },
  { text: "LEADERSHIP", color: "from-blue-400 to-indigo-600", effect: "morph-text" },
  { text: "IMPACT", color: "from-amber-400 to-orange-600", effect: "bounce-text" },
  { text: "DISCOVERY", color: "from-rose-400 to-pink-600", effect: "rotate-text" },
  { text: "TRANSFORMATION", color: "from-violet-400 to-purple-600", effect: "scale-text" }
];

export function ImpressiveText() {
  const [activeWord, setActiveWord] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % impressiveWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentWord = impressiveWords[activeWord];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        {/* Mouse-following gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.4) 0%, transparent 50%)`,
            transition: 'background 0.3s ease-out'
          }}
        />
        
        {/* Animated particles */}
        {Array.from({ length: 30 }).map((_, i) => (
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
        {/* Impressive text display */}
        <div className="text-center space-y-8">
          {/* Main impressive word */}
          <div 
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${currentWord.color} blur-2xl opacity-50 animate-pulse`} />
            
            {/* Text with dramatic effects */}
            <h1 
              className={`font-display text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r ${currentWord.color} bg-clip-text text-transparent transition-all duration-1000 ${
                isHovered ? 'scale-125' : 'scale-100'
              } ${currentWord.effect}`}
              style={{
                textShadow: isHovered ? '0 0 40px rgba(139, 92, 246, 0.8)' : 'none',
                animation: `${currentWord.effect} 2s ease-in-out infinite`
              }}
            >
              {currentWord.text}
            </h1>
            
            {/* Floating icons */}
            {isHovered && (
              <div className="absolute -top-8 -left-8">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
              </div>
            )}
            {isHovered && (
              <div className="absolute -top-8 -right-8">
                <Star className="w-8 h-8 text-pink-400 animate-bounce" />
              </div>
            )}
            {isHovered && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <Zap className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
            )}
          </div>

          {/* Subtitle with morphing effect */}
          <div className="relative">
            <p className="text-2xl md:text-3xl text-purple-200 font-medium leading-relaxed">
              <span className="inline-block animate-pulse">Experience</span>
              <span className="inline-block mx-2 text-transparent bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-bold animate-bounce">
                Extraordinary
              </span>
              <span className="inline-block animate-pulse animation-delay-1000">Visual Effects</span>
            </p>
          </div>

          {/* Feature highlights with impressive animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Brain, title: "Dynamic Colors", description: "Spectacular color transformations" },
              { icon: Zap, title: "Particle Effects", description: "Explosive visual animations" },
              { icon: Crown, title: "Premium Quality", description: "World-class interactions" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="relative group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="p-6 bg-gradient-to-br from-purple-800/50 to-pink-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/30 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl">
                    {/* Icon with glow */}
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-purple-200 text-sm">
                      {feature.description}
                    </p>
                    
                    {/* Hover effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to action with impressive effects */}
          <div className="mt-16">
            <div className="relative inline-block group">
              {/* Epic glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
              
              <button className="relative px-12 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-full shadow-2xl transition-all duration-1000 group-hover:scale-110 group-hover:shadow-purple-500/50 group-hover:shadow-3xl overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                  Witness the Magic
                  <Gem className="w-6 h-6 group-hover:animate-spin" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
          }
          50% {
            filter: brightness(1.2) drop-shadow(0 0 40px rgba(139, 92, 246, 0.8));
          }
        }
        @keyframes wave-text {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-10px);
          }
          75% {
            transform: translateY(10px);
          }
        }
        @keyframes morph-text {
          0%, 100% {
            transform: scale(1) skew(0deg);
          }
          25% {
            transform: scale(1.1) skew(5deg);
          }
          75% {
            transform: scale(0.9) skew(-5deg);
          }
        }
        @keyframes bounce-text {
          0%, 100% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-20px);
          }
          50% {
            transform: translateY(0);
          }
          75% {
            transform: translateY(-10px);
          }
        }
        @keyframes rotate-text {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes scale-text {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
