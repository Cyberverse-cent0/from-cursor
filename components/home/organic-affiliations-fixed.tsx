"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  BookOpen, 
  Network, 
  Heart, 
  Award, 
  Users, 
  Globe,
  ExternalLink,
  Sparkles,
  Zap,
  Star,
  Brain,
  Target,
  TrendingUp
} from "lucide-react";

const keyAffiliations = [
  {
    title: "Citation Profile & Academic Outputs",
    description: "Persistent researcher identity and scholarly record",
    icon: BookOpen,
    url: "https://scholar.google.com/citations?user=nBzSCvUAAAAJ&hl=en",
    color: "from-blue-500 to-indigo-600",
    size: "large"
  },
  {
    title: "Research Network & Projects",
    description: "Research network profile showcasing collaborative initiatives",
    icon: Network,
    url: "https://www.researchgate.net/profile/Stephen-Asatsa",
    color: "from-emerald-500 to-teal-600",
    size: "medium"
  },
  {
    title: "Mental Health Social Enterprise",
    description: "BeautifulMind Consultants - Kenyan mental health social enterprise",
    icon: Heart,
    url: "https://beautifulmind.cc/",
    color: "from-rose-500 to-pink-600",
    size: "medium"
  },
  {
    title: "Community Mental Health Network",
    description: "JENGA Psychosocial Network - Community-based organization",
    icon: Users,
    url: "#jenga",
    color: "from-purple-500 to-indigo-600",
    size: "small"
  }
];

const additionalOrganizations = [
  {
    name: "Society for Research in Child Development",
    role: "Governing Council Member",
    icon: Users,
    url: "https://www.srcd.org/about-us/who-we-are/governing-council"
  },
  {
    name: "European Association of Personality Psychology",
    role: "Africa Regional Representative",
    icon: Globe,
    url: "https://eapp.org/organization/regional-promoters/"
  },
  {
    name: "International Society for Study of Behavioral Development",
    role: "E-newsletter Editor",
    icon: BookOpen,
    url: "https://issbd.org/publications-2/"
  },
  {
    name: "Frontiers in Psychology",
    role: "Review Editor",
    icon: Award,
    url: "https://loop.frontiersin.org/people/828729/editorial"
  },
  {
    name: "Society for Research on Adolescence",
    role: "Member",
    icon: Users,
    url: "https://www.s-r-a.org/"
  },
  {
    name: "Society for the Study of Emerging Adulthood",
    role: "Member",
    icon: BookOpen,
    url: "https://www.ssea.org/"
  },
  {
    name: "Kenya Counseling and Psychological Association",
    role: "Member",
    icon: Heart,
    url: "#kcpa"
  },
  {
    name: "Eutychus Schools",
    role: "Proprietor",
    icon: Globe,
    url: "#eutychus"
  }
];

export function OrganicAffiliations() {
  const [hoveredAffiliation, setHoveredAffiliation] = useState<number | null>(null);
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

    const element = document.getElementById('organic-affiliations');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="organic-affiliations" className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000" />
      </div>

      <div className="container-shell relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            Professional Network
          </div>
          <h2 className="font-display text-5xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent font-bold leading-tight">
            Global Leadership & Collaboration
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-xl leading-relaxed">
            Active involvement in leading psychological and academic organizations worldwide
          </p>
        </div>

        {/* Organic Flow Layout for Key Affiliations */}
        <div className="relative mb-20">
          {/* Central hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Brain className="w-16 h-16 text-white" />
            </div>
            <div className="text-center mt-4">
              <h3 className="font-bold text-lg text-slate-900">Dr. Stephen Asatsa</h3>
              <p className="text-sm text-muted-foreground">Global Psychology Leader</p>
            </div>
          </div>

          {/* Orbiting key affiliations */}
          {keyAffiliations.map((affiliation, index) => {
            const Icon = affiliation.icon;
            const positions = [
              { top: '10%', left: '20%' },
              { top: '15%', right: '15%' },
              { bottom: '20%', left: '10%' },
              { bottom: '15%', right: '20%' }
            ];
            const position = positions[index % positions.length];
            const sizeClasses = {
              large: 'w-48 h-48',
              medium: 'w-40 h-40',
              small: 'w-32 h-32'
            };
            
            return (
              <div
                key={affiliation.title}
                className={`absolute ${position.top} ${position.left} ${isInView ? 'animate-float-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Card 
                  className={`${sizeClasses[affiliation.size as keyof typeof sizeClasses]} p-6 transition-all duration-700 cursor-pointer border-2 border-transparent hover:border-blue-500 hover:shadow-2xl hover:scale-110 bg-white/80 backdrop-blur-sm overflow-hidden`}
                  onMouseEnter={() => setHoveredAffiliation(index)}
                  onMouseLeave={() => setHoveredAffiliation(null)}
                >
                  {/* Glow effect */}
                  {hoveredAffiliation === index && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${affiliation.color} opacity-10 rounded-lg pointer-events-none`} />
                  )}
                  
                  <div className="h-full flex flex-col justify-between space-y-4">
                    {/* Icon */}
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${affiliation.color} text-white shadow-lg mx-auto w-fit transition-all duration-500 ${
                      hoveredAffiliation === index ? 'scale-125 rotate-6' : ''
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center space-y-2">
                      <h4 className="font-bold text-slate-900">{affiliation.title}</h4>
                      <p className="text-sm text-muted-foreground">{affiliation.description}</p>
                    </div>
                    
                    {/* Link */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full mx-auto transition-all duration-500 ${
                        hoveredAffiliation === index 
                          ? 'text-transparent bg-gradient-to-r ' + affiliation.color + ' bg-clip-text' 
                          : 'text-slate-600'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit
                    </Button>
                  </div>
                  
                  {/* Sparkle effect */}
                  {hoveredAffiliation === index && (
                    <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-500 animate-pulse" />
                  )}
                </Card>
              </div>
            );
          })}

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {keyAffiliations.map((_, index) => {
              const positions = [
                { x: '20%', y: '10%' },
                { x: '85%', y: '15%' },
                { x: '10%', y: '80%' },
                { x: '85%', y: '85%' }
              ];
              const pos = positions[index % positions.length];
              return (
                <line
                  key={index}
                  x1="50%"
                  y1="50%"
                  x2={pos.x}
                  y2={pos.y}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  opacity="0.2"
                  strokeDasharray="5,5"
                  className={isInView ? 'animate-dash' : ''}
                  style={{ animationDelay: `${index * 300}ms` }}
                />
              );
            })}
          </svg>
        </div>

        {/* Spiral Layout for Additional Organizations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Additional Professional Engagements
          </h3>
          
          <div className="relative h-96">
            {/* Spiral arrangement */}
            {additionalOrganizations.map((org, index) => {
              const Icon = org.icon;
              const angle = (index / additionalOrganizations.length) * 2 * Math.PI;
              const radius = 120 + (index % 3) * 40;
              const x = 50 + radius * Math.cos(angle) / 4;
              const y = 50 + radius * Math.sin(angle) / 4;
              
              return (
                <div
                  key={org.name}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${isInView ? 'animate-spiral-in' : 'opacity-0'}`}
                  style={{ 
                    left: `${x}%`, 
                    top: `${y}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <Card 
                    className="p-4 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-500 cursor-pointer hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-emerald-500 text-white">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900">{org.name}</h4>
                        <p className="text-xs text-muted-foreground">{org.role}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
            
            {/* Center indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Pattern for Stats */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-8">
            {[
              { icon: TrendingUp, value: '8', label: 'Major Organizations' },
              { icon: Globe, value: '6', label: 'Countries' },
              { icon: Users, value: '15+', label: 'Collaborators' },
              { icon: Award, value: '4', label: 'Leadership Roles' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`text-center space-y-2 ${isInView ? 'animate-wave-up' : 'opacity-0'}`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transform: `translateY(${Math.sin(index) * 20}px)`
                  }}
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-in {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes spiral-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(360deg);
          }
        }
        @keyframes wave-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dash {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-float-in {
          animation: float-in 0.8s ease-out forwards;
        }
        .animate-spiral-in {
          animation: spiral-in 1s ease-out forwards;
        }
        .animate-wave-up {
          animation: wave-up 0.8s ease-out forwards;
        }
        .animate-dash {
          animation: dash 2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
