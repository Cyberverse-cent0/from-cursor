"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Brain,
  FileText,
  Users,
  Trophy,
  Settings,
  Search,
  Menu,
  X,
  ChevronRight,
  LogOut,
  User,
  Bell,
  HelpCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Simplified navigation structure based on the plan
const navigationItems = [
  { 
    icon: LayoutDashboard, 
    label: 'Overview', 
    id: 'overview',
    description: 'Dashboard overview and stats',
    color: 'bg-blue-500'
  },
  { 
    icon: Brain, 
    label: 'Projects', 
    id: 'projects',
    description: 'Manage research projects',
    color: 'bg-emerald-500'
  },
  { 
    icon: FileText, 
    label: 'Publications', 
    id: 'publications',
    description: 'Academic papers and publications',
    color: 'bg-purple-500'
  },
  { 
    icon: Users, 
    label: 'Team Members', 
    id: 'team',
    description: 'Manage team and collaborators',
    color: 'bg-indigo-500'
  },
  { 
    icon: Trophy, 
    label: 'Content', 
    id: 'content',
    description: 'Awards, events, and media',
    color: 'bg-amber-500'
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    id: 'settings',
    description: 'System configuration',
    color: 'bg-slate-500'
  }
];

interface AdminSidebarSimplifiedProps {
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

export function AdminSidebarSimplified({ 
  isOpen, 
  onToggle, 
  activePanel, 
  onPanelChange, 
  user 
}: AdminSidebarSimplifiedProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "New content published", time: "2 min ago", type: "success" },
    { id: 2, title: "System update available", time: "1 hour ago", type: "info" }
  ]);

  const handleItemClick = (item: typeof navigationItems[0]) => {
    // Navigate to the corresponding route
    const route = item.id === 'overview' ? '/admin' : `/admin/${item.id}`;
    router.push(route);
    onPanelChange(item.id);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = navigationItems.filter(item => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return item.label.toLowerCase().includes(searchLower) ||
           item.description.toLowerCase().includes(searchLower);
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Simplified Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-white border-r border-slate-200 z-50 transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        ${isCollapsed ? 'w-16' : 'w-64'}
        flex flex-col shadow-lg
      `}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between mb-4">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">Admin Panel</h2>
                  <p className="text-xs text-slate-600">Simple Control</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              {/* Collapse toggle - desktop only */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex hover:bg-slate-200 rounded-lg transition-all duration-200"
              >
                <Menu className="w-4 h-4" />
              </Button>
              
              {/* Mobile close button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden hover:bg-slate-200 rounded-lg transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search Bar - only when not collapsed */}
          {!isCollapsed && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search features..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 h-9 bg-white/80 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all duration-200 text-sm"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-200 rounded"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions - only when not collapsed */}
        {!isCollapsed && (
          <div className="p-3 border-b border-slate-200 bg-slate-50">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex-1 hover:bg-white transition-all duration-200 h-8 relative"
              >
                <Bell className="w-3 h-3" />
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 hover:bg-white transition-all duration-200 h-8"
              >
                <HelpCircle className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3">
          {filteredItems.length > 0 ? (
            <div className="space-y-2">
              {filteredItems.map(item => {
                const isActive = activePanel === item.id;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
                      ${isCollapsed ? 'justify-center' : ''}
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                    title={isCollapsed ? item.label : item.description}
                  >
                    {/* Icon with color indicator */}
                    <div className={`
                      relative flex-shrink-0 transition-transform duration-200
                      ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                    `}>
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center
                        ${isActive ? 'bg-white/20' : `${item.color} bg-opacity-10`}
                      `}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                      </div>
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    {/* Label and description */}
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm group-hover:font-semibold transition-all duration-200">
                          {item.label}
                        </div>
                        <div className="text-xs opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                          {item.description}
                        </div>
                      </div>
                    )}
                    
                    {/* Arrow indicator */}
                    {!isCollapsed && (
                      <ChevronRight className={`
                        w-4 h-4 transition-transform duration-200
                        ${isActive ? 'rotate-90 text-white' : 'text-slate-400'}
                      `} />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm text-slate-600">No features found</p>
              <p className="text-xs text-slate-500 mt-1">Try different keywords</p>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        {user && !isCollapsed && (
          <div className="p-3 border-t border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">{user.displayName}</p>
                <p className="text-xs text-slate-600 truncate">{user.role}</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full hover:bg-white transition-all duration-200">
              <LogOut className="w-3 h-3 mr-2" />
              Logout
            </Button>
          </div>
        )}

        {/* Collapsed user indicator */}
        {user && isCollapsed && (
          <div className="p-2 border-t border-slate-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
