"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Trophy, Crown, Medal, Star, Calendar, Building, ExternalLink, Sparkles, Target } from "lucide-react";
import { Award as AwardType } from "./types";

interface AchievementsTimelineProps {
  awards: AwardType[];
  loading: boolean;
}

const iconMap: Record<string, any> = {
  Award,
  Trophy,
  Crown,
  Medal,
  Star,
  Calendar,
  Building,
  Target,
};

// New African Academic Prestige color scheme
const getColorClasses = (color: string) => {
  const colors: Record<string, any> = {
    gold: {
      bg: "bg-gradient-to-br from-gold/10 to-amber-earth/5",
      border: "border-gold/30",
      dot: "bg-gradient-to-br from-gold to-amber-earth",
      icon: "text-cream",
      text: "text-amber-dark",
      subtext: "text-amber-dark/70",
      glow: "shadow-gold/20",
      badge: "bg-gold text-navy",
    },
    purple: {
      bg: "bg-gradient-to-br from-navy-800/10 to-navy-600/5",
      border: "border-navy-400/30",
      dot: "bg-gradient-to-br from-navy-600 to-navy-800",
      icon: "text-cream",
      text: "text-navy-800",
      subtext: "text-navy-600/70",
      glow: "shadow-navy-500/20",
      badge: "bg-navy text-cream",
    },
    blue: {
      bg: "bg-gradient-to-br from-navy/10 to-navy-600/5",
      border: "border-navy-300/30",
      dot: "bg-gradient-to-br from-navy-500 to-navy-700",
      icon: "text-cream",
      text: "text-navy-900",
      subtext: "text-navy-600/70",
      glow: "shadow-navy-500/20",
      badge: "bg-navy-500 text-cream",
    },
    sage: {
      bg: "bg-gradient-to-br from-sage/10 to-sage-light/5",
      border: "border-sage/30",
      dot: "bg-gradient-to-br from-sage to-sage-dark",
      icon: "text-cream",
      text: "text-sage-dark",
      subtext: "text-sage-dark/70",
      glow: "shadow-sage/20",
      badge: "bg-sage text-cream",
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-earth/10 to-amber/5",
      border: "border-amber-earth/30",
      dot: "bg-gradient-to-br from-amber-earth to-amber-dark",
      icon: "text-cream",
      text: "text-amber-dark",
      subtext: "text-amber-dark/70",
      glow: "shadow-amber-earth/20",
      badge: "bg-amber-earth text-cream",
    },
    // Default mappings
    emerald: {
      bg: "bg-gradient-to-br from-sage/10 to-sage-light/5",
      border: "border-sage/30",
      dot: "bg-gradient-to-br from-sage to-sage-dark",
      icon: "text-cream",
      text: "text-sage-dark",
      subtext: "text-sage-dark/70",
      glow: "shadow-sage/20",
      badge: "bg-sage text-cream",
    },
    green: {
      bg: "bg-gradient-to-br from-sage/10 to-sage-light/5",
      border: "border-sage/30",
      dot: "bg-gradient-to-br from-sage to-sage-dark",
      icon: "text-cream",
      text: "text-sage-dark",
      subtext: "text-sage-dark/70",
      glow: "shadow-sage/20",
      badge: "bg-sage text-cream",
    },
    orange: {
      bg: "bg-gradient-to-br from-amber-earth/10 to-amber/5",
      border: "border-amber-earth/30",
      dot: "bg-gradient-to-br from-amber-earth to-amber-dark",
      icon: "text-cream",
      text: "text-amber-dark",
      subtext: "text-amber-dark/70",
      glow: "shadow-amber-earth/20",
      badge: "bg-amber-earth text-cream",
    },
  };
  return colors[color] || colors.gold;
};

export function AchievementsTimeline({ awards, loading }: AchievementsTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  if (loading) {
    return (
      <section className="section-space bg-cream">
        <div className="container-shell">
          <div className="text-center">
            <p className="text-muted-foreground">Loading achievements...</p>
          </div>
        </div>
      </section>
    );
  }

  if (awards.length === 0) {
    return (
      <section className="section-space bg-cream">
        <div className="container-shell">
          <div className="text-center">
            <p className="text-muted-foreground">No achievements available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  // Sort awards by year (newest first)
  const sortedAwards = [...awards].sort((a, b) => b.year - a.year);

  // Get unique years for filter
  const years = [...new Set(sortedAwards.map(a => a.year.toString()))].sort((a, b) => parseInt(b) - parseInt(a));

  // Filter awards by selected year
  const filteredAwards = selectedYear 
    ? sortedAwards.filter(a => a.year.toString() === selectedYear)
    : sortedAwards;

  return (
    <motion.section
      ref={ref}
      className="section-space bg-cream relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
      </div>

      <div className="container-shell relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            className="text-center space-y-4"
            variants={itemVariants}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-medium tracking-wide uppercase"
              variants={itemVariants}
            >
              Recognition
            </motion.span>
            <motion.h2 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight"
              variants={itemVariants}
            >
              Academic Leadership &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-earth">
                Achievements
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              A timeline of significant milestones, awards, and leadership roles in academia and research
            </motion.p>
          </motion.div>

          {/* Year Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => setSelectedYear(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedYear === null 
                  ? "bg-navy text-cream" 
                  : "bg-navy/10 text-navy hover:bg-navy/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Years
            </motion.button>
            {years.map(year => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedYear === year 
                    ? "bg-gold text-navy" 
                    : "bg-gold/10 text-gold-dark hover:bg-gold/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {year}
              </motion.button>
            ))}
          </motion.div>

          {/* Trophy Cabinet Grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {filteredAwards.map((award, index) => {
              const colors = getColorClasses(award.color);
              const Icon = iconMap[award.icon] || Award;
              
              return (
                <motion.div
                  key={award.id}
                  className="group relative"
                  variants={itemVariants}
                  layout
                >
                  <motion.div
                    className={`relative h-full p-6 rounded-2xl border ${colors.bg} ${colors.border} backdrop-blur-sm transition-all duration-300 overflow-hidden`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glowing effect on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.glow} blur-xl`} />
                    
                    {/* Year badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${colors.badge}`}>
                        <Calendar className="w-3 h-3 mr-1" />
                        {award.year}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl ${colors.dot} flex items-center justify-center ${colors.icon} shadow-lg mb-5`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>

                    {/* Content */}
                    <h3 className={`font-display font-semibold text-lg mb-2 ${colors.text}`}>
                      {award.title}
                    </h3>
                    
                    {award.organization && (
                      <p className={`text-sm font-medium ${colors.subtext} flex items-center gap-2 mb-3`}>
                        <Building className="w-4 h-4 flex-shrink-0" />
                        {award.organization}
                      </p>
                    )}
                    
                    {award.description && (
                      <p className={`text-sm leading-relaxed ${colors.subtext} line-clamp-3`}>
                        {award.description}
                      </p>
                    )}
                    
                    {/* Featured achievements get special treatment */}
                    {award.color === "gold" && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
                    )}
                    
                    {/* Link if available */}
                    {award.url && (
                      <motion.a
                        href={award.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 p-2 rounded-full bg-cream/80 hover:bg-cream text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Featured Stats Row */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border"
            variants={itemVariants}
          >
            {[
              { icon: Trophy, value: awards.length, label: "Awards & Honors" },
              { icon: Star, value: years.length, label: "Years Active" },
              { icon: Target, value: "16", label: "Global Projects" },
              { icon: Sparkles, value: "2023", label: "HRAF Scholar" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-navy/5 hover:bg-navy/10 transition-colors duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-navy font-mono mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
