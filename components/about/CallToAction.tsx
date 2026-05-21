"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Calendar, ArrowRight } from "lucide-react";

interface CallToActionProps {
  contactInfo?: {
    email: string;
    phone: string;
    location: string;
  };
}

export function CallToAction({ contactInfo }: CallToActionProps) {
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
        duration: 0.6,
      },
    },
  };

  const defaultContact = {
    email: "hello@stephenasatsa.com",
    phone: "+254 770 140 889",
    location: "Karen, Nairobi",
  };

  const contact = contactInfo || defaultContact;

  return (
    <motion.section
      ref={ref}
      className="section-space bg-gradient-to-br from-navy via-navy-800 to-navy-900 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sage/10 rounded-full blur-3xl" />
      </div>
      <div className="container-shell relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Header */}
          <motion.div
            className="text-center space-y-6"
            variants={itemVariants}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium tracking-wide uppercase mb-4"
              variants={itemVariants}
            >
              Get in Touch
            </motion.span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight">
              Let&apos;s{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-earth">
                Connect
              </span>
            </h2>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed">
              Whether you're interested in research collaboration, clinical consultation, or academic partnerships, 
              I'm here to explore how we can work together to advance mental health services in Africa.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-navy font-semibold rounded-xl hover:bg-cream-warm transition-all duration-300 group shadow-lg"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              Book Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            
            <motion.a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-cream/10 backdrop-blur-sm text-cream font-semibold rounded-xl border border-cream/30 hover:bg-cream/20 transition-all duration-300"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </motion.a>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="grid gap-8 sm:grid-cols-3 pt-8 border-t border-cream/20"
            variants={containerVariants}
          >
            <motion.div
              className="text-center space-y-3"
              variants={itemVariants}
            >
              <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-cream/10 backdrop-blur-sm">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-cream mb-1">Email</h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </motion.div>

            <motion.div
              className="text-center space-y-3"
              variants={itemVariants}
            >
              <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-cream/10 backdrop-blur-sm">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-cream mb-1">Phone</h3>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-cream/80 hover:text-cream transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              className="text-center space-y-3"
              variants={itemVariants}
            >
              <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-cream/10 backdrop-blur-sm">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-cream mb-1">Location</h3>
                <p className="text-cream/80">
                  {contact.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
