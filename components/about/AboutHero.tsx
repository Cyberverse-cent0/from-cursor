"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useTransform as useScrollTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { StatCounter } from "./types";
import { AnimatedCounter } from "./AnimatedCounter";
import { 
  BookOpen, 
  Mail, 
  Download, 
  FlaskConical, 
  Briefcase, 
  Brain,
  Users,
  Award,
  Globe,
  GraduationCap,
  Edit3
} from "lucide-react";

interface AboutHeroProps {
  portraitSrc: string;
  stats: StatCounter[];
}

export function AboutHero({ portraitSrc, stats }: AboutHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Scroll-based parallax for background images
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax transforms for scroll - different speeds for depth effect
  const scrollY1 = useScrollTransform(scrollYProgress, [0, 1], [0, 150]);
  const scrollY2 = useScrollTransform(scrollYProgress, [0, 1], [0, -100]);
  const scrollY3 = useScrollTransform(scrollYProgress, [0, 1], [0, 200]);
  const scrollOpacity = useScrollTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const floatY1 = useScrollTransform(scrollYProgress, [0, 1], [0, 80]);
  const floatY2 = useScrollTransform(scrollYProgress, [0, 1], [0, -60]);

  // Mouse position tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse following
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers - MUST be called at top level
  const backgroundX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const backgroundY = useTransform(smoothY, [-0.5, 0.5], [30, -30]);
  const midgroundX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const midgroundY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const foregroundX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const foregroundY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const secondaryX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const secondaryY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const tertiaryX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const tertiaryY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden min-h-screen flex items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dynamic Aurora Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-800 to-navy-900">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(201,162,39,0.4) 0%, transparent 70%)",
            x: isMounted ? backgroundX : 0,
            y: isMounted ? backgroundY : 0,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)",
            x: isMounted ? secondaryX : 0,
            y: isMounted ? secondaryY : 0,
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-1/4 bottom-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(107,142,107,0.4) 0%, transparent 70%)",
            x: isMounted ? tertiaryX : 0,
            y: isMounted ? tertiaryY : 0,
          }}
        />
      </div>

      {/* Personalized Parallax Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Image Layer 1 - African Pattern/Texture (Slowest) */}
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] opacity-[0.08]"
          style={{ y: scrollY1, opacity: scrollOpacity }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-earth/40 via-gold/30 to-transparent blur-3xl" />
        </motion.div>
        
        {/* Background Image Layer 2 - Academic/Psychology Symbol (Medium speed) */}
        <motion.div
          className="absolute top-[30%] -right-[5%] w-[40%] h-[50%] opacity-[0.06]"
          style={{ y: scrollY2, opacity: scrollOpacity }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tl from-sage/40 via-navy-600/30 to-transparent blur-3xl" />
        </motion.div>
        
        {/* Background Image Layer 3 - Cultural Element (Fastest) */}
        <motion.div
          className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] opacity-[0.05]"
          style={{ y: scrollY3, opacity: scrollOpacity }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-gold/30 via-amber-earth/20 to-transparent blur-3xl" />
        </motion.div>
        
        {/* Floating Decorative Elements - Personal touches */}
        <motion.div
          className="absolute top-[15%] left-[5%] w-32 h-32 opacity-[0.15]"
          style={{ y: floatY1 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-gold">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-[25%] right-[8%] w-24 h-24 opacity-[0.12]"
          style={{ y: floatY2 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-sage">
            <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </motion.div>
        
        {/* Subtle Grid Pattern Overlay for texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,162,39,03) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #c9a227 12%, transparent 12.5%, transparent 87%, #c9a227 87.5%, #c9a227),
            linear-gradient(150deg, #c9a227 12%, transparent 12.5%, transparent 87%, #c9a227 87.5%, #c9a227),
            linear-gradient(30deg, #c9a227 12%, transparent 12.5%, transparent 87%, #c9a227 87.5%, #c9a227),
            linear-gradient(150deg, #c9a227 12%, transparent 12.5%, transparent 87%, #c9a227 87.5%, #c9a227),
            linear-gradient(60deg, #d4a57477 25%, transparent 25.5%, transparent 75%, #d4a57477 75%, #d4a57477),
            linear-gradient(60deg, #d4a57477 25%, transparent 25.5%, transparent 75%, #d4a57477 75%, #d4a57477)
          `,
          backgroundSize: "80px 140px",
          backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
        }}
      />

      {/* Content Container */}
      <div className="container-shell relative z-10 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div className="space-y-8 lg:space-y-10" variants={itemVariants}>
            {/* Pre-title Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                PhD Counseling Psychology
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <motion.h1 
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-[1.1]"
                variants={itemVariants}
              >
                Dr. Stephen{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-earth">
                  Asatsa
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl sm:text-2xl font-medium text-amber-earth/90"
                variants={itemVariants}
              >
                Senior Lecturer & Head of Psychology Department
              </motion.p>
              <motion.p 
                className="text-lg text-cream/60 italic"
                variants={itemVariants}
              >
                Catholic University of Eastern Africa
              </motion.p>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg leading-relaxed text-cream/80 max-w-xl"
              variants={itemVariants}
            >
              Leading research in indigenous knowledge systems and cultural psychology 
              while advancing mental health services across Africa. HRAF Global Scholar 
              2023 & Templeton Foundation funded researcher.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {/* Book a Consultation */}
              <motion.button
                className="group relative px-5 py-3 bg-gradient-to-r from-gold to-amber-earth text-navy font-semibold rounded-xl hover:shadow-glow transition-all duration-300 flex items-center gap-2 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Book a Consultation</span>
              </motion.button>

              {/* Contact */}
              <motion.button
                className="group relative px-5 py-3 bg-gradient-to-r from-navy-600 to-navy-700 text-cream font-semibold rounded-xl border-2 border-gold/30 hover:border-gold/60 hover:shadow-glow transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </motion.button>

              {/* Download CV */}
              <motion.button
                className="group relative px-5 py-3 bg-gradient-to-r from-sage to-emerald-700 text-cream font-semibold rounded-xl hover:shadow-lg hover:shadow-sage/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                <span>Download CV</span>
              </motion.button>

              {/* Research Hub */}
              <motion.button
                className="group relative px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-cream font-semibold rounded-xl hover:shadow-lg hover:shadow-purple/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FlaskConical className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Research Hub</span>
              </motion.button>

              {/* Services */}
              <motion.button
                className="group relative px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-cream font-semibold rounded-xl hover:shadow-lg hover:shadow-blue/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Services</span>
              </motion.button>

              {/* BeautifulMind */}
              <motion.button
                className="group relative px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-cream font-semibold rounded-xl hover:shadow-lg hover:shadow-pink/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain className="w-5 h-5 group-hover:pulse transition-transform" />
                <span>BeautifulMind</span>
              </motion.button>

              {/* Professional Affiliations */}
              <motion.button
                className="group relative px-5 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-cream font-semibold rounded-xl hover:shadow-lg hover:shadow-teal/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Professional Affiliations</span>
              </motion.button>

              {/* SRCD Council */}
              <motion.button
                className="group relative px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-cream font-semibold rounded-lg hover:shadow-lg hover:shadow-orange/30 transition-all duration-300 flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>SRCD Council</span>
              </motion.button>

              {/* EAPP Africa */}
              <motion.button
                className="group relative px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-cream font-semibold rounded-lg hover:shadow-lg hover:shadow-green/30 transition-all duration-300 flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>EAPP Africa</span>
              </motion.button>

              {/* ISSBD */}
              <motion.button
                className="group relative px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-cream font-semibold rounded-lg hover:shadow-lg hover:shadow-violet/30 transition-all duration-300 flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <GraduationCap className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span>ISSBD</span>
              </motion.button>

              {/* Frontiers Editor */}
              <motion.button
                className="group relative px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-cream font-semibold rounded-lg hover:shadow-lg hover:shadow-slate/30 transition-all duration-300 flex items-center gap-2 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Frontiers Editor</span>
              </motion.button>
            </motion.div>

            {/* Stats Grid with Animated Counters */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-cream/10"
              variants={itemVariants}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statVariants}
                  className="text-center p-4 rounded-xl bg-cream/5 backdrop-blur-sm border border-cream/10 hover:border-gold/30 transition-colors duration-300"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-gold mb-1">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm font-medium text-cream/90">
                    {stat.label}
                  </div>
                  <div className="text-xs text-cream/50 mt-1 hidden sm:block">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Portrait with Parallax */}
          <motion.div
            className="relative order-first lg:order-last"
            variants={itemVariants}
            style={{
              x: isMounted ? foregroundX : 0,
              y: isMounted ? foregroundY : 0,
            }}
          >
            <div className="relative aspect-square lg:aspect-[3/4] max-w-md mx-auto lg:max-w-none">
              {/* Decorative rotating rings */}
              <motion.div 
                className="absolute -inset-4 rounded-full border border-gold/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute -inset-8 rounded-full border border-dashed border-amber-earth/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/30 via-amber-earth/20 to-sage/30 rounded-3xl blur-3xl" />
              
              {/* Decorative background shapes */}
              <motion.div 
                className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-gold/40 to-amber-earth/40 rounded-full blur-2xl"
                style={{
                  x: isMounted ? midgroundX : 0,
                  y: isMounted ? midgroundY : 0,
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-sage/40 to-navy-600/40 rounded-full blur-2xl"
                style={{
                  x: isMounted ? midgroundX : 0,
                  y: isMounted ? midgroundY : 0,
                }}
              />
              
              {/* Image container */}
              <motion.div 
                className="relative w-full h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-cream/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={portraitSrc}
                  alt="Dr. Stephen Asatsa"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold/60" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold/60" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold/60" />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-cream text-navy px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-xs font-semibold text-navy-700">HRAF Global</p>
                  <p className="text-[10px] text-navy-500">Scholar 2023</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </motion.section>
  );
}
