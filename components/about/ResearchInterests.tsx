"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Globe, Heart, Lightbulb, Microscope, Award, Trophy, Crown, Gem, Sparkles, Target } from "lucide-react";
import { ResearchInterest } from "./types";
import { TiltCard } from "./TiltCard";

interface ResearchInterestsProps {
  interests: ResearchInterest[];
  loading: boolean;
}

const iconMap: Record<string, any> = {
  Brain,
  Globe,
  Heart,
  Lightbulb,
  Microscope,
  Award,
  Trophy,
  Crown,
  Gem,
  Sparkles,
  Target,
};

// New African Academic Prestige color scheme
const getColorClasses = (color: string) => {
  const colors: Record<string, any> = {
    // Indigenous Knowledge - Earth tones (amber, terracotta)
    amber: {
      bg: "bg-gradient-to-br from-amber-earth/10 to-amber-50",
      border: "border-amber-earth/30",
      iconBg: "bg-gradient-to-br from-amber-earth to-amber-dark",
      iconColor: "text-amber-dark",
      text: "text-amber-dark",
      subtext: "text-amber-dark/70",
      hover: "hover:shadow-amber-earth/20 hover:border-amber-earth/50",
      gradient: "from-amber-earth via-amber-light to-amber-earth",
    },
    // Decolonization - Deep purple with gold accents
    purple: {
      bg: "bg-gradient-to-br from-navy-800/10 to-navy-50",
      border: "border-navy-400/30",
      iconBg: "bg-gradient-to-br from-navy-600 to-navy-800",
      iconColor: "text-navy-400",
      text: "text-navy-800",
      subtext: "text-navy-600/70",
      hover: "hover:shadow-navy-500/20 hover:border-navy-400/50",
      gradient: "from-navy-600 via-gold to-navy-600",
    },
    // Thanatology - Deep blues with cream
    blue: {
      bg: "bg-gradient-to-br from-navy/10 to-cream",
      border: "border-navy-300/30",
      iconBg: "bg-gradient-to-br from-navy-500 to-navy-700",
      iconColor: "text-navy-400",
      text: "text-navy-900",
      subtext: "text-navy-600/70",
      hover: "hover:shadow-navy-500/20 hover:border-navy-400/50",
      gradient: "from-navy-500 via-cream to-navy-500",
    },
    // Cultural Evolution - Greens with earth tones
    sage: {
      bg: "bg-gradient-to-br from-sage/10 to-sage-light/20",
      border: "border-sage/30",
      iconBg: "bg-gradient-to-br from-sage to-sage-dark",
      iconColor: "text-sage-dark",
      text: "text-sage-dark",
      subtext: "text-sage-dark/70",
      hover: "hover:shadow-sage/20 hover:border-sage/50",
      gradient: "from-sage via-sage-light to-sage",
    },
    // Gold accent for prestigious items
    gold: {
      bg: "bg-gradient-to-br from-gold/10 to-amber-50",
      border: "border-gold/30",
      iconBg: "bg-gradient-to-br from-gold to-amber-earth",
      iconColor: "text-gold-dark",
      text: "text-gold-dark",
      subtext: "text-gold-dark/70",
      hover: "hover:shadow-gold/30 hover:border-gold/50",
      gradient: "from-gold via-gold-light to-gold",
    },
    // Default emerald mapped to sage
    emerald: {
      bg: "bg-gradient-to-br from-sage/10 to-sage-light/20",
      border: "border-sage/30",
      iconBg: "bg-gradient-to-br from-sage to-sage-dark",
      iconColor: "text-sage-dark",
      text: "text-sage-dark",
      subtext: "text-sage-dark/70",
      hover: "hover:shadow-sage/20 hover:border-sage/50",
      gradient: "from-sage via-sage-light to-sage",
    },
    // Green mapped to sage
    green: {
      bg: "bg-gradient-to-br from-sage/10 to-sage-light/20",
      border: "border-sage/30",
      iconBg: "bg-gradient-to-br from-sage to-sage-dark",
      iconColor: "text-sage-dark",
      text: "text-sage-dark",
      subtext: "text-sage-dark/70",
      hover: "hover:shadow-sage/20 hover:border-sage/50",
      gradient: "from-sage via-sage-light to-sage",
    },
    // Orange mapped to amber
    orange: {
      bg: "bg-gradient-to-br from-amber-earth/10 to-amber-50",
      border: "border-amber-earth/30",
      iconBg: "bg-gradient-to-br from-amber-earth to-amber-dark",
      iconColor: "text-amber-dark",
      text: "text-amber-dark",
      subtext: "text-amber-dark/70",
      hover: "hover:shadow-amber-earth/20 hover:border-amber-earth/50",
      gradient: "from-amber-earth via-amber-light to-amber-earth",
    },
  };
  return colors[color] || colors.sage;
};

export function ResearchInterests({ interests, loading }: ResearchInterestsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  if (loading) {
    return (
      <section className="section-space bg-cream">
        <div className="container-shell">
          <div className="text-center">
            <p className="text-muted-foreground">Loading research interests...</p>
          </div>
        </div>
      </section>
    );
  }

  if (interests.length === 0) {
    return (
      <section className="section-space bg-cream">
        <div className="container-shell">
          <div className="text-center">
            <p className="text-muted-foreground">No research interests available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      className="section-space bg-cream relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy/3 rounded-full blur-3xl" />
      </div>

      <div className="container-shell relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            className="text-center space-y-4"
            variants={itemVariants}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full bg-sage/10 text-sage-dark text-sm font-medium tracking-wide uppercase"
              variants={itemVariants}
            >
              Research Focus
            </motion.span>
            <motion.h2 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight"
              variants={itemVariants}
            >
              Research Interests &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage to-sage-dark">
                Expertise
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Exploring the intersection of indigenous knowledge, cultural psychology, 
              and mental health practice in African contexts
            </motion.p>
          </motion.div>

          {/* Research Interests Grid with 3D Tilt Cards */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
          >
            {interests.map((interest, index) => {
              const colors = getColorClasses(interest.color);
              const Icon = iconMap[interest.icon] || Brain;
              
              return (
                <motion.div
                  key={interest.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <TiltCard className="h-full">
                    <div 
                      className={`group relative h-full p-6 rounded-2xl border ${colors.bg} ${colors.border} ${colors.hover} transition-all duration-300 cursor-pointer backdrop-blur-sm`}
                    >
                      {/* Animated gradient border on hover */}
                      <div 
                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${colors.gradient}`} 
                        style={{ 
                          padding: '1px',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                        }}
                      />
                      
                      {/* Icon with animation */}
                      <motion.div 
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg} text-white mb-5 shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>
                      
                      {/* Content */}
                      <h3 className={`font-display font-semibold text-xl mb-3 ${colors.text}`}>
                        {interest.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${colors.subtext}`}>
                        {interest.description}
                      </p>
                      
                      {/* Decorative corner accent */}
                      <div className={`absolute top-4 right-4 w-16 h-16 ${colors.iconBg} opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {/* Hover indicator */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          className="flex items-center gap-1 text-xs font-medium text-foreground/50"
                        >
                          <span>Learn more</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center pt-8"
            variants={itemVariants}
          >
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-cream font-medium rounded-xl hover:bg-navy-800 transition-colors duration-300 shadow-elegant"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-4 h-4" />
              View All Publications
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
