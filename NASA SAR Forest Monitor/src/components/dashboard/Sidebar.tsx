import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Globe, 
  TreePine, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Leaf,
  Satellite,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'overview', label: 'Mission Control', icon: Satellite },
  { id: 'map', label: 'Global Forest Map', icon: Globe },
  { id: 'change-detection', label: 'Change Detection', icon: AlertTriangle },
  { id: 'carbon-stock', label: 'Carbon Monitoring', icon: TreePine },
  { id: 'health', label: 'Forest Health', icon: Activity },
  { id: 'climate', label: 'Climate Impact', icon: TrendingUp },
  { id: 'biodiversity', label: 'Ecosystem Health', icon: Leaf },
  { id: 'analytics', label: 'Data Analytics', icon: BarChart3 },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 h-full bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-radar rounded-lg flex items-center justify-center">
            <Satellite className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">NASA SAR</h1>
            <p className="text-xs text-muted-foreground">Forest Monitor</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-secondary/50 hover:text-foreground",
              activeSection === item.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Status Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">API Status</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-radar-pulse"></div>
            <span className="text-success">Active</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Last update: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}