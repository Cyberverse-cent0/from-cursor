"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Clock,
  Filter,
  X,
  FileText,
  Users,
  Brain,
  Trophy,
  Settings,
  Calendar,
  Tag,
  TrendingUp
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Mock search data - in real implementation, this would come from API
const mockSearchData = [
  {
    id: 1,
    type: 'project',
    title: 'Traditional Luhya Mourning Rituals',
    description: 'Research on cultural practices and psychological impacts',
    category: 'Projects',
    icon: Brain,
    color: 'bg-emerald-500',
    lastModified: '2 hours ago',
    status: 'published'
  },
  {
    id: 2,
    type: 'publication',
    title: 'Decolonizing Mental Health in African Contexts',
    description: 'Academic paper on cultural psychology and mental health',
    category: 'Publications',
    icon: FileText,
    color: 'bg-blue-500',
    lastModified: '1 day ago',
    status: 'published'
  },
  {
    id: 3,
    type: 'team',
    title: 'Dr. Jane Smith',
    description: 'Research Collaborator - Cultural Psychology',
    category: 'Team Members',
    icon: Users,
    color: 'bg-purple-500',
    lastModified: '3 days ago',
    status: 'active'
  },
  {
    id: 4,
    type: 'content',
    title: 'Excellence in Cultural Psychology Research',
    description: 'Research award and recognition',
    category: 'Awards',
    icon: Trophy,
    color: 'bg-amber-500',
    lastModified: '1 week ago',
    status: 'featured'
  },
  {
    id: 5,
    type: 'project',
    title: 'Youth Mental Health Interventions',
    description: 'Community-based mental health support programs',
    category: 'Projects',
    icon: Brain,
    color: 'bg-emerald-500',
    lastModified: '2 weeks ago',
    status: 'draft'
  }
];

const searchFilters = [
  { id: 'all', label: 'All Content', icon: Search },
  { id: 'projects', label: 'Projects', icon: Brain },
  { id: 'publications', label: 'Publications', icon: FileText },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'content', label: 'Content', icon: Trophy },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const quickFilters = [
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'published', label: 'Published', icon: TrendingUp },
  { id: 'drafts', label: 'Drafts', icon: FileText },
  { id: 'featured', label: 'Featured', icon: Star }
];

interface AdminSearchIntegratedProps {
  onSearchSelect?: (item: any) => void;
  placeholder?: string;
  showQuickFilters?: boolean;
  compact?: boolean;
}

export function AdminSearchIntegrated({ 
  onSearchSelect,
  placeholder = "Search projects, publications, team...",
  showQuickFilters = true,
  compact = false
}: AdminSearchIntegratedProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(mockSearchData);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Traditional Luhya',
    'Mental Health',
    'Dr. Jane Smith'
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate search with delay
  useEffect(() => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      setShowResults(true);
      
      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      // Simulate API call delay
      searchTimeoutRef.current = setTimeout(() => {
        const filtered = mockSearchData.filter(item => {
          const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
          const matchesQuickFilter = !selectedQuickFilter || 
            (selectedQuickFilter === 'recent' && item.lastModified.includes('hour')) ||
            (selectedQuickFilter === 'published' && item.status === 'published') ||
            (selectedQuickFilter === 'drafts' && item.status === 'draft') ||
            (selectedQuickFilter === 'featured' && item.status === 'featured');
          
          return matchesSearch && matchesFilter && matchesQuickFilter;
        });
        
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
    } else {
      setShowResults(false);
      setSearchResults(mockSearchData);
      setIsSearching(false);
    }
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, selectedFilter, selectedQuickFilter]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    // Add to recent searches if not already there
    if (value.trim() && !recentSearches.includes(value)) {
      setRecentSearches(prev => [value, ...prev.slice(0, 4)]);
    }
  };

  const handleResultClick = (item: any) => {
    // Navigate to the appropriate page
    const route = `/admin/${item.type === 'content' ? 'awards' : item.type}s`;
    router.push(route);
    
    // Call callback if provided
    if (onSearchSelect) {
      onSearchSelect(item);
    }
    
    // Clear search
    setSearchTerm("");
    setShowResults(false);
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchTerm(search);
    searchInputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: string; label: string }> = {
      published: { variant: 'default', label: 'Published' },
      draft: { variant: 'secondary', label: 'Draft' },
      active: { variant: 'default', label: 'Active' },
      featured: { variant: 'default', label: 'Featured' }
    };
    
    const config = variants[status] || { variant: 'outline', label: status };
    return <Badge variant={config.variant as any} className="text-xs">{config.label}</Badge>;
  };

  return (
    <div className={`relative ${compact ? 'w-full max-w-md' : 'w-full'}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowResults(true)}
          className={`
            pl-10 pr-10 h-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 
            rounded-lg transition-all duration-200
            ${compact ? 'text-sm' : ''}
          `}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm("")}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100 rounded"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg border-slate-200 bg-white max-h-96 overflow-hidden">
          <div className="p-3 border-b border-slate-100">
            {/* Content Type Filters */}
            <div className="flex items-center gap-2 mb-3 overflow-x-auto">
              {searchFilters.map(filter => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.id)}
                    className="flex items-center gap-1 whitespace-nowrap h-8"
                  >
                    <Icon className="w-3 h-3" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>

            {/* Quick Filters */}
            {showQuickFilters && (
              <div className="flex items-center gap-2">
                {quickFilters.map(filter => {
                  const Icon = filter.icon;
                  return (
                    <Button
                      key={filter.id}
                      variant={selectedQuickFilter === filter.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedQuickFilter(
                        selectedQuickFilter === filter.id ? null : filter.id
                      )}
                      className="flex items-center gap-1 whitespace-nowrap h-7 text-xs"
                    >
                      <Icon className="w-3 h-3" />
                      {filter.label}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Results Content */}
          <div className="overflow-y-auto max-h-80">
            {isSearching ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-slate-600">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="p-2">
                {searchResults.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleResultClick(item)}
                      className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                          ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors
                        `}>
                          <Icon className="w-5 h-5" style={{ color: item.color.replace('bg-', '').replace('500', '600') }} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm text-slate-900 truncate">
                              {item.title}
                            </h4>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {item.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.lastModified}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : searchTerm ? (
              <div className="p-8 text-center">
                <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600 mb-1">No results found</p>
                <p className="text-xs text-slate-500">Try adjusting your search or filters</p>
              </div>
            ) : recentSearches.length > 0 ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-slate-700">Recent Searches</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Clear
                  </Button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-700 group-hover:text-slate-900">
                          {search}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-500 text-center">
              Press <kbd className="px-1 py-0.5 bg-white rounded border border-slate-200">Ctrl</kbd> +{' '}
              <kbd className="px-1 py-0.5 bg-white rounded border border-slate-200">K</kbd> to search
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

// Add Star icon import
import { Star } from "lucide-react";
