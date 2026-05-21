import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Phone, 
  Download, 
  FileText, 
  Microscope, 
  BookOpen, 
  Briefcase, 
  Users, 
  Brain, 
  Heart, 
  Award, 
  Globe, 
  MapPin, 
  TrendingUp, 
  Edit, 
  PenTool,
  ArrowRight,
  Mail,
  Star
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ActionButtonConfig {
  label: string;
  icon: LucideIcon;
  secondaryIcon?: LucideIcon;
  variant: "consultation" | "professional" | "academic" | "organization" | "default";
  description?: string;
}

export const actionButtonConfigs: Record<string, ActionButtonConfig> = {
  "book-consultation": {
    label: "Book a Consultation",
    icon: Calendar,
    secondaryIcon: Clock,
    variant: "consultation",
    description: "Schedule a professional consultation with Dr. Stephen Asatsa"
  },
  "contact": {
    label: "Contact",
    icon: MessageSquare,
    secondaryIcon: Phone,
    variant: "consultation",
    description: "Get in touch with our team"
  },
  "download-cv": {
    label: "Download CV",
    icon: Download,
    secondaryIcon: FileText,
    variant: "professional",
    description: "Download Dr. Asatsa's curriculum vitae"
  },
  "research-hub": {
    label: "Research Hub",
    icon: Microscope,
    secondaryIcon: BookOpen,
    variant: "academic",
    description: "Explore our research projects and publications"
  },
  "services": {
    label: "Services",
    icon: Briefcase,
    secondaryIcon: Users,
    variant: "professional",
    description: "Professional psychology services"
  },
  "beautifulmind": {
    label: "BeautifulMind",
    icon: Brain,
    secondaryIcon: Heart,
    variant: "organization",
    description: "Culturally grounded mental health solutions"
  },
  "srcd-council": {
    label: "SRCD Council",
    icon: Award,
    secondaryIcon: Users,
    variant: "academic",
    description: "Society for Research in Child Development"
  },
  "eapp-africa": {
    label: "EAPP Africa",
    icon: Globe,
    secondaryIcon: MapPin,
    variant: "organization",
    description: "European Association of Personality Psychology - Africa"
  },
  "issbd": {
    label: "ISSBD",
    icon: BookOpen,
    secondaryIcon: TrendingUp,
    variant: "academic",
    description: "International Society for the Study of Behavioral Development"
  },
  "frontiers-editor": {
    label: "Frontiers Editor",
    icon: Edit,
    secondaryIcon: PenTool,
    variant: "academic",
    description: "Editorial work at Frontiers in Psychology"
  },
  "get-in-touch": {
    label: "Get in Touch",
    icon: Mail,
    secondaryIcon: ArrowRight,
    variant: "consultation",
    description: "Contact us for inquiries and collaborations"
  },
  "explore-research": {
    label: "Explore Research",
    icon: Microscope,
    secondaryIcon: ArrowRight,
    variant: "academic",
    description: "Discover our research portfolio"
  },
  "visit-website": {
    label: "Visit Website",
    icon: Globe,
    secondaryIcon: ArrowRight,
    variant: "organization",
    description: "Visit our external website"
  }
};

export const getButtonConfig = (key: string): ActionButtonConfig | undefined => {
  return actionButtonConfigs[key];
};

export const getIconForAction = (action: string): LucideIcon | undefined => {
  return actionButtonConfigs[action]?.icon;
};

export const getVariantForAction = (action: string): ActionButtonConfig['variant'] => {
  return actionButtonConfigs[action]?.variant || 'default';
};
