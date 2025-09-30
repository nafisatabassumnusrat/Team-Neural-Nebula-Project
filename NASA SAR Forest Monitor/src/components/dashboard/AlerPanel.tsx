import React from 'react';
import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  TrendingDown, 
  Flame, 
  CloudRain,
  TreePine,
  Clock
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'deforestation' | 'fire' | 'flood' | 'degradation';
  location: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  description: string;
  area: number; // in hectares
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'deforestation',
    location: 'Amazon Basin, Brazil',
    severity: 'high',
    timestamp: '15 minutes ago',
    description: 'Rapid deforestation detected via SAR change analysis',
    area: 1250
  },
  {
    id: '2',
    type: 'fire',
    location: 'Congo Basin, DRC',
    severity: 'medium',
    timestamp: '2 hours ago',
    description: 'Forest fire spreading, satellite thermal anomaly confirmed',
    area: 890
  },
  {
    id: '3',
    type: 'degradation',
    location: 'Indonesian Rainforest',
    severity: 'medium',
    timestamp: '4 hours ago',
    description: 'Gradual forest degradation pattern identified',
    area: 2100
  },
  {
    id: '4',
    type: 'flood',
    location: 'Pantanal, Brazil',
    severity: 'low',
    timestamp: '6 hours ago',
    description: 'Flooding affecting forest understory structure',
    area: 450
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'deforestation': return TrendingDown;
    case 'fire': return Flame;
    case 'flood': return CloudRain;
    case 'degradation': return TreePine;
    default: return AlertTriangle;
  }
};

const getAlertColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'border-destructive/30 bg-destructive/5';
    case 'medium': return 'border-warning/30 bg-warning/5';
    case 'low': return 'border-accent/30 bg-accent/5';
    default: return 'border-border';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'text-destructive';
    case 'medium': return 'text-warning';
    case 'low': return 'text-accent';
    default: return 'text-muted-foreground';
  }
};

export default function AlertPanel() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <h2 className="text-lg font-semibold text-foreground">Real-Time Alerts</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-radar-pulse"></div>
          <span>Live Monitoring</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          
          return (
            <div
              key={alert.id}
              className={cn(
                "border rounded-lg p-4 transition-all duration-200 hover:shadow-md cursor-pointer",
                getAlertColor(alert.severity)
              )}
            >
              <div className="flex items-start space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  alert.severity === 'high' && "bg-destructive/20",
                  alert.severity === 'medium' && "bg-warning/20",
                  alert.severity === 'low' && "bg-accent/20"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    alert.severity === 'high' && "text-destructive",
                    alert.severity === 'medium' && "text-warning",
                    alert.severity === 'low' && "text-accent"
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {alert.location}
                    </h3>
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      alert.severity === 'high' && "bg-destructive/20 text-destructive",
                      alert.severity === 'medium' && "bg-warning/20 text-warning",
                      alert.severity === 'low' && "bg-accent/20 text-accent"
                    )}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {alert.area.toLocaleString()} ha affected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-accent hover:text-accent/80 transition-colors">
          View All Alerts ({alerts.length + 12} total)
        </button>
      </div>
    </div>
  );
}