"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Grid,
  List,
  Filter,
  Calendar,
  Users,
  Brain,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  teamSize: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectManagerProps {
  className?: string;
}

const categories = [
  "All Categories",
  "Research",
  "Development",
  "Design",
  "Marketing",
  "Operations"
];

const statusOptions = [
  { value: "All", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
  { value: "On Hold", label: "On Hold" },
  { value: "Planning", label: "Planning" }
];

export default function ProjectManager({ className = "" }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in production, this would be an API call
    const mockProjects: Project[] = [
      {
        id: "1",
        title: "AI Research Project",
        description: "Advanced machine learning research for natural language processing",
        category: "Research",
        status: "Active",
        teamSize: 5,
        startDate: "2024-01-15",
        createdAt: "2024-01-10T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z"
      },
      {
        id: "2",
        title: "Web Platform Development",
        description: "Building scalable web infrastructure for research hub",
        category: "Development",
        status: "Active",
        teamSize: 3,
        startDate: "2024-02-01",
        createdAt: "2024-01-20T10:00:00Z",
        updatedAt: "2024-02-01T10:00:00Z"
      }
    ];
    
    setProjects(mockProjects);
    setLoading(false);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || project.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      case "Planning": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const canEdit = () => true; // Mock permission check

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-r-none ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-l-none ${viewMode === "list" ? "bg-gray-100" : ""}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              {canEdit() && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Projects ({filteredProjects.length})
            </h1>
            <p className="text-gray-600">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {selectedCategory}
            </Badge>
            <Badge variant="outline">
              {selectedStatus}
            </Badge>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-blue-400" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{project.category}</Badge>
                        <span className="text-xs text-gray-500">Created {new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {canEdit() && (
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.teamSize}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(project.startDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                        <Brain className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{project.category}</Badge>
                          <span className="text-xs text-gray-500">Created {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {canEdit() && (
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 mt-3">{project.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {project.teamSize}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(project.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-8 h-8 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Categories");
              setSelectedStatus("All");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
