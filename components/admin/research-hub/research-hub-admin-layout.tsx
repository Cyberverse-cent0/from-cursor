"use client";

import { useState, useEffect } from "react";
import { Menu, Eye, EyeOff, Monitor, Smartphone, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResearchHubAdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  previewMode?: boolean;
  onPreviewToggle?: (show: boolean) => void;
  activeSection?: string;
}

export function ResearchHubAdminLayout({ 
  children, 
  title = "Research Hub Admin",
  previewMode = false,
  onPreviewToggle,
  activeSection = "about"
}: ResearchHubAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(previewMode);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const navigationItems = [
    { id: 'about', label: 'About', icon: '🏛️', description: 'Lab identity and philosophy' },
    { id: 'projects', label: 'Projects', icon: '🔬', description: 'Research projects' },
    { id: 'publications', label: 'Publications', icon: '📄', description: 'Papers and articles' },
    { id: 'team', label: 'Team', icon: '👥', description: 'Team members' },
    { id: 'awards', label: 'Awards', icon: '🏆', description: 'Recognition and grants' },
    { id: 'activities', label: 'Activities', icon: '📅', description: 'Events and activities' },
    { id: 'media', label: 'Media', icon: '📸', description: 'Images and files' }
  ];

  useEffect(() => {
    if (onPreviewToggle) {
      onPreviewToggle(showPreview);
    }
  }, [showPreview, onPreviewToggle]);

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  const getPreviewWidth = () => {
    if (previewDevice === 'mobile') return 'w-[375px]';
    return 'w-[1024px]';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Navigation */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "w-64 lg:w-72"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0F766E] to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🧠</span>
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-sm">Research Hub</h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={`/admin/research-hub/${item.id}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    activeSection === item.id
                      ? "bg-[#0F766E]/10 text-[#0F766E] font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/research-hub" target="_blank">
                  <Eye className="w-4 h-4 mr-2" />
                  View Live Site
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <a href="/admin">
                  ← Back to Admin
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500">Manage research hub content</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Preview Controls */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={showPreview ? "default" : "ghost"}
                  size="sm"
                  onClick={handlePreviewToggle}
                  className="text-xs"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                {showPreview && (
                  <>
                    <Button
                      variant={previewDevice === 'desktop' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewDevice('desktop')}
                      className="text-xs px-2"
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewDevice === 'mobile' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPreviewDevice('mobile')}
                      className="text-xs px-2"
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>

              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area with Preview */}
        <div className={cn(
          "flex transition-all duration-300",
          showPreview ? "h-[calc(100vh-60px)]" : "min-h-screen"
        )}>
          {/* Main Content */}
          <div className={cn(
            "flex-1 overflow-y-auto",
            showPreview ? "w-1/2 border-r border-gray-200" : "w-full"
          )}>
            <div className="p-6">
              {children}
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="w-1/2 bg-gray-100 overflow-hidden">
              <div className="h-full overflow-y-auto p-4 flex items-center justify-center">
                <div className={cn(
                  "bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300",
                  getPreviewWidth()
                )}>
                  <div className="h-full">
                    {/* Preview Content */}
                    <div className="p-4 text-center text-gray-500">
                      <div className="mb-4">
                        <Eye className="w-12 h-12 mx-auto text-gray-400" />
                      </div>
                      <h3 className="font-medium mb-2">Live Preview</h3>
                      <p className="text-sm text-gray-400">
                        Preview of your changes will appear here
                      </p>
                      <div className="mt-4 text-xs text-gray-400">
                        {previewDevice === 'mobile' ? 'Mobile View' : 'Desktop View'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
