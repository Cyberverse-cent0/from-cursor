"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowRight, Users, Target, HeartHandshake, Trophy } from "lucide-react";
import Link from "next/link";

export function ResearchHubWelcome() {
  const navigationCards = [
    {
      title: "About",
      description: "Lab identity and research philosophy",
      icon: Brain,
      href: "/research-hub/about",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Projects",
      description: "Active and completed research projects",
      icon: Target,
      href: "/research-hub/projects",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Our Team",
      description: "Research team and international collaborators",
      icon: Users,
      href: "/research-hub/team",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Activities",
      description: "Conferences, publications, and events",
      icon: ArrowRight,
      href: "/research-hub/activities",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Community",
      description: "Engagement and partnership opportunities",
      icon: HeartHandshake,
      href: "/research-hub/community",
      color: "from-cyan-500 to-teal-600"
    },
    {
      title: "Awards & Grants",
      description: "Professional recognition and funding",
      icon: Trophy,
      href: "/research-hub/awards",
      color: "from-yellow-500 to-amber-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0F766E] to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl">
            🧠🌿
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900">Welcome to HDLK-L</h1>
            <p className="text-xl text-gray-600">Human Development, Indigenous Knowledge and Flourishing Lab</p>
          </div>
        </div>
      </div>

      {/* Lab Introduction */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-xl">
        <div className="space-y-4">
          <p className="text-lg text-gray-800 leading-relaxed">
            The <span className="font-semibold text-[#0F766E]">Human Development, Indigenous Knowledge and Flourishing Lab (HDLK-L)</span> is a pioneering research center dedicated to culturally grounded psychology, indigenous knowledge systems, and decolonizing mental health practices in African contexts.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed">
            Led by Dr. Stephen Asatsa, we integrate traditional African wisdom with rigorous scientific methods to advance human flourishing across the continent and beyond.
          </p>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Core Pillars</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center p-6 bg-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-[#0F766E] rounded-full flex items-center justify-center text-white mx-auto mb-4 text-2xl">
              🌍
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Cultural Authenticity</h3>
            <p className="text-gray-600">Honoring indigenous knowledge systems and traditional wisdom</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 text-2xl">
              🔬
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Scientific Excellence</h3>
            <p className="text-gray-600">Rigorous research methodologies and evidence-based practices</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 text-2xl">
              🤝
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Community Impact</h3>
            <p className="text-gray-600">Real-world applications and meaningful change</p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 text-2xl">
              🔄
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Decolonization</h3>
            <p className="text-gray-600">Transforming psychology practice and education</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gray-50 p-8 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Our Impact</h3>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[#0F766E] mb-2">12</div>
            <div className="text-gray-600 font-medium">Active Projects</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-teal-600 mb-2">28</div>
            <div className="text-gray-600 font-medium">Publications</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
            <div className="text-gray-600 font-medium">Awards</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
            <div className="text-gray-600 font-medium">Countries</div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Explore Our Research</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {navigationCards.map((card, index) => (
            <Link key={index} href={card.href}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                <div className="space-y-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                  <div className="flex items-center text-[#0F766E] group-hover:text-teal-600 transition-colors">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#0F766E] to-teal-600 rounded-2xl p-8 text-white text-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Start Your Research Journey</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Discover our cutting-edge research, explore our publications, and learn how you can collaborate with us to advance culturally grounded psychology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#0F766E] hover:bg-gray-100 border-0 px-8" asChild>
              <Link href="/research-hub/about">
                Learn More About HDLK-L
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0F766E] px-8" asChild>
              <Link href="/research-hub/projects">
                View Our Projects
                <Target className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
