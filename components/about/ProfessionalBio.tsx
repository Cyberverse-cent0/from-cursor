"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AboutContent } from "./types";

interface ProfessionalBioProps {
  content: AboutContent | null;
}

export function ProfessionalBio({ content }: ProfessionalBioProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [quoteHovered, setQuoteHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
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

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Key terms to highlight with annotations
  const highlightTerms = [
    { term: "indigenous knowledge systems", color: "sage" },
    { term: "decolonization", color: "gold" },
    { term: "Luhya rituals", color: "amber" },
    { term: "thanatology", color: "navy" },
    { term: "Cultural Evolution Society", color: "gold" },
    { term: "Templeton Foundation", color: "gold" },
    { term: "BeautifulMind Consultants", color: "sage" },
    { term: "HRAF Global Scholar", color: "navy" },
  ];

  const highlightText = (text: string) => {
    let result = text;
    highlightTerms.forEach(({ term, color }) => {
      const colorClasses: Record<string, string> = {
        sage: "text-sage-dark font-semibold border-b-2 border-sage/40 hover:border-sage transition-colors",
        gold: "text-gold-dark font-semibold border-b-2 border-gold/40 hover:border-gold transition-colors",
        amber: "text-amber-dark font-semibold border-b-2 border-amber-earth/40 hover:border-amber-earth transition-colors",
        navy: "text-navy font-semibold border-b-2 border-navy-400/40 hover:border-navy-400 transition-colors",
      };
      
      const regex = new RegExp(`(${term})`, "gi");
      result = result.replace(regex, `<span class="${colorClasses[color]}">$1</span>`);
    });
    return result;
  };

  if (!content) {
    return (
      <section className="section-space bg-cream">
        <div className="container-shell">
          <div className="text-center">
            <p className="text-muted-foreground">Loading biography...</p>
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
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1a2744 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-shell relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Section Header */}
          <motion.div
            className="text-center space-y-4"
            variants={itemVariants}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full bg-navy/5 text-navy text-sm font-medium tracking-wide uppercase"
              variants={itemVariants}
            >
              About
            </motion.span>
            <motion.h2 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight"
              variants={itemVariants}
            >
              Professional Biography
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              A journey dedicated to advancing psychological science and mental health services in Africa
            </motion.p>
          </motion.div>

          {/* Biography Content with Highlighted Terms */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            {content.aboutFull.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-lg leading-[1.9] text-foreground/80"
                variants={itemVariants}
                dangerouslySetInnerHTML={{ __html: highlightText(paragraph) }}
              />
            ))}
          </motion.div>

          {/* Premium Quote Block */}
          {content.quote && (
            <motion.div
              className="relative"
              variants={quoteVariants}
              onMouseEnter={() => setQuoteHovered(true)}
              onMouseLeave={() => setQuoteHovered(false)}
            >
              <motion.div
                className="relative bg-gradient-to-br from-navy via-navy-800 to-navy-900 rounded-3xl p-10 md:p-14 overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              >
                {/* Animated gradient background */}
                <motion.div 
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: quoteHovered 
                      ? "radial-gradient(circle at 30% 70%, rgba(201,162,39,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(212,165,116,0.2) 0%, transparent 50%)"
                      : "radial-gradient(circle at 50% 50%, rgba(201,162,39,0.1) 0%, transparent 50%)",
                  }}
                  transition={{ duration: 0.8 }}
                />

                {/* Quote marks */}
                <motion.div 
                  className="absolute top-6 left-6 text-8xl text-gold/20 font-serif leading-none select-none"
                  animate={{ 
                    scale: quoteHovered ? 1.1 : 1,
                    rotate: quoteHovered ? -5 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  "
                </motion.div>
                <motion.div 
                  className="absolute bottom-6 right-6 text-8xl text-gold/20 font-serif leading-none select-none rotate-180"
                  animate={{ 
                    scale: quoteHovered ? 1.1 : 1,
                    rotate: quoteHovered ? 175 : 180,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  "
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <blockquote className="font-quote text-2xl md:text-3xl lg:text-4xl text-cream italic leading-relaxed mb-8">
                    {content.quote.text}
                  </blockquote>
                  
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-gold/40" />
                    <cite className="text-sm font-medium text-gold uppercase tracking-widest">
                      {content.quote.author}
                    </cite>
                    <div className="h-px w-12 bg-gold/40" />
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-gold/30" />
                <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-gold/30" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-gold/30" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-gold/30" />

                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-24 h-24 bg-gold/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-earth/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Quick Stats Row */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border"
            variants={itemVariants}
          >
            {[
              { number: "16", label: "Global Projects", highlight: "Funded" },
              { number: "8+", label: "Research", highlight: "Collaborators" },
              { number: "48", label: "Publications", highlight: "Peer-reviewed" },
              { number: "2023", label: "HRAF Scholar", highlight: "Global" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-navy/5 hover:bg-navy/10 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-navy font-mono mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-foreground/70 font-medium">
                  {stat.label}
                </div>
                <div className="text-xs text-gold mt-1">
                  {stat.highlight}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
