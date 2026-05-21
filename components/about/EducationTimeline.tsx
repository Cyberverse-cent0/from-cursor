"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle, Sparkles } from "lucide-react";
import educationData from "@/lib/content/research-hub/education.json";

export function EducationTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  // New color scheme based on African Academic Prestige palette
  const getLevelIcon = (level: string) => {
    switch (level) {
      case "doctorate":
        return <GraduationCap className="w-6 h-6 text-cream" />;
      case "masters":
        return <Award className="w-6 h-6 text-cream" />;
      case "diploma":
        return <BookOpen className="w-6 h-6 text-cream" />;
      case "bachelors":
        return <BookOpen className="w-6 h-6 text-cream" />;
      default:
        return <GraduationCap className="w-6 h-6 text-cream" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "doctorate":
        return {
          bg: "bg-gradient-to-br from-gold/10 to-amber-earth/10",
          border: "border-gold/30",
          iconBg: "bg-gradient-to-br from-gold to-amber-earth",
          badge: "bg-gold text-navy",
          accent: "text-gold",
        };
      case "masters":
        return {
          bg: "bg-gradient-to-br from-navy/10 to-navy-600/10",
          border: "border-navy-400/30",
          iconBg: "bg-gradient-to-br from-navy-600 to-navy-800",
          badge: "bg-navy text-cream",
          accent: "text-navy-600",
        };
      case "diploma":
        return {
          bg: "bg-gradient-to-br from-sage/10 to-sage-light/10",
          border: "border-sage/30",
          iconBg: "bg-gradient-to-br from-sage to-sage-dark",
          badge: "bg-sage text-cream",
          accent: "text-sage-dark",
        };
      case "bachelors":
        return {
          bg: "bg-gradient-to-br from-amber-earth/10 to-amber-50",
          border: "border-amber-earth/30",
          iconBg: "bg-gradient-to-br from-amber-earth to-amber-dark",
          badge: "bg-amber-earth text-cream",
          accent: "text-amber-dark",
        };
      default:
        return {
          bg: "bg-cream",
          border: "border-border",
          iconBg: "bg-navy",
          badge: "bg-navy text-cream",
          accent: "text-navy",
        };
    }
  };

  return (
    <motion.section
      ref={ref}
      className="section-space bg-cream-warm relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sage/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-gold/5 to-transparent" />

      <div className="container-shell relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-16 space-y-4" variants={itemVariants}>
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-navy/10 text-navy text-sm font-medium tracking-wide uppercase"
            variants={itemVariants}
          >
            Academic Background
          </motion.span>
          <motion.h2 
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight"
            variants={itemVariants}
          >
            Academic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-earth">
              Journey
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A comprehensive educational foundation spanning psychology, counseling, 
            and research methodology across Kenya&apos;s premier academic institutions.
          </motion.p>
        </motion.div>

        {/* Academic Progression Summary Cards */}
        <motion.div 
          className="mb-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={itemVariants}
        >
          {[
            { value: educationData.academicProgression.totalYears, label: "Higher Education", icon: Calendar, color: "gold" },
            { value: educationData.academicProgression.institutions, label: "Universities", icon: MapPin, color: "navy" },
            { value: educationData.education.length, label: "Degrees", icon: GraduationCap, color: "sage" },
            { value: educationData.certifications.length, label: "Certifications", icon: Award, color: "amber" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses: Record<string, string> = {
              gold: "from-gold/20 to-amber-earth/10 text-gold-dark",
              navy: "from-navy/20 to-navy-600/10 text-navy-600",
              sage: "from-sage/20 to-sage-light/10 text-sage-dark",
              amber: "from-amber-earth/20 to-amber/10 text-amber-dark",
            };
            
            return (
              <motion.div
                key={stat.label}
                className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[stat.color]} border border-border backdrop-blur-sm`}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-8 h-8 mb-3 opacity-60" />
                <div className="text-3xl font-bold font-mono mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Education Timeline */}
        <div className="space-y-8 mb-16">
          {educationData.education.map((edu, index) => {
            const colors = getLevelColor(edu.level);
            return (
              <motion.div
                key={edu.id}
                className="flex gap-6 items-start"
                variants={itemVariants}
              >
                {/* Icon and Year with animated timeline connector */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div 
                    className={`p-3 rounded-2xl ${colors.iconBg} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getLevelIcon(edu.level)}
                  </motion.div>
                  {index < educationData.education.length - 1 && (
                    <motion.div 
                      className="w-0.5 flex-1 bg-gradient-to-b from-border via-sage/30 to-border mt-4 min-h-[80px]"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      style={{ originY: 0 }}
                    />
                  )}
                </div>

                {/* Content Card */}
                <motion.div 
                  className={`flex-1 p-6 md:p-8 rounded-2xl border ${colors.bg} ${colors.border} backdrop-blur-sm`}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-4">
                    {/* Badge and Year */}
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${colors.badge}`}>
                        {edu.level}
                      </span>
                      <span className="text-sm text-muted-foreground font-mono">{edu.years}</span>
                    </div>

                    {/* Degree Title */}
                    <h3 className="font-display text-xl md:text-2xl font-bold text-navy">
                      {edu.degree}
                    </h3>
                    
                    {/* Institution */}
                    <div className="flex items-center gap-2 text-foreground/70">
                      <MapPin className="w-4 h-4 text-sage" />
                      <span className="font-medium">{edu.institution}</span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">{edu.description}</p>

                    {/* Thesis/Research */}
                    {edu.thesis && (
                      <div className="mt-4 p-4 bg-cream rounded-xl border border-border/50">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-gold" />
                          Research Focus
                        </h4>
                        <p className="text-sm text-muted-foreground italic">{edu.thesis}</p>
                      </div>
                    )}

                    {/* Achievements */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-sm mb-3 text-navy">Key Achievements</h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Professional Certifications */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center text-navy">
            Professional Certifications
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {educationData.certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="p-5 bg-cream rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-full min-h-[60px] rounded-full ${cert.status === 'Active' ? 'bg-sage' : 'bg-muted'} self-stretch`} />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-navy">{cert.title}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{cert.issuingBody}</div>
                      <div className="font-mono text-xs">{cert.year}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${cert.status === 'Active' ? 'bg-sage/10 text-sage-dark' : 'bg-muted text-muted-foreground'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${cert.status === 'Active' ? 'bg-sage' : 'bg-muted-foreground'}`} />
                      {cert.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Development */}
        <motion.div variants={itemVariants}>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center text-navy">
            Professional Development
          </h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {educationData.professionalDevelopment.map((dev, index) => (
              <motion.div
                key={dev.id}
                className="p-5 bg-gradient-to-br from-navy/5 to-navy-600/5 rounded-xl border border-navy/10 hover:border-navy/20 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="space-y-3">
                  <h4 className="font-semibold text-navy">{dev.title}</h4>
                  <div className="text-sm text-muted-foreground">
                    <div>{dev.institution}</div>
                    <div className="font-mono">{dev.year}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{dev.description}</p>
                  <div className="text-xs font-medium text-sage bg-sage/10 px-2 py-1 rounded-full inline-block">
                    {dev.focus}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
