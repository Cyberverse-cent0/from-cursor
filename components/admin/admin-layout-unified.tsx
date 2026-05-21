"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, Bell, Settings, User } from "lucide-react";

import { AdminSidebarSimplified } from "./admin-sidebar-simplified";
import { AdminSearchIntegrated } from "./admin-search-integrated";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdminLayoutUnifiedProps {
  user?: {
    username: string;
    displayName: string;
    role: string;
  };
  children: React.ReactNode;
}

export function AdminLayoutUnified({ user, children }: AdminLayoutUnifiedProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState("overview");
  const [isCompactMode, setIsCompactMode] = useState(false);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePanelChange = (panel: string) => {
    setActivePanel(panel);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-14">
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div className="hidden lg:block">
                <h1 className="font-bold text-slate-900 text-lg">Admin Dashboard</h1>
                <p className="text-xs text-slate-500">Research Hub Management</p>
              </div>
            </div>
          </div>
          
          {/* Center Section - Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden lg:block">
            <AdminSearchIntegrated 
              compact={true}
              placeholder="Quick search..."
              showQuickFilters={false}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Compact Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCompactMode(!isCompactMode)}
              className="hidden lg:flex hover:bg-slate-100 rounded-lg transition-all duration-200"
              title={isCompactMode ? "Expand view" : "Compact view"}
            >
              <div className={`w-4 h-4 border-2 border-slate-600 rounded ${isCompactMode ? 'p-0.5' : ''}`} />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            {/* User Profile */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden lg:block text-right">
                  <p className="text-sm font-medium text-slate-900">{user.displayName}</p>
                  <p className="text-xs text-slate-500">{user.role}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-14">
        {/* Sidebar - Desktop Fixed */}
        <div className="hidden lg:block fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-30">
          <AdminSidebarSimplified
            isOpen={true}
            onToggle={() => {}}
            activePanel={activePanel}
            onPanelChange={handlePanelChange}
            user={user}
          />
        </div>

        {/* Mobile Sidebar - Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-50">
            <AdminSidebarSimplified
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              activePanel={activePanel}
              onPanelChange={handlePanelChange}
              user={user}
            />
          </div>
        )}

        {/* Main Content - Full Width Utilization */}
        <div className={`
          flex-1 transition-all duration-300
          ${isCompactMode ? 'lg:ml-16' : 'lg:ml-64'}
        `}>
          {/* Mobile Search Bar */}
          <div className="lg:hidden p-4 bg-white border-b border-slate-200">
            <AdminSearchIntegrated 
              placeholder="Search everything..."
              showQuickFilters={false}
            />
          </div>

          {/* Content Area - Maximizes Space Usage */}
          <div className={`
            ${isCompactMode ? 'p-2' : 'p-4 lg:p-6'}
            max-w-full
          `}>
            {/* Breadcrumb/Context Bar */}
            <div className="mb-4 lg:mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Admin</span>
                  <span>/</span>
                  <span className="font-medium text-slate-900 capitalize">{activePanel}</span>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="hidden lg:flex">
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="hidden lg:flex">
                    Filter
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content - Uses Full Available Width */}
            <div className={`
              ${isCompactMode ? '' : 'min-h-[calc(100vh-12rem)]'}
            `}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Search className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
