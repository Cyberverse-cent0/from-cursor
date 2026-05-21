"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Brain,
  FileText,
  Users,
  Trophy,
  Settings,
  Plus,
  Edit3,
  Upload,
  Clock,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Star,
  AlertCircle,
  Activity
} from "lucide-react";

interface AdminStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalPublications: number;
  totalTeamMembers: number;
  totalAwards: number;
  totalEvents: number;
  totalMedia: number;
}

interface DashboardTabProps {
  stats: AdminStats;
  onAction?: (action: string) => void;
}

// Overview Tab Component
function OverviewTab({ stats, onAction }: DashboardTabProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stats.totalProjects}</h3>
              <p className="text-muted-foreground">Total Projects</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {stats.publishedProjects} published • {stats.draftProjects} drafts
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stats.totalPublications}</h3>
              <p className="text-muted-foreground">Publications</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Academic papers and research outputs
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stats.totalTeamMembers}</h3>
              <p className="text-muted-foreground">Team Members</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Researchers and collaborators
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stats.totalAwards}</h3>
              <p className="text-muted-foreground">Awards & Events</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Recognition and activities
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {[
            {
              action: "Project Updated",
              title: "Traditional Luhya Mourning Rituals",
              time: "2 hours ago",
              icon: Brain,
              color: "text-emerald-600 bg-emerald-50"
            },
            {
              action: "Publication Added",
              title: "Decolonizing Mental Health in African Contexts",
              time: "1 day ago",
              icon: FileText,
              color: "text-blue-600 bg-blue-50"
            },
            {
              action: "Team Member Added",
              title: "Dr. Jane Smith - Research Collaborator",
              time: "3 days ago",
              icon: Users,
              color: "text-purple-600 bg-purple-50"
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{activity.action}</div>
                <div className="text-sm text-muted-foreground">{activity.title}</div>
              </div>
              <div className="text-sm text-muted-foreground">
                <Clock className="w-4 h-4 inline mr-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Button className="h-12" onClick={() => onAction?.('new-project')}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
          <Button variant="outline" className="h-12" onClick={() => onAction?.('new-publication')}>
            <Plus className="w-4 h-4 mr-2" />
            New Publication
          </Button>
          <Button variant="outline" className="h-12" onClick={() => onAction?.('add-team')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
          <Button variant="outline" className="h-12" onClick={() => onAction?.('upload-media')}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Projects Tab Component
function ProjectsTab({ stats, onAction }: DashboardTabProps) {
  const mockProjects = [
    {
      id: 1,
      title: "Traditional Luhya Mourning Rituals",
      status: "published",
      lastModified: "2 hours ago",
      views: 245,
      category: "Cultural Psychology"
    },
    {
      id: 2,
      title: "Youth Mental Health Interventions",
      status: "draft",
      lastModified: "1 day ago",
      views: 89,
      category: "Community Psychology"
    },
    {
      id: 3,
      title: "Decolonizing Research Methods",
      status: "published",
      lastModified: "3 days ago",
      views: 156,
      category: "Research Methodology"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage research projects and portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => onAction?.('new-project')}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects Table */}
      <Card className="p-6">
        <div className="space-y-4">
          {mockProjects.map(project => (
            <div key={project.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{project.title}</h3>
                  <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {project.category} • {project.views} views • {project.lastModified}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Publications Tab Component
function PublicationsTab({ stats, onAction }: DashboardTabProps) {
  const mockPublications = [
    {
      id: 1,
      title: "Decolonizing Mental Health in African Contexts",
      authors: "Smith, J., Johnson, K.",
      journal: "Journal of Cultural Psychology",
      year: "2024",
      status: "published",
      citations: 12
    },
    {
      id: 2,
      title: "Traditional Healing Practices in Modern Society",
      authors: "Smith, J., Williams, R.",
      journal: "International Journal of Psychology",
      year: "2023",
      status: "published",
      citations: 8
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Publications</h2>
          <p className="text-muted-foreground">Academic papers and research outputs</p>
        </div>
        <Button onClick={() => onAction?.('new-publication')}>
          <Plus className="w-4 h-4 mr-2" />
          New Publication
        </Button>
      </div>

      {/* Publications List */}
      <Card className="p-6">
        <div className="space-y-4">
          {mockPublications.map(pub => (
            <div key={pub.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{pub.title}</h3>
                <div className="text-sm text-muted-foreground">
                  {pub.authors} • {pub.journal} ({pub.year}) • {pub.citations} citations
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Team Tab Component
function TeamTab({ stats, onAction }: DashboardTabProps) {
  const mockTeam = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      role: "Research Collaborator",
      department: "Cultural Psychology",
      status: "active",
      joined: "2023"
    },
    {
      id: 2,
      name: "Dr. John Johnson",
      role: "Postdoctoral Fellow",
      department: "Community Psychology",
      status: "active",
      joined: "2024"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Members</h2>
          <p className="text-muted-foreground">Manage team and collaborators</p>
        </div>
        <Button onClick={() => onAction?.('add-team')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team List */}
      <Card className="p-6">
        <div className="space-y-4">
          {mockTeam.map(member => (
            <div key={member.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {member.role} • {member.department} • Joined {member.joined}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Active</Badge>
                <Button variant="ghost" size="sm">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Content Tab Component
function ContentTab({ stats, onAction }: DashboardTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-muted-foreground">Awards, events, and media</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
          <Button onClick={() => onAction?.('new-award')}>
            <Plus className="w-4 h-4 mr-2" />
            New Award
          </Button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stats.totalAwards}</h3>
              <p className="text-muted-foreground">Awards & Recognition</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stats.totalEvents}</h3>
              <p className="text-muted-foreground">Events & Activities</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{stats.totalMedia}</h3>
              <p className="text-muted-foreground">Media Files</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ stats, onAction }: DashboardTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">System configuration and preferences</p>
      </div>

      {/* Settings Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">General Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Site Language</span>
              <Button variant="outline" size="sm">English</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Time Zone</span>
              <Button variant="outline" size="sm">UTC</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Date Format</span>
              <Button variant="outline" size="sm">MM/DD/YYYY</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Security</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Two-Factor Auth</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Session Timeout</span>
              <Button variant="outline" size="sm">30 min</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Password Policy</span>
              <Button variant="outline" size="sm">Strong</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Main Unified Dashboard Component
export function AdminDashboardUnified() {
  const [stats] = useState<AdminStats>({
    totalProjects: 12,
    publishedProjects: 8,
    draftProjects: 4,
    totalPublications: 28,
    totalTeamMembers: 6,
    totalAwards: 15,
    totalEvents: 8,
    totalMedia: 156
  });

  const [activeTab, setActiveTab] = useState("overview");

  const handleAction = (action: string) => {
    console.log('Action triggered:', action);
    // Handle different actions (open modals, navigate, etc.)
  };

  const tabComponents: Record<string, React.ComponentType<DashboardTabProps>> = {
    overview: OverviewTab,
    projects: ProjectsTab,
    publications: PublicationsTab,
    team: TeamTab,
    content: ContentTab,
    settings: SettingsTab
  };

  const ActiveTabComponent = tabComponents[activeTab];

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab Navigation */}
        <TabsList className="grid w-full grid-cols-6 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Projects</span>
          </TabsTrigger>
          <TabsTrigger value="publications" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Publications</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Team</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={activeTab} className="mt-0">
          <ActiveTabComponent stats={stats} onAction={handleAction} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
