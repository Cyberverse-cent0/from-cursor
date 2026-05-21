"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Images,
  ShieldCheck,
  Settings,
  Users,
  BarChart3,
  Palette,
  Database,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Edit3,
  Upload,
  Clock,
  History,
  Search,
  Bell,
  User,
  Mail,
  Phone,
  Globe,
  Lock,
  Key,
  Activity,
  TrendingUp,
  Download,
  RefreshCw,
  Eye,
  HelpCircle,
  FileImage,
  Video,
  Music,
  File,
  Folder,
  Tag,
  Calendar,
  MessageSquare,
  Star,
  Heart,
  Bookmark,
  Share2,
  Copy,
  Trash2,
  Plus,
  Minus,
  Filter,
  Grid,
  List,
  MoreVertical,
  Check,
  AlertCircle,
  Info,
  Zap,
  Target,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Handshake,
  Megaphone,
  Moon,
  Sun,
  Command,
  ZapIcon,
  Rocket,
  Flame,
  Brain,
  Timer
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type SidebarItem = {
  id: string;
  label: string;
  icon: any;
  href?: string;
  badge?: string | number;
  children?: SidebarItem[];
  description?: string;
  isNew?: boolean;
  isHot?: boolean;
};

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    description: "Main admin dashboard",
    isNew: true
  },
  {
    id: "content",
    label: "Content Management",
    icon: Edit3,
    children: [
      {
        id: "home-page",
        label: "Home Page",
        icon: Home,
        href: "/admin/content/home",
        description: "Edit home page content, hero section, and basic information",
        isHot: true
      },
      {
        id: "projects",
        label: "Research Projects",
        icon: Target,
        href: "/admin/projects",
        description: "Manage research projects and portfolio",
        isHot: true
      },
      {
        id: "publications",
        label: "Publications",
        icon: BookOpen,
        href: "/admin/publications",
        description: "Academic papers and publications"
      },
      {
        id: "awards",
        label: "Awards & Grants",
        icon: Award,
        href: "/admin/awards",
        description: "Research funding and recognition"
      },
      {
        id: "content-overview",
        label: "All Content",
        icon: Sparkles,
        href: "/admin/content",
        description: "Manage all website content"
      }
    ]
  },
  {
    id: "media",
    label: "Media Library",
    icon: Images,
    children: [
      {
        id: "media-overview",
        label: "All Media",
        icon: Images,
        href: "/admin/media",
        description: "Manage all media files"
      },
      {
        id: "passport-photo",
        label: "Passport Photo",
        icon: User,
        href: "/admin/media/passport-photo",
        description: "Upload and manage passport photo",
        isHot: true
      },
      {
        id: "uploads",
        label: "Upload Files",
        icon: Upload,
        href: "/admin/media/upload",
        description: "Upload new media"
      }
    ]
  },
  {
    id: "seo",
    label: "SEO & Analytics",
    icon: Globe,
    children: [
      {
        id: "seo-overview",
        label: "SEO Tools",
        icon: Target,
        href: "/admin/seo",
        description: "Search engine optimization"
      },
      {
        id: "traffic",
        label: "Analytics",
        icon: BarChart3,
        href: "/admin/analytics",
        description: "Traffic and performance stats"
      }
    ]
  },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    children: [
      {
        id: "admin-users",
        label: "Admin Users",
        icon: ShieldCheck,
        href: "/admin/users",
        description: "Manage admin accounts"
      },
      {
        id: "sessions",
        label: "Active Sessions",
        icon: Activity,
        href: "/admin/users/sessions",
        description: "Monitor sessions"
      }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      {
        id: "site-settings",
        label: "Site Settings",
        icon: Settings,
        href: "/admin/settings",
        description: "General site configuration"
      },
      {
        id: "security",
        label: "Security",
        icon: ShieldCheck,
        href: "/admin/security",
        description: "Security and access control"
      },
      {
        id: "backup",
        label: "Backup & Restore",
        icon: Database,
        href: "/admin/backup",
        description: "Data backup and recovery"
      }
    ]
  }
];

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activePanel: string;
  onPanelChange: (panel: string) => void;
  user?: {
    username: string;
    displayName: string;
    role: string;
  };
}

export function AdminSidebarEnhanced({ isOpen, onToggle, activePanel, onPanelChange, user }: AdminSidebarProps) {
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['content', 'media']));
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recentItems, setRecentItems] = useState<string[]>(['dashboard', 'content', 'media']);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "New content published", time: "2 min ago", type: "success" },
    { id: 2, title: "System update available", time: "1 hour ago", type: "info" },
    { id: 3, title: "Security scan completed", time: "3 hours ago", type: "warning" }
  ]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Set client-side flag after mount
  useEffect(() => {
    setIsClient(true);
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    // Auto-expand content section when searching
    if (searchTerm && !expandedItems.has('content')) {
      setExpandedItems(prev => new Set([...prev, 'content']));
    }
  }, [searchTerm, expandedItems]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else if (item.href) {
      // Navigate using Next.js router
      router.push(item.href);
      // Add to recent items
      setRecentItems(prev => {
        const updated = [item.id, ...prev.filter(id => id !== item.id)].slice(0, 5);
        return updated;
      });
      // Close sidebar on mobile
      if (window.innerWidth < 1024) {
        onToggle();
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In real implementation, this would change the theme
  };

  const filteredItems = sidebarItems.filter(item => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesItem = item.label.toLowerCase().includes(searchLower) ||
                         item.description?.toLowerCase().includes(searchLower);
    
    if (matchesItem) return true;
    
    if (item.children) {
      return item.children.some(child => 
        child.label.toLowerCase().includes(searchLower) ||
        child.description?.toLowerCase().includes(searchLower)
      );
    }
    
    return false;
  });

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const isActive = isClient && item.href === currentPath;
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="w-full group">
        <button
          onClick={() => handleItemClick(item)}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden
            ${isActive 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:scale-[1.01]'
            }
          `}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative flex items-center gap-3 w-full">
            <div className={`
              relative transition-transform duration-300
              ${isActive ? 'scale-110' : 'group-hover:scale-105'}
            `}>
              <item.icon className={`w-6 h-6 ${isActive ? 'text-white' : ''}`} />
              
              {/* Icon glow effect */}
              <div className={`absolute inset-0 bg-white/20 rounded-full blur-md animate-pulse transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
              
              {/* New/Hot badges */}
              {item.isNew && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white" />
              )}
              {item.isHot && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
              )}
            </div>
            
            <span className="flex-1 text-left font-medium text-base group-hover:font-semibold transition-all duration-200">
              {item.label}
            </span>
            
            <div className="flex items-center gap-2">
              {item.badge && (
                <Badge variant={isActive ? "secondary" : "outline"} className="text-sm font-semibold animate-bounce px-2 py-1">
                  {item.badge}
                </Badge>
              )}
              
              {item.isNew && (
                <Badge className="bg-green-100 text-green-800 text-sm font-semibold animate-pulse px-2 py-1">
                  NEW
                </Badge>
              )}
              
              {item.isHot && (
                <Badge className="bg-red-100 text-red-800 text-sm font-semibold animate-pulse px-2 py-1">
                  <Flame className="w-3 h-3 mr-1" />
                  HOT
                </Badge>
              )}
              
              {hasChildren && (
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1 animate-in slide-in-from-top-2 duration-300">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay with enhanced blur effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={onToggle}
        />
      )}
      
      {/* Enhanced Sidebar */}
      <div className={`
        h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-r border-slate-200/50 transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        lg:translate-x-0 lg:shadow-xl
        w-72 xl:w-80 flex flex-col
      `}>
        {/* Enhanced Header */}
        <div className="p-4 border-b border-slate-200/50 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm">
                  Admin Panel
                </h2>
                <p className="text-xs text-slate-600">Control Center</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden hover:bg-slate-200 rounded-lg transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              ref={searchInputRef}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 h-8 bg-white/50 backdrop-blur-sm border-slate-200/50 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-200 text-sm"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-200 rounded transition-all duration-200"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex-1 hover:bg-slate-200 transition-all duration-200 h-8"
            >
              {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex-1 hover:bg-slate-200 transition-all duration-200 relative h-8"
            >
              <Bell className="w-3 h-3" />
              {notifications.length > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-slate-200 transition-all duration-200 h-8"
            >
              <Command className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-32 left-6 right-6 z-50 animate-in slide-in-from-top-2 duration-300">
            <Card className="p-4 shadow-xl border-slate-200/50 bg-white/95 backdrop-blur-sm">
              <h3 className="font-semibold text-slate-900 mb-3">Notifications</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                      <p className="text-xs text-slate-600">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Recent Items */}
        {recentItems.length > 0 && !searchTerm && (
          <div className="px-6 py-3 border-b border-slate-200/50">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-medium text-slate-600">Recent</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {recentItems.map(itemId => {
                const item = sidebarItems.find(i => i.id === itemId) || 
                             sidebarItems.flatMap(i => i.children || []).find(c => c.id === itemId);
                if (!item) return null;
                return (
                  <Button
                    key={itemId}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (item.href) {
                        router.push(item.href);
                        if (window.innerWidth < 1024) {
                          onToggle();
                        }
                      }
                    }}
                    className="h-6 px-2 text-xs hover:bg-slate-200 transition-all duration-200"
                  >
                    <item.icon className="w-3 h-3 mr-1" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Enhanced Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => renderSidebarItem(item))
          ) : (
            <div className="text-center py-4">
              <Search className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">No results found</p>
            </div>
          )}
        </div>
        
        {/* Compact User Profile */}
        {user && (
          <div className="p-3 border-t border-slate-200/50 bg-gradient-to-r from-blue-500/5 to-purple-600/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Check className="w-1.5 h-1.5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">{user.displayName}</p>
                <p className="text-xs text-slate-600 truncate">{user.role}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="hover:bg-slate-200 transition-all duration-200 h-7 text-xs">
                <Settings className="w-3 h-3 mr-1" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-red-50 text-red-600 transition-all duration-200 h-7 text-xs">
                <LogOut className="w-3 h-3 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
