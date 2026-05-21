"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Users, 
  Award, 
  Target, 
  Building, 
  Phone, 
  Mail, 
  Globe,
  CheckCircle,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionButton, ActionButtonGroup } from "@/components/buttons/action-button";
import beautifulMindData from "@/lib/content/research-hub/beautifulmind.json";

export function BeautifulMindProfile() {
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
      },
    },
  };

  return (
    <motion.section
      className="section-space bg-cream relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container-shell">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            BeautifulMind Consultants
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            {beautifulMindData.company.tagline}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Building className="w-4 h-4" />
            <span>Co-founded {beautifulMindData.company.founded}</span>
            <span>•</span>
            <span>{beautifulMindData.company.type}</span>
          </div>
        </motion.div>

        {/* Company Overview */}
        <motion.div 
          className="mb-12 p-8 bg-cream rounded-2xl shadow-elegant border border-sage/20"
          variants={itemVariants}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-bold mb-4 text-navy">About BeautifulMind</h3>
              <p className="text-muted-foreground leading-relaxed">
                {beautifulMindData.company.description}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-navy">Impact Metrics</h4>
              <div className="grid gap-4">
                {Object.entries(beautifulMindData.impact).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                      {key === 'clients' && <Users className="w-5 h-5 text-sage" />}
                      {key === 'programs' && <Target className="w-5 h-5 text-sage" />}
                      {key === 'training' && <Award className="w-5 h-5 text-sage" />}
                      {key === 'reach' && <Globe className="w-5 h-5 text-sage" />}
                      {key === 'partnerships' && <Heart className="w-5 h-5 text-sage" />}
                    </div>
                    <div>
                      <div className="font-semibold text-navy">{value}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Co-Founders */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-center">Leadership</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {beautifulMindData.coFounders.map((founder, index) => (
              <div
                key={index}
                className="p-6 bg-cream rounded-xl border border-sage/20 shadow-sm"
              >
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-navy">{founder.name}</h4>
                  <div className="text-sm text-sage-dark font-medium">{founder.title}</div>
                  <p className="text-sm text-muted-foreground">{founder.role}</p>
                  <div className="text-xs bg-sage/10 px-2 py-1 rounded text-sage-dark">
                    {founder.expertise}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-center">Services & Solutions</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {beautifulMindData.services.map((service, index) => (
              <div
                key={service.id}
                className="p-6 bg-cream rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-navy">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Key Offerings:</h5>
                    <ul className="space-y-1">
                      {service.offerings.map((offering, offeringIndex) => (
                        <li key={offeringIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-sage flex-shrink-0" />
                          <span>{offering}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-sage/10 p-3 rounded-lg">
                    <div className="text-xs font-medium text-navy mb-1">Approach:</div>
                    <div className="text-xs text-sage-dark">{service.approach}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy & Values */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-center">Our Philosophy</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="p-6 bg-cream rounded-xl border border-border shadow-sm">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-navy">
                <Lightbulb className="w-5 h-5 text-sage" />
                Core Values
              </h4>
              <div className="space-y-3">
                {beautifulMindData.philosophy.coreValues.map((value, index) => (
                  <div key={index} className="space-y-1">
                    <h5 className="font-medium text-navy">{value.title}</h5>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-sage/10 to-sage-light/10 rounded-xl border border-sage/20">
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-navy">
                <TrendingUp className="w-5 h-5 text-sage" />
                Vision & Approach
              </h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-navy mb-1">Our Vision</h5>
                  <p className="text-sm text-muted-foreground">{beautifulMindData.philosophy.vision}</p>
                </div>
                <div>
                  <h5 className="font-medium text-emerald-900 mb-1">Our Approach</h5>
                  <p className="text-sm text-muted-foreground">{beautifulMindData.philosophy.approach}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements & Partnerships */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6 text-center">Recognition & Partnerships</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-4">Achievements</h4>
              <div className="space-y-3">
                {beautifulMindData.achievements.map((achievement, index) => (
                  <div key={index} className="p-3 bg-gold/10 border border-gold/20 rounded-lg">
                    <div className="font-medium text-gold-dark">{achievement.title}</div>
                    <div className="text-sm text-gold-dark/70">{achievement.issuer} • {achievement.year}</div>
                    <div className="text-xs text-muted-foreground mt-1">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Key Partnerships</h4>
              <div className="space-y-3">
                {beautifulMindData.partnerships.map((partnership, index) => (
                  <div key={index} className="p-3 bg-navy/10 border border-navy-400/20 rounded-lg">
                    <div className="font-medium text-navy-800">{partnership.organization}</div>
                    <div className="text-sm text-navy-600">{partnership.type}</div>
                    <div className="text-xs text-muted-foreground mt-1">{partnership.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center p-8 bg-gradient-to-r from-sage to-sage-dark rounded-2xl text-cream"
          variants={itemVariants}
        >
          <h3 className="font-display text-2xl font-bold mb-4">Transform Mental Health in Your Community</h3>
          <p className="mb-6 opacity-90">
            Partner with BeautifulMind for culturally grounded mental health solutions that make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton 
              action="visit-website"
              size="lg"
              href={beautifulMindData.contact.website}
              asChild={true}
            />
            <ActionButton 
              action="get-in-touch"
              size="lg"
              href={`mailto:${beautifulMindData.contact.email}`}
              asChild={true}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
