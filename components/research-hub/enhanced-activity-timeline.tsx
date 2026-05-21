"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Microscope,
  FileText,
  Users,
  Trophy,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

const recentActivity = [
  {
    title: "New project submitted",
    detail: "Traditional Luhya Mourning Rituals",
    time: "2 days ago",
    type: "project",
    icon: Microscope,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Publication updated",
    detail: "Cultural Psychology Review",
    time: "1 week ago",
    type: "publication",
    icon: FileText,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Team member added",
    detail: "Dr. Jane Doe, Research Fellow",
    time: "2 weeks ago",
    type: "team",
    icon: Users,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Grant approved",
    detail: "Templeton Foundation - $150,000",
    time: "1 month ago",
    type: "award",
    icon: Trophy,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Research milestone",
    detail: "Completed data collection phase",
    time: "1 month ago",
    type: "project",
    icon: Microscope,
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50",
  },
];

export function EnhancedActivityTimeline() {
  const [isInView, setIsInView] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("enhanced-activity");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="enhanced-activity" className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-purple-100 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-emerald-100 rounded-full filter blur-3xl opacity-30" />
      </div>

      <div className="container-shell relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 text-sm font-medium mb-6 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Clock className="w-4 h-4" />
            Recent Updates
          </div>
          <h2
            className={`font-display text-4xl mb-4 text-slate-900 font-bold leading-tight transition-all duration-700 delay-100 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Latest Activity
          </h2>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Stay updated with our latest research developments
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <Card
            className={`p-8 bg-white/80 backdrop-blur-sm border-slate-200/60 transition-all duration-700 delay-300 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-amber-500 rounded-full" />

              {/* Activity items */}
              <div className="space-y-6">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  const isHovered = hoveredItem === index;

                  return (
                    <div
                      key={index}
                      className={`relative flex items-start gap-6 group cursor-pointer transition-all duration-500 ${
                        isInView ? "animate-slide-in-left" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Timeline node */}
                      <div className="relative flex-shrink-0 z-10">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${activity.color} text-white flex items-center justify-center shadow-lg transition-all duration-500 ${
                            isHovered ? "scale-125 shadow-2xl" : "group-hover:scale-110"
                          }`}
                        >
                          <Icon className="w-7 h-7" />

                          {/* Glow effect */}
                          <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${activity.color} opacity-50 blur-md transition-all duration-500 ${
                              isHovered ? "scale-150" : ""
                            }`}
                          />
                        </div>

                        {/* Connecting dot */}
                        <div
                          className={`absolute top-1/2 left-full w-3 h-3 rounded-full bg-gradient-to-r ${activity.color} transform -translate-y-1/2 translate-x-2 transition-all duration-300 ${
                            isHovered ? "scale-150" : ""
                          }`}
                        />
                      </div>

                      {/* Content card */}
                      <div
                        className={`flex-1 p-5 rounded-xl border transition-all duration-300 ${
                          isHovered
                            ? `${activity.bgColor} border-transparent shadow-lg translate-x-2`
                            : "bg-slate-50/50 border-slate-200/60 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-slate-900">{activity.title}</h4>
                              <Badge
                                variant="secondary"
                                className={`text-xs capitalize transition-all duration-300 ${
                                  isHovered ? `bg-gradient-to-r ${activity.color} text-white` : ""
                                }`}
                              >
                                {activity.type}
                              </Badge>
                            </div>
                            <p className="text-slate-600 text-sm">{activity.detail}</p>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-400 flex-shrink-0">
                            <Clock className="w-4 h-4" />
                            <span>{activity.time}</span>
                          </div>
                        </div>

                        {/* Hover arrow */}
                        <div
                          className={`flex items-center gap-2 mt-3 text-sm font-medium transition-all duration-300 ${
                            isHovered
                              ? `bg-gradient-to-r ${activity.color} bg-clip-text text-transparent opacity-100`
                              : "opacity-0"
                          }`}
                        >
                          <span>View details</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Sparkle on hover */}
                      {isHovered && (
                        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
