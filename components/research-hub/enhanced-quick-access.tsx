"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteContent } from "@/lib/content/site-content";
import {
  Brain,
  Microscope,
  FileText,
  ListChecks,
  Trophy,
  Users,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";

const quickAccessCards = [
  {
    title: "About",
    description: "Lab identity and research philosophy",
    icon: Brain,
    href: "/research-hub/about",
    count: null,
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50",
    effect: "brain-pulse",
  },
  {
    title: "Projects",
    description: "Active and completed research",
    icon: Microscope,
    href: "/research-hub/projects",
    count: siteContent.researchProjects?.length || 8,
    color: "from-emerald-500 to-teal-600",
    bgColor: "from-emerald-50 to-teal-50",
    effect: "microscope-zoom",
  },
  {
    title: "Publications",
    description: "Papers and publications",
    icon: FileText,
    href: "/research-hub/activities",
    count: siteContent.publications?.length || 28,
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    effect: "paper-flip",
  },
  {
    title: "Tasks",
    description: "Research milestones",
    icon: ListChecks,
    href: "/research-hub/tasks",
    count: null,
    color: "from-cyan-500 to-blue-600",
    bgColor: "from-cyan-50 to-blue-50",
    effect: "check-bounce",
  },
  {
    title: "Awards",
    description: "Recognition and grants",
    icon: Trophy,
    href: "/research-hub/awards",
    count: siteContent.awards?.length || 15,
    color: "from-amber-500 to-orange-600",
    bgColor: "from-amber-50 to-orange-50",
    effect: "trophy-shine",
  },
  {
    title: "Team",
    description: "Collaborators and network",
    icon: Users,
    href: "/research-hub/team",
    count: siteContent.collaborators?.length || 25,
    color: "from-rose-500 to-pink-600",
    bgColor: "from-rose-50 to-pink-50",
    effect: "users-gather",
  },
];

export function EnhancedQuickAccess() {
  const [isInView, setIsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("enhanced-quick-access");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setHoveredCard(null);
  };

  return (
    <section id="enhanced-quick-access" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-purple-100 rounded-full filter blur-2xl opacity-50" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-100 rounded-full filter blur-2xl opacity-50" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-amber-100 rounded-full filter blur-2xl opacity-40" />
      </div>

      <div className="container-shell relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 text-sm font-medium mb-6 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Zap className="w-4 h-4" />
            Quick Navigation
          </div>
          <h2
            className={`font-display text-4xl md:text-5xl mb-4 text-slate-900 font-bold leading-tight transition-all duration-700 delay-100 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Explore Research Areas
          </h2>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Navigate through our comprehensive research ecosystem
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickAccessCards.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === index;
            const isActive = hoveredCard === index;

            return (
              <Link key={card.title} href={card.href}>
                <Card
                  className={`group relative p-6 h-full cursor-pointer border-2 overflow-hidden transition-all duration-500 ${
                    isInView ? "animate-fade-in-up" : "opacity-0"
                  } ${
                    isHovered
                      ? "border-transparent shadow-2xl"
                      : "border-slate-200/60 hover:border-slate-300/80 hover:shadow-xl"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: isHovered
                      ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.02)`
                      : "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
                    transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out",
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} opacity-0 transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "group-hover:opacity-50"
                    }`}
                  />

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 transition-opacity duration-500 rounded-lg ${
                      isHovered ? "opacity-10" : ""
                    }`}
                  />

                  {/* Particle burst on hover */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-2 h-2 bg-gradient-to-r ${card.color} rounded-full animate-ping`}
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-40px)`,
                            animationDelay: `${i * 50}ms`,
                            animationDuration: "0.8s",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="relative z-10 space-y-4">
                    {/* Icon with effects */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`p-4 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-lg transition-all duration-500 relative ${
                          isHovered ? "scale-110 rotate-6" : "group-hover:scale-105"
                        }`}
                      >
                        <Icon className="w-6 h-6 relative z-10" />

                        {/* Special effects based on card type */}
                        {card.effect === "trophy-shine" && isHovered && (
                          <Star className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-spin" />
                        )}
                        {card.effect === "brain-pulse" && isHovered && (
                          <div className="absolute inset-0 bg-white/30 rounded-xl animate-pulse" />
                        )}
                        {card.effect === "microscope-zoom" && isHovered && (
                          <div className="absolute -inset-2 border-2 border-white/50 rounded-xl animate-ping" />
                        )}
                      </div>

                      {card.count && (
                        <Badge
                          variant="secondary"
                          className={`transition-all duration-300 ${
                            isHovered ? "scale-110 bg-gradient-to-r " + card.color + " text-white" : ""
                          }`}
                        >
                          {card.count} items
                        </Badge>
                      )}
                    </div>

                    {/* Title and Description */}
                    <div>
                      <h3
                        className={`text-xl font-bold text-slate-900 mb-2 transition-all duration-300 ${
                          isHovered ? `bg-gradient-to-r ${card.color} bg-clip-text text-transparent` : ""
                        }`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-600">{card.description}</p>
                    </div>

                    {/* Explore link */}
                    <div
                      className={`flex items-center text-sm font-medium transition-all duration-300 ${
                        isHovered ? `bg-gradient-to-r ${card.color} bg-clip-text text-transparent` : "text-slate-500"
                      }`}
                    >
                      <span>Explore</span>
                      <ArrowRight
                        className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                          isHovered ? "translate-x-2" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Sparkle effects */}
                  <Sparkles
                    className={`absolute top-3 right-3 w-4 h-4 text-yellow-500 transition-all duration-300 ${
                      isHovered ? "opacity-100 animate-pulse" : "opacity-0"
                    }`}
                  />

                  {/* Bottom shimmer */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} transition-all duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Card>
              </Link>
            );
          })}
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
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
