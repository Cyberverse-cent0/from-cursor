"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Microscope,
  FileText,
  Trophy,
  Users,
  Calendar,
  Settings,
  Search,
  ArrowRight,
  ArrowLeft,
  Home,
  Grid3X3,
  Bookmark,
  Clock,
  TrendingUp
} from "lucide-react";

interface NavigationItem {
  title: string;
  href: string;
  icon: any;
  description?: string;
  badge?: number;
  quickActions?: QuickAction[];
}

interface QuickAction {
  title: string;
  href: string;
  icon: any;
  description?: string;
}

const mainNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/research-hub",
    icon: Home,
    description: "Research hub overview"
  },
  {
    title: "Projects",
    href: "/research-hub/projects",
    icon: Microscope,
    description: "Research projects"
  },
  {
    title: "Publications",
    href: "/research-hub/publications",
    icon: FileText,
    description: "Papers and publications"
  },
  {
    title: "Team",
    href: "/research-hub/team",
    icon: Users,
    description: "Collaborators"
  },
  {
    title: "Awards",
    href: "/research-hub/awards",
    icon: Trophy,
    description: "Recognition and grants"
  }
];

const quickActions: { [key: string]: QuickAction[] } = {
  "/research-hub": [
    {
      title: "About Lab",
      href: "/research-hub/about",
      icon: Brain,
      description: "Lab identity and philosophy"
    },
    {
      title: "Contact",
      href: "/research-hub/contact",
      icon: Settings,
      description: "Get in touch"
    }
  ],
  "/research-hub/projects": [
    {
      title: "New Project",
      href: "/admin/projects?action=new",
      icon: Grid3X3,
      description: "Create new research project"
    },
    {
      title: "Publications",
      href: "/research-hub/publications",
      icon: FileText,
      description: "View related publications"
    }
  ],
  "/research-hub/publications": [
    {
      title: "New Publication",
      href: "/admin/publications?action=new",
      icon: Grid3X3,
      description: "Add new publication"
    },
    {
      title: "Projects",
      href: "/research-hub/projects",
      icon: Microscope,
      description: "View related projects"
    }
  ],
  "/research-hub/team": [
    {
      title: "Add Member",
      href: "/admin/team?action=new",
      icon: Users,
      description: "Add team member"
    },
    {
      title: "Projects",
      href: "/research-hub/projects",
      icon: Microscope,
      description: "View member projects"
    }
  ],
  "/research-hub/awards": [
    {
      title: "New Award",
      href: "/admin/awards?action=new",
      icon: Trophy,
      description: "Add new award"
    },
    {
      title: "Team",
      href: "/research-hub/team",
      icon: Users,
      description: "View team achievements"
    }
  ]
};

interface EnhancedNavigationProps {
  className?: string;
  onClose?: () => void;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

export function EnhancedNavigation({ 
  className, 
  onClose, 
  isAuthenticated = false,
  isAdmin = false 
}: EnhancedNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [recentPages, setRecentPages] = useState<string[]>([]);

  useEffect(() => {
    // Load recent pages from localStorage
    const saved = localStorage.getItem('recent-research-pages');
    if (saved) {
      setRecentPages(JSON.parse(saved));
    }
  }, []);

  const addToRecent = (page: string) => {
    const updated = [page, ...recentPages.filter(p => p !== page)].slice(0, 5);
    setRecentPages(updated);
    localStorage.setItem('recent-research-pages', JSON.stringify(updated));
  };

  const getCurrentQuickActions = (): QuickAction[] => {
    return quickActions[pathname] || [];
  };

  const isActive = (href: string) => {
    if (href === "/research-hub") {
      return pathname === "/research-hub" || pathname === "/research-hub/";
    }
    return pathname.startsWith(href);
  };

  const getBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { title: "Research Hub", href: "/research-hub" }
    ];

    if (pathSegments.length > 2) {
      const currentSection = pathSegments[1];
      const currentPage = pathSegments.slice(2).join('/');
      
      switch (currentSection) {
        case 'projects':
          breadcrumbs.push({ title: "Projects", href: "/research-hub/projects" });
          if (currentPage) {
            breadcrumbs.push({ title: currentPage, href: `/research-hub/projects/${currentPage}` });
          }
          break;
        case 'publications':
          breadcrumbs.push({ title: "Publications", href: "/research-hub/publications" });
          if (currentPage) {
            breadcrumbs.push({ title: currentPage, href: `/research-hub/publications/${currentPage}` });
          }
          break;
        case 'team':
          breadcrumbs.push({ title: "Team", href: "/research-hub/team" });
          break;
        case 'awards':
          breadcrumbs.push({ title: "Awards", href: "/research-hub/awards" });
          break;
        case 'about':
          breadcrumbs.push({ title: "About Lab", href: "/research-hub/about" });
          break;
        case 'contact':
          breadcrumbs.push({ title: "Contact", href: "/research-hub/contact" });
          break;
      }
    }

    return breadcrumbs;
  };

  return (
    <div className={cn("flex flex-col h-full bg-card border-r", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center dark:bg-primary/90 dark:shadow-primary/25 dark:shadow-lg">
            <span className="text-primary-foreground text-xs font-bold">RH</span>
          </div>
          <div>
            <h1 className="text-sm font-bold dark:text-foreground">Research Hub</h1>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground">Enhanced Navigation</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Breadcrumbs */}
      <div className="px-4 py-2 border-b">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {getBreadcrumbs().map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              <Link
                href={crumb.href}
                onClick={() => addToRecent(crumb.href)}
                className="hover:text-foreground transition-colors"
              >
                {crumb.title}
              </Link>
              {index < getBreadcrumbs().length - 1 && (
                <ArrowRight className="w-3 h-3 mx-1 text-muted-foreground" />
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {mainNavigation.map((item) => {
          const active = isActive(item.href);
          const quickActions = getCurrentQuickActions();
          
          return (
            <div key={item.title} className="space-y-2">
              {/* Main Navigation Item */}
              <Link
                href={item.href}
                onClick={() => addToRecent(item.href)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  active
                    ? "bg-primary/10 text-primary shadow-sm border border-primary/20 dark:bg-primary/20 dark:shadow-primary/25 dark:border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-muted/30"
                )}
              >
                <item.icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-primary" : "text-muted-foreground")} />
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                </div>
                {item.badge && (
                  <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full dark:bg-primary/90 dark:shadow-primary/25">
                    {item.badge}
                  </div>
                )}
              </Link>

              {/* Quick Actions */}
              {active && quickActions.length > 0 && (
                <div className="ml-4 space-y-1">
                  <div className="text-xs text-muted-foreground font-medium mb-2">Quick Actions</div>
                  {quickActions.map((action) => (
                    <Link
                      key={action.title}
                      href={action.href}
                      onClick={() => addToRecent(action.href)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs bg-muted/50 hover:bg-muted border border-border transition-all duration-200 group dark:bg-muted/30 dark:hover:bg-muted/50 dark:border-border"
                    >
                      <action.icon className="w-3 h-3 text-muted-foreground" />
                      <div>
                        <div className="truncate font-medium">{action.title}</div>
                        {action.description && (
                          <div className="text-xs text-muted-foreground">{action.description}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Recent Pages */}
      {recentPages.length > 0 && (
        <div className="p-3 border-t">
          <div className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Recently Visited
          </div>
          <div className="space-y-1">
            {recentPages.map((page) => {
              const pageData = mainNavigation.find(item => item.href === page);
              return (
                <Link
                  key={page}
                  href={page}
                  onClick={() => addToRecent(page)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs hover:bg-muted/50 transition-all duration-200"
                >
                  {pageData?.icon && <pageData.icon className="w-3 h-3 text-muted-foreground" />}
                  <div className="truncate">{pageData?.title || page}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <div className="p-3 border-t mt-auto">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted/50 p-2 rounded-md text-center dark:bg-muted/30 dark:border dark:border-border/50">
            <div className="text-sm font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="bg-muted/50 p-2 rounded-md text-center dark:bg-muted/30 dark:border dark:border-border/50">
            <div className="text-sm font-bold text-primary">28</div>
            <div className="text-xs text-muted-foreground">Publications</div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="p-3 border-t">
        <div className="text-xs text-muted-foreground">
          <div className="font-medium mb-1">Keyboard Shortcuts</div>
          <div className="space-y-1">
            <div>Ctrl+K - Quick search</div>
            <div>Ctrl+1-9 - Quick navigation</div>
            <div>Esc - Close sidebar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
